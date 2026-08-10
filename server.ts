import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. AI features will fallback to client default responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "placeholder",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-memory data store for RSVPs and Wishes
interface RSVP {
  id: string;
  name: string;
  phone: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  pax: number;
  wishes?: string;
  createdAt: string;
}

interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
  likes: number;
}

const rsvps: RSVP[] = [
  {
    id: "1",
    name: "Ahmad Zaki & Keluarga",
    phone: "0123456789",
    attendance: "hadir",
    pax: 4,
    wishes: "Tahniah Hakim & Asyiqim! Semoga kekal hingga ke anak cucu.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Nurul Huda",
    phone: "0198765432",
    attendance: "hadir",
    pax: 2,
    wishes: "Selamat Pengantin Baru! Semoga mahligai yang dibina sentiasa dilimpahi keberkatan.",
    createdAt: new Date().toISOString(),
  },
];

const wishes: Wish[] = [
  {
    id: "w1",
    name: "Pak Cik Hassan & Mak Cik Salmah",
    relation: "Keluarga",
    message: "Tahniah Hakim dan Asyiqim. Semoga ikatan suci ini sentiasa dirahmati Allah SWT, dikurniakan zuriat yang soleh dan solehah, serta dilimpahi ketenangan hingga ke akhir hayat. Amin.",
    createdAt: "2026-08-01T10:15:00Z",
    likes: 5,
  },
  {
    id: "w2",
    name: "Khairul & Rakan-rakan USM",
    relation: "Sahabat",
    message: "Finally Hakim bro! Tahniah korang berdua. Semoga rumah tangga yang dibina dipenuhi cinta, kesabaran, dan kebahagiaan berpanjangan. Jumpa di Trolak!",
    createdAt: "2026-08-03T14:30:00Z",
    likes: 8,
  },
  {
    id: "w3",
    name: "Siti Sarah binti Idris",
    relation: "Rakan Sekerja",
    message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Tahniah Asyiqim cantik dan suami! Semoga sentiasa berbahagia.",
    createdAt: "2026-08-05T09:00:00Z",
    likes: 3,
  },
];

// --- API ROUTES ---

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Walimatul Urus Wedding Invitation" });
});

// GET & POST RSVPs
app.get("/api/rsvps", (_req, res) => {
  res.json({ rsvps });
});

app.post("/api/rsvps", (req, res) => {
  const { name, phone, attendance, pax, wishes: wishText } = req.body;
  if (!name || !attendance) {
    return res.status(400).json({ error: "Sila lengkapkan nama dan status kehadiran." });
  }

  const newRsvp: RSVP = {
    id: Date.now().toString(),
    name,
    phone: phone || "-",
    attendance,
    pax: Number(pax) || 1,
    wishes: wishText,
    createdAt: new Date().toISOString(),
  };

  rsvps.unshift(newRsvp);

  // If there's a wish attached, add to wishes feed too
  if (wishText && wishText.trim().length > 0) {
    wishes.unshift({
      id: "w-" + Date.now(),
      name,
      relation: "Tetamu Jemputan",
      message: wishText.trim(),
      createdAt: new Date().toISOString(),
      likes: 1,
    });
  }

  res.json({ success: true, rsvp: newRsvp });
});

// GET & POST Wishes
app.get("/api/wishes", (_req, res) => {
  res.json({ wishes });
});

app.post("/api/wishes", (req, res) => {
  const { name, relation, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "Sila masukkan nama dan ucapan anda." });
  }

  const newWish: Wish = {
    id: "w-" + Date.now(),
    name,
    relation: relation || "Tetamu",
    message,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  wishes.unshift(newWish);
  res.json({ success: true, wish: newWish });
});

app.post("/api/wishes/:id/like", (req, res) => {
  const { id } = req.params;
  const wish = wishes.find((w) => w.id === id);
  if (wish) {
    wish.likes += 1;
    return res.json({ success: true, likes: wish.likes });
  }
  res.status(404).json({ error: "Ucapan tidak dijumpai" });
});

// AI Translation Endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing text or targetLang" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY belum dikonfigurasi.",
        fallback: text,
      });
    }

    const ai = getAIClient();
    const prompt = `You are a respectful, warm, and culturally sophisticated translator specializing in traditional Malay wedding invitations ("Walimatul Urus").
Translate the following wedding invitation text into ${targetLang}.
Maintain the formal, warm, poetic, and respectful tone appropriate for a Malay wedding ceremony. Ensure honorifics and emotional warmth sound natural to native speakers of ${targetLang}.

Source Text:
"""
${text}
"""

Return ONLY the translated text without extra conversational introductory remarks or commentary.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const translatedText = response.text ? response.text.trim() : text;
    res.json({ translatedText });
  } catch (err: any) {
    console.error("Translation API error:", err);
    res.status(500).json({ error: err?.message || "Gagal menterjemah teks." });
  }
});

// AI Wish Generator Endpoint
app.post("/api/generate-wish", async (req, res) => {
  try {
    const { guestName, relation, tone, language = "Bahasa Melayu" } = req.body;
    if (!guestName) {
      return res.status(400).json({ error: "Sila masukkan nama anda." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback
      return res.json({
        wish: `Tahniah Hakim & Asyiqim daripada ${guestName}! Semoga dikurniakan mahligai yang sakinah, mawaddah wa rahmah serta berbahagia hingga ke syurga. Amin!`,
      });
    }

    const ai = getAIClient();
    const prompt = `Act as an AI Assistant writing a heartfelt, warm, and culturally rich wedding blessing/wish (Ucapan Perkahwinan & Doa Mempelai) for a Malay wedding invitation.

Details:
- Couple: Muhammad Hakim Bin Mohd Khairi & Najma Asyiqim Binti Muhaizi (Akim & Asyiqim)
- Guest Name: ${guestName}
- Relation to couple: ${relation || "Kawan / Tetamu"}
- Tone desired: ${tone || "Mesra, Hangat, Islamik & Penuh Keberkatan"}
- Output Language: ${language}

Generate a short, beautiful 2-3 sentence wedding wish. Include warm prayers (Doa), congratulations (Tahniah / Barakallah), and a human touch. Do not include quotes around the whole text unless part of a prayer.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const wish = response.text ? response.text.trim().replace(/^["']|["']$/g, "") : "";
    res.json({ wish });
  } catch (err: any) {
    console.error("AI Wish error:", err);
    res.status(500).json({ error: "Gagal menjana ucapan AI." });
  }
});

// START SERVER & VITE MIDDLEWARE
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Walimatul Urus Invitation App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

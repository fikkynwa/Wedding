import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// File persistence paths
const WISHES_FILE = path.join(process.cwd(), "wishes_data.json");
const RSVPS_FILE = path.join(process.cwd(), "rsvps_data.json");

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

// In-memory data store with file persistence for RSVPs and Wishes
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

function loadWishes(): Wish[] {
  try {
    if (fs.existsSync(WISHES_FILE)) {
      const content = fs.readFileSync(WISHES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error loading wishes_data.json:", err);
  }
  return [];
}

function saveWishes(data: Wish[]) {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving wishes_data.json:", err);
  }
}

function loadRsvps(): RSVP[] {
  try {
    if (fs.existsSync(RSVPS_FILE)) {
      const content = fs.readFileSync(RSVPS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error loading rsvps_data.json:", err);
  }
  return [];
}

function saveRsvps(data: RSVP[]) {
  try {
    fs.writeFileSync(RSVPS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving rsvps_data.json:", err);
  }
}

const rsvps: RSVP[] = loadRsvps();
const wishes: Wish[] = loadWishes();

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
  saveRsvps(rsvps);

  // If there's a wish attached, add to wishes feed too
  if (wishText && wishText.trim().length > 0) {
    const newWishObj = {
      id: "w-" + Date.now(),
      name,
      relation: "Tetamu Jemputan",
      message: wishText.trim(),
      createdAt: new Date().toISOString(),
      likes: 1,
    };
    wishes.unshift(newWishObj);
    saveWishes(wishes);
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
    likes: 1,
  };

  wishes.unshift(newWish);
  saveWishes(wishes);
  res.json({ success: true, wish: newWish });
});

app.post("/api/wishes/:id/like", (req, res) => {
  const { id } = req.params;
  const wish = wishes.find((w) => w.id === id);
  if (wish) {
    wish.likes += 1;
    saveWishes(wishes);
    return res.json({ success: true, likes: wish.likes });
  }
  res.status(404).json({ error: "Ucapan tidak dijumpai" });
});

app.post("/api/wishes/reset-likes", (req, res) => {
  const { password } = req.body;
  if (!password || password.trim().toUpperCase() !== 'FIKKY') {
    return res.status(403).json({ error: "Kata laluan salah" });
  }
  wishes.forEach((w) => {
    w.likes = 0;
  });
  saveWishes(wishes);
  res.json({ success: true, wishes });
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
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const translatedText = response.text ? response.text.trim() : text;
    res.json({ translatedText });
  } catch (err: any) {
    console.error("Translation API error:", err);
    res.json({ translatedText: req.body.text || "" });
  }
});

// AI Wish Generator Endpoint
app.post("/api/generate-wish", async (req, res) => {
  try {
    const { guestName, relation, tone, language = "Bahasa Melayu", attemptCount = 1 } = req.body;
    if (!guestName) {
      return res.status(400).json({ error: "Sila masukkan nama anda." });
    }

    const nonce = Math.floor(Math.random() * 10000);

    if (!process.env.GEMINI_API_KEY) {
      const msVariations = [
        `Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga ikatan suci ini dikurniakan ketenangan, kasih sayang serta keberkatan hingga ke syurga. Amin YRA!`,
        `Tahniah Akim & Asyiqim! Daripada ${guestName}, selamat pengantin baru. Semoga mahligai perkahwinan yang dibina sentiasa disinari cahaya kebahagiaan, kesabaran, dan persefahaman abadi.`,
        `Setinggi-tinggi tahniah buat Akim & Asyiqim daripada ${guestName}! Semoga bahtera rumah tangga ini dilimpahi sakinah, mawaddah wa rahmah serta dikurniakan zuriat yang soleh dan solehah.`,
        `Dengan rasa penuh kegembiraan, ${guestName} mendoakan agar perkahwinan Akim & Asyiqim senantiasa diberkati Allah SWT. Semoga kalian kekal bahagia bersama hingga ke anak cucu!`,
        `Selamat menempuh alam perkahwinan buat Akim & Asyiqim daripada ${guestName}! Semoga setiap langkah bersama sentiasa dipenuhi tawa, cinta dan rahmat-Nya.`
      ];
      const enVariations = [
        `Warmest congratulations to Akim & Asyiqim from ${guestName}! May Allah bless your sacred union with endless love, peace, and prosperity in this world and the hereafter. Amen!`,
        `Wishing Akim & Asyiqim a lifetime of love and happiness! From ${guestName}, may your marriage be filled with patience, harmony, and joy always.`,
        `Heartfelt congratulations Akim & Asyiqim! From ${guestName}, may your journey together as husband and wife be blessed with endless laughter, wisdom, and eternal togetherness.`,
        `Congratulations on your wedding day, Akim & Asyiqim! Sent with warm wishes by ${guestName}. May your home always be filled with warmth, grace, and divine blessings.`
      ];

      const pool = language === 'English' ? enVariations : msVariations;
      const fallbackWish = pool[(attemptCount + nonce) % pool.length];
      return res.json({ wish: fallbackWish });
    }

    const ai = getAIClient();
    const prompt = `Act as an AI Assistant writing a unique, heartfelt, and culturally rich wedding blessing/wish (Ucapan Perkahwinan & Doa Mempelai) for a wedding invitation.

Details:
- Couple: Muhammad Hakim Bin Mohd Khairi & Najma Asyiqim Binti Muhaizi (Akim & Asyiqim)
- Guest Name: ${guestName}
- Relation to couple: ${relation || "Kawan / Tetamu"}
- Tone desired: ${tone || "Mesra, Hangat, Islamik & Penuh Keberkatan"}
- Output Language: ${language}
- Attempt Number: ${attemptCount} (Variation Seed: ${nonce})

CRITICAL INSTRUCTION:
Generate a completely NEW, UNIQUE, and DISTINCT 2-3 sentence wedding wish.
Do NOT repeat sentence structures, idioms, or phrasing from previous generations. Make the vocabulary fresh, personal, and poetic each time so that clicking "generate" repeatedly gives different wording every single time. Do not wrap in quotes.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const wish = response.text ? response.text.trim().replace(/^["']|["']$/g, "") : "";
    res.json({ wish });
  } catch (err: any) {
    console.error("AI Wish error:", err);
    const { guestName, language } = req.body;
    const isEn = language === 'English';
    const fallbackWish = isEn
      ? `Warmest congratulations Akim & Asyiqim from ${guestName}! May your marriage be filled with peace, love, and divine grace.`
      : `Barakallahu lakuma wa baraka 'alaikuma. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga bahtera perkahwinan yang dibina dilimpahi ketenangan, keberkatan dan kebahagiaan abadi. Amin!`;
    res.json({ wish: fallbackWish });
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

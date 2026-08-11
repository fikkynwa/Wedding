import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send, Heart, User, CheckCircle2, RefreshCw, Trash2, RotateCcw } from 'lucide-react';
import { Wish, LanguageCode } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

interface GuestbookAndAiWishProps {
  currentLang?: LanguageCode;
}

export const GuestbookAndAiWish: React.FC<GuestbookAndAiWishProps> = ({ currentLang = 'ms' }) => {
  const [wishesList, setWishesList] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('Mesra & Hangat');
  const [attemptCount, setAttemptCount] = useState(1);
  
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const isEn = currentLang === 'en';

  // Subscribe to Firebase Firestore wishes collection
  useEffect(() => {
    let unsubscribe: () => void = () => {};

    try {
      const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const firestoreWishes: Wish[] = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              name: data.name || 'Tetamu',
              relation: data.relation || 'Tetamu',
              message: data.message || '',
              createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
              likes: data.likes || 1,
            };
          });

          if (firestoreWishes.length > 0) {
            setWishesList(firestoreWishes);
          } else {
            // Fallback to fetch from /api/wishes or localStorage
            fetchWishes();
          }
        },
        (err) => {
          console.error('Firestore snapshot listener error:', err);
          fetchWishes();
        }
      );
    } catch (err) {
      console.error('Firebase connection error:', err);
      fetchWishes();
    }

    return () => unsubscribe();
  }, []);

  // Fallback fetch
  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.wishes)) {
          const localSaved = JSON.parse(localStorage.getItem('user_wishes') || '[]');
          const merged = [...data.wishes, ...localSaved];
          const unique = Array.from(new Map(merged.map((w) => [w.id, w])).values());
          setWishesList(unique);
          return;
        }
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    }
    const localSaved = JSON.parse(localStorage.getItem('user_wishes') || '[]');
    setWishesList(localSaved);
  };

  // Client-side fallback AI generator with multiple distinct template pools
  const generateLocalAiWish = (guestName: string, rel: string, t: string, count: number) => {
    const msPool = [
      `Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga ikatan suci ini dikurniakan keikhlasan, ketenangan serta dirahmati Allah SWT hingga ke syurga. Amin YRA.`,
      `Tahniah Akim & Asyiqim! Daripada ${guestName}, selamat menempuh alam perkahwinan. Semoga mahligai yang dibina sentiasa disinari cahaya kebahagiaan, kesabaran, dan persefahaman abadi.`,
      `Bunga mawar harum bertaman, disiram embun pagi nan suci. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga mahligai cinta yang dibina sentiasa dilimpahi keberkatan, ketenangan dan kasih sayang abadi.`,
      `Setinggi-tinggi tahniah buat Akim & Asyiqim daripada ${guestName}! Semoga bahtera rumah tangga ini dilimpahi sakinah, mawaddah wa rahmah serta dikurniakan zuriat yang soleh dan solehah.`,
      `Dengan rasa penuh kegembiraan, ${guestName} mendoakan agar perkahwinan Akim & Asyiqim senantiasa diberkati Allah SWT. Semoga kalian kekal bahagia bersama hingga ke akhir hayat!`,
      `Selamat pengantin baru Akim & Asyiqim daripada ${guestName}! Semoga setiap detik perkahwinan kalian dihiasi dengan kegembiraan, rezeki berkadaran dan cinta yang senantiasa mekar.`
    ];

    const enPool = [
      `Warmest congratulations to Akim & Asyiqim from ${guestName}! May Allah bless your sacred union with endless love, peace, and prosperity in this world and the hereafter. Amen!`,
      `Wishing Akim & Asyiqim a lifetime of love and happiness! From ${guestName}, may your marriage be filled with patience, harmony, and joy always.`,
      `Heartfelt congratulations Akim & Asyiqim! From ${guestName}, may your journey together as husband and wife be blessed with endless laughter, wisdom, and eternal togetherness.`,
      `Congratulations on your wedding day, Akim & Asyiqim! Sent with warm wishes by ${guestName}. May your home always be filled with warmth, grace, and divine blessings.`,
      `To Akim & Asyiqim, best wishes on this wonderful journey as you build your new life together. From ${guestName}, may your love grow stronger with each passing day!`
    ];

    const pool = isEn ? enPool : msPool;
    return pool[(count + Math.floor(Math.random() * 3)) % pool.length];
  };

  // AI Wish Generator trigger
  const handleGenerateAiWish = async () => {
    if (!name.trim()) {
      alert(isEn ? 'Please enter your name first for AI to generate a custom wish for you.' : 'Sila masukkan nama anda terlebih dahulu untuk AI menjana ucapan khusus buat anda.');
      return;
    }

    const nextCount = attemptCount + 1;
    setAttemptCount(nextCount);
    setIsGeneratingAi(true);

    try {
      const res = await fetch('/api/generate-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: name.trim(),
          relation,
          tone,
          language: isEn ? 'English' : 'Bahasa Melayu',
          attemptCount: nextCount,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.wish) {
          setMessage(data.wish);
          return;
        }
      }
      // Fallback
      setMessage(generateLocalAiWish(name.trim(), relation, tone, nextCount));
    } catch (err) {
      console.error('AI Wish generation error:', err);
      setMessage(generateLocalAiWish(name.trim(), relation, tone, nextCount));
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Submit Wish
  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMsg = message.trim();
    if (!cleanName || !cleanMsg) return;

    setIsSubmitting(true);

    const wishData = {
      name: cleanName,
      relation: relation || (isEn ? 'Guest' : 'Tetamu'),
      message: cleanMsg,
      createdAt: serverTimestamp(),
      likes: 1,
    };

    // Optimistically update local state immediately
    const tempWishObj: Wish = {
      id: 'w-' + Date.now(),
      name: cleanName,
      relation: relation || (isEn ? 'Guest' : 'Tetamu'),
      message: cleanMsg,
      createdAt: new Date().toISOString(),
      likes: 1,
    };
    setWishesList((prev) => [tempWishObj, ...prev]);

    setMessage('');
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);

    try {
      // Save directly to Firebase Firestore
      await addDoc(collection(db, 'wishes'), wishData);

      // Also backup to API
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          relation,
          message: cleanMsg,
        }),
      });
    } catch (err) {
      console.error('Submit wish Firestore error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Like a wish
  const handleLike = async (id: string) => {
    setWishesList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );

    try {
      if (id && !id.startsWith('w-')) {
        const wishRef = doc(db, 'wishes', id);
        await updateDoc(wishRef, {
          likes: increment(1)
        });
      }
      await fetch(`/api/wishes/${id}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Like wish error:', err);
    }
  };

  return (
    <section id="ucapan" className="py-8 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-8 border border-[#E2D4C3] shadow-xl relative rounded-3xl overflow-hidden"
      >
        {/* Background Flower Vectors */}
        <svg className="absolute -top-6 -left-6 w-40 h-40 text-[#C5A059]/15 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
        </svg>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2C1A0E] uppercase tracking-wider font-bold">
            {isEn ? 'Guestbook & AI Blessings' : 'Buku Ucapan & Doa Restu'}
          </h2>
          <p className="text-xs text-[#5C3A21] font-medium mt-0.5">
            {isEn ? 'Leave your heartfelt prayers and blessings for the bride and groom' : 'Coretkan doa dan titipan harapan mesra buat pengantin'}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>
        </div>

        {/* AI Wish Form Box */}
        <div className="bg-[#F4ECE1] border border-[#E2D4C3] p-4 sm:p-5 mb-8 rounded-2xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2D4C3]">
            <h3 className="font-serif-title text-sm font-bold text-[#2C1A0E] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              {isEn ? 'Write Your Message' : 'Tulis Ucapan Anda'}
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 bg-white text-[#3B2314] border border-[#E2D4C3] flex items-center gap-1 font-bold rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              {isEn ? 'AI Assistant' : 'Pembantu AI'}
            </span>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] text-[#2C1A0E] font-semibold mb-1">
                  {isEn ? 'Your Name *' : 'Nama Anda *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? "E.g. Farhan & Syaza" : "Contoh: Farhan & Syaza"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2D4C3] rounded-lg text-xs text-[#2C1A0E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Relation */}
              <div>
                <label className="block text-[11px] text-[#2C1A0E] font-semibold mb-1">
                  {isEn ? 'Relationship' : 'Hubungan'}
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2D4C3] rounded-lg text-xs text-[#2C1A0E] focus:outline-none focus:border-[#C5A059]"
                >
                  {isEn ? (
                    <>
                      <option value="Friend">Best Friend / Friend</option>
                      <option value="Family">Family Member / Relative</option>
                      <option value="Colleague">Colleague / Business Partner</option>
                      <option value="Teacher">Teacher / Mentor</option>
                      <option value="Neighbor">Neighbor</option>
                      <option value="Guest">Invited Guest</option>
                    </>
                  ) : (
                    <>
                      <option value="Sahabat">Sahabat Handai</option>
                      <option value="Keluarga">Ahli Keluarga / Saudara</option>
                      <option value="Rakan Sekerja">Rakan Sekerja / Bisnes</option>
                      <option value="Guru">Guru / Mentor</option>
                      <option value="Jiran">Jiran Tetangga</option>
                      <option value="Tetamu">Tetamu Jemputan</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* AI Generator Helper Bar */}
            <div className="p-2.5 bg-white rounded-xl border border-[#E2D4C3] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#5C3A21] font-semibold">
                  {isEn ? 'Wish Style:' : 'Gaya Ucapan:'}
                </span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-2 py-0.5 bg-[#F4ECE1] border border-[#E2D4C3] rounded text-xs text-[#2C1A0E]"
                >
                  <option value="Mesra & Hangat">{isEn ? 'Warm & Friendly' : 'Mesra & Hangat'}</option>
                  <option value="Poetik & Berkat">{isEn ? 'Poetic & Blessed' : 'Poetik & Berkat'}</option>
                  <option value="Islamik & Syahdu">{isEn ? 'Islamic & Prayerful' : 'Islamik & Syahdu'}</option>
                  <option value="Santai & Ceria">{isEn ? 'Casual & Cheerful' : 'Santai & Ceria'}</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateAiWish}
                disabled={isGeneratingAi}
                className="px-3 py-1 bg-[#3B2314] hover:bg-[#2C1A0E] text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-xs transition-all disabled:opacity-50 border border-[#C5A059]/40"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-[#C5A059]" />
                    {isEn ? 'Generating...' : 'Menjana...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                    {isEn ? 'Generate Wish with AI' : 'Jana Ucapan dengan AI'}
                  </>
                )}
              </button>
            </div>

            {/* Message Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] text-[#2C1A0E] font-semibold">
                  {isEn ? 'Your Message / Prayer *' : 'Mesej / Doa Anda *'}
                </label>
                {message && (
                  <button
                    type="button"
                    onClick={() => setMessage('')}
                    className="text-[10px] text-red-700 hover:text-red-800 font-semibold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-full border border-red-200 transition-colors shadow-xs"
                    title={isEn ? 'Clear message' : 'Padam mesej'}
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                    <span>{isEn ? 'Clear Wish' : 'Padam Ucapan'}</span>
                  </button>
                )}
              </div>
              <textarea
                required
                rows={3}
                placeholder={isEn ? "Write your wish or click the AI button to generate..." : "Tuliskan doa atau gunakan butang AI..."}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-[#E2D4C3] rounded-lg text-xs text-[#2C1A0E] focus:outline-none focus:border-[#C5A059] leading-relaxed"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-1">
              {submittedSuccess ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isEn ? 'Wish sent successfully!' : 'Ucapan berjaya dihantar!'}
                </span>
              ) : (
                <span className="text-[10px] text-[#7A6250]">
                  {isEn ? 'Wishes are displayed live below.' : 'Ucapan dipaparkan secara langsung.'}
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="px-4 py-1.5 bg-[#5C3A21] hover:bg-[#3B2314] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 border border-[#C5A059]/40"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                {isEn ? 'Send Wish' : 'Hantar Ucapan'}
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Feed */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          <h3 className="font-serif-title text-sm font-bold text-[#2C1A0E] mb-2 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            {isEn ? `Guest Messages (${wishesList.length})` : `Titipan Doa Tetamu (${wishesList.length})`}
          </h3>

          {wishesList.length === 0 ? (
            <p className="text-xs text-center text-[#5C3A21] font-medium py-6 italic border border-dashed border-[#E2D4C3] rounded-2xl bg-[#FAF6F0]">
              {isEn ? 'Be the first guest to leave a blessing for the couple!' : 'Jadilah tetamu pertama untuk memberikan ucapan!'}
            </p>
          ) : (
            wishesList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#F4ECE1] border border-[#E2D4C3] shadow-xs hover:border-[#C5A059] transition-all rounded-2xl"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E2D4C3] flex items-center justify-center text-[10px] font-bold text-[#3B2314]">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#2C1A0E] block leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-[#5C3A21] font-semibold">
                        {item.relation}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1 text-[10px] text-[#3B2314] font-semibold px-2 py-0.5 bg-white border border-[#E2D4C3] rounded-full transition-all hover:bg-[#F4ECE1]"
                  >
                    <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                    <span>{item.likes}</span>
                  </button>
                </div>

                <p className="text-xs text-[#2C1A0E] leading-relaxed font-sans pl-2 border-l-2 border-[#C5A059]">
                  "{item.message}"
                </p>
              </div>
            ))
          )}
        </div>

      </motion.div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send, Heart, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { Wish } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

export const GuestbookAndAiWish: React.FC = () => {
  const [wishesList, setWishesList] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('Mesra & Hangat');
  
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

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
    if (localSaved.length > 0) {
      setWishesList(localSaved);
    }
  };

  // Client-side fallback AI generator
  const generateLocalAiWish = (guestName: string, rel: string, t: string) => {
    if (t === 'Islamik & Syahdu') {
      return `Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga ikatan suci ini dikurniakan keikhlasan, ketenangan serta dirahmati Allah SWT hingga ke syurga. Amin YRA.`;
    } else if (t === 'Poetik & Berkat') {
      return `Bunga mawar harum bertaman, disiram embun pagi nan suci. Tahniah Akim & Asyiqim daripada ${guestName}! Semoga mahligai cinta yang dibina sentiasa dilimpahi keberkatan, ketenangan dan kasih sayang abadi.`;
    } else if (t === 'Santai & Ceria') {
      return `Tahniah Akim & Asyiqim! Daripada ${guestName}, selamat menempuh alam perkahwinan. Semoga sentiasa ceria, bertoleransi, dan sentiasa bahagia bersama selamanya!`;
    } else {
      return `Tahniah Akim & Asyiqim daripada ${guestName}! Selamat pengantin baru. Semoga bahtera rumah tangga yang dibina dilimpahi sakinah, mawaddah wa rahmah serta kebahagiaan berpanjangan. Amin!`;
    }
  };

  // AI Wish Generator trigger
  const handleGenerateAiWish = async () => {
    if (!name.trim()) {
      alert('Sila masukkan nama anda terlebih dahulu untuk AI menjana ucapan khusus buat anda.');
      return;
    }

    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/generate-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: name.trim(),
          relation,
          tone,
          language: 'Bahasa Melayu',
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
      setMessage(generateLocalAiWish(name.trim(), relation, tone));
    } catch (err) {
      console.error('AI Wish generation error:', err);
      setMessage(generateLocalAiWish(name.trim(), relation, tone));
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
      relation: relation || 'Tetamu',
      message: cleanMsg,
      createdAt: serverTimestamp(),
      likes: 1,
    };

    // Optimistically update local state immediately
    const tempWishObj: Wish = {
      id: 'w-' + Date.now(),
      name: cleanName,
      relation: relation || 'Tetamu',
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
    // Optimistic like increment
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
        className="bg-white p-6 sm:p-8 border border-[#E2D4C3] shadow-xl relative rounded-3xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2C1A0E] uppercase tracking-wider font-bold">
            Buku Ucapan &amp; Doa Restu
          </h2>
          <p className="text-xs text-[#5C3A21] font-medium mt-0.5">
            Coretkan doa dan titipan harapan mesra buat pengantin
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>
        </div>

        {/* AI Wish Form Box */}
        <div className="bg-[#F4ECE1] border border-[#E2D4C3] p-4 sm:p-5 mb-8 rounded-2xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E2D4C3]">
            <h3 className="font-serif-title text-sm font-bold text-[#2C1A0E] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C5A059]" />
              Tulis Ucapan Anda
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 bg-white text-[#3B2314] border border-[#E2D4C3] flex items-center gap-1 font-bold rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              Pembantu AI
            </span>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] text-[#2C1A0E] font-semibold mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Farhan &amp; Syaza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2D4C3] rounded-lg text-xs text-[#2C1A0E] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Relation */}
              <div>
                <label className="block text-[11px] text-[#2C1A0E] font-semibold mb-1">
                  Hubungan
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2D4C3] rounded-lg text-xs text-[#2C1A0E] focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="Sahabat">Sahabat Handai</option>
                  <option value="Keluarga">Ahli Keluarga / Saudara</option>
                  <option value="Rakan Sekerja">Rakan Sekerja / Bisnes</option>
                  <option value="Guru">Guru / Mentor</option>
                  <option value="Jiran">Jiran Tetangga</option>
                  <option value="Tetamu">Tetamu Jemputan</option>
                </select>
              </div>
            </div>

            {/* AI Generator Helper Bar */}
            <div className="p-2.5 bg-white rounded-xl border border-[#E2D4C3] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#5C3A21] font-semibold">
                  Gaya Ucapan:
                </span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-2 py-0.5 bg-[#F4ECE1] border border-[#E2D4C3] rounded text-xs text-[#2C1A0E]"
                >
                  <option value="Mesra & Hangat">Mesra &amp; Hangat</option>
                  <option value="Poetik & Berkat">Poetik &amp; Berkat</option>
                  <option value="Islamik & Syahdu">Islamik &amp; Syahdu</option>
                  <option value="Santai & Ceria">Santai &amp; Ceria</option>
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
                    Menjana...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                    Jana Ucapan dengan AI
                  </>
                )}
              </button>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[11px] text-[#2C1A0E] font-semibold mb-1">
                Mesej / Doa Anda *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Tuliskan doa atau gunakan butang AI..."
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
                  Ucapan berjaya dihantar!
                </span>
              ) : (
                <span className="text-[10px] text-[#7A6250]">
                  Ucapan dipaparkan secara langsung.
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="px-4 py-1.5 bg-[#5C3A21] hover:bg-[#3B2314] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 border border-[#C5A059]/40"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                Hantar Ucapan
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Feed */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          <h3 className="font-serif-title text-sm font-bold text-[#2C1A0E] mb-2 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
            Titipan Doa Tetamu ({wishesList.length})
          </h3>

          {wishesList.length === 0 ? (
            <p className="text-xs text-center text-[#5C3A21] font-medium py-4 italic">
              Jadilah tetamu pertama untuk memberikan ucapan!
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

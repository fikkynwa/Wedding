import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send, Heart, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { Wish } from '../types';

export const GuestbookAndAiWish: React.FC = () => {
  const [wishesList, setWishesList] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('Mesra & Hangat');
  
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fetch wishes from server
  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        setWishesList(data.wishes || []);
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

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
        }
      }
    } catch (err) {
      console.error('AI Wish generation error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Submit Wish
  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          relation,
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setMessage('');
        setSubmittedSuccess(true);
        fetchWishes();
        setTimeout(() => setSubmittedSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Submit wish error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Like a wish
  const handleLike = async (id: string) => {
    try {
      const res = await fetch(`/api/wishes/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setWishesList((prev) =>
          prev.map((w) => (w.id === id ? { ...w, likes: data.likes } : w))
        );
      }
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
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm relative rounded-2xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FDF0EE] text-[#D98282] mb-2 border border-[#E8A598]/30">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2D2A26] uppercase tracking-wider font-bold">
            Buku Ucapan &amp; Doa Restu
          </h2>
          <p className="text-xs text-[#2E5A44] font-medium mt-0.5">
            Coretkan doa dan titipan harapan mesra buat pengantin
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-3"></div>
        </div>

        {/* AI Wish Form Box */}
        <div className="bg-[#FAF5F0] border border-[#E2B887]/30 p-4 sm:p-5 mb-8 rounded-xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8A598]/20">
            <h3 className="font-serif-title text-sm font-bold text-[#2D2A26] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D98282]" />
              Tulis Ucapan Anda
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 bg-white text-[#D98282] border border-[#E8A598]/40 flex items-center gap-1 font-bold rounded-full shadow-xs">
              <Sparkles className="w-3 h-3 text-[#D98282]" />
              Pembantu AI
            </span>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block text-[11px] text-[#2D2A26] font-semibold mb-1">
                  Nama Anda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Farhan &amp; Syaza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2B887]/50 rounded-lg text-xs text-[#2D2A26] focus:outline-none focus:border-[#D98282]"
                />
              </div>

              {/* Relation */}
              <div>
                <label className="block text-[11px] text-[#2D2A26] font-semibold mb-1">
                  Hubungan
                </label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-[#E2B887]/50 rounded-lg text-xs text-[#2D2A26] focus:outline-none focus:border-[#D98282]"
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
            <div className="p-2.5 bg-white rounded-lg border border-[#E2B887]/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#2E5A44] font-semibold">
                  Gaya Ucapan:
                </span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="px-2 py-0.5 bg-[#FAF5F0] border border-[#E2B887]/40 rounded text-xs text-[#2D2A26]"
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
                className="px-3 py-1 bg-[#2D2A26] hover:bg-[#4A453E] text-white text-[11px] font-bold rounded-md flex items-center gap-1 shadow-xs transition-all disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-[#E8A598]" />
                    Menjana...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-[#E8A598]" />
                    Jana Ucapan dengan AI
                  </>
                )}
              </button>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[11px] text-[#2D2A26] font-semibold mb-1">
                Mesej / Doa Anda *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Tuliskan doa atau gunakan butang AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-[#E2B887]/50 rounded-lg text-xs text-[#2D2A26] focus:outline-none focus:border-[#D98282] leading-relaxed"
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
                <span className="text-[10px] text-[#8C8478]">
                  Ucapan dipaparkan secara langsung.
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="px-4 py-1.5 bg-[#D98282] hover:bg-[#c66e6e] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                Hantar Ucapan
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Feed */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          <h3 className="font-serif-title text-sm font-bold text-[#2D2A26] mb-2 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#D98282] fill-[#D98282]/30" />
            Titipan Doa Tetamu ({wishesList.length})
          </h3>

          {wishesList.length === 0 ? (
            <p className="text-xs text-center text-[#2E5A44] font-medium py-4 italic">
              Jadilah tetamu pertama untuk memberikan ucapan!
            </p>
          ) : (
            wishesList.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#FAF5F0] border border-[#E2B887]/30 shadow-xs hover:border-[#D98282] transition-all rounded-xl"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FDF0EE] border border-[#E8A598] flex items-center justify-center text-[10px] font-bold text-[#D98282]">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#2D2A26] block leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-[#2E5A44] font-semibold">
                        {item.relation}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1 text-[10px] text-[#D98282] font-semibold px-2 py-0.5 bg-white border border-[#E8A598]/40 rounded-full transition-all hover:bg-[#FDF0EE]"
                  >
                    <Heart className="w-3 h-3 text-[#D98282] fill-[#D98282]" />
                    <span>{item.likes}</span>
                  </button>
                </div>

                <p className="text-xs text-[#2D2A26] leading-relaxed font-sans pl-2 border-l-2 border-[#D98282]">
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

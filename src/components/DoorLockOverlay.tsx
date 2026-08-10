import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, KeyRound, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

interface DoorLockOverlayProps {
  isUnlocked: boolean;
  onStartMusic: () => void;
  onUnlock: () => void;
}

export const DoorLockOverlay: React.FC<DoorLockOverlayProps> = ({
  isUnlocked,
  onStartMusic,
  onUnlock,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  // Prevent background scrolling while door is locked
  useEffect(() => {
    if (!isUnlocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isUnlocked]);

  const handleUnlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpening || isUnlocked) return;

    // 1. Immediately start audio in user gesture call stack
    onStartMusic();

    // 2. Trigger door opening animation
    setIsOpening(true);

    // 3. Complete unlock in parent state after door opens
    setTimeout(() => {
      onUnlock();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          key="door-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.3 } }}
          className="fixed inset-0 sm:max-w-[430px] sm:mx-auto z-50 overflow-hidden flex items-center justify-center bg-[#2D2A26] h-[100dvh] w-full cursor-pointer select-none"
          onClick={handleUnlockClick}
          style={{ perspective: '1200px' }}
        >
          {/* Left Door Panel */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? { x: '-102%', rotateY: -40, opacity: 0.9 }
                : { x: 0, rotateY: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EA] to-[#FDF0EE] border-r-2 border-[#E8A598] shadow-2xl flex flex-col justify-between p-6 z-20 origin-left"
          >
            {/* Left Door Carvings & Decorative Framing */}
            <div className="absolute inset-3 border border-[#E8A598]/40 pointer-events-none flex flex-col justify-between p-4">
              <div className="w-8 h-8 border-t-2 border-l-2 border-[#D98282]"></div>
              <div className="text-center opacity-70">
                <p className="font-serif-title text-2xl text-[#D98282]">🌸</p>
              </div>
              <div className="w-8 h-8 border-b-2 border-l-2 border-[#D98282]"></div>
            </div>

            {/* Door Header Inscription */}
            <div className="pt-8 text-left pl-2">
              <span className="text-[10px] tracking-[0.25em] text-[#C05621] uppercase font-bold block">
                UNDANGAN
              </span>
              <span className="text-xs font-serif-title text-[#2D2A26] italic font-medium">
                Akim &amp; Asyiqim
              </span>
            </div>

            {/* Half Arch Motif */}
            <div className="w-full flex justify-end pr-2 opacity-30">
              <div className="w-20 h-36 border-t-2 border-r-2 border-[#E8A598] rounded-tr-full"></div>
            </div>

            {/* Bottom Footer Motif */}
            <div className="pb-8 pl-2">
              <span className="text-[9px] text-[#2E5A44] font-semibold tracking-widest uppercase">
                03 • 10 • 2026
              </span>
            </div>
          </motion.div>

          {/* Right Door Panel */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? { x: '102%', rotateY: 40, opacity: 0.9 }
                : { x: 0, rotateY: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EA] to-[#FDF0EE] border-l-2 border-[#E8A598] shadow-2xl flex flex-col justify-between p-6 z-20 origin-right"
          >
            {/* Right Door Carvings & Decorative Framing */}
            <div className="absolute inset-3 border border-[#E8E2D6] pointer-events-none flex flex-col justify-between p-4">
              <div className="w-8 h-8 border-t-2 border-r-2 border-[#D98282] self-end"></div>
              <div className="text-center opacity-70">
                <p className="font-serif-title text-2xl text-[#D98282]">🌸</p>
              </div>
              <div className="w-8 h-8 border-b-2 border-r-2 border-[#D98282] self-end"></div>
            </div>

            {/* Door Header Inscription */}
            <div className="pt-8 text-right pr-2">
              <span className="text-[10px] tracking-[0.25em] text-[#C05621] uppercase font-bold block">
                MAJLIS
              </span>
              <span className="text-xs font-serif-title text-[#2D2A26] italic font-medium">
                Walimatul Urus
              </span>
            </div>

            {/* Half Arch Motif */}
            <div className="w-full flex justify-start pl-2 opacity-30">
              <div className="w-20 h-36 border-t-2 border-l-2 border-[#E8A598] rounded-tl-full"></div>
            </div>

            {/* Bottom Footer Motif */}
            <div className="pb-8 text-right pr-2">
              <span className="text-[9px] text-[#2E5A44] font-semibold tracking-widest uppercase">
                PERAK, MY
              </span>
            </div>
          </motion.div>

          {/* Center Lock Badge & Interactive Trigger */}
          <motion.div
            animate={isOpening ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-30 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Soft Glow Ambient Ring */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute w-44 h-44 rounded-full bg-[#C4B49D]/30 blur-2xl pointer-events-none"
            ></motion.div>

            {/* Top Bismillah / Salutation */}
            <div className="mb-6 space-y-1.5">
              <p className="font-arabic text-2xl text-[#2D2A26] leading-relaxed">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <div className="w-12 h-px bg-[#C4B49D] mx-auto my-1"></div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8C7A5E] font-semibold">
                WALIMATUL URUS
              </p>
              <h2 className="font-serif-title text-2xl text-[#2D2A26] font-normal">
                {WEDDING_DETAILS.groomNameShort} &amp; {WEDDING_DETAILS.brideNameShort}
              </h2>
            </div>

            {/* Lock Button Component */}
            <button
              onClick={handleUnlockClick}
              className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 transition-all duration-300 transform active:scale-90 hover:scale-105 ${
                isOpening
                  ? 'bg-[#2D2A26] text-[#FCFAF7] border-[#C4B49D]'
                  : 'bg-white text-[#2D2A26] border-[#C4B49D] hover:border-[#2D2A26]'
              }`}
            >
              {/* Decorative Ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#C4B49D]"></div>

              {isOpening ? (
                <Unlock className="w-8 h-8 text-[#C4B49D] animate-bounce" />
              ) : (
                <Lock className="w-8 h-8 text-[#8C7A5E]" />
              )}
            </button>

            {/* Instructions */}
            <div className="mt-6 space-y-1.5 max-w-[240px]">
              <p className="text-xs font-semibold text-[#2D2A26] tracking-wide flex items-center justify-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#8C7A5E]" />
                {isOpening ? 'Membuka Pintu Majlis...' : 'Tekan Kunci Untuk Membuka'}
              </p>
              <p className="text-[11px] text-[#8C8478] leading-tight font-medium">
                Ketuk pintu atau tekan ikon kunci untuk membuka gerbang undangan &amp; memainkan alunan muzik.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


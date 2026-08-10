import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';
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
  const [recipientName, setRecipientName] = useState('Tetamu Kehormat');

  useEffect(() => {
    // Read recipient name from URL parameter e.g., ?to=Encik+Ahmad
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to') || urlParams.get('name');
    if (toParam) {
      setRecipientName(toParam);
    }
  }, []);

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
          className="fixed inset-0 sm:max-w-[430px] sm:mx-auto z-50 overflow-hidden flex items-center justify-center bg-[#3B2314] h-[100dvh] w-full cursor-pointer select-none"
          onClick={handleUnlockClick}
          style={{ perspective: '1200px' }}
        >
          {/* Left Panel */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? { x: '-102%', rotateY: -35, opacity: 0.9 }
                : { x: 0, rotateY: 0 }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#3B2314] border-r border-[#C5A059]/40 shadow-2xl flex flex-col justify-between p-6 z-20 origin-left"
          >
            {/* Corner Botanical SVG Decor */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C5A059]/60 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C5A059]/60 pointer-events-none"></div>

            <div className="pt-8 pl-2">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold block">
                UNDANGAN MAJLIS
              </span>
              <span className="text-xs font-serif-title text-white italic font-light">
                Walimatul Urus
              </span>
            </div>

            <div className="text-center opacity-30">
              <span className="font-arabic text-3xl text-[#C5A059]">﷽</span>
            </div>

            <div className="pb-8 pl-2">
              <span className="text-[9px] text-[#CBBBAA] tracking-widest uppercase block">
                {WEDDING_DETAILS.dateFull}
              </span>
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={{ x: 0, rotateY: 0 }}
            animate={
              isOpening
                ? { x: '102%', rotateY: 35, opacity: 0.9 }
                : { x: 0, rotateY: 0 }
            }
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#3B2314] border-l border-[#C5A059]/40 shadow-2xl flex flex-col justify-between p-6 z-20 origin-right"
          >
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C5A059]/60 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C5A059]/60 pointer-events-none"></div>

            <div className="pt-8 text-right pr-2">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold block">
                MEMPELAI
              </span>
              <span className="text-xs font-serif-title text-white italic font-light">
                Akim &amp; Asyiqim
              </span>
            </div>

            <div className="text-center opacity-30">
              <Heart className="w-6 h-6 mx-auto text-[#C5A059]" />
            </div>

            <div className="pb-8 text-right pr-2">
              <span className="text-[9px] text-[#CBBBAA] tracking-widest uppercase block">
                {WEDDING_DETAILS.locationName}
              </span>
            </div>
          </motion.div>

          {/* Center Envelope & Wax Seal Card */}
          <motion.div
            animate={isOpening ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-[320px] w-full"
          >
            {/* Gold Arch Envelope Card Frame */}
            <div className="w-full bg-[#2C1A0E]/95 backdrop-blur-md rounded-2xl border border-[#C5A059]/50 p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#C5A059]/10 blur-xl pointer-events-none"></div>
              
              {/* Monogram Circle */}
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#5C3A21] to-[#3B2314] border border-[#C5A059] flex items-center justify-center shadow-inner">
                <span className="font-serif-title text-lg text-[#C5A059] font-semibold tracking-wider">
                  H &amp; A
                </span>
              </div>

              {/* Title */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                  UNDANGAN PERKAHWINAN
                </p>
                <h1 className="font-serif-title text-2xl text-white font-normal mt-0.5">
                  Hakim &amp; Asyiqim
                </h1>
              </div>

              <div className="w-12 h-px bg-[#C5A059]/40 mx-auto"></div>

              {/* Recipient Name Display */}
              <div className="bg-[#3B2314]/80 rounded-xl p-3 border border-[#C5A059]/30">
                <p className="text-[10px] text-[#CBBBAA] uppercase tracking-wider mb-0.5">
                  Kepada YBhg. Dato'/Datin/Tuan/Puan/Encik/Cik:
                </p>
                <p className="font-serif-title text-sm text-white font-medium capitalize truncate">
                  {recipientName}
                </p>
              </div>

              {/* Open Button (Jemputan.me Wax Seal Button Style) */}
              <button
                onClick={handleUnlockClick}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B76E] to-[#A37E3A] text-[#2C1A0E] font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#2C1A0E]" />
                {isOpening ? 'Membuka Undangan...' : 'Buka Undangan'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



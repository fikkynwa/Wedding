import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Globe } from 'lucide-react';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { WEDDING_DETAILS } from '../data';
import { LanguageCode } from '../types';

interface DoorLockOverlayProps {
  isUnlocked: boolean;
  onStartMusic: () => void;
  onUnlock: () => void;
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
}

export const DoorLockOverlay: React.FC<DoorLockOverlayProps> = ({
  isUnlocked,
  onStartMusic,
  onUnlock,
  currentLang,
  onSelectLang,
}) => {
  const doorTexts = {
    ms: {
      invitationLabel: 'UNDANGAN PERKAHWINAN',
      subtext: 'Walimatul Urus',
      toLabel: "Kepada YBhg. Dato'/Datin/Tuan/Puan/Encik/Cik:",
      openBtn: 'Buka Undangan',
      openingBtn: 'Membuka Undangan...',
      groomBride: 'MEMPELAI',
      defaultGuest: 'Tetamu Kehormat',
    },
    en: {
      invitationLabel: 'WEDDING INVITATION',
      subtext: 'Wedding Celebration',
      toLabel: 'Cordially Invited:',
      openBtn: 'Open Invitation',
      openingBtn: 'Opening Invitation...',
      groomBride: 'THE BRIDE & GROOM',
      defaultGuest: 'Honored Guest',
    },
  };

  const currentTexts = doorTexts[currentLang] || doorTexts.ms;

  const [isOpening, setIsOpening] = useState(false);
  const [recipientName, setRecipientName] = useState(currentTexts.defaultGuest);

  // Interactive Likes & Restu State
  const [likesCount, setLikesCount] = useState<number>(() => {
    const saved = localStorage.getItem('wedding_likes_count');
    return saved ? parseInt(saved, 10) : 238;
  });
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    // Read recipient name from URL parameter e.g., ?to=Encik+Ahmad
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to') || urlParams.get('name');
    if (toParam) {
      setRecipientName(toParam);
    } else {
      setRecipientName(currentTexts.defaultGuest);
    }
  }, [currentLang]);

  // Sync likes across tabs, windows, and Firebase Firestore
  useEffect(() => {
    // 1. Firebase Firestore real-time subscription
    let unsubscribe = () => {};
    try {
      const statsRef = doc(db, 'stats', 'door_likes');
      unsubscribe = onSnapshot(
        statsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (typeof data.count === 'number') {
              setLikesCount((prev) => Math.max(prev, data.count));
              localStorage.setItem('wedding_likes_count', String(data.count));
            }
          }
        },
        (err) => {
          console.error('Door likes snapshot error:', err);
        }
      );
    } catch (e) {
      console.error('Firebase snapshot setup failed:', e);
    }

    // 2. Local storage event listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'wedding_likes_count' && e.newValue) {
        setLikesCount(parseInt(e.newValue, 10));
      }
    };
    window.addEventListener('storage', handleStorage);

    let channel: BroadcastChannel | null = null;
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel('wedding_likes_sync');
      channel.onmessage = (event) => {
        if (event.data?.type === 'LIKE_UPDATE' && typeof event.data.count === 'number') {
          setLikesCount(event.data.count);
        }
      };
    }

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorage);
      if (channel) channel.close();
    };
  }, []);

  const handleHeartLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening envelope when tapping heart

    setLikesCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem('wedding_likes_count', String(newCount));

      if ('BroadcastChannel' in window) {
        try {
          const channel = new BroadcastChannel('wedding_likes_sync');
          channel.postMessage({ type: 'LIKE_UPDATE', count: newCount });
          channel.close();
        } catch (err) {
          // Fallback
        }
      }
      return newCount;
    });

    // Write / increment in Firebase Firestore
    try {
      const statsRef = doc(db, 'stats', 'door_likes');
      setDoc(statsRef, { count: increment(1) }, { merge: true }).catch((err) => {
        console.error('Failed to increment door likes in Firestore:', err);
      });
    } catch (err) {
      console.error('Firestore setDoc error:', err);
    }

    // Spawn floating particle animation
    const id = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 36;
    setFloatingHearts((prev) => [...prev.slice(-10), { id, x: randomX }]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 850);
  };

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

  const handleUnlockClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isOpening || isUnlocked) return;

    // 1. Immediately start audio in user gesture call stack without delay
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
            className="absolute top-0 left-0 w-1/2 h-full bg-[#3B2314] border-r border-[#C5A059]/40 shadow-2xl flex flex-col justify-between p-6 z-20 origin-left overflow-hidden"
          >
            {/* Corner Flower Vector Top Left */}
            <svg className="absolute -top-2 -left-2 w-32 h-32 text-[#C5A059]/50 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.12" strokeWidth="1" />
              <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="1" />
              <circle cx="15" cy="15" r="4" fill="currentColor" />
              <circle cx="35" cy="22" r="2.5" fill="currentColor" />
              <circle cx="22" cy="35" r="2.5" fill="currentColor" />
              <path d="M0 40 Q25 35 45 60 T80 80" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <path d="M40 0 Q35 25 60 45 T80 80" stroke="currentColor" strokeWidth="1.2" />
            </svg>

            {/* Corner Flower Vector Bottom Left */}
            <svg className="absolute -bottom-2 -left-2 w-32 h-32 text-[#C5A059]/50 pointer-events-none rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.12" strokeWidth="1" />
              <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="1" />
              <circle cx="15" cy="15" r="4" fill="currentColor" />
              <circle cx="35" cy="22" r="2.5" fill="currentColor" />
              <circle cx="22" cy="35" r="2.5" fill="currentColor" />
            </svg>

            {/* Corner Botanical SVG Decor Frame */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C5A059]/60 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C5A059]/60 pointer-events-none"></div>

            <div className="pt-8 pl-2 relative z-10">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold block">
                {currentTexts.invitationLabel}
              </span>
              <span className="text-xs font-serif-title text-white italic font-light">
                {currentTexts.subtext}
              </span>
            </div>

            <div className="text-center opacity-80 relative z-10">
              <div className="w-9 h-9 mx-auto rounded-full bg-[#2C1A0E] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif-title text-xs font-bold tracking-wider shadow-inner">
                A&amp;A
              </div>
            </div>

            <div className="pb-8 pl-2 relative z-10">
              <span className="text-[9px] text-[#CBBBAA] tracking-widest uppercase block">
                {currentLang === 'en' ? WEDDING_DETAILS.dateFullEn : WEDDING_DETAILS.dateFull}
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
            className="absolute top-0 right-0 w-1/2 h-full bg-[#3B2314] border-l border-[#C5A059]/40 shadow-2xl flex flex-col justify-between p-6 z-20 origin-right overflow-hidden"
          >
            {/* Corner Flower Vector Top Right */}
            <svg className="absolute -top-2 -right-2 w-32 h-32 text-[#C5A059]/50 pointer-events-none -scale-x-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.12" strokeWidth="1" />
              <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="1" />
              <circle cx="15" cy="15" r="4" fill="currentColor" />
              <circle cx="35" cy="22" r="2.5" fill="currentColor" />
              <circle cx="22" cy="35" r="2.5" fill="currentColor" />
              <path d="M0 40 Q25 35 45 60 T80 80" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
              <path d="M40 0 Q35 25 60 45 T80 80" stroke="currentColor" strokeWidth="1.2" />
            </svg>

            {/* Corner Flower Vector Bottom Right */}
            <svg className="absolute -bottom-2 -right-2 w-32 h-32 text-[#C5A059]/50 pointer-events-none -scale-x-100 rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.12" strokeWidth="1" />
              <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="1" />
              <circle cx="15" cy="15" r="4" fill="currentColor" />
              <circle cx="35" cy="22" r="2.5" fill="currentColor" />
              <circle cx="22" cy="35" r="2.5" fill="currentColor" />
            </svg>

            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C5A059]/60 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C5A059]/60 pointer-events-none"></div>

            <div className="pt-8 text-right pr-2 relative z-10">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-semibold block">
                {currentTexts.groomBride}
              </span>
              <span className="text-xs font-serif-title text-white italic font-light">
                {WEDDING_DETAILS.groomNameShort} &amp; {WEDDING_DETAILS.brideNameShort}
              </span>
            </div>

            <div className="text-center opacity-30 relative z-10">
              <Heart className="w-6 h-6 mx-auto text-[#C5A059]" />
            </div>

            <div className="pb-8 text-right pr-2 relative z-10">
              <span className="text-[9px] text-[#CBBBAA] tracking-widest uppercase block">
                {WEDDING_DETAILS.locationName}
              </span>
            </div>
          </motion.div>

          {/* Center Envelope & Wax Seal Card */}
          <motion.div
            animate={isOpening ? { scale: 0.85, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-30 flex flex-col items-center justify-center text-center px-6 max-w-[340px] w-full"
          >
            {/* Gold Arch Envelope Card Frame */}
            <div className="w-full bg-[#2C1A0E]/95 backdrop-blur-md rounded-2xl border border-[#C5A059]/50 p-6 shadow-2xl text-center space-y-3.5 relative overflow-hidden">
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-[#C5A059]/10 blur-xl pointer-events-none"></div>

              {/* Decorative Flower Vector Accents inside Envelope */}
              <svg className="absolute -top-3 -right-3 w-20 h-20 text-[#C5A059]/30 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.1" />
                <path d="M50 10 C60 30 70 40 90 50 C70 60 60 70 50 90 C40 70 30 60 10 50 C30 40 40 30 50 10 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
                <path d="M20 20 C40 35 35 40 50 50 C40 60 35 65 20 80 C35 60 40 65 50 50 C60 35 65 40 80 20" stroke="currentColor" strokeWidth="0.8" />
              </svg>
              <svg className="absolute -bottom-3 -left-3 w-20 h-20 text-[#C5A059]/30 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.1" />
                <path d="M50 10 C60 30 70 40 90 50 C70 60 60 70 50 90 C40 70 30 60 10 50 C30 40 40 30 50 10 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
              </svg>
              
              {/* Language Chooser Pill Switcher on Initial Screen */}
              <div
                className="inline-flex items-center justify-center p-1 bg-[#1A0E07] border border-[#C5A059]/50 rounded-full shadow-inner mx-auto mb-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onSelectLang('ms')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                      currentLang === 'ms'
                        ? 'bg-gradient-to-r from-[#C5A059] to-[#D8B76E] text-[#2C1A0E] shadow-sm'
                        : 'text-[#CBBBAA] hover:text-white'
                    }`}
                  >
                    <span>🇲🇾</span>
                    <span>Bahasa Melayu</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectLang('en')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                      currentLang === 'en'
                        ? 'bg-gradient-to-r from-[#C5A059] to-[#D8B76E] text-[#2C1A0E] shadow-sm'
                        : 'text-[#CBBBAA] hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                </div>
              </div>

              {/* Monogram Circle */}
              <div className="w-13 h-13 mx-auto rounded-full bg-gradient-to-tr from-[#5C3A21] to-[#3B2314] border border-[#C5A059] flex items-center justify-center shadow-inner">
                <span className="font-serif-title text-base text-[#C5A059] font-semibold tracking-wider">
                  A &amp; A
                </span>
              </div>

              {/* Title */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                  {currentTexts.invitationLabel}
                </p>
                <h1 className="font-serif-title text-2xl text-white font-normal mt-0.5">
                  {WEDDING_DETAILS.groomNameShort} &amp; {WEDDING_DETAILS.brideNameShort}
                </h1>
              </div>

              <div className="w-12 h-px bg-[#C5A059]/40 mx-auto"></div>

              {/* Recipient Name Display */}
              <div className="bg-[#3B2314]/80 rounded-xl p-2.5 border border-[#C5A059]/30">
                <p className="text-[10px] text-[#CBBBAA] uppercase tracking-wider mb-0.5">
                  {currentTexts.toLabel}
                </p>
                <p className="font-serif-title text-sm text-white font-medium capitalize truncate">
                  {recipientName}
                </p>
              </div>

              {/* Date & Full Address Box */}
              <div className="bg-[#1A0E07]/90 rounded-xl p-3 border border-[#C5A059]/40 space-y-1.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[#C5A059] text-[11px] font-semibold tracking-wider uppercase font-serif-title">
                  <span>{currentLang === 'en' ? WEDDING_DETAILS.dateFullEn : WEDDING_DETAILS.dateFull}</span>
                </div>
                <div className="w-10 h-px bg-[#C5A059]/30 mx-auto"></div>
                <p className="text-[11px] text-[#E8D09E] leading-snug font-sans px-1 font-medium">
                  {WEDDING_DETAILS.locationName}
                </p>
              </div>

              {/* Open Button (Jemputan.me Wax Seal Button Style) */}
              <button
                onClick={handleUnlockClick}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#C5A059] via-[#D8B76E] to-[#A37E3A] text-[#2C1A0E] font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#2C1A0E]" />
                {isOpening ? currentTexts.openingBtn : currentTexts.openBtn}
              </button>
            </div>

            {/* Interactive Heart Likes & Restu Counter */}
            <div
              onClick={handleHeartLike}
              className="mt-4 relative flex flex-col items-center justify-center gap-1.5 cursor-pointer group select-none"
            >
              {/* Floating Hearts Particles */}
              <div className="absolute -top-12 pointer-events-none flex items-center justify-center w-full h-12 overflow-visible">
                <AnimatePresence>
                  {floatingHearts.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 1, y: 10, scale: 0.8, x: item.x }}
                      animate={{ opacity: 0, y: -42, scale: 1.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute flex items-center gap-1 text-[#E8D09E] font-bold text-xs drop-shadow-md"
                    >
                      <Heart className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
                      <span>+1</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Heart Button Vector with Gold Rays */}
              <div className="flex items-center justify-center gap-3 text-[#C5A059]">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#C5A059]"></div>
                <motion.div
                  whileTap={{ scale: 0.82 }}
                  whileHover={{ scale: 1.12 }}
                  className="p-2.5 rounded-full bg-[#2C1A0E] border-2 border-[#C5A059] shadow-xl flex items-center justify-center group-hover:border-[#E8D09E] group-hover:bg-[#3B2314] transition-all"
                >
                  <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059] group-hover:text-[#E8D09E] transition-colors" />
                </motion.div>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#C5A059]"></div>
              </div>

              {/* Count Only */}
              <div className="text-center">
                <span className="text-xs font-bold text-[#E8D09E] tracking-wider block font-serif-title">
                  {likesCount.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};




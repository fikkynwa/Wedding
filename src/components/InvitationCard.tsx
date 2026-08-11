import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

interface InvitationCardProps {
  onScrollToDetails: () => void;
  onOpenEnvelope?: () => void;
  isOpen: boolean;
  translatedTitle?: string;
  translatedSubtitle?: string;
  currentLang?: string;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  onScrollToDetails,
  onOpenEnvelope,
  isOpen,
  translatedTitle,
  translatedSubtitle,
  currentLang = 'ms',
}) => {
  const isEn = currentLang === 'en';

  return (
    <section id="jemputan" className="relative min-h-[80vh] flex items-center justify-center py-6 px-4 overflow-hidden">
      
      {/* Outer Floral Card with Warm Brown Framing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-xl mx-auto bg-white border border-[#E2D4C3] shadow-xl p-8 sm:p-12 text-center rounded-3xl overflow-hidden"
      >
        {/* Top Gold Arch Accent */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#3B2314] via-[#C5A059] to-[#3B2314]"></div>

        {/* Background Flower Vectors */}
        <svg className="absolute -top-4 -left-4 w-40 h-40 text-[#C5A059]/20 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
          <circle cx="35" cy="22" r="2.5" fill="currentColor" />
          <circle cx="22" cy="35" r="2.5" fill="currentColor" />
        </svg>

        <svg className="absolute -bottom-4 -right-4 w-40 h-40 text-[#C5A059]/20 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
          <circle cx="35" cy="22" r="2.5" fill="currentColor" />
          <circle cx="22" cy="35" r="2.5" fill="currentColor" />
        </svg>

        {/* Botanical Gold Corner Decor */}
        <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none"></div>

        {/* Card Content */}
        <div className="relative z-10">
          
          {/* Bismillah Calligraphy Header */}
          <div className="mb-4">
            <span className="font-arabic text-2xl sm:text-3xl text-[#3B2314] leading-relaxed block">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-4"></div>

          <p className="text-[11px] sm:text-xs tracking-[0.3em] text-[#C5A059] uppercase font-sans font-bold mb-1">
            {translatedTitle || "WALIMATUL URUS"}
          </p>
          <p className="text-xs sm:text-sm font-serif-title italic text-[#5C3A21] font-medium mb-6">
            {translatedSubtitle || "Undangan Majlis Perkahwinan"}
          </p>

          {/* Couple Names - Separated on New Lines with Clear & Symbol */}
          <div className="my-6 space-y-1">
            <h1 className="font-serif-title text-4xl sm:text-5xl text-[#2C1A0E] font-semibold tracking-wide">
              {WEDDING_DETAILS.groomNameShort}
            </h1>
            <div className="font-serif-title italic font-normal text-3xl sm:text-4xl text-[#C5A059] py-1">
              &amp;
            </div>
            <h1 className="font-serif-title text-4xl sm:text-5xl text-[#2C1A0E] font-semibold tracking-wide">
              {WEDDING_DETAILS.brideNameShort}
            </h1>
          </div>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-6"></div>

          {/* Date Banner Section - Benchmark Font */}
          <div className="max-w-xs mx-auto py-3.5 px-6 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner my-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-serif-title font-bold mb-1.5">
              {WEDDING_DETAILS.monthYear}
            </p>
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="text-xs font-serif-title font-bold tracking-widest text-[#5C3A21] uppercase">
                {WEDDING_DETAILS.dayName}
              </span>
              <div className="h-6 w-px bg-[#C5A059]"></div>
              <span className="font-serif-title text-3xl sm:text-4xl font-bold text-[#2C1A0E] tracking-tight">
                {WEDDING_DETAILS.dayNumber}
              </span>
              <div className="h-6 w-px bg-[#C5A059]"></div>
              <span className="text-xs font-serif-title font-bold tracking-widest text-[#5C3A21]">
                2026
              </span>
            </div>
          </div>

          {/* Full Location Badge */}
          <div className="mt-6 flex items-start justify-center gap-2 text-xs sm:text-sm text-[#3B2314] font-serif-title tracking-wide font-medium max-w-sm mx-auto leading-relaxed">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
            <span>{WEDDING_DETAILS.address}</span>
          </div>

          <div className="mt-8 pt-2">
            {!isOpen && onOpenEnvelope ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEnvelope}
                className="px-8 py-3 bg-gradient-to-r from-[#3B2314] to-[#5C3A21] text-white font-serif-title font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-lg hover:brightness-110 transition-all flex items-center gap-2 mx-auto rounded-full border border-[#C5A059]"
              >
                <Heart className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                {isEn ? 'Open Invitation Card' : 'Buka Kad Undangan'}
              </motion.button>
            ) : (
              <button
                onClick={onScrollToDetails}
                className="group text-[#5C3A21] hover:text-[#2C1A0E] transition-colors flex flex-col items-center mx-auto text-sm font-medium"
              >
                <span className="mb-1 font-serif-title font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm text-[#C5A059]">
                  {isEn ? 'View Event Details' : 'Lihat Butiran Majlis'}
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#C5A059]" />
              </button>
            )}
          </div>

        </div>

      </motion.div>

    </section>
  );
};


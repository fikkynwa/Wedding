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
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  onScrollToDetails,
  onOpenEnvelope,
  isOpen,
  translatedTitle,
  translatedSubtitle,
}) => {
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

        {/* Botanical Gold Corner Decor */}
        <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#C5A059]/70 pointer-events-none"></div>
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]/70 pointer-events-none"></div>

        {/* Card Content */}
        <div className="relative z-10">
          
          {/* Bismillah Calligraphy Header */}
          <div className="mb-4">
            <span className="font-arabic text-2xl text-[#3B2314] leading-relaxed block">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto mb-4"></div>

          <p className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase font-sans font-semibold mb-1">
            {translatedTitle || "WALIMATUL URUS"}
          </p>
          <p className="text-xs font-serif-title italic text-[#5C3A21] font-medium mb-6">
            {translatedSubtitle || "Undangan Majlis Perkahwinan"}
          </p>

          {/* Couple Names in Calligraphic Serif Typography */}
          <div className="my-6 space-y-1">
            <h1 className="font-serif-title text-4xl sm:text-5xl text-[#2C1A0E] font-semibold tracking-wide">
              {WEDDING_DETAILS.groomNameShort}
            </h1>
            <div className="font-script text-4xl text-[#C5A059] py-1">&amp;</div>
            <h1 className="font-serif-title text-4xl sm:text-5xl text-[#2C1A0E] font-semibold tracking-wide">
              {WEDDING_DETAILS.brideNameShort}
            </h1>
          </div>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-6"></div>

          {/* Date Banner Section matching Jemputan.me Warm Brown style */}
          <div className="max-w-xs mx-auto py-3 px-6 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner my-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5C3A21] font-bold mb-1">
              {WEDDING_DETAILS.monthYear}
            </p>
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="text-xs font-semibold tracking-widest text-[#5C3A21] uppercase">
                {WEDDING_DETAILS.dayName}
              </span>
              <div className="h-6 w-px bg-[#C5A059]"></div>
              <span className="font-serif-title text-3xl font-bold text-[#2C1A0E] tracking-tight">
                {WEDDING_DETAILS.dayNumber}
              </span>
              <div className="h-6 w-px bg-[#C5A059]"></div>
              <span className="text-xs font-semibold tracking-widest text-[#5C3A21]">
                2026
              </span>
            </div>
          </div>

          {/* Quick Location Badge */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#5C3A21] font-sans tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="font-medium">Felda Trolak Selatan, Sungkai, Perak</span>
          </div>

          <div className="mt-8 pt-2">
            {!isOpen && onOpenEnvelope ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEnvelope}
                className="px-8 py-3 bg-gradient-to-r from-[#3B2314] to-[#5C3A21] text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-lg hover:brightness-110 transition-all flex items-center gap-2 mx-auto rounded-full border border-[#C5A059]"
              >
                <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                Buka Kad Undangan
              </motion.button>
            ) : (
              <button
                onClick={onScrollToDetails}
                className="group text-[#5C3A21] hover:text-[#2C1A0E] transition-colors flex flex-col items-center mx-auto text-xs font-medium"
              >
                <span className="mb-1 font-sans font-semibold tracking-[0.15em] uppercase text-[10px] text-[#C5A059]">
                  Lihat Butiran Majlis
                </span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#5C3A21]" />
              </button>
            )}
          </div>

        </div>

      </motion.div>

    </section>
  );
};


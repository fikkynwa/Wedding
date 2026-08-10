import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Heart, ChevronDown } from 'lucide-react';
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
    <section id="jemputan" className="relative min-h-[85vh] flex items-center justify-center py-8 px-4 overflow-hidden">
      
      {/* Outer Card with Clean Minimalism Framing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-[#FAF5F0] to-[#FDF4F5] border border-[#E8A598]/40 shadow-lg p-8 sm:p-12 text-center rounded-2xl"
      >
        {/* Colorful Corner Accent Lines */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D98282]"></div>
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D98282]"></div>
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D98282]"></div>
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#D98282]"></div>

        {/* Card Content */}
        <div className="relative z-10">
          
          {/* Subtle Icon Badge */}
          <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-[#E8A598] flex items-center justify-center bg-[#FDF0EE] shadow-sm">
            <Heart className="w-5 h-5 text-[#D98282] fill-[#E8A598]/40" />
          </div>

          <p className="text-xs tracking-[0.3em] text-[#C05621] uppercase font-sans font-bold mb-2">
            {translatedTitle || "WALIMATUL URUS"}
          </p>
          <p className="text-sm font-serif-title italic text-[#2D2A26] mb-6 font-medium">
            {translatedSubtitle || "Undangan Majlis Perkahwinan"}
          </p>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-6"></div>

          {/* Couple Names in Calligraffitti Typography */}
          <div className="my-8 space-y-2">
            <h1 className="font-calligraffitti text-4xl sm:text-6xl text-[#2D2A26] font-bold tracking-wide">
              {WEDDING_DETAILS.groomNameShort}
            </h1>
            <div className="font-script text-4xl text-[#D98282] py-1">&amp;</div>
            <h1 className="font-calligraffitti text-4xl sm:text-6xl text-[#2D2A26] font-bold tracking-wide">
              {WEDDING_DETAILS.brideNameShort}
            </h1>
          </div>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-6"></div>

          {/* Date Banner Section matching Clean Minimalism style */}
          <div className="max-w-xs mx-auto py-4 px-6 bg-[#F5F8F5] border border-[#7FB094]/50 rounded-xl shadow-sm my-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#2E5A44] font-bold mb-2">
              {WEDDING_DETAILS.monthYear}
            </p>
            <div className="flex items-center justify-center gap-4 py-1">
              <span className="text-xs font-semibold tracking-widest text-[#2E5A44] uppercase">
                {WEDDING_DETAILS.dayName}
              </span>
              <div className="h-6 w-0.5 bg-[#7FB094]"></div>
              <span className="font-serif-title text-3xl font-bold text-[#2D2A26] tracking-tight">
                {WEDDING_DETAILS.dayNumber}
              </span>
              <div className="h-6 w-0.5 bg-[#7FB094]"></div>
              <span className="text-xs font-semibold tracking-widest text-[#2E5A44]">
                2026
              </span>
            </div>
          </div>

          {/* Quick Location Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#2D2A26] font-sans tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-[#C05621]" />
            <span className="font-medium">Felda Trolak Selatan, Sungkai, Perak</span>
          </div>

          <div className="mt-8 pt-4">
            {!isOpen && onOpenEnvelope ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenEnvelope}
                className="px-8 py-3 bg-[#D98282] text-white font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-md hover:bg-[#c66f6f] transition-all flex items-center gap-2 mx-auto rounded-full border border-[#D98282]"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                Buka Kad Undangan
              </motion.button>
            ) : (
              <button
                onClick={onScrollToDetails}
                className="group text-[#D98282] hover:text-[#2D2A26] transition-colors flex flex-col items-center mx-auto text-xs font-medium"
              >
                <span className="mb-1 font-sans font-semibold tracking-[0.15em] uppercase text-[11px]">Lihat Butiran Majlis</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-[#D98282]" />
              </button>
            )}
          </div>

        </div>

      </motion.div>

    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Heart, Users, Sparkles, Camera } from 'lucide-react';
import { WEDDING_DETAILS, SCHEDULE } from '../data';

interface InvitationDetailsProps {
  translatedText?: Record<string, string>;
}

export const InvitationDetails: React.FC<InvitationDetailsProps> = ({ translatedText }) => {
  return (
    <section id="butiran" className="py-8 px-4 max-w-2xl mx-auto">
      
      {/* Container styled with Clean Minimalism aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-[#E8A598]/40 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden rounded-2xl"
      >
        {/* Subtle Corner Markers */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D98282]"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D98282]"></div>

        {/* Salam Heading */}
        <h2 className="font-serif-title text-xl sm:text-2xl text-[#2D2A26] font-bold my-2">
          {translatedText?.salam || "Assalamualaikum WBT"}
        </h2>

        <p className="text-[11px] text-[#2E5A44] font-medium tracking-wider uppercase my-2">
          Dengan penuh kesyukuran
        </p>

        {/* Host Name */}
        <div className="my-3 py-1">
          <p className="font-bold text-sm sm:text-base text-[#2D2A26] tracking-wide uppercase font-serif-title">
            {WEDDING_DETAILS.hostName}
          </p>
        </div>

        <p className="text-xs text-[#4A453E] leading-relaxed max-w-md mx-auto my-3 font-sans">
          {translatedText?.invitationWording || 
            "dengan tulus ikhlas menjemput Encik/Cik/Tuan/Puan seisi keluarga ke majlis perkahwinan putera kepada:"}
        </p>

        {/* Late Parents Names */}
        <div className="my-3 py-2 border-y border-[#E8A598]/30 max-w-xs mx-auto">
          <p className="text-xs font-semibold text-[#8C8478] uppercase tracking-wider font-sans">
            {WEDDING_DETAILS.groomParents}
          </p>
        </div>

        {/* Couple Full Names */}
        <div className="my-6 space-y-2 bg-[#FAF5F0] p-5 border border-[#E2B887]/30 rounded-xl">
          <h3 className="font-serif-title text-xl sm:text-2xl text-[#2D2A26] font-bold tracking-wide">
            {WEDDING_DETAILS.groomFullName}
          </h3>
          <p className="text-xs italic text-[#D98282] font-serif-title font-medium">
            bersama pilihan hatinya
          </p>
          <h3 className="font-serif-title text-xl sm:text-2xl text-[#2D2A26] font-bold tracking-wide">
            {WEDDING_DETAILS.brideFullName}
          </h3>
        </div>

        {/* Venue, Date, Schedule Table */}
        <div className="my-6 space-y-3 max-w-md mx-auto text-xs text-[#4A453E]">
          
          {/* Venue */}
          <div className="p-3.5 bg-[#FAF5F0] border border-[#E2B887]/30 rounded-xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C05621] font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#C05621]" />
              <span>Bertempat Di</span>
            </div>
            <p className="font-bold text-xs sm:text-sm text-[#2D2A26] mt-0.5 text-center leading-snug">
              {WEDDING_DETAILS.address}
            </p>
          </div>

          {/* Date */}
          <div className="p-3.5 bg-[#FAF5F0] border border-[#E2B887]/30 rounded-xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C05621] font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#C05621]" />
              <span>Tarikh</span>
            </div>
            <p className="font-bold text-sm sm:text-base text-[#2D2A26] mt-0.5">
              3 Oktober 2026 ({WEDDING_DETAILS.dayName})
            </p>
            <p className="text-[11px] text-[#2E5A44] italic font-medium">
              {WEDDING_DETAILS.dateHijri}
            </p>
          </div>

          {/* Schedule Summary */}
          <div className="p-3.5 bg-[#FAF5F0] border border-[#E2B887]/30 rounded-xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C05621] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#C05621]" />
              <span>Atur Cara Majlis</span>
            </div>
            <p className="font-semibold text-sm sm:text-base text-[#2D2A26] mt-1">
              {WEDDING_DETAILS.timeRange}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] text-xs text-[#4A453E] border border-[#E8E2D6]">
              <Sparkles className="w-3.5 h-3.5 text-[#8C7A5E]" />
              <span>Ketibaan Pengantin: <strong>{WEDDING_DETAILS.arrivalGroom}</strong></span>
            </div>
          </div>

        </div>

        {/* Detailed Timeline Timeline Visual */}
        <div className="mt-10 pt-8 border-t border-[#E8E2D6] text-left">
          <h4 className="text-center font-serif-title text-xl text-[#2D2A26] mb-6 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#8C7A5E]" />
            Atur Cara Ringkas Majlis
          </h4>

          <div className="relative border-l border-[#C4B49D] ml-4 sm:ml-8 space-y-6 pl-6">
            {SCHEDULE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[#C4B49D] border-2 border-white group-hover:scale-125 transition-transform"></div>
                <span className="text-[11px] font-bold text-[#2D2A26] bg-[#F8F5F0] px-2.5 py-0.5 border border-[#E8E2D6] uppercase tracking-wider">
                  {item.time}
                </span>
                <h5 className="font-semibold text-sm sm:text-base text-[#2D2A26] mt-1">
                  {item.title}
                </h5>
                <p className="text-xs text-[#8C8478] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>

    </section>
  );
};

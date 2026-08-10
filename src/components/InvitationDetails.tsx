import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS, SCHEDULE } from '../data';

interface InvitationDetailsProps {
  translatedText?: Record<string, string>;
}

export const InvitationDetails: React.FC<InvitationDetailsProps> = ({ translatedText }) => {
  return (
    <section id="butiran" className="py-8 px-4 max-w-2xl mx-auto">
      
      {/* Container styled with Jemputan.me Warm Brown & Gold aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-[#E2D4C3] p-6 sm:p-10 shadow-xl text-center relative overflow-hidden rounded-3xl"
      >
        {/* Corner Decor */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C5A059]"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#C5A059]"></div>

        {/* Salam Heading */}
        <h2 className="font-serif-title text-xl sm:text-2xl text-[#2C1A0E] font-semibold my-2">
          {translatedText?.salam || "Assalamualaikum WBT"}
        </h2>

        <p className="text-[11px] text-[#5C3A21] font-semibold tracking-widest uppercase my-2">
          Dengan Penuh Kesyukuran Ke Hadrat Allah SWT
        </p>

        {/* Host Name */}
        <div className="my-3 py-1">
          <p className="font-semibold text-sm sm:text-base text-[#2C1A0E] tracking-wide uppercase font-serif-title">
            {WEDDING_DETAILS.hostName}
          </p>
        </div>

        <p className="text-xs text-[#4A3525] leading-relaxed max-w-md mx-auto my-3 font-sans">
          {translatedText?.invitationWording || 
            "dengan tulus ikhlas menjemput Encik/Cik/Tuan/Puan seisi keluarga ke majlis perkahwinan putera kepada:"}
        </p>

        {/* Late Parents Names */}
        <div className="my-3 py-2 border-y border-[#E2D4C3] max-w-xs mx-auto">
          <p className="text-xs font-semibold text-[#7A6250] uppercase tracking-wider font-sans">
            {WEDDING_DETAILS.groomParents}
          </p>
        </div>

        {/* Couple Full Names */}
        <div className="my-6 space-y-2 bg-[#F4ECE1] p-6 border border-[#E2D4C3] rounded-2xl">
          <h3 className="font-serif-title text-xl sm:text-2xl text-[#2C1A0E] font-semibold tracking-wide">
            {WEDDING_DETAILS.groomFullName}
          </h3>
          <p className="text-xs italic text-[#C5A059] font-serif-title font-medium">
            &amp;
          </p>
          <h3 className="font-serif-title text-xl sm:text-2xl text-[#2C1A0E] font-semibold tracking-wide">
            {WEDDING_DETAILS.brideFullName}
          </h3>
        </div>

        {/* Venue, Date, Schedule Table */}
        <div className="my-6 space-y-3 max-w-md mx-auto text-xs text-[#4A3525]">
          
          {/* Venue */}
          <div className="p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Bertempat Di</span>
            </div>
            <p className="font-semibold text-xs sm:text-sm text-[#2C1A0E] mt-0.5 text-center leading-snug">
              {WEDDING_DETAILS.address}
            </p>
          </div>

          {/* Date */}
          <div className="p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Tarikh Majlis</span>
            </div>
            <p className="font-bold text-sm sm:text-base text-[#2C1A0E] mt-0.5">
              3 Oktober 2026 ({WEDDING_DETAILS.dayName})
            </p>
            <p className="text-[11px] text-[#5C3A21] italic font-medium">
              {WEDDING_DETAILS.dateHijri}
            </p>
          </div>

          {/* Schedule Summary */}
          <div className="p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C5A059] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Masa &amp; Ketibaan</span>
            </div>
            <p className="font-semibold text-sm sm:text-base text-[#2C1A0E] mt-1">
              {WEDDING_DETAILS.timeRange}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-xs text-[#2C1A0E] border border-[#E2D4C3]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Ketibaan Pengantin: <strong>{WEDDING_DETAILS.arrivalGroom}</strong></span>
            </div>
          </div>

        </div>

        {/* Detailed Timeline Visual */}
        <div className="mt-10 pt-8 border-t border-[#E2D4C3] text-left">
          <h4 className="text-center font-serif-title text-xl text-[#2C1A0E] mb-6 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#C5A059]" />
            Atur Cara Ringkas Majlis
          </h4>

          <div className="relative border-l-2 border-[#C5A059] ml-4 sm:ml-8 space-y-6 pl-6">
            {SCHEDULE.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#C5A059] border-2 border-white group-hover:scale-125 transition-transform"></div>
                <span className="text-[11px] font-bold text-[#2C1A0E] bg-[#F4ECE1] px-2.5 py-0.5 border border-[#E2D4C3] rounded-full uppercase tracking-wider">
                  {item.time}
                </span>
                <h5 className="font-semibold text-sm sm:text-base text-[#2C1A0E] mt-1">
                  {item.title}
                </h5>
                <p className="text-xs text-[#7A6250] leading-relaxed">
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


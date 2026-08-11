import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { DOA_TEXT } from '../data';
import { LanguageCode } from '../types';

interface DoaMempelaiProps {
  translatedText?: string;
  currentLang?: LanguageCode;
}

export const DoaMempelai: React.FC<DoaMempelaiProps> = ({ translatedText, currentLang = 'ms' }) => {
  const isEn = currentLang === 'en';
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      
      {/* Container styled with Jemputan.me Warm Brown & Gold aesthetic */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl text-center relative overflow-hidden rounded-3xl"
      >
        {/* Background Flower Vectors */}
        <svg className="absolute -top-6 -left-6 w-44 h-44 text-[#C5A059]/15 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
          <circle cx="35" cy="22" r="2.5" fill="currentColor" />
          <circle cx="22" cy="35" r="2.5" fill="currentColor" />
        </svg>

        <svg className="absolute -bottom-6 -right-6 w-44 h-44 text-[#C5A059]/15 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
          <circle cx="35" cy="22" r="2.5" fill="currentColor" />
          <circle cx="22" cy="35" r="2.5" fill="currentColor" />
        </svg>

        {/* Calligraphic Bismillah Header */}
        <div className="mb-4">
          <p className="font-arabic text-2xl sm:text-3xl text-[#3B2314] py-1 leading-relaxed">
            {DOA_TEXT.bismillah}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-2"></div>
        </div>

        {/* Title */}
        <h3 className="font-serif-title text-lg sm:text-xl text-[#2C1A0E] font-semibold mb-3">
          {DOA_TEXT.title}
        </h3>

        {/* Doa Body Text */}
        <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed max-w-lg mx-auto font-serif-title italic my-4 px-2 sm:px-4 font-medium">
          "{translatedText || DOA_TEXT.content}"
        </p>

        {/* Amin */}
        <div className="my-4">
          <span className="font-serif-title font-semibold text-xs text-[#5C3A21] px-6 py-1.5 bg-[#F4ECE1] border border-[#E2D4C3] rounded-full inline-block shadow-inner">
            {DOA_TEXT.amin}
          </span>
        </div>

        {/* Closing Invitation Message */}
        <p className="text-xs text-[#2C1A0E] font-medium leading-relaxed max-w-md mx-auto pt-4 border-t border-[#E2D4C3]">
          {isEn ? DOA_TEXT.closingEn : DOA_TEXT.closing}
        </p>

        {/* Decorative Accent */}
        <div className="mt-4 flex justify-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </div>

      </motion.div>

    </section>
  );
};


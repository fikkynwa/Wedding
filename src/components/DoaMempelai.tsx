import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { DOA_TEXT } from '../data';

interface DoaMempelaiProps {
  translatedText?: string;
}

export const DoaMempelai: React.FC<DoaMempelaiProps> = ({ translatedText }) => {
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
          {DOA_TEXT.closing}
        </p>

        {/* Decorative Accent */}
        <div className="mt-4 flex justify-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
        </div>

      </motion.div>

    </section>
  );
};


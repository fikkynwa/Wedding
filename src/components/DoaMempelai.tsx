import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { DOA_TEXT } from '../data';

interface DoaMempelaiProps {
  translatedText?: string;
}

export const DoaMempelai: React.FC<DoaMempelaiProps> = ({ translatedText }) => {
  return (
    <section className="py-8 px-4 max-w-2xl mx-auto">
      
      {/* Container styled like Card 4 from uploaded photos */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm text-center relative overflow-hidden rounded-2xl"
      >
        
        {/* Calligraphic Bismillah Header */}
        <div className="mb-4">
          <p className="font-arabic text-2xl sm:text-3xl text-[#2D2A26] py-1 leading-relaxed">
            {DOA_TEXT.bismillah}
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-2"></div>
        </div>

        {/* Title */}
        <h3 className="font-serif-title text-lg sm:text-xl text-[#2D2A26] font-bold mb-3">
          {DOA_TEXT.title}
        </h3>

        {/* Doa Body Text */}
        <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed max-w-lg mx-auto font-serif-title italic my-4 px-2 sm:px-4 font-medium">
          "{translatedText || DOA_TEXT.content}"
        </p>

        {/* Amin */}
        <div className="my-4">
          <span className="font-serif-title font-bold text-xs text-[#2E5A44] px-5 py-1 bg-[#FAF5F0] border border-[#E2B887]/40 rounded-full inline-block shadow-xs">
            {DOA_TEXT.amin}
          </span>
        </div>

        {/* Closing Invitation Message */}
        <p className="text-xs text-[#2D2A26] font-medium leading-relaxed max-w-md mx-auto pt-3 border-t border-[#E8A598]/30">
          {DOA_TEXT.closing}
        </p>

        {/* Decorative Accent */}
        <div className="mt-4 flex justify-center gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D98282]" />
        </div>

      </motion.div>

    </section>
  );
};

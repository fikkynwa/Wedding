import React from 'react';
import { Phone, MapPin, Gift, MessageSquareHeart } from 'lucide-react';
import { LanguageCode } from '../types';

interface FloatingActionsProps {
  onNavigate: (sectionId: string) => void;
  currentLang?: LanguageCode;
  isPlayingMusic?: boolean;
  onToggleMusic?: () => void;
  isAutoScrolling?: boolean;
  onToggleAutoScroll?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onNavigate,
  currentLang = 'ms',
}) => {
  const isEn = currentLang === 'en';

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[400px] flex items-center justify-center px-1">
      <div className="w-full bg-[#3B2314]/95 backdrop-blur-md border border-[#C5A059]/50 rounded-full px-3 py-1.5 shadow-2xl flex items-center justify-around text-white">
        
        {/* Contact */}
        <button
          onClick={() => onNavigate('kontak')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>{isEn ? 'Contact' : 'Kontak'}</span>
        </button>

        {/* Location */}
        <button
          onClick={() => onNavigate('lokasi')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>{isEn ? 'Location' : 'Lokasi'}</span>
        </button>

        {/* Gift */}
        <button
          onClick={() => onNavigate('hadiah')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>{isEn ? 'Gift' : 'Hadiah'}</span>
        </button>

        {/* Wish */}
        <button
          onClick={() => onNavigate('ucapan')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>{isEn ? 'Wishes' : 'Ucapan'}</span>
        </button>

      </div>
    </div>
  );
};





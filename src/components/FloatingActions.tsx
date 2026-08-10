import React from 'react';
import { Phone, MapPin, Gift, MessageSquareHeart, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface FloatingActionsProps {
  onNavigate: (sectionId: string) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  isAutoScrolling: boolean;
  onToggleAutoScroll: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onNavigate,
  isPlayingMusic,
  onToggleMusic,
  isAutoScrolling,
  onToggleAutoScroll,
}) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[96%] max-w-[430px] flex items-center gap-1.5 px-1">
      <div className="flex-1 bg-[#3B2314]/95 backdrop-blur-md border border-[#C5A059]/50 rounded-full px-2.5 py-1.5 shadow-2xl flex items-center justify-around text-white">
        
        {/* Contact */}
        <button
          onClick={() => onNavigate('kontak')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>Kontak</span>
        </button>

        {/* Location */}
        <button
          onClick={() => onNavigate('lokasi')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>Lokasi</span>
        </button>

        {/* Gift */}
        <button
          onClick={() => onNavigate('hadiah')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>Hadiah</span>
        </button>

        {/* Wish */}
        <button
          onClick={() => onNavigate('ucapan')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-white hover:text-[#C5A059] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#2C1A0E] flex items-center justify-center border border-[#C5A059]/40">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <span>Ucapan</span>
        </button>

      </div>

      {/* Auto Scroll Toggle Button */}
      <button
        data-autoscroll-control="true"
        onClick={onToggleAutoScroll}
        title={isAutoScrolling ? 'Henti Auto Scroll' : 'Mula Auto Scroll'}
        className={`h-10 px-3 rounded-full flex items-center gap-1 text-[10px] font-bold shadow-lg border transition-all shrink-0 ${
          isAutoScrolling
            ? 'bg-[#5C3A21] text-white border-[#C5A059] animate-pulse ring-2 ring-[#C5A059]/50'
            : 'bg-[#3B2314] text-white border-[#C5A059]/50 hover:bg-[#2C1A0E]'
        }`}
      >
        {isAutoScrolling ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
            <span>Auto</span>
          </>
        )}
      </button>

      {/* Floating Music Button */}
      <button
        onClick={onToggleMusic}
        title={isPlayingMusic ? 'Tutup Muzik' : 'Mainkan Muzik'}
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border transition-all shrink-0 ${
          isPlayingMusic
            ? 'bg-[#C5A059] text-[#2C1A0E] border-[#C5A059] animate-pulse'
            : 'bg-[#3B2314] text-[#C5A059] border-[#C5A059]/50'
        }`}
      >
        {isPlayingMusic ? (
          <Volume2 className="w-4 h-4 text-[#2C1A0E]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#C5A059]" />
        )}
      </button>
    </div>
  );
};





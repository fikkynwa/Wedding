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
      <div className="flex-1 bg-[#2D2A26]/95 backdrop-blur-md border border-[#E8A598]/40 rounded-full px-2.5 py-1.5 shadow-xl flex items-center justify-around text-[#FCFAF7]">
        
        {/* Contact */}
        <button
          onClick={() => onNavigate('kontak')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-[#FCFAF7] hover:text-[#E8A598] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#4A453E] flex items-center justify-center border border-[#E8A598]/30">
            <Phone className="w-3.5 h-3.5 text-[#E8A598]" />
          </div>
          <span>Kontak</span>
        </button>

        {/* Location */}
        <button
          onClick={() => onNavigate('lokasi')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-[#FCFAF7] hover:text-[#7FB094] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#4A453E] flex items-center justify-center border border-[#7FB094]/30">
            <MapPin className="w-3.5 h-3.5 text-[#7FB094]" />
          </div>
          <span>Lokasi</span>
        </button>

        {/* Gift */}
        <button
          onClick={() => onNavigate('hadiah')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-[#FCFAF7] hover:text-[#E2B887] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#4A453E] flex items-center justify-center border border-[#E2B887]/30">
            <Gift className="w-3.5 h-3.5 text-[#E2B887]" />
          </div>
          <span>Hadiah</span>
        </button>

        {/* Wish */}
        <button
          onClick={() => onNavigate('ucapan')}
          className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-[#FCFAF7] hover:text-[#D98282] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#4A453E] flex items-center justify-center border border-[#D98282]/30">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D98282]" />
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
            ? 'bg-[#2E5A44] text-white border-[#7FB094] animate-pulse ring-2 ring-[#7FB094]/50'
            : 'bg-[#2D2A26] text-[#FCFAF7] border-[#E8A598]/40 hover:bg-[#4A453E]'
        }`}
      >
        {isAutoScrolling ? (
          <>
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current text-[#E8A598]" />
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
            ? 'bg-[#E8A598] text-[#2D2A26] border-[#E8A598] animate-pulse'
            : 'bg-[#2D2A26] text-[#E8A598] border-[#E8A598]/40'
        }`}
      >
        {isPlayingMusic ? (
          <Volume2 className="w-4 h-4 text-[#2D2A26]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#E8A598]" />
        )}
      </button>
    </div>
  );
};




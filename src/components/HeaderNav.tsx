import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, Heart, Calendar, MapPin, Gift, Image, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types';

interface HeaderNavProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isTranslating: boolean;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentLang,
  onSelectLang,
  isPlayingMusic,
  onToggleMusic,
  activeSection,
  onNavigate,
  isTranslating,
}) => {
  const [langOpen, setLangOpen] = useState(false);

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const navItems = [
    { id: 'jemputan', label: 'Jemputan', icon: Heart },
    { id: 'butiran', label: 'Atur Cara', icon: Calendar },
    { id: 'lokasi', label: 'Lokasi & Peta', icon: MapPin },
    { id: 'hadiah', label: 'Hadiah QR', icon: Gift },
    { id: 'galeri', label: 'Galeri Foto', icon: Image },
    { id: 'ucapan', label: 'Buku Ucapan', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-[#E8E2D6] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo / Wedding Title */}
        <button
          onClick={() => onNavigate('jemputan')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#F8F5F0] border border-[#C4B49D] flex items-center justify-center text-[#2D2A26] group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 fill-[#C4B49D]/30 text-[#8C7A5E]" />
          </div>
          <div>
            <span className="font-serif-title text-xl font-semibold text-[#2D2A26] leading-none block">Akim & Asyiqim</span>
            <span className="text-[10px] tracking-[0.2em] text-[#8C8478] uppercase font-sans">03 Oktober 2026</span>
          </div>
        </button>

        {/* Desktop menu removed - strictly mobile web app interface */}

        {/* Right Controls: AI Language Translator & Audio Toggle */}
        <div className="flex items-center gap-2">
          
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? "Matikan Muzik" : "Mainkan Muzik Ambient"}
            className={`p-2 rounded-full border transition-all flex items-center justify-center ${
              isPlayingMusic
                ? 'bg-[#2D2A26] text-[#FCFAF7] border-[#2D2A26]'
                : 'bg-[#F8F5F0] text-[#4A453E] border-[#E8E2D6] hover:border-[#C4B49D]'
            }`}
          >
            {isPlayingMusic ? (
              <Volume2 className="w-4 h-4 text-[#C4B49D] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-70" />
            )}
          </button>

          {/* AI Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8F5F0] border border-[#E8E2D6] text-xs text-[#2D2A26] hover:border-[#C4B49D] transition-all"
            >
              <Globe className={`w-3.5 h-3.5 text-[#8C7A5E] ${isTranslating ? 'animate-spin' : ''}`} />
              <span className="text-sm">{activeLang.flag}</span>
              <span className="hidden sm:inline font-medium">{activeLang.code.toUpperCase()}</span>
              {isTranslating && (
                <Sparkles className="w-3 h-3 text-[#8C7A5E] animate-bounce" />
              )}
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E2D6] rounded-xl shadow-xl py-1 z-50 divide-y divide-[#F0EDE6]">
                <div className="px-3 py-1.5 text-[10px] text-[#8C8478] font-semibold tracking-wider uppercase flex items-center justify-between">
                  <span>Terjemahan AI</span>
                  <Sparkles className="w-3 h-3 text-[#C4B49D]" />
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#F8F5F0] transition-colors ${
                      currentLang === lang.code
                        ? 'text-[#2D2A26] font-bold bg-[#F0EDE6]'
                        : 'text-[#4A453E]'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Volume2, VolumeX, Globe, Heart, Sparkles } from 'lucide-react';
import { LanguageCode, LanguageOption } from '../types';

interface HeaderNavProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isTranslating: boolean;
  youtubeUrl?: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentLang,
  onSelectLang,
  isPlayingMusic,
  onToggleMusic,
  activeSection,
  onNavigate,
  isTranslating,
  youtubeUrl = 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
}) => {
  const [langOpen, setLangOpen] = useState(false);

  const activeLang = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#3B2314]/95 backdrop-blur-md border-b border-[#C5A059]/30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Brand Logo / Wedding Title */}
        <button
          onClick={() => onNavigate('jemputan')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#2C1A0E] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif-title text-xs font-bold tracking-wider shadow-inner group-hover:scale-105 transition-transform">
            A&amp;A
          </div>
          <div>
            <span className="font-serif-title text-base font-semibold text-white leading-none block">
              Aqim &amp; Asyiqim
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#C5A059] uppercase font-sans">
              03 Oktober 2026
            </span>
          </div>
        </button>

        {/* Right Controls: AI Language Translator & Audio Toggle */}
        <div className="flex items-center gap-2">
          
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? "Matikan Muzik" : "Mainkan Muzik"}
            className={`p-2 rounded-full border transition-all flex items-center justify-center ${
              isPlayingMusic
                ? 'bg-[#C5A059] text-[#2C1A0E] border-[#C5A059]'
                : 'bg-[#2C1A0E] text-white border-[#C5A059]/40 hover:border-[#C5A059]'
            }`}
          >
            {isPlayingMusic ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-70" />
            )}
          </button>

          {/* AI Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1A0E] border border-[#C5A059]/40 text-xs text-white hover:border-[#C5A059] transition-all"
            >
              <Globe className={`w-3.5 h-3.5 text-[#C5A059] ${isTranslating ? 'animate-spin' : ''}`} />
              <span className="text-xs">{activeLang.flag}</span>
              <span className="hidden sm:inline font-medium text-[11px]">{activeLang.code.toUpperCase()}</span>
              {isTranslating && (
                <Sparkles className="w-3 h-3 text-[#C5A059] animate-bounce" />
              )}
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#2C1A0E] border border-[#C5A059]/40 rounded-xl shadow-2xl py-1 z-50 divide-y divide-[#3B2314]">
                <div className="px-3 py-1.5 text-[10px] text-[#C5A059] font-semibold tracking-wider uppercase flex items-center justify-between">
                  <span>Terjemahan Bahasa</span>
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#3B2314] transition-colors ${
                      currentLang === lang.code
                        ? 'text-[#C5A059] font-bold bg-[#3B2314]/80'
                        : 'text-white/80'
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


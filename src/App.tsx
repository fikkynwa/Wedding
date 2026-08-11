import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeaderNav } from './components/HeaderNav';
import { InvitationCard } from './components/InvitationCard';
import { InvitationDetails } from './components/InvitationDetails';
import { LocationAndContact } from './components/LocationAndContact';
import { DoaMempelai } from './components/DoaMempelai';
import { CountdownTimer } from './components/CountdownTimer';
import { GiftSection } from './components/GiftSection';
import { PhotoGallery } from './components/PhotoGallery';
import { GuestbookAndAiWish } from './components/GuestbookAndAiWish';
import { FloatingActions } from './components/FloatingActions';
import { DoorLockOverlay } from './components/DoorLockOverlay';
import { SnowFloralOverlay } from './components/SnowFloralOverlay';
import { LanguageCode } from './types';
import { YOUTUBE_BACKGROUND_MUSIC } from './data';
import { Heart, Sparkles, Music, Pause } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('ms');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activeSection, setActiveSection] = useState('jemputan');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic AI Translated text cache
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({
    title: "WALIMATUL URUS",
    subtitle: "Undangan Majlis Perkahwinan",
    salam: "Assalamualaikum WBT",
    invitationWording: "dengan tulus ikhlas menjemput Encik/Cik/Tuan/Puan seisi keluarga ke majlis perkahwinan putera kepada:",
    doaContent: "Ya Allah, Satukanlah hati kedua mempelai ini seperti mana Engkau satukan hati Adam & Hawa, Yusof & Zulaikha dan seperti Engkau satukan hati Muhammad S.A.W & Siti Khadijah. Satukanlah hati kedua mempelai ini dengan iman, kejayaan dan tawakal. Kurniakanlah mereka zuriat yang soleh dan solehah serta berikanlah ketenangan kepada mereka di dunia dan akhirat."
  });

  // Synthesized Romantic Wedding Acoustic Piano & String Pad Engine
  const audioContextRef = useRef<AudioContext | null>(null);
  const isAudioActiveRef = useRef(false);

  const startAmbientMusic = () => {
    if (isAudioActiveRef.current && audioContextRef.current?.state === 'running') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      isAudioActiveRef.current = true;
      setIsPlayingMusic(true);

      // Romantic Canon / Wedding Piano Major Arpeggios (C, G, Am, Em, F, C, F, G)
      const chordProgressions = [
        [261.63, 329.63, 392.00, 523.25], // C Major (C4, E4, G4, C5)
        [196.00, 246.94, 293.66, 392.00], // G Major (G3, B3, D4, G4)
        [220.00, 261.63, 329.63, 440.00], // A Minor (A3, C4, E4, A4)
        [164.81, 196.00, 246.94, 329.63], // E Minor (E3, G3, B3, E4)
        [174.61, 220.00, 261.63, 349.23], // F Major (F3, A3, C4, F4)
        [261.63, 329.63, 392.00, 523.25], // C Major
        [174.61, 220.00, 261.63, 349.23], // F Major
        [196.00, 246.94, 293.66, 392.00], // G Major
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      const playPianoNote = () => {
        if (!isAudioActiveRef.current || !audioContextRef.current) return;
        const now = ctx.currentTime;

        const currentChord = chordProgressions[chordIdx % chordProgressions.length];
        const freq = currentChord[noteIdx % currentChord.length];

        // Piano Fundamental Oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Overtone harmonic for rich acoustic warmth
        const overtoneOsc = ctx.createOscillator();
        const overtoneGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        overtoneOsc.type = 'sine';
        overtoneOsc.frequency.setValueAtTime(freq * 2, now);

        // Romantic Piano Envelope (Warm attack, smooth decay)
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

        overtoneGain.gain.setValueAtTime(0, now);
        overtoneGain.gain.linearRampToValueAtTime(0.015, now + 0.08);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

        osc.connect(gain);
        overtoneOsc.connect(overtoneGain);

        gain.connect(ctx.destination);
        overtoneGain.connect(ctx.destination);

        osc.start(now);
        overtoneOsc.start(now);

        osc.stop(now + 3.2);
        overtoneOsc.stop(now + 2.2);

        noteIdx++;
        if (noteIdx % currentChord.length === 0) {
          chordIdx++;
        }

        setTimeout(playPianoNote, 420);
      };

      playPianoNote();
    } catch (e) {
      console.warn("Audio Context setup prevented by browser autoplay policy:", e);
    }
  };

  const stopAmbientMusic = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    isAudioActiveRef.current = false;
    setIsPlayingMusic(false);
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  // Door Unlock Handler
  const handleUnlockDoor = () => {
    setIsUnlocked(true);
    setIsEnvelopeOpen(true);
    setIsAutoScrolling(true);
  };

  // Toggle Auto-Scroll
  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
  };

  // Continuous Auto-Scroll Effect
  useEffect(() => {
    if (!isAutoScrolling || !isUnlocked) return;

    let animationFrameId: number;
    let isGracePeriod = true;

    // Grace period timer so initial button click does not immediately cancel auto-scroll
    const graceTimer = setTimeout(() => {
      isGracePeriod = false;
    }, 400);

    const stopAutoScrollOnUserInteraction = (e: Event) => {
      if (isGracePeriod) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-autoscroll-control]')) return;
      setIsAutoScrolling(false);
    };

    // Attach user interaction listeners
    const events = ['wheel', 'touchstart', 'touchmove', 'keydown'];
    events.forEach((event) => {
      window.addEventListener(event, stopAutoScrollOnUserInteraction, { passive: true });
    });

    let lastTime = performance.now();

    const scrollLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Gentle smooth scroll rate ~45px per second
      const distance = 45 * delta;

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += distance;
      }
      window.scrollBy({ top: distance, behavior: 'instant' });

      // Check if reached bottom
      const windowAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 25;
      const containerAtBottom = scrollContainerRef.current
        ? scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
          scrollContainerRef.current.scrollHeight - 25
        : false;

      if (windowAtBottom || containerAtBottom) {
        setIsAutoScrolling(false);
      } else {
        animationFrameId = requestAnimationFrame(scrollLoop);
      }
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      clearTimeout(graceTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      events.forEach((event) => {
        window.removeEventListener(event, stopAutoScrollOnUserInteraction);
      });
    };
  }, [isAutoScrolling, isUnlocked]);

  // Open Invitation Envelope
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    startAmbientMusic();
    scrollToSection('jemputan');
  };

  // Smooth Scroll Navigation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Language Change with AI Translation
  const handleSelectLanguage = async (lang: LanguageCode) => {
    setCurrentLang(lang);
    
    // Instant fallback translations
    const dict: Record<LanguageCode, any> = {
      ms: {
        title: "WALIMATUL URUS",
        subtitle: "Undangan Majlis Perkahwinan",
        salam: "Assalamualaikum WBT",
        invitationWording: "dengan tulus ikhlas menjemput Encik/Cik/Tuan/Puan seisi keluarga ke majlis perkahwinan putera kepada:",
        doaContent: "Ya Allah, Satukanlah hati kedua mempelai ini seperti mana Engkau satukan hati Adam & Hawa, Yusof & Zulaikha dan seperti Engkau satukan hati Muhammad S.A.W & Siti Khadijah. Satukanlah hati kedua mempelai ini dengan iman, kejayaan dan tawakal. Kurniakanlah mereka zuriat yang soleh dan solehah serta berikanlah ketenangan kepada mereka di dunia dan akhirat."
      },
      en: {
        title: "THE WEDDING CELEBRATION",
        subtitle: "Wedding Invitation",
        salam: "Peace Be Upon You (Assalamualaikum)",
        invitationWording: "cordially invite you and your family to celebrate the wedding union of the son of:",
        doaContent: "O Allah, unite the hearts of the bride and groom as You united the hearts of Adam & Eve, Joseph & Zulaikha, and Prophet Muhammad PBUH & Khadijah. Bless their marriage with faith, tranquility, and pious offspring in this world and the hereafter."
      },
      zh: {
        title: "婚礼盛典",
        subtitle: "诚挚婚礼请柬",
        salam: "愿您平安 (Assalamualaikum)",
        invitationWording: "诚挚邀请您及家人光临参加我们新郎的婚礼：",
        doaContent: "真主啊，请像结合亚当与夏娃、约瑟与祖莱哈、穆罕默德圣人与赫蒂彻那样，结合这对新人的心。赐予他们的婚姻信仰、安宁、幸福以及孝顺的子孙。"
      },
      ta: {
        title: "திருமண அழைப்பிதழ்",
        subtitle: "இனிய திருமண வரவேற்பு",
        salam: "அஸ்ஸலாமு அலைக்கும் (உங்களுக்கு அமைதி உண்டாகட்டும்)",
        invitationWording: "எங்கள் மகனின் திருமண விழாவிற்கு உங்களையும் உங்கள் குடும்பத்தினரையும் அன்போடு அழைக்கிறோம்:",
        doaContent: "இறைவா, இந்த மணமக்களின் இதயங்களை ஆதம்-ஏவாள் மற்றும் நபிகள் நாயகம்-கதீஜா போல் இணைப்பாயாக. அவர்களின் வாழ்க்கையில் நம்பிக்கை, அமைதி மற்றும் நன்மக்களை அருள்வாயாக."
      },
      ar: {
        title: "حفل الزفاف الميمون",
        subtitle: "دعوة حفل الزفاف",
        salam: "السلام عليكم ورحمة الله وبركاته",
        invitationWording: "يتشرفون بدعوة سيادتكم وعائلتكم الكريمة لحضور حفل زفاف ابنهم:",
        doaContent: "اللهم ألف بين قلبي العروسين كما ألفت بين آدم وحواء، ويوسف وزليخة، ومحمد صلى الله عليه وسلم وخديجة. اللهم ارزقهما الإيمان، والسكن، والذرية الصالحة في الدنيا والآخرة."
      }
    };

    if (dict[lang]) {
      setTranslatedContent(dict[lang]);
    }

    if (lang === 'ms') return;

    setIsTranslating(true);
    try {
      const targetLangName =
        lang === 'en'
          ? 'English'
          : lang === 'zh'
          ? 'Chinese (Mandarin)'
          : lang === 'ta'
          ? 'Tamil'
          : 'Arabic';

      const promptText = `Title: WALIMATUL URUS
Subtitle: Undangan Majlis Perkahwinan
Greeting: Assalamualaikum WBT
Invitation: dengan tulus ikhlas menjemput Encik/Cik/Tuan/Puan seisi keluarga ke majlis perkahwinan putera kepada:
Prayer: Ya Allah, Satukanlah hati kedua mempelai ini seperti mana Engkau satukan hati Adam & Hawa, Yusof & Zulaikha dan seperti Engkau satukan hati Muhammad S.A.W & Siti Khadijah. Satukanlah hati kedua mempelai ini dengan iman, kejayaan dan tawakal. Kurniakanlah mereka zuriat yang soleh and solehah serta berikanlah ketenangan kepada mereka di dunia dan akhirat.`;

      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: promptText,
          targetLang: targetLangName,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.translatedText && data.translatedText !== promptText) {
          setTranslatedContent((prev) => ({
            ...prev,
            doaContent: data.translatedText,
          }));
        }
      }
    } catch (err) {
      console.error("Translation error:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C1E16] flex justify-center items-start sm:py-4">
      {/* Mobile Phone Screen Container */}
      <div
        ref={scrollContainerRef}
        className="w-full max-w-[430px] min-h-screen sm:min-h-[850px] sm:rounded-[32px] bg-[#FAF6F0] text-[#2C1A0E] relative font-sans selection:bg-[#C5A059] selection:text-white pb-24 shadow-2xl border border-[#E2D4C3] overflow-x-hidden"
      >
        {/* Falling Snow and Flower Petal Floating Overlay */}
        <SnowFloralOverlay />

        {/* Door Lock Gate Overlay */}
        <DoorLockOverlay
          isUnlocked={isUnlocked}
          onStartMusic={startAmbientMusic}
          onUnlock={handleUnlockDoor}
          currentLang={currentLang}
          onSelectLang={handleSelectLanguage}
        />

        {/* Top Header Navigation */}
        <HeaderNav
          currentLang={currentLang}
          onSelectLang={handleSelectLanguage}
          isPlayingMusic={isPlayingMusic}
          onToggleMusic={toggleMusic}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          isTranslating={isTranslating}
        />

        {/* Hidden YouTube Background Audio Player */}
        {isPlayingMusic && (
          <iframe
            width="1"
            height="1"
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_BACKGROUND_MUSIC.videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${YOUTUBE_BACKGROUND_MUSIC.videoId}`}
            title="YouTube Background Music Player"
            allow="autoplay"
            className="fixed -top-96 -left-96 opacity-0 pointer-events-none w-1 h-1 z-0"
          />
        )}

        {/* Active Auto-Scroll Banner Notification */}
        <AnimatePresence>
          {isAutoScrolling && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="sticky top-16 z-30 mx-4 my-2 px-3.5 py-1.5 bg-[#3B2314]/95 backdrop-blur-sm text-white rounded-full text-[11px] flex items-center justify-between shadow-md border border-[#C5A059]/50"
            >
              <span className="flex items-center gap-1.5 font-medium text-white">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Auto-Skrol Aktif
              </span>
              <span className="text-[10px] text-[#C5A059] font-normal">
                Sentuh skrin untuk berhenti
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="relative z-10 space-y-4 pt-2">
          
          {/* Cover Invitation Card (Replica of Card 1) */}
          <InvitationCard
            isOpen={isEnvelopeOpen}
            onOpenEnvelope={handleOpenEnvelope}
            onScrollToDetails={() => scrollToSection('butiran')}
            translatedTitle={translatedContent.title}
            translatedSubtitle={translatedContent.subtitle}
            currentLang={currentLang}
          />

          {/* Details & Schedule Section (Replica of Card 2) */}
          <InvitationDetails translatedText={translatedContent} currentLang={currentLang} />

          {/* Location & Contact Section (Replica of Card 3) */}
          <LocationAndContact currentLang={currentLang} />

          {/* Doa Mempelai (Replica of Card 4) */}
          <DoaMempelai translatedText={translatedContent.doaContent} />

          {/* Countdown Timer */}
          <CountdownTimer currentLang={currentLang} />

          {/* Digital Gift & QR Code Section */}
          <GiftSection currentLang={currentLang} />

          {/* Photo Gallery */}
          <PhotoGallery currentLang={currentLang} />

          {/* Guestbook & AI Wish Assistant */}
          <GuestbookAndAiWish currentLang={currentLang} />

        </main>

        {/* Pantun Melayu & Footer */}
        <footer className="mt-12 py-8 px-4 border-t border-[#E2D4C3] text-center bg-[#F4ECE1]">
          <div className="space-y-3">
            
            <div className="w-9 h-9 mx-auto rounded-full bg-white border border-[#E2D4C3] flex items-center justify-center text-[#C5A059]">
              <Heart className="w-4 h-4 fill-[#C5A059]/30 text-[#C5A059]" />
            </div>

            <p className="font-serif-title italic text-xs text-[#4A3525] leading-relaxed px-2">
              "Bunga melur suntingan jelita,<br />
              Disusun rapi di atas takhta;<br />
              Dua hati menyatu cinta,<br />
              Kekal bahagia hingga ke syurga."
            </p>

            <p className="text-[11px] text-[#2C1A0E] tracking-widest uppercase font-semibold">
              Walimatul Urus Aqim &amp; Asyiqim • 03 Oktober 2026
            </p>
            <p className="text-[10px] text-[#7A6250]">
              Teratak Kasih Felda Trolak Selatan, Sungkai, Perak
            </p>

          </div>
        </footer>

        {/* Floating Bottom Navigation Bar for Mobile */}
        <FloatingActions
          onNavigate={scrollToSection}
          currentLang={currentLang}
        />

      </div>
    </div>
  );
}


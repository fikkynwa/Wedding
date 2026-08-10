import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Download, Check } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date("2026-10-03T11:00:00+08:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [addedCal, setAddedCal] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Google Calendar URL generator
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    WEDDING_DETAILS.calendarEvent.title
  )}&dates=${WEDDING_DETAILS.calendarEvent.startDate}/${
    WEDDING_DETAILS.calendarEvent.endDate
  }&details=${encodeURIComponent(
    WEDDING_DETAILS.calendarEvent.details
  )}&location=${encodeURIComponent(WEDDING_DETAILS.calendarEvent.location)}`;

  // Download iCal .ics file
  const downloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Walimatul Urus//Akim & Asyiqim Wedding//MS
BEGIN:VEVENT
SUMMARY:${WEDDING_DETAILS.calendarEvent.title}
DESCRIPTION:${WEDDING_DETAILS.calendarEvent.details}
LOCATION:${WEDDING_DETAILS.calendarEvent.location}
DTSTART:${WEDDING_DETAILS.calendarEvent.startDate}
DTEND:${WEDDING_DETAILS.calendarEvent.endDate}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Majlis_Perkahwinan_Akim_Asyiqim.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setAddedCal(true);
    setTimeout(() => setAddedCal(false), 4000);
  };

  return (
    <section className="py-8 px-4 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl rounded-3xl"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-[#C5A059] font-bold mb-1">
          <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Hitungan Detik Ke Majlis</span>
        </div>

        <h3 className="font-serif-title text-lg sm:text-xl text-[#2C1A0E] font-semibold mb-6">
          Menghitung Hari Bahagia
        </h3>

        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto mb-6">
          <div className="p-3 sm:p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner">
            <span className="font-serif-title text-2xl sm:text-4xl font-bold text-[#2C1A0E] block">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5C3A21] font-semibold uppercase tracking-wider block mt-1">
              Hari
            </span>
          </div>

          <div className="p-3 sm:p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner">
            <span className="font-serif-title text-2xl sm:text-4xl font-bold text-[#2C1A0E] block">
              {timeLeft.hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5C3A21] font-semibold uppercase tracking-wider block mt-1">
              Jam
            </span>
          </div>

          <div className="p-3 sm:p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner">
            <span className="font-serif-title text-2xl sm:text-4xl font-bold text-[#2C1A0E] block">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5C3A21] font-semibold uppercase tracking-wider block mt-1">
              Minit
            </span>
          </div>

          <div className="p-3 sm:p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner">
            <span className="font-serif-title text-2xl sm:text-4xl font-bold text-[#2C1A0E] block">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-[#5C3A21] font-semibold uppercase tracking-wider block mt-1">
              Saat
            </span>
          </div>
        </div>

        {/* Calendar Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#3B2314] hover:bg-[#2C1A0E] border border-[#C5A059] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md rounded-full"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            Tambah Ke Google Calendar
          </a>

          <button
            onClick={downloadIcs}
            className="px-5 py-2.5 bg-[#F4ECE1] hover:bg-[#e8dad0] border border-[#E2D4C3] text-xs font-semibold text-[#2C1A0E] flex items-center gap-2 transition-all rounded-full shadow-sm"
          >
            {addedCal ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Kalendar Disimpan!
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                Muat Turun Fail .ICS
              </>
            )}
          </button>
        </div>

      </motion.div>
    </section>
  );
};


import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { WEDDING_DETAILS, CONTACTS } from '../data';
import { LanguageCode } from '../types';

interface LocationAndContactProps {
  currentLang?: LanguageCode;
}

export const LocationAndContact: React.FC<LocationAndContactProps> = ({ currentLang = 'ms' }) => {
  const isEn = currentLang === 'en';

  return (
    <section id="lokasi" className="py-8 px-4 max-w-3xl mx-auto space-y-6">
      
      {/* Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl rounded-3xl text-center relative overflow-hidden"
      >
        {/* Background Flower Vectors */}
        <svg className="absolute -top-4 -left-4 w-36 h-36 text-[#C5A059]/15 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
        </svg>

        <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
          <MapPin className="w-4 h-4" />
        </div>
        <h2 className="font-serif-title text-lg sm:text-xl text-[#2C1A0E] uppercase tracking-wider font-semibold">
          {isEn ? 'Event Location' : 'Lokasi Majlis'}
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>

        {/* Venue Title & Address */}
        <div className="bg-[#F4ECE1] p-5 rounded-2xl border border-[#E2D4C3] max-w-lg mx-auto text-left my-4">
          <p className="font-semibold text-xs sm:text-sm text-[#2C1A0E] flex items-center gap-2 font-sans">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            {WEDDING_DETAILS.locationName}
          </p>
          <p className="text-xs text-[#4A3525] font-sans mt-1 leading-relaxed pl-6">
            {WEDDING_DETAILS.address}
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <a
            href={WEDDING_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#3B2314] hover:bg-[#2C1A0E] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md rounded-full border border-[#C5A059]/40"
          >
            <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
            Google Maps
          </a>
          <a
            href={WEDDING_DETAILS.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#5C3A21] hover:bg-[#3B2314] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md rounded-full border border-[#C5A059]/40"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            Waze
          </a>
        </div>
      </motion.div>

      {/* Contact Card ("HUBUNGI") */}
      <motion.div
        id="kontak"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl rounded-3xl relative overflow-hidden"
      >
        {/* Background Flower Vectors */}
        <svg className="absolute -bottom-4 -right-4 w-36 h-36 text-[#C5A059]/15 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
        </svg>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="font-serif-title text-xl text-[#2C1A0E] font-semibold">
            {isEn ? 'Family Contacts' : 'Wakil Keluarga'}
          </h3>
          <p className="text-xs text-[#5C3A21] font-medium mt-0.5">
            {isEn ? 'Contact for any questions regarding the ceremony' : 'Hubungi untuk sebarang pertanyaan berkaitan majlis'}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto">
          {CONTACTS.map((person, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl flex items-center justify-between shadow-xs hover:border-[#C5A059] transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#2C1A0E]">
                    {person.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#3B2314] text-[#C5A059] font-bold rounded-full">
                    {person.role}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6250] font-mono mt-0.5 font-medium">
                  {person.phone}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`tel:${person.phone.replace(/[^0-9]/g, '')}`}
                  title={isEn ? "Call" : "Panggil"}
                  className="p-2 bg-white border border-[#E2D4C3] rounded-full text-[#2C1A0E] hover:bg-[#3B2314] hover:text-white transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={person.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#1ebf57] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
};


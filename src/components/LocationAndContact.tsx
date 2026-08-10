import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { WEDDING_DETAILS, CONTACTS } from '../data';

export const LocationAndContact: React.FC = () => {
  return (
    <section id="lokasi" className="py-8 px-4 max-w-3xl mx-auto space-y-6">
      
      {/* Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl rounded-3xl text-center relative"
      >
        <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
          <MapPin className="w-4 h-4" />
        </div>
        <h2 className="font-serif-title text-lg sm:text-xl text-[#2C1A0E] uppercase tracking-wider font-semibold">
          Lokasi Majlis
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
            Google Maps Navigasi
          </a>
          <a
            href={WEDDING_DETAILS.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#5C3A21] hover:bg-[#3B2314] text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-md rounded-full border border-[#C5A059]/40"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
            Waze Navigasi
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
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl rounded-3xl relative"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="font-serif-title text-xl text-[#2C1A0E] font-semibold">
            Wakil Keluarga
          </h3>
          <p className="text-xs text-[#5C3A21] font-medium mt-0.5">
            Hubungi untuk sebarang pertanyaan berkaitan majlis
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
                  title="Panggil"
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


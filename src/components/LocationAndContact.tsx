import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, MessageCircle, ExternalLink, QrCode } from 'lucide-react';
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
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm rounded-2xl text-center relative"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FDF0EE] text-[#C05621] mb-2 border border-[#E8A598]/30">
          <MapPin className="w-4 h-4" />
        </div>
        <h2 className="font-serif-title text-lg sm:text-xl text-[#2D2A26] uppercase tracking-wider font-bold">
          Lokasi Majlis
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-3"></div>

        {/* Venue Title & Address */}
        <div className="bg-[#FAF5F0] p-4 rounded-xl border border-[#E2B887]/30 max-w-lg mx-auto text-left my-3">
          <p className="font-bold text-xs sm:text-sm text-[#2D2A26] flex items-center gap-1.5 font-sans">
            <MapPin className="w-4 h-4 text-[#C05621] shrink-0" />
            {WEDDING_DETAILS.locationName}
          </p>
          <p className="text-xs text-[#4A453E] font-sans mt-1 leading-relaxed pl-5">
            {WEDDING_DETAILS.address}
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          <a
            href={WEDDING_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs rounded-full"
          >
            <Navigation className="w-3.5 h-3.5" />
            Google Maps
          </a>
          <a
            href={WEDDING_DETAILS.wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold text-white flex items-center gap-1.5 transition-all shadow-xs rounded-full"
          >
            <ExternalLink className="w-3.5 h-3.5" />
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
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm rounded-2xl relative"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FDF0EE] text-[#D98282] mb-2 border border-[#E8A598]/30">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="font-serif-title text-xl text-[#2D2A26] font-bold">
            Wakil Keluarga
          </h3>
          <p className="text-xs text-[#2E5A44] font-medium mt-0.5">
            Hubungi untuk pertanyaan berkaitan majlis
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto">
          {CONTACTS.map((person, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#FAF5F0] border border-[#E2B887]/30 rounded-xl flex items-center justify-between shadow-xs hover:border-[#D98282] transition-all"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#2D2A26]">
                    {person.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-[#FDF0EE] text-[#C05621] font-bold rounded-full border border-[#E8A598]/30">
                    {person.role}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C8478] font-mono mt-0.5 font-medium">
                  {person.phone}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`tel:${person.phone.replace(/[^0-9]/g, '')}`}
                  title="Panggil"
                  className="p-2 bg-white border border-[#E2B887]/50 rounded-full text-[#C05621] hover:bg-[#FDF0EE] transition-colors shadow-xs"
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

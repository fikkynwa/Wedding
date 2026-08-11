import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';
import { LanguageCode } from '../types';

const FALLBACK_PHOTOS: Record<string, string> = {
  "/wedgallery1.png": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80",
  "/wedgallery2.png": "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80",
  "/wedgallery3.png": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&auto=format&fit=crop&q=80",
  "/wedgallery4.png": "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80",
  "/wedgallery5.png": "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1000&auto=format&fit=crop&q=80",
  "/wedgallery6.png": "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1000&auto=format&fit=crop&q=80",
};

interface PhotoGalleryProps {
  currentLang?: LanguageCode;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ currentLang = 'ms' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const isEn = currentLang === 'en';

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) =>
    activeCategory === 'all' ? true : photo.category === activeCategory
  );

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! === 0 ? filteredPhotos.length - 1 : prev! - 1
    );
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! === filteredPhotos.length - 1 ? 0 : prev! + 1
    );
  };

  return (
    <section id="galeri" className="py-8 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl relative rounded-3xl overflow-hidden"
      >
        {/* Background Flower Vectors */}
        <svg className="absolute -top-6 -right-6 w-40 h-40 text-[#C5A059]/15 pointer-events-none -scale-x-100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M0 0 C30 10 60 30 70 70 C40 60 10 30 0 0 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />
          <path d="M15 0 C35 25 50 45 85 50 C50 40 25 25 15 0 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" fill="currentColor" />
        </svg>

        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] text-[#C5A059] mb-2 border border-[#E2D4C3]">
            <ImageIcon className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2C1A0E] uppercase tracking-wider font-semibold">
            {isEn ? 'Photo Gallery' : 'Galeri Kenangan'}
          </h2>
          <p className="text-xs text-[#5C3A21] font-medium mt-0.5">
            {isEn ? "Precious moments of Aqim & Asyiqim's love story" : 'Potret indah perjalanan cinta Aqim & Asyiqim'}
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center items-center gap-2 mb-6">
          {[
            { id: 'all', label: isEn ? 'All Photos' : 'Semua Potret' },
            { id: 'prewedding', label: 'Pre-Wedding' },
            { id: 'moments', label: isEn ? 'Lovely Moments' : 'Momen Indah' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#3B2314] text-white border border-[#C5A059] shadow-sm'
                  : 'bg-[#F4ECE1] text-[#2C1A0E] hover:bg-[#e8dad0] border border-[#E2D4C3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative group bg-[#F4ECE1] border border-[#E2D4C3] cursor-pointer overflow-hidden rounded-2xl shadow-sm"
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = FALLBACK_PHOTOS[photo.url] || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80";
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/90 via-[#2C1A0E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="font-serif-title text-sm font-semibold text-white">
                  {photo.title}
                </p>
                <p className="text-xs text-[#E2D4C3] line-clamp-1">
                  {photo.caption}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#C5A059] font-medium uppercase tracking-wider">
                  <Maximize2 className="w-3 h-3" /> {isEn ? 'View Full' : 'Papar Penuh'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-[#C5A059] p-2 rounded-full bg-white/10 transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A059] p-3 rounded-full bg-white/10 transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C5A059] p-3 rounded-full bg-white/10 transition-colors z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
              >
                <img
                  src={filteredPhotos[selectedPhotoIndex].url}
                  alt={filteredPhotos[selectedPhotoIndex].title}
                  className="max-h-[70vh] w-auto object-contain border border-[#C5A059]/40 shadow-2xl rounded-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const photoUrl = filteredPhotos[selectedPhotoIndex]?.url;
                    const fallback = (photoUrl && FALLBACK_PHOTOS[photoUrl]) || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80";
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
                <div className="mt-4 text-center">
                  <h4 className="font-serif-title text-lg font-semibold text-white">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h4>
                  <p className="text-xs text-[#D3DDD6] mt-1">
                    {filteredPhotos[selectedPhotoIndex].caption}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
};


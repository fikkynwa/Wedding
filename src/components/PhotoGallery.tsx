import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Maximize2, ChevronLeft, ChevronRight, X, Heart } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';
import { PhotoItem } from '../types';

export const PhotoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm relative rounded-2xl"
      >
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FDF0EE] text-[#D98282] mb-2 border border-[#E8A598]/30">
            <ImageIcon className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2D2A26] uppercase tracking-wider font-bold">
            Galeri Kenangan
          </h2>
          <p className="text-xs text-[#2E5A44] font-medium mt-0.5">
            Potret manis perjalanan cinta Akim &amp; Asyiqim
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-3"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center items-center gap-1.5 mb-6">
          {[
            { id: 'all', label: 'Semua Potret' },
            { id: 'prewedding', label: 'Pre-Wedding' },
            { id: 'moments', label: 'Momen Indah' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#D98282] text-white shadow-xs'
                  : 'bg-[#FAF5F0] text-[#2D2A26] hover:bg-[#FDF0EE] border border-[#E2B887]/40'
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
              className="relative group bg-[#F8F5F0] border border-[#E8E2D6] cursor-pointer overflow-hidden"
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/90 via-[#2D2A26]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="font-serif-title text-sm font-semibold text-[#FCFAF7]">
                  {photo.title}
                </p>
                <p className="text-xs text-[#E8E2D6] line-clamp-1">
                  {photo.caption}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-[#C4B49D] font-medium uppercase tracking-wider">
                  <Maximize2 className="w-3 h-3" /> Papar Penuh
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
                className="absolute top-4 right-4 text-white hover:text-[#C4B49D] p-2 rounded-full bg-white/10 transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C4B49D] p-3 rounded-full bg-white/10 transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C4B49D] p-3 rounded-full bg-white/10 transition-colors z-50"
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
                  className="max-h-[70vh] w-auto object-contain border border-white/20 shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h4 className="font-serif-title text-lg font-semibold text-[#FCFAF7]">
                    {filteredPhotos[selectedPhotoIndex].title}
                  </h4>
                  <p className="text-xs text-[#E8E2D6] mt-1">
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

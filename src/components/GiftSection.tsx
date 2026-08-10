import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, QrCode, Copy, Check } from 'lucide-react';
import { GIFT_ACCOUNTS } from '../data';

export const GiftSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedQrModal, setSelectedQrModal] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  return (
    <section id="hadiah" className="py-8 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white p-6 sm:p-10 border border-[#E2D4C3] shadow-xl relative overflow-hidden rounded-3xl"
      >
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-[#F4ECE1] border border-[#E2D4C3] text-[#C5A059] mb-2 shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2C1A0E] uppercase tracking-wider font-semibold">
            Salam Restu &amp; Hadiah Digital
          </h2>
          <p className="text-xs text-[#5C3A21] font-medium max-w-md mx-auto mt-1 leading-relaxed">
            Kehadiran serta doa restu anda merupakan hadiah terindah buat kami. Namun sekiranya ingin menyampaikan salam ingatan digital, boleh menggunakan nombor akaun di bawah.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-3"></div>
        </div>

        {/* Gift Account Card - Groom Only */}
        <div className="max-w-md mx-auto">
          {GIFT_ACCOUNTS.slice(0, 1).map((acc, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#F4ECE1] border border-[#E2D4C3] rounded-2xl shadow-inner text-center relative overflow-hidden"
            >
              <div className="inline-block px-3 py-1 bg-[#3B2314] text-[#C5A059] text-xs font-bold rounded-full mb-3">
                {acc.bankName} • Akaun Pengantin Lelaki
              </div>

              {/* Groom's Name */}
              <h3 className="font-serif-title text-base sm:text-lg font-semibold text-[#2C1A0E] uppercase tracking-wide my-1">
                {acc.accountName}
              </h3>

              {/* Account Number Box */}
              <div className="my-4 p-4 bg-white border border-[#E2D4C3] rounded-xl flex items-center justify-between gap-3 shadow-xs">
                <div className="text-left">
                  <span className="text-[10px] text-[#5C3A21] uppercase font-bold block">Nombor Akaun Maybank</span>
                  <span className="text-base sm:text-lg font-bold font-mono tracking-widest text-[#2C1A0E]">
                    {acc.accountNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  className="px-3.5 py-2 bg-[#3B2314] hover:bg-[#2C1A0E] text-xs font-semibold text-white rounded-lg flex items-center gap-1.5 transition-all shadow-sm shrink-0 border border-[#C5A059]/40"
                >
                  {copiedAccount === acc.bankName ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* DuitNow ID & QR Option */}
              <div className="flex items-center justify-between text-xs text-[#5C3A21] pt-2 border-t border-[#E2D4C3]">
                <span className="font-medium">
                  ID DuitNow: <strong className="font-mono text-[#2C1A0E]">{acc.duitNowId}</strong>
                </span>
                <button
                  onClick={() => setSelectedQrModal(acc.bankName)}
                  className="px-3 py-1 bg-white hover:bg-[#3B2314] text-[#2C1A0E] hover:text-white font-bold rounded-full border border-[#E2D4C3] flex items-center gap-1 transition-all shadow-xs"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#C5A059]" />
                  Kod QR
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* QR Code Modal Display */}
        {selectedQrModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-[#E2D4C3] p-6 max-w-sm w-full text-center relative shadow-2xl rounded-3xl"
            >
              <button
                onClick={() => setSelectedQrModal(null)}
                className="absolute top-3 right-3 text-[#2C1A0E] hover:text-black text-lg font-bold w-8 h-8 bg-[#F4ECE1] border border-[#E2D4C3] rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {(() => {
                const acc = GIFT_ACCOUNTS.find((a) => a.bankName === selectedQrModal)!;
                const qrData = `DuitNow QR - Bank: ${acc.bankName}, Account: ${acc.accountNumber}, Name: ${acc.accountName}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=3B2314&bgcolor=FFFFFF`;

                return (
                  <div>
                    <h3 className="font-serif-title text-xl font-semibold text-[#2C1A0E] mb-1">
                      Kod QR {acc.bankName}
                    </h3>
                    <p className="text-xs text-[#7A6250] uppercase font-semibold mb-4">
                      {acc.accountName}
                    </p>

                    <div className="bg-white p-4 inline-block shadow-inner border border-[#E2D4C3] mb-4 rounded-2xl">
                      <img
                        src={qrUrl}
                        alt={`QR ${acc.bankName}`}
                        className="w-48 h-48 mx-auto object-contain"
                      />
                    </div>

                    <p className="text-xs text-[#2C1A0E] font-mono font-bold bg-[#F4ECE1] py-2 px-3 border border-[#E2D4C3] mb-4 rounded-xl">
                      {acc.accountNumber}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                        className="flex-1 py-2 bg-[#F4ECE1] hover:bg-[#e8dad0] border border-[#E2D4C3] text-xs font-semibold text-[#2C1A0E] flex items-center justify-center gap-1 rounded-xl"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
                        Salin No. Akaun
                      </button>
                      <button
                        onClick={() => setSelectedQrModal(null)}
                        className="py-2 px-4 bg-[#3B2314] text-white text-xs font-semibold rounded-xl border border-[#C5A059]/40"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}

      </motion.div>
    </section>
  );
};


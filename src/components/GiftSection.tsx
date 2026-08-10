import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, QrCode, Copy, Check, Heart, ExternalLink, Download } from 'lucide-react';
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
        className="bg-white p-6 sm:p-8 border border-[#E8A598]/40 shadow-sm relative overflow-hidden rounded-2xl"
      >
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#FDF0EE] border border-[#E8A598]/50 text-[#D98282] mb-2 shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <h2 className="font-serif-title text-xl text-[#2D2A26] uppercase tracking-wider font-bold">
            Salam Restu &amp; Hadiah Digital
          </h2>
          <p className="text-xs text-[#2E5A44] font-medium max-w-md mx-auto mt-1 leading-relaxed">
            Kehadiran serta doa restu anda merupakan hadiah terindah buat kami. Namun sekiranya ingin menyampaikan salam ingatan digital, boleh menggunakan nombor akaun di bawah.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E8A598] to-transparent mx-auto my-3"></div>
        </div>

        {/* Gift Account Card - Groom Only */}
        <div className="max-w-md mx-auto">
          {GIFT_ACCOUNTS.slice(0, 1).map((acc, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-[#E8A598]/50 rounded-2xl shadow-sm hover:shadow-md transition-all text-center relative overflow-hidden"
            >
              <div className="inline-block px-3 py-1 bg-[#FDF0EE] text-[#C05621] text-xs font-bold rounded-full mb-3 border border-[#E8A598]/40">
                {acc.bankName} • Akaun Pengantin Lelaki
              </div>

              {/* Groom's Name */}
              <h3 className="font-serif-title text-base sm:text-lg font-bold text-[#2D2A26] uppercase tracking-wide my-1">
                {acc.accountName}
              </h3>

              {/* Account Number Box */}
              <div className="my-4 p-4 bg-[#FAF5F0] border border-[#E2B887]/40 rounded-xl flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] text-[#2E5A44] uppercase font-bold block">Nombor Akaun Maybank</span>
                  <span className="text-base sm:text-lg font-bold font-mono tracking-widest text-[#2D2A26]">
                    {acc.accountNumber}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                  className="px-3 py-2 bg-[#2D2A26] hover:bg-[#4A453E] text-xs font-bold text-white rounded-lg flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                >
                  {copiedAccount === acc.bankName ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#E8A598]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* DuitNow ID & QR Option */}
              <div className="flex items-center justify-between text-xs text-[#2E5A44] pt-2 border-t border-[#E8A598]/20">
                <span className="font-medium">
                  ID DuitNow: <strong className="font-mono text-[#2D2A26]">{acc.duitNowId}</strong>
                </span>
                <button
                  onClick={() => setSelectedQrModal(acc.bankName)}
                  className="px-3 py-1 bg-[#FDF0EE] hover:bg-[#fbd8d1] text-[#D98282] font-bold rounded-full border border-[#E8A598]/50 flex items-center gap-1 transition-all"
                >
                  <QrCode className="w-3.5 h-3.5" />
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
              className="bg-white border border-[#E8E2D6] p-6 max-w-sm w-full text-center relative shadow-xl"
            >
              <button
                onClick={() => setSelectedQrModal(null)}
                className="absolute top-3 right-3 text-[#2D2A26] hover:text-black text-lg font-bold w-8 h-8 bg-[#F8F5F0] border border-[#E8E2D6] flex items-center justify-center"
              >
                ✕
              </button>

              {(() => {
                const acc = GIFT_ACCOUNTS.find((a) => a.bankName === selectedQrModal)!;
                const qrData = `DuitNow QR - Bank: ${acc.bankName}, Account: ${acc.accountNumber}, Name: ${acc.accountName}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=2D2A26&bgcolor=FFFFFF`;

                return (
                  <div>
                    <h3 className="font-serif-title text-xl font-bold text-[#2D2A26] mb-1">
                      Kod QR {acc.bankName}
                    </h3>
                    <p className="text-xs text-[#8C8478] uppercase font-semibold mb-4">
                      {acc.accountName}
                    </p>

                    <div className="bg-white p-4 inline-block shadow-sm border border-[#E8E2D6] mb-4">
                      <img
                        src={qrUrl}
                        alt={`QR ${acc.bankName}`}
                        className="w-48 h-48 mx-auto object-contain"
                      />
                    </div>

                    <p className="text-xs text-[#2D2A26] font-mono font-bold bg-[#F8F5F0] py-2 px-3 border border-[#E8E2D6] mb-4">
                      {acc.accountNumber}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(acc.accountNumber, acc.bankName)}
                        className="flex-1 py-2 bg-[#F8F5F0] hover:bg-[#E8E2D6] border border-[#E8E2D6] text-xs font-semibold text-[#2D2A26] flex items-center justify-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#8C7A5E]" />
                        Salin No. Akaun
                      </button>
                      <button
                        onClick={() => setSelectedQrModal(null)}
                        className="py-2 px-4 bg-[#2D2A26] text-[#FCFAF7] text-xs font-bold"
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

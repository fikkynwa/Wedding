import { ContactPerson, GiftAccount, PhotoItem, ScheduleEvent } from './types';

export const WEDDING_DETAILS = {
  groomNameShort: "Akim",
  brideNameShort: "Asyiqim",
  groomFullName: "Muhammad Hakim Bin Mohd Khairi",
  brideFullName: "Najma Asyiqim Binti Muhaizi",
  hostName: "Fatimah Binti Abu Bakar dan keluarga",
  groomParents: "Allahyarham MOHD KHAIRI BIN MOHAMED YUSOFF & Allahyarhamah FATAHIYAH BINTI ISMAIL",
  dateFull: "Sabtu, 3 Oktober 2026",
  dateHijri: "21 Rabiulakhir 1448H",
  dayName: "SABTU",
  dayNumber: "03",
  monthYear: "OKTOBER 2026",
  timeRange: "11.00 Pagi - 3.00 Petang",
  arrivalGroom: "12.30 Tengah Hari",
  address: "No. 300 Jalan Timur, Felda Trolak Selatan, 35600 Sungkai, Perak",
  locationName: "Teratak Kasih Felda Trolak Selatan",
  googleMapsUrl: "https://maps.google.com/?q=No.+300+Jalan+Timur,+Felda+Trolak+Selatan,+35600+Sungkai,+Perak",
  wazeUrl: "https://waze.com/ul?q=Felda+Trolak+Selatan+Sungkai+Perak",
  calendarEvent: {
    title: "Majlis Perkahwinan Akim & Asyiqim",
    details: "Walimatul Urus Muhammad Hakim & Najma Asyiqim di Felda Trolak Selatan, Sungkai, Perak.",
    location: "No. 300 Jalan Timur, Felda Trolak Selatan, 35600 Sungkai, Perak",
    startDate: "20261003T030000Z", // UTC for 11:00 MYT (11 - 8 = 3)
    endDate: "20261003T070000Z",   // UTC for 15:00 MYT
  }
};

export const CONTACTS: ContactPerson[] = [
  {
    name: "Aida",
    role: "Kakak",
    phone: "013-5948682",
    whatsappUrl: "https://wa.me/60135948682?text=Assalamualaikum%20Aida,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Shima",
    role: "Kakak",
    phone: "019-5948398",
    whatsappUrl: "https://wa.me/60195948398?text=Assalamualaikum%20Shima,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Fikri",
    role: "Abang",
    phone: "013-2286797",
    whatsappUrl: "https://wa.me/60132286797?text=Assalamualaikum%20Fikri,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Shamil",
    role: "Abang",
    phone: "019-2911169",
    whatsappUrl: "https://wa.me/60192911169?text=Assalamualaikum%20Shamil,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
];

export const SCHEDULE: ScheduleEvent[] = [
  {
    time: "11:00 AM",
    title: "Ketibaan Tetamu Jemputan",
    desc: "Jamuan makan bermula & alunan muzik instrumental perkahwinan.",
    iconName: "Users",
  },
  {
    time: "12:30 PM",
    title: "Ketibaan Pasangan Pengantin",
    desc: "Arak-arakan pengantin diiringi kompang & pencak silat pengantin.",
    iconName: "Heart",
  },
  {
    time: "1:00 PM",
    title: "Acara Tepuk Tawar & Bacaan Doa",
    desc: "Sesi restu keluarga, bacaan doa selamat & persandingan.",
    iconName: "Sparkles",
  },
  {
    time: "1:30 PM",
    title: "Makan Adab & Sesi Fotografi",
    desc: "Jamuan meja beradab bersama keluarga & sesi bergambar kenangan.",
    iconName: "Camera",
  },
  {
    time: "3:00 PM",
    title: "Majlis Bersurai",
    desc: "Ucapan penghargaan & penyampaian bunga telur / penutup majlis.",
    iconName: "Clock",
  },
];

export const GIFT_ACCOUNTS: GiftAccount[] = [
  {
    bankName: "Maybank",
    accountName: "MUHAMMAD HAKIM BIN MOHD KHAIRI",
    accountNumber: "162782910482",
    duitNowId: "0132286797",
    qrCodeUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    note: "DuitNow QR / Akaun Pengantin Lelaki",
  },
  {
    bankName: "CIMB Bank",
    accountName: "NAJMA ASYIQIM BINTI MUHAIZI",
    accountNumber: "7012391048",
    duitNowId: "0195948398",
    qrCodeUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    note: "DuitNow QR / Akaun Pengantin Perempuan",
  },
];

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: "p1",
    title: "Saat Memutuskan Harapan",
    caption: "Akim & Asyiqim di taman bunga pergunungan.",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80",
    category: "prewedding",
  },
  {
    id: "p2",
    title: "Pakaian Tradisional Melayu",
    caption: "Keindahan busana songket maroon pilihan hati.",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80",
    category: "prewedding",
  },
  {
    id: "p3",
    title: "Senyuman Bahagia",
    caption: "Langkah bersama menuju mahligai impian.",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&auto=format&fit=crop&q=80",
    category: "moments",
  },
  {
    id: "p4",
    title: "Malam Pertunangan",
    caption: "Cincin tanda diiringi doa keluarga tercinta.",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80",
    category: "moments",
  },
  {
    id: "p5",
    title: "Latar Floral Mawar",
    caption: "Harmoni warna burgundy dan putih berseri.",
    url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1000&auto=format&fit=crop&q=80",
    category: "prewedding",
  },
  {
    id: "p6",
    title: "Genggaman Mesra",
    caption: "Dua hati, satu impian hingga ke syurga.",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1000&auto=format&fit=crop&q=80",
    category: "moments",
  },
];

export const DOA_TEXT = {
  bismillah: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
  title: "Doa Buat Mempelai",
  content: "Ya Allah, Satukanlah hati kedua mempelai ini seperti mana Engkau satukan hati Adam & Hawa, Yusof & Zulaikha dan seperti Engkau satukan hati Muhammad S.A.W & Siti Khadijah. Satukanlah hati kedua mempelai ini dengan iman, kejayaan dan tawakal. Kurniakanlah mereka zuriat yang soleh dan solehah serta berikanlah ketenangan kepada mereka di dunia dan akhirat.",
  amin: "Amin ya rabbal'alamin.",
  closing: "Semoga dengan kehadiran anda dapat memeriahkan lagi majlis kami."
};

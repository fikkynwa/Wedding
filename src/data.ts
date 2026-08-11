import { ContactPerson, GiftAccount, PhotoItem, ScheduleEvent } from './types';

export const WEDDING_DETAILS = {
  groomNameShort: "Aqim",
  brideNameShort: "Asyiqim",
  groomFullName: "Muhammad Hakim Bin Mohd Khairi",
  brideFullName: "Najma Asyiqim Binti Muhaizi",
  hostName: "Fatimah Binti Abu Bakar dan keluarga",
  groomParents: "Allahyarham MOHD KHAIRI BIN MOHAMED YUSOFF\n&\nAllahyarhamah FATAHIYAH BINTI ISMAIL",
  dateFull: "Sabtu, 3 Oktober 2026",
  dateHijri: "21 Rabiulakhir 1448H",
  dayName: "SABTU",
  dayNumber: "03",
  monthYear: "OKTOBER 2026",
  timeRange: "11.00 Pagi - 3.00 Petang",
  arrivalGroom: "12.30 Tengah Hari",
  address: "No. 300 Jalan Timur, Felda Trolak Selatan, 35600 Sungkai, Perak",
  locationName: "Felda Trolak Selatan",
  googleMapsUrl: "https://maps.google.com/?q=No.+300+Jalan+Timur,+Felda+Trolak+Selatan,+35600+Sungkai,+Perak",
  wazeUrl: "https://waze.com/ul?q=Felda+Trolak+Selatan+Sungkai+Perak",
  calendarEvent: {
    title: "Majlis Perkahwinan Aqim & Asyiqim",
    details: "Walimatul Urus Muhammad Hakim & Najma Asyiqim di Felda Trolak Selatan, Sungkai, Perak.",
    location: "No. 300 Jalan Timur, Felda Trolak Selatan, 35600 Sungkai, Perak",
    startDate: "20261003T030000Z", // UTC for 11:00 MYT (11 - 8 = 3)
    endDate: "20261003T070000Z",   // UTC for 15:00 MYT
  }
};

export const YOUTUBE_BACKGROUND_MUSIC = {
  url: "https://www.youtube.com/watch?v=52K-UgfHDU8&list=RD52K-UgfHDU8&start_radio=1",
  videoId: "52K-UgfHDU8",
  title: "Lagu Latar Perkahwinan (YouTube Instrumental)",
};

export const CONTACTS: ContactPerson[] = [
  {
    name: "Aida",
    role: "Kakak",
    phone: "013-5948682",
    whatsappUrl: "https://wa.me/60135948682?text=Assalamualaikum%20Aida,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Aqim%20%26%20Asyiqim",
  },
  {
    name: "Shima",
    role: "Kakak",
    phone: "019-5948398",
    whatsappUrl: "https://wa.me/60195948398?text=Assalamualaikum%20Shima,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Aqim%20%26%20Asyiqim",
  },
  {
    name: "Fikri",
    role: "Abang",
    phone: "013-2286797",
    whatsappUrl: "https://wa.me/60132286797?text=Assalamualaikum%20Fikri,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Aqim%20%26%20Asyiqim",
  },
  {
    name: "Shamil",
    role: "Abang",
    phone: "019-2911169",
    whatsappUrl: "https://wa.me/60192911169?text=Assalamualaikum%20Shamil,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Aqim%20%26%20Asyiqim",
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
    desc: "Arak-arakan pengantin diiringi kompang.",
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
    accountNumber: "158154392623",
    qrCodeUrl: "/qr.png",
    note: "Akaun Maybank / QR Pengantin Lelaki",
  },
  {
    bankName: "CIMB Bank",
    accountName: "NAJMA ASYIQIM BINTI MUHAIZI",
    accountNumber: "7012391048",
    qrCodeUrl: "/qr.png",
    note: "Akaun CIMB / QR Pengantin Perempuan",
  },
];

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: "p1",
    title: "Saat Memutuskan Harapan",
    caption: "Aqim & Asyiqim di taman bunga pergunungan.",
    url: "/wedgallery1.png",
    category: "prewedding",
  },
  {
    id: "p2",
    title: "Pakaian Tradisional Melayu",
    caption: "Keindahan busana songket maroon pilihan hati.",
    url: "/wedgallery2.png",
    category: "prewedding",
  },
  {
    id: "p3",
    title: "Senyuman Bahagia",
    caption: "Langkah bersama menuju mahligai impian.",
    url: "/wedgallery3.png",
    category: "moments",
  },
  {
    id: "p4",
    title: "Malam Pertunangan",
    caption: "Cincin tanda diiringi doa keluarga tercinta.",
    url: "/wedgallery4.png",
    category: "moments",
  },
  {
    id: "p5",
    title: "Latar Floral Mawar",
    caption: "Harmoni warna burgundy dan putih berseri.",
    url: "/wedgallery5.png",
    category: "prewedding",
  },
  {
    id: "p6",
    title: "Genggaman Mesra",
    caption: "Dua hati, satu impian hingga ke syurga.",
    url: "/wedgallery6.png",
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

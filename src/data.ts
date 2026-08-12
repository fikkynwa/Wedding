import { ContactPerson, GiftAccount, PhotoItem, ScheduleEvent } from './types';

export const WEDDING_DETAILS = {
  groomNameShort: "Akim",
  brideNameShort: "Asyiqim",
  groomFullName: "Muhammad Hakim Bin Mohd Khairi",
  brideFullName: "Najma Asyiqim Binti Muhaizi",
  hostName: "Fatimah Binti Abu Bakar dan keluarga",
  hostNameEn: "Fatimah Binti Abu Bakar and family",
  groomParents: "Allahyarham MOHD KHAIRI BIN MOHAMED YUSOFF\n&\nAllahyarhamah FATAHIYAH BINTI ISMAIL",
  groomParentsEn: "The Late MOHD KHAIRI BIN MOHAMED YUSOFF\n&\nThe Late FATAHIYAH BINTI ISMAIL",
  dateFull: "Sabtu, 3 Oktober 2026",
  dateFullEn: "Saturday, 3 October 2026",
  dateHijri: "21 Rabiulakhir 1448H",
  dateHijriEn: "21 Rabi' al-Thani 1448H",
  dayName: "SABTU",
  dayNameEn: "SATURDAY",
  dayNumber: "03",
  monthYear: "OKTOBER 2026",
  monthYearEn: "OCTOBER 2026",
  timeRange: "11.00 Pagi - 3.00 Petang",
  timeRangeEn: "11:00 AM - 3:00 PM",
  arrivalGroom: "12.30 Tengah Hari",
  arrivalGroomEn: "12:30 PM",
  address: "No. 300 Jalan Timur, Felda Trolak Selatan, 35600 Sungkai, Perak",
  locationName: "Felda Trolak Selatan",
  googleMapsUrl: "https://maps.app.goo.gl/PWVfTFKZyGcMmJuM9",
  wazeUrl: "https://www.waze.com/ul?q=Felda+Trolak+Selatan+Sungkai+Perak&navigate=yes",
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
    roleEn: "Sister",
    phone: "013-5948682",
    whatsappUrl: "https://wa.me/60135948682?text=Assalamualaikum%20Aida,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Shima",
    role: "Kakak",
    roleEn: "Sister",
    phone: "019-5948398",
    whatsappUrl: "https://wa.me/60195948398?text=Assalamualaikum%20Shima,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Fikri",
    role: "Abang",
    roleEn: "Brother",
    phone: "013-2286797",
    whatsappUrl: "https://wa.me/60132286797?text=Assalamualaikum%20Fikri,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
  {
    name: "Shamil",
    role: "Abang",
    roleEn: "Brother",
    phone: "019-2911169",
    whatsappUrl: "https://wa.me/60192911169?text=Assalamualaikum%20Shamil,%20saya%20ingin%20bertanya%20berkenaan%20Majlis%20Perkahwinan%20Akim%20%26%20Asyiqim",
  },
];

export const SCHEDULE: ScheduleEvent[] = [
  {
    time: "11:00 AM",
    title: "Ketibaan Tetamu",
    titleEn: "Guest Arrival",
    desc: "Jamuan makan bermula.",
    descEn: "Buffet banquet begins.",
    iconName: "Users",
  },
  {
    time: "12:30 PM",
    title: "Ketibaan Pasangan Pengantin",
    titleEn: "Bride & Groom Arrival",
    desc: "Perarakan pengantin.",
    descEn: "Grand entrance procession.",
    iconName: "Heart",
  },
  {
    time: "1:00 PM",
    title: "Acara Tepung Tawar & Bacaan Doa",
    titleEn: "Tepung Tawar Ceremony & Prayer",
    desc: "Sesi restu keluarga, bacaan doa selamat & persandingan.",
    descEn: "Family blessings, doa selamat & bridal dais.",
    iconName: "Sparkles",
  },
  {
    time: "1:30 PM",
    title: "Makan Beradab & Sesi Fotografi",
    titleEn: "Wedding Feast & Photography",
    desc: "Jamuan meja beradab bersama keluarga & sesi bergambar kenangan.",
    descEn: "Adorned dining table with family & photo memories.",
    iconName: "Camera",
  },
  {
    time: "3:00 PM",
    title: "Majlis Bersurai",
    titleEn: "End of Ceremony",
    desc: "Penutup majlis.",
    descEn: "Conclusion of the event.",
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
    caption: "Akim & Asyiqim di taman bunga pergunungan.",
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
  closing: "Semoga dengan kehadiran anda dapat memeriahkan lagi majlis kami.",
  closingEn: "May your presence grace and enliven our celebration."
};

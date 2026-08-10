export type LanguageCode = 'ms' | 'en' | 'zh' | 'ta' | 'ar';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: string;
}

export interface RSVP {
  id: string;
  name: string;
  phone: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  pax: number;
  wishes?: string;
  createdAt: string;
}

export interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
  likes: number;
}

export interface PhotoItem {
  id: string;
  title: string;
  caption: string;
  url: string;
  category: 'prewedding' | 'repetition' | 'moments';
}

export interface GiftAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrCodeUrl: string;
  duitNowId?: string;
  note: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
  iconName: string;
}

export interface ContactPerson {
  name: string;
  role: string;
  phone: string;
  whatsappUrl: string;
}

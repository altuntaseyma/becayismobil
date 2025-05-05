interface KurumKategorileri {
  [key: string]: string[];
}

export const kurumTurleri = [
  'Bakanlık',
  'Üniversite',
  'Belediye',
  'Valilik',
  'Emniyet Müdürlüğü',
  'Milli Eğitim Müdürlüğü',
  'Sağlık Müdürlüğü',
  'Adliye',
  'Diğer'
] as const;

export const kurumKategorileri = [
  'Diğer Kamu Kurumları',
  'Gelir İdaresi Başkanlığı'
] as const;

export const iller = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
  'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
  'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum',
  'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin',
  'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli',
  'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt',
  'Karaman', 'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük',
  'Kilis', 'Osmaniye', 'Düzce'
] as const;

export const kurumlar: { [key: string]: string[] } = {
  'Diğer Kamu Kurumları': ['Diğer Kurumlar'],
  'Gelir İdaresi Başkanlığı': ['Gelir İdaresi Başkanlığı']
};

export const ilceler: { [key: string]: string[] } = {
  'Elazığ': ['Merkez', 'Ağın', 'Alacakaya', 'Arıcak', 'Baskil', 'Karakoçan', 'Keban', 'Kovancılar', 'Maden', 'Palu', 'Sivrice'],
  // Diğer iller için ilçeler eklenebilir
}; 
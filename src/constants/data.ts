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
  'Milli Eğitim Bakanlığı',
  'Sağlık Bakanlığı',
  'İçişleri Bakanlığı',
  'Adalet Bakanlığı',
  'Diğer Bakanlıklar'
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

export const kurumlar: Record<string, string[]> = {
  'Milli Eğitim Bakanlığı': [
    'İlkokul',
    'Ortaokul',
    'Lise',
    'Mesleki ve Teknik Anadolu Lisesi',
    'İl Milli Eğitim Müdürlüğü',
    'İlçe Milli Eğitim Müdürlüğü'
  ],
  'Sağlık Bakanlığı': [
    'Devlet Hastanesi',
    'Eğitim ve Araştırma Hastanesi',
    'Aile Sağlığı Merkezi',
    'İl Sağlık Müdürlüğü',
    'İlçe Sağlık Müdürlüğü'
  ],
  'İçişleri Bakanlığı': [
    'Valilik',
    'Kaymakamlık',
    'İl Emniyet Müdürlüğü',
    'İlçe Emniyet Müdürlüğü',
    'Jandarma Komutanlığı'
  ],
  'Adalet Bakanlığı': [
    'Adliye',
    'Ceza İnfaz Kurumu',
    'Denetimli Serbestlik Müdürlüğü'
  ],
  'Diğer Bakanlıklar': [
    'Diğer Kamu Kurumları'
  ]
};

export const ilceler: { [key: string]: string[] } = {
  'Adana': [
    'Aladağ', 'Ceyhan', 'Çukurova', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan',
    'Pozantı', 'Saimbeyli', 'Sarıçam', 'Seyhan', 'Tufanbeyli', 'Yumurtalık', 'Yüreğir'
  ],
  'İstanbul': [
    'Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy',
    'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece',
    'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa',
    'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik',
    'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli',
    'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'
  ],
  'Ankara': [
    'Akyurt', 'Altındağ', 'Ayaş', 'Balâ', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk',
    'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kalecik', 'Kahramankazan',
    'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan',
    'Şereflikoçhisar', 'Yenimahalle'
  ]
}; 
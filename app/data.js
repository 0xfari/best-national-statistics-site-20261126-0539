// Angka-angka Indonesia. Setiap deret dicatat bersama sumber dan tahunnya, persis
// seperti yang tampil di halaman — tidak ada angka yang dikarang. Sumber utama:
// Badan Pusat Statistik (BPS), www.bps.go.id. Nilai penduduk adalah estimasi
// pertengahan tahun; PDB, inflasi, pengangguran, kemiskinan, dan IPM mengikuti
// rilis resmi BPS yang dikutip di bawah tiap grafik.

export const SITE = {
  name: 'NusaData',
  tagline: 'Statistik Indonesia, dibaca dengan mudah',
  country: 'Indonesia',
  updated: '26 November 2026',
  note: 'Situs independen. Bukan situs resmi Badan Pusat Statistik.',
};

// Kartu angka utama di beranda: nilai terbaru, nilai tahun sebelumnya, dan satuan.
export const HEADLINE = [
  {
    slug: 'penduduk',
    label: 'Penduduk',
    value: '281,6 jt',
    unit: 'jiwa, pertengahan 2024',
    previous: '278,7 jt (2023)',
    change: '+1,0%',
    source: 'BPS, Proyeksi Penduduk 2015–2045',
  },
  {
    slug: 'ekonomi',
    label: 'Pertumbuhan ekonomi',
    value: '5,03%',
    unit: 'PDB riil y-on-y, 2024',
    previous: '5,05% (2023)',
    change: '−0,02 pp',
    source: 'BPS, PDB Tahunan 2024',
  },
  {
    slug: 'ekonomi',
    label: 'PDB nominal',
    value: 'Rp22.139 T',
    unit: 'harga berlaku, 2024',
    previous: 'Rp20.892 T (2023)',
    change: '+5,97%',
    source: 'BPS, PDB Tahunan 2024',
  },
  {
    slug: 'ekonomi',
    label: 'Inflasi',
    value: '1,57%',
    unit: 'IHK y-on-y, Des 2024',
    previous: '2,61% (Des 2023)',
    change: '−1,04 pp',
    source: 'BPS, Indeks Harga Konsumen',
  },
  {
    slug: 'tenaga-kerja',
    label: 'Pengangguran',
    value: '4,91%',
    unit: 'TPT, Agustus 2024',
    previous: '5,32% (Agu 2023)',
    change: '−0,41 pp',
    source: 'BPS, Sakernas Agustus 2024',
  },
  {
    slug: 'kemiskinan',
    label: 'Penduduk miskin',
    value: '9,03%',
    unit: '25,22 juta jiwa, Mar 2024',
    previous: '9,36% (Mar 2023)',
    change: '−0,33 pp',
    source: 'BPS, Kemiskinan Maret 2024',
  },
  {
    slug: 'kemiskinan',
    label: 'Indeks Pembangunan Manusia',
    value: '75,02',
    unit: 'IPM, 2024',
    previous: '74,39 (2023)',
    change: '+0,63',
    source: 'BPS, IPM 2024',
  },
  {
    slug: 'ekonomi',
    label: 'Surplus perdagangan',
    value: 'US$31,04 M',
    unit: 'ekspor − impor, 2024',
    previous: 'US$36,89 M (2023)',
    change: '−US$5,85 M',
    source: 'BPS, Ekspor–Impor 2024',
  },
];

// Deret tahunan. Setiap entri: { year, value }.
export const SERIES = {
  population: {
    title: 'Jumlah penduduk',
    unit: 'juta jiwa',
    source: 'BPS, Sensus Penduduk 2020 dan Proyeksi Penduduk 2015–2045',
    points: [
      { year: 2015, value: 255.59 },
      { year: 2016, value: 258.7 },
      { year: 2017, value: 261.89 },
      { year: 2018, value: 264.97 },
      { year: 2019, value: 267.66 },
      { year: 2020, value: 270.2 },
      { year: 2021, value: 273.1 },
      { year: 2022, value: 275.77 },
      { year: 2023, value: 278.69 },
      { year: 2024, value: 281.6 },
    ],
  },
  gdpGrowth: {
    title: 'Pertumbuhan ekonomi (PDB riil)',
    unit: '% y-on-y',
    source: 'BPS, Produk Domestik Bruto Tahunan',
    points: [
      { year: 2015, value: 4.88 },
      { year: 2016, value: 5.03 },
      { year: 2017, value: 5.07 },
      { year: 2018, value: 5.17 },
      { year: 2019, value: 5.02 },
      { year: 2020, value: -2.07 },
      { year: 2021, value: 3.7 },
      { year: 2022, value: 5.31 },
      { year: 2023, value: 5.05 },
      { year: 2024, value: 5.03 },
    ],
  },
  inflation: {
    title: 'Inflasi (IHK, Desember)',
    unit: '% y-on-y',
    source: 'BPS, Indeks Harga Konsumen, Desember tiap tahun',
    points: [
      { year: 2015, value: 3.35 },
      { year: 2016, value: 3.02 },
      { year: 2017, value: 3.61 },
      { year: 2018, value: 3.13 },
      { year: 2019, value: 2.72 },
      { year: 2020, value: 1.68 },
      { year: 2021, value: 1.87 },
      { year: 2022, value: 5.51 },
      { year: 2023, value: 2.61 },
      { year: 2024, value: 1.57 },
    ],
  },
  unemployment: {
    title: 'Tingkat Pengangguran Terbuka',
    unit: '% dari angkatan kerja',
    source: 'BPS, Survei Angkatan Kerja Nasional (Sakernas), Agustus',
    points: [
      { year: 2019, value: 5.28 },
      { year: 2020, value: 7.07 },
      { year: 2021, value: 6.49 },
      { year: 2022, value: 5.86 },
      { year: 2023, value: 5.32 },
      { year: 2024, value: 4.91 },
    ],
  },
  poverty: {
    title: 'Persentase penduduk miskin',
    unit: '% dari penduduk',
    source: 'BPS, Kemiskinan, Maret tiap tahun',
    points: [
      { year: 2019, value: 9.41 },
      { year: 2020, value: 9.78 },
      { year: 2021, value: 10.14 },
      { year: 2022, value: 9.54 },
      { year: 2023, value: 9.36 },
      { year: 2024, value: 9.03 },
    ],
  },
  gini: {
    title: 'Rasio Gini',
    unit: '0 = merata, 1 = timpang',
    source: 'BPS, Rasio Gini, Maret tiap tahun',
    points: [
      { year: 2019, value: 0.382 },
      { year: 2020, value: 0.381 },
      { year: 2021, value: 0.384 },
      { year: 2022, value: 0.381 },
      { year: 2023, value: 0.379 },
      { year: 2024, value: 0.379 },
    ],
  },
  hdi: {
    title: 'Indeks Pembangunan Manusia',
    unit: 'skala 0–100',
    source: 'BPS, Indeks Pembangunan Manusia',
    points: [
      { year: 2015, value: 69.55 },
      { year: 2016, value: 70.18 },
      { year: 2017, value: 70.81 },
      { year: 2018, value: 71.39 },
      { year: 2019, value: 71.92 },
      { year: 2020, value: 71.94 },
      { year: 2021, value: 72.29 },
      { year: 2022, value: 73.37 },
      { year: 2023, value: 74.39 },
      { year: 2024, value: 75.02 },
    ],
  },
};

// Pangsa PDB menurut lapangan usaha, 2024 (harga berlaku). Jumlahnya 100%.
export const SECTORS = [
  { name: 'Industri pengolahan', share: 18.67 },
  { name: 'Perdagangan besar dan eceran', share: 12.93 },
  { name: 'Pertanian, kehutanan, perikanan', share: 12.53 },
  { name: 'Konstruksi', share: 9.71 },
  { name: 'Pertambangan dan penggalian', share: 8.44 },
  { name: 'Lapangan usaha lainnya', share: 37.72 },
];

// Penduduk tiap provinsi, estimasi pertengahan 2024, juta jiwa (BPS).
// Kepulauan: Jawa 156,92 jt (55,7%), Sumatra 61,57 jt, Kalimantan 17,53 jt,
// Sulawesi 20,71 jt, Bali & Nusa Tenggara 15,56 jt, Maluku & Papua 9,09 jt.
export const PROVINCES = [
  { name: 'Jawa Barat', region: 'Jawa', pop: 50.35 },
  { name: 'Jawa Timur', region: 'Jawa', pop: 41.81 },
  { name: 'Jawa Tengah', region: 'Jawa', pop: 37.89 },
  { name: 'Sumatera Utara', region: 'Sumatra', pop: 15.59 },
  { name: 'Banten', region: 'Jawa', pop: 12.43 },
  { name: 'DKI Jakarta', region: 'Jawa', pop: 10.68 },
  { name: 'Sulawesi Selatan', region: 'Sulawesi', pop: 9.36 },
  { name: 'Lampung', region: 'Sumatra', pop: 9.24 },
  { name: 'Sumatera Selatan', region: 'Sumatra', pop: 8.94 },
  { name: 'Riau', region: 'Sumatra', pop: 6.85 },
  { name: 'Sumatera Barat', region: 'Sumatra', pop: 5.9 },
  { name: 'Kalimantan Barat', region: 'Kalimantan', pop: 5.8 },
  { name: 'Nusa Tenggara Timur', region: 'Bali & Nusa Tenggara', pop: 5.66 },
  { name: 'Aceh', region: 'Sumatra', pop: 5.6 },
  { name: 'Nusa Tenggara Barat', region: 'Bali & Nusa Tenggara', pop: 5.55 },
  { name: 'Bali', region: 'Bali & Nusa Tenggara', pop: 4.35 },
  { name: 'Kalimantan Selatan', region: 'Kalimantan', pop: 4.24 },
  { name: 'Kalimantan Timur', region: 'Kalimantan', pop: 3.95 },
  { name: 'DI Yogyakarta', region: 'Jawa', pop: 3.76 },
  { name: 'Jambi', region: 'Sumatra', pop: 3.65 },
  { name: 'Sulawesi Tengah', region: 'Sulawesi', pop: 3.06 },
  { name: 'Kalimantan Tengah', region: 'Kalimantan', pop: 2.81 },
  { name: 'Sulawesi Tenggara', region: 'Sulawesi', pop: 2.74 },
  { name: 'Sulawesi Utara', region: 'Sulawesi', pop: 2.72 },
  { name: 'Kepulauan Riau', region: 'Sumatra', pop: 2.19 },
  { name: 'Bengkulu', region: 'Sumatra', pop: 2.09 },
  { name: 'Maluku', region: 'Maluku & Papua', pop: 1.99 },
  { name: 'Sulawesi Barat', region: 'Sulawesi', pop: 1.6 },
  { name: 'Kepulauan Bangka Belitung', region: 'Sumatra', pop: 1.52 },
  { name: 'Papua Pegunungan', region: 'Maluku & Papua', pop: 1.46 },
  { name: 'Maluku Utara', region: 'Maluku & Papua', pop: 1.41 },
  { name: 'Papua Tengah', region: 'Maluku & Papua', pop: 1.38 },
  { name: 'Gorontalo', region: 'Sulawesi', pop: 1.23 },
  { name: 'Papua', region: 'Maluku & Papua', pop: 1.11 },
  { name: 'Kalimantan Utara', region: 'Kalimantan', pop: 0.73 },
  { name: 'Papua Barat Daya', region: 'Maluku & Papua', pop: 0.61 },
  { name: 'Papua Barat', region: 'Maluku & Papua', pop: 0.58 },
  { name: 'Papua Selatan', region: 'Maluku & Papua', pop: 0.55 },
];

// Fakta singkat tentang Indonesia, masing-masing dengan sumber.
export const FACTS = [
  { label: 'Ibu kota', value: 'Jakarta', note: 'Ibu Kota Nusantara (IKN) di Kalimantan Timur sedang dibangun' },
  { label: 'Jumlah provinsi', value: '38', note: 'Sejak 2022, setelah empat provinsi baru di Papua' },
  { label: 'Kabupaten dan kota', value: '514', note: '416 kabupaten dan 98 kota (BPS, 2024)' },
  { label: 'Luas daratan', value: '1,9 jt km²', note: 'Kepulauan terbesar di dunia, 17 ribu pulau' },
  { label: 'Bahasa daerah', value: '718', note: 'Bahasa daerah (Kemdikbudristek, 2024)' },
  { label: 'Harapan hidup', value: '74,1 tahun', note: 'Umur harapan hidup saat lahir, 2024 (BPS)' },
  { label: 'Ekspor 2024', value: 'US$264,70 M', note: 'Impor US$233,66 M; surplus US$31,04 M (BPS)' },
  { label: 'PDB per kapita 2024', value: 'Rp78,62 jt', note: 'Sekitar US$4.785 (BPS)' },
];

// Kalender rilis BPS yang jadi rujukan halaman ini.
export const RELEASES = [
  { date: 'Jan 2026', item: 'Indeks Harga Konsumen Desember 2025', source: 'BPS' },
  { date: 'Feb 2026', item: 'Pertumbuhan Ekonomi 2025 (PDB Tahunan)', source: 'BPS' },
  { date: 'Mar 2026', item: 'Keadaan Ketenagakerjaan Agustus 2025', source: 'BPS' },
  { date: 'Jul 2026', item: 'Kemiskinan Maret 2026', source: 'BPS' },
  { date: 'Nov 2026', item: 'Indeks Pembangunan Manusia 2025', source: 'BPS' },
  { date: 'Des 2026', item: 'Proyeksi Penduduk 2025–2050', source: 'BPS' },
];

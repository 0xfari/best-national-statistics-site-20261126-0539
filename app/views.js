// Template tiap halaman. Setiap halaman mengembalikan HTML lengkap untuk
// #app; kontrol (tombol rentang, tab, pencarian, urutan) diberi atribut
// data-* dan dihubungkan main.js. Semua angka datang dari data.js.

import { barChart, donutChart, fmtNum, hbarChart, lineChart } from './charts.js';
import { FACTS, HEADLINE, PROVINCES, RELEASES, SECTORS, SERIES } from './data.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function sourceLine(source) {
  return `<p class="source">Sumber: ${esc(source)}</p>`;
}

function figureCard(title, unit, chartHtml, source, controls = '') {
  return `<section class="figure">
    <div class="figure-head"><h2>${esc(title)}</h2><span class="unit">${esc(unit)}</span></div>
    ${controls}
    <div class="chart">${chartHtml}</div>
    ${sourceLine(source)}
  </section>`;
}

function rangeButtons(key, current) {
  return `<div class="controls" role="group" aria-label="Rentang tahun">
    <button type="button" data-range="${key}" data-years="5" class="${current === 5 ? 'active' : ''}">5 tahun</button>
    <button type="button" data-range="${key}" data-years="10" class="${current === 10 ? 'active' : ''}">10 tahun</button>
  </div>`;
}

function typeButtons(key, current) {
  return `<div class="controls" role="group" aria-label="Jenis grafik">
    <button type="button" data-chart-type="${key}" data-kind="line" class="${current === 'line' ? 'active' : ''}">Garis</button>
    <button type="button" data-chart-type="${key}" data-kind="bar" class="${current === 'bar' ? 'active' : ''}">Batang</button>
  </div>`;
}

function kpiCard(item) {
  const up = !item.change.startsWith('−');
  return `<a class="kpi" href="#/${item.slug}">
    <span class="kpi-label">${esc(item.label)}</span>
    <span class="kpi-value">${esc(item.value)}</span>
    <span class="kpi-unit">${esc(item.unit)}</span>
    <span class="kpi-prev">${esc(item.previous)} · <b class="${up ? 'good' : 'bad'}">${esc(item.change)}</b></span>
    <span class="kpi-source">${esc(item.source)}</span>
  </a>`;
}

export function home(state) {
  const cards = HEADLINE.map(kpiCard).join('');
  const pop = SERIES.population;
  const latest = pop.points.slice(-6);
  const facts = FACTS.map(
    (f) => `<li><b>${esc(f.value)}</b><span>${esc(f.label)}</span><small>${esc(f.note)}</small></li>`,
  ).join('');
  const releases = RELEASES.slice(0, 4)
    .map((r) => `<li><span class="rel-date">${esc(r.date)}</span>${esc(r.item)}</li>`)
    .join('');
  return `<section class="hero">
    <p class="eyebrow">Indonesia · Data resmi Badan Pusat Statistik</p>
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Penduduk, ekonomi, pekerjaan, dan kesejahteraan — 281,6 juta jiwa, satu halaman
    untuk melihat arah negara. Setiap angka di sini punya sumber dan tahun.</p>
    <p class="hero-links"><a class="btn" href="#/penduduk">Lihat penduduk</a>
    <a class="btn ghost" href="#/ekonomi">Lihat ekonomi</a></p>
  </section>
  <section class="kpis" aria-label="Angka utama">${cards}</section>
  ${figureCard(pop.title, pop.unit, lineChart(latest), pop.source)}
  <section class="two-col">
    <div>
      <h2>Kenali Indonesia sekilas</h2>
      <ul class="facts">${facts}</ul>
    </div>
    <div>
      <h2>Rilis BPS berikutnya</h2>
      <ul class="releases">${releases}</ul>
      <p><a href="#/tentang">Kalender rilis lengkap &rarr;</a></p>
    </div>
  </section>
  <section class="explore">
    <h2>Jelajahi menurut topik</h2>
    <ul class="topics">
      <li><a href="#/penduduk"><b>Penduduk</b><span>281,6 juta jiwa di 38 provinsi</span></a></li>
      <li><a href="#/ekonomi"><b>Ekonomi</b><span>PDB tumbuh 5,03% pada 2024</span></a></li>
      <li><a href="#/tenaga-kerja"><b>Tenaga kerja</b><span>Pengangguran 4,91%</span></a></li>
      <li><a href="#/kemiskinan"><b>Kemiskinan</b><span>9,03% penduduk masih miskin</span></a></li>
      <li><a href="#/provinsi"><b>Provinsi</b><span>Bandingkan 38 provinsi</span></a></li>
    </ul>
  </section>`;
}

export function populationPage(state) {
  const series = SERIES.population;
  const years = state.range.population ?? 10;
  const points = series.points.slice(-years);
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Penduduk Indonesia</h1>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Lebih dari
  separuh penduduknya tinggal di Jawa, dan jumlahnya bertambah sekitar 2,9 juta jiwa setiap tahun.</p>
  ${figureCard(series.title, series.unit, lineChart(points), series.source, rangeButtons('population', years))}
  <section class="two-col">
    <div>
      <h2>Sepuluh provinsi terbesar</h2>
      <div class="chart">${hbarChart(top10)}</div>
      ${sourceLine('BPS, Estimasi Penduduk Pertengahan 2024 (juta jiwa)')}
      <p><a href="#/provinsi">Tabel lengkap 38 provinsi &rarr;</a></p>
    </div>
    <div>
      <h2>Struktur wilayah</h2>
      <ul class="facts">
        <li><b>55,7%</b><span>penduduk tinggal di Jawa</span><small>156,92 juta dari 281,6 juta jiwa</small></li>
        <li><b>21,9%</b><span>penduduk tinggal di Sumatra</span><small>61,57 juta jiwa</small></li>
        <li><b>38</b><span>provinsi</span><small>514 kabupaten dan kota</small></li>
        <li><b>1,9 jt km²</b><span>luas daratan</span><small>17 ribu pulau</small></li>
      </ul>
    </div>
  </section>`;
}

export function economyPage(state) {
  const growth = SERIES.gdpGrowth;
  const inflation = SERIES.inflation;
  const gyears = state.range.growth ?? 10;
  const gpoints = growth.points.slice(-gyears);
  const kind = state.chartType.inflation ?? 'line';
  const ipoints = inflation.points.slice(-10);
  const chart = kind === 'bar' ? barChart(ipoints) : lineChart(ipoints);
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Ekonomi Indonesia</h1>
  <p class="lede">Perekonomian Indonesia tumbuh di atas 5% selama tiga tahun berturut-turut
  setelah kontraksi pandemi 2020. Inflasi kembali ke kisaran rendah pada 2024.</p>
  ${figureCard(growth.title, growth.unit, barChart(gpoints), growth.source, rangeButtons('growth', gyears))}
  <section class="two-col">
    <div>
      <h2>PDB menurut lapangan usaha, 2024</h2>
      <div class="chart">${donutChart(SECTORS)}</div>
      ${sourceLine('BPS, PDB Tahunan 2024 (harga berlaku)')}
    </div>
    <div>
      <h2>Perdagangan luar negeri 2024</h2>
      <ul class="facts">
        <li><b>US$264,70 M</b><span>ekspor</span><small>Naik 2,35% dari 2023</small></li>
        <li><b>US$233,66 M</b><span>impor</span><small>Naik 5,58% dari 2023</small></li>
        <li><b>US$31,04 M</b><span>surplus neraca dagang</span><small>Surplus 61 bulan beruntun sejak Mei 2020</small></li>
        <li><b>Rp78,62 jt</b><span>PDB per kapita 2024</span><small>Sekitar US$4.785</small></li>
      </ul>
    </div>
  </section>
  ${figureCard(inflation.title, inflation.unit, chart, inflation.source, typeButtons('inflation', kind))}`;
}

export function laborPage(state) {
  const series = SERIES.unemployment;
  const kind = state.chartType.unemployment ?? 'line';
  const chart = kind === 'bar' ? barChart(series.points) : lineChart(series.points);
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Tenaga kerja</h1>
  <p class="lede">Pengangguran turun ke titik terendah sejak sebelum pandemi: 4,91% pada
  Agustus 2024, dari puncak 7,07% pada Agustus 2020.</p>
  ${figureCard(series.title, series.unit, chart, series.source, typeButtons('unemployment', kind))}
  <section>
    <h2>Angkatan kerja, Agustus 2024</h2>
    <table class="data-table">
      <thead><tr><th>Indikator</th><th>Nilai</th><th>Keterangan</th></tr></thead>
      <tbody>
        <tr><td>Angkatan kerja</td><td>152,11 juta</td><td>Naik 2,33 juta dari Agustus 2023</td></tr>
        <tr><td>Bekerja</td><td>144,64 juta</td><td>95,09% dari angkatan kerja</td></tr>
        <tr><td>Pengangguran</td><td>7,47 juta</td><td>TPT 4,91%</td></tr>
        <tr><td>Pekerja informal</td><td>58,72%</td><td>Dari penduduk bekerja</td></tr>
        <tr><td>Pekerja formal</td><td>41,28%</td><td>Dari penduduk bekerja</td></tr>
      </tbody>
    </table>
    ${sourceLine('BPS, Survei Angkatan Kerja Nasional (Sakernas), Agustus 2024')}
  </section>`;
}

export function povertyPage(state) {
  const tab = state.tab ?? 'poverty';
  const series = tab === 'poverty' ? SERIES.poverty : tab === 'gini' ? SERIES.gini : SERIES.hdi;
  const isHdi = tab === 'hdi';
  const chart = isHdi ? lineChart(series.points) : barChart(series.points);
  const intro =
    tab === 'poverty'
      ? 'Persentase penduduk miskin turun ke 9,03% pada Maret 2024 — terendah sepanjang sejarah pengukuran — meski jumlahnya masih 25,22 juta jiwa.'
      : tab === 'gini'
        ? 'Ketimpangan pengeluaran, diukur Rasio Gini, bertahan di 0,379 sejak 2023 — nyaris tidak bergerak selama enam tahun.'
        : 'Indeks Pembangunan Manusia naik ke 75,02 pada 2024 dan masuk kategori tinggi, didorong umur harapan hidup 74,1 tahun dan rata-rata lama sekolah yang terus naik.';
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Kemiskinan dan kesejahteraan</h1>
  <p class="lede">${esc(intro)}</p>
  <div class="controls tabs" role="group" aria-label="Pilih indikator">
    <button type="button" data-tab="poverty" class="${tab === 'poverty' ? 'active' : ''}">Kemiskinan</button>
    <button type="button" data-tab="gini" class="${tab === 'gini' ? 'active' : ''}">Rasio Gini</button>
    <button type="button" data-tab="hdi" class="${tab === 'hdi' ? 'active' : ''}">IPM</button>
  </div>
  ${figureCard(series.title, series.unit, chart, series.source)}
  <section class="two-col">
    <div>
      <h2>Yang perlu diketahui</h2>
      <ul class="facts">
        <li><b>25,22 jt</b><span>penduduk miskin, Mar 2024</span><small>Turun 0,72 juta dari Mar 2023</small></li>
        <li><b>11,10%</b><span>kemiskinan di perdesaan</span><small>Di perkotaan 7,09% (Mar 2024)</small></li>
        <li><b>Rp582.932</b><span>garis kemiskinan per kapita/bulan</span><small>Mar 2024, BPS</small></li>
        <li><b>74,1 th</b><span>umur harapan hidup 2024</span><small>Komponen IPM</small></li>
      </ul>
    </div>
    <div>
      <h2>Baca angka ini dengan benar</h2>
      <p>Garis kemiskinan adalah rupiah minimum untuk memenuhi kebutuhan dasar makanan
      dan non-makanan. Seseorang di bawah garis itu dihitung miskin — ukurannya berubah
      setiap tahun mengikuti harga, jadi bandingkan persentasenya, bukan rupiahnya.</p>
      <p>Rasio Gini 0 berarti semua orang mengeluarkan jumlah yang sama; 1 berarti satu
      orang menguasai semuanya. Indonesia di 0,379 berada di tengah: lebih merata dari
      kebanyakan negara berpendapatan menengah, tapi tidak membaik sejak 2019.</p>
    </div>
  </section>`;
}

export function provincesPage(state) {
  const q = (state.search ?? '').toLowerCase();
  const region = state.region ?? 'Semua';
  const sort = state.sort ?? 'pop-desc';
  const regions = ['Semua', 'Jawa', 'Sumatra', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'];
  let rows = PROVINCES.filter((p) => (region === 'Semua' || p.region === region) && p.name.toLowerCase().includes(q));
  if (sort === 'pop-desc') rows.sort((a, b) => b.pop - a.pop);
  if (sort === 'pop-asc') rows.sort((a, b) => a.pop - b.pop);
  if (sort === 'name') rows.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  const total = 281.6;
  const body = rows
    .map(
      (p) =>
        `<tr><td>${esc(p.name)}</td><td>${esc(p.region)}</td><td class="num">${fmtNum(p.pop)}</td><td class="num">${fmtNum((p.pop / total) * 100, 1)}%</td></tr>`,
    )
    .join('');
  const chips = regions
    .map(
      (r) =>
        `<button type="button" data-region="${esc(r)}" class="${r === region ? 'active' : ''}">${esc(r)}</button>`,
    )
    .join('');
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Provinsi</h1>
  <p class="lede">Bandingkan 38 provinsi Indonesia berdasarkan jumlah penduduk. Jawa Barat
  adalah provinsi terbesar dengan 50,35 juta jiwa — hampir seperlima penduduk Indonesia.</p>
  <div class="prov-tools">
    <label class="search">Cari provinsi
      <input type="search" data-prov-search placeholder="Ketik nama provinsi…" value="${esc(state.search ?? '')}" aria-label="Cari provinsi">
    </label>
    <label>Urutkan
      <select data-prov-sort aria-label="Urutkan provinsi">
        <option value="pop-desc" ${sort === 'pop-desc' ? 'selected' : ''}>Penduduk terbanyak</option>
        <option value="pop-asc" ${sort === 'pop-asc' ? 'selected' : ''}>Penduduk tersedikit</option>
        <option value="name" ${sort === 'name' ? 'selected' : ''}>Nama A–Z</option>
      </select>
    </label>
  </div>
  <div class="controls chips" role="group" aria-label="Filter kepulauan">${chips}</div>
  <p class="count">${rows.length} dari 38 provinsi${q ? ` cocok dengan “${esc(state.search)}”` : ''}</p>
  <table class="data-table">
    <thead><tr><th>Provinsi</th><th>Kepulauan</th><th class="num">Penduduk (jt)</th><th class="num">Pangsa</th></tr></thead>
    <tbody>${body || '<tr><td colspan="4">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>'}</tbody>
  </table>
  ${sourceLine('BPS, Estimasi Penduduk Pertengahan 2024. Pangsa dihitung terhadap 281,6 juta jiwa.')}`;
}

export function aboutPage() {
  const releases = RELEASES.map(
    (r) => `<tr><td>${esc(r.date)}</td><td>${esc(r.item)}</td><td>${esc(r.source)}</td></tr>`,
  ).join('');
  return `<p class="crumb"><a href="#/">&larr; Beranda</a></p>
  <h1>Tentang NusaData</h1>
  <p class="lede">NusaData adalah situs statistik independen tentang Indonesia. Semua angka di
  sini berasal dari publikasi resmi Badan Pusat Statistik (BPS) dan dikutip dengan
  sumber serta tahunnya di bawah setiap grafik dan tabel.</p>
  <section>
    <h2>Cara membaca situs ini</h2>
    <p>Setiap angka punya tiga hal: nilainya, tahunnya, dan sumbernya. “y-on-y” berarti
    dibandingkan dengan periode yang sama tahun sebelumnya; “pp” (percentage point)
    adalah selisih dua persentase. IHK adalah Indeks Harga Konsumen, ukuran inflasi;
    TPT adalah Tingkat Pengangguran Terbuka; IPM adalah Indeks Pembangunan Manusia.</p>
    <p>Situs ini sepenuhnya statis: tidak ada permintaan jaringan, tidak ada pelacak,
    dan semua grafik digambar dari file situs sendiri. Situs ini berjalan di desktop
    dan di ponsel.</p>
  </section>
  <section>
    <h2>Sumber data</h2>
    <ul class="sources">
      <li><a href="https://www.bps.go.id">Badan Pusat Statistik (BPS)</a> — Sensus Penduduk 2020, Proyeksi Penduduk, PDB Tahunan, IHK, Sakernas, Kemiskinan, IPM</li>
      <li><a href="https://www.bps.go.id/id/statistics-table">Tabel Statistik BPS</a> — angka rinci tiap indikator</li>
      <li>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi — jumlah bahasa daerah</li>
    </ul>
    <p>NusaData bukan situs resmi BPS dan tidak berafiliasi dengan BPS. Untuk data resmi
    dan terbaru, kunjungi <a href="https://www.bps.go.id">bps.go.id</a>.</p>
  </section>
  <section>
    <h2>Kalender rilis BPS</h2>
    <table class="data-table">
      <thead><tr><th>Jadwal</th><th>Rilis</th><th>Sumber</th></tr></thead>
      <tbody>${releases}</tbody>
    </table>
  </section>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1>
  <p>Tidak ada halaman statistik di alamat ini. <a href="#/">Kembali ke beranda</a>.</p>`;
}

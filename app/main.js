// Router dan pengendali situs NusaData.
//
//   #/                beranda
//   #/penduduk        penduduk dan provinsi terbesar
//   #/ekonomi         PDB, sektor, inflasi, perdagangan
//   #/tenaga-kerja    pengangguran dan angkatan kerja
//   #/kemiskinan      kemiskinan, Gini, IPM (tab)
//   #/provinsi        tabel 38 provinsi (cari, saring, urutkan)
//   #/tentang         sumber, metodologi, kalender rilis
//
// Kontrol di halaman bekerja tanpa memuat ulang: tombol rentang dan jenis
// grafik menggambar ulang grafiknya, tab menukar indikator, dan pencarian
// provinsi menyaring tabel di tempat. window.__shotReady bernilai false
// selama halaman dirender dan true setelah selesai, supaya alat tangkapan
// layar tahu kapan halaman siap.

import { PROVINCES } from './data.js';
import { fmtNum } from './charts.js';
import {
  aboutPage,
  economyPage,
  home,
  laborPage,
  missing,
  populationPage,
  povertyPage,
  provincesPage,
} from './views.js';

const mount = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];

const state = {
  range: { population: 10, growth: 10 },
  chartType: { inflation: 'line', unemployment: 'line' },
  tab: 'poverty',
  search: '',
  region: 'Semua',
  sort: 'pop-desc',
};

const PAGES = {
  '': home,
  penduduk: populationPage,
  ekonomi: economyPage,
  'tenaga-kerja': laborPage,
  kemiskinan: povertyPage,
  provinsi: provincesPage,
  tentang: aboutPage,
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '').split('?')[0];
  return hash in PAGES ? hash : null;
}

function draw() {
  window.__shotReady = false;
  const route = currentRoute();
  const renderPage = route === null ? missing : PAGES[route];
  mount.innerHTML = renderPage(state);
  document.title =
    route === null
      ? 'Tidak ditemukan | NusaData'
      : route === ''
        ? 'NusaData — Statistik Indonesia'
        : `${mount.querySelector('h1')?.textContent ?? 'NusaData'} | NusaData`;
  for (const link of navLinks) {
    link.classList.toggle('current', link.dataset.nav === (route ?? ''));
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function filteredProvinces() {
  const q = state.search.toLowerCase();
  let rows = PROVINCES.filter(
    (p) => (state.region === 'Semua' || p.region === state.region) && p.name.toLowerCase().includes(q),
  );
  if (state.sort === 'pop-desc') rows.sort((a, b) => b.pop - a.pop);
  if (state.sort === 'pop-asc') rows.sort((a, b) => a.pop - b.pop);
  if (state.sort === 'name') rows.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  return rows;
}

function refreshProvinceTable() {
  const rows = filteredProvinces();
  const body = mount.querySelector('tbody');
  const count = mount.querySelector('.count');
  if (!body) return;
  body.innerHTML =
    rows
      .map(
        (p) =>
          `<tr><td>${p.name}</td><td>${p.region}</td><td class="num">${fmtNum(p.pop)}</td><td class="num">${fmtNum((p.pop / 281.6) * 100, 1)}%</td></tr>`,
      )
      .join('') || '<tr><td colspan="4">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>';
  if (count) {
    count.textContent = `${rows.length} dari 38 provinsi${state.search ? ` cocok dengan “${state.search}”` : ''}`;
  }
}

mount.addEventListener('click', (event) => {
  const rangeBtn = event.target.closest('[data-range]');
  if (rangeBtn) {
    state.range[rangeBtn.dataset.range] = Number(rangeBtn.dataset.years);
    draw();
    return;
  }
  const typeBtn = event.target.closest('[data-chart-type]');
  if (typeBtn) {
    state.chartType[typeBtn.dataset.chartType] = typeBtn.dataset.kind;
    draw();
    return;
  }
  const tabBtn = event.target.closest('[data-tab]');
  if (tabBtn) {
    state.tab = tabBtn.dataset.tab;
    draw();
    return;
  }
  const regionBtn = event.target.closest('[data-region]');
  if (regionBtn) {
    state.region = regionBtn.dataset.region;
    draw();
  }
});

mount.addEventListener('input', (event) => {
  const field = event.target.closest('[data-prov-search]');
  if (!field) return;
  state.search = field.value;
  refreshProvinceTable();
});

mount.addEventListener('change', (event) => {
  const select = event.target.closest('[data-prov-sort]');
  if (!select) return;
  state.sort = select.value;
  refreshProvinceTable();
});

window.addEventListener('hashchange', draw);
draw();

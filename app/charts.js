// Grafik SVG yang digambar tangan dari data — tanpa pustaka, tanpa jaringan.
// Setiap fungsi menerima deret { year, value } dan mengembalikan string SVG
// yang siap disisipkan ke halaman. Warna mengikuti palet situs.

const INK = '#17352c';
const TEAL = '#0e7c66';
const TEAL_SOFT = '#bfe3d8';
const AMBER = '#d9930d';
const RED = '#b3362b';
const GRID = '#e3ddd0';
const MUTED = '#5c6b64';

// Format angka gaya Indonesia: koma untuk desimal, titik untuk ribuan.
export function fmtNum(value, decimals = 2) {
  const fixed = Number(value).toFixed(decimals);
  const [whole, frac] = fixed.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimals > 0 ? `${grouped},${frac}` : grouped;
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const tick = nice * mag;
  const start = Math.floor(min / tick) * tick;
  const out = [];
  for (let v = start; v <= max + tick * 0.001; v += tick) out.push(v);
  return out;
}

// Grafik batang vertikal dengan label nilai di atas tiap batang.
export function barChart(points, options = {}) {
  const width = options.width ?? 760;
  const height = options.height ?? 300;
  const padL = 52;
  const padB = 30;
  const padT = 26;
  const values = points.map((p) => p.value);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  if (max - min < 1e-9) max = min + 1;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const innerW = width - padL - 12;
  const innerH = height - padT - padB;
  const slot = innerW / points.length;
  const barW = Math.min(44, slot * 0.62);
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const zeroY = y(0);

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    const ty = y(t);
    svg += `<line x1="${padL}" y1="${ty}" x2="${width - 12}" y2="${ty}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${ty + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtNum(t, Math.abs(t) < 10 ? 2 : 0)}</text>`;
  }
  svg += `<line x1="${padL}" y1="${zeroY}" x2="${width - 12}" y2="${zeroY}" stroke="${INK}" stroke-width="1.2"/>`;
  points.forEach((p, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = y(Math.max(p.value, 0));
    const bottom = p.value >= 0 ? zeroY : y(p.value);
    const h = Math.max(1, Math.abs(bottom - top));
    const color = p.value < 0 ? RED : i === points.length - 1 ? AMBER : TEAL;
    svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${color}"><title>${p.year}: ${fmtNum(p.value)}</title></rect>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${fmtNum(p.value)}</text>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Grafik garis dengan titik, garis grid, dan area tipis di bawah garis.
export function lineChart(points, options = {}) {
  const width = options.width ?? 760;
  const height = options.height ?? 300;
  const padL = 52;
  const padB = 30;
  const padT = 26;
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const innerW = width - padL - 12;
  const innerH = height - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik garis" preserveAspectRatio="xMidYMid meet">`;
  for (const t of ticks) {
    const ty = y(t);
    svg += `<line x1="${padL}" y1="${ty}" x2="${width - 12}" y2="${ty}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 8}" y="${ty + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtNum(t, Math.abs(t) < 10 ? 2 : 0)}</text>`;
  }
  const line = points.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  svg += `<polygon points="${padL},${y(min).toFixed(1)} ${line} ${x(points.length - 1).toFixed(1)},${y(min).toFixed(1)}" fill="${TEAL_SOFT}" opacity="0.45"/>`;
  svg += `<polyline points="${line}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4" fill="#fff" stroke="${TEAL}" stroke-width="2"><title>${p.year}: ${fmtNum(p.value)}</title></circle>`;
    if (i === points.length - 1 || i === 0) {
      svg += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmtNum(p.value)}</text>`;
    }
    svg += `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`;
  });
  svg += '</svg>';
  return svg;
}

// Donat pangsa: irisan berwarna dengan label nama + persen di samping.
export function donutChart(parts, options = {}) {
  const size = options.size ?? 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const hole = r * 0.58;
  const palette = [TEAL, AMBER, '#3a6ea5', '#7a5ea8', '#c25e3a', '#8a9a5b'];
  let angle = -Math.PI / 2;
  let slices = '';
  parts.forEach((part, i) => {
    const frac = part.share / 100;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + hole * Math.cos(a1);
    const y2 = cy + hole * Math.sin(a1);
    const x3 = cx + hole * Math.cos(a0);
    const y3 = cy + hole * Math.sin(a0);
    slices += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${hole} ${hole} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${palette[i % palette.length]}"><title>${part.name}: ${fmtNum(part.share)}%</title></path>`;
  });
  const legend = parts
    .map(
      (part, i) =>
        `<li><span class="swatch" style="background:${palette[i % palette.length]}"></span>${part.name}<b>${fmtNum(part.share)}%</b></li>`,
    )
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram donat pangsa" class="donut">${slices}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">100%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">pangsa PDB 2024</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Batang horizontal untuk peringkat provinsi.
export function hbarChart(rows, options = {}) {
  const width = options.width ?? 760;
  const rowH = 34;
  const height = rows.length * rowH + 16;
  const padL = 150;
  const max = Math.max(...rows.map((r) => r.pop));
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Batang horizontal provinsi" preserveAspectRatio="xMidYMid meet">`;
  rows.forEach((row, i) => {
    const y = 8 + i * rowH;
    const w = ((row.pop / max) * (width - padL - 64)).toFixed(1);
    svg += `<text x="${padL - 10}" y="${y + 16}" text-anchor="end" font-size="12" fill="${INK}">${row.name}</text>`;
    svg += `<rect x="${padL}" y="${y + 4}" width="${w}" height="16" rx="3" fill="${i === 0 ? AMBER : TEAL}"><title>${row.name}: ${fmtNum(row.pop)} juta jiwa</title></rect>`;
    svg += `<text x="${padL + Number(w) + 8}" y="${y + 16}" font-size="12" font-weight="600" fill="${INK}">${fmtNum(row.pop)}</text>`;
  });
  svg += '</svg>';
  return svg;
}

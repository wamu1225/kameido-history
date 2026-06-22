// 自作SVG模式図のHTML文字列を一元管理する単一の真実源（SSOT）。
// React版（App.tsx の {{figure:KEY}} 展開）と prerender（scripts/prerender.ts）の双方がここを使い、
// 二重レンダラの食い違い（生タグ露出）を防ぐ。写真は著作権リスクのため使わず、模式図で補う。
// テーマ：藍(#27406a) × 朱(#b34230) × 金(#c8a24a)、和紙色の地(#f3ead2)。

const BG = '#f3ead2';
const AI = '#27406a';
const AI_DEEP = '#1b2e4d';
const SHU = '#b34230';
const GOLD = '#c8a24a';
const INK = '#2a2f3a';

// 1) 地名の三説（亀の島・亀ヶ井・神戸）
function nameOriginSvg(): string {
  const panel = (x: number, title: string, draw: string) =>
    `<g transform="translate(${x} 0)">` +
    `<rect x="6" y="14" width="84" height="84" rx="8" fill="#ffffff" stroke="${AI}" stroke-width="1.6"/>` +
    draw +
    `<text x="48" y="110" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${title}</text>` +
    `</g>`;
  // 亀の形の島
  const island =
    `<path d="M30 70 Q24 56 34 50 Q40 38 56 44 Q72 44 70 60 Q74 74 58 76 Q42 82 30 70 Z" fill="#8fb3a0"/>` +
    `<circle cx="60" cy="46" r="5" fill="#8fb3a0"/>` + // 頭
    `<path d="M26 64 l-6 4 M70 64 l6 4 M36 78 l-3 6 M62 78 l3 6" stroke="#5e7d6c" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M22 88 H74" stroke="#7fa6c4" stroke-width="3" stroke-linecap="round"/>`; // 水面
  // 亀ヶ井（井桁の井戸）
  const well =
    `<path d="M34 44 H62 M34 44 V72 M62 44 V72 M34 72 H62" fill="none" stroke="${SHU}" stroke-width="3"/>` +
    `<path d="M30 52 H66 M40 40 V76" stroke="${SHU}" stroke-width="3"/>` + // 井桁の交差
    `<path d="M40 64 q8 6 16 0" fill="none" stroke="#7fa6c4" stroke-width="2.4"/>` + // 水
    `<circle cx="48" cy="60" r="2" fill="#7fa6c4"/>`;
  // 神戸（かみど）の字
  const kamido =
    `<text x="48" y="58" font-size="30" font-weight="700" fill="${AI}" text-anchor="middle" font-family="serif">神戸</text>` +
    `<path d="M30 74 H66" stroke="${GOLD}" stroke-width="2" stroke-dasharray="4 3"/>` +
    `<text x="48" y="88" font-size="10" fill="${INK}" text-anchor="middle">かみど → かめいど</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 126" width="100%" role="img" aria-label="亀戸の地名の三つの説（亀の島・亀ヶ井・神戸の転訛）の図">` +
    `<rect width="300" height="126" fill="${BG}"/>` +
    panel(0, '亀島（島の形）', island) +
    panel(100, '亀ヶ井（井戸）', well) +
    panel(200, '神戸（かみど）', kamido) +
    `</svg>`
  );
}

// 2) 天神社 創建の流れ（1646 遍歴 → 1657 大火 → 1662 正遷宮）
function tenjinFoundingSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="9.5" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="9.5" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="亀戸天神社の創建の流れの図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    `<line x1="48" y1="54" x2="252" y2="54" stroke="${AI}" stroke-width="2.4"/>` +
    `<path d="M252 54 l-8 -4 M252 54 l-8 4" stroke="${AI}" stroke-width="2.4" fill="none"/>` +
    node(60, '正保3 (1646)', '信祐が|天神像を奉じ巡歴', AI) +
    node(150, '明暦3 (1657)', '明暦の大火|→復興へ', SHU) +
    node(240, '寛文2 (1662)', '正遷宮|社殿・太鼓橋', GOLD) +
    `</svg>`
  );
}

// 3) 太鼓橋・心字池・藤とスカイツリーの景観
function taikobashiSvg(): string {
  return (
    `<svg class="diagram-single" viewBox="0 0 300 180" width="100%" role="img" aria-label="亀戸天神社の太鼓橋・心字池・藤と東京スカイツリーの景観図">` +
    `<rect width="300" height="180" fill="${BG}"/>` +
    // 空
    `<rect x="0" y="0" width="300" height="120" fill="#e7eef4"/>` +
    // スカイツリー（奥）
    `<path d="M236 30 L242 110 L230 110 Z" fill="#9fb4c6"/>` +
    `<line x1="239" y1="14" x2="239" y2="30" stroke="#9fb4c6" stroke-width="2"/>` +
    `<text x="239" y="124" font-size="8.5" fill="#6d8298" text-anchor="middle">スカイツリー</text>` +
    // 心字池（水面）
    `<rect x="0" y="120" width="300" height="60" fill="#bcd6e8"/>` +
    `<path d="M0 120 H300" stroke="#9bbdd4" stroke-width="2"/>` +
    // 太鼓橋（大きく反る朱の橋）
    `<path d="M40 132 Q150 56 260 132" fill="none" stroke="${SHU}" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M40 132 Q150 70 260 132" fill="none" stroke="#d98a78" stroke-width="2"/>` +
    // 橋脚
    `<line x1="92" y1="104" x2="92" y2="138" stroke="${SHU}" stroke-width="4"/>` +
    `<line x1="208" y1="104" x2="208" y2="138" stroke="${SHU}" stroke-width="4"/>` +
    // 水面の映り込み
    `<path d="M40 140 Q150 168 260 140" fill="none" stroke="#cf9c90" stroke-width="3" opacity="0.55"/>` +
    // 藤棚（手前左右に垂れる藤）
    `${[18, 34, 50, 66].map(x => `<line x1="${x}" y1="40" x2="${x}" y2="92" stroke="#9b86c4" stroke-width="3"/>` + `${[48, 62, 76].map(y => `<circle cx="${x}" cy="${y}" r="3" fill="#7e63b4"/>`).join('')}`).join('')}` +
    `<line x1="10" y1="40" x2="76" y2="40" stroke="#6e7d4a" stroke-width="3"/>` +
    `<text x="150" y="172" font-size="10" fill="${AI_DEEP}" text-anchor="middle">太鼓橋・藤・心字池の向こうにスカイツリー</text>` +
    `</svg>`
  );
}

// 4) 亀戸大根 vs 一般的な大根（形の比較）
function daikonShapeSvg(): string {
  const radish = (cx: number, len: number, neck: string, label: string, sub: string) =>
    `<g>` +
    // 葉
    `<path d="M${cx} ${40} q-10 -14 -3 -22 q5 8 3 22 z" fill="#6e9c5a"/>` +
    `<path d="M${cx} ${40} q10 -14 3 -22 q-5 8 -3 22 z" fill="#6e9c5a"/>` +
    `<path d="M${cx} ${40} q-2 -16 0 -24 q2 8 0 24 z" fill="#7fae66"/>` +
    // 根（首〜先端）
    `<path d="M${cx - 11} 44 Q${cx - 13} ${44 + len * 0.5} ${cx} ${44 + len} Q${cx + 13} ${44 + len * 0.5} ${cx + 11} 44 Z" fill="#fbfaf6" stroke="#cfcabc" stroke-width="1.4"/>` +
    // 首の色
    `<path d="M${cx - 11} 44 Q${cx} 50 ${cx + 11} 44" fill="none" stroke="${neck}" stroke-width="4"/>` +
    `<text x="${cx}" y="${52 + len}" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${label}</text>` +
    `<text x="${cx}" y="${64 + len}" font-size="9" fill="${INK}" text-anchor="middle">${sub}</text>` +
    `</g>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 150" width="100%" role="img" aria-label="亀戸大根と一般的な大根の形の比較図">` +
    `<rect width="300" height="150" fill="${BG}"/>` +
    radish(86, 52, '#eae7dc', '亀戸大根', '約30cm・首まで白い') +
    radish(214, 78, '#7fae66', '一般的な青首大根', '35〜40cm・首が緑') +
    // 寸法の目安線
    `<line x1="150" y1="44" x2="150" y2="122" stroke="${GOLD}" stroke-width="1" stroke-dasharray="3 3"/>` +
    `</svg>`
  );
}

// 5) くず餅の製法フロー（小麦でんぷん→乳酸発酵→せいろ蒸し→黒蜜きな粉）
function kuzumochiProcessSvg(): string {
  const step = (x: number, label: string, draw: string) =>
    `<g transform="translate(${x} 0)">` +
    `<rect x="6" y="20" width="58" height="58" rx="8" fill="#ffffff" stroke="${AI}" stroke-width="1.5"/>` +
    draw +
    `<text x="35" y="92" font-size="9" font-weight="600" fill="${AI_DEEP}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="35" y="103" font-size="9" font-weight="600" fill="${AI_DEEP}" text-anchor="middle">${label.split('|')[1]}</text>` : '') +
    `</g>`;
  const arrow = (x: number) => `<path d="M${x} 49 h12" stroke="${SHU}" stroke-width="2.4"/><path d="M${x + 12} 49 l-5 -3 M${x + 12} 49 l-5 3" stroke="${SHU}" stroke-width="2.4" fill="none"/>`;
  const wheat = `<path d="M35 34 V64" stroke="#caa84e" stroke-width="2"/>${[40, 48, 56].map(y => `<path d="M35 ${y} q-7 -3 -9 -9 M35 ${y} q7 -3 9 -9" stroke="#caa84e" stroke-width="2" fill="none"/>`).join('')}`;
  const ferment = `<path d="M22 40 h26 v22 a13 7 0 0 1 -26 0 Z" fill="#f0ead4" stroke="#b9b083" stroke-width="1.5"/>${[28, 36, 44].map((x, i) => `<circle cx="${x}" cy="${52 + (i % 2) * 4}" r="2" fill="#9fb36a"/>`).join('')}<text x="35" y="74" font-size="7" fill="#7e8a55" text-anchor="middle">乳酸菌</text>`;
  const steam = `<path d="M22 58 h26 v6 h-26 Z" fill="#b98a5e"/><path d="M24 50 h22 v8 h-22 Z" fill="#d8b487" stroke="#b98a5e" stroke-width="1"/>${[30, 38].map(x => `<path d="M${x} 46 q-3 -4 0 -8" stroke="#b8c4cc" stroke-width="1.6" fill="none"/>`).join('')}`;
  const serve = `<path d="M22 60 q13 8 26 0" fill="none" stroke="#b9b083" stroke-width="1.5"/><path d="M24 50 h22 l-3 12 h-16 Z" fill="#efe6cf" stroke="#cfc7a8" stroke-width="1"/><path d="M28 52 q7 4 14 0" stroke="#5a3a1a" stroke-width="2" fill="none"/><circle cx="32" cy="48" r="1.6" fill="#caa84e"/><circle cx="40" cy="49" r="1.6" fill="#caa84e"/>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 112" width="100%" role="img" aria-label="関東のくず餅の製法の流れの図">` +
    `<rect width="300" height="112" fill="${BG}"/>` +
    step(0, '小麦の|でんぷん', wheat) + arrow(70) +
    step(82, '乳酸発酵', ferment) + arrow(152) +
    step(164, 'せいろで|蒸す', steam) + arrow(234) +
    step(236, '黒蜜・|きな粉', serve) +
    `</svg>`
  );
}

// 6) 広重『亀戸梅屋舗』の近景構図（手前に梅の太枝、奥に梅林と人）
function umeyashikiSvg(): string {
  return (
    `<svg class="diagram-single" viewBox="0 0 300 170" width="100%" role="img" aria-label="広重『亀戸梅屋舗』の手前に梅の枝を大きく配した近景構図の模式図">` +
    `<rect width="300" height="170" fill="${BG}"/>` +
    // 背景の天ぼかし（赤紫）
    `<rect x="0" y="0" width="300" height="44" fill="#c97f86"/>` +
    `<rect x="0" y="44" width="300" height="14" fill="#dba7ab"/>` +
    // 奥の梅林と見物客
    `${[40, 70, 100, 200, 230, 260].map(x => `<line x1="${x}" y1="118" x2="${x}" y2="96" stroke="#6e7d4a" stroke-width="3"/><circle cx="${x}" cy="92" r="6" fill="#9bb06a"/>`).join('')}` +
    `${[150, 168, 186].map(x => `<rect x="${x}" y="104" width="6" height="14" rx="2" fill="${AI}"/><circle cx="${x + 3}" cy="100" r="3" fill="#caa884"/>`).join('')}` +
    // 中景の緑の柵
    `<line x1="0" y1="120" x2="300" y2="120" stroke="#5f7d3f" stroke-width="3"/>` +
    `${[20, 60, 100, 140, 180, 220, 260].map(x => `<line x1="${x}" y1="116" x2="${x}" y2="126" stroke="#5f7d3f" stroke-width="2.4"/>`).join('')}` +
    // 手前の梅の太い幹・枝（極太・画面を横切る）
    `<path d="M-4 150 Q70 120 130 96 Q180 76 250 70 Q280 68 300 78" fill="none" stroke="#3a2a20" stroke-width="13" stroke-linecap="round"/>` +
    `<path d="M120 100 Q150 70 150 40" fill="none" stroke="#3a2a20" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M210 74 Q230 50 226 26" fill="none" stroke="#3a2a20" stroke-width="6" stroke-linecap="round"/>` +
    // 白梅の花
    `${[[140, 44], [150, 60], [224, 30], [236, 46], [60, 132], [110, 104], [250, 66], [180, 84]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="4" fill="#fff"/><circle cx="${x}" cy="${y}" r="1.5" fill="${GOLD}"/></g>`).join('')}` +
    `<text x="150" y="163" font-size="10" fill="${AI_DEEP}" text-anchor="middle">手前に梅の太枝を大きく、すき間から梅林と梅見の人々</text>` +
    `</svg>`
  );
}

// figure id → { caption, innerHtml }
const FIGURE_DATA: Record<string, { caption: string; inner: string }> = {
  'name-origin': {
    caption: '亀戸の地名の三つの説（模式図）。亀の形をした島、亀甲を思わせる井桁の古井戸「亀ヶ井」、神社の領民を指す「神戸（かみど）」の転訛——いずれの説も併存し、一つには断定されていません。',
    inner: `<div class="diagram-wrap">${nameOriginSvg()}</div>`,
  },
  'tenjin-scene': {
    caption: '亀戸天神社の創建の流れ（模式図）。太宰府の神官・信祐が天神像を奉じて巡歴し（1646年）、明暦の大火（1657年）後の復興のなかで、太宰府にならって正遷宮が行われました（1662年）。',
    inner: `<div class="diagram-wrap">${tenjinFoundingSvg()}</div>`,
  },
  'taikobashi-skytree': {
    caption: '亀戸天神社の景観（模式図）。心字池にかかる朱塗りの太鼓橋と藤棚の向こうに、東京スカイツリーが重なって見えます。江戸の景観と現代の塔が一枚に収まる、亀戸ならではの眺めです。',
    inner: `<div class="diagram-wrap">${taikobashiSvg()}</div>`,
  },
  'daikon-shape': {
    caption: '亀戸大根と一般的な青首大根の比較（模式図）。亀戸大根は長さ約30cmと小ぶりで、首まで白いのが特徴です。一般的な青首大根は大ぶりで、上部が緑色になります。寸法は目安です。',
    inner: `<div class="diagram-wrap">${daikonShapeSvg()}</div>`,
  },
  'kuzumochi-process': {
    caption: '関東のくず餅の製法（模式図）。小麦のでんぷんを乳酸発酵させ、せいろで蒸し上げ、黒蜜ときな粉をかけて仕上げます。葛粉を使う関西の葛餅とは原料も作り方も異なります。',
    inner: `<div class="diagram-wrap">${kuzumochiProcessSvg()}</div>`,
  },
  'umeyashiki-composition': {
    caption: '広重『亀戸梅屋舗』の構図（模式図）。画面の手前を横切るほど大きく梅の太い枝を配し、その枝のすき間から奥の梅林と梅見の人々をのぞかせる、遠近の常識をくつがえす大胆な近景構図です。',
    inner: `<div class="diagram-wrap">${umeyashikiSvg()}</div>`,
  },
};

export const FIGURE_KEYS = Object.keys(FIGURE_DATA);

// 図解ブロック全体のHTML文字列（React/prerender 共用）
export function figureHtml(id: string): string | null {
  const f = FIGURE_DATA[id];
  if (!f) return null;
  return `<div class="content-figure">${f.inner}<p class="figure-caption">${f.caption}</p></div>`;
}

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
    `<text x="48" y="88" font-size="11" fill="${INK}" text-anchor="middle">かみど → かめいど</text>`;
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
  const rows: [string, string, string, string][] = [
    ['1646', '正保3年', '信祐が天神の神像を奉じ諸国を巡る', AI],
    ['1657', '明暦3年', '明暦の大火。幕府が江戸の復興を進める', SHU],
    ['1662', '寛文2年', '正遷宮。社殿・心字池・太鼓橋が整う', GOLD],
    ['1873', '明治6年', '東京府社となり「亀戸神社」に', AI],
    ['1936', '昭和11年', '現在の「亀戸天神社」に改称', AI],
  ];
  const H = 40 + rows.length * 52;
  const body = rows.map((r, i) => {
    const y = 38 + i * 52;
    return `<circle cx="34" cy="${y}" r="8" fill="${r[3]}"/>` +
      `<text x="56" y="${y - 4}" font-size="13" font-weight="700" fill="${AI_DEEP}">${r[0]}年（${r[1]}）</text>` +
      `<text x="56" y="${y + 15}" font-size="12" fill="${INK}">${r[2]}</text>`;
  }).join('');
  return (
    `<svg class="diagram-single" viewBox="0 0 340 ${H}" width="100%" role="img" aria-label="亀戸天神社の創建から現社名までの年表">` +
    `<rect width="340" height="${H}" fill="${BG}"/>` +
    `<line x1="34" y1="38" x2="34" y2="${38 + (rows.length - 1) * 52}" stroke="${AI}" stroke-width="2.4"/>` +
    body +
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
    `<text x="239" y="24" font-size="10.5" fill="#6d8298" text-anchor="middle">スカイツリー</text>` +
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
    `<text x="150" y="172" font-size="11" fill="${AI_DEEP}" text-anchor="middle">太鼓橋・藤・心字池の向こうにスカイツリー</text>` +
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
    `<text x="${cx}" y="${64 + len}" font-size="10.5" fill="${INK}" text-anchor="middle">${sub}</text>` +
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
    `<text x="35" y="92" font-size="10.5" font-weight="600" fill="${AI_DEEP}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="35" y="103" font-size="10.5" font-weight="600" fill="${AI_DEEP}" text-anchor="middle">${label.split('|')[1]}</text>` : '') +
    `</g>`;
  const arrow = (x: number) => `<path d="M${x} 49 h12" stroke="${SHU}" stroke-width="2.4"/><path d="M${x + 12} 49 l-5 -3 M${x + 12} 49 l-5 3" stroke="${SHU}" stroke-width="2.4" fill="none"/>`;
  const wheat = `<path d="M35 34 V64" stroke="#caa84e" stroke-width="2"/>${[40, 48, 56].map(y => `<path d="M35 ${y} q-7 -3 -9 -9 M35 ${y} q7 -3 9 -9" stroke="#caa84e" stroke-width="2" fill="none"/>`).join('')}`;
  const ferment = `<path d="M22 40 h26 v22 a13 7 0 0 1 -26 0 Z" fill="#f0ead4" stroke="#b9b083" stroke-width="1.5"/>${[28, 36, 44].map((x, i) => `<circle cx="${x}" cy="${52 + (i % 2) * 4}" r="2" fill="#9fb36a"/>`).join('')}<text x="35" y="34" font-size="10.5" fill="#7e8a55" text-anchor="middle">乳酸菌</text>`;
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
    `<text x="150" y="163" font-size="11" fill="${AI_DEEP}" text-anchor="middle">手前に梅の太枝を大きく、すき間から梅林と梅見の人々</text>` +
    `</svg>`
  );
}

// 7b) 広重の亀戸二枚の「手前・奥」の対比（2026-11-11）
function ukiyoeTwoViewsSvg(): string {
  const panel = (x: number, title: string, season: string, front: string, back: string, scene: string) =>
    `<g transform="translate(${x} 0)">` +
    `<rect x="0" y="0" width="144" height="198" rx="3" fill="#fbf6e6" stroke="${AI}" stroke-width="1.2"/>` +
    `<text x="72" y="18" font-size="12" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${title}</text>` +
    `<text x="72" y="33" font-size="11" fill="${SHU}" text-anchor="middle">${season}</text>` +
    `<svg x="8" y="42" width="128" height="96" viewBox="0 0 128 96">${scene}</svg>` +
    `<text x="10" y="156" font-size="11" font-weight="700" fill="${SHU}">手前</text>` +
    `<text x="40" y="156" font-size="11" fill="${INK}">${front}</text>` +
    `<text x="10" y="178" font-size="11" font-weight="700" fill="${AI}">奥</text>` +
    `<text x="40" y="178" font-size="11" fill="${INK}">${back}</text>` +
    `</g>`;
  const ume =
    `<rect width="128" height="96" fill="#e9c9c6"/><rect width="128" height="22" fill="#c97f86"/>` +
    `${[22, 40, 88, 106].map(x => `<line x1="${x}" y1="64" x2="${x}" y2="50" stroke="#6e7d4a" stroke-width="2.4"/><circle cx="${x}" cy="46" r="5" fill="#9bb06a"/>`).join('')}` +
    `${[56, 66, 76].map(x => `<rect x="${x}" y="52" width="5" height="12" rx="2" fill="${AI}"/><circle cx="${x + 2.5}" cy="49" r="2.6" fill="#caa884"/>`).join('')}` +
    `<line x1="0" y1="66" x2="128" y2="66" stroke="#5f7d3f" stroke-width="2.4"/>` +
    `<path d="M-4 90 Q30 70 58 56 Q84 42 132 40" fill="none" stroke="#3a2a20" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M52 58 Q66 38 64 14" fill="none" stroke="#3a2a20" stroke-width="5" stroke-linecap="round"/>` +
    `${[[64, 20], [68, 34], [104, 36], [30, 76], [92, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#fff"/><circle cx="${x}" cy="${y}" r="1.2" fill="${GOLD}"/>`).join('')}`;
  const fuji =
    `<rect width="128" height="96" fill="#dfe9ea"/><rect y="60" width="128" height="36" fill="#9fbac0"/>` +
    `<path d="M26 66 Q64 14 102 66" fill="none" stroke="${SHU}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="40" y1="44" x2="40" y2="66" stroke="${SHU}" stroke-width="2"/><line x1="88" y1="44" x2="88" y2="66" stroke="${SHU}" stroke-width="2"/>` +
    `${[10, 28, 46, 64, 82, 100, 118].map((x, i) => `<line x1="${x}" y1="0" x2="${x}" y2="${30 + (i % 3) * 8}" stroke="#7a5aa0" stroke-width="7" stroke-linecap="round"/><line x1="${x + 6}" y1="0" x2="${x + 6}" y2="${22 + ((i + 1) % 3) * 8}" stroke="#a58cc4" stroke-width="5" stroke-linecap="round"/>`).join('')}`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 198" width="100%" role="img" aria-label="広重が描いた亀戸の二枚を並べた図。梅屋舗は手前に梅の太枝、奥に梅林と梅見の人。天神境内は手前に垂れる藤、奥に太鼓橋と心字池">` +
    `<rect width="300" height="198" fill="${BG}"/>` +
    panel(4, '『亀戸梅屋舗』', '早春', '梅の太枝', '梅林と梅見の人', ume) +
    panel(152, '『亀戸天神境内』', '初夏', '垂れる藤の花', '太鼓橋と心字池', fuji) +
    `</svg>`
  );
}

// 7) 時計の街：同じ土地の使われ方を年に比例した帯で（1939〜2026）
function tokeiMachiTimelineSvg(): string {
  const X = (y: number) => Math.round((16 + (y - 1939) * 3.1) * 10) / 10;
  const seg = (y1: number, y2: number, color: string) =>
    `<rect x="${X(y1)}" y="32" width="${Math.round((X(y2) - X(y1)) * 10) / 10}" height="22" fill="${color}"/>`;
  const gap = (y1: number, y2: number) =>
    `<rect x="${X(y1)}" y="32" width="${Math.round((X(y2) - X(y1)) * 10) / 10}" height="22" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2"/>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 130" width="100%" role="img" aria-label="亀戸の同じ土地の使われ方を年に比例した帯で並べた図。第二精工舎の本社工場が54年、サンストリート亀戸が19年、カメイドクロックは2022年から">` +
    `<rect width="300" height="130" fill="${BG}"/>` +
    `<text x="${X(1939)}" y="24" font-size="11.5" font-weight="700" fill="${AI_DEEP}">1939</text>` +
    `<text x="296" y="14" font-size="11.5" font-weight="700" fill="${SHU}" text-anchor="end">2022〜 カメイドクロック</text>` +
    `<line x1="${X(2024)}" y1="18" x2="${X(2024)}" y2="32" stroke="${SHU}" stroke-width="1.4"/>` +
    seg(1939, 1993, AI) + gap(1993, 1997) + seg(1997, 2016, GOLD) + gap(2016, 2022) + seg(2022, 2026, SHU) +
    `<text x="${(X(1939) + X(1993)) / 2}" y="47" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">工場 54年</text>` +
    `<text x="${(X(1997) + X(2016)) / 2}" y="47" font-size="11.5" font-weight="700" fill="${INK}" text-anchor="middle">19年</text>` +
    `<text x="${(X(1939) + X(1993)) / 2}" y="72" font-size="11.5" fill="${INK}" text-anchor="middle">第二精工舎の本社工場</text>` +
    `<text x="${(X(1939) + X(1993)) / 2}" y="86" font-size="11" fill="${INK}" text-anchor="middle">1939〜1993</text>` +
    `<text x="${(X(1997) + X(2016)) / 2 + 12}" y="72" font-size="11.5" fill="${INK}" text-anchor="middle">サンストリート亀戸</text>` +
    `<text x="${(X(1997) + X(2016)) / 2 + 12}" y="86" font-size="11" fill="${INK}" text-anchor="middle">1997〜2016</text>` +
    `<text x="16" y="116" font-size="11" fill="${INK}">点線＝次の施設ができるまでの期間（1993〜97年・2016〜22年）</text>` +
    `</svg>`
  );
}

// 8) 城東区＋深川区 → 江東区（1947年）の合成図
function jotoKotoMergeSvg(): string {
  const box = (x: number, w: number, title: string, sub: string, color: string) =>
    `<g transform="translate(${x} 0)">` +
    `<rect x="0" y="20" width="${w}" height="60" rx="6" fill="#ffffff" stroke="${color}" stroke-width="1.8"/>` +
    `<text x="${w / 2}" y="46" font-size="13" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${title}</text>` +
    `<text x="${w / 2}" y="64" font-size="11" fill="${INK}" text-anchor="middle">${sub}</text>` +
    `</g>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="城東区と深川区が合併して江東区になった図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    box(4, 92, '城東区', '1932年成立', SHU) +
    `<text x="106" y="56" font-size="16" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">＋</text>` +
    box(112, 92, '深川区', '1878年〜', AI) +
    `<path d="M212 50 h18" stroke="${GOLD}" stroke-width="2.4" marker-end="url(#jk-arrow)"/>` +
    `<defs><marker id="jk-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${GOLD}"/></marker></defs>` +
    box(232, 64, '江東区', '1947年〜', GOLD) +
    `<text x="150" y="98" font-size="11" fill="${INK}" text-anchor="middle">区名の「江」は深川、「東」は城東を表すとされる</text>` +
    `</svg>`
  );
}

// 9) 香取勝運商店街の年表（参道 → 戦後の商店街 → 2011年の看板建築リニューアル）
function katoriShotengaiTimelineSvg(): string {
  const X = (y: number) => Math.round((16 + (y - 1900) * 2.304) * 10) / 10;
  const row = (ty: number, label: string, x1: number, x2: number, color: string, fade: boolean) =>
    `<text x="16" y="${ty}" font-size="11.5" fill="${INK}">${label}</text>` +
    `<rect x="${X(x1)}" y="${ty + 6}" width="${Math.round((X(x2) - X(x1)) * 10) / 10}" height="11" rx="1" fill="${fade ? 'url(#kf)' : color}"/>`;
  const ticks = [1900, 1925, 1950, 1975, 2000]
    .map((y) => `<line x1="${X(y)}" y1="22" x2="${X(y)}" y2="30" stroke="${AI_DEEP}" stroke-width="1"/><text x="${X(y)}" y="16" font-size="11" fill="${AI_DEEP}" text-anchor="middle">${y}</text>`)
    .join('');
  return (
    `<svg class="diagram-single" viewBox="0 0 320 200" width="100%" role="img" aria-label="香取勝運商店街の歴史と、手本にした時代・リニューアルの年の位置関係を並べた図">` +
    `<defs><linearGradient id="kf" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${SHU}"/><stop offset="1" stop-color="${SHU}" stop-opacity="0"/></linearGradient></defs>` +
    `<rect width="320" height="200" fill="${BG}"/>` +
    `<line x1="${X(1900)}" y1="30" x2="${X(2025)}" y2="30" stroke="${AI_DEEP}" stroke-width="1"/>` +
    ticks +
    row(52, '商店街として発展（明治の頃から現在まで）', 1900, 2025, AI, false) +
    row(88, '看板建築の流行（1923年〜昭和初期）', 1923, 1938, SHU, true) +
    row(124, '手本にした「昭和30年代」（1955〜64年）', 1955, 1964, GOLD, false) +
    `<line x1="${X(2011)}" y1="36" x2="${X(2011)}" y2="148" stroke="${SHU}" stroke-width="1.6" stroke-dasharray="4 3"/>` +
    `<circle cx="${X(2011)}" cy="148" r="4" fill="${SHU}"/>` +
    `<text x="304" y="168" font-size="12" font-weight="700" fill="${SHU}" text-anchor="end">2011年 リニューアルで街並みを新築</text>` +
    `<text x="304" y="184" font-size="11.5" fill="${INK}" text-anchor="end">手本の時代から約50〜90年あとにつくられた再現</text>` +
    `</svg>`
  );
}

// 10) 三代歌川豊国（国貞）の年表
function toyokuniTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="三代歌川豊国（国貞）の年表の図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    `<line x1="34" y1="54" x2="266" y2="54" stroke="${AI}" stroke-width="2.4"/>` +
    `<path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="${AI}" stroke-width="2.4" fill="none"/>` +
    node(40, '1786', '本所で誕生|(のち亀戸に住む)', AI) +
    node(125, '1844', '（実質）三代目|豊国を襲名', SHU) +
    node(200, '1854', '広重と合作|「双筆五十三次」', GOLD) +
    node(260, '1864', '没・亀戸の|光明寺に眠る', AI) +
    `</svg>`
  );
}

// 11) 亀戸水神宮：祈りの記録と、水神の森が失われた時期（縦軸。1681年と1894年のあいだは省略）
function suijinguTimelineSvg(): string {
  const yUp = (yr: number) => 40 + (yr - 1521) * 0.9;      // 1521→40, 1681→184
  const BRK = 232;                                         // 軸の省略記号の位置
  const yLo = (yr: number) => 290 + (yr - 1894) * 5.4;     // 1894→290, 1960→646
  const H = 690;
  const dot = (y: number, c: string, hollow = false) =>
    `<circle cx="34" cy="${y}" r="7" fill="${hollow ? BG : c}" stroke="${c}" stroke-width="2.4"/>`;
  const head = (y: number, t: string) => `<text x="52" y="${y - 3}" font-size="13" font-weight="700" fill="${AI_DEEP}">${t}</text>`;
  const sub = (y: number, t: string) => `<text x="52" y="${y + 13}" font-size="12" fill="${INK}">${t}</text>`;
  const sub2 = (y: number, t: string) => `<text x="52" y="${y + 28}" font-size="12" fill="${INK}">${t}</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 340 ${H}" width="100%" role="img" aria-label="亀戸水神宮の記録を並べた縦の年表。16世紀前半の社伝、延宝年間の古地図、1894年以降の都市化で水神の森が失われたこと、1938年の由来碑、1945年の空襲、1960年の再建">` +
    `<rect width="340" height="${H}" fill="${BG}"/>` +
    `<line x1="34" y1="${yUp(1521)}" x2="34" y2="${BRK - 12}" stroke="${AI}" stroke-width="2"/>` +
    `<line x1="34" y1="${BRK + 12}" x2="34" y2="${yLo(1960)}" stroke="${AI}" stroke-width="2"/>` +
    `<path d="M26 ${BRK - 12} l16 6 M26 ${BRK - 4} l16 6 M26 ${BRK + 4} l16 6" stroke="${AI_DEEP}" stroke-width="1.6" fill="none"/>` +
    `<text x="52" y="${BRK + 4}" font-size="11.5" fill="#6a6252">（1681年から1894年のあいだは省略）</text>` +
    `<rect x="30" y="${yLo(1894)}" width="8" height="${yLo(1938) - yLo(1894)}" fill="${SHU}" opacity="0.55"/>` +
    dot(yUp(1533), AI, true) + head(yUp(1533), '16世紀前半（社伝）') + sub(yUp(1533), '水害よけに水神を勧請したと伝わる') +
    dot(yUp(1677), SHU) + head(yUp(1677), '延宝年間（1673〜81年）') + sub(yUp(1677), '古地図に、この社の記載がある') +
    dot(yLo(1894), SHU) + head(yLo(1894), '1894年〜 日清・日露の戦役以後') + sub(yLo(1894), '工場が建ち、森の木が枯れていく') + sub2(yLo(1894), '（由来碑の記述）') +
    dot(yLo(1938), AI) + head(yLo(1938), '1938年　由来碑を建立') + sub(yLo(1938), '松・杉の巨木と古い農家の記憶を刻む') +
    dot(yLo(1945), SHU) + head(yLo(1945), '1945年3月　東京大空襲') + sub(yLo(1945), '大きな被害を受ける') +
    dot(yLo(1960), GOLD) + head(yLo(1960), '1960年6月　再建') +
    `</svg>`
  );
}

// 12) 水運から鉄道への年表
function kotsuTimelineSvg(): string {
  const st = (x: number, y: number, name: string, c: string) =>
    `<circle cx="${x}" cy="${y}" r="8" fill="${c}"/>` +
    `<text x="${x}" y="${y + 26}" font-size="12.5" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${name}</text>`;
  const ln = (x1: number, x2: number, y: number, c: string, w: number, dash = '') =>
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${c}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  const tx = (x: number, y: number, t: string, size = 12, w = 400, c = INK, anchor = 'middle') =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${w}" fill="${c}" text-anchor="${anchor}">${t}</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 340 306" width="100%" role="img" aria-label="東武亀戸線の位置づけが1910年に変わったことを示す路線の模式図">` +
    `<rect width="340" height="306" fill="${BG}"/>` +
    tx(14, 24, '① 1904〜1910年　両国橋まで直通', 13, 700, AI_DEEP, 'start') +
    ln(50, 170, 66, GOLD, 5) + ln(170, 290, 66, AI, 5) +
    tx(110, 52, '東武亀戸線', 12, 700, INK) + tx(230, 52, '総武鉄道', 12, 700, INK) +
    tx(110, 88, '1904年開業', 11.5) + tx(230, 88, '1894年開業', 11.5) +
    st(50, 66, '曳舟', GOLD) + st(170, 66, '亀戸', SHU) + st(290, 66, '両国橋', AI) +
    `<path d="M62 124 H278 M278 124 l-7 -4 M278 124 l-7 4" stroke="${GOLD}" stroke-width="2" fill="none"/>` +
    tx(170, 118, '東武の列車が総武の線路に乗り入れ', 12, 400) +
    ln(14, 326, 152, '#cfc6b4', 1) +
    tx(14, 178, '② 1910年〜　浅草が東武の起点に', 13, 700, AI_DEEP, 'start') +
    ln(40, 160, 222, AI, 6) + ln(160, 290, 222, GOLD, 3) +
    tx(100, 208, '東武の本線', 12, 700, INK) + tx(225, 208, '亀戸線 3.4km', 12, 700, INK) +
    tx(100, 270, '1910年　浅草駅開業', 11.5) + tx(225, 270, '支線に（2両編成）', 11.5) +
    st(40, 222, '浅草', AI) + st(160, 222, '曳舟', GOLD) + st(290, 222, '亀戸', SHU) +
    ln(14, 44, 292, '#8a8372', 1.6, '4 3') +
    tx(52, 296, '越中島・新橋への延伸構想は実現せず', 11.5, 400, INK, 'start') +
    `</svg>`
  );
}

// 見どころの駅からの歩く時間（JR亀戸駅北口から。各施設・江東区観光協会の案内の所要時間）
function walkMinutesSvg(): string {
  const rows: { n: string; m: number; c: string }[] = [
    { n: '亀戸梅屋敷（観光施設）', m: 5, c: AI },
    { n: '香取勝運商店街', m: 5, c: GOLD },
    { n: '亀戸升本 本店', m: 7, c: GOLD },
    { n: '亀戸香取神社', m: 10, c: SHU },
    { n: '亀戸天神社', m: 15, c: SHU },
    { n: '龍眼寺（萩寺）', m: 20, c: SHU },
  ];
  const x0 = 14, k = 11, top = 56, rh = 40;
  let g = '';
  for (const t of [5, 10, 15, 20]) {
    const x = x0 + t * k;
    g += `<line x1="${x}" y1="${top - 8}" x2="${x}" y2="${top + rows.length * rh - 8}" stroke="#cfc6b4" stroke-width="1"/>` +
      `<text x="${x}" y="${top - 14}" font-size="11.5" fill="${INK}" text-anchor="middle">${t}分</text>`;
  }
  rows.forEach((r, i) => {
    const y = top + i * rh;
    g += `<text x="${x0}" y="${y + 6}" font-size="12.5" font-weight="700" fill="${AI_DEEP}">${r.n}</text>` +
      `<rect x="${x0}" y="${y + 12}" width="${r.m * k}" height="12" fill="${r.c}"/>` +
      `<text x="${x0 + r.m * k + 6}" y="${y + 23}" font-size="12" font-weight="700" fill="${INK}">${r.m}分</text>`;
  });
  const ly = top + rows.length * rh + 10;
  const key = (x: number, c: string, t: string) =>
    `<rect x="${x}" y="${ly - 9}" width="11" height="11" fill="${c}"/><text x="${x + 16}" y="${ly + 1}" font-size="11.5" fill="${INK}">${t}</text>`;
  return (
    `<svg class="diagram-single" viewBox="0 0 340 ${ly + 18}" width="100%" role="img" aria-label="亀戸駅北口から6つの見どころまで歩く時間を並べた棒グラフ。梅屋敷と商店街が5分、升本が7分、香取神社が10分、天神社が15分、龍眼寺が20分">` +
    `<rect width="340" height="${ly + 18}" fill="${BG}"/>` +
    `<text x="${x0}" y="16" font-size="12.5" font-weight="700" fill="${AI_DEEP}">JR亀戸駅北口から歩く時間</text>` +
    g + key(14, SHU, '社寺') + key(78, GOLD, '名物・商店') + key(178, AI, '施設') +
    `</svg>`
  );
}

// 13) 亀戸銭座の年表
function zenizaTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="亀戸銭座の年表の図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    `<line x1="34" y1="54" x2="266" y2="54" stroke="${AI}" stroke-width="2.4"/>` +
    `<path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="${AI}" stroke-width="2.4" fill="none"/>` +
    node(40, '1671以前', '芝網縄手から|亀戸へ移転', AI) +
    node(153, '1668〜83', '「文銭」を|鋳造', SHU) +
    node(260, '1773', '廃止（安永2年）', GOLD) +
    `</svg>`
  );
}

// 歴史の年表（17の出来事を4つの時代に分けた縦の年表。社伝・伝承は白抜きの丸、記録のある出来事は塗りの丸）
function historyTimelineSvg(): string {
  type Ev = { y: string; l: string[]; t?: boolean };
  const eras: { name: string; color: string; ev: Ev[]; gap?: boolean }[] = [
    { name: '古い信仰（社伝の時代）', color: AI, ev: [
      { y: '665年', l: ['香取神社の創建と伝わる'], t: true },
      { y: '10世紀なかば', l: ['平将門の乱にちなむ', '「勝矢」の故事'], t: true },
    ] },
    { name: '江戸の門前町', color: SHU, gap: true, ev: [
      { y: '1646年', l: ['天神像を亀戸の祠にまつる'] },
      { y: '1657年', l: ['明暦の大火、復興で', '亀戸も町づくりが進む'] },
      { y: '1662年', l: ['天神社が現在地に', '社殿・心字池・太鼓橋'] },
      { y: '1671年以前', l: ['亀戸銭座が芝網縄手から', '移転（江戸図に記載）'] },
      { y: '18世紀', l: ['梅屋敷がにぎわう', '吉宗も訪れたと伝わる'], t: true },
    ] },
    { name: '名物と浮世絵', color: GOLD, ev: [
      { y: '1805年', l: ['船橋屋が天神門前で創業'] },
      { y: '1857年', l: ['広重が亀戸の梅屋敷・', '天神境内を描く'] },
      { y: '1860〜64年', l: ['香取神社周辺で', '亀戸大根の栽培が始まる'] },
    ] },
    { name: '近代から戦後の下町', color: AI_DEEP, ev: [
      { y: '1873年', l: ['天神社が東京府社となる'] },
      { y: '1923年', l: ['関東大震災の直後に', '亀戸事件'] },
      { y: '1932年', l: ['城東区が成立'] },
      { y: '1936年', l: ['「亀戸天神社」に改称'] },
      { y: '1937〜39年', l: ['第二精工舎の工場が竣工', '（時計の街の始まり）'] },
      { y: '1945年', l: ['3月10日の東京大空襲'] },
      { y: '1947年', l: ['城東区と深川区が合併', '江東区が誕生'] },
    ] },
  ];
  const AX = 88;
  let y = 8;
  let body = '';
  let axis = '';
  const nodes: string[] = [];
  for (const era of eras) {
    if (era.gap) {
      body += `<text x="${AX}" y="${y + 10}" font-size="11" fill="${INK}" text-anchor="middle">⋮</text>` +
        `<text x="${AX + 12}" y="${y + 11}" font-size="11" fill="${INK}">およそ1000年の空白</text>`;
      y += 22;
    }
    body += `<rect x="6" y="${y}" width="288" height="24" rx="3" fill="${era.color}"/>` +
      `<text x="16" y="${y + 16.5}" font-size="12" font-weight="700" fill="#ffffff">${era.name}</text>`;
    y += 24;
    for (const e of era.ev) {
      const h = e.l.length > 1 ? 40 : 30;
      const cy = y + h / 2;
      axis += `<line x1="${AX}" y1="${y}" x2="${AX}" y2="${y + h}" stroke="${AI}" stroke-width="2"/>`;
      nodes.push(
        `<circle cx="${AX}" cy="${cy}" r="5.5" fill="${e.t ? BG : era.color}" stroke="${era.color}" stroke-width="2"${e.t ? ' stroke-dasharray="2.6 1.8"' : ''}/>` +
          `<text x="${AX - 11}" y="${cy + 4}" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="end">${e.y}</text>` +
          e.l.map((t, i) => `<text x="${AX + 12}" y="${cy + (e.l.length > 1 ? (i ? 15 : 0) - 1 : 4)}" font-size="11" fill="${INK}">${t}</text>`).join(''),
      );
      y += h;
    }
    y += 6;
  }
  const legendY = y + 6;
  const legend =
    `<circle cx="14" cy="${legendY + 4}" r="5" fill="${AI}"/><text x="25" y="${legendY + 8}" font-size="11" fill="${INK}">記録で確かめられる出来事</text>` +
    `<circle cx="182" cy="${legendY + 4}" r="5" fill="${BG}" stroke="${AI}" stroke-width="2" stroke-dasharray="2.6 1.8"/><text x="193" y="${legendY + 8}" font-size="11" fill="${INK}">社伝・伝承</text>`;
  const H = legendY + 22;
  return (
    `<svg class="diagram-single" viewBox="0 0 300 ${H}" width="100%" role="img" aria-label="亀戸の歴史年表の図。665年の社伝から1947年の江東区成立まで17の出来事を4つの時代に分けて並べ、社伝・伝承は白抜きの丸で示す">` +
    `<rect width="300" height="${H}" fill="${BG}"/>` + axis + body + nodes.join('') + legend +
    `</svg>`
  );
}

// 名物のはじまり（縦軸＝年を比例）
function meibutsuSvg(): string {
  const Y0 = 1790, K = 1.35, T = 28;
  const yy = (yr: number) => T + (yr - Y0) * K;
  const items: [number, string, string, string][] = [
    [1805, '1805年', '船橋屋のくず餅（文化2年）', AI],
    [1862, '1860年代', '亀戸大根（文久年間ごろ）', AI],
    [1954, '1954年', '亀戸餃子の創業（昭和29年）', AI],
    [2000, '2000年', '「亀戸ホルモン」創業と伝わる', SHU],
  ];
  const H = Math.round(yy(2025)) + 20;
  const edo = `<rect x="30" y="${yy(1790)}" width="8" height="${yy(1868) - yy(1790)}" fill="${GOLD}"/>` +
    `<text x="46" y="${yy(1868) - 4}" font-size="11" fill="${INK}">〜1868 江戸時代</text>`;
  const ticks = [1800, 1900, 2000].map(v => `<line x1="26" y1="${yy(v)}" x2="42" y2="${yy(v)}" stroke="${AI_DEEP}" stroke-width="1.4"/>`).join('');
  const body = items.map(it => {
    const y = yy(it[0]);
    return `<circle cx="34" cy="${y}" r="7" fill="${it[3]}"/>` +
      `<text x="52" y="${y - 3}" font-size="13" font-weight="700" fill="${AI_DEEP}">${it[1]}</text>` +
      `<text x="52" y="${y + 13}" font-size="12" fill="${INK}">${it[2]}</text>`;
  }).join('');
  return (
    `<svg class="diagram-single" viewBox="0 0 340 ${H}" width="100%" role="img" aria-label="亀戸の名物のはじまりを年に比例した縦軸で並べた図。1805年のくず餅から2000年のホルモン店まで">` +
    `<rect width="340" height="${H}" fill="${BG}"/>` +
    `<line x1="34" y1="${yy(1790)}" x2="34" y2="${yy(2025)}" stroke="${AI}" stroke-width="2"/>` +
    edo + ticks + body +
    `</svg>`
  );
}

// figure id → { caption, innerHtml }
const FIGURE_DATA: Record<string, { caption: string; inner: string }> = {
  'meibutsu-timeline': {
    caption: '亀戸の名物が生まれた年（縦の長さは年に比例）。江戸時代の二つから昭和の餃子まで約150年、ホルモン店はそのさらに約半世紀後です。',
    inner: `<div class="diagram-wrap">${meibutsuSvg()}</div>`,
  },
  'name-origin': {
    caption: '亀戸の地名の三つの説（模式図）。亀の形をした島、亀甲を思わせる井桁の古井戸「亀ヶ井」、神社の領民を指す「神戸（かみど）」の転訛——いずれの説も併存し、一つには断定されていません。',
    inner: `<div class="diagram-wrap">${nameOriginSvg()}</div>`,
  },
  'tenjin-scene': {
    caption: '亀戸天神社の年表。1646年に信祐が天神像を奉じて巡歴し、1657年の明暦の大火後の復興のなかで、1662年に太宰府にならって正遷宮が行われました。社名は1873年に亀戸神社、1936年に現在の亀戸天神社になりました。',
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
  'ukiyoe-two-views': {
    caption: '広重が描いた亀戸の二枚（模式図）。梅屋舗は手前の梅の太枝ごしに奥の梅林を、天神境内は手前の藤ごしに奥の太鼓橋を見せます。季節は早春と初夏で、どちらも手前を大きく置く構図です。',
    inner: `<div class="diagram-wrap">${ukiyoeTwoViewsSvg()}</div>`,
  },
  'umeyashiki-composition': {
    caption: '広重『亀戸梅屋舗』の構図（模式図）。画面の手前を横切るほど大きく梅の太い枝を配し、その枝のすき間から奥の梅林と梅見の人々をのぞかせる、遠近の常識をくつがえす大胆な近景構図です。',
    inner: `<div class="diagram-wrap">${umeyashikiSvg()}</div>`,
  },
  'tokei-machi-timeline': {
    caption: '同じ土地の使われ方（帯の長さは年数に比例）。時計の工場は54年、その跡のサンストリート亀戸は19年、カメイドクロックはまだ4年です。商業施設の2つ分を足しても、工場の時代には届きません。',
    inner: `<div class="diagram-wrap">${tokeiMachiTimelineSvg()}</div>`,
  },
  'joto-koto-merge': {
    caption: '江東区の成立（模式図）。1932年に亀戸町・大島町・砂町から成立した城東区と、1878年からの深川区が、1947年3月15日に合併して江東区になりました。区名の「江」は深川、「東」は城東を表すとされます。',
    inner: `<div class="diagram-wrap">${jotoKotoMergeSvg()}</div>`,
  },
  'katori-shotengai-timeline': {
    caption: '香取勝運商店街の時間の位置関係（模式図）。商店街としては明治の頃からの歴史がありますが、手本にした看板建築は1923年（大正12年）以後から昭和初期の流行、コンセプトの「昭和30年代」は1955〜64年で、街並みそのものは2011年（平成23年）につくられた再現です。',
    inner: `<div class="diagram-wrap">${katoriShotengaiTimelineSvg()}</div>`,
  },
  'toyokuni-timeline': {
    caption: '三代歌川豊国（国貞）の年表（模式図）。本所に生まれ、のち亀戸に住んで「亀戸豊国」と呼ばれました。1844年に（実質）三代目豊国を襲名し、1854年には広重と「双筆五十三次」を合作。1864年に没し、亀戸の光明寺に葬られました。',
    inner: `<div class="diagram-wrap">${toyokuniTimelineSvg()}</div>`,
  },
  'suijingu-timeline': {
    caption: '亀戸水神宮の記録の年表（模式図）。白抜きの丸は社伝、塗りの丸は古地図や碑など記録のある出来事です。1894年から1938年の赤い帯は、碑文に「戦役以後の都市化で樹木が枯れた」と書かれた時期で、年に比例した間隔で描いています。上の2点は目盛りが違い、間の約200年は省いています。',
    inner: `<div class="diagram-wrap">${suijinguTimelineSvg()}</div>`,
  },
  'kotsu-timeline': {
    caption: '東武亀戸線の位置づけの変化（路線の模式図・距離は縮尺どおりではありません）。①明治37年（1904年）の開業から明治43年（1910年）までは、東武の列車は亀戸から総武鉄道の線路に入って両国橋駅まで直通していました。②明治43年に浅草駅（初代）が開業すると直通は廃止され、亀戸線は曳舟〜亀戸間3.4kmの支線になりました。',
    inner: `<div class="diagram-wrap">${kotsuTimelineSvg()}</div>`,
  },
  'history-timeline': {
    caption: '亀戸の歴史年表（模式図）。665年の社伝から1947年の江東区成立までを、古い信仰・江戸の門前町・名物と浮世絵・近代から戦後の4つの時代に分けました。白抜きの丸は社伝・伝承による出来事、塗りの丸は記録で確かめられる出来事です。',
    inner: `<div class="diagram-wrap">${historyTimelineSvg()}</div>`,
  },
  'walk-minutes': {
    caption: '亀戸駅北口から各スポットまでの歩く時間（各施設の案内による。棒の長さは時間に比例）。梅屋敷と商店街は5分、升本は7分、香取神社は10分、天神社は15分、龍眼寺は20分です。',
    inner: `<div class="diagram-wrap">${walkMinutesSvg()}</div>`,
  },
  'zeniza-timeline': {
    caption: '亀戸銭座の年表（模式図）。寛文11年（1671年）の江戸図にすでに記載があり、芝網縄手（現在の港区）から移転してきたと伝わります。寛文8年（1668年）から天和3年（1683年）には裏面に「文」の字を鋳込んだ寛永通宝「文銭」が鋳造されました。安永2年（1773年）に廃止されたと伝わります。',
    inner: `<div class="diagram-wrap">${zenizaTimelineSvg()}</div>`,
  },
};

export const FIGURE_KEYS = Object.keys(FIGURE_DATA);

// 図解ブロック全体のHTML文字列（React/prerender 共用）
export function figureHtml(id: string): string | null {
  const f = FIGURE_DATA[id];
  if (!f) return null;
  return `<div class="content-figure">${f.inner}<p class="figure-caption">${f.caption}</p></div>`;
}

// トップの絵（2026-11-08）：亀戸天神社の心字池にかかる朱の太鼓橋、手前上に垂れる藤棚、奥に東京スカイツリー（模式図）。
// 文字は入れない（小さな文字が 390px 幅で読めなくなるため）。説明は aria-label に持たせる。
export function heroSceneSvg(): string {
  const fuji = [14, 36, 58, 80, 102, 124, 146, 168, 190, 212, 234, 256, 278, 300, 322, 344]
    .map((x, i) => {
      const len = [34, 46, 28, 52, 38, 30, 44, 26, 40, 32, 48, 30, 36, 50, 28, 42][i];
      let dots = '';
      for (let y = 20; y < 20 + len; y += 7) {
        const r = 4.2 - ((y - 20) / len) * 2;
        dots += `<circle cx="${x + ((y / 7) % 2 ? 1.5 : -1.5)}" cy="${y}" r="${r.toFixed(1)}" fill="${y % 14 ? '#8a6fbf' : '#a48fd0'}"/>`;
      }
      return dots;
    })
    .join('');
  return (
    `<svg viewBox="0 0 360 210" width="100%" role="img" aria-label="亀戸天神社の景色の模式的な絵。心字池に朱塗りの太鼓橋が大きく反ってかかり、手前の上には藤棚から藤の花が垂れ、奥に東京スカイツリーが立っています">` +
    `<rect width="360" height="210" fill="#e7eef4"/>` +
    // スカイツリー（奥・右寄り）
    `<path d="M284 150 L292 58 L296 58 L304 150 Z" fill="#9fb4c6"/>` +
    `<rect x="286" y="86" width="16" height="7" rx="2" fill="#8aa1b6"/>` +
    `<rect x="289" y="64" width="10" height="5" rx="2" fill="#8aa1b6"/>` +
    `<line x1="294" y1="34" x2="294" y2="60" stroke="#9fb4c6" stroke-width="2.5"/>` +
    // 本殿の屋根（奥・左寄り）と木立
    `<path d="M40 150 V128 H112 V150 Z" fill="#e9dcc3"/>` +
    `<path d="M30 130 Q76 106 122 130 Z" fill="${AI}"/>` +
    `<rect x="72" y="112" width="8" height="5" fill="${GOLD}"/>` +
    `<path d="M0 150 Q10 128 24 140 Q30 124 40 142 V150 Z" fill="#7d8f5a"/>` +
    `<path d="M122 150 Q132 130 146 142 Q156 128 168 146 L250 150 Q262 132 276 146 V150 Z" fill="#7d8f5a"/>` +
    `<path d="M310 150 Q322 130 336 142 Q346 128 360 140 V150 Z" fill="#7d8f5a"/>` +
    // 心字池
    `<rect x="0" y="150" width="360" height="60" fill="#bcd6e8"/>` +
    `<path d="M20 186 h40 M130 198 h50 M250 190 h44 M300 202 h40" stroke="#dbe9f2" stroke-width="2"/>` +
    // 太鼓橋の映り込み
    `<path d="M60 160 Q180 214 300 160" fill="none" stroke="#cf9c90" stroke-width="5" opacity="0.5"/>` +
    // 太鼓橋（朱）
    `<path d="M60 160 Q180 54 300 160" fill="none" stroke="${SHU}" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M66 146 Q180 46 294 146" fill="none" stroke="${SHU}" stroke-width="3"/>` +
    [96, 128, 160, 200, 232, 264].map((x) => {
      const t = (x - 60) / 240;
      const yTop = (1 - t) * (1 - t) * 146 + 2 * (1 - t) * t * 46 + t * t * 146;
      const yBot = (1 - t) * (1 - t) * 160 + 2 * (1 - t) * t * 54 + t * t * 160;
      return `<line x1="${x}" y1="${yTop.toFixed(1)}" x2="${x}" y2="${yBot.toFixed(1)}" stroke="${SHU}" stroke-width="3"/>`;
    }).join('') +
    `<circle cx="180" cy="${(0.25 * 146 + 0.5 * 46 + 0.25 * 146 - 4).toFixed(1)}" r="3" fill="${GOLD}"/>` +
    // 藤棚（手前・上）
    `<rect x="0" y="10" width="360" height="5" fill="#6e5a3a"/>` +
    `<path d="M0 16 Q20 22 40 16 T80 16 T120 16 T160 16 T200 16 T240 16 T280 16 T320 16 T360 16" fill="none" stroke="#6e7d4a" stroke-width="5"/>` +
    fuji +
    `<rect x="4" y="10" width="5" height="200" fill="#6e5a3a"/>` +
    `<rect x="351" y="10" width="5" height="200" fill="#6e5a3a"/>` +
    `</svg>`
  );
}

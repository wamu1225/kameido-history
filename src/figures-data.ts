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
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
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

// 7) 時計の街の年表（1939 竣工 → 1993 移転 → 1997 サンストリート → 2022 カメイドクロック）
function tokeiMachiTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11.5" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="11" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="11" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="第二精工舎からカメイドクロックまで、同じ土地の変遷の図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    `<line x1="34" y1="54" x2="266" y2="54" stroke="${AI}" stroke-width="2.4"/>` +
    `<path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="${AI}" stroke-width="2.4" fill="none"/>` +
    node(40, '1939', '第二精工舎|本社工場竣工', AI) +
    node(125, '1993', '本社移転|(千葉・幕張)', SHU) +
    node(200, '1997-2016', 'サンストリート|亀戸', GOLD) +
    node(260, '2022', 'カメイド|クロック開業', AI) +
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

// 11) 亀戸水神宮の年表
function suijinguTimelineSvg(): string {
  const node = (x: number, year: string, label: string, color: string) =>
    `<circle cx="${x}" cy="54" r="9" fill="${color}"/>` +
    `<text x="${x}" y="34" font-size="11" font-weight="700" fill="${AI_DEEP}" text-anchor="middle">${year}</text>` +
    `<text x="${x}" y="80" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[0]}</text>` +
    (label.includes('|') ? `<text x="${x}" y="92" font-size="10.5" fill="${INK}" text-anchor="middle">${label.split('|')[1]}</text>` : '');
  return (
    `<svg class="diagram-single" viewBox="0 0 300 110" width="100%" role="img" aria-label="亀戸水神宮の年表の図">` +
    `<rect width="300" height="110" fill="${BG}"/>` +
    `<line x1="34" y1="54" x2="266" y2="54" stroke="${AI}" stroke-width="2.4"/>` +
    `<path d="M266 54 l-8 -4 M266 54 l-8 4" stroke="${AI}" stroke-width="2.4" fill="none"/>` +
    node(40, '16世紀前半', '水害よけに|水神を勧請（社伝）', AI) +
    node(125, '延宝年間', '古地図に|記載を確認', SHU) +
    node(200, '1945.3', '東京大空襲で|甚大な被害', SHU) +
    node(260, '1960', '再建', GOLD) +
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
    `<svg class="diagram-single" viewBox="0 0 340 290" width="100%" role="img" aria-label="東武亀戸線の位置づけが1910年に変わったことを示す路線の模式図">` +
    `<rect width="340" height="290" fill="${BG}"/>` +
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
    tx(100, 244, '1910年　浅草駅開業', 11.5) + tx(225, 244, '支線に（2両編成）', 11.5) +
    st(40, 222, '浅草', AI) + st(160, 222, '曳舟', GOLD) + st(290, 222, '亀戸', SHU) +
    ln(14, 44, 276, '#8a8372', 1.6, '4 3') +
    tx(52, 280, '越中島・新橋への延伸構想は実現せず', 11.5, 400, INK, 'start') +
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
  'tokei-machi-timeline': {
    caption: '同じ土地の変遷（模式図）。1939年に竣工した第二精工舎の本社工場は、1993年の本社移転後も工場として使われ、跡地は1997年にサンストリート亀戸、2016年の閉館を経て2022年にカメイドクロックへと変わりました。',
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
    caption: '亀戸水神宮の年表（模式図）。社伝では16世紀前半に水害よけの神を勧請したと伝わり、延宝年間（1673〜1681年）の古地図にも記載が確認されています。昭和20年（1945年）3月の東京大空襲で大きな被害を受けましたが、昭和35年（1960年）に再建されました。',
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

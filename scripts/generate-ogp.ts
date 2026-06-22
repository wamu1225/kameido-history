// scripts/generate-ogp.ts — OGP画像（1200×630）を public/ogp.png に生成する。
// 実行: npx tsx scripts/generate-ogp.ts
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const FONT = "'Yu Gothic','Hiragino Kaku Gothic ProN','Hiragino Sans',Meiryo,'Noto Sans JP',sans-serif";
const SERIF = "'Yu Mincho','Hiragino Mincho ProN','Noto Serif JP',serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f1e6"/>
  <rect x="0" y="0" width="16" height="630" fill="#27406a"/>
  <rect x="16" y="0" width="6" height="630" fill="#b34230"/>
  <text x="96" y="196" font-family="${SERIF}" font-size="78" font-weight="700" fill="#1b2e4d">亀戸の歴史と文化</text>
  <text x="96" y="280" font-family="${SERIF}" font-size="44" font-weight="600" fill="#27406a">ガイド</text>
  <text x="96" y="372" font-family="${FONT}" font-size="26" fill="#4f5560">天神社と香取神社・亀戸大根・船橋屋のくず餅・広重の浮世絵まで、</text>
  <text x="96" y="410" font-family="${FONT}" font-size="26" fill="#4f5560">下町・亀戸の歴史と文化を一次資料で確かめながら紹介する無料サイト</text>
  <line x1="96" y1="476" x2="720" y2="476" stroke="#d9d1bd" stroke-width="2"/>
  <text x="96" y="528" font-family="${FONT}" font-size="24" fill="#27406a" font-weight="600">study-apps.com/kameido-history/</text>
  <!-- 亀（甲羅）— 亀戸の象徴 -->
  <g transform="translate(1000 312)">
    <circle r="128" fill="#ffffff" stroke="#27406a" stroke-width="3"/>
    <path d="M-64 14 C-70 -28 -28 -58 0 -58 C28 -58 70 -28 64 14 C58 44 30 56 0 56 C-30 56 -58 44 -64 14 Z" fill="#3f5e8c"/>
    <path d="M0 -34 L30 -16 L30 16 L0 34 L-30 16 L-30 -16 Z" fill="#27406a" stroke="#cdb56a" stroke-width="3"/>
    <circle cx="0" cy="-78" r="13" fill="#3f5e8c"/>
    <g stroke="#27406a" stroke-width="9" stroke-linecap="round">
      <path d="M-54 -22 L-78 -36"/><path d="M54 -22 L78 -36"/>
      <path d="M-46 40 L-64 64"/><path d="M46 40 L64 64"/>
    </g>
  </g>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const outPath = path.join(PUBLIC_DIR, 'ogp.png');
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log(`✓ ogp.png (1200x630) を生成: ${outPath}`);
}
main().catch((e) => { console.error(e); process.exit(1); });

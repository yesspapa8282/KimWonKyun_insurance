// 카카오톡 링크 미리보기 이미지(public/og.png, 1200×630)를 만듭니다.
// 문구는 src/config/site.ts 와 맞춰 아래 TEXT 를 수정하세요. 사진은 public/images/profile.webp 를 사용합니다.
// 실행: pnpm og
import { mkdtempSync, writeFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const fontDir = resolve("node_modules/pretendard/dist/public/static");
const confDir = mkdtempSync(join(tmpdir(), "og-fonts-"));
const conf = join(confDir, "fonts.conf");
writeFileSync(
  conf,
  `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig><dir>${fontDir}</dir><cachedir>${confDir}</cachedir></fontconfig>`,
);
process.env.FONTCONFIG_FILE = conf;

const { default: sharp } = await import("sharp");

const TEXT = {
  name: "김원균",
  title: "교육실장",
  org: "글로벌금융판매 OSK총괄",
  lines: ["보장분석부터 보험금 청구 안내까지,", "끝까지 함께하는 보험설계사"],
};

const W = 1200;
const H = 630;
const PHOTO_W = 520;

const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b0f3a"/>
      <stop offset="0.45" stop-color="#3b1a82"/>
      <stop offset="0.8" stop-color="#6d28d9"/>
      <stop offset="1" stop-color="#be185d"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#db2777" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#db2777" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
</svg>`;

// 사진: 오른쪽에 세로로 크게, 왼쪽 가장자리를 배경으로 서서히 흐리게
const photo = await sharp("public/images/profile.webp")
  .resize(PHOTO_W, H, { fit: "cover", position: "top" })
  .toBuffer();
const fadeMask = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO_W}" height="${H}">
  <defs>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.28" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0.72" stop-color="#fff" stop-opacity="1"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <mask id="m"><rect width="100%" height="100%" fill="url(#v)"/></mask>
  </defs>
  <rect width="100%" height="100%" fill="url(#h)" mask="url(#m)"/>
</svg>`);
const fadedPhoto = await sharp(photo)
  .ensureAlpha()
  .composite([{ input: fadeMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .f { font-family: 'Pretendard'; fill: #fff; }
  </style>
  <text x="120" y="190" class="f" font-size="30" font-weight="600" fill-opacity="0.85">${esc(TEXT.org)}</text>
  <text x="120" y="270" class="f" font-size="72" font-weight="800">${esc(TEXT.name)}<tspan font-size="44" font-weight="700" dx="16">${esc(TEXT.title)}</tspan></text>
  <rect x="122" y="306" width="64" height="5" rx="2.5" fill="#fee500"/>
  ${TEXT.lines
    .map(
      (l, i) =>
        `<text x="120" y="${390 + i * 56}" class="f" font-size="40" font-weight="700">${esc(l)}</text>`,
    )
    .join("")}
</svg>`);

await sharp(Buffer.from(bg))
  .composite([
    { input: fadedPhoto, left: W - PHOTO_W, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .png({ palette: true, quality: 90, effort: 10 })
  .toFile("public/og.png");

console.log(`public/og.png 생성 완료 (${Math.round(statSync("public/og.png").size / 1024)}KB)`);

// 파비콘·애플 터치 아이콘
const iconSvg = (size, radius) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2e1765"/>
      <stop offset="0.6" stop-color="#6d28d9"/>
      <stop offset="1" stop-color="#be185d"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="${radius}" fill="url(#g)"/>
  <text x="50" y="68" text-anchor="middle" font-family="Pretendard" font-weight="800" font-size="52" fill="#fff">김</text>
</svg>`);
await sharp(iconSvg(64, 22)).png().toFile("src/app/icon.png");
await sharp(iconSvg(180, 0)).png().toFile("src/app/apple-icon.png");
console.log("src/app/icon.png, src/app/apple-icon.png 생성 완료");

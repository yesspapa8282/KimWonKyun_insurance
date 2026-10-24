// 실제 프로필 사진을 받기 전까지 쓰는 임시 이미지(실루엣)를 만듭니다.
// 실제 사진이 오면 public/images/profile.webp 를 교체하고 이 스크립트는 쓰지 않습니다.
import sharp from "sharp";

const W = 1200;
const H = 630;
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="75%">
      <stop offset="0" stop-color="#f1f1f3"/>
      <stop offset="1" stop-color="#b9bac0"/>
    </radialGradient>
    <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1f2a4d"/>
      <stop offset="1" stop-color="#141b33"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e7c3a6"/>
      <stop offset="1" stop-color="#d4a988"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- 어깨·정장 -->
  <path d="M300 630 C310 470 420 400 600 395 C780 400 890 470 900 630 Z" fill="url(#suit)"/>
  <!-- 셔츠 -->
  <path d="M545 400 L600 520 L655 400 Z" fill="#ffffff"/>
  <!-- 넥타이 -->
  <path d="M588 412 L612 412 L620 440 L608 560 L592 560 L580 440 Z" fill="#1d3170"/>
  <!-- 목 -->
  <rect x="560" y="300" width="80" height="105" rx="30" fill="url(#skin)"/>
  <!-- 머리 -->
  <ellipse cx="600" cy="210" rx="98" ry="122" fill="url(#skin)"/>
  <!-- 머리카락 -->
  <path d="M502 200 C498 110 545 70 605 70 C670 70 705 110 700 200 C690 150 650 125 600 128 C550 130 515 150 502 200 Z" fill="#2b2522"/>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(2400, 1260)
  .webp({ quality: 80 })
  .toFile("public/images/profile.webp");
console.log("public/images/profile.webp 생성 완료 (임시 실루엣)");

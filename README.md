# 김원균 교육실장 웹 명함

휴대폰용 원페이지 소개 페이지입니다. Next.js(App Router) · TypeScript · Tailwind CSS · shadcn/ui · Lucide · Motion · Pretendard(로컬 폰트).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## 1. 문구·전화번호 바꾸는 법

**`src/config/site.ts` 한 파일만 고치면** 첫 화면·문의 섹션·하단 고정 바·404 화면이 모두 함께 바뀝니다.

| 바꿀 것 | 위치 |
|---|---|
| 전화번호 | `contact.phone`(국제형식 `+8210…`)과 `contact.phoneDisplay`(화면 표시) 두 줄 |
| 카카오톡 오픈채팅 링크 | `contact.kakaoUrl` |
| 이메일 | `contact.email` |
| 상담 시간·활동 지역 | `contact.hours`, `contact.area` — 빈 문자열(`""`)이면 화면에서 사라짐 |
| 한 줄 소개 / 보조 문구 | `hero.headline`, `hero.subline` |
| 자격 배지 | `credentials.badges` 배열에 추가·삭제 |
| 상담 분야 카드 | `services.items` 배열 (`icon`은 `search·heart·family·file·piggy·landmark·briefcase` 중 하나) |
| 상단 메뉴 | `nav.items` (`targetId`는 `about·process·services·contact` 중 하나) |
| 심의번호 | `legal.reviewNo`에 입력하면 맨 아래에 "심의번호: …" 표시, 비우면 숨김 |
| 검색 노출 | `seo.indexable` — 공개 전 `false`(noindex 메타·`X-Robots-Tag`·robots.txt 차단). 심의 후 `true` |

> 문구 수정 후에는 금지 표현("최고", "1등", "가장 좋은", "무조건", "100% 보장", 절감액·수익률 숫자)이 없는지 확인하세요.
> `grep -nE "최고|1등|가장 좋은|무조건|100% ?보장|수익률|절감" src/config/site.ts`

## 2. 사진 바꾸는 법

- 현재 사진은 의뢰인 제공 세로형 사진(1083×1452)입니다. 휴대폰에서는 세로 비율 그대로 가운데에 두고 좌우·위아래를 배경으로 서서히 이어 붙이며, PC에서는 4:5 카드로 보여 줍니다.
- 같은 이름(`public/images/profile.webp`)으로 덮어쓰면 됩니다. 가로 2400px 이상 원본을 WebP(품질 80 내외, 약 200KB 이하)로 변환해 넣는 것을 권장합니다.
  ```bash
  npx sharp-cli -i 원본.jpg -o public/images/profile.webp resize 2400 -- webp --quality 80
  ```
- 비율이 다른 사진으로 바꾸면 `src/components/sections/hero.tsx`의 `aspect-[1083/1452]`를 새 사진의 가로/세로 크기로 바꿔 주세요.
- 사진을 바꾼 뒤 링크 미리보기 이미지도 다시 만드세요: `pnpm og` → `public/og.png`(1200×630), 파비콘(`src/app/icon.png`, `apple-icon.png`) 재생성. 미리보기 문구는 `scripts/make-og.mjs` 상단 `TEXT`에서 수정합니다.

## 3. 배포 방법

1. GitHub 저장소는 **비공개**로 유지합니다.
2. 호스팅 서비스(Vercel 등)에서 이 저장소를 가져옵니다(Framework: Next.js, Install: `pnpm install`, Build: `pnpm build`).
3. 환경변수 `NEXT_PUBLIC_SITE_URL`에 배포 주소(예: `https://kimwonkyun.vercel.app`)를 넣습니다. 링크 미리보기 이미지 주소가 이 값으로 만들어집니다. (`.env.example` 참고, `.env` 파일은 저장소에 올리지 않습니다.)
4. 이번 범위는 `preview` 브랜치의 **확인용 주소**까지입니다. 정식 공개·도메인 연결은 회사 심의 후 진행합니다.

**현재 배포 상태**
- Vercel 프로젝트: `kimwonkyun-insurance` (팀 yesspapa), GitHub `preview` 브랜치에 푸시하면 자동 배포
- 확인용 주소: https://kimwonkyun-insurance.vercel.app (링크를 아는 사람만 접근, 검색 노출 차단)
- 배포 보호: Standard Protection — 위 주소는 공개, 커밋별 미리보기 주소는 Vercel 로그인 필요

## 4. 카카오톡 링크 미리보기가 안 바뀔 때

카카오톡은 링크 카드를 캐시합니다. 문구나 `og.png`를 바꿨는데 예전 카드가 나오면:

1. [카카오 개발자 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에 접속(카카오 계정 로그인)
2. 배포 주소를 입력하고 **캐시 초기화** 클릭
3. 카카오톡 "나와의 채팅"에 주소를 다시 붙여 넣어 확인

## 폴더 구조

```
src/
  app/                 layout(메타·폰트) · page · not-found · robots · 아이콘
  config/site.ts       ← 모든 문구·연락처
  lib/links.ts         tel:/mailto: 주소 생성
  components/
    sections/          hero · credentials · process · services · contact · site-footer
    common/            site-header · sticky-contact-bar · contact-buttons · phone-link · reveal · share-button · section-shell
    ui/                shadcn (button · badge · card)
public/
  fonts/               Pretendard Variable (KS X 1001 한글 2,350자 + 영문 서브셋, 약 450KB)
  images/profile.webp  프로필 사진
  og.png               링크 미리보기 이미지
scripts/               og.png·아이콘 생성 스크립트
```

## 참고 / 남은 일

- **배경 효과(FR-19 대체)**: 21st.dev `PerspectiveTunnelHero`를 고쳐 `src/components/ui/perspective-tunnel-hero.tsx`에 두었습니다. 첫 화면·문의 섹션 배경에서 상담 분야 아이콘 카드가 천천히 다가오고, 마우스를 움직이면 살짝 기울어집니다.
  - 설정: `site.ts`의 `motion` (`enabled`로 전체 끄기, `hero`/`contact`로 위치별 끄기, `loopSeconds` 속도, `opacity` 진하기)
  - 카드에 사진을 쓰려면 `public/images/tunnel/`에 이미지를 넣고 `motion.photos`에 `"/images/tunnel/1.webp"` 식으로 적습니다(외부 주소 사용 금지 원칙).
  - 원본과 달리 휠 스크롤을 가로채지 않고(페이지 스크롤 유지), 화면 밖·동작 줄이기 설정에서는 멈추며, 첫 화면 JS에 포함되지 않도록 늦게 불러옵니다.
  - `framer-motion`은 설치하지 않았습니다. 같은 라이브러리의 새 이름인 `motion`이 이미 설치되어 있어 중복 설치를 피했습니다.
- 폰트는 용량을 줄이려고 자주 쓰는 한글 2,350자만 담았습니다. 드문 글자(예: 똠, 햏)는 기기 기본 글꼴로 보입니다.
- 클라이언트 컴포넌트: `Reveal`, `StickyContactBar`, `ShareButton` 외에 상단 메뉴(`SiteHeader`)와 PC 번호 복사(`PhoneLink`)가 동작을 위해 클라이언트로 되어 있습니다.

/**
 * 사이트의 모든 문구·연락처·설정은 이 파일 한 곳에서 수정합니다.
 * 컴포넌트에는 문구를 직접 쓰지 않습니다. 값이 없는 선택 항목(?)은 화면에서 숨겨집니다.
 */

export type IconKey =
  | "search"
  | "heart"
  | "family"
  | "file"
  | "piggy"
  | "landmark"
  | "briefcase";

export type ServiceItem = {
  title: string;
  description: string;
  icon: IconKey;
  featured?: boolean;
};

export type SiteConfig = {
  person: {
    name: string;
    title: string;
    organization: string;
    /** 사진 대체 텍스트 */
    photoAlt: string;
  };
  contact: {
    /** 국제 형식(+82…). tel: 링크에 사용 */
    phone: string;
    /** 화면 표시용 번호 */
    phoneDisplay: string;
    email: string;
    kakaoUrl: string;
    /** 상담 가능 시간. 비우면 숨김 */
    hours?: string;
    /** 활동 지역. 비우면 숨김 */
    area?: string;
  };
  labels: {
    kakao: string;
    kakaoShort: string;
    phone: string;
    phoneShort: string;
    email: string;
    phoneCopied: string;
    hoursLabel: string;
    areaLabel: string;
  };
  nav: {
    ariaLabel: string;
    items: { label: string; targetId: string }[];
  };
  hero: {
    headline: string;
    /** 보조 문구. 비우면 숨김 */
    subline?: string;
  };
  credentials: {
    title: string;
    badges: string[];
  };
  process: {
    title: string;
    steps: { title: string; description: string }[];
    closing: string;
    cta: string;
  };
  services: {
    title: string;
    items: ServiceItem[];
  };
  contactSection: {
    title: string;
    body: string;
  };
  share: {
    enabled: boolean;
    label: string;
    copied: string;
  };
  legal: {
    disclaimer: string;
    /** 심의번호. 비우면 숨김 */
    reviewNo?: string;
    reviewLabel: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
  seo: {
    title: string;
    description: string;
    siteName: string;
    /** 공개 전에는 false 유지 (검색 노출 차단) */
    indexable: boolean;
  };
};

export const site: SiteConfig = {
  person: {
    name: "김원균",
    title: "교육실장",
    organization: "글로벌금융판매 OSK총괄",
    photoAlt: "김원균 교육실장",
  },
  contact: {
    phone: "+821071505440",
    phoneDisplay: "010-7150-5440",
    email: "tg5440@naver.com",
    kakaoUrl: "https://open.kakao.com/o/sMcyjJTi",
    hours: "",
    area: "경남 전 지역",
  },
  labels: {
    kakao: "카카오톡으로 문의하기",
    kakaoShort: "카카오톡 문의",
    phone: "전화하기",
    phoneShort: "전화",
    email: "이메일",
    phoneCopied: "번호가 복사되었습니다",
    hoursLabel: "상담 시간",
    areaLabel: "활동 지역",
  },
  nav: {
    ariaLabel: "페이지 이동",
    items: [
      { label: "도움 분야", targetId: "services" },
      { label: "상담 과정", targetId: "process" },
      { label: "소개", targetId: "about" },
      { label: "연락처", targetId: "contact" },
    ],
  },
  hero: {
    headline: "보장분석부터 보험금 청구 안내까지, 끝까지 함께하는 보험설계사",
    subline: "보험설계사 20년 · 경남 전 지역 상담",
  },
  credentials: {
    title: "20년간 고객의 보험을 점검하고 관리해 왔습니다.",
    badges: ["경력 20년", "생명보험설계사", "손해보험설계사"],
  },
  process: {
    title: "내 보험, 이렇게 살펴봅니다",
    steps: [
      {
        title: "함께 확인",
        description: "가입하신 보험을 함께 확인합니다.",
      },
      {
        title: "쉬운 설명",
        description:
          "어떤 보장이 있고 어떤 부분이 비어 있는지 쉬운 말로 설명드립니다.",
      },
      {
        title: "필요한 만큼 정리",
        description: "꼭 필요한 부분만 함께 정리합니다.",
      },
    ],
    closing: "궁금한 점만 편하게 물어보셔도 됩니다.",
    cta: "카카오톡으로 물어보기",
  },
  services: {
    title: "이런 상담을 도와드립니다",
    items: [
      {
        title: "보장분석·보험 리모델링",
        description: "가입하신 보험을 살펴보고 정리해 드립니다.",
        icon: "search",
        featured: true,
      },
      {
        title: "암·뇌·심장·간병·치매 보장",
        description: "큰 병에 대비한 보장을 살펴봅니다.",
        icon: "heart",
      },
      {
        title: "가족·자녀 생애주기 보장",
        description: "자녀가 자라는 시기에 맞춰 가족 보장을 설계합니다.",
        icon: "family",
      },
      {
        title: "보험금 청구·계약관리",
        description: "청구 방법을 안내하고 계약을 꾸준히 관리합니다.",
        icon: "file",
      },
      {
        title: "은퇴·연금·노후 준비",
        description: "노후 생활비 준비를 함께 계획합니다.",
        icon: "piggy",
      },
      {
        title: "상속·자산승계",
        description: "상속 재원 마련을 함께 대비합니다.",
        icon: "landmark",
      },
      {
        title: "법인 CEO·사업자 위험보장",
        description: "사업자의 위험 보장을 살펴봅니다.",
        icon: "briefcase",
      },
    ],
  },
  contactSection: {
    title: "궁금한 점, 편하게 물어보세요.",
    body: "카카오톡이 가장 빠릅니다. 전화나 이메일도 괜찮습니다.",
  },
  share: {
    enabled: true,
    label: "이 페이지 공유하기",
    copied: "링크가 복사되었습니다",
  },
  legal: {
    disclaimer:
      "본 페이지는 설계사 소개 페이지입니다. 보장 내용은 상품과 계약 조건에 따라 달라질 수 있습니다.",
    reviewNo: "",
    reviewLabel: "심의번호",
  },
  notFound: {
    title: "찾으시는 페이지가 없습니다",
    body: "주소를 다시 확인해 주세요. 궁금한 점은 카카오톡으로 편하게 물어보셔도 됩니다.",
    home: "홈으로 돌아가기",
  },
  seo: {
    title: "김원균 교육실장 | 보장분석·보험 리모델링",
    description:
      "보장분석부터 보험금 청구 안내까지, 끝까지 함께하는 보험설계사 김원균입니다.",
    siteName: "김원균 교육실장",
    indexable: false,
  },
};

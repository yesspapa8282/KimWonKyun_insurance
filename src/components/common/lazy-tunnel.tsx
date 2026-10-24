"use client";

import dynamic from "next/dynamic";

// 장식용 효과라 첫 화면 JS에 넣지 않고, 페이지가 뜬 뒤 따로 불러옵니다.
export const LazyTunnel = dynamic(() => import("@/components/ui/perspective-tunnel-hero"), {
  ssr: false,
});

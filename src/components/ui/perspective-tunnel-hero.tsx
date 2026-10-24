"use client";

/**
 * 원근 터널 배경 효과 (21st.dev "PerspectiveTunnelHero"를 이 사이트에 맞게 고친 버전)
 *
 * 원본과 달라진 점
 * - framer-motion 대신 프로젝트에 이미 있는 motion(`motion/react`, 같은 라이브러리의 새 이름)을 사용하고,
 *   LazyMotion strict 환경에 맞춰 `motion.div` → `m.div`로 바꿨습니다.
 * - 마우스 휠을 가로채던 동작(페이지 스크롤 막힘)을 없애고, 시간이 지나며 천천히 흐르는 자동 루프로 바꿨습니다.
 * - 100svh·w-screen 고정 대신 부모 영역을 채우는 배경(absolute inset-0)으로 쓰고, 크기는 ResizeObserver로 잽니다.
 * - 외부 이미지(CDN) 대신 상담 분야 아이콘 카드를 기본으로 쓰고, 사진은 `src`로 넣을 수 있습니다.
 * - 가운데 영문 제목·스크롤 안내·점 격자·카드 제목 글씨(본문 글자와 겹쳐 읽기 방해)는 빼고, 카드는 터치를 가로채지 않습니다(pointer-events-none).
 * - 화면 밖에 있으면 멈추고, 기기의 "동작 줄이기"를 켜면 정지된 한 장면만 보여 줍니다.
 */

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useRef, useState } from "react";

import { SERVICE_ICONS } from "@/components/common/service-icons";
import type { IconKey } from "@/config/site";
import { cn } from "@/lib/utils";

export type TunnelItem = { title: string; icon?: IconKey; src?: string };

type TunnelCardData = {
  item: TunnelItem;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
};

type StageDimensions = { width: number; height: number; isMobile: boolean };

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

function buildCards(items: TunnelItem[]): TunnelCardData[] {
  return items.map((item, i) => {
    const goldenAngle = i * 137.5 * (Math.PI / 180);
    return {
      item,
      angleCos: Math.cos(goldenAngle),
      angleSin: Math.sin(goldenAngle),
      radiusFactorX: 0.3 + (i % 3) * 0.08,
      radiusFactorY: 0.28 + (i % 2) * 0.09,
      rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      index: i,
    };
  });
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

type TunnelCardProps = {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
};

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  // 카드마다 위상을 달리해 끊김 없이 이어지는 터널을 만듭니다.
  const phase = card.index / total;
  const localProgress = useTransform(progress, (p) => (p + phase) % 1);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 300 : 450;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
  const opacity = useTransform(localProgress, [0, 0.2, 0.75, 0.95], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(110, Math.min(150, stage.width * 0.34))
    : Math.max(160, Math.min(230, stage.width * 0.16));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 16 : 40;

  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currZ, px, py]: number[]) =>
      `translate3d(calc(-50% + ${baseX - px * panStrength}px), calc(-50% + ${baseY - py * panStrength}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`,
  );

  const Icon = card.item.icon ? SERVICE_ICONS[card.item.icon] : null;

  return (
    <m.div
      style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
      className="absolute left-1/2 top-1/2 aspect-[4/5] will-change-transform"
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 via-white/[0.08] to-fuchsia-300/10 shadow-2xl shadow-black/30 ring-1 ring-white/25">
        {card.item.src ? (
          // eslint-disable-next-line @next/next/no-img-element -- 장식용 배경 이미지
          <img
            src={card.item.src}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          Icon && (
            <div className="flex h-full w-full items-center justify-center">
              <Icon className="size-1/3 text-white/80" strokeWidth={1.5} />
            </div>
          )
        )}
      </div>
    </m.div>
  );
}

type PerspectiveTunnelHeroProps = {
  items: TunnelItem[];
  /** 터널 한 바퀴에 걸리는 시간(초) */
  loopSeconds?: number;
  /** 효과 전체 불투명도 */
  opacity?: number;
  className?: string;
};

export default function PerspectiveTunnelHero({
  items,
  loopSeconds = 26,
  opacity = 0.55,
  className,
}: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(containerRef, { margin: "100px" });
  const cards = useMemo(() => buildCards(items), [items]);

  const [stage, setStage] = useState<StageDimensions>({
    width: 390,
    height: 800,
    isMobile: true,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStage({ width, height, isMobile: window.innerWidth < 768 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 시간에 따라 0→1 을 반복하는 진행값. 화면 밖이거나 동작 줄이기면 멈춤.
  const progress = useMotionValue(0.3);
  useEffect(() => {
    if (reduce || !inView) return;
    const from = progress.get() % 1;
    const controls = animate(progress, [from, from + 1], {
      duration: loopSeconds,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [reduce, inView, loopSeconds, progress]);

  const pointer = useCameraParallax(!reduce);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{
        perspective: stage.isMobile ? "900px" : "1200px",
        transformStyle: "preserve-3d",
        opacity,
      }}
    >
      {/* 가운데 은은한 빛 + 깊이 링 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.22)_0%,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      <div className="absolute left-1/2 top-1/2 h-[76vmin] w-[76vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {cards.map((card) => (
          <TunnelCard
            key={card.index}
            card={card}
            progress={progress}
            pointer={pointer}
            total={cards.length}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}

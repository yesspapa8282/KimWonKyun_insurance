import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { ContactButtons } from "@/components/common/contact-buttons";
import { TunnelBackground } from "@/components/common/tunnel-background";
import { site } from "@/config/site";
import profile from "../../../public/images/profile.webp";

export const HERO_CTA_ID = "hero-cta";

export function Hero() {
  const { person, hero } = site;

  return (
    <section
      aria-labelledby="hero-name"
      className="relative isolate overflow-hidden bg-grad-hero pt-header text-white"
    >
      {/* 은은한 빛번짐 (장식) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-1/3 size-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -left-28 bottom-0 size-80 rounded-full bg-violet-500/25 blur-3xl" />
      </div>
      <TunnelBackground placement="hero" className="-z-10" />

      <div className="mx-auto flex min-h-[calc(100svh-var(--header-h)-env(safe-area-inset-top))] w-full max-w-[1120px] flex-col lg:grid lg:min-h-[min(calc(100svh-var(--header-h)),820px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:px-8 lg:py-12">
        {/* 프로필 사진 */}
        <div className="relative h-[clamp(240px,38svh,380px)] w-full shrink-0 lg:h-auto lg:aspect-[4/5] lg:overflow-hidden lg:rounded-[28px]">
          {/* 휴대폰: 세로 사진을 가운데에 두고 좌우·아래를 배경으로 서서히 이어 붙임 / PC: 4:5 카드 전체 */}
          <div className="absolute inset-y-0 left-1/2 aspect-[1083/1452] -translate-x-1/2 [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_68%,transparent),linear-gradient(to_right,transparent,black_16%,black_84%,transparent)] lg:inset-0 lg:aspect-auto lg:translate-x-0 lg:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
            <Image
              src={profile}
              alt={person.photoAlt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 440px, 300px"
              quality={80}
              className="object-cover object-[50%_15%]"
            />
            {/* 회색 배경을 보라로 은은하게 물들임 — 얼굴 주변은 제외 */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-violet-700/25 [mask-image:radial-gradient(ellipse_48%_42%_at_50%_42%,transparent_60%,black_100%)]"
            />
          </div>
        </div>

        {/* 문구 + 버튼 */}
        <div className="relative z-10 -mt-14 flex flex-1 flex-col px-5 pb-8 sm:px-8 lg:mt-0 lg:px-0 lg:pb-0">
          <div className="mx-auto w-full max-w-[520px] lg:mx-0">
            <p className="text-[15px] font-medium text-white/85">{person.organization}</p>
            <h1 id="hero-name" className="mt-0.5 text-[28px] font-extrabold leading-tight tracking-tight lg:text-[34px]">
              {person.name} <span className="text-[20px] font-bold text-white/90 lg:text-[24px]">{person.title}</span>
            </h1>
            <p className="mt-3 text-[24px] font-bold leading-[1.35] tracking-tight xs:text-[26px] lg:mt-5 lg:text-[30px]">
              {hero.headline}
            </p>
            {hero.subline && (
              <p className="mt-2 text-[15px] text-white/85 sm:text-base">{hero.subline}</p>
            )}
            <ContactButtons layout="hero" id={HERO_CTA_ID} className="mt-6 lg:mt-8 lg:max-w-[420px]" />
          </div>
          <div aria-hidden="true" className="mt-auto flex justify-center pt-6 lg:hidden">
            <ChevronDown className="size-7 animate-bounce text-white/70 motion-reduce:animate-none" />
          </div>
        </div>
      </div>

      {/* 밝은 본문으로 완만하게 이어지는 곡선 */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-6 w-full text-soft lg:h-10"
      >
        <path d="M0 48h1440V18C1100 50 340 -10 0 22z" fill="currentColor" />
      </svg>
    </section>
  );
}

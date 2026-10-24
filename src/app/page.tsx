import { MessageCircle } from "lucide-react";

import { KakaoButton, PhoneButton } from "@/components/common/contact-buttons";
import { SiteHeader } from "@/components/common/site-header";
import { StickyContactBar } from "@/components/common/sticky-contact-bar";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { HERO_CTA_ID, Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { site } from "@/config/site";
import { kakaoHref } from "@/lib/links";

export default function Home() {
  return (
    <>
      <SiteHeader
        items={site.nav.items}
        ariaLabel={site.nav.ariaLabel}
        brand={`${site.person.name} ${site.person.title}`}
      />
      <main>
        <Hero />
        <Credentials />
        <Process />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
      <StickyContactBar
        watchId={HERO_CTA_ID}
        bar={
          <>
            <div className="flex-[7]">
              <KakaoButton label={site.labels.kakaoShort} size="md" className="h-12" />
            </div>
            <div className="flex-[3]">
              <PhoneButton
                variant="primary"
                size="md"
                label={site.labels.phoneShort}
                showNumber={false}
                className="h-12"
              />
            </div>
          </>
        }
        floating={
          <a
            href={kakaoHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.labels.kakao}
            title={site.labels.kakao}
            className="flex size-16 items-center justify-center rounded-full bg-kakao text-kakao-ink shadow-[0_10px_30px_-8px_rgba(30,27,46,0.45)] transition-transform hover:scale-105 motion-reduce:transition-none"
          >
            <MessageCircle aria-hidden="true" className="size-7" fill="currentColor" />
          </a>
        }
      />
    </>
  );
}

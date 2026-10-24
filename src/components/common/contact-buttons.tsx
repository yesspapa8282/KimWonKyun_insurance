import { Mail, MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { PhoneLink } from "@/components/common/phone-link";
import { site } from "@/config/site";
import { kakaoHref, mailtoHref, telHref } from "@/lib/links";
import { cn } from "@/lib/utils";

type KakaoButtonProps = {
  label?: string;
  className?: string;
  size?: "lg" | "md" | "sm";
};

export function KakaoButton({
  label = site.labels.kakao,
  className,
  size = "lg",
}: KakaoButtonProps) {
  return (
    <a
      href={kakaoHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.labels.kakao}
      className={cn(buttonVariants({ variant: "kakao", size }), "w-full", className)}
    >
      <MessageCircle aria-hidden="true" fill="currentColor" />
      <span className="truncate">{label}</span>
    </a>
  );
}

type PhoneButtonProps = {
  variant?: "outline" | "primary" | "ghostLight";
  size?: "lg" | "md" | "sm";
  label?: string;
  showNumber?: boolean;
  className?: string;
};

export function PhoneButton({
  variant = "outline",
  size = "md",
  label = site.labels.phone,
  showNumber = true,
  className,
}: PhoneButtonProps) {
  return (
    <PhoneLink
      href={telHref()}
      phoneDisplay={site.contact.phoneDisplay}
      copiedMessage={site.labels.phoneCopied}
      aria-label={`${site.labels.phone} ${site.contact.phoneDisplay}`}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <Phone aria-hidden="true" />
      <span className="truncate">
        {label}
        {showNumber && (
          <span className="ml-1.5 font-semibold tabular-nums">
            {site.contact.phoneDisplay}
          </span>
        )}
      </span>
    </PhoneLink>
  );
}

type ContactButtonsProps = {
  layout: "hero" | "contact";
  className?: string;
  /** 하단 고정 바가 관찰할 기준 요소 id */
  id?: string;
};

export function ContactButtons({ layout, className, id }: ContactButtonsProps) {
  if (layout === "hero") {
    return (
      <div id={id} className={cn("flex flex-col gap-2.5", className)}>
        <KakaoButton />
        <PhoneButton />
      </div>
    );
  }

  return (
    <div id={id} className={cn("flex flex-col gap-2.5", className)}>
      <KakaoButton />
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <PhoneButton variant="ghostLight" size="sm" />
        <a
          href={mailtoHref()}
          aria-label={`${site.labels.email} ${site.contact.email}`}
          className={cn(buttonVariants({ variant: "ghostLight", size: "sm" }), "w-full")}
        >
          <Mail aria-hidden="true" />
          <span className="truncate">{site.labels.email}</span>
        </a>
      </div>
    </div>
  );
}

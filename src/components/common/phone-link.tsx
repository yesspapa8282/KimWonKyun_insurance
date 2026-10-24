"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type PhoneLinkProps = {
  href: string;
  phoneDisplay: string;
  copiedMessage: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

/** 휴대폰에서는 전화 앱을 열고, PC(마우스 환경)에서는 번호를 복사한 뒤 2초간 안내합니다. */
export function PhoneLink({
  href,
  phoneDisplay,
  copiedMessage,
  className,
  children,
  ...rest
}: PhoneLinkProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (!desktop || !navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(phoneDisplay);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <span className="relative inline-flex w-full">
      <a href={href} onClick={onClick} className={cn("w-full", className)} {...rest}>
        {children}
      </a>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-sm font-medium text-white shadow-lg transition-opacity duration-200 motion-reduce:transition-none",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        {copied ? copiedMessage : ""}
      </span>
    </span>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type NavItem = { label: string; targetId: string };

type SiteHeaderProps = {
  items: NavItem[];
  ariaLabel: string;
  brand: string;
};

const ACTIVE_OFFSET = 24;
const CLICK_LOCK_MS = 700;

export function SiteHeader({ items, ariaLabel, brand }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  const recompute = useCallback(() => {
    setScrolled(window.scrollY > 24);
    if (lockRef.current) return;

    const doc = document.documentElement;
    const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
    if (atBottom && items.length > 0) {
      setActive(items[items.length - 1].targetId);
      return;
    }

    const line = (headerRef.current?.offsetHeight ?? 52) + ACTIVE_OFFSET;
    let current: { id: string; top: number } | null = null;
    for (const { targetId } of items) {
      const el = document.getElementById(targetId);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= line && (!current || top > current.top)) {
        current = { id: targetId, top };
      }
    }
    setActive(current?.id ?? null);
  }, [items]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      for (const { targetId } of items) {
        if (!document.getElementById(targetId)) {
          console.warn(`[SiteHeader] nav.items의 targetId "${targetId}"와 일치하는 섹션이 없습니다.`);
        }
      }
    }

    const headerH = headerRef.current?.offsetHeight ?? 52;
    const io = new IntersectionObserver(() => recompute(), {
      rootMargin: `-${headerH + ACTIVE_OFFSET}px 0px -60% 0px`,
      threshold: [0, 1],
    });
    items.forEach(({ targetId }) => {
      const el = document.getElementById(targetId);
      if (el) io.observe(el);
    });

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(recompute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(lockTimer.current);
    };
  }, [items, recompute]);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    e.preventDefault();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(targetId);
    lockRef.current = true;

    const release = () => {
      lockRef.current = false;
      clearTimeout(lockTimer.current);
      window.removeEventListener("scrollend", release);
      recompute();
    };
    clearTimeout(lockTimer.current);
    if ("onscrollend" in window) {
      window.addEventListener("scrollend", release, { once: true });
    }
    lockTimer.current = setTimeout(release, reduce ? 50 : CLICK_LOCK_MS);

    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-200 motion-reduce:transition-none",
        scrolled
          ? "border-b border-[#E5E7EB] bg-white/92 backdrop-blur-[8px]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1120px] items-stretch px-3 lg:px-8">
        <span
          className={cn(
            "hidden shrink-0 items-center text-[17px] font-bold transition-colors duration-200 motion-reduce:transition-none lg:flex",
            scrolled ? "text-ink" : "text-white",
          )}
        >
          {brand}
        </span>
        <nav aria-label={ariaLabel} className="min-w-0 flex-1 lg:flex lg:justify-end">
          <ul className="flex h-full overflow-x-auto [scrollbar-width:none] lg:gap-2">
            {items.map(({ label, targetId }) => {
              const isActive = active === targetId;
              return (
                <li key={targetId} className="flex flex-1 lg:flex-none">
                  <a
                    href={`#${targetId}`}
                    onClick={(e) => onNavClick(e, targetId)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative flex min-w-[4.5rem] flex-1 items-center justify-center whitespace-nowrap px-1.5 text-[15px] transition-colors duration-200 motion-reduce:transition-none max-[375px]:text-[14px] lg:px-4",
                      "after:absolute after:inset-x-3 after:bottom-0 after:h-[2px] after:rounded-full after:transition-opacity after:duration-200",
                      scrolled
                        ? isActive
                          ? "font-bold text-primary after:bg-accent after:opacity-100"
                          : "font-medium text-ink-sub hover:text-ink after:opacity-0"
                        : isActive
                          ? "font-bold text-white after:bg-white after:opacity-100"
                          : "font-medium text-white/90 hover:text-white after:opacity-0",
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

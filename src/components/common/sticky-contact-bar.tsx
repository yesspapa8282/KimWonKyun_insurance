"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type StickyContactBarProps = {
  /** 이 id의 요소(첫 화면 버튼)가 화면에서 벗어나면 바를 띄웁니다. */
  watchId: string;
  /** 모바일 하단 바 내용 (서버 컴포넌트로 전달) */
  bar: React.ReactNode;
  /** PC 플로팅 버튼 내용 */
  floating: React.ReactNode;
};

export function StickyContactBar({ watchId, bar, floating }: StickyContactBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <>
      <div
        aria-hidden={!visible}
        inert={!visible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-white/60 bg-white/85 shadow-[0_-4px_20px_-8px_rgba(30,27,46,0.25)] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden",
          "pb-[env(safe-area-inset-bottom)]",
          visible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mx-auto flex h-[var(--bar-h)] max-w-[960px] items-center gap-2 px-3">
          {bar}
        </div>
      </div>
      <div
        aria-hidden={!visible}
        inert={!visible}
        className={cn(
          "fixed bottom-6 right-6 z-30 hidden transition-[opacity,transform] duration-300 motion-reduce:transition-none lg:block",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {floating}
      </div>
    </>
  );
}

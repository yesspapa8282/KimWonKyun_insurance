"use client";

import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";

type ShareButtonProps = {
  label: string;
  copiedMessage: string;
  title: string;
  text: string;
};

export function ShareButton({ label, copiedMessage, title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    const url = window.location.href.split("#")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(label, url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex min-h-12 items-center gap-2 rounded-lg px-3 text-[15px] font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
      >
        <Share2 aria-hidden="true" className="size-4" />
        {label}
      </button>
      <span role="status" aria-live="polite" className="min-h-5 text-sm text-white/90">
        {copied ? copiedMessage : ""}
      </span>
    </div>
  );
}

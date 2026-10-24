import Link from "next/link";
import { Home } from "lucide-react";

import { KakaoButton } from "@/components/common/contact-buttons";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-grad-hero px-5 py-16 text-white">
      <div className="w-full max-w-[420px] text-center">
        <p className="text-[15px] font-medium text-white/80">
          {site.person.name} {site.person.title}
        </p>
        <h1 className="mt-2 text-[26px] font-bold leading-snug">{site.notFound.title}</h1>
        <p className="mt-3 text-white/85">{site.notFound.body}</p>
        <div className="mt-8 flex flex-col gap-2.5">
          <KakaoButton />
          <Link href="/" className={cn(buttonVariants({ variant: "ghostLight", size: "md" }), "w-full")}>
            <Home aria-hidden="true" />
            {site.notFound.home}
          </Link>
        </div>
      </div>
    </main>
  );
}

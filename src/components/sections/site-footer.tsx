import { site } from "@/config/site";

export function SiteFooter() {
  const { person, legal } = site;
  return (
    <footer className="bg-deep text-[13px] leading-relaxed text-white/70 pb-bar lg:pb-0">
      <div className="mx-auto max-w-[960px] px-5 pt-8 sm:px-8 lg:pb-10">
        <p className="font-semibold text-white/80">
          {person.name} {person.title} · {person.organization}
        </p>
        <p className="mt-1.5">{legal.disclaimer}</p>
        {legal.reviewNo && (
          <p className="mt-1.5">
            {legal.reviewLabel}: {legal.reviewNo}
          </p>
        )}
      </div>
    </footer>
  );
}

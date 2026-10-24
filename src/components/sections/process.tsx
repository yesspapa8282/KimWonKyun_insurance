import { KakaoButton } from "@/components/common/contact-buttons";
import { Reveal } from "@/components/common/reveal";
import { SectionShell } from "@/components/common/section-shell";
import { site } from "@/config/site";

export function Process() {
  const { process } = site;
  return (
    <SectionShell id="process" labelledBy="process-title" className="bg-white">
      <Reveal>
        <h2 id="process-title" className="text-[24px] font-bold leading-snug tracking-tight lg:text-[30px]">
          {process.title}
        </h2>
      </Reveal>

      <ol className="mt-8 lg:grid lg:grid-cols-3 lg:gap-6">
        {process.steps.map((step, i) => {
          const last = i === process.steps.length - 1;
          return (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:pb-0">
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute left-[21px] top-12 bottom-1 w-0.5 bg-gradient-to-b from-violet-300 to-pink-200 lg:left-14 lg:right-[-1.5rem] lg:top-[21px] lg:bottom-auto lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
                />
              )}
              <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-grad-button text-lg font-bold text-white shadow-md">
                {i + 1}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <h3 className="text-[18px] font-bold leading-snug">{step.title}</h3>
                <p className="mt-1 text-ink-sub">{step.description}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>

      <Reveal delay={0.3} className="mt-10 rounded-2xl bg-grad-soft p-5 sm:p-6 lg:flex lg:items-center lg:justify-between lg:gap-6">
        <p className="text-[17px] font-semibold text-ink">{process.closing}</p>
        <KakaoButton label={process.cta} size="md" className="mt-4 lg:mt-0 lg:w-auto lg:px-8" />
      </Reveal>
    </SectionShell>
  );
}

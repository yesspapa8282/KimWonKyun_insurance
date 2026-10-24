import {
  Briefcase,
  FileCheck2,
  HeartPulse,
  Landmark,
  PiggyBank,
  SearchCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionShell } from "@/components/common/section-shell";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { site, type IconKey } from "@/config/site";
import { cn } from "@/lib/utils";

const ICONS: Record<IconKey, LucideIcon> = {
  search: SearchCheck,
  heart: HeartPulse,
  family: Users,
  file: FileCheck2,
  piggy: PiggyBank,
  landmark: Landmark,
  briefcase: Briefcase,
};

export function Services() {
  const { services } = site;
  const featured = services.items.filter((s) => s.featured);
  const rest = services.items.filter((s) => !s.featured);

  return (
    <SectionShell id="services" labelledBy="services-title" className="bg-soft">
      <Reveal>
        <h2 id="services-title" className="text-[24px] font-bold leading-snug tracking-tight lg:text-[30px]">
          {services.title}
        </h2>
      </Reveal>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {featured.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal as="li" key={item.title} className="col-span-2 lg:col-span-3">
              <Card className="flex h-full items-start gap-4 border-violet-200 bg-grad-soft p-5 sm:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-grad-button text-white shadow-md">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <CardTitle className="text-[19px] lg:text-[21px]">{item.title}</CardTitle>
                  <CardDescription className="mt-1">{item.description}</CardDescription>
                </div>
              </Card>
            </Reveal>
          );
        })}
        {rest.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.06}>
              <Card className={cn("flex h-full flex-col p-4 sm:p-5")}>
                <span className="flex size-10 items-center justify-center rounded-lg bg-violet-100 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <CardTitle className="mt-3 text-[16px] sm:text-[17px]">{item.title}</CardTitle>
                <CardDescription className="mt-1 text-[15px] sm:text-base">{item.description}</CardDescription>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </SectionShell>
  );
}

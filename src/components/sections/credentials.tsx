import { ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { SectionShell } from "@/components/common/section-shell";
import { Badge } from "@/components/ui/badge";
import { site } from "@/config/site";

export function Credentials() {
  const { credentials, person } = site;
  return (
    <SectionShell id="about" labelledBy="about-title" className="bg-soft" innerClassName="pt-10 lg:pt-16">
      <Reveal>
        <p className="text-[15px] font-semibold text-primary">
          {person.name} {person.title}
        </p>
        <h2 id="about-title" className="mt-2 text-[24px] font-bold leading-snug tracking-tight lg:text-[30px]">
          {credentials.title}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {credentials.badges.map((badge) => (
            <li key={badge}>
              <Badge>
                <ShieldCheck aria-hidden="true" />
                {badge}
              </Badge>
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionShell>
  );
}

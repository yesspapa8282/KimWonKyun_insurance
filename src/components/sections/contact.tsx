import { Clock, MapPin } from "lucide-react";

import { ContactButtons } from "@/components/common/contact-buttons";
import { Reveal } from "@/components/common/reveal";
import { ShareButton } from "@/components/common/share-button";
import { site } from "@/config/site";

export function Contact() {
  const { contactSection, contact, labels, share, seo } = site;
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-target relative isolate overflow-hidden bg-grad-hero text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-16 size-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 size-80 rounded-full bg-violet-400/20 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-[640px] px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <h2 id="contact-title" className="text-[26px] font-bold leading-snug tracking-tight lg:text-[32px]">
            {contactSection.title}
          </h2>
          <p className="mt-3 text-white/90">{contactSection.body}</p>

          {(contact.hours || contact.area) && (
            <dl className="mt-5 space-y-1.5 text-[16px] text-white/90">
              {contact.hours && (
                <div className="flex items-center gap-2">
                  <Clock aria-hidden="true" className="size-4 shrink-0" />
                  <dt className="font-semibold">{labels.hoursLabel}</dt>
                  <dd>{contact.hours}</dd>
                </div>
              )}
              {contact.area && (
                <div className="flex items-center gap-2">
                  <MapPin aria-hidden="true" className="size-4 shrink-0" />
                  <dt className="font-semibold">{labels.areaLabel}</dt>
                  <dd>{contact.area}</dd>
                </div>
              )}
            </dl>
          )}

          <ContactButtons layout="contact" className="mt-8" />
        </Reveal>

        {share.enabled && (
          <div className="mt-8">
            <ShareButton
              label={share.label}
              copiedMessage={share.copied}
              title={seo.title}
              text={seo.description}
            />
          </div>
        )}
      </div>
    </section>
  );
}

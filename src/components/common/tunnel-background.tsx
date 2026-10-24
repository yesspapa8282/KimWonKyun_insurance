import { LazyTunnel } from "@/components/common/lazy-tunnel";
import type { TunnelItem } from "@/components/ui/perspective-tunnel-hero";
import { site } from "@/config/site";

type TunnelBackgroundProps = {
  placement: "hero" | "contact";
  className?: string;
};

/** site.ts 의 motion 설정에 따라 터널 배경을 그립니다. 꺼져 있으면 아무것도 그리지 않습니다. */
export function TunnelBackground({ placement, className }: TunnelBackgroundProps) {
  const { motion, services } = site;
  if (!motion.enabled || !motion[placement]) return null;

  const items: TunnelItem[] =
    motion.photos.length > 0
      ? motion.photos.map((src, i) => ({
          src,
          title: services.items[i % services.items.length].title,
        }))
      : services.items.map(({ title, icon }) => ({ title, icon }));

  return (
    <LazyTunnel
      items={items}
      loopSeconds={motion.loopSeconds}
      opacity={motion.opacity}
      className={className}
    />
  );
}

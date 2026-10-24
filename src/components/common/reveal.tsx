"use client";

import * as m from "motion/react-m";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 순서대로 어긋나게 등장시킬 때의 지연(초) */
  delay?: number;
  as?: "div" | "li";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </Comp>
  );
}

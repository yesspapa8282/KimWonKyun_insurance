import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        kakao:
          "bg-kakao text-kakao-ink hover:bg-kakao-pressed active:bg-kakao-pressed shadow-[0_6px_20px_-6px_rgba(254,229,0,0.55)]",
        outline:
          "bg-white text-primary border-2 border-primary hover:bg-violet-50 active:bg-violet-100",
        primary:
          "bg-primary text-white hover:bg-primary-strong active:bg-primary-strong",
        ghostLight:
          "bg-white/10 text-white border border-white/40 hover:bg-white/20 active:bg-white/25",
        link: "text-current underline-offset-4 hover:underline",
      },
      size: {
        lg: "h-14 rounded-2xl px-5 text-[17px] [&_svg]:size-5",
        md: "h-[52px] rounded-[14px] px-4 text-base [&_svg]:size-5",
        sm: "h-12 rounded-xl px-3 text-[15px] [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

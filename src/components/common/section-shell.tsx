import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: React.ReactNode;
};

export function SectionShell({
  id,
  className,
  innerClassName,
  labelledBy,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-target relative", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[960px] px-5 py-16 sm:px-8 lg:py-24",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

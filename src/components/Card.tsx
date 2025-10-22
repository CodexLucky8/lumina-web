import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = PropsWithChildren<{
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
}>;

export function Card({ className, title, description, children }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-brand-charcoal/10 bg-white/90 p-6 shadow-sm backdrop-blur",
        className
      )}
    >
      {(title || description) && (
        <header className="mb-4 space-y-2">
          {title && <h2 className="text-xl font-semibold text-brand-charcoal">{title}</h2>}
          {description && (
            <p className="text-sm text-brand-charcoal/70">{description}</p>
          )}
        </header>
      )}
      <div className="space-y-4 text-sm text-brand-charcoal/90">{children}</div>
    </section>
  );
}

import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type BaseButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
};

type ButtonProps = BaseButtonProps &
  PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-charcoal text-white hover:bg-opacity-90 focus-visible:ring-brand-sunshine focus-visible:ring-offset-brand-background",
  secondary:
    "bg-brand-sunshine text-brand-charcoal hover:bg-yellow-200 focus-visible:ring-brand-charcoal focus-visible:ring-offset-brand-background",
  ghost:
    "bg-transparent text-brand-charcoal hover:bg-brand-sunshine/40 focus-visible:ring-brand-charcoal focus-visible:ring-offset-brand-background"
};

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

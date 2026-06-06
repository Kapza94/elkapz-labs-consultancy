import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
  showArrow?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-ink hover:bg-accent-strong hover:border-accent-strong",
  secondary:
    "border-line bg-surface/60 text-foreground hover:border-line-strong hover:bg-surface-raised",
  quiet: "border-transparent text-foreground hover:bg-white/6",
};

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  showArrow = false,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {showArrow ? <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /> : null}
    </a>
  );
}

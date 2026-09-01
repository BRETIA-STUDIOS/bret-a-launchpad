import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const brandButtonVariants = cva(
  /*
   * `transition` invece di `transition-all`: la lista breve copre colore,
   * ombra, filtro e trasformazioni senza mettersi in mezzo a proprietà di
   * layout che nessuno intende animare.
   *
   * `active:` non c'era: su desktop il pulsante rispondeva al passaggio del
   * mouse, ma al tocco — dove l'hover non esiste — premere non produceva
   * alcun segnale finché la pagina non cambiava.
   */
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-display text-sm font-medium tracking-[0.06em] transition duration-[var(--transition-base)] active:scale-[0.98] active:duration-75 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary px-7 text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95",
        secondary:
          "border border-border-interactive bg-transparent px-7 text-foreground hover:-translate-y-0.5 hover:border-primary hover:bg-surface active:translate-y-0 active:bg-surface-2",
        ghost: "px-3 text-muted-foreground hover:text-foreground active:text-foreground/70",
      },
      size: {
        md: "min-h-11 text-sm",
        lg: "min-h-13 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = VariantProps<typeof brandButtonVariants> & {
  children: ReactNode;
  className?: string;
  to?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  /** Blocca il bottone: usato per impedire il doppio invio durante una richiesta. */
  disabled?: boolean;
  /** Segnala agli screen reader che un'operazione è in corso. */
  "aria-busy"?: boolean;
  "aria-describedby"?: string;
  "aria-label"?: string;
};

export function BrandButton({
  children,
  className,
  variant,
  size,
  to,
  href,
  type = "button",
  onClick,
  disabled,
  "aria-busy": ariaBusy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
}: Props) {
  const classes = cn(brandButtonVariants({ variant, size }), className);

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-busy={ariaBusy}
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

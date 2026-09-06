import type { ButtonHTMLAttributes } from "react";
import { ArrowUpRight } from "lucide-react";

export function Button({
  children,
  className = "",
  showArrow = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { showArrow?: boolean }) {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
      {showArrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </button>
  );
}

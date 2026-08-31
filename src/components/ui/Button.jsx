import React from "react";
import { cn } from "../../utils/cn";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none whitespace-nowrap";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary-hover",
    secondary: "bg-brand-secondary text-white hover:bg-brand-secondary-hover",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[40px] sm:min-h-[44px]",
    md: "px-4 py-2.5 text-base min-h-[44px]",
    lg: "px-6 py-3.5 text-lg min-h-[52px]",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
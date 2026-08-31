import React from "react";
import { cn } from "../../utils/cn";

export const Badge = ({
  children,
  variant = "success",
  className,
  ...props
}) => {
  const variants = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    primary: "bg-indigo-50 text-brand-primary border-indigo-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold border transition-colors shrink-0 whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
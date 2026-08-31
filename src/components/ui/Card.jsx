import React from "react";
import { cn } from "../../utils/cn";

export const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-200 min-w-0 break-words",
        hover && "hover:shadow-md hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
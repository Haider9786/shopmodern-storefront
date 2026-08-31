import React from "react";
import { cn } from "../../utils/cn";

export const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0", className)}
      {...props}
    >
      {children}
    </div>
  );
};
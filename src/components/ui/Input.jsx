import React from "react";
import { cn } from "../../utils/cn";

export const Input = React.forwardRef(
  ({ className, icon: Icon, error, ...props }, ref) => {
    return (
      <div className="w-full min-w-0">
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-brand-on-surface placeholder-gray-400 outline-none transition-colors min-h-[44px]",
              "focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary",
              Icon && "pl-10 sm:pl-11",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs sm:text-sm text-red-500 break-words">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
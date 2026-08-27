import React, { useEffect, useRef, useState, useCallback } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import gsap from "gsap";

const tooltipVariants = cva(
  "absolute z-50 rounded-md px-3 py-2 text-sm font-medium shadow-md pointer-events-none transition-all duration-200 whitespace-nowrap",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 border border-gray-200",
        dark: "bg-slate-900 text-white border border-slate-700",
        outline:
          "bg-transparent border border-gray-400 text-gray-800 backdrop-blur-md",
      },
      side: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      side: "top",
    },
  }
);

interface TooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  asChild?: boolean;
  content: React.ReactNode;
  delayDuration?: number;
  animation?: keyof typeof entranceAnimations;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      asChild = false,
      content,
      variant = "dark",
      side = "top",
      delayDuration = 300,
      animation = "fadeIn",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = useCallback(() => {
      timerRef.current = setTimeout(() => {
        setVisible(true);
      }, delayDuration);
    }, [delayDuration]);

    const hideTooltip = useCallback(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
    }, []);

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    useEffect(() => {
      if (visible && tooltipRef.current && animation !== "none") {
        entranceAnimations[animation]?.(tooltipRef.current);
      }
    }, [visible, animation]);

    return (
      <Comp
        ref={(node) => {
          triggerRef.current = node as HTMLDivElement;
          if (typeof ref === "function") ref(node as HTMLDivElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn("relative inline-block", className)}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        {children}

        {visible && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(tooltipVariants({ variant, side }))}
          >
            {content}
            <div
              className={cn(
                "absolute w-2 h-2 rotate-45",
                variant === "dark"
                  ? "bg-slate-900 border-slate-700"
                  : variant === "light"
                  ? "bg-white border-gray-200"
                  : "bg-transparent border-gray-400",
                side === "top" &&
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-r border-b",
                side === "bottom" &&
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l border-t",
                side === "left" &&
                  "right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-l border-b",
                side === "right" &&
                  "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-r border-t"
              )}
            />
          </div>
        )}
      </Comp>
    );
  }
);

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };

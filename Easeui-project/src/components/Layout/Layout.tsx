import React, { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";
import gsap from "gsap";

const layoutVariants = cva(
  "min-h-screen w-full transition-all duration-300",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800",
        dark: "bg-slate-900 text-white",
        outline: "bg-transparent border border-gray-300",
      },
      spacing: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "light",
      spacing: "md",
    },
  }
);

const headerVariants = cva(
  "w-full flex items-center justify-between px-6 py-4 border-b transition-all duration-300",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 border-gray-200",
        dark: "bg-slate-900 text-white border-slate-700",
        outline: "bg-transparent text-gray-800 border-gray-300",
      },
      position: {
        static: "relative",
        sticky: "sticky top-0 z-10",
        fixed: "fixed top-0 left-0 right-0 z-10",
      },
    },
    defaultVariants: {
      variant: "light",
      position: "static",
    },
  }
);

const sidebarVariants = cva(
  "flex flex-col border-r transition-all duration-300 overflow-y-auto",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 border-gray-200",
        dark: "bg-slate-900 text-white border-slate-700",
        outline: "bg-transparent text-gray-800 border-gray-300",
      },
      width: {
        sm: "w-48",
        md: "w-64",
        lg: "w-72",
      },
      position: {
        static: "relative",
        sticky: "sticky top-0 h-screen",
        fixed: "fixed top-0 left-0 h-full z-20",
      },
    },
    defaultVariants: {
      variant: "light",
      width: "md",
      position: "static",
    },
  }
);

const contentVariants = cva(
  "flex-1 transition-all duration-300",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "md",
    },
  }
);

const footerVariants = cva(
  "w-full px-6 py-4 border-t transition-all duration-300",
  {
    variants: {
      variant: {
        light: "bg-white text-gray-800 border-gray-200",
        dark: "bg-slate-900 text-white border-slate-700",
        outline: "bg-transparent text-gray-800 border-gray-300",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

// ── Layout Root ───────────────────────────────────────────────

interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      asChild = false,
      variant,
      spacing,
      animation = "fadeIn",
      hoverAnimation = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const layoutRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const el = layoutRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    const handleMouseEnter = () => {
      const el = layoutRef.current;
      if (!el) return;
      hoverAnimations[hoverAnimation]?.(el);
    };

    const handleMouseLeave = () => {
      const el = layoutRef.current;
      if (!el) return;
      hoverAnimations.reset(el);
    };

    return (
      <Comp
        ref={(node) => {
          layoutRef.current = node as HTMLDivElement;
          if (typeof ref === "function") ref(node as HTMLDivElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(layoutVariants({ variant, spacing }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Layout.displayName = "Layout";

// ── Layout Header ─────────────────────────────────────────────

interface LayoutHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  asChild?: boolean;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const LayoutHeader = React.forwardRef<HTMLElement, LayoutHeaderProps>(
  (
    {
      asChild = false,
      variant,
      position,
      animation = "none",
      hoverAnimation = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "header";
    const headerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = headerRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    const handleMouseEnter = () => {
      hoverAnimations[hoverAnimation]?.(headerRef.current!);
    };

    const handleMouseLeave = () => {
      gsap.to(headerRef.current, {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.1,
      });
    };

    return (
      <Comp
        ref={(node) => {
          headerRef.current = node as HTMLElement;
          if (typeof ref === "function") ref(node as HTMLElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn(headerVariants({ variant, position }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

LayoutHeader.displayName = "LayoutHeader";

// ── Layout Sidebar ────────────────────────────────────────────

interface LayoutSidebarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sidebarVariants> {
  asChild?: boolean;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const LayoutSidebar = React.forwardRef<HTMLElement, LayoutSidebarProps>(
  (
    {
      asChild = false,
      variant,
      width,
      position,
      animation = "none",
      hoverAnimation = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "aside";
    const sidebarRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = sidebarRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    const handleMouseEnter = () => {
      hoverAnimations[hoverAnimation]?.(sidebarRef.current!);
    };

    const handleMouseLeave = () => {
      gsap.to(sidebarRef.current, {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.1,
      });
    };

    return (
      <Comp
        ref={(node) => {
          sidebarRef.current = node as HTMLElement;
          if (typeof ref === "function") ref(node as HTMLElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn(sidebarVariants({ variant, width, position }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

LayoutSidebar.displayName = "LayoutSidebar";

// ── Layout Content ────────────────────────────────────────────

interface LayoutContentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof contentVariants> {
  asChild?: boolean;
}

const LayoutContent = React.forwardRef<HTMLElement, LayoutContentProps>(
  ({ asChild = false, padding, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "main";

    return (
      <Comp
        ref={ref}
        className={cn(contentVariants({ padding }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

LayoutContent.displayName = "LayoutContent";

// ── Layout Footer ─────────────────────────────────────────────

interface LayoutFooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  asChild?: boolean;
}

const LayoutFooter = React.forwardRef<HTMLElement, LayoutFooterProps>(
  ({ asChild = false, variant, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "footer";

    return (
      <Comp
        ref={ref}
        className={cn(footerVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

LayoutFooter.displayName = "LayoutFooter";

export {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutContent,
  LayoutFooter,
  layoutVariants,
  headerVariants,
  sidebarVariants,
  contentVariants,
  footerVariants,
};

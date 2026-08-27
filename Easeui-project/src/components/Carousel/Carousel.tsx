import React, { useEffect, useRef, useState, useCallback } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";
import { hoverAnimations } from "@/libs/animations/hoverAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const carouselVariants = cva(
  "relative overflow-hidden rounded-lg transition-all duration-300",
  {
    variants: {
      variant: {
        light: "bg-white shadow-lg",
        dark: "bg-slate-800 shadow-md",
        outline: "border border-gray-300 bg-transparent",
      },
      size: {
        sm: "w-64 h-48",
        md: "w-full max-w-lg h-64",
        lg: "w-full max-w-2xl h-80",
        xl: "w-full max-w-4xl h-96",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  }
);

interface CarouselSlide {
  id?: number;
  image?: string;
  content?: React.ReactNode;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  asChild?: boolean;
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
  animation?: keyof typeof entranceAnimations;
  hoverAnimation?: keyof typeof hoverAnimations;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      asChild = false,
      slides,
      variant,
      size,
      autoPlay = false,
      autoPlayInterval = 3000,
      showArrows = true,
      showIndicators = true,
      loop = true,
      animation = "fadeIn",
      hoverAnimation = "none",
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const slideRef = useRef<HTMLDivElement | null>(null);

    const totalSlides = slides.length;

    const goToSlide = useCallback(
      (index: number) => {
        if (isAnimating || totalSlides === 0) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 400);
      },
      [isAnimating, totalSlides]
    );

    const goToNext = useCallback(() => {
      if (isAnimating) return;
      if (current < totalSlides - 1) {
        goToSlide(current + 1);
      } else if (loop) {
        goToSlide(0);
      }
    }, [current, totalSlides, loop, isAnimating, goToSlide]);

    const goToPrev = useCallback(() => {
      if (isAnimating) return;
      if (current > 0) {
        goToSlide(current - 1);
      } else if (loop) {
        goToSlide(totalSlides - 1);
      }
    }, [current, totalSlides, loop, isAnimating, goToSlide]);

    useEffect(() => {
      if (!autoPlay || totalSlides <= 1) return;
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, goToNext, totalSlides]);

    useEffect(() => {
      if (slideRef.current) {
        gsap.fromTo(
          slideRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    }, [current]);

    useEffect(() => {
      const el = carouselRef.current;
      if (!el || animation === "none") return;
      entranceAnimations[animation]?.(el);
    }, [animation]);

    const handleMouseEnter = () => {
      const el = carouselRef.current;
      if (!el) return;
      hoverAnimations[hoverAnimation]?.(el);
    };

    const handleMouseLeave = () => {
      const el = carouselRef.current;
      if (!el) return;
      hoverAnimations.reset(el);
    };

    if (totalSlides === 0) return null;

    return (
      <Comp
        ref={(node) => {
          carouselRef.current = node as HTMLDivElement;
          if (typeof ref === "function") ref(node as HTMLDivElement);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(carouselVariants({ variant, size }), className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        {...props}
      >
        {/* Slide area */}
        <div
          ref={slideRef}
          className="w-full h-full flex items-center justify-center overflow-hidden"
          aria-live="polite"
        >
          {slides[current].image ? (
            <img
              src={slides[current].image}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover"
            />
          ) : slides[current].content ? (
            <div className="w-full h-full flex items-center justify-center p-6">
              {slides[current].content}
            </div>
          ) : null}
        </div>

        {/* Navigation arrows */}
        {showArrows && totalSlides > 1 && (
          <>
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all duration-200",
                "cursor-pointer"
              )}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next slide"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 z-10",
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-white/80 hover:bg-white text-gray-800 shadow-md transition-all duration-200",
                "cursor-pointer"
              )}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && totalSlides > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer",
                  index === current
                    ? "bg-white shadow-md scale-110"
                    : "bg-white/50 hover:bg-white/75"
                )}
              />
            ))}
          </div>
        )}
      </Comp>
    );
  }
);

Carousel.displayName = "Carousel";
export { Carousel, carouselVariants };

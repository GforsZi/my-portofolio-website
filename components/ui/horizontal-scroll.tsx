"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type HorizontalScrollDirection = "left" | "right";

export interface HorizontalScrollProps {
  children:
    | ReactNode
    | ((direction: HorizontalScrollDirection) => ReactNode);
  direction?: HorizontalScrollDirection;
  heading?: ReactNode;
  headingClassName?: string;
  id?: string;
  showIntro?: boolean;
  className?: string;
}

function useElementViewportPosition(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element) return;

      const pageHeight = document.body.scrollHeight;
      const start = element.offsetTop;
      const end = start + element.offsetHeight;

      setPosition([start / pageHeight, end / pageHeight]);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return { position };
}

function throttle<A extends unknown[]>(fn: (...args: A) => void, wait: number) {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: A) => {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      lastTime = now;
      fn(...args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn(...args);
      }, remaining);
    }
  };
}

export default function HorizontalScroll({
  children,
  direction = "left",
  heading,
  headingClassName,
  id,
  showIntro = true,
  className,
}: HorizontalScrollProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { position } = useElementViewportPosition(mainRef);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll();
  const x = useTransform(
    scrollYProgress,
    position,
    direction === "right" ? [-distance, 0] : [0, -distance]
  );

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const parent = carousel.parentElement;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const resetDistance = () => {
      if (!carouselRef.current) return;
      setDistance(
        carouselRef.current.clientWidth -
          window.innerWidth +
          scrollbarWidth +
          ((parent as HTMLElement | null)?.offsetLeft ?? 0) * 2
      );
    };

    resetDistance();
    const handleResize = throttle(resetDistance, 10);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [direction]);

  const content =
    typeof children === "function" ? children(direction) : children;

  return (
    <div id={id} ref={mainRef} className={cn("relative h-[400vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-24">
        <motion.div
          ref={carouselRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-6 sm:gap-10 sm:px-10"
        >
          {showIntro && direction === "left" && (
            <div className="h-screen w-screen shrink-0" />
          )}

          {Children.map(content, (child) => (
            <div className="shrink-0">{child}</div>
          ))}

          {showIntro && direction === "right" && (
            <div className="h-screen w-screen shrink-0" />
          )}
        </motion.div>

        {heading && (
          <div className="pointer-events-none absolute top-17 left-0 right-0 z-10 flex items-center justify-center gap-3">
            <h2
              className={cn(
                "bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl font-semibold leading-[100%] tracking-tighter text-transparent sm:text-7xl",
                headingClassName
              )}
            >
              {heading}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

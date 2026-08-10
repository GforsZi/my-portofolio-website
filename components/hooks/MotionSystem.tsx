"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function createSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.35,
    lerp: 0.075,
    smoothWheel: true,
    wheelMultiplier: 0.86,
    prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
  });
  const updateLenis = (time: number) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(updateLenis);
  gsap.ticker.lagSmoothing(0);
  return { lenis, updateLenis };
}

function animateFooter() {
  gsap.fromTo(
    "[data-footer-link]",
    { autoAlpha: 0, y: 34 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: {
        trigger: ".site-footer",
        start: "top 78%",
        once: true,
      },
    }
  );
  gsap.fromTo(
    "[data-footer-email]",
    { autoAlpha: 0, yPercent: 44, filter: "blur(12px)" },
    {
      autoAlpha: 1,
      yPercent: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "[data-footer-email]",
        start: "top 94%",
        once: true,
      },
    }
  );
}

let lenisInstance: Lenis | null = null;
let updateLenisFn: ((time: number) => void) | null = null;

export function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (lenisInstance) return;

    const { lenis, updateLenis } = createSmoothScroll();
    lenisInstance = lenis;
    updateLenisFn = updateLenis;

    return () => {
      if (updateLenisFn) gsap.ticker.remove(updateLenisFn);
      lenisInstance?.destroy();
      lenisInstance = null;
      updateLenisFn = null;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeout = setTimeout(() => {
      lenisInstance?.resize();
      ScrollTrigger.refresh();
    }, 150);

    const context = gsap.context(animateFooter);

    return () => {
      clearTimeout(timeout);
      context.revert();
    };
  }, [pathname]);

  return null;
}

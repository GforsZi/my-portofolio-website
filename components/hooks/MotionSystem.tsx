"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function MotionSystem() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.35,
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.86,
      prevent: (node) => node.closest("[data-lenis-prevent]") !== null
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      // gsap.fromTo(
      //   "[data-animate='hero-line']",
      //   {
      //     autoAlpha: 0,
      //     y: 96,
      //     rotate: -2,
      //     filter: "blur(10px)"
      //   },
      //   {
      //     autoAlpha: 1,
      //     y: 0,
      //     rotate: 0,
      //     filter: "blur(0px)",
      //     duration: 1.2,
      //     ease: "expo.out",
      //     stagger: 0.12
      //   }
      // );
      //
      // gsap.fromTo(
      //   "[data-animate='fade-up']",
      //   {
      //     autoAlpha: 0,
      //     y: 36
      //   },
      //   {
      //     autoAlpha: 1,
      //     y: 0,
      //     duration: 0.9,
      //     delay: 0.16,
      //     ease: "power3.out",
      //     stagger: 0.08
      //   }
      // );

      gsap.fromTo(
        "[data-footer-link]",
        {
          autoAlpha: 0,
          y: 34
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".site-footer",
            start: "top 78%",
            once: true
          }
        }
      );

      gsap.fromTo(
        "[data-footer-email]",
        {
          autoAlpha: 0,
          yPercent: 44,
          filter: "blur(12px)"
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: "[data-footer-email]",
            start: "top 94%",
            once: true
          }
        }
      );

      // gsap.utils
      //   .toArray<HTMLElement>("[data-archive-row], [data-detail-row]")
      //   .forEach((row) => {
      //     gsap.fromTo(
      //       row,
      //       {
      //         autoAlpha: 0,
      //         y: 32
      //       },
      //       {
      //         autoAlpha: 1,
      //         y: 0,
      //         duration: 0.85,
      //         ease: "power3.out",
      //         scrollTrigger: {
      //           trigger: row,
      //           start: "top 92%",
      //           once: true
      //         }
      //       }
      //     );
      //   });

      // gsap.utils.toArray<HTMLElement>("[data-case-heading]").forEach((heading) => {
      //   gsap.fromTo(
      //     heading,
      //     {
      //       autoAlpha: 0,
      //       y: 42,
      //       clipPath: "inset(0 0 100% 0)"
      //     },
      //     {
      //       autoAlpha: 1,
      //       y: 0,
      //       clipPath: "inset(0 0 0% 0)",
      //       duration: 1,
      //       ease: "expo.out",
      //       scrollTrigger: {
      //         trigger: heading,
      //         start: "top 88%",
      //         once: true
      //       }
      //     }
      //   );
      // });

      // gsap.utils
      //   .toArray<HTMLElement>(
      //     "[data-case-reveal]:not([data-methodology-step]):not([data-solution-card]):not([data-impact-card])"
      //   )
      //   .forEach((element) => {
      //     gsap.fromTo(
      //       element,
      //       {
      //         autoAlpha: 0,
      //         y: 76,
      //         clipPath: "inset(18% 0 0 0)"
      //       },
      //       {
      //         autoAlpha: 1,
      //         y: 0,
      //         clipPath: "inset(0% 0 0 0)",
      //         duration: 1.15,
      //         ease: "expo.out",
      //         scrollTrigger: {
      //           trigger: element,
      //           start: "top 86%",
      //           once: true
      //         }
      //       }
      //     );
      //   });

      // gsap.utils
      //   .toArray<HTMLElement>(
      //     "[data-methodology-step], [data-solution-card], [data-impact-card]"
      //   )
      //   .forEach((card) => {
      //     gsap.fromTo(
      //       card,
      //       {
      //         autoAlpha: 0,
      //         y: 70,
      //         scale: 0.985,
      //         clipPath: "inset(10% 0 0 0)"
      //       },
      //       {
      //         autoAlpha: 1,
      //         y: 0,
      //         scale: 1,
      //         clipPath: "inset(0% 0 0 0)",
      //         duration: 1.05,
      //         ease: "expo.out",
      //         scrollTrigger: {
      //           trigger: card,
      //           start: "top 88%",
      //           once: true
      //         }
      //       }
      //     );
      //   });

      // gsap.utils.toArray<HTMLElement>("[data-progress-bar]").forEach((bar) => {
      //   gsap.fromTo(
      //     bar,
      //     {
      //       scaleX: 0,
      //       transformOrigin: "left center"
      //     },
      //     {
      //       scaleX: 1,
      //       duration: 1.2,
      //       ease: "expo.out",
      //       scrollTrigger: {
      //         trigger: bar,
      //         start: "top 92%",
      //         once: true
      //       }
      //     }
      //   );
      // });
    });

    return () => {
      context.revert();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return null;
}

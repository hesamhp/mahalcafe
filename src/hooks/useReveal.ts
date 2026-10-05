import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/site";

/**
 * Reveals all `[data-reveal]` children of the attached container
 * with a soft rise when they enter the viewport.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const ctx = gsap.context(() => {
      const els = Array.from(scope.querySelectorAll<HTMLElement>("[data-reveal]"));
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: parseFloat(el.dataset.delay ?? "0"),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return ref;
}

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  gsap.defaults({ ease: "power3.out" });
}

/* ---- smooth scroll singleton ---- */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const scrollToId = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
};
export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0, { duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ---- persian digits ---- */
const FA = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (n: number | string) =>
  String(n).replace(/\d/g, (d) => FA[+d]);
export const padFa = (n: number) => toFa(String(n).padStart(2, "0"));

export { gsap, ScrollTrigger };

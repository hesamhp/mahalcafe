import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, setLenis } from "../lib/site";
import { useReveal } from "../hooks/useReveal";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import MenuSection from "../components/MenuSection";
import Visit from "../components/Visit";
import Footer from "../components/Footer";

/** Specialty highlight between hero & about */
function Specialty() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-paper/10 bg-ink py-20 text-paper sm:py-28"
    >
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[70vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(245,245,243,0.07),transparent)] blur-2xl"
        aria-hidden
      />
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 sm:px-10 lg:grid-cols-2">
        <div data-reveal>
          <span className="mb-6 inline-block rounded-full border border-paper/25 px-4 py-1.5 text-xs tracking-[0.25em]">
            ( رستِ هفتگی )
          </span>
          <h2 className="text-4xl font-black leading-[1.25] sm:text-6xl">
            دانه‌ای که این‌جا رست می‌شه،
            <br />
            <span className="text-outline-paper">جای دیگه پیدا نمی‌شه.</span>
          </h2>
          <p className="mt-7 max-w-md text-base leading-[2.1] text-paper/60">
            آخر هر هفته دانه‌های سبزِ تازه رو همین‌جا، تو مغازه، رست می‌کنیم. از
            روستِ شمال تا نبشِ سالخورده — بویِ قهوه از صبحِ دوشنبه سر به هوااس.
          </p>
        </div>

        <div data-reveal data-delay="0.1" className="relative">
          <div className="group relative overflow-hidden rounded-[32px] border border-paper/20 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)]">
            <img
              src="/images/beans.jpg"
              alt="دانه‌های تازه‌رستِ کافه محل"
              className="img-bw h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[420px]"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-6">
              <span className="text-sm font-bold">رستوکِ همین هفته</span>
              <span className="font-eng text-xs tracking-widest opacity-60" dir="ltr">
                FRESH BATCH
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Props = { loaded: boolean; goMenu: () => void };

export default function HomePage({ loaded, goMenu }: Props) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <Navbar context="home" onMenu={goMenu} />
      <main>
        <Hero loaded={loaded} onMenu={goMenu} />
        <Specialty />
        <About />
        <MenuSection onPage={goMenu} />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

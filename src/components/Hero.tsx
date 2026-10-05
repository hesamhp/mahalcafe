import { useLayoutEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, MapPin } from "lucide-react";
import { gsap, scrollToId } from "../lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const item = {
  hidden: { y: 70, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.05, ease: EASE } },
};

const MAPS_URL = "https://maps.app.goo.gl/eqm1La3iYQReoQBT8";

type Props = { loaded: boolean; onMenu?: () => void };

export default function Hero({ loaded, onMenu }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useLayoutEffect(() => {
    const el = ghostRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.8 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-paper"
    >
      {/* ghost latin word */}
      <div
        ref={ghostRef}
        aria-hidden
        className="text-outline-paper-soft font-eng pointer-events-none absolute -bottom-[4vw] left-0 select-none whitespace-nowrap text-[24vw] font-bold leading-none tracking-tighter"
      >
        MAHALL — MAHALL — MAHALL
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={loaded ? "show" : "hidden"}
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-10 pt-28 sm:px-10"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* --- text column --- */}
          <div className="relative z-20 lg:col-span-7">
            <motion.div variants={item} className="mb-8 flex items-center gap-4">
              <span className="h-px w-16 bg-paper/40" />
              <span className="text-shimmer rounded-full border border-paper/25 px-4 py-1.5 text-xs font-medium tracking-[0.15em] sm:text-sm">
                کافهٔ محلهٔ تو — از ۱۴۰۵
              </span>
            </motion.div>

            <div className="overflow-hidden lg:-me-40">
              <motion.h1
                variants={{
                  hidden: { y: "110%" },
                  show: { y: 0, transition: { duration: 1.2, ease: EASE } },
                }}
                className="relative z-20 pb-[0.14em] -mb-[0.14em] text-[clamp(8rem,24vw,23rem)] font-black leading-[0.92] tracking-tight mix-blend-difference"
              >
                محل
              </motion.h1>
            </div>

            <motion.p
              variants={item}
              className="relative z-20 mt-8 max-w-md text-base leading-[2] text-paper/80 mix-blend-difference sm:text-lg"
            >
              قهوهٔ تازه‌رست، موسیقیِ آروم و یه میزِ همیشه‌آماده —
              <span className="font-extrabold text-paper"> محل</span>، گوشهٔ ساکتِ محلهٔ توئه
              توِ دلِ ساری.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                data-hover
                onClick={() => onMenu?.()}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-paper px-8 py-4 text-sm font-bold text-ink transition-all duration-300 hover:gap-5 sm:w-auto"
              >
                منوی کامل
                <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
              <a
                data-hover
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-2xl border border-paper/25 px-8 py-4 text-center text-sm font-medium transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:w-auto"
              >
                محل دقیق کجاست؟
              </a>
            </motion.div>
          </div>

          {/* --- image column --- */}
          <div className="relative lg:col-span-5 lg:-ms-32">
            <motion.div variants={item} className="relative mx-auto max-w-[340px] sm:max-w-[400px] lg:max-w-none">
              <motion.div
                style={{ y: ringY }}
                className="pointer-events-none absolute -inset-10 opacity-60"
                aria-hidden
              >
                <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" style={{ ["--speed" as never]: "22s" }}>
                  <defs>
                    <path id="ring" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                  </defs>
                  <text className="fill-paper" style={{ fontFamily: "Space Grotesk", fontSize: 4.6, letterSpacing: 1.6 }}>
                    <textPath href="#ring">MAHALL CAFE • FRESH ROAST WEEKLY • SARI • EST. 1405 •</textPath>
                  </text>
                </svg>
              </motion.div>

              <motion.div style={{ y: imgY }} className="relative">
                <div className="relative aspect-square overflow-hidden rounded-[40px] border border-paper/25 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:rounded-[52px]">
                  <img
                    src="/images/hero.jpg"
                    alt="فنجان اسپرسوی کافه محل"
                    className="img-bw h-full w-full scale-105 object-cover object-center"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-2 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-ink bg-paper text-center text-ink sm:h-28 sm:w-28"
                >
                  <span className="text-xl font-black leading-none sm:text-2xl">۱۴۰۵</span>
                  <span className="mt-1 text-[10px] leading-tight opacity-70">
                    جایی که همه‌چیز
                    <br />
                    شروع شد
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- bottom info bar --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 border-t border-paper/15"
      >
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-center gap-4 px-5 py-5 text-xs sm:px-10 sm:text-sm md:grid-cols-3">
          <div className="flex items-center gap-3">
            <button
              data-hover
              onClick={() => scrollToId("#about")}
              aria-label="بیشتر بدانید"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowDown size={17} className="animate-bob" />
            </button>
            <span className="hidden opacity-60 sm:inline">اسکرول کن، ببین پایین چیه</span>
          </div>
          <div className="hidden items-center justify-center gap-2 opacity-60 md:flex">
            <MapPin size={15} />
            بلوار عسگری محمدیان، سالخورده — ساری
          </div>
          <div className="text-left font-eng tracking-widest opacity-60" dir="ltr">
            08:00 — 23:00 / 7 DAYS
          </div>
        </div>
      </motion.div>
    </section>
  );
}

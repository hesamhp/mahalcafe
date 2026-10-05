import { useLayoutEffect, useRef } from "react";
import { Leaf, Music, Store, Sun } from "lucide-react";
import { gsap } from "../lib/site";
import { useReveal } from "../hooks/useReveal";

/** Scroll-scrubbed word-by-word reveal. *word* renders as an inverted chip. */
function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { opacity: 0.13 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 82%", end: "top 28%", scrub: 0.6 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const parts = text.split("*");
  return (
    <p ref={ref} className={className}>
      {parts.map((part, i) => {
        const hi = i % 2 === 1;
        return part.split(" ").map((w, j) =>
          w === "" ? null : hi ? (
            <span
              key={`${i}-${j}`}
              className="sw mx-1 inline-block rounded-lg bg-ink px-3 py-0.5 text-paper"
            >
              {w}
            </span>
          ) : (
            <span key={`${i}-${j}`} className="sw me-[0.24em] inline-block">
              {w}
            </span>
          )
        );
      })}
    </p>
  );
}

const STATS = [
  ["۱۴۰۵", "شروعِ داستان"],
  ["+۱۲ هزار", "فنجان سرو‌شده"],
  ["۷ روز", "هفته همیشه باز"],
  ["۲", "میزِ دنج و همیشه لبریز"],
];

const VALUES = [
  { icon: Leaf, title: "رستِ همین‌جا", sub: "دانه‌های تازه، هر دوشنبه مغازه" },
  { icon: Store, title: "کافهٔ کوچیک", sub: "مغازه‌ی نبش، دوتا میزِ دنج" },
  { icon: Sun, title: "از صبحِ شنبه", sub: "بازشدنِ در — نورِ پنجره" },
  { icon: Music, title: "بو وأهنگ", sub: "هر چی بشنوشه از دستِ ماست" },
];

export default function About() {
  const ref = useReveal<HTMLElement>();
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = imgWrapRef.current;
    if (!wrap) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap.querySelector("img"),
        { scale: 1.18, yPercent: -8 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 0.8 },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-36">
        <div data-reveal className="mb-12 flex items-center gap-4">
          <span className="rounded-full border border-ink/30 px-4 py-1.5 text-xs tracking-[0.25em]">
            ( داستانِ محل )
          </span>
          <span className="h-px flex-1 bg-ink/20" />
        </div>

        <ScrubText
          className="max-w-5xl text-[clamp(1.7rem,4.2vw,3.6rem)] font-extrabold leading-[1.85]"
          text="محل فقط یه فنجون قهوه نیست؛ *یه عادتِ روزانه‌ست*، یه قرارِ همیشگی، یه گوشه برای *خودت بودن*"
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-reveal className="text-base leading-[2.2] text-ink/70 sm:text-lg">
              تابستانِ ۱۴۰۵، یه مغازه‌ی کوچیک نبشِ سالخورده تو ساری، با فقط دو تا میز و یه
              سؤالِ ساده شروع کردیم: «کافه‌ای که خودمون دلمون می‌خواد توش قهوه بخوریم،
              چه شکلیه؟»
            </p>
            <p data-reveal data-delay="0.1" className="mt-6 text-base leading-[2.2] text-ink/70 sm:text-lg">
              جوابش شد محل: یه بارِ قهوه‌سازی، دوتا میزِ دنج و فنجون‌هایی که با اسمِ تو
              آماده می‌شن. حالا کلِ نبشِ سالخورده بوی قهوه گرفته و همون دوتا میز، پر از
              قصه‌های صبح‌به‌صبحِ محلّه‌ست.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-ink/15 shadow-[0_18px_44px_-24px_rgba(8,8,8,0.14)] lg:col-span-7 lg:ms-auto lg:w-full">
            {STATS.map(([n, label], i) => (
              <div
                key={label}
                data-reveal
                data-delay={String(i * 0.07)}
                className="flex flex-col justify-between gap-6 bg-paper p-6 sm:p-8"
              >
                <span className="text-4xl font-black tracking-tight sm:text-6xl">{n}</span>
                <span className="text-xs text-ink/60 sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* full-bleed image */}
      <div data-reveal className="mx-auto max-w-[1600px] px-0 sm:px-10">
        <div ref={imgWrapRef} className="relative h-[62vh] overflow-hidden sm:rounded-[32px] sm:shadow-[0_24px_60px_-24px_rgba(8,8,8,0.18)]">
          <img
            src="/images/counter.jpg"
            alt="پشت باری کافه محل"
            className="img-bw h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-5 text-paper sm:p-8">
            <span className="text-sm font-bold sm:text-base">پشتِ بارِ محل — ۸ صبحِ یه شنبه</span>
            <span className="font-eng hidden text-xs tracking-widest opacity-70 sm:block" dir="ltr">
              SHOT ON B&W FILM
            </span>
          </div>
        </div>
      </div>

      {/* values */}
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-[28px] bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              data-reveal
              data-delay={String(i * 0.08)}
              className="group bg-paper p-8 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <v.icon size={30} strokeWidth={1.5} className="mb-8 transition-transform duration-500 group-hover:-rotate-12" />
              <h3 className="text-xl font-extrabold">{v.title}</h3>
              <p className="mt-2 text-sm leading-7 opacity-60">{v.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Coffee, Croissant, SunMoon } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { toFa } from "../lib/data";

const stats = [
  { icon: Coffee, num: "۱۵+", label: "آیتم قهوه و نوشیدنی" },
  { icon: Croissant, num: "۲", label: "اسنک داغ" },
  { icon: SunMoon, num: toFa(15), label: "ساعت باز بودن در روز" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yWord = useTransform(scrollYProgress, [0, 1], [80, -120]);

  return (
    <section id="space" ref={ref} className="relative overflow-hidden py-24 md:py-36">
      {/* giant ghost word */}
      <motion.span
        aria-hidden
        style={{ y: yWord }}
        className="text-outline pointer-events-none absolute -right-6 top-1/2 select-none font-display text-[38vw] leading-none md:text-[26vw]"
      >
        محل
      </motion.span>

      <div className="relative mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-16 px-5 md:px-10 lg:grid-cols-2">
        {/* text */}
        <div>
          <Eyebrow>Cafe Mahal — فضای کافه محل</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-5xl leading-[1.1] text-cream md:text-7xl">
              جایی برای <span className="text-caramel">خودت</span>،
              <br />
              نه برای عجله
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-lg text-base leading-8 text-sand md:text-lg md:leading-9">
              ببین، داستان کافه محل خیلی ساده شروع شد: یه شهر شلوغ مثل ساری
              نیاز داشت به یه جایی که توش نفس بکشی. ما قهوه رو خودمون تراز
              می‌کنیم، شات‌ها رو با حوصله می‌زنیم و معتقدیم بهترین حرف‌ها پشت
              یه فنجون قهوهٔ خوب زده می‌شه.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-lg text-base leading-8 text-clay md:text-lg md:leading-9">
              نور ملایم، موسیقی آروم، بوی قهوه تازه و یه گوشه دنج. همین!
              بیا و خودت ببین.
            </p>
          </Reveal>

          {/* stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, num, label }, i) => (
              <Reveal key={label} delay={0.1 + i * 0.08}>
                <div className="group rounded-2xl border border-cream/10 bg-coal/60 p-4 transition-colors duration-500 hover:border-caramel/40 md:p-6">
                  <Icon className="size-5 text-caramel transition-transform duration-500 group-hover:-translate-y-1" />
                  <p className="mt-4 font-display text-4xl leading-none text-cream md:text-5xl">
                    {num}
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-clay md:text-xs">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* image stack */}
        <div className="relative">
          <motion.div
            style={{ y: yImg }}
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] border border-cream/15"
          >
            <img
              src="/images/interior.jpg"
              alt="فضای داخلی کافه محل در ساری (Cafe Mahal interior)"
              className="img-warm h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 left-6 flex items-end justify-between">
              <p className="font-display text-2xl text-cream">گوشهٔ همیشگی تو</p>
              <p className="font-latin text-[10px] uppercase tracking-[0.3em] text-cream/70">
                Cafe Mahal
              </p>
            </div>
          </motion.div>

          {/* floating card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -6 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-10 -right-2 w-40 animate-float bg-cream p-2 pb-8 shadow-2xl shadow-black/50 sm:-right-8 md:w-48"
          >
            <img
              src="/images/latte.jpg"
              alt="لاته آرت — قهوهٔ تخصصی کافه محل (Cafe Mahal)"
              className="img-warm aspect-square w-full object-cover"
            />
            <p className="mt-2 text-center font-latin text-[9px] uppercase tracking-[0.25em] text-espresso/70">
              Every cup, a canvas
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

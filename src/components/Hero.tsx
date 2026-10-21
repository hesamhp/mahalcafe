import { motion } from "motion/react";
import { ArrowDown, Armchair, Coffee, Wifi } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const rise = {
  hidden: { y: "115%" },
  show: (d: number) => ({
    y: 0,
    transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function RotatingBadge() {
  return (
    <div className="relative grid size-32 place-items-center md:size-40">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-rotate-slow">
        <defs>
          <path
            id="badge-circle"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
          />
        </defs>
        <text
          className="fill-cream font-latin uppercase"
          style={{ fontSize: "7.2px", letterSpacing: "2.6px" }}
        >
          <textPath href="#badge-circle">
            Mahal Cafe • Specialty Coffee • Fresh Daily •
          </textPath>
        </text>
      </svg>
      <span className="grid size-16 place-items-center rounded-full border border-cream/20 bg-espresso/60 font-display text-3xl text-caramel backdrop-blur-sm md:size-20 md:text-4xl">
        محل
      </span>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const state = ready ? "show" : "hidden";

  return (
    <section className="relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-caramel/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-10rem] h-[26rem] w-[26rem] rounded-full bg-ember/10 blur-[120px]" />

      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-14 px-5 pb-20 pt-32 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-40">
        {/* text column */}
        <div className="relative z-10 lg:col-span-7">
          <motion.div
            variants={fade}
            custom={0.55}
            initial="hidden"
            animate={state}
            className="mb-6 flex items-center gap-3"
          >
            <span className="flex items-center gap-2 rounded-full border border-caramel/30 bg-caramel/10 px-4 py-1.5 text-xs font-semibold text-caramel">
              <Coffee className="size-3.5" />
              کافهٔ تخصصی — هر روز ۸ صبح تا ۱۲ شب
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              variants={rise}
              custom={0.65}
              initial="hidden"
              animate={state}
              className="font-display text-[34vw] leading-[0.85] text-cream sm:text-[26vw] lg:text-[15rem] xl:text-[17rem]"
            >
              محل
              <span className="text-caramel">.</span>
            </motion.h1>
          </div>

          <motion.p
            variants={fade}
            custom={0.9}
            initial="hidden"
            animate={state}
            className="mt-6 max-w-md text-base leading-8 text-sand md:text-lg md:leading-9"
          >
            اینجا قرار نیست عجله‌ای رد شوی. «محل» جایی است برای مکث؛ قهوه‌ات
            داغ، اسنک‌ات تازه و صندلی‌ات همیشه آماده. منو را نگاه کن، ما
            بقیه‌اش با ما.
          </motion.p>

          <motion.div
            variants={fade}
            custom={1.05}
            initial="hidden"
            animate={state}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("menu")}
              className="group flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-extrabold text-espresso shadow-[0_10px_40px_-10px_rgba(244,234,211,0.35)] transition-all duration-300 hover:bg-caramel hover:shadow-[0_10px_40px_-8px_rgba(210,137,75,0.5)]"
            >
              منوی آنلاین
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
            <button
              onClick={() => scrollToId("space")}
              className="rounded-full border border-cream/25 px-7 py-4 text-sm font-bold text-cream transition-all duration-300 hover:border-caramel hover:text-caramel"
            >
              فضای محل
            </button>
          </motion.div>

          <motion.ul
            variants={fade}
            custom={1.2}
            initial="hidden"
            animate={state}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-clay"
          >
            {[
              { icon: Coffee, label: "دانهٔ تازه‌بویل" },
              { icon: Armchair, label: "فضای دنج برای نشستن" },
              { icon: Wifi, label: "وای‌فای آزاد" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-caramel/80" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* visual column */}
        <div className="relative lg:col-span-5">
          {/* arch image */}
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={ready ? { clipPath: "inset(0% 0 0 0)" } : {}}
            transition={{ duration: 1.2, delay: 0.75, ease: [0.83, 0, 0.17, 1] }}
            className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-[999px] border border-cream/15"
          >
            <motion.img
              src="/images/hero.jpg"
              alt="قهوهٔ تازهٔ کافه محل"
              initial={{ scale: 1.25 }}
              animate={ready ? { scale: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="img-warm h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
          </motion.div>

          {/* rotating badge */}
          <motion.div
            variants={fade}
            custom={1.35}
            initial="hidden"
            animate={state}
            className="absolute -bottom-6 -left-2 z-10 md:-left-8"
          >
            <RotatingBadge />
          </motion.div>

          {/* polaroid card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={ready ? { opacity: 1, y: 0, rotate: -7 } : {}}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-3 top-6 w-32 animate-float bg-cream p-2 pb-7 shadow-2xl shadow-black/50 sm:w-36 md:-right-8"
          >
            <img
              src="/images/iced.jpg"
              alt="آیس ماکیاتو"
              className="img-warm aspect-square w-full object-cover"
            />
            <p className="mt-2 text-center font-latin text-[9px] uppercase tracking-[0.25em] text-espresso/70">
              Iced Macchiato
            </p>
          </motion.div>

        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        variants={fade}
        custom={1.85}
        initial="hidden"
        animate={state}
        className="mx-auto flex max-w-[90rem] items-center gap-4 px-5 pb-10 md:px-10"
      >
        <span className="font-latin text-[10px] uppercase tracking-[0.4em] text-clay">
          Scroll
        </span>
        <div className="relative h-px flex-1 overflow-hidden bg-cream/10">
          <motion.span
            className="absolute inset-y-0 right-0 w-1/3 bg-caramel"
            animate={{ x: ["0%", "-300%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-xs text-clay">برای دیدن منو اسکرول کن</span>
      </motion.div>
    </section>
  );
}

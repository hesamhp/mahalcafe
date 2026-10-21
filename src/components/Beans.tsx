import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bean as BeanIcon,
  Check,
  Coffee,
  Flame,
  Phone,
  Scale,
  Snowflake,
  Truck,
  Zap,
} from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { beans, grinds, toFa, weights } from "../lib/data";
import { scrollToId } from "../lib/scroll";

const grindIcons: Record<string, typeof Coffee> = {
  bean: BeanIcon,
  zap: Zap,
  coffee: Coffee,
  snow: Snowflake,
};

const perks = [
  { icon: Flame, title: "رست هفتگی", desc: "دانه‌ها تازه از رستر می‌رسند" },
  { icon: Scale, title: "وزن دلخواه", desc: "از ۲۵۰ گرم تا هر چقدر که بخواهی" },
  { icon: Truck, title: "ارسال در تهران", desc: "با پیک، همان روزِ رست" },
];

export default function Beans() {
  const [beanId, setBeanId] = useState(beans[0].id);
  const [weightId, setWeightId] = useState(weights[1].id);
  const [grindId, setGrindId] = useState(grinds[0].id);

  const bean = beans.find((b) => b.id === beanId)!;
  const weight = weights.find((w) => w.id === weightId)!;
  const grind = grinds.find((g) => g.id === grindId)!;

  const total = useMemo(
    () => Math.round(bean.perKg * weight.factor),
    [bean, weight]
  );

  return (
    <section
      id="beans"
      className="relative overflow-hidden rounded-t-[2.5rem] bg-cream py-24 text-espresso md:rounded-t-[3.5rem] md:py-36"
    >
      {/* ghost latin word */}
      <span
        aria-hidden
        className="text-outline-ink pointer-events-none absolute -top-4 left-0 select-none font-latin text-[26vw] font-bold leading-none tracking-tight md:text-[16vw]"
      >
        BEANS
      </span>

      <div className="relative mx-auto grid max-w-[90rem] grid-cols-1 items-start gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* ---------- intro column ---------- */}
        <div>
          <Eyebrow light>Beans By Kilo — فروش کیلویی</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-5xl leading-[1.05] text-espresso md:text-7xl">
              قهوه رو <span className="text-ember">کیلویی</span>
              <br />
              ببر خونه
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-base leading-8 text-espresso/70 md:text-lg md:leading-9">
              همان دانه‌ای که پشت بار عصاره‌اش می‌کنیم، روبه‌رویت رست می‌شود؛
              وزنش را انتخاب کن، آسیابش را به سلیقه‌ات بگو و باقی‌اش با ما. روی
              هر پاکت تاریخ رست را می‌نویسیم.
            </p>
          </Reveal>

          {/* perks */}
          <div className="mt-10 space-y-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.08 + i * 0.07}>
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-espresso/15 bg-espresso/[0.04] text-ember">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-bold text-espresso">{title}</p>
                    <p className="text-sm text-espresso/60">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* bag visual */}
          <Reveal delay={0.2} className="mt-12">
            <div className="relative w-fit">
              <div className="w-56 rotate-[-3deg] overflow-hidden rounded-[1.5rem] border-4 border-espresso shadow-2xl shadow-espresso/30 transition-transform duration-700 hover:rotate-0 sm:w-64 md:w-72">
                <img
                  src="/images/bag.jpg"
                  alt="پاکت دانهٔ قهوه محل"
                  className="img-warm aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-10 size-28 animate-float overflow-hidden rounded-full border-4 border-cream shadow-xl sm:-left-14 sm:size-32">
                <img
                  src="/images/beans.jpg"
                  alt="دانه‌های رست‌شده"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-4 rounded-full bg-espresso px-5 py-2.5 text-xs font-bold text-cream shadow-lg sm:-right-8">
                از {toFa(560)} هزار تومان / کیلو
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- order builder ---------- */}
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-espresso p-5 text-cream shadow-[0_40px_80px_-30px_rgba(21,14,8,0.6)] md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-3xl text-cream">
                سفارش‌ت رو بچین
              </h3>
              <span className="font-latin text-[10px] uppercase tracking-[0.35em] text-clay">
                3 Steps
              </span>
            </div>

            {/* step 1 — bean */}
            <div className="mt-8">
              <p className="mb-4 flex items-center gap-3">
                <span className="font-latin text-[10px] tracking-[0.3em] text-caramel">
                  STEP 01
                </span>
                <span className="font-display text-2xl text-cream">
                  دانه رو انتخاب کن
                </span>
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {beans.map((b) => {
                  const isActive = b.id === beanId;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBeanId(b.id)}
                      className={`relative rounded-2xl border p-4 text-start transition-all duration-300 ${
                        isActive
                          ? "border-caramel bg-caramel/10"
                          : "border-cream/15 bg-mocha/50 hover:border-cream/35"
                      }`}
                    >
                      <span
                        className={`absolute left-3 top-3 grid size-5 place-items-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-caramel text-espresso"
                            : "border border-cream/25 text-transparent"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
                      <span className="block font-bold text-cream">
                        {b.name}
                      </span>
                      <span
                        dir="ltr"
                        className="mt-0.5 block font-latin text-[9px] uppercase tracking-[0.2em] text-clay"
                      >
                        {b.en}
                      </span>
                      <span className="mt-2 block text-[11px] leading-5 text-sand/80">
                        {b.note}
                      </span>
                      <span className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, d) => (
                            <span
                              key={d}
                              className={`size-1.5 rounded-full ${
                                d < b.roast ? "bg-caramel" : "bg-cream/20"
                              }`}
                            />
                          ))}
                        </span>
                        <span className="text-[11px] font-bold text-caramel">
                          کیلویی {toFa(b.perKg)}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* step 2 — weight */}
            <div className="mt-8">
              <p className="mb-4 flex items-center gap-3">
                <span className="font-latin text-[10px] tracking-[0.3em] text-caramel">
                  STEP 02
                </span>
                <span className="font-display text-2xl text-cream">وزن</span>
              </p>
              <div className="flex rounded-full border border-cream/15 bg-mocha/50 p-1">
                {weights.map((w) => {
                  const isActive = w.id === weightId;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWeightId(w.id)}
                      className={`relative flex-1 rounded-full py-2.5 text-sm font-bold transition-colors duration-300 ${
                        isActive ? "text-espresso" : "text-sand hover:text-cream"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="weight-pill"
                          className="absolute inset-0 rounded-full bg-cream"
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 28,
                          }}
                        />
                      )}
                      <span className="relative">{w.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* step 3 — grind */}
            <div className="mt-8">
              <p className="mb-4 flex items-center gap-3">
                <span className="font-latin text-[10px] tracking-[0.3em] text-caramel">
                  STEP 03
                </span>
                <span className="font-display text-2xl text-cream">
                  نوع آسیاب
                </span>
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {grinds.map((g) => {
                  const Icon = grindIcons[g.icon] ?? Coffee;
                  const isActive = g.id === grindId;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGrindId(g.id)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border py-3.5 transition-all duration-300 ${
                        isActive
                          ? "border-caramel bg-caramel text-espresso"
                          : "border-cream/15 bg-mocha/50 text-sand hover:border-cream/35 hover:text-cream"
                      }`}
                    >
                      <Icon className="size-5" />
                      <span className="text-[11px] font-bold leading-4">
                        {g.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* summary */}
            <div className="mt-8 border-t border-dashed border-cream/20 pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-clay">جمع سفارش</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${beanId}-${weightId}-${grindId}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 max-w-[16rem] text-[11px] leading-5 text-sand"
                    >
                      {bean.name} — {weight.label} — {grind.label}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-display text-6xl leading-none text-caramel md:text-7xl"
                    >
                      {toFa(total)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="mt-1 block text-[10px] text-clay">
                    هزار تومان
                  </span>
                </div>
              </div>

              <button
                onClick={() => scrollToId("contact")}
                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-caramel py-4 text-sm font-extrabold text-espresso transition-all duration-300 hover:bg-cream"
              >
                <Phone className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
                نهایی کردن سفارش
              </button>
              <p className="mt-3 text-center text-[10px] leading-5 text-clay">
                پرداخت حضوری یا کارت‌به‌کارت — ارسال با پیک در تهران
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

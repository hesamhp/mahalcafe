import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Flame, MapPin, MessageCircle, Phone, Scale, Truck } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { bulkPacks, cafeInfo, faToman, toFa } from "../lib/data";

const perks = [
  {
    icon: Flame,
    title: "روبوستای ۱۰۰٪ تازه‌رست",
    desc: "دانه‌ها تازه از رستر کافه محل می‌رسن",
  },
  {
    icon: Scale,
    title: "بسته‌های ۱ تا ۱۰ کیلویی",
    desc: "هرچی بیشتر برداری، ارزون‌تر درمیاد",
  },
  {
    icon: Truck,
    title: "تحویل آسان",
    desc: "حضوری تو ساری یا ارسال به هر جای کشور",
  },
];

const perKgOf = (price: number, kg: number) =>
  Math.round(price / kg / 10000) * 10000;

export default function Beans() {
  const [selectedKg, setSelectedKg] = useState(bulkPacks[0].kg);
  const pack = bulkPacks.find((p) => p.kg === selectedKg)!;

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

      <div className="relative mx-auto grid max-w-[90rem] grid-cols-1 items-start gap-10 px-5 md:gap-14 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* ---------- intro column ---------- */}
        <div>
          <Eyebrow light>Beans By Kilo — فروش کیلویی</Eyebrow>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-5xl leading-[1.05] text-espresso md:text-7xl">
              روبستای <span className="text-ember">۱۰۰٪</span>
              <br />
              کیلویی ببر
              <span className="sr-only">
                {" "}
                — فروش کیلویی دانهٔ قهوهٔ روبوستا در ساری، کافه محل
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-lg text-base leading-8 text-espresso/70 md:text-lg md:leading-9">
              همون دونه‌ای که تو کافه محل باهاش قهوت که حاصل سال‌ها تلاش و
              تجربه است رو می‌زنیم، می‌تونی کیلویی ببری خونه! وزنت رو انتخاب
              کن و بقیه‌ش با ما. روی هر پاکت تاریخ رست رو هم می‌نویسیم.
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

          {/* bag visual - hidden on mobile, shown on lg */}
          <Reveal delay={0.2} className="mt-12 hidden lg:block">
            <div className="relative w-fit">
              <div className="w-64 rotate-[-3deg] overflow-hidden rounded-[1.5rem] border-4 border-espresso shadow-2xl shadow-espresso/30 transition-transform duration-700 hover:rotate-0 md:w-72">
                <img
                  src="/images/bag.jpg"
                  alt="پاکت قهوهٔ کیلویی کافه محل (Cafe Mahal)"
                  className="img-warm aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-14 size-32 animate-float overflow-hidden rounded-full border-4 border-cream shadow-xl">
                <img
                  src="/images/beans.jpg"
                  alt="دانهٔ روبوستای ۱۰۰٪ — فروش کیلویی قهوه در کافه محل"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-8 rounded-full bg-espresso px-5 py-2.5 text-xs font-bold text-cream shadow-lg">
                کیلویی {faToman(3000000)} تومان
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------- pack picker ---------- */}
        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-espresso p-5 text-cream shadow-[0_40px_80px_-30px_rgba(21,14,8,0.6)] md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-3xl text-cream">
                بسته‌ات رو انتخاب کن
              </h3>
              <span className="font-latin text-[10px] uppercase tracking-[0.35em] text-clay">
                Robusta 100%
              </span>
            </div>

            {/* tiers */}
            <div className="mt-6 space-y-3">
              {bulkPacks.map((p) => {
                const isActive = p.kg === selectedKg;
                return (
                  <button
                    key={p.kg}
                    onClick={() => setSelectedKg(p.kg)}
                    className={`group relative flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-start transition-all duration-300 md:p-5 ${
                      isActive
                        ? "border-transparent"
                        : "border-cream/15 bg-mocha/40 hover:border-cream/35"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pack-bg"
                        className="absolute inset-0 rounded-2xl border border-caramel/60 bg-caramel/10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 28,
                        }}
                      />
                    )}
                    {p.tag && (
                      <span className="absolute -top-2.5 right-6 z-10 rounded-full bg-ember px-3 py-0.5 text-[10px] font-extrabold text-cream shadow-md">
                        {p.tag}
                      </span>
                    )}
                    <span className="relative flex items-center gap-4">
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-caramel bg-caramel text-espresso"
                            : "border-cream/25 text-transparent"
                        }`}
                      >
                        <Check className="size-3.5" />
                      </span>
                      <span>
                        <span className="block font-display text-3xl leading-none text-cream md:text-4xl">
                          {toFa(p.kg)} کیلو
                        </span>
                        <span className="mt-1.5 block text-[11px] text-clay">
                          کیلویی حدود {faToman(perKgOf(p.price, p.kg))} تومان
                        </span>
                      </span>
                    </span>
                    <span className="relative text-left">
                      <span
                        className={`block font-display text-2xl leading-[1.1] transition-colors duration-300 md:text-3xl ${
                          isActive ? "text-caramel" : "text-cream"
                        }`}
                      >
                        {faToman(p.price)}
                      </span>
                      <span className="mt-1.5 block text-[10px] text-clay">
                        تومان
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* summary */}
            <div className="mt-8 border-t border-dashed border-cream/20 pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-clay">سفارش تو</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={pack.kg}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="mt-1 text-[11px] leading-5 text-sand"
                    >
                      روبوستای ۱۰۰٪ — بستهٔ {toFa(pack.kg)} کیلویی
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={pack.price}
                      initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="block font-display text-4xl leading-[1.05] text-caramel md:text-5xl"
                    >
                      {faToman(pack.price)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="mt-1 block text-[10px] text-clay">
                    تومان
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${cafeInfo.tel}`}
                  className="group flex items-center justify-center gap-3 rounded-full bg-caramel py-4 text-sm font-extrabold text-espresso transition-all duration-300 hover:bg-cream"
                >
                  <Phone className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
                  <span>سفارش تلفنی</span>
                </a>
                <a
                  href={cafeInfo.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-full bg-[#229ED9] py-4 text-sm font-extrabold text-white transition-all duration-300 hover:bg-[#1a8bc2]"
                >
                  <MessageCircle className="size-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>سفارش از تلگرام</span>
                </a>
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] leading-5 text-clay">
                <MapPin className="size-3.5 shrink-0 text-caramel" />
                {cafeInfo.address[0]}، {cafeInfo.address[1]}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

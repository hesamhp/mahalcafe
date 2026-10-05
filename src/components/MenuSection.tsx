import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

type Item = [name: string, price: string, note?: string];
type Group = { no: string; title: string; img: string; items: Item[] };

const GROUPS: Group[] = [
  {
    no: "۰۱",
    title: "قهوه",
    img: "/images/hero.jpg",
    items: [
      ["تک", "۹۵"],
      ["دبل", "۱۰۵"],
      ["آمریکانو", "۱۳۰"],
      ["لاته", "۱۴۰"],
      ["کاپوچینو", "۱۴۰"],
      ["موکا", "۱۵۰"],
      ["کارامل ماکیاتو", "۱۵۰"],
      ["فندق ماکیاتو", "۱۵۰"],
      ["آیس لاته", "۱۶۰"],
      ["آیس آمریکانو", "۱۴۰"],
      ["آیس کارامل ماکیاتو", "۱۶۰"],
      ["آیس موکا", "۱۶۰"],
    ],
  },
  {
    no: "۰۲",
    title: "اسنک",
    img: "/images/cake.jpg",
    items: [
      ["اسنک چیکن بوبی", "۲۰۰", "با سسِ مخصوص"],
      ["اسنک پیتزا", "۲۰۰"],
    ],
  },
  {
    no: "۰۳",
    title: "نوشیدنی",
    img: "/images/pour.jpg",
    items: [
      ["آب هندوانه", "۱۴۰"],
      ["آب طالبی", "۱۴۰"],
      ["شیرموز", "۱۴۰"],
      ["چای", "۳۵"],
      ["چای ماسالا", "۵۵"],
    ],
  },
];

type Props = { onPage?: () => void };

export default function MenuSection({ onPage }: Props) {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<string | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  return (
    <section
      id="menu"
      ref={ref}
      className="relative bg-ink py-24 text-paper sm:py-36"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        {/* header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div data-reveal className="mb-8 flex items-center gap-4">
              <span className="rounded-full border border-paper/30 px-4 py-1.5 text-xs tracking-[0.25em]">
                ( چی چی داریم؟ )
              </span>
              <span className="h-px w-24 bg-paper/25" />
            </div>
            <h2 data-reveal className="text-[clamp(4.5rem,13vw,11rem)] font-black leading-none">
              منو
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-sm leading-8 text-paper/60">
            همهٔ قیمت‌ها به «هزار تومان» نوشته شدن. دانی که این‌جا رست می‌شه آخر هفته‌ست
            و هر فنجانی که سفارش می‌دی همون لحظه دوتست می‌کشه.
          </p>
        </div>

        {/* groups */}
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {GROUPS.map((g, gi) => (
            <div key={g.title} data-reveal data-delay={String(gi * 0.08)}>
              <div className="mb-2 flex items-baseline justify-between border-b-2 border-paper pb-4">
                <h3 className="text-2xl font-extrabold sm:text-3xl">{g.title}</h3>
                <span className="font-eng text-xs tracking-widest opacity-50">({g.no})</span>
              </div>
              <ul>
                {g.items.map(([name, price, note], ii) => (
                  <li key={name}>
                    <button
                      data-hover
                      onMouseEnter={() => setActive(g.img)}
                      className="group flex w-full items-baseline gap-3 border-b border-paper/10 px-2 py-3.5 text-right transition-all duration-300 hover:bg-paper hover:px-4 hover:text-ink sm:py-5"
                    >
                      <span className="font-eng w-6 shrink-0 text-[10px] tracking-widest opacity-40 transition-opacity group-hover:opacity-70">
                        {String(ii + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-bold sm:text-lg">
                        {name}
                        {note && (
                          <span className="ms-2 hidden text-[11px] font-normal opacity-40 transition-opacity group-hover:opacity-70 sm:inline">
                            {note}
                          </span>
                        )}
                      </span>
                      <span className="dot-leader h-[2px] min-w-3 flex-1 sm:min-w-4" />
                      <span className="shrink-0 text-base font-black tracking-tight sm:text-xl">{price}</span>
                      <ArrowUpLeft
                        size={15}
                        className="hidden shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-60 sm:block -translate-x-1"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-16 flex flex-col items-center gap-6">
          <p className="text-center text-sm text-paper/55">
            فقط دوتا میز داریم ولی دوتاتون هم جا دارین — فنجونِ سرامیکی‌اش یه حالِ دیگه‌ست.
          </p>
          <button
            data-hover
            onClick={() => onPage?.()}
            className="group flex items-center gap-3 rounded-2xl border-2 border-paper/30 px-8 py-4 text-sm font-bold transition-all duration-300 hover:gap-5 hover:border-paper hover:bg-paper hover:text-ink"
          >
            دیدنِ منوی کامل
            <ArrowUpLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* floating preview */}
      <motion.div
        style={{ x: sx, y: sy }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85, rotate: active ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="pointer-events-none fixed left-0 top-0 z-[55] hidden [@media(pointer:fine)]:block"
      >
        <div className="-translate-x-1/2 -translate-y-[112%]">
          {active && (
            <img
              src={active}
              alt=""
              className="img-bw h-64 w-52 rounded-xl border border-paper/30 object-cover shadow-2xl shadow-black/60"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}

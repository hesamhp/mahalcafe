import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Coffee,
  CupSoda,
  Info,
  Leaf,
  Sandwich,
  Snowflake,
} from "lucide-react";
import { Eyebrow, Reveal } from "./ui";
import { categories, toFa, type Category, type MenuGroup } from "../lib/data";

const iconMap: Record<string, typeof Coffee> = {
  hot: Coffee,
  iced: Snowflake,
  snack: Sandwich,
  fresh: CupSoda,
  tea: Leaf,
};

const countOf = (c: Category) =>
  c.groups.reduce((a, g) => a + g.items.length, 0);

/* ---------- single menu row ---------- */
function ItemRow({
  item,
  i,
  gi,
}: {
  item: Category["groups"][number]["items"][number];
  i: number;
  gi: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.05 + gi * 0.05 + i * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex items-center gap-3 border-b border-cream/10 px-2 py-4 transition-colors duration-300 hover:bg-cream/[0.05] md:gap-5 md:px-4 md:py-5"
    >
      {/* hover dot */}
      <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 scale-0 rounded-full bg-caramel transition-transform duration-300 group-hover:scale-100" />

      <span className="hidden w-6 font-latin text-[10px] tracking-widest text-clay/70 sm:block">
        {String(i + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="text-lg font-extrabold text-cream transition-colors duration-300 group-hover:text-caramel md:text-xl">
            {item.name}
          </h4>
          <span
            dir="ltr"
            className="font-latin text-[10px] uppercase tracking-[0.18em] text-clay"
          >
            {item.en}
          </span>
          {item.tag && (
            <span className="rounded-full border border-caramel/40 bg-caramel/10 px-2.5 py-0.5 text-[10px] font-bold text-caramel">
              {item.tag}
            </span>
          )}
        </div>
        {item.desc && (
          <p className="mt-1 text-[13px] leading-6 text-clay transition-colors duration-300 group-hover:text-sand">
            {item.desc}
          </p>
        )}
      </div>

      <span className="leader-line hidden w-10 shrink-0 opacity-40 transition-opacity duration-300 group-hover:opacity-90 sm:block md:w-20" />

      <div className="shrink-0 text-left">
        <span className="font-display text-3xl leading-none text-caramel transition-colors duration-300 group-hover:text-cream md:text-4xl">
          {toFa(item.price)}
        </span>
        <span className="mt-1 block text-[10px] text-clay">هزار تومان</span>
      </div>
    </motion.li>
  );
}

/* ---------- group block ---------- */
function GroupBlock({ group, gi }: { group: MenuGroup; gi: number }) {
  const Icon = iconMap[group.icon] ?? Coffee;
  return (
    <div className={gi > 0 ? "mt-10" : ""}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.04 + gi * 0.05 }}
        className="mb-1 flex items-center gap-3"
      >
        <span className="grid size-10 place-items-center rounded-full border border-caramel/40 bg-caramel/10 text-caramel">
          <Icon className="size-4.5" />
        </span>
        <h3 className="font-display text-3xl leading-none text-cream">
          {group.title}
        </h3>
        <span className="font-latin text-[10px] uppercase tracking-[0.3em] text-clay">
          {group.en}
        </span>
        <span className="rounded-full bg-cream/10 px-2.5 py-0.5 text-[10px] font-bold text-clay">
          {toFa(group.items.length)} آیتم
        </span>
        <span className="mx-1 h-px flex-1 bg-cream/10" />
      </motion.div>

      <ul>
        {group.items.map((item, i) => (
          <ItemRow key={item.en + i} item={item} i={i} gi={gi} />
        ))}
      </ul>
    </div>
  );
}

/* ---------- desktop vertical index ---------- */
function CategoryIndex({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="sticky top-24 hidden flex-col gap-3 lg:flex">
      <p className="mb-2 flex items-center gap-2 font-latin text-[10px] uppercase tracking-[0.4em] text-clay">
        <span className="inline-block size-1.5 rounded-full bg-caramel" />
        فهرست منو
      </p>
      {categories.map((c, i) => {
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`group relative rounded-2xl border px-6 py-5 text-start transition-all duration-300 ${
              isActive
                ? "border-transparent"
                : "border-cream/10 hover:border-caramel/40"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="menu-tab-bg"
                className="absolute inset-0 rounded-2xl border border-caramel/50 bg-cream/[0.05]"
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              />
            )}
            <span className="relative flex items-center justify-between gap-4">
              <span className="flex items-baseline gap-4">
                <span className="font-latin text-xs tracking-widest text-caramel/80">
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-5xl leading-none transition-colors duration-300 ${
                    isActive
                      ? "text-caramel"
                      : "text-outline-strong group-hover:text-cream"
                  }`}
                >
                  {c.label}
                </span>
              </span>
              <span className="flex flex-col items-end gap-1">
                <span
                  dir="ltr"
                  className="font-latin text-[10px] uppercase tracking-[0.25em] text-clay"
                >
                  {c.en}
                </span>
                <span className="text-[11px] font-medium text-clay">
                  {toFa(countOf(c))} آیتم
                </span>
              </span>
            </span>
          </button>
        );
      })}

      {/* mini note under index */}
      <div className="mt-4 rounded-2xl border border-caramel/25 bg-caramel/[0.06] p-5">
        <p className="flex items-start gap-3 text-xs leading-6 text-sand">
          <Info className="mt-0.5 size-4 shrink-0 text-caramel" />
          شیر گیاهی، شات اضافه یا سیروپ دلخواه‌ات رو از باریستا بخواه؛ حالشو
          داریم.
        </p>
      </div>
    </div>
  );
}

/* ---------- mobile pills ---------- */
function MobileTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-10 flex flex-wrap gap-3 lg:hidden">
      {categories.map((c, i) => {
        const isActive = c.id === activeId;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`flex items-center gap-2.5 rounded-full border px-5 py-3 transition-all duration-300 ${
              isActive
                ? "border-cream bg-cream text-espresso"
                : "border-cream/20 text-sand hover:border-caramel/60 hover:text-cream"
            }`}
          >
            <span
              className={`font-latin text-[10px] tracking-widest ${
                isActive ? "text-espresso/60" : "text-caramel/80"
              }`}
            >
              0{i + 1}
            </span>
            <span className="font-display text-2xl leading-none">{c.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isActive ? "bg-espresso/10 text-espresso" : "bg-cream/10 text-clay"
              }`}
            >
              {toFa(countOf(c))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- section ---------- */
export default function MenuSection() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeId)!;

  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-caramel/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Online Menu — منوی آنلاین</Eyebrow>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-5xl leading-none text-cream md:text-8xl">
                چی میل داری<span className="text-caramel">؟</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="flex items-center gap-2 rounded-full border border-cream/15 bg-coal/70 px-5 py-2.5 text-xs font-medium text-sand">
              <Info className="size-4 text-caramel" />
              تمام قیمت‌ها به هزار تومان است
            </p>
          </Reveal>
        </div>

        <MobileTabs activeId={activeId} onSelect={setActiveId} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[370px_1fr] lg:gap-14">
          <CategoryIndex activeId={activeId} onSelect={setActiveId} />

          {/* content column */}
          <div className="relative">
            {/* ghost word */}
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id}
                aria-hidden
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55 }}
                className="text-outline pointer-events-none absolute -top-16 left-0 z-0 select-none font-display text-[20vw] leading-none lg:-top-20 lg:text-[9vw]"
              >
                {active.label}
              </motion.span>
            </AnimatePresence>

            {/* category banner */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 h-52 overflow-hidden rounded-[1.75rem] border border-cream/15 md:h-64"
              >
                <motion.img
                  src={active.image}
                  alt={active.label}
                  initial={{ scale: 1.14 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="img-warm h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" />

                <span className="absolute left-5 top-5 rounded-full border border-cream/25 bg-espresso/50 px-4 py-1.5 text-[11px] font-bold text-cream backdrop-blur-md">
                  {toFa(countOf(active))} آیتم
                </span>

                <div className="absolute bottom-5 right-6 left-6 flex flex-wrap items-end justify-between gap-3 md:bottom-7 md:right-8 md:left-8">
                  <div>
                    <p className="font-display text-5xl leading-none text-cream md:text-6xl">
                      {active.label}
                      <span className="text-caramel">.</span>
                    </p>
                    <p className="mt-2 max-w-sm text-xs leading-6 text-sand md:text-[13px]">
                      {active.note}
                    </p>
                  </div>
                  <span
                    dir="ltr"
                    className="hidden font-latin text-xs uppercase tracking-[0.4em] text-cream/60 sm:block"
                  >
                    {active.en}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* items panel */}
            <div className="relative z-10 mt-6 rounded-[2rem] border border-cream/10 bg-coal/50 p-4 backdrop-blur-sm md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial="hidden"
                  animate="show"
                  exit={{
                    opacity: 0,
                    y: -10,
                    transition: { duration: 0.22 },
                  }}
                >
                  {active.groups.map((g, gi) => (
                    <GroupBlock key={g.en} group={g} gi={gi} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

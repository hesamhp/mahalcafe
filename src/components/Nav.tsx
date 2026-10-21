import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const links = [
  { id: "menu", label: "منوی آنلاین" },
  { id: "beans", label: "دانهٔ کیلویی" },
  { id: "space", label: "فضای محل" },
  { id: "contact", label: "تماس" },
];

export default function Nav({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-espresso/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 md:px-10">
        {/* logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-baseline gap-3"
          aria-label="کافه محل"
        >
          <span className="font-display text-4xl leading-none text-cream transition-colors group-hover:text-caramel">
            محل
          </span>
          <span className="hidden font-latin text-[10px] uppercase tracking-[0.4em] text-clay sm:block">
            Mahal Cafe
          </span>
        </button>

        {/* links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="group relative flex items-center gap-2 text-sm font-medium text-sand transition-colors hover:text-cream"
            >
              <span className="font-latin text-[10px] tracking-widest text-caramel/80">
                0{i + 1}
              </span>
              {l.label}
              <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-caramel transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* cta */}
        <button
          onClick={() => scrollToId("menu")}
          className="group flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-espresso transition-all duration-300 hover:bg-caramel hover:text-espresso"
        >
          دیدن منو
          <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>
    </motion.header>
  );
}

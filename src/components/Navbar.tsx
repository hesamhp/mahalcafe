import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "../lib/site";
import { InstagramIcon } from "./icons";

const LINKS = [
  { label: "دربارهٔ محل", href: "#about" },
  { label: "منو", key: "menu" as const },
  { label: "محلِ دقیق", href: "#visit" },
];

type Props = {
  context: "home" | "menu";
  onMenu?: () => void;
  onBack?: () => void;
};

export default function Navbar({ context, onMenu, onBack }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  const go = (target?: string) => {
    setOpen(false);
    if (target === "menu") {
      window.setTimeout(() => onMenu?.(), open ? 450 : 0);
    } else if (target && context === "home") {
      window.setTimeout(() => scrollToId(target), open ? 450 : 0);
    } else {
      window.setTimeout(() => onBack?.(), open ? 450 : 0);
    }
  };

  const theme = open
    ? "border-ink/10 bg-paper text-ink"
    : scrolled
      ? "border-paper/10 bg-ink/85 text-paper shadow-lg shadow-black/20 backdrop-blur-md"
      : "border-transparent bg-transparent text-paper";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[70] border-b transition-all duration-500 ${theme}`}
      >
        <nav
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 sm:px-10 ${
            scrolled && !open ? "py-3 sm:py-3.5" : "py-5"
          }`}
        >
          <button
            onClick={() => go("#top")}
            className="text-3xl font-black leading-none tracking-tight"
            aria-label="بازگشت به بالا"
          >
            محل
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.label}
                data-hover
                onClick={() => go("key" in l ? l.key : l.href)}
                className={`group relative text-sm font-medium tracking-wide ${
                  context === "menu" && "key" in l && l.key === "menu"
                    ? "border-b-2 border-current pb-1"
                    : ""
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 right-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:origin-right group-hover:scale-x-100" />
              </button>
            ))}
            {context === "home" ? (
              <button
                data-hover
                onClick={() => go("#visit")}
                className="rounded-full border border-current px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:bg-paper hover:text-ink"
              >
                بیا محل
              </button>
            ) : (
              <button
                data-hover
                onClick={() => onBack?.()}
                className="rounded-full border border-current px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:bg-paper hover:text-ink"
              >
                صفحهٔ اصلی
              </button>
            )}
          </div>

          <button
            className="flex items-center gap-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
          >
            <span className="text-sm">{open ? "ببند" : "منو"}</span>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-paper px-6 pb-8 pt-24 text-ink"
          >
            <div className="flex flex-col">
              {LINKS.map((l, i) => (
                <div key={l.label} className="overflow-hidden border-b border-ink/15">
                  <motion.button
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => go("key" in l ? l.key : l.href)}
                    className="flex w-full items-baseline gap-4 py-4 text-right"
                  >
                    <span className="font-eng text-xs opacity-50">0{i + 1}</span>
                    <span className={`text-4xl font-black ${context === "menu" && "key" in l && l.key === "menu" ? "text-outline-ink" : ""}`}>
                      {l.label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-end justify-between text-sm"
            >
              <div className="leading-relaxed opacity-70">
                هر روز — ۸ صبح تا ۱۱ شب
                <br />
                بلوار عسگری محمدیان، ساری
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
                aria-label="اینستاگرام"
              >
                <InstagramIcon size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

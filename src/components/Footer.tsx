import { Clock, MapPin, Phone } from "lucide-react";
import { Eyebrow, Reveal } from "./ui";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const cells = [
  {
    icon: Clock,
    title: "ساعت‌های محل",
    lines: ["شنبه تا پنجشنبه: ۸ صبح تا ۱۲ شب", "جمعه‌ها: ۹ صبح تا ۱۲ شب"],
  },
  {
    icon: MapPin,
    title: "نشانی",
    lines: ["تهران، خیابان ولیعصر", "نبش کوچهٔ محل، پلاک ۷"],
  },
  {
    icon: Phone,
    title: "تماس و سفارش",
    lines: ["۰۲۱ — ۲۸۴۲ ۷۶۵۴", "تحویل حضوری و بیرون‌بر"],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line bg-coal">
      <div className="mx-auto max-w-[90rem] px-5 pb-10 pt-24 md:px-10">
        <Eyebrow>Find Us — اینجا هستیم</Eyebrow>

        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[1.1] text-cream md:text-7xl">
            یه سر به <span className="text-caramel">محل</span> بزن
          </h2>
        </Reveal>

        {/* info grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cells.map(({ icon: Icon, title, lines }, i) => (
            <Reveal key={title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-3xl border border-cream/10 bg-espresso/50 p-7 transition-colors duration-500 hover:border-caramel/40">
                <span className="grid size-11 place-items-center rounded-full border border-caramel/40 bg-caramel/10 text-caramel transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl text-cream">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="mt-2 text-sm leading-7 text-clay">
                    {l}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {/* instagram strip */}
        <Reveal delay={0.15}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group mt-4 flex items-center justify-between rounded-3xl border border-caramel/30 bg-gradient-to-l from-caramel/15 to-transparent p-7 transition-colors duration-500 hover:border-caramel"
          >
            <span className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-caramel text-espresso">
                <InstagramIcon className="size-5" />
              </span>
              <span>
                <span className="block font-display text-2xl text-cream">
                  اینستاگرام محل
                </span>
                <span
                  dir="ltr"
                  className="block text-right font-latin text-xs tracking-[0.2em] text-clay"
                >
                  @MAHAL.CAFE
                </span>
              </span>
            </span>
            <span className="hidden text-sm font-bold text-caramel transition-transform duration-500 group-hover:-translate-x-2 sm:block">
              فالو کن، ببین امروز چی داریم
            </span>
          </a>
        </Reveal>

        {/* giant word */}
        <div className="pointer-events-none relative mt-16 select-none overflow-hidden">
          <Reveal y={60}>
            <p className="text-outline-strong text-center font-display text-[36vw] leading-[0.8] md:text-[22vw]">
              محل
            </p>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-[11px] text-clay md:flex-row">
          <p>© ۱۴۰۴ کافه محل — همهٔ حقوق محفوظ است</p>
          <p className="font-latin uppercase tracking-[0.3em]">Mahal Cafe</p>
          <p>
            طراحی و توسعه توسط{" "}
            <a
              href="https://instagram.com/hesvmhsp"
              target="_blank"
              rel="noreferrer"
              className="font-latin font-bold tracking-[0.15em] text-cream underline-offset-4 transition-colors duration-300 hover:text-caramel hover:underline"
            >
              HESVM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

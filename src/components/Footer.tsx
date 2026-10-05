import { ArrowUp } from "lucide-react";
import { scrollToTop } from "../lib/site";
import { useReveal } from "../hooks/useReveal";
import { InstagramIcon } from "./icons";

const MAPS_URL = "https://maps.app.goo.gl/eqm1La3iYQReoQBT8";
const HESVM_URL = "https://instagram.com/hesvmhsp";

type Props = {
  context?: "home" | "menu";
  onBack?: () => void;
};

export default function Footer({ context = "home", onBack }: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink pb-8 pt-20 text-paper sm:pt-28">
      {/* soft top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-paper/25 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <div data-reveal className="relative flex flex-col items-center py-10 sm:py-16">
          <span className="mb-6 rounded-full border border-paper/20 px-4 py-1.5 text-xs tracking-[0.3em] opacity-80">
            بیا محل — قهوه‌ات سرد نشه
          </span>

          <button
            data-hover
            onClick={context === "menu" ? onBack : scrollToTop}
            className="group select-none leading-none"
            aria-label={context === "menu" ? "بازگشت به صفحهٔ اصلی" : "بازگشت به بالای صفحه"}
          >
            <span className="block text-[clamp(10rem,34vw,32rem)] font-black tracking-tight transition-transform duration-500 group-hover:-translate-y-2">
              محل
              <span className="inline-block h-[0.06em] w-[0.06em] rounded-full bg-paper align-baseline" />
            </span>
          </button>

          <p className="mt-8 max-w-sm text-center text-sm leading-8 text-paper/50">
            یه مغازه‌ی کوچیک، دوتا میز، بارِ قهوه‌سازی و تو. اگه تا اینجا اومدی و هنوز
            قهوه نخوردی، یه جای کار می‌لنگه.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {context === "home" ? (
              <a
                data-hover
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-paper px-8 py-4 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-1"
              >
                مسیرِ دقیق
              </a>
            ) : (
              <button
                data-hover
                onClick={() => onBack?.()}
                className="rounded-full bg-paper px-8 py-4 text-sm font-bold text-ink transition-transform duration-300 hover:-translate-y-1"
              >
                صفحهٔ اصلی
              </button>
            )}
            <a
              data-hover
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-full border border-paper/25 px-8 py-4 text-sm font-medium transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
            >
              <InstagramIcon size={17} />
              <span className="font-eng tracking-wider" dir="ltr">
                @mahall.cafe
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ---- bottom bar ---- */}
      <div className="border-t border-paper/10">
        <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-center gap-4 px-5 py-6 text-xs text-paper/45 sm:px-10 sm:text-sm">
          {/* right — brand */}
          <span className="text-paper/50">۱۴۰۵ — کافه محل</span>

          {/* center — credit */}
          <a
            data-hover
            href={HESVM_URL}
            target="_blank"
            rel="noreferrer"
            className="group mx-auto flex items-center gap-2.5 text-paper/60 transition-colors hover:text-paper"
          >
            <span className="text-sm">طراحی و توسعه توسط</span>
            <span className="font-eng inline-block rounded-full border border-paper/25 px-3 py-1 text-xs tracking-widest transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-paper group-hover:text-ink" dir="ltr">
              hesvm
            </span>
          </a>

          {/* left — back to top */}
          <button
            data-hover
            onClick={scrollToTop}
            aria-label="بازگشت به بالا"
            className="flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-paper/25 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}

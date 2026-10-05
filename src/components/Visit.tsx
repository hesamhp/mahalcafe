import { ArrowUpLeft, Clock, MapPin, Phone } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { InstagramIcon } from "./icons";

const MAPS_URL = "https://maps.app.goo.gl/eqm1La3iYQReoQBT8";

const ROWS = [
  {
    icon: MapPin,
    label: "آدرس",
    value: "ساری، بلوار عسگری محمدیان، خیابان سالخورده، کافه محل",
    link: MAPS_URL,
  },
  {
    icon: Clock,
    label: "ساعت‌ها",
    value: "شنبه تا پنجشنبه، ۸ تا ۲۳ — جمعه‌ها، ۹ تا ۱۲ شب",
  },
  { icon: Phone, label: "تماس", value: "۰۱۱ - ۳۳ ۴۰ ۴۰ ۴۰" },
  {
    icon: InstagramIcon,
    label: "اینستاگرام",
    value: "@mahall.cafe",
  },
];

/**
 * Plat map: مغازه‌ی محل — نبش سالخورده و بلوار عسگری محمدیان
 */
function MahallMap() {
  return (
    <svg viewBox="0 0 460 400" className="h-auto w-full" role="img" aria-label="نقشهٔ مغازهٔ کافه محل در ساری">
      {/* مغازه‌های روبه‌رو */}
      <g fill="none" stroke="#080808" strokeWidth="2" opacity="0.65" fontFamily="Vazirmatn, sans-serif">
        <rect x="250" y="132" width="84" height="72" rx="2" />
        <text x="272" y="173" fontSize="12" fill="#080808" opacity="0.7">نانوایی</text>
        <rect x="340" y="132" width="96" height="72" rx="2" />
        <text x="358" y="173" fontSize="12" fill="#080808" opacity="0.7">سوپرمارکت</text>
      </g>

      {/* پیاده‌رو */}
      <line x1="0" y1="212" x2="460" y2="212" stroke="#080808" strokeWidth="1.5" strokeDasharray="2 7" opacity="0.45" />

      {/* بلوار عسگری محمدیان */}
      <g stroke="#080808" strokeLinecap="round" fill="none">
        <line x1="0" y1="238" x2="460" y2="238" strokeWidth="2" />
        <line x1="0" y1="322" x2="460" y2="322" strokeWidth="2" />
        {/* لاین وسط}{- */}
        <g strokeDasharray="18 16" strokeWidth="3">
          <line x1="0" y1="280" x2="146" y2="280" opacity="0.45" />
          <line x1="234" y1="280" x2="460" y2="280" opacity="0.45" />
        </g>
      </g>
      <rect x="14" y="264" width="192" height="32" rx="16" fill="#f5f5f3" stroke="#080808" strokeWidth="1.5" />
      <text x="38" y="285" fontSize="15" fill="#080808" fontWeight="800" fontFamily="Vazirmatn, sans-serif">
        بلوار عسگری محمدیان
      </text>

      {/* خیابان سالخورده */}
      <g stroke="#080808" strokeLinecap="round" fill="none">
        <line x1="146" y1="212" x2="146" y2="50" strokeWidth="2" />
        <line x1="234" y1="212" x2="234" y2="50" strokeWidth="2" />
      </g>
      <g transform="translate(190 128)">
        <text fontSize="13" fill="#080808" fontWeight="700" fontFamily="Vazirmatn, sans-serif" textAnchor="middle" transform="rotate(-90)">
          خیابان سالخورده
        </text>
        <path d="M 0 -48 L 5 -36 L -5 -36 Z" fill="#080808" opacity="0.7" />
      </g>

      {/* مسیرهای فرعی کمرنگ */}
      <g stroke="#080808" strokeLinecap="round" fill="none" opacity="0.28">
        <line x1="0" y1="120" x2="146" y2="120" strokeWidth="6" />
        <line x1="234" y1="120" x2="460" y2="120" strokeWidth="6" />
        <line x1="370" y1="212" x2="370" y2="50" strokeWidth="4" />
      </g>
      <text x="36" y="112" fontSize="10.5" fill="#080808" opacity="0.5" fontFamily="Vazirmatn, sans-serif" fontWeight="700">
        خیابان فرهنگ
      </text>
      <text x="374" y="96" fontSize="10.5" fill="#080808" opacity="0.5" fontFamily="Vazirmatn, sans-serif" fontWeight="700">
        خیابان دولت
      </text>

      {/* مغازه‌های سمتِ محل */}
      <g fill="none" stroke="#080808" strokeWidth="2" opacity="0.65" fontFamily="Vazirmatn, sans-serif">
        <rect x="4" y="132" width="66" height="72" rx="2" />
        <text x="22" y="173" fontSize="11.5" fill="#080808" opacity="0.7">سوپری</text>
        <rect x="76" y="132" width="64" height="72" rx="2" />
        <text x="88" y="173" fontSize="11.5" fill="#080808" opacity="0.7">داروخانه</text>
      </g>

      {/* ★ مغازه‌ی محل — نبشِ دقیق */}
      <g>
        <rect x="146" y="132" width="88" height="72" fill="#080808" />
        {/* سایه‌بان */}
        <g stroke="#f5f5f3" strokeWidth="3" opacity="0.9">
          <line x1="154" y1="204" x2="154" y2="196" />
          <line x1="164" y1="204" x2="164" y2="196" />
          <line x1="174" y1="204" x2="174" y2="196" />
          <line x1="184" y1="204" x2="184" y2="196" />
          <line x1="194" y1="204" x2="194" y2="196" />
          <line x1="204" y1="204" x2="204" y2="196" />
          <line x1="214" y1="204" x2="214" y2="196" />
          <line x1="224" y1="204" x2="224" y2="196" />
        </g>
        <text x="190" y="160" fontSize="24" fontWeight="900" fill="#f5f5f3" textAnchor="middle" fontFamily="Vazirmatn, sans-serif">
          محل
        </text>
        <text x="190" y="180" fontSize="8" fill="#f5f5f3" textAnchor="middle" opacity="0.75" fontFamily="Space Grotesk, monospace" letterSpacing="2">
          MAHALL CAFE
        </text>
      </g>

      {/* نشانگر دایره‌ای روی نبش */}
      <g transform="translate(146 204)">
        <circle r="9" fill="#080808" />
        <circle r="3.5" fill="#f5f5f3" />
        <circle r="9" fill="none" stroke="#080808" strokeWidth="2" className="animate-ping-ring" style={{ transformOrigin: "center" }} />
      </g>
      <g transform="translate(66 258)">
        <rect x="-34" y="-17" width="86" height="30" rx="15" fill="#f5f5f3" stroke="#080808" strokeWidth="1.5" />
        <text x="9" y="3.5" fontSize="11.5" fontWeight="800" fill="#080808" textAnchor="middle" fontFamily="Vazirmatn, sans-serif">
          نبشِ اینجاست
        </text>
        <path d="M 18 -6 L 58 -34" stroke="#080808" strokeWidth="1.5" fill="none" />
      </g>

      {/* بوصلة شمال */}
      <g transform="translate(424 372)" fontFamily="Vazirmatn, sans-serif">
        <circle r="16" fill="#f5f5f3" stroke="#080808" strokeWidth="2" />
        <path d="M 0 -9 L 4.5 5 L 0 2 L -4.5 5 Z" fill="#080808" />
        <text y="30" x="-8" fontSize="9.5" fill="#080808" fontWeight="800">
          شمال
        </text>
      </g>
    </svg>
  );
}

export default function Visit() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="visit" ref={ref} className="relative bg-paper py-24 text-ink sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <div data-reveal className="mb-12 flex items-center gap-4">
          <span className="rounded-full border border-ink/30 px-4 py-1.5 text-xs tracking-[0.25em]">
            ( محلِ دقیق )
          </span>
          <span className="h-px flex-1 bg-ink/20" />
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 data-reveal className="text-[clamp(3.2rem,8vw,7.5rem)] font-black leading-[1.08]">
              محلِ رسیدنت
              <br />
              <span className="text-outline-ink">همین‌جاست</span>
            </h2>
            <p data-reveal className="mt-8 max-w-md text-base leading-[2.2] text-ink/60 sm:text-lg">
              یه مغازه‌ی کوچیکِ نبش لبِ بلوار. اگه بویِ دانهٔ تازه‌رست به بینی‌ات خورد
              یعنی رسیدی — تابلوی مشکی سفید کنارِ داروخانه.
            </p>

            <div className="mt-12">
              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  data-reveal
                  data-delay={String(i * 0.06)}
                  className="group flex items-center gap-5 border-t border-ink/12 py-5 last:border-b sm:gap-8 sm:py-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-ink group-hover:text-paper">
                    <r.icon size={19} />
                  </span>
                  <div>
                    <div className="text-xs text-ink/45">{r.label}</div>
                    <div className="mt-1 text-base font-bold leading-8 sm:text-xl">
                      {r.value.startsWith("@") ? (
                        <span dir="ltr" className="font-eng tracking-wider">{r.value}</span>
                      ) : (
                        r.value
                      )}
                      {"link" in r && r.link && (
                        <a
                          data-hover
                          href={r.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 rounded-full border border-ink/30 px-4 py-1.5 text-xs font-bold transition-all duration-300 hover:gap-3 hover:bg-ink hover:text-paper"
                        >
                          مسیریابی
                          <ArrowUpLeft size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal className="relative">
            <a
              data-hover
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group block"
              aria-label="باز کردن لوکیشن در گوگل مپس"
            >
              <div className="overflow-hidden rounded-[28px] border-2 border-ink bg-paper p-4 shadow-[14px_14px_0_0_#080808] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[16px_16px_0_0_#080808]">
                <MahallMap />
              </div>
            </a>
            <p className="mt-5 text-center text-xs text-ink/50">
              مغازه‌ی نبش، دقیقاً روبه‌روی نانوایی. تابلوی مشکی سفید مارو ببین.
            </p>
            <a
              data-hover
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group mx-auto mt-6 flex w-fit items-center gap-3 rounded-2xl bg-ink px-8 py-4 text-sm font-bold text-paper transition-all duration-300 hover:gap-5 hover:-translate-y-0.5"
            >
              مسیر دقیق توی گوگل مپس
              <ArrowUpLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

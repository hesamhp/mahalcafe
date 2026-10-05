import { useEffect } from "react";
import Lenis from "lenis";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, setLenis } from "../lib/site";
import { useReveal } from "../hooks/useReveal";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Props = { onBack: () => void };

/* ---------- data ---------- */

const COFFEE: [string, string][] = [
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
];

const SNACKS: [string, string, string?][] = [
  ["اسنک چیکن بوبی", "۲۰۰", "سیگنچرِ محل — با سسِ مخصوص"],
  ["اسنک پیتزا", "۲۰۰", "گوژن و پنیرِ زیاد"],
];

const DRINKS: [string, string][] = [
  ["آب هندوانه", "۱۴۰"],
  ["آب طالبی", "۱۴۰"],
  ["شیرموز", "۱۴۰"],
  ["چای", "۳۵"],
  ["چای ماسالا", "۵۵"],
];

/* ---------- UI atoms ---------- */

function MenuRow({
  no,
  name,
  price,
  note,
  light = false,
}: {
  no: string;
  name: string;
  price: string;
  note?: string;
  light?: boolean;
}) {
  const line = light ? "border-ink/10 hover:bg-ink" : "border-paper/10 hover:bg-paper";
  return (
    <button
      data-hover
      className={`group flex w-full items-baseline gap-3 border-b px-2 py-3.5 text-right transition-all duration-300 hover:gap-4 hover:px-4 sm:py-5 ${line} ${light ? "text-ink hover:text-paper" : "text-paper hover:text-ink"}`}
    >
      <span className="font-eng w-7 shrink-0 text-[10px] tracking-widest opacity-40 transition-opacity group-hover:opacity-80">
        {no}
      </span>
      <span className="text-sm font-bold sm:text-lg">
        {name}
        {note && (
          <span className="ms-2 hidden text-[11px] font-normal opacity-45 transition-opacity group-hover:opacity-80 sm:inline">
            {note}
          </span>
        )}
      </span>
      <span className="dot-leader h-[2px] min-w-3 flex-1 sm:min-w-4" />
      <span className="shrink-0 text-base font-black tracking-tight sm:text-xl">{price}</span>
    </button>
  );
}

function CategoryHead({
  no,
  title,
  eng,
  light = false,
  delay = 0,
}: {
  no: string;
  title: string;
  eng: string;
  light?: boolean;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      data-delay={String(delay)}
      className="mb-2 flex items-end justify-between gap-4 border-b-2 pb-5"
      style={{ borderColor: light ? "#080808" : "#f5f5f3" }}
    >
      <h2 className="text-4xl font-black leading-none sm:text-5xl">{title}</h2>
      <span className={`font-eng text-[11px] tracking-[0.3em] ${light ? "opacity-40" : "opacity-50"}`} dir="ltr">
        {eng} / ({no})
      </span>
    </div>
  );
}

function Notes({ items, light = false, delay = 0 }: { items: string[]; light?: boolean; delay?: number }) {
  return (
    <ul
      data-reveal
      data-delay={String(delay)}
      className={`mt-8 flex flex-col gap-2 text-[13px] leading-7 ${light ? "text-ink/55" : "text-paper/55"}`}
    >
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${light ? "bg-ink/40" : "bg-paper/40"}`} />
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ---------- page ---------- */

export default function MenuPage({ onBack }: Props) {
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div ref={ref}>
      <Navbar context="menu" onBack={onBack} />

      <main>
        {/* ---- hero ---- */}
        <section className="relative overflow-hidden bg-ink text-paper">
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[380px] w-[80vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(245,245,243,0.06),transparent)] blur-2xl"
            aria-hidden
          />
          <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 sm:px-10 sm:pb-24 sm:pt-40">
            <div data-reveal className="flex items-center gap-4">
              <button
                data-hover
                onClick={onBack}
                aria-label="بازگشت به صفحهٔ اصلی"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:bg-paper hover:text-ink"
              >
                <ArrowRight size={17} />
              </button>
              <span className="rounded-full border border-paper/25 px-4 py-1.5 text-xs tracking-[0.25em]">
                ( منوی محل )
              </span>
            </div>

            <h1
              data-reveal
              className="mt-10 text-[clamp(6rem,22vw,20rem)] font-black leading-[0.9] tracking-tight"
            >
              منو
            </h1>

            <div data-reveal data-delay="0.08" className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-md text-base leading-[2.1] text-paper/65">
                قیمت‌ها به «هزار تومان». دانه همین‌جا رست می‌شه و هر فنجون همون لحظه
                دم می‌شه — عجله داری؟ به‌مون بگو سریع‌تر آماده کنیم.
              </p>
              <div className="font-eng text-xs tracking-[0.3em] opacity-50" dir="ltr">
                MAHALL — SARI / 1405
              </div>
            </div>
          </div>
        </section>

        {/* ---- coffee ---- */}
        <section className="bg-ink pb-24 text-paper sm:pb-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <CategoryHead no="۰۱" title="قهوه" eng="COFFEE" />
                <ul data-reveal data-delay="0.05">
                  {COFFEE.map(([name, price], i) => (
                    <li key={name}>
                      <MenuRow no={String(i + 1).padStart(2, "0")} name={name} price={price} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-2">
                <div data-reveal data-delay="0.1" className="group relative overflow-hidden rounded-3xl border border-paper/15">
                  <img
                    src="/images/hero.jpg"
                    alt="اسپرسوی محل"
                    className="img-bw h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[380px]"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/80 to-transparent p-5">
                    <span className="text-sm font-bold">از شات تا فنجون — ۴۵ ثانیه</span>
                    <span className="font-eng text-[10px] tracking-widest opacity-60" dir="ltr">
                      SINGLE ORIGIN
                    </span>
                  </div>
                </div>
                <Notes
                  delay={0.18}
                  items={[
                    "همهٔ قهوه‌ها به‌صورت دبل کشیده می‌شن — اگه کم‌غلیظ می‌خوای بگو تک.",
                    "شیر تازهٔ روزانه؛ شیر بادام و جو دو سرم هم داریم (+۲۰).",
                    "آیس‌ها با یخِ بلاکی شفاف آماده می‌شن تا رقیق نشن.",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---- drinks (paper) ---- */}
        <section className="bg-paper py-24 text-ink sm:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
            <div className="grid gap-12 lg:grid-cols-5">
              <div className="order-2 lg:order-1 lg:col-span-2">
                <div data-reveal className="overflow-hidden rounded-3xl border border-ink/20">
                  <img
                    src="/images/pour.jpg"
                    alt="ریختنِ شیر به قهوه"
                    className="img-bw h-72 w-full object-cover sm:h-[380px]"
                  />
                </div>
                <Notes
                  light
                  delay={0.1}
                  items={[
                    "آب هندوانه و طالبی تابستونی‌ان — هر روز صبح تازه.",
                    "چای ماسالا با ادویهٔ خودمون، کنارِ اسنک می‌چسبه.",
                  ]}
                />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-3">
                <CategoryHead no="۰۲" title="نوشیدنی" eng="DRINKS" light />
                <ul data-reveal data-delay="0.05">
                  {DRINKS.map(([name, price], i) => (
                    <li key={name}>
                      <MenuRow no={String(i + 1).padStart(2, "0")} name={name} price={price} light />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---- snacks ---- */}
        <section className="bg-ink py-24 text-paper sm:py-32">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
            <CategoryHead no="۰۳" title="اسنک" eng="SNACKS" />
            <ul data-reveal data-delay="0.05" className="mx-auto mt-2 max-w-3xl">
              {SNACKS.map(([name, price, note], i) => (
                <li key={name}>
                  <MenuRow no={String(i + 1).padStart(2, "0")} name={name} price={price} note={note} />
                </li>
              ))}
            </ul>

            <div
              data-reveal
              data-delay="0.15"
              className="mx-auto mt-20 max-w-3xl rounded-3xl border border-paper/20 p-8 text-center sm:p-12"
            >
              <p className="text-xl font-black leading-[1.8] sm:text-3xl">
                فقط دوتا میز داریم —
                <br />
                ولی دوتاتون هم جا دارین
              </p>
              <p className="mt-4 text-sm leading-8 text-paper/55">
                فنجونِ سرامیکی‌اش یه حالِ دیگه‌ست. اگه بشینی، قهوه‌ات رو همراهِ قصهٔ
                محله سرو می‌کنیم.
              </p>
              <button
                data-hover
                onClick={onBack}
                className="group mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl bg-paper px-8 py-4 text-sm font-bold text-ink transition-all duration-300 hover:gap-5"
              >
                برگرد به محل
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <p className="mt-16 text-center font-eng text-[10px] tracking-[0.4em] opacity-40" dir="ltr">
              LAST CALL 22:30
            </p>
          </div>
        </section>
      </main>

      <Footer context="menu" onBack={onBack} />
    </div>
  );
}

/** Convert latin digits to Persian digits */
export const toFa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

/** Persian-number money with thousands separators (٬) */
export const faMoney = (n: number): string =>
  toFa(n).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");

/** Readable Persian money in words: 8,699,000 -> «۸ میلیون و ۶۹۹ هزار» */
export const faToman = (n: number): string => {
  const m = Math.floor(n / 1_000_000);
  const t = Math.floor((n % 1_000_000) / 1000);
  const parts: string[] = [];
  if (m) parts.push(`${toFa(m)} میلیون`);
  if (t) parts.push(`${toFa(t)} هزار`);
  return parts.join(" و ") || "۰";
};

export const cafeInfo = {
  tel: "09908938207",
  phoneFa: "۰۹۹۰ ۸۹۳ ۸۲۰۷",
  address: ["مازندران، ساری — سالخورده", "روبه‌روی سالخورده ۵، کافه محل"],
};

export type MenuItem = {
  name: string;
  en: string;
  price: number;
  tag?: string;
  desc?: string;
};

export type MenuGroup = {
  title: string;
  en: string;
  icon: string;
  items: MenuItem[];
};

export type Category = {
  id: string;
  label: string;
  en: string;
  image: string;
  note: string;
  groups: MenuGroup[];
};

export const categories: Category[] = [
  {
    id: "coffee",
    label: "قهوه",
    en: "Coffee",
    image: "/images/latte.jpg",
    note: "اسپرسوی تازه با دانهٔ ترازِ محل؛ هر شات، لحظه‌ای عصاره‌گیری می‌شود.",
    groups: [
      {
        title: "گرم",
        en: "Hot",
        icon: "hot",
        items: [
          { name: "تک", en: "Single Espresso", price: 95, desc: "اسپرسوی خالص با کرمای طلایی" },
          { name: "دبل", en: "Double Espresso", price: 105, desc: "دو شات پشت سر هم؛ برای روزهای سخت" },
          { name: "آمریکانو", en: "Americano", price: 130, desc: "اسپرسو رقیق‌شده؛ سبک و شفاف" },
          { name: "لاته", en: "Latte", price: 140, tag: "پرفروش", desc: "شیر بخارپز با یک لایه فوم نرم" },
          { name: "کاپوچینو", en: "Cappuccino", price: 140, desc: "متعادل، فوم‌دار و کلاسیک" },
          { name: "موکا", en: "Mocha", price: 150, desc: "قهوه، شکلات داغ و شیر" },
          { name: "کارامل ماکیاتو", en: "Caramel Macchiato", price: 150, desc: "وانیل، شیر و باران کارامل" },
          { name: "فندق ماکیاتو", en: "Hazelnut Macchiato", price: 150, desc: "سیروپ فندق برشته روی اسپرسو" },
        ],
      },
      {
        title: "سرد",
        en: "Iced",
        icon: "iced",
        items: [
          { name: "آیس لاته", en: "Iced Latte", price: 160, desc: "شیر سرد، یخ و اسپرسوی تازه" },
          { name: "آیس آمریکانو", en: "Iced Americano", price: 140, desc: "خنک و تلخ؛ رفیق گرما" },
          { name: "آیس کارامل ماکیاتو", en: "Iced Caramel Macchiato", price: 160, desc: "لایه‌لایه با کارامل و یخ" },
          { name: "آیس موکا", en: "Iced Mocha", price: 160, tag: "پیشنهاد ما", desc: "شکلات سرد و اسپرسو روی یخ" },
          { name: "کاپوچینو", en: "Iced Cappuccino", price: 160, desc: "فوم سرد روی شات دابل" },
        ],
      },
    ],
  },
  {
    id: "snack",
    label: "اسنک",
    en: "Snacks",
    image: "/images/snack.jpg",
    note: "داغ و تازه از گریل؛ همراهِ همیشگی قهوه‌ات.",
    groups: [
      {
        title: "ساندویچ‌های گرم",
        en: "Toasted",
        icon: "snack",
        items: [
          { name: "اسنک چیکن بوبی", en: "Chicken Bobby", price: 200, tag: "امضای محل", desc: "مرغ گریل، پنیر آب‌شده و سس مخصوص محل" },
          { name: "اسنک پیتزا", en: "Pizza Snack", price: 200, desc: "تست ترد، پپرونی و پنیر کش‌دار" },
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "نوشیدنی",
    en: "Drinks",
    image: "/images/melon.jpg",
    note: "خنک، تازه و شیرین؛ مخصوص روزهایی که هوا تر است.",
    groups: [
      {
        title: "خنک و تازه",
        en: "Fresh & Cold",
        icon: "fresh",
        items: [
          { name: "آب هندوانه", en: "Watermelon Juice", price: 140, desc: "خالص، بدون حتی یک قطره آب اضافه" },
          { name: "آب طالبی", en: "Cantaloupe Juice", price: 140, desc: "شیرینی ملایم؛ بزد به گرما" },
          { name: "شیرموز", en: "Banana Milk", price: 140, desc: "موز رسیده با شیر تازه" },
        ],
      },
      {
        title: "چای",
        en: "Tea",
        icon: "tea",
        items: [
          { name: "چای", en: "Black Tea", price: 35, desc: "سیلانِ دم‌کشیده، با استکان کمر باریک" },
          { name: "چای ماسالا", en: "Masala Chai", price: 150, tag: "پیشنهاد ما", desc: "ادویه‌های هندی روی شعلهٔ ملایم" },
        ],
      },
    ],
  },
];

/* ---------------- Coffee by the kilo (100% Robusta) ---------------- */

export type BulkPack = {
  kg: number;
  price: number; // تومان
  tag?: string;
};

export const bulkPacks: BulkPack[] = [
  { kg: 1, price: 3000000 },
  { kg: 3, price: 8699000 },
  { kg: 5, price: 14699000 },
  { kg: 10, price: 28999000, tag: "اقتصادی‌ترین" },
];

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
  telegram: "https://t.me/cwyed",
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
    note: "دانهٔ تازه‌رست، هر شات با حوصله عصاره‌گیری می‌شه؛ اینجا کافه محله!",
    groups: [
      {
        title: "گرم",
        en: "Hot",
        icon: "hot",
        items: [
          { name: "دبل", en: "Double Espresso", price: 105, desc: "دو شات پشت سر هم؛ رفیق روزای سخت" },
          { name: "آمریکانو", en: "Americano", price: 130, desc: "سبُک و شفاف؛ برای کسی که قهوه رو خالص دوست داره" },
          { name: "لاته", en: "Latte", price: 140, tag: "پرفروش", desc: "شیر بخارپز، فوم نرم و کلی حس خوب" },
          { name: "کاپوچینو", en: "Cappuccino", price: 140, desc: "کلاسیکِ همیشگی؛ فوم‌دار و بی‌نقص" },
          { name: "موکا", en: "Mocha", price: 150, desc: "قهوه + شکلات داغ؛ ترکیبی که عاشقشی" },
          { name: "کارامل ماکیاتو", en: "Caramel Macchiato", price: 150, desc: "وانیل، شیر و یه بارون کارامل روش" },
          { name: "فندق ماکیاتو", en: "Hazelnut Macchiato", price: 150, desc: "عطر فندق برشته روی اسپرسوی داغ" },
        ],
      },
      {
        title: "سرد",
        en: "Iced",
        icon: "iced",
        items: [
          { name: "آیس لاته", en: "Iced Latte", price: 160, desc: "سرد و خوشمزه؛ مخصوص روزای گرم ساری" },
          { name: "آیس آمریکانو", en: "Iced Americano", price: 140, desc: "تلخ و خنک؛ بهترین رفیقِ تابستون" },
          { name: "آیس کارامل ماکیاتو", en: "Iced Caramel Macchiato", price: 160, desc: "لایه‌لایه با کارامل و یخ؛ چشمت حال میاد" },
          { name: "آیس موکا", en: "Iced Mocha", price: 160, tag: "پیشنهاد ما", desc: "شکلات سرد و اسپرسو رو یخ؛ امتحان کن!" },
          { name: "کاپوچینو", en: "Iced Cappuccino", price: 160, desc: "فوم سرد رو شات دابل؛ متفاوت و خوب" },
        ],
      },
    ],
  },
  {
    id: "snack",
    label: "اسنک",
    en: "Snacks",
    image: "/images/snack.jpg",
    note: "داغ و تازه از گریل؛ بهترین رفیق قهوه‌ت!",
    groups: [
      {
        title: "ساندویچ‌های گرم",
        en: "Toasted",
        icon: "snack",
        items: [
          { name: "اسنک چیکن بوبی", en: "Chicken Bobby", price: 200, tag: "پرفروش", desc: "مرغ گریل، پنیر آب‌شده و سس مخصوص محل" },
          { name: "اسنک پیتزا", en: "Pizza Snack", price: 200, desc: "تُست ترد، پپرونی و پنیر کش‌دار؛ عالیه!" },
        ],
      },
    ],
  },
  {
    id: "drinks",
    label: "نوشیدنی",
    en: "Drinks",
    image: "/images/melon.jpg",
    note: "خنک، تازه و شیرین؛ مخصوص روزایی که هوا گرمه!",
    groups: [
      {
        title: "خنک و تازه",
        en: "Fresh & Cold",
        icon: "fresh",
        items: [
          { name: "آب هندوانه", en: "Watermelon Juice", price: 140, desc: "خالص خالص؛ حتی یه قطره آب اضافه نداره" },
          { name: "آب طالبی", en: "Cantaloupe Juice", price: 140, desc: "شیرین و ملایم؛ حسابی خنکت می‌کنه" },
          { name: "شیرموز", en: "Banana Milk", price: 140, desc: "موز رسیده با شیر تازه؛ ساده و خوشمزه" },
        ],
      },
      {
        title: "چای",
        en: "Tea",
        icon: "tea",
        items: [
          { name: "چای", en: "Black Tea", price: 35, desc: "سیلانِ دم‌کشیده، با استکان کمرباریک و خاطره" },
          { name: "چای ماسالا", en: "Masala Chai", price: 150, tag: "پیشنهاد ما", desc: "ادویه‌ای و معطر؛ باید امتحانش کنی!" },
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

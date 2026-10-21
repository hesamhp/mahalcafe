/** Convert latin digits to Persian digits */
export const toFa = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

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

export const totalItems = categories.reduce(
  (acc, c) => acc + c.groups.reduce((a, g) => a + g.items.length, 0),
  0
);

/* ---------------- Coffee beans by the kilo ---------------- */

export type Bean = {
  id: string;
  name: string;
  en: string;
  note: string;
  perKg: number;
  roast: number; // 1..5
};

export const beans: Bean[] = [
  {
    id: "mahal-blend",
    name: "ترکیب اسپرسوی محل",
    en: "House Blend",
    note: "شکلاتی، کاراملی؛ همان طعمی که اینجا می‌نوشی",
    perKg: 680,
    roast: 4,
  },
  {
    id: "yirgacheffe",
    name: "عربیکا یرگاچف",
    en: "Ethiopia Yirgacheffe",
    note: "گل‌دار، مرکبات، اسیدیتهٔ روشن؛ مخصوص دمی",
    perKg: 840,
    roast: 2,
  },
  {
    id: "robusta",
    name: "روبوستای ویتنام",
    en: "Vietnam Robusta",
    note: "کافئین بالا، کرمای ضخیم؛ جفتِ خوب شیر",
    perKg: 560,
    roast: 5,
  },
  {
    id: "french",
    name: "ترکیب فرانسه",
    en: "French Dark Roast",
    note: "رست تیره، دودیِ ملایم و تلخیِ آکنده",
    perKg: 720,
    roast: 5,
  },
];

export type Weight = { id: string; label: string; factor: number };

export const weights: Weight[] = [
  { id: "250", label: "۲۵۰ گرم", factor: 0.25 },
  { id: "500", label: "۵۰۰ گرم", factor: 0.5 },
  { id: "1000", label: "۱ کیلو", factor: 1 },
];

export type Grind = { id: string; label: string; icon: string };

export const grinds: Grind[] = [
  { id: "whole", label: "دانهٔ کامل", icon: "bean" },
  { id: "espresso", label: "آسیاب اسپرسو", icon: "zap" },
  { id: "filter", label: "قهوه‌جوش و دمی", icon: "coffee" },
  { id: "cold", label: "کلدبرو", icon: "snow" },
];

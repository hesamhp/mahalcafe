import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { toFa } from "../lib/data";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    let v = 0;
    const t = window.setInterval(() => {
      v += Math.floor(Math.random() * 11) + 5;
      if (v >= 100) {
        v = 100;
        window.clearInterval(t);
        if (!done.current) {
          done.current = true;
          window.setTimeout(onDone, 400);
        }
      }
      setCount(v);
    }, 85);
    return () => window.clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
    >
      {/* latin tag */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 1.6, times: [0, 0.4, 0.7, 1] }}
        className="absolute top-8 font-latin text-[10px] uppercase tracking-[0.5em] text-clay"
      >
        Mahal — Specialty Coffee
      </motion.p>

      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-display text-[26vw] leading-[0.95] text-cream md:text-[13rem]"
        >
          محل
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center gap-2 text-sand"
      >
        <span className="size-1.5 animate-pulse rounded-full bg-caramel" />
        <span className="text-sm font-medium">دارمی قهوه رو آماده می‌کنیم</span>
      </motion.div>

      <div className="absolute bottom-8 left-8 font-display text-6xl text-cream/90 md:bottom-10 md:left-12 md:text-8xl">
        {toFa(count)}
        <span className="text-2xl text-caramel md:text-4xl">٪</span>
      </div>

      <div className="absolute bottom-10 right-8 h-px w-40 bg-cream/10 md:right-12">
        <motion.div
          className="h-full bg-caramel"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
}

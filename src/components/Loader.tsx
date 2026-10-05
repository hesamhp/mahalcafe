import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1500);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink text-paper"
      exit={{ y: "-100%", transition: { duration: 0.95, ease: [0.83, 0, 0.17, 1] } }}
    >
      <div className="overflow-hidden px-6">
        <motion.h1
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[30vw] font-black leading-[0.9] tracking-tight sm:text-[24vw]"
        >
          محل
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-6 text-xs font-medium tracking-[0.15em] opacity-70 sm:text-sm"
      >
        کافه‌ی محلهٔ تو — از ۱۴۰۵
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: count / 100 }}
        transition={{ ease: "linear", duration: 0.1 }}
        className="absolute bottom-0 right-0 h-[2px] w-full origin-right bg-paper"
      />

      <div className="absolute bottom-6 left-6 font-eng text-sm tracking-widest opacity-70 sm:bottom-10 sm:left-10">
        {String(count).padStart(3, "0")}%
      </div>
      <div className="absolute bottom-6 right-6 text-xs opacity-50 sm:bottom-10 sm:right-10">
        داریم قهوه رو دم می‌کنیم…
      </div>
    </motion.div>
  );
}

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!fine) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: hovering ? 2.6 : 1,
          opacity: hovering ? 1 : 0.65,
          backgroundColor: hovering ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[19px] -mt-[19px] h-10 w-10 rounded-full border border-white mix-blend-difference"
      />
    </>
  );
}

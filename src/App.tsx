import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ScrollTrigger } from "./lib/site";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";

type Page = "home" | "menu";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<Page>("home");
  const onDone = useCallback(() => setLoaded(true), []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 });

  useEffect(() => {
    document.documentElement.style.overflow = loaded ? "" : "hidden";
    if (loaded) window.setTimeout(() => ScrollTrigger.refresh(), 320);
  }, [loaded, page]);

  const goToMenu = useCallback(() => {
    setPage("menu");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  const goToHome = useCallback(() => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="bg-ink text-paper">
      <AnimatePresence>{!loaded && <Loader onDone={onDone} />}</AnimatePresence>

      <Cursor />

      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[75] h-[3px] origin-right bg-white mix-blend-difference"
      />

      {/* film grain */}
      <div className="noise pointer-events-none fixed inset-0 z-[65] opacity-[0.05]" />

      <AnimatePresence mode="wait">
        {page === "home" ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <HomePage loaded={loaded} goMenu={goToMenu} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MenuPage onBack={goToHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

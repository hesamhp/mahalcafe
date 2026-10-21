import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { initLenis } from "./lib/scroll";
import { Noise } from "./components/ui";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import MenuSection from "./components/MenuSection";
import Beans from "./components/Beans";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initLenis();
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-espresso font-sans text-cream">
      <Noise />
      <Cursor />

      <AnimatePresence>
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Nav ready={!loading} />

      <main>
        <Hero ready={!loading} />
        <About />
        <MenuSection />
        <Beans />
      </main>

      <Footer />
    </div>
  );
}

import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Features } from "./components/Features";
import { ProductDemo } from "./components/ProductDemo";
import { Agents } from "./components/Agents";
import { Surfaces } from "./components/Surfaces";
import { BottomCta } from "./components/BottomCta";

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      <Marquee />
      <Features />
      <div id="system">
        <ProductDemo />
      </div>
      <Agents />
      <Surfaces />
      <BottomCta />
      <footer className="border-t border-line py-8 text-center text-sm text-mist">
        <p>© {new Date().getFullYear()} UiWorks. All rights reserved.</p>
      </footer>
    </div>
  );
}

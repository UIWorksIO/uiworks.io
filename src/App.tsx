import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Surfaces } from "./components/Surfaces";
import { BottomCta } from "./components/BottomCta";

export default function App() {
  return (
    <div className="bg-grid-fade min-h-screen">
      <Hero />
      <Features />
      <Surfaces />
      <BottomCta />
      <footer className="border-t border-white/5 py-8 text-center text-sm text-mist/70">
        <p>© {new Date().getFullYear()} UiWorks. All rights reserved.</p>
      </footer>
    </div>
  );
}

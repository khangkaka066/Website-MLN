import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { StickyNav } from "./components/StickyNav";
import { HeroSection } from "./components/HeroSection";
import { GameVerifyClaims } from "./components/GameVerifyClaims";
import { TheoryCards } from "./components/TheoryCards";
import { FiveStepsStepper } from "./components/FiveStepsStepper";
import { ApplyStepsWalkthrough } from "./components/ApplyStepsWalkthrough";
import { BeforeAfterComparison } from "./components/BeforeAfterComparison";
import { ThankYouFooter } from "./components/ThankYouFooter";
import PlayPage from "./pages/PlayPage";

const TOASTER_OPTIONS = {
  classNames: {
    toast:
      "rounded-xl bg-card text-card-foreground border border-border shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]",
  },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />
      <main>
        <HeroSection />
        <GameVerifyClaims />
        <TheoryCards />
        <FiveStepsStepper />
        <ApplyStepsWalkthrough />
        <BeforeAfterComparison />
      </main>
      <ThankYouFooter />
      <Toaster position="bottom-right" toastOptions={TOASTER_OPTIONS} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;

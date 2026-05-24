import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { StickyNav } from "./components/StickyNav";
import { HeroSection } from "./components/HeroSection";
import { GameFindAIMistakes } from "./components/GameFindAIMistakes";
import { TheoryCards } from "./components/TheoryCards";
import { FiveStepsStepper } from "./components/FiveStepsStepper";
import { ApplyStepsWalkthrough } from "./components/ApplyStepsWalkthrough";
import { BeforeAfterComparison } from "./components/BeforeAfterComparison";
import { ThankYouFooter } from "./components/ThankYouFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />
      <main>
        <HeroSection />
        <GameFindAIMistakes />
        <TheoryCards />
        <FiveStepsStepper />
        <ApplyStepsWalkthrough />
        <BeforeAfterComparison />
      </main>
      <ThankYouFooter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "rounded-xl bg-card text-card-foreground border border-border shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]",
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

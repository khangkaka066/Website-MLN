import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FOOTER } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const ThankYouFooter = () => {
  return (
    <footer
      data-testid="footer-section"
      className="relative isolate overflow-hidden bg-[hsl(222_47%_11%)] py-16 text-white sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, hsl(174 62% 60%), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, hsl(24 94% 60%), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <RevealOnScroll>
          <Badge className="rounded-full border-0 bg-white/10 text-white hover:bg-white/10">
            <Sparkles className="mr-1.5 size-3.5" strokeWidth={2.25} />
            Kết thúc
          </Badge>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {FOOTER.title}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/80">
            {FOOTER.subtitle}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="mt-5 font-display text-base font-semibold text-[hsl(174_62%_70%)] sm:text-lg">
            {FOOTER.signature}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button
              data-testid="footer-replay-button"
              size="lg"
              variant="outline"
              onClick={() => smoothScrollTo("game")}
              className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <RotateCcw className="mr-2 size-4" strokeWidth={2} />
              Chơi lại game
            </Button>
            <Button
              data-testid="footer-restart-button"
              size="lg"
              onClick={() => smoothScrollTo("hero")}
              className="rounded-xl bg-[hsl(174_62%_45%)] text-white hover:bg-[hsl(174_62%_38%)]"
            >
              Về đầu trang
            </Button>
          </div>
        </RevealOnScroll>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/50">
          <Heart className="size-3.5" strokeWidth={2} />
          AI Verification Card — dành cho sinh viên Việt Nam
        </div>
      </div>
    </footer>
  );
};

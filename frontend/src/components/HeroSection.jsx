import {
  BadgeCheck,
  Sparkles,
  Target,
  Brain,
  ArrowRight,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HERO } from "@/data/content";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "./RevealOnScroll";

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const miniCardIcons = [Brain, Target, BadgeCheck, Sparkles];

export const HeroSection = () => {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[hsl(48_100%_97%)] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="hero-blob pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full opacity-80"
      />
      <div
        aria-hidden
        className="hero-blob pointer-events-none absolute bottom-0 -left-24 h-56 w-56 rounded-full opacity-60"
      />
      <div
        aria-hidden
        className="noise-overlay absolute inset-0 opacity-40"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left */}
        <div className="lg:col-span-7">
          <RevealOnScroll>
            <Badge
              className="rounded-full border-0 bg-[hsl(24_100%_93%)] px-3 py-1 text-[hsl(24_94%_35%)] hover:bg-[hsl(24_100%_93%)]"
              data-testid="hero-eyebrow"
            >
              <Sparkles className="mr-1.5 size-3.5" strokeWidth={2.25} />
              {HERO.eyebrow}
            </Badge>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {HERO.title}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mt-3 inline-flex items-center gap-2 font-display text-base font-semibold text-[hsl(174_62%_28%)] sm:text-lg">
              <span className="inline-block size-2 rounded-full bg-[hsl(174_62%_33%)]" />
              Nền lý luận: <span className="underline decoration-[hsl(24_94%_55%)] decoration-2 underline-offset-4">{HERO.highlight}</span>
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {HERO.subtitle}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                data-testid="hero-start-button"
                size="lg"
                onClick={() => smoothScrollTo("game")}
                className="group rounded-xl bg-primary px-5 text-primary-foreground transition-colors hover:bg-[hsl(var(--primary)/0.92)]"
              >
                <Gamepad2 className="mr-2 size-5" strokeWidth={2} />
                Chơi game tìm lỗi AI
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
              </Button>
              <Button
                data-testid="hero-steps-button"
                size="lg"
                variant="outline"
                onClick={() => smoothScrollTo("steps")}
                className="rounded-xl border-border bg-card hover:bg-secondary"
              >
                Xem 5 bước kiểm chứng
              </Button>
            </div>
          </RevealOnScroll>

          <StaggerGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {HERO.bullets.map((b, i) => {
              const Icon = miniCardIcons[i % miniCardIcons.length];
              return (
                <StaggerItem key={b}>
                  <Card className="flex items-start gap-3 rounded-2xl border-border bg-card p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)]">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(205_90%_93%)] text-[hsl(205_90%_35%)] ring-1 ring-border">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                    <p className="text-sm font-medium leading-relaxed text-foreground">
                      {b}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>

        {/* Right — stylised card */}
        <RevealOnScroll className="lg:col-span-5" delay={0.15}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[28px] bg-[hsl(24_100%_93%)] opacity-70 blur-md"
            />
            <Card className="relative rounded-3xl border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] sm:p-8">
              <div className="flex items-center justify-between">
                <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] px-3 py-1 text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
                  Card #001
                </Badge>
                <span className="font-mono-doc text-xs text-muted-foreground">
                  v1.0
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground">
                AI Verification Card
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                5 bước dừng nhịp trước khi dùng nội dung AI
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  { n: 1, t: "Giải ảo & Kiểm tra Nguồn", c: "hsl(205 90% 45%)" },
                  { n: 2, t: "Định vị bối cảnh & Xác minh", c: "hsl(174 62% 33%)" },
                  { n: 3, t: "Đối chiếu khách quan & Bias", c: "hsl(24 94% 55%)" },
                  { n: 4, t: "Kiểm chứng qua Thực tiễn", c: "hsl(152 60% 35%)" },
                  { n: 5, t: "Biện chứng & Quyết định", c: "hsl(222 47% 11%)" },
                ].map((s) => (
                  <li
                    key={s.t}
                    className="flex items-center gap-3 rounded-xl bg-secondary px-3 py-2"
                  >
                    <span
                      className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg font-mono-doc text-xs font-bold text-white"
                      style={{ background: s.c }}
                    >
                      {String(s.n).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {s.t}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-dashed border-border bg-[hsl(48_100%_97%)] p-3">
                <p className="font-mono-doc text-xs leading-relaxed text-muted-foreground">
                  // Khi bạn sắp copy output AI vào bài → mở card này ra.
                </p>
              </div>
            </Card>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

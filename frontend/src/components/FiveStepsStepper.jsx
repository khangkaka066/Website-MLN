import { useState } from "react";
import {
  Shield,
  MapPin,
  Scale,
  FlaskConical,
  Sparkles as SparkIcon,
  CheckCircle2,
  ListChecks,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { STEPS } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";

const ACCENTS = {
  blue: {
    chip: "bg-[hsl(205_90%_93%)] text-[hsl(205_90%_30%)]",
    ring: "ring-[hsl(205_90%_45%/0.35)]",
    bar: "bg-[hsl(205_90%_45%)]",
    soft: "bg-[hsl(205_90%_96%)]",
  },
  teal: {
    chip: "bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)]",
    ring: "ring-[hsl(174_62%_33%/0.35)]",
    bar: "bg-[hsl(174_62%_33%)]",
    soft: "bg-[hsl(174_55%_95%)]",
  },
  orange: {
    chip: "bg-[hsl(24_100%_93%)] text-[hsl(24_94%_35%)]",
    ring: "ring-[hsl(24_94%_55%/0.35)]",
    bar: "bg-[hsl(24_94%_55%)]",
    soft: "bg-[hsl(24_100%_95%)]",
  },
  green: {
    chip: "bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)]",
    ring: "ring-[hsl(152_60%_35%/0.35)]",
    bar: "bg-[hsl(152_60%_35%)]",
    soft: "bg-[hsl(152_55%_95%)]",
  },
  ink: {
    chip: "bg-[hsl(222_47%_93%)] text-[hsl(222_47%_11%)]",
    ring: "ring-[hsl(222_47%_11%/0.25)]",
    bar: "bg-[hsl(222_47%_11%)]",
    soft: "bg-[hsl(210_40%_95%)]",
  },
};

const ICONS = [Shield, MapPin, Scale, FlaskConical, SparkIcon];

export const FiveStepsStepper = () => {
  const [active, setActive] = useState(1);
  const [completed, setCompleted] = useState(() => new Set());
  const current = STEPS.find((s) => s.n === active) || STEPS[0];
  const accent = ACCENTS[current.accent];
  const Icon = ICONS[current.n - 1] || Shield;
  const progress = (completed.size / STEPS.length) * 100;

  const toggleComplete = (n) => {
    const next = new Set(completed);
    if (next.has(n)) next.delete(n);
    else next.add(n);
    setCompleted(next);
  };

  return (
    <section
      id="steps"
      data-testid="steps-section"
      className="scroll-mt-24 bg-[hsl(210_40%_98%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
              <ListChecks className="mr-1.5 size-3.5" strokeWidth={2.25} />
              Nội dung chính
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            5 Bước trước khi dùng nội dung AI trong học thuật
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Mỗi bước dừng lại một nhịp. Quay về cốt lõi: thực tiễn là tiêu chuẩn của chân lý.
          </p>
        </RevealOnScroll>

        {/* Progress + step pills */}
        <RevealOnScroll delay={0.05}>
          <Card className="mt-7 rounded-2xl border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-foreground">
                  Tiến độ của bạn
                </span>
                <span className="font-mono-doc text-xs text-muted-foreground">
                  {completed.size}/{STEPS.length} đã “học thuộc”
                </span>
              </div>
              <span className="font-mono-doc text-xs text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress
              value={progress}
              data-testid="steps-progress"
              className="mt-3 h-2"
            />
          </Card>
        </RevealOnScroll>

        {/* Desktop layout */}
        <div className="mt-6 hidden grid-cols-12 gap-6 lg:grid">
          {/* Left: vertical step list */}
          <RevealOnScroll className="col-span-5" delay={0.05}>
            <ol className="space-y-3">
              {STEPS.map((s, idx) => {
                const A = ACCENTS[s.accent];
                const isActive = s.n === active;
                const isDone = completed.has(s.n);
                const StepIcon = ICONS[idx] || Shield;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      data-testid={`step-${s.n}-trigger`}
                      onClick={() => setActive(s.n)}
                      className={`group relative w-full rounded-2xl border bg-card p-4 text-left transition-colors duration-200 ${
                        isActive
                          ? "border-transparent shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35)]"
                          : "border-border hover:bg-secondary"
                      }`}
                      style={
                        isActive
                          ? { boxShadow: "0 18px 40px -22px rgba(15,23,42,0.35)" }
                          : undefined
                      }
                    >
                      <span
                        className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full transition-opacity ${A.bar} ${
                          isActive ? "opacity-100" : "opacity-30"
                        }`}
                      />
                      <div className="flex items-start gap-3 pl-3">
                        <span
                          className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${A.chip} ${A.ring}`}
                        >
                          <StepIcon className="size-5" strokeWidth={2} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="rounded-full border-border bg-card font-mono-doc text-[11px] uppercase tracking-wider"
                            >
                              Bước {s.n}
                            </Badge>
                            {isDone && (
                              <Badge className="rounded-full border-0 bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)] hover:bg-[hsl(152_55%_92%)]">
                                <CheckCircle2 className="mr-1 size-3.5" strokeWidth={2.25} />
                                Đã hiểu
                              </Badge>
                            )}
                          </div>
                          <p className="mt-1 font-display text-base font-bold text-foreground">
                            {s.title}
                          </p>
                          <p className="font-mono-doc text-xs text-muted-foreground">
                            {s.en}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </RevealOnScroll>

          {/* Right: detail panel */}
          <RevealOnScroll className="col-span-7" delay={0.1}>
            <Card
              data-testid="step-detail-card"
              className={`sticky top-20 rounded-2xl border-border bg-card p-6 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35)] sm:p-8`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-2xl ring-1 ${accent.chip} ${accent.ring}`}
                  >
                    <Icon className="size-6" strokeWidth={2} />
                  </span>
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-full border-border bg-card font-mono-doc text-[11px] uppercase tracking-wider"
                    >
                      Bước {current.n} / 5
                    </Badge>
                    <h3 className="mt-1 font-display text-2xl font-extrabold text-foreground">
                      {current.title}
                    </h3>
                    <p className="font-mono-doc text-xs text-muted-foreground">
                      {current.en}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={completed.has(current.n) ? "outline" : "default"}
                  data-testid={`step-${current.n}-complete-button`}
                  onClick={() => toggleComplete(current.n)}
                  className="rounded-xl"
                >
                  <CheckCircle2 className="mr-2 size-4" strokeWidth={2} />
                  {completed.has(current.n) ? "Đã hiểu" : "Đánh dấu đã hiểu"}
                </Button>
              </div>

              <div className={`mt-6 rounded-2xl ${accent.soft} p-4 sm:p-5`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Tư duy cốt lõi
                </p>
                <p className="mt-1 text-base font-medium leading-relaxed text-foreground">
                  {current.core}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Hành động kiểm chứng
                </p>
                <ul className="mt-2 space-y-2.5">
                  {current.actions.map((a, i) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 rounded-xl bg-secondary p-3"
                    >
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-card font-mono-doc text-[11px] font-bold text-foreground ring-1 ring-border">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-foreground sm:text-base">
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  className="rounded-xl"
                  data-testid="step-prev-button"
                  onClick={() => setActive((n) => Math.max(1, n - 1))}
                  disabled={current.n === 1}
                >
                  ← Bước trước
                </Button>
                <Button
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
                  data-testid="step-next-button"
                  onClick={() => setActive((n) => Math.min(STEPS.length, n + 1))}
                  disabled={current.n === STEPS.length}
                >
                  Bước tiếp →
                </Button>
              </div>
            </Card>
          </RevealOnScroll>
        </div>

        {/* Mobile layout: Accordion */}
        <div className="mt-6 lg:hidden">
          <Accordion type="single" collapsible defaultValue="step-1" className="space-y-3">
            {STEPS.map((s, idx) => {
              const A = ACCENTS[s.accent];
              const StepIcon = ICONS[idx] || Shield;
              return (
                <AccordionItem
                  key={s.n}
                  value={`step-${s.n}`}
                  data-testid={`step-${s.n}-accordion`}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex w-full items-center gap-3 pr-2">
                      <span
                        className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ${A.chip} ${A.ring}`}
                      >
                        <StepIcon className="size-4" strokeWidth={2} />
                      </span>
                      <div className="flex-1 text-left">
                        <span className="block font-mono-doc text-[11px] uppercase tracking-wider text-muted-foreground">
                          Bước {s.n}
                        </span>
                        <span className="block font-display text-sm font-bold text-foreground">
                          {s.title}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="font-mono-doc text-xs text-muted-foreground">
                      {s.en}
                    </p>
                    <div className={`mt-3 rounded-xl ${A.soft} p-3`}>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
                        Tư duy cốt lõi
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground">
                        {s.core}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2">
                      {s.actions.map((a, i) => (
                        <li
                          key={a}
                          className="flex items-start gap-2 rounded-lg bg-secondary p-2.5"
                        >
                          <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-card font-mono-doc text-[10px] font-bold text-foreground ring-1 ring-border">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed text-foreground">
                            {a}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

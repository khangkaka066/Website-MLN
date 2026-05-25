import { useState } from "react";
import { Wand2, ArrowRight, CheckCircle2, XCircle, Search, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APPLY_STEPS, APPLY_CLAIM } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";

export const ApplyStepsWalkthrough = () => {
  const [active, setActive] = useState(1);
  const current = APPLY_STEPS.find((s) => s.n === active) || APPLY_STEPS[0];

  return (
    <section
      id="apply"
      data-testid="apply-steps-section"
      className="scroll-mt-24 bg-[hsl(48_100%_97%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(24_100%_93%)] text-[hsl(24_94%_35%)] hover:bg-[hsl(24_100%_93%)]">
              <Wand2 className="mr-1.5 size-3.5" strokeWidth={2.25} />
              Walkthrough
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Áp dụng 5 bước lên một câu khẳng định của game
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cuốn phải — bạn sẽ thấy “không gian hộp đen” của AI bị mở từng lớp.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <Card className="mt-6 rounded-2xl border-dashed border-[hsl(24_94%_55%/0.4)] bg-[hsl(24_100%_96%)] p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-card text-[hsl(24_94%_30%)] ring-1 ring-border">
                <Quote className="size-4" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(24_94%_30%)]">
                  {APPLY_CLAIM.label}
                </p>
                <p
                  data-testid="apply-claim-text"
                  className="mt-1 font-display text-base font-semibold leading-relaxed text-foreground sm:text-lg"
                >
                  “{APPLY_CLAIM.text}”
                </p>
              </div>
            </div>
          </Card>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Tabs */}
          <RevealOnScroll className="lg:col-span-4">
            <ol
              data-testid="apply-steps-tabs"
              className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-2 lg:overflow-visible"
            >
              {APPLY_STEPS.map((s) => {
                const isActive = s.n === active;
                return (
                  <li key={s.n} className="shrink-0 lg:w-full">
                    <button
                      type="button"
                      data-testid={`apply-tab-${s.n}`}
                      onClick={() => setActive(s.n)}
                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors duration-200 ${
                        isActive
                          ? "border-transparent bg-primary text-primary-foreground shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)]"
                          : "border-border bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`font-mono-doc text-[11px] uppercase tracking-wider ${
                          isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        Bước {s.n}
                      </span>
                      <p className="font-display text-sm font-bold">
                        {s.label.split(":")[1]?.trim() || s.label}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </RevealOnScroll>

          {/* Detail */}
          <RevealOnScroll className="lg:col-span-8" delay={0.05}>
            <Card
              data-testid="apply-step-detail"
              className="rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-8"
            >
              <h3 className="font-display text-xl font-extrabold text-foreground sm:text-2xl">
                {current.label}
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-[hsl(205_90%_96%)] p-4">
                  <div className="flex items-center gap-2">
                    <Search
                      className="size-4 text-[hsl(205_90%_30%)]"
                      strokeWidth={2.25}
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(205_90%_30%)]">
                      Bạn đang làm gì
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {current.doing}
                  </p>
                </div>
                <div className="rounded-xl bg-[hsl(24_100%_94%)] p-4">
                  <div className="flex items-center gap-2">
                    <Wand2
                      className="size-4 text-[hsl(24_94%_30%)]"
                      strokeWidth={2.25}
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(24_94%_30%)]">
                      Cách kiểm chứng
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {current.how}
                  </p>
                </div>
                <div className="rounded-xl bg-[hsl(152_55%_94%)] p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="size-4 text-[hsl(152_60%_22%)]"
                      strokeWidth={2.25}
                    />
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(152_60%_22%)]">
                      Kết quả
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {current.result}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                {/* <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-full border-border bg-card"
                  >
                    <XCircle className="mr-1 size-3.5 text-[hsl(0_72%_42%)]" />
                    Loại bỏ cái sai
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full border-border bg-card"
                  >
                    <CheckCircle2 className="mr-1 size-3.5 text-[hsl(152_60%_30%)]" />
                    Giữ lại cái đúng
                  </Badge>
                </div> */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-xl"
                    data-testid="apply-prev-button"
                    onClick={() => setActive((n) => Math.max(1, n - 1))}
                    disabled={current.n === 1}
                  >
                    ← Trước
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
                    data-testid="apply-next-button"
                    onClick={() =>
                      setActive((n) => Math.min(APPLY_STEPS.length, n + 1))
                    }
                    disabled={current.n === APPLY_STEPS.length}
                  >
                    Tiếp <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

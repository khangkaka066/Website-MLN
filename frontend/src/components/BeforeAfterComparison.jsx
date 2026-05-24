import {
  AlertOctagon,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BEFORE_AFTER } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";

export const BeforeAfterComparison = () => {
  return (
    <section
      id="compare"
      data-testid="comparison-section"
      className="scroll-mt-24 bg-[hsl(210_40%_98%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
              <ArrowRightLeft
                className="mr-1.5 size-3.5"
                strokeWidth={2.25}
              />
              So sánh
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Trước & Sau khi dùng 5 bước
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Cùng một ý tưởng — nhưng một bên dễ bị “bắt bài”, một bên vững vàng hơn.
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Before */}
          <RevealOnScroll>
            <Card
              data-testid="comparison-before"
              className="flex h-full flex-col rounded-2xl border-[hsl(0_72%_52%/0.2)] bg-[hsl(0_90%_98%)] p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[hsl(0_90%_94%)] text-[hsl(0_72%_42%)] ring-1 ring-[hsl(0_72%_52%/0.3)]">
                  <AlertOctagon className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <Badge className="rounded-full border-0 bg-[hsl(0_90%_94%)] text-[hsl(0_72%_42%)] hover:bg-[hsl(0_90%_94%)]">
                    Trước
                  </Badge>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-foreground">
                    {BEFORE_AFTER.before.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {BEFORE_AFTER.before.subtitle}
              </p>
              <div className="mt-4 rounded-xl bg-card p-4 ring-1 ring-[hsl(0_72%_52%/0.15)]">
                <p className="font-mono-doc text-[14px] leading-7 text-foreground">
                  {BEFORE_AFTER.before.text}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(0_72%_42%)]">
                  Vấn đề
                </p>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {BEFORE_AFTER.before.issues.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-lg bg-card p-2.5 ring-1 ring-[hsl(0_72%_52%/0.12)]"
                    >
                      <XCircle
                        className="mt-0.5 size-4 shrink-0 text-[hsl(0_72%_42%)]"
                        strokeWidth={2.25}
                      />
                      <span className="text-sm leading-relaxed text-foreground">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </RevealOnScroll>

          {/* After */}
          <RevealOnScroll delay={0.05}>
            <Card
              data-testid="comparison-after"
              className="flex h-full flex-col rounded-2xl border-[hsl(152_60%_35%/0.25)] bg-[hsl(152_55%_96%)] p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[hsl(152_55%_90%)] text-[hsl(152_60%_22%)] ring-1 ring-[hsl(152_60%_35%/0.3)]">
                  <Sparkles className="size-5" strokeWidth={2} />
                </span>
                <div>
                  <Badge className="rounded-full border-0 bg-[hsl(152_55%_90%)] text-[hsl(152_60%_22%)] hover:bg-[hsl(152_55%_90%)]">
                    Sau
                  </Badge>
                  <h3 className="mt-1 font-display text-xl font-extrabold text-foreground">
                    {BEFORE_AFTER.after.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {BEFORE_AFTER.after.subtitle}
              </p>
              <div className="mt-4 rounded-xl bg-card p-4 ring-1 ring-[hsl(152_60%_35%/0.15)]">
                <p className="font-mono-doc text-[14px] leading-7 text-foreground">
                  {BEFORE_AFTER.after.text}
                </p>
              </div>
              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(152_60%_22%)]">
                  Ưu điểm
                </p>
                <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {BEFORE_AFTER.after.wins.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-lg bg-card p-2.5 ring-1 ring-[hsl(152_60%_35%/0.12)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[hsl(152_60%_30%)]"
                        strokeWidth={2.25}
                      />
                      <span className="text-sm leading-relaxed text-foreground">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

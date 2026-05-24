import { BookOpen, Compass, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { THEORY } from "@/data/content";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "./RevealOnScroll";

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2.5">
    <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[hsl(174_62%_33%)]" />
    <span className="text-sm leading-relaxed text-foreground sm:text-base">
      {children}
    </span>
  </li>
);

export const TheoryCards = () => {
  return (
    <section
      id="theory"
      data-testid="theory-section"
      className="scroll-mt-24 bg-[hsl(48_100%_97%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(205_90%_93%)] text-[hsl(205_90%_30%)] hover:bg-[hsl(205_90%_93%)]">
              <BookOpen className="mr-1.5 size-3.5" strokeWidth={2.25} />
              Lý thuyết nền
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Thực tiễn & Chân lý — nhắc lại ngắn gọn
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Trước khi vào 5 bước, hãy nhớ lại 2 khái niệm cốt lõi — đây là “kim chỉ nam” cho mọi quyết định.
          </p>
        </RevealOnScroll>

        <StaggerGroup className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <StaggerItem>
            <Card
              data-testid="theory-practice-card"
              className="flex h-full flex-col rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] ring-1 ring-border">
                  <Compass className="size-5" strokeWidth={2} />
                </span>
                <h3 className="font-display text-xl font-extrabold text-foreground">
                  {THEORY.practice.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
                {THEORY.practice.short}
              </p>
              <Separator className="my-5" />
              <ul className="space-y-2.5">
                {THEORY.practice.bullets.map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[hsl(174_62%_33%/0.25)] bg-[hsl(174_55%_94%)] p-3">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-[hsl(174_62%_22%)]">
                  <Quote className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
                  {THEORY.practice.note}
                </p>
              </div>
            </Card>
          </StaggerItem>

          <StaggerItem>
            <Card
              data-testid="theory-truth-card"
              className="flex h-full flex-col rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] transition-shadow hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)]"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-[hsl(24_100%_93%)] text-[hsl(24_94%_35%)] ring-1 ring-border">
                  <BookOpen className="size-5" strokeWidth={2} />
                </span>
                <h3 className="font-display text-xl font-extrabold text-foreground">
                  {THEORY.truth.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
                {THEORY.truth.short}
              </p>
              <Separator className="my-5" />
              <ul className="space-y-2.5">
                {THEORY.truth.bullets.map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-[hsl(24_94%_55%/0.3)] bg-[hsl(24_100%_94%)] p-3">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-[hsl(24_94%_30%)]">
                  <Quote className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
                  {THEORY.truth.note}
                </p>
              </div>
            </Card>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
};

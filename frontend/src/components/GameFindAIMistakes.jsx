import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Trophy,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { GAME_PARAGRAPH } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const GameFindAIMistakes = () => {
  const totalErrors = useMemo(
    () => GAME_PARAGRAPH.filter((s) => s.kind === "error").length,
    []
  );
  const [found, setFound] = useState(() => new Set());
  const [active, setActive] = useState(null); // segment object
  const [score, setScore] = useState(0);
  const [hintIndex, setHintIndex] = useState(-1);

  const completed = found.size === totalErrors && totalErrors > 0;

  const handleClick = (seg) => {
    setActive(seg);
    if (!found.has(seg.id)) {
      const next = new Set(found);
      next.add(seg.id);
      setFound(next);
      setScore((s) => s + 10);
      toast.success(`+10 điểm — Đã tìm được: ${seg.type}`, {
        description: "Mở chi tiết để hiểu tại sao đây là lỗi.",
      });
    } else {
      toast("Bạn đã tìm đoạn này rồi — mở lại chi tiết", {
        icon: <Sparkles className="size-4" />,
      });
    }
  };

  const handleReset = () => {
    setFound(new Set());
    setScore(0);
    setActive(null);
    setHintIndex(-1);
    toast("Đã reset — chơi lại nào!");
  };

  const handleHint = () => {
    const errors = GAME_PARAGRAPH.filter(
      (s) => s.kind === "error" && !found.has(s.id)
    );
    if (!errors.length) {
      toast("Bạn đã tìm hết lỗi rồi!");
      return;
    }
    const next = errors[0];
    setHintIndex(next.id);
    toast(`Gợi ý: Dạng lỗi '${next.type}'`, {
      description: "Hãy tìm đoạn nghi vấn trong đoạn văn.",
      icon: <Lightbulb className="size-4" />,
    });
    setTimeout(() => setHintIndex(-1), 2500);
  };

  return (
    <section
      id="game"
      data-testid="game-section"
      className="scroll-mt-24 bg-[hsl(210_40%_98%)] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)] hover:bg-[hsl(38_100%_92%)]">
              <Search className="mr-1.5 size-3.5" strokeWidth={2.25} />
              Mini-game
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Tìm lỗi AI trong đoạn văn học thuật
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Click vào các cụm từ đằng sau khi được tô vàng — đó là những “điểm đáng ngờ”. Mục tiêu: tìm đủ {totalErrors} lỗi!
          </p>
        </RevealOnScroll>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Text block */}
          <RevealOnScroll className="lg:col-span-8">
            <Card
              data-testid="game-text-block"
              className="rounded-2xl border-border bg-card p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)] ring-1 ring-border">
                    <AlertTriangle className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold tracking-wide text-foreground">
                      Đoạn văn do AI tạo
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Một bài tiểu luận về AI và triết học Mác–Lênin
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full border-border bg-card font-mono-doc text-xs"
                >
                  source: ChatGPT (mô phỏng)
                </Badge>
              </div>
              <div className="mt-5 rounded-xl bg-[hsl(48_100%_97%)] p-4 sm:p-6">
                <p className="font-mono-doc text-[15px] leading-8 text-foreground sm:text-base">
                  {GAME_PARAGRAPH.map((seg, idx) => {
                    if (seg.kind === "text") {
                      return <span key={idx}>{seg.text}</span>;
                    }
                    const isFound = found.has(seg.id);
                    const isHint = hintIndex === seg.id;
                    return (
                      <button
                        key={seg.id}
                        type="button"
                        data-testid={`game-highlight-${seg.id}`}
                        onClick={() => handleClick(seg)}
                        className={`mx-0.5 inline rounded-md px-1.5 py-0.5 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isFound
                            ? "bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)] ring-1 ring-[hsl(152_60%_35%/0.4)]"
                            : isHint
                              ? "animate-pulse bg-[hsl(24_100%_88%)] ring-2 ring-[hsl(24_94%_55%)]"
                              : "bg-[hsl(38_100%_92%)] text-foreground ring-1 ring-[hsl(38_92%_50%/0.45)] hover:bg-[hsl(24_100%_93%)]"
                        }`}
                      >
                        {seg.text}
                        {isFound && (
                          <CheckCircle2
                            className="ml-1 inline size-3.5 align-[-2px] text-[hsl(152_60%_30%)]"
                            strokeWidth={2.25}
                          />
                        )}
                      </button>
                    );
                  })}
                </p>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Mẹo: phần tô vàng là những điểm thông tin AI bị nghi ngờ. Click vào để xem lỗi thuộc loại nào.
              </p>
            </Card>
          </RevealOnScroll>

          {/* Scoreboard */}
          <RevealOnScroll className="lg:col-span-4" delay={0.1}>
            <Card
              data-testid="game-scoreboard"
              className="sticky top-20 rounded-2xl border-border bg-card p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-6"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] ring-1 ring-border">
                  <Trophy className="size-5" strokeWidth={2} />
                </span>
                <p className="font-display text-sm font-bold text-foreground">
                  Bảng điểm
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Điểm</p>
                  <p
                    className="font-display text-2xl font-extrabold text-foreground"
                    data-testid="game-score"
                  >
                    {score}
                  </p>
                </div>
                <div className="rounded-xl bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Đã tìm</p>
                  <p
                    className="font-display text-2xl font-extrabold text-foreground"
                    data-testid="game-found-count"
                  >
                    {found.size}
                    <span className="text-base font-semibold text-muted-foreground">
                      {" / "}
                      {totalErrors}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Progress
                  value={(found.size / totalErrors) * 100}
                  className="h-2"
                  data-testid="game-progress"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  Tiến độ: {Math.round((found.size / totalErrors) * 100)}%
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Button
                  data-testid="game-hint-button"
                  variant="outline"
                  className="justify-start rounded-xl"
                  onClick={handleHint}
                >
                  <Lightbulb className="mr-2 size-4" strokeWidth={2} />
                  Gợi ý lỗi tiếp theo
                </Button>
                <Button
                  data-testid="game-reset-button"
                  variant="ghost"
                  className="justify-start rounded-xl"
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-2 size-4" strokeWidth={2} />
                  Chơi lại
                </Button>
              </div>

              {completed && (
                <div
                  data-testid="game-complete-banner"
                  className="mt-5 rounded-xl border border-[hsl(152_60%_35%/0.3)] bg-[hsl(152_55%_94%)] p-4"
                >
                  <p className="font-display text-sm font-extrabold text-[hsl(152_60%_22%)]">
                    Hoàn thành!
                  </p>
                  <p className="mt-1 text-xs text-[hsl(152_60%_22%)]">
                    Đó là lý do bạn cần AI Verification Card.
                  </p>
                  <Button
                    data-testid="game-go-steps-button"
                    size="sm"
                    className="mt-3 rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
                    onClick={() => smoothScrollTo("steps")}
                  >
                    Xem 5 bước →
                  </Button>
                </div>
              )}
            </Card>
          </RevealOnScroll>
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent
          data-testid="game-detail-dialog"
          className="max-w-lg rounded-2xl bg-card"
        >
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge className="rounded-full border-0 bg-[hsl(0_90%_96%)] text-[hsl(0_72%_42%)] hover:bg-[hsl(0_90%_96%)]">
                    <AlertTriangle className="mr-1.5 size-3.5" strokeWidth={2.25} />
                    {active.type}
                  </Badge>
                </div>
                <DialogTitle className="mt-3 font-display text-xl text-foreground">
                  “{active.text}”
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                  {active.explain}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 rounded-xl border border-dashed border-border bg-[hsl(48_100%_97%)] p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(174_62%_28%)]">
                  Cách xử lý
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {active.fix}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

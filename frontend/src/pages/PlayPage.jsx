import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  Search,
  RotateCcw,
  Trophy,
  ArrowRight,
  XCircle,
  Sparkles,
  ShieldCheck,
  Home,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { GAME_CLAIMS } from "@/data/content";
import { SectionParticles } from "@/components/HeroThreeBackground";
import {
  useGameSession,
  submitGameResult,
} from "@/hooks/useGameStats";

const TOASTER_OPTIONS = {
  classNames: {
    toast:
      "rounded-xl bg-card text-card-foreground border border-border shadow-[0_10px_30px_-18px_rgba(15,23,42,0.45)]",
  },
};

const verdictFor = (pct) =>
  pct >= 80
    ? {
        title: "Bạn là người kiểm chứng cứng cựa!",
        desc: "Bạn đã nhận ra hầu hết các bẫy của AI.",
        color: "hsl(152 60% 22%)",
        bg: "hsl(152 55% 94%)",
      }
    : pct >= 50
      ? {
          title: "Bạn đã có phản xạ nghi vấn!",
          desc: "Tốt — nhưng còn vài câu trượt. Xem lại 5 bước để bịt lỗ hổng.",
          color: "hsl(24 94% 30%)",
          bg: "hsl(24 100% 94%)",
        }
      : {
          title: "AI đã đánh lừa được bạn nhiều lần.",
          desc: "Đó chính là lý do bộ thẻ 5 bước tồn tại.",
          color: "hsl(0 72% 35%)",
          bg: "hsl(0 90% 96%)",
        };

const PlayHeader = () => (
  <header className="sticky top-0 z-30 w-full border-b border-border bg-card/95 backdrop-blur">
    <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
      <Link
        to="/"
        className="flex items-center gap-2"
        data-testid="play-back-link"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] ring-1 ring-border">
          <ShieldCheck className="size-4" strokeWidth={2.25} />
        </span>
        <span className="font-display text-sm font-extrabold sm:text-base">
          AI Verification Card
        </span>
      </Link>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-[hsl(174_55%_92%)]"
      >
        <Home className="size-3.5" strokeWidth={2.25} />
        Trang chính
      </Link>
    </div>
  </header>
);

export default function PlayPage() {
  const total = GAME_CLAIMS.length;
  const { sessionId, reset } = useGameSession();

  const [phase, setPhase] = useState("playing"); // playing | finished
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [reveal, setReveal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const claim = useMemo(() => GAME_CLAIMS[index], [index]);
  const progress = ((index + 1) / total) * 100;

  const handleChoose = (choice) => {
    if (!claim || reveal) return;
    const correct = choice === claim.answer;
    const points = correct ? 10 + streak * 2 : 0;
    const userLabel = choice === "pass" ? "Đạt" : "Cần kiểm chứng";

    setScore((s) => s + points);
    setStreak((st) => (correct ? st + 1 : 0));
    setHistory((h) => [
      ...h,
      {
        claim_id: claim.id,
        text: claim.text,
        choice,
        correct,
        userLabel,
        correctLabel: claim.label,
      },
    ]);
    setReveal({
      correct,
      correctLabel: claim.label,
      tag: claim.tag,
      why: claim.why,
      fix: claim.fix,
    });

    if (correct) {
      toast.success(`+${points} điểm`, {
        description:
          streak > 0
            ? `Streak x${streak + 1} (+${streak * 2} bonus)`
            : "Giữ phong độ!",
      });
    } else {
      toast("Chưa đúng — đọc kỹ giải thích", {
        icon: <AlertTriangle className="size-4" />,
      });
    }
  };

  const handleNext = async () => {
    setReveal(null);
    if (index + 1 >= total) {
      setPhase("finished");
    } else {
      setIndex((i) => i + 1);
    }
  };

  const submitToServer = async (finalHistory, finalScore) => {
    if (submitted || submitting) return;
    setSubmitting(true);
    try {
      const res = await submitGameResult({
        sessionId,
        answers: finalHistory.map((h) => ({
          claim_id: h.claim_id,
          choice: h.choice,
          correct: h.correct,
        })),
        score: finalScore,
        total,
      });
      setSubmitted(true);
      if (res?.duplicate) {
        toast("Phiên này đã được ghi nhận trước đó", {
          icon: <Sparkles className="size-4" />,
        });
      } else {
        toast.success("Đã gửi kết quả ẩn danh", {
          description: "Thống kê tổng sẽ cập nhật trên trang chính.",
        });
      }
    } catch (e) {
      toast("Không gửi được kết quả — kiểm tra mạng", {
        icon: <AlertTriangle className="size-4" />,
        description: e?.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplay = () => {
    reset();
    setPhase("playing");
    setIndex(0);
    setScore(0);
    setStreak(0);
    setHistory([]);
    setReveal(null);
    setSubmitted(false);
  };

  // Auto-submit once when finished
  if (phase === "finished" && !submitted && !submitting) {
    submitToServer(history, score);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(48_100%_97%)] pb-24">
      <SectionParticles color="#5ec4b6" className="opacity-40" />
      <PlayHeader />
      <Toaster position="top-center" toastOptions={TOASTER_OPTIONS} />

      <main className="relative mx-auto max-w-3xl px-4 py-6 sm:py-10">
        {phase === "playing" && claim && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge
                variant="outline"
                className="rounded-full border-border bg-card font-mono-doc text-xs uppercase tracking-wider"
              >
                Câu {index + 1} / {total}
              </Badge>
              <div className="flex items-center gap-2">
                <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
                  <Trophy className="mr-1 size-3.5" strokeWidth={2.25} />
                  <span data-testid="play-score">{score}</span> điểm
                </Badge>
                <Badge className="rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_30%)] hover:bg-[hsl(38_100%_92%)]">
                  🔥 <span data-testid="play-streak">{streak}</span>
                </Badge>
              </div>
            </div>
            <Progress
              value={progress}
              data-testid="play-progress"
              className="mt-3 h-2"
            />

            <Card
              data-testid="play-claim-card"
              className="mt-5 rounded-2xl border-border bg-card p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-7"
            >
              <Badge className="rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_30%)] hover:bg-[hsl(38_100%_92%)]">
                source: AI generated
              </Badge>
              <p
                data-testid="play-claim-text"
                className="mt-3 font-display text-lg font-semibold leading-relaxed text-foreground sm:text-xl"
              >
                “{claim.text}”
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Bạn có thể đưa thẳng câu này vào bài học thuật không?
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  data-testid="play-choice-pass"
                  size="lg"
                  onClick={() => handleChoose("pass")}
                  className="h-auto justify-start rounded-2xl bg-[hsl(152_55%_92%)] py-4 text-left text-[hsl(152_60%_18%)] ring-1 ring-[hsl(152_60%_35%/0.35)] hover:bg-[hsl(152_55%_88%)]"
                >
                  <CheckCircle2
                    className="mr-3 size-6 shrink-0"
                    strokeWidth={2.25}
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-lg font-extrabold">
                      Đạt
                    </span>
                    <span className="text-xs font-normal text-[hsl(152_60%_22%)]/80">
                      Tin cậy, có thể dùng
                    </span>
                  </span>
                </Button>
                <Button
                  data-testid="play-choice-verify"
                  size="lg"
                  onClick={() => handleChoose("verify")}
                  className="h-auto justify-start rounded-2xl bg-[hsl(24_100%_92%)] py-4 text-left text-[hsl(24_94%_25%)] ring-1 ring-[hsl(24_94%_55%/0.35)] hover:bg-[hsl(24_100%_88%)]"
                >
                  <Search
                    className="mr-3 size-6 shrink-0"
                    strokeWidth={2.25}
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-lg font-extrabold">
                      Cần kiểm chứng
                    </span>
                    <span className="text-xs font-normal text-[hsl(24_94%_25%)]/80">
                      Có dấu hiệu đáng ngờ
                    </span>
                  </span>
                </Button>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Phiên ẩn danh • ID: {sessionId.slice(-8)} • Không có thông tin cá
              nhân được lưu lại.
            </p>
          </>
        )}

        {phase === "finished" && (
          <ResultView
            score={score}
            total={total}
            history={history}
            onReplay={handleReplay}
            submitting={submitting}
            submitted={submitted}
          />
        )}
      </main>

      <Dialog open={!!reveal} onOpenChange={() => {}}>
        <DialogContent
          data-testid="play-reveal-dialog"
          className="max-w-md rounded-2xl bg-card"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {reveal && (
            <>
              <DialogTitle className="sr-only">
                {reveal.correct ? "Chính xác" : "Chưa đúng"} — Đáp án:{" "}
                {reveal.correctLabel}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {reveal.why}
              </DialogDescription>
              <div className="flex items-center gap-2">
                {reveal.correct ? (
                  <Badge className="rounded-full border-0 bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)] hover:bg-[hsl(152_55%_92%)]">
                    <CheckCircle2
                      className="mr-1.5 size-3.5"
                      strokeWidth={2.25}
                    />
                    Chính xác
                  </Badge>
                ) : (
                  <Badge className="rounded-full border-0 bg-[hsl(0_90%_96%)] text-[hsl(0_72%_42%)] hover:bg-[hsl(0_90%_96%)]">
                    <XCircle className="mr-1.5 size-3.5" strokeWidth={2.25} />
                    Chưa đúng
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="rounded-full border-border bg-card"
                >
                  {reveal.tag}
                </Badge>
              </div>
              <p className="mt-2 font-display text-lg font-extrabold text-foreground">
                Đáp án đúng: {reveal.correctLabel}
              </p>
              <div className="rounded-xl bg-secondary p-3 text-sm leading-relaxed text-foreground">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Vì sao?
                </p>
                <p className="mt-1">{reveal.why}</p>
              </div>
              <div className="rounded-xl border border-dashed border-border bg-[hsl(48_100%_97%)] p-3 text-sm leading-relaxed text-foreground">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(174_62%_28%)]">
                  Cách xử lý
                </p>
                <p className="mt-1">{reveal.fix}</p>
              </div>
              <Button
                data-testid="play-next-button"
                onClick={handleNext}
                className="mt-2 w-full rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
              >
                {index + 1 >= total ? "Xem kết quả →" : "Câu tiếp theo →"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ResultView = ({ score, total, history, onReplay, submitting, submitted }) => {
  const correctCount = history.filter((h) => h.correct).length;
  const pct = Math.round((correctCount / total) * 100);
  const v = verdictFor(pct);

  return (
    <Card
      data-testid="play-result-card"
      className="rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-8"
    >
      <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
        <Trophy className="mr-1.5 size-3.5" strokeWidth={2.25} />
        Kết quả
      </Badge>
      <h2 className="mt-3 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
        {v.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {v.desc}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-xs text-muted-foreground">Đúng / Tổng</p>
          <p className="font-display text-3xl font-extrabold text-foreground">
            {correctCount}
            <span className="text-base font-semibold text-muted-foreground">
              {" / "}
              {total}
            </span>
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ background: v.bg }}>
          <p className="text-xs" style={{ color: v.color }}>
            Tỉ lệ đúng
          </p>
          <p
            className="font-display text-3xl font-extrabold"
            style={{ color: v.color }}
          >
            {pct}%
          </p>
        </div>
      </div>

      <div
        data-testid="play-submit-status"
        className="mt-5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm text-muted-foreground"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" strokeWidth={2.25} />
            Đang gửi kết quả ẩn danh...
          </>
        ) : submitted ? (
          <>
            <CheckCircle2
              className="size-4 text-[hsl(152_60%_30%)]"
              strokeWidth={2.25}
            />
            Đã gửi kết quả ẩn danh. Thống kê tổng sẽ cập nhật trên trang chính.
          </>
        ) : (
          <>
            <AlertTriangle
              className="size-4 text-[hsl(38_92%_35%)]"
              strokeWidth={2.25}
            />
            Chưa gửi được — bấm chơi lại để thử lại.
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button
          data-testid="play-replay-button"
          onClick={onReplay}
          variant="outline"
          className="rounded-xl"
        >
          <RotateCcw className="mr-2 size-4" strokeWidth={2} />
          Chơi lại
        </Button>
        <Link to="/" data-testid="play-home-link">
          <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]">
            Xem thống kê + 5 bước
            <ArrowRight className="ml-2 size-4" strokeWidth={2.25} />
          </Button>
        </Link>
      </div>

      <details className="mt-6 rounded-xl bg-secondary p-3 text-sm">
        <summary className="cursor-pointer font-semibold text-foreground">
          Xem chi tiết từng câu
        </summary>
        <ul className="mt-3 space-y-2">
          {history.map((h, i) => (
            <li
              key={h.claim_id}
              className={`flex items-start gap-3 rounded-lg p-2.5 ring-1 ${
                h.correct
                  ? "bg-[hsl(152_55%_94%)] ring-[hsl(152_60%_35%/0.2)]"
                  : "bg-[hsl(0_90%_97%)] ring-[hsl(0_72%_52%/0.2)]"
              }`}
            >
              <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-md bg-card font-mono-doc text-[11px] font-bold ring-1 ring-border">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium text-foreground">
                  {h.text}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Bạn: <strong>{h.userLabel}</strong> · Đúng:{" "}
                  <strong>{h.correctLabel}</strong>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </details>
    </Card>
  );
};

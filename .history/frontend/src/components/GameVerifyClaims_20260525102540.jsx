import { useEffect, useMemo, useState } from "react";
import {
  QrCode,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Search,
  RotateCcw,
  Trophy,
  ArrowRight,
  XCircle,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { GAME_INTRO, GAME_CLAIMS } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionParticles } from "./HeroThreeBackground";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const useShareUrl = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Sửa lại link QR trỏ về /play
      setUrl(`${window.location.origin}/play`);
    }
  }, []);
  return url;
};

const buildQrSrc = (url) =>
  url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(
        url
      )}&color=0F766E&bgcolor=FFFFFF`
    : "";

const fetchGameStats = async () => {
  try {
    console.log("Đang gọi API stats...");
    const res = await fetch("https://website-mln.onrender.com/api/game/stats");
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Dữ liệu nhận được:", data);
    return data;
  } catch (error) {
    console.error("Lỗi lấy thống kê chi tiết:", error);
    return null;
  }
};
const submitGameResult = async (score, total, history) => {
  // Tạo session_id duy nhất cho người dùng
  let sessionId = localStorage.getItem("mln_session_id");
  if (!sessionId) {
    sessionId = "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
    localStorage.setItem("mln_session_id", sessionId);
  }

  const payload = {
    session_id: sessionId,
    answers: history.map((h) => ({
      claim_id: h.id,
      choice: h.userLabel === "Đạt" ? "pass" : "verify",
      correct: h.correct,
    })),
    score: score,
    total: total,
  };

  try {
    const res = await fetch("https://website-mln.onrender.com/api/game/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    
    if (!data.duplicate) {
      toast.success("Điểm số đã được lưu vào hệ thống!");
    }
  } catch (error) {
    console.error("Lỗi khi gửi điểm:", error);
  }
};
// ----- Intro Screen -----
// ĐÃ XÓA PHẦN HIỂN THỊ QR CODE TRONG NÀY ĐỂ TRÁNH TRÙNG LẶP
const IntroScreen = ({ onStart }) => (
  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
    <RevealOnScroll className="lg:col-span-12">
      <Card className="rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-8">
        <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
          <Sparkles className="mr-1.5 size-3.5" strokeWidth={2.25} />
          Mini-game tương tác
        </Badge>
        <h3 className="mt-3 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
          {GAME_INTRO.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {GAME_INTRO.description}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-[hsl(152_55%_94%)] p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2
                className="size-4 text-[hsl(152_60%_22%)]"
                strokeWidth={2.25}
              />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(152_60%_22%)]">
                Đạt
              </p>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              Claim đủ tin cậy, có thể đưa thẳng vào bài (kèm trích dẫn).
            </p>
          </div>
          <div className="rounded-xl bg-[hsl(24_100%_94%)] p-4">
            <div className="flex items-center gap-2">
              <Search
                className="size-4 text-[hsl(24_94%_30%)]"
                strokeWidth={2.25}
              />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(24_94%_30%)]">
                Cần kiểm chứng
              </p>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-foreground">
              Có dấu hiệu đáng ngờ — cần áp dụng 5 bước trước khi dùng.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            data-testid="game-begin-button"
            size="lg"
            onClick={onStart}
            className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
          >
            Bắt đầu chơi tại đây
            <ArrowRight className="ml-2 size-4" strokeWidth={2.25} />
          </Button>
          <p className="text-sm text-muted-foreground">
            Hoặc xem hướng dẫn bên phải để quét QR chơi trên điện thoại
          </p>
        </div>
      </Card>
    </RevealOnScroll>
  </div>
);

// ----- Question Screen -----
const QuestionScreen = ({
  claim,
  index,
  total,
  score,
  streak,
  onChoose,
  history,
}) => {
  const progress = ((index + 1) / total) * 100;
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <RevealOnScroll className="lg:col-span-8" key={claim.id}>
        <Card className="rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-8">
          
          {/* Header hiển thị số thứ tự câu */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-border bg-card font-mono-doc text-xs uppercase tracking-wider"
            >
              Câu {index + 1} / {total}
            </Badge>
          </div>

          {/* Thay đổi: Lưới chia 2 cột đối chiếu AI và Nguồn gốc */}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            
            {/* Cột 1: Bảng AI Generated */}
            <div className="flex flex-col gap-2">
              <Badge className="w-fit rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)] hover:bg-[hsl(38_100%_92%)]">
                source: AI generated
              </Badge>
              <div
                data-testid="game-claim-text"
                className="flex-1 rounded-xl bg-[hsl(48_100%_97%)] p-5 sm:p-6"
              >
                <p className="font-display text-base font-semibold leading-relaxed text-foreground sm:text-lg">
                  “{claim.text}”
                </p>
              </div>
            </div>

            {/* Cột 2: Bảng Origin Source */}
            <div className="flex flex-col gap-2">
              <Badge className="w-fit rounded-full border-0 bg-[hsl(210_40%_92%)] text-[hsl(210_60%_35%)] hover:bg-[hsl(210_40%_92%)]">
                origin source
              </Badge>
              <div className="flex flex-1 flex-col justify-between rounded-xl bg-secondary p-5 ring-1 ring-border sm:p-6">
                <p className="text-sm italic leading-relaxed text-muted-foreground">
                  {claim.originText ? `“${claim.originText}”` : "Đang tải dữ liệu nguồn..."}
                </p>
                <div className="mt-4 border-t border-border pt-3 text-right">
                  <p className="text-xs font-medium text-muted-foreground">
                    Nguồn: <span className="font-semibold text-foreground">{claim.originCitation || "Không rõ"}</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Theo bạn, câu khẳng định này có thể đưa thẳng vào bài học thuật của
            bạn không?
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              data-testid="game-choice-pass"
              size="lg"
              onClick={() => onChoose("pass")}
              className="group h-auto justify-start rounded-2xl bg-[hsl(152_55%_92%)] py-4 text-left text-[hsl(152_60%_18%)] ring-1 ring-[hsl(152_60%_35%/0.35)] hover:bg-[hsl(152_55%_88%)]"
            >
              <CheckCircle2 className="mr-3 size-6 shrink-0" strokeWidth={2.25} />
              <span className="flex flex-col">
                <span className="font-display text-lg font-extrabold">Đạt</span>
                <span className="text-xs font-normal text-[hsl(152_60%_22%)]/80">
                  Tin cậy, có thể dùng trong bài
                </span>
              </span>
            </Button>
            <Button
              data-testid="game-choice-verify"
              size="lg"
              onClick={() => onChoose("verify")}
              className="group h-auto justify-start rounded-2xl bg-[hsl(24_100%_92%)] py-4 text-left text-[hsl(24_94%_25%)] ring-1 ring-[hsl(24_94%_55%/0.35)] hover:bg-[hsl(24_100%_88%)]"
            >
              <Search className="mr-3 size-6 shrink-0" strokeWidth={2.25} />
              <span className="flex flex-col">
                <span className="font-display text-lg font-extrabold">
                  Cần kiểm chứng
                </span>
                <span className="text-xs font-normal text-[hsl(24_94%_25%)]/80">
                  Có dấu hiệu đáng ngờ, áp dụng 5 bước
                </span>
              </span>
            </Button>
          </div>
        </Card>
      </RevealOnScroll>

      <RevealOnScroll className="lg:col-span-4" delay={0.05}>
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
              <p className="text-xs text-muted-foreground">Streak</p>
              <p
                className="font-display text-2xl font-extrabold text-foreground"
                data-testid="game-streak"
              >
                🔥{streak}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Progress
              value={progress}
              data-testid="game-progress"
              className="h-2"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Tiến độ: {Math.round(progress)}%
            </p>
          </div>

          {history.length > 0 && (
            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Đã trả lời
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {history.map((h, i) => (
                  <span
                    key={h.id}
                    className={`inline-flex size-7 items-center justify-center rounded-md text-xs font-bold ring-1 ${
                      h.correct
                        ? "bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)] ring-[hsl(152_60%_35%/0.3)]"
                        : "bg-[hsl(0_90%_96%)] text-[hsl(0_72%_42%)] ring-[hsl(0_72%_52%/0.25)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </RevealOnScroll>
    </div>
  );
};

// ----- Result Screen -----
const ResultScreen = ({ score, total, history, onReplay }) => {
   useEffect(() => {
    submitGameResult(score, total, history);
  }, []); 
  const correctCount = history.filter((h) => h.correct).length;
  const pct = Math.round((correctCount / total) * 100);
  const verdict =
    pct >= 80
      ? {
          title: "Bạn là người kiểm chứng cứng cựa!",
          desc: "Bạn đã nhận ra hầu hết các bẫy của AI. Áp dụng tiếp 5 bước cho các bài thực tế nhé.",
          color: "hsl(152 60% 22%)",
          bg: "hsl(152 55% 94%)",
        }
      : pct >= 50
        ? {
            title: "Bạn đã có phản xạ nghi vấn!",
            desc: "Tốt — nhưng vẫn còn vài câu trượt. Xem lại 5 bước để bịt kín lỗ hổng.",
            color: "hsl(24 94% 30%)",
            bg: "hsl(24 100% 94%)",
          }
        : {
            title: "AI đã đánh lừa được bạn nhiều lần.",
            desc: "Đó chính xác là lý do bộ thẻ 5 bước tồn tại. Hãy xem 5 bước và chơi lại.",
            color: "hsl(0 72% 35%)",
            bg: "hsl(0 90% 96%)",
          };

  return (
    <RevealOnScroll>
      <Card
        data-testid="game-result-card"
        className="rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-10"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Badge className="rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
              <Trophy className="mr-1.5 size-3.5" strokeWidth={2.25} />
              Kết quả
            </Badge>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
              {verdict.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {verdict.desc}
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
              <div
                className="rounded-xl p-4"
                style={{ background: verdict.bg }}
              >
                <p className="text-xs" style={{ color: verdict.color }}>
                  Tỉ lệ
                </p>
                <p
                  className="font-display text-3xl font-extrabold"
                  style={{ color: verdict.color }}
                >
                  {pct}%
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                data-testid="game-replay-button"
                onClick={onReplay}
                variant="outline"
                className="rounded-xl"
              >
                <RotateCcw className="mr-2 size-4" strokeWidth={2} />
                Chơi lại
              </Button>
              <Button
                data-testid="game-go-steps-button"
                onClick={() => scrollTo("steps")}
                className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
              >
                Xem 5 bước kiểm chứng
                <ArrowRight className="ml-2 size-4" strokeWidth={2.25} />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Chi tiết từng câu
            </p>
            <ul className="mt-3 space-y-2">
              {history.map((h, i) => (
                <li
                  key={h.id}
                  className={`flex items-start gap-3 rounded-xl p-3 ring-1 ${
                    h.correct
                      ? "bg-[hsl(152_55%_94%)] ring-[hsl(152_60%_35%/0.25)]"
                      : "bg-[hsl(0_90%_97%)] ring-[hsl(0_72%_52%/0.2)]"
                  }`}
                >
                  <span
                    className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md font-mono-doc text-xs font-bold ${
                      h.correct
                        ? "bg-[hsl(152_55%_88%)] text-[hsl(152_60%_18%)]"
                        : "bg-[hsl(0_90%_92%)] text-[hsl(0_72%_30%)]"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-foreground">
                      {h.text}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs">
                      {h.correct ? (
                        <CheckCircle2
                          className="size-3.5 text-[hsl(152_60%_30%)]"
                          strokeWidth={2.25}
                        />
                      ) : (
                        <XCircle
                          className="size-3.5 text-[hsl(0_72%_42%)]"
                          strokeWidth={2.25}
                        />
                      )}
                      <span className="text-muted-foreground">
                        Đáp án đúng:{" "}
                        <span className="font-semibold text-foreground">
                          {h.correctLabel}
                        </span>{" "}
                        — Bạn chọn:{" "}
                        <span className="font-semibold text-foreground">
                          {h.userLabel}
                        </span>
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </RevealOnScroll>
  );
};

// ----- Reveal Dialog (after each choice) -----
const RevealDialog = ({ open, payload, onNext, isLast }) => (
  <Dialog open={open} onOpenChange={() => {}}>
    <DialogContent
      data-testid="game-reveal-dialog"
      className="max-w-lg rounded-2xl bg-card"
      onPointerDownOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}
    >
      {payload && (
        <>
          <DialogTitle className="sr-only">
            {payload.correct ? "Chính xác" : "Chưa đúng"} — Đáp án: {payload.correctLabel}
          </DialogTitle>
          <DialogDescription className="sr-only">{payload.why}</DialogDescription>
          <div className="flex items-center gap-2">
            {payload.correct ? (
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
              {payload.tag}
            </Badge>
          </div>
          <p className="mt-2 font-display text-lg font-extrabold text-foreground">
            Đáp án đúng: {payload.correctLabel}
          </p>
          <div className="rounded-xl bg-secondary p-3 text-sm leading-relaxed text-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Vì sao?
            </p>
            <p className="mt-1">{payload.why}</p>
          </div>
          <div className="rounded-xl border border-dashed border-border bg-[hsl(48_100%_97%)] p-3 text-sm leading-relaxed text-foreground">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(174_62%_28%)]">
              Cách xử lý
            </p>
            <p className="mt-1">{payload.fix}</p>
          </div>
          <Button
            data-testid="game-next-button"
            onClick={onNext}
            className="mt-2 w-full rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
          >
            {isLast ? "Xem kết quả →" : "Câu tiếp theo →"}
          </Button>
        </>
      )}
    </DialogContent>
  </Dialog>
);

// ===== Main Component =====
export const GameVerifyClaims = () => {
  const qrUrl = useShareUrl();
  const total = GAME_CLAIMS.length;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [reveal, setReveal] = useState(null);

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
    
  useEffect(() => {
    console.log("✅ USE_EFFECT STATS ĐÃ CHẠY!"); 
    let isMounted = true;


    const getStats = async () => {
      try {
        const data = await fetchGameStats();
        if (isMounted) {
          if (data) {
            setStats(data);
          } else {
            // Nếu data null nhưng không có exception, ta vẫn tắt loading để hiển thị trạng thái "Không có dữ liệu"
            // Hoặc giữ nguyên stats null để StatsSummary hiện lỗi đỏ
          }
          setLoadingStats(false);
        }
      } catch (error) {
        console.error("Lỗi trong useEffect:", error);
        if (isMounted) setLoadingStats(false);
      }
    };

    getStats();
    const intervalId = setInterval(getStats, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []); 

  const claim = useMemo(() => GAME_CLAIMS[index], [index]);

  const handleStart = () => {
    setPhase("playing");
    setIndex(0);
    setScore(0);
    setStreak(0);
    setHistory([]);
  };

  const handleChoose = (choice) => {
    if (!claim || reveal) return;
    const correct = choice === claim.answer;
    const points = correct ? 10 + streak * 2 : 0;
    const userLabel = choice === "pass" ? "Đạt" : "Cần kiểm chứng";
    const correctLabel = claim.label;

    setScore((s) => s + points);
    setStreak((st) => (correct ? st + 1 : 0));
    setHistory((h) => [
      ...h,
      {
        id: claim.id,
        text: claim.text,
        correct,
        userLabel,
        correctLabel,
      },
    ]);
    setReveal({
      correct,
      correctLabel,
      tag: claim.tag,
      why: claim.why,
      fix: claim.fix,
    });

    if (correct) {
      toast.success(`+${points} điểm — Chính xác!`, {
        description:
          streak > 0
            ? `Streak x${streak + 1} (+${streak * 2} điểm bonus)`
            : "Tiếp tục giữ phong độ!",
      });
    } else {
      toast("Chưa đúng — mở chi tiết để hiểu vì sao", {
        icon: <AlertTriangle className="size-4" />,
      });
    }
  };

  const handleNext = () => {
    setReveal(null);
    if (index + 1 >= total) {
      setPhase("finished");
    } else {
      setIndex((i) => i + 1);
    }
  };

  const handleReplay = () => {
    handleStart();
  };
  const StatsSummary = () => {
    if (loadingStats) return <p className="text-xs text-muted-foreground">Đang kết nối...</p>;

    // Debug: Hiển thị toàn bộ dữ liệu thô nếu có
    if (stats) {
      return (
        <div className="rounded-xl bg-black p-3 text-xs text-green-400 font-mono overflow-auto max-h-[300px]">
          <p className="text-white font-bold mb-2">DEBUG DATA FROM BACKEND:</p>
          <pre>{JSON.stringify(stats, null, 2)}</pre>
        </div>
      );
    }

    // Nếu không có stats
    return (
      <div className="p-3 text-xs text-red-500 bg-red-50 rounded-xl border border-red-100">
        <p>⚠️ Không nhận được dữ liệu.</p>
        <p>Hãy kiểm tra tab Network xem request 'stats' bị lỗi gì.</p>
      </div>
    );
  };

  return (
    <section
      id="game"
      data-testid="game-section"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[hsl(210_40%_98%)] py-16 sm:py-20 lg:py-24"
    >
      <SectionParticles color="#5ec4b6" className="opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)] hover:bg-[hsl(38_100%_92%)]">
              <QrCode className="mr-1.5 size-3.5" strokeWidth={2.25} />
              {GAME_INTRO.tagline}
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            AI đưa ra câu — bạn quyết định: Đạt hay Cần kiểm chứng?
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Trò chơi nhanh để rèn “phản xạ nghi vấn” trước mọi output AI. Quét
            QR để chơi cùng cả lớp, hoặc bấm bắt đầu để chơi ngay tại đây.
          </p>
        </RevealOnScroll>

        <div className="mt-8">
          {phase === "intro" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Cột trái: Chỉ còn nội dung Intro (đã xóa QR) */}
              <div className="lg:col-span-7">
                 <IntroScreen onStart={handleStart} />
              </div>
              
              {/* Cột phải: QR Code + Thống kê */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                 {/* Card QR Code duy nhất */}
                 <Card className="flex flex-col items-center justify-center rounded-2xl border-dashed border-[hsl(174_62%_33%/0.4)] bg-[hsl(174_55%_96%)] p-6 text-center">
                    <Badge className="rounded-full border-0 bg-card text-foreground ring-1 ring-border hover:bg-card">
                      <QrCode className="mr-1.5 size-3.5" strokeWidth={2.25} />
                      Quét để tham gia
                    </Badge>
                    <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-[hsl(174_62%_33%/0.25)] shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                      {qrUrl ? (
                        <img src={buildQrSrc(qrUrl)} alt="QR" width={240} height={240} className="size-[200px] rounded-lg sm:size-[240px]" />
                      ) : (
                        <div className="size-[200px] animate-pulse rounded-lg bg-secondary sm:size-[240px]" />
                      )}
                    </div>
                    <p className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-[hsl(174_62%_22%)]">
                      <Smartphone className="size-4" strokeWidth={2.25} />
                      {GAME_INTRO.scanHint}
                    </p>
                 </Card>

                 {/* Card Thống kê */}
                 <Card className="rounded-2xl border-border bg-card p-4 shadow-sm">
                    <StatsSummary />
                 </Card>
              </div>
            </div>
          )}
          {phase === "playing" && (
            <QuestionScreen
              claim={claim}
              index={index}
              total={total}
              score={score}
              streak={streak}
              onChoose={handleChoose}
              history={history}
            />
          )}
          {phase === "finished" && (
            <ResultScreen
              score={score}
              total={total}
              history={history}
              onReplay={handleReplay}
            />
          )}
        </div>
      </div>

      <RevealDialog
        open={!!reveal}
        payload={reveal}
        onNext={handleNext}
        isLast={index + 1 >= total}
      />
    </section>
  );
};
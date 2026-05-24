import { useMemo, useState } from "react";
import {
  QrCode,
  Smartphone,
  ExternalLink,
  Users,
  Trophy,
  PercentCircle,
  RefreshCcw,
  CheckCircle2,
  Search,
  Sparkles,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GAME_INTRO, GAME_CLAIMS } from "@/data/content";
import { RevealOnScroll } from "./RevealOnScroll";
import { SectionParticles } from "./HeroThreeBackground";
import { useGameStats } from "@/hooks/useGameStats";

const PLAY_PATH = "/play";

const usePlayUrl = () =>
  useMemo(() => {
    if (typeof window === "undefined") return PLAY_PATH;
    return `${window.location.origin}${PLAY_PATH}`;
  }, []);

const buildQrSrc = (url) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(
    url
  )}&color=0F766E&bgcolor=FFFFFF`;

// ---------------- KPI Cards ----------------
const KpiCard = ({ icon: Icon, label, value, sub, accent }) => (
  <Card className={`rounded-2xl border-border bg-card p-5 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)]`}>
    <div className="flex items-center gap-3">
      <span
        className={`inline-flex size-11 items-center justify-center rounded-xl ring-1 ring-border`}
        style={{ background: accent.bg, color: accent.fg }}
      >
        <Icon className="size-5" strokeWidth={2} />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
          {value}
        </p>
      </div>
    </div>
    {sub && (
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{sub}</p>
    )}
  </Card>
);

// ---------------- Per-claim stacked bar ----------------
const ClaimStatRow = ({ claim, stat, index }) => {
  const passPct = stat?.pass_pct ?? 0;
  const verifyPct = stat?.verify_pct ?? 0;
  const total = stat?.total ?? 0;
  const correctIsPass = claim.answer === "pass";
  const correctPct = stat?.correct_pct ?? 0;

  return (
    <div
      data-testid={`stat-claim-${claim.id}`}
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center rounded-md bg-secondary font-mono-doc text-[11px] font-bold text-foreground ring-1 ring-border">
              {index + 1}
            </span>
            <Badge
              variant="outline"
              className="rounded-full border-border bg-card text-[10px] uppercase tracking-wider"
            >
              Đáp án đúng: {claim.label}
            </Badge>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground">
            “{claim.text}”
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-lg font-extrabold text-foreground">
            {total}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            lượt
          </p>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full ${
            correctIsPass
              ? "bg-[hsl(152_60%_45%)]"
              : "bg-[hsl(152_55%_75%)]"
          }`}
          style={{ width: `${passPct}%` }}
          title={`Đạt: ${passPct}%`}
        />
        <div
          className={`h-full ${
            !correctIsPass
              ? "bg-[hsl(24_94%_55%)]"
              : "bg-[hsl(24_94%_80%)]"
          }`}
          style={{ width: `${verifyPct}%` }}
          title={`Cần kiểm chứng: ${verifyPct}%`}
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span
              className={`inline-block size-2 rounded-full ${
                correctIsPass
                  ? "bg-[hsl(152_60%_45%)]"
                  : "bg-[hsl(152_55%_75%)]"
              }`}
            />
            Đạt: <strong className="text-foreground">{passPct}%</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <span
              className={`inline-block size-2 rounded-full ${
                !correctIsPass
                  ? "bg-[hsl(24_94%_55%)]"
                  : "bg-[hsl(24_94%_80%)]"
              }`}
            />
            Cần kiểm chứng:{" "}
            <strong className="text-foreground">{verifyPct}%</strong>
          </span>
        </div>
        <Badge
          className={`rounded-full border-0 ${
            correctPct >= 70
              ? "bg-[hsl(152_55%_92%)] text-[hsl(152_60%_22%)]"
              : correctPct >= 40
                ? "bg-[hsl(38_100%_92%)] text-[hsl(38_92%_30%)]"
                : "bg-[hsl(0_90%_96%)] text-[hsl(0_72%_42%)]"
          } hover:bg-current`}
        >
          {correctPct}% đúng
        </Badge>
      </div>
    </div>
  );
};

// ---------------- Empty state ----------------
const EmptyStatsState = ({ playUrl }) => (
  <Card className="rounded-2xl border-dashed border-border bg-card p-6 text-center sm:p-8">
    <span className="mx-auto inline-flex size-12 items-center justify-center rounded-xl bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)]">
      <BarChart3 className="size-6" strokeWidth={2} />
    </span>
    <p className="mt-3 font-display text-lg font-extrabold text-foreground">
      Chưa có ai chơi
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
      Hãy là người đầu tiên — quét QR hoặc bấm nút bên dưới để bắt đầu. Thống
      kê sẽ xuất hiện ngay khi có người hoàn thành.
    </p>
    <a
      href={playUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="empty-state-play-link"
      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[hsl(var(--primary)/0.92)]"
    >
      Mở trang chơi
      <ExternalLink className="size-4" strokeWidth={2.25} />
    </a>
  </Card>
);

// ---------------- Main ----------------
export const GameVerifyClaims = () => {
  const playUrl = usePlayUrl();
  const { stats, loading, error, refresh } = useGameStats({ pollMs: 7000 });
  const [refreshing, setRefreshing] = useState(false);

  const statByClaim = useMemo(() => {
    const map = new Map();
    (stats?.claim_stats || []).forEach((s) => map.set(s.claim_id, s));
    return map;
  }, [stats]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 600);
  };

  const hasData = (stats?.total_players ?? 0) > 0;

  return (
    <section
      id="game"
      data-testid="game-section"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[hsl(210_40%_98%)] py-16 sm:py-20 lg:py-24"
    >
      <SectionParticles color="#5ec4b6" className="opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex items-center gap-2">
            <Badge className="rounded-full border-0 bg-[hsl(38_100%_92%)] text-[hsl(38_92%_35%)] hover:bg-[hsl(38_100%_92%)]">
              <QrCode className="mr-1.5 size-3.5" strokeWidth={2.25} />
              {GAME_INTRO.tagline}
            </Badge>
          </div>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Quét QR để chơi — kết quả sẽ tổng hợp ẩn danh tại đây
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
            AI lần lượt đưa ra các câu khẳng định học thuật. Bạn chọn{" "}
            <strong>Đạt</strong> nếu đủ tin cậy, hoặc{" "}
            <strong>Cần kiểm chứng</strong> nếu nghi ngờ. Mọi phiên chơi đều ẩn
            danh — chỉ có thống kê tổng hiển thị công khai.
          </p>
        </RevealOnScroll>

        {/* QR + Intro */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-7">
            <Card className="flex h-full flex-col rounded-2xl border-border bg-card p-6 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.35)] sm:p-7">
              <Badge className="self-start rounded-full border-0 bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] hover:bg-[hsl(174_55%_92%)]">
                <Sparkles className="mr-1.5 size-3.5" strokeWidth={2.25} />
                Cách chơi
              </Badge>
              <h3 className="mt-3 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                {GAME_INTRO.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {GAME_CLAIMS.length} câu — mỗi câu chọn 1 trong 2:
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                    Claim đủ tin cậy, có thể đưa vào bài (kèm trích dẫn).
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
                    Có dấu hiệu đáng ngờ — cần áp dụng 5 bước.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <a
                  href={playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="game-open-play-link"
                >
                  <Button
                    size="lg"
                    className="rounded-xl bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]"
                  >
                    Bắt đầu chơi (mở tab mới)
                    <ExternalLink
                      className="ml-2 size-4"
                      strokeWidth={2.25}
                    />
                  </Button>
                </a>
                <p className="mt-2 text-xs text-muted-foreground">
                  Hoặc dùng QR bên phải để chơi trên điện thoại — kết quả vẫn
                  được gửi về thống kê chung.
                </p>
              </div>
            </Card>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-5" delay={0.05}>
            <Card
              data-testid="game-qr-card"
              className="flex h-full flex-col items-center justify-center rounded-2xl border-dashed border-[hsl(174_62%_33%/0.4)] bg-[hsl(174_55%_96%)] p-6 text-center"
            >
              <Badge className="rounded-full border-0 bg-card text-foreground ring-1 ring-border hover:bg-card">
                <QrCode className="mr-1.5 size-3.5" strokeWidth={2.25} />
                Quét để tham gia
              </Badge>
              <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-[hsl(174_62%_33%/0.25)] shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)]">
                {playUrl ? (
                  <img
                    src={buildQrSrc(playUrl)}
                    alt={`QR code dẫn đến trang chơi ${playUrl}`}
                    width={240}
                    height={240}
                    className="size-[200px] rounded-lg sm:size-[240px]"
                    data-testid="game-qr-image"
                  />
                ) : (
                  <div className="size-[200px] animate-pulse rounded-lg bg-secondary sm:size-[240px]" />
                )}
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-[hsl(174_62%_22%)]">
                <Smartphone className="size-4" strokeWidth={2.25} />
                {GAME_INTRO.scanHint}
              </p>
              <p className="mt-2 break-all text-[11px] text-[hsl(174_62%_22%)]/70">
                {playUrl}
              </p>
            </Card>
          </RevealOnScroll>
        </div>

        {/* Stats Dashboard */}
        <div className="mt-12">
          <RevealOnScroll>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <Badge className="rounded-full border-0 bg-[hsl(205_90%_93%)] text-[hsl(205_90%_30%)] hover:bg-[hsl(205_90%_93%)]">
                  <BarChart3 className="mr-1.5 size-3.5" strokeWidth={2.25} />
                  Thống kê tổng (ẩn danh)
                </Badge>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                  Cả lớp đang nghĩ gì?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tự động cập nhật mỗi 7 giây · Không hiển thị tên người chơi
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                disabled={refreshing}
                data-testid="stats-refresh-button"
                className="rounded-xl"
              >
                {refreshing ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 size-4" strokeWidth={2} />
                )}
                Làm mới
              </Button>
            </div>
          </RevealOnScroll>

          {error && (
            <p className="mt-3 text-xs text-[hsl(0_72%_42%)]">
              Lỗi tải thống kê: {error}
            </p>
          )}

          {/* KPI Row */}
          <RevealOnScroll delay={0.05}>
            <div
              data-testid="stats-kpi-row"
              className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              <KpiCard
                icon={Users}
                label="Số người đã chơi"
                value={loading ? "..." : (stats?.total_players ?? 0).toLocaleString("vi-VN")}
                sub={hasData ? "Phiên ẩn danh đã hoàn thành" : "Chưa có dữ liệu"}
                accent={{ bg: "hsl(174 55% 92%)", fg: "hsl(174 62% 28%)" }}
              />
              <KpiCard
                icon={Trophy}
                label="Điểm trung bình"
                value={loading ? "..." : (stats?.average_score ?? 0).toFixed(1)}
                sub={`Tối đa lý thuyết: ${10 * GAME_CLAIMS.length + (GAME_CLAIMS.length - 1) * 2} điểm`}
                accent={{ bg: "hsl(38 100% 92%)", fg: "hsl(38 92% 35%)" }}
              />
              <KpiCard
                icon={PercentCircle}
                label="% trả lời đúng TB"
                value={
                  loading
                    ? "..."
                    : `${(stats?.average_correct_pct ?? 0).toFixed(1)}%`
                }
                sub="Trung bình trên tất cả người chơi"
                accent={{ bg: "hsl(205 90% 93%)", fg: "hsl(205 90% 30%)" }}
              />
            </div>
          </RevealOnScroll>

          {/* Per-claim bars */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-6">
              {!hasData && !loading ? (
                <EmptyStatsState playUrl={playUrl} />
              ) : (
                <div
                  data-testid="stats-claim-grid"
                  className="grid grid-cols-1 gap-3 lg:grid-cols-2"
                >
                  {GAME_CLAIMS.map((claim, i) => (
                    <ClaimStatRow
                      key={claim.id}
                      claim={claim}
                      stat={statByClaim.get(claim.id)}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

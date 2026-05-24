import { useEffect, useState } from "react";
import { Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/data/content";

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const StickyNav = () => {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-testid="sticky-nav"
      className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => smoothScrollTo("hero")}
          className="group flex items-center gap-2 transition-colors"
          data-testid="nav-logo"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[hsl(174_55%_92%)] text-[hsl(174_62%_28%)] ring-1 ring-[hsl(214_32%_91%)]">
            <ShieldCheck className="size-5" strokeWidth={2} />
          </span>
          <span className="font-display text-base font-extrabold tracking-tight text-foreground sm:text-lg">
            AI Verification Card
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              data-testid={`nav-${l.id}-link`}
              onClick={() => smoothScrollTo(l.id)}
              className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                active === l.id
                  ? "bg-[hsl(174_55%_92%)] text-[hsl(174_62%_22%)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            data-testid="nav-cta-button"
            size="sm"
            onClick={() => smoothScrollTo("game")}
            className="hidden rounded-xl sm:inline-flex"
          >
            Chơi thử
          </Button>
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  data-testid="nav-mobile-menu"
                  size="icon"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card">
                <SheetHeader>
                  <SheetTitle className="font-display">
                    AI Verification Card
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  {NAV_LINKS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      data-testid={`nav-mobile-${l.id}-link`}
                      onClick={() => {
                        setOpen(false);
                        setTimeout(() => smoothScrollTo(l.id), 80);
                      }}
                      className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                        active === l.id
                          ? "bg-[hsl(174_55%_92%)] text-[hsl(174_62%_22%)]"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

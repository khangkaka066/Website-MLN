import { useEffect, useState, useCallback } from "react";
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

const OBSERVER_OPTIONS = {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const NavLinkButton = ({ link, active, onClick }) => (
  <button
    type="button"
    data-testid={`nav-${link.id}-link`}
    onClick={onClick}
    className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
      active
        ? "bg-[hsl(174_55%_92%)] text-[hsl(174_62%_22%)]"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`}
  >
    {link.label}
  </button>
);

const MobileNavLink = ({ link, active, onClick }) => (
  <button
    type="button"
    data-testid={`nav-mobile-${link.id}-link`}
    onClick={onClick}
    className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
      active
        ? "bg-[hsl(174_55%_92%)] text-[hsl(174_62%_22%)]"
        : "text-foreground hover:bg-secondary"
    }`}
  >
    {link.label}
  </button>
);

const useScrollSpy = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.id)
    ).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, OBSERVER_OPTIONS);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
};

export const StickyNav = () => {
  const active = useScrollSpy();
  const [open, setOpen] = useState(false);

  const handleMobileNav = useCallback((id) => {
    setOpen(false);
    setTimeout(() => smoothScrollTo(id), 80);
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
            <NavLinkButton
              key={l.id}
              link={l}
              active={active === l.id}
              onClick={() => smoothScrollTo(l.id)}
            />
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
                    <MobileNavLink
                      key={l.id}
                      link={l}
                      active={active === l.id}
                      onClick={() => handleMobileNav(l.id)}
                    />
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

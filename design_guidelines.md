{
  "brand": {
    "name": "AI Verification Card",
    "attributes": [
      "Playful/Education (vui mắt, thân thiện)",
      "Academic credibility (rõ ràng, có cấu trúc, đáng tin)",
      "Gen-Z friendly (nhịp nhanh, tương tác, gamification nhẹ)",
      "Presentation-ready (đọc tốt trên máy chiếu, tương phản cao)"
    ],
    "voice": {
      "tone": "Tiếng Việt, ngắn gọn, hướng dẫn từng bước, tránh sáo rỗng",
      "microcopy_rules": [
        "Ưu tiên động từ hành động: ‘Kiểm tra’, ‘Đối chiếu’, ‘Gắn nhãn lỗi’",
        "Thuật ngữ chuyên ngành giữ nguyên như source: De-hallucination, Source Check…",
        "Không dùng tiếng Anh ngoài các thuật ngữ đã có"
      ]
    }
  },
  "design_tokens": {
    "color_system": {
      "notes": [
        "Nền section phải đặc (solid), không dùng nền trong suốt.",
        "Không dùng purple cho AI/chat vibe.",
        "Gradient chỉ dùng làm accent trang trí (<=20% viewport), không phủ vùng đọc nhiều chữ."
      ],
      "palette": {
        "bg": {
          "canvas": "hsl(48 100% 97%)",
          "section_alt": "hsl(210 40% 98%)",
          "card": "hsl(0 0% 100%)"
        },
        "text": {
          "primary": "hsl(222 47% 11%)",
          "secondary": "hsl(215 16% 35%)",
          "muted": "hsl(215 16% 45%)"
        },
        "brand": {
          "primary": "hsl(174 62% 33%)",
          "primary_hover": "hsl(174 62% 28%)",
          "primary_soft": "hsl(174 55% 92%)",
          "accent_orange": "hsl(24 94% 55%)",
          "accent_orange_soft": "hsl(24 100% 93%)",
          "accent_blue": "hsl(205 90% 45%)",
          "accent_blue_soft": "hsl(205 90% 93%)",
          "ink": "hsl(222 47% 11%)"
        },
        "semantic": {
          "success": "hsl(152 60% 35%)",
          "success_soft": "hsl(152 55% 92%)",
          "warning": "hsl(38 92% 50%)",
          "warning_soft": "hsl(38 100% 92%)",
          "danger": "hsl(0 72% 52%)",
          "danger_soft": "hsl(0 90% 96%)",
          "info": "hsl(205 90% 45%)",
          "info_soft": "hsl(205 90% 93%)"
        },
        "borders": {
          "subtle": "hsl(214 32% 91%)",
          "strong": "hsl(214 20% 82%)"
        }
      },
      "shadcn_css_vars": {
        "instructions": "Update /app/frontend/src/index.css :root tokens to match below. Keep background solid; do not rely on .dark.",
        "root": {
          "--background": "48 100% 97%",
          "--foreground": "222 47% 11%",
          "--card": "0 0% 100%",
          "--card-foreground": "222 47% 11%",
          "--popover": "0 0% 100%",
          "--popover-foreground": "222 47% 11%",
          "--primary": "174 62% 33%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "210 40% 98%",
          "--secondary-foreground": "222 47% 11%",
          "--muted": "210 40% 96%",
          "--muted-foreground": "215 16% 35%",
          "--accent": "174 55% 92%",
          "--accent-foreground": "222 47% 11%",
          "--destructive": "0 72% 52%",
          "--destructive-foreground": "0 0% 100%",
          "--border": "214 32% 91%",
          "--input": "214 32% 91%",
          "--ring": "174 62% 33%",
          "--radius": "0.9rem"
        }
      },
      "allowed_gradients": {
        "hero_decor_only": "linear-gradient(135deg, hsl(174 55% 92%) 0%, hsl(205 90% 93%) 45%, hsl(24 100% 93%) 100%)",
        "badge_decor_only": "linear-gradient(90deg, hsl(174 62% 33%) 0%, hsl(205 90% 45%) 100%)",
        "rules": [
          "Không dùng gradient tím/hồng hoặc gradient đậm.",
          "Không dùng gradient cho vùng đọc dài.",
          "Không dùng gradient cho element nhỏ <100px."
        ]
      },
      "noise_texture": {
        "usage": "Overlay noise rất nhẹ cho section hero hoặc background bands để tránh phẳng.",
        "css_snippet": ".noise-overlay{background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.08\"/></svg>');mix-blend-mode:multiply;pointer-events:none;}"
      }
    },
    "typography": {
      "font_pairing": {
        "heading": "Be Vietnam Pro (700/800)",
        "body": "Plus Jakarta Sans (400/500/600)",
        "mono": "IBM Plex Mono (400/500)"
      },
      "google_fonts_import": {
        "instructions": "Add to /app/frontend/src/index.css top: @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');",
        "fallbacks": "system-ui, -apple-system, Segoe UI, Roboto"
      },
      "scale_tailwind": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight",
        "h2": "text-base md:text-lg font-semibold text-muted-foreground",
        "section_title": "text-2xl sm:text-3xl font-bold",
        "card_title": "text-lg font-semibold",
        "body": "text-sm sm:text-base leading-relaxed",
        "small": "text-xs sm:text-sm"
      },
      "vn_readability_rules": [
        "Line-height body >= 1.6",
        "Không dùng all-caps cho tiếng Việt",
        "Dùng IBM Plex Mono cho đoạn văn game/đoạn trích để tạo cảm giác ‘tài liệu’"
      ]
    },
    "spacing_radius_shadow": {
      "container": {
        "max_width": "max-w-6xl",
        "padding": "px-4 sm:px-6 lg:px-8"
      },
      "section_spacing": {
        "y": "py-14 sm:py-18 lg:py-24",
        "gap": "gap-6 sm:gap-8"
      },
      "radius": {
        "card": "rounded-2xl",
        "button": "rounded-xl",
        "pill": "rounded-full"
      },
      "shadow": {
        "card": "shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]",
        "hover": "hover:shadow-[0_16px_40px_-22px_rgba(15,23,42,0.45)]"
      },
      "stroke_style": {
        "playful_outline": "ring-1 ring-border",
        "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      }
    }
  },
  "layout_grid": {
    "global": {
      "pattern": "Mobile-first single column; desktop uses 12-col grid with 2-col narrative blocks.",
      "grid_classes": "grid grid-cols-1 lg:grid-cols-12",
      "left_col": "lg:col-span-5",
      "right_col": "lg:col-span-7",
      "anchor_offset": "Add scroll-mt-24 on each section to account for sticky nav."
    },
    "sticky_nav": {
      "height": "h-16",
      "behavior": [
        "Sticky top with solid background + subtle border",
        "Active section indicator (underline pill) based on scroll position",
        "Mobile: collapse into Sheet (hamburger)"
      ]
    }
  },
  "components": {
    "component_path": {
      "shadcn": {
        "Button": "/app/frontend/src/components/ui/button.jsx",
        "Card": "/app/frontend/src/components/ui/card.jsx",
        "Badge": "/app/frontend/src/components/ui/badge.jsx",
        "Accordion": "/app/frontend/src/components/ui/accordion.jsx",
        "Tabs": "/app/frontend/src/components/ui/tabs.jsx",
        "Tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
        "Popover": "/app/frontend/src/components/ui/popover.jsx",
        "Dialog": "/app/frontend/src/components/ui/dialog.jsx",
        "AlertDialog": "/app/frontend/src/components/ui/alert-dialog.jsx",
        "Progress": "/app/frontend/src/components/ui/progress.jsx",
        "Separator": "/app/frontend/src/components/ui/separator.jsx",
        "ScrollArea": "/app/frontend/src/components/ui/scroll-area.jsx",
        "Sheet": "/app/frontend/src/components/ui/sheet.jsx",
        "NavigationMenu": "/app/frontend/src/components/ui/navigation-menu.jsx",
        "Sonner": "/app/frontend/src/components/ui/sonner.jsx"
      },
      "new_components_to_create": [
        "/app/frontend/src/components/StickyNav.jsx",
        "/app/frontend/src/components/HeroSection.jsx",
        "/app/frontend/src/components/GameFindAIMistakes.jsx",
        "/app/frontend/src/components/TheoryCards.jsx",
        "/app/frontend/src/components/FiveStepsStepper.jsx",
        "/app/frontend/src/components/ApplyStepsWalkthrough.jsx",
        "/app/frontend/src/components/BeforeAfterComparison.jsx",
        "/app/frontend/src/components/ThankYouFooter.jsx"
      ]
    },
    "button_system": {
      "variants": {
        "primary": {
          "classes": "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary)/0.92)]",
          "shape": "rounded-xl",
          "motion": "transition-colors duration-200"
        },
        "secondary": {
          "classes": "bg-secondary text-foreground hover:bg-[hsl(var(--secondary)/0.7)] border border-border",
          "motion": "transition-colors duration-200"
        },
        "ghost": {
          "classes": "bg-transparent hover:bg-accent text-foreground",
          "motion": "transition-colors duration-200"
        }
      },
      "press_feedback": "active:scale-[0.98] transition-transform duration-150 (apply only on buttons, not globally)",
      "data_testid_examples": [
        "data-testid=\"hero-start-button\"",
        "data-testid=\"nav-game-link\""
      ]
    },
    "card_system": {
      "base": "rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)]",
      "padding": "p-5 sm:p-6",
      "header_row": "flex items-start justify-between gap-3",
      "icon_badge": "inline-flex items-center justify-center size-10 rounded-xl bg-[hsl(174_55%_92%)] text-[hsl(174_62%_33%)] ring-1 ring-[hsl(214_32%_91%)]"
    }
  },
  "section_guidelines": {
    "hero": {
      "goal": "Hook ‘Thực tiễn; Chân lý’ + giới thiệu AI Verification Card + CTA.",
      "layout": "Split: left text, right illustration + mini cards.",
      "background": "Solid canvas (bg-[hsl(48_100%_97%)]) + small decorative gradient blob (<=20% viewport) + noise overlay.",
      "components": [
        "Card (mini highlights)",
        "Badge (pill tags)",
        "Button primary CTA"
      ],
      "micro_interactions": [
        "Hero CTA hover: color shift only (transition-colors)",
        "Reveal on scroll: fade+slide up (Framer Motion)"
      ],
      "testids": [
        "hero-section",
        "hero-start-button"
      ]
    },
    "sticky_nav": {
      "visual": "Solid bg-card with border-b; active link as pill highlight.",
      "mobile": "Use Sheet for menu; keep CTA visible.",
      "testids": [
        "sticky-nav",
        "nav-hero-link",
        "nav-game-link",
        "nav-theory-link",
        "nav-steps-link",
        "nav-compare-link"
      ]
    },
    "game_find_ai_mistakes": {
      "goal": "Mini-game ‘Tìm lỗi AI’: click highlight spans -> tooltip/modal giải thích + scoreboard.",
      "layout": {
        "desktop": "Left: đoạn văn (ScrollArea). Right: scoreboard + danh sách lỗi đã tìm.",
        "mobile": "Stack: scoreboard on top, text below; sticky mini-score bar."
      },
      "text_block_style": {
        "container": "rounded-2xl bg-[hsl(210_40%_98%)] ring-1 ring-border p-4 sm:p-6",
        "font": "font-mono text-sm sm:text-base leading-7",
        "selection": "Use custom selection: ::selection { background: hsl(174 55% 92%); }"
      },
      "highlight_spans": {
        "default": "rounded-md px-1.5 py-0.5 bg-[hsl(38_100%_92%)] text-[hsl(222_47%_11%)] ring-1 ring-[hsl(38_92%_50%/0.35)] cursor-pointer",
        "hover": "hover:bg-[hsl(24_100%_93%)] transition-colors duration-150",
        "found": "bg-[hsl(152_55%_92%)] ring-1 ring-[hsl(152_60%_35%/0.35)]",
        "wrong_click": "bg-[hsl(0_90%_96%)] ring-1 ring-[hsl(0_72%_52%/0.35)]"
      },
      "feedback": {
        "tooltip": "Use Tooltip for quick hint on hover (desktop).",
        "dialog": "Use Dialog for full explanation on click (mobile + desktop).",
        "toast": "Use Sonner toast for +points / already found / wrong click."
      },
      "scoreboard": {
        "components": [
          "Card",
          "Progress",
          "Badge",
          "Tabs (Tổng quan / Lỗi đã tìm / Gợi ý)"
        ],
        "metrics": [
          "Điểm",
          "Số lỗi đã tìm / tổng",
          "Chuỗi đúng liên tiếp (streak)"
        ]
      },
      "testids": [
        "game-section",
        "game-text-block",
        "game-scoreboard",
        "game-reset-button",
        "game-hint-button"
      ]
    },
    "theory_cards": {
      "goal": "Định nghĩa lại: ‘Thực tiễn là gì?’ và ‘Chân lý là gì?’",
      "layout": "2 cards side-by-side on desktop; stack on mobile.",
      "components": [
        "Card",
        "Separator",
        "Badge"
      ],
      "visual": "Use academic credibility: clean typography, small icon badge, short bullets.",
      "testids": [
        "theory-section",
        "theory-practice-card",
        "theory-truth-card"
      ]
    },
    "five_steps": {
      "goal": "Focal section: 5 bước trước khi dùng nội dung AI trong học thuật.",
      "ux_choice": "Desktop: Stepper-like vertical timeline + details panel. Mobile: Accordion.",
      "components": [
        "Accordion (mobile)",
        "Tabs (desktop: step list as tabs)",
        "Card (detail panel)",
        "Badge (step number pill)",
        "Progress (overall completion)"
      ],
      "step_card_structure": {
        "fields": [
          "Tiêu đề VN",
          "Tên kỹ thuật (EN) — giữ nguyên",
          "Tư duy cốt lõi",
          "Hành động kiểm chứng (bullets)"
        ],
        "accent_per_step": [
          "Step 1: info (blue)",
          "Step 2: teal",
          "Step 3: orange",
          "Step 4: success (green)",
          "Step 5: ink (neutral)"
        ]
      },
      "micro_interactions": [
        "Active step: left border accent + subtle background tint",
        "On step change: content crossfade (Framer Motion)"
      ],
      "testids": [
        "steps-section",
        "steps-progress",
        "step-1-trigger",
        "step-2-trigger",
        "step-3-trigger",
        "step-4-trigger",
        "step-5-trigger"
      ]
    },
    "apply_steps_walkthrough": {
      "goal": "Áp dụng 5 bước lên đoạn văn của game (walkthrough).",
      "layout": "Left: step list; Right: annotated text result for that step.",
      "components": [
        "Card",
        "Tabs (Step 1..5)",
        "ScrollArea (text)",
        "Badge",
        "Tooltip/Popover for annotations"
      ],
      "pattern": "Each step shows: ‘Bạn đang làm gì’ + ‘Bạn kiểm chứng như thế nào’ + ‘Kết quả’.",
      "testids": [
        "apply-steps-section",
        "apply-steps-tabs",
        "apply-steps-text"
      ]
    },
    "before_after_comparison": {
      "goal": "So sánh trước/sau khi dùng 5 bước (2 cột).",
      "layout": "Desktop: 2 columns side-by-side; Mobile: stack with clear labels.",
      "components": [
        "Card",
        "Badge",
        "Table (optional for structured diffs)",
        "Separator"
      ],
      "visual": {
        "before": "Use warning_soft background + warning border",
        "after": "Use success_soft background + success border"
      },
      "testids": [
        "comparison-section",
        "comparison-before",
        "comparison-after"
      ]
    },
    "footer": {
      "goal": "Thank you for listening!",
      "visual": "Solid section_alt background, small illustration, CTA to replay game.",
      "components": [
        "Button (secondary)",
        "Badge"
      ],
      "testids": [
        "footer-section",
        "footer-replay-button"
      ]
    }
  },
  "motion": {
    "library": {
      "name": "Framer Motion",
      "principles": [
        "Reveal on scroll: y: 12 -> 0, opacity: 0 -> 1",
        "Duration 0.45–0.6s, ease: [0.22, 1, 0.36, 1]",
        "Stagger children 0.06–0.1s",
        "Respect prefers-reduced-motion"
      ]
    },
    "no_universal_transition": "Không dùng transition: all. Chỉ transition-colors/opacity/shadow cho element tương tác.",
    "scroll": {
      "smooth": "Use CSS scroll-behavior: smooth on html (but disable for prefers-reduced-motion).",
      "anchor": "Use scroll-mt-24 on sections."
    }
  },
  "iconography_illustration": {
    "icons": {
      "library": "lucide-react",
      "style": "Stroke 1.75–2, rounded caps; keep icons simple and consistent.",
      "do_not": [
        "Không dùng emoji icons"
      ]
    },
    "illustrations": {
      "style": "Flat + paper-cut shapes, rounded blobs, subtle grain; avoid photoreal heavy hero.",
      "placement": [
        "Hero right column illustration",
        "Small corner doodles in section headers (absolute positioned, low opacity)"
      ]
    }
  },
  "accessibility": {
    "rules": [
      "WCAG AA contrast: text-primary on bg must be readable on projector",
      "Focus ring visible on all interactive elements",
      "Clickable spans in game must be keyboard accessible: render as <button> or <span role=button tabIndex=0>",
      "Tooltips must have accessible trigger labels",
      "Provide reduced motion mode"
    ],
    "keyboard": {
      "game": [
        "Tab cycles through highlighted items",
        "Enter/Space opens explanation dialog"
      ]
    }
  },
  "testing": {
    "data_testid_policy": {
      "rule": "All interactive and key informational elements MUST include data-testid.",
      "naming": "kebab-case, role-based",
      "examples": [
        "data-testid=\"game-highlight-3\"",
        "data-testid=\"steps-progress\"",
        "data-testid=\"comparison-after-card\""
      ]
    }
  },
  "implementation_notes": {
    "css_cleanup": [
      "Remove/ignore default CRA App.css centering styles; do not use .App { text-align:center }.",
      "Prefer Tailwind utilities; keep App.css minimal or delete unused logo styles."
    ],
    "recommended_libraries": [
      {
        "name": "framer-motion",
        "why": "scroll reveal + micro interactions",
        "install": "npm i framer-motion"
      },
      {
        "name": "lucide-react",
        "why": "consistent icons",
        "install": "npm i lucide-react"
      }
    ],
    "js_scaffolds": {
      "scroll_spy": "Use IntersectionObserver to set active nav link; store activeSection in state.",
      "game_state": "Keep foundMistakes Set, score number, streak number; on click: if correct and not found -> add score + toast; else toast warning.",
      "before_after": "Use 2 Card columns; on mobile stack with labels as Badges."
    }
  },
  "image_urls": {
    "hero": [
      {
        "url": "https://images.pexels.com/photos/27967976/pexels-photo-27967976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Abstract paper-cut shapes (playful, bright) for hero illustration area (right column).",
        "category": "hero-illustration"
      }
    ],
    "sections": [
      {
        "url": "https://images.pexels.com/photos/6941090/pexels-photo-6941090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Hands + colorful craft vibe; use as subtle background image in a small card (optional).",
        "category": "supporting-visual"
      },
      {
        "url": "https://images.pexels.com/photos/2440970/pexels-photo-2440970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "description": "Notebook + glasses; use in theory section as small side image (optional).",
        "category": "theory-support"
      }
    ]
  },
  "instructions_to_main_agent": [
    "Single-page landing with anchored sections: Hero, Game, Lý thuyết, 5 Bước, Áp dụng, So sánh, Footer.",
    "Use solid backgrounds for all sections; alternate canvas/section_alt for rhythm.",
    "Implement sticky nav with scroll spy + smooth scroll; add scroll-mt-24 to each section.",
    "Game: render highlighted segments as accessible buttons/spans with data-testid; use Tooltip for hover hints and Dialog for click explanations; show scoreboard with Progress + Tabs.",
    "5 Steps: desktop stepper/tabs + detail panel; mobile accordion. Each step includes VN title + EN technical name + core thinking + action bullets.",
    "Before/After: strict side-by-side 2 columns on desktop; stack on mobile; use warning_soft vs success_soft backgrounds.",
    "Add Framer Motion reveal-on-scroll; respect prefers-reduced-motion.",
    "Ensure all interactive and key informational elements include data-testid (kebab-case).",
    "Do not use emoji icons; use lucide-react icons.",
    "Do not use transition: all; only transition-colors/opacity/shadow where needed."
  ],
  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}

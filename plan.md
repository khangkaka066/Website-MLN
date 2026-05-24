# plan.md

## 1) Objectives
- Xây dựng landing page tiếng Việt “AI Verification Card” dùng cho thuyết trình trên lớp và tài nguyên công khai cho sinh viên.
- Truyền tải khung lý luận “Thực tiễn; Chân lý” và quy trình **5 bước** kiểm chứng nội dung AI trong học thuật.
- Tạo mini-game **“Tìm lỗi AI”** tương tác: click vào cụm từ đáng ngờ → giải thích loại lỗi + theo dõi điểm.
- Trình bày **Apply 5 Steps** lên đoạn văn game và **Before/After** so sánh side-by-side.
- Đảm bảo UX dạng “slideshow-like scroll”, có sticky nav/anchor links, responsive, nền đặc, phong cách Playful/Education, animation mượt (Framer Motion).

## 2) Implementation Steps

### Phase 1: Design + Content + V1 Frontend Build (no POC)
**User stories**
1. Là sinh viên, tôi có thể cuộn trên điện thoại/máy chiếu và đọc rõ từng section với typography thân thiện.
2. Là người thuyết trình, tôi có thể dùng sticky nav để nhảy nhanh đến từng phần khi trình bày.
3. Là sinh viên, tôi có thể chơi “Tìm lỗi AI” bằng cách click vào cụm từ đáng ngờ và nhận phản hồi tức thì.
4. Là sinh viên, tôi có thể mở/đóng từng bước trong “5 Bước” để xem “Tư duy cốt lõi” và “Hành động kiểm chứng”.
5. Là sinh viên, tôi có thể xem so sánh Trước/Sau side-by-side để hiểu hiệu quả của 5 bước.

**Tasks**
- Call **design_agent** để chốt: bảng màu playful/education, typography VN (VD: Be Vietnam Pro), icon/illustration style, layout tokens (radius, shadows), motion guidelines.
- Chuẩn bị nội dung chuẩn cho các section (VN-only) theo thứ tự yêu cầu:
  - Hero/Intro: AI Verification Card + neo vào “Thực tiễn; Chân lý”.
  - Game: 1–2 đoạn văn “giả học thuật” có lỗi (fake citations, bịa tác giả, sai năm, tạp chí không tồn tại, số liệu bịa).
  - Lý luận: “Thực tiễn là gì?”, “Chân lý là gì?” (ngắn gọn, dễ hiểu).
  - 5 Steps: mỗi step có **Tư duy cốt lõi** + **Hành động kiểm chứng** (bullet).
  - Apply 5 Steps: walkthrough sửa đoạn văn game.
  - Before/After: trái (raw + highlight lỗi), phải (bản đã sửa + citation thật/hoặc loại bỏ claim không kiểm chứng).
  - Footer: “Thank you for listening!” + credits.
- Implement trang single-page React (template sẵn có), dùng:
  - shadcn/ui: Card, Accordion, Button, Badge, Dialog/Popover/Tooltip, Tabs (nếu cần).
  - Tailwind: nền đặc, rounded shapes, accent blocks, spacing lớn.
  - Framer Motion: reveal-on-scroll, micro-interactions cho hover/click.
- Mini-game “Tìm lỗi AI” (core UI logic):
  - Render paragraph với **clickable spans** (data-driven list of spans).
  - On click: mở Tooltip/Popover/Dialog hiển thị “Loại lỗi” + giải thích + gợi ý kiểm chứng.
  - Score tracker: tổng mục tiêu, đã tìm, điểm/tiến độ; nút “Chơi lại”.
  - State: foundSpans, attempts, completion banner → CTA: “Đó là lý do bạn cần AI Verification Card.”
- Sticky nav (anchor links) + smooth scroll; highlight section đang active (IntersectionObserver).
- Accessibility tối thiểu: focus states, keyboard navigation cho spans (button-like), contrast.

**Deliverable**: V1 landing page hoàn chỉnh với đầy đủ 7 section + game chạy tốt, responsive.

### Phase 2: End-to-End Testing + Polish
**User stories**
1. Là người dùng, tôi thấy animation mượt nhưng không gây khó chịu (reduced motion tôn trọng OS).
2. Là sinh viên, tôi có thể hoàn thành game và thấy điểm/tiến độ cập nhật đúng.
3. Là sinh viên, tôi có thể đọc “Apply 5 Steps” và đối chiếu trực tiếp với lỗi trong game.
4. Là người thuyết trình, tôi có thể mở trang trên màn hình lớn và bố cục không vỡ.
5. Là người dùng mobile, tôi vẫn xem được Before/After (stack khi hẹp) mà không mất thông tin.

**Tasks**
- Call **testing_agent_v3**: kiểm tra luồng cuộn → nav → game → accordion → before/after trên mobile/desktop.
- Fix bugs UI/state: scoring, reset, tooltip/modal closing, anchor offsets (sticky header).
- Polish: tối ưu spacing/typography, thêm empty/error states nhỏ (ví dụ: “Bạn đã tìm hết lỗi”).
- Performance pass: giảm re-renders game, tối ưu motion, kiểm tra CLS.

### Phase 3: Optional Enhancements (after V1 stable)
**User stories**
1. Là sinh viên, tôi có thể đổi sang “Đoạn văn #2” để chơi thêm mà không tải lại trang.
2. Là sinh viên, tôi có thể xem “Gợi ý” theo từng bước nếu bí.
3. Là sinh viên, tôi có thể copy bản “Sau khi kiểm chứng” để tham khảo.
4. Là người thuyết trình, tôi có thể bật “Presenter mode” (tăng cỡ chữ/giãn dòng) cho máy chiếu.
5. Là người dùng, tôi có thể tải/ in “AI Verification Card” dạng 1 trang (print stylesheet).

**Tasks**
- Thêm lựa chọn paragraph set (2 đoạn) + progress per round.
- Thêm hint system nhẹ (giới hạn số lần).
- Thêm nút Copy/Download (client-only), và CSS print.
- Refactor nhỏ: tách components theo section, data JSON cho game/steps.
- Test lại bằng **testing_agent_v3**.

## STATUS UPDATE (V1 COMPLETE)
- Phase 1 (Design + Build): COMPLETED. design_agent gave guidelines; landing page fully implemented with 7 sections, sticky nav, Vietnamese content, interactive game, Framer Motion reveals.
- Phase 2 (E2E Testing): COMPLETED. testing_agent_v3 reported 100% pass on all features (32 tests passed, 0 issues found) on both desktop (1920x1080) and mobile (390x844).
- All user stories for Phase 1 and Phase 2 covered.
- Phase 3 (optional enhancements: multi-paragraph game, print mode, presenter mode) available on demand.

## 3) Next Actions
1. Gọi **design_agent** để chốt guideline (palette, fonts VN, icon style, motion).
2. Soạn 1–2 đoạn văn game + mapping spans → error types/explanations (data structure).
3. Implement V1 single-page: sections + sticky nav + game + accordion 5 steps + apply + before/after.
4. Chạy **testing_agent_v3** và sửa đến khi ổn định.

## 4) Success Criteria
- Đủ **7 sections đúng thứ tự**; nội dung VN-only; phong cách Playful/Education, nền đặc.
- Game hoạt động: click span → hiện giải thích; score/tiến độ đúng; có reset; CTA chuyển mạch hợp lý.
- 5 Steps: hiển thị rõ “Tư duy cốt lõi” + “Hành động kiểm chứng” (expand/collapse mượt).
- Apply 5 Steps + Before/After side-by-side rõ ràng; responsive (stack trên mobile).
- Sticky nav + smooth scroll hoạt động; trình chiếu trên projector không vỡ layout.
- Testing pass: không lỗi nghiêm trọng UI/state, không block tương tác chính.
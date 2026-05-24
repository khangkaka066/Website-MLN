// Toàn bộ nội dung tiếng Việt cho landing page AI Verification Card.
// Tách dữ liệu khỏi component để dễ chỉnh sửa khi thuyết trình.

export const HERO = {
  eyebrow: "AI Verification Card",
  title: "Đừng tin AI một cách mù quáng. Hãy kiểm chứng.",
  highlight: "Thực tiễn; Chân lý",
  subtitle:
    "Bộ thẻ 5 bước giúp bạn dùng nội dung AI trong học thuật một cách tỉnh táo — đặt nền trên hai trụ cột của triết học: thực tiễn và chân lý.",
  ctas: [
    { id: "start", label: "Chơi game tìm lỗi AI", target: "game", variant: "primary" },
    { id: "steps", label: "Xem 5 bước kiểm chứng", target: "steps", variant: "secondary" },
  ],
  bullets: [
    "Mặc định mọi output AI chỉ là giả thuyết",
    "Chân lý luôn cụ thể, không chung chung",
    "Thực tiễn là tiêu chuẩn duy nhất",
    "Con người là bộ lọc cuối cùng",
  ],
};

export const NAV_LINKS = [
  { id: "hero", label: "Mở đầu" },
  { id: "game", label: "Game tìm lỗi" },
  { id: "theory", label: "Lý thuyết" },
  { id: "steps", label: "5 Bước" },
  { id: "apply", label: "Áp dụng" },
  { id: "compare", label: "Trước / Sau" },
];

// Đoạn văn AI có lỗi cho mini-game.
// Mỗi phần tử là một segment: text thường (kind: 'text') hoặc đoạn có lỗi (kind: 'error').
// Khi click vào error → hiển thị giải thích.
const PARAGRAPH_RAW = [
  { kind: "text", text: "Theo nghiên cứu của " },
  {
    kind: "error",
    id: "err-1",
    text: "Nguyễn Văn Tuấn (2019) đăng trên tạp chí Vietnam Journal of Artificial Cognition",
    type: "Nguồn bịa (Fake citation)",
    explain:
      "Tạp chí 'Vietnam Journal of Artificial Cognition' không tồn tại trong các cơ sở dữ liệu học thuật (Scopus, Web of Science, Google Scholar). Tên tác giả + năm + tên tạp chí được AI tự ghép lại nghe có vẻ uy tín nhưng không thể tra cứu.",
    fix: "Tìm trực tiếp trên Google Scholar / arXiv. Nếu không có DOI hoặc link gốc, loại bỏ.",
  },
  { kind: "text", text: ", mô hình GPT-4 đạt độ chính xác " },
  {
    kind: "error",
    id: "err-2",
    text: "99.7%",
    type: "Số liệu đáng ngờ (Suspicious statistic)",
    explain:
      "Một con số quá cụ thể, quá tròn trịa, không có thang đo, không có tập dữ liệu kèm theo. Đây là 'mùi' điển hình của AI hallucination khi bị ép trả lời định lượng.",
    fix: "Yêu cầu nguồn cụ thể: tập test nào? phương pháp đánh giá? n = bao nhiêu? Không có → bỏ.",
  },
  { kind: "text", text: " trong các bài kiểm tra triết học Mác–Lênin. Trong cuốn 'Triết học và Trí tuệ Nhân tạo' (NXB Tri thức, 2022), tác giả " },
  {
    kind: "error",
    id: "err-3",
    text: "Trần Đức Thảo đã khẳng định",
    type: "Sai sự kiện lịch sử (Factual error)",
    explain:
      "Triết gia Trần Đức Thảo (1917–1993) qua đời từ năm 1993, không thể là tác giả của một cuốn sách xuất bản năm 2022. AI đã ghép một nhân vật uy tín vào một công trình bịa để tăng độ tin cậy.",
    fix: "Đối chiếu năm mất / năm xuất bản với Wikipedia hoặc thư viện quốc gia. Mâu thuẫn → loại bỏ.",
  },
  { kind: "text", text: " rằng " },
  {
    kind: "error",
    id: "err-4",
    text: "'thực tiễn là tiêu chuẩn duy nhất của chân lý trong kỷ nguyên AI'",
    type: "Trích dẫn ngụy tạo (Fabricated quote)",
    explain:
      "Câu trích này KHÔNG xuất hiện trong bất kỳ công trình thật nào của Trần Đức Thảo. AI đã 'sáng tác' một câu nghe rất triết học bằng cách trộn khái niệm Mác-Lênin với buzzword 'kỷ nguyên AI'.",
    fix: "Trích dẫn phải tra được nguyên văn từ bản gốc (trang, chương). Không tra được → không dùng.",
  },
  { kind: "text", text: ". " },
  {
    kind: "error",
    id: "err-5",
    text: "Nghiên cứu mới nhất của MIT năm 2024",
    type: "Nguồn mơ hồ (Vague source)",
    explain:
      "'MIT' là một viện lớn với hàng nghìn nghiên cứu mỗi năm. Không có tên tác giả, không có tên bài báo, không có link → đây là cách AI tạo cảm giác uy tín giả.",
    fix: "Ép AI / tự tìm: tên paper cụ thể, tác giả, DOI, link arXiv. Không có → bỏ.",
  },
  { kind: "text", text: " chỉ ra " },
  {
    kind: "error",
    id: "err-6",
    text: "87% sinh viên Việt Nam sử dụng ChatGPT đã cải thiện điểm trung bình lên 2.3 điểm GPA",
    type: "Suy luận phi logic (Logic fallacy)",
    explain:
      "Hệ thống điểm GPA tại Việt Nam phổ biến là thang 4.0 hoặc 10. 'Tăng 2.3 điểm GPA' nghe khả thi nhưng kết hợp với '87%' không kèm thiết kế nghiên cứu là một mệnh đề rỗng. Mối quan hệ nhân quả (dùng ChatGPT → tăng điểm) cũng chưa được chứng minh.",
    fix: "Tách 3 câu hỏi: (1) Mẫu nghiên cứu? (2) Thiết kế đối chứng? (3) Tương quan hay nhân quả? Không trả lời được → bỏ.",
  },
  { kind: "text", text: "." },
];

// Stable id for every segment (text segments get auto-generated ids so React keys are stable).
export const GAME_PARAGRAPH = PARAGRAPH_RAW.map((seg, idx) =>
  seg.id ? seg : { ...seg, id: `txt-${idx}` }
);

export const THEORY = {
  practice: {
    title: "Thực tiễn là gì?",
    short: "Thực tiễn = toàn bộ hoạt động vật chất có mục đích của con người để cải tạo thế giới.",
    bullets: [
      "Là cầu nối giữa nhận thức và hiện thực",
      "Là cơ sở, động lực và mục đích của nhận thức",
      "Là tiêu chuẩn duy nhất để kiểm tra chân lý",
    ],
    note: "Một lý thuyết dù hay đến đâu, nếu không khớp với thực tiễn — nó chưa phải chân lý.",
  },
  truth: {
    title: "Chân lý là gì?",
    short: "Chân lý = tri thức phản ánh đúng hiện thực khách quan, được thực tiễn kiểm nghiệm.",
    bullets: [
      "Tính khách quan: không phụ thuộc ý chí cá nhân",
      "Tính cụ thể: đúng trong một bối cảnh xác định",
      "Tính tương đối & tuyệt đối: phát triển qua từng giai đoạn nhận thức",
    ],
    note: "AI có thể nói trơn tru — nhưng trơn tru ≠ đúng. Chân lý phải cụ thể, kiểm chứng được.",
  },
};

export const STEPS = [
  {
    n: 1,
    title: "Giải ảo & Kiểm tra Nguồn",
    en: "De-hallucination & Source Check",
    accent: "blue",
    core:
      "Nhận diện tính tương đối: Mặc định xem mọi output của AI chỉ là GIẢ THUYẾT, không phải sự thật.",
    actions: [
      "Đặt câu hỏi: 'Thông tin này có điểm nào thiếu logic, chung chung hoặc đáng ngờ không?'",
      "Truy vết nguồn gốc: AI lấy từ đâu? Có dẫn link, DOI, tài liệu thật không?",
      "Tra cứu trực tiếp trên Google Scholar, arXiv.org",
    ],
  },
  {
    n: 2,
    title: "Định vị bối cảnh & Xác minh sự thật",
    en: "Contextualization & Fact Verification",
    accent: "teal",
    core:
      "Tính cụ thể của chân lý: Một kiến thức đúng ở chỗ này chưa chắc đã đúng ở chỗ khác.",
    actions: [
      "Kiểm tra AI có áp dụng đúng vào bối cảnh bài làm của bạn không",
      "Phát hiện 'râu ông nọ cắm cằm bà kia'",
      "Đối chiếu sự kiện với sách, báo chính thống hoặc chuyên gia uy tín",
    ],
  },
  {
    n: 3,
    title: "Đối chiếu khách quan & Phát hiện thiên lệch",
    en: "Objective Cross-referencing & Bias Detection",
    accent: "orange",
    core:
      "Tìm kiếm cơ sở khách quan: TUYỆT ĐỐI không dùng AI để chứng minh AI.",
    actions: [
      "Lấy key terms AI cung cấp → tra chéo trên Google Scholar, giáo trình, papers",
      "Đánh giá: AI có thiên vị, một chiều, mang định kiến không?",
      "AI có bỏ sót các góc nhìn quan trọng khác không?",
    ],
  },
  {
    n: 4,
    title: "Kiểm chứng qua Thực tiễn",
    en: "Practical Verification & Logic Check",
    accent: "green",
    core:
      "Thực tiễn là tiêu chuẩn DUY NHẤT: Mọi lý thuyết phải được chứng minh bằng thực hành.",
    actions: [
      "Kiểm tra tính nhất quán: các ý có tự mâu thuẫn không?",
      "Thử nghiệm thực tế: ráp vào luận điểm bài xem có khớp",
      "Nếu là code/kỹ thuật → chạy thử trên Colab, IDE; kết quả đúng kỳ vọng mới được nhận",
    ],
  },
  {
    n: 5,
    title: "Biện chứng, Tích hợp & Quyết định",
    en: "Dialectic Integration & Human Decision",
    accent: "ink",
    core:
      "Sự phát triển của nhận thức: Con người là bộ lọc cuối cùng. Kiến thức của AI chỉ là nguyên liệu thô.",
    actions: [
      "Phủ định biện chứng: thẳng tay gạt bỏ đoạn AI viết sai, ảo giác, sáo rỗng",
      "Giữ lại, tinh chỉnh, làm chủ phần đúng → biến thành kiến thức của bạn",
      "Ra quyết định cuối cùng bằng tư duy độc lập, không phụ thuộc máy móc",
    ],
  },
];

export const APPLY_STEPS = [
  {
    n: 1,
    label: "Bước 1: Giải ảo & Nguồn",
    doing: "Đặt nghi vấn với toàn bộ đoạn AI và tìm xem mỗi mệnh đề có nguồn không.",
    how: "Tìm 'Vietnam Journal of Artificial Cognition' trên Google Scholar và Scopus.",
    result:
      "Không tồn tại tạp chí này → loại bỏ trích dẫn Nguyễn Văn Tuấn (2019). 'MIT 2024' quá mơ hồ → yêu cầu tên paper cụ thể, không có → loại bỏ.",
  },
  {
    n: 2,
    label: "Bước 2: Bối cảnh & Sự kiện",
    doing: "Đối chiếu các sự kiện với nguồn chính thống.",
    how: "Tra Trần Đức Thảo trên Wikipedia + Thư viện Quốc gia: ông mất năm 1993.",
    result:
      "Sách xuất bản 2022 mang tên Trần Đức Thảo là điều bất khả thi → loại bỏ trích dẫn này. Câu nói được gán cũng không tra được trong các tác phẩm thật của ông.",
  },
  {
    n: 3,
    label: "Bước 3: Đối chiếu khách quan",
    doing: "Tra chéo các con số trên nguồn độc lập.",
    how: "Search '99.7% GPT-4 philosophy accuracy', '87% Vietnamese students ChatGPT GPA 2.3' trên Google Scholar và các báo cáo OECD/UNESCO.",
    result:
      "Không có nghiên cứu nào cho ra các con số này → AI đang thiên vị mặt 'AI tốt'. Bỏ tất cả số liệu định lượng không có nguồn.",
  },
  {
    n: 4,
    label: "Bước 4: Thực tiễn & Logic",
    doing: "Kiểm tra tính nhất quán nội bộ và khớp với thực tiễn người học.",
    how: "Hỏi: GPA Việt Nam phổ biến thang nào? Mối quan hệ giữa dùng AI và điểm có phải nhân quả không? Có sinh viên dùng AI nhưng điểm vẫn thấp không?",
    result:
      "Mệnh đề '+2.3 GPA' không khả thi đồng đều cho 87% mẫu — vi phạm logic. Thực tiễn lớp học cho thấy kết quả rất phân hóa → bác bỏ.",
  },
  {
    n: 5,
    label: "Bước 5: Biện chứng & Quyết định",
    doing: "Phủ định những gì sai, giữ lại ý đúng, viết lại bằng giọng của bạn.",
    how: "Giữ tinh thần: 'AI có thể là công cụ học tập, nhưng cần được kiểm chứng.' Loại bỏ mọi số liệu/citation bịa.",
    result:
      "Đoạn văn cuối cùng ngắn hơn, trung thực hơn, có thể đứng vững trước phản biện học thuật.",
  },
];

export const BEFORE_AFTER = {
  before: {
    title: "Trước khi dùng 5 bước",
    subtitle: "Bản AI thô — nghe hay nhưng đầy lỗi",
    text:
      "Theo nghiên cứu của Nguyễn Văn Tuấn (2019) đăng trên tạp chí Vietnam Journal of Artificial Cognition, mô hình GPT-4 đạt độ chính xác 99.7% trong các bài kiểm tra triết học Mác–Lênin. Trong cuốn 'Triết học và Trí tuệ Nhân tạo' (NXB Tri thức, 2022), tác giả Trần Đức Thảo đã khẳng định rằng 'thực tiễn là tiêu chuẩn duy nhất của chân lý trong kỷ nguyên AI'. Nghiên cứu mới nhất của MIT năm 2024 chỉ ra 87% sinh viên Việt Nam sử dụng ChatGPT đã cải thiện điểm trung bình lên 2.3 điểm GPA.",
    issues: [
      "Tạp chí bịa",
      "Số liệu không có nguồn",
      "Tác giả đã mất trước năm xuất bản",
      "Trích dẫn ngụy tạo",
      "Nguồn mơ hồ ('MIT 2024')",
      "Suy luận phi logic về GPA",
    ],
  },
  after: {
    title: "Sau khi dùng 5 bước",
    subtitle: "Bản đã kiểm chứng — ngắn hơn, trung thực hơn",
    text:
      "Các mô hình ngôn ngữ lớn (LLM) như GPT-4 đã được áp dụng vào nhiều bài toán hỗ trợ học tập, bao gồm cả các môn lý luận chính trị. Tuy nhiên, hiện chưa có nghiên cứu đối chứng quy mô lớn, được bình duyệt, định lượng được mức độ chính xác của AI trong các bài kiểm tra triết học Mác–Lênin tại Việt Nam. Việc sinh viên có cải thiện kết quả học tập hay không khi dùng AI phụ thuộc vào cách sử dụng (xem AI là công cụ tra cứu hay là 'người làm bài hộ') và năng lực kiểm chứng của chính người học.",
    wins: [
      "Mọi mệnh đề đều có thể kiểm chứng hoặc được đánh dấu là chưa kiểm chứng",
      "Không có citation bịa",
      "Không có số liệu vô căn cứ",
      "Giữ đúng tinh thần: thực tiễn là tiêu chuẩn của chân lý",
    ],
  },
};

export const FOOTER = {
  title: "Cảm ơn bạn đã lắng nghe!",
  subtitle:
    "AI Verification Card — nhỏ gọn, dễ nhớ, để mỗi lần bạn copy output AI vào bài, bạn dừng lại 5 nhịp.",
  signature: "Thực tiễn — Chân lý — Con người ra quyết định.",
};

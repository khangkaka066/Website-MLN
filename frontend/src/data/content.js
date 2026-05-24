// Toàn bộ nội dung tiếng Việt cho landing page AI Verification Card.
// Tách dữ liệu khỏi component để dễ chỉnh sửa khi thuyết trình.

export const HERO = {
  eyebrow: "AI Verification Card",
  title: "Đừng tin AI một cách mù quáng. Hãy kiểm chứng.",
  highlight: "Thực tiễn; Chân lý",
  subtitle:
    "Bộ thẻ 5 bước giúp bạn dùng nội dung AI trong học thuật một cách tỉnh táo — đặt nền trên hai trụ cột của triết học: thực tiễn và chân lý.",
  ctas: [
    { id: "start", label: "Chơi game AI Verification", target: "game", variant: "primary" },
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
  { id: "game", label: "Game" },
  { id: "theory", label: "Lý thuyết" },
  { id: "steps", label: "5 Bước" },
  { id: "apply", label: "Áp dụng" },
  { id: "compare", label: "Trước / Sau" },
];

// ============================================================
// GAME: "Đạt / Cần kiểm chứng" — claim-by-claim quiz
// Người chơi quét QR để tham gia trên điện thoại, AI lần lượt
// đưa ra các câu khẳng định, người chơi chọn "Đạt" (claim ổn)
// hoặc "Cần kiểm chứng" (claim đáng ngờ, cần áp dụng 5 bước).
// ============================================================
export const GAME_INTRO = {
  title: "AI Verification Quiz",
  tagline: "Quét QR để tham gia — hoặc chơi luôn tại đây",
  description:
    "AI sẽ lần lượt đưa ra các câu khẳng định học thuật. Bạn chọn “Đạt” nếu câu đó đủ tin cậy để dùng trong bài, hoặc “Cần kiểm chứng” nếu bạn nghi ngờ và muốn áp dụng 5 bước.",
  scanHint: "Mở camera điện thoại, quét mã QR để chơi cùng cả lớp.",
};

export const GAME_CLAIMS = [
  {
    id: "claim-1",
    text:
      "Sinh viên dùng AI sẽ tăng 300% hiệu quả học tập (Nguyễn, 2024).",
    answer: "verify", // 'pass' | 'verify'
    label: "Cần kiểm chứng",
    why:
      "Số liệu “300%” quá tròn trịa và rất lớn; tên tác giả “Nguyễn, 2024” mơ hồ, không có tên đầy đủ, không có nơi đăng. Đây là một “ảo giác có vẻ học thuật” điển hình.",
    fix:
      "Yêu cầu nguồn cụ thể: tên đầy đủ tác giả, tên tạp chí, DOI, mẫu nghiên cứu n=? Không có → không dùng.",
    tag: "Số liệu phóng đại",
  },
  {
    id: "claim-2",
    text:
      "Triết gia Trần Đức Thảo trong cuốn “AI và Chân lý” (NXB Tri thức, 2022) đã viết: “Thực tiễn vẫn là tiêu chuẩn của chân lý trong kỷ nguyên số.”",
    answer: "verify",
    label: "Cần kiểm chứng",
    why:
      "Trần Đức Thảo (1917–1993) qua đời từ năm 1993, không thể xuất bản sách năm 2022. AI đã ghép một tên tuổi lớn vào một công trình bịa để tăng độ tin cậy giả.",
    fix:
      "Đối chiếu năm mất / năm xuất bản với Wikipedia hoặc thư viện quốc gia. Mâu thuẫn lịch sử → loại bỏ.",
    tag: "Sai sự kiện lịch sử",
  },
  {
    id: "claim-3",
    text:
      "Thực tiễn là toàn bộ hoạt động vật chất có mục đích của con người nhằm cải tạo thế giới (theo Triết học Mác – Lênin).",
    answer: "pass",
    label: "Đạt",
    why:
      "Đây là định nghĩa kinh điển của thực tiễn trong triết học Mác – Lênin, có trong giáo trình chính thống do Bộ GD&ĐT phát hành. Có thể trích dẫn được nguyên văn từ giáo trình.",
    fix:
      "Vẫn nên ghi rõ trang/giáo trình khi trích dẫn — nhưng nội dung mệnh đề là chính xác.",
    tag: "Định nghĩa kinh điển",
  },
  {
    id: "claim-4",
    text:
      "Một nghiên cứu mới nhất của Harvard chỉ ra ChatGPT giúp sinh viên giảm 47,3% thời gian viết luận.",
    answer: "verify",
    label: "Cần kiểm chứng",
    why:
      "Không có tên paper, không có tên tác giả, không có link. “Harvard” là một đại học lớn với hàng nghìn nghiên cứu — viện dẫn chung chung như vậy chính là cách AI tạo cảm giác uy tín giả.",
    fix:
      "Search trên Google Scholar bằng tên paper cụ thể. Không có paper cụ thể → bỏ con số.",
    tag: "Nguồn mơ hồ",
  },
  {
    id: "claim-5",
    text:
      "Mọi mô hình ngôn ngữ lớn (LLM) đều có thể bị hiện tượng “ảo giác” (hallucination) — tức trả lời sai mà nghe rất thuyết phục.",
    answer: "pass",
    label: "Đạt",
    why:
      "Đây là quan sát đã được rất nhiều nghiên cứu xác nhận (OpenAI 2023 GPT-4 technical report, Anthropic 2024, v.v.) và đã trở thành kiến thức nền trong cộng đồng AI. Có thể dùng — nhưng nên trích thêm nguồn nếu là bài học thuật.",
    fix:
      "Để chắc chắn, kèm thêm 1–2 paper trên arXiv/Anthropic blog làm chỗ dựa.",
    tag: "Kiến thức nền đã xác lập",
  },
  {
    id: "claim-6",
    text:
      "Theo arXiv:9999.12345, GPT-5 đã vượt qua bài kiểm tra triết học Mác – Lênin của Đại học Quốc gia Hà Nội với điểm tuyệt đối.",
    answer: "verify",
    label: "Cần kiểm chứng",
    why:
      "Mã arXiv “9999.12345” không tồn tại (định dạng arXiv chỉ tới 4 chữ số đầu là năm/tháng). Đây là cách AI giả mạo một định danh học thuật để gây tin tưởng.",
    fix:
      "Truy cập arxiv.org/abs/<id> để kiểm tra. Không tồn tại / 404 → claim này là bịa.",
    tag: "Định danh học thuật giả",
  },
  {
    id: "claim-7",
    text:
      "AI sẽ thay thế hoàn toàn giảng viên triết học trong vòng 5 năm tới (Future Institute, 2025).",
    answer: "verify",
    label: "Cần kiểm chứng",
    why:
      "(1) “Future Institute” là tên rất mơ hồ, không xác định được tổ chức cụ thể. (2) Đây là một dự báo tương lai — không có “thực tiễn” nào kiểm nghiệm được ngay. (3) Mệnh đề “thay thế hoàn toàn” mang tính tuyệt đối, vi phạm tính cụ thể của chân lý.",
    fix:
      "Đối chiếu với các báo cáo có thẩm quyền (UNESCO, OECD) — và nhớ: dự báo ≠ chân lý.",
    tag: "Dự báo tuyệt đối hóa",
  },
  {
    id: "claim-8",
    text:
      "Theo Wikipedia, một số hệ AI hiện nay đã đạt được “ý thức tự thân” và có thể tự nhận thức về sự tồn tại của chính mình.",
    answer: "verify",
    label: "Cần kiểm chứng",
    why:
      "(1) Wikipedia không phải nguồn học thuật sơ cấp. (2) Cộng đồng AI khoa học hiện nay KHÔNG xác nhận bất kỳ hệ AI nào đạt “ý thức tự thân”. Đây là cách AI nhặt một tin giật gân và đóng gói lại như sự thật.",
    fix:
      "Tra cứu Stanford Encyclopedia of Philosophy, paper peer-reviewed về consciousness. Không có bằng chứng → bỏ.",
    tag: "Nguồn yếu + claim phi thực tiễn",
  },
];

export const THEORY = {
  practice: {
    title: "Thực tiễn là gì?",
    short:
      "Thực tiễn = toàn bộ hoạt động vật chất có mục đích của con người để cải tạo thế giới.",
    bullets: [
      "Là cầu nối giữa nhận thức và hiện thực",
      "Là cơ sở, động lực và mục đích của nhận thức",
      "Là tiêu chuẩn duy nhất để kiểm tra chân lý",
    ],
    note:
      "Một lý thuyết dù hay đến đâu, nếu không khớp với thực tiễn — nó chưa phải chân lý.",
  },
  truth: {
    title: "Chân lý là gì?",
    short:
      "Chân lý = tri thức phản ánh đúng hiện thực khách quan, được thực tiễn kiểm nghiệm.",
    bullets: [
      "Tính khách quan: không phụ thuộc ý chí cá nhân",
      "Tính cụ thể: đúng trong một bối cảnh xác định",
      "Tính tương đối & tuyệt đối: phát triển qua từng giai đoạn nhận thức",
    ],
    note:
      "AI có thể nói trơn tru — nhưng trơn tru ≠ đúng. Chân lý phải cụ thể, kiểm chứng được.",
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

// Apply 5 Steps — walkthrough on claim #1 ("300% hiệu quả học tập")
export const APPLY_CLAIM = {
  text:
    "Sinh viên dùng AI sẽ tăng 300% hiệu quả học tập (Nguyễn, 2024).",
  label: "Câu khẳng định mẫu (từ game)",
};

export const APPLY_STEPS = [
  {
    n: 1,
    label: "Bước 1: Giải ảo & Nguồn",
    doing:
      "Đặt nghi vấn với mọi mệnh đề. Hỏi: con số 300% từ đâu ra? Ai là “Nguyễn, 2024”?",
    how:
      "Tìm “Nguyễn 2024 AI student learning effectiveness” trên Google Scholar, Vietnam Journal of Education.",
    result:
      "Không tìm thấy paper nào khớp. Tên tác giả mơ hồ, không có DOI → claim mất gốc.",
  },
  {
    n: 2,
    label: "Bước 2: Bối cảnh & Sự kiện",
    doing:
      "Định vị: “hiệu quả học tập” đo bằng gì? GPA? thời gian? điểm môn nào? bối cảnh nào?",
    how:
      "Đối chiếu định nghĩa “hiệu quả học tập” trong giáo dục học (Bloom, Hattie). Không có khung đo nào cho ra mức tăng 300% trên diện rộng.",
    result:
      "Mệnh đề thiếu bối cảnh đo lường → vi phạm tính cụ thể của chân lý.",
  },
  {
    n: 3,
    label: "Bước 3: Đối chiếu khách quan",
    doing:
      "Tra chéo với các báo cáo độc lập về AI trong giáo dục.",
    how:
      "Đọc OECD AI in Education (2023), UNESCO Generative AI in Education (2023): các báo cáo này chỉ ra cải thiện vài %–vài chục % trong một số nhiệm vụ cụ thể, KHÔNG có 300%.",
    result:
      "Claim mâu thuẫn với các báo cáo có thẩm quyền → khả năng cao là phóng đại.",
  },
  {
    n: 4,
    label: "Bước 4: Thực tiễn & Logic",
    doing:
      "Đối chiếu với thực tiễn lớp học: có sinh viên dùng AI mà điểm vẫn thấp không?",
    how:
      "Hỏi 10–20 bạn cùng lớp. Quan sát: chất lượng học tập phụ thuộc nhiều biến (động cơ, nền tảng, cách dùng), không phải chỉ có/không dùng AI.",
    result:
      "Thực tiễn cho thấy không thể có mức tăng đồng đều 300%. Logic nhân quả chưa được chứng minh → bác bỏ.",
  },
  {
    n: 5,
    label: "Bước 5: Biện chứng & Quyết định",
    doing:
      "Phủ định cái sai, giữ cái đúng, viết lại bằng giọng của bạn.",
    how:
      "Giữ tinh thần: “AI có thể là công cụ học tập hữu ích, nhưng cần được kiểm chứng.” Loại bỏ số liệu bịa.",
    result:
      "Bản viết lại trung thực hơn, có thể đứng vững trước phản biện học thuật.",
  },
];

export const BEFORE_AFTER = {
  before: {
    title: "Trước khi dùng 5 bước",
    subtitle: "Bản AI thô — nghe có vẻ chắc nhưng không kiểm chứng được",
    text:
      "Sinh viên dùng AI sẽ tăng 300% hiệu quả học tập (Nguyễn, 2024). Một nghiên cứu mới nhất của Harvard cũng chỉ ra ChatGPT giúp sinh viên giảm 47,3% thời gian viết luận. Theo arXiv:9999.12345, GPT-5 đã vượt qua bài kiểm tra triết học Mác – Lênin của Đại học Quốc gia Hà Nội với điểm tuyệt đối.",
    issues: [
      "Số 300% phóng đại, tác giả mơ hồ",
      "“Harvard” quá chung chung, không có paper",
      "Mã arXiv giả (sai định dạng)",
      "Không có DOI / link kiểm chứng được",
      "Mọi mệnh đề đều mang giọng tuyệt đối",
      "Không có khung đo lường rõ ràng",
    ],
  },
  after: {
    title: "Sau khi dùng 5 bước",
    subtitle: "Bản đã kiểm chứng — khiêm tốn hơn, đứng vững hơn",
    text:
      "Một số nghiên cứu sơ bộ (OECD 2023, UNESCO 2023) ghi nhận AI hỗ trợ học tập có thể cải thiện một số nhiệm vụ cụ thể như tóm tắt, gợi ý dàn ý — với mức độ thay đổi theo bối cảnh, không phải con số đồng đều cho mọi người học. Hiệu quả thực tế phụ thuộc nhiều biến (động cơ, nền tảng, cách dùng) và cần được kiểm chứng qua thực tiễn lớp học, chứ không thể khái quát hoá thành một con số duy nhất.",
    wins: [
      "Mọi mệnh đề có thể tra cứu được hoặc gắn nhãn “sơ bộ”",
      "Không số liệu bịa, không citation giả",
      "Tôn trọng tính cụ thể của chân lý",
      "Đặt thực tiễn lớp học làm chuẩn kiểm chứng",
    ],
  },
};

export const FOOTER = {
  title: "Cảm ơn bạn đã lắng nghe!",
  subtitle:
    "AI Verification Card — nhỏ gọn, dễ nhớ, để mỗi lần bạn copy output AI vào bài, bạn dừng lại 5 nhịp.",
  signature: "Thực tiễn — Chân lý — Con người ra quyết định.",
};

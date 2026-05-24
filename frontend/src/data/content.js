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
    text: "Triết học Mác - Lênin cho rằng thế giới vật chất là sản phẩm do ý thức con người tạo ra, và có những sự vật, hiện tượng tồn tại khách quan mà con người vĩnh viễn không bao giờ có khả năng nhận thức được.",
    originText: "Triết học Mác - Lênin thừa nhận sự tồn tại khách quan của thế giới và cho rằng thế giới khách quan là đối tượng của nhận thức. Không phải ý thức của con người sản sinh ra thế giới mà thế giới vật chất tồn tại độc lập với con người, đó là nguồn gốc “duy nhất và cuối cùng” của nhận thức. Triết học Mác - Lênin khẳng định khả năng nhận thức thế giới của con người. V.I. Lênin đã chỉ rõ chỉ có những cái mà con người chưa biết chứ không có cái gì không thể biết: “Dứt khoát là không có và không thể có bất kỳ sự khác nhau nào về nguyên tắc giữa hiện tượng và vật tự nó. Chỉ có sự khác nhau giữa cái đã được nhận thức và cái chưa được nhận thức",
    originCitation: "trang 262, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "",
    fix: "Thế giới vật chất không phải ý thức con người sản sinh ra thế giới mà thế giới thế giới vật chất tồn lại độc lập với con người và chỉ có những cái mà con người chưa biết chứ không có cái gì không thể biết",
    tag: "Sai định nghĩa chân lý",
  },
  {
    id: "claim-2",
    text: "Nhận thức là quá trình tư duy thuần túy tách rời khỏi thực tiễn, trong đó khách thể nhận thức luôn đồng nhất với toàn bộ hiện thực khách quan và không bao giờ thay đổi theo lịch sử - xã hội.",
    originText: "Nhận thức là quá trình tác động biện chứng giữa chủ thể và khách thể thông qua hoạt động thực tiễn của con người. Chủ thể nhận thức chính là con người. Nhưng đó là conngười hiện thực, đang sống, đang hoạt động thực tiễn và đang nhận thức trong những điều kiện lịch sử - xã hội cụ thể nhất định, tức là con người đó phải thuộc về một giai cấp, một dân tộc nhất định, có ý thức, lợi ích, nhu cầu, cá tính, tình cảm, v.v.. Con người là chủ thể nhận thức cũng bị giới hạn bởi điều kiện lịch sử có tính chất lịch sử - xã hội. Chủ thể nhận thức trả lời câu hỏi: Ai nhận thức? còn khách thể nhận thức trả lời câu hỏi: Cái gì được nhận thức? Theo triết học Mác - Lênin, khách thể nhận thức không đồng nhất với toàn bộ hiện thực khách quan mà chỉ là một bộ phận, một lĩnh vực của hiện thực khách quan, nằm trong miền hoạt động nhận thức và trở thành đối tượng nhận thức của chủ thể nhận thức. Vì vậy, khách thể nhận thức không chỉ là thế giới vật chất mà có thể còn là tư duy, tâm lý, tư tưởng, tinh thần, tình cảm, v.v.. Khách thể nhận thức cũng có tính lịch sử - xã hội, cũng bị chế ước bởi điều kiện lịch sử - xã hội cụ thể. Khách thể nhận thức luôn luôn thay đổi trong lịch sử cùng với sự phát triển của hoạt động thực tiễn cũng như sự mở rộng năng lực nhận thức của con người. Khách thể nhận thức cũng không đồng nhất với đối tượng nhận thức. Khách thể nhận thức rộng hơn đối tượng nhận thức.",
    originCitation: "trang 264 - 265, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "",
    fix: "Nhận thức là quá trình tác động biện chứng giữa chủ thể và khách thể thông qua hoạt động thực tiễn. Khách thể nhận thức không đồng nhất với toàn bộ hiện thực khách quan mà chỉ là một bộ phận, một lĩnh vực của hiện thực đó.",
    tag: "Sai định nghĩa nhận thức",
  },
  {
    id: "claim-6",
    text: "Theo quan điểm của triết học Mác - Lênin, tri thức con người có thể phản ánh đúng hoặc sai hiện thực, nhưng ta không thể dùng chính tri thức, sự hiển nhiên, ý kiến số đông hay sự hữu ích để kiểm chứng nó. Thay vào đó, thực tiễn là tiêu chuẩn khách quan duy nhất để kiểm tra và chứng minh chân lý, bởi vì chỉ có thông qua hoạt động thực tiễn, những tư tưởng và tri thức mới được vật chất hóa và hiện thực hóa, từ đó giúp con người khẳng định được đâu là chân lý và bác bỏ những nhận thức sai lầm.",
    originText: "",
    originCitation: "",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng vai trò của thực tiễn",
  },
  {
    id: "claim-3",
    text: "Chân lý là tri thức chứ không phải bản thân hiện thực khách quan, nhưng tri thức đó phải phản ánh đúng hiện thực khách quan và được thực tiễn kiểm nghiệm là đúng. Do đó, theo nghĩa đúng của từ này, chân lý bao giờ cũng là khách quan vì nội dung phản ánh của nó là khách quan, là phù hợp với khách thể của nhận thức. V.I. Lênin nhấn mạnh: “Thừa nhận chân lý khách quan, tức là chân lý không phụ thuộc vào con người và loài người”¹ chỉ phụ thuộc vào thực tại khách quan, không phụ thuộc vào tính đơn giản hay tính chặt chẽ của logic, không phụ thuộc vào lợi ích hay sự quy ước, v.v..",
    originText: "",
    originCitation: "",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "",
    fix: "Chân lý là tri thức chứ không phải bản thân hiện thực khách quan, nhưng tri thức đó phải phản ánh đúng hiện thực khách quan và được lý luận kiểm nghiệm là đúng. Do đó, theo nghĩa đúng của từ này, chân lý bao giờ cũng là khách quan vì nội dung phản ánh của nó là khách quan, là phù hợp với chủ thể của nhận thức. V.I. Lênin nhấn mạnh: “Thừa nhận chân lý khách quan, tức là chân lý không phụ thuộc vào con người và loài người”¹ chỉ phụ thuộc vào thực tại khách quan, đồng thời phụ thuộc vào tính đơn giản hay tính chặt chẽ của logic, không phụ thuộc vào lợi ích hay sự quy ước, v.v.. ",
    tag: "Sai định nghĩa chân lý",
  },
  {
    id: "claim-7",
    text: "Hoạt động thực tiễn mang tính lịch sử - xã hội, thể hiện qua việc con người không ngừng đúc kết và truyền lại kinh nghiệm giữa các thế hệ, đồng thời các hoạt động đó luôn chịu sự chi phối và giới hạn bởi những điều kiện lịch sử - xã hội cụ thể của từng giai đoạn phát triển.",
    originText: "Thứ hai, hoạt động thực tiễn là những hoạt động mang tính lịch sử - xã hội của con người; nghĩa là, thực tiễn là hoạt động chỉ diễn ra trong xã hội, với sự tham gia của đông đảo người trong xã hội. Trong hoạt động thực tiễn, con người truyền lại cho nhau những kinh nghiệm từ thế hệ này qua thế hệ khác. Cũng vì vậy, hoạt động thực tiễn luôn bị giới hạn bởi những điều kiện lịch sử - xã hội cụ thể. Đồng thời, thực tiễn có trải qua các giai đoạn lịch sử phát triển cụ thể của nó.",
    originCitation: "trang 267, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng tính chất thực tiễn",
  },
  {
    id: "claim-8",
    text: "Nếu cắt theo chiều dọc, thực tiễn bao gồm mục đích, phương tiện và kết quả. Mục đích được nảy sinh từ nhu cầu và lợi ích, nhu cầu xét đến cùng được nảy sinh từ điều kiện khách quan. Lợi ích chính là cái thỏa mãn nhu cầu. Để đạt mục đích, trong hoạt động thực tiễn của mình, con người phải lựa chọn phương tiện (công cụ) để thực hiện. Kết quả của hoạt động thực tiễn phụ thuộc vào nhiều nhân tố nhưng trước hết là phụ thuộc vào mục đích đặt ra và phương tiện mà con người sử dụng để thực hiện mục đích.",
    originText: "Thứ hai, hoạt động thực tiễn là những hoạt động mang tính lịch sử - xã hội của con người; nghĩa là, thực tiễn là hoạt động chỉ diễn ra trong xã hội, với sự tham gia của đông đảo người trong xã hội. Trong hoạt động thực tiễn, con người truyền lại cho nhau những kinh nghiệm từ thế hệ này qua thế hệ khác. Cũng vì vậy, hoạt động thực tiễn luôn bị giới hạn bởi những điều kiện lịch sử - xã hội cụ thể. Đồng thời, thực tiễn có trải qua các giai đoạn lịch sử phát triển cụ thể của nó.",
    originCitation: "trang 267, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "Nhận thức là quá trình tác động biện chứng thông qua thực tiễn; khách thể luôn thay đổi.",
    fix: "Nhận thức là quá trình tác động biện chứng giữa chủ thể và khách thể thông qua thực tiễn.",
    tag: "Sai lý thuyết nhận thức",
  },
  {
    id: "claim-9",
    text: "Theo quan điểm của triết học Mác - Lênin, chân lý là những tri thức phản ánh phù hợp với hiện thực khách quan và đã được thực tiễn kiểm nghiệm. Khác với các quan điểm triết học trước đó, triết học duy vật biện chứng khẳng định chân lý và quá trình nhận thức chân lý không phải là một trạng thái tĩnh mà là một quá trình liên tục, bởi vì cả sự vật trong thế giới khách quan lẫn khả năng nhận thức của con người đều luôn không ngừng vận động, biến đổi và phát triển.",
    originText: "",
    originCitation: "",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng định nghĩa chân lý",
  },
  {
    id: "claim-4",
    text: "Nhận thức của con người bắt nguồn từ chính nhu cầu sinh tồn, lao động sản xuất và cải tạo xã hội. Mục đích tối thượng của nhận thức không phải để thỏa mãn những ý tưởng viển vông mà là để phục vụ, soi đường và dẫn dắt cho các hoạt động thực tiễn. Nếu tách rời khỏi thực tiễn, nhận thức sẽ rơi vào bế tắc và mất phương hướng; do đó, mọi tri thức khoa học chỉ thực sự mang lại giá trị khi chúng được ứng dụng trực tiếp hoặc gián tiếp vào đời sống thực tiễn nhằm mục đích cuối cùng là phục vụ con người.",
    originText: "",
    originCitation: "",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "",
    fix: "Nhận thức của con người bắt nguồn từ chính nhu cầu sinh tồn, lao động sản xuất và cải tạo xã hội. Mục đích tối thượng của nhận thức không phải để thỏa mãn những ý tưởng viển vông mà là để phục vụ, soi đường và dẫn dắt cho các hoạt động thực tiễn. Nếu tách rời khỏi thực tiễn, nhận thức sẽ rơi vào bế tắc và mất phương hướng; do đó, mọi tri thức khoa học chỉ thực sự mang lại giá trị khi chúng được ứng dụng trực tiếp hoặc gián tiếp vào đời sống thực tiễn nhằm mục đích cuối cùng là sự hoàn thiện của chính bản thân nhận thức.",
    tag: "Sai mục đích nhận thức",
  },
  {
    id: "claim-5",
    text: "Thực tiễn bao hàm toàn bộ mọi hoạt động của con người, bao gồm cả những suy nghĩ, tư duy trừu tượng không cần thông qua công cụ vật chất và không cần làm biến đổi thế giới khách quan.",
    originText: "Thứ nhất, thực tiễn không phải là toàn bộ hoạt động của con người mà chỉ là những hoạt động vật chất - cảm tính, như lời của C. Mác, đó là những hoạt động vật chất của con người cảm giác được; nghĩa là con người có thể quan sát trực quan được các hoạt động vật chất này. Hoạt động vật chất - cảm tính là những hoạt động mà con người phải sử dụng lực lượng vật chất, công cụ vật chất tác động vào các đối tượng vật chất để làm biến đổi chúng. Trên cơ sở đó, con người mới làm biến đổi được thế giới khách quan phục vụ cho mình.",
    originCitation: "trang 267, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "",
    fix: "Thực tiễn không phải là toàn bộ hoạt động, mà chỉ là những hoạt động vật chất - cảm tính, là những hoạt động mà con người phải sử dụng lực lượng vật chất, công cụ vật chất để tác động vào đối tượng.",
    tag: "Sai định nghĩa thực tiễn",
  },
  {
    id: "claim-10",
    text: "Thực tiễn tồn tại dưới nhiều hình thức đa dạng, trong đó hoạt động sản xuất vật chất đóng vai trò là hình thức cơ bản nhất, quan trọng nhất và có sớm nhất, bởi nó là phương thức tồn tại tất yếu giúp con người cải biến tự nhiên để duy trì sự sống và là tiền đề cho mọi hoạt động khác của xã hội.",
    originText: "Thực tiễn tồn tại dưới nhiều hình thức khác nhau, ở những lĩnh vực khác nhau, nhưng gồm những hình thức cơ bản sau: hoạt động sản xuất vật chất; hoạt động chính trị - xã hội và hoạt động thực nghiệm khoa học; trong đó, hoạt động sản xuất vật chất là hình thức thực tiễn có sớm nhất, cơ bản nhất, quan trọng nhất, vì ngay từ khi con người mới xuất hiện trên trái đất đã phải tiến hành sản xuất vật chất dù là giản đơn để tồn tại. Sản xuất vật chất biểu thị mối quan hệ của con người với tự nhiên và là phương thức tồn tại cơ bản của con người và xã hội loài người. Không có sản xuất vật chất, con người và xã hội loài người không thể tồn tại và phát triển. Sản xuất vật chất còn là cơ sở cho sự tồn tại của các hình thức thực tiễn khác cũng như tất cả các hoạt động sống khác của con người.",
    originCitation: "trang 269, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng hình thức thực tiễn",
  }
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

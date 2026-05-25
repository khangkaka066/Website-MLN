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
    why: "Sai lệch hoàn toàn với quan điểm duy vật biện chứng. Thế giới vật chất tồn tại khách quan, độc lập với ý thức con người. Việc cho rằng có những điều con người 'vĩnh viễn không bao giờ nhận thức được' là rơi vào thuyết bất khả tri (agnosticism), phủ nhận khả năng nhận thức của con người mà Lênin đã bác bỏ.",
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
    why: "Nhận thức không phải là quá trình tư duy tách rời thực tiễn mà là quá trình tác động biện chứng giữa chủ thể và khách thể thông qua hoạt động thực tiễn. Hơn nữa, khách thể nhận thức luôn thay đổi theo sự phát triển của lịch sử - xã hội, không phải là một thực thể tĩnh tại và đồng nhất.",
    fix: "Nhận thức là quá trình tác động biện chứng giữa chủ thể và khách thể thông qua hoạt động thực tiễn. Khách thể nhận thức không đồng nhất với toàn bộ hiện thực khách quan mà chỉ là một bộ phận, một lĩnh vực của hiện thực đó.",
    tag: "Sai định nghĩa nhận thức",
  },
  {
    id: "claim-3",
    text: "Theo triết học Mác - Lênin, thực tiễn là tiêu chuẩn khách quan duy nhất để kiểm chứng chân lý thay vì dựa vào các yếu tố chủ quan hay ý kiến số đông, bởi chỉ qua hoạt động thực tiễn, nhận thức mới được vật chất hóa để khẳng định tính đúng đắn và bác bỏ sai lầm.",
    originText: "Tri thức của con người là kết quả của quá trình nhận thức, tri thức đó có thể phản ánh đúng hoặc không đúng hiện thực. Không thể lấy tri thức để kiểm tra tri thức, cũng không thể lấy sự hiển nhiên, hay sự tán thành của số đông hoặc sự có lợi, có ích để kiểm tra sự đúng, sai của tri thức. Theo triết học Mác - Lênin, thực tiễn là tiêu chuẩn khách quan duy nhất để kiểm tra chân lý. Dựa vào thực tiễn, người ta có thể chứng minh, kiểm nghiệm chân lý bởi chỉ có thực tiễn mới có thể vật chất hóa được tri thức, hiện thực hóa được tư tưởng, qua đó mới khẳng định được chân lý hoặc phủ định một sai lầm nào đó.",
    originCitation: "trang 272, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng vai trò của thực tiễn",
  },
  {
    id: "claim-4",
    text: "Mặc dù là sản phẩm của nhận thức, chân lý mang tính khách quan tuyệt đối vì nó là những tri thức phản ánh chính xác hiện thực đã được thực tiễn kiểm nghiệm, tồn tại độc lập và hoàn toàn không bị chi phối bởi bất kỳ ý muốn hay yếu tố chủ quan nào của con người.",
    originText: "Chân lý là tri thức chứ không phải bản thân hiện thực khách quan, nhưng tri thức đó phải phản ánh đúng hiện thực khách quan và được thực tiễn kiểm nghiệm là đúng. Do đó, theo nghĩa đúng của từ này, chân lý bao giờ cũng là khách quan vì nội dung phản ánh của nó là khách quan, là phù hợp với khách thể của nhận thức. V.I. Lênin nhấn mạnh: “Thừa nhận chân lý khách quan, tức là chân lý không phụ thuộc vào con người và loài người”¹ chỉ phụ thuộc vào thực tại khách quan, không phụ thuộc vào tính đơn giản hay tính chặt chẽ của lôgích, không phụ thuộc vào lợi ích hay sự quy ước, v.v..",
    originCitation: "trang 280, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "Mặc dù chân lý mang tính khách quan, nhưng nó không 'tồn tại độc lập' tách rời khỏi quá trình nhận thức của con người. Chân lý là tri thức (sản phẩm của nhận thức) phản ánh đúng hiện thực; sự 'khách quan' nằm ở nội dung phản ánh chứ không phải chân lý tồn tại bên ngoài sự nhận thức của con người.",
    fix: "Mặc dù là sản phẩm phụ thuộc vào quá trình nhận thức của con người, chân lý vẫn mang tính khách quan tuyệt đối do nội dung phản ánh hiện thực của nó bị chi phối bởi thực tiễn độc lập chứ không phải do các yếu tố hay ý muốn chủ quan quy định.",
    tag: "Sai định nghĩa chân lý",
  },
  {
    id: "claim-5",
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
    id: "claim-6",
    text: "Theo cấu trúc chiều dọc, hoạt động thực tiễn bao gồm ba thành tố cơ bản là mục đích, phương tiện và kết quả; trong đó, mục đích bắt nguồn từ nhu cầu và lợi ích – vốn được hình thành từ các điều kiện khách quan – và kết quả của quá trình này phụ thuộc trực tiếp vào việc lựa chọn mục đích cũng như phương tiện thực hiện phù hợp.",
    originText: "Nếu cắt theo chiều dọc, thực tiễn bao gồm mục đích, phương tiện và kết quả. Mục đích được nảy sinh từ nhu cầu và lợi ích, nhu cầu xét đến cùng được nảy sinh từ điều kiện khách quan. Lợi ích chính là cái thỏa mãn nhu cầu. Để đạt mục đích, trong hoạt động thực tiễn của mình, con người phải lựa chọn phương tiện (công cụ) để thực hiện. Kết quả của hoạt động thực tiễn phụ thuộc vào nhiều nhân tố nhưng trước hết là phụ thuộc vào mục đích đặt ra và phương tiện mà con người sử dụng để thực hiện mục đích.",
    originCitation: "trang 268, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Hoạt động thực tiễn",
  },
  {
    id: "claim-7",
    text: "Theo quan điểm của triết học Mác - Lênin, chân lý là những tri thức phản ánh phù hợp với hiện thực khách quan và đã được thực tiễn kiểm nghiệm. Khác với các quan điểm triết học trước đó, triết học duy vật biện chứng khẳng định chân lý và quá trình nhận thức chân lý không phải là một trạng thái tĩnh mà là một quá trình liên tục, bởi vì cả sự vật trong thế giới khách quan lẫn khả năng nhận thức của con người đều luôn không ngừng vận động, biến đổi và phát triển.",
    originText: "Chân lý là một vấn đề được đề cập nhiều trong lịch sử triết học, tuy nhiên chưa có đại biểu triết học nào trước và ngoài triết học duy vật biện chứng có quan niệm hoàn chỉnh, đúng đắn về chân lý. Theo quan điểm triết học Mác - Lênin, chân lý là tri thức phù hợp với hiện thực khách quan và được thực tiễn kiểm nghiệm. Chân lý phải được hiểu như một quá trình, bởi lẽ bản thân sự vật có quá trình vận động, biến đổi, phát triển và sự nhận thức về nó cũng phải được vận động, biến đổi, phát triển. Vì vậy, nhận thức chân lý cũng là một quá trình.",
    originCitation: "trang 280 - 281, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "pass",
    label: "Đạt",
    why: "",
    fix: "",
    tag: "Đúng định nghĩa chân lý",
  },
  {
    id: "claim-8",
    text: "Nhận thức bắt nguồn từ thực tiễn và chỉ thực sự có giá trị khi những tri thức, lý luận đó quay trở lại gắn liền với đời sống để ứng dụng, cải tạo xã hội và phục vụ lợi ích của con người.",
    originText: "Nhận thức của con người ngay từ khi mới xuất hiện trên trái đất đã bị quy định bởi những nhu cầu thực tiễn, bởi lẽ, muốn sống, muốn tồn tại, con người phải sản xuất và cải tạo xã hội. Chính nhu cầu sản xuất vật chất và cải tạo xã hội buộc con người phải nhận thức thế giới xung quanh. Nhận thức của con người là nhằm phục vụ thực tiễn, soi đường, dẫn dắt, chỉ đạo thực tiễn chứ không phải để trang trí hay phục vụ cho những ý tưởng viển vông. Nếu không vì thực tiễn, nhận thức sẽ mất phương hướng, bế tắc. Mọi tri thức khoa học - kết quả của nhận thức chỉ có ý nghĩa khi được áp dụng vào đời sống thực tiễn một cách trực tiếp hay gián tiếp để phục vụ con người.",
    originCitation: "trang 272, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "Sai mục đích của nhận thức. Nhận thức không phải để thoát ly thực tại mà để soi đường cho thực tiễn. Việc cho rằng nhận thức cần 'thoát ly khỏi thực tại' là duy tâm, hạ thấp vai trò của thực tiễn - vốn là cơ sở, động lực và mục đích của nhận thức.",
    fix: "Nhận thức dù khởi nguồn từ thực tiễn nhưng chỉ thực sự có giá trị khi những tri thức, lý luận đó quay trở lại dẫn dắt đời sống bằng cách dần thoát ly khỏi thực tại, nhằm ứng dụng vào việc cải tạo tư duy và phục vụ lợi ích của chính quá trình nhận thức.",
    tag: "Sai mục đích nhận thức",
  },
  {
    id: "claim-9",
    text: "Thực tiễn bao hàm toàn bộ mọi hoạt động của con người, bao gồm cả những suy nghĩ, tư duy trừu tượng không cần thông qua công cụ vật chất và không cần làm biến đổi thế giới khách quan.",
    originText: "Thứ nhất, thực tiễn không phải là toàn bộ hoạt động của con người mà chỉ là những hoạt động vật chất - cảm tính, như lời của C. Mác, đó là những hoạt động vật chất của con người cảm giác được; nghĩa là con người có thể quan sát trực quan được các hoạt động vật chất này. Hoạt động vật chất - cảm tính là những hoạt động mà con người phải sử dụng lực lượng vật chất, công cụ vật chất tác động vào các đối tượng vật chất để làm biến đổi chúng. Trên cơ sở đó, con người mới làm biến đổi được thế giới khách quan phục vụ cho mình.",
    originCitation: "trang 267, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021",
    answer: "verify",
    label: "Cần kiểm chứng",
    why: "Sai định nghĩa thực tiễn. Thực tiễn không bao gồm tư duy thuần túy. Thực tiễn là hoạt động vật chất - cảm tính, phải sử dụng công cụ vật chất để tác động vào thế giới. Tư duy trừu tượng chỉ là một khâu trong quá trình nhận thức, không phải là thực tiễn.",
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
    "Triết học Mác - Lênin cho rằng thế giới vật chất là sản phẩm do ý thức con người tạo ra, và có những sự vật, hiện tượng tồn tại khách quan mà con người vĩnh viễn không bao giờ có khả năng nhận thức được.",
  label: "Lấy từ game phía trên",
};

export const APPLY_STEPS = [
  {
    n: 1,
    label: "Bước 1: Giải ảo & Nguồn",
    doing:
      "Xác định hệ tư tưởng của mệnh đề.",
    how:
      "Đối chiếu mệnh đề với các nguyên lý cơ bản của Triết học Mác - Lênin (về vật chất và ý thức).",
    result:
      "Nhận diện mệnh đề mang tính duy tâm và bất khả tri, trái ngược hoàn toàn với nền tảng duy vật biện chứng.",
  },
  {
    n: 2,
    label: "Bước 2: Bối cảnh & Sự kiện",
    doing:
      "Định vị các khái niệm bị tráo đổi.",
    how:
      "Phân tích các từ khóa: 'vật tự nó', 'ý thức', 'khả năng nhận thức'. Kiểm tra xem định nghĩa trong câu có khớp với giáo trình chính thống không.",
    result:
      "Xác định lỗi sai: Câu khẳng định phủ nhận sự tồn tại khách quan và khả năng nhận thức của con người.",
  },
  {
    n: 3,
    label: "Bước 3: Đối chiếu khách quan",
    doing:
      "Tra chéo với văn bản gốc có thẩm quyền.",
    how:
      "Đối chiếu trực tiếp với trang 262, Giáo trình triết học Mác - Lênin (2021), đặc biệt là quan điểm của V.I. Lênin về nhận thức luận.",
    result:
      "Tìm thấy sự đối lập hoàn toàn (phủ định trực tiếp) giữa claim và tài liệu chuẩn mực.",
  },
  {
    n: 4,
    label: "Bước 4: Thực tiễn & Logic",
    doing:
      "Phân tích tính phi lý",
    how:
      "Sử dụng logic của thuyết khả tri: Nếu con người 'vĩnh viễn không thể biết' thì khoa học sẽ không thể tồn tại và phát triển.",
    result:
      "Mệnh đề tự mâu thuẫn với thực tế phát triển của khoa học và triết học duy vật.",
  },
  {
    n: 5,
    label: "Bước 5: Biện chứng & Quyết định",
    doing:
      "Phủ định cái sai, khôi phục chân lý.",
    how:
      "Viết lại câu claim dựa trên việc bác bỏ các ý tưởng sai lệch và khẳng định lại nội dung cốt lõi của chủ nghĩa duy vật biện chứng.",
    result:
      "Có được bản khẳng định đúng đắn, khoa học, đứng vững trước phản biện học thuật.",
  },
];

export const BEFORE_AFTER = {
  before: {
    title: "Trước khi dùng 5 bước",
    subtitle: "Bản AI thô — nghe có vẻ chắc nhưng không kiểm chứng được",
    text:
      "Triết học Mác Lênin cho rằng thế giới vật chất là sản phẩm do ý thức con người tạo ra, và có những sự vật, hiện tượng tồn tại khách quan mà con người vĩnh viễn không bao giờ có khả năng nhận thức được",
    issues: [
      "Thế giới vật chất là sản phẩm do ý thức con người tạo ra",
      "Ý thức tạo ra thế giới vật chất",
      "Có những sự vật con người vĩnh viễn không nhận thức được",
    ],
  },
  after: {
    title: "Sau khi dùng 5 bước",
    subtitle: "Bản đã kiểm chứng — khiêm tốn hơn, đứng vững hơn",
    text:
      "Triết học Mác - Lênin thừa nhận sự tồn tại khách quan của thế giới và cho rằng thế giới khách quan là đối tượng của nhận thức. Không phải ý thức của con người sản sinh ra thế giới mà thế giới vật chất tồn tại độc lập với con người, đó là nguồn gốc “duy nhất và cuối cùng” của nhận thức. Triết học Mác - Lênin khẳng định khả năng nhận thức thế giới của con người. V.I. Lênin đã chỉ rõ chỉ có những cái mà con người chưa biết chứ không có cái gì không thể biết: “Dứt khoát là không có và không thể có bất kỳ sự khác nhau nào về nguyên tắc giữa hiện tượng và vật tự nó. Chỉ có sự khác nhau giữa cái đã được nhận thức và cái chưa được nhận thức” (Nguồn: trang 262, Giáo trình triết học Mác - Lênin, dành cho hệ không chuyên lý luận chính trị. NXB chính trị quốc gia sự thật, 2021).",
    wins: [
      "Thông tin chính xác hoàn toàn theo giáo trình chuẩn của NXB Chính trị quốc gia Sự thật",
      "Có nguồn trích dẫn rõ ràng, minh bạch (trang 262, năm 2021)",
      "Khẳng định đúng đắn lập trường duy vật biện chứng về nguồn gốc duy nhất của nhận thức",
      "Loại bỏ hoàn toàn các số liệu ảo giác và trích dẫn giả mạo của AI",
    ],
  },
};

export const FOOTER = {
  title: "Cảm ơn bạn đã lắng nghe!",
  subtitle:
    "AI Verification Card — nhỏ gọn, dễ nhớ, để mỗi lần bạn copy output AI vào bài, bạn dừng lại 5 nhịp.",
  signature: "Thực tiễn — Chân lý — Con người ra quyết định.",
};

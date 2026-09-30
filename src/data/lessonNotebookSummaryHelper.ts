import { Grade } from "../types";
import { cleanLessonTitle, isLaterPeriodOfMultiPeriodLesson } from "../utils/lessonTitleHelper";

/**
 * Tra cứu và tự động rút ra Bài học / Ghi nhớ ngắn gọn sau bài dạy
 * Dành cho môn Khoa học, Lịch sử và Địa lí, Công nghệ (Khối 4 và Khối 5)
 * Để học sinh chép vào vở ghi bài theo đúng chương trình GDPT 2018 (Kết nối tri thức).
 * Lưu ý chỉ cho học sinh ghi 1 lần (ở bài 1 tiết hoặc Tiết 1 của bài nhiều tiết),
 * tuyệt đối không cho ghi vào các tiết 2, 3, 4 của bài dạy có nhiều tiết.
 */
export function getLessonNotebookSummary(params: {
  grade: Grade | number;
  subject: string;
  lessonTitle: string;
}): string {
  const { grade, subject, lessonTitle } = params;

  // Nếu là tiết 2, 3, 4 của bài nhiều tiết -> không cho ghi vở, trả về rỗng
  if (isLaterPeriodOfMultiPeriodLesson(lessonTitle)) {
    return "";
  }

  const subLower = subject.toLowerCase().trim();
  const cleanedTitle = cleanLessonTitle(lessonTitle);
  const titleLower = cleanedTitle.toLowerCase();

  // 1. MÔN KHOA HỌC (LỚP 4 & LỚP 5)
  if (subLower.includes("khoa học") || subLower === "kh") {
    return getScienceNotebookSummary(Number(grade), titleLower, cleanedTitle);
  }

  // 2. MÔN LỊCH SỬ VÀ ĐỊA LÍ (LỚP 4 & LỚP 5)
  if (
    subLower.includes("lịch sử") ||
    subLower.includes("địa lí") ||
    subLower.includes("địa lý") ||
    subLower.includes("ls-đl") ||
    subLower.includes("ls&đl") ||
    subLower === "ls" ||
    subLower === "đl"
  ) {
    return getHistoryGeographyNotebookSummary(Number(grade), titleLower, cleanedTitle);
  }

  // 3. MÔN CÔNG NGHỆ (LỚP 4 & LỚP 5)
  if (subLower.includes("công nghệ") || subLower === "cn") {
    return getTechnologyNotebookSummary(Number(grade), titleLower, cleanedTitle);
  }

  return `- Nắm vững kiến thức trọng tâm bài "${cleanedTitle}".\n- Vận dụng kiến thức vào thực tế học tập và đời sống.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN KHOA HỌC (RÚT BÀI HỌC NGẮN GỌN CHO HỌC SINH GHI)
// ============================================================================
function getScienceNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- KHOA HỌC LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("đất đối với cây trồng") || (titleLower.includes("thành phần") && titleLower.includes("đất"))) {
      return `- Đất gồm: Hạt khoáng, mùn, nước, không khí và sinh vật; cung cấp dinh dưỡng giúp cây đứng vững và phát triển.\n- Cần chăm sóc và bảo vệ đất trồng màu mỡ.`;
    }
    if (titleLower.includes("ô nhiễm") && titleLower.includes("xói mòn")) {
      return `- Đất bị ô nhiễm do rác thải, hóa chất; bị xói mòn do mưa lũ và chặt phá rừng.\n- Biện pháp: Trồng rừng giữ đất, bón phân hữu cơ, vứt rác đúng nơi quy định.`;
    }
    if (titleLower.includes("hỗn hợp") || titleLower.includes("dung dịch")) {
      return `- Hỗn hợp: Tạo từ hai hay nhiều chất trộn lẫn và giữ nguyên tính chất.\n- Dung dịch: Là hỗn hợp đồng nhất giữa chất tan và dung môi (VD: Nước đường).`;
    }
    if (titleLower.includes("trạng thái của chất") || titleLower.includes("rắn, lỏng, khí")) {
      return `- Chất có 3 thể: Thể rắn, thể lỏng và thể khí.\n- Dưới tác dụng của nhiệt độ, chất có thể chuyển đổi qua lại giữa các thể.`;
    }
    if (titleLower.includes("biến đổi hoá học") || titleLower.includes("biến đổi hóa học")) {
      return `- Sự biến đổi hóa học là sự biến đổi từ chất này thành chất khác (có tạo chất mới).\n- Dấu hiệu: Đổi màu, sủi bọt khí, tỏa nhiệt, có mùi...`;
    }
    if (titleLower.includes("vai trò của năng lượng") || (titleLower.includes("năng lượng") && titleLower.includes("vai trò"))) {
      return `- Năng lượng giúp mọi vật chuyển động, phát sáng, tỏa nhiệt và biến đổi.\n- Mọi hoạt động sống và sản xuất đều cần năng lượng.`;
    }
    if (titleLower.includes("năng lượng điện") || titleLower.includes("sử dụng điện")) {
      return `- Điện năng dùng để thắp sáng, sưởi ấm, làm mát và chạy máy móc.\n- Cần sử dụng điện an toàn, tiết kiệm: Tắt khi không dùng, không chạm tay ướt vào ổ điện.`;
    }
    if (titleLower.includes("mạch điện") || titleLower.includes("dẫn điện") || titleLower.includes("cách điện")) {
      return `- Mạch điện kín gồm nguồn điện, dây dẫn và thiết bị tiêu thụ.\n- Đồng, nhôm dẫn điện tốt; nhựa, cao su cách điện an toàn.`;
    }
    if (titleLower.includes("chất đốt")) {
      return `- Các chất đốt phổ biến: Củi, than đá, khí gas, dầu, xăng.\n- Cần sử dụng tiết kiệm và tuân thủ nghiêm quy tắc phòng cháy chữa cháy.`;
    }
    if (titleLower.includes("mặt trời") || titleLower.includes("năng lượng gió") || titleLower.includes("nước chảy")) {
      return `- Năng lượng mặt trời, gió và nước chảy là nguồn năng lượng sạch, tự nhiên, tái tạo được.`;
    }
    if (titleLower.includes("sinh sản của thực vật") || titleLower.includes("thực vật có hoa")) {
      return `- Hoa là cơ quan sinh sản của thực vật có hoa (nhị sinh phấn, nhụy sinh noãn).\n- Thụ phấn -> thụ tinh -> tạo quả và hạt.`;
    }
    if (titleLower.includes("sự phát triển của cây con") || titleLower.includes("cây con")) {
      return `- Cây con có thể mọc lên từ hạt hoặc từ một bộ phận của cây mẹ (thân, rễ, lá).\n- Hạt cần đủ độ ẩm, nhiệt độ và không khí để nảy mầm.`;
    }
    if (titleLower.includes("sinh sản của động vật") || titleLower.includes("động vật")) {
      return `- Động vật sinh sản hữu tính gồm con đực và con cái.\n- Có loài đẻ trứng (chim, cá, côn trùng) và loài đẻ con (thú, gia súc).`;
    }
    if (titleLower.includes("vòng đời") || titleLower.includes("sự phát triển")) {
      return `- Vòng đời động vật trải qua các giai đoạn: Trứng/con non -> lớn lên -> trưởng thành -> sinh sản.`;
    }
    if (titleLower.includes("ôn tập")) {
      return `- Khắc sâu kiến thức trọng tâm đã học trong chủ đề và vận dụng vào thực tiễn cuộc sống.`;
    }
  }

  // --- KHOA HỌC LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("tính chất của nước") || (titleLower.includes("nước") && titleLower.includes("cuộc sống"))) {
      return `- Nước là chất lỏng trong suốt, không màu, không mùi, không vị, chảy từ cao xuống thấp và hòa tan được một số chất.\n- Nước có vai trò quyết định đối với sự sống.`;
    }
    if (titleLower.includes("sự chuyển thể của nước") || titleLower.includes("vòng tuần hoàn của nước")) {
      return `- Nước tồn tại ở 3 thể: Thể lỏng, thể khí và thể rắn.\n- Vòng tuần hoàn của nước: Bay hơi -> tạo mây -> ngưng tụ thành mưa rơi xuống.`;
    }
    if (titleLower.includes("ô nhiễm và bảo vệ nguồn nước") || titleLower.includes("nguồn nước")) {
      return `- Nguồn nước bị ô nhiễm do nước thải, rác sinh hoạt, hóa chất độc hại.\n- Cần tiết kiệm nước, bảo vệ nguồn nước sạch và không xả rác xuống sông hồ.`;
    }
    if (titleLower.includes("không khí quanh ta") || titleLower.includes("tính chất của không khí")) {
      return `- Không khí có ở quanh ta, không màu, không mùi, không vị, có thể nén lại hoặc giãn ra.\n- Gồm 2 khí chính: Khí ô-xy (duy trì sự sống, sự cháy) và khí ni-tơ.`;
    }
    if (titleLower.includes("vai trò của không khí") || titleLower.includes("bảo vệ môi trường không khí")) {
      return `- Không khí cần cho sự thở của sinh vật và sự cháy.\n- Trồng nhiều cây xanh, không đốt rác bừa bãi để giữ không khí trong lành.`;
    }
    if (titleLower.includes("gió") || titleLower.includes("bão")) {
      return `- Không khí chuyển động sinh ra gió.\n- Cần theo dõi dự báo thời tiết và chằng chống nhà cửa phòng chống bão.`;
    }
    if (titleLower.includes("ánh sáng") || titleLower.includes("truyền ánh sáng")) {
      return `- Ánh sáng truyền theo đường thẳng trong môi trường trong suốt.\n- Ánh sáng chiếu vào vật cản sẽ tạo bóng tối phía sau vật.`;
    }
    if (titleLower.includes("vai trò của ánh sáng") || titleLower.includes("bảo vệ mắt")) {
      return `- Ánh sáng giúp ta nhìn thấy mọi vật và giúp cây quang hợp.\n- Cần học tập nơi đủ ánh sáng để bảo vệ mắt.`;
    }
    if (titleLower.includes("âm thanh") || titleLower.includes("truyền âm thanh")) {
      return `- Âm thanh phát ra khi vật rung động, truyền qua chất khí, lỏng, rắn.\n- Âm thanh giúp giao tiếp, học tập và thưởng thức nghệ thuật.`;
    }
    if (titleLower.includes("nhiệt độ") || titleLower.includes("sự truyền nhiệt") || titleLower.includes("dẫn nhiệt")) {
      return `- Nhiệt truyền từ vật nóng sang vật lạnh hơn.\n- Kim loại dẫn nhiệt tốt; gỗ, nhựa, vải dẫn nhiệt kém.`;
    }
    if (titleLower.includes("nấm") || titleLower.includes("vi khuẩn")) {
      return `- Có nấm/vi khuẩn có ích (nấm ăn, men sữa chua) và có hại (nấm mốc, vi khuẩn gây bệnh).\n- Rửa tay sạch sẽ và ăn chín uống sôi.`;
    }
  }

  return `- Nắm vững hiện tượng và bản chất khoa học bài "${rawTitle}".\n- Vận dụng kiến thức khoa học vào nếp sống hàng ngày và bảo vệ môi trường.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN LỊCH SỬ VÀ ĐỊA LÍ (RÚT BÀI HỌC NGẮN GỌN CHO HỌC SINH GHI)
// ============================================================================
function getHistoryGeographyNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- LỊCH SỬ VÀ ĐỊA LÍ LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("vị trí địa lí") || titleLower.includes("lãnh thổ") || titleLower.includes("quốc kì")) {
      return `- Nước Việt Nam nằm ở Đông Nam Á, đất liền hình chữ S, vùng biển rộng lớn có hàng nghìn hòn đảo.\n- Quốc kì: Cờ đỏ sao vàng; Quốc ca: Tiến quân ca; Thủ đô: Hà Nội.`;
    }
    if (titleLower.includes("thiên nhiên việt nam") && (titleLower.includes("địa hình") || titleLower.includes("khoáng sản"))) {
      return `- Địa hình nước ta 3/4 là đồi núi (chủ yếu đồi núi thấp), 1/4 là đồng bằng màu mỡ.\n- Khoáng sản đa dạng (than đá, dầu khí, bô-xít...); cần khai thác hợp lí, tiết kiệm.`;
    }
    if (titleLower.includes("khí hậu") || titleLower.includes("sông ngòi")) {
      return `- Khí hậu nước ta nhiệt đới ẩm gió mùa; mạng lưới sông ngòi dày đặc (sông Hồng, sông Cửu Long).\n- Cần sử dụng tiết kiệm và bảo vệ nguồn nước sạch.`;
    }
    if (titleLower.includes("đất") && titleLower.includes("rừng")) {
      return `- Có 2 nhóm đất chính: Đất phe-ra-lit (đồi núi) và đất phù sa (đồng bằng màu mỡ).\n- Rừng là tài nguyên quý giá; cần tích cực trồng cây gây rừng, chống xói mòn.`;
    }
    if (titleLower.includes("biển, đảo") || titleLower.includes("biển đảo")) {
      return `- Vùng biển nước ta là một phần của Biển Đông, tài nguyên phong phú; hai quần đảo thiêng liêng là Hoàng Sa và Trường Sa.\n- Nêu cao ý thức bảo vệ chủ quyền biển đảo Tổ quốc.`;
    }
    if (titleLower.includes("dân cư") || titleLower.includes("dân tộc")) {
      return `- Việt Nam có 54 dân tộc anh em luôn đoàn kết một lòng; dân tộc Kinh đông dân nhất.\n- Dân cư phân bố không đều (tập trung ở đồng bằng, thưa ở miền núi).`;
    }
    if (titleLower.includes("văn lang") || titleLower.includes("âu lạc")) {
      return `- Văn Lang là nhà nước đầu tiên do vua Hùng đứng đầu (đô Phong Châu); Âu Lạc do An Dương Vương lập nên (đô Cổ Loa).\n- Luôn khắc ghi truyền thống "Uống nước nhớ nguồn".`;
    }
    if (titleLower.includes("phù nam") || titleLower.includes("óc eo")) {
      return `- Vương quốc Phù Nam hình thành ở Nam Bộ (thế kỉ I), rực rỡ với văn hóa Óc Eo.\n- Người Phù Nam buôn bán đường biển sầm uất và dựng nhà sàn trên kênh rạch.`;
    }
    if (titleLower.includes("chăm-pa") || titleLower.includes("champa")) {
      return `- Vương quốc Chăm-pa hình thành ở Duyên hải miền Trung, nổi tiếng với tháp Chăm cổ kính (Mỹ Sơn).\n- Người Chăm-pa giỏi đi biển, làm gốm và dệt vải.`;
    }
    if (titleLower.includes("bắc thuộc") || titleLower.includes("giành độc lập") || titleLower.includes("bạch đằng")) {
      return `- Năm 938, Ngô Quyền chỉ huy chiến thắng Bạch Đằng đánh tan quân Nam Hán, chấm dứt hơn 1000 năm Bắc thuộc, mở ra thời kì độc lập lâu dài.\n- Tự hào về tinh thần yêu nước bất khuất của dân tộc.`;
    }
    if (titleLower.includes("triều lý") || titleLower.includes("dời đô") || titleLower.includes("thăng long")) {
      return `- Năm 1010, vua Lý Thái Tổ dời đô về Thăng Long (Hà Nội ngày nay).\n- Thăng Long phát triển hưng thịnh; xây dựng Văn Miếu - Quốc Tử Giám trường đại học đầu tiên.`;
    }
    if (titleLower.includes("triều trần") || titleLower.includes("mông – nguyên") || titleLower.includes("mông nguyên")) {
      return `- Nhà Trần 3 lần lãnh đạo nhân dân đánh thắng quân Mông - Nguyên với Hào khí Đông A rạng ngời.\n- Bài học về sức mạnh đoàn kết toàn dân: "Vua tôi đồng lòng, cả nước góp sức".`;
    }
    if (titleLower.includes("lam sơn") || titleLower.includes("hậu lê")) {
      return `- Lê Lợi và Nguyễn Trãi lãnh đạo khởi nghĩa Lam Sơn 10 năm gian khổ đánh tan quân Minh.\n- Lập ra triều Hậu Lê, ban hành Bộ luật Hồng Đức tiến bộ.`;
    }
    if (titleLower.includes("triều nguyễn") || titleLower.includes("kinh thành huế")) {
      return `- Triều Nguyễn thành lập năm 1802 do vua Gia Long đứng đầu, đóng đô ở Huế, thống nhất đất nước.\n- Cố đô Huế là Di sản văn hóa thế giới được UNESCO công nhận.`;
    }
  }

  // --- LỊCH SỬ VÀ ĐỊA LÍ LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("phương tiện học tập") || (titleLower.includes("làm quen") && titleLower.includes("lịch sử và địa lí"))) {
      return `- Phương tiện học tập: Bản đồ, lược đồ, biểu đồ, tranh ảnh hiện vật lịch sử.\n- Sử dụng đúng phương tiện giúp hiểu rõ sự kiện và vị trí địa lí.`;
    }
    if (titleLower.includes("trung du và miền núi bắc bộ")) {
      return `- Vùng Trung du và miền núi Bắc Bộ có địa hình đồi núi hiểm trở, nhiều dân tộc anh em cùng sinh sống.\n- Tiềm năng thủy điện lớn, văn hóa đặc sắc (nhà sàn, hát Then).`;
    }
    if (titleLower.includes("đền hùng") || titleLower.includes("giỗ tổ")) {
      return `- Đền Hùng (Phú Thọ) là nơi thờ các vua Hùng có công dựng nước Văn Lang.\n- Giỗ Tổ Hùng Vương mùng 10/3 âm lịch là Quốc lễ thiêng liêng.`;
    }
    if (titleLower.includes("đồng bằng bắc bộ")) {
      return `- Đồng bằng Bắc Bộ hình tam giác châu thổ phù sa sông Hồng, dân cư đông đúc.\n- Vựa lúa lớn thứ hai cả nước, nổi tiếng với nhiều làng nghề truyền thống.`;
    }
    if (titleLower.includes("thăng long - hà nội") || titleLower.includes("thăng long")) {
      return `- Hà Nội là Thủ đô ngàn năm văn hiến, trung tâm chính trị, kinh tế, văn hóa của đất nước.`;
    }
    if (titleLower.includes("văn miếu") || titleLower.includes("quốc tử giám")) {
      return `- Văn Miếu - Quốc Tử Giám là trường đại học đầu tiên của Việt Nam, biểu tượng truyền thống hiếu học của dân tộc.`;
    }
    if (titleLower.includes("duyên hải miền trung")) {
      return `- Duyên hải miền Trung có đồng bằng hẹp ven biển, nhiều cồn cát và đầm phá.\n- Hoạt động kinh tế chính: Làm muối, đánh bắt hải sản và du lịch biển.`;
    }
    if (titleLower.includes("tây nguyên")) {
      return `- Tây Nguyên gồm các cao nguyên xếp tầng, đất đỏ ba-zan trồng cà phê, cao su.\n- Nổi tiếng với Không gian văn hóa Cồng chiêng Tây Nguyên.`;
    }
    if (titleLower.includes("nam bộ")) {
      return `- Đồng bằng Nam Bộ là vựa lúa, vựa trái cây và thủy sản lớn nhất nước ta.\n- Văn hóa gắn liền với sông nước, chợ nổi và đờn ca tài tử.`;
    }
  }

  return `- Nắm vững mốc thời gian, nhân vật, diễn biến hoặc đặc điểm địa lí bài "${rawTitle}".\n- Bồi dưỡng niềm tự hào dân tộc và tình yêu quê hương đất nước.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN CÔNG NGHỆ (RÚT BÀI HỌC NGẮN GỌN CHO HỌC SINH GHI)
// ============================================================================
function getTechnologyNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- CÔNG NGHỆ LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("vai trò của công nghệ") || (titleLower.includes("vai trò") && titleLower.includes("công nghệ"))) {
      return `- Công nghệ tạo ra sản phẩm tiện ích, tăng năng suất và nâng cao chất lượng cuộc sống.\n- Cần sử dụng công nghệ an toàn, văn minh và tiết kiệm.`;
    }
    if (titleLower.includes("nhà sáng chế")) {
      return `- Nhà sáng chế phát minh ra sản phẩm kĩ thuật mới phục vụ đời sống xã hội.\n- Phẩm chất: Tò mò khoa học, kiên trì, đam mê sáng tạo.`;
    }
    if (titleLower.includes("tìm hiểu thiết kế") || titleLower.includes("thiết kế sản phẩm")) {
      return `- Thiết kế là quá trình sáng tạo giải quyết vấn đề thực tiễn qua bản vẽ và mẫu thử.\n- Cần đảm bảo tính tiện ích, an toàn và thẩm mĩ.`;
    }
    if (titleLower.includes("sử dụng điện thoại") || titleLower.includes("điện thoại")) {
      return `- Điện thoại dùng để liên lạc, học tập; cần nhớ số khẩn cấp: 111, 113, 114, 115.\n- Không vừa dùng vừa sạc pin; sử dụng điều độ để bảo vệ mắt.`;
    }
    if (titleLower.includes("quạt điện") || titleLower.includes("đèn bàn") || titleLower.includes("tủ lạnh")) {
      return `- Sử dụng thiết bị điện gia đình đúng cách: Tắt khi không dùng, vệ sinh định kì an toàn.`;
    }
    if (titleLower.includes("lắp ráp") || titleLower.includes("mô hình")) {
      return `- Lắp ráp mô hình theo đúng quy trình kĩ thuật; sử dụng dụng cụ cờ-lê, tua-vít đúng chiều.`;
    }
  }

  // --- CÔNG NGHỆ LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("lợi ích của hoa") || titleLower.includes("cây cảnh")) {
      return `- Hoa và cây cảnh làm đẹp cảnh quan, thanh lọc không khí và đem lại niềm vui thư thái.`;
    }
    if (titleLower.includes("trồng hoa") || titleLower.includes("trồng cây")) {
      return `- Quy trình trồng cây trong chậu: Chuẩn bị chậu, đất dinh dưỡng -> đặt cây ngay ngắn -> lấp đất và tưới đủ ẩm.`;
    }
    if (titleLower.includes("chăm sóc hoa") || titleLower.includes("chăm sóc cây")) {
      return `- Chăm sóc cây: Tưới nước vừa đủ, bón phân hợp lí, bắt sâu và đặt nơi đủ ánh sáng.`;
    }
    if (titleLower.includes("chi tiết và dụng cụ") || titleLower.includes("lắp ghép mô hình")) {
      return `- Bộ lắp ghép gồm các thanh, tấm và vít; dùng cờ-lê, tua-vít xoay theo chiều kim đồng hồ để siết chặt.`;
    }
  }

  return `- Nắm vững cấu tạo và quy trình thao tác an toàn bài "${rawTitle}".\n- Rèn tính cẩn thận, ngăn nắp và giữ gìn đồ dùng công nghệ.`;
}


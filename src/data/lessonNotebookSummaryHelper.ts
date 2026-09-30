import { Grade } from "../types";
import { cleanLessonTitle } from "../utils/lessonTitleHelper";

/**
 * Tra cứu và tự động rút ra Tóm tắt ghi nhớ cốt lõi sau mỗi bài dạy
 * Dành riêng cho môn Khoa học, Lịch sử và Địa lí, Công nghệ (Khối 4 và Khối 5)
 * Để học sinh chép vào vở ghi bài theo đúng chương trình GDPT 2018 (Kết nối tri thức).
 */
export function getLessonNotebookSummary(params: {
  grade: Grade | number;
  subject: string;
  lessonTitle: string;
}): string {
  const { grade, subject, lessonTitle } = params;
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

  // Fallback chung cho các bài học khác nếu được gọi
  return `1. Nắm vững kiến thức trọng tâm của bài: "${cleanedTitle}".\n2. Vận dụng kiến thức bài học để giải quyết bài tập và tình huống thực tiễn hàng ngày.\n3. Ghi nhớ các từ khóa cốt lõi và chủ động thực hành, liên hệ thực tế đời sống.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN KHOA HỌC
// ============================================================================
function getScienceNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- KHOA HỌC LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("đất đối với cây trồng") || (titleLower.includes("thành phần") && titleLower.includes("đất"))) {
      return `1. Đất gồm các thành phần chính: Hạt khoáng, chất mùn, nước, không khí và các sinh vật sống trong đất.\n2. Đất là môi trường sống và cung cấp nước, chất dinh dưỡng, không khí giúp cây đứng vững và sinh trưởng xanh tốt.\n3. Chúng ta cần chăm sóc, bón phân hữu cơ và bảo vệ đất trồng màu mỡ.`;
    }
    if (titleLower.includes("ô nhiễm") && titleLower.includes("xói mòn")) {
      return `1. Đất bị ô nhiễm do: Rác thải sinh hoạt, túi nilon, hóa chất độc hại, bón phân hóa học và phun thuốc trừ sâu bừa bãi.\n2. Đất bị xói mòn do: Mưa lớn, lũ lụt và nạn chặt phá rừng đầu nguồn làm trôi lớp đất mặt màu mỡ.\n3. Biện pháp bảo vệ môi trường đất: Trồng rừng giữ đất, làm ruộng bậc thang, dùng phân bón hữu cơ và phân loại rác thải đúng quy định.`;
    }
    if (titleLower.includes("hỗn hợp") || titleLower.includes("dung dịch")) {
      return `1. Hỗn hợp: Tạo thành từ hai hay nhiều chất trộn lẫn vào nhau và mỗi chất vẫn giữ nguyên tính chất riêng (VD: Muối trộn tiêu, gạo trộn vừng).\n2. Dung dịch: Là hỗn hợp đồng nhất giữa chất tan và dung môi (VD: Nước đường, nước muối loãng).\n3. Tách các chất trong hỗn hợp, dung dịch bằng phương pháp: Lọc, lắng gạn, hoặc làm bay hơi, cô cạn.`;
    }
    if (titleLower.includes("trạng thái của chất") || titleLower.includes("rắn, lỏng, khí")) {
      return `1. Chất tồn tại ở 3 thể: Thể rắn (có hình dạng và thể tích xác định), thể lỏng (có thể tích xác định nhưng không có hình dạng nhất định) và thể khí (không có hình dạng và thể tích xác định).\n2. Dưới tác dụng của nhiệt độ, chất có thể chuyển đổi qua lại giữa các trạng thái: Nóng chảy, đông đặc, bay hơi, ngưng tụ.`;
    }
    if (titleLower.includes("biến đổi hoá học") || titleLower.includes("biến đổi hóa học")) {
      return `1. Sự biến đổi hóa học là sự biến đổi từ chất này thành chất khác (có sinh ra chất mới).\n2. Sự biến đổi hóa học thường xảy ra dưới tác dụng của nhiệt độ cao, ánh sáng hoặc phản ứng giữa các chất (kèm hiện tượng sủi bọt, đổi màu, tỏa nhiệt, có mùi...).`;
    }
    if (titleLower.includes("vai trò của năng lượng") || (titleLower.includes("năng lượng") && titleLower.includes("vai trò"))) {
      return `1. Năng lượng là khả năng làm cho các vật chuyển động, phát sáng, tỏa nhiệt hoặc biến đổi.\n2. Mọi hoạt động sống, học tập, lao động sản xuất của con người và phương tiện đều cần có năng lượng.`;
    }
    if (titleLower.includes("năng lượng điện") || titleLower.includes("sử dụng điện")) {
      return `1. Điện năng là nguồn năng lượng quan trọng thắp sáng, sưởi ấm, làm mát, chạy máy móc và truyền thông tin.\n2. Quy tắc an toàn điện: Không chạm tay ướt vào ổ điện, không nghịch dây điện đứt, không cắm nhiều thiết bị chung một ổ cắm.\n3. Tiết kiệm điện: Tắt các thiết bị điện khi không sử dụng và tận dụng ánh sáng tự nhiên.`;
    }
    if (titleLower.includes("mạch điện") || titleLower.includes("dẫn điện") || titleLower.includes("cách điện")) {
      return `1. Mạch điện kín gồm: Nguồn điện (pin, ắc-quy), dây dẫn điện và thiết bị tiêu thụ điện (bóng đèn, chuông điện).\n2. Vật dẫn điện: Cho dòng điện chạy qua (đồng, nhôm, sắt, nước thường...).\n3. Vật cách điện: Không cho dòng điện chạy qua (nhựa, cao su, thủy tinh, sứ, gỗ khô...) dùng làm vỏ bảo vệ chống giật.`;
    }
    if (titleLower.includes("chất đốt")) {
      return `1. Các chất đốt phổ biến: Củi, than đá, khí gas, dầu hỏa, xăng. Khi cháy tỏa ra nhiệt năng và phát sáng.\n2. Cần sử dụng chất đốt tiết kiệm và thực hiện nghiêm ngặt quy tắc phòng cháy chữa cháy trong gia đình.\n3. Khí thải chất đốt gây ô nhiễm không khí; cần sử dụng bếp tiết kiệm nhiên liệu và hạn chế khói bụi.`;
    }
    if (titleLower.includes("mặt trời") || titleLower.includes("năng lượng gió") || titleLower.includes("nước chảy")) {
      return `1. Năng lượng mặt trời, gió và nước chảy là các nguồn năng lượng sạch, tự nhiên và có thể tái tạo.\n2. Con người sử dụng năng lượng gió để chạy thuyền buồm, quay tuabin gió phát điện; dùng sức nước làm quay guồng nước, nhà máy thủy điện; dùng năng lượng mặt trời thắp sáng, bình nước nóng và pin mặt trời.`;
    }
    if (titleLower.includes("sinh sản của thực vật") || titleLower.includes("thực vật có hoa")) {
      return `1. Hoa là cơ quan sinh sản của thực vật có hoa. Nhị là cơ quan sinh dục đực (tạo phấn), nhụy là cơ quan sinh dục cái (tạo noãn).\n2. Quá trình sinh sản gồm: Thụ phấn -> Thụ tinh -> Hình thành quả và hạt chứa phôi mầm.`;
    }
    if (titleLower.includes("sự phát triển của cây con") || titleLower.includes("cây con")) {
      return `1. Hạt gồm: Vỏ hạt, phôi và chất dinh dưỡng dự trữ. Hạt cần đủ độ ẩm, nhiệt độ và không khí thích hợp để nảy mầm.\n2. Cây con mọc lên từ hạt hoặc mọc ra từ một bộ phận của cây mẹ (thân, rễ củ, lá).`;
    }
    if (titleLower.includes("sinh sản của động vật") || titleLower.includes("động vật")) {
      return `1. Đa số động vật sinh sản hữu tính gồm con đực (sinh ra tinh trùng) và con cái (sinh ra trứng).\n2. Động vật đẻ trứng (chim, cá, bò sát, côn trùng...) và động vật đẻ con nuôi con bằng sữa mẹ (thú, gia súc...).`;
    }
    if (titleLower.includes("vòng đời") || titleLower.includes("sự phát triển")) {
      return `1. Vòng đời của động vật trải qua các giai đoạn từ trứng/con non, lớn lên, trưởng thành và sinh sản thế hệ mới.\n2. Một số côn trùng (bướm, muỗi) trải qua biến thái hoàn toàn: Trứng -> Sâu non (bọ gậy) -> Nhộng -> Bướm (muỗi) trưởng thành. Cần diệt bọ gậy phòng bệnh.`;
    }
    if (titleLower.includes("ôn tập")) {
      return `1. Hệ thống hóa toàn bộ các kiến thức trọng tâm của chủ đề đã học.\n2. Vận dụng kiến thức khoa học để phân tích hiện tượng và thực hành bảo vệ môi trường sống.\n3. Rèn luyện kĩ năng quan sát, đặt câu hỏi nghiên cứu và giải thích khoa học.`;
    }
  }

  // --- KHOA HỌC LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("tính chất của nước") || (titleLower.includes("nước") && titleLower.includes("cuộc sống"))) {
      return `1. Nước là chất lỏng trong suốt, không màu, không mùi, không vị, không có hình dạng nhất định, chảy từ cao xuống thấp và lan ra khắp phía.\n2. Nước có thể hòa tan một số chất (muối, đường) và không hòa tan một số chất (dầu, cát, đá).\n3. Nước có vai trò quyết định đối với sự sống của con người, thực vật, động vật và sản xuất nông công nghiệp.`;
    }
    if (titleLower.includes("sự chuyển thể của nước") || titleLower.includes("vòng tuần hoàn của nước")) {
      return `1. Nước tồn tại ở 3 thể: Thể lỏng (nước uống, sông hồ), thể khí (hơi nước) và thể rắn (băng tuyết, đá lạnh).\n2. Nước có thể chuyển đổi qua lại giữa các thể qua: Bay hơi, ngưng tụ, nóng chảy và đông đặc.\n3. Vòng tuần hoàn của nước trong tự nhiên: Nước bốc hơi tạo thành mây, mây ngưng tụ thành mưa rơi xuống đất và chảy về biển.`;
    }
    if (titleLower.includes("ô nhiễm và bảo vệ nguồn nước") || titleLower.includes("nguồn nước")) {
      return `1. Nước bị ô nhiễm do nước thải công nghiệp chưa xử lí, rác sinh hoạt, thuốc trừ sâu hóa học ngấm vào nguồn nước.\n2. Tác hại: Gây bệnh tiêu hóa, dịch tả, hủy hoại sinh vật thủy sinh và thiếu nước ngọt sạch.\n3. Biện pháp: Tiết kiệm nước sinh hoạt, không vứt rác xuống sông hồ, xử lí nước thải và bảo vệ giếng khơi.`;
    }
    if (titleLower.includes("không khí quanh ta") || titleLower.includes("tính chất của không khí")) {
      return `1. Không khí có ở xung quanh mọi vật và trong các khoảng rỗng của vật thể.\n2. Không khí trong suốt, không màu, không mùi, không vị, không có hình dạng nhất định và có thể bị nén lại hoặc giãn ra.\n3. Không khí gồm hai khí chính là khí ô-xy (duy trì sự sống, sự cháy) và khí ni-tơ, cùng một ít khí các-bô-níc, hơi nước, bụi.`;
    }
    if (titleLower.includes("vai trò của không khí") || titleLower.includes("bảo vệ môi trường không khí")) {
      return `1. Khí ô-xy trong không khí cần cho quá trình hô hấp của con người, động vật, thực vật và cần cho sự cháy.\n2. Khói bụi, khí độc từ nhà máy, xe cộ làm ô nhiễm không khí gây bệnh đường hô hấp.\n3. Cần trồng nhiều cây xanh, đi bộ/xe đạp, không đốt rác bừa bãi để giữ không khí trong lành.`;
    }
    if (titleLower.includes("gió") || titleLower.includes("bão")) {
      return `1. Không khí chuyển động sinh ra gió. Không khí chuyển động từ nơi lạnh (áp cao) đến nơi nóng (áp thấp).\n2. Gió nhẹ làm mát mẻ; gió to, bão giật gây đổ nhà cửa, cây cối và thiệt hại mùa màng.\n3. Cần chủ động chằng chống nhà cửa, theo dõi dự báo thời tiết và không ra ngoài khi mưa to bão lớn.`;
    }
    if (titleLower.includes("ánh sáng") || titleLower.includes("truyền ánh sáng")) {
      return `1. Ánh sáng truyền theo đường thẳng trong môi trường trong suốt.\n2. Có vật tự phát sáng (Mặt Trời, ngọn lửa, đèn pin bật) và vật được chiếu sáng (Mặt Trăng, bàn ghế, sách vở).\n3. Khi ánh sáng chiếu vào vật cản sáng sẽ tạo ra bóng tối phía sau vật cản.`;
    }
    if (titleLower.includes("vai trò của ánh sáng") || titleLower.includes("bảo vệ mắt")) {
      return `1. Ánh sáng giúp con người nhìn thấy mọi vật, cảm nhận vẻ đẹp thiên nhiên và giúp cây xanh quang hợp tươi tốt.\n2. Ánh sáng quá mạnh (nhìn thẳng Mặt Trời, tia hàn) hoặc quá yếu đều có hại cho mắt.\n3. Cần học tập nơi đủ ánh sáng và đeo kính râm khi đi dưới nắng gắt.`;
    }
    if (titleLower.includes("âm thanh") || titleLower.includes("truyền âm thanh")) {
      return `1. Âm thanh phát ra khi các vật thể rung động.\n2. Âm thanh có thể truyền qua các chất khí, chất lỏng và chất rắn (chất rắn truyền âm tốt nhất).\n3. Âm thanh giúp con người giao tiếp, học tập, thưởng thức âm nhạc và nhận tín hiệu báo động.`;
    }
    if (titleLower.includes("nhiệt độ") || titleLower.includes("sự truyền nhiệt") || titleLower.includes("dẫn nhiệt")) {
      return `1. Nhiệt độ được đo bằng nhiệt kế (đơn vị độ C). Nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.\n2. Nhiệt truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp hơn.\n3. Kim loại dẫn nhiệt tốt (làm xoong, nồi); gỗ, nhựa, len, xốp dẫn nhiệt kém (làm tay cầm quai nồi, áo ấm giữ nhiệt).`;
    }
    if (titleLower.includes("nấm") || titleLower.includes("vi khuẩn")) {
      return `1. Nấm và vi khuẩn có kích thước đa dạng; có loài có ích (nấm ăn, nấm men làm bánh mì, vi khuẩn lên men sữa chua) và có loài có hại (nấm mốc gây thiu hỏng thức ăn, vi khuẩn gây bệnh).\n2. Cần rửa tay bằng xà phòng trước khi ăn và bảo quản thức ăn an toàn trong tủ lạnh.`;
    }
  }

  // Fallback thông minh môn Khoa học dựa trên tên bài
  return `1. Khái niệm cốt lõi: Nắm vững bản chất hiện tượng khoa học và quy luật tự nhiên trong bài "${rawTitle}".\n2. Ý nghĩa thực tiễn: Hiểu rõ vai trò của bài học đối với đời sống con người, sinh vật và bảo vệ môi trường.\n3. Hành động của học sinh: Vận dụng kiến thức khoa học vào nếp sống hàng ngày, bảo vệ tài nguyên và giữ gìn sức khỏe.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN LỊCH SỬ VÀ ĐỊA LÍ
// ============================================================================
function getHistoryGeographyNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- LỊCH SỬ VÀ ĐỊA LÍ LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("vị trí địa lí") || titleLower.includes("lãnh thổ") || titleLower.includes("quốc kì")) {
      return `1. Vị trí địa lí: Nước Việt Nam nằm trên bán đảo Đông Dương, thuộc khu vực Đông Nam Á, có phần đất liền hình chữ S và vùng biển rộng lớn với hàng nghìn hòn đảo.\n2. Biểu tượng quốc gia: Quốc kì lá cờ đỏ sao vàng năm cánh; Quốc huy hình bông lúa và bánh xe răng; Quốc ca là bài hát "Tiến quân ca" của nhạc sĩ Văn Cao; Thủ đô là Hà Nội.\n3. Trách nhiệm: Tự hào về non sông gấm vóc và nêu cao ý thức giữ gìn, bảo vệ chủ quyền toàn vẹn lãnh thổ đất nước.`;
    }
    if (titleLower.includes("thiên nhiên việt nam") && (titleLower.includes("địa hình") || titleLower.includes("khoáng sản"))) {
      return `1. Địa hình: Phần đất liền nước ta có 3/4 diện tích là đồi núi (chủ yếu là đồi núi thấp) và 1/4 diện tích là đồng bằng bằng phẳng, màu mỡ.\n2. Khoáng sản: Nước ta có nhiều loại khoáng sản quý như than đá (Quảng Ninh), dầu mỏ và khí đốt (thềm lục địa phía Nam), bô-xít (Tây Nguyên), sắt, a-pa-tít...\n3. Chúng ta cần khai thác tài nguyên khoáng sản hợp lí, tiết kiệm và bảo vệ môi trường sinh thái.`;
    }
    if (titleLower.includes("khí hậu") || titleLower.includes("sông ngòi")) {
      return `1. Khí hậu nước ta mang tính chất nhiệt đới ẩm gió mùa: Nhiệt độ trung bình cao, nhiều mưa và gió thay đổi theo mùa. Miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm với hai mùa mưa - khô rõ rệt.\n2. Sông ngòi: Mạng lưới sông ngòi nước ta dày đặc nhưng nhiều sông ngắn và dốc; hai hệ thống sông lớn nhất là sông Hồng và sông Mê Kông (sông Cửu Long).\n3. Học sinh cần có ý thức sử dụng tiết kiệm nước sạch và chung tay bảo vệ nguồn nước sông hồ không bị ô nhiễm.`;
    }
    if (titleLower.includes("đất") && titleLower.includes("rừng")) {
      return `1. Đất: Nước ta có 2 nhóm đất chính là đất phe-ra-lit (ở đồi núi, màu đỏ vàng) và đất phù sa (ở các đồng bằng, rất phì nhiêu màu mỡ, trồng lúa nước và cây ăn trái).\n2. Rừng: Nước ta có rừng rậm nhiệt đới (ở vùng đồi núi có nhiều tầng cây xanh tốt quanh năm) và rừng ngập mặn (ven biển, rễ chùm chằng chịt giữ đất).\n3. Rừng và đất là tài nguyên quý giá; cần tích cực trồng cây gây rừng, chống xói mòn và bảo vệ môi trường sinh thái.`;
    }
    if (titleLower.includes("biển, đảo") || titleLower.includes("biển đảo")) {
      return `1. Vùng biển Việt Nam là một phần của Biển Đông, có diện tích rộng lớn, nguồn hải sản phong phú và trữ lượng dầu khí đáng kể.\n2. Biển có hàng nghìn hòn đảo lớn nhỏ; hai quần đảo xa bờ thiêng liêng là quần đảo Hoàng Sa và quần đảo Trường Sa.\n3. Khẳng định chủ quyền biển đảo thiêng liêng của Tổ quốc; bảo vệ môi trường biển và giữ vững an ninh biên cương.`;
    }
    if (titleLower.includes("dân cư") || titleLower.includes("dân tộc")) {
      return `1. Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em cùng chung sống hòa thuận, đoàn kết một lòng.\n2. Dân tộc Kinh (Việt) có số dân đông nhất; các dân tộc thiểu số phân bố chủ yếu ở vùng trung du, miền núi và cao nguyên.\n3. Dân cư nước ta phân bố chưa đồng đều: Tập trung đông đúc ở đồng bằng và thưa thớt ở vùng núi; cần tôn trọng bản sắc văn hóa của nhau.`;
    }
    if (titleLower.includes("văn lang") || titleLower.includes("âu lạc")) {
      return `1. Nhà nước Văn Lang: Ra đời vào khoảng thế kỉ VII TCN, do các vua Hùng đứng đầu, đóng đô ở Phong Châu (Phú Thọ) - là nhà nước đầu tiên của dân tộc ta.\n2. Nhà nước Âu Lạc: Tiếp nối thời Văn Lang, do An Dương Vương (Thục Phán) lãnh đạo, dời đô về Cổ Loa, xây thành kiên cố và chế tạo nỏ liên châu giữ nước.\n3. Bài học lịch sử: Luôn nêu cao tinh thần cảnh giác bảo vệ non sông và khắc ghi đạo lí "Uống nước nhớ nguồn".`;
    }
    if (titleLower.includes("phù nam") || titleLower.includes("óc eo")) {
      return `1. Vương quốc Phù Nam hình thành ở vùng Nam Bộ nước ta vào thế kỉ I, phát triển rực rỡ với nền văn hóa Óc Eo cổ xưa.\n2. Người Phù Nam buôn bán đường biển sầm uất, đúc tiền kim loại, làm đồ trang sức bằng vàng bạc và dựng nhà sàn trên kênh rạch.`;
    }
    if (titleLower.includes("chăm-pa") || titleLower.includes("champa")) {
      return `1. Vương quốc Chăm-pa hình thành ở vùng Duyên hải miền Trung từ thế kỉ II, có nền văn hóa đặc sắc gắn liền với các tháp Chăm cổ kính (Thánh địa Mỹ Sơn).\n2. Người Chăm-pa giỏi đi biển, làm gốm, dệt vải và sáng tạo chữ viết riêng từ rất sớm.`;
    }
    if (titleLower.includes("bắc thuộc") || titleLower.includes("giành độc lập") || titleLower.includes("bạch đằng")) {
      return `1. Hơn 1000 năm thời kì Bắc thuộc, nhân dân ta liên tục quật khởi qua các cuộc khởi nghĩa anh hùng: Khởi nghĩa Hai Bà Trưng, Bà Triệu, Lý Bí, Mai Thúc Loan, Phùng Hưng...\n2. Năm 938, Ngô Quyền chỉ huy trận quyết chiến trên sông Bạch Đằng cắm cọc gỗ nhọn đánh tan quân Nam Hán, chấm dứt thời kì Bắc thuộc, mở ra kỉ nguyên độc lập lâu dài.\n3. Tự hào về truyền thống yêu nước bất khuất, mưu trí dũng cảm của cha ông.`;
    }
    if (titleLower.includes("triều lý") || titleLower.includes("dời đô") || titleLower.includes("thăng long")) {
      return `1. Mùa thu năm 1010, vua Lý Thái Tổ ban Chiếu dời đô từ Hoa Lư (Ninh Bình) về Đại La và đổi tên là Thăng Long (Hà Nội ngày nay).\n2. Thời nhà Lý, kinh thành Thăng Long phát triển thịnh vượng, xây dựng chùa Một Cột và Quốc Tử Giám - trường đại học đầu tiên của Việt Nam.\n3. Lý Thường Kiệt lãnh đạo kháng chiến chống quân Tống toàn thắng với bài thơ thần "Nam quốc sơn hà".`;
    }
    if (titleLower.includes("triều trần") || titleLower.includes("mông – nguyên") || titleLower.includes("mông nguyên")) {
      return `1. Nhà Trần thành lập năm 1226, tổ chức quân đội tinh nhuệ và xây dựng đê điều vững chắc.\n2. Ba lần kháng chiến chống quân xâm lược Mông - Nguyên toàn thắng (1258, 1285, 1288) với Hào khí Đông A rạng ngời, Hội nghị Diên Hồng và chiến thắng Bạch Đằng của Trần Hưng Đạo.\n3. Bài học về sự đoàn kết "Vua tôi đồng lòng, anh em hòa mục, cả nước góp sức" tạo nên sức mạnh bất diệt.`;
    }
    if (titleLower.includes("lam sơn") || titleLower.includes("hậu lê")) {
      return `1. Lê Lợi phất cờ khởi nghĩa Lam Sơn (Thanh Hóa) năm 1418, cùng Nguyễn Trãi lãnh đạo cuộc kháng chiến 10 năm gian khổ đánh tan quân Minh xâm lược.\n2. Năm 1428, Lê Lợi lên ngôi vua (Lê Thái Tổ), lập ra triều Hậu Lê. Thời vua Lê Thánh Tông ban hành Bộ luật Hồng Đức tiến bộ và vẽ bản đồ Hồng Đức đầu tiên của đất nước.`;
    }
    if (titleLower.includes("triều nguyễn") || titleLower.includes("kinh thành huế")) {
      return `1. Triều Nguyễn thành lập năm 1802 do vua Gia Long đứng đầu, định đô tại Phú Xuân (Huế), thống nhất lãnh thổ từ Ải Nam Quan đến Mũi Cà Mau.\n2. Quần thể Di tích Cố đô Huế với cung điện, lăng tẩm uy nghiêm là Di sản văn hóa thế giới được UNESCO công nhận.`;
    }
  }

  // --- LỊCH SỬ VÀ ĐỊA LÍ LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("phương tiện học tập") || (titleLower.includes("làm quen") && titleLower.includes("lịch sử và địa lí"))) {
      return `1. Phương tiện học tập Lịch sử và Địa lí gồm: Bản đồ, lược đồ, biểu đồ, tranh ảnh hiện vật và tư liệu lịch sử.\n2. Sử dụng đúng phương tiện giúp ta xác định chính xác thời gian, không gian, vị trí địa danh và diễn biến các sự kiện trọng đại.`;
    }
    if (titleLower.includes("trung du và miền núi bắc bộ")) {
      if (titleLower.includes("thiên nhiên")) {
        return `1. Thiên nhiên vùng Trung du và miền núi Bắc Bộ: Địa hình đồi núi hiểm trở, có đỉnh Phan-xi-păng cao nhất Đông Dương; khí hậu có mùa đông lạnh buốt.\n2. Sông suối dốc có tiềm năng thủy điện lớn (Thủy điện Hòa Bình, Sơn La); nhiều khoáng sản giá trị (than đá, a-pa-tít).\n3. Cần bảo vệ rừng đầu nguồn và trồng rừng chống sạt lở đất.`;
      }
      return `1. Lịch sử - văn hóa vùng Trung du và miền núi Bắc Bộ: Là nơi sinh sống của nhiều dân tộc (Tày, Nùng, Dao, Mông, Thái...).\n2. Nét văn hóa đặc sắc: Nhà sàn gỗ thoáng mát, trang phục thổ cẩm nhiều hoa văn, lễ hội Lồng Tồng, hát Then đàn tính.\n3. Tinh thần đoàn kết, kiên cường giữ vững biên cương Tổ quốc.`;
    }
    if (titleLower.includes("đền hùng") || titleLower.includes("giỗ tổ")) {
      return `1. Đền Hùng tọa lạc trên núi Nghĩa Lĩnh (thành phố Việt Trì, tỉnh Phú Thọ) là nơi thờ phụng các vua Hùng có công lập nước Văn Lang.\n2. Ngày Giỗ Tổ Hùng Vương mùng 10 tháng 3 âm lịch là ngày Quốc lễ của toàn dân tộc.\n3. Khắc ghi lời Bác Hồ dạy: "Các vua Hùng đã có công dựng nước, Bác cháu ta phải cùng nhau giữ lấy nước".`;
    }
    if (titleLower.includes("đồng bằng bắc bộ")) {
      if (titleLower.includes("thiên nhiên")) {
        return `1. Thiên nhiên Đồng bằng Bắc Bộ: Có hình tam giác châu thổ do phù sa sông Hồng và sông Thái Bình bồi đắp, địa hình bằng phẳng.\n2. Hệ thống đê ven sông kiên cố dài hàng nghìn km giúp ngăn lũ lụt, bảo vệ mùa màng và xóm làng qua nhiều thế hệ.`;
      }
      return `1. Dân cư và sản xuất Đồng bằng Bắc Bộ: Dân cư đông đúc nhất cả nước, chủ yếu là người Kinh.\n2. Là vựa lúa lớn thứ hai của đất nước; nổi tiếng với nhiều làng nghề truyền thống lâu đời (gốm Bát Tràng, lụa Vạn Phúc, tranh Đông Hồ...).`;
    }
    if (titleLower.includes("sông hồng") || titleLower.includes("văn minh sông hồng")) {
      return `1. Sông Hồng là dòng sông lớn nhất miền Bắc, mang nguồn phù sa màu mỡ bồi đắp đồng bằng Bắc Bộ.\n2. Văn minh sông Hồng là cái nôi của nền nông nghiệp lúa nước; biểu tượng rực rỡ là Trống đồng Đông Sơn thể hiện đời sống tài hoa của người Việt cổ.`;
    }
    if (titleLower.includes("thăng long - hà nội") || titleLower.includes("thăng long")) {
      return `1. Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư về Thăng Long mở ra thời kì hưng thịnh của quốc gia.\n2. Hà Nội là Thủ đô ngàn năm văn hiến, trung tâm đầu não chính trị, hành chính quốc gia, trung tâm lớn về văn hóa, khoa học và kinh tế của cả nước.`;
    }
    if (titleLower.includes("văn miếu") || titleLower.includes("quốc tử giám")) {
      return `1. Văn Miếu được xây dựng năm 1070; Quốc Tử Giám lập năm 1076 là trường đại học đầu tiên của Việt Nam.\n2. 82 tấm bia Tiến sĩ là Di sản tư liệu thế giới vinh danh những người đỗ đạt, thể hiện truyền thống hiếu học và tư tưởng "Hiền tài là nguyên khí của quốc gia".`;
    }
    if (titleLower.includes("duyên hải miền trung")) {
      return `1. Vùng Duyên hải miền Trung: Dải đồng bằng hẹp ven biển bị chia cắt bởi các nhánh núi đâm ngang ra biển; có nhiều cồn cát và đầm phá.\n2. Hoạt động kinh tế: Làm muối, đánh bắt và nuôi trồng hải sản, du lịch biển; có nét văn hóa Lễ hội Cầu ngư tôn kính cá voi (cá Ông).`;
    }
    if (titleLower.includes("tây nguyên")) {
      return `1. Vùng Tây Nguyên gồm các cao nguyên xếp tầng rộng lớn (Kon Tum, Pleiku, Đắk Lắk, Lâm Viên...).\n2. Đất đỏ ba-zan màu mỡ thích hợp trồng cà phê, cao su, hồ tiêu; nổi tiếng với Không gian văn hóa Cồng chiêng Tây Nguyên - Di sản văn hóa phi vật thể của nhân loại.`;
    }
    if (titleLower.includes("nam bộ")) {
      return `1. Đồng bằng Nam Bộ là vùng đồng bằng châu thổ rộng lớn nhất nước ta do hệ thống sông Mê Kông và sông Đồng Nai bồi đắp.\n2. Vựa lúa, vựa trái cây và thủy sản lớn nhất cả nước; văn hóa gắn liền chợ nổi sông nước và đờn ca tài tử Nam Bộ.`;
    }
  }

  // Fallback thông minh môn Lịch sử và Địa lí
  return `1. Sự kiện / Đặc điểm tự nhiên: Nắm chắc mốc thời gian, không gian địa lí và diễn biến chính của bài: "${rawTitle}".\n2. Giá trị lịch sử / kinh tế: Hiểu rõ ý nghĩa của sự kiện lịch sử hoặc vai trò của vùng đất đối với sự phát triển của đất nước.\n3. Tình yêu quê hương: Bồi dưỡng niềm tự hào dân tộc, ý thức bảo vệ di tích lịch sử và giữ gìn môi trường xanh sạch đẹp.`;
}

// ============================================================================
// HÀM XỬ LÝ CHO MÔN CÔNG NGHỆ
// ============================================================================
function getTechnologyNotebookSummary(grade: number, titleLower: string, rawTitle: string): string {
  // --- CÔNG NGHỆ LỚP 5 ---
  if (grade === 5) {
    if (titleLower.includes("vai trò của công nghệ") || (titleLower.includes("vai trò") && titleLower.includes("công nghệ"))) {
      return `1. Công nghệ tạo ra các sản phẩm kĩ thuật, tiện ích phục vụ đời sống con người, giúp tăng năng suất lao động và giải phóng sức lao động chân tay.\n2. Công nghệ góp phần phát triển kinh tế, thúc đẩy xã hội văn minh và kết nối thông tin toàn cầu.\n3. Sử dụng các sản phẩm công nghệ đúng cách, an toàn và có ý thức tiết kiệm năng lượng.`;
    }
    if (titleLower.includes("nhà sáng chế")) {
      return `1. Nhà sáng chế là người phát minh, tạo ra sản phẩm kĩ thuật, công nghệ mới phục vụ đời sống xã hội (như Thomas Edison phát minh bóng đèn điện, James Watt hoàn thiện máy hơi nước...).\n2. Phẩm chất của nhà sáng chế: Óc quan sát tinh tế, trí tưởng tượng phong phú, niềm say mê khoa học và đặc biệt là đức tính kiên trì, không nản lòng trước thất bại.\n3. Học sinh cần rèn luyện tính tò mò, tích cực tìm hiểu khoa học và sáng tạo cải tiến đồ dùng học tập hàng ngày.`;
    }
    if (titleLower.includes("tìm hiểu thiết kế") || titleLower.includes("thiết kế sản phẩm")) {
      return `1. Thiết kế là quá trình sáng tạo nhằm giải quyết một vấn đề thực tiễn thông qua việc lên ý tưởng, lập bản vẽ và chế tạo sản phẩm mẫu.\n2. Các bước thiết kế cơ bản: Xác định yêu cầu -> Thu thập thông tin -> Lập bản vẽ phác thảo -> Chế tạo mẫu thử -> Đánh giá và hoàn thiện sản phẩm.\n3. Khi thiết kế cần chú ý tính thẩm mĩ, công năng tiện dụng, độ bền chắc và an toàn khi sử dụng.`;
    }
    if (titleLower.includes("sử dụng điện thoại") || titleLower.includes("điện thoại")) {
      return `1. Điện thoại là thiết bị liên lạc thông minh; cần nhớ các số điện thoại khẩn cấp: 111 (Bảo vệ trẻ em), 113 (Công an), 114 (Cứu hỏa), 115 (Cấp cứu y tế).\n2. Văn hóa dùng điện thoại: Giao tiếp lễ phép, nói rõ ràng, ngắn gọn; không sử dụng điện thoại khi đang sạc pin hoặc trong giờ học.\n3. Bảo vệ sức khỏe: Giữ khoảng cách an toàn cho mắt, giới hạn thời gian xem màn hình và giữ bí mật thông tin cá nhân trên môi trường mạng.`;
    }
    if (titleLower.includes("quạt điện") || titleLower.includes("đèn bàn") || titleLower.includes("tủ lạnh")) {
      return `1. Cấu tạo cơ bản và chức năng của thiết bị công nghệ trong gia đình.\n2. Quy trình sử dụng an toàn: Đặt nơi bằng phẳng khô ráo, sử dụng đúng nguồn điện, tắt công tắc khi rời khỏi phòng và rút phích cắm khi vệ sinh máy.\n3. Thường xuyên lau chùi sạch sẽ và bảo dưỡng định kì để thiết bị hoạt động bền đẹp.`;
    }
    if (titleLower.includes("lắp ráp") || titleLower.includes("mô hình")) {
      return `1. Quy trình lắp ráp mô hình kĩ thuật: Chuẩn bị chi tiết -> Lắp ráp từng bộ phận -> Lắp ráp hoàn thiện mô hình -> Vận hành thử nghiệm và điều chỉnh.\n2. Thao tác dùng cờ-lê và tua-vít đúng kỹ thuật: Siết chặt vít theo chiều kim đồng hồ, tháo vít ngược chiều kim đồng hồ, đảm bảo mối ghép chắc chắn và an toàn.`;
    }
  }

  // --- CÔNG NGHỆ LỚP 4 ---
  if (grade === 4) {
    if (titleLower.includes("lợi ích của hoa") || titleLower.includes("cây cảnh")) {
      return `1. Hoa và cây cảnh làm đẹp cảnh quan nhà cửa, trường lớp, thanh lọc không khí và mang lại niềm vui thư thái tinh thần.\n2. Trồng hoa cây cảnh đem lại nguồn thu nhập kinh tế cho các nhà vườn và tạo việc làm cho người lao động.\n3. Chúng ta cần chăm sóc, bảo vệ cây xanh và không bẻ cành ngắt hoa nơi công cộng.`;
    }
    if (titleLower.includes("trồng hoa") || titleLower.includes("trồng cây")) {
      return `1. Chuẩn bị trồng hoa cây cảnh trong chậu: Chậu trồng thoát nước tốt, giá thể/đất giàu dinh dưỡng tơi xốp, cây giống khỏe mạnh và dụng cụ làm vườn an toàn.\n2. Quy trình trồng: Rải lớp lót đáy chậu -> Cho giá thể vào 1/2 chậu -> Đặt cây thẳng đứng vào giữa -> Bổ sung giá thể xung quanh gốc và ấn nhẹ -> Tưới nước đủ ẩm.`;
    }
    if (titleLower.includes("chăm sóc hoa") || titleLower.includes("chăm sóc cây")) {
      return `1. Các công việc chăm sóc hàng ngày: Tưới nước vừa đủ (sáng sớm hoặc chiều mát), bón phân hợp lí theo thời kì sinh trưởng, bắt sâu và tỉa cành lá khô vàng.\n2. Đặt chậu cây nơi có đủ ánh sáng tự nhiên thích hợp để cây quang hợp phát triển tươi tốt.`;
    }
    if (titleLower.includes("chi tiết và dụng cụ") || titleLower.includes("lắp ghép mô hình")) {
      return `1. Bộ lắp ghép kĩ thuật gồm: Các tấm nền, thanh thẳng, thanh chữ U, bánh xe, trục và chi tiết liên kết (vít, đai ốc, vòng hãm).\n2. Dụng cụ: Cờ-lê để giữ đai ốc, tua-vít để vặn vít; xoay theo chiều kim đồng hồ để siết chặt, ngược chiều kim đồng hồ để nới lỏng.\n3. Cất giữ dụng cụ và chi tiết gọn gàng vào hộp sau khi thực hành.`;
    }
    if (titleLower.includes("bập bênh")) {
      return `1. Mô hình bập bênh gồm các bộ phận: Giá đỡ bập bênh, thanh đòn bập bênh và ghế ngồi hai bên.\n2. Quy trình: Lắp giá đỡ -> Lắp thanh đòn và ghế ngồi -> Lắp thanh đòn vào trục giá đỡ bằng đai ốc lỏng để bập bênh cử động nhịp nhàng.`;
    }
    if (titleLower.includes("robot") || titleLower.includes("xe đua") || titleLower.includes("tuabin")) {
      return `1. Nhận biết các bộ phận chính của mô hình (khung xe, bánh xe, cánh quạt, trục truyền động).\n2. Lắp ráp đúng sơ đồ kĩ thuật từng bước, kiểm tra các khớp nối quay trơn tru và đảm bảo kết cấu vững chắc.`;
    }
  }

  // Fallback thông minh môn Công nghệ
  return `1. Nguyên lí & cấu tạo: Nắm vững cấu tạo, công dụng và quy trình thao tác kĩ thuật chuẩn của bài: "${rawTitle}".\n2. Kĩ năng thực hành: Rèn luyện kĩ năng khéo léo, thao tác an toàn lao động và bảo quản dụng cụ kĩ thuật ngăn nắp.\n3. Ý thức thực tế: Tiết kiệm năng lượng, bảo vệ đồ dùng công nghệ trong gia đình và trường học.`;
}

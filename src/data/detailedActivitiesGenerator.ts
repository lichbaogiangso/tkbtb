import { Grade, LessonActivity } from "../types";
import { getGrade1DetailedActivities } from "./grade1ActivitiesGenerator";
import { cleanLessonTitle, normalizeActivityName, isLaterPeriodOfMultiPeriodLesson } from "../utils/lessonTitleHelper";
import { getAtgtLessonForWeek } from "./atgtCurriculum";
import { getDisasterLessonForWeek, isDisasterCurriculumActive } from "./disasterCurriculum";
import { getLessonNotebookSummary } from "./lessonNotebookSummaryHelper";
import { getSubjectEssentialMaterials } from "../utils/materialsHelper";

export interface DetailedActivitiesResult {
  specificCompetencies: string[];
  teacherMaterials: string[];
  studentMaterials: string[];
  activities: LessonActivity[];
  notebookSummary?: string;
}

// Helper to extract clean keywords from lesson title
function cleanTitle(title: string): string {
  const cleaned = cleanLessonTitle(title);
  return cleaned
    .replace(/^tiết\s+\d+[:\s-]*/i, "")
    .replace(/^bài\s+\d+[:\s-]*/i, "")
    .replace(/\(tiết\s+\d+\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Xây dựng Yêu cầu cần đạt (Năng lực đặc thù) chuẩn xác, chi tiết, bám sát nội dung và phương pháp của từng KHBD cụ thể
 */
function getDetailedSpecificCompetencies(params: {
  grade: Grade | number;
  subject: string;
  lessonTitle: string;
  subSubject?: string;
  curriculumPeriod?: number | string;
  week?: number;
}): string[] {
  const { grade, subject, lessonTitle, subSubject = "", week = 1 } = params;
  const subLower = (subject || "").toLowerCase();
  const titleLower = (lessonTitle || "").toLowerCase();
  const displayTitle = cleanTitle(lessonTitle);

  // 1. MÔN TOÁN
  if (subLower.includes("toán") || subLower === "t") {
    // Tuần 6: Viết số đo đại lượng dưới dạng số thập phân
    if (titleLower.includes("viết số đo") || (titleLower.includes("số đo đại lượng") && titleLower.includes("số thập phân"))) {
      return [
        `Học sinh nhận biết và thực hiện thành thạo kĩ năng viết số đo độ dài, khối lượng, diện tích dưới dạng số thập phân theo các đơn vị đo đã học trong bài "${displayTitle}".`,
        "Hiểu rõ bản chất mối quan hệ giữa các đơn vị đo và cấu tạo các hàng của số thập phân; vận dụng ước lượng và ghi chép số liệu đo đạc thực tế tại gia đình và trường học."
      ];
    }
    // Tuần 6: Làm tròn số thập phân
    if (titleLower.includes("làm tròn số thập phân") || titleLower.includes("làm tròn")) {
      return [
        `Học sinh nắm vững quy tắc làm tròn số thập phân đến hàng đơn vị, hàng phần mười, hàng phần trăm trong bài "${displayTitle}" (thông qua việc quan sát tia số và so sánh chữ số ở hàng liền sau với 5).`,
        "Thực hiện chính xác thao tác làm tròn số trong tính toán; vận dụng linh hoạt vào ước lượng giá tiền, chi phí mua sắm và số đo đại lượng thực tế trong đời sống."
      ];
    }
    // Tuần 6: Luyện tập chung (Số thập phân)
    if (titleLower.includes("luyện tập chung") && (titleLower.includes("thập phân") || week === 6)) {
      return [
        `Củng cố và khắc sâu kĩ năng so sánh số thập phân, viết số đo đại lượng dưới dạng số thập phân và làm tròn số thập phân trong bài "${displayTitle}".`,
        "Rèn luyện tư duy tính toán nhanh, chính xác; phát triển năng lực giải quyết vấn đề toán học qua các bài toán có lời văn gắn với thực tế sản xuất và sinh hoạt."
      ];
    }
    // Hỗn số
    if (titleLower.includes("hỗn số")) {
      return [
        `Học sinh nhận biết khái niệm và cấu tạo của hỗn số gồm phần nguyên và phần phân số trong bài "${displayTitle}"; biết đọc, viết hỗn số qua mô hình hình học trực quan.`,
        "Nắm vững cách chuyển đổi một phân số lớn hơn 1 thành hỗn số và ngược lại; vận dụng giải quyết bài toán chia đồ vật thực tế trong đời sống."
      ];
    }
    // Phân số thập phân / Khái niệm số thập phân
    if (titleLower.includes("phân số thập phân") || titleLower.includes("khái niệm số thập phân")) {
      return [
        `Học sinh nhận biết các phân số có mẫu số là 10, 100, 1000... là phân số thập phân; hiểu cấu tạo số thập phân gồm phần nguyên và phần thập phân trong bài "${displayTitle}".`,
        "Biết đọc, viết, xác định giá trị theo vị trí của từng chữ số; chuyển đổi linh hoạt giữa phân số thập phân và số thập phân."
      ];
    }
    // Hình học & Đo lường
    if (titleLower.includes("hình") || titleLower.includes("diện tích") || titleLower.includes("chu vi") || titleLower.includes("thể tích") || titleLower.includes("tam giác") || titleLower.includes("thang") || titleLower.includes("tròn")) {
      return [
        `Học sinh nắm vững đặc điểm hình học, quy tắc và công thức tính chu vi / diện tích / thể tích trong bài "${displayTitle}".`,
        "Thành thạo kĩ năng sử dụng thước vẽ hình, cắt ghép hình học; vận dụng công thức tính toán số đo các đồ vật thực tế xung quanh lớp học và gia đình."
      ];
    }
    // Đơn vị đo diện tích
    if (titleLower.includes("héc-ta") || titleLower.includes("ki-lô-mét vuông") || titleLower.includes("diện tích")) {
      return [
        `Học sinh nhận biết đơn vị đo diện tích héc-ta (ha), ki-lô-mét vuông (km²); hiểu mối quan hệ giữa các đơn vị đo diện tích trong bảng đơn vị đo.`,
        "Biết chuyển đổi giữa các đơn vị đo diện tích; vận dụng giải các bài toán thực tế về đo diện tích đất nông nghiệp, rừng và công trình xây dựng."
      ];
    }
    // Toán chuyển động
    if (titleLower.includes("vận tốc") || titleLower.includes("quãng đường") || titleLower.includes("thời gian") || titleLower.includes("chuyển động")) {
      return [
        `Học sinh hiểu bản chất các đại lượng vận tốc, quãng đường, thời gian và mối quan hệ giữa chúng trong bài "${displayTitle}".`,
        "Nắm chắc và vận dụng thành thạo các công thức v = s : t, s = v x t, t = s : v để giải quyết bài toán chuyển động đều gắn với an toàn giao thông."
      ];
    }
    // Toán tổng quát lớp 5
    if (Number(grade) === 5) {
      return [
        `Học sinh nắm vững kiến thức trọng tâm, bản chất toán học và thuật toán tính toán trong bài "${displayTitle}".`,
        "Rèn luyện tư duy logic, kĩ năng tính toán chính xác và năng lực vận dụng toán học vào giải quyết các tình huống thực tiễn đời sống."
      ];
    }
    return [
      `Học sinh hiểu và thực hiện đúng kỹ thuật tính trong bài "${displayTitle}".`,
      "Vận dụng kiến thức giải các bài toán thực tế đơn giản, phát triển tư duy số học."
    ];
  }

  // 2. MÔN TIẾNG VIỆT
  if (subLower.includes("tiếng việt") || subLower === "tv" || subLower.includes("tctv")) {
    // 2a. Hang Sơn Đoòng - Những điều kì thú (Tuần 6)
    if (titleLower.includes("hang sơn đoòng") || titleLower.includes("sơn đoòng")) {
      if (titleLower.includes("từ đồng nghĩa")) {
        return [
          "Phân biệt chính xác các từ đồng nghĩa hoàn toàn và không hoàn toàn; hiểu sắc thái ý nghĩa của từng từ đồng nghĩa trong ngữ cảnh cụ thể.",
          "Biết lựa chọn và sử dụng từ đồng nghĩa phù hợp để thay thế trong câu văn; vận dụng đặt câu miêu tả cảnh sắc thiên nhiên giàu hình ảnh và cảm xúc."
        ];
      }
      if (titleLower.includes("mở bài") || titleLower.includes("kết bài")) {
        return [
          "Nắm vững đặc điểm, tác dụng của mở bài trực tiếp - gián tiếp và kết bài không mở rộng - mở rộng trong bài văn tả phong cảnh.",
          "Viết được đoạn mở bài gián tiếp cuốn hút và kết bài mở rộng giàu cảm xúc cho bài văn miêu tả cảnh đẹp thiên nhiên quê hương."
        ];
      }
      return [
        `Đọc đúng, trôi chảy và diễn cảm toàn bài "${displayTitle}"; ngắt nghỉ hơi đúng ngữ pháp và nhấn giọng ở các từ ngữ gợi tả sự kì vĩ, độc đáo của hang.`,
        "Hiểu nội dung bài đọc: Khám phá vẻ đẹp kì vĩ của Hang Sơn Đoòng - hang động tự nhiên lớn nhất thế giới; khơi dậy niềm tự hào về danh lam thắng cảnh Việt Nam và ý thức bảo vệ di sản thiên nhiên."
      ];
    }

    // 2b. Những hòn đảo trên vịnh Hạ Long (Tuần 6)
    if (titleLower.includes("vịnh hạ long") || titleLower.includes("hòn đảo")) {
      if (titleLower.includes("quan sát")) {
        return [
          "Nắm vững phương pháp quan sát phong cảnh thiên nhiên theo trình tự hợp lí (từ xa đến gần, từ bao quát đến chi tiết) và phối hợp đa giác quan.",
          "Biết phát hiện các nét đẹp đặc trưng, chi tiết tiêu biểu của cảnh vật và ghi chép vào sổ tay quan sát để chuẩn bị tư liệu viết văn miêu tả."
        ];
      }
      if (titleLower.includes("động vật hoang dã") || titleLower.includes("bảo tồn")) {
        return [
          "Tự tin trình bày ý kiến, quan điểm cá nhân về việc bảo tồn các loài động vật hoang dã quý hiếm trước tập thể; biết lắng nghe và phản hồi lịch sự.",
          "Nâng cao nhận thức bảo vệ môi trường sinh thái, cam kết không sử dụng sản phẩm từ động vật hoang dã và tuyên truyền cùng người thân."
        ];
      }
      return [
        `Đọc diễn cảm bài đọc "${displayTitle}"; thể hiện giọng đọc say mê, tự hào trước vẻ đẹp kì ảo, muôn hình vạn trạng của các đảo đá trên vịnh.`,
        "Cảm nhận sâu sắc vẻ đẹp di sản thiên nhiên thế giới Vịnh Hạ Long; bồi dưỡng tình yêu quê hương đất nước và niềm tự hào về biển đảo Tổ quốc."
      ];
    }

    // 2c. Từ đồng nghĩa tổng quát
    if (titleLower.includes("từ đồng nghĩa")) {
      return [
        "Hiểu khái niệm từ đồng nghĩa, phân biệt từ đồng nghĩa hoàn toàn và không hoàn toàn; tìm được các từ đồng nghĩa trong văn bản.",
        "Biết lựa chọn từ ngữ chuẩn xác, giàu sắc thái biểu cảm khi nói và viết; vận dụng tra cứu từ điển Tiếng Việt hiệu quả."
      ];
    }

    // 2d. Văn tả cảnh tổng quát
    if (titleLower.includes("tả phong cảnh") || titleLower.includes("tả cảnh")) {
      return [
        "Nắm vững cấu tạo bài văn tả cảnh gồm 3 phần (mở bài, thân bài, kết bài) và trình tự miêu tả sinh động.",
        "Biết sử dụng các biện pháp so sánh, nhân hóa và từ ngữ gợi tả để làm nổi bật nét đẹp đặc trưng của cảnh vật thiên nhiên."
      ];
    }

    // Phân nhánh kỹ năng Tiếng Việt
    const isDoc = titleLower.includes("đọc") || subSubject.toLowerCase().includes("đọc");
    const isViet = titleLower.includes("viết") || subSubject.toLowerCase().includes("viết");
    const isLTVC = titleLower.includes("từ và câu") || titleLower.includes("ltvc") || subSubject.toLowerCase().includes("luyện từ");

    if (isDoc) {
      return [
        `Đọc đúng, trôi chảy, lưu loát toàn bài "${displayTitle}"; ngắt nghỉ hơi đúng ngữ pháp, thể hiện giọng đọc diễn cảm phù hợp với nội dung bài học.`,
        "Hiểu nội dung, ý nghĩa và thông điệp nhân văn sâu sắc của bài đọc; bồi dưỡng tình cảm tốt đẹp, tình yêu gia đình, thầy cô và quê hương đất nước."
      ];
    }
    if (isLTVC) {
      return [
        `Nhận biết và nắm vững quy tắc ngữ pháp, đặc điểm từ ngữ trong bài "${displayTitle}".`,
        "Vận dụng chuẩn xác kiến thức từ và câu vào thực hành đặt câu, viết đoạn văn và giao tiếp lịch sự, văn minh hàng ngày."
      ];
    }
    if (isViet) {
      return [
        `Nắm vững quy trình xây dựng đoạn văn, bài văn trong bài "${displayTitle}".`,
        "Biết lựa chọn chi tiết, liên kết câu chặt chẽ, sử dụng từ ngữ gợi cảm và thể hiện cảm xúc chân thành trong bài viết."
      ];
    }
    return [
      `Phát triển toàn diện các kỹ năng đọc, viết, nói và nghe trong bài "${displayTitle}".`,
      "Mở rộng vốn từ ngữ phong phú, biết vận dụng ngôn ngữ tiếng Việt trong sáng, chuẩn mực vào giao tiếp hàng ngày."
    ];
  }

  // 3. MÔN KHOA HỌC
  if (subLower.includes("khoa học") || subLower === "kh") {
    // Sự biến đổi hoá học của chất (Tuần 6)
    if (titleLower.includes("biến đổi hoá học") || titleLower.includes("biến đổi hóa học")) {
      return [
        "Nêu được khái niệm sự biến đổi hoá học của chất; phân biệt được sự biến đổi vật lí và sự biến đổi hoá học qua dấu hiệu sinh ra chất mới có tính chất khác biệt.",
        "Tiến hành được thí nghiệm an toàn chứng minh sự biến đổi hoá học; giải thích được các hiện tượng biến đổi hoá học quen thuộc trong đời sống và gian bếp gia đình."
      ];
    }
    // Ôn tập chủ đề Chất (Tuần 6)
    if (titleLower.includes("chủ đề chất") || (titleLower.includes("ôn tập") && titleLower.includes("chất"))) {
      return [
        "Hệ thống hóa toàn bộ kiến thức cốt lõi về ba trạng thái của chất, sự biến đổi trạng thái, hỗn hợp và dung dịch, sự biến đổi hoá học.",
        "Vận dụng kiến thức chủ đề Chất để giải thích các hiện tượng tự nhiên và thực hiện nghiêm ngặt các quy tắc an toàn khi sử dụng các chất trong gia đình."
      ];
    }
    return [
      `Học sinh giải thích được hiện tượng, nêu được bản chất khoa học và vai trò trong bài: "${displayTitle}".`,
      "Rèn luyện phương pháp quan sát, thực nghiệm khoa học an toàn, tư duy logic và ý thức bảo vệ tài nguyên thiên nhiên, môi trường sống."
    ];
  }

  // 4. MÔN LỊCH SỬ VÀ ĐỊA LÍ
  if (
    subLower.includes("lịch sử") ||
    subLower.includes("địa lí") ||
    subLower.includes("địa lý") ||
    subLower.includes("ls-đl") ||
    subLower.includes("ls&đl") ||
    subLower === "ls" ||
    subLower === "đl"
  ) {
    // Dân cư và dân tộc ở Việt Nam (Tuần 6)
    if (titleLower.includes("dân cư") || titleLower.includes("dân tộc")) {
      return [
        "Trình bày được đặc điểm phân bố dân cư ở nước ta (tập trung đông ở vùng đồng bằng, ven biển; thưa thớt ở vùng núi) và sự đa dạng của 54 dân tộc anh em.",
        "Khai thác được bản đồ phân bố dân cư và bảng số liệu thống kê; hiểu ý nghĩa của khối đại đoàn kết toàn dân tộc và tinh thần tương thân tương ái tại địa phương Tân Thạnh."
      ];
    }
    return [
      `Học sinh trình bày được diễn biến sự kiện lịch sử hoặc đặc điểm địa lí tự nhiên, dân cư, kinh tế trong bài: "${displayTitle}".`,
      "Biết khai thác lược đồ, bản đồ, tranh ảnh hiện vật lịch sử; bồi dưỡng lòng tự hào dân tộc và tình yêu quê hương đất nước."
    ];
  }

  // 5. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  if (subLower.includes("hđtn") || subLower.includes("trải nghiệm") || subLower.includes("hdtn")) {
    const isSHDC = titleLower.includes("dưới cờ") || titleLower.includes("shdc") || titleLower.includes("chào cờ");
    const isSHL = titleLower.includes("sinh hoạt lớp") || titleLower.includes("shl");

    // SHDC Tuần 6 có tích hợp 15 phút thảm họa thiên tai
    if (isSHDC) {
      return [
        "Thực hiện nghiêm trang nghi lễ Chào cờ đầu tuần theo đúng nghi thức Đội TNTP Hồ Chí Minh; bồi dưỡng lòng tự hào dân tộc và tình yêu quê hương đất nước; nắm vững nhiệm vụ thi đua tuần mới của nhà trường và Liên đội.",
        "Tích hợp 15 phút Phòng ngừa và giảm nhẹ rủi ro thảm họa (Bài 1: Hiểm họa và Thảm họa theo tài liệu UBND Xã Tân Thạnh - Trường TH Tân Thạnh): Nhận biết khái niệm hiểm họa và thảm họa; phân biệt rõ hiểm họa là hiện tượng tự nhiên hoặc sự cố bất ngờ có nguy cơ gây hại (mưa bão, ngập lụt, dông sét, sạt lở bờ kênh tại địa bàn xã Tân Thạnh) và thảm họa là khi hiểm họa tác động vào cộng đồng dân cư mỏng manh gây tổn thất lớn về người và tài sản do con người thiếu khả năng ứng phó.",
        "Rèn luyện kỹ năng quan sát, nhận diện sớm các mối hiểm họa xung quanh nơi ở và trên đường đi học; cùng gia đình chủ động thực hiện các biện pháp giảm nhẹ rủi ro thiên tai."
      ];
    }

    // SHL Tuần 6 tích hợp An toàn giao thông
    if (isSHL) {
      return [
        "Học sinh tự đánh giá và đánh giá các mặt hoạt động học tập, nền nếp của bản thân và tập thể lớp tuần qua; thống nhất phương hướng thi đua tuần tới.",
        `Tích hợp Giáo dục An toàn giao thông: Nắm vững quy tắc đi bộ an toàn trên đường làng ngõ xóm không có vỉa hè; biết quan sát cẩn thận hai phía trước khi qua đường đê/bờ kênh; hình thành thói quen chấp hành nghiêm luật an toàn giao thông đường bộ.`
      ];
    }

    // Hoạt động giáo dục theo chủ đề
    return [
      `Khám phá kiến thức, rèn luyện kỹ năng thực hành và hình thành thói quen tích cực gắn với chủ đề: "${displayTitle}".`,
      "Tự tin bày tỏ ý kiến, lắng nghe và hợp tác hiệu quả cùng bạn bè trong các hoạt động trải nghiệm thực tế."
    ];
  }

  // 6. MÔN ĐẠO ĐỨC
  if (subLower.includes("đạo đức") || subLower === "đđ") {
    return [
      `Học sinh nhận biết được các chuẩn mực hành vi đạo đức, ý nghĩa và biểu hiện cụ thể trong bài: "${displayTitle}".`,
      "Biết phân biệt hành vi đúng - sai, có thái độ đồng tình với điều tốt, không đồng tình với cái xấu; rèn luyện thói quen ứng xử văn minh trong trường học và gia đình."
    ];
  }

  // 7. MÔN CÔNG NGHỆ
  if (subLower.includes("công nghệ") || subLower === "cn") {
    return [
      `Hiểu cấu tạo, tác dụng và các bước sử dụng/lắp ráp an toàn trong bài: "${displayTitle}".`,
      "Phát triển tư duy công nghệ, kỹ năng khéo léo và ý thức tiết kiệm năng lượng, an toàn lao động (STEM)."
    ];
  }

  // 8. MÔN TIN HỌC
  if (subLower.includes("tin học") || subLower === "th") {
    return [
      `Nắm vững các thao tác và kiến thức cơ bản trong bài "${displayTitle}". Rèn luyện Năng lực số (CV 3456/BGDĐT-GDTH) và tư duy máy tính.`,
      "Biết cách sử dụng thiết bị số an toàn, bảo vệ thông tin cá nhân trên môi trường mạng."
    ];
  }

  // 9. MÔN GDTC
  if (subLower.includes("thể chất") || subLower.includes("gdtc") || subLower === "td") {
    return [
      `Thực hiện đúng kỹ thuật động tác trong bài "${displayTitle}". Nâng cao thể lực, phản xạ nhanh nhẹn và tính kỷ luật.`,
      "Hình thành thói quen rèn luyện thân thể hàng ngày, biết giữ vệ sinh cá nhân và sân tập an toàn."
    ];
  }

  // 10. MÔN MĨ THUẬT
  if (subLower.includes("mĩ thuật") || subLower === "mt") {
    return [
      `Nhận biết và ứng dụng các yếu tố tạo hình (đường nét, màu sắc, hình khối, bố cục) trong bài "${displayTitle}".`,
      "Sáng tạo sản phẩm mĩ thuật độc đáo từ các vật liệu quen thuộc, thân thiện với môi trường (STEM)."
    ];
  }

  // Fallback mặc định
  return [
    `Nắm vững kiến thức trọng tâm của bài: "${displayTitle}". Thực hiện đúng các kỹ năng đặc thù theo chuẩn chương trình GDPT 2018.`,
    "Phát triển năng lực tự chủ, hợp tác và giải quyết vấn đề linh hoạt trong thực tiễn."
  ];
}

/**
 * Xây dựng nội dung Hoạt động 4 (Vận dụng) cụ thể, thực tế theo đúng trọng tâm từng bài học
 */
function getSpecificApplicationActivity(
  subject: string,
  lessonTitle: string,
  grade: number | Grade,
  subSubject = "",
  titleCore = ""
): { teacherActivity: string; studentActivity: string } {
  const subLower = (subject || "").toLowerCase();
  const titleLower = (lessonTitle || "").toLowerCase();
  const displayTitle = cleanTitle(lessonTitle);

  // 1. TOÁN
  if (subLower.includes("toán") || subLower === "t") {
    // 1a. Viết số đo đại lượng dưới dạng số thập phân (Tuần 6 Tiết 26, 27)
    if (titleLower.includes("viết số đo") || (titleLower.includes("số đo đại lượng") && titleLower.includes("số thập phân"))) {
      return {
        teacherActivity: `• Giao nhiệm vụ thực hành đo đạc và viết số đo thực tế:
- Đặt câu hỏi đàm thoại: "Vận dụng kiến thức viết số đo đại lượng dưới dạng số thập phân của bài '${displayTitle}', các em hãy đo chiều cao của bạn cùng bàn hoặc ước lượng chiều dài mặt bàn học, cuốn vở; sau đó viết số đo đó dưới dạng số thập phân với đơn vị mét (m)."
- Hướng dẫn học sinh cách đổi đơn vị từ xăng-ti-mét sang mét có dấu phẩy (ví dụ: 1m 25cm = 1,25m; 70cm = 0,7m).
• Dặn dò học sinh: Về nhà quan sát thông số thể tích, khối lượng tịnh ghi trên chai dầu ăn, hộp sữa, túi gạo của gia đình và đọc dưới dạng số thập phân.`,
        studentActivity: `• Thực hành đo đạc và viết số đo:
- Dùng thước kẻ đo chiều dài mặt bàn, ghi nhanh kết quả vào vở dưới dạng số thập phân (ví dụ: 1m 20cm = 1,2m; 65cm = 0,65m).
- 2-3 học sinh tự tin đọc to số đo trước lớp; giải thích cách đổi đơn vị.
• Tiếp nhận nhiệm vụ về nhà: Quan sát nhãn mác bao bì thực phẩm ở gia đình, ghi lại các số đo số thập phân vào sổ tay toán học.`
      };
    }

    // 1b. Làm tròn số thập phân (Tuần 6 Tiết 28, 29)
    if (titleLower.includes("làm tròn số thập phân") || titleLower.includes("làm tròn")) {
      return {
        teacherActivity: `• Tổ chức tình huống mua sắm và ước lượng thực tế:
- Đặt tình huống đời sống: "Khi đi chợ hoặc mua đồ cùng bố mẹ, nếu món hàng có giá 18 700 đồng hoặc số đo cân nặng 2,86 kg thịt, người bán hàng thường làm tròn như thế nào? Vận dụng quy tắc làm tròn số thập phân của bài '${displayTitle}' để giải thích."
- Hướng dẫn học sinh ứng dụng quy tắc làm tròn số thập phân vào tính nhẩm và ước lượng chi tiêu gia đình.
• Dặn dò học sinh: Về nhà cùng bố mẹ thực hành làm tròn số đo khi cân nặng đồ dùng hoặc tính tiền đi chợ.`,
        studentActivity: `• Vận dụng quy tắc làm tròn:
- Vận dụng quy tắc so sánh chữ số ở hàng liền sau với 5 để giải thích cách làm tròn: 18 700 đồng làm tròn thành 19 000 đồng; 2,86 kg làm tròn đến hàng phần mười là 2,9 kg, làm tròn đến hàng đơn vị là 3 kg.
- Nêu thêm ví dụ thực tế về làm tròn số đo khi đi siêu thị cùng người thân.
• Ghi nhớ ý nghĩa thực tiễn của việc làm tròn số thập phân trong cuộc sống hàng ngày.`
      };
    }

    // 1c. Hỗn số
    if (titleLower.includes("hỗn số")) {
      return {
        teacherActivity: `• Tình huống chia sẻ đồ vật thực tế:
- Đặt bài toán thực tế: "Mẹ mua 3 chiếc bánh, chia đều cho 2 anh em thì mỗi người được mấy chiếc bánh? Hãy biểu diễn số bánh mỗi người nhận được dưới dạng hỗn số theo bài '${displayTitle}'."
- Hướng dẫn học sinh liên hệ cách viết hỗn số khi đong đếm lít nước, số ki-lô-gam trái cây.
• Dặn dò học sinh: Về nhà tìm các tình huống sử dụng hỗn số trong sinh hoạt gia đình.`,
        studentActivity: `• Vận dụng thực tế:
- Tư duy nhanh, giơ tay phát biểu: Mỗi người được 1 chiếc nguyên và 1/2 chiếc bánh, viết là 1 1/2 chiếc bánh.
- Rút ra ý nghĩa thực tiễn của hỗn số trong việc diễn đạt số lượng lớn hơn 1 đơn vị.
• Ghi nhớ nhiệm vụ quan sát các tình huống chia đồ vật thực tế ở nhà.`
      };
    }

    // 1d. Phân số / Số thập phân tổng quát
    if (titleLower.includes("phân số") || titleLower.includes("thập phân") || titleLower.includes("tỉ số")) {
      return {
        teacherActivity: `• Tổ chức tình huống thực tiễn mở rộng:
- Đưa ra bài toán thực tế gắn với bài "${displayTitle}":
  + Ví dụ: "Mẹ chia đều chiếc bánh thành các phần bằng nhau hoặc đong số lít nước mắm, số ki-lô-gam gạo dùng số thập phân/phân số".
  + Yêu cầu học sinh vận dụng quy tắc tính vừa học để tìm ra câu trả lời nhanh nhất.
• Tổng kết & Dặn dò:
- Tóm tắt lại trọng tâm cách giải quyết bài toán về phân số / số thập phân trong thực tế.
- Nhận xét tiết học, dặn dò học sinh về nhà quan sát các nhãn mác bao bì thực phẩm có ghi số đo số thập phân và chia sẻ cùng người thân.`,
        studentActivity: `• Vận dụng thực tế:
- Tư duy nhanh theo tình huống thực tế giáo viên đưa ra, giơ tay nêu phép tính và giải thích kết quả.
- Rút ra ý nghĩa của việc sử dụng phân số / số thập phân trong cuộc sống hàng ngày.
• Tổng kết tiết học:
- 1-2 học sinh nhắc lại kiến thức trọng tâm bài học.
- Ghi nhớ nhiệm vụ về nhà tìm số đo thực tế trên nhãn mác bao bì ở gia đình.`
      };
    }

    // 1e. Hình học & Đo lường
    if (titleLower.includes("hình") || titleLower.includes("diện tích") || titleLower.includes("thể tích") || titleLower.includes("chu vi") || titleLower.includes("tam giác") || titleLower.includes("hộp") || titleLower.includes("lập phương") || titleLower.includes("thang") || titleLower.includes("tròn")) {
      return {
        teacherActivity: `• Giao nhiệm vụ thực hành đo đạc và tính toán thực tế:
- Yêu cầu học sinh tìm trong phòng học hoặc ở gia đình các đồ vật có dạng hình học vừa học trong bài "${displayTitle}" (mặt bàn học, viên gạch men, vườn hoa, hộp quà...).
- Hướng dẫn học sinh ước lượng và vận dụng công thức tính chu vi / diện tích / thể tích vào đồ vật cụ thể.
• Tổng kết & Dặn dò:
- Hệ thống lại công thức và đơn vị đo hình học cần ghi nhớ.
- Dặn dò học sinh về nhà dùng thước đo kích thước một đồ vật thực tế ở nhà và tính diện tích/thể tích.`,
        studentActivity: `• Vận dụng thực tế:
- Quan sát nhanh xung quanh lớp, chỉ ra các đồ vật có dạng hình học của bài học.
- Vận dụng công thức vừa học để tính toán số đo theo tình huống giáo viên yêu cầu.
• Tổng kết tiết học:
- Đọc lại công thức tính chu vi / diện tích / thể tích.
- Ghi nhớ nhiệm vụ thực hành đo đạc đồ vật tại gia đình.`
      };
    }

    // 1f. Toán chuyển động
    if (titleLower.includes("vận tốc") || titleLower.includes("quãng đường") || titleLower.includes("thời gian") || titleLower.includes("chuyển động")) {
      return {
        teacherActivity: `• Bài toán chuyển động thực tiễn:
- Đưa ra bài toán thực tế: "Hàng ngày từ nhà đến trường em dài bao nhiêu mét/ki-lô-mét? Nếu đi bộ hoặc đi xe đạp mất bao nhiêu phút? Hãy tính vận tốc di chuyển trung bình của em theo bài '${displayTitle}'."
- Khuyến khích học sinh vận dụng ngay mối quan hệ giữa vận tốc, quãng đường và thời gian.
• Dặn dò an toàn giao thông: Luôn tuân thủ tốc độ an toàn khi tham gia giao thông trên đường đến trường.`,
        studentActivity: `• Vận dụng thực tế:
- Thảo luận nhanh, ước lượng quãng đường từ nhà đến trường và tính nhẩm vận tốc di chuyển.
- Tự tin nêu phép tính và kết quả trước lớp.
• Tiếp thu lời dặn dò an toàn giao thông của thầy cô.`
      };
    }

    return {
      teacherActivity: `• Tình huống thực tiễn đời sống:
- Đưa ra bài toán tình huống thực tế gắn liền trực tiếp với bài học "${displayTitle}" (tính toán chi phí mua sắm đồ dùng học tập, phân chia số lượng hoặc ước lượng số đo trong đời sống).
- Mời học sinh xung phong giải quyết nhanh tình huống.
• Củng cố & Dặn dò:
- Tóm tắt lại phương pháp giải quyết dạng toán vừa học.
- Dặn dò học sinh về nhà hoàn thành các bài tập còn lại và quan sát các tình huống tính toán tương tự ở gia đình.`,
      studentActivity: `• Vận dụng thực tế:
- Lắng nghe tình huống thực tế, tư duy nhanh và giơ tay phát biểu cách tính cùng kết quả chính xác.
- 1 học sinh nhắc lại quy tắc/công thức toán học trọng tâm vừa học.
- Ghi nhớ lời dặn dò của giáo viên, chuẩn bị bài cho tiết học sau.`
    };
  }

  // 2. MÔN TIẾNG VIỆT
  if (subLower.includes("tiếng việt") || subLower === "tv" || subLower.includes("tctv")) {
    // 2a. Hang Sơn Đoòng - Những điều kì thú (Tuần 6)
    if (titleLower.includes("hang sơn đoòng") || titleLower.includes("sơn đoòng")) {
      if (titleLower.includes("từ đồng nghĩa")) {
        return {
          teacherActivity: `• Thử thách dùng từ đắt giá:
- Đặt câu hỏi vận dụng: "Hãy quan sát không gian xung quanh hoặc nhớ về cảnh đẹp làng quê Tân Thạnh, em hãy đặt 1-2 câu văn miêu tả trong đó có sử dụng ít nhất một cặp từ đồng nghĩa đã học trong bài '${displayTitle}' (ví dụ: vàng rực - vàng hoe; đỏ ối - đỏ gay; mênh mông - bao la)."
- Khen ngợi học sinh biết chọn từ ngữ gợi tả chính xác và giàu hình ảnh.`,
          studentActivity: `• Thực hành đặt câu vận dụng:
- Suy nghĩ nhanh, tự đặt câu văn có sử dụng từ đồng nghĩa miêu tả cảnh đẹp quê hương.
- Tự tin đứng tại chỗ đọc to câu văn trước lớp; giải thích lý do lựa chọn từ ngữ đó.
• Ghi nhớ việc sử dụng vốn từ ngữ trau chuốt, giàu hình ảnh khi nói và viết bài.`
        };
      }
      if (titleLower.includes("mở bài") || titleLower.includes("kết bài")) {
        return {
          teacherActivity: `• Thực hành viết sáng tạo:
- Giao nhiệm vụ: "Vận dụng cách viết mở bài gián tiếp và kết bài mở rộng của bài '${displayTitle}', em hãy viết nhanh 2 câu mở bài hoặc kết bài cho bài văn miêu tả một cảnh đẹp gần gũi ở quê hương Tân Thạnh (dòng kênh rạch thân thuộc, cánh đồng lúa mùa gặt hoặc góc sân trường lúc bình minh)."
- Hướng dẫn học sinh cách liên hệ cảm xúc chân thành và dẫn dắt tự nhiên.`,
          studentActivity: `• Thực hành viết mở bài, kết bài:
- Viết nhanh vào vở 2 câu mở bài gián tiếp hoặc kết bài mở rộng theo gợi ý.
- Tự tin đọc đoạn văn của mình trước lớp, lắng nghe bạn bè và giáo viên nhận xét, góp ý.
• Ghi nhớ tiêu chí đoạn văn hay để hoàn thiện bài viết ở nhà.`
        };
      }
      return {
        teacherActivity: `• Kết nối niềm tự hào và ý thức bảo vệ di sản thiên nhiên:
- Đặt câu hỏi liên hệ: "Qua bài đọc '${displayTitle}', em cảm nhận được vẻ đẹp kì vĩ độc đáo nào của Hang Sơn Đoòng? Nếu có dịp giới thiệu với bạn bè quốc tế, em sẽ chia sẻ điều gì và bản thân cần làm gì để bảo vệ cảnh quan thiên nhiên?"
- Dặn dò học sinh về nhà đọc diễn cảm đoạn văn tả vẻ đẹp của lòng hang cho bố mẹ nghe.`,
        studentActivity: `• Bày tỏ cảm xúc và hành động:
- Bày tỏ niềm tự hào sâu sắc về kì quan thiên nhiên vô giá của non sông đất nước Việt Nam.
- Nêu ý thức bảo vệ môi trường: không xả rác, không khắc vẽ bậy lên cây cối hay vách đá khi đi tham quan du lịch.
• Ghi nhớ nhiệm vụ về nhà đọc diễn cảm bài văn cho người thân nghe.`
      };
    }

    // 2b. Những hòn đảo trên vịnh Hạ Long (Tuần 6)
    if (titleLower.includes("vịnh hạ long") || titleLower.includes("hòn đảo")) {
      if (titleLower.includes("quan sát")) {
        return {
          teacherActivity: `• Rèn kỹ năng quan sát thực tế:
- Hướng dẫn học sinh: "Khi quan sát một cảnh vật ở địa phương (dòng kênh quê hương, cánh đồng, góc vườn), em cần phối hợp các giác quan như thế nào theo bài '${displayTitle}'? Hãy chia sẻ 1 chi tiết độc đáo nhất em đã quan sát được."
- Dặn dò học sinh ghi chép các chi tiết gợi cảm vào sổ tay quan sát.`,
          studentActivity: `• Chia sẻ kỹ năng quan sát:
- Nêu cách phối hợp thị giác, thính giác, xúc giác để thu nhận chi tiết sống động về màu sắc, âm thanh, ánh sáng của cảnh vật.
- Ghi nhanh vào sổ tay 2-3 chi tiết ấn tượng về cảnh đẹp quê hương Tân Thạnh.`
        };
      }
      if (titleLower.includes("động vật hoang dã") || titleLower.includes("bảo tồn")) {
        return {
          teacherActivity: `• Phát động thông điệp bảo vệ động vật hoang dã:
- Đặt câu hỏi: "Sau tiết học '${displayTitle}', bản thân em và gia đình sẽ làm những việc làm thiết thực nào để chung tay bảo vệ các loài động vật hoang dã quý hiếm?"
- Tuyên dương các ý tưởng bảo vệ môi trường sinh thái tích cực của học sinh.`,
          studentActivity: `• Cam kết hành động:
- Mạnh dạn chia sẻ cam kết: không săn bắt chim thú, không sử dụng các sản phẩm có nguồn gốc từ động vật hoang dã quý hiếm.
- Về nhà tuyên truyền thông điệp yêu quý thiên nhiên và bảo vệ động vật cùng người thân.`
        };
      }
      return {
        teacherActivity: `• Em là hướng dẫn viên du lịch nhí:
- Đặt nhiệm vụ: "Dựa vào các chi tiết miêu tả muôn hình vạn trạng của các đảo đá trong bài '${displayTitle}', hãy đóng vai hướng dẫn viên du lịch nói 2-3 câu giới thiệu với du khách về vẻ đẹp của Vịnh Hạ Long."
- Giáo dục tình yêu biển đảo quê hương và ý thức bảo vệ di sản thiên nhiên.`,
        studentActivity: `• Sắm vai hướng dẫn viên du lịch:
- Hào hứng đóng vai hướng dẫn viên du lịch, tự tin giới thiệu với cả lớp về vẻ đẹp kì thú của hòn Trống Mái, đảo Ti Tốp trên Vịnh Hạ Long.
- Bày tỏ tình yêu quê hương đất nước và mong ước được đến thăm vịnh.`
      };
    }

    // 2c. Từ đồng nghĩa tổng quát
    if (titleLower.includes("từ đồng nghĩa")) {
      return {
        teacherActivity: `• Đố vui vận dụng ngôn ngữ thực tế:
- Yêu cầu học sinh đặt nhanh 1 câu văn miêu tả người hoặc sự vật xung quanh lớp học/gia đình có sử dụng đúng cặp từ đồng nghĩa đã học trong bài '${displayTitle}' (ví dụ: siêng năng - chăm chỉ; thông minh - sáng dạ; bao la - mênh mông).
- Khen ngợi các câu văn hay, giàu hình ảnh và dùng từ chuẩn xác.`,
        studentActivity: `• Thực hành đặt câu vận dụng:
- Suy nghĩ nhanh, tự đặt câu văn có sử dụng đúng từ đồng nghĩa gắn với đời sống thực tế.
- Tự tin đứng tại chỗ đọc câu văn của mình, lắng nghe bạn bè và thầy cô nhận xét.
• Ghi nhớ việc sử dụng vốn từ ngữ trau chuốt khi giao tiếp và viết bài.`
      };
    }

    // 2d. Văn tả cảnh tổng quát
    if (titleLower.includes("tả phong cảnh") || titleLower.includes("tả cảnh")) {
      return {
        teacherActivity: `• Vận dụng kỹ năng viết vào đời sống:
- Giao nhiệm vụ viết ngắn thực tế: "Vận dụng cách xây dựng đoạn văn của bài '${displayTitle}', em hãy viết 2-3 câu ghi lại cảm xúc hoặc chi tiết đáng nhớ nhất về một cảnh đẹp gần gũi ở quê hương vào sổ tay học tập."
- Hướng dẫn học sinh tiêu chí rà soát lại chính tả, cách dùng từ gợi tả gợi cảm và dấu câu.`,
        studentActivity: `• Thực hành vận dụng viết:
- Viết nhanh 2-3 câu văn ngắn theo gợi ý, vận dụng các từ ngữ và hình ảnh sinh động vừa học.
- Dùng bút chì tự rà soát lại lỗi chính tả và dấu câu trong bài.
- Ghi nhớ nhiệm vụ về nhà đọc bài cho người thân nghe.`
      };
    }

    const isDoc = titleLower.includes("đọc") || subSubject.toLowerCase().includes("đọc");
    const isViet = titleLower.includes("viết") || subSubject.toLowerCase().includes("viết");
    const isLTVC = titleLower.includes("từ và câu") || titleLower.includes("ltvc") || subSubject.toLowerCase().includes("luyện từ");

    if (isDoc) {
      return {
        teacherActivity: `• Kết nối thông điệp bài đọc với thực tế đời sống:
- Đặt câu hỏi kết nối: "Qua bài đọc '${displayTitle}', em học tập được phẩm chất hay bài học sâu sắc nào từ nhân vật hoặc sự việc trong bài? Bản thân em sẽ làm việc gì cụ thể để thể hiện điều đó?"
- Giáo viên định hướng học sinh liên hệ với tình cảm gia đình, thầy cô, bạn bè hoặc ý thức bảo vệ quê hương, môi trường.
• Dặn dò học sinh: Về nhà đọc diễn cảm bài văn/bài thơ cho bố mẹ, người thân nghe và chia sẻ điều em tâm đắc nhất.`,
        studentActivity: `• Liên hệ bản thân:
- Lắng nghe câu hỏi, tự liên hệ với bản thân và chia sẻ việc làm tích cực cụ thể em sẽ thực hiện ngay trong cuộc sống.
- Bày tỏ cảm xúc yêu quý nhân vật, vẻ đẹp ngôn từ trong bài đọc '${displayTitle}'.
• Ghi nhớ dặn dò: Về nhà đọc bài cho người thân nghe và ghi chép lại các câu văn hay vào sổ tay văn học.`
      };
    }
    if (isLTVC) {
      return {
        teacherActivity: `• Đố vui vận dụng ngôn ngữ thực tế:
- Yêu cầu học sinh đặt nhanh 1 câu văn miêu tả người hoặc sự vật xung quanh lớp học/gia đình có sử dụng đúng kiến thức của bài '${displayTitle}' (từ đồng nghĩa, từ trái nghĩa, đại từ, liên từ hoặc biện pháp tu từ vừa học).
- Mời 2-3 học sinh đọc to câu văn; giáo viên cùng cả lớp nhận xét, khen ngợi câu văn hay và giàu hình ảnh.
• Dặn dò học sinh: Chú ý sử dụng từ ngữ chuẩn xác, lịch sự trong giao tiếp hàng ngày.`,
        studentActivity: `• Thực hành đặt câu vận dụng:
- Suy nghĩ nhanh, tự đặt câu văn có sử dụng đúng kiến thức bài học gắn với đời sống thực tế.
- Tự tin đứng tại chỗ đọc câu văn của mình, lắng nghe bạn bè và thầy cô nhận xét.
• Ghi nhớ việc sử dụng vốn từ ngữ trau chuốt, đúng ngữ pháp khi giao tiếp và viết bài.`
      };
    }
    if (isViet) {
      return {
        teacherActivity: `• Vận dụng kỹ năng viết vào đời sống:
- Giao nhiệm vụ viết ngắn thực tế: "Vận dụng cách xây dựng đoạn văn/bài văn của bài '${displayTitle}', em hãy viết 2-3 câu ghi lại cảm xúc hoặc chi tiết đáng nhớ nhất về chủ đề này vào sổ tay học tập."
- Hướng dẫn học sinh tiêu chí rà soát lại chính tả, cách dùng từ gợi tả gợi cảm và dấu câu.
• Dặn dò học sinh: Về nhà đọc lại đoạn văn cho bố mẹ nghe, tiếp thu ý kiến góp ý để hoàn thiện bài viết hay hơn.`,
        studentActivity: `• Thực hành vận dụng viết:
- Viết nhanh 2-3 câu văn ngắn theo gợi ý, vận dụng các từ ngữ và hình ảnh sinh động vừa học.
- Dùng bút chì tự rà soát lại lỗi chính tả và dấu câu trong bài.
- Ghi nhớ nhiệm vụ về nhà đọc bài cho người thân nghe.`
      };
    }
  }

  // 3. MÔN KHOA HỌC
  if (subLower.includes("khoa học") || subLower === "kh") {
    // Sự biến đổi hoá học của chất (Tuần 6)
    if (titleLower.includes("biến đổi hoá học") || titleLower.includes("biến đổi hóa học")) {
      return {
        teacherActivity: `• Kết nối thực tế đời sống gia đình:
- Đặt câu hỏi thực tế: "Trong gian bếp hoặc đời sống hàng ngày ở gia đình em, hiện tượng nào chứng tỏ có sự biến đổi hoá học theo kiến thức bài '${displayTitle}' (ví dụ: đun đường cháy thành caramen màu đen có vị đắng, đinh sắt để ngoài trời bị gỉ sét, đốt củi thành than và tro...)? Hãy giải thích vì sao đó là biến đổi hoá học?"
- Nhắc nhở quy tắc an toàn cháy nổ và bảo quản đồ dùng kim loại trong gia đình.`,
        studentActivity: `• Liên hệ thực tế gia đình:
- Nêu chính xác hiện tượng đun đường cháy khét, gỉ sắt, trứng chín khi luộc... Giải thích được vì các hiện tượng đó đã tạo ra chất mới khác hẳn chất ban đầu.
- Ghi nhớ các lưu ý an toàn phòng chống cháy nổ và bảo quản đồ dùng gia đình của giáo viên.`
      };
    }

    // Ôn tập chủ đề Chất (Tuần 6)
    if (titleLower.includes("chủ đề chất") || (titleLower.includes("ôn tập") && titleLower.includes("chất"))) {
      return {
        teacherActivity: `• Kiểm tra an toàn sử dụng các chất tại gia đình:
- Giao nhiệm vụ: "Vận dụng kiến thức toàn diện về chủ đề Chất trong bài '${displayTitle}', em hãy cùng bố mẹ rà soát lại các chai lọ hóa chất tẩy rửa, gia vị trong nhà; kiểm tra xem đã được đậy kín nắp và để đúng nơi quy định an toàn xa tầm tay trẻ nhỏ chưa?"
- Tuyên dương học sinh có ý thức giữ gìn an toàn hóa chất.`,
        studentActivity: `• Cam kết an toàn tại gia đình:
- Tiếp thu nhiệm vụ, cam kết cùng gia đình kiểm tra vị trí để các chất tẩy rửa, dầu ăn, gia vị; đảm bảo đậy kín nắp và để nơi khô ráo, an toàn.
- Ghi nhớ cách bảo quản an toàn các chất trong gia đình.`
      };
    }

    return {
      teacherActivity: `• Ứng dụng khoa học vào đời sống thực tế:
- Đặt câu hỏi thực tế gắn liền với bài '${displayTitle}': "Trong gia đình và cuộc sống hàng ngày, kiến thức bài học này được ứng dụng như thế nào? Em cần làm gì để bảo vệ sức khỏe, tiết kiệm năng lượng hoặc bảo vệ môi trường xung quanh?"
- Hướng dẫn học sinh phương pháp quan sát khoa học an toàn tại gia đình.
• Dặn dò học sinh: Về nhà tiếp tục quan sát hiện tượng khoa học thực tế và chia sẻ bài học cùng bố mẹ.`,
      studentActivity: `• Vận dụng thực tế:
- Nêu các việc làm cụ thể trong sinh hoạt hàng ngày tại gia đình gắn với bài học '${displayTitle}' (tiết kiệm điện nước, giữ vệ sinh nguồn nước, phân loại rác, phòng tránh bệnh...).
- Tự giác cam kết thực hiện nếp sống khoa học, an toàn và bảo vệ môi trường.
• Ghi nhớ lời dặn dò của giáo viên, chuẩn bị bài cho tiết học sau.`
    };
  }

  // 4. MÔN LỊCH SỬ VÀ ĐỊA LÍ
  if (
    subLower.includes("lịch sử") ||
    subLower.includes("địa lí") ||
    subLower.includes("địa lý") ||
    subLower.includes("ls-đl") ||
    subLower.includes("ls&đl") ||
    subLower === "ls" ||
    subLower === "đl"
  ) {
    // Dân cư và dân tộc ở Việt Nam (Tuần 6)
    if (titleLower.includes("dân cư") || titleLower.includes("dân tộc")) {
      return {
        teacherActivity: `• Liên hệ thực tế địa phương xã Tân Thạnh:
- Đặt câu hỏi kết nối: "Liên hệ thực tế địa bàn xã Tân Thạnh quê hương ta, em thấy dân cư tập trung đông đúc ở những khu vực nào (ven đường giao thông, ven bờ kênh rạch hay khu vực đồng ruộng)? Ở trường và địa phương em có những dân tộc anh em nào cùng sinh sống học tập? Em cần làm gì để xây dựng tinh thần đoàn kết giúp đỡ lẫn nhau theo bài '${displayTitle}'?"
- Giáo dục học sinh lòng yêu quê hương và tinh thần đại đoàn kết các dân tộc.`,
        studentActivity: `• Liên hệ thực tế quê hương:
- Nêu đặc điểm phân bố dân cư tại xã Tân Thạnh (tập trung đông ven trục đường chính và các bờ kênh lớn để thuận tiện giao thương).
- Chia sẻ về tình bạn đoàn kết, gắn bó giữa các dân tộc anh em; cam kết luôn tôn trọng phong tục tập quán và giúp đỡ bạn bè cùng tiến.`
      };
    }

    return {
      teacherActivity: `• Liên hệ thực tế địa phương và bồi dưỡng lòng yêu nước:
- Đặt câu hỏi kết nối: "Qua tìm hiểu về sự kiện lịch sử / vùng đất địa lí trong bài '${displayTitle}', em thấy quê hương Tân Thạnh của chúng ta có nét gì tương đồng hoặc có truyền thống tốt đẹp nào cần phát huy?"
- Giáo dục học sinh niềm tự hào dân tộc, ý thức giữ gìn di tích lịch sử và cảnh quan thiên nhiên quê hương.
• Dặn dò học sinh: Tìm hiểu thêm các câu chuyện lịch sử, địa danh qua lời kể của ông bà, cha mẹ.`,
      studentActivity: `• Liên hệ thực tế:
- Chia sẻ hiểu biết về lịch sử, địa danh hoặc truyền thống tốt đẹp của quê hương Tân Thạnh.
- Bày tỏ lòng biết ơn đối với các thế hệ cha anh đi trước và quyết tâm chăm ngoan học giỏi.
• Ghi nhớ dặn dò, tìm đọc thêm sách báo tư liệu về lịch sử và địa lí nước nhà.`
    };
  }

  // 5. ĐẠO ĐỨC
  if (subLower.includes("đạo đức") || subLower === "đđ") {
    return {
      teacherActivity: `• Cam kết hành động thực tế:
- Đặt câu hỏi: "Sau bài học '${displayTitle}', em sẽ làm việc gì cụ thể ngay hôm nay ở trường và ở nhà để thể hiện chuẩn mực đạo đức tốt đẹp này?"
- Nhắc nhở học sinh: Đạo đức phải được thể hiện bằng việc làm cụ thể, không chỉ nói suông.
• Nhận xét tiết học, dặn dò học sinh rèn luyện thói quen tốt mỗi ngày.`,
      studentActivity: `• Nêu cam kết hành động:
- 2-3 học sinh mạnh dạn chia sẻ hành động cụ thể em sẽ làm ngay (giúp đỡ bạn bè, kính trọng người lớn, trung thực trong học tập...).
- Cả lớp quyết tâm thực hiện tốt chuẩn mực đạo đức đã học trong cuộc sống hàng ngày.`
    };
  }

  // 6. CÔNG NGHỆ
  if (subLower.includes("công nghệ") || subLower === "cn") {
    return {
      teacherActivity: `• Vận dụng kĩ thuật vào đời sống:
- Đặt câu hỏi: "Em có thể áp dụng quy trình kĩ thuật hoặc cách sử dụng sản phẩm công nghệ trong bài '${displayTitle}' vào việc chăm sóc gia đình, góc học tập của mình như thế nào an toàn và hiệu quả nhất?"
- Nhắc nhở quy tắc an toàn điện, an toàn lao động kĩ thuật.`,
      studentActivity: `• Vận dụng thực tế:
- Nêu cách sử dụng, bảo quản hoặc chăm sóc sản phẩm công nghệ tại gia đình đúng quy trình kĩ thuật đã học.
- Cam kết tuân thủ nghiêm ngặt các quy tắc an toàn.`
    };
  }

  // 7. HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  if (subLower.includes("hđtn") || subLower.includes("trải nghiệm") || subLower.includes("hdtn")) {
    const isSHDC = titleLower.includes("dưới cờ") || titleLower.includes("shdc") || titleLower.includes("chào cờ");
    const isSHL = titleLower.includes("sinh hoạt lớp") || titleLower.includes("shl");

    if (isSHDC) {
      return {
        teacherActivity: `• Hướng dẫn học sinh liên hệ thực tế địa phương xã Tân Thạnh:
- Đặt câu hỏi: "Xã Tân Thạnh là vùng sông nước kênh rạch chằng chịt, thường xuyên chịu ảnh hưởng của triều cường, mưa lớn và dông sét mùa mưa bão. Vận dụng kiến thức Bài 1: Hiểm họa và Thảm họa vừa học, các em hãy:
  1) Cùng người thân kiểm tra xung quanh nhà: cành cây to gần đường dây điện, mái tôn hiên nhà cần được chằng chống kiên cố;
  2) Xác định các đoạn bờ kênh rạch trơn trượt có nguy cơ sạt lở hoặc nước sâu nguy hiểm để tuyệt đối không tự ý lại gần hay lội qua khi trời mưa lớn;
  3) Ghi nhớ các số điện thoại liên lạc cứu nạn cứu hộ khẩn cấp tại địa phương."
• Dặn dò học sinh: Ghi lại các mối nguy hiểm quan sát được vào sổ tay an toàn thiên tai; chia sẻ bài học cùng người thân ngay hôm nay.`,
        studentActivity: `• Liên hệ thực tế bản thân và gia đình:
- Nhanh chóng liên hệ thực tế địa phương Tân Thạnh: Kể tên các hiểm họa mùa mưa lũ (ngập úng, dông sét, sạt lở bờ kênh rạch...).
- Nêu các việc làm phòng tránh cụ thể của gia đình: chằng chống mái nhà kiên cố, không đi lại ven bờ kênh trơn trượt khi mưa lớn, ngắt cầu dao điện khi có sấm sét.
• Ghi nhớ lời dặn dò, về nhà chia sẻ bài học cùng người thân.`
      };
    }

    if (isSHL) {
      return {
        teacherActivity: `• Hướng dẫn thực hành an toàn trên đường làng ngõ xóm:
- Đặt câu hỏi: "Đặc thù đường xá ở xã Tân Thạnh nhiều đoạn hẹp, không có vỉa hè hoặc đường đê ven kênh rạch. Khi đi bộ từ nhà đến trường, các em phải đi sát về phía nào của đường? Khi muốn sang đường ở nơi không có vạch kẻ đường, em phải làm gì để đảm bảo an toàn tuyệt đối theo bài '${displayTitle}'?"
- Nhắc nhở quy tắc luôn quan sát cẩn thận và không đùa nghịch trên đường.`,
        studentActivity: `• Nêu quy tắc an toàn giao thông:
- Khẳng định quy tắc: Đi sát mép đường bên phải; khi sang đường phải dừng lại quan sát cẩn thận cả hai phía, giơ tay xin đường và chỉ qua đường khi thấy thực sự an toàn.
- Tuyệt đối không xô đẩy, đùa giỡn nhau ven bờ kênh, đường đê.`
      };
    }
  }

  // Mặc định chung
  return {
    teacherActivity: `• Vận dụng bài học vào đời sống:
- Đặt câu hỏi liên hệ thực tế gắn với bài '${displayTitle}': "Em sẽ áp dụng kiến thức vừa học vào việc gì cụ thể trong học tập và sinh hoạt hàng ngày?"
- Nhận xét tiết học, tuyên dương học sinh học tập tích cực, dặn dò chuẩn bị bài mới.`,
    studentActivity: `• Liên hệ bản thân:
- Trả lời câu hỏi liên hệ thực tế, nêu hành động cụ thể bản thân sẽ thực hiện.
- Ghi nhớ lời dặn dò của giáo viên, dọn dẹp sách vở và bàn học ngăn nắp.`
  };
}

/**
 * Generates deeply detailed, pedagogically sound Teacher and Student activities
 * complying with CV 2345/BGDĐT-GDTH for any primary school subject and grade.
 * Aligned with standards from tailieugiaoduc.edu.vn with explicit SGK content,
 * teacher pedagogical dialogue, expected student responses, and differentiation.
 */
export function getDetailedLessonActivities(params: {
  grade: Grade;
  subject: string;
  subSubject?: string;
  lessonTitle: string;
  curriculumPeriod: number | string;
  week: number;
  session?: string;
  integrationNotes?: string;
}): DetailedActivitiesResult {
  const res = getRawDetailedLessonActivities(params);
  return {
    ...res,
    activities: (res.activities || []).map((a, idx, arr) => {
      let teacherAct = a.teacherActivity;
      let studentAct = a.studentActivity;
      // Tùy biến Hoạt động 4 (Vận dụng) cụ thể hóa sâu theo từng KHBD
      if (idx === arr.length - 1 && arr.length >= 4) {
        const isDisasterSHDC = (params.subject.toLowerCase().includes("hđtn") || params.subject.toLowerCase().includes("hdtn")) &&
          (params.subSubject?.toLowerCase().includes("dưới cờ") || params.lessonTitle.toLowerCase().includes("dưới cờ") || params.lessonTitle.toLowerCase().includes("shdc")) &&
          isDisasterCurriculumActive(params.week);
        if (!isDisasterSHDC) {
          const specificApp = getSpecificApplicationActivity(
            params.subject,
            params.lessonTitle,
            params.grade,
            params.subSubject || "",
            cleanTitle(params.lessonTitle)
          );
          if (specificApp) {
            teacherAct = specificApp.teacherActivity;
            studentAct = specificApp.studentActivity;
          }
        }
      }
      return {
        ...a,
        name: normalizeActivityName(a.name),
        objective: "", // Bỏ mục tiêu riêng trong từng hoạt động theo yêu cầu, chỉ ghi mục tiêu chung
        teacherActivity: teacherAct,
        studentActivity: studentAct,
      };
    }),
  };
}

function getRawDetailedLessonActivities(params: {
  grade: Grade;
  subject: string;
  subSubject?: string;
  lessonTitle: string;
  curriculumPeriod: number | string;
  week: number;
  session?: string;
  integrationNotes?: string;
}): DetailedActivitiesResult {
  const sanitizedLessonTitle = cleanLessonTitle(params.lessonTitle);
  const { grade, subject, subSubject = "", curriculumPeriod, week, session = "Sáng" } = params;
  const lessonTitle = sanitizedLessonTitle;

  // Cụ thể hóa chuyên sâu SGK Lớp 1 vào Hoạt động của học sinh (HĐHS) và GV
  if (Number(grade) === 1) {
    return getGrade1DetailedActivities({
      subject,
      subSubject,
      lessonTitle,
      curriculumPeriod,
      week,
      session,
      integrationNotes: params.integrationNotes,
    });
  }

  const subLower = subject.toLowerCase().trim();
  const subSubLower = subSubject.toLowerCase().trim();
  const titleCore = cleanTitle(lessonTitle);

  // =========================================================================
  // 1. MÔN TOÁN (MATHEMATICS) - Khối 1 đến Khối 5
  // =========================================================================
  if (subLower.includes("toán") || subLower === "t" || subSubLower.includes("toán")) {
    const isEnhance = subLower.includes("tăng cường") || subSubLower.includes("tăng cường") || subLower.includes("tct");
    
    let specificCompetencies = getDetailedSpecificCompetencies({ grade, subject, lessonTitle, subSubject, curriculumPeriod, week });
    let teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    let studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích hoạt kiến thức nền tảng, tạo không khí học tập hào hứng và kết nối vào bài mới.",
        teacherActivity: `• Tổ chức trò chơi toán học: "Truyền điện tính nhanh" hoặc "Hái hoa dân chủ".
- GV nêu câu hỏi/phép tính nhẩm liên quan đến bài trước (Ví dụ: Các phép tính bảng cộng trừ/nhân chia hoặc nhận diện số, đại lượng đã học).
- Quan sát, khích lệ học sinh tham gia tích cực, tuyên dương các em trả lời nhanh và chính xác.
• Kết nối vào bài mới:
- GV đặt câu đố/tình huống thực tế dẫn dắt: "Hôm nay chúng ta cùng khám phá một kiến thức rất thú vị trong bài: ${lessonTitle}."
- GV ghi tựa bài lên bảng, yêu cầu học sinh nhắc lại.`,
        studentActivity: `• Tham gia trò chơi khởi động hào hứng:
- Học sinh theo dõi hiệu lệnh của giáo viên, giơ tay xung phong nhận câu hỏi.
- Đứng tại chỗ trả lời nhanh, dõng dạc kết quả phép tính: ví dụ các phép tính nhẩm, nêu quy tắc đã học.
- Cả lớp vỗ tay tuyên dương bạn trả lời đúng.
• Tiếp nhận nhiệm vụ học tập:
- Lắng nghe lời dẫn dắt của giáo viên vào bài mới.
- 2-3 học sinh đọc to tên bài học: "${lessonTitle}".
- Cả lớp mở sách giáo khoa, ghi tựa bài vào vở cẩn thận.`
      },
      {
        name: "2. Hoạt động Khám phá (Hình thành kiến thức mới - 12 đến 15 phút)",
        objective: `Giúp học sinh hình thành kiến thức và quy tắc toán học cốt lõi của bài: ${titleCore}.`,
        teacherActivity: `• Bước 1: Tiếp cận tình huống thực tế
- GV chiếu hình ảnh tình huống trong SGK hoặc trình chiếu slide mô phỏng (ví dụ: hình ảnh bạn Rô-bốt, Mai, Nam đang giải quyết một vấn đề thực tế về ${titleCore}).
- Đặt câu hỏi đàm thoại: "Quan sát tranh, em thấy những gì? Bài toán cho biết gì và yêu cầu tìm gì?"
• Bước 2: Thao tác trên đồ dùng trực quan & Tìm tòi giải pháp
- Hướng dẫn học sinh sử dụng bộ đồ dùng học Toán (que tính, bảng gài, khối lập phương, tia số, mô hình phân số/số thập phân) để trực quan hóa dữ liệu.
- GV thao tác mẫu trên bảng lớp, kết hợp đặt câu hỏi gợi mở từng bước: "Để tìm được kết quả, chúng ta cần thực hiện phép tính gì? Ta làm như thế nào?"
- Hướng dẫn học sinh thảo luận cặp đôi hoặc nhóm 4 để tìm cách giải quyết.
• Bước 3: Rút ra quy tắc / Công thức trọng tâm
- Mời đại diện học sinh nêu cách làm và kết quả.
- GV chuẩn hóa kiến thức, ghi quy tắc/công thức chính thức lên bảng (ví dụ: cách đặt tính, thứ tự thực hiện phép tính, cách so sánh, công thức tính diện tích/chu vi).
- Yêu cầu học sinh đọc lại quy tắc nhiều lần để ghi nhớ sâu.`,
        studentActivity: `• Tiếp nhận và phân tích tình huống:
- Học sinh quan sát tranh minh họa trên màn chiếu hoặc SGK.
- Trả lời câu hỏi của giáo viên về các dữ kiện đã cho và điều cần tìm.
• Thao tác khám phá bài học:
- Lấy bộ đồ dùng toán cá nhân, thao tác đặt que tính / lập mô hình theo hướng dẫn.
- Thảo luận cặp đôi: Trao đổi với bạn cùng bàn về cách thực hiện, cùng nhẩm tính và thử các cách giải khác nhau.
• Tiếp thu và ghi nhớ kiến thức mới:
- Đại diện học sinh phát biểu cách giải trước lớp, tự tin trình bày từng bước thao tác.
- Lắng nghe giáo viên nhận xét, chuẩn hóa kiến thức.
- Nối tiếp đọc to quy tắc/công thức toán học trên bảng lớp.
- Ghi nhớ quy trình thực hiện và viết ví dụ mẫu vào vở.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Củng cố kiến thức vừa học qua hệ thống bài tập phân hóa từ nhận biết đến vận dụng.",
        teacherActivity: `• Hướng dẫn giải quyết từng bài tập trong SGK:
- Bài 1 (Nhận biết / Tính trực tiếp / Đặt tính rồi tính):
  + Yêu cầu HS đọc đề bài, xác định yêu cầu (ví dụ: tính nhẩm, đặt tính thẳng cột, thứ tự tính).
  + Cho HS làm bảng con câu a, b; nhận xét và uốn nắn lỗi sai về vị trí các hàng/chữ số.
- Bài 2 (Kết nối / So sánh / Điền số thích hợp):
  + Hướng dẫn HS phân tích bài toán, nhắc nhở thứ tự thực hiện các phép tính trong biểu thức.
  + Tổ chức làm bài vào vở bài tập; gọi 2 HS lên bảng phụ thực hiện.
- Bài 3 (Vận dụng / Giải toán có lời văn):
  + Yêu cầu 1 HS đọc to đề bài toán.
  + Hỏi: "Bài toán cho biết gì? Bài toán hỏi gì? Muốn tìm được kết quả ta phải làm phép tính gì?".
  + Hướng dẫn HS tóm tắt bài toán bằng sơ đồ đoạn thẳng hoặc lời văn ngắn gọn.
  + Cho HS làm bài vào vở.
• Quan sát, theo dõi, hỗ trợ:
- GV đi quanh lớp bao quát, hướng dẫn kịp thời cho các học sinh còn lúng túng.
- Chấm chữa bài nhanh tại chỗ cho một số học sinh hoàn thành sớm, khen ngợi những bài làm đẹp, trình bày khoa học.`,
        studentActivity: `• Thực hành giải bài tập:
- Bài 1:
  + Đọc thầm đề bài, xác định đúng yêu cầu.
  + Lấy bảng con, tự đặt tính và tính cẩn thận, giơ bảng đồng loạt theo hiệu lệnh.
  + Quan sát bài của bạn, nhận xét cách đặt tính và kết quả.
- Bài 2:
  + Làm bài vào vở bài tập cá nhân.
  + 2 học sinh lên bảng lớp làm bài.
  + Cả lớp theo dõi, đối chiếu kết quả bài làm của mình với bài trên bảng.
- Bài 3 (Toán có lời văn):
  + 1 học sinh đọc to đề bài toán, cả lớp đọc thầm theo.
  + Trả lời câu hỏi phân tích của giáo viên: Nêu rõ câu lời giải, phép tính tương ứng và đơn vị đo.
  + Tự giải bài toán vào vở, ghi đầy đủ lời giải, phép tính và đáp số.
  + Đổi vở cho bạn cùng bàn để kiểm tra chéo, phát hiện và giúp bạn sửa lỗi sai (nếu có).`
      },
      {
        name: "4. Hoạt động Vận dụng - Mở rộng (3 đến 5 phút)",
        objective: "Vận dụng kiến thức bài học vào giải quyết tình huống thực tiễn đời sống hàng ngày.",
        teacherActivity: `• Tổ chức tình huống thực tiễn mở rộng:
- Đưa ra bài toán gắn với đời sống thực tế: "Mẹ đi chợ mua các món đồ...", "Tính chu vi khu vườn nhà em...", hoặc tình huống tính nhẩm tiền mua sách vở.
- Khuyến khích học sinh vận dụng ngay quy tắc bài học để tìm ra câu trả lời nhanh nhất.
• Củng cố, dặn dò:
- Tóm tắt lại nội dung trọng tâm của bài: Nhắc lại các quy tắc cốt lõi của ${titleCore}.
- Nhận xét tinh thần học tập của cả lớp, tuyên dương các cá nhân và nhóm học tập tích cực.
- Dặn dò học sinh về nhà chia sẻ bài học cùng bố mẹ, hoàn thành các bài tập còn lại và chuẩn bị bài cho tiết học sau.`,
        studentActivity: `• Vận dụng thực tế:
- Lắng nghe tình huống thực tế của giáo viên, tư duy nhanh và giơ tay phát biểu cách giải quyết.
- Trả lời rõ ràng: Nêu phép tính và ý nghĩa của kết quả trong thực tế.
• Tổng kết tiết học:
- 1-2 học sinh nhắc lại quy tắc/công thức toán học vừa học.
- Lắng nghe nhận xét, rút kinh nghiệm về các lỗi tính toán còn mắc phải.
- Ghi nhớ lời dặn dò của thầy cô, thu dọn sách vở và đồ dùng học tập gọn gàng ngăn nắp.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // =========================================================================
  // 2. MÔN TIẾNG VIỆT (VIETNAMESE) - Khối 1 đến Khối 5
  // =========================================================================
  if (subLower.includes("tiếng việt") || subLower === "tv" || subSubLower.includes("tiếng việt")) {
    const isReading = subSubLower.includes("đọc") || subSubLower.includes("tập đọc") || subSubLower.includes("âm vần") || subSubLower.includes("làm quen") || (!subSubLower && (titleCore.toLowerCase().includes("bài") || titleCore.toLowerCase().includes("đọc")));
    const isGrammar = subSubLower.includes("luyện từ và câu") || subSubLower.includes("ltvc") || titleCore.toLowerCase().includes("từ") || titleCore.toLowerCase().includes("câu");
    const isWriting = subSubLower.includes("viết") || subSubLower.includes("tập làm văn") || subSubLower.includes("tlv") || subSubLower.includes("chính tả") || titleCore.toLowerCase().includes("viết");
    const isSpeaking = subSubLower.includes("nói và nghe") || subSubLower.includes("kể chuyện") || titleCore.toLowerCase().includes("nói") || titleCore.toLowerCase().includes("kể");

    let specificCompetencies = getDetailedSpecificCompetencies({ grade, subject, lessonTitle, subSubject, curriculumPeriod, week });
    let teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    let studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    if (isReading) {
      const activities: LessonActivity[] = [
        {
          name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
          objective: "Tạo tâm thế hứng thú, kết nối chủ điểm bài học và kích hoạt trí tò mò ngôn ngữ.",
          teacherActivity: `• Khởi động theo chủ điểm bài học:
- Cho học sinh hát bài hát hoặc xem bức tranh minh họa mở đầu chủ điểm trong SGK.
- Đặt câu hỏi giao lưu: "Quan sát bức tranh/nghe bài hát, em cảm nhận được điều gì? Hình ảnh nào gợi cho em nhiều suy nghĩ nhất?"
• Giới thiệu bài mới:
- Dẫn dắt vào bài đọc: "${lessonTitle}".
- GV ghi tựa bài lên bảng, giới thiệu sơ nét về tác giả (nếu có) và bối cảnh bài viết.`,
          studentActivity: `• Hào hứng khởi động:
- Cả lớp cùng hát vang hoặc quan sát tranh minh họa trên màn hình chiếu.
- 2-3 học sinh xung phong trả lời câu hỏi giao lưu, chia sẻ cảm nhận cá nhân trước lớp.
• Nhận nhiệm vụ bài học:
- Lắng nghe giáo viên giới thiệu bài mới.
- Nhắc lại tên bài học nối tiếp nhau và ghi tựa bài vào vở cẩn thận.`
        },
        {
          name: "2. Hoạt động Khám phá (Luyện đọc thành tiếng - 12 đến 15 phút)",
          objective: "Đọc đúng, trôi chảy toàn bài, ngắt nghỉ hơi đúng dấu câu và phát âm chuẩn các từ khó.",
          teacherActivity: `• Bước 1: Giáo viên đọc mẫu toàn bài
- Đọc mẫu toàn bài với giọng đọc truyền cảm, phù hợp với cảm xúc và nhịp điệu bài đọc (nhẹ nhàng, tha thiết hoặc vui tươi, hào hùng).
• Bước 2: Chia đoạn & Luyện đọc câu
- Hướng dẫn học sinh chia đoạn bài văn/bài thơ (thường từ 3 đến 4 đoạn).
- Cho học sinh đọc nối tiếp từng câu (lớp 1-2) hoặc từng đoạn (lớp 3-4-5).
• Bước 3: Luyện phát âm từ khó & Giải nghĩa từ mới
- Lắng nghe, phát hiện và ghi bảng các từ ngữ học sinh dễ phát âm sai (l/n, s/x, tr/ch, dấu thanh...).
- Hướng dẫn cách ngắt nhịp ở những câu văn dài hoặc dòng thơ đặc biệt.
- Giải nghĩa các từ khó trong mục chú giải SGK và từ ngữ theo ngữ cảnh bài học.`,
          studentActivity: `• Lắng nghe đọc mẫu:
- Mở SGK, tay chỉ mắt dõi theo giáo viên đọc mẫu, tai lắng nghe giọng đọc và cách ngắt nghỉ hơi.
• Luyện đọc nối tiếp:
- Đọc nối tiếp từng câu hoặc từng đoạn trước lớp.
- Luyện phát âm các từ khó theo hướng dẫn của giáo viên: phát âm lại nhiều lần từ cá nhân đến đồng thanh cả lớp.
- Chú ý cách ngắt nhịp ở những câu dài, câu cảm, câu hỏi.
• Tìm hiểu nghĩa của từ:
- 1 học sinh đọc to phần chú giải nghĩa các từ mới ở cuối bài đọc.
- Đặt câu ngắn với 1-2 từ ngữ mới để hiểu rõ hơn nghĩa của từ.`
        },
        {
          name: "3. Hoạt động Luyện tập (Tìm hiểu bài & Luyện đọc diễn cảm - 12 đến 15 phút)",
          objective: "Hiểu sâu nội dung, ý nghĩa bài đọc; bước đầu biết đọc diễn cảm thể hiện cảm xúc bài viết.",
          teacherActivity: `• Bước 1: Hướng dẫn tìm hiểu bài
- Lần lượt nêu các câu hỏi tìm hiểu bài trong SGK.
- Tổ chức cho học sinh thảo luận cặp đôi hoặc nhóm 4 để trả lời từng câu hỏi:
  + Câu hỏi 1 (Tái hiện chi tiết): Yêu cầu tìm các chi tiết, hình ảnh miêu tả trong bài.
  + Câu hỏi 2 (Suy luận / Phân tích): Tại sao nhân vật/sự việc lại diễn ra như vậy?
  + Câu hỏi 3 (Ý nghĩa / Thông điệp): Qua bài đọc, tác giả muốn gửi gắm đến chúng ta điều gì?
- GV chốt lại nội dung, ý nghĩa chính của bài đọc, ghi bảng nội dung bài.
• Bước 2: Hướng dẫn luyện đọc diễn cảm (hoặc đọc lại)
- Chọn 1 đoạn văn/khổ thơ tiêu biểu, chiếu lên màn hình hoặc bảng phụ.
- Đọc mẫu đoạn văn, hướng dẫn học sinh đánh dấu những từ cần nhấn giọng và chỗ ngắt nghỉ hơi.
- Tổ chức cho các tổ, nhóm thi đọc diễn cảm trước lớp.`,
          studentActivity: `• Thảo luận tìm hiểu bài đọc:
- Đọc thầm lại từng đoạn theo yêu cầu của giáo viên.
- Thảo luận cặp đôi hoặc nhóm 4: Cùng nhau trao đổi, tìm dẫn chứng trong văn bản để trả lời câu hỏi.
- Đại diện nhóm tự tin đứng lên phát biểu câu trả lời, các nhóm khác lắng nghe, nhận xét và bổ sung.
- 1-2 học sinh nhắc lại nội dung, ý nghĩa chính của bài đọc; cả lớp ghi nhớ.
• Luyện đọc diễn cảm:
- Quan sát đoạn văn mẫu trên bảng phụ, dùng bút chì đánh dấu chỗ ngắt nghỉ và từ ngữ nhấn giọng vào SGK.
- Luyện đọc diễn cảm trong nhóm đôi: đọc cho nhau nghe và góp ý cho bạn.
- Đại diện các tổ thi đọc diễn cảm trước lớp; cả lớp bình chọn bạn đọc hay và truyền cảm nhất.`
        },
        {
          name: "4. Hoạt động Vận dụng - Mở rộng (3 đến 5 phút)",
          objective: "Khắc sâu bài học đạo đức, bồi dưỡng tình cảm tốt đẹp và phát triển kỹ năng tự học.",
          teacherActivity: `• Liên hệ thực tiễn & Bồi dưỡng phẩm chất:
- Đặt câu hỏi mở: "Qua bài học hôm nay, em rút ra được bài học gì cho bản thân? Em sẽ làm gì để thực hiện những điều tốt đẹp ấy?"
- Gợi mở liên hệ đến tình cảm gia đình, tình bạn bè, tình yêu quê hương đất nước hoặc ý thức bảo vệ môi trường.
• Đánh giá, dặn dò:
- Nhận xét tiết học: Khen ngợi những học sinh đọc tiến bộ, phát biểu sôi nổi.
- Dặn dò học sinh về nhà tập đọc lại bài cho người thân nghe, ghi nhớ nội dung và chuẩn bị bài mới.`,
          studentActivity: `• Liên hệ bản thân:
- Suy nghĩ, mạnh dạn giơ tay phát biểu cảm nghĩ và bài học rút ra từ bài đọc.
- Bày tỏ những hành động cụ thể mình sẽ thực hiện (chăm ngoan, giúp đỡ bạn, yêu quý cây xanh, kính trọng người lớn).
• Ghi nhớ dặn dò:
- Lắng nghe nhận xét của giáo viên.
- Ghi nhớ nhiệm vụ về nhà đọc lại bài và kể lại nội dung cho người thân nghe.`
        }
      ];

      return { specificCompetencies, teacherMaterials, studentMaterials, activities };
    }

    if (isGrammar) {
      // Luyện từ và câu
      const activities: LessonActivity[] = [
        {
          name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
          objective: "Kích hoạt kiến thức từ ngữ, ngữ pháp đã học, tạo tâm thế học tập hứng khởi.",
          teacherActivity: `• Tổ chức trò chơi: "Tìm nhanh - Nối đúng" hoặc "Ô chữ kì diệu".
- Đưa ra câu hỏi ôn tập về các từ loại (danh từ, động từ, tính từ, đại từ...) hoặc kiểu câu đã học.
- Nhận xét, chốt đáp án và dẫn dắt vào bài mới: "${lessonTitle}".
- Ghi tựa bài lên bảng lớp.`,
          studentActivity: `• Tham gia trò chơi khởi động tích cực:
- Lắng nghe câu hỏi, suy nghĩ nhanh và giơ tay trả lời.
- Nêu ví dụ về từ ngữ hoặc đặt câu ngắn minh họa.
• Lắng nghe giới thiệu bài, đọc lại tựa bài và ghi vào vở.`
        },
        {
          name: "2. Hoạt động Khám phá (Hình thành kiến thức - 12 đến 15 phút)",
          objective: `Giúp học sinh nắm vững khái niệm, đặc điểm và quy tắc sử dụng trong bài: ${titleCore}.`,
          teacherActivity: `• Bước 1: Tiếp cận ngữ liệu mẫu
- Chiếu ngữ liệu mẫu trong SGK (đoạn văn, câu văn chứa từ ngữ/hiện tượng ngữ pháp cần tìm hiểu) lên màn hình chiếu.
- Yêu cầu 1-2 học sinh đọc to ngữ liệu trước lớp.
• Bước 2: Phân tích ngữ liệu & Thảo luận
- Đặt câu hỏi dẫn dắt: "Trong đoạn văn trên, những từ nào được in đậm? Chúng có tác dụng gì? Chúng biểu thị ý nghĩa gì?"
- Cho học sinh thảo luận cặp đôi để tìm ra điểm chung của các ngữ liệu.
• Bước 3: Rút ra Ghi nhớ trọng tâm
- Mời học sinh phát biểu nhận xét.
- GV chuẩn hóa, rút ra kết luận quy tắc ngữ pháp/từ ngữ và đưa phần Ghi nhớ lên bảng.
- Yêu cầu học sinh đọc lại phần Ghi nhớ nhiều lần và lấy ví dụ minh họa.`,
          studentActivity: `• Phân tích ngữ liệu:
- Đọc to ngữ liệu trong SGK, quan sát các từ ngữ được in đậm hoặc gạch chân.
- Thảo luận cùng bạn ngồi cạnh: Trao đổi ý nghĩa và vai trò của các từ ngữ trong câu.
• Hình thành kiến thức:
- Phát biểu ý kiến trước lớp, nêu nhận xét về tác dụng của hiện tượng ngữ pháp vừa tìm hiểu.
- Đọc to phần Ghi nhớ trên bảng lớp và trong SGK.
- Tự tìm thêm 1-2 ví dụ minh họa thực tế cho quy tắc vừa học.`
        },
        {
          name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
          objective: "Áp dụng kiến thức vừa học để nhận biết, phân loại và đặt câu chuẩn xác qua các bài tập.",
          teacherActivity: `• Hướng dẫn giải quyết hệ thống bài tập:
- Bài tập 1 (Nhận biết / Phân loại):
  + Hướng dẫn HS đọc kĩ yêu cầu, xác định các từ ngữ cần tìm trong đoạn văn.
  + Tổ chức làm việc cá nhân vào vở, gọi HS lên bảng chữa bài.
- Bài tập 2 (Tìm từ / Điền từ phù hợp ngữ cảnh):
  + Cho HS thảo luận nhóm đôi, chia sẻ các từ ngữ tìm được.
  + GV đi bao quát lớp, uốn nắn các lỗi dùng từ chưa phù hợp.
- Bài tập 3 (Đặt câu / Viết đoạn văn ngắn):
  + Hướng dẫn HS lưu ý đầu câu viết hoa, cuối câu có dấu chấm; câu phải có nghĩa hoàn chỉnh và chứa từ ngữ vừa học.
  + Gọi 3-4 HS đọc câu văn của mình trước lớp, GV sửa lỗi diễn đạt trực tiếp.`,
          studentActivity: `• Thực hành làm bài tập:
- Bài 1: Đọc thầm đề bài, gạch chân các từ ngữ yêu cầu trong SGK/vở bài tập. Lên bảng trình bày kết quả.
- Bài 2: Trao đổi với bạn cùng bàn, tìm các từ ngữ đồng nghĩa/trái nghĩa hoặc từ ngữ theo chủ điểm.
- Bài 3: Tự viết 1-2 câu văn hoàn chỉnh vào vở. Đọc to câu văn của mình trước lớp, tiếp thu ý kiến nhận xét của thầy cô và các bạn.`
        },
        {
          name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
          objective: "Sử dụng đúng từ ngữ, ngữ pháp vừa học trong giao tiếp hàng ngày.",
          teacherActivity: `• Giao nhiệm vụ vận dụng:
- Yêu cầu HS đóng vai giao tiếp: Đặt 1 câu hỏi hoặc 1 câu chào hỏi có sử dụng từ ngữ/kiểu câu vừa học với bạn bên cạnh.
• Tổng kết tiết học:
- Nhận xét tinh thần học tập của lớp.
- Dặn dò học sinh ghi nhớ kiến thức và chuẩn bị bài cho tiết sau.`,
          studentActivity: `• Thực hành vận dụng giao tiếp:
- Quay sang bạn cùng bàn, thực hiện câu chào hỏi hoặc trao đổi tự nhiên có sử dụng đúng kiến thức bài học.
- Lắng nghe nhận xét của giáo viên, dọn dẹp sách vở ngăn nắp.`
        }
      ];

      return { specificCompetencies, teacherMaterials, studentMaterials, activities };
    }

    if (isWriting) {
      // Viết / Tập làm văn / Chính tả
      const activities: LessonActivity[] = [
        {
          name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
          objective: "Khơi gợi cảm xúc, kích thích trí tưởng tượng và tạo hứng thú viết văn/chính tả.",
          teacherActivity: `• Khởi động:
- Chiếu bức ảnh hoặc video clip ngắn liên quan đến đề tài bài viết (ví dụ: cảnh thiên nhiên, con người, hoạt động vui chơi...).
- Đặt câu hỏi: "Bức tranh/video gợi cho em cảm xúc gì? Nếu được miêu tả lại, em sẽ chọn chi tiết nào nổi bật nhất?"
- Dẫn dắt giới thiệu bài: "${lessonTitle}".`,
          studentActivity: `• Theo dõi hình ảnh/video, chia sẻ cảm nghĩ nhanh với lớp.
- Lắng nghe lời dẫn dắt của giáo viên, ghi tên bài học vào vở.`
        },
        {
          name: "2. Hoạt động Khám phá (Tìm hiểu yêu cầu & Dàn ý - 12 đến 15 phút)",
          objective: "Nắm vững cấu trúc bài viết, cách chọn lọc chi tiết và kỹ năng lập dàn ý.",
          teacherActivity: `• Bước 1: Đọc và phân tích đề bài / văn bản mẫu
- Cho 1 HS đọc to đề bài hoặc đoạn văn mẫu.
- Phân tích yêu cầu trọng tâm của đề bài: Thể loại, đối tượng miêu tả/kể chuyện, phạm vi bài viết.
• Bước 2: Hướng dẫn tìm ý & Lập dàn ý
- Nhắc lại cấu trúc 3 phần: Mở bài, Thân bài, Kết bài.
- Hướng dẫn học sinh cách quan sát, chọn lọc những chi tiết tiêu biểu, giàu cảm xúc.
- Hướng dẫn sử dụng các biện pháp tu từ (so sánh, nhân hóa) để câu văn thêm sinh động.`,
          studentActivity: `• Phân tích đề bài:
- Đọc to đề bài, dùng bút chì gạch chân các từ khóa quan trọng (tả ai, tả cái gì, kể chuyện gì).
• Tìm ý và xây dựng dàn ý:
- Trả lời các câu hỏi gợi ý của giáo viên.
- Ghi nhanh các ý chính vào vở nháp theo 3 phần: Mở bài, Thân bài, Kết bài.
- Thảo luận cùng bạn bên cạnh để bổ sung thêm các hình ảnh, chi tiết hay.`
        },
        {
          name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
          objective: "Học sinh thực hành viết đoạn văn hoặc bài văn hoàn chỉnh vào vở.",
          teacherActivity: `• Tổ chức thực hành viết bài:
- Yêu cầu học sinh dựa vào dàn ý đã lập, tập trung viết đoạn văn/bài văn vào vở.
- Nhắc nhở tư thế ngồi viết, giữ gìn khoảng cách mắt - vở, chữ viết rõ ràng, sạch đẹp.
- Đi quanh lớp quan sát, gợi ý từ ngữ hay cho những học sinh gặp khó khăn về diễn đạt.
• Nhận xét, chữa bài:
- Gọi 2-3 học sinh đọc bài viết trước lớp.
- Phân tích ưu điểm và góp ý cách diễn đạt, cách dùng từ ngữ gợi tả gợi cảm.`,
          studentActivity: `• Thực hành viết bài cá nhân:
- Tự giác, tập trung viết đoạn văn/bài văn vào vở theo dàn ý đã chuẩn bị.
- Vận dụng các từ ngữ gợi cảm, hình ảnh so sánh, nhân hóa vào câu văn.
• Trình bày bài viết:
- Tự tin đọc to đoạn văn tâm đắc của mình trước lớp.
- Lắng nghe nhận xét của thầy cô và các bạn để tự chỉnh sửa, hoàn thiện bài viết của mình.`
        },
        {
          name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
          objective: "Bồi dưỡng tình cảm, kỹ năng tự sửa bài và chia sẻ tác phẩm với người thân.",
          teacherActivity: `• Hướng dẫn tự rà soát:
- Hướng dẫn học sinh tự đọc lại bài viết của mình, soát lỗi chính tả và dấu câu.
• Dặn dò: Về nhà đọc lại bài văn cho bố mẹ nghe và tiếp thu góp ý để viết hay hơn.`,
          studentActivity: `• Dùng bút chì tự soát lỗi chính tả, sửa lại những câu văn chưa gãy gọn.
- Ghi nhớ nhiệm vụ về nhà đọc lại bài cho người thân nghe.`
        }
      ];

      return { specificCompetencies, teacherMaterials, studentMaterials, activities };
    }

    // Default Tiếng Việt general fallback
    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Tạo tâm thế học tập hứng khởi, kết nối kiến thức và dẫn vào bài mới.",
        teacherActivity: `• Tổ chức trò chơi khởi động nhẹ nhàng gắn với chủ điểm bài học.
• Đặt câu hỏi kết nối và giới thiệu bài: "${lessonTitle}". Ghi tựa bài lên bảng.`,
        studentActivity: `• Tham gia trò chơi vui vẻ, trả lời câu hỏi dẫn dắt của giáo viên.
• Nhắc lại tên bài học và ghi bài vào vở cẩn thận.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Hình thành kiến thức và kỹ năng ngôn ngữ cốt lõi trong bài: ${titleCore}.`,
        teacherActivity: `• Trình bày ngữ liệu mẫu, đọc mẫu hoặc chiếu nội dung bài học lên bảng.
• Hướng dẫn học sinh phân tích ngữ liệu, đàm thoại gợi mở từng bước.
• Chốt lại kiến thức trọng tâm và hướng dẫn học sinh ghi nhớ quy tắc.`,
        studentActivity: `• Quan sát ngữ liệu, lắng nghe giáo viên hướng dẫn.
• Thảo luận nhóm đôi, chia sẻ nhận thức và rút ra ghi nhớ bài học.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Củng cố và rèn luyện kỹ năng qua các bài tập cụ thể trong SGK.",
        teacherActivity: `• Giao nhiệm vụ chi tiết từng bài tập: hướng dẫn làm bảng con, làm vở bài tập và làm việc nhóm.
• Quan sát uốn nắn, hỗ trợ học sinh còn gặp khó khăn, chữa bài mẫu trên bảng.`,
        studentActivity: `• Tích cực hoàn thành từng bài tập vào vở hoặc bảng con.
• Tham gia chữa bài trước lớp, nhận xét và đổi chéo vở soát lỗi cho bạn.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Vận dụng kiến thức bài học vào thực tiễn đời sống và giao tiếp hàng ngày.",
        teacherActivity: `• Đưa ra tình huống vận dụng thực tế, dặn dò học sinh tự rèn luyện thêm tại nhà.`,
        studentActivity: `• Nêu cách giải quyết tình huống thực tế, ghi nhớ lời dặn dò của giáo viên.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // =========================================================================
  // 3. MÔN TỰ NHIÊN VÀ XÃ HỘI (TNXH) - Khối 1, 2, 3
  // =========================================================================
  if (subLower.includes("tự nhiên và xã hội") || subLower.includes("tnxh")) {
    const specificCompetencies = [
      `Học sinh nhận biết được các sự vật, hiện tượng, mối quan hệ trong bài: "${lessonTitle}".`,
      "Biết cách chăm sóc sức khỏe, bảo vệ an toàn cho bản thân và thể hiện hành vi có trách nhiệm với môi trường sống xung quanh."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích hoạt cảm xúc, khơi gợi hiểu biết thực tế của học sinh về bài học.",
        teacherActivity: `• Cho học sinh hát bài hát hoặc xem một đoạn video clip ngắn về chủ đề bài học.
• Đặt câu hỏi gợi mở: "Hằng ngày em thường thấy điều này diễn ra như thế nào? Em cảm thấy ra sao?"
• Dẫn dắt vào bài mới: "${lessonTitle}", ghi tựa bài lên bảng.`,
        studentActivity: `• Cả lớp hát và vận động theo nhịp bài hát.
• 2-3 học sinh xung phong chia sẻ trải nghiệm thực tế của bản thân.
• Lắng nghe giáo viên giới thiệu bài và nhắc lại tên bài học.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Quan sát, nhận diện và khám phá kiến thức mới về: ${titleCore}.`,
        teacherActivity: `• Bước 1: Quan sát tranh ảnh thực tế trong SGK
- Cho học sinh làm việc theo nhóm 4: Quan sát các bức tranh trong SGK.
- Nêu hệ thống câu hỏi gợi mở: "Bức tranh vẽ cảnh gì? Các nhân vật đang làm gì? Việc làm đó mang lại lợi ích gì hoặc có nguy cơ gì?"
• Bước 2: Thảo luận và chia sẻ
- Mời đại diện các nhóm lên chỉ tranh và trình bày kết quả quan sát.
• Bước 3: Chuẩn hóa kiến thức
- GV nhận xét, bổ sung và tổng hợp thành các bài học cốt lõi (về vệ sinh, sức khỏe, an toàn hoặc mối quan hệ xã hội).`,
        studentActivity: `• Làm việc nhóm:
- Nhóm 4 cùng mở SGK, quan sát kĩ từng chi tiết trong các bức tranh.
- Thảo luận sôi nổi, ghi lại câu trả lời vào phiếu học tập nhóm.
• Báo cáo kết quả:
- Đại diện nhóm tự tin lên trước lớp, chỉ vào hình ảnh trên màn chiếu và trình bày ý kiến của nhóm.
- Các nhóm khác lắng nghe, nhận xét và bổ sung ý kiến.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Thực hành xử lý tình huống thực tế và rèn luyện kỹ năng hành động đúng đắn.",
        teacherActivity: `• Giao nhiệm vụ xử lý tình huống:
- Đưa ra 2 tình huống thực tế thường gặp trong đời sống (ở nhà, ở trường hoặc nơi công cộng).
- Yêu cầu các nhóm thảo luận và đóng vai xử lý tình huống: "Nếu em là bạn trong tranh, em sẽ làm gì? Vì sao?"
• Theo dõi, nhận xét:
- GV đi quan sát, hướng dẫn các nhóm phân vai đóng vai.
- Mời 2 nhóm lên thể hiện trước lớp; hướng dẫn cả lớp nhận xét, phân tích hành vi an toàn và phù hợp.`,
        studentActivity: `• Đóng vai xử lý tình huống:
- Các nhóm phân công nhiệm vụ: bạn đóng vai nhân vật, bạn dẫn chuyện.
- Thảo luận đưa ra cách xử lý văn minh, an toàn và đúng chuẩn mực.
• Biểu diễn trước lớp:
- 2 nhóm lên đóng vai xử lý tình huống tự nhiên, sinh động.
- Cả lớp vỗ tay cổ vũ và tham gia nhận xét, rút ra cách ứng xử đúng nhất.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Thực hiện cam kết hành vi an toàn, văn minh tại gia đình và trường lớp.",
        teacherActivity: `• Tổng kết bài học:
- Hỏi: "Sau bài học này, em sẽ thay đổi thói quen nào hoặc làm việc gì để giúp đỡ gia đình và giữ an toàn cho bản thân?"
- Dặn dò học sinh thực hiện đều đặn mỗi ngày và chia sẻ bài học cùng người thân.`,
        studentActivity: `• Nêu cam kết hành động:
- 2-3 học sinh chia sẻ việc làm cụ thể mình sẽ thực hiện ngay trong ngày hôm nay.
- Lắng nghe lời dặn dò của giáo viên, dọn dẹp bàn học sạch sẽ.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // =========================================================================
  // 4. MÔN KHOA HỌC (SCIENCE) - Khối 4, 5
  // =========================================================================
  if (subLower.includes("khoa học") || subLower === "kh") {
    const isLaterPeriod = isLaterPeriodOfMultiPeriodLesson(lessonTitle);
    const notebookSummary = isLaterPeriod ? undefined : getLessonNotebookSummary({ grade, subject, lessonTitle });
    const specificCompetencies = getDetailedSpecificCompetencies({ grade, subject, lessonTitle, subSubject, curriculumPeriod, week });
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const act4Teacher = isLaterPeriod
      ? `• Đặt câu hỏi liên hệ thực tế: "Chúng ta có thể làm gì để áp dụng kiến thức bài học này vào cuộc sống?"
• Củng cố, hệ thống lại kiến thức trọng tâm đã học ở tiết trước.
• Hướng dẫn học sinh vận dụng kiến thức vào thực tế, hoàn thiện các bài tập khoa học.
• Dặn dò học sinh chuẩn bị bài cho tiết học tiếp theo.`
      : `• Đặt câu hỏi vận dụng thực tế:
- "Chúng ta có thể làm gì tại gia đình và địa phương để áp dụng kiến thức bài học này (bảo vệ nguồn nước, tiết kiệm điện, bảo vệ đất)?"
• Rút bài học cho học sinh ghi nhớ (ngắn gọn):
★ BÀI HỌC:
${notebookSummary}
• Dặn dò học sinh tiếp tục quan sát thiên nhiên, chuẩn bị bài mới.`;

    const act4Student = isLaterPeriod
      ? `• Nêu các hành động cụ thể trong sinh hoạt hàng ngày.
• Lắng nghe, nhớ lại kiến thức bài học đã ghi ở tiết 1.
• Thực hành các bài tập vận dụng theo hướng dẫn của giáo viên.
• Ghi nhớ lời dặn dò của giáo viên, dọn dẹp phòng học sạch sẽ.`
      : `• Nêu các hành động cụ thể trong sinh hoạt hàng ngày.
• Đọc lại bài học (1-2 học sinh đọc, cả lớp đọc đồng thanh).
• Ghi bài học ngắn gọn vào vở cẩn thận, sạch đẹp.
• Ghi nhớ lời dặn dò của giáo viên, dọn dẹp phòng học sạch sẽ.`;

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích thích trí tò mò khoa học, đặt ra nghi vấn khám phá từ thực tiễn.",
        teacherActivity: `• Nêu tình huống thực tế hoặc một hiện tượng khoa học thú vị:
- Đặt câu hỏi: "Tại sao khi trời mưa nước lại ngấm vào đất?", hoặc câu hỏi liên quan trực tiếp đến bài học "${titleCore}".
- Khích lệ học sinh đưa ra các dự đoán ban đầu.
• Giới thiệu bài mới: "${lessonTitle}", ghi bảng.`,
        studentActivity: `• Lắng nghe câu hỏi tình huống của giáo viên.
• Suy nghĩ, đưa ra các giả thuyết và dự đoán khoa học ban đầu theo hiểu biết của mình.
• Lắng nghe giáo viên dẫn dắt, nhắc lại tên bài học và ghi vở.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Tiến hành quan sát, thí nghiệm hoặc phân tích tư liệu để tìm hiểu bản chất của: ${titleCore}.`,
        teacherActivity: `• Bước 1: Giao nhiệm vụ khám phá
- Cho học sinh làm việc theo nhóm 4.
- Phát phiếu học tập và hướng dẫn học sinh quan sát sơ đồ / tranh ảnh thí nghiệm trong SGK hoặc video clip khoa học.
• Bước 2: Hướng dẫn quan sát & Thảo luận
- Đặt câu hỏi định hướng: "Hiện tượng gì đã xảy ra? Nguyên nhân do đâu? Kết quả thu được là gì?"
- GV đi tới các nhóm, hỗ trợ học sinh phân tích các biến số và dữ liệu quan sát.
• Bước 3: Rút ra kết luận khoa học
- Mời đại diện nhóm báo cáo kết quả.
- GV chuẩn hóa kiến thức, rút ra định nghĩa / quy luật khoa học chính thức.`,
        studentActivity: `• Làm việc nhóm nghiên cứu:
- Nhận phiếu học tập, phân công nhóm trưởng điều hành, thư kí ghi chép.
- Quan sát kĩ thí nghiệm hoặc sơ đồ trong SGK, cùng nhau trao đổi, giải thích nguyên nhân hiện tượng.
• Báo cáo và thảo luận:
- Đại diện nhóm lên bảng trình bày kết quả quan sát và kết luận của nhóm mình.
- Các nhóm khác đặt câu hỏi phản biện, đối chiếu kết quả.
- Ghi chép kết luận khoa học vào vở.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Vận dụng kiến thức khoa học vừa học để giải thích các hiện tượng thực tế và bài tập tình huống.",
        teacherActivity: `• Giao bài tập tình huống thực tiễn:
- Đưa ra bài tập phân tích: Giải thích hiện tượng thực tế đời sống liên quan đến bài học.
- Hướng dẫn học sinh lập sơ đồ tư duy hoặc bảng phân loại thông tin trên giấy A3 / bảng phụ.
• Đánh giá kết quả:
- Nhận xét bài làm của các nhóm, chỉ ra những điểm sáng tạo và những chỗ cần chuẩn xác hơn về thuật ngữ khoa học.`,
        studentActivity: `• Thực hành giải bài tập:
- Thảo luận nhóm, vận dụng kiến thức vừa học để giải thích các hiện tượng trong bài tập.
- Hoàn thành sơ đồ tư duy hoặc bảng phân loại lên bảng nhóm.
- Cùng nhau chấm chéo sản phẩm giữa các nhóm.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Ứng dụng kiến thức khoa học vào bảo vệ môi trường và giữ gìn sức khỏe gia đình.",
        teacherActivity: act4Teacher,
        studentActivity: act4Student
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities, notebookSummary };
  }

  // =========================================================================
  // 5. MÔN LỊCH SỬ VÀ ĐỊA LÍ - Khối 4, 5
  // =========================================================================
  if (subLower.includes("lịch sử") || subLower.includes("địa lí") || subLower.includes("ls-đl") || subLower === "ls" || subLower === "đl") {
    const isLaterPeriod = isLaterPeriodOfMultiPeriodLesson(lessonTitle);
    const notebookSummary = isLaterPeriod ? undefined : getLessonNotebookSummary({ grade, subject, lessonTitle });
    const specificCompetencies = [
      `Học sinh trình bày được diễn biến sự kiện lịch sử hoặc đặc điểm địa lí tự nhiên, dân cư, kinh tế trong bài: "${lessonTitle}".`,
      "Biết khai thác lược đồ, bản đồ, tranh ảnh hiện vật lịch sử; bồi dưỡng lòng tự hào dân tộc và tình yêu quê hương đất nước."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const act4Teacher = isLaterPeriod
      ? `• Đặt câu hỏi liên hệ: "Em làm gì để thể hiện lòng yêu quê hương, đất nước?"
• Củng cố, nhắc lại kiến thức trọng tâm đã học ở tiết trước.
• Hướng dẫn học sinh tiếp tục thực hành, hoàn thiện bài tập và vận dụng thực tiễn.
• Dặn dò học sinh chuẩn bị bài cho tiết học tiếp theo.`
      : `• Đặt câu hỏi liên hệ:
- "Là học sinh tiểu học, em cần làm gì để thể hiện lòng biết ơn các thế hệ cha anh hoặc góp phần bảo tồn vẻ đẹp quê hương?"
• Rút bài học cho học sinh ghi nhớ (ngắn gọn):
★ BÀI HỌC:
${notebookSummary}
• Dặn dò học sinh tìm hiểu thêm thông tin qua sách báo, internet an toàn và chuẩn bị bài mới.`;

    const act4Student = isLaterPeriod
      ? `• Chia sẻ suy nghĩ cá nhân.
• Chú ý lắng nghe, ôn lại bài học đã ghi ở tiết 1.
• Tích cực tham gia thực hành, hoàn thành bài tập.
• Ghi nhớ lời dặn dò của thầy cô.`
      : `• Chia sẻ suy nghĩ cá nhân: Nêu quyết tâm chăm ngoan, học giỏi, yêu quý quê hương.
• Đọc lại bài học (1-2 học sinh đọc, cả lớp đọc đồng thanh).
• Ghi bài học ngắn gọn vào vở cẩn thận, sạch đẹp.
• Ghi nhớ lời dặn dò của thầy cô.`;

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Khơi gợi niềm tự hào dân tộc hoặc sự tò mò về vùng đất, sự kiện lịch sử.",
        teacherActivity: `• Chiếu hình ảnh một di tích lịch sử hoặc danh lam thắng cảnh nổi tiếng của đất nước.
• Đố học sinh: "Em có biết đây là địa danh nào không? Nơi đây gắn liền với nhân vật/sự kiện lịch sử nào?"
• Dẫn dắt vào bài mới: "${lessonTitle}", ghi tựa bài lên bảng.`,
        studentActivity: `• Quan sát hình ảnh, hào hứng giơ tay giải câu đố địa danh.
• Lắng nghe lời dẫn dắt của giáo viên và ghi tên bài học vào vở.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Khai thác tư liệu, lược đồ, bản đồ để tìm hiểu kiến thức cốt lõi về: ${titleCore}.`,
        teacherActivity: `• Bước 1: Làm việc với tư liệu và lược đồ
- Yêu cầu học sinh mở SGK, đọc đoạn tư liệu và quan sát lược đồ/bản đồ.
- Nêu câu hỏi định hướng:
  + Về Lịch sử: Sự kiện diễn ra vào thời gian nào? Do ai lãnh đạo? Diễn biến chính và kết quả ra sao?
  + Về Địa lí: Vùng đất này có vị trí tiếp giáp ở đâu? Đặc điểm địa hình, khí hậu, sông ngòi thế nào?
• Bước 2: Thảo luận nhóm
- Tổ chức học sinh thảo luận nhóm 4 hoàn thành phiếu học tập.
• Bước 3: Báo cáo và chuẩn hóa
- Mời đại diện học sinh lên chỉ lược đồ/bản đồ và trình bày trước lớp.
- GV chuẩn hóa kiến thức, nhấn mạnh ý nghĩa lịch sử hoặc giá trị kinh tế - sinh thái của vùng đất.`,
        studentActivity: `• Làm việc nhóm với bản đồ/tư liệu:
- Đọc kĩ đoạn văn trong SGK, quan sát các kí hiệu trên lược đồ.
- Thảo luận nhóm, cùng nhau xác định các mốc thời gian, diễn biến hoặc đặc điểm tự nhiên.
• Báo cáo trước lớp:
- Đại diện nhóm lên bảng, dùng que chỉ chỉ rõ các địa danh / mũi tấn công trên lược đồ và trình bày mạch lạc.
- Các nhóm khác nhận xét, bổ sung.
- Ghi các ý chính vào vở.`
      },
      {
        name: "3. Hoạt động Luyện tập (12 đến 15 phút)",
        objective: "Củng cố kiến thức qua bài tập điền lược đồ, trắc nghiệm và sơ đồ tư duy.",
        teacherActivity: `• Giao bài tập củng cố:
- Cho học sinh làm việc cá nhân: Hoàn thành bài tập điền khuyết hoặc điền tên địa danh vào lược đồ trống trong vở bài tập.
- Tổ chức trò chơi trắc nghiệm nhanh "Rung chuông vàng" với 3-4 câu hỏi cốt lõi của bài học.
• Nhận xét, chữa bài:
- Chốt đáp án đúng, khen ngợi những học sinh nắm bài nhanh và chính xác.`,
        studentActivity: `• Làm bài tập cá nhân:
- Hoàn thành bài tập trong vở bài tập cẩn thận.
- Hào hứng tham gia trò chơi trắc nghiệm giơ thẻ chọn đáp án A, B, C hoặc D.
- Đối chiếu kết quả và tự sửa bài.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Liên hệ trách nhiệm của học sinh đối với việc giữ gìn truyền thống và bảo vệ quê hương.",
        teacherActivity: act4Teacher,
        studentActivity: act4Student
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities, notebookSummary };
  }

  // =========================================================================
  // 6. MÔN ĐẠO ĐỨC (ETHICS) - Khối 1 đến Khối 5
  // =========================================================================
  if (subLower.includes("đạo đức") || subLower === "đđ") {
    const specificCompetencies = [
      `Học sinh nhận biết được các chuẩn mực hành vi đạo đức, ý nghĩa và biểu hiện cụ thể trong bài: "${lessonTitle}".`,
      "Biết phân biệt hành vi đúng - sai, có thái độ đồng tình với điều tốt, không đồng tình với cái xấu; rèn luyện thói quen ứng xử văn minh trong trường học và gia đình."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Tạo cảm xúc chân thành, dẫn dắt vào bài học đạo đức một cách tự nhiên.",
        teacherActivity: `• Bắt nhịp cho cả lớp hát bài hát hoặc kể một mẩu chuyện đạo đức ngắn.
• Đặt câu hỏi: "Bài hát/câu chuyện khuyên chúng ta điều gì?"
• Giới thiệu bài mới: "${lessonTitle}", ghi tựa bài lên bảng.`,
        studentActivity: `• Cả lớp hát vang bài hát với tinh thần vui tươi.
• 1-2 học sinh trả lời câu hỏi cảm nhận về lời bài hát.
• Lắng nghe giáo viên giới thiệu bài và nhắc lại tên bài học.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Nhận biết chuẩn mực hành vi đạo đức và phân tích ý nghĩa của: ${titleCore}.`,
        teacherActivity: `• Bước 1: Khai thác tranh tình huống trong SGK
- Cho học sinh quan sát lần lượt các bức tranh tình huống trong SGK.
- Nêu câu hỏi: "Các bạn trong tranh đang làm gì? Việc làm đó đúng hay sai? Mang lại kết quả gì?"
• Bước 2: Thảo luận nhóm
- Tổ chức học sinh thảo luận nhóm đôi: Bày tỏ ý kiến về từng hành vi của nhân vật.
• Bước 3: Rút ra bài học chuẩn mực
- Mời đại diện các nhóm phát biểu.
- GV phân tích, chuẩn hóa và rút ra bài học đạo đức: "Để thể hiện ${titleCore}, chúng ta cần làm những việc gì và tránh những việc gì?"`,
        studentActivity: `• Quan sát tranh và suy ngẫm:
- Quan sát kĩ nét mặt, hành động của các nhân vật trong từng bức tranh.
- Thảo luận cùng bạn: Đánh giá việc làm nào nên làm, việc làm nào không nên làm.
• Bày tỏ ý kiến:
- Giơ tay phát biểu ý kiến rõ ràng, giải thích vì sao mình đồng tình hay không đồng tình.
- Đọc to phần Lời khuyên/Ghi nhớ trong SGK và ghi nhớ bài học.`
      },
      {
        name: "3. Hoạt động Luyện tập (12 đến 15 phút)",
        objective: "Bày tỏ thái độ và thực hành xử lý các tình huống đạo đức thực tế.",
        teacherActivity: `• Hoạt động 1: Bày tỏ ý kiến (Tán thành / Không tán thành)
- GV đọc các nhận định hành vi, yêu cầu học sinh dùng thẻ Xanh (Tán thành) hoặc Đỏ (Không tán thành) để giơ đồng loạt.
- Mời một số học sinh giải thích lí do vì sao lựa chọn như vậy.
• Hoạt động 2: Đóng vai xử lý tình huống
- Giao 2 tình huống cụ thể (ở nhà, ở lớp) cho các nhóm.
- Hướng dẫn các nhóm phân vai, xây dựng lời thoại ứng xử lễ phép, trung thực, có trách nhiệm.
- Mời các nhóm lên biểu diễn, cả lớp nhận xét.`,
        studentActivity: `• Bày tỏ thái độ:
- Chăm chú lắng nghe từng nhận định của thầy cô.
- Giơ thẻ bày tỏ thái độ dứt khoát; tự tin đứng dậy giải thích quan điểm của bản thân.
• Đóng vai xử lý tình huống:
- Nhóm thảo luận nhanh, phân vai nhân vật.
- Lên trước lớp diễn xuất tự nhiên, đưa ra cách giải quyết tình huống nhân ái, lịch sự, đúng chuẩn mực đạo đức.
- Lắng nghe lời khen ngợi và góp ý của cô giáo và các bạn.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Chuyển nhận thức đạo đức thành hành động cụ thể trong cuộc sống hàng ngày.",
        teacherActivity: `• Hướng dẫn liên hệ bản thân:
- Yêu cầu HS chia sẻ: "Em đã từng làm việc gì thể hiện ${titleCore}? Sắp tới em sẽ làm thêm những việc gì?"
• Dặn dò: Lập bảng cam kết việc làm tốt và thực hiện mỗi ngày ở trường và ở nhà.`,
        studentActivity: `• Chia sẻ việc làm tốt của bản thân trước lớp một cách trung thực.
• Cam kết thực hiện hành vi đạo đức tốt mỗi ngày.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // =========================================================================
  // 7. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN) - Khối 1 đến Khối 5
  // =========================================================================
  if (subLower.includes("hđtn") || subLower.includes("hoạt động trải nghiệm") || subLower.includes("hdtn")) {
    const cPeriod = typeof curriculumPeriod === "number" ? curriculumPeriod : (parseInt(String(curriculumPeriod || 0), 10) || 0);
    const isPeriod1 = (session === "Sáng" && cPeriod % 3 === 1) || subSubLower.includes("dưới cờ") || lessonTitle.toLowerCase().includes("dưới cờ") || lessonTitle.toLowerCase().includes("shdc");
    const isPeriod3 = (cPeriod % 3 === 0 && cPeriod > 0) || subSubLower.includes("sinh hoạt lớp") || lessonTitle.toLowerCase().includes("sinh hoạt lớp") || lessonTitle.toLowerCase().includes("shl");

    if (isPeriod1) {
      // Tiết 1: Sinh hoạt dưới cờ (SHDC)
      const isDisasterActive = isDisasterCurriculumActive(week);
      const dLesson = isDisasterActive ? getDisasterLessonForWeek(week) : null;

      if (dLesson) {
        // Tuần 6 (và các tuần tiếp theo nếu có thảm họa): Tích hợp 15 phút bài thảm họa thiên tai vào tiết 1 HĐTN (SHDC)
        const specificCompetencies = [
          "Học sinh thực hiện nghiêm trang nghi lễ Chào cờ đầu tuần theo đúng nghi thức Đội TNTP Hồ Chí Minh; bồi dưỡng lòng tự hào dân tộc và tình yêu quê hương đất nước.",
          `Tích hợp Giáo dục Phòng ngừa và giảm nhẹ rủi ro thảm họa (15 phút - ${dLesson.title} theo tài liệu UBND Xã Tân Thạnh - Trường TH Tân Thạnh):`,
          ...dLesson.specificCompetencies,
          "Rèn luyện kỹ năng quan sát, nhận diện sớm các hiểm họa thiên tai tại địa bàn xã Tân Thạnh và cùng gia đình chủ động thực hiện các biện pháp phòng ngừa rủi ro an toàn."
        ];

        const teacherMaterials = [
          "Hệ thống âm thanh, micro, cờ Tổ quốc phục vụ nghi lễ Chào cờ đầu tuần.",
          "Máy chiếu hoặc tranh ảnh minh họa so sánh hiện tượng mưa dông tự nhiên và thảm họa ngập lụt cuốn trôi nhà cửa, video clip kỹ năng nhận diện rủi ro thiên tai tại địa phương, bảng tình huống phân loại hiểm họa."
        ];

        const studentMaterials = [
          "Trang phục học sinh chỉnh tề, khăn quàng đỏ.",
          "Sổ tay ghi chép an toàn thiên tai, thông tin quan sát thực tế về tình hình mưa lũ, bờ kênh rạch tại địa phương Tân Thạnh."
        ];

        const activities: LessonActivity[] = [
          {
            name: "1. Hoạt động mở đầu (Nghi lễ Chào cờ đầu tuần - 10 phút)",
            objective: "Tạo không khí trang nghiêm, khơi dậy lòng tự hào dân tộc và chuẩn bị tinh thần học tập tuần mới.",
            teacherActivity: `• Tập hợp & Ổn định đội ngũ:
- GVCN hướng dẫn học sinh xếp hàng ngay ngắn theo khối lớp tại sân trường, chỉnh đốn trang phục, kiểm tra khăn quàng đỏ.
• Điều hành nghi lễ Chào cờ:
- Phối hợp với Tổng phụ trách Đội điều hành nghi lễ Chào cờ toàn trường: "Nghiêm! Chào cờ! Chào! - Quốc ca - Đội ca".
- Theo dõi và chấn chỉnh ý thức chào cờ của học sinh lớp mình.
• Đánh giá thi đua tuần qua:
- Lắng nghe đại diện BGH và Ban Chỉ huy Liên đội nhận xét, đánh giá các mặt hoạt động nền nếp tuần qua.`,
            studentActivity: `• Thực hiện nghi lễ Chào cờ:
- Đứng nghiêm trang hướng về Quốc kỳ, thực hiện động tác chào cờ đúng tư thế Đội viên / Nhi đồng.
- Hát vang bài Quốc ca và Đội ca với tinh thần tự hào dân tộc, âm vang rộn rã toàn trường.
• Lắng nghe đánh giá:
- Chú ý lắng nghe đánh giá thi đua tuần qua, vỗ tay chúc mừng các tập thể và cá nhân đạt giải thi đua.`
          },
          {
            name: `2. Hoạt động hình thành kiến thức (Sinh hoạt chủ đề dưới cờ - Tích hợp 15 phút: ${dLesson.title})`,
            objective: `Trang bị kiến thức và kỹ năng cơ bản về phòng ngừa rủi ro thảm họa theo tài liệu UBND Xã Tân Thạnh.`,
            teacherActivity: `• Phần 1: Khởi động chủ đề & Trò chơi "Nhận diện nguy cơ":
- Chiếu 2 bức tranh minh họa:
  + Tranh 1: Cơn mưa lớn kéo dài trên đảo hoang không có người sinh sống.
  + Tranh 2: Mưa lớn gây vỡ đập, ngập lụt cuốn trôi nhà cửa, gia súc của người dân.
- Đặt câu hỏi gợi mở: "Tranh nào chỉ mới là nguy cơ hiểm họa đe dọa, tranh nào đã thực sự gây ra tổn thất nghiêm trọng cho con người?" -> Dẫn dắt vào Bài 1: Hiểm họa và Thảm họa.
• Phần 2: Khám phá bản chất Hiểm họa và Thảm họa:
- Hướng dẫn HS tìm hiểu về HIỂM HỌA: Các hiện tượng thiên tai bất thường có nguy cơ gây hại (bão, lũ lụt, sạt lở bờ kênh, dông sét...).
- Yêu cầu HS thảo luận cặp đôi: "Hiểm họa sẽ biến thành Thảm họa khi nào?"
- Chốt kiến thức cốt lõi: Hiểm họa tác động vào cộng đồng dân cư mỏng manh, thiếu sự chuẩn bị và khả năng phòng chống sẽ biến thành THẢM HỌA.
• Phần 3: Luyện tập phân loại tình huống thực tế:
- Đưa ra 4 tình huống: 1) Động đất ở sa mạc không người; 2) Sạt lở bờ kênh vùi lấp xóm ấp ven sông; 3) Bão lớn tràn qua khu dân cư làm tốc mái, đứt dây điện; 4) Mưa đá nhỏ ở rừng rậm hoang vu.
- Yêu cầu HS phân loại tình huống nào là HIỂM HỌA, tình huống nào là THẢM HỌA và giải thích lý do.`,
            studentActivity: `• Tham gia trò chơi khởi động:
- Quan sát kỹ 2 bức tranh trên màn chiếu, xung phong trả lời: Tranh 1 là nguy cơ tiềm ẩn (Hiểm họa); Tranh 2 đã gây tổn thất nặng nề cho con người (Thảm họa).
• Thảo luận khám phá:
- Đọc thông tin và trao đổi cặp đôi sôi nổi.
- Đại diện phát biểu: Hiểm họa biến thành thảm họa khi nó xảy ra ở nơi có con người sinh sống và con người thiếu khả năng phòng chống, ứng phó.
- Ghi nhớ kiến thức cốt lõi về bản chất thảm họa.
• Thực hành phân loại tình huống:
- Nhanh chóng phân loại chính xác: Tình huống 1, 4 là Hiểm họa (vì không gây tổn thất cho con người); Tình huống 2, 3 là Thảm họa (vì gây thiệt hại nghiêm trọng về người và tài sản).`
          },
          {
            name: "3. Hoạt động luyện tập thực hành (Phổ biến nhiệm vụ tuần mới - 7 phút)",
            objective: "Nắm vững nhiệm vụ học tập, nề nếp thi đua và kế hoạch an toàn trong tuần mới.",
            teacherActivity: `• Phổ biến nhiệm vụ trọng tâm:
- Nhắc nhở học sinh lớp mình các nhiệm vụ thi đua trong tuần:
  + Chuyên cần, đi học đúng giờ, an toàn trên đường đến trường.
  + Giữ gìn vệ sinh trường lớp, bảo vệ môi trường, không xả rác bừa bãi.
  + Tích cực học tập, thi đua hoa điểm mười, giúp đỡ bạn cùng tiến.
  + Chủ động theo dõi thời tiết, chấp hành nội quy an toàn mùa mưa lũ.`,
            studentActivity: `• Tiếp thu nhiệm vụ:
- Lắng nghe và ghi nhớ các nhiệm vụ trọng tâm của tuần học mới.
- Quyết tâm thực hiện tốt các phong trào thi đua của lớp và Liên đội.`
          },
          {
            name: "4. Hoạt động vận dụng trải nghiệm (3 phút)",
            objective: "Vận dụng kiến thức bài học thảm họa vào thực tế cuộc sống tại địa phương Tân Thạnh.",
            teacherActivity: `• Hướng dẫn học sinh liên hệ thực tế địa phương Tân Thạnh:
- Đặt câu hỏi: "Hãy quan sát xung quanh nhà em và trên đường đi học ở xã Tân Thạnh (khu vực bờ kênh rạch, cầu khỉ, đường đê, cây cối to cạnh đường dây điện). Kể tên những hiểm họa thiên nhiên thường xuất hiện ở vùng em sống và gia đình em cần làm gì để không bị biến thành thảm họa?"
• Dặn dò học sinh:
- Ghi lại các mối nguy hiểm quan sát được vào sổ tay an toàn thiên tai.
- Về nhà trao đổi cùng bố mẹ về kế hoạch chằng chống nhà cửa, tỉa cành cây và chuẩn bị đồ dùng thiết yếu trước mùa mưa lũ.`,
            studentActivity: `• Liên hệ thực tế địa phương:
- Nhanh chóng liên hệ thực tế địa phương Tân Thạnh: Kể tên các hiểm họa mùa mưa lũ (ngập lụt đường sá, dông sét, lốc xoáy làm tốc mái nhà, sạt lở bờ kênh rạch...).
- Nêu các việc làm phòng tránh cụ thể của gia đình: chằng chống mái nhà kiên cố, không đi lại ven bờ kênh trơn trượt khi mưa lớn, ngắt cầu dao điện khi có sấm sét.
• Ghi nhớ lời dặn dò, về nhà chia sẻ bài học cùng người thân.`
          }
        ];

        return { specificCompetencies, teacherMaterials, studentMaterials, activities };
      }

      // Tiết 1 thông thường (khi chưa có tích hợp thảm họa)
      const specificCompetencies = [
        "Học sinh thực hiện nghiêm trang nghi lễ Chào cờ đầu tuần theo đúng nghi thức Đội TNTP Hồ Chí Minh; bồi dưỡng lòng tự hào dân tộc và tình yêu Tổ quốc.",
        `Chủ động, tự tin tham gia hoạt động trải nghiệm theo chủ đề dưới cờ: "${lessonTitle}"; nắm vững kế hoạch thi đua tuần mới của nhà trường và Liên đội.`
      ];
      const teacherMaterials = [
        "Sổ theo dõi nền nếp lớp, bài phát động thi đua theo chủ đề tuần của Liên đội và BGH nhà trường.",
        "Hệ thống âm thanh, micro, cờ Tổ quốc phục vụ nghi lễ Chào cờ."
      ];
      const studentMaterials = [
        "Trang phục học sinh chỉnh tề, sạch đẹp (áo đồng phục trắng, khăn quàng đỏ, bảng tên, mũ/ghế ngồi theo quy định)."
      ];

      const activities: LessonActivity[] = [
        {
          name: "1. Nghi lễ Chào cờ (Khởi động - 10 phút)",
          objective: "Tạo không khí trang nghiêm, phấn khởi bước vào tuần học mới.",
          teacherActivity: `• Tập hợp & Ổn định đội ngũ:
- GVCN hướng dẫn học sinh xếp hàng ngay ngắn theo khối lớp tại sân trường, chỉnh đốn trang phục, kiểm tra khăn quàng đỏ.
• Thực hiện nghi lễ Chào cờ:
- Phối hợp với Tổng phụ trách Đội điều hành nghi lễ Chào cờ toàn trường: "Nghiêm! Chào cờ! Chào! - Quốc ca - Đội ca".
- Theo dõi ý thức chào cờ của học sinh lớp mình.
• Lắng nghe đánh giá thi đua:
- Lắng nghe đại diện BGH và Ban Chỉ huy Liên đội nhận xét, đánh giá các mặt hoạt động nền nếp tuần qua.`,
          studentActivity: `• Đứng nghiêm trang hướng về Quốc kỳ:
- Thực hiện động tác chào cờ đúng tư thế Đội viên / Nhi đồng.
- Hát vang bài Quốc ca và Đội ca với tinh thần tự hào dân tộc, âm vang rộn rã toàn trường.
• Lắng nghe nhận xét:
- Chú ý lắng nghe đánh giá thi đua tuần qua, vỗ tay chúc mừng các tập thể và cá nhân đạt giải thi đua.`
        },
        {
          name: "2. Sinh hoạt chủ đề dưới cờ (Khám phá & Giao lưu - 15 phút)",
          objective: `Tham gia hoạt động trải nghiệm và giao lưu theo chủ đề tuần: "${lessonTitle}".`,
          teacherActivity: `• Điều hành hoạt động chủ đề:
- Tổng phụ trách Đội và giáo viên chủ nhiệm hướng dẫn học sinh tham gia hoạt động theo chủ đề tuần: "${lessonTitle}".
- Giới thiệu các tiết mục văn nghệ, tiểu phẩm tuyên truyền hoặc trò chơi đố vui giao lưu toàn trường.
• Khuyến khích học sinh tham gia:
- Động viên học sinh lớp mình tự tin giơ tay tham gia giao lưu, trả lời các câu hỏi đố vui trên sân khấu.`,
          studentActivity: `• Tích cực theo dõi và tham gia giao lưu:
- Chăm chú theo dõi các tiết mục văn nghệ, tiểu phẩm tuyên truyền trên sân khấu.
- Hào hứng giơ tay xung phong lên sân khấu trả lời câu hỏi đố vui giao lưu, chia sẻ cảm nghĩ của mình trước toàn trường.
- Cổ vũ nhiệt tình cho các bạn tham gia biểu diễn.`
        },
        {
          name: "3. Phổ biến nhiệm vụ tuần mới (Luyện tập - 7 phút)",
          objective: "Nắm chắc các chỉ tiêu thi đua và nhiệm vụ trọng tâm của tuần học mới.",
          teacherActivity: `• Phổ biến nhiệm vụ:
- GVCN nhắc nhở học sinh lớp mình các nhiệm vụ trọng tâm trong tuần:
  + Chuyên cần, đi học đúng giờ, xếp hàng ra vào lớp nghiêm túc.
  + Giữ gìn vệ sinh trường lớp, không xả rác bừa bãi, bảo vệ của công.
  + Đẩy mạnh phong trào "Hoa điểm mười", đôi bạn cùng tiến.
  + Thực hiện an toàn giao thông trước cổng trường.`,
          studentActivity: `• Tiếp thu nhiệm vụ:
- Lắng nghe và ghi nhớ các nhiệm vụ thi đua tuần mới của lớp.
- Quyết tâm thực hiện tốt các phong trào thi đua.`
        },
        {
          name: "4. Vận dụng & Di chuyển về lớp (3 phút)",
          objective: "Rèn nếp kỷ luật, trật tự khi di chuyển về phòng học.",
          teacherActivity: `• Nhận xét ý thức chào cờ của lớp.
• Hướng dẫn học sinh cầm ghế ngay ngắn, xếp hàng di chuyển trật tự về phòng học để chuẩn bị tiết học tiếp theo.`,
          studentActivity: `• Thu dọn ghế ngay ngắn, đi theo hàng về lớp học trong trật tự, chuẩn bị sách vở cho tiết học trên lớp.`
        }
      ];

      return { specificCompetencies, teacherMaterials, studentMaterials, activities };
    }

    if (isPeriod3) {
      // Tiết 3: Sinh hoạt lớp (Tích hợp An toàn giao thông theo mẫu mới của Bộ GD&ĐT)
      const atgt = getAtgtLessonForWeek(grade, week);
      const isAtgtActive = atgt.isStarted;
      const atgtLabel = isAtgtActive ? `Bài ${atgt.lessonNumber}: ${atgt.topicShort} - Tiết ${atgt.periodInLesson}` : "";
      
      const specificCompetencies = [
        "Học sinh biết tự đánh giá và đánh giá các mặt hoạt động học tập, rèn luyện của bản thân và các bạn trong tuần qua.",
        `Rèn luyện năng lực tự quản, tự tin phát biểu ý kiến, thống nhất phương hướng tuần tới và tham gia sinh hoạt theo chủ đề: "${lessonTitle}".`,
        ...(isAtgtActive ? [`Tích hợp Giáo dục An toàn giao thông (${atgtLabel}): ${atgt.objective}`] : [])
      ];
      const teacherMaterials = [
        "Sổ chủ nhiệm, bảng tổng hợp điểm thi đua các tổ trong tuần, phương hướng tuần học tiếp theo.",
        ...(isAtgtActive ? [`Tài liệu Giáo dục An toàn giao thông Lớp ${grade}: Tranh ảnh và quy tắc an toàn "${atgt.title} (Tiết ${atgt.periodInLesson})".`] : [])
      ];
      const studentMaterials = [
        "Sổ theo dõi của ban cán sự lớp, phiếu tự đánh giá rèn luyện cá nhân.",
        ...(isAtgtActive ? ["Tài liệu minh họa Giáo dục An toàn giao thông."] : [])
      ];

      const activities: LessonActivity[] = [
        {
          name: "1. Hoạt động mở đầu (5 phút)",
          objective: "",
          teacherActivity: `• Bắt nhịp bài hát tập thể vui nhộn (Ví dụ: "Chúng em với an toàn giao thông" hoặc bài hát lớp yêu thích) tạo không khí cởi mở, ấm áp cuối tuần.`,
          studentActivity: `• Cả lớp cùng hát vang và vỗ tay theo nhịp bài hát, tạo tinh thần thoải mái, hào hứng bước vào buổi sinh hoạt.`
        },
        {
          name: isAtgtActive 
            ? `2. Hình thành kiến thức mới - Sơ kết tuần & Tích hợp An toàn giao thông (${atgtLabel}) (15 phút)`
            : `2. Hình thành kiến thức mới - Sơ kết tuần & Sinh hoạt chủ đề (15 phút)`,
          objective: "",
          teacherActivity: `• Phần 1: Điều hành sơ kết hoạt động tuần qua:
- Mời Ban cán sự lớp (Lớp trưởng, Tổ trưởng) báo cáo tình hình học tập, nề nếp và thực hiện phong trào thi đua.
- GVCN nhận xét toàn diện: Khen ngợi cá nhân và tổ có tiến bộ vượt bậc; nhắc nhở nhẹ nhàng những điểm còn tồn tại.
• Phần 2: ${isAtgtActive ? `Tích hợp nội dung Giáo dục An toàn giao thông (${atgt.title} - Tiết ${atgt.periodInLesson}):\n- ${atgt.teacherGuide}` : `Tổ chức sinh hoạt chuyên đề theo chủ điểm tuần.`}`,
          studentActivity: `• Ban cán sự lớp lần lượt đọc bảng tổng kết thi đua của tổ, nhận xét chung toàn lớp.
• Cả lớp lắng nghe, tự đối chiếu với bản thân và vỗ tay chúc mừng các bạn được tuyên dương.
${isAtgtActive ? `• Tiếp thu nội dung bài học An toàn giao thông (${atgtLabel}):\n- ${atgt.studentPractice}` : `• Tích cực phát biểu đóng góp xây dựng phương hướng cho tuần tiếp theo.`}`
        },
        {
          name: "3. Luyện tập - Thực hành (10 đến 12 phút)",
          objective: "",
          teacherActivity: isAtgtActive 
            ? `• Tổ chức cho học sinh thảo luận cặp đôi hoặc theo tổ:
- Đưa ra 2 tình huống thực tế thường gặp khi tham gia giao thông liên quan đến "${atgt.topicShort}":
  + Tình huống 1: Em đang đi xe đạp thì gặp khúc cua khuất tầm nhìn hoặc muốn rẽ trái vào ngõ. Em cần thực hiện các thao tác nào theo đúng quy trình 4 bước?
  + Tình huống 2: Bạn cùng lớp rủ em đi xe đạp dàn hàng ba và vừa đi vừa đùa nghịch. Em sẽ ứng xử thế nào?
- Yêu cầu học sinh thảo luận: "Nếu gặp tình huống này, em sẽ xử lý như thế nào để đảm bảo an toàn tuyệt đối cho mình và mọi người?"
• Mời 2 đại diện nhóm trình bày cách xử lý; GV nhận xét và chốt phương án an toàn nhất.`
            : `• Tổ chức cho học sinh thảo luận theo tổ về giải pháp rèn luyện nề nếp và học tập cho tuần tiếp theo.`,
          studentActivity: isAtgtActive
            ? `• Các tổ tích cực trao đổi, phân tích tình huống giao thông thực tế.
• Đại diện nhóm tự tin nêu cách giải quyết tình huống an toàn, đúng luật: Luôn quan sát, giảm tốc độ và phát tín hiệu xin đường rõ ràng.
• Cả lớp lắng nghe, nhận xét và ghi nhớ quy tắc tham gia giao thông an toàn.`
            : `• Các tổ thảo luận sôi nổi và đăng ký chỉ tiêu thi đua tuần tới.`
        },
        {
          name: "4. Vận dụng & trải nghiệm (3 đến 5 phút)",
          objective: "",
          teacherActivity: `• Phổ biến phương hướng tuần tới: Nêu các chỉ tiêu thi đua cần đạt của lớp trong tuần tiếp theo.
• Cam kết an toàn giao thông: Nhắc nhở học sinh luôn tuân thủ luật an toàn giao thông trên đường từ nhà đến trường và từ trường về nhà.`,
          studentActivity: `• Ghi chép phương hướng tuần mới vào sổ tay.
• Đồng thanh cam kết: "Chấp hành nghiêm chỉnh an toàn giao thông - Vì sự an toàn của bản thân và mọi người".
• Dọn dẹp vệ sinh phòng học sạch sẽ trước khi ra về.`
        }
      ];

      return {
        specificCompetencies,
        teacherMaterials,
        studentMaterials,
        activities: activities.map((a) => ({ ...a, name: normalizeActivityName(a.name) })),
      };
    }

    // Tiết 2: Hoạt động giáo dục theo chủ đề
    const specificCompetencies = [
      `Khám phá kiến thức, rèn luyện kỹ năng thực hành và hình thành thói quen tích cực gắn với chủ đề: "${lessonTitle}".`,
      "Tự tin bày tỏ ý kiến, lắng nghe và hợp tác hiệu quả cùng bạn bè trong các hoạt động trải nghiệm thực tế."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích hoạt cảm xúc, khơi gợi hứng thú tham gia hoạt động trải nghiệm.",
        teacherActivity: `• Tổ chức trò chơi vận động hoặc hát múa tập thể tạo năng lượng tích cực.
• Giới thiệu bài học chủ đề: "${lessonTitle}", ghi tựa bài lên bảng.`,
        studentActivity: `• Tham gia trò chơi khởi động hào hứng cùng các bạn.
• Nhắc lại tên bài học và chuẩn bị đồ dùng trải nghiệm.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Nhận diện và tìm hiểu các biểu hiện, kỹ năng cốt lõi của chủ đề: ${titleCore}.`,
        teacherActivity: `• Hướng dẫn học sinh quan sát tranh ảnh, video hoặc tình huống thực tế trong SGK.
• Đặt câu hỏi đàm thoại gợi mở, tổ chức cho học sinh thảo luận nhóm 4.
• Tổng hợp ý kiến và rút ra các kỹ năng / thói quen tích cực cần rèn luyện.`,
        studentActivity: `• Quan sát ngữ liệu, thảo luận sôi nổi trong nhóm.
• Đại diện nhóm phát biểu cảm nghĩ và bài học rút ra.
• Lắng nghe giáo viên đúc kết kiến thức.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Thực hành kỹ năng, đóng vai xử lý tình huống hoặc làm sản phẩm trải nghiệm sáng tạo.",
        teacherActivity: `• Giao nhiệm vụ thực hành:
- Hướng dẫn học sinh làm sản phẩm trải nghiệm (vẽ tranh, viết thông điệp, làm thiệp, lập kế hoạch cá nhân...) hoặc đóng vai xử lý tình huống thực tế.
- Quan sát, hỗ trợ các nhóm thực hiện.
• Tổ chức triển lãm, chia sẻ sản phẩm trước lớp.`,
        studentActivity: `• Thực hành trải nghiệm theo nhóm hoặc cá nhân:
- Tự tay làm sản phẩm hoặc phân vai đóng vai xử lý tình huống.
- Tự tin mang sản phẩm lên trưng bày và giới thiệu ý nghĩa sản phẩm của mình trước lớp.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Ứng dụng kỹ năng trải nghiệm vào cuộc sống hàng ngày tại gia đình và trường học.",
        teacherActivity: `• Hướng dẫn học sinh liên hệ thực tế, cam kết thực hiện thói quen tốt mỗi ngày.
• Nhận xét tiết học và dặn dò chuẩn bị cho tiết học sau.`,
        studentActivity: `• Nêu cam kết thực hiện hành động cụ thể tại nhà.
• Thu dọn đồ dùng học tập gọn gàng ngăn nắp.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // =========================================================================
  // 8. CÁC MÔN CÒN LẠI (TIN HỌC, CÔNG NGHỆ, GDTC, MĨ THUẬT)
  // =========================================================================
  if (subLower.includes("tin học") || subLower === "th") {
    const specificCompetencies = [
      `Nắm vững các thao tác và kiến thức cơ bản trong bài "${lessonTitle}". Rèn luyện Năng lực số (CV 3456/BGDĐT-GDTH) và tư duy máy tính.`,
      "Biết cách sử dụng thiết bị số an toàn, bảo vệ thông tin cá nhân trên môi trường mạng."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích hoạt kiến thức số, tạo hứng thú bước vào phòng máy.",
        teacherActivity: `• Đặt câu hỏi đố vui về các bộ phận máy tính hoặc các biểu tượng phần mềm đã học.
• Dẫn dắt giới thiệu bài mới: "${lessonTitle}".`,
        studentActivity: `• Hào hứng giơ tay trả lời câu đố vui.
• Ổn định vị trí ngồi tại phòng máy tính, mở bài học trong SGK.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Quan sát giáo viên thao tác mẫu và nắm vững quy trình các bước trong bài: ${titleCore}.`,
        teacherActivity: `• GV thao tác mẫu từng bước trên màn hình máy chiếu, phân tích tỉ mỉ từng cú nhấp chuột, phím tắt và câu lệnh.
• Nhắc nhở các lưu ý quan trọng để tránh lỗi thao tác.
• Mời 1 học sinh lên thao tác lại thử một phần để cả lớp quan sát.`,
        studentActivity: `• Chú ý quan sát các thao tác của giáo viên trên màn hình lớn.
• Ghi nhớ quy trình từng bước thực hiện và thứ tự các nút lệnh vào vở.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Trực tiếp thực hành thao tác trên máy tính, hoàn thành bài tập thực hành.",
        teacherActivity: `• Hướng dẫn học sinh bật máy, mở đúng phần mềm và bắt đầu thực hành bài tập trong SGK.
• GV đi quanh phòng máy, trực tiếp cầm tay chỉ việc, uốn nắn thao tác cho các học sinh còn lúng túng.
• Chấm bài và lưu sản phẩm của các em làm tốt.`,
        studentActivity: `• Bật máy tính, mở phần mềm và tự giác thao tác thực hành bài tập.
• Hỏi thầy cô hoặc nhờ bạn bên cạnh hướng dẫn khi gặp khó khăn.
• Hoàn thành sản phẩm thực hành và lưu tệp vào thư mục cá nhân.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Ứng dụng kỹ năng số vào học tập và tuân thủ quy trình an toàn điện.",
        teacherActivity: `• Đưa ra câu hỏi ứng dụng thực tế về tìm kiếm thông tin an toàn hoặc vẽ tranh, soạn thảo văn bản.
• Hướng dẫn học sinh tắt máy tính đúng quy trình an toàn điện (Start -> Shut down).`,
        studentActivity: `• Nêu ứng dụng thực tế của bài học.
• Thực hiện tắt máy đúng quy trình, xếp gọn bàn phím và chuột, xếp ghế ngay ngắn trước khi rời phòng máy.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  if (subLower.includes("công nghệ") || subLower === "cn") {
    const isLaterPeriod = isLaterPeriodOfMultiPeriodLesson(lessonTitle);
    const notebookSummary = isLaterPeriod ? undefined : getLessonNotebookSummary({ grade, subject, lessonTitle });
    const specificCompetencies = [
      `Hiểu cấu tạo, tác dụng và các bước sử dụng/lắp ráp an toàn trong bài: "${lessonTitle}".`,
      "Phát triển tư duy công nghệ, kỹ năng khéo léo và ý thức tiết kiệm năng lượng, an toàn lao động (STEM)."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const act4Teacher = isLaterPeriod
      ? `• Đặt câu hỏi củng cố: "Em làm gì để sử dụng đồ dùng công nghệ an toàn và tiết kiệm điện?"
• Củng cố, nhắc lại kiến thức trọng tâm đã học ở tiết trước.
• Hướng dẫn học sinh tiếp tục thực hành, hoàn thiện sản phẩm công nghệ.
• Dặn dò học sinh thu dọn dụng cụ và chuẩn bị bài cho tiết học tiếp theo.`
      : `• Đặt câu hỏi liên hệ thực tế tại gia đình: "Em làm gì để sử dụng an toàn và tiết kiệm điện?"
• Rút bài học cho học sinh ghi nhớ (ngắn gọn):
★ BÀI HỌC:
${notebookSummary}
• Dặn dò học sinh thu dọn dụng cụ gọn gàng.`;

    const act4Student = isLaterPeriod
      ? `• Nêu các việc làm tiết kiệm điện và an toàn tại nhà.
• Lắng nghe, nhớ lại kiến thức bài học đã ghi ở tiết 1.
• Tiếp tục thực hành lắp ghép hoặc sử dụng sản phẩm.
• Thu dọn dụng cụ ngăn nắp vào hộp.`
      : `• Nêu các việc làm tiết kiệm điện và an toàn tại nhà.
• Đọc lại bài học (1-2 học sinh đọc, cả lớp đọc đồng thanh).
• Ghi bài học ngắn gọn vào vở cẩn thận, sạch đẹp.
• Thu dọn bộ dụng cụ kỹ thuật ngăn nắp vào hộp.`;

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Quan sát sản phẩm công nghệ thực tế, kích thích trí tò mò.",
        teacherActivity: `• Cho học sinh quan sát một đồ dùng công nghệ quen thuộc trong gia đình (đèn bàn, quạt điện, mô hình xe...).
• Đặt câu hỏi gợi mở và giới thiệu bài mới: "${lessonTitle}".`,
        studentActivity: `• Quan sát mẫu vật, chia sẻ hiểu biết về công dụng của đồ dùng.
• Ghi tên bài học vào vở.`
      },
      {
        name: "2. Hoạt động Khám phá (12 đến 15 phút)",
        objective: `Tìm hiểu cấu tạo, nguyên lí và quy tắc an toàn của: ${titleCore}.`,
        teacherActivity: `• Hướng dẫn học sinh quan sát các bộ phận của sản phẩm trong SGK.
• Tổ chức thảo luận nhóm: Tìm hiểu chức năng của từng bộ phận và quy trình sử dụng an toàn.
• Chốt lại kiến thức cốt lõi và các bước thao tác chuẩn.`,
        studentActivity: `• Làm việc nhóm: Nhận diện từng bộ phận và chức năng của sản phẩm.
• Trình bày ý kiến trước lớp, tiếp thu quy tắc an toàn khi sử dụng.`
      },
      {
        name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
        objective: "Thực hành lắp ghép hoặc lập quy trình sử dụng sản phẩm công nghệ đúng cách.",
        teacherActivity: `• Hướng dẫn học sinh thực hành theo nhóm: Lắp ghép mô hình hoặc viết bảng quy tắc sử dụng an toàn.
• Quan sát, hướng dẫn an toàn và hỗ trợ kỹ thuật cho các nhóm.`,
        studentActivity: `• Thực hành lắp ghép mô hình cẩn thận theo sơ đồ hướng dẫn.
• Cùng bạn kiểm tra độ chắc chắn và tính năng hoạt động của mô hình.`
      },
      {
        name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
        objective: "Sử dụng đúng cách và an toàn các thiết bị công nghệ trong gia đình.",
        teacherActivity: act4Teacher,
        studentActivity: act4Student
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities, notebookSummary };
  }

  if (subLower.includes("thể chất") || subLower.includes("gdtc") || subLower === "td") {
    const specificCompetencies = [
      `Thực hiện đúng kỹ thuật động tác trong bài "${lessonTitle}". Nâng cao thể lực, phản xạ nhanh nhẹn và tính kỷ luật.`,
      "Hình thành thói quen rèn luyện thân thể hàng ngày, biết giữ vệ sinh cá nhân và sân tập an toàn."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 6 đến 8 phút)",
        objective: "Làm nóng cơ thể, bôi trơn các khớp và phòng tránh chấn thương khi vận động.",
        teacherActivity: `• Tập hợp lớp: Thổi còi tập hợp 4 hàng ngang, điểm số, báo cáo sĩ số, phổ biến nội dung bài học: "${lessonTitle}".
• Khởi động chung:
- Cho học sinh xoay kỹ các khớp: cổ tay kết hợp cổ chân, khớp bả vai, cánh tay, hông, đầu gối.
- Cho học sinh chạy nhẹ nhàng 1 vòng quanh sân tập, sau đó đứng tại chỗ nhảy bật cao.
• Khởi động chuyên môn: Thực hiện một số động tác ép dọc, ép ngang nhẹ nhàng.`,
        studentActivity: `• Đứng ngay ngắn theo hàng ngũ, chú ý lắng nghe phổ biến bài học.
• Thực hiện xoay các khớp tích cực, đều đặn theo nhịp đếm 1-2-3-4, 5-6-7-8 của giáo viên/lớp trưởng.
• Chạy nhẹ nhàng quanh sân tập theo hàng, không xô đẩy bạn.`
      },
      {
        name: "2. Hoạt động Khám phá (8 đến 10 phút)",
        objective: `Quan sát và nắm vững yếu lĩnh kỹ thuật động tác của bài: ${titleCore}.`,
        teacherActivity: `• Thị phạm động tác mẫu:
- GV đứng ở vị trí thích hợp, thực hiện động tác mẫu hoàn chỉnh ở tốc độ bình thường để học sinh có biểu tượng đúng.
- Thực hiện lần 2 với tốc độ chậm, vừa làm vừa phân tích yếu lĩnh kỹ thuật từng nhịp, góc độ tay chân, tư thế thân người.
• Tập thử:
- Cho cả lớp tập thử theo từng nhịp đếm chậm của giáo viên.
- Quan sát, nhắc nhở những lỗi sai thường gặp (sai nhịp, sai góc độ tay, chân chưa thẳng).`,
        studentActivity: `• Chú ý quan sát giáo viên làm mẫu.
• Lắng nghe giải thích yếu lĩnh kỹ thuật từng động tác.
• Tập theo nhịp đếm của thầy cô, tự điều chỉnh tư thế tay chân cho chuẩn xác.`
      },
      {
        name: "3. Hoạt động Luyện tập (12 đến 15 phút)",
        objective: "Tập luyện thuần thục kỹ thuật động tác và tham gia trò chơi vận động hào hứng.",
        teacherActivity: `• Hình thức tập luyện:
- Tập đồng loạt cả lớp (2-3 lần) dưới sự chỉ huy của giáo viên.
- Chia tổ tập luyện luân phiên: Tổ trưởng điều khiển tổ mình tập luyện, GV đi từng tổ quan sát và sửa sai trực tiếp.
- Cho các tổ thi đua biểu diễn động tác trước lớp, cả lớp nhận xét chấm điểm.
• Tổ chức trò chơi vận động:
- Phổ biến luật chơi trò chơi thể thao rèn luyện sức nhanh, sự khéo léo (như cướp cờ, tiếp sức, chuyền bóng).
- Điều hành học sinh chơi trò chơi an toàn, hào hứng, khen ngợi đội chiến thắng.`,
        studentActivity: `• Tích cực luyện tập:
- Tập đồng loạt theo khẩu lệnh chỉ huy.
- Về khu vực của tổ, nghiêm túc tập luyện dưới sự điều khiển của tổ trưởng.
- Tự giác sửa động tác khi được thầy cô góp ý.
• Tham gia trò chơi vận động:
- Hào hứng tham gia trò chơi thể thao, tuân thủ đúng luật chơi và đảm bảo an toàn cho bạn.`
      },
      {
        name: "4. Hoạt động Vận dụng & Hồi tĩnh (5 phút)",
        objective: "Hồi tĩnh nhịp thở, thả lỏng các cơ và dặn dò tự rèn luyện thân thể.",
        teacherActivity: `• Thả lỏng, hồi tĩnh:
- Hướng dẫn học sinh thực hiện các động tác thả lỏng tay, chân, rũ cơ bắp, điều hòa nhịp thở.
• Đánh giá, dặn dò:
- Nhận xét buổi tập: Tuyên dương các tổ, cá nhân luyện tập nghiêm túc, động tác đẹp.
- Dặn dò học sinh duy trì thói quen tập thể dục buổi sáng tại nhà. Thổi còi giải tán: "Giải tán! - Khỏe!"`,
        studentActivity: `• Thả lỏng toàn thân nhịp nhàng theo tiếng đếm của giáo viên.
• Lắng nghe nhận xét buổi tập, hô to "KHỎE!" và trật tự giải tán về lớp.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  if (subLower.includes("mĩ thuật") || subLower === "mt") {
    const specificCompetencies = [
      `Nhận biết và ứng dụng các yếu tố tạo hình (đường nét, màu sắc, hình khối, bố cục) trong bài "${lessonTitle}".`,
      "Sáng tạo sản phẩm mĩ thuật độc đáo từ các vật liệu quen thuộc, thân thiện với môi trường (STEM)."
    ];
    const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
    const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

    const activities: LessonActivity[] = [
      {
        name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
        objective: "Kích hoạt cảm thụ thẩm mĩ, khơi gợi cảm xúc sáng tạo.",
        teacherActivity: `• Trưng bày một số bức tranh/sản phẩm mĩ thuật đẹp mắt về chủ đề bài học.
• Đặt câu hỏi: "Em ấn tượng nhất với chi tiết nào? Màu sắc trong tranh gợi cho em cảm xúc gì?"
• Giới thiệu bài mới: "${lessonTitle}".`,
        studentActivity: `• Quan sát các tác phẩm mẫu, hào hứng chia sẻ cảm nhận về đường nét, màu sắc.
• Chuẩn bị sẵn sàng đồ dùng vẽ trên bàn.`
      },
      {
        name: "2. Hoạt động Khám phá (10 đến 12 phút)",
        objective: `Tìm hiểu các yếu tố tạo hình và các bước thực hiện sản phẩm: ${titleCore}.`,
        teacherActivity: `• Hướng dẫn học sinh quan sát và phân tích các bước sáng tạo sản phẩm:
  + Bước 1: Phác họa bố cục chung (chọn mảng chính, mảng phụ).
  + Bước 2: Vẽ hình chi tiết các đối tượng.
  + Bước 3: Vẽ màu hài hòa, tạo độ đậm nhạt và điểm nhấn cho bức tranh.
• Hướng dẫn một số kỹ thuật pha màu hoặc phối hợp vật liệu tái chế.`,
        studentActivity: `• Quan sát các bước hướng dẫn của giáo viên trên bảng.
• Ghi nhớ quy trình từ phác hình đến vẽ màu hoàn thiện.
• Lựa chọn ý tưởng sáng tạo cho bức tranh của riêng mình.`
      },
      {
        name: "3. Hoạt động Luyện tập - Sáng tạo (15 đến 18 phút)",
        objective: "Học sinh thực hành sáng tạo sản phẩm mĩ thuật cá nhân hoặc theo nhóm nhỏ.",
        teacherActivity: `• Cho học sinh thực hành sáng tạo trên giấy A4 hoặc vật liệu thủ công.
• GV đi quanh lớp quan sát, gợi ý cách sắp xếp bố cục hợp lý, cách phối hợp màu sắc tươi sáng cho từng em.
• Khích lệ những ý tưởng sáng tạo độc đáo của học sinh.`,
        studentActivity: `• Say sưa, tập trung vẽ và hoàn thiện sản phẩm mĩ thuật của mình.
• Tự do thể hiện cảm xúc qua từng nét vẽ và mảng màu.
• Trao đổi ý tưởng nhẹ nhàng cùng bạn ngồi cạnh.`
      },
      {
        name: "4. Hoạt động Vận dụng - Trưng bày sản phẩm (5 phút)",
        objective: "Trưng bày 'Triển lãm mĩ thuật nhí', tự tin thuyết trình và nhận xét tác phẩm.",
        teacherActivity: `• Tổ chức cho học sinh dán bài lên bảng lớp tạo thành 'Phòng tranh nhí'.
• Mời một số học sinh tự giới thiệu về ý tưởng tác phẩm của mình.
• Hướng dẫn cả lớp nhận xét, đánh giá sản phẩm đẹp về bố cục, màu sắc và sự sáng tạo.
• Tổng kết, dặn dò giữ gìn đồ dùng mĩ thuật.`,
        studentActivity: `• Mang sản phẩm lên dán trên bảng trưng bày của lớp.
• Tự tin đứng trước lớp giới thiệu ý nghĩa bức tranh của mình.
• Ngắm tranh của các bạn, bình chọn những bức tranh mình yêu thích nhất.`
      }
    ];

    return { specificCompetencies, teacherMaterials, studentMaterials, activities };
  }

  // Generic fallback for any other custom subjects
  const specificCompetencies = [
    `Nắm vững kiến thức trọng tâm của bài: "${lessonTitle}". Thực hiện đúng các kỹ năng đặc thù môn ${subject} theo chuẩn chương trình GDPT 2018.`,
    "Phát triển năng lực tự chủ, hợp tác và giải quyết vấn đề linh hoạt trong thực tiễn."
  ];
  const teacherMaterials = getSubjectEssentialMaterials("teacher", subject, lessonTitle, grade);
  const studentMaterials = getSubjectEssentialMaterials("student", subject, lessonTitle, grade);

  const activities: LessonActivity[] = [
    {
      name: "1. Hoạt động Khởi động (Warm-up - 5 phút)",
      objective: "Tạo tâm thế học tập tích cực, kết nối kiến thức và dẫn dắt vào bài mới.",
      teacherActivity: `• Tổ chức trò chơi khởi động hoặc bài hát vui nhộn liên quan đến bài học.
• Đặt câu hỏi kết nối và giới thiệu bài mới: "${lessonTitle}". Ghi tựa bài lên bảng.`,
      studentActivity: `• Tham gia trò chơi vui vẻ, trả lời câu hỏi dẫn dắt của giáo viên.
• Nhắc lại tên bài học và ghi tựa bài vào vở cẩn thận.`
    },
    {
      name: "2. Hoạt động Khám phá (12 đến 15 phút)",
      objective: `Khám phá và hình thành kiến thức trọng tâm của bài: ${titleCore}.`,
      teacherActivity: `• Hướng dẫn học sinh quan sát ngữ liệu, hiện vật hoặc tình huống thực tế trong SGK.
• Đặt câu hỏi gợi mở, tổ chức cho học sinh thảo luận cặp đôi hoặc nhóm 4.
• Chuẩn hóa kiến thức, ghi các nội dung cốt lõi lên bảng.`,
      studentActivity: `• Quan sát ngữ liệu, chăm chú theo dõi bài giảng.
• Thảo luận nhóm sôi nổi, tìm câu trả lời và đại diện nhóm báo cáo kết quả trước lớp.
• Ghi nhớ nội dung trọng tâm vào vở.`
    },
    {
      name: "3. Hoạt động Luyện tập - Thực hành (12 đến 15 phút)",
      objective: "Củng cố và rèn luyện kỹ năng qua các bài tập và tình huống thực hành cụ thể.",
      teacherActivity: `• Giao nhiệm vụ luyện tập thực hành chi tiết từng bài tập trong SGK.
• Quan sát, hướng dẫn các em học sinh gặp khó khăn; tổ chức chữa bài mẫu và đánh giá.`,
      studentActivity: `• Tích cực làm bài tập cá nhân hoặc theo nhóm nhỏ.
• Lên bảng chữa bài, nhận xét và kiểm tra kết quả chéo cùng bạn.`
    },
    {
      name: "4. Hoạt động Vận dụng (3 đến 5 phút)",
      objective: "Vận dụng kiến thức bài học vào thực tế cuộc sống hàng ngày.",
      teacherActivity: `• Đưa ra tình huống vận dụng thực tiễn, củng cố kiến thức và dặn dò chuẩn bị cho tiết học sau.`,
      studentActivity: `• Nêu cách giải quyết tình huống thực tế, liên hệ bản thân và ghi nhớ dặn dò của giáo viên.`
    }
  ];

  return { specificCompetencies, teacherMaterials, studentMaterials, activities };
}

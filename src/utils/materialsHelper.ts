/**
 * Tiện ích chuẩn hóa và làm sạch Đồ dùng dạy học và học liệu (Chuẩn bị của GV và HS)
 * Tuân thủ yêu cầu:
 * - TUYỆT ĐỐI KHÔNG GHI các đồ dùng đại trà, hiển nhiên:
 *   Sách giáo khoa, SGK, vở bài tập, vở BT, bút dạ, bảng con, phấn, nháp, kế hoạch bài dạy, giáo án...
 * - CHỈ GHI những vật liệu, thiết bị, học liệu thực sự cần thiết theo đặc thù từng môn và từng bài học cụ thể.
 */

// Các từ khóa đồ dùng đại trà, chung chung cần loại bỏ tuyệt đối theo chỉ đạo chuyên môn
const FORBIDDEN_PATTERNS = [
  /sách\s+(giáo\s+khoa|học\s+sinh)[^\.,;\n]*/gi,
  /\bsgk\b[^\.,;\n]*/gi,
  /vở\s+(bài\s+tập|bt|thực\s+hành|ghi(\s+bài)?|rèn\s+chữ|tập\s+viết|ghi\s+chép)[^\.,;\n]*/gi,
  /\bvở\s+bt\b[^\.,;\n]*/gi,
  /\bvở\s+ghi(\s+bài)?\b[^\.,;\n]*/gi,
  /bảng\s+con[^\.,;\n]*/gi,
  /phấn[\/\-]bút\s*dạ[^\.,;\n]*/gi,
  /phấn(\s*[\/\-]\s*bút\s*dạ(\s+màu)?)?[^\.,;\n]*/gi,
  /bút\s+dạ(\s+màu|\s+viết\s+bảng|\s+lông)?[^\.,;\n]*/gi,
  /\bbút\s+lông\b[^\.,;\n]*/gi,
  /phấn(\s+(viết|trắng|màu|viết\s+bảng))?[^\.,;\n]*/gi,
  /\bphấn\b[^\.,;\n]*/gi,
  /(giấy\s+)?nháp[^\.,;\n]*/gi,
  /\bnháp\b[^\.,;\n]*/gi,
  /kế\s+hoạch\s+bài\s+dạy[^\.,;\n]*/gi,
  /\bgiáo\s+án\b[^\.,;\n]*/gi,
  /bộ\s+đồ\s+dùng(\s+học(\s+toán)?)?(\s+học\s+sinh|\s+lớp\s+\d+)?[^\.,;\n]*/gi,
  /bộ\s+đồ\s+dùng\s+dạy\s+học(\s+toán\s+\d+)?[^\.,;\n]*/gi,
  /bộ\s+thực\s+hành\s+toán(\s+\d+)?[^\.,;\n]*/gi,
  /đồ\s+dùng\s+học\s+tập(\s+cá\s+nhân)?[^\.,;\n]*/gi,
  /khăn\s+lau\s+bảng[^\.,;\n]*/gi,
  // Loại bỏ các đồ dùng chung chung theo yêu cầu chuyên môn mới: thẻ từ, giấy thảo luận, bút dạ...
  /thẻ\s+từ(\s+ngữ)?(\s+mini)?(\s+học\s+tập|\s+đáp\s+án)?[^\.,;\n]*/gi,
  /bộ\s+thẻ\s+từ[^\.,;\n]*/gi,
  /thẻ\s+(chữ|số|câu|gài)[^\.,;\n]*/gi,
  /giấy\s+(thảo\s+luận|ghi\s+chú|a4|a0|a3|rô-?ki|khổ\s+to|vẽ)[^\.,;\n]*/gi,
  /\bgiấy\s+(a4|a3|a0)\b[^\.,;\n]*/gi,
  /bảng\s+(phụ\s+ghi\s+phiếu|nhóm)(\s+thảo\s+luận)?[^\.,;\n]*/gi,
  /phiếu\s+(thảo\s+luận|giao\s+việc)(\s+nhóm)?(\s+chung)?[^\.,;\n]*/gi,
  /\bphiếu\s+học\s+tập\b(?!\s+(về|chiếu|in|ghi\s+rõ|\w{3,}))[^\.,;\n]*/gi,
  /\bphiếu\s+bài\s+tập\b(?!\s+(về|chiếu|in|ghi\s+rõ|\w{3,}))[^\.,;\n]*/gi,
  /bút\s+(mực|chì|màu(\s+vẽ)?|dạ)[^\.,;\n]*/gi,
  /\bmàu\s+vẽ\b[^\.,;\n]*/gi,
];

/**
 * Trả về danh sách vật liệu, học liệu chuẩn bị thiết yếu theo từng môn học
 */
export function getSubjectEssentialMaterials(
  type: "teacher" | "student",
  subject = "",
  lessonTitle = "",
  grade: number | string = 5
): string[] {
  const subLower = (subject || "").toLowerCase().trim();
  const titleLower = (lessonTitle || "").toLowerCase().trim();

  // 1. MÔN TOÁN
  if (subLower.includes("toán") || subLower === "t") {
    // 1a. Viết số đo đại lượng dưới dạng số thập phân (Tuần 6)
    if (titleLower.includes("viết số đo") || (titleLower.includes("số đo đại lượng") && titleLower.includes("số thập phân"))) {
      if (type === "teacher") {
        return [
          "Bài giảng điện tử trình chiếu bảng cấu tạo số thập phân và các ví dụ viết số đo đại lượng thực tế; mô hình tia số biểu diễn các vạch số thập phân.",
          "Bảng kẻ sẵn hệ thống các hàng của số thập phân (phần nguyên; phần thập phân: hàng phần mười, hàng phần trăm, hàng phần nghìn); bảng phụ ghi bài tập viết số đo độ dài, khối lượng dưới dạng số thập phân."
        ];
      }
      return [
        "Thước thẳng chia vạch mm chính xác, thước cuộn bỏ túi.",
        "Bảng số liệu ghi lại số đo chiều dài mặt bàn hoặc cân nặng thực tế để thực hành viết số thập phân."
      ];
    }

    // 1b. Làm tròn số thập phân (Tuần 6)
    if (titleLower.includes("làm tròn số thập phân") || titleLower.includes("làm tròn")) {
      if (type === "teacher") {
        return [
          "Bài giảng điện tử mô phỏng quy tắc làm tròn số thập phân trên tia số trực quan.",
          "Bảng phụ kẻ sơ đồ các bước so sánh chữ số ở hàng sau hàng làm tròn với 5; ví dụ thực tế về làm tròn giá tiền và số đo cân nặng trong đời sống."
        ];
      }
      return [
        "Bảng ghi chép số liệu đo đạc thực tế; thước kẻ chia vạch mm để xác định vị trí số trên tia số.",
        "Sổ tay toán học ghi nhớ quy tắc làm tròn số thập phân."
      ];
    }

    // 1c. Hỗn số
    if (titleLower.includes("hỗn số")) {
      if (type === "teacher") {
        return [
          "Mô hình trực quan các hình tròn / hình vuông chia phần bằng nhau (2 hình nguyên và 3/4 hình) trên bảng từ.",
          "Bài giảng điện tử mô phỏng cách đọc, viết và chuyển đổi hỗn số sang phân số; bảng phụ ghi bài tập thực hành."
        ];
      }
      return [
        "Kéo thủ công, các hình tròn bằng bìa đã cắt sẵn để ghép thực hành mô hình hỗn số theo nhóm.",
        "Thước thẳng có vạch chia mm chính xác."
      ];
    }

    // 1d. Phân số thập phân / Phân số
    if (titleLower.includes("phân số thập phân") || titleLower.includes("phân số")) {
      if (type === "teacher") {
        return [
          "Mô hình trực quan tia số chia 10 phần, 100 phần bằng nhau; bài giảng điện tử mô phỏng phân số thập phân.",
          "Bảng phụ ghi các phân số có mẫu số 10, 100, 1000 và ví dụ chuyển đổi phân số thường sang phân số thập phân."
        ];
      }
      return [
        "Thước thẳng chia vạch mm chính xác; mô hình thanh phân số chia sẵn các phần bằng nhau.",
        "Sổ tay toán học ghi nhớ các mẫu số đặc trưng của phân số thập phân."
      ];
    }

    // 1e. Khái niệm số thập phân / So sánh số thập phân
    if (titleLower.includes("số thập phân")) {
      if (type === "teacher") {
        return [
          "Bài giảng điện tử trình chiếu cấu tạo số thập phân (phần nguyên, dấu phẩy, phần thập phân) và ví dụ trực quan.",
          "Bảng phụ ghi quy tắc so sánh số thập phân và các ví dụ thực hành so sánh hai số thập phân."
        ];
      }
      return [
        "Thước thẳng chia vạch mm chính xác.",
        "Sổ tay toán học ghi nhớ thứ tự các hàng của số thập phân."
      ];
    }

    // 1f. Hình học & Đo lường
    const isGeometry =
      titleLower.includes("hình") ||
      titleLower.includes("góc") ||
      titleLower.includes("chu vi") ||
      titleLower.includes("diện tích") ||
      titleLower.includes("thể tích") ||
      titleLower.includes("tam giác") ||
      titleLower.includes("lập phương") ||
      titleLower.includes("hộp chữ nhật") ||
      titleLower.includes("thang") ||
      titleLower.includes("tròn");

    if (isGeometry) {
      if (type === "teacher") {
        return [
          "Bộ mô hình hình học trực quan gắn nam châm (tam giác, hình thang, hình tròn); bộ thước vẽ bảng chuyên dụng (thước thẳng 1m, ê-ke bảng, compa bảng).",
          "Video clip mô phỏng quá trình cắt ghép hình để hình thành công thức tính diện tích; bài giảng điện tử tương tác."
        ];
      }
      return [
        "Bộ thước đo học sinh (thước thẳng chia vạch cm, ê-ke, compa).",
        "Giấy thủ công màu đã vẽ sẵn 2 hình phẳng cùng kích thước và kéo thủ công để thực hành cắt ghép hình thành công thức."
      ];
    }

    // 1g. Đơn vị đo diện tích (km2, ha, m2...)
    if (titleLower.includes("héc-ta") || titleLower.includes("ki-lô-mét vuông") || titleLower.includes("đo diện tích")) {
      if (type === "teacher") {
        return [
          "Bảng hệ thống các đơn vị đo diện tích từ lớn đến bé; tranh ảnh trực quan về cánh đồng, khu rừng, trường học gắn với diện tích héc-ta, ki-lô-mét vuông.",
          "Bài giảng điện tử mô phỏng bảng chuyển đổi đơn vị đo diện tích; thước cuộn dây đo thực tế."
        ];
      }
      return [
        "Thước dây hoặc thước mét thực hành đo diện tích sàn lớp học.",
        "Sổ tay ghi nhớ mối quan hệ giữa các đơn vị đo diện tích."
      ];
    }

    // 1h. Toán chuyển động đều
    if (titleLower.includes("vận tốc") || titleLower.includes("quãng đường") || titleLower.includes("thời gian") || titleLower.includes("chuyển động")) {
      if (type === "teacher") {
        return [
          "Sơ đồ mô phỏng chuyển động của hai vật chuyển động ngược chiều và cùng chiều; đồng hồ bấm giây chuyên dụng.",
          "Bài giảng điện tử mô phỏng mối quan hệ giữa vận tốc, quãng đường, thời gian; bảng phụ ghi bài toán thực tế."
        ];
      }
      return [
        "Đồng hồ đeo tay có bấm giây; bảng ghi chép số liệu quãng đường và thời gian đi từ nhà đến trường.",
        "Sổ tay toán học ghi nhớ 3 công thức tính v, s, t."
      ];
    }

    // 1i. Toán đại trà / Luyện tập chung
    if (type === "teacher") {
      return [
        "Bài giảng điện tử trình chiếu tình huống toán học thực tế của bài học, thước vẽ bảng chuyên dụng.",
        "Bảng phụ ghi hệ thống bài tập trọng tâm và sơ đồ tư duy tóm tắt phương pháp giải toán."
      ];
    }
    return [
      "Thước thẳng có vạch chia mm chính xác, ê-ke đo góc theo yêu cầu bài học.",
      "Sổ tay toán học ghi lại quy tắc và các bước giải toán."
    ];
  }

  // 2. MÔN TIẾNG VIỆT
  if (subLower.includes("tiếng việt") || subLower === "tv" || subLower.includes("tctv")) {
    // 2a. Bài Đọc: Hang Sơn Đoòng - Những điều kì thú (Tuần 6)
    if (titleLower.includes("hang sơn đoòng") || titleLower.includes("sơn đoòng")) {
      if (type === "teacher") {
        return [
          "Video clip ngắn và tranh ảnh màu khổ lớn về vẻ đẹp kì vĩ của Hang Sơn Đoòng (thạch nhũ nghìn năm, sông ngầm, hố sụt thiên nhiên, vườn địa đàng trong hang).",
          "Bảng phụ ghi đoạn văn luyện đọc diễn cảm với kí hiệu ngắt nghỉ hơi dài và nhấn giọng ở các từ ngữ gợi tả sự kì vĩ; sơ đồ khái quát đặc điểm hang động."
        ];
      }
      return [
        "Đọc trước bài đọc ở nhà, tìm hiểu thông tin về Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha - Kẻ Bàng.",
        "Sổ tay văn học ghi lại các từ ngữ gợi cảm miêu tả hang động kì vĩ."
      ];
    }

    // 2b. Bài Đọc: Những hòn đảo trên vịnh Hạ Long (Tuần 6)
    if (titleLower.includes("vịnh hạ long") || titleLower.includes("hòn đảo")) {
      if (type === "teacher") {
        return [
          "Bản đồ du lịch và tranh ảnh toàn cảnh Vịnh Hạ Long, hình ảnh các hòn đảo đá độc đáo (hòn Trống Mái, đảo Ti Tốp, hòn Đỉnh Hương).",
          "File âm thanh giọng đọc mẫu chuẩn; bảng phụ ghi đoạn văn tả vẻ đẹp muôn hình vạn trạng của các đảo đá trên vịnh."
        ];
      }
      return [
        "Tranh ảnh hoặc bưu thiếp, tư liệu về Vịnh Hạ Long sưu tầm được.",
        "Đọc trước bài đọc ở nhà, tìm hiểu nghĩa các từ khó chú giải trong bài."
      ];
    }

    // 2c. LTVC: Từ đồng nghĩa / Luyện tập về từ đồng nghĩa (Tuần 5, Tuần 6)
    if (titleLower.includes("từ đồng nghĩa")) {
      if (type === "teacher") {
        return [
          "Bảng phụ chép đoạn văn ngữ liệu mẫu có các từ đồng nghĩa được in đậm (nhóm từ tả màu sắc: đỏ bừng, đỏ gay, đỏ ửng; nhóm từ chỉ sự hi sinh: mất, chết, quy tiên, hi sinh).",
          "Bài giảng điện tử mô phỏng sơ đồ phân loại từ đồng nghĩa hoàn toàn và không hoàn toàn; từ điển Tiếng Việt tiểu học."
        ];
      }
      return [
        "Từ điển Tiếng Việt tiểu học.",
        "Sổ tay ngữ văn ghi lại các cặp từ đồng nghĩa đã tìm được trong các bài đọc Tuần 5, Tuần 6."
      ];
    }

    // 2d. Viết: Mở bài và kết bài cho bài văn tả phong cảnh (Tuần 6)
    if (titleLower.includes("mở bài") || titleLower.includes("kết bài")) {
      if (type === "teacher") {
        return [
          "Bảng phụ chép 2 đoạn văn mở bài mẫu (mở bài trực tiếp và gián tiếp) và 2 đoạn kết bài mẫu (kết bài không mở rộng và mở rộng) cho đề bài tả phong cảnh.",
          "Sơ đồ tư duy hướng dẫn các cách dẫn dắt vào bài văn tả cảnh thiên nhiên; tiêu chí đánh giá mở bài, kết bài hay."
        ];
      }
      return [
        "Dàn ý bài văn tả cảnh đã lập ở tiết trước.",
        "Sổ tay văn học ghi chép các câu thơ, câu văn hay về cảnh đẹp thiên nhiên để vận dụng viết mở bài, kết bài."
      ];
    }

    // 2e. Viết: Quan sát phong cảnh (Tuần 6)
    if (titleLower.includes("quan sát phong cảnh") || titleLower.includes("quan sát")) {
      if (type === "teacher") {
        return [
          "Tranh ảnh phong cảnh thiên nhiên đa dạng (cảnh biển đảo, núi rừng, dòng sông, buổi sớm mùa thu).",
          "Bảng hướng dẫn các giác quan khi quan sát (thị giác, thính giác, khứu giác, xúc giác); bảng tiêu chí ghi chép chi tiết tiêu biểu."
        ];
      }
      return [
        "Sổ tay quan sát, ghi chép nhanh các chi tiết về màu sắc, âm thanh, ánh sáng của một cảnh vật đã quan sát ở địa phương.",
        "Tranh ảnh cảnh đẹp quê hương sưu tầm được."
      ];
    }

    // 2f. Nói và nghe: Bảo tồn động vật hoang dã (Tuần 6)
    if (titleLower.includes("bảo tồn động vật hoang dã") || titleLower.includes("động vật hoang dã")) {
      if (type === "teacher") {
        return [
          "Tranh ảnh, video tư liệu về các loài động vật hoang dã quý hiếm ở Việt Nam (voọc mũi hếch, sao la, rùa biển, tê tê) và tình trạng nguy cấp cần bảo tồn.",
          "Bảng phụ ghi gợi ý các bước trình bày ý kiến trước tập thể; thông điệp tuyên truyền bảo vệ thiên nhiên."
        ];
      }
      return [
        "Thông tin, tranh ảnh sưu tầm về một loài động vật hoang dã em quan tâm.",
        "Sổ tay ghi lại các thông điệp kêu gọi bảo vệ động vật hoang dã."
      ];
    }

    // 2g. Các bài đọc tổng quát khác
    const isDoc = titleLower.includes("đọc") || subLower.includes("đọc");
    const isViet = titleLower.includes("viết") || subLower.includes("viết");
    const isLTVC = titleLower.includes("từ và câu") || titleLower.includes("ltvc") || subLower.includes("luyện từ");

    if (type === "teacher") {
      if (isDoc) {
        return [
          "Tranh ảnh minh họa bài đọc phóng to, file âm thanh giọng đọc mẫu chuẩn của nghệ sĩ.",
          "Bảng phụ ghi đoạn văn, khổ thơ hướng dẫn ngắt nghỉ và nhấn giọng diễn cảm."
        ];
      }
      if (isLTVC) {
        return [
          "Bảng phụ ghi câu văn và đoạn trích ngữ liệu mẫu trong văn bản, sơ đồ tư duy phân loại ngữ nghĩa.",
          "Bài giảng điện tử trình chiếu bài tập phân tích từ ngữ và câu; từ điển Tiếng Việt tiểu học."
        ];
      }
      if (isViet) {
        return [
          "Tranh ảnh gợi ý dàn ý, sơ đồ tư duy hướng dẫn cấu trúc đoạn văn, bài văn.",
          "Bảng phụ ghi tiêu chí đánh giá bài viết mẫu chuẩn và phiếu hướng dẫn tự chỉnh sửa bài viết."
        ];
      }
      return [
        "Tranh ảnh minh họa chủ điểm bài học, bảng phụ ngữ liệu thực hành diễn đạt."
      ];
    } else {
      if (isDoc) {
        return [
          "Đọc trước bài ở nhà, tranh ảnh hoặc tư liệu sưu tầm liên quan đến bài đọc.",
          "Sổ tay ghi chép các từ ngữ giàu hình ảnh trong văn bản."
        ];
      }
      if (isViet) {
        return [
          "Sổ tay ghi chép ý tưởng, tư liệu quan sát thực tế và vốn từ chọn lọc phục vụ viết bài."
        ];
      }
      return [
        "Tư liệu và ví dụ câu văn thực tế tìm được trong đời sống liên quan đến bài học."
      ];
    }
  }

  // 3. MÔN KHOA HỌC
  if (subLower.includes("khoa học") || subLower === "kh") {
    // 3a. Sự biến đổi hoá học của chất (Tuần 6)
    if (titleLower.includes("biến đổi hoá học") || titleLower.includes("biến đổi hóa học")) {
      if (type === "teacher") {
        return [
          "Dụng cụ và hóa chất làm thí nghiệm an toàn: nước cốt chanh, baking soda (hoặc muối ăn), cốc thủy tinh trong suốt, đĩa sứ, nến nhỏ, diêm, mảnh giấy trắng.",
          "Bài giảng điện tử mô phỏng sự biến đổi màu sắc, nhiệt độ, chất mới tạo thành; phiếu quy trình hướng dẫn các bước thí nghiệm an toàn."
        ];
      }
      return [
        "Mẫu vật thí nghiệm theo phân công nhóm (1 quả chanh, ít đường kính trắng, khăn lau tay).",
        "Sổ tay ghi chép kết quả quan sát hiện tượng thí nghiệm biến đổi hoá học."
      ];
    }

    // 3b. Ôn tập chủ đề Chất (Tuần 6)
    if (titleLower.includes("chủ đề chất") || (titleLower.includes("ôn tập") && titleLower.includes("chất"))) {
      if (type === "teacher") {
        return [
          "Sơ đồ tư duy tổng hợp chủ đề Chất (chất rắn, lỏng, khí; dung dịch, hỗn hợp; biến đổi vật lí và biến đổi hoá học).",
          "Bài giảng điện tử tương tác các câu hỏi thí nghiệm trực quan; bộ thẻ câu hỏi kiểm tra nhanh kiến thức."
        ];
      }
      return [
        "Sơ đồ tư duy tự vẽ tóm tắt chủ đề Chất.",
        "Sổ tay ghi nhớ các quy tắc an toàn khi tiếp xúc với các chất trong gia đình."
      ];
    }

    // 3c. Năng lượng & Điện
    if (titleLower.includes("năng lượng") || titleLower.includes("điện") || titleLower.includes("mạch điện")) {
      if (type === "teacher") {
        return [
          "Bộ lắp ráp mạch điện đơn giản (pin 1.5V, bóng đèn nhỏ, đui đèn, dây dẫn có kẹp cá sấu, công tắc).",
          "Vật mẫu dẫn điện và cách điện (đinh sắt, thìa nhôm, thước nhựa, mẩu gỗ, cao su); bài giảng điện tử mô phỏng dòng điện."
        ];
      }
      return [
        "Pin tiểu 1.5V, các vật liệu thử nghiệm dẫn điện theo phân công nhóm (thìa kim loại, mẩu gỗ khô, dây đồng).",
        "Sổ tay ghi chép sơ đồ mạch điện."
      ];
    }

    if (type === "teacher") {
      return [
        "Dụng cụ thí nghiệm theo bài học (cốc thủy tinh, nước, nhiệt kế, mẫu vật tự nhiên).",
        "Tranh ảnh, video mô phỏng quá trình tự nhiên và thí nghiệm khoa học an toàn."
      ];
    }
    return [
      "Mẫu vật tự nhiên đơn giản phục vụ bài học (mẫu đất, lá cây, hạt mầm, nước sạch) theo phân công nhóm.",
      "Sổ tay quan sát khoa học."
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
    // 4a. Dân cư và dân tộc ở Việt Nam (Tuần 6)
    if (titleLower.includes("dân cư") || titleLower.includes("dân tộc")) {
      if (type === "teacher") {
        return [
          "Bản đồ phân bố dân cư Việt Nam; bảng số liệu thống kê dân số các vùng miền đất nước.",
          "Bộ tranh ảnh trang phục, lễ hội truyền thống của các dân tộc anh em (Kinh, Tày, Mường, Thái, Ê-đê, Chăm, Khmer...); video clip giới thiệu tinh thần đại đoàn kết các dân tộc Việt Nam."
        ];
      }
      return [
        "Tranh ảnh hoặc tư liệu tìm hiểu về một dân tộc anh em sống ở địa phương hoặc vùng lân cận.",
        "Sổ tay địa lí ghi chép đặc điểm mật độ dân số vùng đồng bằng và miền núi."
      ];
    }

    if (type === "teacher") {
      return [
        "Bản đồ Địa lí tự nhiên / Hành chính Việt Nam, lược đồ trận đánh và sự kiện lịch sử chuyên đề.",
        "Tranh ảnh tư liệu di tích, hiện vật lịch sử, video tư liệu mở rộng."
      ];
    }
    return [
      "Tranh ảnh, tư liệu tìm hiểu trước về nhân vật, sự kiện lịch sử hoặc vùng đất trong bài học.",
      "Sổ tay ghi chép sự kiện lịch sử và mốc thời gian quan trọng."
    ];
  }

  // 5. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  if (subLower.includes("hđtn") || subLower.includes("trải nghiệm") || subLower.includes("hdtn")) {
    const isSHDC = titleLower.includes("dưới cờ") || titleLower.includes("shdc") || titleLower.includes("chào cờ");
    const isSHL = titleLower.includes("sinh hoạt lớp") || titleLower.includes("shl");

    // 5a. HĐTN Tiết 1: Sinh hoạt dưới cờ (SHDC) - Có tích hợp thảm họa thiên tai (Tuần 6 trở đi)
    if (isSHDC) {
      if (titleLower.includes("thảm họa") || titleLower.includes("hiểm họa") || titleLower.includes("gnrrth") || Number(grade) === 5) {
        if (type === "teacher") {
          return [
            "Hệ thống âm thanh, micro, cờ Tổ quốc phục vụ nghi lễ Chào cờ đầu tuần.",
            "Máy chiếu hoặc tranh ảnh khổ lớn so sánh hình ảnh cơn mưa dông tự nhiên trên hoang đảo và thảm họa vỡ đập ngập lụt cuốn trôi nhà cửa gia súc; video clip tình huống nhận diện rủi ro thiên tai tại địa bàn sông nước xã Tân Thạnh; cẩm nang kỹ năng phòng ngừa giảm nhẹ rủi ro thảm họa cho học sinh tiểu học; bảng phụ 4 tình huống phân loại hiểm họa - thảm họa."
          ];
        }
        return [
          "Trang phục học sinh chỉnh tề, khăn quàng đỏ.",
          "Sổ tay ghi chép an toàn thiên tai; phiếu quan sát thực tế tình hình ngập nước, bờ kênh rạch tại khu dân cư nơi sinh sống ở xã Tân Thạnh."
        ];
      }
      if (type === "teacher") {
        return [
          "Hệ thống âm thanh, micro, cờ Tổ quốc phục vụ nghi lễ Chào cờ đầu tuần.",
          "Sổ theo dõi nền nếp lớp, bài phát động thi đua theo chủ đề tuần của Liên đội và BGH nhà trường."
        ];
      }
      return [
        "Trang phục học sinh chỉnh tề, sạch đẹp (áo đồng phục trắng, khăn quàng đỏ, bảng tên, mũ/ghế ngồi theo quy định)."
      ];
    }

    // 5b. HĐTN Tiết 3: Sinh hoạt lớp (SHL) - Tích hợp An toàn giao thông
    if (isSHL) {
      if (type === "teacher") {
        return [
          "Sổ chủ nhiệm, bảng tổng hợp điểm thi đua các tổ trong tuần, phương hướng tuần học tiếp theo.",
          "Tài liệu Giáo dục An toàn giao thông: Tranh ảnh tình huống giao thông thực tế (đi bộ trên đường không có vỉa hè, sang đường ở nơi không có vạch kẻ đường, đi bộ qua đường đê/bờ kênh); video clip tuyên truyền văn hóa giao thông an toàn."
        ];
      }
      return [
        "Sổ theo dõi thi đua của tổ trưởng.",
        "Tranh ảnh hoặc câu chuyện về hành vi đi bộ sang đường an toàn quan sát được trên đường đi học."
      ];
    }

    // 5c. HĐTN Hoạt động giáo dục theo chủ đề
    if (type === "teacher") {
      return [
        "Bài giảng điện tử trình chiếu tình huống trải nghiệm, video clip câu chuyện chủ đề tuần.",
        "Bảng phụ ghi các bước thực hành kỹ năng và tiêu chí đánh giá sản phẩm trải nghiệm."
      ];
    }
    return [
      "Sổ tay Đội viên ghi chép nội dung sinh hoạt; vật liệu thực hành theo phân công nhóm (trang phục, vật dụng sắm vai)."
    ];
  }

  // 6. MÔN ĐẠO ĐỨC
  if (subLower.includes("đạo đức") || subLower === "đđ") {
    if (type === "teacher") {
      return [
        "Video clip tình huống đạo đức thực tế trong đời sống, tranh ảnh câu chuyện đạo đức gắn với bài học.",
        "Bảng phụ ghi các tình huống xử lí và thang tiêu chí hành vi tích cực."
      ];
    }
    return [
      "Sổ tay rèn luyện thói quen tốt; ghi nhớ các câu chuyện, việc làm tích cực bản thân đã quan sát hoặc thực hiện liên quan đến bài học."
    ];
  }

  // 7. MÔN CÔNG NGHỆ
  if (subLower.includes("công nghệ") || subLower === "cn") {
    if (type === "teacher") {
      return [
        "Vật mẫu sản phẩm công nghệ thực tế (đèn bàn, quạt điện, mô hình kĩ thuật); video quy trình kĩ thuật an toàn.",
        "Bộ lắp ghép mô hình kĩ thuật mẫu, dụng cụ thao tác an toàn."
      ];
    }
    return [
      "Bộ lắp ghép mô hình kĩ thuật / vật liệu thực hành theo phân công nhóm (chậu nhỏ, hạt giống, giá thể hoặc dụng cụ lắp ghép)."
    ];
  }

  // 8. MÔN TIN HỌC
  if (subLower.includes("tin học") || subLower === "th") {
    if (type === "teacher") {
      return [
        "Phòng máy tính kết nối mạng an toàn, máy chiếu; bài giảng tương tác mô phỏng thao tác phần mềm.",
        "Tệp dữ liệu thực hành mẫu trên máy chủ giáo viên."
      ];
    }
    return [
      "Máy tính thực hành tại phòng máy (2 em/máy), sổ tay ghi nhớ phím tắt và quy tắc an toàn thông tin."
    ];
  }

  // 9. MÔN GIÁO DỤC THỂ CHẤT (GDTC)
  if (subLower.includes("thể chất") || subLower.includes("gdtc") || subLower === "td") {
    if (type === "teacher") {
      return [
        "Còi chỉ huy, đồng hồ bấm giây, bóng tập, cờ đuôi nheo, vạch kẻ sân tập, đệm an toàn."
      ];
    }
    return [
      "Trang phục thể thao gọn gàng, giày thể thao bata đảm bảo an toàn vận động."
    ];
  }

  // 10. MÔN ÂM NHẠC
  if (subLower.includes("âm nhạc") || subLower === "an" || subLower.includes("nhạc")) {
    if (type === "teacher") {
      return [
        "Đàn phím điện tử (organ/piano), nhạc cụ gõ (thanh phách, song loan, trống nhỏ).",
        "File âm thanh/video bài hát chuẩn, bài giảng điện tử tương tác lời ca và nốt nhạc."
      ];
    }
    return [
      "Nhạc cụ gõ tự làm (thanh phách, cốc gõ tiết tấu, xúc xắc), động tác phụ họa bài hát."
    ];
  }

  // 11. MÔN MĨ THUẬT
  if (subLower.includes("mĩ thuật") || subLower.includes("mỹ thuật") || subLower === "mt") {
    if (type === "teacher") {
      return [
        "Tranh ảnh tác phẩm mĩ thuật mẫu của họa sĩ và học sinh, vật mẫu thực tế.",
        "Bảng hướng dẫn các bước thực hiện sản phẩm mĩ thuật và tiêu chí đánh giá tạo hình."
      ];
    }
    return [
      "Giấy vẽ A4, màu sáp / màu nước, đất nặn, kéo thủ công, keo dán theo yêu cầu bài học."
    ];
  }

  // 12. MÔN TIẾNG ANH
  if (subLower.includes("tiếng anh") || subLower.includes("anh văn") || subLower === "ta") {
    if (type === "teacher") {
      return [
        "Thẻ từ vựng số (digital flashcards), file nghe audio chuẩn người bản xứ, loa phát thanh.",
        "Bài giảng điện tử tương tác trò chơi ngôn ngữ, tranh tình huống giao tiếp chuẩn."
      ];
    }
    return [
      "Thẻ từ vựng mini do học sinh tự làm, sổ tay ghi chép mẫu câu giao tiếp Tiếng Anh."
    ];
  }

  // 13. TỰ NHIÊN VÀ XÃ HỘI (TNXH Khối 1-3)
  if (subLower.includes("tự nhiên") || subLower.includes("tnxh")) {
    if (type === "teacher") {
      return [
        "Tranh ảnh phóng to các bộ phận cơ thể hoặc cảnh vật tự nhiên, video tư liệu khoa học đời sống.",
        "Bảng phụ ghi câu hỏi đàm thoại và gợi ý quan sát nhận biết."
      ];
    }
    return [
      "Tranh ảnh hoặc mẫu vật thực tế đơn giản (lá cây, hoa, quả) theo phân công nhóm."
    ];
  }

  // Fallback mặc định
  if (type === "teacher") {
    return [
      "Bài giảng điện tử trình chiếu nội dung bài học, tranh ảnh/mô hình trực quan theo trọng tâm bài.",
      "Bảng phụ ghi bài tập thực hành và câu hỏi thảo luận."
    ];
  }
  return [
    "Đồ dùng học tập theo yêu cầu bài học (thước kẻ, bút vẽ hoặc vật liệu thực hành theo phân công)."
  ];
}

/**
 * Làm sạch một chuỗi hoặc mảng đồ dùng dạy học:
 * Loại bỏ triệt để các cụm từ SGK, vở bài tập, bảng con, phấn, nháp, giáo án...
 * và thay thế bằng các đồ dùng thiết yếu nếu chuỗi bị rỗng.
 */
export function cleanMaterialsList(
  materials: string[] | string | undefined | null,
  type: "teacher" | "student",
  subject = "",
  lessonTitle = "",
  grade: number | string = 5
): string[] {
  let list: string[] = [];

  if (Array.isArray(materials)) {
    list = materials;
  } else if (typeof materials === "string") {
    list = materials.split(";").map((s) => s.trim()).filter(Boolean);
  }

  // Làm sạch từng phần tử trong danh sách
  const cleaned: string[] = [];

  for (const raw of list) {
    if (!raw || !raw.trim()) continue;

    // Tách theo dấu phẩy hoặc chấm phẩy
    const segments = raw.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);
    const keptSegments: string[] = [];

    for (let seg of segments) {
      // Kiểm tra xem đoạn này có chứa từ cấm không
      let isForbidden = false;
      for (const pattern of FORBIDDEN_PATTERNS) {
        pattern.lastIndex = 0;
        if (pattern.test(seg)) {
          isForbidden = true;
          break;
        }
      }

      if (!isForbidden) {
        // Dọn dẹp khoảng trắng thừa và dấu chấm cuối đoạn
        seg = seg.replace(/[\.\s]+$/, "").trim();
        if (seg.length > 2) {
          keptSegments.push(seg);
        }
      }
    }

    if (keptSegments.length > 0) {
      cleaned.push(keptSegments.join(", ") + ".");
    }
  }

  // Nếu sau khi lọc danh sách bị rỗng hoặc không còn đồ dùng thiết yếu
  if (cleaned.length === 0) {
    return getSubjectEssentialMaterials(type, subject, lessonTitle, grade);
  }

  return cleaned;
}

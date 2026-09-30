/**
 * Tiện ích chuẩn hóa và làm sạch Đồ dùng dạy học và học liệu (Chuẩn bị của GV và HS)
 * Tuân thủ yêu cầu:
 * - TUYỆT ĐỐI KHÔNG GHI các đồ dùng đại trà, hiển nhiên:
 *   Sách giáo khoa, SGK, vở bài tập, vở BT, bút dạ, bảng con, phấn, nháp, kế hoạch bài dạy, giáo án...
 * - CHỈ GHI những vật liệu, thiết bị, học liệu thực sự cần thiết theo đặc thù từng môn và từng bài học cụ thể.
 */

// Các từ khóa đồ dùng đại trà cần loại bỏ tuyệt đối theo chỉ đạo chuyên môn
const FORBIDDEN_PATTERNS = [
  /sách\s+(giáo\s+khoa|học\s+sinh)[^\.,;\n]*/gi,
  /\bsgk\b[^\.,;\n]*/gi,
  /vở\s+(bài\s+tập|bt|thực\s+hành|ghi(\s+bài)?|rèn\s+chữ|tập\s+viết)[^\.,;\n]*/gi,
  /\bvở\s+bt\b[^\.,;\n]*/gi,
  /bảng\s+con[^\.,;\n]*/gi,
  /phấn[\/\-]bút\s*dạ[^\.,;\n]*/gi,
  /phấn(\s*[\/\-]\s*bút\s*dạ(\s+màu)?)?[^\.,;\n]*/gi,
  /bút\s+dạ(\s+màu)?[^\.,;\n]*/gi,
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
    const isGeometry =
      titleLower.includes("hình") ||
      titleLower.includes("góc") ||
      titleLower.includes("chu vi") ||
      titleLower.includes("diện tích") ||
      titleLower.includes("thể tích") ||
      titleLower.includes("tam giác") ||
      titleLower.includes("lập phương") ||
      titleLower.includes("hộp chữ nhật") ||
      titleLower.includes("đo góc") ||
      titleLower.includes("đường thẳng");

    if (type === "teacher") {
      if (isGeometry) {
        return [
          "Mô hình hình học trực quan, bộ thước vẽ bảng (thước thẳng, ê-ke, compa).",
          "Bài giảng điện tử mô phỏng hình ảnh không gian, phiếu bài tập thực hành nhóm."
        ];
      }
      return [
        "Bài giảng điện tử trình chiếu tình huống toán học thực tế, thước kẻ bảng.",
        "Thẻ số / bảng gài phân số, số thập phân, phiếu bài tập nhóm."
      ];
    } else {
      if (isGeometry) {
        return [
          "Thước thẳng chia vạch cm, ê-ke, compa, kéo thủ công và giấy màu ghép hình."
        ];
      }
      return [
        "Thước thẳng có vạch chia, ê-ke hoặc compa theo yêu cầu bài học."
      ];
    }
  }

  // 2. MÔN TIẾNG VIỆT
  if (subLower.includes("tiếng việt") || subLower === "tv" || subLower.includes("tctv")) {
    const isDoc = titleLower.includes("đọc") || subLower.includes("đọc");
    const isViet = titleLower.includes("viết") || subLower.includes("viết");
    const isLTVC = titleLower.includes("từ và câu") || titleLower.includes("ltvc") || subLower.includes("luyện từ");

    if (type === "teacher") {
      if (isDoc) {
        return [
          "Tranh ảnh minh họa bài đọc phóng to, file âm thanh giọng đọc mẫu chuẩn.",
          "Bảng phụ ghi đoạn văn, khổ thơ hướng dẫn ngắt nghỉ và nhấn giọng."
        ];
      }
      if (isLTVC) {
        return [
          "Bảng phụ ghi câu văn và đoạn trích ngữ liệu mẫu, thẻ từ ngữ.",
          "Phiếu học tập thảo luận nhóm phân loại từ ngữ."
        ];
      }
      if (isViet) {
        return [
          "Tranh ảnh gợi ý dàn ý, sơ đồ tư duy hướng dẫn cấu trúc đoạn văn, bài văn.",
          "Bảng phụ ghi tiêu chí đánh giá bài viết mẫu."
        ];
      }
      return [
        "Tranh ảnh minh họa chủ điểm bài học, thẻ từ ngữ, phiếu thảo luận nhóm."
      ];
    } else {
      if (isDoc) {
        return [
          "Tranh ảnh hoặc tư liệu sưu tầm liên quan đến bài đọc."
        ];
      }
      return [
        "Thẻ từ hoặc giấy ghi chú thảo luận nhóm."
      ];
    }
  }

  // 3. MÔN KHOA HỌC
  if (subLower.includes("khoa học") || subLower === "kh") {
    if (type === "teacher") {
      return [
        "Dụng cụ thí nghiệm theo bài học (cốc thủy tinh, nước, muối, đường, thìa, khay thí nghiệm).",
        "Tranh ảnh, video mô phỏng quá trình tự nhiên, phiếu thực hành nhóm."
      ];
    } else {
      return [
        "Mẫu vật và dụng cụ thí nghiệm đơn giản theo phân công nhóm (mẫu đất, lá cây, chai nhựa)."
      ];
    }
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
    if (type === "teacher") {
      return [
        "Bản đồ Địa lí tự nhiên / Hành chính Việt Nam, lược đồ trận đánh và sự kiện lịch sử.",
        "Tranh ảnh tư liệu di tích, hiện vật lịch sử, video tư liệu mở rộng."
      ];
    } else {
      return [
        "Thước kẻ, bút màu; tranh ảnh, tư liệu sưu tầm về sự kiện hoặc địa danh bài học."
      ];
    }
  }

  // 5. MÔN CÔNG NGHỆ
  if (subLower.includes("công nghệ") || subLower === "cn") {
    if (type === "teacher") {
      return [
        "Vật mẫu công nghệ thực tế (đèn bàn, quạt điện, mô hình xe...).",
        "Bộ lắp ghép mô hình kĩ thuật mẫu, dụng cụ thao tác (cờ-lê, tua-vít), video quy trình an toàn."
      ];
    } else {
      return [
        "Bộ lắp ghép mô hình kĩ thuật / vật liệu thực hành theo phân công nhóm (chậu nhỏ, hạt giống, giá thể)."
      ];
    }
  }

  // 6. MÔN ĐẠO ĐỨC
  if (subLower.includes("đạo đức") || subLower === "đđ") {
    if (type === "teacher") {
      return [
        "Video clip tình huống đạo đức thực tế, tranh ảnh câu chuyện đạo đức.",
        "Thẻ bày tỏ ý kiến (Đồng tình / Không đồng tình), phiếu xử lí tình huống."
      ];
    } else {
      return [
        "Thẻ bày tỏ thái độ (mặt cười / mặt mếu hoặc thẻ Đ / S), giấy ghi thông điệp."
      ];
    }
  }

  // 7. MÔN HOẠT ĐỘNG TRẢI NGHIỆM (HĐTN)
  if (subLower.includes("hđtn") || subLower.includes("trải nghiệm") || subLower.includes("hdtn")) {
    if (type === "teacher") {
      return [
        "Kế hoạch tuần, micro, loa, video clip chủ đề trải nghiệm.",
        "Cây hoa cảm xúc / hộp thư chia sẻ, bảng phụ tổ chức trò chơi tập thể."
      ];
    } else {
      return [
        "Khăn quàng đỏ; giấy màu, thiệp ghi lời nhắn chia sẻ cảm xúc."
      ];
    }
  }

  // 8. MÔN TIN HỌC
  if (subLower.includes("tin học") || subLower === "th") {
    if (type === "teacher") {
      return [
        "Phòng máy tính kết nối internet an toàn, bài giảng mô phỏng thao tác phần mềm.",
        "Tệp dữ liệu thực hành mẫu trên máy chủ."
      ];
    } else {
      return [
        "Máy tính thực hành tại phòng máy (2 em/máy), sổ tay ghi nhớ phím tắt."
      ];
    }
  }

  // 9. MÔN GIÁO DỤC THỂ CHẤT (GDTC)
  if (subLower.includes("thể chất") || subLower.includes("gdtc") || subLower === "td") {
    if (type === "teacher") {
      return [
        "Còi chỉ huy, đồng hồ bấm giây, bóng tập, cờ đuôi nheo, vạch kẻ sân tập, đệm an toàn."
      ];
    } else {
      return [
        "Trang phục thể thao gọn gàng, giày thể thao bata đảm bảo an toàn vận động."
      ];
    }
  }

  // 10. MÔN ÂM NHẠC
  if (subLower.includes("âm nhạc") || subLower === "an" || subLower.includes("nhạc")) {
    if (type === "teacher") {
      return [
        "Đàn phím điện tử (organ/piano), nhạc cụ gõ (thanh phách, song loan, trống nhỏ).",
        "File âm thanh/video bài hát chuẩn, bài giảng điện tử tương tác."
      ];
    } else {
      return [
        "Nhạc cụ gõ tự làm (thanh phách, cốc gõ tiết tấu, xúc xắc), động tác phụ họa."
      ];
    }
  }

  // 11. MÔN MĨ THUẬT
  if (subLower.includes("mĩ thuật") || subLower.includes("mỹ thuật") || subLower === "mt") {
    if (type === "teacher") {
      return [
        "Tranh ảnh mẫu của họa sĩ và học sinh, vật mẫu thực tế.",
        "Bảng hướng dẫn các bước thực hiện sản phẩm mĩ thuật."
      ];
    } else {
      return [
        "Giấy vẽ A4, màu vẽ (sáp màu, màu nước), đất nặn, kéo thủ công, keo dán."
      ];
    }
  }

  // 12. MÔN TIẾNG ANH
  if (subLower.includes("tiếng anh") || subLower.includes("anh văn") || subLower === "ta") {
    if (type === "teacher") {
      return [
        "Thẻ từ vựng (flashcards), file nghe audio chuẩn người bản xứ, loa phát thanh.",
        "Phiếu trò chơi ngôn ngữ, tranh tình huống giao tiếp."
      ];
    } else {
      return [
        "Thẻ từ vựng mini (word cards), bút màu vẽ tranh minh họa từ vựng."
      ];
    }
  }

  // 13. TỰ NHIÊN VÀ XÃ HỘI (TNXH Khối 1-3)
  if (subLower.includes("tự nhiên") || subLower.includes("tnxh")) {
    if (type === "teacher") {
      return [
        "Tranh ảnh phóng to các bộ phận cơ thể hoặc cảnh vật tự nhiên, video tư liệu.",
        "Phiếu học tập nhóm quan sát nhận biết."
      ];
    } else {
      return [
        "Tranh ảnh hoặc mẫu vật thực tế đơn giản (lá cây, hoa) theo phân công."
      ];
    }
  }

  // Fallback mặc định
  if (type === "teacher") {
    return [
      "Bài giảng điện tử trình chiếu nội dung bài học, tranh ảnh/mô hình trực quan.",
      "Phiếu học tập nhóm và đồ dùng dạy học theo bài học."
    ];
  } else {
    return [
      "Đồ dùng học tập theo yêu cầu bài học (thước kẻ, bút màu hoặc vật liệu thực hành)."
    ];
  }
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

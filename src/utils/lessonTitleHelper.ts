/**
 * Utility to clean lesson titles and normalize activity names for Lesson Plans (KHBD),
 * Schedule View (LBG), and Word Export:
 * - Bỏ không cần ghi lớp mấy (loại bỏ "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5", "Khối 1-5"...)
 * - Bỏ từ "bài học" của mỗi tiết (loại bỏ tiền tố "Bài học: ", "BÀI HỌC: ", cụm "Bài học")
 * - Bỏ chữ "Môn: ...", "Môn Tiếng Việt: ..." ở tựa bài để chỉ ghi trọn vẹn tên bài học
 * - Chuẩn hóa tên 4 hoạt động dạy học theo CV 2345/BGDĐT mẫu mới:
 *   + 1. Hoạt động mở đầu (thay cho Khởi động)
 *   + 2. Hình thành kiến thức mới (thay cho Khám phá)
 *   + 3. Luyện tập - Thực hành
 *   + 4. Vận dụng & trải nghiệm (thay cho Vận dụng)
 */
export function cleanLessonTitle(title: string | undefined | null): string {
  if (!title) return "";
  let res = title;

  // 1. Loại bỏ tiền tố "Môn: ...", "Môn [Tên môn]: "
  res = res.replace(/^môn\s*[:–-]\s*/i, "");
  res = res.replace(/^môn\s+[^:–-]+[:–-]\s*/i, "");

  // 2. Loại bỏ tiền tố hoặc cụm từ "Bài học:", "BÀI HỌC:", "Bài học -" hoặc "Bài học "
  res = res.replace(/^bài\s+học\s*[:–-]?\s*/i, "");
  res = res.replace(/\bbài\s+học\s*[:–-]?\s*/gi, "");
  res = res.replace(/\bbài\s+học\b/gi, "");

  // 3. Loại bỏ thông tin khối lớp (Lớp 1, Lớp 2, Lớp 3, Lớp 4, Lớp 5, Khối 1-5, Lớp 1A... Lớp 5E)
  res = res.replace(/\s*[-–:]\s*lớp\s*[1-5][A-Za-z]?\s*[-–:]\s*/gi, " - ");
  res = res.replace(/\s*[-–:]\s*lớp\s*[1-5][A-Za-z]?\b/gi, "");
  res = res.replace(/\blớp\s*[1-5][A-Za-z]?\s*[-–:]\s*/gi, "");
  res = res.replace(/\blớp\s*[1-5][A-Za-z]?\b/gi, "");

  res = res.replace(/\s*[-–:]\s*khối\s*[1-5]\s*[-–:]\s*/gi, " - ");
  res = res.replace(/\s*[-–:]\s*khối\s*[1-5]\b/gi, "");
  res = res.replace(/\bkhối\s*[1-5]\s*[-–:]\s*/gi, "");
  res = res.replace(/\bkhối\s*[1-5]\b/gi, "");

  // 4. Chuẩn hóa dấu phân cách và khoảng trắng thừa
  res = res.replace(/\s*-\s*-\s*/g, " - ");
  res = res.replace(/\s*:\s*:\s*/g, ": ");
  res = res.replace(/\s{2,}/g, " ").trim();
  res = res.replace(/^[-–:,\s]+/, "").replace(/[-–:,\s]+$/, "").trim();

  // 5. Chuẩn hóa tên bài HĐTN theo yêu cầu: HĐTN - SHDC: ... và HĐTN - SHL: ...
  res = res.replace(/^sinh\s+hoạt\s+dưới\s+cờ\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^shdc\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^hđtn\s*\(shdc\)\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^hdtn\s*\(shdc\)\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^hđtn\s*\(cc\)\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^hđtn\s*[-–]\s*shdc\s*[:–-]?\s*/i, "HĐTN - SHDC: ");
  res = res.replace(/^hđtn\s*:\s*shdc\s*[:–-]?\s*/i, "HĐTN - SHDC: ");

  res = res.replace(/^sinh\s+hoạt\s+lớp\s*[:–-]?\s*/i, "HĐTN - SHL: ");
  res = res.replace(/^shl\s*[:–-]?\s*/i, "HĐTN - SHL: ");
  res = res.replace(/^hđtn\s*\(shl\)\s*[:–-]?\s*/i, "HĐTN - SHL: ");
  res = res.replace(/^hdtn\s*\(shl\)\s*[:–-]?\s*/i, "HĐTN - SHL: ");
  res = res.replace(/^hđtn\s*[-–]\s*shl\s*[:–-]?\s*/i, "HĐTN - SHL: ");
  res = res.replace(/^hđtn\s*:\s*shl\s*[:–-]?\s*/i, "HĐTN - SHL: ");

  return res;
}

/**
 * Kiểm tra xem bài dạy có phải là Tiết 2, 3, 4... của bài học kéo dài nhiều tiết hay không.
 * Quy định chuyên môn: Học sinh chỉ rút bài học ghi vở 1 lần (ở tiết 1 hoặc bài 1 tiết).
 * Tuyệt đối không cho học sinh ghi vào các tiết 2, 3, 4 của bài dạy có 2, 3, 4 tiết.
 */
export function isLaterPeriodOfMultiPeriodLesson(title: string | undefined | null): boolean {
  if (!title) return false;
  return /(?:tiết|t)\s*([2-4])(?:\s*[\/\-]\s*\d+)?(?:\)|$|\s)/i.test(title);
}

/**
 * Chuẩn hóa tên môn học trong KHBD:
 * - Ghi "Toán", "Tiếng Việt", "Đạo đức", "Khoa học", "Lịch sử và Địa lí", "HĐTN"...
 * - Tuyệt đối không ghi chữ "Môn", không ghi "Môn: ...", không ghi số khối lớp ("Toán 5" -> "Toán")
 */
export function cleanSubjectName(subject: string | undefined | null): string {
  if (!subject) return "";
  let s = subject.trim();
  // Loại bỏ tiền tố "Môn: ", "Môn ", "môn: ", "môn "
  s = s.replace(/^môn\s*[:–-]?\s*/i, "");
  // Loại bỏ số lớp phía sau (Toán 5 -> Toán, Tiếng Việt 5 -> Tiếng Việt)
  s = s.replace(/\s*[1-5]\b/g, "");
  s = s.replace(/\s+/g, " ").trim();

  const lower = s.toLowerCase();
  if (lower === "toán" || lower === "toan" || lower === "t") return "Toán";
  if (lower === "tiếng việt" || lower === "tieng viet" || lower === "tv") return "Tiếng Việt";
  if (lower === "đạo đức" || lower === "dao duc" || lower === "đđ" || lower === "dd") return "Đạo đức";
  if (lower === "khoa học" || lower === "khoa hoc" || lower === "kh") return "Khoa học";
  if (lower.includes("lịch sử") || lower.includes("địa lí") || lower.includes("địa lý") || lower.includes("ls-đl") || lower.includes("lsđl")) return "Lịch sử và Địa lí";
  if (lower === "hoạt động trải nghiệm" || lower === "hđtn" || lower === "hdtn") return "HĐTN";
  if (lower === "tin học" || lower === "th") return "Tin học";
  if (lower === "công nghệ" || lower === "cn") return "Công nghệ";
  if (lower === "tiếng anh" || lower === "ta") return "Tiếng Anh";
  if (lower === "âm nhạc" || lower === "an") return "Âm nhạc";
  if (lower === "mĩ thuật" || lower === "mt") return "Mĩ thuật";
  if (lower === "giáo dục thể chất" || lower === "gdtc") return "Giáo dục thể chất";
  if (lower.includes("kĩ năng sống") || lower.includes("kỹ năng sống") || lower === "kns") return "Kĩ năng sống";
  if (lower.includes("thảm họa") || lower.includes("tham hoa") || lower.includes("rủi ro") || lower.includes("gnrrth")) return "Phòng ngừa và giảm nhẹ rủi ro thảm họa";

  return s;
}

/**
 * Chuẩn hóa tên hoạt động dạy học theo chỉ đạo mới:
 * 1. Khởi động -> Hoạt động mở đầu
 * 2. Khám phá -> Hình thành kiến thức mới
 * 3. Luyện tập / Thực hành -> Luyện tập - Thực hành
 * 4. Vận dụng -> Vận dụng & trải nghiệm
 */
export function normalizeActivityName(name: string | undefined | null): string {
  if (!name) return "";
  let res = name.trim();

  // Bỏ dấu sao ★ hoặc * ở đầu
  res = res.replace(/^[★\*\s•\-_]+/, "").trim();

  // Chuẩn hóa tên hoạt động theo mẫu KHBD Tuần 5
  if (/^1\./.test(res) || /khởi động|mở đầu/i.test(res)) {
    const timeMatch = res.match(/\(\s*\d+\s*phút\s*\)/i);
    const timeStr = timeMatch ? ` ${timeMatch[0]}` : "";
    return `1. Hoạt động mở đầu${timeStr}`;
  }
  if (/^2\./.test(res) || /khám phá|hình thành kiến thức/i.test(res)) {
    const timeMatch = res.match(/\(\s*\d+\s*phút\s*\)/i);
    const timeStr = timeMatch ? ` ${timeMatch[0]}` : "";
    return `2. Hoạt động hình thành kiến thức${timeStr}`;
  }
  if (/^3\./.test(res) || /luyện tập|thực hành/i.test(res)) {
    const timeMatch = res.match(/\(\s*\d+\s*phút\s*\)/i);
    const timeStr = timeMatch ? ` ${timeMatch[0]}` : "";
    return `3. Hoạt động luyện tập thực hành${timeStr}`;
  }
  if (/^4\./.test(res) || /vận dụng|trải nghiệm/i.test(res)) {
    const timeMatch = res.match(/\(\s*\d+\s*phút\s*\)/i);
    const timeStr = timeMatch ? ` ${timeMatch[0]}` : "";
    return `4. Hoạt động vận dụng trải nghiệm${timeStr}`;
  }

  return res;
}

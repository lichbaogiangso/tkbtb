import { LessonInfo } from "../gradeCurriculums";

// ============================================================================
// KẾ HOẠCH DẠY HỌC KHỐI 1 - NĂM HỌC 2026-2027 (KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// TRƯỜNG TIỂU HỌC TÂN THẠNH - TỔ KHỐI 1 (LỚP 1A1, 1A, 1B)
// ============================================================================

export interface Grade1LessonItem {
  title: string;
  sub?: string;
  period: number;
  integ?: string;
  ai?: string;
  digital?: string;
  stem?: string;
  env?: string;
  rights?: string;
}

// 1. MÔN TIẾNG VIỆT 1 (12 tiết/tuần x 35 tuần = 420 tiết/năm)
export const GRADE_1_TIENG_VIET: Record<number, Grade1LessonItem[]> = {
  1: [
    { title: "Làm quen với trường lớp, bạn bè, đồ dùng học tập (Tiết 1)", sub: "Làm quen", period: 1 },
    { title: "Làm quen với trường lớp, bạn bè, đồ dùng học tập (Tiết 2)", sub: "Làm quen", period: 2 },
    { title: "Làm quen với tư thế đọc viết nói nghe (Tiết 1)", sub: "Làm quen", period: 3 },
    { title: "Làm quen với tư thế đọc viết nói nghe (Tiết 2)", sub: "Làm quen", period: 4 },
    { title: "Làm quen với các nét viết cơ bản, các chữ số và dấu thanh (Tiết 1)", sub: "Nét cơ bản", period: 5 },
    { title: "Làm quen với các nét viết cơ bản, các chữ số và dấu thanh (Tiết 2)", sub: "Nét cơ bản", period: 6 },
    { title: "Làm quen với các nét viết cơ bản, các chữ số và dấu thanh (Tiết 3)", sub: "Nét cơ bản", period: 7 },
    { title: "Làm quen với các nét viết cơ bản, các chữ số và dấu thanh (Tiết 4)", sub: "Nét cơ bản", period: 8 },
    { title: "Làm quen với bảng chữ cái (Tiết 1)", sub: "Bảng chữ cái", period: 9 },
    { title: "Làm quen với bảng chữ cái (Tiết 2)", sub: "Bảng chữ cái", period: 10 },
    { title: "Ôn luyện viết các nét cơ bản, đọc âm (Tiết 1)", sub: "Ôn tập", period: 11 },
    { title: "Ôn luyện viết các nét cơ bản, đọc âm (Tiết 2)", sub: "Ôn tập", period: 12 },
  ],
  2: [
    { title: "Bài 1: A a (Tiết 1)", sub: "Âm vần", period: 13 },
    { title: "Bài 1: A a (Tiết 2)", sub: "Âm vần", period: 14 },
    { title: "Bài 2: B b. Dấu huyền (Tiết 1)", sub: "Âm vần", period: 15 },
    { title: "Bài 2: B b. Dấu huyền (Tiết 2)", sub: "Âm vần", period: 16 },
    { title: "Bài 3: C c. Dấu sắc (Tiết 1)", sub: "Âm vần", period: 17 },
    { title: "Bài 3: C c. Dấu sắc (Tiết 2)", sub: "Âm vần", period: 18 },
    { title: "Bài 4: E e, Ê ê (Tiết 1)", sub: "Âm vần", period: 19 },
    { title: "Bài 4: E e, Ê ê (Tiết 2)", sub: "Âm vần", period: 20 },
    { title: "Bài 5: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 21 },
    { title: "Bài 5: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 22 },
    { title: "Ôn đọc, viết (Tiết 1)", sub: "Ôn tập", period: 23 },
    { title: "Ôn đọc, viết (Tiết 2)", sub: "Ôn tập", period: 24 },
  ],
  3: [
    { title: "Bài 6: O o. Dấu hỏi (Tiết 1)", sub: "Âm vần", period: 25 },
    { title: "Bài 6: O o. Dấu hỏi (Tiết 2)", sub: "Âm vần", period: 26 },
    { title: "Bài 7: Ô ô. Dấu nặng (Tiết 1)", sub: "Âm vần", period: 27 },
    { title: "Bài 7: Ô ô. Dấu nặng (Tiết 2)", sub: "Âm vần", period: 28 },
    { title: "Bài 8: D d, Đ đ (Tiết 1)", sub: "Âm vần", period: 29 },
    { title: "Bài 8: D d, Đ đ (Tiết 2)", sub: "Âm vần", period: 30 },
    { title: "Bài 9: Ơ ơ. Dấu ngã (Tiết 1)", sub: "Âm vần", period: 31 },
    { title: "Bài 9: Ơ ơ. Dấu ngã (Tiết 2)", sub: "Âm vần", period: 32 },
    { title: "Bài 10: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 33, integ: "Không bắt buộc HS kể cả câu chuyện." },
    { title: "Bài 10: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 34 },
    { title: "Ôn tập: Luyện đọc, viết o, ô (Tiết 1)", sub: "Luyện đọc viết", period: 35 },
    { title: "Ôn tập: Luyện đọc, viết ơ, d, đ (Tiết 2)", sub: "Luyện đọc viết", period: 36 },
  ],
  4: [
    { title: "Bài 11: I i, K k (Tiết 1)", sub: "Âm vần", period: 37, digital: "2.2.CB1a; 4.1.CB1a; 4.2.CB1a: Nhận biết công nghệ số đơn giản để chia sẻ thông tin; nhận biết cách bảo vệ thiết bị số và dữ liệu cá nhân." },
    { title: "Bài 11: I i, K k (Tiết 2)", sub: "Âm vần", period: 38 },
    { title: "Bài 12: H h, L l (Tiết 1)", sub: "Âm vần", period: 39 },
    { title: "Bài 12: H h, L l (Tiết 2)", sub: "Âm vần", period: 40 },
    { title: "Bài 13: U u, Ư ư (Tiết 1)", sub: "Âm vần", period: 41 },
    { title: "Bài 13: U u, Ư ư (Tiết 2)", sub: "Âm vần", period: 42 },
    { title: "Bài 14: Ch ch, Kh kh (Tiết 1)", sub: "Âm vần", period: 43 },
    { title: "Bài 14: Ch ch, Kh kh (Tiết 2)", sub: "Âm vần", period: 44 },
    { title: "Bài 15: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 45 },
    { title: "Bài 15: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 46 },
    { title: "Ôn tập: Luyện đọc, viết i, k, h, l (Tiết 1)", sub: "Luyện đọc viết", period: 47 },
    { title: "Ôn tập: Luyện đọc, viết u, ư, ch, kh (Tiết 2)", sub: "Luyện đọc viết", period: 48 },
  ],
  5: [
    { title: "Bài 16: M m, N n (Tiết 1)", sub: "Âm vần", period: 49 },
    { title: "Bài 16: M m, N n (Tiết 2)", sub: "Âm vần", period: 50 },
    { title: "Bài 17: G g, Gi gi (Tiết 1)", sub: "Âm vần", period: 51, ai: "NLa: HS nêu ví dụ AI học từ hình ảnh do con người cung cấp để nhận biết vật nuôi gà, cá (video ngắn minh họa)." },
    { title: "Bài 17: G g, Gi gi (Tiết 2)", sub: "Âm vần", period: 52 },
    { title: "Bài 18: Gh gh, Nh nh (Tiết 1)", sub: "Âm vần", period: 53 },
    { title: "Bài 18: Gh gh, Nh nh (Tiết 2)", sub: "Âm vần", period: 54 },
    { title: "Bài 19: Ng ng, Ngh ngh (Tiết 1)", sub: "Âm vần", period: 55, digital: "2.2.CB1a, 4.1.CB1a, 4.2.CB1.a: Lựa chọn cách bảo vệ dữ liệu cá nhân và quyền riêng tư trong môi trường số." },
    { title: "Bài 19: Ng ng, Ngh ngh (Tiết 2)", sub: "Âm vần", period: 56 },
    { title: "Bài 20: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 57 },
    { title: "Bài 20: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 58 },
    { title: "Ôn tập: Luyện đọc, viết m, n, g, gi (Tiết 1)", sub: "Luyện đọc viết", period: 59 },
    { title: "Ôn tập: Luyện đọc, viết gh, nh, ng, ngh (Tiết 2)", sub: "Luyện đọc viết", period: 60 },
  ],
  6: [
    { title: "Bài 21: R r, S s (Tiết 1)", sub: "Âm vần", period: 61 },
    { title: "Bài 21: R r, S s (Tiết 2)", sub: "Âm vần", period: 62 },
    { title: "Bài 22: T t, Tr tr (Tiết 1)", sub: "Âm vần", period: 63 },
    { title: "Bài 22: T t, Tr tr (Tiết 2)", sub: "Âm vần", period: 64 },
    { title: "Bài 23: Th th, ia (Tiết 1)", sub: "Âm vần", period: 65 },
    { title: "Bài 23: Th th, ia (Tiết 2)", sub: "Âm vần", period: 66 },
    { title: "Bài 24: ua, ưa (Tiết 1)", sub: "Âm vần", period: 67 },
    { title: "Bài 24: ua, ưa (Tiết 2)", sub: "Âm vần", period: 68 },
    { title: "Bài 25: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 69 },
    { title: "Bài 25: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 70 },
    { title: "Ôn tập: Luyện đọc, viết r, s, t, tr (Tiết 1)", sub: "Luyện đọc viết", period: 71 },
    { title: "Ôn tập: Luyện đọc, viết th, ia, ua, ưa (Tiết 2)", sub: "Luyện đọc viết", period: 72 },
  ],
  7: [
    { title: "Bài 26: Ph ph, Qu qu (Tiết 1)", sub: "Âm vần", period: 73 },
    { title: "Bài 26: Ph ph, Qu qu (Tiết 2)", sub: "Âm vần", period: 74 },
    { title: "Bài 27: V v, X x (Tiết 1)", sub: "Âm vần", period: 75 },
    { title: "Bài 27: V v, X x (Tiết 2)", sub: "Âm vần", period: 76 },
    { title: "Bài 28: Y y (Tiết 1)", sub: "Âm vần", period: 77 },
    { title: "Bài 28: Y y (Tiết 2)", sub: "Âm vần", period: 78 },
    { title: "Bài 29: Luyện tập chính tả (Tiết 1)", sub: "Chính tả", period: 79 },
    { title: "Bài 29: Luyện tập chính tả (Tiết 2)", sub: "Chính tả", period: 80 },
    { title: "Bài 30: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 81, integ: "Không bắt buộc HS kể cả câu chuyện." },
    { title: "Bài 30: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 82 },
    { title: "Ôn tập: Luyện đọc, viết ph, qu, v, x (Tiết 1)", sub: "Luyện đọc viết", period: 83 },
    { title: "Ôn tập: Luyện viết đúng chính tả (Tiết 2)", sub: "Luyện viết", period: 84 },
  ],
  8: [
    { title: "Bài 31: an, ăn, ân (Tiết 1)", sub: "Âm vần", period: 85 },
    { title: "Bài 31: an, ăn, ân (Tiết 2)", sub: "Âm vần", period: 86 },
    { title: "Bài 32: on, ôn, ơn (Tiết 1)", sub: "Âm vần", period: 87 },
    { title: "Bài 32: on, ôn, ơn (Tiết 2)", sub: "Âm vần", period: 88 },
    { title: "Bài 33: en, ên, in, un (Tiết 1)", sub: "Âm vần", period: 89 },
    { title: "Bài 33: en, ên, in, un (Tiết 2)", sub: "Âm vần", period: 90 },
    { title: "Bài 34: am, ăm, âm (Tiết 1)", sub: "Âm vần", period: 91, env: "Giáo dục BVMT: HS biết giữ gìn và bảo vệ môi trường nơi các loài vật sinh sống." },
    { title: "Bài 34: am, ăm, âm (Tiết 2)", sub: "Âm vần", period: 92 },
    { title: "Bài 35: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 93 },
    { title: "Bài 35: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 94 },
    { title: "Ôn tập: Luyện đọc, viết an, ăn, ân, on, ôn, ơn (Tiết 1)", sub: "Luyện đọc viết", period: 95 },
    { title: "Ôn tập: Luyện đọc, viết en, ên, in, un, am, ăm, âm (Tiết 2)", sub: "Luyện đọc viết", period: 96 },
  ],
  9: [
    { title: "Bài 36: om, ôm, ơm (Tiết 1)", sub: "Âm vần", period: 97 },
    { title: "Bài 36: om, ôm, ơm (Tiết 2)", sub: "Âm vần", period: 98 },
    { title: "Bài 37: em, êm, im, um (Tiết 1)", sub: "Âm vần", period: 99 },
    { title: "Bài 37: em, êm, im, um (Tiết 2)", sub: "Âm vần", period: 100 },
    { title: "Bài 38: ai, ay, ây (Tiết 1)", sub: "Âm vần", period: 101 },
    { title: "Bài 38: ai, ay, ây (Tiết 2)", sub: "Âm vần", period: 102 },
    { title: "Bài 39: oi, ôi, ơi (Tiết 1)", sub: "Âm vần", period: 103 },
    { title: "Bài 39: oi, ôi, ơi (Tiết 2)", sub: "Âm vần", period: 104 },
    { title: "Bài 40: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 105 },
    { title: "Bài 40: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 106 },
    { title: "Ôn tập: Luyện đọc, viết om, ôm, ơm, em, êm, im, um (Tiết 1)", sub: "Luyện đọc viết", period: 107 },
    { title: "Ôn tập: Luyện đọc, viết ai, ay, ây, oi, ôi, ơi (Tiết 2)", sub: "Luyện đọc viết", period: 108 },
  ],
  10: [
    { title: "Bài 41: ui, ưi (Tiết 1)", sub: "Âm vần", period: 109, digital: "1.1.CB1a: Nhận biết được chức năng liên lạc của điện thoại, thư điện tử." },
    { title: "Bài 41: ui, ưi (Tiết 2)", sub: "Âm vần", period: 110 },
    { title: "Bài 42: ao, eo (Tiết 1)", sub: "Âm vần", period: 111 },
    { title: "Bài 42: ao, eo (Tiết 2)", sub: "Âm vần", period: 112 },
    { title: "Bài 43: au, âu, êu (Tiết 1)", sub: "Âm vần", period: 113 },
    { title: "Bài 43: au, âu, êu (Tiết 2)", sub: "Âm vần", period: 114 },
    { title: "Bài 44: iu, ưu (Tiết 1)", sub: "Âm vần", period: 115 },
    { title: "Bài 44: iu, ưu (Tiết 2)", sub: "Âm vần", period: 116 },
    { title: "Bài 45: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 117 },
    { title: "Bài 45: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 118 },
    { title: "Ôn tập: Luyện đọc, viết ui, ưi, ao, eo (Tiết 1)", sub: "Luyện đọc viết", period: 119 },
    { title: "Ôn tập: Luyện đọc, viết au, âu, êu, iu, ưu (Tiết 2)", sub: "Luyện đọc viết", period: 120 },
  ],
  11: [
    { title: "Bài 46: ac, ăc, âc (Tiết 1)", sub: "Âm vần", period: 121 },
    { title: "Bài 46: ac, ăc, âc (Tiết 2)", sub: "Âm vần", period: 122 },
    { title: "Bài 47: oc, ôc, uc, ưc (Tiết 1)", sub: "Âm vần", period: 123 },
    { title: "Bài 47: oc, ôc, uc, ưc (Tiết 2)", sub: "Âm vần", period: 124 },
    { title: "Bài 48: at, ăt, ât (Tiết 1)", sub: "Âm vần", period: 125 },
    { title: "Bài 48: at, ăt, ât (Tiết 2)", sub: "Âm vần", period: 126 },
    { title: "Bài 49: ot, ôt, ơt (Tiết 1)", sub: "Âm vần", period: 127, digital: "1.1.CB1b: Nhận biết được chức năng chơi trò chơi trên các thiết bị thông minh." },
    { title: "Bài 49: ot, ôt, ơt (Tiết 2)", sub: "Âm vần", period: 128 },
    { title: "Bài 50: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 129, ai: "NLa: HS nhận biết con người có cảm xúc thật; Robot chỉ thể hiện biểu cảm theo dữ liệu con người." },
    { title: "Bài 50: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 130 },
    { title: "Ôn tập: Luyện đọc, viết ac, ăc, âc, oc, ôc, uc, ưc (Tiết 1)", sub: "Luyện đọc viết", period: 131 },
    { title: "Ôn tập: Luyện đọc, viết at, ăt, ât, ot, ôt, ơt (Tiết 2)", sub: "Luyện đọc viết", period: 132 },
  ],
  12: [
    { title: "Bài 51: et, êt, it (Tiết 1)", sub: "Âm vần", period: 133 },
    { title: "Bài 51: et, êt, it (Tiết 2)", sub: "Âm vần", period: 134 },
    { title: "Bài 52: ut, ưt (Tiết 1)", sub: "Âm vần", period: 135 },
    { title: "Bài 52: ut, ưt (Tiết 2)", sub: "Âm vần", period: 136 },
    { title: "Bài 53: ap, ăp, âp (Tiết 1)", sub: "Âm vần", period: 137, digital: "1.1.CB1b: Nhận biết được chức năng thông tin trên ti vi." },
    { title: "Bài 53: ap, ăp, âp (Tiết 2)", sub: "Âm vần", period: 138 },
    { title: "Bài 54: op, ôp, ơp (Tiết 1)", sub: "Âm vần", period: 139 },
    { title: "Bài 54: op, ôp, ơp (Tiết 2)", sub: "Âm vần", period: 140 },
    { title: "Bài 55: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 141 },
    { title: "Bài 55: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 142 },
    { title: "Ôn tập: Luyện đọc, viết et, êt, it, ut, ưt (Tiết 1)", sub: "Luyện đọc viết", period: 143 },
    { title: "Ôn tập: Luyện đọc, viết ap, ăp, âp, op, ôp, ơp (Tiết 2)", sub: "Luyện đọc viết", period: 144 },
  ],
  13: [
    { title: "Bài 56: ep, êp, ip, up (Tiết 1)", sub: "Âm vần", period: 145 },
    { title: "Bài 56: ep, êp, ip, up (Tiết 2)", sub: "Âm vần", period: 146 },
    { title: "Bài 57: anh, ênh, inh (Tiết 1)", sub: "Âm vần", period: 147 },
    { title: "Bài 57: anh, ênh, inh (Tiết 2)", sub: "Âm vần", period: 148 },
    { title: "Bài 58: ach, êch, ich (Tiết 1)", sub: "Âm vần", period: 149, digital: "1.1.CB1b: Nhận biết chức năng xem lịch trên điện thoại, máy tính." },
    { title: "Bài 58: ach, êch, ich (Tiết 2)", sub: "Âm vần", period: 150 },
    { title: "Bài 59: ang, ăng, âng (Tiết 1)", sub: "Âm vần", period: 151 },
    { title: "Bài 59: ang, ăng, âng (Tiết 2)", sub: "Âm vần", period: 152 },
    { title: "Bài 60: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 153 },
    { title: "Bài 60: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 154 },
    { title: "Ôn tập: Luyện đọc, viết ep, êp, ip, up, anh, ênh, inh (Tiết 1)", sub: "Luyện đọc viết", period: 155 },
    { title: "Ôn tập: Luyện đọc, viết ach, êch, ich, ang, ăng, âng (Tiết 2)", sub: "Luyện đọc viết", period: 156 },
  ],
  14: [
    { title: "Bài 61: ong, ông, ung, ưng (Tiết 1)", sub: "Âm vần", period: 157 },
    { title: "Bài 61: ong, ông, ung, ưng (Tiết 2)", sub: "Âm vần", period: 158 },
    { title: "Bài 62: iêc, iên, iêp (Tiết 1)", sub: "Âm vần", period: 159 },
    { title: "Bài 62: iêc, iên, iêp (Tiết 2)", sub: "Âm vần", period: 160 },
    { title: "Bài 63: iêng, iêm, yên (Tiết 1)", sub: "Âm vần", period: 161 },
    { title: "Bài 63: iêng, iêm, yên (Tiết 2)", sub: "Âm vần", period: 162 },
    { title: "Bài 64: iêt, iêu, yêu (Tiết 1)", sub: "Âm vần", period: 163 },
    { title: "Bài 64: iêt, iêu, yêu (Tiết 2)", sub: "Âm vần", period: 164 },
    { title: "Bài 65: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 165 },
    { title: "Bài 65: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 166 },
    { title: "Ôn tập: Luyện đọc, viết ong, ông, ung, ưng, iêc, iên, iêp (Tiết 1)", sub: "Luyện đọc viết", period: 167 },
    { title: "Ôn tập: Luyện đọc, viết iêng, iêm, yên, iêt, iêu, yêu (Tiết 2)", sub: "Luyện đọc viết", period: 168 },
  ],
  15: [
    { title: "Bài 66: uôi, uôm (Tiết 1)", sub: "Âm vần", period: 169 },
    { title: "Bài 66: uôi, uôm (Tiết 2)", sub: "Âm vần", period: 170 },
    { title: "Bài 67: uôc, uôt (Tiết 1)", sub: "Âm vần", period: 171 },
    { title: "Bài 67: uôc, uôt (Tiết 2)", sub: "Âm vần", period: 172 },
    { title: "Bài 68: uôn, uông (Tiết 1)", sub: "Âm vần", period: 173 },
    { title: "Bài 68: uôn, uông (Tiết 2)", sub: "Âm vần", period: 174 },
    { title: "Bài 69: ươi, ươu (Tiết 1)", sub: "Âm vần", period: 175 },
    { title: "Bài 69: ươi, ươu (Tiết 2)", sub: "Âm vần", period: 176 },
    { title: "Bài 70: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 177 },
    { title: "Bài 70: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 178 },
    { title: "Ôn tập: Luyện đọc, viết uôi, uôm, uôc, uôt (Tiết 1)", sub: "Luyện đọc viết", period: 179 },
    { title: "Ôn tập: Luyện đọc, viết uôn, uông, ươi, ươu (Tiết 2)", sub: "Luyện đọc viết", period: 180 },
  ],
  16: [
    { title: "Bài 71: ươc, ươt (Tiết 1)", sub: "Âm vần", period: 181 },
    { title: "Bài 71: ươc, ươt (Tiết 2)", sub: "Âm vần", period: 182 },
    { title: "Bài 72: ươm, ươp (Tiết 1)", sub: "Âm vần", period: 183 },
    { title: "Bài 72: ươm, ươp (Tiết 2)", sub: "Âm vần", period: 184 },
    { title: "Bài 73: ươn, ương (Tiết 1)", sub: "Âm vần", period: 185 },
    { title: "Bài 73: ươn, ương (Tiết 2)", sub: "Âm vần", period: 186 },
    { title: "Bài 74: oa, oe (Tiết 1)", sub: "Âm vần", period: 187 },
    { title: "Bài 74: oa, oe (Tiết 2)", sub: "Âm vần", period: 188 },
    { title: "Bài 75: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 189 },
    { title: "Bài 75: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 190 },
    { title: "Ôn tập: Luyện đọc, viết ươc, ươt, ươm, ươp (Tiết 1)", sub: "Luyện đọc viết", period: 191 },
    { title: "Ôn tập: Luyện đọc, viết ươn, ương, oa, oe (Tiết 2)", sub: "Luyện đọc viết", period: 192 },
  ],
  17: [
    { title: "Bài 76: oan, oăn, oat, oăt (Tiết 1)", sub: "Âm vần", period: 193 },
    { title: "Bài 76: oan, oăn, oat, oăt (Tiết 2)", sub: "Âm vần", period: 194 },
    { title: "Bài 77: oai, uê, uy (Tiết 1)", sub: "Âm vần", period: 195 },
    { title: "Bài 77: oai, uê, uy (Tiết 2)", sub: "Âm vần", period: 196 },
    { title: "Bài 78: uân, uât (Tiết 1)", sub: "Âm vần", period: 197 },
    { title: "Bài 78: uân, uât (Tiết 2)", sub: "Âm vần", period: 198 },
    { title: "Bài 79: uyên, uyêt (Tiết 1)", sub: "Âm vần", period: 199 },
    { title: "Bài 79: uyên, uyêt (Tiết 2)", sub: "Âm vần", period: 200 },
    { title: "Bài 80: Ôn tập và kể chuyện (Tiết 1)", sub: "Ôn tập", period: 201 },
    { title: "Bài 80: Ôn tập và kể chuyện (Tiết 2)", sub: "Ôn tập", period: 202 },
    { title: "Ôn tập: Luyện đọc, viết oan, oăn, oat, oăt, oai, uê, uy (Tiết 1)", sub: "Luyện đọc viết", period: 203 },
    { title: "Ôn tập: Luyện đọc, viết uân, uât, uyên, uyêt (Tiết 2)", sub: "Luyện đọc viết", period: 204 },
  ],
  18: [
    { title: "Bài 81: Ôn tập (Tiết 1)", sub: "Ôn tập", period: 205 },
    { title: "Bài 81: Ôn tập (Tiết 2)", sub: "Ôn tập", period: 206 },
    { title: "Bài 82: Ôn tập (Tiết 1)", sub: "Ôn tập", period: 207 },
    { title: "Bài 82: Ôn tập (Tiết 2)", sub: "Ôn tập", period: 208 },
    { title: "Bài 83: Ôn tập (Tiết 1)", sub: "Ôn tập", period: 209 },
    { title: "Bài 83: Ôn tập (Tiết 2)", sub: "Ôn tập", period: 210 },
    { title: "Ôn tập: Luyện đọc, viết các chữ hoa (Tiết 1)", sub: "Chữ hoa", period: 211 },
    { title: "Ôn tập: Luyện đọc, viết các chữ hoa (Tiết 2)", sub: "Chữ hoa", period: 212 },
    { title: "Đánh giá cuối kì (Tiết 1)", sub: "Kiểm tra", period: 213 },
    { title: "Đánh giá cuối kì (Tiết 2)", sub: "Kiểm tra", period: 214 },
    { title: "Tổng kết học kì I (Tiết 1)", sub: "Tổng kết", period: 215 },
    { title: "Tổng kết học kì I (Tiết 2)", sub: "Tổng kết", period: 216 },
  ],
  // HỌC KỲ II (Tuần 19 đến Tuần 35)
  19: [
    { title: "Bài 1: Tôi là học sinh lớp 1 (Tiết 1)", sub: "Đọc - Viết", period: 217 },
    { title: "Bài 1: Tôi là học sinh lớp 1 (Tiết 2)", sub: "Đọc - Viết", period: 218 },
    { title: "Bài 1: Tôi là học sinh lớp 1 (Tiết 3)", sub: "Đọc - Viết", period: 219 },
    { title: "Bài 1: Tôi là học sinh lớp 1 (Tiết 4)", sub: "Nói và nghe", period: 220 },
    { title: "Bài 2: Đôi tai xấu xí (Tiết 1)", sub: "Đọc - Viết", period: 221, digital: "1.1.CB1b: Nhận biết chức năng định vị, xem bản đồ trên các thiết bị thông minh." },
    { title: "Bài 2: Đôi tai xấu xí (Tiết 2)", sub: "Đọc - Viết", period: 222 },
    { title: "Bài 2: Đôi tai xấu xí (Tiết 3)", sub: "Đọc - Viết", period: 223 },
    { title: "Bài 2: Đôi tai xấu xí (Tiết 4)", sub: "Nói và nghe", period: 224 },
    { title: "Bài 3: Bạn của gió (Tiết 1)", sub: "Đọc", period: 225 },
    { title: "Bài 3: Bạn của gió (Tiết 2)", sub: "Đọc", period: 226 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 227 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 228 },
  ],
  20: [
    { title: "Bài 4: Giải thưởng tình bạn (Tiết 1)", sub: "Đọc - Viết", period: 229 },
    { title: "Bài 4: Giải thưởng tình bạn (Tiết 2)", sub: "Đọc - Viết", period: 230 },
    { title: "Bài 4: Giải thưởng tình bạn (Tiết 3)", sub: "Đọc - Viết", period: 231 },
    { title: "Bài 4: Giải thưởng tình bạn (Tiết 4)", sub: "Nói và nghe", period: 232 },
    { title: "Bài 5: Sinh nhật của voi con (Tiết 1)", sub: "Đọc - Viết", period: 233 },
    { title: "Bài 5: Sinh nhật của voi con (Tiết 2)", sub: "Đọc - Viết", period: 234 },
    { title: "Bài 5: Sinh nhật của voi con (Tiết 3)", sub: "Đọc - Viết", period: 235 },
    { title: "Bài 5: Sinh nhật của voi con (Tiết 4)", sub: "Nói và nghe", period: 236 },
    { title: "Ôn tập chủ điểm Tôi và các bạn (Tiết 1)", sub: "Ôn tập", period: 237 },
    { title: "Ôn tập chủ điểm Tôi và các bạn (Tiết 2)", sub: "Ôn tập", period: 238 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 239 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 240 },
  ],
  21: [
    { title: "Bài 1: Nụ hôn trên đôi bàn tay (Tiết 1)", sub: "Đọc - Viết", period: 241 },
    { title: "Bài 1: Nụ hôn trên đôi bàn tay (Tiết 2)", sub: "Đọc - Viết", period: 242 },
    { title: "Bài 1: Nụ hôn trên đôi bàn tay (Tiết 3)", sub: "Đọc - Viết", period: 243 },
    { title: "Bài 1: Nụ hôn trên đôi bàn tay (Tiết 4)", sub: "Nói và nghe", period: 244 },
    { title: "Bài 2: Làm anh (Tiết 1)", sub: "Đọc", period: 245 },
    { title: "Bài 2: Làm anh (Tiết 2)", sub: "Đọc", period: 246 },
    { title: "Bài 3: Cả nhà đi chơi núi (Tiết 1)", sub: "Đọc - Viết", period: 247 },
    { title: "Bài 3: Cả nhà đi chơi núi (Tiết 2)", sub: "Đọc - Viết", period: 248 },
    { title: "Bài 3: Cả nhà đi chơi núi (Tiết 3)", sub: "Đọc - Viết", period: 249 },
    { title: "Bài 3: Cả nhà đi chơi núi (Tiết 4)", sub: "Nói và nghe", period: 250 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 251 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 252 },
  ],
  22: [
    { title: "Bài 4: Quạt cho bà ngủ (Tiết 1)", sub: "Đọc", period: 253 },
    { title: "Bài 4: Quạt cho bà ngủ (Tiết 2)", sub: "Đọc", period: 254 },
    { title: "Bài 5: Bữa cơm gia đình (Tiết 1)", sub: "Đọc - Viết", period: 255 },
    { title: "Bài 5: Bữa cơm gia đình (Tiết 2)", sub: "Đọc - Viết", period: 256 },
    { title: "Bài 5: Bữa cơm gia đình (Tiết 3)", sub: "Đọc - Viết", period: 257 },
    { title: "Bài 5: Bữa cơm gia đình (Tiết 4)", sub: "Nói và nghe", period: 258 },
    { title: "Bài 6: Ngôi nhà (Tiết 1)", sub: "Đọc", period: 259, digital: "1.1.CB1a: Nhận diện phân biệt được hình dạng và chức năng của các thiết bị, kỹ thuật số thông dụng." },
    { title: "Bài 6: Ngôi nhà (Tiết 2)", sub: "Đọc", period: 260 },
    { title: "Ôn tập chủ điểm Mái ấm gia đình (Tiết 1)", sub: "Ôn tập", period: 261 },
    { title: "Ôn tập chủ điểm Mái ấm gia đình (Tiết 2)", sub: "Ôn tập", period: 262 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 263 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 264 },
  ],
  23: [
    { title: "Bài 1: Tôi đi học (Tiết 1)", sub: "Đọc - Viết", period: 265 },
    { title: "Bài 1: Tôi đi học (Tiết 2)", sub: "Đọc - Viết", period: 266 },
    { title: "Bài 1: Tôi đi học (Tiết 3)", sub: "Đọc - Viết", period: 267 },
    { title: "Bài 1: Tôi đi học (Tiết 4)", sub: "Nói và nghe", period: 268 },
    { title: "Bài 2: Đi học (Tiết 1)", sub: "Đọc", period: 269 },
    { title: "Bài 2: Đi học (Tiết 2)", sub: "Đọc", period: 270 },
    { title: "Bài 3: Hoa yêu thương (Tiết 1)", sub: "Đọc - Viết", period: 271 },
    { title: "Bài 3: Hoa yêu thương (Tiết 2)", sub: "Đọc - Viết", period: 272 },
    { title: "Bài 3: Hoa yêu thương (Tiết 3)", sub: "Đọc - Viết", period: 273 },
    { title: "Bài 3: Hoa yêu thương (Tiết 4)", sub: "Nói và nghe", period: 274 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 275 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 276 },
  ],
  24: [
    { title: "Bài 4: Cây bàng và lớp học (Tiết 1)", sub: "Đọc", period: 277 },
    { title: "Bài 4: Cây bàng và lớp học (Tiết 2)", sub: "Đọc", period: 278 },
    { title: "Bài 5: Bác trống trường (Tiết 1)", sub: "Đọc - Viết", period: 279 },
    { title: "Bài 5: Bác trống trường (Tiết 2)", sub: "Đọc - Viết", period: 280 },
    { title: "Bài 5: Bác trống trường (Tiết 3)", sub: "Đọc - Viết", period: 281 },
    { title: "Bài 5: Bác trống trường (Tiết 4)", sub: "Nói và nghe", period: 282 },
    { title: "Bài 6: Giờ ra chơi (Tiết 1)", sub: "Đọc", period: 283 },
    { title: "Bài 6: Giờ ra chơi (Tiết 2)", sub: "Đọc", period: 284 },
    { title: "Ôn tập chủ điểm Mái trường mến yêu (Tiết 1)", sub: "Ôn tập", period: 285 },
    { title: "Ôn tập chủ điểm Mái trường mến yêu (Tiết 2)", sub: "Ôn tập", period: 286 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 287 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 288 },
  ],
  25: [
    { title: "Bài 1: Rửa tay trước khi ăn (Tiết 1)", sub: "Đọc - Viết", period: 289 },
    { title: "Bài 1: Rửa tay trước khi ăn (Tiết 2)", sub: "Đọc - Viết", period: 290 },
    { title: "Bài 1: Rửa tay trước khi ăn (Tiết 3)", sub: "Đọc - Viết", period: 291 },
    { title: "Bài 1: Rửa tay trước khi ăn (Tiết 4)", sub: "Nói và nghe", period: 292 },
    { title: "Bài 2: Lời chào (Tiết 1)", sub: "Đọc", period: 293 },
    { title: "Bài 2: Lời chào (Tiết 2)", sub: "Đọc", period: 294 },
    { title: "Bài 3: Khi mẹ vắng nhà (Tiết 1)", sub: "Đọc - Viết", period: 295 },
    { title: "Bài 3: Khi mẹ vắng nhà (Tiết 2)", sub: "Đọc - Viết", period: 296 },
    { title: "Bài 3: Khi mẹ vắng nhà (Tiết 3)", sub: "Đọc - Viết", period: 297 },
    { title: "Bài 3: Khi mẹ vắng nhà (Tiết 4)", sub: "Nói và nghe", period: 298 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 299 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 300 },
  ],
  26: [
    { title: "Bài 4: Nếu không may bị lạc (Tiết 1)", sub: "Đọc - Viết", period: 301 },
    { title: "Bài 4: Nếu không may bị lạc (Tiết 2)", sub: "Đọc - Viết", period: 302 },
    { title: "Bài 4: Nếu không may bị lạc (Tiết 3)", sub: "Đọc - Viết", period: 303 },
    { title: "Bài 4: Nếu không may bị lạc (Tiết 4)", sub: "Nói và nghe", period: 304 },
    { title: "Bài 5: Đèn giao thông (Tiết 1)", sub: "Đọc - Viết", period: 305, digital: "3.4.CB1a; 5.1.CB1b: Chuẩn mực hành vi khi dùng thiết bị số; chọn biện pháp an toàn bảo mật đơn giản." },
    { title: "Bài 5: Đèn giao thông (Tiết 2)", sub: "Đọc - Viết", period: 306 },
    { title: "Bài 5: Đèn giao thông (Tiết 3)", sub: "Đọc - Viết", period: 307 },
    { title: "Bài 5: Đèn giao thông (Tiết 4)", sub: "Nói và nghe", period: 308 },
    { title: "Ôn tập chủ điểm Điều em cần biết (Tiết 1)", sub: "Ôn tập", period: 309 },
    { title: "Ôn tập chủ điểm Điều em cần biết (Tiết 2)", sub: "Ôn tập", period: 310 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 311 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 312 },
  ],
  27: [
    { title: "Bài 1: Kiến và chim bồ câu (Tiết 1)", sub: "Đọc - Viết", period: 313 },
    { title: "Bài 1: Kiến và chim bồ câu (Tiết 2)", sub: "Đọc - Viết", period: 314 },
    { title: "Bài 1: Kiến và chim bồ câu (Tiết 3)", sub: "Đọc - Viết", period: 315 },
    { title: "Bài 1: Kiến và chim bồ câu (Tiết 4)", sub: "Nói và nghe", period: 316 },
    { title: "Bài 2: Câu chuyện của rễ (Tiết 1)", sub: "Đọc", period: 317 },
    { title: "Bài 2: Câu chuyện của rễ (Tiết 2)", sub: "Đọc", period: 318 },
    { title: "Bài 3: Câu hỏi của sói (Tiết 1)", sub: "Đọc - Viết", period: 319 },
    { title: "Bài 3: Câu hỏi của sói (Tiết 2)", sub: "Đọc - Viết", period: 320 },
    { title: "Bài 3: Câu hỏi của sói (Tiết 3)", sub: "Đọc - Viết", period: 321 },
    { title: "Bài 3: Câu hỏi của sói (Tiết 4)", sub: "Nói và nghe", period: 322 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 323 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 324 },
  ],
  28: [
    { title: "Bài 4: Chú bé chăn cừu (Tiết 1)", sub: "Đọc - Viết", period: 325 },
    { title: "Bài 4: Chú bé chăn cừu (Tiết 2)", sub: "Đọc - Viết", period: 326 },
    { title: "Bài 4: Chú bé chăn cừu (Tiết 3)", sub: "Đọc - Viết", period: 327 },
    { title: "Bài 4: Chú bé chăn cừu (Tiết 4)", sub: "Nói và nghe", period: 328 },
    { title: "Bài 5: Tiếng vọng của núi (Tiết 1)", sub: "Đọc - Viết", period: 329 },
    { title: "Bài 5: Tiếng vọng của núi (Tiết 2)", sub: "Đọc - Viết", period: 330 },
    { title: "Bài 5: Tiếng vọng của núi (Tiết 3)", sub: "Đọc - Viết", period: 331 },
    { title: "Bài 5: Tiếng vọng của núi (Tiết 4)", sub: "Nói và nghe", period: 332 },
    { title: "Ôn tập chủ điểm Bài học từ cuộc sống (Tiết 1)", sub: "Ôn tập", period: 333 },
    { title: "Ôn tập chủ điểm Bài học từ cuộc sống (Tiết 2)", sub: "Ôn tập", period: 334 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 335 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 336 },
  ],
  29: [
    { title: "Bài 1: Loài chim của biển cả (Tiết 1)", sub: "Đọc - Viết", period: 337 },
    { title: "Bài 1: Loài chim của biển cả (Tiết 2)", sub: "Đọc - Viết", period: 338 },
    { title: "Bài 1: Loài chim của biển cả (Tiết 3)", sub: "Đọc - Viết", period: 339 },
    { title: "Bài 1: Loài chim của biển cả (Tiết 4)", sub: "Nói và nghe", period: 340 },
    { title: "Bài 2: Bảy sắc cầu vồng (Tiết 1)", sub: "Đọc", period: 341, digital: "1.1.CB1b; 5.1.CB1b: Nhận biết một số chức năng của thiết bị kỹ thuật số thông dụng; an toàn đơn giản." },
    { title: "Bài 2: Bảy sắc cầu vồng (Tiết 2)", sub: "Đọc", period: 342 },
    { title: "Bài 3: Chúa tể rừng xanh (Tiết 1)", sub: "Đọc - Viết", period: 343 },
    { title: "Bài 3: Chúa tể rừng xanh (Tiết 2)", sub: "Đọc - Viết", period: 344 },
    { title: "Bài 3: Chúa tể rừng xanh (Tiết 3)", sub: "Đọc - Viết", period: 345 },
    { title: "Bài 3: Chúa tể rừng xanh (Tiết 4)", sub: "Nói và nghe", period: 346 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 347 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 348 },
  ],
  30: [
    { title: "Bài 4: Cuộc thi tài năng rừng xanh (Tiết 1)", sub: "Đọc - Viết", period: 349 },
    { title: "Bài 4: Cuộc thi tài năng rừng xanh (Tiết 2)", sub: "Đọc - Viết", period: 350 },
    { title: "Bài 4: Cuộc thi tài năng rừng xanh (Tiết 3)", sub: "Đọc - Viết", period: 351 },
    { title: "Bài 4: Cuộc thi tài năng rừng xanh (Tiết 4)", sub: "Nói và nghe", period: 352 },
    { title: "Bài 5: Cây liễu dẻo dai (Tiết 1)", sub: "Đọc - Viết", period: 353 },
    { title: "Bài 5: Cây liễu dẻo dai (Tiết 2)", sub: "Đọc - Viết", period: 354 },
    { title: "Bài 5: Cây liễu dẻo dai (Tiết 3)", sub: "Đọc - Viết", period: 355 },
    { title: "Bài 5: Cây liễu dẻo dai (Tiết 4)", sub: "Nói và nghe", period: 356 },
    { title: "Ôn tập chủ điểm Thiên nhiên kì thú (Tiết 1)", sub: "Ôn tập", period: 357 },
    { title: "Ôn tập chủ điểm Thiên nhiên kì thú (Tiết 2)", sub: "Ôn tập", period: 358 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 359 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 360 },
  ],
  31: [
    { title: "Bài 1: Tia nắng đi đâu? (Tiết 1)", sub: "Đọc", period: 361 },
    { title: "Bài 1: Tia nắng đi đâu? (Tiết 2)", sub: "Đọc", period: 362 },
    { title: "Bài 2: Trong giấc mơ buổi sáng (Tiết 1)", sub: "Đọc", period: 363 },
    { title: "Bài 2: Trong giấc mơ buổi sáng (Tiết 2)", sub: "Đọc", period: 364 },
    { title: "Bài 3: Ngày mới bắt đầu (Tiết 1)", sub: "Đọc - Viết", period: 365 },
    { title: "Bài 3: Ngày mới bắt đầu (Tiết 2)", sub: "Đọc - Viết", period: 366 },
    { title: "Bài 3: Ngày mới bắt đầu (Tiết 3)", sub: "Đọc - Viết", period: 367 },
    { title: "Bài 3: Ngày mới bắt đầu (Tiết 4)", sub: "Nói và nghe", period: 368 },
    { title: "Bài 4: Hỏi mẹ (Tiết 1)", sub: "Đọc", period: 369 },
    { title: "Bài 4: Hỏi mẹ (Tiết 2)", sub: "Đọc", period: 370 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 371 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 372 },
  ],
  32: [
    { title: "Bài 5: Những cánh cò (Tiết 1)", sub: "Đọc - Viết", period: 373 },
    { title: "Bài 5: Những cánh cò (Tiết 2)", sub: "Đọc - Viết", period: 374 },
    { title: "Bài 5: Những cánh cò (Tiết 3)", sub: "Đọc - Viết", period: 375 },
    { title: "Bài 5: Những cánh cò (Tiết 4)", sub: "Nói và nghe", period: 376 },
    { title: "Bài 6: Buổi trưa hè (Tiết 1)", sub: "Đọc", period: 377 },
    { title: "Bài 6: Buổi trưa hè (Tiết 2)", sub: "Đọc", period: 378 },
    { title: "Bài 7: Hoa phượng (Tiết 1)", sub: "Đọc", period: 379 },
    { title: "Bài 7: Hoa phượng (Tiết 2)", sub: "Đọc", period: 380 },
    { title: "Ôn tập chủ điểm Đất nước và con người (Tiết 1)", sub: "Ôn tập", period: 381 },
    { title: "Ôn tập chủ điểm Đất nước và con người (Tiết 2)", sub: "Ôn tập", period: 382 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 383 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 384 },
  ],
  33: [
    { title: "Bài 1: Cậu bé thông minh (Tiết 1)", sub: "Đọc - Viết", period: 385, digital: "1.1.CB1b; 5.1.CB1b: Nhận biết chức năng trò chơi trên thiết bị thông minh; chọn biện pháp an toàn bảo mật." },
    { title: "Bài 1: Cậu bé thông minh (Tiết 2)", sub: "Đọc - Viết", period: 386 },
    { title: "Bài 1: Cậu bé thông minh (Tiết 3)", sub: "Đọc - Viết", period: 387 },
    { title: "Bài 1: Cậu bé thông minh (Tiết 4)", sub: "Nói và nghe", period: 388 },
    { title: "Bài 2: Lính cứu hỏa (Tiết 1)", sub: "Đọc - Viết", period: 389 },
    { title: "Bài 2: Lính cứu hỏa (Tiết 2)", sub: "Đọc - Viết", period: 390 },
    { title: "Bài 2: Lính cứu hỏa (Tiết 3)", sub: "Đọc - Viết", period: 391 },
    { title: "Bài 2: Lính cứu hỏa (Tiết 4)", sub: "Nói và nghe", period: 392 },
    { title: "Bài 3: Lớn lên bạn làm gì? (Tiết 1)", sub: "Đọc", period: 393 },
    { title: "Bài 3: Lớn lên bạn làm gì? (Tiết 2)", sub: "Đọc", period: 394 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 395 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 396 },
  ],
  34: [
    { title: "Bài 4: Ruộng bậc thang ở Sa Pa (Tiết 1)", sub: "Đọc", period: 397 },
    { title: "Bài 4: Ruộng bậc thang ở Sa Pa (Tiết 2)", sub: "Đọc", period: 398 },
    { title: "Bài 5: Nhớ ơn (Tiết 1)", sub: "Đọc", period: 399 },
    { title: "Bài 5: Nhớ ơn (Tiết 2)", sub: "Đọc", period: 400 },
    { title: "Bài 6: Du lịch biển Việt Nam (Tiết 1)", sub: "Đọc - Viết", period: 401 },
    { title: "Bài 6: Du lịch biển Việt Nam (Tiết 2)", sub: "Đọc - Viết", period: 402 },
    { title: "Bài 6: Du lịch biển Việt Nam (Tiết 3)", sub: "Đọc - Viết", period: 403 },
    { title: "Bài 6: Du lịch biển Việt Nam (Tiết 4)", sub: "Nói và nghe", period: 404 },
    { title: "Ôn tập chủ điểm Đất nước và con người (Tiết 1)", sub: "Ôn tập", period: 405 },
    { title: "Ôn tập chủ điểm Đất nước và con người (Tiết 2)", sub: "Ôn tập", period: 406 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 407 },
    { title: "Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 408 },
  ],
  35: [
    { title: "Bài 1: Ôn tập các vần và bài đọc (Tiết 1)", sub: "Ôn tập", period: 409 },
    { title: "Bài 1: Ôn tập các vần và bài đọc (Tiết 2)", sub: "Ôn tập", period: 410 },
    { title: "Bài 2: Ôn tập kĩ năng viết chính tả (Tiết 1)", sub: "Ôn tập", period: 411 },
    { title: "Bài 2: Ôn tập kĩ năng viết chính tả (Tiết 2)", sub: "Ôn tập", period: 412 },
    { title: "Bài 3: Ôn tập kĩ năng nói và nghe (Tiết 1)", sub: "Ôn tập", period: 413 },
    { title: "Bài 3: Ôn tập kĩ năng nói và nghe (Tiết 2)", sub: "Ôn tập", period: 414 },
    { title: "Ôn tập: Luyện tập, thực hành củng cố các kĩ năng (Tiết 1)", sub: "Luyện tập", period: 415 },
    { title: "Ôn tập: Luyện tập, thực hành củng cố các kĩ năng (Tiết 2)", sub: "Luyện tập", period: 416 },
    { title: "Kiểm tra định kì cuối năm học (Tiết 1)", sub: "Kiểm tra", period: 417 },
    { title: "Kiểm tra định kì cuối năm học (Tiết 2)", sub: "Kiểm tra", period: 418 },
    { title: "Kiểm tra định kì cuối năm học (Tiết 3)", sub: "Kiểm tra", period: 419 },
    { title: "Tổng kết năm học môn Tiếng Việt 1 (Tiết 4)", sub: "Tổng kết", period: 420 },
  ],
};

// 2. MÔN TOÁN 1 (3 tiết/tuần x 35 tuần = 105 tiết/năm)
export const GRADE_1_TOAN: Record<number, Grade1LessonItem[]> = {
  1: [
    { title: "Tiết học đầu tiên", period: 1, ai: "NLa: Nhận biết một số thiết bị có AI (rô-bốt); nhân vật Rô-bốt là đại diện AI hỗ trợ con người học tập." },
    { title: "Các số 0, 1, 2, 3, 4, 5 (Tiết 1)", period: 2, digital: "1.3.CB1b: Nhận biết nơi sắp xếp dữ liệu, thông tin đơn giản trong môi trường có cấu trúc (nhóm đồ vật)." },
    { title: "Các số 0, 1, 2, 3, 4, 5 (Tiết 2)", period: 3 },
  ],
  2: [
    { title: "Các số 0, 1, 2, 3, 4, 5 (Tiết 3)", period: 4 },
    { title: "Các số 6, 7, 8, 9, 10 (Tiết 1)", period: 5 },
    { title: "Bài học STEM: Trải nghiệm cùng khay 10 học Toán (Tiết 1)", period: 6, stem: "Bài học STEM: Trải nghiệm cùng khay 10 học Toán (thay tiết Các số 6, 7, 8, 9, 10)." },
  ],
  3: [
    { title: "Bài học STEM: Trải nghiệm cùng khay 10 học Toán (Tiết 2)", period: 7, stem: "Bài học STEM: Trải nghiệm cùng khay 10 học Toán (tiết 2)." },
    { title: "Nhiều hơn, ít hơn, bằng nhau (Tiết 1)", period: 8 },
    { title: "Nhiều hơn, ít hơn, bằng nhau (Tiết 2)", period: 9 },
  ],
  4: [
    { title: "So sánh số (Tiết 1)", period: 10 },
    { title: "So sánh số (Tiết 2)", period: 11 },
    { title: "So sánh số (Tiết 3)", period: 12 },
  ],
  5: [
    { title: "So sánh số (Tiết 4)", period: 13 },
    { title: "Mấy và mấy (Tiết 1)", period: 14 },
    { title: "Mấy và mấy (Tiết 2)", period: 15 },
  ],
  6: [
    { title: "Mấy và mấy (Tiết 3)", period: 16 },
    { title: "Luyện tập chung (Tiết 1)", period: 17 },
    { title: "Luyện tập chung (Tiết 2)", period: 18 },
  ],
  7: [
    { title: "Luyện tập chung (Tiết 3)", period: 19 },
    { title: "Luyện tập chung (tiếp theo)", period: 20 },
    { title: "Hình vuông, hình tròn, hình tam giác, hình chữ nhật (Tiết 1)", period: 21 },
  ],
  8: [
    { title: "Hình vuông, hình tròn, hình tam giác, hình chữ nhật (Tiết 2)", period: 22 },
    { title: "Thực hành lắp ghép, xếp hình (Tiết 1)", period: 23 },
    { title: "Thực hành lắp ghép, xếp hình (Tiết 2)", period: 24 },
  ],
  9: [
    { title: "Luyện tập chung", period: 25 },
    { title: "Phép cộng trong phạm vi 10 (Tiết 1)", period: 26 },
    { title: "Phép cộng trong phạm vi 10 (Tiết 2)", period: 27 },
  ],
  10: [
    { title: "Phép cộng trong phạm vi 10 (Tiết 3)", period: 28 },
    { title: "Phép cộng trong phạm vi 10 (tiếp theo - Tiết 4)", period: 29 },
    { title: "Phép cộng trong phạm vi 10 (tiếp theo - Tiết 5)", period: 30 },
  ],
  11: [
    { title: "Phép cộng trong phạm vi 10 (tiếp theo - Tiết 6)", period: 31 },
    { title: "Phép trừ trong phạm vi 10 (Tiết 1)", period: 32 },
    { title: "Phép trừ trong phạm vi 10 (Tiết 2)", period: 33 },
  ],
  12: [
    { title: "Phép trừ trong phạm vi 10 (tiếp theo - Tiết 3)", period: 34 },
    { title: "Phép trừ trong phạm vi 10 (tiếp theo - Tiết 4)", period: 35 },
    { title: "Phép trừ trong phạm vi 10 (tiếp theo - Tiết 5)", period: 36 },
  ],
  13: [
    { title: "Phép trừ trong phạm vi 10 (tiếp theo - Tiết 6)", period: 37 },
    { title: "Bảng cộng, bảng trừ trong phạm vi 10 (Tiết 1)", period: 38 },
    { title: "Bảng cộng, bảng trừ trong phạm vi 10 (Tiết 2)", period: 39 },
  ],
  14: [
    { title: "Bảng cộng, bảng trừ trong phạm vi 10 (Tiết 3)", period: 40 },
    { title: "Luyện tập chung (Tiết 1)", period: 41 },
    { title: "Luyện tập chung (Tiết 2)", period: 42 },
  ],
  15: [
    { title: "Luyện tập chung (Tiết 3)", period: 43 },
    { title: "Khối lập phương, khối hộp chữ nhật (Tiết 1)", period: 44, ai: "NLa: Biết AI có thể hỗ trợ phân loại đồ vật theo hình khối nhưng cần kiểm tra bằng quan sát trực quan mặt/cạnh." },
    { title: "Khối lập phương, khối hộp chữ nhật (Tiết 2)", period: 45 },
  ],
  16: [
    { title: "Vị trí, định hướng trong không gian (Tiết 1)", period: 46, ai: "NLd: Làm quen tư duy điều khiển: ra lệnh rõ ràng cho robot di chuyển đúng vị trí. Trò chơi 'Ra lệnh cho robot'." },
    { title: "Vị trí, định hướng trong không gian (tiếp theo - Tiết 2)", period: 47 },
    { title: "Luyện tập chung", period: 48 },
  ],
  17: [
    { title: "Ôn tập các số trong phạm vi 10 (Tiết 1)", period: 49 },
    { title: "Ôn tập các số trong phạm vi 10 (tiếp theo - Tiết 2)", period: 50 },
    { title: "Ôn tập phép cộng, phép trừ trong phạm vi 10 (Tiết 1)", period: 51 },
  ],
  18: [
    { title: "Ôn tập phép cộng, phép trừ trong phạm vi 10 (Tiết 2)", period: 52 },
    { title: "Ôn tập hình học", period: 53 },
    { title: "Ôn tập chung học kì I", period: 54 },
  ],
  // HỌC KỲ II (Tuần 19 đến Tuần 35)
  19: [
    { title: "Số có hai chữ số (Tiết 1)", period: 55 },
    { title: "Số có hai chữ số (Tiết 2)", period: 56 },
    { title: "Số có hai chữ số (Tiết 3)", period: 57 },
  ],
  20: [
    { title: "Số có hai chữ số (tiếp theo - Tiết 4)", period: 58 },
    { title: "Số có hai chữ số (tiếp theo - Tiết 5)", period: 59 },
    { title: "Số có hai chữ số (tiếp theo - Tiết 6)", period: 60 },
  ],
  21: [
    { title: "So sánh số có hai chữ số (Tiết 1)", period: 61 },
    { title: "So sánh số có hai chữ số (Tiết 2)", period: 62 },
    { title: "So sánh số có hai chữ số (Tiết 3)", period: 63 },
  ],
  22: [
    { title: "Bảng các số từ 1 đến 100 (Tiết 1)", period: 64 },
    { title: "Bảng các số từ 1 đến 100 (Tiết 2)", period: 65 },
    { title: "Luyện tập chung (Tiết 1)", period: 66 },
  ],
  23: [
    { title: "Luyện tập chung (Tiết 2)", period: 67 },
    { title: "Dài hơn, ngắn hơn", period: 68 },
    { title: "Đơn vị đo độ dài (Tiết 1)", period: 69, digital: "1.2.CB1a: Mô tả các bước đo bằng thước như một quy trình rõ ràng; biết công cụ chỉ hỗ trợ hướng dẫn." },
  ],
  24: [
    { title: "Đơn vị đo độ dài (tiếp theo - Tiết 2)", period: 70 },
    { title: "Thực hành ước lượng và đo độ dài (Tiết 1)", period: 71 },
    { title: "Thực hành ước lượng và đo độ dài (Tiết 2)", period: 72 },
  ],
  25: [
    { title: "Luyện tập chung (Tiết 1)", period: 73 },
    { title: "Luyện tập chung (Tiết 2)", period: 74 },
    { title: "Phép cộng số có hai chữ số với số có một chữ số (Tiết 1)", period: 75 },
  ],
  26: [
    { title: "Phép cộng số có hai chữ số với số có một chữ số (tiếp theo - Tiết 2)", period: 76 },
    { title: "Phép cộng số có hai chữ số với số có hai chữ số (Tiết 1)", period: 77 },
    { title: "Phép cộng số có hai chữ số với số có hai chữ số (tiếp theo - Tiết 2)", period: 78 },
  ],
  27: [
    { title: "Phép trừ số có hai chữ số cho số có một chữ số (Tiết 1)", period: 79 },
    { title: "Phép trừ số có hai chữ số cho số có một chữ số (Tiết 2)", period: 80 },
    { title: "Phép trừ số có hai chữ số cho số có một chữ số (Tiết 3)", period: 81, ai: "NLd: Rèn tư duy thuật toán trong phép trừ theo hàng chục - hàng đơn vị. Trò chơi 'Robot tính sai, em sửa lại'." },
  ],
  28: [
    { title: "Phép trừ số có hai chữ số cho số có hai chữ số (Tiết 1)", period: 82 },
    { title: "Phép trừ số có hai chữ số cho số có hai chữ số (tiếp theo - Tiết 2)", period: 83 },
    { title: "Phép trừ số có hai chữ số cho số có hai chữ số (tiếp theo - Tiết 3)", period: 84 },
  ],
  29: [
    { title: "Luyện tập chung (Tiết 1)", period: 85 },
    { title: "Luyện tập chung (Tiết 2)", period: 86 },
    { title: "Luyện tập chung (Tiết 3)", period: 87 },
  ],
  30: [
    { title: "Luyện tập chung", period: 88 },
    { title: "Bài học STEM: Đồng hồ tiện ích (Tiết 1)", period: 89, stem: "Thay tiết Xem giờ đúng trên đồng hồ bằng Bài học STEM Đồng hồ tiện ích (Tiết 1)." },
    { title: "Bài học STEM: Đồng hồ tiện ích (Tiết 2)", period: 90, stem: "Bài học STEM Đồng hồ tiện ích (Tiết 2)." },
  ],
  31: [
    { title: "Các ngày trong tuần (Tiết 1)", period: 91, ai: "NLa: Biết ứng dụng lịch/AI chỉ hỗ trợ nhắc việc, không thay thế việc ghi nhớ và thực hiện thời khóa biểu." },
    { title: "Các ngày trong tuần (Tiết 2)", period: 92 },
    { title: "Thực hành xem lịch và giờ (Tiết 1)", period: 93 },
  ],
  32: [
    { title: "Thực hành xem lịch và giờ (tiếp theo - Tiết 2)", period: 94 },
    { title: "Luyện tập chung (Tiết 1)", period: 95 },
    { title: "Luyện tập chung (Tiết 2)", period: 96 },
  ],
  33: [
    { title: "Ôn tập các số và phép tính trong phạm vi 10 (Tiết 1)", period: 97 },
    { title: "Ôn tập các số và phép tính trong phạm vi 10 (Tiết 2)", period: 98 },
    { title: "Ôn tập các số và phép tính trong phạm vi 10 (Tiết 3)", period: 99 },
  ],
  34: [
    { title: "Ôn tập các số và phép tính trong phạm vi 100 (Tiết 1)", period: 100 },
    { title: "Ôn tập các số và phép tính trong phạm vi 100 (Tiết 2)", period: 101 },
    { title: "Ôn tập các số và phép tính trong phạm vi 100 (Tiết 3)", period: 102 },
  ],
  35: [
    { title: "Ôn tập hình học và đo lường (Tiết 1)", period: 103 },
    { title: "Ôn tập hình học và đo lường (Tiết 2)", period: 104 },
    { title: "Ôn tập chung cuối năm học", period: 105 },
  ],
};

// 3. MÔN TỰ NHIÊN VÀ XÃ HỘI 1 (2 tiết/tuần x 35 tuần = 70 tiết/năm)
export const GRADE_1_TNXH: Record<number, Grade1LessonItem[]> = {
  1: [
    { title: "Bài 1: Kể về gia đình (Tiết 1)", period: 1 },
    { title: "Bài 1: Kể về gia đình (Tiết 2)", period: 2 },
  ],
  2: [
    { title: "Bài 2: Ngôi nhà của em (Tiết 1)", period: 3 },
    { title: "Bài 2: Ngôi nhà của em (Tiết 2)", period: 4 },
  ],
  3: [
    { title: "Bài 3: Đồ dùng trong nhà (Tiết 1)", period: 5 },
    { title: "Bài 3: Đồ dùng trong nhà (Tiết 2)", period: 6 },
  ],
  4: [
    { title: "Bài 4: An toàn khi sử dụng đồ dùng trong nhà (Tiết 1)", period: 7, digital: "4.1.CB1b: Phân biệt rủi ro và mối đe dọa đơn giản trong môi trường số.", ai: "1.2CB3a: Không sử dụng AI làm hại người khác; nhận biết thiết bị thông minh cảnh báo cháy, rò rỉ điện bảo vệ con người." },
    { title: "Bài 4: An toàn khi sử dụng đồ dùng trong nhà (Tiết 2)", period: 8 },
  ],
  5: [
    { title: "Ôn tập chủ đề Gia đình (Tiết 1)", period: 9 },
    { title: "Ôn tập chủ đề Gia đình (Tiết 2)", period: 10 },
  ],
  6: [
    { title: "Ôn tập chủ đề Gia đình (Tiết 3)", period: 11 },
    { title: "Bài 5: Lớp học của em (Tiết 1)", period: 12, digital: "2.2.CB1a: Nhận biết các công nghệ số đơn giản phù hợp để chia sẻ dữ liệu, thông tin và nội dung số." },
  ],
  7: [
    { title: "Bài 5: Lớp học của em (Tiết 2)", period: 13 },
    { title: "Bài 5: Lớp học của em (Tiết 3)", period: 14 },
  ],
  8: [
    { title: "Bài 6: Cùng khám phá trường học (Tiết 1)", period: 15, ai: "NLd: Nhận biết thiết bị AI có các bộ phận giống con người (camera là 'mắt', micro là 'tai')." },
    { title: "Bài 6: Cùng khám phá trường học (Tiết 2)", period: 16 },
  ],
  9: [
    { title: "Bài 6: Cùng khám phá trường học (Tiết 3)", period: 17 },
    { title: "Bài 7: Cùng vui ở trường (Tiết 1)", period: 18 },
  ],
  10: [
    { title: "Bài 7: Cùng vui ở trường (Tiết 2)", period: 19 },
    { title: "Bài học STEM: Dụng cụ vệ sinh nơi em sống / Ôn tập Trường học", period: 20, stem: "Tích hợp Bài học STEM: Bài 12 - Dụng cụ vệ sinh nơi em sống." },
  ],
  11: [
    { title: "Ôn tập chủ đề Trường học (Tiết 2)", period: 21 },
    { title: "Ôn tập chủ đề Trường học (Tiết 3)", period: 22 },
  ],
  12: [
    { title: "Bài học STEM: Trang trí cảnh quan nơi em sống (Tiết 1)", period: 23, stem: "Thay bằng Bài học STEM Bài 12: Trang trí cảnh quan nơi em sống (tiết 1)." },
    { title: "Bài học STEM: Trang trí cảnh quan nơi em sống (Tiết 2)", period: 24, stem: "Bài học STEM Bài 12: Trang trí cảnh quan nơi em sống (tiết 2)." },
  ],
  13: [
    { title: "Bài 9: Con người nơi em sống (Tiết 1)", period: 25 },
    { title: "Bài 9: Con người nơi em sống (Tiết 2)", period: 26 },
  ],
  14: [
    { title: "Bài 10: Vui đón Tết (Tiết 1)", period: 27 },
    { title: "Bài 10: Vui đón Tết (Tiết 2)", period: 28 },
  ],
  15: [
    { title: "Bài 11: An toàn trên đường (Tiết 1)", period: 29 },
    { title: "Bài 11: An toàn trên đường (Tiết 2)", period: 30 },
  ],
  16: [
    { title: "Ôn tập chủ đề Cộng đồng địa phương (Tiết 1)", period: 31 },
    { title: "Ôn tập chủ đề Cộng đồng địa phương (Tiết 2)", period: 32 },
  ],
  17: [
    { title: "Ôn tập chủ đề Cộng đồng địa phương (Tiết 3)", period: 33 },
    { title: "Bài 12: Cây xung quanh em (Tiết 1)", period: 34 },
  ],
  18: [
    { title: "Bài 12: Cây xung quanh em (Tiết 2)", period: 35 },
    { title: "Bài 12: Cây xung quanh em (Tiết 3)", period: 36 },
  ],
  // HỌC KỲ II
  19: [
    { title: "Bài 13: Chăm sóc và bảo vệ cây trồng (Tiết 1)", period: 37, digital: "1.1.CB1a: Xác định thông tin cần tìm về cây có gai/độc, tìm kiếm đơn giản trong môi trường số chọn lọc thông tin an toàn." },
    { title: "Bài 13: Chăm sóc và bảo vệ cây trồng (Tiết 2)", period: 38 },
  ],
  20: [
    { title: "Bài 13: Chăm sóc và bảo vệ cây trồng (Tiết 3)", period: 39 },
    { title: "Bài 14: Con vật quanh em (Tiết 1)", period: 40 },
  ],
  21: [
    { title: "Bài 14: Con vật quanh em (Tiết 2)", period: 41 },
    { title: "Bài 14: Con vật quanh em (Tiết 3)", period: 42 },
  ],
  22: [
    { title: "Bài 15: Chăm sóc và bảo vệ vật nuôi (Tiết 1)", period: 43 },
    { title: "Bài 15: Chăm sóc và bảo vệ vật nuôi (Tiết 2)", period: 44 },
  ],
  23: [
    { title: "Ôn tập chủ đề Thực vật và Động vật (Tiết 1)", period: 45 },
    { title: "Ôn tập chủ đề Thực vật và Động vật (Tiết 2)", period: 46 },
  ],
  24: [
    { title: "Ôn tập chủ đề Thực vật và Động vật (Tiết 3)", period: 47 },
    { title: "Bài 16: Cơ thể em (Tiết 1)", period: 48 },
  ],
  25: [
    { title: "Bài 16: Cơ thể em (Tiết 2)", period: 49 },
    { title: "Bài 16: Cơ thể em (Tiết 3)", period: 50 },
  ],
  26: [
    { title: "Bài 17: Các giác quan của cơ thể (Tiết 1)", period: 51 },
    { title: "Bài 17: Các giác quan của cơ thể (Tiết 2)", period: 52 },
  ],
  27: [
    { title: "Bài 17: Các giác quan của cơ thể (Tiết 3)", period: 53 },
    { title: "Bài 18: Ăn uống hằng ngày (Tiết 1)", period: 54 },
  ],
  28: [
    { title: "Bài 18: Ăn uống hằng ngày (Tiết 2)", period: 55 },
    { title: "Bài 19: Vận động và nghỉ ngơi (Tiết 1)", period: 56 },
  ],
  29: [
    { title: "Bài 19: Vận động và nghỉ ngơi (Tiết 2)", period: 57 },
    { title: "Bài 20: Tự bảo vệ mình (Tiết 1)", period: 58 },
  ],
  30: [
    { title: "Bài 20: Tự bảo vệ mình (Tiết 2)", period: 59 },
    { title: "Ôn tập chủ đề Con người và sức khỏe (Tiết 1)", period: 60 },
  ],
  31: [
    { title: "Ôn tập chủ đề Con người và sức khỏe (Tiết 2)", period: 61 },
    { title: "Ôn tập chủ đề Con người và sức khỏe (Tiết 3)", period: 62 },
  ],
  32: [
    { title: "Bài học STEM: Bầu trời ngày và đêm (Tiết 1)", period: 63, stem: "Thay Bài 21 bằng Bài học STEM Bài 15: Bầu trời ngày và đêm (tiết 1)." },
    { title: "Bài học STEM: Bầu trời ngày và đêm (Tiết 2)", period: 64, stem: "Bài học STEM Bài 15: Bầu trời ngày và đêm (tiết 2)." },
  ],
  33: [
    { title: "Bài học STEM: Bầu trời ngày và đêm (Tiết 3)", period: 65, stem: "Bài học STEM Bài 15: Bầu trời ngày và đêm (tiết 3)." },
    { title: "Bài 22: Thời tiết luôn thay đổi (Tiết 1)", period: 66 },
  ],
  34: [
    { title: "Bài 22: Thời tiết luôn thay đổi (Tiết 2)", period: 67, digital: "4.1.CB1b: Nhận biết được cách bảo vệ thiết bị và nội dung một cách đơn giản để ứng phó rủi ro môi trường số." },
    { title: "Bài 22: Thời tiết luôn thay đổi (Tiết 3)", period: 68 },
  ],
  35: [
    { title: "Ôn tập chủ đề Trái Đất và bầu trời (Tiết 1)", period: 69 },
    { title: "Ôn tập chủ đề Trái Đất và bầu trời (Tiết 2)", period: 70 },
  ],
};

// 4. MÔN ĐẠO ĐỨC 1 (1 tiết/tuần x 35 tuần = 35 tiết/năm)
export const GRADE_1_DAO_DUC: Record<number, Grade1LessonItem> = {
  1: { title: "Em giữ sạch đôi tay", period: 1 },
  2: { title: "Em giữ sạch răng miệng", period: 2 },
  3: { title: "Em tắm, gội sạch sẽ", period: 3 },
  4: { title: "Em giữ trang phục gọn gàng, sạch sẽ", period: 4 },
  5: { title: "Gia đình của em", period: 5 },
  6: { title: "Lễ phép, vâng lời ông bà, cha mẹ, anh chị", period: 6 },
  7: { title: "Quan tâm, chăm sóc ông bà", period: 7 },
  8: { title: "Quan tâm, chăm sóc cha mẹ", period: 8 },
  9: { title: "Chăm sóc, giúp đỡ em nhỏ", period: 9 },
  10: { title: "Thực hành kĩ năng giữa kì I", period: 10 },
  11: { title: "Đi học đúng giờ", period: 11, ai: "NLb: Nhận biết sản phẩm AI (đồng hồ thông minh/trợ lý ảo nhắc giờ đến lớp, hình thành thói quen đi học đúng giờ)." },
  12: { title: "Học bài và làm bài đầy đủ", period: 12 },
  13: { title: "Giữ trật tự trong trường, lớp", period: 13 },
  14: { title: "Giữ gìn tài sản của trường, lớp", period: 14 },
  15: { title: "Giữ gìn vệ sinh trường, lớp", period: 15 },
  16: { title: "Gọn gàng, ngăn nắp", period: 16, digital: "2.1.CB1a, 1.2.CB1a: Quan sát tranh qua thiết bị số phần Khởi động; đánh giá thông tin nguyên nhân đi học muộn." },
  17: { title: "Học tập, sinh hoạt đúng giờ", period: 17, digital: "5.2.CB1a: Xác định nhu cầu cá nhân và dùng công cụ số đơn giản dưới hướng dẫn người lớn trình bày thời gian biểu." },
  18: { title: "Ôn tập - đánh giá học kì I", period: 18 },
  19: { title: "Tự giác học tập", period: 19, digital: "1.1.CB1a: Xác định thông tin, tìm kiếm dữ liệu qua tìm kiếm đơn giản trong môi trường số." },
  20: { title: "Tự giác tham gia các hoạt động ở trường", period: 20 },
  21: { title: "Tự giác làm việc nhà", period: 21 },
  22: { title: "Không nói dối", period: 22, digital: "2.3.CB1a: Giao tiếp môi trường số; biết nói thật, không gửi thông tin sai sự thật trong nhóm học tập/lớp trực tuyến." },
  23: { title: "Không tự ý lấy và sử dụng đồ của người khác", period: 23, digital: "2.2.CB1a: Ứng xử có trách nhiệm khi chia sẻ thông tin trong môi trường số." },
  24: { title: "Nhặt được của rơi trả người đánh mất", period: 24 },
  25: { title: "Biết nhận lỗi", period: 25 },
  26: { title: "Thực hành kĩ năng giữa kì II", period: 26 },
  27: { title: "Phòng, tránh tai nạn giao thông", period: 27 },
  28: { title: "Phòng, tránh đuối nước", period: 28 },
  29: { title: "Phòng, tránh bỏng", period: 29 },
  30: { title: "Phòng, tránh thương tích do ngã", period: 30 },
  31: { title: "Phòng, tránh điện giật", period: 31, digital: "4.1.CB1b: Phân biệt rủi ro khi dùng thiết bị điện/số (ổ cắm hở, dây sạc hỏng, tay ướt) và báo người lớn hỗ trợ." },
  32: { title: "Phòng, tránh ngộ độc thực phẩm", period: 32, digital: "4.1.CB1b: Phân biệt rủi ro từ hình ảnh, video hoặc quảng cáo đồ ăn không rõ nguồn gốc." },
  33: { title: "Phòng, tránh xâm hại", period: 33, digital: "4.1.CB1b: Không trả lời, không gửi ảnh riêng tư khi người lạ nhắn tin/gọi video và báo ngay người lớn tin cậy." },
  34: { title: "Ôn tập đánh giá cuối năm (Tiết 1)", period: 34 },
  35: { title: "Ôn tập đánh giá cuối năm (Tiết 2)", period: 35 },
};

// 5. MÔN HOẠT ĐỘNG TRẢI NGHIỆM 1 (3 tiết/tuần x 35 tuần = 105 tiết/năm)
// Gồm: Tiết 1 SHDC; Tiết 2 HĐGD theo chủ đề; Tiết 3 SHL hoặc Sinh hoạt sao
export const GRADE_1_HDTN: Record<number, Grade1LessonItem[]> = {
  1: [
    { title: "Sinh hoạt dưới cờ: Lễ Khai giảng", sub: "Sinh hoạt dưới cờ", period: 1 },
    { title: "Bài 1: Làm quen với bạn mới", sub: "Hoạt động chủ đề", period: 2 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 3 },
  ],
  2: [
    { title: "Sinh hoạt dưới cờ: Tìm hiểu nội quy nhà trường", sub: "Sinh hoạt dưới cờ", period: 4 },
    { title: "Bài 2: Những việc nên làm trong giờ học, giờ chơi (Tiết 1)", sub: "Hoạt động chủ đề", period: 5 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 6 },
  ],
  3: [
    { title: "Sinh hoạt dưới cờ: Nói lời hay - làm việc tốt", sub: "Sinh hoạt dưới cờ", period: 7 },
    { title: "Bài 2: Những việc nên làm trong giờ học, giờ chơi (Tiết 2)", sub: "Hoạt động chủ đề", period: 8 },
    { title: "Sinh hoạt lớp: Làm quen với sinh hoạt Sao Nhi đồng", sub: "Sinh hoạt lớp", period: 9 },
  ],
  4: [
    { title: "Sinh hoạt dưới cờ: Vui trung thu", sub: "Sinh hoạt dưới cờ", period: 10 },
    { title: "Bài 2: Những việc nên làm trong giờ học, giờ chơi (Tiết 3)", sub: "Hoạt động chủ đề", period: 11 },
    { title: "Sinh hoạt lớp: Vui trung thu", sub: "Sinh hoạt lớp", period: 12 },
  ],
  5: [
    { title: "Sinh hoạt dưới cờ: Sao Nhi đồng chăm ngoan", sub: "Sinh hoạt dưới cờ", period: 13 },
    { title: "Bài 3: Cảm xúc của em", sub: "Hoạt động chủ đề", period: 14 },
    { title: "Sinh hoạt lớp: Sơ kết tuần", sub: "Sinh hoạt lớp", period: 15 },
  ],
  6: [
    { title: "Sinh hoạt dưới cờ: Hoạt động nhân đạo", sub: "Sinh hoạt dưới cờ", period: 16 },
    { title: "Bài 4: Yêu thương con người (Tiết 1)", sub: "Hoạt động chủ đề", period: 17 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 18 },
  ],
  7: [
    { title: "Sinh hoạt dưới cờ: Thử làm ca sĩ chào mừng ngày Phụ nữ Việt Nam 20-10", sub: "Sinh hoạt dưới cờ", period: 19 },
    { title: "Bài 4: Yêu thương con người (Tiết 2)", sub: "Hoạt động chủ đề", period: 20 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 21 },
  ],
  8: [
    { title: "Sinh hoạt dưới cờ: Tuyên dương tấm gương Nhi đồng chăm ngoan", sub: "Sinh hoạt dưới cờ", period: 22 },
    { title: "Bài 4: Yêu thương con người (Tiết 3)", sub: "Hoạt động chủ đề", period: 23 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 24 },
  ],
  9: [
    { title: "Sinh hoạt dưới cờ: Tìm hiểu truyền thống nhà trường", sub: "Sinh hoạt dưới cờ", period: 25 },
    { title: "Bài 5: Thân thiện với bạn bè", sub: "Hoạt động chủ đề", period: 26 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 27 },
  ],
  10: [
    { title: "Sinh hoạt dưới cờ: Lễ Phát động thi đua thực hiện Năm điều Bác Hồ dạy", sub: "Sinh hoạt dưới cờ", period: 28 },
    { title: "Bài 6: Thực hiện Năm điều Bác Hồ dạy", sub: "Hoạt động chủ đề", period: 29 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 30 },
  ],
  11: [
    { title: "Sinh hoạt dưới cờ: Chào mừng ngày Nhà giáo Việt Nam 20-11", sub: "Sinh hoạt dưới cờ", period: 31 },
    { title: "Bài 7: Kính yêu thầy cô (Tiết 1)", sub: "Hoạt động chủ đề", period: 32 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 33 },
  ],
  12: [
    { title: "Sinh hoạt dưới cờ: Trưng bày và giới thiệu sản phẩm ở 'Góc tri ân' thầy cô", sub: "Sinh hoạt dưới cờ", period: 34 },
    { title: "Bài 7: Kính yêu thầy cô (Tiết 2)", sub: "Hoạt động chủ đề", period: 35 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 36 },
  ],
  13: [
    { title: "Sinh hoạt dưới cờ: Tìm hiểu về quyền và bổn phận của trẻ em", sub: "Sinh hoạt dưới cờ", period: 37 },
    { title: "Bài 8: An toàn khi vui chơi (Tiết 1)", sub: "Hoạt động chủ đề", period: 38 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 39 },
  ],
  14: [
    { title: "Sinh hoạt dưới cờ: Chào mừng ngày thành lập QĐND Việt Nam 22-12", sub: "Sinh hoạt dưới cờ", period: 40 },
    { title: "Bài 8: An toàn khi vui chơi (Tiết 2)", sub: "Hoạt động chủ đề", period: 41 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 42 },
  ],
  15: [
    { title: "Sinh hoạt dưới cờ: Diễn đàn phòng chống bạo lực học đường", sub: "Sinh hoạt dưới cờ", period: 43 },
    { title: "Bài 9: Phòng tránh bị bắt nạt", sub: "Hoạt động chủ đề", period: 44, digital: "4.1.CB1b: Lưu lại thông tin và báo người lớn khi bị đe dọa qua thiết bị số.", rights: "Quyền được bảo vệ để không bị mua bán, bắt cóc, đánh đập." },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 45 },
  ],
  16: [
    { title: "Sinh hoạt dưới cờ: An toàn cho nụ cười trẻ thơ", sub: "Sinh hoạt dưới cờ", period: 46 },
    { title: "Bài 10: Sử dụng đồ dùng an toàn trong gia đình", sub: "Hoạt động chủ đề", period: 47 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 48 },
  ],
  17: [
    { title: "Sinh hoạt dưới cờ: Giao lưu 'Nét đẹp tuổi thơ'", sub: "Sinh hoạt dưới cờ", period: 49 },
    { title: "Bài 11: Chân dung của em", sub: "Hoạt động chủ đề", period: 50, digital: "4.2.CB1a: Không tự ý chia sẻ ảnh chân dung, tên, địa chỉ, số điện thoại cho người lạ trong môi trường số." },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 51 },
  ],
  18: [
    { title: "Sinh hoạt dưới cờ: Ngày hội vì sức khỏe học đường", sub: "Sinh hoạt dưới cờ", period: 52 },
    { title: "Bài 12: Giữ vệ sinh cá nhân", sub: "Hoạt động chủ đề", period: 53 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 54 },
  ],
  // HỌC KỲ II
  19: [
    { title: "Sinh hoạt dưới cờ: Vệ sinh an toàn thực phẩm", sub: "Sinh hoạt dưới cờ", period: 55 },
    { title: "Bài 13: Ăn uống hợp lí", sub: "Hoạt động chủ đề", period: 56, digital: "1.1.CB1a: Tìm thông tin đơn giản về cảnh đẹp quê hương qua hình ảnh/video theo từ khóa ngắn." },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 57 },
  ],
  20: [
    { title: "Sinh hoạt dưới cờ: Ngày hội trình diễn thời trang", sub: "Sinh hoạt dưới cờ", period: 58 },
    { title: "Bài 14: Sử dụng trang phục hằng ngày", sub: "Hoạt động chủ đề", period: 59 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 60 },
  ],
  21: [
    { title: "Sinh hoạt dưới cờ: Ủng hộ 'Tết yêu thương'", sub: "Sinh hoạt dưới cờ", period: 61 },
    { title: "Bài 15: Sắp xếp nhà cửa gọn gàng đón Tết (Tiết 1)", sub: "Hoạt động chủ đề", period: 62 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 63 },
  ],
  22: [
    { title: "Sinh hoạt dưới cờ: Hội chợ xuân", sub: "Sinh hoạt dưới cờ", period: 64 },
    { title: "Bài 15: Sắp xếp nhà cửa gọn gàng đón Tết (Tiết 2)", sub: "Hoạt động chủ đề", period: 65 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 66 },
  ],
  23: [
    { title: "Sinh hoạt dưới cờ: Giao lưu 'Đón Tết cổ truyền dân tộc'", sub: "Sinh hoạt dưới cờ", period: 67 },
    { title: "Bài 16: Ứng xử khi được nhận quà ngày Tết (Tiết 1)", sub: "Hoạt động chủ đề", period: 68 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 69 },
  ],
  24: [
    { title: "Sinh hoạt dưới cờ: Vui chơi ngày Tết", sub: "Sinh hoạt dưới cờ", period: 70 },
    { title: "Bài 16: Ứng xử khi được nhận quà ngày Tết (Tiết 2)", sub: "Hoạt động chủ đề", period: 71 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 72 },
  ],
  25: [
    { title: "Sinh hoạt dưới cờ: Trò chơi sinh hoạt cộng đồng", sub: "Sinh hoạt dưới cờ", period: 73 },
    { title: "Bài 17: Hàng xóm nhà em (Tiết 1)", sub: "Hoạt động chủ đề", period: 74 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 75 },
  ],
  26: [
    { title: "Sinh hoạt dưới cờ: Chào mừng ngày Quốc tế Phụ nữ 8-3", sub: "Sinh hoạt dưới cờ", period: 76 },
    { title: "Bài 17: Hàng xóm nhà em (Tiết 2)", sub: "Hoạt động chủ đề", period: 77 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 78 },
  ],
  27: [
    { title: "Sinh hoạt dưới cờ: Em làm kế hoạch nhỏ", sub: "Sinh hoạt dưới cờ", period: 79 },
    { title: "Bài 18: Em tham gia các hoạt động xã hội (Tiết 1)", sub: "Hoạt động chủ đề", period: 80 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 81 },
  ],
  28: [
    { title: "Sinh hoạt dưới cờ: Phát động phong trào 'Nuôi heo đất - Giúp bạn đến trường'", sub: "Sinh hoạt dưới cờ", period: 82 },
    { title: "Bài 18: Em tham gia các hoạt động xã hội (Tiết 2)", sub: "Hoạt động chủ đề", period: 83 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 84 },
  ],
  29: [
    { title: "Sinh hoạt dưới cờ: Chăm sóc vườn cây nhà trường", sub: "Sinh hoạt dưới cờ", period: 85 },
    { title: "Bài 19: Thiên nhiên tươi đẹp quê em (Tiết 1)", sub: "Hoạt động chủ đề", period: 86, digital: "4.1.CB2.a: Xác định cách tạo và chỉnh sửa nội dung đơn giản; tìm kiếm tên cảnh đẹp, người dân làm gì ở đó." },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 87 },
  ],
  30: [
    { title: "Sinh hoạt dưới cờ: Em tập làm hướng dẫn viên du lịch", sub: "Sinh hoạt dưới cờ", period: 88 },
    { title: "Bài 19: Thiên nhiên tươi đẹp quê em (Tiết 2)", sub: "Hoạt động chủ đề", period: 89, digital: "4.1.L1-L2.a: Xác định cách tạo, chỉnh sửa nội dung đơn giản.", env: "Giáo dục BVMT: Biết yêu quý và bảo vệ thiên nhiên." },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 90 },
  ],
  31: [
    { title: "Sinh hoạt dưới cờ: Hát ca ngợi cảnh đẹp quê hương", sub: "Sinh hoạt dưới cờ", period: 91 },
    { title: "Bài 20: Em bảo vệ cảnh quan thiên nhiên (Tiết 1)", sub: "Hoạt động chủ đề", period: 92 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 93 },
  ],
  32: [
    { title: "Sinh hoạt dưới cờ: Ngày hội sách trường em", sub: "Sinh hoạt dưới cờ", period: 94 },
    { title: "Bài 20: Em bảo vệ cảnh quan thiên nhiên (Tiết 2)", sub: "Hoạt động chủ đề", period: 95, digital: "3.1.CB1a: Tạo thông điệp ngắn bảo vệ cảnh quan thiên nhiên với ảnh hoặc biểu tượng phù hợp." },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 96 },
  ],
  33: [
    { title: "Sinh hoạt dưới cờ: Thân thiện với môi trường", sub: "Sinh hoạt dưới cờ", period: 97 },
    { title: "Bài 21: Giữ gìn môi trường sạch, đẹp (Tiết 1)", sub: "Hoạt động chủ đề", period: 98 },
    { title: "Sinh hoạt lớp: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 99 },
  ],
  34: [
    { title: "Sinh hoạt dưới cờ: Mừng Sinh nhật Bác Hồ, mừng Đội ta trưởng thành", sub: "Sinh hoạt dưới cờ", period: 100 },
    { title: "Bài 21: Giữ gìn môi trường sạch, đẹp (Tiết 2)", sub: "Hoạt động chủ đề", period: 101 },
    { title: "Sinh hoạt sao: Sơ kết tuần, lập kế hoạch tuần tới", sub: "Sinh hoạt lớp", period: 102 },
  ],
  35: [
    { title: "Sinh hoạt dưới cờ: Lễ Tổng kết năm học", sub: "Sinh hoạt dưới cờ", period: 103 },
    { title: "Bài 21: Giữ gìn môi trường sạch, đẹp (Tiết 3)", sub: "Hoạt động chủ đề", period: 104 },
    { title: "Sinh hoạt lớp: Tổng kết năm học", sub: "Sinh hoạt lớp", period: 105 },
  ],
};

function formatIntegrationText(item: Grade1LessonItem, defaultNote: string): string {
  const parts: string[] = [];
  if (item.ai) parts.push(`*Tích hợp AI: ${item.ai}`);
  if (item.digital) parts.push(`*Tích hợp Năng lực số: ${item.digital}`);
  if (item.stem) parts.push(`*Tích hợp STEM: ${item.stem}`);
  if (item.env) parts.push(`*Giáo dục BVMT: ${item.env}`);
  if (item.rights) parts.push(`*Giáo dục Quyền con người: ${item.rights}`);
  if (item.integ) parts.push(item.integ);
  return parts.length > 0 ? parts.join(" | ") : defaultNote;
}

export const GRADE_1_CURRICULUM_DATA: Record<string, (week: number, p: number) => LessonInfo> = {
  "tiếng việt": (week: number, p: number) => {
    const list = GRADE_1_TIENG_VIET[week];
    if (list && list[p - 1]) {
      const item = list[p - 1];
      return {
        lessonTitle: item.title,
        subSubject: item.sub || "Tiếng Việt",
        curriculumPeriod: item.period,
        integrationNotes: formatIntegrationText(item, "Tiếng Việt 1 Kết nối tri thức với cuộc sống."),
        aiIntegration: item.ai,
        digitalCompetence: item.digital,
        environment: item.env,
      };
    }
    return {
      lessonTitle: `Tiếng Việt 1 - Tuần ${week} (Tiết ${p})`,
      curriculumPeriod: (week - 1) * 12 + p,
      integrationNotes: "Tiếng Việt 1 GDPT 2018."
    };
  },

  "toán": (week: number, p: number) => {
    const list = GRADE_1_TOAN[week];
    if (list && list[p - 1]) {
      const item = list[p - 1];
      return {
        lessonTitle: item.title,
        curriculumPeriod: item.period,
        integrationNotes: formatIntegrationText(item, "Toán 1 Kết nối tri thức với cuộc sống."),
        aiIntegration: item.ai,
        digitalCompetence: item.digital,
        stem: item.stem,
      };
    }
    return {
      lessonTitle: `Toán 1 - Tuần ${week} (Tiết ${p})`,
      curriculumPeriod: (week - 1) * 3 + p,
      integrationNotes: "Toán 1 GDPT 2018."
    };
  },

  "tự nhiên và xã hội": (week: number, p: number) => {
    const list = GRADE_1_TNXH[week];
    if (list && list[p - 1]) {
      const item = list[p - 1];
      return {
        lessonTitle: item.title,
        curriculumPeriod: item.period,
        integrationNotes: formatIntegrationText(item, "TNXH 1 Kết nối tri thức với cuộc sống."),
        aiIntegration: item.ai,
        digitalCompetence: item.digital,
        stem: item.stem,
      };
    }
    return {
      lessonTitle: `TNXH 1 - Tuần ${week} (Tiết ${p})`,
      curriculumPeriod: (week - 1) * 2 + p
    };
  },

  "đạo đức": (week: number) => {
    const item = GRADE_1_DAO_DUC[week];
    if (item) {
      return {
        lessonTitle: item.title,
        curriculumPeriod: item.period,
        integrationNotes: formatIntegrationText(item, "Đạo đức 1 Kết nối tri thức với cuộc sống."),
        aiIntegration: item.ai,
        digitalCompetence: item.digital,
      };
    }
    return {
      lessonTitle: `Đạo đức 1 - Tuần ${week}`,
      curriculumPeriod: week
    };
  },

  "hoạt động trải nghiệm": (week: number, p: number) => {
    const list = GRADE_1_HDTN[week];
    if (list && list[p - 1]) {
      const item = list[p - 1];
      return {
        lessonTitle: item.title,
        subSubject: item.sub || (p === 1 ? "Sinh hoạt dưới cờ" : p === 2 ? "Hoạt động chủ đề" : "Sinh hoạt lớp"),
        curriculumPeriod: item.period,
        integrationNotes: formatIntegrationText(item, "Hoạt động trải nghiệm 1 Kết nối tri thức."),
        digitalCompetence: item.digital,
        humanRights: item.rights,
        environment: item.env,
      };
    }
    return {
      lessonTitle: p === 1 ? `SHDC Tuần ${week}` : p === 2 ? `HĐGDCĐ Tuần ${week}` : `Sinh hoạt lớp Tuần ${week}`,
      curriculumPeriod: (week - 1) * 3 + p,
      integrationNotes: "Hoạt động trải nghiệm 1 Kết nối tri thức."
    };
  },

  "giáo dục thể chất": (week: number, p: number) => {
    return {
      lessonTitle: `Giáo dục thể chất 1: Đội hình đội ngũ & Tư thế cơ bản (Tiết ${p})`,
      curriculumPeriod: (week - 1) * 2 + p,
      integrationNotes: "Rèn luyện tư thế vận động cơ bản."
    };
  }
};

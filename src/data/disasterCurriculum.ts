import { Grade, LessonActivity, LessonPlan, ScheduleItem } from "../types";
import { cleanMaterialsList } from "../utils/materialsHelper";

export interface DisasterLesson {
  lessonNumber: number; // 1 -> 8
  week: number; // 6 -> 13
  title: string;
  shortTitle: string;
  specificCompetencies: string[];
  generalCompetencies: string[];
  qualities: string[];
  teacherMaterials: string[];
  studentMaterials: string[];
  activities: LessonActivity[];
  notebookSummary: string;
}

/**
 * Danh sách 8 bài học trong tài liệu:
 * "UBND XÃ TÂN THẠNH - TRƯỜNG TIỂU HỌC TÂN THẠNH
 * KẾ HOẠCH BÀI DẠY TÍCH HỢP PHÒNG NGỪA VÀ GIẢM NHẸ RỦI RO THẢM HỌA"
 * Áp dụng bắt đầu từ Tuần 6 vào ngày Thứ Sáu hàng tuần trước tiết HĐTN (SHL).
 */
export const DISASTER_CURRICULUM_DATA: DisasterLesson[] = [
  // =========================================================================
  // BÀI 1: HIỂM HỌA VÀ THẢM HỌA (Tuần 6)
  // =========================================================================
  {
    lessonNumber: 1,
    week: 6,
    title: "Bài 1: Hiểm họa và Thảm họa",
    shortTitle: "Hiểm họa và Thảm họa",
    specificCompetencies: [
      "Nhận biết khái niệm hiểm họa và thảm họa.",
      "Phân biệt rõ sự khác nhau giữa hiểm họa (các hiện tượng tự nhiên/nhân tạo có nguy cơ đe dọa) và thảm họa (khi hiểm họa tác động vào cộng đồng dân cư mỏng manh, gây tổn thất lớn về người và tài sản do con người thiếu khả năng ứng phó)."
    ],
    generalCompetencies: [
      "Tự chủ và tự học: Chủ động quan sát tranh ảnh, phân tích tình huống thực tế về các mối hiểm họa xung quanh.",
      "Giao tiếp và hợp tác: Tích cực thảo luận nhóm phân loại tình huống hiểm họa và thảm họa.",
      "Giải quyết vấn đề và sáng tạo: Đề xuất các biện pháp giảm thiểu tổn thất khi gặp hiểm họa."
    ],
    qualities: [
      "Nhân ái: Biết cảm thông, sẻ chia và sẵn sàng giúp đỡ người gặp thảm họa thiên tai.",
      "Trách nhiệm: Có ý thức chủ động học tập kỹ năng phòng chống rủi ro, bảo vệ an toàn cho bản thân và gia đình."
    ],
    teacherMaterials: [
      "Hình ảnh minh họa các loại hiểm họa thiên nhiên (bão, lũ, sạt lở, dông sét) và hình ảnh thảm họa thực tế.",
      "Video clip giáo dục kỹ năng nhận diện rủi ro thiên tai tại địa phương, bảng tình huống phân loại hiểm họa."
    ],
    studentMaterials: [
      "Sổ tay ghi chép an toàn thiên tai, thông tin quan sát thực tế về tình hình mưa lũ tại địa phương Tân Thạnh."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Tạo hứng thú và gợi mở nhận thức ban đầu về sự khác nhau giữa nguy cơ hiểm họa và thảm họa thực tế.",
        teacherActivity: `• GV tổ chức trò chơi 'Nhận diện nguy cơ': Chiếu 2 bức tranh trên màn hình:
  + Tranh 1: Cơn mưa lớn kéo dài trên đảo hoang không có người sinh sống.
  + Tranh 2: Mưa lớn gây vỡ đập, ngập lụt cuốn trôi nhà cửa, gia súc của người dân.
• GV đặt câu hỏi gợi mở: 'Tranh nào chỉ mới là nguy cơ đe dọa, tranh nào đã thực sự gây ra tổn thất nghiêm trọng cho con người?'
• GV nhận xét câu trả lời của học sinh, dẫn dắt vào Bài 1: Hiểm họa và Thảm họa.`,
        studentActivity: `• HS quan sát kỹ 2 bức tranh trên màn hình.
• HS xung phong trả lời:
  + Tranh 1 là nguy cơ tiềm ẩn (hiểm họa).
  + Tranh 2 đã thực sự gây ra thiệt hại nặng nề cho con người và tài sản (thảm họa).
• HS lắng nghe GV nhận xét và ghi tên bài mới vào vở.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Hiểu bản chất hiểm họa, thảm họa và điều kiện khiến hiểm họa chuyển hóa thành thảm họa.",
        teacherActivity: `1. Hướng dẫn tìm hiểu về HIỂM HỌA:
• GV cho HS đọc thông tin và quan sát hình ảnh các hiện tượng: Bão, lũ lụt, sạt lở đất, dông sét, động đất, cháy nhà.
• GV hỏi: 'Hiểm họa là gì? Kể tên các hiểm họa em biết?'
• GV chốt kiến thức: Hiểm họa là sự kiện bất thường có thể gây thiệt hại về người, tài sản và môi trường sống.

2. Hướng dẫn phân biệt THẢM HỌA:
• GV nêu tình huống thảo luận nhóm 4: 'Khi nào một hiểm họa sẽ trở thành thảm họa?'
• GV gợi ý: 'Nếu bão lũ đánh vào vùng đảo không người so với đánh vào vùng dân cư đông đúc nhưng nhà cửa tạm bợ, thiếu chuẩn bị thì sao?'
• GV kết luận: Hiểm họa tác động vào cộng đồng mỏng manh, thiếu khả năng ứng phó sẽ biến thành THẢM HỌA.`,
        studentActivity: `1. Tìm hiểu HIỂM HỌA:
• HS quan sát tranh, đọc thông tin tài liệu.
• HS phát biểu: Hiểm họa là các thiên tai hoặc sự cố bất ngờ có nguy cơ gây hại (như bão, lũ, sạt lở đất...).

2. Phân biệt THẢM HỌA:
• HS thảo luận nhóm 4 trong 3 phút sôi nổi.
• Đại diện nhóm trình bày: Hiểm họa biến thành thảm họa khi nó xảy ra ở nơi có con người sinh sống và gây ra tổn thất lớn về người và tài sản do con người không kịp phòng tránh.
• HS ghi nhớ kiến thức cốt lõi.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Rèn luyện kỹ năng phân biệt chính xác giữa hiểm họa và thảm họa qua các tình huống thực tế.",
        teacherActivity: `• GV phát phiếu bài tập phân loại 4 tình huống:
  1) Trận động đất ở sa mạc không có người.
  2) Sạt lở đất đồi núi vùi lấp xóm bản ven sông.
  3) Cơn bão mạnh tràn qua thành phố làm sập nhà cửa, đứt cáp điện.
  4) Mưa đá nhỏ ở vùng rừng rậm không có người.
• GV yêu cầu các nhóm thảo luận, tích chọn tình huống nào là HIỂM HỌA, tình huống nào là THẢM HỌA và giải thích lý do vì sao.
• GV mời đại diện 2 nhóm lên bảng trình bày, nhận xét và chuẩn xác hóa kết quả.`,
        studentActivity: `• HS làm việc theo nhóm 4, thảo luận sôi nổi:
  + Tình huống 1, 4: Hiểm họa (vì không gây tổn thất cho con người).
  + Tình huống 2, 3: Thảm họa (vì gây thiệt hại nghiêm trọng về người và tài sản).
• Đại diện 2 nhóm lên bảng trình bày kết quả phân loại, các nhóm khác nhận xét, bổ sung.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Liên hệ thực tế hiểm họa tại địa phương và nâng cao ý thức chủ động phòng ngừa.",
        teacherActivity: `• GV yêu cầu HS liên hệ thực tế địa phương:
  'Hãy kể tên những hiểm họa thiên nhiên thường xuất hiện ở vùng em sống? Gia đình em cần làm gì để không bị biến thành thảm họa?'
• GV nhận xét, dặn dò HS về nhà chia sẻ với bố mẹ kiến thức vừa học.
• Hướng dẫn học sinh đọc và ghi nhớ Kết luận bài học.`,
        studentActivity: `• HS liên hệ bản thân và địa phương:
  + Địa phương em thường gặp bão, ngập lụt, dông sét.
  + Gia đình cần chằng chống nhà cửa, theo dõi dự báo thời tiết, không đi lội nước lũ để không bị thiệt hại.
• Đọc và ghi nhớ Kết luận bài học vào vở.`
      }
    ],
    notebookSummary: `1. Hiểm họa là những hiện tượng tự nhiên hoặc sự cố bất ngờ có nguy cơ gây hại.
2. Thảm họa xảy ra khi hiểm họa tác động vào cộng đồng thiếu khả năng phòng chống, gây tổn thất lớn về người và tài sản.
3. Con người hoàn toàn có thể chủ động phòng tránh và giảm nhẹ thảm họa bằng cách học tập kỹ năng và chuẩn bị sẵn sàng!`
  },

  // =========================================================================
  // BÀI 2: LŨ, LỤT (Tuần 7)
  // =========================================================================
  {
    lessonNumber: 2,
    week: 7,
    title: "Bài 2: Lũ, lụt",
    shortTitle: "Lũ, lụt",
    specificCompetencies: [
      "Hiểu được nguyên nhân (mưa lớn kéo dài, xả lũ, triều cường, mất rừng đầu nguồn) và tác hại nghiêm trọng của lũ, lụt.",
      "Nắm vững quy tắc an toàn 3 giai đoạn: Trước, Trong và Sau khi xảy ra lũ lụt."
    ],
    generalCompetencies: [
      "Tự chủ và tự học: Tự rèn luyện kỹ năng sinh tồn mùa mưa lũ, bảo vệ bản thân khi có nước dâng.",
      "Giao tiếp và hợp tác: Thực hành sắm vai tình huống ứng phó nước lũ dâng nhanh.",
      "Giải quyết vấn đề: Nhanh trí xử lý tình huống mất an toàn trong mùa mưa lũ."
    ],
    qualities: [
      "Trung thực, Trách nhiệm: Chấp hành nghiêm quy định an toàn mùa mưa lũ, tuyệt đối không tự ý đi lội nước, bơi lội hay đánh bắt cá khi có lũ."
    ],
    teacherMaterials: [
      "Video clip/tranh ảnh về cảnh lũ lụt, mô hình nhà sàn/gác xép chống lũ, phao cứu sinh, áo phao, còi cứu hộ."
    ],
    studentMaterials: [
      "Sổ tay ghi chép an toàn mùa mưa lũ, còi cứu hộ cá nhân (nếu có)."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Gây ấn tượng trực quan về sức tàn phá của nước lũ và khơi gợi ý thức tự bảo vệ.",
        teacherActivity: `• GV cho HS xem đoạn phim ngắn về trận lũ lịch sử ngập sâu mái nhà, cuốn trôi tài sản và hoa màu.
• GV hỏi: 'Em thấy nước lũ gây ra những hậu quả khủng khiếp như thế nào đối với con người và vật nuôi?'
• GV dẫn dắt vào Bài 2: Lũ, lụt.`,
        studentActivity: `• HS tập trung theo dõi video clip.
• HS phát biểu cảm nghĩ: Nước lũ làm ngập nhà cửa, cuốn trôi lúa gạo, tài sản, làm người dân phải trèo lên mái nhà chờ cứu hộ.
• HS lắng nghe GV giới thiệu bài.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Nắm vững nguyên nhân, tác hại và quy tắc an toàn 3 giai đoạn phòng chống lũ lụt.",
        teacherActivity: `1. Nguyên nhân và Tác hại của Lũ, lụt:
• GV giảng giải: Mưa lớn kéo dài, rừng đầu nguồn bị chặt phá, xả lũ hồ thủy điện là nguyên nhân chính gây lũ lụt.
• Hậu quả: Ngập lụt diện rộng, chia cắt giao thông, làm ô nhiễm nguồn nước, phát sinh dịch bệnh.

2. Quy tắc An toàn 3 giai đoạn (TRƯỚC - TRONG - SAU LŨ):
• GV chia lớp làm 3 nhóm thảo luận 3 giai đoạn.
• GV chuẩn xác hóa kiến thức:
  + TRƯỚC LŨ: Kê cao đồ đạc, bọc kín giấy tờ quan trọng, tích trữ nước sạch, thực phẩm khô, theo dõi loa đài.
  + TRONG LŨ: Ngắt cầu giao điện, di chuyển lên chỗ cao (gác xép, mái nhà), không lội nước lũ, thổi còi ra hiệu cứu hộ.
  + SAU LŨ: Đun sôi nước trước khi uống, dọn dẹp vệ sinh, phun thuốc khử trùng, tránh xa khu vực sạt lở.`,
        studentActivity: `1. Nguyên nhân và Tác hại:
• HS lắng nghe, quan sát tranh ảnh và ghi chép các nguyên nhân gây ra lũ lụt.

2. Quy tắc An toàn 3 giai đoạn:
• HS thảo luận nhóm, đại diện lên điền bảng 3 cột:
  + Trước lũ: Chuyển đồ lên cao, cất giấy tờ vào túi nilon, chuẩn bị mì tôm, nước uống.
  + Trong lũ: Không lội qua nước xoáy, trèo lên cao, thổi còi gọi cứu hộ.
  + Sau lũ: Ăn chín uống sôi, dọn vệ sinh bùn đất.
• HS chú ý lắng nghe và chốt kiến thức.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Thực hành phản xạ ứng phó nhanh khi nước lũ bất ngờ tràn vào nhà.",
        teacherActivity: `• GV tổ chức sắm vai tình huống khẩn cấp:
  'Nước lũ bắt đầu tràn nhanh vào nhà khi em đang ở nhà một mình. Em sẽ làm gì?'
• GV mời 2-3 HS lên thực hành hành động:
  1. Ngắt cầu giao điện (mô phỏng an toàn).
  2. Lấy túi đồ cứu hộ, trèo lên gác xép/bàn cao vững chắc.
  3. Thổi còi ra hiệu cứu hộ và gọi điện cho bố mẹ / 114.
• Nhận xét, uốn nắn thao tác chuẩn xác cho học sinh.`,
        studentActivity: `• HS tham gia sắm vai đóng tình huống hết sức nghiêm túc và nhanh nhạy.
• Các HS dưới lớp quan sát, nhận xét thao tác của bạn (như việc nhanh chóng trèo lên cao và dùng còi ra hiệu là rất chính xác).`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Tự tay lập sơ đồ an toàn và ghi nhớ số điện thoại cứu hộ khẩn cấp.",
        teacherActivity: `• GV hướng dẫn HS vẽ 'Sơ đồ an toàn nhà em khi có lũ':
  + Đánh dấu vị trí kê cao đồ đạc.
  + Đánh dấu nơi tránh trú cao nhất trong nhà.
  + Ghi rõ các số điện thoại khẩn cấp (Bố, Mẹ, Cứu hộ 114, Cảnh sát 113).
• Dặn dò học sinh đọc to phần Kết luận ghi nhớ.`,
        studentActivity: `• HS thực hành vẽ nhanh sơ đồ an toàn nhà mình vào giấy A4 và ghi chép đầy đủ các số điện thoại khẩn cấp để mang về treo ở góc học tập.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Tuyệt đối KHÔNG đi lội nước lũ, KHÔNG lội qua cầu tràn, KHÔNG bơi lội hay đánh bắt cá mùa lũ.
2. Trước khi lũ đến: Kê cao đồ đạc, tích trữ nước sạch và lương thực khô.
3. Khi nước lũ dâng cao: Ngắt ngay nguồn điện, di chuyển lên vị trí cao an toàn và thổi còi ra hiệu cứu hộ!`
  },

  // =========================================================================
  // BÀI 3: ÁP THẤP NHIỆT ĐỚI VÀ BÃO (Tuần 8)
  // =========================================================================
  {
    lessonNumber: 3,
    week: 8,
    title: "Bài 3: Áp thấp nhiệt đới và Bão",
    shortTitle: "Áp thấp nhiệt đới và Bão",
    specificCompetencies: [
      "Nhận biết các dấu hiệu đặc trưng của áp thấp nhiệt đới và bão (gió xoáy mạnh, mưa dông lớn, mây đen u ám).",
      "Nắm vững quy tắc ứng phó 3 giai đoạn: Trước bão (chằng chống nhà, tích trữ đồ), Trong bão (ở trong nhà kiên cố), Sau bão (tránh dây điện đứt)."
    ],
    generalCompetencies: [
      "Giao tiếp và hợp tác: Thảo luận lập danh mục túi đồ cứu hộ bão khẩn cấp.",
      "Giải quyết vấn đề và sáng tạo: Đề xuất các cách bảo vệ nhà cửa, tài sản gia đình khi có tin bão xa."
    ],
    qualities: [
      "Trách nhiệm: Chủ động hỗ trợ gia đình chằng chống nhà cửa, thường xuyên theo dõi tin dự báo thời tiết trên đài truyền hình/loa phát thanh."
    ],
    teacherMaterials: [
      "Bản đồ bão, tranh ảnh chằng chống nhà bằng bao cát/dây cáp, video mô phỏng sức tàn phá của gió bão, mẫu túi cứu hộ khẩn cấp."
    ],
    studentMaterials: [
      "Sổ tay ghi chép an toàn thiên tai, danh mục đồ dùng cứu hộ khẩn cấp của gia đình."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Khơi gợi kinh nghiệm thực tế về hiện tượng thời tiết gió bão.",
        teacherActivity: `• GV chiếu hình ảnh cây cối bật gốc, mái tôn bị bóc xới, cột điện đổ gãy do bão lớn.
• GV hỏi: 'Dấu hiệu nào cho biết một cơn bão hay áp thấp nhiệt đới sắp tràn qua quê em?'
• GV giới thiệu phân biệt: Áp thấp nhiệt đới (gió cấp 6-7) và Bão (gió từ cấp 8 trở lên). Dẫn dắt vào Bài 3.`,
        studentActivity: `• HS quan sát tranh và phát biểu các dấu hiệu: Bầu trời tối sầm, gió thổi cuồn cuộn, mưa trút xuống ào ào.
• HS ghi nhớ khái niệm về cấp độ gió bão.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Nắm vững quy tắc an toàn 3 giai đoạn phòng chống bão và áp thấp nhiệt đới.",
        teacherActivity: `• GV hướng dẫn quy tắc an toàn 3 giai đoạn phòng chống Bão:
  + TRƯỚC BÃO: Chằng chống nhà cửa bằng bao cát/dây cáp; chặt tỉa cành cây lớn gần nhà; di tản tàu thuyền vào nơi neo đậu; tích trữ nước sạch, thực phẩm, pin, đèn pin, thuốc y tế.
  + TRONG BÃO: Ở yên trong nhà vững chắc, chốt chặt các cửa sổ và cửa ra vào; tránh xa cửa kính; tuyệt đối không ra ngoài xem bão hay vớt gỗ.
  + SAU BÃO: Không chạm vào dây điện đứt, đề phòng cây cối/mái nhà sập đổ bất ngờ; tham gia dọn dẹp vệ sinh cùng người lớn.`,
        studentActivity: `• HS làm việc theo nhóm 4, thảo luận và hoàn thành bảng 'Quy tắc ứng phó với Bão':
  + Trước bão: Giúp bố mẹ xúc cát vào bao chằng mái nhà, chuẩn bị đèn pin, mì tôm.
  + Trong bão: Ở trong nhà kín gió, không chạy ra đường.
  + Sau bão: Không chạm tay vào dây điện rơi dưới đất.
• HS đại diện nhóm phát biểu, cả lớp chốt ghi nhớ.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Luyện tập lựa chọn các vật dụng quan trọng nhất trong túi đồ cứu hộ khẩn cấp.",
        teacherActivity: `• GV tổ chức bài tập 'Lựa chọn túi đồ cứu hộ khẩn cấp khi bão đến':
  GV đưa ra danh mục 10 vật dụng (Nước sạch, mì tôm, đèn pin, bánh kẹo, đồ chơi, thuốc y tế, còi, tiền/giấy tờ, gấu bông, quần áo ấm).
• Yêu cầu HS chọn 5 vật dụng QUAN TRỌNG NHẤT bắt buộc phải có trong túi cứu hộ.
• Nhận xét, chốt 5 vật dụng thiết yếu nhất.`,
        studentActivity: `• HS suy nghĩ cá nhân, viết 5 vật dụng thiết yếu ra giấy A4:
  1. Nước sạch
  2. Thực phẩm khô (mì tôm/lương khô)
  3. Đèn pin + pin dự phòng
  4. Thuốc cá nhân & bông băng y tế
  5. Giấy tờ quan trọng + còi cứu hộ.
• HS tự tin giải thích lý do lựa chọn của mình.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Vận dụng kiến thức kiểm tra mức độ an toàn của ngôi nhà trước mùa mưa bão.",
        teacherActivity: `• GV giao nhiệm vụ về nhà: 'Cùng bố mẹ kiểm tra lại toàn bộ cửa sổ, mái nhà và góc học tập của em xem đã an toàn trước mùa mưa bão sắp tới chưa'.
• Dặn dò HS đọc kỹ Kết luận ghi nhớ.`,
        studentActivity: `• HS ghi nhiệm vụ vào sổ tay để về nhà cùng gia đình kiểm tra chằng chống nhà cửa.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Trước khi bão đến: Chủ động chằng chống nhà cửa, cất dọn đồ đạc và tích trữ lương thực, nước uống, đèn pin.
2. Khi bão tràn qua: Ở yên trong nhà kiên cố, chốt chặt tất cả các cửa, tuyệt đối KHÔNG ra ngoài đường.
3. Sau khi bão tan: Tránh xa các vũng nước có dây điện đứt và các công trình bị hư hỏng nguy hiểm!`
  },

  // =========================================================================
  // BÀI 4: SẠT LỞ ĐẤT (Tuần 9)
  // =========================================================================
  {
    lessonNumber: 4,
    week: 9,
    title: "Bài 4: Sạt lở đất",
    shortTitle: "Sạt lở đất",
    specificCompetencies: [
      "Nhận biết 4 dấu hiệu cảnh báo sạt lở đất (vết nứt xuất hiện trên tường/đất đồi, nước đục bỗng nhiên phun ra, cây cối/cột điện nghiêng ngả, tiếng động lạ rầm rầm trong lòng đất).",
      "Nắm vững kỹ năng thoát hiểm chạy VUÔNG GÓC với hướng đất đá trượt."
    ],
    generalCompetencies: [
      "Tự chủ và tự học: Chủ động tìm hiểu dấu hiệu nguy hiểm quanh khu vực đồi dốc, bờ sông.",
      "Giải quyết vấn đề: Xác định chính xác hướng di chuyển an toàn khi có sạt lở đất xảy ra."
    ],
    qualities: [
      "Trách nhiệm: Không tự ý vui chơi tại các sườn đồi, bờ dốc, chân taluy có nguy cơ sạt lở mùa mưa bão."
    ],
    teacherMaterials: [
      "Video clip thực tế về vụ sạt lở đất đồi núi và bờ sông, tranh vẽ các dấu hiệu cảnh báo sạt lở đất, sơ đồ hướng thoát hiểm."
    ],
    studentMaterials: [
      "Sổ tay ghi chép các điểm xung yếu bờ kênh rạch tại địa phương có nguy cơ sạt lở."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Nhận biết hiểm họa sạt lở đất và mối nguy hiểm khôn lường tới tính mạng con người.",
        teacherActivity: `• GV chiếu clip ngắn 30 giây về hiện tượng hàng nghìn khối đất đá đồi núi trượt dốc đổ ập xuống đường giao thông.
• GV hỏi: 'Hiện tượng nguy hiểm này gọi là gì? Nó đe dọa đến tính mạng con người như thế nào?'
• GV dẫn dắt vào Bài 4: Sạt lở đất.`,
        studentActivity: `• HS xem clip sạt lở đất.
• HS trả lời: Đó là sạt lở đất, có thể vùi lấp nhà cửa, đường xá và con người chỉ trong vài giây.
• HS lắng nghe GV giới thiệu bài.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Nắm vững 4 dấu hiệu cảnh báo và kỹ năng chạy thoát hiểm vuông góc.",
        teacherActivity: `1. Hướng dẫn nhận biết 4 DẤU HIỆU SẠT LỞ ĐẤT:
• GV chiếu tranh vẽ minh họa 4 dấu hiệu:
  + Dấu hiệu 1: Xuất hiện vết nứt lớn trên mặt đất, sườn đồi hoặc tường nhà.
  + Dấu hiệu 2: Nước suối bỗng nhiên chuyển sang màu đục ngầu.
  + Dấu hiệu 3: Cây cối, hàng rào, cột điện bị nghiêng xô lệch.
  + Dấu hiệu 4: Nghe thấy tiếng động rầm rầm, tiếng gãy vỡ trong lòng đất.

2. Kỹ năng THOÁT HIỂM khi có sạt lở đất:
• GV nhấn mạnh quy tắc vàng: Chạy thật nhanh theo hướng VUÔNG GÓC với dòng đất đá rơi (chạy sang hai bên, KHÔNG chạy cùng hướng đất đá trượt xuống). Di chuyển ngay lên vị trí đất cao và vững chắc.`,
        studentActivity: `1. Nhận biết 4 Dấu hiệu:
• HS quan sát kĩ từng hình ảnh, ghi chép 4 dấu hiệu cảnh báo sạt lở đất vào vở.

2. Kỹ năng THOÁT HIỂM:
• HS chú ý lắng nghe quy tắc thoát hiểm.
• HS quan sát GV mô phạm hướng chạy vuông góc (chạy tản sang 2 bên vách đồi), không chạy thẳng xuống thung lũng cùng dòng chảy của đất đá.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Vận dụng kỹ năng xử lý tình huống gặp dấu hiệu sạt lở đất trên đường đi học.",
        teacherActivity: `• GV đưa ra tranh vẽ tình huống thực tế:
  'Bé Nam đang đi học về qua đoạn đường chân núi thì thấy có nhiều viên đá nhỏ lăn xuống, cây cối bên vách đồi bị nghiêng và có tiếng nổ lách tách'.
• GV hỏi: 'Em hãy cho biết Nam đang gặp nguy cơ gì và khuyên Nam nên xử lý thế nào?'`,
        studentActivity: `• HS suy nghĩ và trả lời:
  + Nam đang gặp nguy cơ sạt lở đất đồi núi khẩn cấp.
  + Khuyên Nam: Dừng lại ngay lập tức, không đi tiếp, chạy ngược lại khu vực an toàn xa vách núi và hô to báo cho mọi người biết.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Ghi nhớ quy tắc 4 chữ và cam kết giữ an toàn.",
        teacherActivity: `• GV hướng dẫn HS ghi nhớ bài học qua Quy tắc 4 chữ:
  'QUAN SÁT - MẮT THẤY - BÁO NGƯỜI LỚN - CHẠY THẬT NHANH'.
• GV dặn dò: Không bao giờ chăn thả gia súc hay chơi đùa ở các bờ đồi dốc, bờ sông mùa mưa bão.
• Đọc to phần Kết luận ghi nhớ.`,
        studentActivity: `• HS nhẩm lại quy tắc 4 chữ và hứa sẽ không vui chơi ở những nơi đồi dốc nguy hiểm.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Ghi nhớ 4 dấu hiệu sạt lở đất: Vết nứt đất, nước đục phun ra, cây nghiêng ngả và tiếng động rầm rầm trong lòng đất.
2. Khi phát hiện sạt lở đất: Phải báo ngay cho người lớn và chạy thật nhanh theo hướng VUÔNG GÓC với dòng chảy của đất đá.
3. Tuyệt đối KHÔNG chơi đùa, trú mưa hay chăn thả gia súc dưới chân đồi dốc đứng!`
  },

  // =========================================================================
  // BÀI 5: HẠN HÁN (Tuần 10)
  // =========================================================================
  {
    lessonNumber: 5,
    week: 10,
    title: "Bài 5: Hạn hán",
    shortTitle: "Hạn hán",
    specificCompetencies: [
      "Nhận biết hiện tượng hạn hán (thời tiết nắng nóng khô hạn kéo dài, thiếu hụt nước nghiêm trọng) và các tác hại đối với đời sống, nông nghiệp, môi trường.",
      "Nắm vững các hành động thực tế để tiết kiệm nước sạch và bảo vệ nguồn nước."
    ],
    generalCompetencies: [
      "Giải quyết vấn đề và sáng tạo: Đề xuất các sáng kiến tiết kiệm nước trong trường học và gia đình.",
      "Giao tiếp và hợp tác: Cùng bạn bè lan tỏa thông điệp tiết kiệm nước."
    ],
    qualities: [
      "Chăm chỉ, Trách nhiệm: Hình thành thói quen tiết kiệm nước hàng ngày, giữ gìn nguồn nước sạch không bị ô nhiễm."
    ],
    teacherMaterials: [
      "Tranh ảnh ruộng đồng nứt nẻ, sông hồ cạn đáy, cây cối héo khô, poster/tranh tuyên truyền tiết kiệm nước."
    ],
    studentMaterials: [
      "Sổ tay ghi chép nhật ký tiết kiệm nước tại gia đình và trường học."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Nhận biết hiện tượng hạn hán qua hình ảnh thực tế.",
        teacherActivity: `• GV cho HS xem các bức ảnh: Đất đai nứt nẻ chân chim, lòng sông cạn khô nhìn thấy đáy, cây trồng héo rũ.
• GV hỏi: 'Hiện tượng thời tiết nắng nóng thiếu mưa kéo dài này gọi là gì? Nó gây khó khăn gì cho con người?'
• GV dẫn dắt vào Bài 5: Hạn hán.`,
        studentActivity: `• HS quan sát các bức ảnh.
• HS trả lời: Đó là hiện tượng hạn hán. Hạn hán làm thiếu nước uống, chết cây trồng và vật nuôi.
• HS lắng nghe giới thiệu bài mới.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Hiểu tác hại của hạn hán và các biện pháp tiết kiệm nước sạch.",
        teacherActivity: `1. Tác hại của Hạn hán:
• GV giảng giải: Hạn hán gây thiếu nước sinh hoạt nghiêm trọng, mất mùa lương thực, suy giảm gia súc, tăng rủi ro cháy rừng và bùng phát dịch bệnh do ô nhiễm nguồn nước.

2. Các biện pháp TIẾT KIỆM NƯỚC sạch:
• GV chia nhóm thảo luận: 'Học sinh có thể làm những việc cụ thể nào để tiết kiệm nước tại nhà và tại trường?'
• GV chốt các hành động đúng:
  + Tắt vòi nước ngay khi đang đánh răng/thoa xà phòng rửa tay.
  + Tái sử dụng nước rửa rau/nước mưa để tưới cây, rửa sân.
  + Báo ngay cho thầy cô/bố mẹ khi thấy vòi nước bị rò rỉ.`,
        studentActivity: `1. Tác hại của Hạn hán:
• HS lắng nghe và ghi nhớ các hậu quả nặng nề của hạn hán.

2. Biện pháp Tiết kiệm nước:
• HS thảo luận nhóm 4 trong 3 phút.
• Đại diện nhóm trình bày các việc làm:
  + Không xả nước lãng phí.
  + Chỉ vặn vòi nước vừa đủ dùng.
  + Dùng ca/cốc khi đánh răng.
  + Báo người lớn sửa vòi nước hỏng.
• HS tuyên dương các ý tưởng hay.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Sáng tác tranh và khẩu hiệu tuyên truyền tiết kiệm nước.",
        teacherActivity: `• GV tổ chức cuộc thi 'Sáng tác Tranh & Khẩu hiệu Tiết kiệm nước':
  + GV phát giấy A4 cho các nhóm.
  + Yêu cầu các nhóm vẽ bức tranh nhỏ hoặc viết câu khẩu hiệu ngắn gọn, ý nghĩa về bảo vệ và tiết kiệm nguồn nước sạch.
• Mời đại diện các nhóm dán sản phẩm lên bảng và thuyết minh.`,
        studentActivity: `• Các nhóm hào hứng thảo luận, vẽ tranh và viết khẩu hiệu:
  Ví dụ câu khẩu hiệu: 'Tiết kiệm từng giọt nước - Cho tương lai xanh!', 'Nước là sự sống - Hãy tiết kiệm nước mỗi ngày!'.
• Đại diện nhóm dán sản phẩm lên bảng và thuyết minh ngắn.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Kiểm tra hệ thống vòi nước tại trường và thực hành thói quen tiết kiệm nước hàng ngày.",
        teacherActivity: `• GV phát động hoạt động trải nghiệm: 'Kiểm tra toàn bộ hệ thống vòi nước rửa tay của trường học sau giờ ra chơi và thực hành thói quen tiết kiệm nước hàng ngày'.
• Dặn dò HS đọc Kết luận ghi nhớ.`,
        studentActivity: `• HS phân công nhau kiểm tra các vòi nước ở dãy phòng học và cam kết vặn chặt vòi nước sau khi sử dụng.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Hạn hán là thiên tai thiếu nước nghiêm trọng, tàn phá cây trồng, gia súc và đời sống con người.
2. Nước sạch không phải là vô tận. Mỗi giọt nước chúng ta tiết kiệm hôm nay là sự sống cho ngày mai.
3. Hãy luôn vặn chặt vòi nước sau khi dùng, không lãng phí nước sạch và báo người lớn sửa ngay vòi nước rò rỉ!`
  },

  // =========================================================================
  // BÀI 6: CÁC HIỂM HỌA KHÁC (Tuần 11)
  // =========================================================================
  {
    lessonNumber: 6,
    week: 11,
    title: "Bài 6: Các hiểm họa khác (dông, sét, lốc, mưa đá, động đất, cháy)",
    shortTitle: "Các hiểm họa khác (Dông, sét, lốc, mưa đá, động đất, cháy)",
    specificCompetencies: [
      "Hiểu biết về các hiểm họa nguy hiểm khác như dông sét, lốc xoáy, mưa đá, động đất, cháy nổ.",
      "Nắm vững các quy tắc an toàn trú ẩn khẩn cấp (không trú dưới gốc cây to khi dông sét, quy tắc Núp - Che - Giữ khi động đất, che đầu khi mưa đá)."
    ],
    generalCompetencies: [
      "Tự chủ và tự học: Chủ động tìm hiểu kỹ năng ứng phó sự cố thiên tai bất ngờ.",
      "Giao tiếp và hợp tác: Thực hành diễn tập tư thế trú ẩn an toàn cùng tập thể lớp."
    ],
    qualities: [
      "Trách nhiệm: Bảo vệ an toàn cho bản thân và nhắc nhở bạn bè tuân thủ quy tắc an toàn khẩn cấp."
    ],
    teacherMaterials: [
      "Tranh ảnh về dông sét, lốc xoáy, mưa đá, động đất, cháy nhà; video hướng dẫn tư thế 'Núp - Che - Giữ' và tư thế trú sét an toàn."
    ],
    studentMaterials: [
      "Cặp sách, sổ tay ghi chép an toàn."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Khơi gợi nhận thức về các hiểm họa tự nhiên bất thường khác.",
        teacherActivity: `• GV trình chiếu hình ảnh tia sét đánh trúng cây cổ thụ và hình ảnh hạt mưa đá to bằng quả trứng gà rơi làm vỡ mái nhà.
• GV hỏi: 'Ngoài bão lũ, em còn biết những hiểm họa bất ngờ nào khác đe dọa con người?'
• GV dẫn dắt vào Bài 6: Các hiểm họa khác.`,
        studentActivity: `• HS quan sát tranh ảnh và kể tên các hiểm họa: Sét đánh, lốc xoáy, mưa đá, động đất, cháy nhà/rừng.
• HS lắng nghe giới thiệu bài mới.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Nắm vững kỹ năng ứng phó dông sét, mưa đá và quy tắc 'Núp - Che - Giữ' khi động đất.",
        teacherActivity: `1. Kỹ năng ứng phó DÔNG, SÉT, LỐC, MƯA ĐÁ:
• GV giảng giải: Khi có dông sét, tuyệt đối KHÔNG đứng dưới gốc cây to, KHÔNG ở trên đồng trống, KHÔNG cầm đồ kim loại. Nếu ở ngoài đồng, phải ngồi chụm 2 chân, kiễng gót nhón đất, hai tay ôm đầu.
• Khi có mưa đá/lốc xoáy: Vào ngay nhà kiên cố, dùng cặp sách/mũ bảo hiểm che đầu.

2. Kỹ năng ứng phó ĐỘNG ĐẤT:
• GV hướng dẫn Quy tắc 'NÚP - CHE - GIỮ':
  + NÚP ngay dưới gầm bàn học/gầm giường vững chắc.
  + CHE chặt đầu và cổ bằng hai tay hoặc cặp sách.
  + GIỮ chặt lấy chân bàn cho đến khi hết rung lắc.`,
        studentActivity: `1. Kỹ năng dông sét, mưa đá:
• HS ghi nhớ không trú mưa dưới gốc cây to và các vật dụng kim loại.
• HS quan sát GV mô phạm tư thế trú sét an toàn trên cánh đồng.

2. Kỹ năng động đất:
• HS ghi nhớ quy tắc NÚP - CHE - GIỮ.
• HS tập nhận biết các vị trí trú ẩn an toàn trong lớp học.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Diễn tập phản xạ tình huống khẩn cấp 'Ứng phó động đất tại lớp học'.",
        teacherActivity: `• GV tổ chức tình huống diễn tập nhanh 'Ứng phó động đất tại lớp học':
  + GV gõ mạnh vào mặt bàn tạo tiếng động giả định động đất, hô to: 'ĐỘNG ĐẤT! ĐỘNG ĐẤT!'.
  + GV quan sát và hướng dẫn toàn bộ HS thực hành chui ngay xuống gầm bàn học, hai tay ôm chặt đầu và giữ chặt chân bàn.
• Nhận xét tác phong diễn tập nhanh nhẹn, chuẩn xác của cả lớp.`,
        studentActivity: `• Toàn bộ HS thực hành diễn tập hết sức trật tự, nhanh chóng:
  1. Chui gọn gàng vào gầm bàn.
  2. Lấy cặp sách che đầu hoặc dùng hai tay ôm chặt đầu.
  3. Hai tay nắm chắc chân bàn học.
• Sau khi hết hiệu lệnh, HS chui ra xếp hàng trật tự.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Ghi nhớ và dặn dò người thân quy tắc tránh sét và trú ẩn an toàn.",
        teacherActivity: `• GV khen ngợi tinh thần diễn tập của HS.
• GV dặn dò: 'Khi đi đường đi học về mà gặp trời mưa dông to sấm sét, tuyệt đối không được đứng dưới gốc cây to hay cột điện để trú mưa'.
• Hướng dẫn học sinh đọc Kết luận ghi nhớ.`,
        studentActivity: `• HS ghi nhớ quy tắc dông sét và dặn dò nhau không trú mưa dưới gốc cây to.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Khi có dông sét: Tuyệt đối KHÔNG trú mưa dưới gốc cây to, cột điện hay mang vác vật dụng kim loại.
2. Khi có động đất: Nhớ ngay quy tắc NÚP (gầm bàn) - CHE (đầu) - GIỮ (chân bàn) cho đến khi hết rung lắc.
3. Khi có mưa đá/lốc xoáy: Vào ngay nhà kiên cố và lấy cặp sách/mũ bảo hiểm che chắn đầu!`
  },

  // =========================================================================
  // BÀI 7: CON NGƯỜI VÀ TÁC ĐỘNG CỦA HỌ ĐỐI VỚI HIỂM HỌA VÀ THẢM HỌA (Tuần 12)
  // =========================================================================
  {
    lessonNumber: 7,
    week: 12,
    title: "Bài 7: Con người và tác động của họ đối với hiểm họa và thảm họa",
    shortTitle: "Con người và tác động đối với hiểm họa và thảm họa",
    specificCompetencies: [
      "Nhận thức rõ hai mặt tác động của con người: Tác động tiêu cực (chặt phá rừng, xả rác bừa bãi, khai thác cát trái phép, làm ô nhiễm môi trường) làm gia tăng thảm họa; Tác động tích cực (trồng rừng ngập mặn/đầu nguồn, bảo vệ nguồn nước, phân loại rác) giúp giảm nhẹ rủi ro thảm họa."
    ],
    generalCompetencies: [
      "Giải quyết vấn đề và sáng tạo: Đề xuất các việc làm xanh bảo vệ thiên nhiên quanh trường lớp và nơi ở.",
      "Giao tiếp và hợp tác: Cùng nhóm phân tích và tuyên truyền các hành vi đúng/sai với môi trường."
    ],
    qualities: [
      "Yêu nước, Trách nhiệm: Có ý thức bảo vệ môi trường sống, tài nguyên thiên nhiên quê hương đất nước."
    ],
    teacherMaterials: [
      "Tranh ảnh đối lập: Một bên là rừng bị tàn phá/sông ô nhiễm rác thải; một bên là rừng phủ xanh tươi/dòng sông sạch; bảng phân tích hành vi ĐÚNG - SAI."
    ],
    studentMaterials: [
      "Kế hoạch hành động xanh: trồng cây, không xả rác xuống kênh rạch tại địa phương."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Quan sát hình ảnh đối lập để thấy rõ vai trò tác động của con người tới tự nhiên.",
        teacherActivity: `• GV chiếu 2 bức tranh đối lập:
  + Bức tranh A: Ngọn đồi xanh tốt phủ đầy cây cối.
  + Bức tranh B: Ngọn đồi bị chặt phá trọc lóc, sạt lở đất đá trượt xuống đường.
• GV hỏi: 'Hành động nào của con người đã biến ngọn đồi xanh A thành ngọn đồi trọc bị sạt lở B?'
• GV dẫn dắt vào Bài 7.`,
        studentActivity: `• HS quan sát 2 bức tranh đối lập.
• HS trả lời: Do con người tàn phá rừng, chặt phá cây cối bừa bãi làm đồi bị trọc và sạt lở.
• HS lắng nghe giới thiệu bài.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Phân tích tác động tiêu cực làm tăng thảm họa và tác động tích cực giúp giảm nhẹ thảm họa.",
        teacherActivity: `1. Tác động TIÊU CỰC của con người làm TĂNG thảm họa:
• GV giảng giải: Chặt phá rừng làm mất lớp phủ bảo vệ gây lũ quét, sạt lở đất; Xả rác tắc cống rãnh gây ngập lụt đô thị; Khí thải công nghiệp gây biến đổi khí hậu, tăng bão hạn hán.

2. Tác động TÍCH CỰC của con người giúp GIẢM NHẸ thảm họa:
• GV tổ chức thảo luận nhóm: 'Chúng ta cần làm gì để bảo vệ thiên nhiên và giảm nhẹ rủi ro thảm họa?'
• GV tổng kết các việc làm xanh: Trồng rừng ngập mặn chắn sóng bão, trồng cây phủ xanh đồi trọc, phân loại rác thải, tiết kiệm điện nước.`,
        studentActivity: `1. Tác động TIÊU CỰC:
• HS phân tích các hành vi sai trái của con người tàn phá môi trường.

2. Tác động TÍCH CỰC:
• HS thảo luận nhóm 4 trong 3 phút.
• Đại diện nhóm nêu các việc làm:
  + Trồng nhiều cây xanh ở trường và ở nhà.
  + Không vứt rác xuống cống rãnh, sông hồ.
  + Tuyên truyền mọi người bảo vệ rừng.
• HS chốt ghi nhớ.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Tham gia trò chơi phân loại hành động ĐÚNG - SAI đối với tự nhiên.",
        teacherActivity: `• GV tổ chức trò chơi phân loại 'HÀNH ĐỘNG ĐÚNG - HÀNH ĐỘNG SAI':
  GV đưa ra 6 thẻ bài ghi các hành vi:
  1) Chặt cây làm nương rẫy.
  2) Trồng rừng ngập mặn ven biển.
  3) Vứt pin cũ và túi nilon xuống sông.
  4) Tích cực tham gia 'Ngày Chủ nhật Xanh'.
  5) Xây nhà trái phép sát chân đồi dốc.
  6) Khai thác cát trái phép trên sông.
• Yêu cầu các nhóm dán thẻ vào 2 cột 'ĐÚNG - NÊN LÀM' hoặc 'SAI - NÊN TRÁNH'.`,
        studentActivity: `• Đại diện các nhóm nhanh chóng lên dán thẻ vào bảng:
  + Cột ĐÚNG (Nên làm): Thẻ 2, 4.
  + Cột SAI (Nên tránh): Thẻ 1, 3, 5, 6.
• Các nhóm nhận xét, giải thích lý do vì sao hành vi 1, 3, 5, 6 lại làm gia tăng thảm họa thiên tai.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Phát động phong trào hành động xanh và ghi nhớ bài học.",
        teacherActivity: `• GV phát động phong trào 'Mỗi học sinh trồng và chăm sóc một cây xanh':
  + Khuyến khích HS trồng một chậu cây nhỏ ở góc học tập hoặc tham gia trồng cây tại khuôn viên trường học.
• Hướng dẫn học sinh đọc Kết luận ghi nhớ.`,
        studentActivity: `• HS hào hứng hưởng ứng phong trào trồng cây xanh và đăng ký loại cây mình sẽ chăm sóc.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Con người tàn phá thiên nhiên (chặt rừng, xả rác, ô nhiễm) sẽ làm gia tăng bão, lũ quét, sạt lở và hạn hán.
2. Thiên nhiên bảo vệ con người khi con người biết yêu quý và bảo vệ thiên nhiên.
3. Mỗi cây xanh chúng ta trồng và mỗi hành động giữ gìn vệ sinh môi trường đều góp phần giảm nhẹ thảm họa thiên tai!`
  },

  // =========================================================================
  // BÀI 8: THIẾU NIÊN CHỮ THẬP ĐỎ VỚI CÔNG TÁC PHÒNG NGỪA THẢM HỌA (Tuần 13)
  // =========================================================================
  {
    lessonNumber: 8,
    week: 13,
    title: "Bài 8: Thiếu niên Chữ thập đỏ với công tác phòng ngừa thảm họa",
    shortTitle: "Thiếu niên Chữ thập đỏ với phòng ngừa thảm họa",
    specificCompetencies: [
      "Hiểu được vai trò, nhiệm vụ cao đẹp của Đội Thiếu niên Chữ thập đỏ trong nhà trường và cộng đồng.",
      "Nắm vững các kỹ năng cơ bản về tuyên truyền an toàn, sơ cấp cứu vết thương trầy xước nhẹ ban đầu và hỗ trợ bạn bè khi có thiên tai."
    ],
    generalCompetencies: [
      "Giao tiếp và hợp tác: Kỹ năng làm việc nhóm, tuyên truyền măng non phòng chống tai nạn thương tích.",
      "Tự chủ và tự học: Rèn luyện kỹ năng sơ cấp cứu cơ bản."
    ],
    qualities: [
      "Nhân ái, Trách nhiệm: Sẵn sàng giúp đỡ bạn bè, người già, trẻ nhỏ; tích cực tham gia các hoạt động nhân đạo Chữ thập đỏ."
    ],
    teacherMaterials: [
      "Biểu tượng Chữ thập đỏ (màu đỏ trên nền trắng), hộp cứu thương y tế, băng gạc tiệt trùng, bông, gạc, dung dịch sát khuẩn, tranh ảnh hoạt động Chữ thập đỏ măng non."
    ],
    studentMaterials: [
      "Cuộn băng gạc cá nhân, sổ tay ghi chép."
    ],
    activities: [
      {
        name: "★ 1. Hoạt động Mở đầu (Khởi động)",
        objective: "Nhận biết biểu tượng Chữ thập đỏ và ý nghĩa nhân đạo cao đẹp.",
        teacherActivity: `• GV cho HS quan sát Biểu tượng Chữ thập đỏ (màu đỏ tươi trên nền trắng).
• GV hỏi: 'Em thấy biểu tượng này xuất hiện ở những đâu? Nó tượng trưng cho điều gì?'
• GV dẫn dắt vào Bài 8: Thiếu niên Chữ thập đỏ với công tác phòng ngừa thảm họa.`,
        studentActivity: `• HS quan sát biểu tượng.
• HS trả lời: Biểu tượng có ở bệnh viện, xe cấp cứu, hộp y tế; tượng trưng cho sự cứu chữa, giúp đỡ người gặp khó khăn, tinh thần nhân đạo.
• HS lắng nghe bài mới.`
      },
      {
        name: "★ 2. Hoạt động Khám phá",
        objective: "Tìm hiểu nhiệm vụ của Đội Thiếu niên Chữ thập đỏ và kỹ năng sơ cấp cứu vết thương nhẹ.",
        teacherActivity: `1. Nhiệm vụ của Đội Thiếu niên Chữ thập đỏ trường học:
• GV giới thiệu các hoạt động ý nghĩa: Tuyên truyền kỹ năng an toàn thiên tai cho bạn bè; Kiểm tra phát hiện các nguy cơ mất an toàn trong trường; Tham gia phong trào quyên góp ủng hộ đồng bào bị thiên tai; Tập huấn kỹ năng sơ cấp cứu.

2. Hướng dẫn kỹ năng SƠ CẤP CỨU vết thương trầy xước nhẹ:
• GV làm mẫu các bước sơ cứu vết thương trầy xước nhẹ ở tay/chân:
  + Bước 1: Rửa sạch vết thương bằng nước sạch hoặc dung dịch sát trùng.
  + Bước 2: Dùng gạc tiệt trùng thấm khô vết thương.
  + Bước 3: Đặt miếng gạc sạch lên vết thương và dùng cuộn băng gạc cuốn nhẹ nhàng, cố định lại.`,
        studentActivity: `1. Nhiệm vụ Thiếu niên Chữ thập đỏ:
• HS tìm hiểu các hoạt động nhân đạo Chữ thập đỏ măng non.

2. Kỹ năng SƠ CẤP CỨU:
• HS quan sát tỉ mỉ từng thao tác mẫu của GV (rửa vết thương ➔ đặt gạc ➔ cuộn băng).
• HS ghi nhớ các bước sơ cứu ban đầu.`
      },
      {
        name: "★ 3. Hoạt động Luyện tập, thực hành",
        objective: "Thực hành cặp đôi kỹ năng băng bó vết thương nhẹ ở cẳng tay.",
        teacherActivity: `• GV tổ chức thực hành cặp đôi 'Băng gạc vết thương giả định ở cẳng tay cho bạn':
  + GV phát mỗi cặp HS một cuộn băng gạc nhỏ.
  + Một bạn đóng vai người bị thương nhẹ, một bạn đóng vai Đội viên Chữ thập đỏ thực hiện các bước sơ cứu và băng bó.
• GV đi từng bàn quan sát, uốn nắn thao tác cuộn băng gạc cho HS.`,
        studentActivity: `• HS hào hứng thực hành cặp đôi:
  + Bạn đóng vai Chữ thập đỏ thực hiện thao tác nhẹ nhàng, đặt gạc và quấn băng gạc đều tay quanh cẳng tay bạn, cố định mối quấn gọn gàng.
  + Hai bạn đổi vai cho nhau thực hành lại.`
      },
      {
        name: "★ 4. Hoạt động Vận dụng, trải nghiệm",
        objective: "Đăng ký tham gia hoạt động nhân đạo và ghi nhớ bài học tổng kết.",
        teacherActivity: `• GV khuyến khích HS: 'Đăng ký tham gia Đội Thiếu niên Chữ thập đỏ của nhà trường và luôn chủ động nhắc nhở bạn bè giữ an toàn trong mùa mưa bão'.
• GV nhận xét tổng kết toàn bộ khóa học phòng ngừa thảm họa.
• Hướng dẫn học sinh đọc Kết luận ghi nhớ.`,
        studentActivity: `• HS tự tin đăng ký tham gia Đội Thiếu niên Chữ thập đỏ và hứa sẽ luôn sẵn sàng giúp đỡ bạn bè.
• Đọc và ghi nhớ Kết luận bài học.`
      }
    ],
    notebookSummary: `1. Thiếu niên Chữ thập đỏ là lực lượng măng non nòng cốt trong việc học tập và tuyên truyền kỹ năng phòng tránh thảm họa thiên tai.
2. Nắm vững kỹ năng sơ cấp cứu ban đầu giúp em tự bảo vệ bản thân và kịp thời hỗ trợ bạn bè khi gặp sự cố.
3. Luôn nuôi dưỡng lòng nhân ái, sẵn sàng sẻ chia và giúp đỡ đồng bào gặp khó khăn do thiên tai gây ra!`
  }
];

/**
 * Kiểm tra xem tuần này có áp dụng tài liệu Giảm nhẹ rủi ro thảm họa hay không.
 * Quy định: Bắt đầu thực hiện từ Tuần thứ 6 trở đi.
 */
export function isDisasterCurriculumActive(week: number): boolean {
  return week >= 6;
}

/**
 * Lấy thông tin bài học Phòng ngừa và giảm nhẹ rủi ro thảm họa cho tuần tương ứng.
 * Tuần 6 -> Bài 1
 * Tuần 7 -> Bài 2
 * Tuần 8 -> Bài 3
 * Tuần 9 -> Bài 4
 * Tuần 10 -> Bài 5
 * Tuần 11 -> Bài 6
 * Tuần 12 -> Bài 7
 * Tuần 13 -> Bài 8
 * Các tuần lớn hơn 13: Xoay vòng hoặc ôn tập tổng hợp.
 */
export function getDisasterLessonForWeek(week: number): DisasterLesson | null {
  if (!isDisasterCurriculumActive(week)) {
    return null;
  }
  const index = (week - 6) % DISASTER_CURRICULUM_DATA.length;
  return DISASTER_CURRICULUM_DATA[index] || DISASTER_CURRICULUM_DATA[0];
}

/**
 * Tiêu đề môn học chuẩn cho LBG và KHBD
 */
export const DISASTER_SUBJECT_TITLE = "PHÒNG NGỪA VÀ GIẢM NHẸ RỦI RO THẢM HỌA";
export const DISASTER_INTEGRATION_NOTE = "Tài liệu UBND xã Tân Thạnh - Trường TH Tân Thạnh (Biên soạn theo CV 2345/BGDĐT)";

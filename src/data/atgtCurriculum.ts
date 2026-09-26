import { Grade } from "../types";

export interface AtgtLesson {
  lessonNumber: number; // 1 to 10
  title: string;
  topicShort: string;
  grade: Grade;
  objective: string;
  teacherGuide: string;
  studentPractice: string;
}

// 10 bài An toàn giao thông cho từng khối (Lớp 1 đến Lớp 5)
// Theo bộ tài liệu "Giáo dục An toàn giao thông cho học sinh tiểu học" của Bộ Giáo dục và Đào tạo
export const ATGT_CURRICULUM_DATA: Record<Grade, AtgtLesson[]> = {
  // KHỐI 1 (LỚP 1)
  1: [
    {
      lessonNumber: 1,
      title: "Bài 1: Đi bộ an toàn trên đường",
      topicShort: "Đi bộ an toàn trên đường và vỉa hè",
      grade: 1,
      objective: "Nhận biết quy tắc đi bộ an toàn trên vỉa hè hoặc sát mép đường bên phải khi không có vỉa hè; biết nắm tay người lớn khi qua đường.",
      teacherGuide: "Cho HS quan sát tranh hướng dẫn đi bộ trên vỉa hè, đi sát mép đường bên phải nơi không có vỉa hè. Nhắc nhở HS không được nô đùa, chạy nhảy dưới lòng đường. Thực hành mô phỏng nắm tay người lớn qua đường.",
      studentPractice: "Quan sát tranh ảnh, nêu được quy tắc đi bộ an toàn: Đi trên vỉa hè hoặc sát lề đường bên phải. Thực hành cùng bạn đóng vai nắm tay người lớn đi bộ qua đường."
    },
    {
      lessonNumber: 2,
      title: "Bài 2: Đội mũ bảo hiểm khi ngồi trên xe máy, xe đạp điện",
      topicShort: "Đội mũ bảo hiểm đúng cách",
      grade: 1,
      objective: "Biết tác dụng của mũ bảo hiểm và các bước đội mũ bảo hiểm đạt chuẩn, cài quai chắc chắn khi ngồi trên xe máy, xe đạp điện.",
      teacherGuide: "Hướng dẫn 3 bước đội mũ bảo hiểm: 1. Chọn mũ vừa đầu; 2. Đội mũ thẳng, che kín trán; 3. Cài khóa và kiểm tra quai vừa 2 ngón tay dưới cằm. Gọi 2 HS lên thực hành thao tác mẫu.",
      studentPractice: "Tập thao tác đội mũ bảo hiểm và cài quai đúng cách trên mô hình hoặc mũ thực tế. Nhắc nhở người thân luôn đội mũ bảo hiểm khi tham gia giao thông."
    },
    {
      lessonNumber: 3,
      title: "Bài 3: Ngồi an toàn trên xe máy và xe đạp",
      topicShort: "Tư thế ngồi an toàn trên xe máy, xe đạp",
      grade: 1,
      objective: "Nắm vững tư thế ngồi an toàn sau xe máy, xe đạp: ngồi ngay ngắn, hai tay ôm eo người lái, hai chân để lên thanh để chân, không đứng hay quay ngang.",
      teacherGuide: "Trình chiếu hình ảnh tư thế ngồi đúng và tư thế nguy hiểm (đứng trên yên, buông hai tay, đùa nghịch). Hướng dẫn quy tắc an toàn: Lên xuống xe khi xe đã dừng hẳn và có sự cho phép của người lớn.",
      studentPractice: "Quan sát tranh, phân biệt hành vi đúng/sai. Thực hành ngồi đúng tư thế trên ghế lớp học mô phỏng yên xe máy."
    },
    {
      lessonNumber: 4,
      title: "Bài 4: Nhớ và thực hiện hiệu lệnh của đèn tín hiệu giao thông",
      topicShort: "Hiệu lệnh đèn tín hiệu giao thông",
      grade: 1,
      objective: "Nhận biết ý nghĩa 3 màu đèn tín hiệu giao thông: Đỏ (dừng lại), Vàng (chậm lại chuẩn bị dừng), Xanh (được phép đi).",
      teacherGuide: "Tổ chức trò chơi 'Đèn xanh, đèn đỏ': GV giơ thẻ màu, HS thực hiện động tác (Đỏ: dừng đứng yên; Vàng: đi chậm; Xanh: bước nhanh). Giáo dục thói quen tuân thủ tín hiệu đèn.",
      studentPractice: "Tham gia hào hứng trò chơi phản xạ tín hiệu đèn. Ghi nhớ khẩu quyết: Đèn đỏ dừng lại - Đèn xanh mới đi - Đèn vàng chuẩn bị."
    },
    {
      lessonNumber: 5,
      title: "Bài 5: Đi qua đường an toàn tại nơi có vạch kẻ đường",
      topicShort: "Qua đường nơi có vạch kẻ đi bộ",
      grade: 1,
      objective: "Biết tìm vạch kẻ đường dành cho người đi bộ khi cần qua đường; biết quan sát hai phía và giơ tay xin đường.",
      teacherGuide: "Dùng băng dán mô phỏng vạch sang đường trên sàn lớp. Hướng dẫn quy trình 3 bước: Dừng lại quan sát trái - phải - trái; Giơ cao tay xin đường; Đi thẳng dứt khoát, không chạy vụt.",
      studentPractice: "Thực hành đi bộ qua đường theo vạch kẻ sơn trên lớp học. Luôn nhớ quan sát kỹ trước khi bước xuống đường."
    },
    {
      lessonNumber: 6,
      title: "Bài 6: Nhận biết một số biển báo hiệu giao thông đường bộ cơ bản",
      topicShort: "Làm quen biển báo giao thông",
      grade: 1,
      objective: "Nhận biết hình dáng và ý nghĩa các biển báo quen thuộc quanh trường học: Biển cấm đi bộ, Biển đường người đi bộ sang ngang, Biển trẻ em qua đường.",
      teacherGuide: "Giới thiệu các biển báo giao thông bằng thẻ màu trực quan. Hướng dẫn cách phân biệt: Biển tròn viền đỏ (cấm), Biển vuông/chữ nhật nền xanh (chỉ dẫn).",
      studentPractice: "Ghép đúng tên biển báo với hình ảnh. Nhận diện các biển báo thường gặp trên đường từ nhà đến trường."
    },
    {
      lessonNumber: 7,
      title: "Bài 7: Đi xe đạp an toàn trong sân và khu vực an toàn",
      topicShort: "Tập xe đạp nơi an toàn",
      grade: 1,
      objective: "Biết lựa chọn địa điểm tập đi xe đạp an toàn (sân nhà, công viên); không tự ý đi xe đạp ra đường giao thông đông đúc khi chưa đủ tuổi.",
      teacherGuide: "Phân tích vì sao học sinh lớp 1 chưa được tự đi xe đạp ra đường quốc lộ, ngã tư. Dặn dò các vị trí được phép tập xe đạp an toàn dưới sự giám sát của bố mẹ.",
      studentPractice: "Chia sẻ nơi em thường chơi xe đạp ở nhà. Cam kết chỉ đi xe đạp trong sân nhà, công viên và có người lớn đi cùng."
    },
    {
      lessonNumber: 8,
      title: "Bài 8: An toàn khi đi trên ô tô và phương tiện công cộng",
      topicShort: "An toàn khi đi ô tô, xe buýt",
      grade: 1,
      objective: "Biết thắt dây an toàn khi đi ô tô; không thò đầu, thò tay ra ngoài cửa sổ; trật tự ngồi yên vị trí khi xe đang chạy.",
      teacherGuide: "Chiếu video clip mô phỏng các nguy cơ khi thò đầu ra cửa xe ô tô. Hướng dẫn cách cài chốt dây an toàn ghế ô tô.",
      studentPractice: "Mô phỏng động tác thắt dây an toàn, ngồi trật tự trên ghế xe và chỉ mở cửa khi xe dừng hẳn."
    },
    {
      lessonNumber: 9,
      title: "Bài 9: Nhận biết những hành vi nguy hiểm khi chơi gần đường",
      topicShort: "Không chơi đùa dưới lòng đường",
      grade: 1,
      objective: "Nhận diện các hành vi nguy hiểm: đá bóng, đuổi bắt dưới lòng đường, nhặt đồ rơi giữa đường; biết cách phòng tránh va chạm.",
      teacherGuide: "Cho HS quan sát tranh tình huống quả bóng lăn ra đường. Hỏi: 'Em sẽ làm gì?' -> Hướng dẫn không lao ra nhặt bóng mà phải nhờ người lớn lấy giúp.",
      studentPractice: "Thảo luận cách xử lý tình huống: Nhờ người lớn hỗ trợ, tuyệt đối không lao ra đường bất ngờ."
    },
    {
      lessonNumber: 10,
      title: "Bài 10: Tự giác chấp hành văn hóa và nề nếp giao thông",
      topicShort: "Xây dựng nếp sống văn hóa giao thông",
      grade: 1,
      objective: "Hình thành thói quen chấp hành nghiêm túc các quy tắc an toàn giao thông; xếp hàng ra về trước cổng trường trật tự.",
      teacherGuide: "Tổng kết nề nếp giao thông của lớp. Hướng dẫn đội hình xếp hàng di chuyển ra cổng trường khi tan học, tránh chen lấn gây ùn tắc cổng trường.",
      studentPractice: "Thực hành xếp hàng ngay ngắn ra cổng trường, chào thầy cô và lên xe người thân đón về an toàn."
    },
  ],

  // KHỐI 2 (LỚP 2)
  2: [
    {
      lessonNumber: 1,
      title: "Bài 1: Đi bộ an toàn và kỹ năng qua đường",
      topicShort: "Đi bộ và qua đường an toàn",
      grade: 2,
      objective: "Rèn luyện kỹ năng quan sát hai hướng đường, nhận biết chướng ngại vật và đi bộ an toàn trên mọi tuyến đường làng, phố.",
      teacherGuide: "Hướng dẫn nhận diện các mối nguy hiểm tiềm ẩn khi đi bộ: xe đi nhanh từ ngõ rẽ ra, chướng ngại vật trên hè phố. Thao tác quan sát 3 bước khi qua đường.",
      studentPractice: "Thực hành nhận biết nguy cơ và rèn luyện thói quen tập trung chú ý khi đi bộ trên đường."
    },
    {
      lessonNumber: 2,
      title: "Bài 2: Đi bộ qua đường an toàn ở nơi không có đèn tín hiệu",
      topicShort: "Qua đường nơi không có đèn tín hiệu",
      grade: 2,
      objective: "Biết cách chọn vị trí qua đường có tầm nhìn thông thoáng; kiên nhẫn chờ đợi xe cộ qua hết mới băng qua đường.",
      teacherGuide: "Đưa ra tình huống qua đường ở đoạn đường nông thôn, đường làng không có đèn tín hiệu. Hướng dẫn chọn chỗ thẳng, quan sát xa, không qua đường ở khúc cua gấp.",
      studentPractice: "Nêu các bước qua đường an toàn nơi không có đèn: Chọn chỗ thoáng, nhìn trái nhìn phải, chờ an toàn mới đi dứt khoát."
    },
    {
      lessonNumber: 3,
      title: "Bài 3: Chọn mũ bảo hiểm đạt chuẩn và đội mũ đúng quy cách",
      topicShort: "Mũ bảo hiểm đạt chuẩn và cài quai đúng",
      grade: 2,
      objective: "Nhận biết mũ bảo hiểm đạt chuẩn (có tem kiểm định CR, lớp xốp dày, quai chắc chắn); tự giác đội mũ bảo hiểm mỗi ngày.",
      teacherGuide: "Đem 2 chiếc mũ (đạt chuẩn và mũ kém chất lượng/mũ thời trang). Cho HS sờ lớp xốp, dây khóa để phân biệt. Thực hành cài quai chắc chắn.",
      studentPractice: "Quan sát tem kiểm định CR, kiểm tra độ chắc chắn của quai mũ. Tự đội và nhờ bạn kiểm tra độ vừa vặn của quai mũ."
    },
    {
      lessonNumber: 4,
      title: "Bài 4: Ngồi an toàn trên xe mô tô, xe gắn máy và xe buýt",
      topicShort: "An toàn khi ngồi sau xe máy và đi xe buýt",
      grade: 2,
      objective: "Nắm vững kỹ năng lên xuống xe buýt (xếp hàng, chờ xe đỗ hẳn) và tư thế giữ thăng bằng an toàn sau xe máy.",
      teacherGuide: "Hướng dẫn quy tắc đi xe buýt: Chờ tại điểm dừng, xếp hàng lên xe, nhường ghế người già, phụ nữ có con nhỏ; không bám víu vào cửa xe.",
      studentPractice: "Đóng vai hành khách đi xe buýt lịch sự, biết nhường ghế cho người già và giữ trật tự trên xe."
    },
    {
      lessonNumber: 5,
      title: "Bài 5: Hiệu lệnh của người điều khiển giao thông",
      topicShort: "Hiệu lệnh của chú Cảnh sát giao thông",
      grade: 2,
      objective: "Hiểu được các hiệu lệnh cơ bản của Cảnh sát giao thông (giơ tay thẳng đứng, giang hai tay, vẫy tay) và biết ưu tiên tuân theo hiệu lệnh người điều khiển.",
      teacherGuide: "Thực hiện các tư thế điều khiển giao thông bằng còi và gậy chỉ huy. Giảng giải: Khi hiệu lệnh của CSGT trái với đèn tín hiệu thì phải theo lệnh CSGT.",
      studentPractice: "Quan sát và làm theo các hiệu lệnh của CSGT mô phỏng: Dừng lại khi gậy chỉ thẳng đứng; Đi khi gậy vẫy sang phía mình."
    },
    {
      lessonNumber: 6,
      title: "Bài 6: Những nguy hiểm khi vui chơi gần khu vực đường sá",
      topicShort: "Phòng tránh nguy hiểm gần đường sá",
      grade: 2,
      objective: "Nhận biết các khu vực cấm chơi đùa: lòng đường, vỉa hè chật hẹp, mép bờ sông/kênh rạch gần đường; lựa chọn sân chơi an toàn.",
      teacherGuide: "Chiếu tranh các tình huống nguy hiểm: thả diều gần đường dây điện và đường quốc lộ, trượt patin dưới lòng đường. Nhắc nhở tìm sân chơi an toàn.",
      studentPractice: "Chỉ ra tác hại khôn lường của việc đùa nghịch gần đường. Cam kết chỉ chơi đùa tại sân trường, sân nhà hoặc nhà văn hóa."
    },
    {
      lessonNumber: 7,
      title: "Bài 7: Nhận biết các nhóm biển báo hiệu giao thông đường bộ",
      topicShort: "Phân biệt 4 nhóm biển báo cơ bản",
      grade: 2,
      objective: "Phân biệt 3 nhóm biển báo chính: Biển báo cấm (hình tròn viền đỏ), Biển báo nguy hiểm (hình tam giác viền đỏ nền vàng), Biển chỉ dẫn (hình chữ nhật nền xanh).",
      teacherGuide: "Tổ chức trò chơi phân loại biển báo: Chia nhóm 4, phát các thẻ hình biển báo để học sinh phân vào 3 nhóm tương ứng.",
      studentPractice: "Thi đua xếp đúng thẻ biển báo vào bảng nhóm. Nêu được ý nghĩa cơ bản của màu sắc và hình dạng biển báo."
    },
    {
      lessonNumber: 8,
      title: "Bài 8: Phòng tránh tai nạn nơi tầm nhìn bị che khuất và ngõ hẻm",
      topicShort: "Phòng tránh tai nạn nơi góc khuất, ngõ hẻm",
      grade: 2,
      objective: "Nhận biết điểm nguy hiểm tại các ngõ hẻm, bờ tường cao che khuất tầm nhìn; biết đi chậm và lắng nghe tiếng còi xe.",
      teacherGuide: "Hướng dẫn quy tắc: 'Đi chậm - Quan sát - Lắng nghe tiếng còi' khi từ ngõ hẻm đi ra đường chính. Không bao giờ phóng nhanh hoặc chạy ào ra đường.",
      studentPractice: "Thực hành tình huống đi từ ngõ khuất ra đường lớn: Dừng lại trước mép ngõ, ngó nghiêng quan sát và bấm chuông cảnh báo."
    },
    {
      lessonNumber: 9,
      title: "Bài 9: Đi lại an toàn trong điều kiện thời tiết xấu (mưa bão, sương mù)",
      topicShort: "An toàn khi đi lại lúc trời mưa, sương mù",
      grade: 2,
      objective: "Biết cách chuẩn bị khi trời mưa: mặc áo mưa cánh dơi cẩn thận (không che khuất gương chiếu hậu, không để tà áo quấn vào bánh xe), đi ủng chống trượt.",
      teacherGuide: "Phân tích tai nạn thường gặp do tà áo mưa quấn bánh xe máy. Hướng dẫn gấp tà áo gọn gàng khi ngồi xe, đi lại cẩn thận tránh vũng nước trơn trượt.",
      studentPractice: "Tập gấp tà áo mưa gọn gàng khi ngồi sau xe máy. Nhắc nhở người thân đi chậm, bật đèn xe khi trời mưa to, sương mù."
    },
    {
      lessonNumber: 10,
      title: "Bài 10: Em là tuyên truyền viên nhí về an toàn giao thông",
      topicShort: "Tuyên truyền an toàn giao thông trong gia đình",
      grade: 2,
      objective: "Biết nhắc nhở bố mẹ, người thân không uống rượu bia khi lái xe, luôn đội mũ bảo hiểm và chấp hành luật lệ giao thông.",
      teacherGuide: "Tổ chức cho HS sắm vai tình huống: Bé nhắc bố đội mũ bảo hiểm, nhắc mẹ không sử dụng điện thoại khi đang điều khiển xe máy.",
      studentPractice: "Sắm vai tự tin, nêu lời nhắc nhở chân thành, lễ phép với cha mẹ về an toàn giao thông."
    },
  ],

  // KHỐI 3 (LỚP 3)
  3: [
    {
      lessonNumber: 1,
      title: "Bài 1: Cổng trường an toàn giao thông",
      topicShort: "Văn hóa giao thông khu vực cổng trường",
      grade: 3,
      objective: "Hiểu mô hình 'Cổng trường an toàn giao thông'; không tụ tập gây ùn tắc, nhắc nhở phụ huynh dừng đỗ xe đúng nơi quy định.",
      teacherGuide: "Cho xem phóng sự ảnh cổng trường giờ tan tầm. Thảo luận các việc học sinh lớp 3 cần làm: Xếp hàng ra về, nhắc phụ huynh đỗ xe sát mép hè.",
      studentPractice: "Thảo luận nhóm đề xuất các biện pháp giúp cổng trường luôn thông thoáng, sạch đẹp và văn minh."
    },
    {
      lessonNumber: 2,
      title: "Bài 2: Kĩ năng đi bộ và chọn đường đi an toàn",
      topicShort: "Lựa chọn tuyến đường đi an toàn",
      grade: 3,
      objective: "Biết cách lựa chọn tuyến đường từ nhà đến trường có vỉa hè, có đèn chiếu sáng, ít nút giao cắt phức tạp.",
      teacherGuide: "Hướng dẫn học sinh vẽ sơ đồ đường từ nhà đến trường, đánh dấu những điểm đen nguy hiểm cần tránh (ngã tư không đèn, công trường thi công).",
      studentPractice: "Vẽ sơ đồ đơn giản tuyến đường đi học của bản thân, xác định các điểm an toàn và vị trí cần hết sức cẩn thận."
    },
    {
      lessonNumber: 3,
      title: "Bài 3: Điều khiển xe đạp an toàn trên đường",
      topicShort: "Kỹ năng đi xe đạp an toàn",
      grade: 3,
      objective: "Nắm vững các bộ phận xe đạp cần kiểm tra trước khi đi (phanh, lốp, chuông); kỹ năng đi đúng làn đường bên phải, không buông hai tay.",
      teacherGuide: "Kiểm tra an toàn xe đạp: Phanh ăn, lốp đủ hơi, xích không chùng. Dạy quy tắc đi xe đạp: Đi bên phải, qua ngã tư phải xuống dắt xe nếu xe cộ đông.",
      studentPractice: "Thực hành kiểm tra các bộ phận an toàn trên chiếc xe đạp mẫu. Nêu cam kết không lạng lách, đánh võng hay chở ba."
    },
    {
      lessonNumber: 4,
      title: "Bài 4: Hệ thống biển báo chỉ dẫn và hiệu lệnh giao thông",
      topicShort: "Biển chỉ dẫn và vạch kẻ đường",
      grade: 3,
      objective: "Nhận biết các biển chỉ dẫn (đường dành cho người tàn tật, trạm xe buýt, bãi đỗ xe) và vạch mắt võng, dải phân cách mềm.",
      teacherGuide: "Trình chiếu slide tương tác về các biển chỉ dẫn giao thông đô thị và nông thôn. Hướng dẫn ý nghĩa định hướng lộ trình an toàn.",
      studentPractice: "Đọc hiểu nhanh ý nghĩa của các biển chỉ dẫn qua các bài tập ghép nối trên màn chiếu."
    },
    {
      lessonNumber: 5,
      title: "Bài 5: Đi qua nút giao nhau an toàn (ngã ba, ngã tư)",
      topicShort: "Kỹ năng qua đường ngã ba, ngã tư",
      grade: 3,
      objective: "Biết cách quan sát đa chiều tại các nút giao thông ngã ba, ngã tư; nhận diện dòng xe rẽ phải, rẽ trái để phòng tránh va chạm.",
      teacherGuide: "Vẽ sa bàn ngã tư giao nhau trên bảng. Mô phỏng luồng di chuyển của các phương tiện. Hướng dẫn quy tắc nhường đường cho xe đi thẳng.",
      studentPractice: "Quan sát mô hình sa bàn, chỉ ra hướng di chuyển an toàn nhất cho người đi bộ và đi xe đạp qua ngã tư."
    },
    {
      lessonNumber: 6,
      title: "Bài 6: Nhận diện điểm mù của các phương tiện giao thông cỡ lớn",
      topicShort: "Phòng tránh vùng điểm mù xe tải, container",
      grade: 3,
      objective: "Biết xe tải lớn, xe container có các vùng điểm mù xung quanh (trước đầu xe, đuôi xe, hai bên sườn xe); không đi sát gần xe lớn.",
      teacherGuide: "Chiếu sơ đồ 4 vùng điểm mù xe tải lớn. Nhấn mạnh nguyên tắc: 'Nếu bạn không nhìn thấy gương xe tải, tài xế xe tải cũng không nhìn thấy bạn'.",
      studentPractice: "Ghi nhớ quy tắc giữ khoảng cách an toàn ít nhất 3-5 mét với các xe tải lớn, xe bồn khi dừng đèn đỏ hoặc chuyển hướng."
    },
    {
      lessonNumber: 7,
      title: "Bài 7: Đi lại an toàn trên các phương tiện đường thủy nội địa",
      topicShort: "An toàn khi đi đò, phà, ghe xuồng",
      grade: 3,
      objective: "Nắm vững quy tắc mặc áo phao cứu sinh suốt chuyến đi đò ngang, phà; ngồi cân đối hai bên mạn thuyền, không chen lấn.",
      teacherGuide: "Hướng dẫn thực hành mặc áo phao cứu sinh đúng tiêu chuẩn. Dặn dò học sinh vùng sông nước tuyệt đối không nhảy nhót, đùa nghịch trên mạn thuyền.",
      studentPractice: "Tập thao tác mặc áo phao, cài chốt an toàn và thắt dây dưới háng. Cam kết luôn mặc áo phao khi qua sông, qua phà."
    },
    {
      lessonNumber: 8,
      title: "Bài 8: Nhận biết nguy cơ và xử lý tình huống giao thông bất ngờ",
      topicShort: "Xử lý tình huống giao thông bất ngờ",
      grade: 3,
      objective: "Biết cách phản xạ bình tĩnh khi gặp tình huống bất ngờ (chó chạy qua đường, xe phía trước phanh gấp, mặt đường trơn trợt).",
      teacherGuide: "Đưa ra các tình huống thực tế và hỏi cách xử lý. Hướng dẫn giảm tốc độ từ từ, không bẻ lái đột ngột sang làn xe ngược chiều.",
      studentPractice: "Thảo luận nhóm tìm phương án xử lý an toàn nhất cho từng tình huống giả định của giáo viên."
    },
    {
      lessonNumber: 9,
      title: "Bài 9: Văn hóa giao thông - Nhường đường và giúp đỡ người khác",
      topicShort: "Văn hóa nhường đường, giúp đỡ người khuyết tật",
      grade: 3,
      objective: "Biết nhường đường cho người già, em nhỏ, người khuyết tật khi tham gia giao thông; không bấm còi inh ỏi, không to tiếng cãi cọ.",
      teacherGuide: "Giáo dục hành vi đẹp: Dắt người mù qua đường, nhường lối đi bộ cho người cao tuổi, nói lời xin lỗi chân thành khi va chạm nhẹ.",
      studentPractice: "Chia sẻ việc tốt em đã từng làm khi tham gia giao thông. Thể hiện thái độ tôn trọng và văn minh nơi công cộng."
    },
    {
      lessonNumber: 10,
      title: "Bài 10: Em cùng bạn bè xây dựng tuyến đường tự quản an toàn",
      topicShort: "Tuyến đường em chăm sóc an toàn",
      grade: 3,
      objective: "Có ý thức giữ gìn vệ sinh, không vứt rác, đinh nhọn ra đường; tham gia dọn dẹp vật cản trên lối đi đến trường.",
      teacherGuide: "Phát động phong trào 'Tuyến đường măng non an toàn - xanh - sạch - đẹp'. Nhắc nhở HS không rải vật nhọn nguy hiểm ra mặt đường.",
      studentPractice: "Tổ chức nhóm bạn cùng cam kết nhặt sạch rác quanh khu vực trường, bảo vệ hành lang an toàn giao thông."
    },
  ],

  // KHỐI 4 (LỚP 4)
  4: [
    {
      lessonNumber: 1,
      title: "Bài 1: Kĩ năng tham gia giao thông an toàn và văn hóa ứng xử",
      topicShort: "Kỹ năng và văn hóa giao thông",
      grade: 4,
      objective: "Hiểu sâu sắc ý nghĩa của Luật Giao thông đường bộ; tự giác tuân thủ quy định và lan tỏa nếp sống giao thông văn minh.",
      teacherGuide: "Giới thiệu các nguyên tắc cốt lõi của Luật GTĐB: Đi đúng phần đường, làn đường; tuân thủ tốc độ; nhường đường theo quy định.",
      studentPractice: "Viết thông điệp ngắn gọn kêu gọi mọi người cùng xây dựng văn hóa giao thông văn minh, thân thiện."
    },
    {
      lessonNumber: 2,
      title: "Bài 2: Dự đoán và phòng tránh nguy hiểm trên đường giao thông",
      topicShort: "Dự đoán và phòng ngừa nguy hiểm từ xa",
      grade: 4,
      objective: "Rèn luyện năng lực phán đoán nguy cơ nguy hiểm từ xa (cửa ô tô bất ngờ mở ra, xe trong ngõ lao ra, ổ gà trên đường).",
      teacherGuide: "Trình chiếu các clip ngắn về tình huống giao thông nguy hiểm do người đi trước mở cửa ô tô bất cẩn. Hướng dẫn cách giữ khoảng cách an toàn bên sườn xe đỗ.",
      studentPractice: "Phân tích nguyên nhân tai nạn từ clip và nêu biện pháp phòng tránh: Giữ khoảng cách ít nhất 1m với các xe ô tô đang đỗ bên đường."
    },
    {
      lessonNumber: 3,
      title: "Bài 3: Đi xe đạp an toàn qua các nút giao thông phức tạp",
      topicShort: "Đi xe đạp qua nút giao thông an toàn",
      grade: 4,
      objective: "Biết cách quan sát, phát tín hiệu xin đường bằng tay khi muốn chuyển hướng, rẽ trái, rẽ phải tại ngã tư.",
      teacherGuide: "Dạy kỹ thuật ra tín hiệu tay xin chuyển hướng khi đi xe đạp: Giơ tay trái sang ngang khi muốn rẽ trái, giơ tay phải khi muốn rẽ phải. Kết hợp ngoái đầu quan sát phía sau.",
      studentPractice: "Thực hành động tác giơ tay xin đường kết hợp quan sát gương và nhìn phía sau trước khi chuyển hướng xe đạp."
    },
    {
      lessonNumber: 4,
      title: "Bài 4: Nhận biết biển báo cấm và biển báo nguy hiểm",
      topicShort: "Hệ thống biển báo cấm và cảnh báo nguy hiểm",
      grade: 4,
      objective: "Nắm vững ý nghĩa của các biển báo cấm quan trọng (cấm đi ngược chiều, cấm xe đạp, cấm quay đầu) và biển cảnh báo nguy hiểm (đoạn đường hay xảy ra tai nạn, đường trơn).",
      teacherGuide: "Tổ chức trò chơi trắc nghiệm số: Chiếu các biển báo thực tế, yêu cầu học sinh giải thích hiệu lực cấm và đối tượng bị cấm.",
      studentPractice: "Giải thích chính xác ý nghĩa các biển báo giao thông; phân tích hậu quả nếu vi phạm các biển báo này."
    },
    {
      lessonNumber: 5,
      title: "Bài 5: Đi qua đường ngang giao cắt với đường sắt an toàn",
      topicShort: "An toàn giao thông đường sắt",
      grade: 5,
      objective: "Biết cách nhận diện đường ngang có rào chắn và không rào chắn; tuyệt đối dừng lại trước vạch quy định khi đèn đỏ nhấp nháy hoặc chuông reo.",
      teacherGuide: "Hướng dẫn quy tắc: 'Dừng lại quan sát hai phía đường tàu - Lắng nghe tiếng còi tàu' tại đường ngang không rào chắn. Cấm leo trèo, vượt qua rào chắn khi cần chắn đang hạ xuống.",
      studentPractice: "Ghi nhớ quy tắc cách ray tàu ngoài cùng tối thiểu 5m khi không có rào chắn. Tuyệt đối không đứng chụp ảnh, vui chơi trên đường ray."
    },
    {
      lessonNumber: 6,
      title: "Bài 6: Phòng ngừa tai nạn giao thông nơi tầm nhìn bị hạn chế",
      topicShort: "Phòng tránh tai nạn khúc cua, ngõ khuất",
      grade: 4,
      objective: "Biết cách phán đoán nguy cơ tại khúc cua dốc, sau xe buýt đỗ, khi trời tối không có đèn đường; sử dụng phản quang, chuông báo.",
      teacherGuide: "Cho xem các hình ảnh đoạn đường đèo dốc hoặc đường làng quanh co. Nhấn mạnh việc đi chậm, bấm còi hoặc bật đèn báo hiệu, không vượt xe tại khúc cua.",
      studentPractice: "Thảo luận nhóm về các biện pháp an toàn khi đi qua khúc cua ngoằn ngoèo: Giảm tốc độ, đi sát lề phải, không vượt ẩu."
    },
    {
      lessonNumber: 7,
      title: "Bài 7: An toàn khi tham gia giao thông trên đường thủy",
      topicShort: "Quy tắc an toàn giao thông đường thủy",
      grade: 4,
      objective: "Biết các kỹ năng thoát hiểm khi xảy ra sự cố chìm đò, lật thuyền; kiểm tra áo phao hoặc dụng cụ nổi trước khi rời bến.",
      teacherGuide: "Hướng dẫn các vật dụng nổi cứu sinh tạm thời: can nhựa rỗng có nắp, can dầu sạch, phao tròn. Hướng dẫn cách hít sâu giữ bình tĩnh nếu rơi xuống nước.",
      studentPractice: "Ghi nhớ cách bảo quản dụng cụ cứu sinh trên tàu thuyền và tuân thủ tuyệt đối sự hướng dẫn của thuyền trưởng, thủy thủ."
    },
    {
      lessonNumber: 8,
      title: "Bài 8: Văn hóa giao thông - Kính già, nhường trẻ và tôn trọng luật lệ",
      topicShort: "Văn hóa giao thông và trách nhiệm công dân",
      grade: 4,
      objective: "Thể hiện thái độ văn minh, nhường nhịn trên đường; không bấm còi hối thúc, giữ khoảng cách lịch sự khi dừng chờ đèn đỏ.",
      teacherGuide: "Thảo luận về hiện tượng 'văn hóa còi xe' ở các đô thị lớn. Hướng dẫn học sinh trở thành công dân gương mẫu từ những hành động nhỏ.",
      studentPractice: "Chia sẻ quan điểm cá nhân về việc giảm thiểu tiếng ồn còi xe và giữ gìn trật tự đô thị."
    },
    {
      lessonNumber: 9,
      title: "Bài 9: Kĩ năng sơ cấp cứu ban đầu khi xảy ra tai nạn giao thông",
      topicShort: "Sơ cấp cứu cơ bản và gọi cấp cứu 115",
      grade: 4,
      objective: "Biết số điện thoại cấp cứu 115, 113, 114; kỹ năng gọi người lớn giúp đỡ khi chứng kiến tai nạn; cách sơ cứu vết xước chảy máu nhẹ.",
      teacherGuide: "Hướng dẫn cách gọi 115 báo tin chuẩn: Nêu rõ địa điểm, số người bị nạn, tình trạng nạn nhân. Thực hành băng bó vết thương trầy xước nhẹ bằng gạc y tế.",
      studentPractice: "Thực hành gọi điện thoại khẩn cấp giả định dõng dạc, rõ ràng địa chỉ. Tập quấn băng y tế cho bạn cùng bàn."
    },
    {
      lessonNumber: 10,
      title: "Bài 10: Đội tuyên truyền măng non vì an toàn giao thông",
      topicShort: "Đội viên măng non tuyên truyền an toàn giao thông",
      grade: 4,
      objective: "Tự tin tham gia các hoạt động tuyên truyền, vẽ tranh, kể chuyện hoặc tiểu phẩm tuyên truyền về văn hóa giao thông trong trường học.",
      teacherGuide: "Phát động cuộc thi vẽ tranh tuyên truyền 'Chúng em với an toàn giao thông'. Hướng dẫn các nhóm lên ý tưởng nội dung tranh vẽ.",
      studentPractice: "Cùng tổ vẽ tranh hoặc phác thảo ý tưởng tuyên truyền luật giao thông cho học sinh toàn trường."
    },
  ],

  // KHỐI 5 (LỚP 5) - CHÍNH THỨC THEO TÀI LIỆU DẠY HỌC LỚP 5A CỦA USER
  5: [
    {
      lessonNumber: 1,
      title: "Bài 1: Nhớ quy tắc giao thông đường bộ và xây dựng văn hóa giao thông",
      topicShort: "Quy tắc cốt lõi và văn hóa tham gia giao thông",
      grade: 5,
      objective: "Khắc sâu toàn bộ quy tắc giao thông đường bộ cốt lõi; rèn luyện ý thức tự giác chấp hành pháp luật, tinh thần trách nhiệm của học sinh cuối cấp tiểu học.",
      teacherGuide: "Hệ thống hóa các quy định của Luật Giao thông đường bộ liên quan trực tiếp đến lứa tuổi học sinh: Đi bộ, đi xe đạp, đội mũ bảo hiểm và ứng xử văn minh nơi công cộng.",
      studentPractice: "Thảo luận nhóm, viết bảng cam kết thực hiện nghiêm túc 5 quy tắc an toàn giao thông của học sinh lớp 5."
    },
    {
      lessonNumber: 2,
      title: "Bài 2: Phòng tránh tai nạn nơi tầm nhìn bị che khuất",
      topicShort: "Phòng tránh tai nạn nơi tầm nhìn bị che khuất",
      grade: 5,
      objective: "Nhận biết các vị trí/tình huống giao thông bị che khuất tầm nhìn có nguy cơ xảy ra tai nạn (đoạn đường cua gấp, sau xe buýt đỗ, ngõ hẻm khuất tường, công trình rào chắn) và nắm vững quy tắc xử lý an toàn.",
      teacherGuide: "Cho HS quan sát tranh/ảnh các vị trí che khuất tầm nhìn (đoạn đường cua gấp, sau xe buýt đỗ, ngõ hẻm khuất tường). Hướng dẫn quy tắc an toàn: Đi chậm, giảm tốc độ, bấm chuông/còi cảnh báo, dừng lại quan sát kỹ hai phía trước khi di chuyển tiếp.",
      studentPractice: "Thảo luận nhóm chỉ ra các điểm nguy hiểm bị che khuất tầm nhìn thường gặp quanh trường và nơi cư trú; thực hành nêu quy tắc xử lý an toàn: Đi chậm, lắng nghe, dừng lại quan sát."
    },
    {
      lessonNumber: 3,
      title: "Bài 3: Kĩ năng điều khiển xe đạp an toàn và phòng ngừa tai nạn đường phố",
      topicShort: "Điều khiển xe đạp an toàn trên đường phố",
      grade: 5,
      objective: "Hoàn thiện kỹ năng đi xe đạp đúng luật: đi đúng làn đường bên phải, không lạng lách, không dàn hàng ba, biết giảm tốc độ và nhường đường an toàn.",
      teacherGuide: "Chiếu video phân tích các lỗi học sinh đi xe đạp thường mắc: Dàn hàng ngang nói chuyện, buông tay lái, vượt đèn đỏ. Nhấn mạnh nguy cơ va chạm giao thông nguy hiểm.",
      studentPractice: "Lập danh sách các hành vi tuyệt đối tránh khi đi xe đạp. Cam kết chỉ đi hàng một và luôn chú ý quan sát mặt đường."
    },
    {
      lessonNumber: 4,
      title: "Bài 4: Tìm hiểu hệ thống biển báo hiệu đường bộ Việt Nam",
      topicShort: "Hệ thống biển báo hiệu đường bộ Việt Nam",
      grade: 5,
      objective: "Nắm vững đặc điểm phân loại và ý nghĩa của 5 nhóm biển báo đường bộ: Biển báo cấm, Biển báo nguy hiểm, Biển hiệu lệnh, Biển chỉ dẫn và Biển phụ.",
      teacherGuide: "Tổ chức trò chơi 'Nhận diện biển báo giao thông nhanh qua slide tương tác'. Hướng dẫn cách đọc biển phụ kết hợp với biển chính để nắm bắt thông tin giao thông.",
      studentPractice: "Giải thích cặn kẽ ý nghĩa và phạm vi tác dụng của các biển báo giao thông phức tạp; vận dụng vào thực tế khi đi đường."
    },
    {
      lessonNumber: 5,
      title: "Bài 5: Đi qua nơi đường giao nhau và vòng xuyến an toàn",
      topicShort: "Đi qua nơi giao nhau và vòng xuyến an toàn",
      grade: 5,
      objective: "Nắm vững quy tắc nhường đường tại nơi giao nhau có vòng xuyến và không có vòng xuyến; kỹ năng quan sát gương chiếu hậu và điểm mù khi chuyển hướng.",
      teacherGuide: "Hướng dẫn nguyên tắc nhường đường: Tại nơi có vòng xuyến, phải nhường đường cho xe đi bên trái; tại nơi không có vòng xuyến, phải nhường đường cho xe đi từ bên phải tới.",
      studentPractice: "Thực hành trên mô hình sa bàn giao thông: Di chuyển xe đạp qua vòng xuyến an toàn, không cắt đầu xe lớn."
    },
    {
      lessonNumber: 6,
      title: "Bài 6: Nhận biết vùng điểm mù nguy hiểm quanh xe ô tô tải, xe buýt lớn",
      topicShort: "Nhận biết và phòng tránh điểm mù xe tải, xe buýt",
      grade: 5,
      objective: "Nhận diện chính xác 4 khu vực điểm mù cực kỳ nguy hiểm của xe siêu trường, xe bồn, xe buýt lớn và biết cách giữ cự ly an toàn tuyệt đối.",
      teacherGuide: "Chiếu đồ họa mô phỏng camera góc nhìn của tài xế xe buýt lớn. Chỉ rõ vùng điểm mù bên phải xe là nguy hiểm nhất khi xe rẽ phải. Nhấn mạnh: Tuyệt đối không lọt vào khe hẹp giữa xe lớn và vỉa hè.",
      studentPractice: "Ghi nhớ quy tắc sống còn: Khi thấy xe tải/xe buýt bật đèn xi-nhan rẽ, phải dừng lại từ xa nhường đường, tuyệt đối không cố vượt lên bên sườn xe."
    },
    {
      lessonNumber: 7,
      title: "Bài 7: An toàn giao thông đường sắt và giao thông đường thủy",
      topicShort: "An toàn giao thông đường sắt và đường thủy",
      grade: 5,
      objective: "Nắm vững các quy định an toàn hành lang đường sắt và quy tắc đi lại trên tàu thuyền thủy nội địa; có ý thức bảo vệ tài sản công trình giao thông quốc gia.",
      teacherGuide: "Giảng giải về tốc độ quán tính cực lớn của đoàn tàu (cần hàng trăm mét mới phanh dừng được). Dặn dò không ném đất đá lên tàu, không chăn thả trâu bò gần đường ray.",
      studentPractice: "Ký cam kết không vi phạm hành lang an toàn đường sắt, không tụ tập chơi đùa trên đường ray và luôn mặc áo phao khi đi phương tiện thủy."
    },
    {
      lessonNumber: 8,
      title: "Bài 8: Kĩ năng phán đoán nguy cơ và xử lý khi gặp tình huống nguy hiểm",
      topicShort: "Phán đoán nguy cơ và xử lý tình huống nguy hiểm",
      grade: 5,
      objective: "Rèn luyện tư duy phản biện và phán đoán tình huống giao thông phức tạp; bình tĩnh xử lý khi bị ngã xe hoặc phát hiện người bị nạn.",
      teacherGuide: "Đưa ra các tình huống hiểm nghèo: Xe đạp mất phanh khi xuống dốc, gặp xe điên/xe lấn làn... Hướng dẫn kỹ năng ngã xe an toàn (bảo vệ đầu) và bảo vệ hiện trường tai nạn.",
      studentPractice: "Thảo luận sôi nổi, đề xuất các phương án xử lý thông minh để giảm thiểu tối đa chấn thương và rủi ro."
    },
    {
      lessonNumber: 9,
      title: "Bài 9: Xây dựng môi trường giao thông văn minh, thân thiện",
      topicShort: "Xây dựng môi trường giao thông văn minh",
      grade: 5,
      objective: "Hiểu được vai trò của mỗi cá nhân trong việc giảm thiểu tai nạn giao thông và ô nhiễm môi trường; khuyến khích đi bộ và sử dụng phương tiện công cộng xanh.",
      teacherGuide: "Liên hệ bài học với xu hướng giao thông xanh (xe đạp điện, xe buýt điện). Thảo luận về văn hóa ứng xử nhã nhặn, tôn trọng luật pháp của người tham gia giao thông.",
      studentPractice: "Viết bài luận ngắn hoặc vẽ sơ đồ tư duy về 'Thành phố/Làng quê tương lai với giao thông xanh và an toàn'."
    },
    {
      lessonNumber: 10,
      title: "Bài 10: Tuyên truyền và cam kết gương mẫu thực hiện văn hóa giao thông",
      topicShort: "Cam kết gương mẫu và tuyên truyền an toàn giao thông",
      grade: 5,
      objective: "Phát huy vai trò đầu tàu gương mẫu của học sinh lớp 5 toàn trường; tích cực tuyên truyền các em khối dưới chấp hành tốt quy tắc an toàn giao thông.",
      teacherGuide: "Tổ chức diễn đàn học sinh lớp 5: 'Hành động vì an toàn giao thông'. Lập đội Sao đỏ giám sát nề nếp đội mũ bảo hiểm trước cổng trường.",
      studentPractice: "Tuyên thệ gương mẫu chấp hành luật giao thông, tích cực hỗ trợ nhắc nhở các em nhỏ khối 1, 2 thực hiện nghiêm túc nề nếp."
    },
  ]
};

/**
 * Lấy bài học An toàn giao thông tương ứng theo Khối và Tuần học
 * Mỗi khối có 10 bài, 1 bài dạy tích hợp vào tiết HĐTN (SHL) trong 2 tuần liên tiếp (2 tiết/bài)
 * Tuần 1-2: Bài 1
 * Tuần 3-4: Bài 2 (Ví dụ Lớp 5 Tuần 3: Bài 2 Phòng tránh tai nạn nơi tầm nhìn bị che khuất)
 * Tuần 5-6: Bài 3
 * ...
 * Tuần 19-20: Bài 10
 * Tuần 21+: Ôn tập & thực hành xoay vòng các bài ATGT tương ứng
 */
export function getAtgtLessonForWeek(grade: Grade, week: number): AtgtLesson {
  const g = (grade >= 1 && grade <= 5 ? grade : 5) as Grade;
  const lessons = ATGT_CURRICULUM_DATA[g];
  
  // Xác định số thứ tự bài học (1 đến 10) dựa trên tuần (2 tuần 1 bài)
  const lessonIdx = Math.floor(((week - 1) % 20) / 2); // 0 đến 9
  return lessons[lessonIdx] || lessons[0];
}

/**
 * Lấy tên đầy đủ bài Sinh hoạt lớp tích hợp ATGT cho Lịch báo giảng
 * Ví dụ Tuần 3 Lớp 5: Sinh hoạt lớp: CÂN BẰNG CẢM XÚC & AN TOÀN GIAO THÔNG (Phòng tránh tai nạn nơi tầm nhìn bị che khuất)
 */
export function getShlAtgtLessonTitleForLbg(grade: Grade, week: number): string {
  const atgt = getAtgtLessonForWeek(grade, week);
  
  // Chủ đề chính của tiết sinh hoạt lớp theo tuần
  const shlThemes: Record<number, string> = {
    1: "CHÀO NĂM HỌC MỚI",
    2: "NỀ NẾP LỚP HỌC",
    3: "CÂN BẰNG CẢM XÚC",
    4: "TÔN TRỌNG SỰ KHÁC BIỆT",
    5: "TÌNH BẠN ĐẸP",
    6: "HỌC TẬP TỰ GIÁC",
    7: "BIẾT ƠN THẦY CÔ",
    8: "ỨNG XỬ LỄ PHÉP",
    9: "KỸ NĂNG LẮNG NGHE",
    10: "BẢO VỆ MÔI TRƯỜNG",
    11: "ĐOÀN KẾT LỚP",
    12: "PHÒNG TRÁNH BẠO LỰC HỌC ĐƯỜNG",
    13: "SỬ DỤNG THỜI GIAN HIỆU QUẢ",
    14: "ƯỚC MƠ TUỔI THƠ",
    15: "TỰ HÀO TRUYỀN THỐNG ĐỘI",
    16: "YÊU THƯƠNG GIA ĐÌNH",
    17: "SƠ KẾT HỌC KÌ I",
    18: "KẾ HOẠCH NĂM MỚI"
  };
  
  const theme = shlThemes[week] || (week % 2 === 1 ? "CÂN BẰNG CẢM XÚC" : "RÈN LUYỆN NỀ NẾP");
  return `Sinh hoạt lớp: ${theme} & AN TOÀN GIAO THÔNG (${atgt.topicShort})`;
}

/**
 * Lấy tiêu đề trọn vẹn trong KHBD (bỏ chữ môn, chỉ ghi trọn vẹn tên bài học viết hoa in đậm)
 * Ví dụ: SINH HOẠT LỚP: CÂN BẰNG CẢM XÚC & AN TOÀN GIAO THÔNG
 */
export function getShlAtgtLessonTitleForKhbd(grade: Grade, week: number): string {
  const shlThemes: Record<number, string> = {
    1: "CHÀO NĂM HỌC MỚI",
    2: "NỀ NẾP LỚP HỌC",
    3: "CÂN BẰNG CẢM XÚC",
    4: "TÔN TRỌNG SỰ KHÁC BIỆT",
    5: "TÌNH BẠN ĐẸP",
    6: "HỌC TẬP TỰ GIÁC",
    7: "BIẾT ƠN THẦY CÔ",
    8: "ỨNG XỬ LỄ PHÉP",
    9: "KỸ NĂNG LẮNG NGHE",
    10: "BẢO VỆ MÔI TRƯỜNG",
    11: "ĐOÀN KẾT LỚP",
    12: "PHÒNG TRÁNH BẠO LỰC HỌC ĐƯỜNG",
    13: "SỬ DỤNG THỜI GIAN HIỆU QUẢ",
    14: "ƯỚC MƠ TUỔI THƠ",
    15: "TỰ HÀO TRUYỀN THỐNG ĐỘI",
    16: "YÊU THƯƠNG GIA ĐÌNH",
    17: "SƠ KẾT HỌC KÌ I",
    18: "KẾ HOẠCH NĂM MỚI"
  };
  const theme = shlThemes[week] || (week % 2 === 1 ? "CÂN BẰNG CẢM XÚC" : "RÈN LUYỆN NỀ NẾP");
  return `SINH HOẠT LỚP: ${theme} & AN TOÀN GIAO THÔNG`;
}

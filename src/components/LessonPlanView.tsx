import React, { useState, useMemo } from "react";
import { LessonPlan, SchoolInfo, DayOfWeek } from "../types";
import { DAYS_OF_WEEK, getWeekDates } from "../data/defaultTimetables";
import { 
  FileDown, 
  Sparkles, 
  Edit3, 
  Check, 
  Printer, 
  BookOpen, 
  Layers, 
  ChevronRight,
  RefreshCw,
  Plus,
  Trash2,
  Cpu,
  Search,
  Sliders,
  User,
  Presentation,
  ExternalLink,
  Globe,
  Download,
  Eye,
  Loader2,
  CheckCircle2,
  CheckCircle,
  Music,
  Languages
} from "lucide-react";
import { buildSearchQueries } from "../utils/lectureResourceHelper";
import { downloadLessonPresentationPptx } from "../utils/pptxExportHelper";
import { PresentationViewerModal } from "./PresentationViewerModal";
import { WeeklyWorksheetBar } from "./WeeklyWorksheetBar";
import {
  isAuthenticLectureAvailable,
  getAuthenticDeckSummary
} from "../utils/classroomSlideDataHelper";
import { cleanLessonTitle, normalizeActivityName } from "../utils/lessonTitleHelper";

interface LessonPlanViewProps {
  lessonPlans: LessonPlan[];
  onUpdateLessonPlans: (plans: LessonPlan[]) => void;
  schoolInfo: SchoolInfo;
  onExportAllDocx: () => void;
  onExportSingleDocx: (plan: LessonPlan) => void;
  onExportKHBDWithLBGFirstPage?: () => void;
  onGenerateAIPlan: (plan: LessonPlan, customPrompt?: string) => Promise<void>;
  isGeneratingAI: boolean;
  onOpenTeacherSelectModal?: () => void;
  lang?: "en" | "vi";
  onToggleLang?: (lang: "en" | "vi") => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  lessonPlans,
  onUpdateLessonPlans,
  schoolInfo,
  onExportAllDocx,
  onExportSingleDocx,
  onExportKHBDWithLBGFirstPage,
  onGenerateAIPlan,
  isGeneratingAI,
  onOpenTeacherSelectModal,
  lang = "en",
  onToggleLang,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(lessonPlans[0]?.id || "");
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"compact_week" | "single">("compact_week");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<LessonPlan | null>(null);
  const [aiCustomPrompt, setAiCustomPrompt] = useState<string>("");
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);
  const [isDownloadingPptx, setIsDownloadingPptx] = useState<boolean>(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const isEn = lang === "en";

  const getDayDisplay = (d: string) => {
    if (!isEn) return d;
    switch (d) {
      case "Thứ Hai": return "Monday";
      case "Thứ Ba": return "Tuesday";
      case "Thứ Tư": return "Wednesday";
      case "Thứ Năm": return "Thursday";
      case "Thứ Sáu": return "Friday";
      default: return d;
    }
  };

  // Group and sort lesson plans day by day (Thứ Hai -> Thứ Sáu) strictly in TKB order
  const dayOrder: Record<string, number> = {
    "Thứ Hai": 1,
    "Thứ Ba": 2,
    "Thứ Tư": 3,
    "Thứ Năm": 4,
    "Thứ Sáu": 5,
  };

  const sortedPlans = useMemo(() => {
    return [...lessonPlans].sort((a, b) => {
      const orderA = dayOrder[a.dayOfWeek] || 99;
      const orderB = dayOrder[b.dayOfWeek] || 99;
      if (orderA !== orderB) return orderA - orderB;
      const sDiff = (a.session === "Sáng" ? 1 : 2) - (b.session === "Sáng" ? 1 : 2);
      if (sDiff !== 0) return sDiff;
      return Number(a.timetablePeriod || a.periodNumber || 0) - Number(b.timetablePeriod || b.periodNumber || 0);
    });
  }, [lessonPlans]);

  const filteredPlans = useMemo(() => {
    return sortedPlans.filter((p) => {
      const matchesDay = selectedDayFilter === "all" || p.dayOfWeek === selectedDayFilter;
      const matchesQuery = !searchQuery || 
        p.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDay && matchesQuery;
    });
  }, [sortedPlans, selectedDayFilter, searchQuery]);

  const activePlan = sortedPlans.find((p) => p.id === selectedPlanId) || filteredPlans[0] || sortedPlans[0];

  const handleStartEdit = () => {
    if (activePlan) {
      setEditFormData(JSON.parse(JSON.stringify(activePlan)));
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    const updated = lessonPlans.map((p) => (p.id === editFormData.id ? editFormData : p));
    onUpdateLessonPlans(updated);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleAddActivity = () => {
    if (!editFormData) return;
    const newIndex = editFormData.activities.length + 1;
    const newAct = {
      id: `act_${Date.now()}`,
      name: `${newIndex}. Hoạt động tiếp nối`,
      objective: "Học sinh củng cố và vận dụng kiến thức bài học.",
      teacherActivity: "- GV giao nhiệm vụ và hướng dẫn học sinh thực hiện.\n- GV quan sát, bao quát lớp và giúp đỡ học sinh lúng túng.\n- GV nhận xét, tuyên dương.",
      studentActivity: "- HS tiếp nhận nhiệm vụ, thảo luận theo nhóm hoặc cá nhân.\n- HS báo cáo kết quả và tham gia chia sẻ trước lớp.\n- Lắng nghe nhận xét từ GV và bạn bè.",
    };
    setEditFormData({
      ...editFormData,
      activities: [...editFormData.activities, newAct],
    });
  };

  const handleRemoveActivity = (index: number) => {
    if (!editFormData || editFormData.activities.length <= 1) return;
    const updated = editFormData.activities.filter((_, idx) => idx !== index);
    setEditFormData({
      ...editFormData,
      activities: updated,
    });
  };

  const handleActivityChange = (index: number, field: "name" | "objective" | "teacherActivity" | "studentActivity", value: string) => {
    if (!editFormData) return;
    const newActs = [...editFormData.activities];
    newActs[index] = { ...newActs[index], [field]: value };
    setEditFormData({ ...editFormData, activities: newActs });
  };

  return (
    <div className="space-y-6">
      {/* Teacher Status & Isolation Banner */}
      <div className="bg-stone-50 border-2 border-black p-3.5 sm:p-4 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-black bg-black text-white flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-black">
                {isEn ? `Lesson Plans: ${schoolInfo.teacherName}` : `KHBD Giáo Viên: ${schoolInfo.teacherName}`}
              </span>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-black text-stone-900">
                {schoolInfo.teacherType === "specialist"
                  ? (isEn ? `Specialist: ${schoolInfo.specialistSubject}` : `GV Chuyên ${schoolInfo.specialistSubject}`)
                  : (isEn ? `Homeroom Class ${schoolInfo.className} (Grade ${schoolInfo.grade})` : `GVCN Lớp ${schoolInfo.className} (Khối ${schoolInfo.grade})`)}
              </span>
              <span className="text-[10px] font-mono bg-stone-200 px-1.5 py-0.5 text-stone-800 border border-stone-300">
                {isEn ? `${lessonPlans.length} lesson plans (Official CV 2345)` : `${lessonPlans.length} kế hoạch bài dạy chuẩn CV 2345`}
              </span>
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5">
                {isEn ? `Week ${schoolInfo.week}: ${schoolInfo.startDate} - ${schoolInfo.endDate}` : `Tuần ${schoolInfo.week}: ${schoolInfo.startDate} - ${schoolInfo.endDate}`}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 font-serif mt-0.5">
              {schoolInfo.teacherType === "homeroom"
                ? (isEn 
                    ? "Content segregated: Only subjects taught directly by the homeroom teacher (excluding specialist English, IT, Music, Art, PE)."
                    : "Tự động phân tách nội dung: Chỉ gồm các môn GVCN trực tiếp giảng dạy (đã lọc các tiết chuyên Tiếng Anh, Tin học, Âm nhạc, Mĩ thuật, Thể chất).")
                : (isEn
                    ? `Specialist lesson plans for ${schoolInfo.specialistSubject} organized for assigned classes in Week ${schoolInfo.week}.`
                    : `Giáo án chuyên sâu môn ${schoolInfo.specialistSubject} được lập cho các lớp phụ trách giảng dạy trong tuần ${schoolInfo.week}.`)}
            </p>
          </div>
        </div>

        {onOpenTeacherSelectModal && (
          <button
            type="button"
            onClick={onOpenTeacherSelectModal}
            className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 text-[10px] font-bold uppercase tracking-wider border border-black transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <User className="w-3 h-3" />
            <span>{isEn ? "Switch Teacher" : "Đổi Giáo Viên / Soạn Cho GV Khác"}</span>
          </button>
        )}
      </div>

      {/* Top Controls Bar */}
      <div className="bg-white p-4 border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* View Mode & Filters */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {/* View Mode Toggle */}
          <div className="flex items-center border border-black overflow-hidden bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setViewMode("compact_week")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-r border-black transition-colors ${
                viewMode === "compact_week"
                  ? "bg-black text-white"
                  : "bg-white text-stone-800 hover:bg-stone-200"
              }`}
            >
              {isEn ? "Compact Week View" : "Xem Gọn Cả Tuần (TKB & PPCT)"}
            </button>
            <button
              onClick={() => setViewMode("single")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                viewMode === "single"
                  ? "bg-black text-white"
                  : "bg-white text-stone-800 hover:bg-stone-200"
              }`}
            >
              {isEn ? "Single Lesson / Edit" : "Chi Tiết Từng Tiết / Sửa"}
            </button>
          </div>

          {/* Day Filter */}
          <div className="flex items-center border border-black overflow-hidden bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setSelectedDayFilter("all")}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-r border-black transition-colors ${
                selectedDayFilter === "all"
                  ? "bg-black text-white"
                  : "bg-white text-stone-800 hover:bg-stone-200"
              }`}
            >
              {isEn ? `All Week (${lessonPlans.length})` : `Cả Tuần (${lessonPlans.length})`}
            </button>
            {DAYS_OF_WEEK.map((d, dIdx) => {
              const weekDates = getWeekDates(schoolInfo.startDate, schoolInfo.week);
              const datePart = weekDates[dIdx] ? weekDates[dIdx].substring(0, 5) : "";
              return (
                <button
                  key={d}
                  onClick={() => setSelectedDayFilter(d)}
                  className={`px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider border-r last:border-r-0 border-black transition-colors ${
                    selectedDayFilter === d
                      ? "bg-black text-white"
                      : "bg-white text-stone-800 hover:bg-stone-200"
                  }`}
                  title={`${d} - ${weekDates[dIdx] || ""}`}
                >
                  {getDayDisplay(d)} {datePart ? `(${datePart})` : ""}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search subject or lesson..." : "Tìm môn hoặc bài..."}
              className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-black focus:outline-none w-36 sm:w-48 font-serif"
            />
          </div>
        </div>

        {/* Global Action Export Buttons */}
        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {/* AI Generation Trigger */}
          <button
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-black border border-black text-[10px] font-bold uppercase tracking-wider shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? "AI Enhance & Digital Skills" : "AI Soạn & Tích Hợp"}</span>
          </button>

          {/* Download Single Docx */}
          {activePlan && (
            <button
              onClick={() => onExportSingleDocx(activePlan)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-stone-100 text-black text-[10px] font-bold uppercase tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
              title={isEn ? "Download this lesson plan in Word A4 (.docx)" : "Tải kế hoạch bài dạy tiết này ra Word A4 (.docx)"}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isEn ? "Word (This Lesson)" : "Tải Word (Tiết Này)"}</span>
            </button>
          )}

          {/* Download Full Week Docx */}
          <button
            onClick={onExportAllDocx}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-black text-[10px] font-bold uppercase tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
            title={isEn ? "Download all lesson plans for the week in Word A4" : "Tải trọn bộ KHBD Word A4 tuần từ Thứ 2 đến Thứ 6 chuẩn gọn gàng theo TKB"}
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isEn ? "All Week Word" : "Tải KHBD Gọn Cả Tuần (Word)"}</span>
          </button>

          {/* Download KHBD Full Week (First Page is LBG, next is KHBD Mon-Fri) */}
          {onExportKHBDWithLBGFirstPage && (
            <button
              onClick={onExportKHBDWithLBGFirstPage}
              className="flex items-center gap-2 px-4 py-1.5 bg-black hover:bg-stone-800 text-white text-[10px] font-bold uppercase tracking-wider border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
              title={isEn ? "Download full package: Page 1 is Schedule, followed by Plans in Timetable order" : "Tải trọn bộ: Trang 1 là Lịch Báo Giảng, các trang tiếp theo là KHBD theo thứ tự TKB"}
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold">{isEn ? "Plans (Schedule Page 1)" : "Tải KHBD (Kèm LBG Trang 1)"}</span>
              <span className="bg-white/20 text-[9px] px-1.5 py-0.2 rounded-xs font-mono font-normal">Mon-Fri</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Assistant Drawer / Generator Box */}
      {showAiPanel && activePlan && (
        <div className="bg-stone-900 text-white p-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-white text-black border border-white">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
                  {isEn ? "AI Lesson Planning & Integration Assistant (Primary Education Model)" : "Trợ Lý AI Soạn Bài & Tích Hợp (Mô Hình Giáo Dục Tiểu Học)"}
                </h4>
                <p className="text-xs text-stone-400 font-serif">
                  {isEn ? "Auto-generates detailed plans per Circular 2345, integrating AI, Digital Competence, Human Rights, Defense & STEM" : "Tự động soạn chi tiết theo Công văn 2345/BGDĐT, lồng ghép AI, Năng lực số, Quyền con người, QPAN, STEM"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAiPanel(false)}
              className="text-[10px] uppercase font-bold tracking-wider text-stone-400 hover:text-white px-2 py-1 border border-stone-700 bg-stone-800"
            >
              {isEn ? "Close" : "Đóng"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-300 mb-1">
                {isEn ? `Additional requirements for lesson: ` : `Yêu cầu bổ sung cho bài dạy: `}<strong className="text-stone-100">{activePlan.lessonTitle}</strong> ({activePlan.subject} - {isEn ? `Grade ${activePlan.grade}` : `Khối ${activePlan.grade}`})
              </label>
              <input
                type="text"
                value={aiCustomPrompt}
                onChange={(e) => setAiCustomPrompt(e.target.value)}
                placeholder={isEn ? "E.g.: Enhance group activities, deep integrate Digital Skills and Quizizz starter game..." : "Ví dụ: Tăng cường hoạt động nhóm, lồng ghép sâu Năng lực số và trò chơi khởi động Quizizz..."}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400 font-serif"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                disabled={isGeneratingAI}
                onClick={() => onGenerateAIPlan(activePlan, aiCustomPrompt)}
                className="w-full py-2.5 bg-white text-black hover:bg-stone-200 border border-white disabled:opacity-50 text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_rgba(255,255,255,0.3)] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGeneratingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{isEn ? "Generating with AI..." : "Đang AI Soạn Bài..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEn ? "Generate Detailed Plan with AI" : "Tạo KHBD Chi Tiết Bằng AI"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Worksheet Command Bar (Loigiaihay & Word A4 Exporter) */}
      <WeeklyWorksheetBar
        schoolInfo={schoolInfo}
        lessonPlans={lessonPlans}
        lang={lang}
        onToggleLang={onToggleLang}
      />

      {/* Main View: Compact Week View vs Single Lesson Detail View */}
      {viewMode === "compact_week" ? (
        <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] font-serif">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4 text-xs pb-3 border-b border-black">
            <div className="text-left space-y-0.5">
              <p className="uppercase text-stone-700 font-semibold">{schoolInfo.departmentName || (isEn ? "PRIMARY EDUCATION DIVISION" : "PHÒNG GD&ĐT HUYỆN TÂN THẠNH")}</p>
              <p className="font-bold text-black uppercase">{schoolInfo.schoolName}</p>
              <p className="text-stone-700">{isEn ? `GRADE ${schoolInfo.grade} FACULTY` : `TỔ CHUYÊN MÔN KHỐI ${schoolInfo.grade}`}</p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="font-bold text-black uppercase">{isEn ? `CLASS: ${schoolInfo.className}` : `LỚP: ${schoolInfo.className}`}</p>
              <p className="text-stone-700">{isEn ? "School Year: " : "Năm học: "}{schoolInfo.academicYear}</p>
              <p className="text-stone-600 italic">{isEn ? "Week " : "Tuần "}{schoolInfo.week} ({schoolInfo.startDate} - {schoolInfo.endDate})</p>
            </div>
          </div>

          <div className="text-center space-y-1 py-2">
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
              {isEn ? `LESSON PLANS - WEEK ${schoolInfo.week}` : `KẾ HOẠCH BÀI DẠY TUẦN ${schoolInfo.week}`}
            </h2>
            <p className="text-xs font-bold text-stone-800 uppercase">
              {isEn ? `TIMETABLE & CURRICULUM ALLOCATION - CLASS ${schoolInfo.className}` : `THỜI KHÓA BIỂU & PHÂN PHỐI CHƯƠNG TRÌNH LỚP ${schoolInfo.className}`}
            </p>
            <p className="text-xs text-stone-700">
              {isEn ? "Teacher: " : "Giáo viên giảng dạy: "}<strong className="text-black italic">{schoolInfo.teacherName}</strong>
            </p>
            <div className="inline-block mt-1 bg-stone-100 px-3 py-1 border border-black text-[11px] text-stone-800 font-sans">
              {isEn 
                ? "★ Formatted sequentially in Timetable and Curriculum order (Clean CV 2345 format)" 
                : "★ Soạn gọn gàng liên tục theo thứ tự các tiết Thời khóa biểu và Phân phối chương trình (không lặp lại tiêu ngữ)"}
            </div>
          </div>

          {/* Grouped by day */}
          <div className="space-y-6 pt-2">
            {DAYS_OF_WEEK.map((day) => {
              const dayPlans = filteredPlans.filter((p) => p.dayOfWeek === day);
              if (dayPlans.length === 0) return null;

              return (
                <div key={day} className="space-y-3 border-2 border-black p-4 bg-stone-50/40">
                  {/* Day Banner */}
                  <div className="bg-black text-white px-4 py-2 flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-sm uppercase tracking-wide">
                      {getDayDisplay(day).toUpperCase()} ({isEn ? "Date: " : "Ngày "}{dayPlans[0]?.dateStr || schoolInfo.startDate})
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 font-mono font-bold">
                      {isEn ? `${dayPlans.length} lessons` : `${dayPlans.length} tiết dạy theo TKB`}
                    </span>
                  </div>

                  {/* List of lesson plans for this day in strict TKB order */}
                  <div className="space-y-4">
                    {dayPlans.map((plan, pIdx) => (
                      <div key={plan.id || pIdx} className="bg-white border border-black p-4 space-y-3 shadow-[2px_2px_0px_rgba(0,0,0,0.05)]">
                        {/* Period Bar with Pure Lesson Title */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black pb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-sm text-black uppercase tracking-wide">
                              {cleanLessonTitle(plan.lessonTitle).toUpperCase()}
                            </span>
                            <span className="text-xs bg-amber-100 text-amber-950 font-bold border border-amber-300 px-2 py-0.5">
                              {isEn ? "Curriculum Period: " : "Tiết PPCT: "}{plan.curriculumPeriod}
                            </span>
                            {plan.className && (
                              <span className="text-xs bg-stone-100 text-stone-800 font-bold border border-stone-300 px-2 py-0.5">
                                {isEn ? "Class " : "Lớp "}{plan.className}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                setSelectedPlanId(plan.id);
                                setViewMode("single");
                                setIsEditing(false);
                              }}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-black text-[10px] font-bold uppercase border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 cursor-pointer"
                              title={isEn ? "Edit or view details of this lesson" : "Chỉnh sửa hoặc xem chi tiết bài này"}
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{isEn ? "Edit Lesson" : "Sửa Tiết Này"}</span>
                            </button>
                            <button
                              onClick={() => onExportSingleDocx(plan)}
                              className="px-2.5 py-1 bg-white hover:bg-stone-100 text-black text-[10px] font-bold uppercase border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors flex items-center gap-1 cursor-pointer"
                              title={isEn ? "Download Word for this lesson" : "Tải Word tiết này"}
                            >
                              <FileDown className="w-3 h-3" />
                              <span>{isEn ? "Word" : "Tải Word"}</span>
                            </button>
                          </div>
                        </div>

                        {/* I. Yêu cầu cần đạt */}
                        <div className="text-xs space-y-1 bg-stone-50 p-3 border border-stone-300">
                          <p className="font-bold text-black uppercase text-[11px]">{isEn ? "I. LEARNING OBJECTIVES:" : "I. YÊU CẦU CẦN ĐẠT:"}</p>
                          <div className="space-y-0.5 text-stone-800 text-[11.5px] leading-relaxed">
                            <p><strong className="text-black">{isEn ? "1. Specific Competencies: " : "1. Năng lực đặc thù: "}</strong> {plan.objectives?.specificCompetencies?.join(" ")}</p>
                            <p><strong className="text-black">{isEn ? "2. Core Competencies: " : "2. Năng lực chung: "}</strong> {plan.objectives?.generalCompetencies?.join(" ")}</p>
                            <p><strong className="text-black">{isEn ? "3. Qualities: " : "3. Phẩm chất: "}</strong> {plan.objectives?.qualities?.join(" ")}</p>
                            
                            {/* 5. Yêu cầu cần đạt đối với học sinh khuyết tật (Chỉ nêu đối với những lớp có học sinh khuyết tật) */}
                            {schoolInfo.hasSpecialNeedsStudent && (
                              <div className="text-amber-950 bg-amber-50 p-2 border border-amber-300 mt-1">
                                <strong className="text-amber-900">{isEn ? "5. Objectives for students with disabilities: " : "5. Yêu cầu cần đạt đối với học sinh khuyết tật: "}</strong>
                                <span className="italic">{plan.objectives?.specialNeedsObjective || schoolInfo.specialNeedsDescription || "Tham gia các hoạt động học tập cùng bạn theo khả năng; nhận biết kiến thức cốt lõi và hoàn thành nhiệm vụ cơ bản với sự hỗ trợ của GV và bạn bè."}</span>
                              </div>
                            )}

                            {plan.objectives?.integrations && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {plan.objectives.integrations.ai && (
                                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-900 text-[10px] border border-blue-200 font-sans">
                                    AI: {plan.objectives.integrations.ai}
                                  </span>
                                )}
                                {plan.objectives.integrations.digitalCompetence && (
                                  <span className="px-1.5 py-0.5 bg-purple-50 text-purple-900 text-[10px] border border-purple-200 font-sans">
                                    {isEn ? "Digital Skills: " : "NLS: "}{plan.objectives.integrations.digitalCompetence}
                                  </span>
                                )}
                                {plan.objectives.integrations.humanRights && (
                                  <span className="px-1.5 py-0.5 bg-rose-50 text-rose-900 text-[10px] border border-rose-200 font-sans">
                                    {isEn ? "Human Rights: " : "QCN: "}{plan.objectives.integrations.humanRights}
                                  </span>
                                )}
                                {plan.objectives.integrations.defense && (
                                  <span className="px-1.5 py-0.5 bg-amber-50 text-amber-900 text-[10px] border border-amber-200 font-sans">
                                    {isEn ? "National Defense: " : "QPAN: "}{plan.objectives.integrations.defense}
                                  </span>
                                )}
                                {plan.objectives.integrations.stem && (
                                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] border border-emerald-200 font-sans">
                                    STEM: {plan.objectives.integrations.stem}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* II. Đồ dùng dạy học */}
                        <div className="text-xs bg-stone-50 p-2.5 border border-stone-300 flex flex-col sm:flex-row gap-2">
                          <div className="sm:w-1/2">
                            <strong className="text-black">{isEn ? "Teacher's Aids: " : "Đồ dùng GV: "}</strong> <span className="text-stone-700">{plan.materials?.teacher?.join("; ")}</span>
                          </div>
                          <div className="sm:w-1/2">
                            <strong className="text-black">{isEn ? "Students' Aids: " : "Đồ dùng HS: "}</strong> <span className="text-stone-700">{plan.materials?.student?.join("; ")}</span>
                          </div>
                        </div>

                        {/* III. Các hoạt động dạy học chủ yếu (Bảng 2 cột chuẩn CV 2345/BGDĐT) */}
                        <div className="border border-black overflow-x-auto bg-white">
                          <table className="w-full text-xs border-collapse">
                            <thead>
                              <tr className="bg-stone-100 border-b border-black text-black font-bold uppercase text-[10.5px]">
                                <th className="py-2.5 px-3 text-center border-r border-black w-1/2">
                                  {isEn ? "TEACHER'S ACTIVITIES" : "HOẠT ĐỘNG CỦA GIÁO VIÊN"}
                                </th>
                                <th className="py-2.5 px-3 text-center w-1/2">
                                  {isEn ? "STUDENTS' ACTIVITIES" : "HOẠT ĐỘNG CỦA HỌC SINH"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-300">
                              {plan.activities?.map((act, ai) => (
                                <tr key={act.id || ai} className={ai % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                                  {/* Cột 1: Hoạt động của GV (Gồm Tên hoạt động, Mục tiêu, Cách tiến hành) */}
                                  <td className="py-2.5 px-3 align-top border-r border-black w-1/2 space-y-1.5">
                                    <div className="font-bold text-black text-xs uppercase">
                                      {normalizeActivityName(act.name)}
                                    </div>
                                    {act.objective && (
                                      <div className="text-[11px] text-stone-700 bg-stone-100 p-1.5 border border-stone-300">
                                        <strong>{isEn ? "* Objective: " : "* Mục tiêu: "}</strong>{act.objective}
                                      </div>
                                    )}
                                    <div className="text-stone-900 leading-relaxed whitespace-pre-line text-xs">
                                      <strong>{isEn ? "* Procedure: " : "* Cách tiến hành: "}</strong>
                                      <br />
                                      {act.teacherActivity}
                                    </div>
                                  </td>

                                  {/* Cột 2: Hoạt động của HS (Nội dung và hành động thực hiện của học sinh) */}
                                  <td className="py-2.5 px-3 align-top text-stone-900 leading-relaxed whitespace-pre-line text-xs w-1/2">
                                    <div className="font-bold text-stone-500 text-[10.5px] mb-1.5 uppercase">
                                      {isEn ? "(Students' Response & Execution)" : "(Phản hồi & Thực hiện của HS)"}
                                    </div>
                                    {act.studentActivity}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* IV. Điều chỉnh sau bài dạy */}
                        <div className="text-xs text-stone-600 italic">
                          <strong className="text-black not-italic">{isEn ? "IV. Post-lesson adjustments: " : "IV. Điều chỉnh sau bài dạy: "}</strong>
                          {plan.postLessonAdjustment || "........................................................................................................................................"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Main 2-Column Layout: Sidebar Plan List + Active Plan Detail */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Lesson Plan Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-black p-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-black mb-3 flex items-center justify-between border-b border-black pb-2">
              <span>{isEn ? `Lesson Plans List (${filteredPlans.length})` : `Danh Sách Bài Dạy (${filteredPlans.length})`}</span>
              <span className="text-[10px] font-mono text-stone-600 font-normal">{isEn ? "Week " : "Tuần "}{schoolInfo.week}</span>
            </h3>

            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {filteredPlans.map((plan) => {
                const isSelected = plan.id === (activePlan?.id || "");
                return (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlanId(plan.id);
                      setIsEditing(false);
                    }}
                    className={`w-full text-left p-3 border transition-colors ${
                      isSelected
                        ? "bg-stone-100 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        : "bg-white border-stone-300 hover:bg-stone-50 hover:border-black"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1 font-serif">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-black uppercase text-[11px]">{getDayDisplay(plan.dayOfWeek)}</span>
                        {plan.className && (
                          <span className="text-[9px] bg-black text-white px-1 font-mono font-bold">
                            {plan.className}
                          </span>
                        )}
                        {isAuthenticLectureAvailable(plan.lessonTitle, plan.subject) && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-1 font-mono font-bold">
                            Slide PPTX
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] bg-stone-200 px-1.5 py-0.2 font-mono font-bold text-black">
                        {isEn ? "P." : "Tiết "}{plan.curriculumPeriod || 1}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-xs text-black line-clamp-1">
                      {plan.subject}: {plan.lessonTitle}
                    </div>
                    {plan.objectives?.integrations && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {plan.objectives.integrations.ai && (
                          <span className="text-[9px] border border-stone-400 bg-stone-50 text-black px-1 font-mono uppercase">AI</span>
                        )}
                        {plan.objectives.integrations.digitalCompetence && (
                          <span className="text-[9px] border border-stone-400 bg-stone-50 text-black px-1 font-mono uppercase">NLS</span>
                        )}
                        {plan.objectives.integrations.humanRights && (
                          <span className="text-[9px] border border-stone-400 bg-stone-50 text-black px-1 font-mono uppercase">QCN</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Area: Detailed Lesson Plan (CV 2345 Standard View) */}
        <div className="lg:col-span-8">
          {activePlan ? (
            <div className="bg-white border border-black p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] font-serif">
              {/* Top Document Header & Editor Toggle */}
              <div className="flex items-center justify-between border-b border-black pb-4">
                <div>
                  <span className="bg-black text-white text-[10px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                    {isEn ? "Official Standard MOET Dispatch 2345" : "Chuẩn Mẫu Công Văn 2345/BGDĐT"}
                  </span>
                  <p className="text-xs text-stone-600 mt-1 font-serif">
                    {getDayDisplay(activePlan.dayOfWeek)} • {isEn ? "Curriculum Period: " : "Tiết PPCT: "}{activePlan.curriculumPeriod} • {isEn ? `Grade ${activePlan.grade} - Class ${activePlan.className}` : `Khối ${activePlan.grade} - Lớp ${activePlan.className}`}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transition-colors cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isEn ? "Save Changes" : "Lưu Thay Đổi"}</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-black text-[10px] font-bold uppercase tracking-wider border border-black transition-colors cursor-pointer"
                      >
                        <span>{isEn ? "Cancel" : "Hủy"}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-black text-[10px] font-bold uppercase tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isEn ? "Edit This Lesson" : "Chỉnh Sửa Bài Này"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Header Info - Clean & Compact (No Cộng hòa) */}
              <div className="grid grid-cols-2 gap-4 text-xs pb-3 border-b border-black">
                <div className="text-left space-y-0.5">
                  <p className="uppercase text-stone-700 font-semibold">{schoolInfo.departmentName || (isEn ? "PRIMARY EDUCATION DIVISION" : "PHÒNG GD&ĐT HUYỆN TÂN THẠNH")}</p>
                  <p className="font-bold text-black uppercase">{schoolInfo.schoolName}</p>
                  <p className="text-stone-700">{isEn ? `GRADE ${activePlan.grade} FACULTY` : `TỔ CHUYÊN MÔN KHỐI ${activePlan.grade}`}</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="font-bold text-black uppercase">{isEn ? "CLASS: " : "LỚP: "}{activePlan.className || schoolInfo.className}</p>
                  <p className="text-stone-700">{isEn ? "School Year: " : "Năm học: "}{schoolInfo.academicYear}</p>
                  <p className="text-stone-600 italic">{isEn ? "Week " : "Tuần "}{activePlan.week} ({getDayDisplay(activePlan.dayOfWeek)} - {activePlan.dateStr || schoolInfo.startDate})</p>
                </div>
              </div>

              {/* Title & Subject Banner */}
              <div className="text-center space-y-1">
                <h2 className="text-xl font-serif font-black text-black uppercase tracking-tight">
                  {isEn ? `DETAILED LESSON PLAN - WEEK ${activePlan.week}` : `KẾ HOẠCH BÀI DẠY CHI TIẾT TUẦN ${activePlan.week}`}
                </h2>
                <p className="text-xs font-bold text-stone-800">
                  {isEn ? `SCHOOL YEAR ${schoolInfo.academicYear} (CLASS ${activePlan.className})` : `NĂM HỌC ${schoolInfo.academicYear} (LỚP ${activePlan.className})`}
                </p>
                <p className="text-xs text-stone-700">
                  {isEn ? "Teacher: " : "Giáo viên giảng dạy: "}<strong className="text-black italic">{activePlan.teacherName}</strong>
                </p>
              </div>

              {/* Lesson Specific Info */}
              <div className="bg-stone-50 p-4 border border-black space-y-1 text-xs">
                <p className="font-bold text-black uppercase text-xs">
                  {getDayDisplay(activePlan.dayOfWeek)} ({activePlan.dateStr || schoolInfo.startDate})
                </p>
                <div className="flex items-center justify-between flex-wrap gap-2 pt-0.5">
                  <h3 className="font-extrabold text-black text-base uppercase tracking-tight">
                    {cleanLessonTitle(activePlan.lessonTitle)}
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-950 font-bold border border-amber-300 px-2 py-0.5">
                    {isEn ? "Curriculum Period: " : "Tiết PPCT: "}{activePlan.curriculumPeriod}
                  </span>
                </div>

                {/* Song info badge for Music subject */}
                {(activePlan.songTitle || activePlan.subject.toLowerCase().includes("âm nhạc")) && (
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-500 text-amber-950 font-bold text-xs">
                      <Music className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isEn ? "Key Song: " : "Bài hát trọng tâm: "}{activePlan.songTitle || (isEn ? "Singing by Theme" : "Học hát theo chủ đề")}</span>
                    </span>
                    {activePlan.composer && (
                      <span className="text-stone-700 text-xs italic bg-stone-100 px-2 py-0.5 border border-stone-300">
                        {isEn ? "Music & Lyrics: " : "Nhạc & lời: "}<strong className="text-black not-italic font-semibold">{activePlan.composer}</strong>
                      </span>
                    )}
                  </div>
                )}

                {/* Direct download buttons strictly for lessons with authentic presentation files */}
                {(() => {
                  const deckSummary = getAuthenticDeckSummary(activePlan.lessonTitle, activePlan.subject);
                  const q = buildSearchQueries(activePlan.lessonTitle, activePlan.subject, activePlan.grade, "kntt", "powerpoint");
                  
                  const handleDownloadThisPptx = async () => {
                    try {
                      setIsDownloadingPptx(true);
                      const res = await downloadLessonPresentationPptx(activePlan, schoolInfo);
                      setDownloadSuccessMsg(isEn ? `Downloaded to computer: ${res.filename}` : `Đã tải xuống máy: ${res.filename}`);
                      setTimeout(() => setDownloadSuccessMsg(null), 4000);
                    } catch (err) {
                      console.error(err);
                      alert(isEn ? "Error generating PowerPoint file. Please try again!" : "Đã xảy ra lỗi khi tạo tệp PowerPoint. Vui lòng thử lại!");
                    } finally {
                      setIsDownloadingPptx(false);
                    }
                  };

                  return (
                    <div className="pt-2.5 mt-2 border-t border-stone-300 space-y-2">
                      {deckSummary.available && (
                        /* Chỉ hiển thị cho các bài có tệp slide mẫu chuẩn gửi lên */
                        <div className="bg-emerald-50/90 border border-emerald-500 p-2.5 space-y-2 rounded-xs">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] bg-emerald-800 text-white font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                                {deckSummary.badge}
                              </span>
                              <span className="text-xs font-serif font-bold text-emerald-950">
                                {deckSummary.description}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-emerald-200">
                            {/* 1. DIRECT DOWNLOAD BUTTON */}
                            <button
                              type="button"
                              onClick={handleDownloadThisPptx}
                              disabled={isDownloadingPptx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-0.5 cursor-pointer disabled:opacity-50"
                              title={isEn ? "Download authentic PowerPoint (.pptx) file directly to computer" : "Tải tệp PowerPoint (.pptx) chuẩn trực tiếp về máy tính để giảng dạy"}
                            >
                              {isDownloadingPptx ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                                  <span>{isEn ? "Generating File..." : "Đang Tạo File..."}</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3.5 h-3.5 text-black" />
                                  <span>{isEn ? "Download PowerPoint (.PPTX)" : "Tải PowerPoint (.PPTX)"}</span>
                                </>
                              )}
                            </button>

                            {/* 2. Slide Show / Preview */}
                            <button
                              type="button"
                              onClick={() => setIsPreviewOpen(true)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-900 text-xs font-bold uppercase tracking-wider border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
                              title={isEn ? "Preview lecture slides or present full screen" : "Xem trước các slide bài giảng hoặc trình chiếu toàn màn hình"}
                            >
                              <Eye className="w-3.5 h-3.5 text-stone-800" />
                              <span>{isEn ? "Preview / Present Slides" : "Xem Thử / Chiếu Slide"}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {downloadSuccessMsg && (
                        <div className="p-2 bg-emerald-100 border border-emerald-500 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{downloadSuccessMsg}</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* SECTION I: YÊU CẦU CẦN ĐẠT */}
              <div className="space-y-3 text-xs">
                <h3 className="font-serif font-bold text-sm text-black border-b border-black pb-1 uppercase tracking-wide">
                  {isEn ? "I. LEARNING OBJECTIVES" : "I. YÊU CẦU CẦN ĐẠT"}
                </h3>

                <div className="space-y-2 pl-2">
                  {/* 1. Năng lực đặc thù */}
                  <div>
                    <h4 className="font-bold text-black">{isEn ? "1. Specific Competencies:" : "1. Năng lực đặc thù:"}</h4>
                    <p className="text-stone-800 mt-0.5 leading-relaxed">
                      {activePlan.objectives.specificCompetencies.join(" ")}
                    </p>
                  </div>

                  {/* 2. Năng lực chung */}
                  <div>
                    <h4 className="font-bold text-black">{isEn ? "2. Core Competencies:" : "2. Năng lực chung:"}</h4>
                    <p className="text-stone-800 mt-0.5 leading-relaxed">
                      {activePlan.objectives.generalCompetencies.join(" ")}
                    </p>
                  </div>

                  {/* 3. Phẩm chất */}
                  <div>
                    <h4 className="font-bold text-black">{isEn ? "3. Qualities:" : "3. Phẩm chất:"}</h4>
                    <p className="text-stone-800 mt-0.5 leading-relaxed">
                      {activePlan.objectives.qualities.join(" ")}
                    </p>
                  </div>

                  {/* 4. Tích hợp lồng ghép */}
                  {activePlan.objectives.integrations && (
                    <div className="bg-stone-50 p-3.5 border border-black space-y-1.5 mt-2">
                      <h4 className="font-bold text-black flex items-center gap-1.5 uppercase text-[11px] tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        {isEn ? "4. Integrated Cross-Curricular Content:" : "4. Nội dung tích hợp lồng ghép trong bài dạy:"}
                      </h4>
                      <ul className="space-y-1 text-xs text-stone-800 pl-4 list-disc">
                        {activePlan.objectives.integrations.ai && (
                          <li><strong>{isEn ? "Artificial Intelligence (AI): " : "Trí tuệ nhân tạo (AI): "}</strong> {activePlan.objectives.integrations.ai}</li>
                        )}
                        {activePlan.objectives.integrations.digitalCompetence && (
                          <li><strong>{isEn ? "Digital Competence: " : "Năng lực số (CV 3456/BGDĐT): "}</strong> {activePlan.objectives.integrations.digitalCompetence}</li>
                        )}
                        {activePlan.objectives.integrations.humanRights && (
                          <li><strong>{isEn ? "Human Rights Education: " : "Giáo dục Quyền con người: "}</strong> {activePlan.objectives.integrations.humanRights}</li>
                        )}
                        {activePlan.objectives.integrations.defense && (
                          <li><strong>{isEn ? "Defense & Security: " : "GD Quốc phòng & An ninh (TT 08/2024): "}</strong> {activePlan.objectives.integrations.defense}</li>
                        )}
                        {activePlan.objectives.integrations.nutrition && (
                          <li><strong>{isEn ? "Nutrition Education: " : "Giáo dục Dinh dưỡng: "}</strong> {activePlan.objectives.integrations.nutrition}</li>
                        )}
                        {activePlan.objectives.integrations.stem && (
                          <li><strong>{isEn ? "STEM / Play to Learn: " : "Giáo dục STEM / Chơi để học: "}</strong> {activePlan.objectives.integrations.stem}</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* 5. Yêu cầu cần đạt đối với học sinh khuyết tật (Chỉ nêu đối với những lớp có học sinh khuyết tật) */}
                  {schoolInfo.hasSpecialNeedsStudent && (
                    <div className="bg-amber-50 p-3 border border-amber-300 mt-2">
                      <h4 className="font-bold text-amber-950 uppercase text-[11px] tracking-wide">
                        {isEn ? "5. Objectives for Students with Disabilities:" : "5. Yêu cầu cần đạt đối với học sinh khuyết tật:"}
                      </h4>
                      <p className="text-amber-900 mt-0.5 italic leading-relaxed text-xs">
                        {activePlan.objectives.specialNeedsObjective || schoolInfo.specialNeedsDescription || "Tham gia các hoạt động học tập cùng bạn theo khả năng; nhận biết kiến thức cốt lõi và hoàn thành nhiệm vụ cơ bản với sự hỗ trợ của GV và bạn bè."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION II: ĐỒ DÙNG DẠY HỌC */}
              <div className="space-y-2 text-xs">
                <h3 className="font-serif font-bold text-sm text-black border-b border-black pb-1 uppercase tracking-wide">
                  {isEn ? "II. TEACHING AIDS & EQUIPMENT" : "II. ĐỒ DÙNG DẠY HỌC VÀ HỌC LIỆU"}
                </h3>
                <div className="space-y-1 pl-2">
                  <p className="text-stone-800">
                    <strong className="text-black">{isEn ? "- Teacher: " : "- Giáo viên: "}</strong> {activePlan.materials.teacher.join("; ")}
                  </p>
                  <p className="text-stone-800">
                    <strong className="text-black">{isEn ? "- Students: " : "- Học sinh: "}</strong> {activePlan.materials.student.join("; ")}
                  </p>
                </div>
              </div>

              {/* SPECIAL MUSIC SECTION: NỘI DUNG & LỜI CA BÀI HÁT */}
              {(activePlan.songLyrics || activePlan.songTitle) && (
                <div className="space-y-2 text-xs">
                  <h3 className="font-serif font-bold text-sm text-black border-b border-black pb-1 uppercase tracking-wide flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Music className="w-4 h-4 text-amber-700" />
                      {isEn ? "MUSIC FOCUS & LYRICS: " : "NỘI DUNG & LỜI CA BÀI HÁT: "}&ldquo;{activePlan.songTitle || activePlan.lessonTitle}&rdquo;
                    </span>
                    {activePlan.composer && (
                      <span className="text-xs font-normal normal-case text-stone-600">
                        {isEn ? "Composer: " : "Nhạc và lời: "}<strong className="text-black">{activePlan.composer}</strong>
                      </span>
                    )}
                  </h3>
                  <div className="bg-amber-50/70 border border-amber-300 p-4 rounded-sm text-center">
                    <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2">
                      --- {isEn ? "Song Lyrics" : "Lời Ca Chính Thức Bài Hát"} ---
                    </p>
                    <div className="font-serif text-sm text-stone-800 leading-relaxed whitespace-pre-line italic max-w-xl mx-auto py-1">
                      {activePlan.songLyrics}
                    </div>
                  </div>
                </div>
              )}

              {/* SPECIAL ENGLISH SECTION: TỪ VỰNG & MẪU CÂU TRỌNG TÂM */}
              {((activePlan.englishVocabulary && activePlan.englishVocabulary.length > 0) || 
                (activePlan.sentencePatterns && activePlan.sentencePatterns.length > 0) || 
                activePlan.subject.toLowerCase().includes("tiếng anh")) && (
                <div className="space-y-2 text-xs">
                  <h3 className="font-serif font-bold text-sm text-black border-b border-black pb-1 uppercase tracking-wide flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-blue-700" />
                      {isEn ? "ENGLISH CORE CONTENT: " : "NỘI DUNG TRỌNG TÂM TIẾNG ANH: "}&ldquo;{activePlan.lessonTitle}&rdquo;
                    </span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-900 border border-blue-300 px-2 py-0.5 font-bold">
                      Global Success / GDPT 2018
                    </span>
                  </h3>
                  <div className="bg-blue-50/70 border border-blue-300 p-4 rounded-sm space-y-3">
                    {activePlan.englishVocabulary && activePlan.englishVocabulary.length > 0 && (
                      <div>
                        <p className="text-[11px] font-bold text-blue-950 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <span>{isEn ? "★ Target Vocabulary:" : "★ Từ Vựng Trọng Tâm (Target Vocabulary):"}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activePlan.englishVocabulary.map((vocab, vIdx) => (
                            <span 
                              key={vIdx} 
                              className="inline-flex items-center bg-white border border-blue-400 text-blue-950 px-2.5 py-1 text-xs font-serif font-bold shadow-xs"
                            >
                              {vocab}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activePlan.sentencePatterns && activePlan.sentencePatterns.length > 0 && (
                      <div className="border-t border-blue-200 pt-2">
                        <p className="text-[11px] font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                          {isEn ? "★ Sentence Patterns:" : "★ Cấu Trúc / Mẫu Câu Trọng Tâm (Sentence Patterns):"}
                        </p>
                        <div className="space-y-1">
                          {activePlan.sentencePatterns.map((pat, pIdx) => (
                            <div key={pIdx} className="bg-white/80 border border-blue-300 px-3 py-1.5 text-xs text-blue-950 font-mono font-bold">
                              • {pat}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION III: 2-COLUMN TEACHING ACTIVITIES TABLE */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-black pb-1">
                  <h3 className="font-serif font-bold text-sm text-black uppercase tracking-wide">
                    {isEn ? "III. MAIN TEACHING ACTIVITIES" : "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU (Bảng 2 cột Hoạt động GV - Hoạt động HS)"}
                  </h3>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleAddActivity}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 border border-black text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{isEn ? "Add Activity" : "Thêm Hoạt Động"}</span>
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto border border-black">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100 text-black font-serif font-bold uppercase text-[10px] tracking-wider border-b border-black">
                        <th className="py-3 px-4 border-r border-black w-1/2 text-center">
                          {isEn ? "TEACHER'S ACTIVITIES" : "HOẠT ĐỘNG CỦA GIÁO VIÊN"}
                        </th>
                        <th className="py-3 px-4 w-1/2 text-center">
                          {isEn ? "STUDENTS' ACTIVITIES" : "HOẠT ĐỘNG CỦA HỌC SINH"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      {(isEditing ? (editFormData?.activities || []) : activePlan.activities).map((act, actIdx) => (
                        <tr key={act.id || actIdx} className={actIdx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                          {/* Teacher Column */}
                          <td className="py-3 px-4 border-r border-black align-top space-y-2 w-1/2">
                            {isEditing ? (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <label className="text-[10px] font-bold text-stone-700 uppercase">
                                    {isEn ? "Activity Name:" : "Tên hoạt động:"}
                                  </label>
                                  {(editFormData?.activities?.length || 0) > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveActivity(actIdx)}
                                      className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                                      title={isEn ? "Delete this activity" : "Xóa hoạt động này"}
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  value={act.name}
                                  onChange={(e) => handleActivityChange(actIdx, "name", e.target.value)}
                                  className="w-full p-1.5 border border-black text-xs font-bold font-serif bg-white"
                                />

                                <label className="text-[10px] font-bold text-stone-700 uppercase block">
                                  {isEn ? "Objective:" : "Mục tiêu hoạt động:"}
                                </label>
                                <input
                                  type="text"
                                  value={act.objective}
                                  onChange={(e) => handleActivityChange(actIdx, "objective", e.target.value)}
                                  className="w-full p-1.5 border border-stone-400 text-xs font-serif bg-stone-50"
                                />

                                <label className="text-[10px] font-bold text-stone-700 uppercase block">
                                  {isEn ? "Teacher's Procedure:" : "Cách tiến hành của giáo viên:"}
                                </label>
                                <textarea
                                  rows={6}
                                  value={act.teacherActivity}
                                  onChange={(e) => handleActivityChange(actIdx, "teacherActivity", e.target.value)}
                                  className="w-full p-2 border border-black text-xs font-serif bg-white leading-relaxed"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="font-bold text-black text-xs uppercase">
                                  {normalizeActivityName(act.name)}
                                </div>
                                <div className="text-xs text-stone-700 bg-stone-100 p-2 border border-stone-300">
                                  <strong>{isEn ? "* Objective: " : "* Mục tiêu: "}</strong>{act.objective}
                                </div>
                                <div className="text-stone-900 leading-relaxed whitespace-pre-line text-xs">
                                  <strong>{isEn ? "* Procedure: " : "* Cách tiến hành: "}</strong>
                                  <br />
                                  {act.teacherActivity}
                                </div>
                              </>
                            )}
                          </td>

                          {/* Student Column */}
                          <td className="py-3 px-4 align-top text-stone-900 leading-relaxed whitespace-pre-line text-xs w-1/2">
                            {isEditing ? (
                              <div className="space-y-2">
                                <label className="text-[10px] font-bold text-stone-700 uppercase block">
                                  {isEn ? "Students' Activities:" : "Hoạt động của học sinh:"}
                                </label>
                                <textarea
                                  rows={11}
                                  value={act.studentActivity}
                                  onChange={(e) => handleActivityChange(actIdx, "studentActivity", e.target.value)}
                                  className="w-full p-2 border border-black text-xs font-serif bg-white leading-relaxed"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="font-bold text-stone-500 text-[11px] mb-2 uppercase">
                                  {isEn ? "(Students' Response & Execution)" : "(Phản hồi & Thực hiện của HS)"}
                                </div>
                                {act.studentActivity}
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION IV: ĐIỀU CHỈNH SAU BÀI DẠY */}
              <div className="space-y-2 text-xs">
                <h3 className="font-serif font-bold text-sm text-black border-b border-black pb-1 uppercase tracking-wide">
                  {isEn ? "IV. POST-LESSON ADJUSTMENTS" : "IV. ĐIỀU CHỈNH SAU BÀI DẠY"}
                </h3>
                <p className="text-stone-500 italic pl-2">
                  {activePlan.postLessonAdjustment || "...................................................................................................................................................................................................."}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-black p-12 text-center text-stone-400 font-serif shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {isEn ? "No lesson plan selected." : "Chưa có bài dạy nào được chọn."}
            </div>
          )}
        </div>
      </div>
      )}

      {/* Slide Preview & Projection Modal */}
      {isPreviewOpen && activePlan && (
        <PresentationViewerModal
          isOpen={true}
          onClose={() => setIsPreviewOpen(false)}
          plan={activePlan}
          schoolInfo={schoolInfo}
        />
      )}
    </div>
  );
};

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  PageBreak,
  convertInchesToTwip,
  PageOrientation,
} from "docx";
import { saveAs } from "file-saver";
import { LessonPlan, ScheduleItem, SchoolInfo, MasterTimetable } from "../types";
import { DAYS_OF_WEEK, DEFAULT_TEACHERS, isSlotMatchingTeacherOrSubject, getWeekDates, getSpecialistTeacherShortName } from "../data/defaultTimetables";
import { cleanLessonTitle, normalizeActivityName } from "./lessonTitleHelper";

/**
 * Universal robust file download helper for Web & sandboxed iFrame environments
 */
export function saveDocxFile(blob: Blob, filename: string): { blob: Blob; filename: string; url: string } {
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      } catch {
        // Ignore
      }
    }, 1500);
  } catch (err) {
    console.warn("DOM click download encountered error, trying file-saver saveAs:", err);
    try {
      saveAs(blob, filename);
    } catch (saveAsErr) {
      console.error("file-saver saveAs error:", saveAsErr);
    }
  }

  return { blob, filename, url };
}

// Helper to convert pt to half-points for docx library (e.g. 12pt -> 24 half-points, 13pt -> 26, 14pt -> 28)
function getFontSizeHalfPoints(pt: number): number {
  return pt * 2;
}

// Helper to format multiline activity content cleanly into Paragraph array for docx table cells
function createActivityCellParagraphs(
  text: string,
  font: string,
  baseSize: number,
  prefixHeading?: string
): Paragraph[] {
  if (!text) return [new Paragraph({ text: "" })];
  const paragraphs: Paragraph[] = [];

  if (prefixHeading) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [new TextRun({ text: prefixHeading, bold: true, color: "0F172A", font, size: baseSize })],
      })
    );
  }

  const lines = text.split("\n");
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return;
    }

    const isMajorHeader = trimmed.startsWith("* CÁC TỪ VỰNG") ||
                          trimmed.startsWith("* CÁC MẪU CÂU") ||
                          trimmed.startsWith("* THAO TÁC") ||
                          trimmed.startsWith("* CÁC BƯỚC") ||
                          trimmed.startsWith("* TÊN TRÒ CHƠI") ||
                          trimmed.startsWith("* DANH SÁCH") ||
                          trimmed.startsWith("- DẠY VÀ") ||
                          trimmed.startsWith("- TIẾP NHẬN") ||
                          trimmed.startsWith("- TỔ CHỨC") ||
                          trimmed.startsWith("- THAM GIA") ||
                          trimmed.startsWith("- THỰC HIỆN") ||
                          trimmed.startsWith("★");

    const isVocabItem = /^\d+\.\s+[a-zA-Z]/.test(trimmed) || (trimmed.startsWith("• ") && trimmed.includes(":"));

    // Check if line has a prominent label before colon (e.g., "+ Bước 1 (5 phút):", "* Lưu ý:", "- Khởi động:")
    const stepMatch = trimmed.match(/^([+*•-]\s*[^:]{2,35}:)(.*)$/);
    if (stepMatch && !isMajorHeader) {
      const label = stepMatch[1];
      const rest = stepMatch[2];
      paragraphs.push(
        new Paragraph({
          spacing: { before: 25, after: 15 },
          children: [
            new TextRun({
              text: label + " ",
              bold: true,
              color: "1E40AF",
              font,
              size: baseSize - 0.5,
            }),
            new TextRun({
              text: rest.trim(),
              bold: false,
              color: "334155",
              font,
              size: baseSize - 0.5,
            }),
          ],
        })
      );
      return;
    }

    paragraphs.push(
      new Paragraph({
        spacing: { before: isMajorHeader ? 40 : 15, after: isMajorHeader ? 20 : 15 },
        children: [
          new TextRun({
            text: line,
            bold: isMajorHeader || isVocabItem,
            color: isMajorHeader ? "1E40AF" : (isVocabItem ? "0F172A" : "334155"),
            font,
            size: isMajorHeader ? baseSize : baseSize - 0.5,
          }),
        ],
      })
    );
  });

  return paragraphs.length > 0 ? paragraphs : [new Paragraph({ text: "" })];
}

// Vietnam Administrative Document Margins (Standard Nghị định 30/2020/NĐ-CP)
// Top: 20mm (~1134 dxa), Bottom: 20mm (~1134 dxa), Left: 25-30mm (~1417 dxa), Right: 15-20mm (~850 dxa)
const STANDARD_A4_PAGE_PORTRAIT = {
  size: {
    width: 11906, // A4 width: 210mm
    height: 16838, // A4 height: 297mm
    orientation: PageOrientation.PORTRAIT,
  },
  margin: {
    top: 1134, // 20mm
    bottom: 1134, // 20mm
    left: 1417, // 25mm
    right: 992, // 17.5mm
  },
};

const STANDARD_A4_PAGE_LANDSCAPE = {
  size: {
    width: 16838, // A4 width: 297mm
    height: 11906, // A4 height: 210mm
    orientation: PageOrientation.LANDSCAPE,
  },
  margin: {
    top: 1134,
    bottom: 1134,
    left: 1134,
    right: 1134,
  },
};

/**
 * 1. Generate Word (.docx) A4 for Thời Khóa Biểu (TKB) - Lớp hoặc Toàn trường
 */
export async function exportTimetableDocx(
  schoolInfo: SchoolInfo,
  masterTimetable: MasterTimetable,
  targetClass?: string,
  orientation: "portrait" | "landscape" = "portrait"
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const subTitleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 3);

  const cls = targetClass || schoolInfo.className;
  const isLandscape = orientation === "landscape";
  const tableWidth = isLandscape ? 14500 : 9400;

  // Header rows
  const tableRows: TableRow[] = [];

  // Table Column Headers
  const colWidths = isLandscape
    ? [1600, 1000, 2380, 2380, 2380, 2380, 2380]
    : [1300, 900, 1440, 1440, 1440, 1440, 1440];

  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "E2E8F0" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Buổi", bold: true, font, size: baseSize })],
            }),
          ],
        }),
        new TableCell({
          width: { size: colWidths[1], type: WidthType.DXA },
          shading: { fill: "E2E8F0" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Tiết", bold: true, font, size: baseSize })],
            }),
          ],
        }),
        ...DAYS_OF_WEEK.map(
          (day, dIdx) =>
            new TableCell({
              width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
              shading: { fill: "E2E8F0" },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: day, bold: true, font, size: baseSize })],
                }),
              ],
            })
        ),
      ],
    })
  );

  // Sáng: 5 Tiết
  for (let p = 1; p <= 5; p++) {
    const cells: TableCell[] = [];

    if (p === 1) {
      cells.push(
        new TableCell({
          rowSpan: 5,
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "F8FAFC" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "SÁNG", bold: true, font, size: baseSize }),
                new TextRun({ text: "\n(7h15 - 11h15)", italics: true, font, size: smallSize }),
              ],
            }),
          ],
        })
      );
    }

    cells.push(
      new TableCell({
        width: { size: colWidths[1], type: WidthType.DXA },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })],
          }),
        ],
      })
    );

    DAYS_OF_WEEK.forEach((day, dIdx) => {
      const slotKey = `${day}_Sáng_${p}`;
      const subject = masterTimetable.slots[slotKey]?.[cls] || (cls === "1A1" ? masterTimetable.slots[slotKey]?.["1A"] : "") || "—";
      const isBold = subject !== "—" && !subject.includes("(");

      cells.push(
        new TableCell({
          width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: subject,
                  bold: isBold,
                  font,
                  size: baseSize,
                }),
              ],
            }),
          ],
        })
      );
    });

    tableRows.push(new TableRow({ children: cells }));
  }

  // Chiều: 3 Tiết
  for (let p = 1; p <= 3; p++) {
    const cells: TableCell[] = [];

    if (p === 1) {
      cells.push(
        new TableCell({
          rowSpan: 3,
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "F8FAFC" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "CHIỀU", bold: true, font, size: baseSize }),
                new TextRun({ text: "\n(13h30 - 16h00)", italics: true, font, size: smallSize }),
              ],
            }),
          ],
        })
      );
    }

    cells.push(
      new TableCell({
        width: { size: colWidths[1], type: WidthType.DXA },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })],
          }),
        ],
      })
    );

    DAYS_OF_WEEK.forEach((day, dIdx) => {
      const slotKey = `${day}_Chiều_${p}`;
      const subject = masterTimetable.slots[slotKey]?.[cls] || (cls === "1A1" ? masterTimetable.slots[slotKey]?.["1A"] : "") || "—";
      const isBold = subject !== "—" && !subject.includes("(");

      cells.push(
        new TableCell({
          width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: subject,
                  bold: isBold,
                  font,
                  size: baseSize,
                }),
              ],
            }),
          ],
        })
      );
    });

    tableRows.push(new TableRow({ children: cells }));
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: isLandscape ? STANDARD_A4_PAGE_LANDSCAPE : STANDARD_A4_PAGE_PORTRAIT,
        },
        children: [
          // Official Header
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: isLandscape ? 7000 : 4500, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: (schoolInfo.departmentName || "PHÒNG GIÁO DỤC VÀ ĐÀO TẠO").toUpperCase(),
                            font,
                            size: smallSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: (schoolInfo.schoolName || "TRƯỜNG TIỂU HỌC").toUpperCase(),
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      ...(schoolInfo.branchName
                        ? [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: `Phân hiệu: ${schoolInfo.branchName}`,
                                  font,
                                  size: smallSize,
                                }),
                              ],
                            }),
                          ]
                        : []),
                    ],
                  }),
                  new TableCell({
                    width: { size: isLandscape ? 7500 : 4900, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "Độc lập - Tự do - Hạnh phúc",
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "---------------------------",
                            font,
                            size: smallSize,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { before: 150 } }),

          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `THỜI KHÓA BIỂU CHI TIẾT - LỚP ${cls}`,
                bold: true,
                font,
                size: titleSize,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Năm học: ${schoolInfo.academicYear} | Áp dụng từ tuần ${schoolInfo.week} (${schoolInfo.startDate} - ${schoolInfo.endDate})`,
                italics: true,
                font,
                size: baseSize,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Giáo viên chủ nhiệm: ${schoolInfo.teacherName} | Lớp: ${cls} (Khối ${cls.charAt(0)})`,
                bold: true,
                font,
                size: baseSize,
              }),
            ],
          }),

          // Main Timetable Table
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            rows: tableRows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `TKB_A4_Lop_${cls}_GV_${schoolInfo.teacherName}_NMH${schoolInfo.academicYear.replace(/\s+/g, "")}.docx`;
  return saveDocxFile(blob, fileName);
}

export function formatTeacherSubjectClean(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/\s*\([^)]*\)/g, "").trim();
  const upper = s.toUpperCase();
  if (upper === "MT") return "Mĩ thuật";
  if (upper === "HĐTN") return "HĐTN";
  if (upper === "TV") return "Tiếng Việt";
  if (upper === "T") return "Toán";
  if (upper === "AN") return "Âm nhạc";
  if (upper === "BDAN") return "BD Âm nhạc";
  if (upper === "GDTC") return "GD Thể chất";
  if (upper === "TNXH") return "TNXH";
  if (upper === "KH") return "Khoa học";
  if (upper === "LS-ĐL" || upper === "LSĐL") return "Lịch sử - Địa lí";
  if (upper === "ĐĐ") return "Đạo đức";
  if (upper === "CN") return "Công nghệ";
  if (upper === "TH") return "Tin học";
  if (upper === "TA") return "Tiếng Anh";
  if (upper === "TCT") return "Tăng cường Toán";
  if (upper === "TCTV") return "Tăng cường Tiếng Việt";
  if (upper === "HỌP") return "Họp HĐSP";
  return s || raw;
}

/**
 * 1.1 Generate Word (.docx) A4 for Teacher's Personal Timetable (TKB Giáo Viên Riêng Biệt)
 */
export async function exportTeacherTimetableDocx(
  schoolInfo: SchoolInfo,
  masterTimetable: MasterTimetable,
  teacherName: string,
  orientation: "portrait" | "landscape" = "portrait"
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const subTitleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 3);

  const isLandscape = orientation === "landscape";
  const tableWidth = isLandscape ? 14500 : 9400;

  // Find teacher info
  const matchedTeacher = DEFAULT_TEACHERS.find((t) => t.name === teacherName);
  const teacherRole = matchedTeacher?.role || (schoolInfo.teacherType === "specialist" ? `GV Chuyên ${schoolInfo.specialistSubject}` : `GVCN Lớp ${schoolInfo.className}`);
  const specialistSubject = matchedTeacher?.specialistSubject || schoolInfo.specialistSubject;

  const colWidths = isLandscape
    ? [1600, 1000, 2380, 2380, 2380, 2380, 2380]
    : [1300, 900, 1440, 1440, 1440, 1440, 1440];

  const tableRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "E2E8F0" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Buổi", bold: true, font, size: baseSize })],
            }),
          ],
        }),
        new TableCell({
          width: { size: colWidths[1], type: WidthType.DXA },
          shading: { fill: "E2E8F0" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "Tiết", bold: true, font, size: baseSize })],
            }),
          ],
        }),
        ...DAYS_OF_WEEK.map(
          (day, dIdx) =>
            new TableCell({
              width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
              shading: { fill: "E2E8F0" },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: day, bold: true, font, size: baseSize })],
                }),
              ],
            })
        ),
      ],
    }),
  ];

  // Helper to find taught classes & subjects for this teacher at a slot
  const getTeacherClassesForSlot = (slotKey: string, day: string, session: string, period: number) => {
    const taught: { cls: string; sub: string }[] = [];
    masterTimetable.classes.forEach((cls) => {
      const val = (masterTimetable.slots[slotKey]?.[cls] || "").trim();
      if (!val || val.toUpperCase() === "HỌP") return;
      if (
        isSlotMatchingTeacherOrSubject(val, teacherName, specialistSubject) ||
        (matchedTeacher?.assignedClasses?.includes(cls) && matchedTeacher?.type === "homeroom" && !val.includes("(")) ||
        (teacherName.includes("Tuấn") && cls === "5A" && !val.includes("(")) ||
        (teacherName.includes("Huế") && cls === "5B" && !val.includes("(")) ||
        (teacherName.includes("Hằng") && cls === "4A" && !val.includes("(")) ||
        (teacherName.includes("Yến") && cls === "4B" && !val.includes("(")) ||
        (teacherName.includes("Dương") && cls === "3A" && !val.includes("(")) ||
        (teacherName.includes("Đạt") && cls === "3B" && !val.includes("(")) ||
        (teacherName.includes("Chinh") && cls === "2B" && !val.includes("(")) ||
        (teacherName.includes("Trang") && cls === "2A" && !val.includes("(")) ||
        (teacherName.includes("Chi") && cls === "1A" && !val.includes("(")) ||
        (teacherName.includes("Năm") && cls === "1B" && !val.includes("("))
      ) {
        taught.push({ cls, sub: val });
      }
    });
    return taught;
  };

  // Calculate total teaching periods
  let totalTeachingPeriods = 0;
  DAYS_OF_WEEK.forEach((day) => {
    for (let p = 1; p <= 5; p++) {
      totalTeachingPeriods += getTeacherClassesForSlot(`${day}_Sáng_${p}`, day, "Sáng", p).length;
    }
    for (let p = 1; p <= 3; p++) {
      totalTeachingPeriods += getTeacherClassesForSlot(`${day}_Chiều_${p}`, day, "Chiều", p).length;
    }
  });

  // Morning 1 -> 5
  for (let p = 1; p <= 5; p++) {
    const cells: TableCell[] = [];
    if (p === 1) {
      cells.push(
        new TableCell({
          rowSpan: 5,
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "F8FAFC" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "SÁNG", bold: true, font, size: baseSize }),
                new TextRun({ text: "\n(7h15 - 11h15)", italics: true, font, size: smallSize }),
              ],
            }),
          ],
        })
      );
    }

    cells.push(
      new TableCell({
        width: { size: colWidths[1], type: WidthType.DXA },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })],
          }),
        ],
      })
    );

    DAYS_OF_WEEK.forEach((day, dIdx) => {
      const slotKey = `${day}_Sáng_${p}`;
      const taught = getTeacherClassesForSlot(slotKey, day, "Sáng", p);

      const paragraphs: Paragraph[] = [];
      if (taught.length > 0) {
        taught.forEach((t) => {
          const cleanSubject = formatTeacherSubjectClean(t.sub);
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Lớp ${t.cls}: `, bold: true, font, size: baseSize }),
                new TextRun({ text: cleanSubject, font, size: baseSize }),
              ],
            })
          );
        });
      } else {
        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "—", italics: true, font, size: baseSize, color: "94A3B8" })],
          })
        );
      }

      cells.push(
        new TableCell({
          width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
          children: paragraphs,
        })
      );
    });

    tableRows.push(new TableRow({ children: cells }));
  }

  // Afternoon 1 -> 3
  for (let p = 1; p <= 3; p++) {
    const cells: TableCell[] = [];
    if (p === 1) {
      cells.push(
        new TableCell({
          rowSpan: 3,
          width: { size: colWidths[0], type: WidthType.DXA },
          shading: { fill: "F8FAFC" },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "CHIỀU", bold: true, font, size: baseSize }),
                new TextRun({ text: "\n(13h30 - 16h00)", italics: true, font, size: smallSize }),
              ],
            }),
          ],
        })
      );
    }

    cells.push(
      new TableCell({
        width: { size: colWidths[1], type: WidthType.DXA },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })],
          }),
        ],
      })
    );

    DAYS_OF_WEEK.forEach((day, dIdx) => {
      const slotKey = `${day}_Chiều_${p}`;
      const taught = getTeacherClassesForSlot(slotKey, day, "Chiều", p);

      // Check if slot is school-wide meeting (e.g. Thứ Sáu Chiều 1)
      const isMeeting = masterTimetable.classes.some(
        (c) => (masterTimetable.slots[slotKey]?.[c] || "").trim().toUpperCase() === "HỌP"
      );

      const paragraphs: Paragraph[] = [];
      if (taught.length > 0) {
        taught.forEach((t) => {
          const cleanSubject = formatTeacherSubjectClean(t.sub);
          paragraphs.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: `Lớp ${t.cls}: `, bold: true, font, size: baseSize }),
                new TextRun({ text: cleanSubject, font, size: baseSize }),
              ],
            })
          );
        });
      } else if (isMeeting) {
        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "HỌP HĐSP", bold: true, font, size: baseSize, color: "4C1D95" }),
              new TextRun({ text: "\n(Toàn trường)", italics: true, font, size: smallSize, color: "6D28D9" }),
            ],
          })
        );
      } else {
        paragraphs.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "—", italics: true, font, size: baseSize, color: "94A3B8" })],
          })
        );
      }

      cells.push(
        new TableCell({
          width: { size: colWidths[2 + dIdx], type: WidthType.DXA },
          children: paragraphs,
        })
      );
    });

    tableRows.push(new TableRow({ children: cells }));
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: isLandscape ? STANDARD_A4_PAGE_LANDSCAPE : STANDARD_A4_PAGE_PORTRAIT,
        },
        children: [
          // Official Header
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: isLandscape ? 7000 : 4500, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: (schoolInfo.departmentName || "PHÒNG GIÁO DỤC VÀ ĐÀO TẠO").toUpperCase(),
                            font,
                            size: smallSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: (schoolInfo.schoolName || "TRƯỜNG TIỂU HỌC").toUpperCase(),
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      ...(schoolInfo.branchName
                        ? [
                            new Paragraph({
                              alignment: AlignmentType.CENTER,
                              children: [
                                new TextRun({
                                  text: `Phân hiệu: ${schoolInfo.branchName}`,
                                  font,
                                  size: smallSize,
                                }),
                              ],
                            }),
                          ]
                        : []),
                    ],
                  }),
                  new TableCell({
                    width: { size: isLandscape ? 7500 : 4900, type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "Độc lập - Tự do - Hạnh phúc",
                            bold: true,
                            font,
                            size: baseSize,
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "---------------------------",
                            font,
                            size: smallSize,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: "", spacing: { before: 150 } }),

          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `THỜI KHÓA BIỂU CÁ NHÂN GIÁO VIÊN`,
                bold: true,
                font,
                size: titleSize,
                color: "0F172A",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Năm học: ${schoolInfo.academicYear} | Áp dụng Tuần 2 (Từ 14/09/2026 đến 18/09/2026)`,
                italics: true,
                font,
                size: baseSize,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Giáo viên: ${teacherName}   |   Nhiệm vụ: ${teacherRole}   |   Tổng số: ${totalTeachingPeriods} tiết/tuần`,
                bold: true,
                font,
                size: baseSize,
              }),
            ],
          }),

          // Main Timetable Table
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            rows: tableRows,
          }),

          new Paragraph({ text: "", spacing: { before: 200 } }),

          // Official Signatures
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: Math.floor(tableWidth / 3), type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "HIỆU TRƯỞNG", bold: true, font, size: baseSize }),
                          new TextRun({ text: "\n(Ký và đóng dấu)", italics: true, font, size: smallSize }),
                          new TextRun({ text: "\n\n\n\n\n", font, size: baseSize }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: Math.floor(tableWidth / 3), type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "TỔ TRƯỞNG CHUYÊN MÔN", bold: true, font, size: baseSize }),
                          new TextRun({ text: "\n(Ký, ghi rõ họ tên)", italics: true, font, size: smallSize }),
                          new TextRun({ text: "\n\n\n\n\n", font, size: baseSize }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: Math.floor(tableWidth / 3), type: WidthType.DXA },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `Tân Thạnh, ngày 14 tháng 09 năm 2026`,
                            italics: true,
                            font,
                            size: smallSize,
                          }),
                          new TextRun({ text: "\nGIÁO VIÊN THỰC HIỆN", bold: true, font, size: baseSize }),
                          new TextRun({ text: "\n(Ký, ghi rõ họ tên)", italics: true, font, size: smallSize }),
                          new TextRun({ text: "\n\n\n\n\n", font, size: baseSize }),
                          new TextRun({ text: teacherName, bold: true, font, size: baseSize }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const cleanTeacherName = teacherName.replace(/\s+/g, "_");
  const fileName = `TKB_A4_GiaoVien_${cleanTeacherName}_NMH${schoolInfo.academicYear.replace(/\s+/g, "")}.docx`;
  return saveDocxFile(blob, fileName);
}

/**
 * Helper to build the Official 7-column LBG Table (1 Thứ, 1 Ngày cho tất cả các tiết trong ngày, Tên bài dạy tinh gọn, Ghi chú để trống)
 */
export function buildOfficialLBGTable(
  schoolInfo: SchoolInfo,
  scheduleItems: ScheduleItem[],
  font: string,
  baseSize: number,
  smallSize: number,
  tableWidth: number = 9400
): Table {
  const dayOrder = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
  const weekDates = getWeekDates(schoolInfo.startDate, schoolInfo.week);
  const groupedDays: { day: string; dateStr?: string; items: ScheduleItem[] }[] = [];

  dayOrder.forEach((d, dIdx) => {
    const items = scheduleItems.filter((it) => it.day === d);
    if (items.length > 0) {
      const fallbackDate = dIdx < 5 ? weekDates[dIdx] : "";
      groupedDays.push({
        day: d,
        dateStr: items[0]?.dateStr || fallbackDate,
        items,
      });
    }
  });

  scheduleItems.forEach((it) => {
    if (!dayOrder.includes(it.day) && !groupedDays.some((g) => g.day === it.day)) {
      const items = scheduleItems.filter((x) => x.day === it.day);
      groupedDays.push({
        day: it.day,
        dateStr: items[0]?.dateStr || "",
        items,
      });
    }
  });

  const rows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 1400, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Thứ / Ngày", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Buổi", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 600, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tiết", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Môn / Phân môn", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tiết PPCT", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 3200, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tên bài dạy", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Ghi chú", bold: true, font, size: baseSize })] })],
          shading: { fill: "E2E8F0" },
        }),
      ],
    }),
  ];

  groupedDays.forEach((group) => {
    // Precompute session spans for Word table
    const sessionSpans: number[] = [];
    let i = 0;
    while (i < group.items.length) {
      let count = 1;
      while (i + count < group.items.length && group.items[i + count].session === group.items[i].session) {
        count++;
      }
      for (let c = 0; c < count; c++) {
        sessionSpans.push(c === 0 ? count : 0);
      }
      i += count;
    }

    group.items.forEach((item, itemIdx) => {
      const cells: TableCell[] = [];

      // Row 0 of this day: Spans all periods of the day
      if (itemIdx === 0) {
        cells.push(
          new TableCell({
            rowSpan: group.items.length,
            width: { size: 1400, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: group.day, bold: true, font, size: baseSize }),
                  ...(group.dateStr
                    ? [new TextRun({ text: `\n(${group.dateStr})`, font, size: smallSize })]
                    : []),
                ],
              }),
            ],
          })
        );
      }

      // Buổi: Gộp hiển thị 1 lần cho Sáng / Chiều trong ngày
      const sessionSpan = sessionSpans[itemIdx];
      if (sessionSpan > 0) {
        cells.push(
          new TableCell({
            rowSpan: sessionSpan,
            width: { size: 800, type: WidthType.DXA },
            shading: item.session === "Sáng" ? { fill: "F8FAFC" } : { fill: "F1F5F9" },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: item.session, bold: true, font, size: baseSize })],
              }),
            ],
          })
        );
      }

      // Tiết
      cells.push(
        new TableCell({
          width: { size: 600, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(item.period), font, size: baseSize })] })],
        })
      );

      // Môn / Phân môn
      cells.push(
        new TableCell({
          width: { size: 1800, type: WidthType.DXA },
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: item.subject, bold: true, font, size: baseSize }),
                ...(item.className && item.className !== schoolInfo.className
                  ? [new TextRun({ text: ` [Lớp ${item.className}]`, bold: true, color: "1E40AF", font, size: smallSize })]
                  : []),
              ],
            }),
          ],
        })
      );

      // Tiết PPCT
      cells.push(
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(item.curriculumPeriod || "-"), font, size: baseSize })] })],
        })
      );

      // Tên bài dạy (Lưu ý LBG của lớp thì các tiết dạy GV chuyên thì chỉ ghi tên gv chuyên, không ghi tên bài)
      const isClassLBG = schoolInfo.teacherType !== "specialist";
      const specTeacher = item.specialistTeacherName || getSpecialistTeacherShortName(item);
      const isSpecialist = Boolean(item.isSpecialistPeriod || specTeacher);

      let lbgTitle = cleanLessonTitle(item.lessonTitle) || "Bài dạy";
      if (isClassLBG && isSpecialist && specTeacher) {
        lbgTitle = specTeacher;
      }

      cells.push(
        new TableCell({
          width: { size: 3200, type: WidthType.DXA },
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: lbgTitle, bold: true, font, size: baseSize }),
              ],
            }),
          ],
        })
      );

      // Ghi chú (Bỏ trống theo yêu cầu người dùng)
      cells.push(
        new TableCell({
          width: { size: 800, type: WidthType.DXA },
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "", font, size: smallSize })] })],
        })
      );

      rows.push(new TableRow({ children: cells }));
    });
  });

  return new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    rows,
  });
}

/**
 * 2. Generate Word (.docx) A4 for Weekly Teaching Schedule (Lịch Báo Giảng - LBG)
 */
export async function exportScheduleDocx(
  schoolInfo: SchoolInfo,
  scheduleItems: ScheduleItem[]
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 2);

  const tableWidth = 9400;

  const doc = new Document({
    sections: [
      {
        properties: {
          page: STANDARD_A4_PAGE_PORTRAIT,
        },
        children: [
          // Official Header
          new Table({
            width: { size: tableWidth, type: WidthType.DXA },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 4500, type: WidthType.DXA },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (schoolInfo.departmentName || "PHÒNG GIÁO DỤC VÀ ĐÀO TẠO").toUpperCase(), font, size: smallSize })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (schoolInfo.schoolName || "TRƯỜNG TIỂU HỌC").toUpperCase(), bold: true, font, size: baseSize })] }),
                      ...(schoolInfo.branchName
                        ? [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Phân hiệu: ${schoolInfo.branchName}`, font, size: smallSize })] })]
                        : []),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Lớp: ${schoolInfo.className} - GV: ${schoolInfo.teacherName}`, bold: true, font, size: baseSize })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 4900, type: WidthType.DXA },
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, font, size: baseSize })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, font, size: baseSize })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "---------------------------", font, size: smallSize })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "", spacing: { before: 180 } }),
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ 
                text: schoolInfo.teacherType === "specialist" 
                  ? `LỊCH BÁO GIẢNG DẠY CHUYÊN MÔN: ${schoolInfo.specialistSubject?.toUpperCase()} - TUẦN ${schoolInfo.week}`
                  : `LỊCH BÁO GIẢNG TUẦN ${schoolInfo.week}`, 
                bold: true, 
                font, 
                size: titleSize, 
                color: "0F172A" 
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `Từ ngày ${schoolInfo.startDate} đến ngày ${schoolInfo.endDate} --- Năm học: ${schoolInfo.academicYear}`, italics: true, font, size: baseSize }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 180 },
            children: [
              new TextRun({ 
                text: schoolInfo.teacherType === "specialist"
                  ? `TUẦN HỌC THỨ : ${schoolInfo.week}  |  MÔN CHUYÊN : ${schoolInfo.specialistSubject?.toUpperCase()}  |  GV : ${schoolInfo.teacherName}`
                  : `TUẦN HỌC THỨ : ${schoolInfo.week}  |  KHỐI : ${schoolInfo.grade}  |  LỚP : ${schoolInfo.className}`, 
                bold: true, 
                font, 
                size: baseSize 
              }),
            ],
          }),
          // Main Table (1 Thứ, 1 Ngày cho tất cả các tiết trong ngày, Tên bài dạy tinh gọn, Ghi chú để trống)
          buildOfficialLBGTable(schoolInfo, scheduleItems, font, baseSize, smallSize, tableWidth),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filePrefix = schoolInfo.teacherType === "specialist" 
    ? `LBG_A4_Tuan_${schoolInfo.week}_GVChuyen_${schoolInfo.specialistSubject}_GV_${schoolInfo.teacherName}`
    : `LBG_A4_Tuan_${schoolInfo.week}_Lop_${schoolInfo.className}_GV_${schoolInfo.teacherName}`;
  return saveDocxFile(blob, `${filePrefix}.docx`);
}

/**
 * 3. Generate Word (.docx) A4 for Full Week or Single Lesson Plan (Kế hoạch bài dạy - KHBD)
 * Following CV 2345/BGDĐT standard: 2-column activities, all competencies & integrations, font size 12-14pt.
 */
export async function exportLessonPlansDocx(
  schoolInfo: SchoolInfo,
  lessonPlans: LessonPlan[],
  titleSuffix: string = "Cả_Tuần"
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const subTitleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 3);

  const tableWidth = 9400;
  const colHalfWidth = 4700;

  const docChildren: any[] = [];

  // Sort plans strictly by day and TKB order: Day -> Session (Sáng -> Chiều) -> Period
  const dayOrder: Record<string, number> = {
    "Thứ Hai": 1,
    "Thứ Ba": 2,
    "Thứ Tư": 3,
    "Thứ Năm": 4,
    "Thứ Sáu": 5,
  };

  const sortedPlans = [...lessonPlans].sort((a, b) => {
    const orderA = dayOrder[a.dayOfWeek] || 99;
    const orderB = dayOrder[b.dayOfWeek] || 99;
    if (orderA !== orderB) return orderA - orderB;
    const sDiff = (a.session === "Sáng" ? 1 : 2) - (b.session === "Sáng" ? 1 : 2);
    if (sDiff !== 0) return sDiff;
    return Number(a.timetablePeriod || a.periodNumber || 0) - Number(b.timetablePeriod || b.periodNumber || 0);
  });

  // Top Single Document Header (Compact, no repetitive Cộng hòa)
  docChildren.push(
    new Table({
      width: { size: tableWidth, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 5200, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: (schoolInfo.departmentName || "PHÒNG GD&ĐT HUYỆN TÂN THẠNH").toUpperCase(), font, size: smallSize })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: (schoolInfo.schoolName || "TRƯỜNG TIỂU HỌC TÂN THẠNH - PHÂN HIỆU TÂN BÌNH").toUpperCase(), bold: true, font, size: baseSize })] }),
                new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: schoolInfo.teacherType === "specialist" ? `TỔ CHUYÊN MÔN ${schoolInfo.specialistSubject?.toUpperCase() || "BỘ MÔN"}` : `TỔ CHUYÊN MÔN KHỐI ${schoolInfo.grade || 5}`, font, size: smallSize })] }),
              ],
            }),
            new TableCell({
              width: { size: 4200, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `LỚP: ${schoolInfo.className || "5A"}`, bold: true, font, size: baseSize })] }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `Năm học: ${schoolInfo.academicYear}`, font, size: smallSize })] }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `Tuần ${schoolInfo.week} (${schoolInfo.startDate} - ${schoolInfo.endDate})`, italics: true, font, size: smallSize })] }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  // Document Title
  docChildren.push(new Paragraph({ text: "", spacing: { before: 120 } }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `KẾ HOẠCH BÀI DẠY TUẦN ${schoolInfo.week}`, bold: true, font, size: titleSize, color: "0F172A" }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `NĂM HỌC ${schoolInfo.academicYear} (LỚP ${schoolInfo.className})`, bold: true, font, size: subTitleSize }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({ text: `Giáo viên giảng dạy: ${schoolInfo.teacherName}`, bold: true, font, size: baseSize }),
      ],
    })
  );

  let currentDay = "";

  sortedPlans.forEach((plan, planIdx) => {
    // New Day Section
    if (plan.dayOfWeek !== currentDay) {
      if (currentDay !== "") {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }
      currentDay = plan.dayOfWeek;

      const weekDates = getWeekDates(schoolInfo.startDate, schoolInfo.week);
      const dayMap: Record<string, number> = {
        "Thứ Hai": 0,
        "Thứ Ba": 1,
        "Thứ Tư": 2,
        "Thứ Năm": 3,
        "Thứ Sáu": 4,
      };
      const dayIdx = dayMap[plan.dayOfWeek];
      const resolvedDateStr = plan.dateStr || (dayIdx !== undefined ? weekDates[dayIdx] : "");

      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 140, after: 80 },
          children: [
            new TextRun({
              text: `${plan.dayOfWeek.toUpperCase()}${resolvedDateStr ? ` (${resolvedDateStr})` : ""}`,
              bold: true,
              font,
              size: subTitleSize + 1,
            }),
          ],
        })
      );
    } else {
      // Divider between periods of the same day
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 80 },
          children: [
            new TextRun({
              text: "-------------------------------------------------------------------------------------------------------------",
              font,
              size: smallSize,
              color: "94A3B8",
            }),
          ],
        })
      );
    }

    // Tên tựa bỏ chữ môn chỉ ghi trọn vẹn tên bài học
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: cleanLessonTitle(plan.lessonTitle).toUpperCase(), bold: true, font, size: baseSize + 2 }),
        ],
      })
    );

    // Section I: Objectives (YÊU CẦU CẦN ĐẠT)
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [new TextRun({ text: "I. YÊU CẦU CẦN ĐẠT", bold: true, color: "0F172A", font, size: baseSize })],
      })
    );

    // 1. Specific competencies
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "1. Năng lực đặc thù: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.specificCompetencies.join(" "), font, size: baseSize }),
        ],
      })
    );

    // 2. General competencies
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "2. Năng lực chung: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.generalCompetencies.join(" "), font, size: baseSize }),
        ],
      })
    );

    // 3. Qualities
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "3. Phẩm chất: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.qualities.join(" "), font, size: baseSize }),
        ],
      })
    );

    // 5. Yêu cầu cần đạt đối với học sinh khuyết tật (Chỉ nêu đối với những lớp có học sinh khuyết tật)
    if (schoolInfo.hasSpecialNeedsStudent) {
      const specialNeedsText = plan.objectives.specialNeedsObjective ||
        schoolInfo.specialNeedsDescription ||
        "Tham gia các hoạt động học tập cùng bạn theo khả năng; nhận biết được kiến thức cốt lõi của bài học và hoàn thành các nhiệm vụ cơ bản với sự hỗ trợ của giáo viên và bạn bè.";
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "5. Yêu cầu cần đạt đối với học sinh khuyết tật: ", bold: true, color: "7C2D12", font, size: baseSize }),
            new TextRun({ text: specialNeedsText, italics: true, color: "7C2D12", font, size: baseSize }),
          ],
        })
      );
    }

    // Integrations
    if (plan.objectives.integrations) {
      const ints = plan.objectives.integrations;
      const intLines: string[] = [];
      if (ints.ai) intLines.push(`• Tích hợp AI: ${ints.ai}`);
      if (ints.digitalCompetence) intLines.push(`• Tích hợp Năng lực số: ${ints.digitalCompetence}`);
      if (ints.humanRights) intLines.push(`• Tích hợp Quyền con người: ${ints.humanRights}`);
      if (ints.defense) intLines.push(`• Tích hợp QPAN: ${ints.defense}`);
      if (ints.nutrition) intLines.push(`• Tích hợp Dinh dưỡng: ${ints.nutrition}`);
      if (ints.stem) intLines.push(`• Tích hợp STEM: ${ints.stem}`);
      if (ints.environment) intLines.push(`• Tích hợp Môi trường: ${ints.environment}`);
      if (ints.lifeSkills) intLines.push(`• Tích hợp Kỹ năng sống: ${ints.lifeSkills}`);

      if (intLines.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({ text: "4. Tích hợp giáo dục: ", bold: true, color: "047857", font, size: baseSize }),
              new TextRun({ text: intLines.join("; "), italics: true, color: "065F46", font, size: baseSize }),
            ],
          })
        );
      }
    }

    // Section II: Materials
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [new TextRun({ text: "II. ĐỒ DÙNG DẠY HỌC", bold: true, color: "0F172A", font, size: baseSize })],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "- Giáo viên: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.materials.teacher.join("; "), font, size: baseSize }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 30 },
        children: [
          new TextRun({ text: "- Học sinh: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.materials.student.join("; "), font, size: baseSize }),
        ],
      })
    );

    // Special Music Section: Lyrics
    if (plan.songLyrics) {
      docChildren.push(new Paragraph({ text: "", spacing: { before: 80 } }));
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `NỘI DUNG & LỜI CA BÀI HÁT: "${plan.songTitle || plan.lessonTitle}"${plan.composer ? ` (Nhạc và lời: ${plan.composer})` : ""}`,
              bold: true,
              color: "1E3A8A",
              font,
              size: baseSize,
            }),
          ],
        })
      );
      const lyricsLines = plan.songLyrics.split("\n");
      lyricsLines.forEach((line) => {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: line,
                italics: true,
                color: "334155",
                font,
                size: baseSize - 1,
              }),
            ],
          })
        );
      });
    }

    // Special English Section: Vocabulary & Sentence Patterns
    if ((plan.englishVocabulary && plan.englishVocabulary.length > 0) || (plan.sentencePatterns && plan.sentencePatterns.length > 0)) {
      docChildren.push(new Paragraph({ text: "", spacing: { before: 80 } }));
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `NỘI DUNG TRỌNG TÂM TIẾNG ANH (TARGET VOCABULARY & SENTENCE PATTERNS):`,
              bold: true,
              color: "1E3A8A",
              font,
              size: baseSize,
            }),
          ],
        })
      );
      if (plan.englishVocabulary && plan.englishVocabulary.length > 0) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "• Từ vựng trọng tâm (Target Vocabulary): ", bold: true, font, size: baseSize }),
              new TextRun({ text: plan.englishVocabulary.join(" | "), font, size: baseSize }),
            ],
          })
        );
      }
      if (plan.sentencePatterns && plan.sentencePatterns.length > 0) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({ text: "• Mẫu câu trọng tâm (Sentence Patterns): ", bold: true, font, size: baseSize }),
              new TextRun({ text: plan.sentencePatterns.join(" | "), font, size: baseSize }),
            ],
          })
        );
      }
    }

    // Section III: 2-Column Teaching Activities Table
    docChildren.push(new Paragraph({ text: "", spacing: { before: 80 } }));
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU", bold: true, color: "0F172A", font, size: baseSize })],
      })
    );

    const activityTableRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            width: { size: colHalfWidth, type: WidthType.DXA },
            shading: { fill: "1E3A8A" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA GIÁO VIÊN", bold: true, color: "FFFFFF", font, size: baseSize })] })],
          }),
          new TableCell({
            width: { size: colHalfWidth, type: WidthType.DXA },
            shading: { fill: "1E3A8A" },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA HỌC SINH", bold: true, color: "FFFFFF", font, size: baseSize })] })],
          }),
        ],
      }),
    ];

    plan.activities.forEach((act) => {
      const teacherParagraphs: Paragraph[] = [
        new Paragraph({
          spacing: { after: 30 },
          children: [new TextRun({ text: normalizeActivityName(act.name), bold: true, color: "1E40AF", font, size: baseSize })],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `- Mục tiêu: `, bold: true, font, size: baseSize }),
            new TextRun({ text: act.objective, font, size: baseSize }),
          ],
        }),
        ...createActivityCellParagraphs(act.teacherActivity, font, baseSize, "- Cách tiến hành:")
      ];

      const studentParagraphs: Paragraph[] = [
        ...createActivityCellParagraphs(act.studentActivity, font, baseSize)
      ];

      activityTableRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: colHalfWidth, type: WidthType.DXA },
              children: teacherParagraphs,
            }),
            new TableCell({
              width: { size: colHalfWidth, type: WidthType.DXA },
              children: studentParagraphs,
            }),
          ],
        })
      );
    });

    docChildren.push(
      new Table({
        width: { size: tableWidth, type: WidthType.DXA },
        rows: activityTableRows,
      })
    );

    // Section IV: Post Lesson Adjustment
    docChildren.push(new Paragraph({ text: "", spacing: { before: 80 } }));
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: "IV. ĐIỀU CHỈNH SAU BÀI DẠY", bold: true, color: "0F172A", font, size: baseSize })],
      })
    );
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: plan.postLessonAdjustment || "...........................................................................................................................................................................\n...........................................................................................................................................................................", font, size: smallSize, color: "64748B" })],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "------------------------------------------------------------------------------------------------------------------------", font, size: smallSize, color: "CBD5E1" })],
      })
    );
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: STANDARD_A4_PAGE_PORTRAIT,
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filePrefix = schoolInfo.teacherType === "specialist"
    ? `KHBD_A4_${titleSuffix}_GVChuyen_${schoolInfo.specialistSubject}_GV_${schoolInfo.teacherName}`
    : `KHBD_A4_${titleSuffix}_Lop_${schoolInfo.className}_GV_${schoolInfo.teacherName}`;
  return saveDocxFile(blob, `${filePrefix}.docx`);
}

/**
 * 4. Generate Combo Word (.docx) A4 All-In-One Document containing TKB + LBG + KHBD
 */
export async function exportCombinedAllInOneDocx(
  schoolInfo: SchoolInfo,
  masterTimetable: MasterTimetable,
  scheduleItems: ScheduleItem[],
  lessonPlans: LessonPlan[]
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const subTitleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 3);

  const tableWidth = 9400;
  const colHalfWidth = 4700;
  const cls = schoolInfo.className;

  const docChildren: any[] = [];

  // =================== PART 1: THỜI KHÓA BIỂU (TKB) ===================
  docChildren.push(
    new Table({
      width: { size: tableWidth, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4500, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (schoolInfo.departmentName || "PHÒNG GIÁO DỤC VÀ ĐÀO TẠO").toUpperCase(), font, size: smallSize })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (schoolInfo.schoolName || "TRƯỜNG TIỂU HỌC").toUpperCase(), bold: true, font, size: baseSize })] }),
                ...(schoolInfo.branchName ? [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Phân hiệu: ${schoolInfo.branchName}`, font, size: smallSize })] })] : []),
              ],
            }),
            new TableCell({
              width: { size: 4900, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, font, size: baseSize })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, font, size: baseSize })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "---------------------------", font, size: smallSize })] }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  docChildren.push(new Paragraph({ text: "", spacing: { before: 150 } }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `[PHẦN 1] THỜI KHÓA BIỂU - LỚP ${cls}`, bold: true, font, size: titleSize, color: "0F172A" })],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [new TextRun({ text: `Năm học: ${schoolInfo.academicYear} | GVCN: ${schoolInfo.teacherName}`, italics: true, font, size: baseSize })],
    })
  );

  // TKB Table
  const tkbColWidths = [1300, 900, 1440, 1440, 1440, 1440, 1440];
  const tkbRows: TableRow[] = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: tkbColWidths[0], type: WidthType.DXA }, shading: { fill: "E2E8F0" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Buổi", bold: true, font, size: baseSize })] })] }),
        new TableCell({ width: { size: tkbColWidths[1], type: WidthType.DXA }, shading: { fill: "E2E8F0" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tiết", bold: true, font, size: baseSize })] })] }),
        ...DAYS_OF_WEEK.map((d, di) => new TableCell({ width: { size: tkbColWidths[2 + di], type: WidthType.DXA }, shading: { fill: "E2E8F0" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: d, bold: true, font, size: baseSize })] })] })),
      ],
    }),
  ];

  for (let p = 1; p <= 5; p++) {
    const cells: TableCell[] = [];
    if (p === 1) {
      cells.push(new TableCell({ rowSpan: 5, width: { size: tkbColWidths[0], type: WidthType.DXA }, shading: { fill: "F8FAFC" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "SÁNG", bold: true, font, size: baseSize })] })] }));
    }
    cells.push(new TableCell({ width: { size: tkbColWidths[1], type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })] })] }));
    DAYS_OF_WEEK.forEach((d, di) => {
      const subject = masterTimetable.slots[`${d}_Sáng_${p}`]?.[cls] || "—";
      cells.push(new TableCell({ width: { size: tkbColWidths[2 + di], type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: subject, bold: subject !== "—", font, size: baseSize })] })] }));
    });
    tkbRows.push(new TableRow({ children: cells }));
  }

  for (let p = 1; p <= 3; p++) {
    const cells: TableCell[] = [];
    if (p === 1) {
      cells.push(new TableCell({ rowSpan: 3, width: { size: tkbColWidths[0], type: WidthType.DXA }, shading: { fill: "F8FAFC" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CHIỀU", bold: true, font, size: baseSize })] })] }));
    }
    cells.push(new TableCell({ width: { size: tkbColWidths[1], type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(p), bold: true, font, size: baseSize })] })] }));
    DAYS_OF_WEEK.forEach((d, di) => {
      const subject = masterTimetable.slots[`${d}_Chiều_${p}`]?.[cls] || "—";
      cells.push(new TableCell({ width: { size: tkbColWidths[2 + di], type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: subject, bold: subject !== "—", font, size: baseSize })] })] }));
    });
    tkbRows.push(new TableRow({ children: cells }));
  }

  docChildren.push(new Table({ width: { size: tableWidth, type: WidthType.DXA }, rows: tkbRows }));

  // =================== PART 2: LỊCH BÁO GIẢNG (LBG) ===================
  docChildren.push(new Paragraph({ children: [new PageBreak()] }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `[PHẦN 2] LỊCH BÁO GIẢNG TUẦN ${schoolInfo.week}`, bold: true, font, size: titleSize, color: "0F172A" })],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [new TextRun({ text: `Từ ngày ${schoolInfo.startDate} đến ngày ${schoolInfo.endDate} - Lớp ${schoolInfo.className}`, italics: true, font, size: baseSize })],
    })
  );

  docChildren.push(buildOfficialLBGTable(schoolInfo, scheduleItems, font, baseSize, smallSize, tableWidth));

  // =================== PART 3: KẾ HOẠCH BÀI DẠY (KHBD) CẢ TUẦN ===================
  docChildren.push(new Paragraph({ children: [new PageBreak()] }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `[PHẦN 3] KẾ HOẠCH BÀI DẠY TUẦN ${schoolInfo.week} (CV 2345/BGDĐT)`, bold: true, font, size: titleSize, color: "0F172A" })],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: `Soạn gọn gàng theo thứ tự Thời khóa biểu & Phân phối chương trình - Lớp ${schoolInfo.className}`, italics: true, font, size: baseSize })],
    })
  );

  // Group and sort lesson plans day by day (Thứ Hai -> Thứ Sáu) strictly in TKB order
  const comboDayOrder: Record<string, number> = {
    "Thứ Hai": 1,
    "Thứ Ba": 2,
    "Thứ Tư": 3,
    "Thứ Năm": 4,
    "Thứ Sáu": 5,
  };

  const sortedComboPlans = [...lessonPlans].sort((a, b) => {
    const orderA = comboDayOrder[a.dayOfWeek] || 99;
    const orderB = comboDayOrder[b.dayOfWeek] || 99;
    if (orderA !== orderB) return orderA - orderB;
    const sDiff = (a.session === "Sáng" ? 1 : 2) - (b.session === "Sáng" ? 1 : 2);
    if (sDiff !== 0) return sDiff;
    return Number(a.timetablePeriod || a.periodNumber || 0) - Number(b.timetablePeriod || b.periodNumber || 0);
  });

  let currentComboDay = "";

  sortedComboPlans.forEach((plan) => {
    if (plan.dayOfWeek !== currentComboDay) {
      if (currentComboDay !== "") {
        docChildren.push(new Paragraph({ children: [new PageBreak()] }));
      }
      currentComboDay = plan.dayOfWeek;
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 80 },
          shading: { fill: "1E293B" },
          children: [
            new TextRun({
              text: `★ ★ ★ ${plan.dayOfWeek.toUpperCase()} (NGÀY ${plan.dateStr || ""}) ★ ★ ★`,
              bold: true,
              color: "FFFFFF",
              font,
              size: subTitleSize,
            }),
          ],
        })
      );
    } else {
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 60 },
          children: [
            new TextRun({
              text: "-------------------------------------------------------------------------------------------------------------",
              font,
              size: smallSize,
              color: "94A3B8",
            }),
          ],
        })
      );
    }

    // Tên tựa bỏ chữ môn chỉ ghi trọn vẹn tên bài học
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: cleanLessonTitle(plan.lessonTitle).toUpperCase(), bold: true, font, size: baseSize + 2 }),
        ],
      })
    );

    // I. Yêu cầu cần đạt
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [new TextRun({ text: "I. YÊU CẦU CẦN ĐẠT", bold: true, font, size: baseSize })],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "1. Năng lực đặc thù: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.specificCompetencies.join(" "), font, size: baseSize }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "2. Năng lực chung: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.generalCompetencies.join(" "), font, size: baseSize }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "3. Phẩm chất: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.objectives.qualities.join(" "), font, size: baseSize }),
        ],
      })
    );

    // 5. Yêu cầu cần đạt đối với học sinh khuyết tật (Chỉ nêu đối với những lớp có học sinh khuyết tật)
    if (schoolInfo.hasSpecialNeedsStudent) {
      const specialNeedsText = plan.objectives.specialNeedsObjective ||
        schoolInfo.specialNeedsDescription ||
        "Tham gia các hoạt động học tập cùng bạn theo khả năng; nhận biết được kiến thức cốt lõi của bài học và hoàn thành các nhiệm vụ cơ bản với sự hỗ trợ của giáo viên và bạn bè.";
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "5. Yêu cầu cần đạt đối với học sinh khuyết tật: ", bold: true, color: "7C2D12", font, size: baseSize }),
            new TextRun({ text: specialNeedsText, italics: true, color: "7C2D12", font, size: baseSize }),
          ],
        })
      );
    }

    if (plan.objectives.integrations) {
      const ints = plan.objectives.integrations;
      const intLines: string[] = [];
      if (ints.ai) intLines.push(`• Tích hợp AI: ${ints.ai}`);
      if (ints.digitalCompetence) intLines.push(`• Tích hợp Năng lực số: ${ints.digitalCompetence}`);
      if (ints.humanRights) intLines.push(`• Tích hợp Quyền con người: ${ints.humanRights}`);
      if (ints.defense) intLines.push(`• Tích hợp QPAN: ${ints.defense}`);
      if (ints.nutrition) intLines.push(`• Tích hợp Dinh dưỡng: ${ints.nutrition}`);
      if (ints.stem) intLines.push(`• Tích hợp STEM: ${ints.stem}`);
      if (ints.environment) intLines.push(`• Tích hợp Môi trường: ${ints.environment}`);
      if (ints.lifeSkills) intLines.push(`• Tích hợp Kỹ năng sống: ${ints.lifeSkills}`);
      if (intLines.length > 0) {
        docChildren.push(
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({ text: "4. Tích hợp giáo dục: ", bold: true, color: "047857", font, size: baseSize }),
              new TextRun({ text: intLines.join("; "), italics: true, color: "065F46", font, size: baseSize }),
            ],
          })
        );
      }
    }

    // II. Đồ dùng
    docChildren.push(
      new Paragraph({
        spacing: { before: 40, after: 20 },
        children: [new TextRun({ text: "II. ĐỒ DÙNG DẠY HỌC", bold: true, font, size: baseSize })],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 20 },
        children: [
          new TextRun({ text: "- Giáo viên: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.materials.teacher.join("; "), font, size: baseSize }),
        ],
      })
    );
    docChildren.push(
      new Paragraph({
        spacing: { after: 30 },
        children: [
          new TextRun({ text: "- Học sinh: ", bold: true, font, size: baseSize }),
          new TextRun({ text: plan.materials.student.join("; "), font, size: baseSize }),
        ],
      })
    );

    // Special Music Section: Lyrics
    if (plan.songLyrics) {
      docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `NỘI DUNG & LỜI CA BÀI HÁT: "${plan.songTitle || plan.lessonTitle}"${plan.composer ? ` (Nhạc và lời: ${plan.composer})` : ""}`,
              bold: true,
              color: "1E3A8A",
              font,
              size: baseSize,
            }),
          ],
        })
      );
      const lyricsLines = plan.songLyrics.split("\n");
      lyricsLines.forEach((line) => {
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: line,
                italics: true,
                color: "334155",
                font,
                size: baseSize - 1,
              }),
            ],
          })
        );
      });
    }

    // III. Các hoạt động
    docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
    docChildren.push(new Paragraph({ children: [new TextRun({ text: "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU", bold: true, font, size: baseSize })] }));

    const activityRows: TableRow[] = [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({ width: { size: colHalfWidth, type: WidthType.DXA }, shading: { fill: "1E3A8A" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA GIÁO VIÊN", bold: true, color: "FFFFFF", font, size: baseSize })] })] }),
          new TableCell({ width: { size: colHalfWidth, type: WidthType.DXA }, shading: { fill: "1E3A8A" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA HỌC SINH", bold: true, color: "FFFFFF", font, size: baseSize })] })] }),
        ],
      }),
    ];

    plan.activities.forEach((act) => {
      const teacherParagraphs: Paragraph[] = [
        new Paragraph({
          spacing: { after: 30 },
          children: [new TextRun({ text: normalizeActivityName(act.name), bold: true, color: "1E40AF", font, size: baseSize })],
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `- Mục tiêu: `, bold: true, font, size: baseSize }),
            new TextRun({ text: act.objective, font, size: baseSize }),
          ],
        }),
        ...createActivityCellParagraphs(act.teacherActivity, font, baseSize, "- Cách tiến hành:")
      ];

      const studentParagraphs: Paragraph[] = [
        ...createActivityCellParagraphs(act.studentActivity, font, baseSize)
      ];

      activityRows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: colHalfWidth, type: WidthType.DXA },
              children: teacherParagraphs,
            }),
            new TableCell({
              width: { size: colHalfWidth, type: WidthType.DXA },
              children: studentParagraphs,
            }),
          ],
        })
      );
    });

    docChildren.push(new Table({ width: { size: tableWidth, type: WidthType.DXA }, rows: activityRows }));

    // IV. Điều chỉnh
    docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
    docChildren.push(new Paragraph({ children: [new TextRun({ text: "IV. ĐIỀU CHỈNH SAU BÀI DẠY: ", bold: true, font, size: baseSize }), new TextRun({ text: plan.postLessonAdjustment || ".....................................................................................................................................", font, size: smallSize, color: "64748B" })] }));
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: STANDARD_A4_PAGE_PORTRAIT,
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const comboPrefix = schoolInfo.teacherType === "specialist"
    ? `TRON_BO_A4_TKB_LBG_KHBD_Tuan_${schoolInfo.week}_GVChuyen_${schoolInfo.specialistSubject}_GV_${schoolInfo.teacherName}`
    : `TRON_BO_A4_TKB_LBG_KHBD_Tuan_${schoolInfo.week}_Lop_${schoolInfo.className}_GV_${schoolInfo.teacherName}`;
  return saveDocxFile(blob, `${comboPrefix}.docx`);
}

/**
 * 4. Generate Word (.docx) A4 for KHBD Cả Tuần: Trang 1 là LBG, kế tiếp là KHBD từ Thứ 2 đến Thứ 6
 * Chuẩn nộp Ban Giám Hiệu & Tổ chuyên môn theo CV 2345/BGDĐT
 */
export async function exportWeeklyKHBDWithLBGFirstPageDocx(
  schoolInfo: SchoolInfo,
  scheduleItems: ScheduleItem[],
  lessonPlans: LessonPlan[]
) {
  const font = schoolInfo.fontFamily || "Times New Roman";
  const baseSize = getFontSizeHalfPoints(schoolInfo.fontSize || 13);
  const smallSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) - 1);
  const subTitleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 1);
  const titleSize = getFontSizeHalfPoints((schoolInfo.fontSize || 13) + 3);

  const tableWidth = 9400;
  const colHalfWidth = 4700;

  const docChildren: any[] = [];

  // =================== TRANG 1: LỊCH BÁO GIẢNG (LBG) ===================
  // Administrative Header for LBG
  docChildren.push(
    new Table({
      width: { size: tableWidth, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4500, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: (schoolInfo.departmentName || "PHÒNG GIÁO DỤC VÀ ĐÀO TẠO").toUpperCase(), font, size: smallSize })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: schoolInfo.schoolName.toUpperCase(), bold: true, font, size: baseSize })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: schoolInfo.branchName
                        ? `PHÂN HIỆU: ${schoolInfo.branchName.toUpperCase()}`
                        : (schoolInfo.teacherType === "specialist" ? "TỔ CHUYÊN MÔN NĂNG KHIẾU" : `TỔ CHUYÊN MÔN KHỐI ${schoolInfo.grade}`),
                      font,
                      size: smallSize,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 4900, type: WidthType.DXA },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", bold: true, font, size: baseSize })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", bold: true, font, size: baseSize })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "-----------------------", font, size: smallSize })],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: `${schoolInfo.branchName || "Tiểu học"}, ngày ${schoolInfo.startDate}`, italics: true, font, size: smallSize })],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  // LBG Title
  docChildren.push(new Paragraph({ text: "", spacing: { before: 120 } }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: schoolInfo.teacherType === "specialist"
            ? `LỊCH BÁO GIẢNG DẠY CHUYÊN MÔN: ${schoolInfo.specialistSubject?.toUpperCase()} - TUẦN ${schoolInfo.week}`
            : `LỊCH BÁO GIẢNG TUẦN ${schoolInfo.week}`,
          bold: true,
          font,
          size: titleSize,
          color: "0F172A",
        }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `Từ ngày ${schoolInfo.startDate} đến ngày ${schoolInfo.endDate} (Năm học ${schoolInfo.academicYear})`,
          italics: true,
          font,
          size: baseSize,
        }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: schoolInfo.teacherType === "specialist"
            ? `TUẦN : ${schoolInfo.week}  |  MÔN CHUYÊN : ${schoolInfo.specialistSubject?.toUpperCase()}  |  GV BỘ MÔN : ${schoolInfo.teacherName}`
            : `TUẦN : ${schoolInfo.week}  |  KHỐI : ${schoolInfo.grade}  |  LỚP : ${schoolInfo.className}  |  GVCN : ${schoolInfo.teacherName}`,
          bold: true,
          font,
          size: baseSize,
        }),
      ],
    })
  );

  // LBG 7-column Table (1 Thứ, 1 Ngày cho tất cả các tiết trong ngày, Tên bài dạy tinh gọn, Ghi chú để trống)
  docChildren.push(buildOfficialLBGTable(schoolInfo, scheduleItems, font, baseSize, smallSize, tableWidth));

  // =================== TRANG 2 TRỞ ĐI: KHBD TỪ THỨ 2 ĐẾN THỨ 6 ===================
  docChildren.push(new Paragraph({ children: [new PageBreak()] }));

  // Top header for KHBD Section
  docChildren.push(
    new Table({
      width: { size: tableWidth, type: WidthType.DXA },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 4500, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: (schoolInfo.departmentName || "PHÒNG GD&ĐT").toUpperCase(), font, size: smallSize })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: schoolInfo.schoolName.toUpperCase(), bold: true, font, size: baseSize })] }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: schoolInfo.teacherType === "specialist" ? "TỔ CHUYÊN MÔN NĂNG KHIẾU" : `TỔ CHUYÊN MÔN KHỐI ${schoolInfo.grade}`,
                      font,
                      size: smallSize,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 4900, type: WidthType.DXA },
              children: [
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `LỚP: ${schoolInfo.className || "5A"}`, bold: true, font, size: baseSize })] }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `Năm học: ${schoolInfo.academicYear}`, font, size: smallSize })] }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `Thời gian: ${schoolInfo.startDate} - ${schoolInfo.endDate}`, italics: true, font, size: smallSize })] }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  docChildren.push(new Paragraph({ text: "", spacing: { before: 120 } }));
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `KẾ HOẠCH BÀI DẠY TUẦN ${schoolInfo.week} (TỪ THỨ 2 ĐẾN THỨ 6)`,
          bold: true,
          font,
          size: titleSize,
          color: "0F172A",
        }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Thực hiện theo Công văn số 2345/BGDĐT-GDTH của Bộ Giáo dục và Đào tạo",
          italics: true,
          font,
          size: smallSize,
        }),
      ],
    })
  );
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: schoolInfo.teacherType === "specialist"
            ? `Tuần ${schoolInfo.week} (${schoolInfo.startDate} - ${schoolInfo.endDate})  |  Môn: ${schoolInfo.specialistSubject}  |  GV: ${schoolInfo.teacherName}`
            : `Tuần ${schoolInfo.week} (${schoolInfo.startDate} - ${schoolInfo.endDate})  |  Lớp: ${schoolInfo.className}  |  GVCN: ${schoolInfo.teacherName}`,
          font,
          size: baseSize,
        }),
      ],
    })
  );

  // Group and sort lesson plans day by day (Thứ Hai -> Thứ Sáu) strictly in TKB order
  const dayOrder: Record<string, number> = {
    "Thứ Hai": 1,
    "Thứ Ba": 2,
    "Thứ Tư": 3,
    "Thứ Năm": 4,
    "Thứ Sáu": 5,
  };

  const sortedPlans = [...lessonPlans].sort((a, b) => {
    const orderA = dayOrder[a.dayOfWeek] || 99;
    const orderB = dayOrder[b.dayOfWeek] || 99;
    if (orderA !== orderB) return orderA - orderB;
    const sDiff = (a.session === "Sáng" ? 1 : 2) - (b.session === "Sáng" ? 1 : 2);
    if (sDiff !== 0) return sDiff;
    return Number(a.timetablePeriod || a.periodNumber || 0) - Number(b.timetablePeriod || b.periodNumber || 0);
  });

  const weekDays = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];

  weekDays.forEach((day, dayIndex) => {
    const plansForDay = sortedPlans.filter((p) => p.dayOfWeek === day);
    if (plansForDay.length === 0) return;

    if (dayIndex > 0) {
      docChildren.push(new Paragraph({ children: [new PageBreak()] }));
    }

    // Day banner
    const weekDates = getWeekDates(schoolInfo.startDate, schoolInfo.week);
    const resolvedDateStr = plansForDay[0]?.dateStr || weekDates[dayIndex] || "";

    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 140, after: 80 },
        children: [
          new TextRun({
            text: `${day.toUpperCase()}${resolvedDateStr ? ` (${resolvedDateStr})` : ""}`,
            bold: true,
            font,
            size: subTitleSize + 1,
          }),
        ],
      })
    );

    plansForDay.forEach((plan, planIdxInDay) => {
      if (planIdxInDay > 0) {
        docChildren.push(new Paragraph({ text: "", spacing: { before: 150 } }));
        docChildren.push(
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "-------------------------------------------------------------------------------------------------------------",
                font,
                size: smallSize,
                color: "94A3B8",
              }),
            ],
          })
        );
        docChildren.push(new Paragraph({ text: "", spacing: { before: 100 } }));
      }

      // Tên tựa bỏ chữ môn chỉ ghi trọn vẹn tên bài học
      docChildren.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 80 },
          children: [
            new TextRun({ text: cleanLessonTitle(plan.lessonTitle).toUpperCase(), bold: true, font, size: baseSize + 2 }),
          ],
        })
      );

      // I. Yêu cầu cần đạt
      docChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 20 },
          children: [new TextRun({ text: "I. YÊU CẦU CẦN ĐẠT", bold: true, font, size: baseSize })],
        })
      );
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "1. Năng lực đặc thù: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.objectives.specificCompetencies.join(" "), font, size: baseSize }),
          ],
        })
      );
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "2. Năng lực chung: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.objectives.generalCompetencies.join(" "), font, size: baseSize }),
          ],
        })
      );
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "3. Phẩm chất: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.objectives.qualities.join(" "), font, size: baseSize }),
          ],
        })
      );

      // 5. Yêu cầu cần đạt đối với học sinh khuyết tật (Chỉ nêu đối với những lớp có học sinh khuyết tật)
      if (schoolInfo.hasSpecialNeedsStudent) {
        const specialNeedsText = plan.objectives.specialNeedsObjective ||
          schoolInfo.specialNeedsDescription ||
          "Tham gia các hoạt động học tập cùng bạn theo khả năng; nhận biết được kiến thức cốt lõi của bài học và hoàn thành các nhiệm vụ cơ bản với sự hỗ trợ của giáo viên và bạn bè.";
        docChildren.push(
          new Paragraph({
            spacing: { after: 20 },
            children: [
              new TextRun({ text: "5. Yêu cầu cần đạt đối với học sinh khuyết tật: ", bold: true, color: "7C2D12", font, size: baseSize }),
              new TextRun({ text: specialNeedsText, italics: true, color: "7C2D12", font, size: baseSize }),
            ],
          })
        );
      }

      if (plan.objectives.integrations) {
        const ints = plan.objectives.integrations;
        const intLines: string[] = [];
        if (ints.ai) intLines.push(`• Tích hợp AI: ${ints.ai}`);
        if (ints.digitalCompetence) intLines.push(`• Tích hợp Năng lực số: ${ints.digitalCompetence}`);
        if (ints.humanRights) intLines.push(`• Tích hợp Quyền con người: ${ints.humanRights}`);
        if (ints.defense) intLines.push(`• Tích hợp QPAN: ${ints.defense}`);
        if (ints.nutrition) intLines.push(`• Tích hợp Dinh dưỡng: ${ints.nutrition}`);
        if (ints.stem) intLines.push(`• Tích hợp STEM: ${ints.stem}`);
        if (ints.environment) intLines.push(`• Tích hợp Môi trường: ${ints.environment}`);
        if (ints.lifeSkills) intLines.push(`• Tích hợp Kỹ năng sống: ${ints.lifeSkills}`);
        if (intLines.length > 0) {
          docChildren.push(
            new Paragraph({
              spacing: { after: 30 },
              children: [
                new TextRun({ text: "4. Tích hợp giáo dục: ", bold: true, color: "047857", font, size: baseSize }),
                new TextRun({ text: intLines.join("; "), italics: true, color: "065F46", font, size: baseSize }),
              ],
            })
          );
        }
      }

      // II. Đồ dùng dạy học
      docChildren.push(
        new Paragraph({
          spacing: { before: 40, after: 20 },
          children: [new TextRun({ text: "II. ĐỒ DÙNG DẠY HỌC", bold: true, font, size: baseSize })],
        })
      );
      docChildren.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: "- Giáo viên: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.materials.teacher.join("; "), font, size: baseSize }),
          ],
        })
      );
      docChildren.push(
        new Paragraph({
          spacing: { after: 30 },
          children: [
            new TextRun({ text: "- Học sinh: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.materials.student.join("; "), font, size: baseSize }),
          ],
        })
      );

      // Special Music Section: Lyrics
      if (plan.songLyrics) {
        docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `NỘI DUNG & LỜI CA BÀI HÁT: "${plan.songTitle || plan.lessonTitle}"${plan.composer ? ` (Nhạc và lời: ${plan.composer})` : ""}`,
                bold: true,
                color: "1E3A8A",
                font,
                size: baseSize,
              }),
            ],
          })
        );
        const lyricsLines = plan.songLyrics.split("\n");
        lyricsLines.forEach((line) => {
          docChildren.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: line,
                  italics: true,
                  color: "334155",
                  font,
                  size: baseSize - 1,
                }),
              ],
            })
          );
        });
      }

      // Special English Section: Vocabulary & Sentence Patterns
      if ((plan.englishVocabulary && plan.englishVocabulary.length > 0) || (plan.sentencePatterns && plan.sentencePatterns.length > 0)) {
        docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `NỘI DUNG TRỌNG TÂM TIẾNG ANH (TARGET VOCABULARY & SENTENCE PATTERNS):`,
                bold: true,
                color: "1E3A8A",
                font,
                size: baseSize,
              }),
            ],
          })
        );
        if (plan.englishVocabulary && plan.englishVocabulary.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: "• Từ vựng trọng tâm (Target Vocabulary): ", bold: true, font, size: baseSize }),
                new TextRun({ text: plan.englishVocabulary.join(" | "), font, size: baseSize }),
              ],
            })
          );
        }
        if (plan.sentencePatterns && plan.sentencePatterns.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({ text: "• Mẫu câu trọng tâm (Sentence Patterns): ", bold: true, font, size: baseSize }),
                new TextRun({ text: plan.sentencePatterns.join(" | "), font, size: baseSize }),
              ],
            })
          );
        }
      }

      // III. Các hoạt động dạy học chủ yếu (Bảng 2 cột CV 2345)
      docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
      docChildren.push(new Paragraph({ children: [new TextRun({ text: "III. CÁC HOẠT ĐỘNG DẠY HỌC CHỦ YẾU", bold: true, font, size: baseSize })] }));

      const activityRows: TableRow[] = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({ width: { size: colHalfWidth, type: WidthType.DXA }, shading: { fill: "1E3A8A" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA GIÁO VIÊN", bold: true, color: "FFFFFF", font, size: baseSize })] })] }),
            new TableCell({ width: { size: colHalfWidth, type: WidthType.DXA }, shading: { fill: "1E3A8A" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HOẠT ĐỘNG CỦA HỌC SINH", bold: true, color: "FFFFFF", font, size: baseSize })] })] }),
          ],
        }),
      ];

      plan.activities.forEach((act) => {
        const teacherParagraphs: Paragraph[] = [
          new Paragraph({
            spacing: { after: 30 },
            children: [new TextRun({ text: normalizeActivityName(act.name), bold: true, color: "1E40AF", font, size: baseSize })],
          }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({ text: `- Mục tiêu: `, bold: true, font, size: baseSize }),
              new TextRun({ text: act.objective, font, size: baseSize }),
            ],
          }),
          ...createActivityCellParagraphs(act.teacherActivity, font, baseSize, "- Cách tiến hành:")
        ];

        const studentParagraphs: Paragraph[] = [
          ...createActivityCellParagraphs(act.studentActivity, font, baseSize)
        ];

        activityRows.push(
          new TableRow({
            children: [
              new TableCell({
                width: { size: colHalfWidth, type: WidthType.DXA },
                children: teacherParagraphs,
              }),
              new TableCell({
                width: { size: colHalfWidth, type: WidthType.DXA },
                children: studentParagraphs,
              }),
            ],
          })
        );
      });

      docChildren.push(new Table({ width: { size: tableWidth, type: WidthType.DXA }, rows: activityRows }));

      // IV. Điều chỉnh sau bài dạy
      docChildren.push(new Paragraph({ text: "", spacing: { before: 60 } }));
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({ text: "IV. ĐIỀU CHỈNH SAU BÀI DẠY: ", bold: true, font, size: baseSize }),
            new TextRun({ text: plan.postLessonAdjustment || ".....................................................................................................................................", font, size: smallSize, color: "64748B" }),
          ],
        })
      );
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: STANDARD_A4_PAGE_PORTRAIT,
        },
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filePrefix = schoolInfo.teacherType === "specialist"
    ? `KHBD_Kem_LBG_TrangDau_Tuan_${schoolInfo.week}_GVChuyen_${schoolInfo.specialistSubject}_GV_${schoolInfo.teacherName}`
    : `KHBD_Kem_LBG_TrangDau_Tuan_${schoolInfo.week}_Lop_${schoolInfo.className}_GV_${schoolInfo.teacherName}`;
  return saveDocxFile(blob, `${filePrefix}.docx`);
}

/**
 * 5. One-click Batch Download: Downloads 3 separate files (.TKB.docx, .LBG.docx, .KHBD.docx)
 */
export async function exportAllThreeFiles(
  schoolInfo: SchoolInfo,
  masterTimetable: MasterTimetable,
  scheduleItems: ScheduleItem[],
  lessonPlans: LessonPlan[]
) {
  await exportTimetableDocx(schoolInfo, masterTimetable, schoolInfo.className, "portrait");
  // Brief delay to ensure browser handles consecutive downloads smoothly
  await new Promise((resolve) => setTimeout(resolve, 600));
  await exportScheduleDocx(schoolInfo, scheduleItems);
  await new Promise((resolve) => setTimeout(resolve, 600));
  await exportLessonPlansDocx(schoolInfo, lessonPlans, `Tuan_${schoolInfo.week}_Ca_Tuan`);
}

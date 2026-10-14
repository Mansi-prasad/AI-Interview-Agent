import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInterviewReport = ({
  finalScore,
  confidence,
  communication,
  correctness,
  questionWiseScore,
}) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Professional color palette
  const colors = {
    primary: [16, 125, 82], // Emerald green
    primaryDark: [12, 83, 59], // Deep green
    primaryLight: [232, 247, 239],
    background: [248, 250, 252],
    white: [255, 255, 255],
    text: [31, 41, 55],
    muted: [100, 116, 139],
    border: [226, 232, 240],
    success: [22, 163, 74],
  };

  const safeText = (value) =>
    value === null || value === undefined || value === ""
      ? "Not available"
      : String(value);

  const getScoreColor = (score) => {
    if (Number(score) >= 8) return colors.success;
    if (Number(score) >= 5) return [217, 119, 6];
    return [220, 38, 38];
  };

  const drawRoundedBox = (
    x,
    y,
    width,
    height,
    fillColor,
    borderColor = fillColor,
  ) => {
    doc.setFillColor(...fillColor);
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, width, height, 3, 3, "FD");
  };

  // page header
  const drawHeader = () => {
    doc.setFillColor(...colors.primaryDark);
    doc.rect(0, 0, pageWidth, 5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...colors.primary);

    doc.text("AI INTERVIEW AGENT", margin, 17);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.muted);

    doc.text("PERFORMANCE REPORT", pageWidth - margin, 17, {
      align: "right",
    });

    doc.setDrawColor(...colors.border);
    doc.line(margin, 21, pageWidth - margin, 21);
  };

  // page footer
  const drawFooter = (pageNumber, totalPages) => {
    doc.setDrawColor(...colors.border);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.muted);

    doc.text("AI Interview Performance Report", margin, pageHeight - 9);

    doc.text(
      `Page ${pageNumber} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 9,
      { align: "right" },
    );
  };

  // title
  drawHeader();

  let currentY = 32;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(...colors.text);

  doc.text("Interview Performance", margin, currentY);

  currentY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...colors.muted);

  doc.text(
    "Your assessment results, strengths, and improvement areas.",
    margin,
    currentY,
  );

  currentY += 10;

  // overall score card
  drawRoundedBox(
    margin,
    currentY,
    contentWidth,
    31,
    colors.primaryLight,
    [201, 232, 214],
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...colors.primaryDark);

  doc.text("OVERALL PERFORMANCE", margin + 8, currentY + 9);

  doc.setFontSize(23);
  doc.setTextColor(...getScoreColor(finalScore));

  doc.text(`${safeText(finalScore)}/10`, margin + 8, currentY + 22);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...colors.muted);

  doc.text("Final assessment score", margin + 36, currentY + 21);

  currentY += 39;

  // skill score cards
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);

  doc.text("Skill Breakdown", margin, currentY);

  currentY += 6;

  const skills = [
    { label: "Confidence", score: confidence },
    { label: "Communication", score: communication },
    { label: "Correctness", score: correctness },
  ];

  const cardGap = 4;
  const cardWidth = (contentWidth - cardGap * 2) / 3;
  const cardHeight = 25;

  skills.forEach((skill, index) => {
    const x = margin + index * (cardWidth + cardGap);

    drawRoundedBox(
      x,
      currentY,
      cardWidth,
      cardHeight,
      colors.white,
      colors.border,
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.muted);

    doc.text(skill.label, x + 4, currentY + 8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...getScoreColor(skill.score));

    doc.text(`${safeText(skill.score)}/10`, x + 4, currentY + 19);
  });

  currentY += cardHeight + 10;

  // professional advice
  let advice = "";

  if (Number(finalScore) >= 8) {
    advice =
      "Excellent performance. Maintain your confidence and structured approach. Continue refining clarity and support your answers with relevant real-world examples.";
  } else if (Number(finalScore) >= 5) {
    advice =
      "You have a good foundation. Improve answer structure, clarity, and confidence. Practise concise responses and support your points with relevant examples.";
  } else {
    advice =
      "Focus on building a stronger foundation. Practise structuring answers, explaining concepts clearly, and speaking confidently. Review weaker topics and practise regularly.";
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);

  doc.text("Personalized Feedback", margin, currentY);

  currentY += 5;

  const adviceLines = doc.splitTextToSize(advice, contentWidth - 16);

  const adviceHeight = Math.max(27, adviceLines.length * 5 + 15);

  drawRoundedBox(
    margin,
    currentY,
    contentWidth,
    adviceHeight,
    colors.background,
    colors.border,
  );

  doc.setFillColor(...colors.primary);
  doc.roundedRect(margin, currentY, 2, adviceHeight, 1, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...colors.primaryDark);

  doc.text("RECOMMENDATION", margin + 8, currentY + 9);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...colors.text);

  doc.text(adviceLines, margin + 8, currentY + 16);

  currentY += adviceHeight + 10;

  // question-wise performance table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);

  doc.text("Question-wise Analysis", margin, currentY);

  currentY += 6;

  const rows = Array.isArray(questionWiseScore)
    ? questionWiseScore.map((q, index) => [
        String(index + 1),
        safeText(q.question),
        `${safeText(q.score)}/10`,
        safeText(q.feedback),
      ])
    : [];

  autoTable(doc, {
    startY: currentY,
    margin: {
      left: margin,
      right: margin,
      top: 27,
      bottom: 21,
    },

    head: [["#", "Interview Question", "Score", "Feedback"]],
    body: rows,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 3,
      textColor: colors.text,
      lineColor: colors.border,
      lineWidth: 0.2,
      overflow: "linebreak",
      valign: "top",
    },

    headStyles: {
      fillColor: colors.primaryDark,
      textColor: colors.white,
      fontStyle: "bold",
      fontSize: 8,
      halign: "left",
      cellPadding: 3.5,
    },

    columnStyles: {
      0: {
        cellWidth: 9,
        halign: "center",
      },
      1: {
        cellWidth: 60,
      },
      2: {
        cellWidth: 19,
        halign: "center",
      },
      3: {
        cellWidth: "auto",
      },
    },

    alternateRowStyles: {
      fillColor: [246, 250, 248],
    },

    showHead: "everyPage",
    rowPageBreak: "avoid",

    didDrawPage: () => {
      drawHeader();
    },

    didParseCell: (data) => {
      // color score cells according to their actual score.
      if (data.section === "body" && data.column.index === 2) {
        const scoreValue = Number(String(data.cell.raw).split("/")[0]);

        data.cell.styles.textColor = getScoreColor(scoreValue);
        data.cell.styles.fontStyle = "bold";
      }
    },
  });

  // footer on every page
  const totalPages = doc.internal.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);
    drawFooter(page, totalPages);
  }

  doc.save("AI_Interview_Performance_Report.pdf");
};

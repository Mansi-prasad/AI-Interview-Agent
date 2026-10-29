import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { downloadInterviewReport } from "../utils/downloadInterviewReport";

const Step3Report = ({ report, isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" />

        <h2 className="text-xl font-semibold text-[var(--ink)]">
          Loading your interview report...
        </h2>

        <p className="text-sm text-[var(--ink-muted)]">
          Please wait while we prepare your results.
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <h2 className="text-xl font-semibold text-[var(--ink)]">
          No interview report available
        </h2>

        <p className="text-[var(--ink-muted)]">
          Please try again or complete an interview.
        </p>
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job oppertunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    downloadInterviewReport({
      finalScore,
      confidence,
      communication,
      correctness,
      questionWiseScore,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg)] to-[var(--accent-softer)] px-4 sm:px-6 lg:px-10 py-8 text-[var(--ink)] transition-colors duration-300">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="md:mb-10 w-full flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] shadow hover:shadow-md hover:bg-[var(--accent-soft)] transition"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <div className="">
            <h1 className="text-3xl font-bold flex-nowwrap text-[var(--ink)]">
              Interview Analytics Dashboard
            </h1>
            <p className="text-[var(--ink-muted)] mt-2">
              AI-Powered performance insights
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-3 md:px-4 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap"
        >
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* left */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center"
          >
            <h3 className="text-[var(--ink-muted)] mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 sm:w-25 sm:h-25">
                <CircularProgressbar
                  value={percentage}
                  text={`${finalScore}/10`}
                  styles={buildStyles({
                    textSize: "28px",
                    pathColor: "var(--success)",
                    textColor: "var(--danger)",
                    trailColor: "var(--border)",
                  })}
                />
              </div>
            </div>
            <p className="text-[var(--ink-light)] mt-3 text-xs sm:text-sm">
              Out of 10
            </p>

            <div className="mt-4">
              <p className="font-semibold text-[var(--ink)] text-sm sm:text-base">
                {performanceText}
              </p>

              <p className="text-[var(--ink-muted)] text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-6">
              Skill Evaluation
            </h3>

            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>{s.label}</span>
                    <span className="font-semibold text-[var(--success)]">
                      {s.value}
                    </span>
                  </div>

                  <div className="bg-[var(--border)] h-2 sm:h-3 rounded-full">
                    <div
                      className="bg-[var(--success)] h-full rounded-full"
                      style={{ width: `${s.value * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* right */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-4 sm:mb-6">
              Performance Trend
            </h3>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis datakey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    fill="#bbf7d0"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[var(--surface)] text-[var(--ink)] rounded-2xl sm:rounded-3xl border border-[var(--border)] shadow-lg p-5 sm:p-8 transition-colors duration-300"
          >
            <h3 className="text-base sm:text-lg font-semibold text-[var(--ink)] mb-6">
              Question Breakdown
            </h3>
            <div className="space-y-6">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-[var(--bg)] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[var(--border-strong)] transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <p className="text-xs text-[var(--ink-muted)] mb-1">Question {i + 1}</p>
                      <p className="font-semibold text-[var(--ink)] text-sm sm:text-base leading-relaxed break-words">
                        {q.question || "Question not available"}
                      </p>
                    </div>

                    <div className="bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--border)] px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit shrink-0">
                      {q.score ?? 0}/10
                    </div>
                  </div>

                  <div className="bg-[var(--surface-2)] border border-[var(--border)] p-4 rounded-lg transition-colors duration-300">
                    <p className="text-xs text-[var(--success)] font-semibold mb-1">
                      AI Feedback
                    </p>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed break-words">
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question. "}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;

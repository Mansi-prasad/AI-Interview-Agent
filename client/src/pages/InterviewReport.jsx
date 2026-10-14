import React, { useEffect, useState } from "react";
import Step3Report from "../components/Step3Report";
import axios from "axios";
import { ServerUrl } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const InterViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true },
        );
        setReport(result.data);
      } catch (error) {
        console.log("Failed to fetch interview report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg)] text-[var(--ink)] px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" />

        <p className="text-base sm:text-lg text-[var(--ink-muted)]">
          Loading your interview report...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg)] text-[var(--ink)] px-4">
        <h2 className="text-xl font-semibold">Interview report not found</h2>

        <p className="text-center text-[var(--ink-muted)]">
          We couldn't find your report. It may not exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        >
          <BsArrowLeft size={18} />
          <span>Go Home</span>
        </button>
      </div>
    );
  }

  return <Step3Report report={report} isLoading={loading} />;
};

export default InterViewReport;

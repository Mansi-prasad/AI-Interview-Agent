import React from "react";
import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {

      try {
         setLoading(true);
        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true },
        );
        setInterviews(result.data.interviews);
      } catch (error) {
        console.log("Failed to fetch interview history:", error);
        
        toast.error("Failed to fetch interview history", {
          duration: 2500,
          position: "top-right",
        });

      } finally{
        setLoading(false);
      }
    };
    getMyInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] px-4 sm:px-6 py-8 sm:py-10 transition-colors duration-300">
      <div className="w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto">
        {/* header */}
        <div className="mb-8 sm:mb-10 flex items-start gap-4">
          <button
            onClick={() => navigate("/")}
            className="mt-1 shrink-0 p-3 rounded-full bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] shadow-sm hover:shadow-md hover:bg-[var(--accent-soft)] transition-all duration-200"
          >
            <FaArrowLeft />
          </button>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
              Interview History
            </h1>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-2">
              Track your past interviews and performance reports.
            </p>
          </div>
        </div>

         {loading ? (
         <div className="bg-[var(--surface)] border border-[var(--border)] p-10 rounded-2xl text-center">
            <div className="w-8 h-8 mx-auto rounded-full border-4 border-[var(--border)] border-t-[var(--accent)] animate-spin" />

            <p className="text-[var(--ink-muted)] mt-4">
              Loading your interviews...
            </p>
          </div>
        ) : interviews?.length === 0 ? (
         <div className="bg-[var(--surface)] p-10 rounded-2xl shadow border border-[var(--border)] text-center">
            <p className="text-[var(--ink-muted)]">
              No interviews found. Start your first interview.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {interviews?.map((item, index) => (
              <div
                onClick={() => navigate(`/report/${item._id}`)}
                key={index}
                className="bg-[var(--surface)] text-[var(--ink)] p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[var(--border)]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                     <h3 className="text-lg font-semibold text-[var(--ink)]">
                      {item.role}
                    </h3>

                     <p className="text-[var(--ink-muted)] text-sm mt-1">
                      {item.experience} . {item.mode}
                    </p>

                     <p className="text-xs text-[var(--ink-light)] mt-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* score */}
                    <div className="text-right">
                      <p className="text-[var(--accent)] font-semibold">
                        {item.finalScore || 0}/10
                      </p>
                      <p className="text-xs text-[var(--ink-muted)]">
                        Overall Score
                      </p>
                    </div>

                    {/* status badge */}
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "bg-[var(--surface-2)] text-[var(--warning)]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewHistory;

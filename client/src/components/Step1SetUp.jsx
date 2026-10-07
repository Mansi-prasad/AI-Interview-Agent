import React from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Step1SetUp = ({ onStart }) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        { withCredentials: true },
      );

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (error) {
      console.log("Error to upload resume: ", error);
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true },
      );

      console.log(result.data);

      if (userData) {
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      }
      setLoading(false);
      onStart(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]"
    >
      <div className="w-full max-w-6xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden border bg-[var(--surface)] border-[var(--border)]">
        {/* left side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative p-12 flex flex-col justify-center  bg-[linear-gradient(135deg,var(--accent-softer),var(--accent-soft))]"
        >
          <h2 className="text-4xl font-bold mb-6 text-[var(--ink)]">
            Start Your AI Interview
          </h2>

          <p className="mb-10 leading-relaxed text-[var(--ink-muted)]">
            Practice real interview scenarios powered by AI. Improve
            communication, technical skills and confidence.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <FaUserTie />,
                text: "Choose Role & Experience",
              },
              {
                icon: <FaMicrophoneAlt />,
                text: "Smart Voice Interview",
              },
              {
                icon: <FaChartLine />,
                text: "Performance Analytics",
              },
            ].map((item, index) => (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl shadow-sm cursor-pointer border transition-all bg-[var(--surface)] border-[var(--border)]"
              >
                <span className="text-xl text-[var(--accent)]">
                  {item.icon}
                </span>
                <span className="font-medium text-[var(--ink)]">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* right side */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-[var(--surface)]"
        >
          <h2 className="text-3xl font-bold mb-8 text-[var(--ink)]">
            Interview SetUp
          </h2>

          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-[var(--ink-light)]" />
              <input
                type="text"
                placeholder="Enter role"
                onChange={(e) => setRole(e.target.value)}
                value={role}
                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition border bg-[var(--surface-2)] text-[var(--ink)] border-[var(--border-strong)]"
              />
            </div>

            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-[var(--ink-light)]" />
              <input
                type="text"
                placeholder="Experience (e.g 2 years)"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full pl-12 pr-4 py-3 rounded-xl outline-none transition border bg-[var(--surface-2)] text-[var(--ink)] border-[var(--border-strong)]"
              />
            </div>

            <div className="relative">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full py-3 px-4 rounded-xl outline-none transition border appearance-none bg-[var(--surface-2)] text-[var(--ink)] border-[var(--border-strong)]"
              >
                <option value="Technical">Technical Interview</option>
                <option value="HR"> HR Interview</option>
              </select>
            </div>

            {/* Resume Upload */}
            {!analysisDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload").click()}
                className="rounded-xl p-8 text-center cursor-pointer transition border-2 border-dashed bg-[var(--surface-2)] border-[var(--border-strong)]"
              >
                <FaFileUpload className="text-4xl mx-auto mb-3 text-[var(--accent)]" />

                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />

                <p className="font-medium text-[var(--ink-muted)]">
                  {resumeFile
                    ? resumeFile.name
                    : "Click to upload resume(optional)"}
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    className="mt-4 px-5 py-2 rounded-lg text-white transition bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-5 space-y-4 border bg-[var(--surface-2)] border-[var(--border-strong)]"
              >
                <h3 className="text-lg font-semibold text-[var(--ink)]">
                  Resume Analysis Result
                </h3>

                {/* projects */}
                {projects?.length > 0 && (
                  <div>
                    <p className="font-medium mb-1 text-[var(--ink)]">
                      Projects:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[var(--ink-muted)]">
                      {projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* skills */}
                {skills?.length > 0 && (
                  <div>
                    <p className="font-medium mb-2 text-[var(--ink)]">
                      Skills:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-sm bg-[var(--accent-soft)] text-[var(--accent)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white"
            >
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step1SetUp;

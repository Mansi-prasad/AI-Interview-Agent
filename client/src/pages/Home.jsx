import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AuthModel from "../components/AuthModel";
import evalImg from "../assets/ai-ans.png";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from "../components/Footer";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 pt-20 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <HiSparkles size={16} className="bg-green-50 text-green-600" />
              AI powered Smart Interview Platform
            </div>
          </div>

          {/* Hero section */}
          <div className="text-center mb-28 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight max-w-4xl mx-auto text-[var(--ink)]"
            >
              Practice Interviews with
              <span className="relative block mt-3">
                <span className="inline-block bg-[var(--accent-soft)] text-[var(--accent)] px-6 py-2 rounded-full">
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-[var(--ink-muted)] mt-7 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
            >
              Practice role-based mock interviews with smart follow-ups,
              adaptive difficulty, and real-time performance evaluation.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/interview");
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-9 py-3.5 rounded-full font-medium transition-all duration-200 shadow-md"
              >
                Start Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true);
                    return;
                  }
                  navigate("/history");
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className="border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)] px-9 py-3.5 rounded-full font-medium hover:bg-[var(--surface-2)] transition-all duration-200"
              >
                View History
              </motion.button>
            </div>
          </div>

          {/* Steps section */}
          <div className="mb-24 md:mb-28 px-4 sm:px-6">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-sm font-medium text-[var(--accent)] mb-3">
                HOW IT WORKS
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--ink)]">
                Your Interview{" "}
                <span className="text-[var(--accent)]">Journey</span>
              </h2>

              <p className="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                Prepare for your next interview in three simple steps. Choose
                your role, practice with AI, and understand your performance.
              </p>
            </motion.div>

            {/* Steps Cards */}
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  icon: <BsRobot size={24} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjust difficulty based on selected job role.",
                },
                {
                  icon: <BsMic size={24} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers.",
                },
                {
                  icon: <BsClock size={24} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + index * 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.06 }}
                  className={`relative bg-[var(--surface)] rounded-3xl border-2 border-[var(--border)] hover:border-[var(--accent)] p-7 sm:p-8 md:p-10 w-full sm:w-80 max-w-[90%] shadow-sm hover:shadow-xl transition-all duration-300 ${index === 0 ? "rotate-[-4deg]" : ""} 
                ${index === 0 ? "rotate-[-3deg] md:-mt-6 shadow-xl" : ""} 
                ${index === 0 ? "rotate-[-3deg]" : ""} 
                
                `}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <div className="pt-8 sm:pt-10 text-center ">
                    <div className="text-xs text-[var(--accent)] font-semibold mb-2 tracking-wider">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-[var(--ink)] text-base sm:text-lg mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards section */}
          <div className="mb-24 md:mb-32 px-4 sm:px-6">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-sm font-medium text-[var(--accent)] mb-3">
                POWERFUL AI FEATURES
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--ink)]">
                Advanced AI{" "}
                <span className="text-[var(--accent)]">Capabilities</span>
              </h2>

              <p className="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                Get intelligent feedback, personalized interview questions, and
                detailed insights designed to help you improve your interview
                performance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={20} />,
                  title: "AI Answer Evaluation",
                  desc: "Score communication, technical accuracy and confidence.",
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Resume Based Interview",
                  desc: "Project-specific questions based on uploaded resume.",
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={20} />,
                  title: "Download PDF Report",
                  desc: "Detailed strengths, weakness and improvement insights.",
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={20} />,
                  title: "History & Analytics",
                  desc: "Track progress with performance graphs and topic analysis. ",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[var(--border-strong)] transition-all duration-300"
                >
                  {/* Image */}
                  <div className="h-36 sm:h-40 bg-[var(--surface-2)] flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="bg-[var(--accent-soft)] text-[var(--accent)] w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                      {item.icon}
                    </div>

                    <h3 className="font-semibold text-base lg:text-lg text-[var(--ink)] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-[var(--ink-muted)] text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Modes Section */}
          <div className="mb-24 md:mb-32 px-4 sm:px-6">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 md:mb-14"
            >
              <p className="text-sm font-medium text-[var(--accent)] mb-3">
                INTERVIEW EXPERIENCE
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--ink)]">
                Multiple Interview{" "}
                <span className="text-[var(--accent)]">Modes</span>
              </h2>

              <p className="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mx-auto mt-4">
                Practice different types of interviews and prepare for
                real-world interview situations.
              </p>
            </motion.div>

            {/* Interview Modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-6xl mx-auto">
              {[
                {
                  img: hrImg,
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication based evaluation.",
                },
                {
                  img: techImg,
                  title: "Technical Mode",
                  desc: "Deep technical questioning based on selected role.",
                },
                {
                  img: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Basic tone and voice analysis insights.",
                },
                {
                  img: creditImg,
                  title: "Credits System",
                  desc: "Unlock premium interview sessions easily.",
                },
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row min-h-[240px]">
                    {/* Content */}
                    <div className="flex-1 p-6 sm:p-7 md:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-sm font-semibold text-[var(--accent)]">
                          {mode.number}
                        </span>

                        <h3 className="text-xl md:text-2xl font-semibold text-[var(--ink)] mt-4 mb-3">
                          {mode.title}
                        </h3>

                        <p className="text-sm text-[var(--ink-muted)] leading-relaxed max-w-sm">
                          {mode.desc}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                        Explore mode
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full sm:w-40 md:w-44 min-h-[150px] sm:min-h-0 bg-[var(--surface-2)] flex items-center justify-center p-6">
                      <img
                        src={mode.img}
                        alt={mode.title}
                        className="w-28 h-28 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  );
};

export default Home;

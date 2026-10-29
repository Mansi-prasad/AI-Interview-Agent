import React from 'react'
import { motion } from "motion/react";
import { HiSparkles } from "react-icons/hi";

const HeroSection = ({ userData, setShowAuth, navigate }) => {

  const handleStartInterview = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/interview");
  };

  const handleViewHistory = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/history");
  };

  return (
    <section id="hero" className="px-4 mb-24 md:mb-28">
      <div className="flex justify-center mb-6">
        <div className="bg-[var(--surface-2)] text-[var(--ink-muted)] text-sm px-4 py-2 rounded-full flex items-center gap-2">
          <HiSparkles
            size={16}
            className="bg-green-50 text-green-600 rounded-full"
          />
          AI powered Smart Interview Platform
        </div>
      </div>

      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight max-w-4xl mx-auto text-[var(--ink)]"
        >
          Practice Interviews with
          <span className="relative block mt-3">
            <span className="inline-block bg-[var(--accent-soft)] text-[var(--accent)] px-4 sm:px-6 py-2 rounded-full">
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
            type="button"
            onClick={handleStartInterview}
            whileHover={{ opacity: 0.9, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-9 py-3.5 rounded-full font-medium transition-all duration-200 shadow-md"
          >
            Start Interview
          </motion.button>

          <motion.button
            type="button"
            onClick={handleViewHistory}
            whileHover={{ opacity: 0.9, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)] px-9 py-3.5 rounded-full font-medium hover:bg-[var(--surface-2)] transition-all duration-200"
          >
            View History
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
import React from 'react'
import { motion } from "motion/react";

import hrImg from "../../assets/HR.png";
import techImg from "../../assets/tech.png";
import confidenceImg from "../../assets/confi.png";
import creditImg from "../../assets/credit.png";

const interviewModes = [
  {
    number: "01",
    img: hrImg,
    title: "HR Interview Mode",
    desc: "Behavioral and communication based evaluation.",
  },
  {
    number: "02",
    img: techImg,
    title: "Technical Mode",
    desc: "Deep technical questioning based on selected role.",
  },
];

const InterviewModeSection = () => {
  return (
    <section
      id="interview-modes"
      className="scroll-mt-28 mb-24 md:mb-32 px-4 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 max-w-6xl mx-auto">
        {interviewModes.map((mode, index) => (
          <motion.article
            key={mode.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row min-h-[240px]">
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

              <div className="w-full sm:w-40 md:w-44 min-h-[150px] sm:min-h-0 bg-[var(--surface-2)] flex items-center justify-center p-6">
                <img
                  src={mode.img}
                  alt={mode.title}
                  loading="lazy"
                  className="w-28 h-28 md:w-32 md:h-32 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-500" />
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default InterviewModeSection
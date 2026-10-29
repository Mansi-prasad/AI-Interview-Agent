import React from "react";
import { motion } from "motion/react";
import { BsRobot, BsMic, BsClock } from "react-icons/bs";

const steps = [
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
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-28 mb-24 md:mb-28 px-4 sm:px-6"
    >
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
          Your Interview <span className="text-[var(--accent)]">Journey</span>
        </h2>

        <p className="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          Prepare for your next interview in three simple steps. Choose your
          role, practice with AI, and understand your performance.
        </p>
      </motion.div>

      {/* Steps Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 lg:gap-10">
        {steps.map((item, index) => (
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
    </section>
  );
};

export default HowItWorksSection;

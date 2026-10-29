import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { BsBarChart, BsFileEarmarkText } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import evalImg from "../../assets/ai-ans.png";
import resumeImg from "../../assets/resume.png";
import pdfImg from "../../assets/pdf.png";
import analyticsImg from "../../assets/history.png";
import confidenceImg from "../../assets/confi.png";
import creditImg from "../../assets/credit.png";

const features = [
  {
    image: evalImg,
    icon: BsBarChart,
    title: "AI Answer Evaluation",
    desc: "Score communication, technical accuracy and confidence.",
  },
  {
    image: resumeImg,
    icon: BsFileEarmarkText,
    title: "Resume Based Interview",
    desc: "Project-specific questions based on your uploaded resume.",
  },
  {
    image: pdfImg,
    icon: BsFileEarmarkText,
    title: "Download PDF Report",
    desc: "Detailed strengths, weaknesses and improvement insights.",
  },
  {
    image: analyticsImg,
    icon: BsBarChart,
    title: "History & Analytics",
    desc: "Track progress with performance graphs and topic analysis.",
  },
  {
    image: confidenceImg,
    icon: BsBarChart,
    title: "Confidence Detection",
    desc: "Basic tone and voice analysis insights.",
  },
  {
    image: creditImg,
    icon: BsFileEarmarkText,
    title: "Credits System",
    desc: "Unlock premium interview sessions easily.",
  },
];

const FeaturesSection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(container.scrollLeft > 5);
    setCanScrollRight(container.scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollCards = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("article");
    const gap = 20;
    const scrollAmount = card
      ? card.getBoundingClientRect().width + gap
      : container.clientWidth * 0.8;

    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="features" className="scroll-mt-28 mb-24 md:mb-32 px-4 sm:px-6">
      {/* section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-10"
      >
        <p className="text-sm font-medium text-[var(--accent)] mb-3">
          POWERFUL AI FEATURES
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          Advanced AI <span className="text-[var(--accent)]">Capabilities</span>
        </h2>

        <p className="text-[var(--ink-muted)] text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          Get intelligent feedback, personalized interview questions, and
          detailed insights designed to help you improve your interview
          performance.
        </p>
      </motion.div>

      {/* horizontal carousel */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4">
        {/* left arrow */}
        <button
          type="button"
          onClick={() => scrollCards(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll features left"
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] shadow-sm hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* scrollable cards */}
        <div
          ref={scrollRef}
          className="flex-1 min-w-0 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -5 }}
                className="group flex-none w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)] snap-start self-stretch bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[var(--border-strong)] transition-[box-shadow,border-color] duration-300"
              >
                <div
                  className="h-36 sm:h-40 bg-[var(--surface-2)] flex items-center justify-center p-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    draggable="false"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <div
                    className="bg-[var(--accent-soft)] text-[var(--accent)] w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  >
                    <Icon size={20} />
                  </div>

                  <h3
                    className="font-semibold text-base lg:text-lg text-[var(--ink)] mb-2"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-[var(--ink-muted)] text-sm leading-relaxed"
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* right arrow */}
        <button
          type="button"
          onClick={() => scrollCards(1)}
          disabled={!canScrollRight}
          aria-label="Scroll features right"
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full  bg-[var(--surface)] border border-[var(--border)] text-[var(--ink)] shadow-sm hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] hover:border-[var(--accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default FeaturesSection;

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
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import FeaturesSection from "../components/home/FeaturesSection";
import InterviewModeSection from "../components/home/InterviewModesSection";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />
      <main className="flex-1 w-full px-4 sm:px-6 pt-12 md:pt-16 pb-6">
        <div className="max-w-6xl mx-auto">
          <HeroSection
            userData={userData}
            setShowAuth={setShowAuth}
            navigate={navigate}
          />
          <HowItWorksSection />
          <FeaturesSection />
          <InterviewModeSection />
        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  );
};

export default Home;

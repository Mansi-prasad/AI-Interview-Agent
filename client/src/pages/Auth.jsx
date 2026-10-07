import React from "react";
import { useState } from "react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Auth = ({ isModel = false }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const response = await signInWithPopup(auth, provider);

      let User = response.user;
      let name = User.displayName;
      let email = User.email;

      const result = await axios.post(
        `${ServerUrl}/api/auth/google`,
        { name, email },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
      console.log("User data after Google login:", result.data);
    } catch (error) {
      console.error("Firebase Google Login Error:", error);
      dispatch(setUserData(null));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`w-full ${isModel ? "px-4" : "min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-20"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-[var(--surface)] shadow-2xl border border-[var(--border-strong)] `}
      >
        {/* logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-[var(--accent)] text-white p-2 rounded-lg">
            <MdOutlineSupportAgent size={18} />
          </div>
          <h2 className="font-semibold text-lg text-[var(--ink)]">
            InterView.AI
          </h2>
        </div>

        {/* heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-[var(--ink)]">
          Continue with{" "}
          <span className="bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16} /> AI Smart Interview{" "}
          </span>
        </h1>

        {/* description */}
        <p className="text-[var(--ink-muted)] text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI-powered mock interviews, track your progress, and
          unlock detailed performance insights.
        </p>

        {/* Google button */}
        <motion.button
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FcGoogle size={20} />{" "}
          {loading ? "Signing in..." : "Continue with Google"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;

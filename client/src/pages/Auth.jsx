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
import toast from "react-hot-toast";

const Auth = ({ isModel = false }) => {
  const [loading, setLoading] = useState(false);
   const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  // google authentication
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
    } catch (error) {
      console.error("Firebase Google Login Error:", error);
      dispatch(setUserData(null));
    } finally {
      setLoading(false);
    }
  };

   // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // registration and login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (isRegister && !name) {
      setError("Please enter your name.");
      return;
    }

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isRegister && password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isRegister
        ? `${ServerUrl}/api/auth/register`
        : `${ServerUrl}/api/auth/login`;

      const payload = isRegister
        ? { name, email, password }
        : { email, password };

      const result = await axios.post(endpoint, payload, {
        withCredentials: true,
      });

      // user
      const userData = result.data.user;

      if (userData) {
        dispatch(setUserData(userData));
        toast.success(
          result.data.message ||
            (isRegister
              ? "Registration successful!"
              : "Login successful!"),
        );
      } else {
        toast.error("Authentication succeeded, but user data was not returned.");
      }
    } catch (error) {
      console.error("Authentication Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
  };

   return (
    <div
      className={`w-full ${
        isModel
          ? "px-4"
          : "min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-20"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full ${
          isModel
            ? "max-w-md p-8 rounded-3xl"
            : "max-w-lg p-12 rounded-[32px]"
        } bg-[var(--surface)] shadow-2xl border border-[var(--border-strong)]`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="bg-[var(--accent)] text-white p-2 rounded-lg">
            <MdOutlineSupportAgent size={18} />
          </div>

          <h2 className="font-semibold text-lg text-[var(--ink)]">
            InterView.AI
          </h2>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-3 text-[var(--ink)]">
          <p>{isRegister ? "Create your account" : "Welcome back"}</p>
          <p className="mt-2 mx-auto bg-[var(--accent-soft)] text-[var(--accent)] px-3 py-1 rounded-full inline-flex items-center gap-2 text-base">
            <IoSparkles size={16} />
            AI Smart Interview
          </p>
        </h1>

        {/* Description */}
        <p className="text-[var(--ink-muted)] text-center text-sm md:text-base leading-relaxed mb-3">
          {isRegister
            ? "Create an account to get started."
            : "Sign in to your account."}
        </p>

        {/* Manual Login / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--ink)] mb-2"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required={isRegister}
                maxLength={100}
                disabled={loading}
                className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] px-4 py-3 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] px-4 py-3 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--ink)] mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              autoComplete={
                isRegister ? "new-password" : "current-password"
              }
              placeholder={
                isRegister ? "At least 8 characters" : "Enter your password"
              }
              value={formData.password}
              onChange={handleChange}
              required
              minLength={isRegister ? 8 : undefined}
              disabled={loading}
              className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--ink)] placeholder:text-[var(--ink-muted)] px-4 py-3 outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] disabled:opacity-60"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="text-sm text-red-500 bg-red-500/10 rounded-xl px-4 py-3"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              role="status"
              className="text-sm text-green-600 bg-green-500/10 rounded-xl px-4 py-3"
            >
              {success}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ opacity: 0.9, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full shadow-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : isRegister
                ? "Create account"
                : "Login"}
          </motion.button>
        </form>

        {/* Switch Login / Register */}
        <p className="text-sm text-center text-[var(--ink-muted)] mt-5">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={switchMode}
            disabled={loading}
            className="font-semibold text-[var(--accent)] hover:underline disabled:opacity-60"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border-strong)]" />
          <span className="text-xs text-[var(--ink-muted)]">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-[var(--border-strong)]" />
        </div>

        {/* Existing Google Login */}
        <motion.button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          whileHover={{ opacity: 0.9, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--bg)] rounded-full shadow-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FcGoogle size={20} />
          {loading ? "Please wait..." : "Continue with Google"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;


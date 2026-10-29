import React, { useState , useEffect} from "react";
import { motion } from "framer-motion";
import { FaCircleUser} from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineSupportAgent, MdLightMode, MdDarkMode  } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";

import axios from "axios";
import AuthModel from "./AuthModel";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = React.useState(false);
  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.log("logout error: ", error);
    }
  };

  // apply theme to the entire application and persist it.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

    const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };
  return (
<>
    <header className="sticky top-0 z-[100] w-full bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="w-full px-0">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full min-h-[64px] bg-[var(--surface2)] shadow-sm border border-[var(--border)] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3"
        >
            {/* left logo */}
            <Link
              to="/"
              onClick={() => {
                setShowCreditPopup(false);
                setShowUserPopup(false);
              }}
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <div className="bg-[var(--accent)] text-white p-2 rounded-lg">
                <MdOutlineSupportAgent size={22} />
              </div>

              <h1 className="font-semibold text-base sm:text-lg text-[var(--ink)]">
                InterView.AI
              </h1>
            </Link>

            {/* desktop navigation */}
            <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-7">
              <a
                href="/#how-it-works"
                className="text-sm lg:text-base text-[var(--ink-muted)] hover:text-[var(--accent)] font-medium transition-colors whitespace-nowrap"
              >
                How it works
              </a>

              <a
                href="/#features"
                className="text-sm lg:text-base text-[var(--ink-muted)] hover:text-[var(--accent)] font-medium transition-colors whitespace-nowrap"
              >
                Features
              </a>

              <a
                href="/#interview-modes"
                className="text-sm lg:text-base text-[var(--ink-muted)] hover:text-[var(--accent)] font-medium transition-colors whitespace-nowrap"
              >
                Interview Modes
              </a>
            </div>

            {/* right side: credits and user a/c */}
            <div className="flex items-center gap-3 sm:gap-4 relative shrink-0">

                {/* dark-light toggle button */}
               <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === "light"
                    ? "Switch to dark theme"
                    : "Switch to light theme"
                }
                title={
                  theme === "light"
                    ? "Switch to dark mode"
                    : "Switch to light mode"
                }
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all duration-200 focus:outline-none]"
              >
                {theme === "light" ? (
                  <MdDarkMode size={17} />
                ) : (
                  <MdLightMode size={19} />
                )}
              </button>

              {/* credits */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }

                    setShowCreditPopup(!showCreditPopup);
                    setShowUserPopup(false);
                  }}
                  aria-label={`Credits: ${userData?.credits || 0}`}
                  className="flex items-center gap-1.5 sm:gap-2 bg-[var(--accent-soft)] text-[var(--accent)] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <HiOutlineCurrencyRupee size={19} />
                  <span>{userData?.credits || 0}</span>
                </button>

                {showCreditPopup && (
                  <div className="absolute right-0 mt-3 w-64 max-w-[calc(100vw-24px)] bg-[var(--surface)] text-[var(--ink)] shadow-xl border border-[var(--border)] rounded-xl p-5 z-[110]">
                    <p className="text-sm text-[var(--ink-muted)] mb-4">
                      Need more credits? To continue using our services, please
                      purchase more credits.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCreditPopup(false);
                        navigate("/pricing");
                      }}
                      className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white py-2 rounded-lg text-sm transition-colors"
                    >
                      Buy more credits
                    </button>
                  </div>
                )}
              </div>

              {/* user a/c */}
              <div className="relative">
                <button
                  type="button"
                  aria-label="User account"
                  aria-expanded={showUserPopup}
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true);
                      return;
                    }

                    setShowUserPopup(!showUserPopup);
                    setShowCreditPopup(false);
                  }}
                  className="w-9 h-9 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full flex items-center justify-center font-semibold transition-colors"
                >
                  {userData ? (
                    userData?.name?.slice(0, 1).toUpperCase()
                  ) : (
                    <FaCircleUser size={22} />
                  )}
                </button>

                {showUserPopup && (
                  <div className="absolute right-0 mt-3 w-48 bg-[var(--surface)] text-[var(--ink)] shadow-xl border border-[var(--border)] rounded-xl p-4 z-[110]">
                    <p className="text-sm text-[var(--accent)] mb-1 font-medium truncate">
                      {userData?.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserPopup(false);
                        navigate("/history");
                      }}
                      className="w-full text-left text-sm py-2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    >
                      Interview History
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left text-sm py-2 flex items-center gap-2 text-[var(--danger)]"
                    >
                      <HiOutlineLogout size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.nav>
        </div>
      </header>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </>
  );
}
export default Navbar;

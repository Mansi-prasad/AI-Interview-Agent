import React from "react";
import { BsRobot, BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[var(--surface-2)] text-[var(--ink)] border-t  border-[var(--border)] mt-6">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--accent)] text-white">
                <BsRobot size={20} />
              </div>

              <h2 className="text-xl font-bold">
                Hey
                <span className="text-[var(--accent)]">Agent</span>
              </h2>
            </div>

            <p className=" text-sm leading-6 text-[var(--ink-muted)] max-w-md ">
              Prepare for your next interview with AI-powered practice,
              personalized feedback, resume analysis, and realistic interview
              simulations.
            </p>

            <p className=" text-xs  mt-4 text-[var(--ink-light)]">
              Practice smarter. Interview with confidence.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--surface)]  border border-[var(--border)] text-[var(--ink-muted)] hover:bg-[var(--accent)] hover:text-white  transition "
              >
                <BsGithub size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center  rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--ink-muted)] hover:bg-[var(--accent)]  hover:text-white  transition "
              >
                <BsLinkedin size={16} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className=" w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--ink-muted)]  hover:bg-[var(--accent)]  hover:text-white transition"
              >
                <BsTwitterX size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>

            <ul className="space-y-3 text-sm text-[var(--ink-muted)]">
              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  AI Interview
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Resume Analyzer
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Interview Practice
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Feedback & Scores
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>

            <ul className="space-y-3 text-sm text-[var(--ink-muted)]">
              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Interview Tips
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Technical Questions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Career Guide
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[var(--accent)] transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--border)] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--ink-light)]">
            © {new Date().getFullYear()} InterView.AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-[var(--ink-muted)]">
            <a href="#" className="hover:text-[var(--accent)] transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

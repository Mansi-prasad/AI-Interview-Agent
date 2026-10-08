import React, { useRef, useState } from "react";
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicON, setIsMicON] = useState(true);

  const recognition = useRef(null);
  const [isAiPlaying, setIsAiPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {

    // function to load available browser TTS voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      if (!voices.length) return;

      // try to find a known female voices
      const femaleVoices = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("zira") ||
          voice.name.toLowerCase().includes("sama") ||
          voice.name.toLowerCase().includes("female"),
      );

       // if female voice is found, select it
      if (femaleVoices) {
        setSelectedVoice(femaleVoices);
        setVoiceGender("female");
        return;
      }

      // try to find a known male voices
      const maleVoices = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("david") ||
          voice.name.toLowerCase().includes("mark") ||
          voice.name.toLowerCase().includes("male"),
      );

       // if male voice is found, select it
      if (maleVoices) {
        setSelectedVoice(maleVoices);
        setVoiceGender("male");
        return;
      }

      // if no matching voice is found, use the first available voice
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    // try load voice immedietly
    loadVoices();

    // some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  
  // select video according to selected voice gender
  const videoSource = voiceGender === "male" ? maleVoices : femaleVideo;

  // speake function- text to speech
  const speakText = (text) => {
    return new Promise((resolve) => {

      // if speech synthesis or voice is not available
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      // stop any speech that is currently playing
      window.speechSynthesis.cancel();

        // add small pauses after commas and periods
      const humanText = text.replace(/,/g, ", ...").replace(/\./g, ". ...");

       // create a speech object
      const utterance = new SpeechSynthesisUtterance(humanText);

      // use the selected voice
      utterance.voice = selectedVoice;

      // human like pacing
      utterance.voice = 0.92; // slightly slower than normal
      utterance.pitch = 1.05; // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAiPlaying(true);
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAiPlaying(false);

        // remove subtitle after a small delay
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      // show the original text as subtitle
      setSubtitle(text);

       // start text-to-speech
      window.speechSynthesis.speak(utterance);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-350 min-h-[80vh] bg-[var(--surface)] rounded-3xl shadow-2xl border border-[var(--border-strong)] flex flex-col lg:flex-row overflow-hidden transition-colors duration-300">
        {/* video section */}
        <div className="w-full lg:w-[35%] bg-[var(--surface)] flex flex-col items-center p-6 space-y-6 border-r border-[var(--border)]">
          <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* subtitle  */}
          {subtitle && (
            <div className="w-full max-w-md bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm sm:text-base text-center font-medium text-[var(--ink)]">{subtitle}</p>
            </div>
          )}

          {/* timer area */}
          <div className="w-full max-w-md bg-[var(--surface-2)] border border-[var(--border)] rounded-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--ink-muted)]">
                Interview Status
              </span>

              {isAiPlaying && (
                <span className="text-sm font-semibold text-[var(--success)]">
                  {isAiPlaying ? "AI is speaking..." : "AI is idle"}
                </span>
              )}
            </div>

            <div className="h-px bg-[var(--border)]"></div>

            <div className="flex justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit || 60}
              />
            </div>

            <div className="h-px bg-[var(--border)]"></div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <span className="block text-2xl font-bold text-[var(--accent)]">
                  {currentIndex + 1}
                </span>
                <span className="block text-xs text-[var(--ink-light)]">
                  Current Questions
                </span>
              </div>

              <div>
                <span className="block text-2xl font-bold text-[var(--accent)]">
                  {questions.length}
                </span>
                <span className="block text-xs text-[var(--ink-light)]">
                  Total Questions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* text section */}
        <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative bg-[var(--surface)]">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--accent)] mb-6">
            AI Smart Interview
          </h2>

          <div className="relative mb-6 bg-[var(--surface-2)] p-4 sm:p-6 rounded-2xl border border-[var(--border)] shadow-sm">
            <p className="text-xs sm:text-sm text-[var(--ink-light)] mb-2">
              Question {currentIndex + 1} of {questions.length}
            </p>

            <div className="text-base sm:text-lg font-semibold leading-relaxed text-[var(--ink)]">
              {currentQuestion?.question || "Loading question..."}
            </div>
          </div>

          <textarea
            placeholder="Type your answer here..."
            className="flex-1 bg-[var(--surface-2)] p-4 sm:p-6 rounded-2xl resize-none outline-none border border-[var(--border)] focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition text-[var(--ink)] placeholder:text-[var(--ink-light)]"
          />

          <div className="flex items-center gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg hover:bg-[var(--accent-hover)] transition"
            >
              <FaMicrophone size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-[var(--accent)] text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:bg-[var(--accent-hover)] transition font-semibold"
            >
              Submit Answer
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;

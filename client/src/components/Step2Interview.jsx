import React, { useEffect, useRef, useState } from "react";
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../App";
import { BsArrowLeft } from "react-icons/bs";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicON, setIsMicON] = useState(true);

  const recognitionRef = useRef(null);
  const [isAiPlaying, setIsAiPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions?.[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions?.[currentIndex];

  // Load available browser voices and select a suitable voice.
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    // load available browser TTS voices
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
  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

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
      utterance.rate = 0.92; // slightly slower than normal
      utterance.pitch = 1.05; // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAiPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAiPlaying(false);

        if (isMicON) {
          startMic();
        }

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

  // Run the introduction first, then read each interview question.
  useEffect(() => {
    if (!selectedVoice) {
      return;
    }

    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi, ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`,
        );

        await speakText(
          `I'll ask you a few questions. Just answer naturally, and take your time. Let's begin`,
        );

        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        // if last question (hard level)
        if (currentIndex === questions?.length - 1) {
          await speakText(
            "Alright, this one might to be a bit more challenging.",
          );
        }
        await speakText(currentQuestion.question);
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  // Countdown timer for the current question.
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex, currentQuestion]);

  // Reset the timer whenever the question changes.
  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex, isIntroPhase, currentQuestion]);

  // Initialize browser speech recognition for voice answers.
  //  text to vioce
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  // Start listening only when AI speech is not playing.
  const startMic = () => {
    if (recognitionRef.current && !isAiPlaying && isMicON) {
      try {
        recognitionRef.current.start();
      } catch (error) {}
    }
  };

  // Stop listening while the AI speaks or an answer is submitted.
  const stopMic = () => {
    try {
      recognitionRef.current?.stop();
    } catch (error) {}
  };

  // Toggle voice input on or off.
  const toggleMic = () => {
    if (isMicON) {
      stopMic();
    } else if (!isAiPlaying) {
      startMic();
    }
    setIsMicON((prev) => !prev);
  };

  // Send the answer to the backend
  const submitAnswer = async () => {
    if (isSubmitting || !currentQuestion) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true },
      );

      setFeedback(result.data.feedback);
      await speakText(result.data.feedback);
      setIsSubmitting(false);
    } catch (error) {
      console.log("Failed to submit answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Move forward after the user reviews the feedback.
  const handleNext = async () => {
    window.speechSynthesis.cancel();
    videoRef.current?.pause();
    setIsAiPlaying(false);
    setSubtitle("");

    stopMic();

    if (currentIndex + 1 >= questions.length) {
      await finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setAnswer("");
    setFeedback("");

    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      if (isMicON) startMic();
    }, 500);
  };

  // Finish the interview and retrieve the final report.
  const finishInterview = async () => {
    stopMic();
    setIsMicON(false);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        {
          interviewId,
        },
        { withCredentials: true },
      );

      onFinish(result.data);
    } catch (error) {
      console.log("Failed to finish interview:", error);
    }
  };

  // Automatically submit when the answer timer reaches 0.
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    if (
      !isIntroPhase &&
      currentQuestion &&
      timeLeft === 0 &&
      !isSubmitting &&
      !feedback
    ) {
      submitAnswer();
    }
  }, [
    timeLeft,
    isIntroPhase,
    isIntroPhase,
    isSubmitting,
    feedback,
    currentQuestion,
  ]);

  // Stop speech and microphone activity when leaving this component.
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-290 min-h-[80vh] bg-[var(--surface)] rounded-3xl shadow-2xl border border-[var(--border-strong)] flex flex-col lg:flex-row overflow-hidden transition-colors duration-300">
        {/* video section */}
        <div className="w-full shrink-0 lg:w-[35%] bg-[var(--surface)] flex flex-col items-center p-6 space-y-6 border-r border-[var(--border)]">
          <div className="w-full max-w-md  aspect-video rounded-2xl overflow-hidden shadow-xl border border-[var(--border)]">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="block w-full h-full object-cover"
            />
          </div>

          {/* subtitle  */}
          {subtitle && (
            <div className="w-full max-w-md bg-[var(--surface-2)] border border-[var(--border)] rounded-xl p-4 shadow-sm text-center">
              <p className="text-sm sm:text-base font-medium text-[var(--ink)]">
                {subtitle}
              </p>
            </div>
          )}

          {/* timer area */}
          <div className="w-full max-w-md bg-[var(--surface-2)] border border-[var(--border)] rounded-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--ink-muted)]">
                Interview Status
              </span>

              <span
                className={`text-sm font-semibold ${
                  isAiPlaying ? "text-[var(--success)]" : "text-[var(--danger)]"
                }`}
              >
                {isAiPlaying ? "AI is speaking..." : "AI is idle"}
              </span>
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
                  {questions?.length}
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
              Question {currentIndex + 1} of {questions?.length}
            </p>

            <div className="text-base sm:text-lg font-semibold leading-relaxed text-[var(--ink)]">
              {currentQuestion?.question || "Loading question..."}
            </div>
          </div>

          <textarea
            placeholder="Type your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-[var(--surface-2)] p-4 sm:p-6 rounded-2xl resize-none outline-none border border-[var(--border)] focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition text-[var(--ink)] placeholder:text-[var(--ink-light)]"
          />

          {!feedback ? (
            <div className="flex items-center gap-4 mt-6">
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg hover:bg-[var(--accent-hover)] transition"
              >
                {isMicON ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaMicrophoneSlash size={20} />
                )}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[var(--accent)] text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:bg-[var(--accent-hover)] transition font-semibold disabled:bg-[var(--ink)]"
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-[var(--surface)] border border-[var(--border-strong)] p-5 rounded-2xl shadow-sm"
            >
              <p className="font-medium mb-4 text-[var(--danger)]">
                {feedback}
              </p>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-[var(--accent-hero-2)] to-[var(--accent-hero)] text-white py-3 rounded-xl shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentIndex + 1 >= questions.length
                    ? "Finish Interview"
                    : "Next Question"}
                <BsArrowLeft size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Interview;

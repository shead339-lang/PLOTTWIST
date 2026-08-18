"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const GENERATION_STEPS = [
  { icon: "🎬", title: "THE DIRECTOR IS PANICKING...", message: "Reading your 12 answers with increasing bewilderment…" },
  { icon: "🧐", title: "ANALYZING QUESTIONABLE DECISIONS...", message: "Searching for evidence of long-term planning (none found)…" },
  { icon: "😈", title: "FINDING YOUR VILLAIN...", message: "Consulting the Dark Lord's union for a suitable rival…" },
  { icon: "💀", title: "CALCULATING SURVIVAL PROBABILITY...", message: "Survival odds dropped to 17%. Praying for rain…" },
  { icon: "💸", title: "HIRING AN UNPAID SCREENWRITER...", message: "Allocating total production budget of ₹47…" },
  { icon: "🧠", title: "REMOVING ALL COMMON SENSE...", message: "Injecting maximum chaos and questionable choices…" },
  { icon: "🌧️", title: "ADDING UNNECESSARY DRAMA...", message: "Activating industrial rain machines for the climax…" },
  { icon: "🧾", title: "YOUR MOVIE & RECEIPT ARE READY!", message: "Printing official Roast Receipt and rolling the red carpet…" },
];

export default function GeneratePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    async function generate() {
      // Step through visual messages
      const stepInterval = setInterval(() => {
        setCurrentStep((s) => Math.min(s + 1, GENERATION_STEPS.length - 1));
      }, 950);

      try {
        const raw = sessionStorage.getItem("plottwist-answers");
        if (!raw) {
          router.replace("/quiz");
          return;
        }

        const answers = JSON.parse(raw);

        const response = await fetch("/api/generate-story", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });

        clearInterval(stepInterval);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error ?? "Generation failed");
        }

        const data = await response.json();

        // Store result for the movie page
        sessionStorage.setItem("plottwist-result", JSON.stringify(data));

        // Clear quiz state
        sessionStorage.removeItem("plottwist-quiz");
        sessionStorage.removeItem("plottwist-answers");

        // Brief pause to show final message
        setTimeout(() => {
          router.push(`/movie/${data.shareCode}`);
        }, 800);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong generating your movie."
        );
      }
    }

    generate();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl mb-4">😬</div>
        <h2 className="font-title text-2xl text-[#f0ece8] mb-2">
          The generator hit a snag
        </h2>
        <p className="text-[#9ca3af] mb-6 max-w-sm">{error}</p>
        <button
          onClick={() => router.push("/quiz")}
          className="btn-secondary"
        >
          Try Again
        </button>
      </div>
    );
  }

  const step = GENERATION_STEPS[currentStep];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-[#07030e]">
      {/* Background glow elements */}
      <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.7, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.2, opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-7xl mb-6 inline-block"
          >
            {step.icon}
          </motion.div>
        </AnimatePresence>

        {/* Step Title & Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentStep}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <h2 className="font-dramatic text-xl sm:text-2xl font-black text-yellow-400 mb-2 glow-text-gold">
              {step.title}
            </h2>
            <p className="text-[#9ca3af] text-sm leading-relaxed max-w-sm mx-auto">
              {step.message}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden mb-4 border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-purple-500 rounded-full"
            initial={{ width: "10%" }}
            animate={{
              width: `${Math.round(((currentStep + 1) / GENERATION_STEPS.length) * 100)}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <p className="text-[#6b7280] text-xs">
          Step {currentStep + 1} of {GENERATION_STEPS.length} • 100% Unqualified AI
        </p>
      </div>
    </div>
  );
}

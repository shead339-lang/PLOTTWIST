"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const GENERATION_STEPS = [
  { icon: "🎭", message: "Casting your character…" },
  { icon: "🌍", message: "Building your world…" },
  { icon: "😈", message: "Summoning your villain…" },
  { icon: "🐉", message: "Negotiating with your companion…" },
  { icon: "⚡", message: "Activating your forbidden power…" },
  { icon: "🎲", message: "Rolling the cinematic dice…" },
  { icon: "📖", message: "Writing your plot twist…" },
  { icon: "🔥", message: "Setting the final battle scene…" },
  { icon: "🎬", message: "Your movie is almost ready…" },
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
      }, 900);

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Cinematic rings */}
      <div className="relative mb-12">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-yellow-400/20"
            style={{
              width: 120 + i * 60,
              height: 120 + i * 60,
              top: -(i * 30),
              left: -(i * 30),
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Center icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 rounded-full card-glass border border-yellow-400/30 flex items-center justify-center text-4xl"
          >
            {step.icon}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="font-title text-xl sm:text-2xl text-[#f0ece8] text-center mb-8"
        >
          {step.message}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2">
        {GENERATION_STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            animate={{
              width: i === currentStep ? 24 : 8,
              backgroundColor:
                i < currentStep
                  ? "#f5c842"
                  : i === currentStep
                  ? "#f5c842"
                  : "rgba(255,255,255,0.1)",
            }}
            style={{ height: 8 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <p className="text-[#6b7280] text-sm mt-8">
        Your cinematic story is being crafted…
      </p>
    </div>
  );
}

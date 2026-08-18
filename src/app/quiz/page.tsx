"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QUESTIONS } from "@/data/questions";
import type { QuestionOption } from "@/data/questions";
import { UNIVERSES, getRolesForUniverse } from "@/data/universes";

type AnswerValue = string | string[];

// ─── Progress Bar ────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1.5 w-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between items-center px-4 py-2 text-xs text-[#9ca3af] bg-[#07030e]/80 backdrop-blur-sm">
        <span className="font-title tracking-wider text-yellow-400/80">
          Question {current} of {total}
        </span>
        <span>{pct}% Answered</span>
      </div>
    </div>
  );
}

// ─── Name Input ─────────────────────────────────────────────
function NameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        id="name-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 30))}
        placeholder="Enter your name... or alias"
        maxLength={30}
        className="w-full text-center text-2xl sm:text-3xl font-title text-[#f0ece8] bg-transparent border-0 border-b-2 border-yellow-400/40 pb-3 outline-none focus:border-yellow-400 transition-colors placeholder:text-[#4b5563] caret-yellow-400"
        autoFocus
      />
      <p className="text-center text-[#6b7280] text-xs mt-3">
        {value.length}/30 characters • Authorities are watching
      </p>
    </div>
  );
}

// ─── Universe Selector ──────────────────────────────────────
function UniverseSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto">
      {UNIVERSES.map((u) => (
        <button
          key={u.id}
          id={`universe-${u.id}`}
          onClick={() => onSelect(u.id)}
          className={`universe-card p-5 text-left transition-all duration-300 ${
            selected === u.id ? "selected" : ""
          }`}
          style={{
            background:
              selected === u.id
                ? `linear-gradient(135deg, ${u.accentColor}22 0%, ${u.bgColor} 100%)`
                : u.bgColor,
          }}
        >
          <div className="text-3xl mb-2">{u.emoji}</div>
          <div className="font-title font-bold text-sm text-[#f0ece8] mb-1">
            {u.name}
          </div>
          <div className="text-[#9ca3af] text-xs leading-relaxed">{u.tagline}</div>
          {selected === u.id && (
            <div className="mt-2 text-xs text-yellow-400 font-semibold">✓ Selected</div>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Role Selector ──────────────────────────────────────────
function RoleSelector({
  universeId,
  selected,
  onSelect,
}: {
  universeId: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const roles = getRolesForUniverse(universeId);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl mx-auto">
      {roles.map((role) => (
        <button
          key={role.id}
          id={`role-${role.id}`}
          onClick={() => onSelect(role.id)}
          className={`option-card flex flex-col gap-2 ${selected === role.id ? "selected" : ""}`}
        >
          <span className="text-2xl">{role.emoji}</span>
          <span className="font-title font-bold text-sm text-[#f0ece8]">{role.label}</span>
          <span className="text-[#9ca3af] text-xs leading-relaxed">{role.description}</span>
          {selected === role.id && (
            <span className="text-yellow-400 text-xs font-semibold">✓ Chosen</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Single Select Grid with Subtitles ──────────────────────
function SingleSelectGrid({
  options,
  selected,
  onSelect,
}: {
  options: QuestionOption[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mx-auto">
      {options.map((opt) => (
        <button
          key={opt.id}
          id={`option-${opt.id}`}
          onClick={() => onSelect(opt.id)}
          className={`option-card flex items-start gap-3 text-left transition-all duration-200 ${
            selected === opt.id ? "selected" : ""
          }`}
        >
          <span className="text-2xl flex-shrink-0 mt-0.5">{opt.emoji}</span>
          <div className="flex-1">
            <span className="text-[#f0ece8] font-medium text-sm block">
              {opt.label}
            </span>
            {opt.subtitle && (
              <span className="text-[#9ca3af] text-xs italic block mt-0.5">
                {opt.subtitle}
              </span>
            )}
          </div>
          {selected === opt.id && (
            <span className="text-yellow-400 text-xs font-semibold">✓</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Quiz Page ──────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = not started
  const [answers, setAnswers] = useState<Partial<Record<string, AnswerValue>>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roastMessage, setRoastMessage] = useState<string | null>(null);

  // Keep a ref so goNext always reads latest answers
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const currentQuestion = step > 0 ? QUESTIONS[step - 1] : null;
  const totalSteps = QUESTIONS.length;

  // Idle timer to roast user if they take too long
  useEffect(() => {
    if (step === 0) return;
    const idleTimer = setTimeout(() => {
      setRoastMessage("Still thinking? It's okay. The kingdom has been waiting for 14 minutes. 😂");
    }, 12000);

    return () => clearTimeout(idleTimer);
  }, [step]);

  // Load saved progress from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("plottwist-quiz");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed.answers ?? {});
        setStep(parsed.step ?? 0);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save progress
  useEffect(() => {
    if (step > 0) {
      sessionStorage.setItem(
        "plottwist-quiz",
        JSON.stringify({ answers, step })
      );
    }
  }, [answers, step]);

  const handleAnswer = useCallback(
    (questionId: string, value: AnswerValue) => {
      setRoastMessage(null);
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: value };
        answersRef.current = next;
        return next;
      });
    },
    []
  );

  const getCurrentAnswer = (): string => {
    if (!currentQuestion) return "";
    const val = answers[currentQuestion.id];
    return (typeof val === "string" ? val : "") ?? "";
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "name") {
      const nameVal = answers.name;
      return typeof nameVal === "string" && nameVal.trim().length > 0;
    }
    if (currentQuestion.type === "universe") return !!answers.universe;
    if (currentQuestion.type === "role") return !!answers.role;
    const val = answers[currentQuestion.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  };

  const goNext = async () => {
    if (!canProceed()) return;
    setRoastMessage(null);

    if (step === totalSteps) {
      const latestAnswers = answersRef.current;
      setIsSubmitting(true);
      const flatAnswers: Record<string, string> = {};
      for (const [key, val] of Object.entries(latestAnswers)) {
        if (Array.isArray(val)) {
          flatAnswers[key] = val.join(",");
        } else if (typeof val === "string") {
          flatAnswers[key] = val;
        }
      }
      sessionStorage.setItem("plottwist-answers", JSON.stringify(flatAnswers));
      router.push("/generate");
      return;
    }

    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      router.push("/");
      return;
    }
    setRoastMessage("Going back? Interesting. The timeline has been damaged. 🌀");
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Back button */}
      <button
        onClick={goBack}
        id="quiz-back"
        className="fixed top-6 left-6 flex items-center gap-2 text-[#9ca3af] hover:text-yellow-400 transition-colors text-sm z-40"
      >
        <ArrowLeft size={16} />
        {step === 0 ? "Home" : "Back"}
      </button>

      {/* Progress */}
      {step > 0 && step <= totalSteps && (
        <ProgressBar current={step} total={totalSteps} />
      )}

      {/* Roasting Toast */}
      <AnimatePresence>
        {roastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 z-50 bg-amber-950/90 border border-amber-500/40 text-amber-200 text-xs px-4 py-2 rounded-full shadow-lg max-w-sm text-center"
          >
            {roastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start screen */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="text-6xl mb-6">🎬</div>
          <h1 className="font-title text-3xl sm:text-5xl font-black text-gold-gradient mb-4">
            YOUR LIFE: THE MOVIE
          </h1>
          <p className="text-[#d1c8b8] text-base sm:text-lg mb-8 leading-relaxed">
            We asked you 12 questions. We regret asking 11 of them.
            <br />
            <span className="text-[#9ca3af] text-sm">
              “Answer honestly. Our completely unqualified AI will turn your life into a movie.”
            </span>
          </p>
          <button
            id="quiz-start"
            onClick={() => { setDirection(1); setStep(1); }}
            className="btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto"
          >
            START THE QUIZ 🎬
            <ArrowRight size={18} />
          </button>
          <p className="text-[#6b7280] text-xs mt-4">
            Entertainment only · 100% Unqualified comedy engine
          </p>
        </motion.div>
      )}

      {/* Question cards */}
      {currentQuestion && step > 0 && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              {/* Question header */}
              <div className="text-center mb-8 max-w-lg">
                <div className="inline-block text-xs font-title text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 mb-3">
                  Step {step} of {totalSteps}
                </div>
                <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#f0ece8] leading-snug mb-2">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    {currentQuestion.subtitle}
                  </p>
                )}
              </div>

              {/* Question inputs */}
              <div className="w-full mb-8">
                {currentQuestion.type === "name" && (
                  <NameInput
                    value={getCurrentAnswer()}
                    onChange={(v) => handleAnswer("name", v)}
                  />
                )}

                {currentQuestion.type === "universe" && (
                  <UniverseSelector
                    selected={getCurrentAnswer()}
                    onSelect={(id) => handleAnswer("universe", id)}
                  />
                )}

                {currentQuestion.type === "role" && (
                  <RoleSelector
                    universeId={(answers.universe as string) ?? "fantasy"}
                    selected={getCurrentAnswer()}
                    onSelect={(id) => handleAnswer("role", id)}
                  />
                )}

                {currentQuestion.type === "single_choice" && currentQuestion.options && (
                  <SingleSelectGrid
                    options={currentQuestion.options}
                    selected={getCurrentAnswer()}
                    onSelect={(id) => handleAnswer(currentQuestion.id, id)}
                  />
                )}
              </div>

              {/* Next button */}
              <button
                id="quiz-next"
                onClick={goNext}
                disabled={!canProceed() || isSubmitting}
                className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === totalSteps ? (
                  isSubmitting ? (
                    "PRODUCING MOVIE..."
                  ) : (
                    "🎬 GENERATE MY MOVIE"
                  )
                ) : (
                  <>
                    NEXT
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

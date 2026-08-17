"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { QUESTIONS, type QuestionOption } from "@/data/questions";
import { UNIVERSES, getRolesForUniverse } from "@/data/universes";
import type { QuizAnswers } from "@/lib/validation";

// ─── Progress Bar ───────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2 text-xs text-[#9ca3af] font-title uppercase tracking-widest">
        <span>Question {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-film h-2 w-full">
        <div className="progress-film-fill" style={{ width: `${pct}%` }} />
      </div>
      {/* Film sprocket dots */}
      <div className="flex gap-1 mt-1 justify-center">
        {Array.from({ length: Math.min(total, 15) }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i < current ? "bg-yellow-400" : "bg-white/10"
            }`}
          />
        ))}
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
        placeholder="Enter your name..."
        maxLength={30}
        className="w-full text-center text-2xl sm:text-3xl font-title text-[#f0ece8] bg-transparent border-0 border-b-2 border-yellow-400/40 pb-3 outline-none focus:border-yellow-400 transition-colors placeholder:text-[#4b5563] caret-yellow-400"
        autoFocus
      />
      <p className="text-center text-[#6b7280] text-xs mt-3">
        {value.length}/30 characters
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

// ─── Option Grid ────────────────────────────────────────────
function OptionGrid({
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
          className={`option-card flex items-center gap-3 ${selected === opt.id ? "selected" : ""}`}
        >
          <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
          <span className="text-[#f0ece8] font-medium text-sm text-left">{opt.label}</span>
          {selected === opt.id && (
            <span className="ml-auto text-yellow-400 text-sm">✓</span>
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
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUESTIONS[step] ?? null;
  const totalSteps = QUESTIONS.length;

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
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const getCurrentAnswer = () => {
    if (!currentQuestion) return "";
    return (answers[currentQuestion.id as keyof QuizAnswers] as string) ?? "";
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === "name") {
      return (answers.name ?? "").trim().length > 0;
    }
    if (currentQuestion.type === "universe") return !!answers.universe;
    if (currentQuestion.type === "role") return !!answers.role;
    return !!answers[currentQuestion.id as keyof QuizAnswers];
  };

  const goNext = async () => {
    if (!canProceed()) return;

    if (step === totalSteps - 1) {
      // Submit
      setIsSubmitting(true);
      sessionStorage.setItem("plottwist-answers", JSON.stringify(answers));
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
        className="fixed top-6 left-6 flex items-center gap-2 text-[#9ca3af] hover:text-yellow-400 transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        {step === 0 ? "Home" : "Back"}
      </button>

      {/* Progress */}
      {step > 0 && step <= totalSteps && (
        <ProgressBar current={step} total={totalSteps} />
      )}

      {/* Start screen */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="text-6xl mb-6">🎬</div>
          <h1 className="font-title text-4xl sm:text-5xl font-black text-gold-gradient mb-4">
            YOUR MOVIE AWAITS
          </h1>
          <p className="text-[#9ca3af] text-lg mb-8 leading-relaxed">
            15 questions. 1 personalized cinematic story. And probably at least one
            plot twist you didn't see coming.
          </p>
          <button
            id="quiz-start"
            onClick={() => { setDirection(1); setStep(1); }}
            className="btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto"
          >
            LET'S BEGIN
            <ArrowRight size={18} />
          </button>
          <p className="text-[#6b7280] text-xs mt-4">
            Entertainment only · Purely fictional results
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
                <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#f0ece8] mb-2">
                  {currentQuestion.title}
                </h2>
                {currentQuestion.subtitle && (
                  <p className="text-[#9ca3af] text-base">{currentQuestion.subtitle}</p>
                )}
              </div>

              {/* Input type */}
              {currentQuestion.type === "name" && (
                <NameInput
                  value={answers.name ?? ""}
                  onChange={(v) => handleAnswer("name", v)}
                />
              )}

              {currentQuestion.type === "universe" && (
                <UniverseSelector
                  selected={answers.universe ?? ""}
                  onSelect={(v) => handleAnswer("universe", v)}
                />
              )}

              {currentQuestion.type === "role" && (
                <RoleSelector
                  universeId={answers.universe ?? "fantasy"}
                  selected={answers.role ?? ""}
                  onSelect={(v) => handleAnswer("role", v)}
                />
              )}

              {currentQuestion.type === "single_choice" && currentQuestion.options && (
                <OptionGrid
                  options={currentQuestion.options}
                  selected={getCurrentAnswer()}
                  onSelect={(v) => handleAnswer(currentQuestion.id, v)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={goBack}
              id="quiz-back-btn"
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={goNext}
              id="quiz-next-btn"
              disabled={!canProceed() || isSubmitting}
              className={`btn-primary flex items-center gap-2 transition-opacity ${
                canProceed() ? "opacity-100" : "opacity-40 cursor-not-allowed"
              }`}
            >
              {step === totalSteps - 1 ? (
                isSubmitting ? "Creating..." : "CREATE MY MOVIE 🎬"
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

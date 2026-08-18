"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, ShieldAlert, Flame, FileText } from "lucide-react";
import { QUESTIONS } from "@/data/questions";
import type { QuestionOption } from "@/data/questions";
import { UNIVERSES, getRolesForUniverse } from "@/data/universes";

type AnswerValue = string | string[];

// ─── Progress Bar & Roast Meter ─────────────────────────────
function QuizHeader({
  current,
  total,
  roastMeter,
  normality,
  evidenceCount,
  redFlagCount,
}: {
  current: number;
  total: number;
  roastMeter: number;
  normality: number;
  evidenceCount: number;
  redFlagCount: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#07030e]/90 backdrop-blur-md border-b border-white/5">
      <div className="h-1.5 w-full bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-title tracking-wider text-yellow-400/90 font-bold">
            Question {current} of {total}
          </span>
          <span className="text-[#6b7280] hidden sm:inline">•</span>
          <span className="text-[#9ca3af] hidden sm:inline flex items-center gap-1">
            <FileText size={12} className="text-purple-400" />
            Evidence: <strong className="text-[#f0ece8]">{evidenceCount}</strong> logged
            {redFlagCount > 0 && (
              <span className="text-red-400 ml-1">({redFlagCount} 🚩)</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#9ca3af]">
            <span>Normality:</span>
            <strong className={normality < 30 ? "text-red-400" : "text-green-400"}>
              {normality}%
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#9ca3af] text-[11px] uppercase font-title tracking-wider">
              Roast Level
            </span>
            <div className="w-16 sm:w-20 bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                animate={{ width: `${Math.min(100, roastMeter)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-bold text-red-400 text-xs">{roastMeter}%</span>
          </div>
        </div>
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
  onSelect: (opt: QuestionOption) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mx-auto">
      {options.map((opt) => (
        <button
          key={opt.id}
          id={`option-${opt.id}`}
          onClick={() => onSelect(opt)}
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

// ─── Mid-Way Checkpoint Intermission ─────────────────────────
function HalfwayDiagnosticModal({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-[#07030e]/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full card-glass border border-yellow-400/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-yellow-400 text-xs font-title uppercase tracking-widest mb-1">
          HALFWAY DIAGNOSTIC
        </p>
        <h3 className="font-dramatic text-2xl sm:text-3xl font-black text-[#f0ece8] mb-4 glow-text-gold">
          WE HAVE SERIOUS CONCERNS.
        </h3>
        <p className="text-[#d1c8b8] text-xs leading-relaxed mb-6">
          The director and AI review committee have analyzed your first 6 decisions:
        </p>

        <div className="space-y-2.5 text-xs text-left bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Chaos Level:</span>
            <span className="text-red-400 font-bold">78% (Extreme)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Common Sense Detected:</span>
            <span className="text-gray-400 font-bold">23% (Marginal)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Unearned Confidence:</span>
            <span className="text-green-400 font-bold">94% (Hazardous)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Survival Odds:</span>
            <span className="text-purple-400 font-bold">34% (Pray for rain)</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-yellow-400">
            <span>Why are you like this?:</span>
            <strong className="font-bold">100%</strong>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="btn-primary w-full py-3.5 text-xs sm:text-sm font-title font-bold flex items-center justify-center gap-2"
        >
          CONTINUE MAKING QUESTIONABLE DECISIONS →
        </button>
      </div>
    </motion.div>
  );
}

// ─── Quiz Page ──────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = start warning
  const [answers, setAnswers] = useState<Partial<Record<string, AnswerValue>>>({});
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [comboCount, setComboCount] = useState(0);
  const [roastMeter, setRoastMeter] = useState(30);
  const [normality, setNormality] = useState(100);
  const [evidenceCount, setEvidenceCount] = useState(0);
  const [redFlagCount, setRedFlagCount] = useState(0);
  const [showHalfway, setShowHalfway] = useState(false);
  const hasShownHalfway = useRef(false);

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const currentQuestion = step > 0 ? QUESTIONS[step - 1] : null;
  const totalSteps = QUESTIONS.length;

  // Idle timer to roast user if they take too long
  useEffect(() => {
    if (step === 0 || showHalfway) return;
    const idleTimer = setTimeout(() => {
      setToastMessage("Still thinking? It's okay. The kingdom has been waiting for 14 minutes. 😂");
    }, 12000);

    return () => clearTimeout(idleTimer);
  }, [step, showHalfway]);

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

  const handleOptionSelect = (opt: QuestionOption) => {
    if (!currentQuestion) return;

    // Track Evidence & Roast Meter
    setEvidenceCount((c) => c + 1);
    if (opt.isRedFlag) setRedFlagCount((r) => r + 1);

    if (opt.isBadDecision || opt.isRedFlag) {
      setNormality((n) => Math.max(3, n - 14));
      setComboCount((c) => {
        const next = c + 1;
        if (next >= 3) {
          setToastMessage(`🔥 CHAOS COMBO x${next}! Stop, you're making this too easy 💀`);
        } else if (opt.directorReaction) {
          setToastMessage(`🎬 Director's note: "${opt.directorReaction}"`);
        }
        return next;
      });
      setRoastMeter((m) => Math.min(99, m + 8));
    } else {
      setComboCount(0);
      setNormality((n) => Math.max(3, n - 4));
      if (opt.directorReaction) {
        setToastMessage(`🎬 Director's note: "${opt.directorReaction}"`);
      }
      setRoastMeter((m) => Math.min(99, m + 3));
    }

    setAnswers((prev) => {
      const next = { ...prev, [currentQuestion.id]: opt.id };
      answersRef.current = next;
      return next;
    });
  };

  const handleRawAnswer = useCallback(
    (questionId: string, value: AnswerValue) => {
      setToastMessage(null);
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
    setToastMessage(null);

    // Show Halfway Checkpoint at step 6
    if (step === 6 && !hasShownHalfway.current) {
      hasShownHalfway.current = true;
      setShowHalfway(true);
      return;
    }

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
    setToastMessage("Going back? Interesting. The timeline has been damaged. 🌀");
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Halfway Diagnostic Intermission */}
      {showHalfway && (
        <HalfwayDiagnosticModal onContinue={() => {
          setShowHalfway(false);
          setDirection(1);
          setStep((s) => s + 1);
        }} />
      )}

      {/* Back button */}
      <button
        onClick={goBack}
        id="quiz-back"
        className="fixed top-6 left-6 flex items-center gap-2 text-[#9ca3af] hover:text-yellow-400 transition-colors text-sm z-40"
      >
        <ArrowLeft size={16} />
        {step === 0 ? "Home" : "Back"}
      </button>

      {/* Header & Roast Meter */}
      {step > 0 && step <= totalSteps && (
        <QuizHeader
          current={step}
          total={totalSteps}
          roastMeter={roastMeter}
          normality={normality}
          evidenceCount={evidenceCount}
          redFlagCount={redFlagCount}
        />
      )}

      {/* Toast Notification for Director Notes / Roasts */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 z-50 bg-amber-950/95 border border-amber-500/40 text-amber-200 text-xs px-4 py-2 rounded-full shadow-2xl max-w-md text-center"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start screen with Warning */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg card-glass border border-yellow-400/30 rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-yellow-400 text-xs font-title uppercase tracking-widest mb-1">
            EVERY CLICK IS EVIDENCE
          </p>
          <h1 className="font-dramatic text-3xl sm:text-4xl font-black text-gold-gradient mb-4">
            ROAST WARNING
          </h1>
          <p className="text-[#d1c8b8] text-sm leading-relaxed mb-6">
            Every answer you choose will be logged, analyzed, and used against you later in your official Roast Receipt.
            <br /><br />
            <span className="text-yellow-400/90 font-bold">
              Choose wisely. Or don't. We prefer don't. 💀
            </span>
          </p>
          <button
            id="quiz-start"
            onClick={() => { setDirection(1); setStep(1); }}
            className="btn-primary text-base px-8 py-4 flex items-center gap-2 mx-auto shadow-lg"
          >
            I ACCEPT MY POOR DECISIONS 💀
            <ArrowRight size={18} />
          </button>
          <p className="text-[#6b7280] text-xs mt-4">
            12 Questions • 100% Unqualified Comedy Director
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
                  Question {step} of {totalSteps}
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
                    onChange={(v) => handleRawAnswer("name", v)}
                  />
                )}

                {currentQuestion.type === "universe" && (
                  <UniverseSelector
                    selected={getCurrentAnswer()}
                    onSelect={(id) => handleRawAnswer("universe", id)}
                  />
                )}

                {currentQuestion.type === "role" && (
                  <RoleSelector
                    universeId={(answers.universe as string) ?? "fantasy"}
                    selected={getCurrentAnswer()}
                    onSelect={(id) => handleRawAnswer("role", id)}
                  />
                )}

                {currentQuestion.type === "single_choice" && currentQuestion.options && (
                  <SingleSelectGrid
                    options={currentQuestion.options}
                    selected={getCurrentAnswer()}
                    onSelect={handleOptionSelect}
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

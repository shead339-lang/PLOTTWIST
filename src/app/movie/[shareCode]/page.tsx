"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Copy,
  Link2,
  Users,
  Film,
  Star,
  Zap,
  Flame,
  Sparkles,
  Award,
  ChevronRight,
  RefreshCw,
  Skull,
  Dices,
  ShoppingBag,
  Megaphone,
  Radio,
  AlertTriangle,
  Receipt,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingDown,
  ChevronDown,
  Download,
  ShieldAlert,
  Swords,
  Check,
  Eye,
  Info,
} from "lucide-react";
import type { MovieProfile, ChoiceRoastItem, AlternateTimeline } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";
import { UNIVERSES } from "@/data/universes";
import Link from "next/link";

interface MovieData {
  shareCode: string;
  profile: MovieProfile;
  story: StoryResult;
}

// ─── 1. Dramatic Step-by-Step Reveal Modal ───────────────────
function DramaticRevealModal({
  data,
  onComplete,
}: {
  data: MovieData;
  onComplete: () => void;
}) {
  const [stage, setStage] = useState(0);

  const stages = [
    {
      icon: "💀",
      title: `${data.profile.name.toUpperCase()}...`,
      subtitle: "We analyzed your 12 decisions.",
      body: "We have some serious concerns. 💀",
      btnText: "WHAT DID YOU FIND? ⏳",
    },
    {
      icon: data.profile.roastPersonality?.emoji || "🎭",
      title: "YOUR ROAST PERSONALITY",
      subtitle: data.profile.roastPersonality?.title || data.profile.archetypeLabel.toUpperCase(),
      body: `"${data.profile.roastPersonality?.tagline || "You wanted to be the hero. The algorithm disagreed."}"\n\n${data.profile.roastPersonality?.description || ""}`,
      btnText: "VIEW MY WORST DECISION ⚠️",
    },
    {
      icon: "⚠️",
      title: "YOUR SINGLE WORST DECISION",
      subtitle: data.profile.worstDecision?.answerChosen?.toUpperCase() || data.profile.weakness.toUpperCase(),
      body: `Question: "${data.profile.worstDecision?.questionTitle || ""}"\n\nDirector's Review: ${data.profile.worstDecision?.directorReview || ""}`,
      btnText: "ENTER MY MOVIE PREMIERE 🎬",
    },
  ];

  const current = stages[stage];

  const handleNext = () => {
    if (stage < stages.length - 1) {
      setStage((s) => s + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#07030e]/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.4 }}
            className="card-glass border border-yellow-400/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-6xl mb-6 animate-bounce">{current.icon}</div>
            <p className="text-yellow-400/80 text-xs font-title uppercase tracking-widest mb-2">
              {current.title}
            </p>
            <h2 className="font-dramatic text-2xl sm:text-3xl font-black text-[#f0ece8] mb-4 glow-text-gold">
              {current.subtitle}
            </h2>
            <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line mb-8">
              {current.body}
            </p>

            <button
              onClick={handleNext}
              className="btn-primary w-full py-4 text-sm font-title font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {current.btnText}
              <ChevronRight size={18} />
            </button>

            <button
              onClick={onComplete}
              className="text-[#6b7280] hover:text-[#9ca3af] text-xs mt-4 underline underline-offset-4"
            >
              Skip intro & view full movie
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── 2. Top Final Verdict Banner ──────────────────────────────
function FinalVerdictBanner({ profile }: { profile: MovieProfile }) {
  return (
    <div className="card-glass rounded-2xl border border-yellow-400/40 p-5 sm:p-6 bg-gradient-to-r from-[#1b0d2a] via-[#12071f] to-[#1a0f00]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-title font-bold uppercase tracking-widest text-yellow-400">
            <Sparkles size={14} />
            FINAL VERDICT
          </div>
          <h2 className="font-dramatic text-xl sm:text-2xl font-black text-[#f0ece8]">
            {profile.roastPersonality?.emoji || "🎭"} {profile.roastPersonality?.title || "THE HUMAN PLOT TWIST"}
          </h2>
          <p className="text-xs text-[#9ca3af]">
            "{profile.roastPersonality?.tagline || "Nobody knows what you are going to do next. Including you."}"
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="bg-red-950/40 border border-red-500/30 px-3.5 py-2 rounded-xl text-center">
            <div className="text-[10px] text-red-400 uppercase font-bold">Roast Damage</div>
            <div className="font-title font-black text-xl text-red-400">
              {profile.roastReceipt?.totalDamage ?? 97}<span className="text-xs text-[#9ca3af]">/100</span>
            </div>
          </div>
          <div className="bg-purple-950/40 border border-purple-500/30 px-3.5 py-2 rounded-xl text-center">
            <div className="text-[10px] text-purple-300 uppercase font-bold">Survival Odds</div>
            <div className="font-title font-black text-xl text-purple-300">
              {profile.survivalPercent}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10 text-xs">
        <div className="flex items-center gap-2 text-[#d1c8b8]">
          <span className="text-green-400 font-bold">✓ Strength:</span>
          <span>{profile.biggestStrength}</span>
        </div>
        <div className="flex items-center gap-2 text-[#d1c8b8]">
          <span className="text-red-400 font-bold">⚠️ Problem:</span>
          <span>{profile.biggestProblem}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Signature Roast Receipt with "Why?" Score Explainer ───
function RoastReceiptCard({ profile }: { profile: MovieProfile }) {
  const [showScoreWhy, setShowScoreWhy] = useState(false);
  const receipt = profile.roastReceipt || {
    questionsAnswered: 12,
    goodDecisions: 2,
    badDecisions: 5,
    questionableDecisions: 5,
    redFlags: 7,
    commonSense: 23,
    confidence: 94,
    chaos: 91,
    luck: 17,
    survival: 29,
    totalDamage: 97,
    damageFactors: [
      { label: "Extreme Chaos Quotient", points: 24, emoji: "🧨" },
      { label: "Questionable Choices Logged", points: 20, emoji: "⚠️" },
      { label: "Red Flags Ignored", points: 18, emoji: "🚩" },
      { label: "Unearned Supreme Confidence", points: 15, emoji: "🗿" },
      { label: "Severe Procrastination Tactics", points: 10, emoji: "😴" },
      { label: "Delusional Optimism", points: 10, emoji: "🙏" },
    ],
    finalVerdict: "“Congratulations. You have been thoroughly investigated.”",
  };

  return (
    <div className="relative font-mono">
      <div className="bg-[#120d1c] text-[#f0ece8] border-2 border-dashed border-yellow-400/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-white/20 mb-4">
          <div className="text-3xl mb-1">🧾</div>
          <h3 className="font-title font-black text-xl text-yellow-400 tracking-wider">
            OFFICIAL ROAST RECEIPT
          </h3>
          <p className="text-[11px] text-[#9ca3af]">PLOTTWIST INVESTIGATION BUREAU</p>
          <div className="text-[10px] text-[#6b7280] mt-1">
            CASE #{Math.floor(100000 + Math.random() * 900000)} • AUDITED BY AI
          </div>
        </div>

        {/* Itemized Decisions Tally */}
        <div className="space-y-2 text-xs border-b-2 border-dashed border-white/20 pb-4 mb-4">
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Questions Answered</span>
            <span className="font-bold">{receipt.questionsAnswered}</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Good Decisions Logged</span>
            <span>+{receipt.goodDecisions}</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>Bad Decisions Logged</span>
            <span>+{receipt.badDecisions}</span>
          </div>
          <div className="flex justify-between text-amber-400">
            <span>Questionable Choices</span>
            <span>+{receipt.questionableDecisions}</span>
          </div>
          <div className="flex justify-between text-red-500 font-bold">
            <span>Red Flags Logged 🚩</span>
            <span>+{receipt.redFlags}</span>
          </div>
        </div>

        {/* Breakdown of Metrics */}
        <div className="space-y-2 text-xs border-b-2 border-dashed border-white/20 pb-4 mb-4">
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Common Sense</span>
            <span className="font-bold text-red-400">{profile.commonSenseScore || receipt.commonSense}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Normality Level</span>
            <span className="font-bold text-red-400">{profile.normalityScore || 14}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Unearned Confidence</span>
            <span className="font-bold text-yellow-400">{receipt.confidence}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Chaos Quotient</span>
            <span className="font-bold text-red-400">{receipt.chaos}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#9ca3af]">Estimated Survival Rate</span>
            <span className="font-bold text-purple-400">{receipt.survival}%</span>
          </div>
        </div>

        {/* Total Damage Score with Clickable "Why?" Explainer */}
        <div className="text-center py-3 mb-4 bg-red-950/40 border border-red-500/30 rounded-xl relative">
          <button
            onClick={() => setShowScoreWhy(!showScoreWhy)}
            className="w-full focus:outline-none"
          >
            <div className="text-[10px] uppercase tracking-widest text-red-400 flex items-center justify-center gap-1">
              <span>TOTAL ROAST DAMAGE</span>
              <Info size={12} className="text-red-400" />
            </div>
            <div className="font-title font-black text-3xl text-red-400 mt-0.5">
              {receipt.totalDamage} <span className="text-sm text-[#9ca3af]">/ 100</span>
            </div>
            <div className="text-[10px] text-[#9ca3af] underline mt-1">
              {showScoreWhy ? "▲ Hide Score Breakdown" : "▼ Click to see why you scored this"}
            </div>
          </button>

          {/* Expanded Itemized Damage Factors */}
          {showScoreWhy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 pt-3 border-t border-red-500/20 text-left px-4 space-y-1.5 text-[11px]"
            >
              {(receipt.damageFactors || []).map((f, i) => (
                <div key={i} className="flex justify-between text-[#d1c8b8]">
                  <span>{f.emoji} {f.label}</span>
                  <strong className="text-red-400 font-bold">+{f.points} pts</strong>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Final Verdict */}
        <div className="text-center text-xs text-yellow-400 font-bold mb-6 italic">
          {receipt.finalVerdict}
        </div>

        {/* Barcode */}
        <div className="text-center pt-2 border-t-2 border-dashed border-white/20">
          <div className="tracking-[0.4em] text-lg text-[#9ca3af] select-none font-bold">
            ||| | |||| || | ||| |||| | ||
          </div>
          <div className="text-[9px] text-[#6b7280] mt-1 uppercase">THANK YOU FOR QUESTIONABLE DECISION MAKING</div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. "Roast My Choices" with Highlighted Worst Decision ───
function RoastMyChoicesSection({
  items,
  worst,
}: {
  items: ChoiceRoastItem[];
  worst?: MovieProfile["worstDecision"];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/30 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🔍 ROAST MY CHOICES (ALL 12 QUESTIONS)
        </h3>
        <span className="text-[10px] text-[#9ca3af]">Click to expand</span>
      </div>

      {/* 🏆 Highlighted Worst Decision of the Movie */}
      {worst && (
        <div className="bg-gradient-to-r from-red-950/60 to-black/60 border border-red-500/50 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-title font-bold text-red-400 uppercase tracking-wider mb-1">
            <Flame size={15} />
            🏆 WORST DECISION OF THE MOVIE
          </div>
          <div className="font-title font-bold text-sm text-[#f0ece8]">
            "{worst.answerChosen}"
          </div>
          <div className="text-[11px] text-[#9ca3af] mt-0.5">
            During: <em>"{worst.questionTitle}"</em>
          </div>
          <div className="mt-2 text-xs text-red-200/90 italic bg-black/40 p-2.5 rounded-xl border border-red-500/20">
            <strong>Director's Review:</strong> "{worst.directorReview}"
          </div>
        </div>
      )}

      {/* Itemized 12 Questions Breakdown */}
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border border-white/5 bg-black/30 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5 flex-1 pr-2 truncate">
                <span className="text-base">{item.choiceEmoji}</span>
                <span className="font-bold text-[#f0ece8] truncate">
                  Q{item.questionNumber}: {item.choiceLabel}
                </span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeBg} ${item.badgeText}`}>
                {item.classification}
              </span>
            </button>

            {openIndex === idx && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-4 pb-4 pt-2 text-xs border-t border-white/5 space-y-2 bg-black/40"
              >
                <div>
                  <span className="text-[#6b7280] uppercase tracking-wider text-[10px] block">Your Choice</span>
                  <span className="font-medium text-[#f0ece8]">{item.choiceLabel}</span>
                </div>
                <div>
                  <span className="text-[#6b7280] uppercase tracking-wider text-[10px] block">Evidence Collected</span>
                  <span className="text-[#d1c8b8]">{item.evidence}</span>
                </div>
                <div>
                  <span className="text-yellow-400/90 uppercase tracking-wider text-[10px] block font-bold">Director's Review</span>
                  <span className="text-yellow-300/90 italic">"{item.directorReview}"</span>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5. Personalized "WHAT IF?" Alternate Timelines ──────────
function AlternateTimelinesCard({ timelines }: { timelines: AlternateTimeline[] }) {
  const [selectedId, setSelectedId] = useState(timelines[0]?.id || "villain_arc");
  const selected = timelines.find((t) => t.id === selectedId) || timelines[0];

  if (!timelines || timelines.length === 0) return null;

  return (
    <div className="card-glass rounded-2xl border border-purple-500/30 p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-purple-300 flex items-center gap-2">
          🔀 WHAT IF? (ALTERNATE TIMELINES)
        </h3>
        <span className="text-[10px] text-[#9ca3af]">Multiverse View</span>
      </div>
      <p className="text-xs text-[#9ca3af] mb-4">
        Explore alternate versions of your movie personalized to your specific choices:
      </p>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {timelines.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedId(t.id)}
            className={`py-2 px-2.5 rounded-xl text-xs font-title font-bold transition-all text-center ${
              selectedId === t.id
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-black/30 text-[#9ca3af] hover:text-[#f0ece8] border border-white/5"
            }`}
          >
            {t.emoji} {t.title}
          </button>
        ))}
      </div>

      {/* Active Timeline Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-black/40 border border-purple-500/20 rounded-2xl p-4 text-xs space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-title font-bold text-purple-300 text-sm">{selected.title}</span>
            <span className="text-green-400 font-bold text-[11px]">Survival: {selected.survival}</span>
          </div>
          <p className="text-[#d1c8b8] leading-relaxed">
            {selected.synopsis}
          </p>
          <div className="pt-2 border-t border-white/10 text-[#9ca3af] text-[11px]">
            <strong>Timeline Climax:</strong> {selected.ending}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── 6. Balanced Movie Premiere Dossier (Strength + Problem) ─
function MoviePremiereDetails({ profile, story }: { profile: MovieProfile; story: StoryResult }) {
  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6 space-y-4">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-2">
        🎬 MOVIE PREMIERE DOSSIER
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280] uppercase font-bold">Your Character Role</div>
          <div className="font-bold text-[#f0ece8] text-sm mt-0.5">{profile.archetypeLabel}</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">{profile.archetypeDescription}</div>
        </div>

        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280] uppercase font-bold">Your Villain</div>
          <div className="font-bold text-red-400 text-sm mt-0.5">{profile.villainLabel}</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">Has a 47-step evil plan with color-coded charts.</div>
        </div>

        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-green-400 uppercase font-bold">Your Biggest Strength</div>
          <div className="font-bold text-green-400 text-sm mt-0.5">Accidental Plot Armor</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">{profile.biggestStrength}</div>
        </div>

        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-red-400 uppercase font-bold">Your Biggest Problem</div>
          <div className="font-bold text-red-400 text-sm mt-0.5">Yourself</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">{profile.biggestProblem}</div>
        </div>

        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-pink-400 uppercase font-bold">Romantic Subplot</div>
          <div className="font-bold text-pink-400 text-sm mt-0.5">Deflecting with Memes</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">{profile.romanticSubplot}</div>
        </div>

        <div className="bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-amber-400 uppercase font-bold">Fatal Weakness</div>
          <div className="font-bold text-amber-400 text-sm mt-0.5">{profile.fatalWeakness}</div>
          <div className="text-[#9ca3af] text-[11px] mt-1">Triggers at the worst possible moment in Scene 2.</div>
        </div>
      </div>
    </div>
  );
}

// ─── 7. Movie Poster Card with Download / Save Action ────────
function MoviePosterCard({ data }: { data: MovieData }) {
  const [downloading, setDownloading] = useState(false);
  const universe = UNIVERSES.find((u) => u.id === data.profile.universe);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 500);
  };

  return (
    <div className="space-y-3">
      <div
        id="movie-poster"
        className="poster-card relative overflow-hidden rounded-3xl max-w-lg mx-auto border border-yellow-400/40 shadow-2xl"
        style={{
          background: `linear-gradient(160deg, ${universe?.bgColor ?? "#0a0014"} 0%, #1a0030 60%, ${universe?.bgColor ?? "#0a0014"} 100%)`,
        }}
      >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

        <div className="p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-4 text-xs">
            <span className="text-yellow-400 font-title uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 font-bold">
              {universe?.name ?? data.profile.universe}
            </span>
            <span className="text-[#9ca3af] text-[10px] uppercase tracking-wider font-mono">
              IMDb: 9.2/10 ⭐
            </span>
          </div>

          <h2 className="font-dramatic text-2xl sm:text-4xl font-black text-yellow-400 leading-tight mb-2 glow-text-gold">
            {data.story.movieTitle}
          </h2>

          <p className="text-[#d1c8b8] italic text-sm mb-6 leading-relaxed">
            "{data.story.tagline}"
          </p>

          <div className="border-t border-yellow-400/20 mb-5" />

          <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
                Starring
              </div>
              <div className="text-[#f0ece8] font-bold truncate">
                {data.profile.name}
              </div>
            </div>
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
                Roast Archetype
              </div>
              <div className="text-yellow-400 font-bold truncate">
                {data.profile.roastPersonality?.title || data.profile.archetypeLabel}
              </div>
            </div>
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
                Survival Odds
              </div>
              <div className="text-purple-400 font-bold truncate">
                {data.profile.survivalPercent}%
              </div>
            </div>
            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
              <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
                Production Budget
              </div>
              <div className="text-red-400 font-bold truncate">
                ₹47.00
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <span className="text-[#9ca3af] font-title uppercase tracking-wider">
              {data.story.genre}
            </span>
            <span className="text-yellow-400 text-[10px] font-bold">
              plottwist.app
            </span>
          </div>
        </div>

        <div className="h-1.5 w-full bg-gradient-to-r from-purple-700 via-purple-400 to-cyan-400" />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5 text-[#d1c8b8]"
        >
          <Download size={13} />
          {downloading ? "Preparing Poster..." : "Save / Download Poster"}
        </button>
      </div>
    </div>
  );
}

// ─── 8. Share Suite with 1-on-1 Direct Friend Challenge ───────
function ShareSuite({
  shareCode,
  movieTitle,
  name,
  roastScore,
  archetype,
  survival,
}: {
  shareCode: string;
  movieTitle: string;
  name: string;
  roastScore: number;
  archetype: string;
  survival: number;
}) {
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [showDirectModal, setShowDirectModal] = useState(false);
  const [friendName, setFriendName] = useState("");

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://plottwist.app";
  const shareUrl = `${siteUrl}/movie/${shareCode}`;

  const customChallengeText = `I got ${archetype} with ${roastScore}/100 Roast Damage and a ${survival}% survival rate on PlotTwist. Beat that 😂 Make your movie: ${shareUrl}`;

  const directChallengeText = friendName.trim()
    ? `Hey ${friendName.trim()}! I scored ${roastScore}/100 Roast Damage with ${archetype} on PlotTwist. I don't think you can make better decisions than me. Prove it here: ${shareUrl}`
    : customChallengeText;

  const copyGeneral = () => {
    navigator.clipboard.writeText(customChallengeText);
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2000);
  };

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/30 p-6 text-center">
      {/* 1-on-1 Challenge Modal */}
      {showDirectModal && (
        <div className="fixed inset-0 z-50 bg-[#07030e]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="card-glass border border-yellow-400/30 rounded-2xl p-6 max-w-md w-full text-center space-y-4">
            <div className="text-3xl">⚔️</div>
            <h4 className="font-title font-bold text-base text-yellow-400">
              CHALLENGE ONE FRIEND DIRECTLY
            </h4>
            <p className="text-xs text-[#9ca3af]">
              Enter your friend's name to generate a personalized direct roast challenge:
            </p>
            <input
              type="text"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Enter friend's name (e.g. Arun, Rahul)"
              className="input-field w-full text-sm text-center"
            />

            <div className="bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-[#d1c8b8] italic text-left">
              "{directChallengeText}"
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowDirectModal(false)}
                className="btn-secondary flex-1 py-2 text-xs"
              >
                Cancel
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(directChallengeText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-1.5"
              >
                📱 Send via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <h3 className="font-title font-bold text-base sm:text-lg uppercase tracking-widest text-yellow-400 mb-2">
        🔥 ROAST YOUR FRIENDS
      </h3>
      <p className="text-[#d1c8b8] text-xs max-w-md mx-auto mb-5 leading-relaxed">
        Dare your friends to beat your <strong>{roastScore}/100 Roast Damage</strong> and <strong>{survival}% survival odds</strong>!
      </p>

      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={() => setShowDirectModal(true)}
          className="btn-primary flex items-center gap-1.5 text-xs py-2.5 px-5 shadow-lg font-title font-bold"
        >
          <Swords size={14} />
          🔥 CHALLENGE ONE FRIEND
        </button>

        <button
          onClick={copyGeneral}
          className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4"
        >
          {copiedChallenge ? <><Check size={14} /> Copied Challenge!</> : <><Copy size={14} /> Copy Challenge</>}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(customChallengeText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4 text-green-400 border-green-500/30"
        >
          📱 WhatsApp
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(customChallengeText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4 text-sky-400 border-sky-500/30"
        >
          𝕏 Post
        </a>
      </div>
    </div>
  );
}

// ─── 9. Mobile Sticky Action Bar ──────────────────────────────
function MobileStickyBar({
  shareCode,
  roastScore,
  onChallenge,
}: {
  shareCode: string;
  roastScore: number;
  onChallenge: () => void;
}) {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07030e]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-red-400 font-bold">🔥 {roastScore}/100</span>
        <span className="text-[#6b7280]">Damage</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onChallenge}
          className="btn-primary text-xs py-1.5 px-3 font-title font-bold flex items-center gap-1 shadow-md"
        >
          <Swords size={12} />
          Challenge Friend
        </button>
        <Link
          href="/friends"
          className="btn-secondary text-xs py-1.5 px-2.5 text-purple-300 border-purple-500/30"
        >
          <Users size={12} />
        </Link>
      </div>
    </div>
  );
}

// ─── Main Movie Page ─────────────────────────────────────────
export default function MoviePage() {
  const { shareCode } = useParams<{ shareCode: string }>();
  const router = useRouter();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [scriptOpen, setScriptOpen] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      const raw = sessionStorage.getItem("plottwist-result");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.shareCode === shareCode) {
            setMovieData(parsed);
            setShowIntroModal(true);
            setLoading(false);
            return;
          }
        } catch {
          // fall through
        }
      }

      try {
        const res = await fetch(`/api/movie?code=${shareCode}`);
        const data = await res.json();
        if (data.success) {
          setMovieData({
            shareCode,
            profile: data.movie.profile,
            story: data.movie.story,
          });
        }
      } catch {
        // ignore
      }
      setLoading(false);
    }

    if (shareCode) loadMovie();
  }, [shareCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-yellow-400 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#9ca3af] text-sm">Compiling your roast receipt and movie premiere…</p>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <div className="text-5xl mb-4">🎬</div>
          <h2 className="font-title text-2xl text-[#f0ece8] mb-2">Movie Not Found</h2>
          <p className="text-[#9ca3af] mb-6 text-sm">This movie link may have expired or does not exist.</p>
          <button onClick={() => router.push("/quiz")} className="btn-primary">
            Create Your Movie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-8 pb-20 sm:pb-12">
      {/* 1. Dramatic Step-by-Step Reveal Modal (shown once on generation) */}
      <AnimatePresence>
        {showIntroModal && (
          <DramaticRevealModal
            data={movieData}
            onComplete={() => setShowIntroModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-[#9ca3af] hover:text-yellow-400 transition-colors text-xs font-title uppercase tracking-widest flex items-center gap-1.5"
        >
          ← Home
        </Link>
        <Link
          href="/quiz"
          className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1"
        >
          <RefreshCw size={12} />
          Create Another Movie
        </Link>
      </div>

      {/* 2. Top Final Verdict Quick Summary */}
      <FinalVerdictBanner profile={movieData.profile} />

      {/* 3. Main Movie Poster Card & Download */}
      <MoviePosterCard data={movieData} />

      {/* 4. Top Quick Share / Challenge Suite */}
      <ShareSuite
        shareCode={movieData.shareCode}
        movieTitle={movieData.story.movieTitle}
        name={movieData.profile.name}
        roastScore={movieData.profile.roastReceipt?.totalDamage ?? 97}
        archetype={movieData.profile.roastPersonality?.title || movieData.profile.archetypeLabel}
        survival={movieData.profile.survivalPercent}
      />

      {/* 5. The Signature Roast Receipt Card */}
      <div className="max-w-xl mx-auto">
        <RoastReceiptCard profile={movieData.profile} />
      </div>

      {/* 6. "Roast My Choices" with Highlighted Worst Decision */}
      <RoastMyChoicesSection
        items={movieData.profile.roastMyChoices || []}
        worst={movieData.profile.worstDecision}
      />

      {/* 7. "WHAT IF?" (Alternate Timelines) */}
      <AlternateTimelinesCard timelines={movieData.profile.alternateTimelines || []} />

      {/* 8. Movie Premiere Dossier (Balanced Strength + Problem) */}
      <MoviePremiereDetails profile={movieData.profile} story={movieData.story} />

      {/* 9. Cinematic Script with Collapsible Option */}
      <div className="card-glass rounded-3xl p-6 sm:p-8 border border-white/8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-title font-bold text-lg text-yellow-400 uppercase tracking-wide">
              🎬 THE CINEMATIC SCRIPT
            </h3>
            <p className="text-[#9ca3af] text-xs mt-0.5">
              Setting: <strong className="text-[#f0ece8]">{movieData.profile.kingdomName}</strong>
            </p>
          </div>
          <button
            onClick={() => setScriptOpen(!scriptOpen)}
            className="text-xs text-yellow-400/80 hover:text-yellow-400 flex items-center gap-1 font-title font-bold"
          >
            {scriptOpen ? "Collapse Script ▲" : "Expand Script ▼"}
          </button>
        </div>

        {scriptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Scene 1 */}
            <div className="space-y-2">
              <div className="text-[10px] text-yellow-400 font-title uppercase tracking-widest font-bold">
                SCENE 1: THE INTRODUCTION
              </div>
              <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
                {movieData.story.characterIntroduction}
              </p>
            </div>

            {/* Audience Reaction */}
            {movieData.profile.audienceReactions?.[0] && (
              <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-300 italic flex items-center gap-2">
                <span>👤</span>
                <strong>{movieData.profile.audienceReactions[0].user}:</strong> "{movieData.profile.audienceReactions[0].quote}"
              </div>
            )}

            {/* Scene 2 */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-[10px] text-yellow-400 font-title uppercase tracking-widest font-bold">
                SCENE 2: THE QUESTIONABLE CRISIS
              </div>
              <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
                {movieData.story.currentChapter}
              </p>
            </div>

            {/* Director Interruption */}
            {movieData.profile.narratorInterruption && (
              <div className="bg-red-950/30 border border-red-500/40 rounded-2xl p-4 text-xs text-red-200 space-y-1 my-4">
                <div className="font-title font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  🛑 DIRECTOR INTERRUPTION
                </div>
                <p className="leading-relaxed italic">
                  {movieData.profile.narratorInterruption}
                </p>
              </div>
            )}

            {/* Quest & Encounters */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-sm text-[#d1c8b8] leading-relaxed">
              <p>{movieData.story.quest}</p>
              <p>{movieData.story.villain}</p>
              <p>{movieData.story.companion}</p>
            </div>

            {/* Scene 3: The Plot Twist */}
            <div className="twist-card p-5 rounded-2xl text-center my-4">
              <div className="text-2xl mb-1">🌀</div>
              <div className="font-title text-sm font-bold text-purple-300 uppercase tracking-widest mb-2">
                PLOT TWIST
              </div>
              <p className="text-[#f0ece8] text-sm font-medium leading-relaxed">
                {movieData.story.plotTwist}
              </p>
            </div>

            {/* Climax & Ending */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="text-[10px] text-yellow-400 font-title uppercase tracking-widest font-bold">
                SCENE 4: THE CLIMAX & CREDITS
              </div>
              <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
                {movieData.story.finalBattle}
              </p>
              <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
                {movieData.story.ending}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* 10. Group Movie Callout */}
      <div className="card-glass rounded-2xl border border-purple-500/30 p-6 text-center bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
        <div className="text-4xl mb-2">👥</div>
        <h3 className="font-title font-bold text-base sm:text-lg text-purple-300 uppercase tracking-wide mb-2">
          ROAST YOUR ENTIRE FRIEND GROUP
        </h3>
        <p className="text-[#d1c8b8] text-xs sm:text-sm max-w-md mx-auto mb-4 leading-relaxed">
          Create a group movie to discover who betrays everyone, who runs away first, and who dies in Scene 1!
        </p>
        <Link
          href="/friends"
          className="btn-primary text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2 font-title font-bold"
        >
          <Users size={16} />
          CREATE GROUP MOVIE BATTLE
        </Link>
      </div>

      {/* 11. Sticky Mobile Bottom Action Bar */}
      <MobileStickyBar
        shareCode={movieData.shareCode}
        roastScore={movieData.profile.roastReceipt?.totalDamage ?? 97}
        onChallenge={() => {
          window.scrollTo({ top: 300, behavior: "smooth" });
        }}
      />
    </div>
  );
}

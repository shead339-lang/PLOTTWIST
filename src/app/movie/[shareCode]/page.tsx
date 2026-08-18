"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import type { MovieProfile } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";
import { UNIVERSES } from "@/data/universes";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────
interface MovieData {
  shareCode: string;
  profile: MovieProfile;
  story: StoryResult;
}

// ─── 1. Dramatic Step-by-Step Reveal Sequence ────────────────
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
      subtitle: "We analyzed your answers.",
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
      btnText: "ENTER MY MOVIE & RECEIPT 🎬",
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

// ─── 2. Signature Roast Receipt Component ────────────────────
function RoastReceiptCard({ profile }: { profile: MovieProfile }) {
  const receipt = profile.roastReceipt || {
    questionsAnswered: 12,
    goodDecisions: 2,
    badDecisions: 6,
    questionableDecisions: 4,
    redFlags: 7,
    commonSense: 23,
    confidence: 94,
    chaos: 91,
    luck: 17,
    survival: 29,
    totalDamage: 91,
    finalVerdict: "“You are not a main character. You're the plot twist.”",
  };

  return (
    <div className="relative max-w-md mx-auto my-8 font-mono">
      {/* Receipt styling container */}
      <div className="bg-[#120d1c] text-[#f0ece8] border-2 border-dashed border-yellow-400/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Top Receipt Header */}
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
            <span>Good Decisions</span>
            <span>+{receipt.goodDecisions}</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>Bad Decisions</span>
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
            <span className="font-bold text-red-400">{receipt.commonSense}%</span>
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

        {/* Total Damage Score */}
        <div className="text-center py-2 mb-4 bg-red-950/40 border border-red-500/30 rounded-xl">
          <div className="text-[10px] uppercase tracking-widest text-red-400">TOTAL ROAST DAMAGE</div>
          <div className="font-title font-black text-3xl text-red-400">
            {receipt.totalDamage} <span className="text-sm text-[#9ca3af]">/ 100</span>
          </div>
        </div>

        {/* Final Verdict */}
        <div className="text-center text-xs text-yellow-400 font-bold mb-6 italic">
          {receipt.finalVerdict}
        </div>

        {/* Fake Barcode */}
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

// ─── 3. Worst Decision & Questionable Click Cards ────────────
function WorstDecisionCards({ profile }: { profile: MovieProfile }) {
  const worst = profile.worstDecision;
  const click = profile.mostQuestionableClick;
  const admissions = profile.thingsYouAdmitted || [];

  return (
    <div className="space-y-4">
      {worst && (
        <div className="card-glass rounded-2xl border border-red-500/40 p-6">
          <div className="flex items-center gap-2 text-xs font-title font-bold text-red-400 uppercase tracking-widest mb-2">
            <Flame size={16} />
            🏆 YOUR SINGLE WORST DECISION
          </div>
          <h4 className="font-title font-bold text-base text-[#f0ece8] mb-1">
            "{worst.answerChosen}"
          </h4>
          <p className="text-[#9ca3af] text-xs mb-3">
            In response to: <em>"{worst.questionTitle}"</em>
          </p>
          <div className="bg-black/40 border border-red-500/20 rounded-xl p-3.5 text-xs text-[#d1c8b8] leading-relaxed">
            <strong>Director's Review:</strong> {worst.directorReview}
          </div>
        </div>
      )}

      {click && (
        <div className="card-glass rounded-2xl border border-amber-500/30 p-6">
          <div className="flex items-center gap-2 text-xs font-title font-bold text-amber-400 uppercase tracking-widest mb-2">
            <AlertTriangle size={16} />
            🖱️ YOUR MOST QUESTIONABLE CLICK
          </div>
          <h4 className="font-title font-bold text-sm text-[#f0ece8] mb-1">
            Question #{click.questionNumber}: {click.answerChosen}
          </h4>
          <p className="text-xs text-[#d1c8b8] leading-relaxed mt-1">
            {click.explanation}
          </p>
        </div>
      )}

      {admissions.length > 0 && (
        <div className="card-glass rounded-2xl border border-white/8 p-6">
          <div className="text-xs font-title font-bold text-yellow-400 uppercase tracking-widest mb-3">
            🧾 THINGS YOU ADMITTED ON RECORD
          </div>
          <ul className="space-y-2 text-xs text-[#d1c8b8]">
            {admissions.slice(0, 5).map((adm, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>{adm}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#9ca3af] italic">
            Final Diagnosis: You should probably not be left unsupervised in a fantasy realm.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 4. Interactive Roast Level Selector ─────────────────────
function RoastLevelSelector({ profile }: { profile: MovieProfile }) {
  const [level, setLevel] = useState<"friendly" | "savage" | "nuclear" | "unnecessary">("savage");
  const levels = profile.roastLevels || {
    friendly: "You tried your best with the tools available.",
    savage: profile.roast,
    nuclear: profile.harderRoast,
    unnecessary: "You are a walking OSHA violation in every realm.",
  };

  const tabs = [
    { id: "friendly" as const, label: "🙂 Friendly" },
    { id: "savage" as const, label: "😈 Savage" },
    { id: "nuclear" as const, label: "💀 Nuclear" },
    { id: "unnecessary" as const, label: "🔥 Unnecessary" },
  ];

  return (
    <div className="card-glass rounded-2xl border border-purple-500/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-purple-300 flex items-center gap-2">
          🔥 CHOOSE YOUR ROAST LEVEL
        </h3>
        <span className="text-[10px] text-[#9ca3af]">Adjust Severity</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setLevel(t.id)}
            className={`py-2 px-3 rounded-xl text-xs font-title font-bold transition-all ${
              level === t.id
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-black/30 text-[#9ca3af] hover:text-[#f0ece8] border border-white/5"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={level}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-black/40 border border-white/5 rounded-xl p-4 text-xs text-[#f0ece8] leading-relaxed italic"
        >
          "{levels[level]}"
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── 5. Movie Poster Card ────────────────────────────────────
function MoviePoster({ data }: { data: MovieData }) {
  const universe = UNIVERSES.find((u) => u.id === data.profile.universe);
  return (
    <div
      id="movie-poster"
      className="poster-card relative overflow-hidden rounded-3xl max-w-md mx-auto border border-yellow-400/30 shadow-2xl"
      style={{
        background: `linear-gradient(160deg, ${universe?.bgColor ?? "#0a0014"} 0%, #1a0030 60%, ${universe?.bgColor ?? "#0a0014"} 100%)`,
      }}
    >
      <div className="h-2 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

      <div className="p-6 sm:p-8 relative">
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-yellow-400 font-title uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            {universe?.name ?? data.profile.universe}
          </span>
          <span className="text-[#9ca3af] text-[10px] uppercase tracking-wider">
            {data.profile.kingdomName || "PlotTwist Originals"}
          </span>
        </div>

        <h2 className="font-dramatic text-2xl sm:text-3xl font-black text-yellow-400 leading-tight mb-2 glow-text-gold">
          {data.story.movieTitle}
        </h2>

        <p className="text-[#d1c8b8] italic text-sm mb-6 leading-relaxed">
          "{data.story.tagline}"
        </p>

        <div className="border-t border-yellow-400/20 mb-5" />

        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
              Starring
            </div>
            <div className="text-[#f0ece8] font-bold truncate">
              {data.profile.name}
            </div>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
              Roast Archetype
            </div>
            <div className="text-yellow-400 font-bold truncate">
              {data.profile.roastPersonality?.title || data.profile.archetypeLabel}
            </div>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
              Companion
            </div>
            <div className="text-[#f0ece8] font-bold truncate">
              {data.profile.companionLabel}
            </div>
          </div>
          <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
            <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
              Villain
            </div>
            <div className="text-red-400 font-bold truncate">
              {data.profile.villainLabel}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <span className="text-[#9ca3af] font-title uppercase tracking-wider">
            {data.story.genre}
          </span>
          <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
            <Star size={14} className="fill-yellow-400" />
            <span>4.9 / 5</span>
          </div>
        </div>
      </div>

      <div className="h-1.5 w-full bg-gradient-to-r from-purple-700 via-purple-400 to-cyan-400" />
    </div>
  );
}

// ─── 6. Share Suite with Viral Challenge Hook ────────────────
function ShareSuite({
  shareCode,
  movieTitle,
  name,
  roastScore,
}: {
  shareCode: string;
  movieTitle: string;
  name: string;
  roastScore: number;
}) {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://plottwist.app";
  const shareUrl = `${siteUrl}/movie/${shareCode}`;
  const shareText = `💀 I scored ${roastScore}/100 Roast Damage on PlotTwist! My movie is "${movieTitle}". Think you can make better decisions? Try it here:`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: movieTitle, text: shareText, url: shareUrl });
    }
  };

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/30 p-6 text-center">
      <h3 className="font-title font-bold text-base sm:text-lg uppercase tracking-widest text-yellow-400 mb-2">
        🔥 ROAST YOUR FRIENDS
      </h3>
      <p className="text-[#d1c8b8] text-xs max-w-md mx-auto mb-5 leading-relaxed">
        Send your movie to your friends or group chat and dare them to beat your <strong>{roastScore}/100 Roast Damage</strong>.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={copyLink}
          className="btn-primary flex items-center gap-2 text-xs py-2.5 px-5 shadow-lg"
        >
          {copied ? <><Link2 size={14} /> Copied Roast Link!</> : <><Copy size={14} /> Copy Roast Challenge</>}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4 text-green-400 border-green-500/30"
        >
          📱 WhatsApp Group
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4 text-sky-400 border-sky-500/30"
        >
          𝕏 Post on X
        </a>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={nativeShare}
            className="btn-secondary flex items-center gap-1.5 text-xs py-2.5 px-4"
          >
            <Share2 size={14} /> Share
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Movie Page Component ───────────────────────────────
export default function MoviePage() {
  const { shareCode } = useParams<{ shareCode: string }>();
  const router = useRouter();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIntroModal, setShowIntroModal] = useState(false);

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
          <p className="text-[#9ca3af] text-sm">Compiling your roast receipt and movie…</p>
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
    <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto space-y-8">
      {/* 1. Dramatic Step-by-Step Reveal Modal (shown once on fresh generate) */}
      <AnimatePresence>
        {showIntroModal && (
          <DramaticRevealModal
            data={movieData}
            onComplete={() => setShowIntroModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Top Navigation */}
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

      {/* 2. Main Movie Poster Card */}
      <MoviePoster data={movieData} />

      {/* 3. The Signature Roast Receipt Card */}
      <RoastReceiptCard profile={movieData.profile} />

      {/* 4. Worst Decision & Questionable Click Cards */}
      <WorstDecisionCards profile={movieData.profile} />

      {/* 5. Interactive Roast Level Selector */}
      <RoastLevelSelector profile={movieData.profile} />

      {/* 6. Cinematic Scenes & Story Showcase with Narrator Commentary */}
      <div className="card-glass rounded-3xl p-6 sm:p-8 border border-white/8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-title font-bold text-lg text-yellow-400 uppercase tracking-wide">
            🎬 THE CINEMATIC SCRIPT
          </h3>
          <p className="text-[#9ca3af] text-xs mt-1">
            Setting: <strong className="text-[#f0ece8]">{movieData.profile.kingdomName}</strong>
          </p>
        </div>

        {/* Scene 1 */}
        <div className="space-y-2">
          <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
            {movieData.story.characterIntroduction}
          </p>
        </div>

        {/* Live Audience Reaction #1 */}
        {movieData.profile.audienceReactions?.[0] && (
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-300 italic flex items-center gap-2">
            <span>👤</span>
            <strong>{movieData.profile.audienceReactions[0].user}:</strong> "{movieData.profile.audienceReactions[0].quote}"
          </div>
        )}

        {/* Scene 2 */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
            {movieData.story.currentChapter}
          </p>
        </div>

        {/* Narrator Interruption Box */}
        {movieData.profile.narratorInterruption && (
          <div className="bg-red-950/30 border border-red-500/40 rounded-2xl p-4 text-xs text-red-200 space-y-1 my-4">
            <div className="font-title font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              🛑 NARRATOR INTERRUPTION
            </div>
            <p className="leading-relaxed italic">
              {movieData.profile.narratorInterruption}
            </p>
          </div>
        )}

        {/* Quest & Encounter */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-[#d1c8b8] text-sm leading-relaxed">
            {movieData.story.quest}
          </p>
          <p className="text-[#d1c8b8] text-sm leading-relaxed">
            {movieData.story.villain}
          </p>
          <p className="text-[#d1c8b8] text-sm leading-relaxed">
            {movieData.story.companion}
          </p>
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

        {/* Scene 4: Climax & Ending */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
            {movieData.story.finalBattle}
          </p>
          <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
            {movieData.story.ending}
          </p>
        </div>
      </div>

      {/* 7. Share Challenge Suite */}
      <ShareSuite
        shareCode={movieData.shareCode}
        movieTitle={movieData.story.movieTitle}
        name={movieData.profile.name}
        roastScore={movieData.profile.roastReceipt?.totalDamage ?? 91}
      />

      {/* 8. Group Movie Viral Hook */}
      <div className="card-glass rounded-2xl border border-purple-500/30 p-6 text-center bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
        <div className="text-4xl mb-2">👥</div>
        <h3 className="font-title font-bold text-base sm:text-lg text-purple-300 uppercase tracking-wide mb-2">
          ROAST YOUR ENTIRE FRIEND GROUP
        </h3>
        <p className="text-[#d1c8b8] text-xs sm:text-sm max-w-md mx-auto mb-4 leading-relaxed">
          Create a group movie to discover who betrays everyone, who runs away first, and who dies in Chapter 1!
        </p>
        <Link
          href="/friends"
          className="btn-primary text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          <Users size={16} />
          CREATE GROUP MOVIE BATTLE
        </Link>
      </div>
    </div>
  );
}

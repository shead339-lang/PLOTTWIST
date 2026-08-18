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
  HeartCrack,
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
      icon: "🎭",
      title: "YOUR ROLE",
      subtitle: data.profile.archetypeLabel.toUpperCase(),
      body: `You wanted to be ${data.profile.preferredRole ? data.profile.preferredRole.replace("_", " ") : "the hero"}.\nThe algorithm strongly disagreed. 😂`,
      btnText: "WHAT IS MY BIGGEST PROBLEM? ⚠️",
    },
    {
      icon: "⚠️",
      title: "YOUR BIGGEST PROBLEM",
      subtitle: data.profile.weakness.toUpperCase(),
      body: `Congratulations.\nYou have the rare superpower of giving someone their 19th second chance while everyone else is screaming 'STOP'.`,
      btnText: "ENTER MY MOVIE 🎬",
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
            <p className="text-[#d1c8b8] text-base leading-relaxed whitespace-pre-line mb-8">
              {current.body}
            </p>

            <button
              onClick={handleNext}
              className="btn-primary w-full py-4 text-base font-title font-bold flex items-center justify-center gap-2 shadow-lg"
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

// ─── 2. Movie Poster Card ────────────────────────────────────
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
              Role
            </div>
            <div className="text-yellow-400 font-bold truncate">
              {data.profile.archetypeLabel}
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

// ─── 3. Production Budget & Financial Report ─────────────────
function ProductionBudgetCard({ profile }: { profile: MovieProfile }) {
  const rep = profile.productionReport || {
    budget: "₹12.00",
    spent: "₹11.73",
    remaining: "₹0.27",
    specialEffects: "Someone drew a dragon on MS Paint",
    actorSalary: "One samosa & tap water",
    dragonCgi: "We asked the dragon to act for free",
    openingWeekend: "₹847 Crore (Nobody understands how)",
  };

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🎥 OFFICIAL PRODUCTION REPORT
        </h3>
        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-400/20">
          Budget: {rep.budget}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase">Total Budget</div>
          <div className="font-title font-bold text-sm text-yellow-400">{rep.budget}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase">Actual Spent</div>
          <div className="font-title font-bold text-sm text-red-400">{rep.spent}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase">Remaining</div>
          <div className="font-title font-bold text-sm text-green-400">{rep.remaining}</div>
        </div>
      </div>

      <div className="space-y-2 text-xs text-[#9ca3af] bg-black/40 p-3.5 rounded-xl border border-white/5">
        <div>🎨 <strong>Special Effects:</strong> <span className="text-[#f0ece8]">{rep.specialEffects}</span></div>
        <div>🥪 <strong>Actor Salary:</strong> <span className="text-[#f0ece8]">{rep.actorSalary}</span></div>
        <div>🐉 <strong>Dragon CGI:</strong> <span className="text-[#f0ece8]">{rep.dragonCgi}</span></div>
        <div className="pt-2 border-t border-white/5 text-green-400 font-bold">
          💰 Opening Weekend: {rep.openingWeekend}
        </div>
      </div>
    </div>
  );
}

// ─── 4. Confused Critics Reviews ─────────────────────────────
function CriticsReviewsCard({ profile }: { profile: MovieProfile }) {
  const reviews = profile.criticsReviews || [];

  return (
    <div className="card-glass rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-purple-300 flex items-center gap-2">
          🍿 CRITICS ARE DEEPLY CONFUSED
        </h3>
        <span className="text-[10px] text-[#9ca3af]">Certified Entertaining</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reviews.map((rev) => (
          <div key={rev.publication} className="bg-black/30 p-3.5 rounded-xl border border-white/5 text-xs">
            <div className="flex justify-between items-center mb-1">
              <span className="font-title font-bold text-yellow-400">{rev.publication}</span>
              <span>{rev.stars}</span>
            </div>
            <p className="text-[#d1c8b8] italic mt-1 leading-relaxed">{rev.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5. Movie Survival Board ─────────────────────────────────
function MovieSurvivalBoard({ profile }: { profile: MovieProfile }) {
  const board = profile.survivalBoard || [];

  return (
    <div className="card-glass rounded-2xl border border-red-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-red-400 flex items-center gap-2">
          🎬 MOVIE SURVIVAL BOARD (WHO DIES FIRST?)
        </h3>
        <span className="text-[10px] text-[#6b7280]">Fictional Odds</span>
      </div>

      <div className="space-y-2">
        {board.map((item) => (
          <div
            key={item.entity}
            className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/5 text-xs"
          >
            <div>
              <span className="text-[#f0ece8] font-bold">{item.entity}</span>
              {item.note && (
                <span className="text-[#6b7280] text-[11px] block sm:inline sm:ml-2">
                  • {item.note}
                </span>
              )}
            </div>
            <span className={`font-title font-bold text-sm ${item.color || "text-yellow-400"}`}>
              {item.rate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 6. The AI Judges Your Answers ───────────────────────────
function AIJudgementCard({ profile }: { profile: MovieProfile }) {
  const judge = profile.aiJudgement || {
    answerQuality: "72%",
    commonSense: "14%",
    confidence: "96%",
    planning: "Not detected",
    riskOfMakingWorse: "89%",
    recommendation: "“Good luck. You are going to need it.”",
  };

  return (
    <div className="card-glass rounded-2xl border border-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-cyan-300 flex items-center gap-2">
          🤖 THE AI HAS REVIEWED YOUR ANSWERS
        </h3>
        <span className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20">
          Unfiltered Audit
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-4">
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280]">Answer Quality</div>
          <div className="font-title font-bold text-yellow-400">{judge.answerQuality}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280]">Common Sense</div>
          <div className="font-title font-bold text-red-400">{judge.commonSense}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280]">Confidence Level</div>
          <div className="font-title font-bold text-green-400">{judge.confidence}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#6b7280]">Evidence of Planning</div>
          <div className="font-title font-bold text-gray-400">{judge.planning}</div>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 col-span-2 sm:col-span-2">
          <div className="text-[10px] text-[#6b7280]">Likelihood of Making It Worse</div>
          <div className="font-title font-bold text-amber-400">{judge.riskOfMakingWorse}</div>
        </div>
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-3 text-xs text-[#d1c8b8] text-center">
        Final Recommendation: <strong className="text-yellow-400">{judge.recommendation}</strong>
      </div>
    </div>
  );
}

// ─── 7. Breaking News & Kingdom Alert ────────────────────────
function FakeNewsCard({ profile }: { profile: MovieProfile }) {
  const news = profile.fakeNews;
  const alertItem = profile.kingdomAlert;

  return (
    <div className="space-y-4">
      {news && (
        <div className="card-glass rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-2 text-xs text-yellow-400 font-title font-bold mb-2 uppercase tracking-wider">
            <Radio size={14} className="text-red-400 animate-pulse" />
            📰 BREAKING NEWS
          </div>
          <h4 className="font-title font-bold text-base text-[#f0ece8] mb-1">
            {news.headline}
          </h4>
          <div className="text-[10px] text-[#6b7280] mb-3">{news.dateline}</div>
          <p className="text-xs text-[#d1c8b8] leading-relaxed">{news.body}</p>
        </div>
      )}

      {alertItem && (
        <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 text-xs text-[#f0ece8]">
          <div className="text-red-400 font-title font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertTriangle size={14} />
            {alertItem.title}
          </div>
          <p className="mb-2">{alertItem.alertMessage}</p>
          <div className="text-[#9ca3af] italic text-[11px] border-t border-red-500/10 pt-2">
            Advisory: {alertItem.advisory}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 8. Fake Advertisement ───────────────────────────────────
function FakeAdCard({ profile }: { profile: MovieProfile }) {
  const ad = profile.fakeAd || {
    sponsor: "PROCRASTINATOR™",
    tagline: "Why solve today's problems today? Tomorrow is available.",
    disclaimer: "Procrastinator™ does not guarantee that tomorrow will be any better.",
  };

  return (
    <div className="border border-dashed border-yellow-400/40 bg-yellow-400/5 rounded-2xl p-4 text-center text-xs">
      <div className="text-[10px] text-[#9ca3af] uppercase tracking-widest mb-1">
        📺 THIS MOVIE IS BROUGHT TO YOU BY:
      </div>
      <div className="font-title font-black text-sm text-yellow-400 tracking-wide mb-1">
        {ad.sponsor}
      </div>
      <p className="text-[#f0ece8] italic mb-1">"{ad.tagline}"</p>
      <div className="text-[10px] text-[#6b7280]">{ad.disclaimer}</div>
    </div>
  );
}

// ─── 9. Fake Movie Merchandise ───────────────────────────────
function MerchandiseCard({ profile }: { profile: MovieProfile }) {
  const items = profile.merchandise || [];

  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          <ShoppingBag size={16} />
          🛍️ OFFICIAL MOVIE MERCHANDISE
        </h3>
        <span className="text-[10px] text-[#6b7280]">Limited Stock</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-start justify-between bg-black/30 p-3 rounded-xl border border-white/5 text-xs"
          >
            <div className="flex items-start gap-2.5">
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <div className="font-title font-bold text-[#f0ece8]">{item.name}</div>
                <div className="text-[#9ca3af] text-[11px] mt-0.5">{item.description}</div>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <div className="font-bold text-yellow-400">{item.price}</div>
              <span
                className={`text-[10px] ${
                  item.inStock ? "text-green-400" : "text-red-400 font-bold"
                }`}
              >
                {item.inStock ? "Add to Cart" : "OUT OF STOCK"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 10. The Ultimate Comedy Score ───────────────────────────
function UltimateComedyScoreCard({ profile }: { profile: MovieProfile }) {
  const score = profile.comedyScore || {
    comedy: 97,
    chaos: 84,
    commonSense: 6,
    plotArmor: 100,
    decisionQuality: 13,
    survival: 85,
    mainCharacterEnergy: 94,
    sequelChance: 99,
    verdict: "“Absolutely unnecessary. Would watch again.”",
  };

  const metrics = [
    { label: "Comedy Rating", val: score.comedy, color: "from-yellow-500 to-amber-400" },
    { label: "Chaos Level", val: score.chaos, color: "from-red-500 to-amber-500" },
    { label: "Common Sense", val: score.commonSense, color: "from-gray-500 to-gray-400" },
    { label: "Plot Armor", val: score.plotArmor, color: "from-purple-500 to-indigo-400" },
    { label: "Decision Quality", val: score.decisionQuality, color: "from-red-400 to-orange-400" },
    { label: "Main Character Energy", val: score.mainCharacterEnergy, color: "from-yellow-400 to-lime-400" },
    { label: "Probability of Causing Sequel", val: score.sequelChance, color: "from-cyan-400 to-blue-500" },
  ];

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/30 p-6 text-center">
      <div className="text-3xl mb-1">🤡</div>
      <h3 className="font-title font-bold text-base sm:text-lg uppercase tracking-wide text-yellow-400 mb-1">
        YOUR OFFICIAL LIFE MOVIE SCORE
      </h3>
      <p className="text-[#9ca3af] text-xs mb-6">Audited by our completely unqualified AI review board.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-black/30 p-3 rounded-xl border border-white/5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#d1c8b8]">{m.label}</span>
              <span className="font-title font-bold text-yellow-400">{m.val}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: `${m.val}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-4">
        <div className="text-[10px] text-yellow-400 font-title uppercase tracking-widest mb-1">
          OFFICIAL VERDICT
        </div>
        <div className="font-title font-bold text-base sm:text-lg text-[#f0ece8]">
          {score.verdict}
        </div>
      </div>
    </div>
  );
}

// ─── 11. Unreliable Stats ────────────────────────────────────
function UnreliableStats({ profile }: { profile: MovieProfile }) {
  const stats = profile.unreliableStats || [];

  return (
    <div className="card-glass rounded-2xl p-6 border border-white/8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🧪 YOUR COMPLETELY UNRELIABLE STATS
        </h3>
        <span className="text-[10px] text-[#6b7280] uppercase">100% Fictional</span>
      </div>

      <div className="space-y-4">
        {stats.map((st) => (
          <div key={st.label} className="bg-black/30 p-3.5 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-title font-bold text-[#f0ece8]">{st.label}</span>
              <span className="font-bold text-yellow-400">{st.percentage}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-yellow-500 to-amber-300 h-full rounded-full transition-all duration-1000"
                style={{ width: `${st.percentage}%` }}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] text-[#9ca3af] gap-1">
              <span>• {st.subStat1}</span>
              <span>• {st.subStat2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 12. Character Inventory ─────────────────────────────────
function InventoryCard({ profile }: { profile: MovieProfile }) {
  const items = profile.inventory || [];
  const secret = profile.secretItem || {
    name: "The Chair of Destiny",
    description: "Nobody knows why you have it. Makes villains sit down.",
    emoji: "🪑",
  };

  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🎒 CHARACTER INVENTORY & RELICS
        </h3>
        <span className="text-[10px] text-[#9ca3af]">RPG Power Grid</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/5 text-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <span>{item.emoji}</span>
              <span className="text-[#f0ece8] truncate">{item.name}</span>
            </div>
            <span className="text-yellow-400 font-bold ml-2">PWR {item.power}</span>
          </div>
        ))}
      </div>

      {/* Secret Item */}
      <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl p-3 flex items-start gap-3">
        <span className="text-2xl">{secret.emoji}</span>
        <div>
          <div className="text-yellow-400 text-xs font-title font-bold uppercase tracking-wider">
            SECRET ITEM UNLOCKED: {secret.name}
          </div>
          <div className="text-[#9ca3af] text-xs leading-relaxed mt-0.5">
            {secret.description}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 13. Roast Me Interactive Generator ──────────────────────
function RoastCard({ profile }: { profile: MovieProfile }) {
  const [showRoast, setShowRoast] = useState(false);
  const [harder, setHarder] = useState(false);

  return (
    <div className="card-glass rounded-2xl border border-red-500/20 p-6 text-center">
      <div className="text-3xl mb-2">🔥</div>
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-red-400 mb-2">
        THE KINGDOM ROASTS YOUR HERO
      </h3>
      <p className="text-[#9ca3af] text-xs mb-4">
        The citizens and villains have gathered to give their unfiltered feedback.
      </p>

      {!showRoast ? (
        <button
          id="btn-roast-me"
          onClick={() => setShowRoast(true)}
          className="btn-primary text-sm bg-gradient-to-r from-red-600 to-amber-600 border-red-500/40 py-2.5 px-6 mx-auto flex items-center gap-2"
        >
          <Flame size={16} />
          ROAST MY CHARACTER
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 border border-red-500/30 rounded-xl p-4 text-left text-xs leading-relaxed text-[#f0ece8] space-y-3"
        >
          <p className="text-amber-300 font-medium">{profile.roast}</p>

          {harder && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 font-semibold pt-2 border-t border-red-500/20"
            >
              🔥 <strong>HARDER ROAST:</strong> {profile.harderRoast}
            </motion.p>
          )}

          {!harder && (
            <button
              onClick={() => setHarder(true)}
              className="text-red-400 hover:text-red-300 text-xs underline font-bold mt-2 inline-block"
            >
              🔥 HARDER ROAST (Are you sure?)
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── 14. Random Event Clicker ────────────────────────────────
function RandomEventCard({ profile }: { profile: MovieProfile }) {
  const events = profile.randomEvents || [];
  const [index, setIndex] = useState<number | null>(null);

  const triggerEvent = () => {
    if (events.length === 0) return;
    const next = Math.floor(Math.random() * events.length);
    setIndex(next);
  };

  return (
    <div className="card-glass rounded-2xl border border-amber-500/20 p-6 text-center">
      <div className="text-3xl mb-2">🎲</div>
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-amber-300 mb-2">
        WHAT HAPPENS NEXT?
      </h3>
      <p className="text-[#9ca3af] text-xs mb-4">
        Roll the chaotic dice to see what unpredictable event strikes your story next.
      </p>

      <button
        onClick={triggerEvent}
        className="btn-secondary text-amber-300 border-amber-500/40 text-xs py-2 px-5 mx-auto flex items-center gap-2"
      >
        <Dices size={16} />
        {index === null ? "CLICK TO FIND OUT" : "ROLL AGAIN"}
      </button>

      {index !== null && events[index] && (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 mt-4 text-xs text-[#f0ece8] leading-relaxed"
        >
          {events[index]}
        </motion.div>
      )}
    </div>
  );
}

// ─── 15. Interactive Post-Credit Scene ───────────────────────
function PostCreditScene({ postCredit }: { postCredit: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="card-glass rounded-2xl border border-purple-500/30 p-6 text-center relative overflow-hidden">
      <div className="text-3xl mb-2">🎬</div>
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-purple-300 mb-2">
        WAIT... THERE IS SOMETHING AFTER THE CREDITS
      </h3>
      <p className="text-[#9ca3af] text-xs mb-4">
        Don't leave your seat yet. The director added a bonus scene.
      </p>

      {!revealed ? (
        <button
          id="btn-post-credit"
          onClick={() => setRevealed(true)}
          className="btn-primary text-sm py-2.5 px-6 mx-auto flex items-center gap-2"
        >
          🍿 WATCH POST-CREDIT SCENE
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/50 border border-purple-500/30 rounded-xl p-5 text-left text-xs leading-relaxed text-[#d1c8b8] space-y-3"
        >
          <div className="text-yellow-400 font-title font-bold uppercase tracking-wider">
            [OFFICIAL POST-CREDIT TEASER]
          </div>
          <p className="text-sm">{postCredit}</p>
          <div className="pt-3 border-t border-white/10 flex justify-end">
            <button
              onClick={() => alert("Part 2 is in production! Share with friends to speed up release.")}
              className="text-purple-300 hover:text-purple-200 text-xs font-bold underline"
            >
              🔥 TEASER FOR PART 2 →
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── 16. Share Suite ─────────────────────────────────────────
function ShareSuite({
  shareCode,
  movieTitle,
  name,
}: {
  shareCode: string;
  movieTitle: string;
  name: string;
}) {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://plottwist.app";
  const shareUrl = `${siteUrl}/movie/${shareCode}`;
  const shareText = `I turned my life into a movie 🎬 Apparently my movie is "${movieTitle}". Find out what YOUR movie is:`;

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
    <div className="card-glass rounded-2xl border border-white/8 p-6 text-center">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-2">
        SHARE YOUR MOVIE
      </h3>
      <p className="text-[#9ca3af] text-xs mb-4">
        Dare your friends to see what ridiculous movie they get.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={copyLink}
          className="btn-primary flex items-center gap-2 text-xs py-2 px-4"
        >
          {copied ? <><Link2 size={14} /> Copied Link!</> : <><Copy size={14} /> Copy Movie Link</>}
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-4 text-green-400 border-green-500/30"
        >
          📱 WhatsApp
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-4 text-sky-400 border-sky-500/30"
        >
          𝕏 Post on X
        </a>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={nativeShare}
            className="btn-secondary flex items-center gap-1.5 text-xs py-2 px-4"
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
          <p className="text-[#9ca3af] text-sm">Preparing your cinematic masterpiece…</p>
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

      {/* 3. Absurd Production Budget Card */}
      <ProductionBudgetCard profile={movieData.profile} />

      {/* 4. Confused Critics Reviews Card */}
      <CriticsReviewsCard profile={movieData.profile} />

      {/* 5. Cinematic Scenes & Story Showcase with Narrator Commentary */}
      <div className="card-glass rounded-3xl p-6 sm:p-8 border border-white/8 space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h3 className="font-title font-bold text-lg text-yellow-400 uppercase tracking-wide">
            🎬 THE CINEMATIC STORY
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

        {/* Fake Ad in between story */}
        <FakeAdCard profile={movieData.profile} />

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

        {/* Live Audience Reaction #2 */}
        {movieData.profile.audienceReactions?.[1] && (
          <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 text-xs text-purple-300 italic flex items-center gap-2">
            <span>👤</span>
            <strong>{movieData.profile.audienceReactions[1].user}:</strong> "{movieData.profile.audienceReactions[1].quote}"
          </div>
        )}

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

      {/* 6. The Ultimate Comedy Score Card */}
      <UltimateComedyScoreCard profile={movieData.profile} />

      {/* 7. Completely Unreliable Stats */}
      <UnreliableStats profile={movieData.profile} />

      {/* 8. Character Inventory & Secret Item */}
      <InventoryCard profile={movieData.profile} />

      {/* 9. Movie Survival Board */}
      <MovieSurvivalBoard profile={movieData.profile} />

      {/* 10. The AI Judges Your Answers */}
      <AIJudgementCard profile={movieData.profile} />

      {/* 11. Breaking News & Kingdom Alert */}
      <FakeNewsCard profile={movieData.profile} />

      {/* 12. Official Movie Merchandise Shop */}
      <MerchandiseCard profile={movieData.profile} />

      {/* 13. Roast Me Generator */}
      <RoastCard profile={movieData.profile} />

      {/* 14. Random Event Clicker */}
      <RandomEventCard profile={movieData.profile} />

      {/* 15. Interactive Post-Credit Scene */}
      <PostCreditScene postCredit={movieData.story.postCreditScene} />

      {/* 16. Viral Friend Hook */}
      <div className="card-glass rounded-2xl border border-purple-500/30 p-6 text-center bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
        <div className="text-4xl mb-2">👀</div>
        <h3 className="font-title font-bold text-base sm:text-lg text-purple-300 uppercase tracking-wide mb-2">
          WE FOUND SOMETHING SUSPICIOUS...
        </h3>
        <p className="text-[#d1c8b8] text-xs sm:text-sm max-w-md mx-auto mb-4 leading-relaxed">
          Someone in your friend group has an <strong>82% probability of betraying everyone</strong>.
          Add your friends to generate a group movie and find out who it is!
        </p>
        <Link
          href="/friends"
          className="btn-primary text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2"
        >
          <Users size={16} />
          MAKE A MOVIE WITH FRIENDS
        </Link>
      </div>

      {/* 17. Share Suite */}
      <ShareSuite
        shareCode={movieData.shareCode}
        movieTitle={movieData.story.movieTitle}
        name={movieData.profile.name}
      />
    </div>
  );
}

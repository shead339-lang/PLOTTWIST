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
      body: "We have some concerns. 💀",
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

// ─── 3. Box Office Projection & Rotten Tomatoes Card ─────────
function BoxOfficeCard({ profile }: { profile: MovieProfile }) {
  const box = profile.boxOffice || {
    audienceRating: "⭐⭐⭐⭐⭐ (4.9/5)",
    chaosRating: "🔥🔥🔥🔥🔥 (11/10)",
    survivalProbability: "☠️ 31%",
    criticalReview:
      '"Nobody knows what actually happened, but somehow it was the most entertaining spectacle of the decade."',
    openingWeekend: "₹847 Crore",
    productionBudget: "₹12",
    profit: "Absolutely Ridiculous",
  };

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🍿 BOX OFFICE & CRITICAL RECEPTION
        </h3>
        <span className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-400/20">
          Certified Chaotic
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center mb-5">
        <div className="bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-1">
            Audience Score
          </div>
          <div className="font-title font-bold text-sm text-yellow-400">
            {box.audienceRating}
          </div>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-1">
            Chaos Level
          </div>
          <div className="font-title font-bold text-sm text-red-400">
            {box.chaosRating}
          </div>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-white/5">
          <div className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-1">
            Survival Odds
          </div>
          <div className="font-title font-bold text-sm text-purple-400">
            {box.survivalProbability}
          </div>
        </div>
      </div>

      <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3.5 mb-4 text-xs text-[#d1c8b8] italic">
        {box.criticalReview}
      </div>

      <div className="grid grid-cols-3 gap-2 text-[11px] text-[#9ca3af] border-t border-white/8 pt-3">
        <div>
          Opening: <strong className="text-[#f0ece8]">{box.openingWeekend}</strong>
        </div>
        <div>
          Budget: <strong className="text-[#f0ece8]">{box.productionBudget}</strong>
        </div>
        <div>
          Profit: <strong className="text-green-400">{box.profit}</strong>
        </div>
      </div>
    </div>
  );
}

// ─── 4. Completely Unreliable Stats ──────────────────────────
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

// ─── 5. Current Life Problems as Movie Mechanics ─────────────
function LifeMechanicsCard({ profile }: { profile: MovieProfile }) {
  const mech = profile.lifeMechanics || {
    status: profile.situation.toUpperCase(),
    difficulty: "☠️☠️☠️☠️☠️",
    mission: "Somehow get your life under control before Tuesday",
    progressPercent: 38,
    boss: "THE DEADLINE",
    specialAbility: '"I\'ll start tomorrow."',
    abilityEffectiveness: "2%",
  };

  return (
    <div className="card-glass rounded-2xl border border-purple-500/20 p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-purple-300 flex items-center gap-2">
          🌪️ CURRENT LIFE STATUS AS MOVIE MECHANICS
        </h3>
        <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20">
          Difficulty: {mech.difficulty}
        </span>
      </div>

      <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 text-xs">
        <div>
          <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
            Current Status
          </div>
          <div className="text-yellow-400 font-title font-bold text-sm">
            {mech.status}
          </div>
        </div>

        <div>
          <div className="text-[#6b7280] uppercase tracking-wider text-[10px] mb-0.5">
            Current Mission
          </div>
          <div className="text-[#f0ece8] leading-relaxed">{mech.mission}</div>
        </div>

        <div>
          <div className="flex justify-between text-[11px] text-[#9ca3af] mb-1">
            <span>Mission Progress</span>
            <span>{mech.progressPercent}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full"
              style={{ width: `${mech.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-[#6b7280]">Boss Encounter: </span>
            <span className="text-red-400 font-bold">{mech.boss}</span>
          </div>
          <div>
            <span className="text-[#6b7280]">Special Ability: </span>
            <span className="text-yellow-400">{mech.specialAbility} </span>
            <span className="text-gray-400">({mech.abilityEffectiveness} effective)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 6. Character Inventory ──────────────────────────────────
function InventoryCard({ profile }: { profile: MovieProfile }) {
  const items = profile.inventory || [];
  const secret = profile.secretItem || {
    name: "The Chair of Destiny",
    description: "Nobody knows why you have it. Somehow it keeps saving you.",
    emoji: "🪑",
  };

  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🎒 CHARACTER INVENTORY
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

// ─── 7. Totally Scientific Future (Prophecies) ───────────────
function ScientificFutureCard({ profile }: { profile: MovieProfile }) {
  const events = profile.scientificFuture || [];

  return (
    <div className="card-glass rounded-2xl border border-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-cyan-300 flex items-center gap-2">
          🔮 YOUR TOTALLY SCIENTIFIC FUTURE
        </h3>
        <span className="text-[10px] text-[#6b7280]">100% Unreliable</span>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.timeframe} className="bg-black/30 p-3 rounded-xl border border-white/5 text-xs">
            <div className="text-cyan-400 font-title font-bold uppercase tracking-wider mb-1">
              {ev.timeframe}
            </div>
            <div className="text-[#d1c8b8] leading-relaxed">{ev.prediction}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 8. Roast Me Interactive Generator ───────────────────────
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

// ─── 9. Achievements Unlocked ────────────────────────────────
function AchievementsCard({ profile }: { profile: MovieProfile }) {
  const achievements = profile.achievements || [];

  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 flex items-center gap-2">
          🏆 ACHIEVEMENTS UNLOCKED
        </h3>
        <span className="text-[10px] text-[#9ca3af]">Screenshot Ready</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-white/5"
          >
            <span className="text-2xl flex-shrink-0">{ach.icon}</span>
            <div>
              <div className="text-yellow-400 font-title font-bold text-xs">
                {ach.title}
              </div>
              <div className="text-[#9ca3af] text-[11px] leading-relaxed mt-0.5">
                {ach.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 10. Random Event Clicker ────────────────────────────────
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

// ─── 11. Interactive Post-Credit Scene ───────────────────────
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

// ─── 12. Interactive Decision / Plot Continuation ───────────
const CHOICES = [
  { id: "fight", emoji: "⚔️", label: "Fight Immediately", desc: "Charge directly into battle." },
  { id: "accept", emoji: "⚡", label: "Accept the Power", desc: "Take what's offered. Deal with it later." },
  { id: "save_friend", emoji: "🤝", label: "Save Your Companion", desc: "Risk everything for the one who matters." },
  { id: "trick", emoji: "😏", label: "Trick the Villain", desc: "Too clever for a fair fight. Probably." },
];

function InteractiveDecision({
  shareCode,
  profile,
}: {
  shareCode: string;
  profile: MovieProfile;
  story: StoryResult;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [continuation, setContinuation] = useState<{
    continuationTitle: string;
    continuation: string;
    cliffhanger: string;
  } | null>(null);

  const handleChoice = async (choiceId: string) => {
    if (loading) return;
    setSelected(choiceId);
    setLoading(true);
    try {
      const res = await fetch("/api/continue-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareCode, choice: choiceId }),
      });
      const data = await res.json();
      if (data.success) setContinuation(data.continuation);
    } catch {
      setContinuation({
        continuationTitle: "The Choice That Changed Everything",
        continuation: `${profile.name} made their decision. The ${profile.villainLabel} did not see it coming. Neither did ${profile.companionLabel}. The story continued in a direction nobody had predicted — which, considering everything that had happened so far, was fitting.`,
        cliffhanger: "The dust settled. The question remained: was it really over?",
      });
    }
    setLoading(false);
  };

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/20 overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 p-5">
        <div className="text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-title text-base sm:text-lg font-bold text-yellow-400 uppercase tracking-wide">
            THE VILLAIN OFFERS A PACT: WHAT DO YOU DO?
          </h3>
          <p className="text-[#9ca3af] text-xs mt-1">
            This is the moment that defines your sequel. Choose wisely.
          </p>
        </div>
      </div>

      {!continuation ? (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHOICES.map((choice) => (
            <button
              key={choice.id}
              id={`choice-${choice.id}`}
              onClick={() => handleChoice(choice.id)}
              disabled={loading}
              className={`option-card flex flex-col gap-1.5 ${
                selected === choice.id && loading ? "selected shimmer" : ""
              } ${loading && selected !== choice.id ? "opacity-40" : ""}`}
            >
              <span className="text-2xl">{choice.emoji}</span>
              <span className="font-title font-bold text-xs text-[#f0ece8]">{choice.label}</span>
              <span className="text-[#9ca3af] text-[11px]">{choice.desc}</span>
            </button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-5">
          <h4 className="font-title font-bold text-yellow-400 text-xs uppercase tracking-widest mb-2">
            {continuation.continuationTitle}
          </h4>
          <p className="text-[#d1c8b8] leading-relaxed mb-3 text-xs">
            {continuation.continuation}
          </p>
          {continuation.cliffhanger && (
            <div className="border-l-2 border-purple-500/50 pl-3">
              <p className="text-purple-300 italic text-xs">{continuation.cliffhanger}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── 13. Alternate Endings ───────────────────────────────────
function AlternateEndings({ shareCode }: { shareCode: string }) {
  const [activeEnding, setActiveEnding] = useState<string | null>(null);
  const [loadingEnding, setLoadingEnding] = useState<string | null>(null);
  const [endings, setEndings] = useState<
    Record<string, { endingTitle: string; ending: string; finalLine: string }>
  >({});

  const ENDING_TYPES = [
    { id: "hero", emoji: "🏆", label: "Hero Ending", desc: "Triumph over everything." },
    { id: "dark", emoji: "💀", label: "Dark Ending", desc: "Victory has a price." },
    { id: "funny", emoji: "😂", label: "Funny Ending", desc: "Win in the most ridiculous way." },
  ];

  const loadEnding = async (type: string) => {
    if (endings[type]) {
      setActiveEnding(type);
      return;
    }
    setLoadingEnding(type);
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareCode, endingType: type }),
      });
      const data = await res.json();
      if (data.success) {
        setEndings((prev) => ({ ...prev, [type]: data.alternateEnding }));
      }
    } catch {
      setEndings((prev) => ({
        ...prev,
        [type]: {
          endingTitle: `The ${type.toUpperCase()} Ending`,
          ending:
            "The story concluded in a way that perfectly matched the chaotic energy of everything that came before it.",
          finalLine: "The end.",
        },
      }));
    }
    setLoadingEnding(null);
    setActiveEnding(type);
  };

  return (
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-[#9ca3af] mb-4">
        🎭 ALTERNATE ENDINGS
      </h3>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {ENDING_TYPES.map((e) => (
          <button
            key={e.id}
            id={`ending-${e.id}`}
            onClick={() => loadEnding(e.id)}
            disabled={loadingEnding === e.id}
            className={`option-card text-center flex flex-col items-center gap-1.5 py-3 ${
              activeEnding === e.id ? "selected" : ""
            } ${loadingEnding === e.id ? "shimmer" : ""}`}
          >
            <span className="text-xl">{e.emoji}</span>
            <span className="text-[11px] font-title font-bold text-[#f0ece8] leading-tight">
              {e.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeEnding && endings[activeEnding] && (
          <motion.div
            key={activeEnding}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/8 pt-3 text-xs"
          >
            <h4 className="font-title font-bold text-yellow-400 text-xs uppercase tracking-widest mb-2">
              {endings[activeEnding].endingTitle}
            </h4>
            <p className="text-[#d1c8b8] leading-relaxed mb-2">
              {endings[activeEnding].ending}
            </p>
            <p className="text-yellow-400/80 italic">"{endings[activeEnding].finalLine}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 14. Movie Awards ────────────────────────────────────────
function MovieAwards({ profile }: { profile: MovieProfile }) {
  const awards = profile.awards || [
    { icon: "🥇", title: "Best Accidental Hero", subtitle: "Defeated destiny on pure improvisation" },
    { icon: "🏆", title: "Most Unnecessary Plot Twist", subtitle: "Even the narrator was visibly surprised" },
    { icon: "🏆", title: "Best Use of a Questionable Weapon", subtitle: "Executed with 100% confidence" },
    { icon: "🏆", title: "Most Likely to Survive by Accident", subtitle: "100% survival rate" },
  ];

  return (
    <div className="card-glass rounded-2xl border border-yellow-400/20 p-6">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-4 flex items-center gap-2">
        <Award size={16} />
        YOUR MOVIE AWARDS
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {awards.map((aw) => (
          <div
            key={aw.title}
            className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/5"
          >
            <span className="text-2xl">{aw.icon}</span>
            <div>
              <div className="text-[#f0ece8] font-title font-bold text-xs">{aw.title}</div>
              <div className="text-[#9ca3af] text-[11px]">{aw.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 15. Share Suite ─────────────────────────────────────────
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
      // Try session storage first
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

      // Fetch from API
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

      {/* 3. Box Office & Ratings Card */}
      <BoxOfficeCard profile={movieData.profile} />

      {/* 4. Cinematic Scenes & Story Showcase */}
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

        {/* Scene 2 */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <p className="text-[#d1c8b8] text-sm leading-relaxed whitespace-pre-line">
            {movieData.story.currentChapter}
          </p>
        </div>

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

      {/* 5. Completely Unreliable Stats */}
      <UnreliableStats profile={movieData.profile} />

      {/* 6. Life Mechanics */}
      <LifeMechanicsCard profile={movieData.profile} />

      {/* 7. Character Inventory & Secret Item */}
      <InventoryCard profile={movieData.profile} />

      {/* 8. Totally Scientific Future (Prophecies) */}
      <ScientificFutureCard profile={movieData.profile} />

      {/* 9. Roast Me Generator */}
      <RoastCard profile={movieData.profile} />

      {/* 10. Achievements */}
      <AchievementsCard profile={movieData.profile} />

      {/* 11. Random Event Clicker */}
      <RandomEventCard profile={movieData.profile} />

      {/* 12. Interactive Post-Credit Scene */}
      <PostCreditScene postCredit={movieData.story.postCreditScene} />

      {/* 13. Interactive Climax Decision */}
      <InteractiveDecision
        shareCode={movieData.shareCode}
        profile={movieData.profile}
        story={movieData.story}
      />

      {/* 14. Alternate Endings */}
      <AlternateEndings shareCode={movieData.shareCode} />

      {/* 15. Viral Friend Hook: "Someone is suspicious" */}
      <div className="card-glass rounded-2xl border border-purple-500/30 p-6 text-center bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
        <div className="text-4xl mb-2">👀</div>
        <h3 className="font-title font-bold text-base sm:text-lg text-purple-300 uppercase tracking-wide mb-2">
          WE FOUND SOMETHING SUSPICIOUS...
        </h3>
        <p className="text-[#d1c8b8] text-xs sm:text-sm max-w-md mx-auto mb-4 leading-relaxed">
          Someone in your friend group has an <strong>87% probability of betraying everyone</strong>.
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

      {/* 16. Movie Awards */}
      <MovieAwards profile={movieData.profile} />

      {/* 17. Share Suite */}
      <ShareSuite
        shareCode={movieData.shareCode}
        movieTitle={movieData.story.movieTitle}
        name={movieData.profile.name}
      />
    </div>
  );
}

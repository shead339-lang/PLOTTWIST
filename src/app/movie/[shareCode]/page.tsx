"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Link2, Users, Film, RefreshCw, ChevronDown, Star, Zap } from "lucide-react";
import type { MovieProfile } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";
import { UNIVERSES } from "@/data/universes";

// ─── Types ───────────────────────────────────────────────────
interface MovieData {
  shareCode: string;
  profile: MovieProfile;
  story: StoryResult;
}

// ─── Movie Poster Card ───────────────────────────────────────
function MoviePoster({ data }: { data: MovieData }) {
  const universe = UNIVERSES.find((u) => u.id === data.profile.universe);
  return (
    <div
      id="movie-poster"
      className="poster-card relative overflow-hidden rounded-2xl max-w-sm mx-auto"
      style={{
        background: `linear-gradient(160deg, ${universe?.bgColor ?? "#0a0014"} 0%, #1a0030 60%, ${universe?.bgColor ?? "#0a0014"} 100%)`,
      }}
    >
      {/* Top decoration */}
      <div className="h-1.5 w-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />

      <div className="p-6 pb-8 relative">
        {/* Universe badge */}
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-yellow-400/70 font-title uppercase tracking-widest">
            {universe?.name ?? data.profile.universe}
          </span>
          <span className="text-[#6b7280]">PLOTTWIST ORIGINALS</span>
        </div>

        {/* Title */}
        <h2 className="font-dramatic text-xl sm:text-2xl font-black text-yellow-400 leading-tight mb-2 glow-text-gold">
          {data.story.movieTitle}
        </h2>

        {/* Tagline */}
        <p className="text-[#9ca3af] italic text-sm mb-5">
          "{data.story.tagline}"
        </p>

        {/* Divider */}
        <div className="border-t border-yellow-400/20 mb-4" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-xs">
          <div>
            <div className="text-[#6b7280] uppercase tracking-wider mb-0.5">Starring</div>
            <div className="text-[#f0ece8] font-bold">{data.profile.name}</div>
          </div>
          <div>
            <div className="text-[#6b7280] uppercase tracking-wider mb-0.5">Role</div>
            <div className="text-[#f0ece8] font-bold">{data.profile.archetypeLabel}</div>
          </div>
          <div>
            <div className="text-[#6b7280] uppercase tracking-wider mb-0.5">Power</div>
            <div className="text-yellow-400 font-bold">{data.profile.power}</div>
          </div>
          <div>
            <div className="text-[#6b7280] uppercase tracking-wider mb-0.5">Villain</div>
            <div className="text-red-400 font-bold">{data.profile.villainLabel}</div>
          </div>
        </div>

        {/* Genre + Rating */}
        <div className="flex items-center justify-between">
          <span className="text-[#9ca3af] text-xs font-title uppercase tracking-wider">
            {data.story.genre}
          </span>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-sm font-bold">
              {(7 + (data.profile.scores.bravery + data.profile.scores.humor) / 66).toFixed(1)}
            </span>
            <span className="text-[#6b7280] text-xs">/ 10</span>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-700 via-purple-400 to-cyan-400" />
    </div>
  );
}

// ─── Character Stats ─────────────────────────────────────────
const STAT_CONFIG = [
  { key: "bravery", label: "Bravery", color: "#ef4444" },
  { key: "intelligence", label: "Intelligence", color: "#06b6d4" },
  { key: "chaos", label: "Chaos", color: "#f59e0b" },
  { key: "humor", label: "Humor", color: "#10b981" },
  { key: "mystery", label: "Mystery", color: "#8b5cf6" },
  { key: "darkness", label: "Darkness", color: "#6366f1" },
] as const;

function CharacterStats({ profile }: { profile: MovieProfile }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="card-glass rounded-2xl p-6 border border-white/8">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-5">
        Character Attributes
      </h3>
      <div className="flex flex-col gap-4">
        {STAT_CONFIG.map(({ key, label, color }) => {
          const val = profile.scores[key] ?? 0;
          return (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#9ca3af] font-medium">{label}</span>
                <span style={{ color }} className="font-bold">{val}</span>
              </div>
              <div className="stat-bar">
                <motion.div
                  className="stat-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: visible ? `${val}%` : "0%" }}
                  transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                  style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/8 mt-5 pt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-[#6b7280] mb-1">Archetype</div>
          <div className="text-[#f0ece8] font-semibold">{profile.archetypeLabel}</div>
        </div>
        <div>
          <div className="text-[#6b7280] mb-1">Story Tone</div>
          <div className="text-[#f0ece8] font-semibold capitalize">{profile.storyTone.replace("_", " ")}</div>
        </div>
        <div>
          <div className="text-[#6b7280] mb-1">Companion</div>
          <div className="text-yellow-400 font-semibold">{profile.companionLabel}</div>
        </div>
        <div>
          <div className="text-[#6b7280] mb-1">Weakness</div>
          <div className="text-red-400 font-semibold">{profile.weakness}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Story Section ───────────────────────────────────────────
function StorySection({ title, content, delay = 0 }: { title: string; content: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="story-section"
    >
      <h3 className="text-yellow-400/80 text-xs font-title uppercase tracking-[0.2em] mb-2">
        {title}
      </h3>
      <p className="text-[#d1c8b8] leading-relaxed text-base">{content}</p>
    </motion.div>
  );
}

// ─── Plot Twist Card ─────────────────────────────────────────
function PlotTwistCard({ twist }: { twist: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="twist-card p-6 text-center">
      <div className="text-3xl mb-3">🌀</div>
      <h3 className="font-title text-lg font-bold text-purple-300 mb-3 uppercase tracking-wider">
        PLOT TWIST
      </h3>
      {!revealed ? (
        <div>
          <p className="text-[#9ca3af] text-sm mb-4">
            Something unexpected is coming. Are you sure you want to know?
          </p>
          <button
            id="reveal-plot-twist"
            onClick={() => setRevealed(true)}
            className="btn-secondary text-purple-300 border-purple-500/40 hover:border-purple-400"
          >
            ⚡ REVEAL THE TWIST
          </button>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[#f0ece8] text-lg font-medium leading-relaxed"
        >
          {twist}
        </motion.p>
      )}
    </div>
  );
}

// ─── Interactive Decision ────────────────────────────────────
const CHOICES = [
  { id: "fight", emoji: "⚔️", label: "Fight the Dark Lord", desc: "Charge directly into battle." },
  { id: "accept", emoji: "⚡", label: "Accept the Power", desc: "Take what's offered. Deal with it later." },
  { id: "save_friend", emoji: "🤝", label: "Save Your Friend", desc: "Risk everything for the one who matters." },
  { id: "trick", emoji: "😏", label: "Trick the Dark Lord", desc: "Too clever for a fair fight. Probably." },
];

function InteractiveDecision({
  shareCode,
  profile,
  story,
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
      // Fallback continuation
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
          <h3 className="font-title text-xl font-bold text-yellow-400 uppercase tracking-wide">
            THE DARK LORD OFFERS UNLIMITED POWER
          </h3>
          <p className="text-[#9ca3af] text-sm mt-1">
            This is the moment that defines your story. What do you do?
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
              className={`option-card flex flex-col gap-2 ${
                selected === choice.id && loading ? "selected shimmer" : ""
              } ${loading && selected !== choice.id ? "opacity-40" : ""}`}
            >
              <span className="text-2xl">{choice.emoji}</span>
              <span className="font-title font-bold text-sm text-[#f0ece8]">{choice.label}</span>
              <span className="text-[#9ca3af] text-xs">{choice.desc}</span>
            </button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5"
        >
          <h4 className="font-title font-bold text-yellow-400 text-sm uppercase tracking-widest mb-3">
            {continuation.continuationTitle}
          </h4>
          <p className="text-[#d1c8b8] leading-relaxed mb-4 text-sm">
            {continuation.continuation}
          </p>
          {continuation.cliffhanger && (
            <div className="border-l-2 border-purple-500/50 pl-4">
              <p className="text-purple-300 italic text-sm">{continuation.cliffhanger}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// ─── Alternate Endings ───────────────────────────────────────
function AlternateEndings({ shareCode }: { shareCode: string }) {
  const [activeEnding, setActiveEnding] = useState<string | null>(null);
  const [loadingEnding, setLoadingEnding] = useState<string | null>(null);
  const [endings, setEndings] = useState<Record<string, { endingTitle: string; ending: string; finalLine: string }>>({});

  const ENDING_TYPES = [
    { id: "hero", emoji: "🏆", label: "Hero Ending", desc: "Triumph over everything." },
    { id: "dark", emoji: "💀", label: "Dark Ending", desc: "Victory has a price." },
    { id: "funny", emoji: "😂", label: "Funny Ending", desc: "Win in the most ridiculous way." },
  ];

  const loadEnding = async (type: string) => {
    if (endings[type]) { setActiveEnding(type); return; }
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
          endingTitle: `The ${type} Ending`,
          ending: "The story concluded in a way that perfectly matched everything that came before it.",
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
        Alternate Endings
      </h3>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {ENDING_TYPES.map((e) => (
          <button
            key={e.id}
            id={`ending-${e.id}`}
            onClick={() => loadEnding(e.id)}
            disabled={loadingEnding === e.id}
            className={`option-card text-center flex flex-col items-center gap-2 py-4 ${
              activeEnding === e.id ? "selected" : ""
            } ${loadingEnding === e.id ? "shimmer" : ""}`}
          >
            <span className="text-xl">{e.emoji}</span>
            <span className="text-xs font-title font-bold text-[#f0ece8] leading-tight">
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
            className="border-t border-white/8 pt-4"
          >
            <h4 className="font-title font-bold text-yellow-400 text-sm uppercase tracking-widest mb-3">
              {endings[activeEnding].endingTitle}
            </h4>
            <p className="text-[#d1c8b8] text-sm leading-relaxed mb-3">
              {endings[activeEnding].ending}
            </p>
            <p className="text-yellow-400/80 italic text-sm">
              "{endings[activeEnding].finalLine}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Share Buttons ───────────────────────────────────────────
function ShareButtons({ shareCode, movieTitle, name }: { shareCode: string; movieTitle: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://plottwist.app";
  const shareUrl = `${siteUrl}/movie/${shareCode}`;
  const shareText = `I turned my life into a movie 🎬 Apparently I'm ${name} in "${movieTitle}". Find out what YOUR movie is:`;

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
    <div className="card-glass rounded-2xl border border-white/8 p-6">
      <h3 className="font-title font-bold text-sm uppercase tracking-widest text-[#9ca3af] mb-4">
        Share Your Movie
      </h3>
      <p className="text-[#9ca3af] text-sm mb-4">
        Dare your friends to find out their movie. The viral loop starts here.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          id="share-copy"
          onClick={copyLink}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          {copied ? <><Link2 size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
        </button>

        <a
          id="share-whatsapp"
          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 text-sm text-green-400 border-green-500/30 hover:border-green-400"
        >
          📱 WhatsApp
        </a>

        <a
          id="share-twitter"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center gap-2 text-sm text-sky-400 border-sky-500/30 hover:border-sky-400"
        >
          𝕏 Post on X
        </a>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            id="share-native"
            onClick={nativeShare}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Share2 size={14} /> Share
          </button>
        )}
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

  useEffect(() => {
    async function loadMovie() {
      // Try session storage first (fresh from generation)
      const raw = sessionStorage.getItem("plottwist-result");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed.shareCode === shareCode) {
            setMovieData(parsed);
            setLoading(false);
            return;
          }
        } catch {
          // fall through to API
        }
      }

      // Fetch from API (shared link)
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
          <p className="text-[#9ca3af]">Loading your movie…</p>
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
          <p className="text-[#9ca3af] mb-6">This movie link may have expired.</p>
          <button onClick={() => router.push("/quiz")} className="btn-primary">
            Create Your Own Movie
          </button>
        </div>
      </div>
    );
  }

  const { profile, story } = movieData;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-xs font-title uppercase tracking-widest text-yellow-400/60 mb-2">
            PlotTwist Originals Presents
          </div>
          <h1 className="font-dramatic text-3xl sm:text-5xl font-black text-gold-gradient glow-text-gold leading-tight mb-3">
            {story.movieTitle}
          </h1>
          <p className="text-[#9ca3af] text-lg italic">"{story.tagline}"</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Film size={14} className="text-yellow-400/60" />
            <span className="text-yellow-400/70 text-sm font-title">{story.genre}</span>
          </div>
        </motion.div>

        {/* ── POSTER + STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <MoviePoster data={movieData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CharacterStats profile={profile} />
          </motion.div>
        </div>

        {/* ── STORY ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-glass rounded-2xl border border-white/8 p-6 mb-6"
        >
          <h2 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-6">
            Your Cinematic Story
          </h2>
          <StorySection title="The Beginning" content={story.characterIntroduction} delay={0} />
          <StorySection title="Current Chapter" content={story.currentChapter} delay={0.05} />
          <StorySection title="The Quest" content={story.quest} delay={0.1} />
          <StorySection title="The Villain" content={story.villain} delay={0.15} />
          <StorySection title="Your Companion" content={story.companion} delay={0.2} />
        </motion.div>

        {/* ── PLOT TWIST ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-6"
        >
          <PlotTwistCard twist={story.plotTwist} />
        </motion.div>

        {/* Continue story sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass rounded-2xl border border-white/8 p-6 mb-6"
        >
          <StorySection title="The Final Battle" content={story.finalBattle} />
          <StorySection title="The Ending" content={story.ending} />
          {story.postCreditScene && (
            <div className="mt-6 pt-4 border-t border-white/8">
              <div className="text-xs font-title uppercase tracking-widest text-[#6b7280] mb-2">
                Post-Credit Scene
              </div>
              <p className="text-[#9ca3af] italic text-sm leading-relaxed">
                {story.postCreditScene}
              </p>
            </div>
          )}
        </motion.div>

        {/* ── INTERACTIVE DECISION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-6"
        >
          <InteractiveDecision
            shareCode={shareCode}
            profile={profile}
            story={story}
          />
        </motion.div>

        {/* ── ALTERNATE ENDINGS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <AlternateEndings shareCode={shareCode} />
        </motion.div>

        {/* ── SHARE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-6"
        >
          <ShareButtons
            shareCode={shareCode}
            movieTitle={story.movieTitle}
            name={profile.name}
          />
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            id="create-new-movie"
            onClick={() => router.push("/quiz")}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <RefreshCw size={16} />
            Create Another Movie
          </button>
          <button
            id="friend-movie-btn"
            onClick={() => router.push("/friends")}
            className="btn-secondary flex items-center gap-2 justify-center"
          >
            <Users size={16} />
            Make a Movie with Friends
          </button>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-[#4b5563] text-xs mt-8">
          PlotTwist is entertainment only. Results are fictional. No psychological assessments made.
        </p>
      </div>
    </div>
  );
}

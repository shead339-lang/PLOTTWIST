"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  Users,
  Share2,
  ArrowRight,
  ChevronDown,
  Star,
  Zap,
  TrendingDown,
  Skull,
  Flame,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

const SAMPLE_MOVIES = [
  {
    name: "Dani",
    title: "The Man Who Ignored Every Warning",
    role: "Unqualified Hero",
    universe: "Fantasy Kingdom",
    universeEmoji: "⚔️",
    tagline: "He had a plan. Unfortunately, it was terrible.",
    survival: "17%",
    roastScore: "91/100",
    imdb: "9.2/10",
    budget: "₹47",
    color: "#f59e0b",
    villain: "His Own Alarm Clock",
  },
  {
    name: "Priya",
    title: "Chronicles of 47 Spreadsheets",
    role: "The Overthinking Sorceress",
    universe: "Magical Academy",
    universeEmoji: "🪄",
    tagline: "She scheduled the dragon fight for next Thursday.",
    survival: "32%",
    roastScore: "88/100",
    imdb: "8.9/10",
    budget: "₹12",
    color: "#a855f7",
    villain: "Unread Emails",
  },
  {
    name: "Alex",
    title: "The Accidental Emperor of Space",
    role: "Corporate Chaos Master",
    universe: "Sci-Fi Future",
    universeEmoji: "🚀",
    tagline: "Signed a receipt. Now controls 6 planets.",
    survival: "41%",
    roastScore: "84/100",
    imdb: "9.4/10",
    budget: "₹99",
    color: "#06b6d4",
    villain: "The Reply-All Button",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "🎲",
    title: "Answer 12 Ridiculous Questions",
    description:
      "Every answer you click is secretly logged as evidence. Our unqualified AI analyzes your choices.",
  },
  {
    step: "02",
    icon: "🎬",
    title: "Generate Movie + Roast Receipt",
    description:
      "Get a custom movie title, character archetype, IMDb rating, worst decision breakdown, and official Roast Receipt.",
  },
  {
    step: "03",
    icon: "🔥",
    title: "Roast Your Friends",
    description:
      "Share your result to group chats or create a Group Movie to reveal who betrays everyone first.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is this really based on my answers?",
    a: "Yes! Every single choice affects hidden personality attributes (chaos, procrastination, common sense, confidence). We track your questionable clicks and use them to construct your movie and roast receipt.",
  },
  {
    q: "How many questions are there?",
    a: "Exactly 12 fast, funny scenario-based questions. Takes around 2–3 minutes with zero account or signup needed.",
  },
  {
    q: "How does Friend Mode work?",
    a: "Enter 2–10 friends' names and select a universe. The system automatically assigns roles (The Hero, The Villain, The Traitor, First to Die) and generates your group disaster movie and suspicion report!",
  },
  {
    q: "Is my personal data saved?",
    a: "No personal accounts, passwords, or emails are collected. Everything is 100% fictional entertainment generated purely for laughs.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden card-glass">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 flex items-center justify-between gap-4 text-[#f0ece8] font-title font-medium text-sm sm:text-base hover:text-yellow-400 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          className={`text-yellow-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[#9ca3af] text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12">
        {/* Ambient Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          {/* Warning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 mb-6 text-xs text-yellow-400 font-title font-bold uppercase tracking-widest">
            <AlertTriangle size={14} className="text-yellow-400" />
            Every answer will be used against you later 💀
          </div>

          {/* Main Headline */}
          <h1 className="font-dramatic text-4xl sm:text-6xl md:text-7xl font-black leading-[1.08] mb-4 text-gold-gradient glow-text-gold">
            YOUR LIFE.
            <br />
            <span className="text-[#f0ece8]">THE MOVIE NOBODY</span>
            <br />
            ASKED FOR.
          </h1>

          <p className="text-[#d1c8b8] text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            12 ridiculous questions, one completely unnecessary movie, and a surprisingly accurate roast.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/quiz"
              id="cta-make-movie"
              className="btn-primary text-base sm:text-lg px-8 py-4 rounded-2xl flex items-center gap-2 group shadow-xl"
            >
              🎬 MAKE MY MOVIE
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/friends"
              id="cta-roast-friends"
              className="btn-secondary text-sm sm:text-base px-6 py-4 rounded-2xl flex items-center gap-2"
            >
              <Users size={16} />
              👥 ROAST MY FRIENDS
            </Link>
          </div>

          <p className="text-[#6b7280] text-xs">
            No account • 3 minutes • 100% fictional • Completely unnecessary
          </p>
        </motion.div>

        {/* ─── COMPACT SAMPLE RESULT PREVIEW CARD ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-md mx-auto mt-12 relative z-10"
        >
          <div className="card-glass border border-yellow-400/30 rounded-3xl p-6 text-left shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#180e29] to-[#0d0718]">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-yellow-400 font-title font-bold uppercase tracking-wider bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                SAMPLE RESULT
              </span>
              <span className="text-[#9ca3af] font-mono text-[11px]">IMDb: 9.2/10 ⭐</span>
            </div>

            <h3 className="font-dramatic font-black text-xl sm:text-2xl text-yellow-400 mb-1 glow-text-gold">
              DANI: THE MOVIE
            </h3>
            <p className="text-[#9ca3af] text-xs italic mb-4">
              "He had a plan. Unfortunately, it was terrible."
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-[#6b7280]">Genre</div>
                <div className="text-[#f0ece8] font-bold">Disaster Comedy</div>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-[#6b7280]">Role</div>
                <div className="text-yellow-400 font-bold">Unqualified Hero</div>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-[#6b7280]">Villain</div>
                <div className="text-red-400 font-bold">His Alarm Clock</div>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-[#6b7280]">Survival Odds</div>
                <div className="text-purple-400 font-bold">17%</div>
              </div>
            </div>

            <Link
              href="/quiz"
              className="btn-primary w-full py-2.5 text-xs text-center block font-title font-bold"
            >
              Try Yours →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── SAMPLE MOVIES GRID ─── */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#f0ece8] mb-2 uppercase tracking-wide">
              REAL CHOICES. FICTIONAL MOVIES.
            </h2>
            <p className="text-[#9ca3af] text-sm">
              Here is what happens when questionable decisions become blockbuster cinema.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SAMPLE_MOVIES.map((movie, i) => (
              <motion.div
                key={movie.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-2xl p-5 border border-white/8 text-left space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400 font-bold font-title">{movie.universeEmoji} {movie.universe}</span>
                  <span className="text-[#9ca3af] font-mono text-[10px]">Budget: {movie.budget}</span>
                </div>
                <h4 className="font-title font-bold text-base text-[#f0ece8] leading-snug">
                  {movie.title}
                </h4>
                <p className="text-[#9ca3af] text-xs italic">
                  "{movie.tagline}"
                </p>
                <div className="border-t border-white/10 pt-2 flex justify-between text-[11px]">
                  <span className="text-yellow-400 font-bold">{movie.role}</span>
                  <span className="text-red-400 font-bold">Survival: {movie.survival}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#f0ece8] mb-2">
              How The Magic Works
            </h2>
            <p className="text-[#9ca3af] text-sm">Three steps to cinematic glory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="card-glass rounded-2xl p-6 border border-white/8 text-center"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <div className="font-title text-3xl font-black text-yellow-400/30 mb-2">
                  {step.step}
                </div>
                <h3 className="font-title font-bold text-base text-[#f0ece8] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#9ca3af] text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GROUP MOVIE BANNER ─── */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass rounded-3xl p-8 text-center border border-purple-500/30 bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
            <div className="text-4xl mb-3">👥</div>
            <h2 className="font-title text-2xl sm:text-3xl font-bold text-[#f0ece8] mb-2">
              Make A Movie With Friends
            </h2>
            <p className="text-[#9ca3af] text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              Add 2–10 friends. PlotTwist assigns roles (Hero, Villain, Traitor, First to Die) and generates your group script and suspicion report.
            </p>
            <Link
              href="/friends"
              className="btn-primary inline-flex items-center gap-2 text-sm px-7 py-3.5"
            >
              <Users size={16} />
              START GROUP ROAST
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-title text-2xl font-bold text-[#f0ece8] mb-2">
              Questions You Might Have
            </h2>
            <p className="text-[#9ca3af] text-sm">And answers that are probably helpful.</p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="font-dramatic text-3xl sm:text-4xl font-black text-gold-gradient glow-text-gold mb-3">
            YOUR STORY IS WAITING.
          </h2>
          <p className="text-[#9ca3af] text-sm mb-6">12 questions. 100% fictional. Let's find out.</p>
          <Link
            href="/quiz"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
          >
            🎬 CREATE MY MOVIE NOW
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/8 py-8 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <div className="font-title text-[#f0ece8] font-bold tracking-wider">
            🎬 PLOTTWIST
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">
              Terms
            </Link>
          </div>
          <p>
            Entertainment only · 100% fictional content
          </p>
        </div>
      </footer>
    </div>
  );
}

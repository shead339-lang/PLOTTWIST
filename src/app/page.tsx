"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Users, Zap, Star, Film, ArrowRight } from "lucide-react";

const SAMPLE_MOVIES = [
  {
    name: "Dani",
    title: "The Last Idiot of Eldoria",
    role: "The Unqualified Hero",
    universe: "Fantasy Kingdom",
    tagline: "One hero. One dragon. Zero plans.",
    villain: "The Alarm Clock of Doom",
    rating: "9.2",
    emoji: "⚔️",
    gradient: "from-amber-900/60 to-yellow-900/40",
  },
  {
    name: "Marcus",
    title: "Marcus: Out of Time",
    role: "The Chaos Wizard",
    universe: "Sci-Fi Future",
    tagline: "Definitely the hero. Probably.",
    villain: "His Future Self",
    rating: "8.7",
    emoji: "🚀",
    gradient: "from-violet-900/60 to-purple-900/40",
  },
  {
    name: "Sara",
    title: "Sara and the Forbidden Chapter",
    role: "The Forbidden-Magic User",
    universe: "Magical Academy",
    tagline: "They said don't open the book.",
    villain: "The Dark Scholar",
    rating: "9.5",
    emoji: "🪄",
    gradient: "from-fuchsia-900/60 to-violet-900/40",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Answer 15 ridiculous questions",
    description:
      "Tell us about your current life, your quest, your strengths, your embarrassing weaknesses, and which weapon you'd choose if forced to defend a kingdom.",
    icon: "❓",
  },
  {
    step: "02",
    title: "We craft your cinematic story",
    description:
      "Our story engine builds your character profile and transforms it into a personalized, funny, dramatic movie — starring you.",
    icon: "🎬",
  },
  {
    step: "03",
    title: "Share the chaos",
    description:
      "Get your unique movie link, movie poster card, and share it. Dare your friends to create theirs. Watch the group movie unfold.",
    icon: "📱",
  },
];

const FAQ_ITEMS = [
  {
    q: "How are the stories created?",
    a: "Your answers are scored by our cinematic narrative engine to build a custom character profile and generate your personalized story. Think of it as your personal movie director crafting your adventure.",
  },
  {
    q: "Is any of this real or accurate?",
    a: "This is entertainment! Your movie is fictional and created for fun. We don't predict your future, diagnose your personality, or make any scientific claims. Your weakness becoming a 'cursed burden' is comedy, not psychology.",
  },
  {
    q: "Can I make a movie with friends?",
    a: "Yes! After creating your movie, you can enter your friend group and PlotTwist assigns roles — hero, villain, sidekick, the one who betrays everyone. Friend mode creates a shared group story.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account needed for your first movie. Just answer the questions and your story is generated instantly. You get a unique shareable link.",
  },
  {
    q: "What if there is high traffic?",
    a: "We have an instant fallback story template system. You always get a funny, personalized story based on your answers. The site never goes blank.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left card-glass border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-yellow-500/30"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-title text-base text-[#f0ece8] font-semibold">{q}</span>
        <ChevronDown
          size={18}
          className={`text-yellow-400 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <p className="mt-3 text-[#9ca3af] text-sm leading-relaxed border-t border-white/10 pt-3">
          {a}
        </p>
      )}
    </button>
  );
}

function SampleMovieCard({ movie }: { movie: (typeof SAMPLE_MOVIES)[0] }) {
  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${movie.gradient} p-6 flex flex-col gap-3`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">{movie.emoji}</span>
        <span className="text-xs font-title uppercase tracking-widest text-yellow-400/70">
          {movie.universe}
        </span>
      </div>
      <h3 className="font-title text-lg font-bold text-[#f0ece8] leading-tight">
        {movie.title}
      </h3>
      <p className="text-yellow-400/80 text-xs italic">{movie.tagline}</p>
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex justify-between text-xs">
          <span className="text-[#9ca3af]">Starring</span>
          <span className="text-[#f0ece8] font-medium">{movie.name}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#9ca3af]">Role</span>
          <span className="text-[#f0ece8] font-medium">{movie.role}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[#9ca3af]">Villain</span>
          <span className="text-red-400 font-medium">{movie.villain}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <Star size={12} className="text-yellow-400 fill-yellow-400" />
        <span className="text-yellow-400 text-sm font-bold">{movie.rating}</span>
        <span className="text-[#9ca3af] text-xs">/ 10</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 0.5 + "px",
                height: Math.random() * 2 + 0.5 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.1,
                animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/5 mb-6">
            <Film size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">
              We asked you 12 questions. We regret asking 11 of them.
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-title text-4xl sm:text-6xl md:text-7xl font-black leading-[1.05] mb-6 text-gold-gradient glow-text-gold">
            YOUR LIFE:
            <br />
            <span className="text-[#f0ece8]">THE ABSOLUTELY</span>
            <br />
            UNNECESSARY MOVIE.
          </h1>

          <p className="text-[#d1c8b8] text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed italic">
            “Answer honestly. Our completely unqualified AI will turn your life into a movie.”
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/quiz"
              id="cta-create-movie"
              className="btn-primary text-lg px-8 py-4 rounded-xl flex items-center gap-2 group"
            >
              🎬 CREATE MY MOVIE
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/friends"
              id="cta-friend-movie"
              className="btn-secondary text-base px-6 py-4 rounded-xl flex items-center gap-2"
            >
              <Users size={16} />
              MAKE A MOVIE WITH FRIENDS
            </Link>
          </div>

          <p className="text-[#6b7280] text-xs">
            No account needed · Takes 3 minutes · 100% fictional
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b7280]"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ─── SAMPLE MOVIES ─── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#f0ece8] mb-3">
              Real Stories. Fictional Movies.
            </h2>
            <p className="text-[#9ca3af] text-lg">
              Here's what other people discovered about themselves.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SAMPLE_MOVIES.map((movie, i) => (
              <motion.div
                key={movie.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SampleMovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/quiz" className="btn-primary inline-flex items-center gap-2">
              Find Out Your Movie
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#f0ece8] mb-3">
              How The Magic Works
            </h2>
            <p className="text-[#9ca3af]">Three steps to cinematic glory.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-glass rounded-2xl p-6 border border-white/8 text-center"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="font-title text-5xl font-black text-yellow-400/20 mb-2">
                  {step.step}
                </div>
                <h3 className="font-title font-bold text-lg text-[#f0ece8] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FRIEND MOVIE CTA ─── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-3xl p-8 sm:p-12 text-center border border-purple-500/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.05) 100%)",
            }}
          >
            <div className="text-5xl mb-4">👥</div>
            <h2 className="font-title text-3xl sm:text-4xl font-bold text-[#f0ece8] mb-4">
              Make A Movie With Friends
            </h2>
            <p className="text-[#9ca3af] text-lg mb-6 leading-relaxed">
              Enter your friend group, choose a universe, and PlotTwist assigns everyone a role.
              Who's the hero? Who's the villain? Who has a{" "}
              <span className="text-yellow-400">94% chance of betrayal?</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm text-[#9ca3af]">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                Auto-assigned roles
              </div>
              <div className="flex items-center gap-2">
                <Film size={14} className="text-yellow-400" />
                Group story generated
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-yellow-400" />
                Shareable group poster
              </div>
            </div>
            <Link
              href="/friends"
              id="cta-friends-section"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8"
            >
              <Users size={18} />
              START THE GROUP MOVIE
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-title text-3xl font-bold text-[#f0ece8] mb-3">
              Questions You Might Have
            </h2>
            <p className="text-[#9ca3af]">And answers that are probably helpful.</p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-title text-4xl sm:text-5xl font-black text-gold-gradient glow-text-gold mb-4">
            YOUR STORY IS WAITING.
          </h2>
          <p className="text-[#9ca3af] mb-8">It's probably epic. Let's find out.</p>
          <Link
            href="/quiz"
            id="cta-final"
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
          >
            🎬 CREATE MY MOVIE NOW
          </Link>
          <p className="text-[#6b7280] text-xs mt-4">
            Entertainment only · No real predictions made · Fictional content
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/8 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6b7280]">
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
          <p className="text-center sm:text-right">
            Entertainment only. Not real. But entertaining.
          </p>
        </div>
      </footer>
    </div>
  );
}

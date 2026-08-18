"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Users, Film, ArrowRight, Flame, ShieldAlert, Sparkles, Copy, Check } from "lucide-react";
import { UNIVERSES } from "@/data/universes";

const MAX_FRIENDS = 6;

const GROUP_ROLES = [
  {
    id: "hero",
    label: "The Hero",
    emoji: "🦸",
    desc: "Chosen by destiny. Zero preparation.",
    roast: "Somehow became the main character despite having zero qualifications and negative common sense.",
  },
  {
    id: "villain",
    label: "The Villain",
    emoji: "😈",
    desc: "Had a point. Lost it around army #3.",
    roast: "Has been quietly planning this betrayal since the group chat was created in 2021.",
  },
  {
    id: "comic_relief",
    label: "Comic Relief",
    emoji: "🤡",
    desc: "Arrived late with snacks. Saved the universe.",
    roast: "Contributes absolutely nothing to the combat mission but somehow secures 80% of the screen time.",
  },
  {
    id: "dragon_rider",
    label: "Dragon Rider",
    emoji: "🐉",
    desc: "Befriended a mythical beast. Doesn't do paperwork.",
    roast: "Adopted a 40-ton flying monster specifically to avoid parallel parking and basic responsibilities.",
  },
  {
    id: "first_to_die",
    label: "First to Die",
    emoji: "💀",
    desc: "Gave a heartfelt speech in Chapter 1. Bad sign.",
    roast: "Gave a sentimental speech about how close the friendship is. Guaranteed eliminated before Scene 3.",
  },
  {
    id: "traitor",
    label: "The Traitor",
    emoji: "🗡️",
    desc: "94% betrayal probability. They're nice though.",
    roast: "Smiles enthusiastically in every selfie while secretly negotiating with the Dark Lord's union.",
  },
  {
    id: "sidekick",
    label: "The Sidekick",
    emoji: "🤝",
    desc: "Does 80% of the actual heavy lifting.",
    roast: "Doing all the tactical planning, emotional labor, and spell-casting while the Hero takes all the glory.",
  },
];

export interface BattleStats {
  betrayer: { name: string; pct: number };
  survivor: { name: string; pct: number };
  runner: { name: string; pct: number };
  accidentalHero: { name: string; pct: number };
  mostChaotic: { name: string; pct: number };
  leastUseful: { name: string; pct: number };
}

function assignRoles(names: string[]): { name: string; role: (typeof GROUP_ROLES)[0] }[] {
  const shuffledRoles = [...GROUP_ROLES].sort(() => Math.random() - 0.5);
  return names.map((name, i) => ({
    name,
    role: shuffledRoles[i % shuffledRoles.length],
  }));
}

function generateGroupStory(
  names: string[],
  universe: string,
  assignments: { name: string; role: (typeof GROUP_ROLES)[0] }[]
): {
  title: string;
  tagline: string;
  story: string;
  traitorChance: string;
  battleStats: BattleStats;
} {
  const universeData = UNIVERSES.find((u) => u.id === universe);
  const hero = assignments.find((a) => a.role.id === "hero")?.name ?? names[0];
  const villain = assignments.find((a) => a.role.id === "villain")?.name;
  const traitor = assignments.find((a) => a.role.id === "traitor")?.name;
  const sidekick = assignments.find((a) => a.role.id === "sidekick")?.name;
  const comic = assignments.find((a) => a.role.id === "comic_relief")?.name;
  const dragonRider = assignments.find((a) => a.role.id === "dragon_rider")?.name;
  const firstToDie = assignments.find((a) => a.role.id === "first_to_die")?.name;
  const traitorChance = Math.floor(80 + Math.random() * 19) + "%";

  const shuffledNames = [...names].sort(() => Math.random() - 0.5);

  const battleStats: BattleStats = {
    betrayer: {
      name: traitor ?? shuffledNames[0],
      pct: Math.floor(85 + Math.random() * 14),
    },
    survivor: {
      name: hero ?? (shuffledNames[1] || names[0]),
      pct: Math.floor(88 + Math.random() * 11),
    },
    runner: {
      name: comic ?? (shuffledNames[2] || names[0]),
      pct: Math.floor(92 + Math.random() * 7),
    },
    accidentalHero: {
      name: sidekick ?? dragonRider ?? (shuffledNames[3] || names[0]),
      pct: Math.floor(90 + Math.random() * 9),
    },
    mostChaotic: {
      name: names[0],
      pct: 94,
    },
    leastUseful: {
      name: comic ?? names[names.length - 1],
      pct: 97,
    },
  };

  const title = `THE ${names.length} CHAOTIC CHAMPIONS OF ${(universeData?.vocabulary.setting ?? "THE REALM").toUpperCase()}`;
  const tagline = `${names.length} friends. ${names.length - 1} of them are ready. One of them is ${comic ?? names[names.length - 1]}.`;
  const story = `When the ${universeData?.vocabulary.villain ?? "Dark Lord"} threatened the realm, the ancient prophecy called for exactly ${names.length} champions. ${hero} accepted the quest without reading the terms and conditions. ${sidekick ? `${sidekick} read all 40 pages of terms and sighed deeply.` : ""} ${villain ? `Meanwhile, ${villain} had already constructed a 47-step master plan with color-coded charts.` : ""} ${traitor ? `${traitor} was enthusiastically supportive throughout — suspiciously so.` : ""} ${firstToDie ? `${firstToDie} gave a very touching speech early on, which the director marked as an immediate red flag.` : ""} ${dragonRider ? `${dragonRider} showed up with a flying mythical beast that refused to parallel park.` : ""} ${comic ? `${comic} arrived late with pizza, which somehow saved the universe.` : ""} Together, they argued about everything, survived every trap, and saved the day on 100% pure chaos.`;

  return { title, tagline, story, traitorChance, battleStats };
}

export default function FriendsPage() {
  const router = useRouter();
  const [names, setNames] = useState<string[]>(["", ""]);
  const [selectedUniverse, setSelectedUniverse] = useState("");
  const [step, setStep] = useState<"names" | "universe" | "result">("names");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    assignments: { name: string; role: (typeof GROUP_ROLES)[0] }[];
    groupStory: ReturnType<typeof generateGroupStory>;
  } | null>(null);

  const validNames = names.filter((n) => n.trim().length > 0);

  const addFriend = () => {
    if (names.length < MAX_FRIENDS) setNames([...names, ""]);
  };

  const removeFriend = (i: number) => {
    setNames(names.filter((_, idx) => idx !== i));
  };

  const updateName = (i: number, val: string) => {
    const updated = [...names];
    updated[i] = val.slice(0, 25);
    setNames(updated);
  };

  const generateGroup = () => {
    const filtered = names.filter((n) => n.trim().length > 0);
    const assignments = assignRoles(filtered);
    const groupStory = generateGroupStory(filtered, selectedUniverse, assignments);
    setResult({ assignments, groupStory });
    setStep("result");
  };

  const shareText = result
    ? `🎬 OUR FRIEND GROUP MOVIE: "${result.groupStory.title}"\n${result.assignments.map((a) => `• ${a.name}: ${a.role.label} (${a.role.emoji})`).join("\n")}\n\nFind out your role:`
    : "";

  const copyGroupLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => router.push("/")}
            className="text-[#9ca3af] text-sm hover:text-yellow-400 transition-colors mb-4 inline-block font-title uppercase tracking-widest"
          >
            ← Back to Home
          </button>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/30 bg-purple-400/5 text-purple-300 text-xs font-title uppercase tracking-widest mb-4">
            <Users size={14} />
            PlotTwist Group Mode
          </div>
          <h1 className="font-dramatic text-3xl sm:text-5xl font-black text-gold-gradient glow-text-gold mb-3">
            ROAST YOUR FRIEND GROUP
          </h1>
          <p className="text-[#d1c8b8] text-sm sm:text-base max-w-lg mx-auto">
            Add 2–6 friends. The algorithm will assign roles, expose who betrays everyone, and generate your collective disaster movie.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Enter Names */}
          {step === "names" && (
            <motion.div
              key="names"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card-glass rounded-2xl border border-white/8 p-6 sm:p-8"
            >
              <h2 className="font-title font-bold text-lg text-yellow-400 mb-2">
                Step 1: Who is in the cast?
              </h2>
              <p className="text-[#9ca3af] text-xs mb-6">
                Enter each friend's name. (2–6 friends recommended)
              </p>

              <div className="space-y-3 mb-6">
                {names.map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 text-xs text-[#6b7280] font-title font-bold text-center">
                      {i + 1}.
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateName(i, e.target.value)}
                      placeholder={i === 0 ? "Your name (Hero or First to Die)" : `Friend ${i + 1} name`}
                      className="input-field flex-1 text-sm"
                    />
                    {names.length > 2 && (
                      <button
                        onClick={() => removeFriend(i)}
                        className="text-[#6b7280] hover:text-red-400 p-2 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {names.length < MAX_FRIENDS && (
                <button
                  onClick={addFriend}
                  className="btn-secondary text-xs w-full py-2.5 flex items-center justify-center gap-2 mb-6"
                >
                  <Plus size={14} /> Add Another Friend ({names.length}/{MAX_FRIENDS})
                </button>
              )}

              <button
                onClick={() => setStep("universe")}
                disabled={validNames.length < 2}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed font-title font-bold text-sm"
              >
                NEXT: CHOOSE UNIVERSE
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* STEP 2: Choose Universe */}
          {step === "universe" && (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card-glass rounded-2xl border border-white/8 p-6 sm:p-8"
            >
              <h2 className="font-title font-bold text-lg text-yellow-400 mb-2">
                Step 2: Choose the Universe
              </h2>
              <p className="text-[#9ca3af] text-xs mb-6">
                Where does your friendship fall apart?
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {UNIVERSES.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUniverse(u.id)}
                    className={`universe-card p-4 text-left transition-all ${
                      selectedUniverse === u.id ? "selected" : ""
                    }`}
                  >
                    <div className="text-2xl mb-1">{u.emoji}</div>
                    <div className="font-title font-bold text-xs text-[#f0ece8]">
                      {u.name}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("names")}
                  className="btn-secondary flex-1 py-3 text-xs"
                >
                  Back
                </button>
                <button
                  onClick={generateGroup}
                  disabled={!selectedUniverse}
                  className="btn-primary flex-1 py-3 text-xs disabled:opacity-40 font-title font-bold"
                >
                  GENERATE GROUP ROAST 🎬
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Result */}
          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Group Title */}
              <div className="text-center mb-6">
                <h2 className="font-dramatic text-2xl sm:text-4xl font-black text-gold-gradient glow-text-gold mb-2">
                  {result.groupStory.title}
                </h2>
                <p className="text-[#d1c8b8] italic text-xs sm:text-sm">
                  "{result.groupStory.tagline}"
                </p>
              </div>

              {/* 📁 GROUP EVIDENCE DASHBOARD */}
              <div className="card-glass rounded-2xl border border-red-500/30 p-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
                  <ShieldAlert size={16} />
                  📁 GROUP EVIDENCE & SUSPICION REPORT
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-center">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Most Chaotic</div>
                    <div className="text-yellow-400 font-bold font-title">
                      {result.groupStory.battleStats.mostChaotic.name} ({result.groupStory.battleStats.mostChaotic.pct}%)
                    </div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Most Suspicious</div>
                    <div className="text-red-400 font-bold font-title">
                      {result.groupStory.battleStats.betrayer.name} ({result.groupStory.battleStats.betrayer.pct}%)
                    </div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Least Useful in Combat</div>
                    <div className="text-gray-400 font-bold font-title">
                      {result.groupStory.battleStats.leastUseful.name} ({result.groupStory.battleStats.leastUseful.pct}%)
                    </div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Likely to Betray</div>
                    <div className="text-red-500 font-bold font-title">
                      {result.groupStory.battleStats.betrayer.name} ({result.groupStory.traitorChance})
                    </div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Definitely Survives</div>
                    <div className="text-green-400 font-bold font-title">
                      {result.groupStory.battleStats.survivor.name} ({result.groupStory.battleStats.survivor.pct}%)
                    </div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-[#6b7280]">Runs Away First</div>
                    <div className="text-amber-400 font-bold font-title">
                      {result.groupStory.battleStats.runner.name} ({result.groupStory.battleStats.runner.pct}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Role Assignments with Individual Roasts */}
              <div className="card-glass rounded-2xl border border-white/8 p-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-4">
                  🎭 INDIVIDUAL CHARACTER ROASTS
                </h3>
                <div className="space-y-3">
                  {result.assignments.map((a, i) => (
                    <motion.div
                      key={a.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-start gap-3.5 text-xs"
                    >
                      <span className="text-3xl flex-shrink-0">{a.role.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#f0ece8] font-bold text-sm">{a.name}</span>
                          <span className="text-yellow-400 font-title font-bold text-xs uppercase tracking-wider">
                            {a.role.label}
                          </span>
                        </div>
                        <p className="text-[#9ca3af] italic mb-1.5 leading-relaxed">
                          "{a.role.roast}"
                        </p>
                        <div className="text-[11px] text-[#6b7280]">
                          Speciality: {a.role.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Group Story */}
              <div className="card-glass rounded-2xl border border-white/8 p-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-3">
                  🎬 THE SCRIPT
                </h3>
                <p className="text-[#d1c8b8] text-xs leading-relaxed leading-6">
                  {result.groupStory.story}
                </p>
              </div>

              {/* Share */}
              <div className="card-glass rounded-2xl border border-yellow-400/30 p-6 text-center">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-2">
                  SHARE INTO THE GROUP CHAT
                </h3>
                <p className="text-[#9ca3af] text-xs mb-4">
                  Send this directly to WhatsApp to expose everyone's role.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={copyGroupLink}
                    className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied Link!" : "Copy Group Link"}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs py-2.5 px-4 text-green-400 border-green-500/30 flex items-center gap-2"
                  >
                    📱 Send to WhatsApp Group
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    setStep("names");
                    setResult(null);
                    setNames(["", ""]);
                    setSelectedUniverse("");
                  }}
                  className="btn-secondary flex items-center gap-2 justify-center text-xs py-3"
                >
                  New Group Roast
                </button>
                <button
                  onClick={() => router.push("/quiz")}
                  className="btn-primary flex items-center gap-2 justify-center text-xs py-3 font-title font-bold"
                >
                  ROAST ME INDIVIDUALLY
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

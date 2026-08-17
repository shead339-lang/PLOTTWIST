"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Users, Film, ArrowRight } from "lucide-react";
import { UNIVERSES } from "@/data/universes";

const MAX_FRIENDS = 6;

const GROUP_ROLES = [
  { id: "hero", label: "The Hero", emoji: "🦸", desc: "Chosen by destiny. Zero preparation." },
  { id: "villain", label: "The Villain", emoji: "😈", desc: "Had a point. Lost it around army #3." },
  { id: "wizard", label: "The Wizard", emoji: "🧙", desc: "Ancient. Powerful. Deliberately vague." },
  { id: "sidekick", label: "The Sidekick", emoji: "🤝", desc: "Does 60% of the actual work." },
  { id: "comic_relief", label: "The Comic Relief", emoji: "🃏", desc: "Everyone underestimated them. Mistake." },
  { id: "traitor", label: "The Traitor", emoji: "🗡️", desc: "94% betrayal probability. They're nice though." },
];

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
} {
  const universeData = UNIVERSES.find((u) => u.id === universe);
  const hero = assignments.find((a) => a.role.id === "hero")?.name ?? names[0];
  const villain = assignments.find((a) => a.role.id === "villain")?.name;
  const traitor = assignments.find((a) => a.role.id === "traitor")?.name;
  const sidekick = assignments.find((a) => a.role.id === "sidekick")?.name;
  const comic = assignments.find((a) => a.role.id === "comic_relief")?.name;
  const traitorChance = Math.floor(80 + Math.random() * 19) + "%";

  const title = `THE ${names.length} OF ${(universeData?.vocabulary.setting ?? "LEGEND").toUpperCase()}`;
  const tagline = `${names.length} legends. ${names.length - 1} of them are ready. One of them is ${comic ?? names[names.length - 1]}.`;
  const story = `When the ${universeData?.vocabulary.villain ?? "Dark Lord"} threatened the ${universeData?.vocabulary.kingdom ?? "kingdom"}, the prophecy called for exactly ${names.length} champions. ${hero} accepted the call without reading the terms and conditions. ${sidekick ? `${sidekick} had actually read them and chose to come anyway.` : ""} ${villain ? `Meanwhile, ${villain} had been preparing their own plans, which were significantly better organized.` : ""} ${traitor ? `${traitor} was enthusiastically supportive throughout — suspiciously so.` : ""} ${comic ? `${comic} arrived late but brought snacks, which turned out to be critical to the mission.` : ""} Together, they faced every challenge, disagreed about everything, and somehow — despite all reasonable predictions to the contrary — saved the day. The ${universeData?.vocabulary.villain ?? "Dark Lord"} was defeated. The friendship survived. ${traitor ? `${traitor}'s 94% betrayal probability remained unused — this time.` : ""}`;

  return { title, tagline, story, traitorChance };
}

export default function FriendsPage() {
  const router = useRouter();
  const [names, setNames] = useState<string[]>([""]);
  const [selectedUniverse, setSelectedUniverse] = useState("");
  const [step, setStep] = useState<"names" | "universe" | "result">("names");
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
    ? `We made a group movie 🎬 "${result.groupStory.title}" — ${validNames.join(", ")}. Find out YOUR role:`
    : "";

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={() => router.push("/")}
            className="text-[#9ca3af] text-sm hover:text-yellow-400 transition-colors mb-4 inline-block"
          >
            ← Back to Home
          </button>
          <h1 className="font-title text-4xl sm:text-5xl font-black text-gold-gradient glow-text-gold mb-3">
            FRIEND MOVIE MODE
          </h1>
          <p className="text-[#9ca3af] text-lg">
            Add your friends. We'll assign the roles. Someone is definitely the traitor.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP: Names */}
          {step === "names" && (
            <motion.div
              key="names"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="card-glass rounded-2xl border border-white/8 p-6 mb-6">
                <h2 className="font-title font-bold text-lg text-[#f0ece8] mb-5">
                  <Users size={18} className="inline mr-2 text-yellow-400" />
                  Add Your Friends (2–6 people)
                </h2>

                <div className="flex flex-col gap-3 mb-4">
                  {names.map((name, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        id={`friend-name-${i}`}
                        type="text"
                        value={name}
                        onChange={(e) => updateName(i, e.target.value)}
                        placeholder={`Friend ${i + 1}...`}
                        maxLength={25}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#f0ece8] text-sm placeholder:text-[#4b5563] outline-none focus:border-yellow-400/50 transition-colors"
                      />
                      {names.length > 1 && (
                        <button
                          onClick={() => removeFriend(i)}
                          className="p-2 text-[#9ca3af] hover:text-red-400 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {names.length < MAX_FRIENDS && (
                  <button
                    id="add-friend"
                    onClick={addFriend}
                    className="flex items-center gap-2 text-yellow-400/70 text-sm hover:text-yellow-400 transition-colors"
                  >
                    <Plus size={14} />
                    Add another friend
                  </button>
                )}
              </div>

              <div className="text-center">
                <button
                  id="friends-next"
                  disabled={validNames.length < 2}
                  onClick={() => setStep("universe")}
                  className={`btn-primary flex items-center gap-2 mx-auto ${
                    validNames.length < 2 ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  Choose Universe
                  <ArrowRight size={16} />
                </button>
                <p className="text-[#6b7280] text-xs mt-2">Minimum 2 friends required</p>
              </div>
            </motion.div>
          )}

          {/* STEP: Universe */}
          {step === "universe" && (
            <motion.div
              key="universe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="card-glass rounded-2xl border border-white/8 p-6 mb-6">
                <h2 className="font-title font-bold text-lg text-[#f0ece8] mb-5">
                  Choose Your Group Universe
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {UNIVERSES.map((u) => (
                    <button
                      key={u.id}
                      id={`group-universe-${u.id}`}
                      onClick={() => setSelectedUniverse(u.id)}
                      className={`option-card text-center flex flex-col items-center gap-2 py-4 ${
                        selectedUniverse === u.id ? "selected" : ""
                      }`}
                    >
                      <span className="text-2xl">{u.emoji}</span>
                      <span className="text-xs font-title font-bold text-[#f0ece8]">{u.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setStep("names")}
                  className="btn-secondary flex items-center gap-2"
                >
                  Back
                </button>
                <button
                  id="generate-group"
                  disabled={!selectedUniverse}
                  onClick={generateGroup}
                  className={`btn-primary flex items-center gap-2 ${
                    !selectedUniverse ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <Film size={16} />
                  GENERATE GROUP MOVIE
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP: Result */}
          {step === "result" && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Group Title */}
              <div className="text-center mb-8">
                <h2 className="font-dramatic text-3xl sm:text-4xl font-black text-gold-gradient glow-text-gold mb-2">
                  {result.groupStory.title}
                </h2>
                <p className="text-[#9ca3af] italic">"{result.groupStory.tagline}"</p>
              </div>

              {/* Role assignments */}
              <div className="card-glass rounded-2xl border border-white/8 p-6 mb-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-4">
                  Role Assignments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.assignments.map((a, i) => (
                    <motion.div
                      key={a.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-white/4 rounded-xl p-3"
                    >
                      <span className="text-2xl">{a.role.emoji}</span>
                      <div>
                        <div className="text-[#f0ece8] font-bold text-sm">{a.name}</div>
                        <div className="text-yellow-400 text-xs font-title">{a.role.label}</div>
                        <div className="text-[#6b7280] text-xs">{a.role.desc}</div>
                        {a.role.id === "traitor" && (
                          <div className="text-red-400 text-xs font-bold mt-0.5">
                            ⚠ Betrayal probability: {result.groupStory.traitorChance}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Group story */}
              <div className="card-glass rounded-2xl border border-white/8 p-6 mb-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-yellow-400 mb-3">
                  The Group Story
                </h3>
                <p className="text-[#d1c8b8] leading-relaxed">{result.groupStory.story}</p>
              </div>

              {/* Share */}
              <div className="card-glass rounded-2xl border border-white/8 p-6 mb-6">
                <h3 className="font-title font-bold text-sm uppercase tracking-widest text-[#9ca3af] mb-3">
                  Share With Your Group
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    id="share-group-link"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    Copy Link
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm text-green-400 border-green-500/30 flex items-center gap-2"
                  >
                    📱 WhatsApp
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { setStep("names"); setResult(null); setNames([""]); setSelectedUniverse(""); }}
                  className="btn-secondary flex items-center gap-2 justify-center"
                >
                  New Group Movie
                </button>
                <button
                  onClick={() => router.push("/quiz")}
                  className="btn-primary flex items-center gap-2 justify-center"
                >
                  Create My Own Movie
                  <ArrowRight size={16} />
                </button>
              </div>

              <p className="text-center text-[#4b5563] text-xs mt-6">
                Fictional entertainment only. Betrayal probability is not real. Probably.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

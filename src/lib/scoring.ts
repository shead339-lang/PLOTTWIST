import { ARCHETYPES, COMPANIONS, PLOT_TWISTS, VILLAINS } from "@/data/characters";
import { getUniverse } from "@/data/universes";
import type { QuizAnswers } from "@/lib/validation";

export interface AttributeScores {
  bravery: number;
  intelligence: number;
  chaos: number;
  creativity: number;
  loyalty: number;
  ambition: number;
  humor: number;
  romance: number;
  independence: number;
  risk: number;
  patience: number;
  darkness: number;
  optimism: number;
  mystery: number;
  leadership: number;
}

export interface UnreliableStat {
  label: string;
  percentage: number;
  subStat1: string;
  subStat2: string;
}

export interface LifeMechanic {
  status: string;
  difficulty: string;
  mission: string;
  progressPercent: number;
  boss: string;
  specialAbility: string;
  abilityEffectiveness: string;
}

export interface InventoryItem {
  name: string;
  power: number;
  emoji: string;
}

export interface FutureEvent {
  timeframe: string;
  prediction: string;
}

export interface AchievementItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface BoxOfficeData {
  audienceRating: string;
  chaosRating: string;
  survivalProbability: string;
  criticalReview: string;
  openingWeekend: string;
  productionBudget: string;
  profit: string;
}

export interface MovieProfile {
  // User basics
  name: string;
  universe: string;
  kingdomName: string;
  preferredRole: string;

  // Derived from scoring
  actualArchetype: string;
  archetypeLabel: string;
  archetypeDescription: string;

  // Story elements
  situation: string;
  quest: string;
  strength: string;
  weakness: string;
  problemSolvingStyle: string;
  weapon: string;
  companion: string;
  companionLabel: string;
  power: string;
  fear: string;
  trust: string;
  sacrifice: string;
  endingPreference: string;

  // Villain + twist
  villain: string;
  villainLabel: string;
  plotTwist: string;

  // Normalized scores (0-100)
  scores: AttributeScores;

  // Rich Viral / Interactive Features
  unreliableStats: UnreliableStat[];
  lifeMechanics: LifeMechanic;
  inventory: InventoryItem[];
  secretItem: { name: string; description: string; emoji: string };
  scientificFuture: FutureEvent[];
  roast: string;
  harderRoast: string;
  achievements: AchievementItem[];
  randomEvents: string[];
  boxOffice: BoxOfficeData;
  awards: { title: string; subtitle: string; icon: string }[];

  // Tone metadata
  comedyLevel: number; // 0-1
  dramaLevel: number;  // 0-1
  darkLevel: number;   // 0-1
  storyTone: string;
}

const SCORE_KEYS: (keyof AttributeScores)[] = [
  "bravery", "intelligence", "chaos", "creativity", "loyalty",
  "ambition", "humor", "romance", "independence", "risk",
  "patience", "darkness", "optimism", "mystery", "leadership",
];

function initScores(): AttributeScores {
  const s: Record<string, number> = {};
  for (const k of SCORE_KEYS) s[k] = 0;
  return s as unknown as AttributeScores;
}

function clamp(val: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, val));
}

function normalize(scores: Record<string, number>): AttributeScores {
  const max = Math.max(...Object.values(scores), 1);
  const normalized = initScores();
  for (const key of SCORE_KEYS) {
    normalized[key] = clamp(Math.round(((scores[key] ?? 0) / max) * 100));
  }
  return normalized;
}

function addEffects(
  scores: Record<string, number>,
  effects: Partial<Record<string, number>>
) {
  for (const [key, value] of Object.entries(effects)) {
    if (SCORE_KEYS.includes(key as keyof AttributeScores)) {
      scores[key] = (scores[key] ?? 0) + (value ?? 0);
    }
  }
}

function selectArchetype(scores: AttributeScores) {
  // Find best matching archetype based on minimum thresholds
  const candidates = ARCHETYPES.filter((arch) => {
    if (arch.minBravery && scores.bravery < arch.minBravery) return false;
    if (arch.minIntelligence && scores.intelligence < arch.minIntelligence) return false;
    if (arch.minChaos && scores.chaos < arch.minChaos) return false;
    if (arch.minDarkness && scores.darkness < arch.minDarkness) return false;
    if (arch.minHumor && scores.humor < arch.minHumor) return false;
    if (arch.minAmbition && scores.ambition < arch.minAmbition) return false;
    if (arch.minMystery && scores.mystery < arch.minMystery) return false;
    if (arch.minLoyalty && scores.loyalty < arch.minLoyalty) return false;
    if (arch.minLeadership && scores.leadership < arch.minLeadership) return false;
    if (arch.minCreativity && scores.creativity < arch.minCreativity) return false;
    if (arch.minIndependence && scores.independence < arch.minIndependence) return false;
    if (arch.minOptimism && scores.optimism < arch.minOptimism) return false;
    return true;
  });

  if (candidates.length > 0) {
    // Prefer the most specific (most conditions)
    return candidates[candidates.length - 1];
  }

  // Fallback: pick based on top score
  const topAttr = SCORE_KEYS.reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const fallbacks: Record<string, string> = {
    bravery: "reluctant_hero",
    intelligence: "wise_wizard",
    chaos: "creative_trickster",
    humor: "comedic_legend",
    darkness: "shadow_master",
    ambition: "rising_legend",
    mystery: "mysterious_wanderer",
    loyalty: "loyal_guardian",
    leadership: "reluctant_king",
    creativity: "creative_trickster",
    romance: "reluctant_hero",
    independence: "mysterious_wanderer",
    risk: "reluctant_hero",
    patience: "loyal_guardian",
    optimism: "chosen_hero",
  };

  const fallbackId = fallbacks[topAttr] ?? "unqualified_hero";
  return ARCHETYPES.find((a) => a.id === fallbackId) ?? ARCHETYPES[2];
}

function selectVillain(universeId: string, scores: AttributeScores) {
  const universeVillains = VILLAINS.filter(
    (v) => v.universes.includes(universeId) || v.universes.includes("all")
  );

  // High humor → funny villain
  if (scores.humor > 65) {
    const funny = universeVillains.filter((v) => (v as Record<string, unknown>).funny);
    if (funny.length > 0) return funny[Math.floor(Math.random() * funny.length)];
  }

  // High darkness → dramatic villain
  if (scores.darkness > 55) {
    const dramatic = universeVillains.filter((v) => !(v as Record<string, unknown>).funny);
    if (dramatic.length > 0) return dramatic[0];
  }

  const filtered = universeVillains.filter((v) => !(v as Record<string, unknown>).funny);
  return filtered[Math.floor(Math.random() * filtered.length)] ?? VILLAINS[0];
}

function selectPlotTwist(scores: AttributeScores) {
  if (scores.humor > 60) {
    const funny = PLOT_TWISTS.filter((p) => (p as Record<string, unknown>).funny);
    return funny[Math.floor(Math.random() * funny.length)];
  }
  if (scores.darkness > 55) {
    const dramatic = PLOT_TWISTS.filter((p) => (p as Record<string, unknown>).dramatic);
    return dramatic[Math.floor(Math.random() * dramatic.length)];
  }
  return PLOT_TWISTS[Math.floor(Math.random() * PLOT_TWISTS.length)];
}

function selectCompanion(answeredCompanion: string) {
  const firstCompanion = answeredCompanion ? answeredCompanion.split(",")[0].trim() : "";
  return COMPANIONS.find((c) => c.id === firstCompanion || c.id === answeredCompanion) ?? COMPANIONS[0];
}

function determineTone(scores: AttributeScores) {
  const comedyLevel = clamp(scores.humor / 100);
  const dramaLevel = clamp(
    (scores.darkness * 0.5 + scores.ambition * 0.3 + scores.bravery * 0.2) / 100
  );
  const darkLevel = clamp(scores.darkness / 100);

  let storyTone = "chaotic_adventure";
  if (comedyLevel > 0.6 && dramaLevel > 0.5) storyTone = "epic_comedy";
  else if (comedyLevel > 0.6) storyTone = "heartfelt_comedy";
  else if (darkLevel > 0.6) storyTone = "dark_comedy";
  else if (dramaLevel > 0.7) storyTone = "cinematic_drama";
  else if (scores.mystery > 60) storyTone = "mysterious_thriller";

  return { comedyLevel, dramaLevel, darkLevel, storyTone };
}

export function buildMovieProfile(answers: QuizAnswers): MovieProfile {
  const rawScores: Record<string, number> = Object.fromEntries(
    SCORE_KEYS.map((k) => [k, 0])
  );

  // Import questions to get scoring effects
  const { QUESTIONS } = require("@/data/questions");

  // Score each answer
  for (const question of QUESTIONS) {
    if (!question.options) continue;
    const rawAnswer = answers[question.id as keyof QuizAnswers];
    if (!rawAnswer) continue;
    const answerIds = typeof rawAnswer === "string" ? rawAnswer.split(",") : [rawAnswer];
    for (const ansId of answerIds) {
      const trimmedId = String(ansId).trim();
      const option = question.options.find(
        (o: { id: string; scoringEffects: Record<string, number> }) => o.id === trimmedId
      );
      if (option?.scoringEffects) {
        addEffects(rawScores, option.scoringEffects);
      }
    }
  }

  // Role bonus
  const universe = getUniverse(answers.universe);
  const role = universe?.roles.find((r) => r.id === answers.role);
  if (role?.scoringBoosts) {
    addEffects(rawScores, role.scoringBoosts);
  }

  const scores = normalize(rawScores);
  const archetype = selectArchetype(scores);
  const villain = selectVillain(answers.universe, scores);
  const plotTwist = selectPlotTwist(scores);
  const companion = selectCompanion(answers.companion);
  const tone = determineTone(scores);

  // Map option IDs to human-readable labels for readability
  const LABELS: Record<string, Record<string, string>> = {
    situation: {
      just_starting: "Just Beginning the Journey",
      lost: "Wandering in Uncertainty",
      fighting: "Fighting Through Every Obstacle",
      rebuilding: "Rebuilding from the Ground Up",
      leveling_up: "Leveling Up Rapidly",
      on_top: "At the Peak of Power",
      everything_at_once: "Dealing with Everything at Once",
      stuck: "Stuck in an Unexpected Rut",
      secret_mission: "On a Classified Mission",
      pretending_fine: "Definitely Fine. Completely Fine.",
    },
    quest: {
      wealth: "Building an Empire of Wealth",
      love: "Finding a Legendary Love Story",
      career: "Building an Unstoppable Career",
      improve: "Becoming the Best Version of Themselves",
      prove: "Proving Everyone Wrong",
      explore: "Exploring Every Corner of the World",
      better_life: "Creating a Better Life",
      create: "Creating Something That Lasts",
      peace: "Finding Inner Peace",
      no_idea: "Figuring Out What the Quest Even Is",
    },
    strength: {
      intelligence: "Intelligence",
      courage: "Courage",
      creativity: "Creativity",
      humor: "Humor",
      patience: "Patience",
      determination: "Determination",
      loyalty: "Loyalty",
      confidence: "Confidence",
      adaptability: "Adaptability",
      luck: "Infinite Luck",
    },
    weakness: {
      procrastination: "Legendary Procrastination",
      overthinking: "Chronic Overthinking",
      laziness: "Strategic Laziness",
      too_trusting: "Trusting People Too Much",
      impatience: "Explosive Impatience",
      too_emotional: "Overwhelming Emotions",
      ego: "A Magnificent Ego",
      distraction: "Terminal Distraction",
      fear_failure: "Fear of Failure",
      say_yes: "The Inability to Say No",
    },
    power: {
      time: "Time Manipulation",
      teleport: "Teleportation",
      mind_read: "Mind Reading",
      invisibility: "Invisibility",
      fire: "Fire Control",
      ice: "Ice Mastery",
      shadow: "Shadow Control",
      reality: "Reality Editing",
      luck: "Infinite Luck",
      pause: "Time Pausing",
    },
    weapon: {
      sword: "Legendary Sword",
      staff: "Magic Staff",
      bow: "Enchanted Bow",
      hammer: "Giant Hammer",
      invisible_sword: "Invisible Sword",
      spoon: "Magical Spoon",
      forbidden_book: "Book of Forbidden Knowledge",
      whatever_nearby: "Whatever Was Nearby (A Chair)",
    },
    sacrifice: {
      power: "their power",
      wealth: "their wealth",
      reputation: "their reputation",
      freedom: "their freedom",
      dream: "their dream",
      relationship: "their greatest relationship",
      nothing: "absolutely nothing — they found another way",
    },
    fear: {
      failure: "Failure",
      losing_someone: "Losing Someone Close",
      forgotten: "Being Forgotten",
      alone: "Being Alone",
      no_control: "Losing Control",
      embarrassment: "Public Embarrassment",
      unknown: "The Unknown",
      become_villain: "Becoming the Villain",
      money: "Running Out of Money",
      monday: "Monday Morning",
    },
    trust: {
      best_friend: "Best Friend",
      family: "Family",
      team: "Their Team",
      nobody: "Nobody (Self-Reliant)",
      companion: "Their Loyal Companion",
      myself: "Themselves",
      mysterious_stranger: "The Mysterious Stranger",
    },
    problem_solving: {
      fight: "Fight Immediately",
      plan: "Make a 47-Step Plan",
      run: "Tactical Retreat (Running Away)",
      talk: "Talk Their Way Out",
      ask_friend: "Call a Friend in Panic",
      pretend: "Pretend Nothing Happened",
      chaos: "Create Maximum Chaos",
      wait: "Wait for the Right Moment",
    },
    ending: {
      heroic: "Heroic Victory",
      happy: "Happy Ending",
      bittersweet: "Bittersweet Resolution",
      tragic: "Tragic Downfall",
      become_villain: "Become the Villain",
      rule: "Rule the Kingdom",
      disappear: "Disappear Mysteriously",
      secret_ending: "Secret Post-Credit Ending",
      sequel: "Leave It Open for Part 2",
    },
  };

  const get = (field: string, id: string) => {
    if (!id) return id;
    const ids = id.split(",").map((s) => s.trim()).filter(Boolean);
    const labels = ids.map((item) => LABELS[field]?.[item] ?? item);
    return labels.join(", ");
  };

  // Random kingdom/realm generator
  const KINGDOMS_BY_UNIVERSE: Record<string, string[]> = {
    fantasy: [
      "The Sovereign Realm of Aethelgard",
      "Valenreach",
      "The Gilded Duchy of Oakhaven",
      "Sunken Isles of Moros",
      "Duskfall Archipelago",
      "Solas Peak",
      "The High Kingdom of Kael-Tiras",
    ],
    scifi: [
      "Neo-Veridia Prime",
      "Sector 42-B Orbital",
      "The Chronos Colony",
      "Astraea Star-Spire",
      "Vanguard Station 9",
      "Helix Nebula Outpost",
    ],
    magical_academy: [
      "The Arcane Spires of Ravenhurst",
      "Oakhaven College of Sorcery",
      "St. Celestia Academy",
      "The Grand Archives of Sylveria",
      "Astral Spire Institute",
    ],
    pirate: [
      "The Crimson Tides",
      "Port Blackwater",
      "Isle of Whispering Skulls",
      "The Gilded Cove",
      "Kraken's Trench",
    ],
    superhero: [
      "Apex Metropolis",
      "Iron City Prime",
      "Neo-Centropolis",
      "Titan Heights",
      "Vigilance Bay",
    ],
    horror_comedy: [
      "Spooksville Hollow",
      "Gloomhaven Woods",
      "Castle Macabre",
      "The Whispering Bog of Oakhaven",
      "Phantom Pines",
    ],
  };

  const kingdomPool = KINGDOMS_BY_UNIVERSE[answers.universe] ?? KINGDOMS_BY_UNIVERSE.fantasy;
  const kingdomName = kingdomPool[Math.floor(Math.random() * kingdomPool.length)];

  // Clean villain label to prevent "The The ..."
  const cleanVillainLabel = villain.label.replace(/^the\s+the\s+/i, "The ");

  // Generate 🧪 Unreliable Stats
  const unreliableStats: UnreliableStat[] = [
    {
      label: "Bravery",
      percentage: clamp(scores.bravery || 14),
      subStat1: `Will fight a dragon: ${clamp(scores.bravery || 14)}%`,
      subStat2: `Will argue with customer support: ${Math.min(99, 90 + Math.floor(Math.random() * 9))}%`,
    },
    {
      label: "Intelligence",
      percentage: clamp(scores.intelligence || 22),
      subStat1: `Big brain moments: ${Math.max(1, Math.floor((scores.intelligence / 100) * 8))}`,
      subStat2: `Questionable decisions: ${Math.floor(700 + Math.random() * 250)}`,
    },
    {
      label: "Chaos",
      percentage: clamp(scores.chaos || 79),
      subStat1: "Accidentally destroyed: Classified",
      subStat2: "Regrets acknowledged: 0",
    },
    {
      label: "Luck & Survival",
      percentage: clamp(Math.max(scores.optimism, scores.humor, 85)),
      subStat1: "Survival rate despite terrible plans: 100%",
      subStat2: "Villains who missed by 2 inches: 47",
    },
  ];

  // Generate 🌪️ Current Life Status as Movie Mechanics
  const lifeMechanics: LifeMechanic = {
    status: get("situation", answers.situation).toUpperCase(),
    difficulty: "☠️☠️☠️☠️☠️",
    mission: `Somehow conquer "${get("quest", answers.quest)}" without losing sanity`,
    progressPercent: Math.floor(25 + Math.random() * 25),
    boss: `THE DEADLINE & ${get("weakness", answers.weakness).toUpperCase()}`,
    specialAbility: '"I\'ll start tomorrow."',
    abilityEffectiveness: "2%",
  };

  // Generate 🎒 Character Inventory
  const inventory: InventoryItem[] = [
    { name: get("weapon", answers.weapon), power: 88, emoji: "⚔️" },
    { name: companion.label, power: 94, emoji: companion.emoji || "🐉" },
    { name: "Almost-Dead Phone (3%)", power: 4, emoji: "📱" },
    { name: "Emergency Coffee", power: 99, emoji: "☕" },
    { name: "Common Sense", power: 17, emoji: "🧠" },
    { name: "Wallet Balance", power: 6, emoji: "💰" },
    { name: "Blind Confidence", power: 100, emoji: "🧿" },
  ];

  const secretItem = {
    name: "The Chair of Destiny",
    description: "Nobody knows why you have it. Somehow it keeps saving you in every boss fight.",
    emoji: "🪑",
  };

  // Generate 🔮 Scientific Future
  const scientificFuture: FutureEvent[] = [
    {
      timeframe: "Tomorrow",
      prediction: "You will make one brilliant decision, immediately followed by three catastrophically confusing ones.",
    },
    {
      timeframe: "In 7 Days",
      prediction: `Your companion (${companion.label}) will become noticeably smarter than you and take over planning.`,
    },
    {
      timeframe: "In 3 Months",
      prediction: `You will accidentally become the supreme ruler of ${kingdomName}. You will still not read the emails.`,
    },
    {
      timeframe: "In 2 Years",
      prediction: `You will have the exact same unfinished quest open in your mind at 2:00 AM.`,
    },
  ];

  // Generate 🔥 Roasts
  const roast = `You have ${get("strength", answers.strength)} and ${get("power", answers.power)}, but also ${get("weakness", answers.weakness)}. So basically, you're the kind of hero who survives not because of your master plan, but because the villain keeps missing. Your greatest superpower isn't your weapon — it's other people's poor decision-making.`;
  const harderRoast = `You possess the legendary ability to give someone their 19th second chance while the entire kingdom is screaming 'STOP TRUSTING THIS PERSON'. If this movie had a sequel budget of ₹12, you would accidentally invest it in the villain's crypto scheme.`;

  // Generate 🏆 Achievements
  const achievements: AchievementItem[] = [
    {
      id: "procrastinator",
      icon: "🪦",
      title: "Professional Procrastinator",
      description: "Survived 12 apocalyptic deadlines without any advance preparation.",
    },
    {
      id: "main_character",
      icon: "🎭",
      title: "Main Character Syndrome",
      description: "Somehow made the entire kingdom's collapse all about your personal journey.",
    },
    {
      id: "companion_whisperer",
      icon: "🐉",
      title: "Companion Whisperer",
      description: `${companion.label} trusts you more than you trust your own alarm clock.`,
    },
    {
      id: "accidental_hero",
      icon: "💀",
      title: "Accidental Hero",
      description: "Defeated the boss while trying to find the bathroom.",
    },
    {
      id: "questionable_decisions",
      icon: "🤡",
      title: "Questionable Decision Maker",
      description: "Made 847 decisions. Exactly 3 were praised by scholars.",
    },
  ];

  // Generate 🎲 Random Events
  const randomEvents = [
    "🧙 A wizard appears and hands you a glowing ancient scroll. You unroll it. It is a takeout menu.",
    `🐉 ${companion.label} has started a YouTube gaming channel. It already has more followers than the kingdom's military.`,
    `👑 You have accidentally been crowned ruler of ${kingdomName} because you signed a receipt without reading.`,
    "💰 Someone who wronged you three years ago unexpectedly owes you ₹500.",
    `⚔️ Your ${get("weapon", answers.weapon)} made a weird noise and now only speaks fluent French.`,
    "🍕 A pizza arrives at your fortress. Nobody ordered it. The villain paid for extra garlic sauce.",
    "👻 A ghost appears to haunt you, but sees your schedule and decides you have enough going on.",
    "📱 You accidentally butt-dialed the Dark Lord's castle. They listened to your playlist for 40 minutes.",
  ];

  // Generate 🍿 Box Office Projection
  const boxOffice: BoxOfficeData = {
    audienceRating: "⭐⭐⭐⭐⭐ (4.9/5)",
    chaosRating: "🔥🔥🔥🔥🔥 (11/10)",
    survivalProbability: "☠️ 31%",
    criticalReview: '"Nobody knows what actually happened, but somehow it was the most entertaining spectacle of the decade."',
    openingWeekend: "₹847 Crore",
    productionBudget: "₹12",
    profit: "Absolutely Ridiculous",
  };

  // Generate 🏅 Awards
  const awards = [
    { icon: "🥇", title: "Best Accidental Hero", subtitle: "Defeated destiny on pure improvisation" },
    { icon: "🏆", title: "Most Unnecessary Plot Twist", subtitle: "Even the narrator was visibly surprised" },
    { icon: "🏆", title: "Best Use of a Questionable Weapon", subtitle: `Mastered the ${get("weapon", answers.weapon)}` },
    { icon: "🏆", title: "Most Likely to Survive by Accident", subtitle: "100% survival rate despite all odds" },
    { icon: "🏆", title: "Worst Decision Made with Supreme Confidence", subtitle: "Executed with 100% charisma" },
  ];

  return {
    name: answers.name,
    universe: answers.universe,
    kingdomName,
    preferredRole: answers.role,
    actualArchetype: archetype.id,
    archetypeLabel: archetype.label,
    archetypeDescription: archetype.description,
    situation: get("situation", answers.situation),
    quest: get("quest", answers.quest),
    strength: get("strength", answers.strength),
    weakness: get("weakness", answers.weakness),
    problemSolvingStyle: get("problem_solving", answers.problem_solving),
    weapon: get("weapon", answers.weapon),
    companion: answers.companion,
    companionLabel: companion.label,
    power: get("power", answers.power),
    fear: get("fear", answers.fear),
    trust: get("trust", answers.trust),
    sacrifice: get("sacrifice", answers.sacrifice),
    endingPreference: get("ending", answers.ending),
    villain: villain.id,
    villainLabel: cleanVillainLabel,
    plotTwist: plotTwist.label,
    scores,
    unreliableStats,
    lifeMechanics,
    inventory,
    secretItem,
    scientificFuture,
    roast,
    harderRoast,
    achievements,
    randomEvents,
    boxOffice,
    awards,
    ...tone,
  };
}

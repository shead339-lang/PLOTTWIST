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

export interface MovieProfile {
  // User basics
  name: string;
  universe: string;
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

  // Map option IDs to labels for readability
  const LABELS: Record<string, Record<string, string>> = {
    situation: {
      just_starting: "just beginning their journey",
      lost: "wandering in uncertainty",
      fighting: "fighting through every obstacle",
      rebuilding: "rebuilding from the ground up",
      leveling_up: "leveling up rapidly",
      on_top: "at the peak of their power",
      everything_at_once: "dealing with everything at once",
      stuck: "stuck in an unexpected rut",
      secret_mission: "on a classified mission nobody knows about",
      pretending_fine: "definitely fine. Completely fine.",
    },
    quest: {
      wealth: "Building an empire of wealth",
      love: "Finding a great love story",
      career: "Building a legendary career",
      improve: "Becoming the best version of themselves",
      prove: "Proving everyone wrong",
      explore: "Exploring every corner of the world",
      better_life: "Creating a better life",
      create: "Creating something that lasts",
      peace: "Finding inner peace",
      no_idea: "Figuring out what the quest even is",
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
      luck: "Luck",
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
      sword: "the Legendary Sword",
      staff: "the Magic Staff",
      bow: "the Enchanted Bow",
      hammer: "the Giant Hammer",
      invisible_sword: "the Invisible Sword",
      spoon: "the Magical Spoon (don't ask)",
      forbidden_book: "the Book of Forbidden Knowledge",
      whatever_nearby: "whatever was nearby (a chair, probably)",
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
  };

  const get = (field: string, id: string) => {
    if (!id) return id;
    const ids = id.split(",").map((s) => s.trim()).filter(Boolean);
    const labels = ids.map((item) => LABELS[field]?.[item] ?? item);
    return labels.join(", ");
  };

  return {
    name: answers.name,
    universe: answers.universe,
    preferredRole: answers.role,
    actualArchetype: archetype.id,
    archetypeLabel: archetype.label,
    archetypeDescription: archetype.description,
    situation: get("situation", answers.situation),
    quest: get("quest", answers.quest),
    strength: get("strength", answers.strength),
    weakness: get("weakness", answers.weakness),
    problemSolvingStyle: answers.problem_solving,
    weapon: get("weapon", answers.weapon),
    companion: answers.companion,
    companionLabel: companion.label,
    power: get("power", answers.power),
    fear: answers.fear,
    trust: answers.trust,
    sacrifice: get("sacrifice", answers.sacrifice),
    endingPreference: answers.ending,
    villain: villain.id,
    villainLabel: villain.label,
    plotTwist: plotTwist.label,
    scores,
    ...tone,
  };
}

import { ARCHETYPES, COMPANIONS, PLOT_TWISTS, VILLAINS } from "@/data/characters";
import { getUniverse } from "@/data/universes";
import { QUESTIONS } from "@/data/questions";
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
  confidence: number;
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

export interface CriticReview {
  publication: string;
  stars: string;
  review: string;
}

export interface ProductionReport {
  budget: string;
  spent: string;
  remaining: string;
  specialEffects: string;
  actorSalary: string;
  dragonCgi: string;
  openingWeekend: string;
}

export interface SurvivalEntity {
  entity: string;
  rate: string;
  note?: string;
  color?: string;
}

export interface AIJudgement {
  answerQuality: string;
  commonSense: string;
  confidence: string;
  planning: string;
  riskOfMakingWorse: string;
  recommendation: string;
}

export interface FakeNewsItem {
  headline: string;
  dateline: string;
  body: string;
}

export interface KingdomAlertItem {
  title: string;
  alertMessage: string;
  advisory: string;
}

export interface FakeAdItem {
  sponsor: string;
  tagline: string;
  disclaimer: string;
}

export interface MerchandiseItem {
  name: string;
  price: string;
  description: string;
  emoji: string;
  inStock: boolean;
}

export interface ComedyScoreData {
  comedy: number;
  chaos: number;
  commonSense: number;
  plotArmor: number;
  decisionQuality: number;
  survival: number;
  mainCharacterEnergy: number;
  sequelChance: number;
  verdict: string;
}

export interface AudienceReaction {
  user: string;
  quote: string;
}

// ─── Roast Engine Interfaces ──────────────────────────────────
export interface RoastReceipt {
  questionsAnswered: number;
  goodDecisions: number;
  badDecisions: number;
  questionableDecisions: number;
  redFlags: number;
  commonSense: number;
  confidence: number;
  chaos: number;
  luck: number;
  survival: number;
  totalDamage: number;
  finalVerdict: string;
}

export interface WorstDecisionInfo {
  questionNumber: number;
  questionTitle: string;
  answerChosen: string;
  directorReview: string;
  evidence: string;
}

export interface QuestionableClickInfo {
  questionNumber: number;
  questionTitle: string;
  answerChosen: string;
  explanation: string;
}

export interface RoastPersonality {
  title: string;
  emoji: string;
  tagline: string;
  description: string;
}

export interface RoastLevelVariants {
  friendly: string;
  savage: string;
  nuclear: string;
  unnecessary: string;
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
  severity: string;
  quest: string;
  strength: string;
  weakness: string;
  problemSolvingStyle: string;
  emergencyStrategy: string;
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
  achievements: AchievementItem[];
  randomEvents: string[];
  boxOffice: BoxOfficeData;
  awards: { title: string; subtitle: string; icon: string }[];

  // Brand New Comedy Features
  narratorInterruption: string;
  audienceReactions: AudienceReaction[];
  productionReport: ProductionReport;
  criticsReviews: CriticReview[];
  survivalBoard: SurvivalEntity[];
  aiJudgement: AIJudgement;
  fakeNews: FakeNewsItem;
  kingdomAlert: KingdomAlertItem;
  fakeAd: FakeAdItem;
  merchandise: MerchandiseItem[];
  comedyScore: ComedyScoreData;

  // Deep Roast Evidence Engine
  roastReceipt: RoastReceipt;
  worstDecision: WorstDecisionInfo;
  mostQuestionableClick: QuestionableClickInfo;
  thingsYouAdmitted: string[];
  roastPersonality: RoastPersonality;
  roastLevels: RoastLevelVariants;
  roastEvidenceList: string[];
  roast: string;
  harderRoast: string;

  // Tone metadata
  comedyLevel: number;
  dramaLevel: number;
  darkLevel: number;
  storyTone: string;
}

const SCORE_KEYS: (keyof AttributeScores)[] = [
  "bravery", "intelligence", "chaos", "creativity", "loyalty",
  "ambition", "humor", "romance", "independence", "risk",
  "patience", "darkness", "optimism", "mystery", "leadership",
  "confidence",
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

  if (candidates.length > 0) return candidates[candidates.length - 1];

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
    confidence: "reluctant_hero",
  };

  const fallbackId = fallbacks[topAttr] ?? "unqualified_hero";
  return ARCHETYPES.find((a) => a.id === fallbackId) ?? ARCHETYPES[2];
}

function selectVillain(universeId: string, scores: AttributeScores) {
  const universeVillains = VILLAINS.filter(
    (v) => v.universes.includes(universeId) || v.universes.includes("all")
  );

  if (scores.humor > 65) {
    const funny = universeVillains.filter((v) => (v as Record<string, unknown>).funny);
    if (funny.length > 0) return funny[Math.floor(Math.random() * funny.length)];
  }

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

  const roastEvidenceList: string[] = [];
  const thingsYouAdmitted: string[] = [];
  let badDecisionsCount = 0;
  let questionableDecisionsCount = 0;
  let redFlagsCount = 0;
  let goodDecisionsCount = 0;

  interface ChosenOptionMeta {
    questionStep: number;
    questionTitle: string;
    label: string;
    evidence: string;
    severity: number;
    directorReaction?: string;
  }

  const chosenOptionsList: ChosenOptionMeta[] = [];

  // Evaluate each question & collect evidence
  for (const question of QUESTIONS) {
    if (!question.options) continue;
    const rawAnswer = answers[question.id as keyof QuizAnswers];
    if (!rawAnswer) continue;
    const answerIds = typeof rawAnswer === "string" ? rawAnswer.split(",") : [rawAnswer];

    for (const ansId of answerIds) {
      const trimmedId = String(ansId).trim();
      const option = question.options.find((o) => o.id === trimmedId);
      if (option) {
        if (option.scoringEffects) {
          addEffects(rawScores, option.scoringEffects);
        }
        if (option.evidence) {
          roastEvidenceList.push(option.evidence);
        }
        if (option.isBadDecision) {
          badDecisionsCount++;
          questionableDecisionsCount++;
        } else if (option.isRedFlag) {
          redFlagsCount++;
          questionableDecisionsCount++;
        } else {
          goodDecisionsCount++;
        }

        thingsYouAdmitted.push(`Admitted they would choose "${option.label}"`);

        chosenOptionsList.push({
          questionStep: question.step,
          questionTitle: question.title,
          label: option.label,
          evidence: option.evidence || option.label,
          severity: option.severity || 5,
          directorReaction: option.directorReaction,
        });
      }
    }
  }

  // Base role bonus
  const universe = getUniverse(answers.universe);
  const role = universe?.roles.find((r) => r.id === answers.role);
  if (role?.scoringBoosts) {
    addEffects(rawScores, role.scoringBoosts);
  }

  // Boost chaos and humor
  rawScores.humor = (rawScores.humor ?? 0) + 20;
  rawScores.chaos = (rawScores.chaos ?? 0) + (badDecisionsCount * 8) + 15;
  rawScores.confidence = (rawScores.confidence ?? 0) + 40;

  const scores = normalize(rawScores);
  const archetype = selectArchetype(scores);
  const villain = selectVillain(answers.universe, scores);
  const plotTwist = selectPlotTwist(scores);
  const companion = selectCompanion(answers.companion);
  const tone = determineTone(scores);

  // Identify Worst Decision
  const sortedBySeverity = [...chosenOptionsList].sort((a, b) => b.severity - a.severity);
  const worst = sortedBySeverity[0] || {
    questionStep: 6,
    questionTitle: "You have 1 hour to solve your biggest problem.",
    label: "Make the situation significantly worse",
    evidence: "Turns minor inconveniences into apocalyptic wars.",
    severity: 10,
    directorReaction: "He did, in fact, make it significantly worse.",
  };

  const worstDecision: WorstDecisionInfo = {
    questionNumber: worst.questionStep,
    questionTitle: worst.questionTitle,
    answerChosen: worst.label,
    directorReview: worst.directorReaction || "The director has officially marked this as a critical plot hazard.",
    evidence: worst.evidence,
  };

  // Identify Most Questionable Click
  const mostQuestionable = sortedBySeverity[1] || worst;
  const mostQuestionableClick: QuestionableClickInfo = {
    questionNumber: mostQuestionable.questionStep,
    questionTitle: mostQuestionable.questionTitle,
    answerChosen: mostQuestionable.label,
    explanation: `Why? Because apparently "${mostQuestionable.label}" is your preferred tactical survival doctrine.`,
  };

  // Assign Roast Personality Archetype
  let roastPersonality: RoastPersonality;
  if (scores.chaos > 80 && badDecisionsCount >= 4) {
    roastPersonality = {
      title: "THE HUMAN PLOT TWIST",
      emoji: "🧨",
      tagline: "Nobody knows what you're going to do next. Including you.",
      description: "You don't just participate in the story — you actively derail the script at every turn on pure chaotic impulse.",
    };
  } else if (answers.weakness === "procrastination" || answers.problem_solving === "ignore") {
    roastPersonality = {
      title: "THE PROFESSIONAL PROCRASTINATOR",
      emoji: "🛋️",
      tagline: "Converting today's minor problem into tomorrow's three-alarm emergency.",
      description: "Your relationship with deadlines is strictly long-distance. Tomorrow is doing Olympian heavy lifting in your life.",
    };
  } else if (scores.confidence > 75 && scores.intelligence < 40) {
    roastPersonality = {
      title: "THE CONFIDENT IDIOT",
      emoji: "🗿",
      tagline: "Has never let a complete lack of information interfere with supreme confidence.",
      description: "You approach every dragon fight with the confidence of someone who has a plan. Unfortunately, nobody has located the plan.",
    };
  } else if (answers.emergency_strategy === "pretend" || answers.situation === "under_control") {
    roastPersonality = {
      title: "THE MASTER OF EXCUSES",
      emoji: "🎭",
      tagline: "If excuses were currency, you'd own several sovereign nations.",
      description: "You have mastered the ancient martial art of looking innocent while the entire kingdom burns behind you.",
    };
  } else if (answers.weakness === "overthinking" || answers.problem_solving === "plan") {
    roastPersonality = {
      title: "THE OVERTHINKING MACHINE",
      emoji: "🧠",
      tagline: "Can turn 'What should I eat?' into a six-part existential documentary.",
      description: "You spent 58 minutes designing color-coded risk matrices while the Dark Lord's army was actively kicking down the front door.",
    };
  } else {
    roastPersonality = {
      title: "THE ACCIDENTAL SURVIVOR",
      emoji: "💀",
      tagline: "You shouldn't have survived Act 1. Yet somehow, here you are.",
      description: "Your survival rate is 100%, entirely because the villains keep getting distracted by how confusing your decisions are.",
    };
  }

  // Roast Receipt
  const totalDamage = clamp(Math.min(99, 50 + (badDecisionsCount * 7) + (redFlagsCount * 5) + Math.floor(Math.random() * 8)));
  const roastReceipt: RoastReceipt = {
    questionsAnswered: 12,
    goodDecisions: Math.max(1, goodDecisionsCount),
    badDecisions: Math.max(2, badDecisionsCount),
    questionableDecisions: Math.max(3, questionableDecisionsCount),
    redFlags: Math.max(2, redFlagsCount),
    commonSense: clamp(Math.max(6, 100 - (badDecisionsCount * 14))),
    confidence: clamp(scores.confidence || 94),
    chaos: clamp(scores.chaos || 88),
    luck: clamp(100 - totalDamage + 25),
    survival: clamp(Math.max(14, 100 - (badDecisionsCount * 12))),
    totalDamage,
    finalVerdict: "“You are not a main character. You're the plot twist.”",
  };

  // Roast Level Variants
  const roastLevels: RoastLevelVariants = {
    friendly: `You are a lovable protagonist with great intentions, though your decision-making occasionally leaves the kingdom's advisors gently weeping in the hallway.`,
    savage: `You have the confidence of a billionaire and the tactical planning skills of a baked potato. You don't make bad decisions; you give them full-time executive careers.`,
    nuclear: `You possessed 12 opportunities to make a rational choice, and you treated common sense like an optional terms-of-service agreement. If this movie had a budget of ₹12, you would invest ₹11 in the villain's pyramid scheme.`,
    unnecessary: `You are a walking OSHA violation. When destiny arrived, you put it on hold to make coffee, adopt a 40-ton gold-eating dragon, and bring a living-room chair to an apocalyptic duel. Absolutely unnecessary. Would watch again.`,
  };

  const roast = roastLevels.savage;
  const harderRoast = roastLevels.nuclear;

  const KINGDOMS_BY_UNIVERSE: Record<string, string[]> = {
    fantasy: [
      "The Sovereign Realm of Aethelgard",
      "Valenreach",
      "The Gilded Duchy of Oakhaven",
      "Sunken Isles of Moros",
      "Duskfall Archipelago",
    ],
    scifi: [
      "Neo-Veridia Prime",
      "Sector 42-B Orbital",
      "The Chronos Colony",
      "Astraea Star-Spire",
    ],
    magical_academy: [
      "The Arcane Spires of Ravenhurst",
      "Oakhaven College of Sorcery",
      "St. Celestia Academy",
    ],
    pirate: [
      "The Crimson Tides",
      "Port Blackwater",
      "Isle of Whispering Skulls",
    ],
    superhero: [
      "Apex Metropolis",
      "Iron City Prime",
      "Neo-Centropolis",
    ],
    horror_comedy: [
      "Spooksville Hollow",
      "Gloomhaven Woods",
      "Castle Macabre",
    ],
  };

  const kingdomPool = KINGDOMS_BY_UNIVERSE[answers.universe] ?? KINGDOMS_BY_UNIVERSE.fantasy;
  const kingdomName = kingdomPool[Math.floor(Math.random() * kingdomPool.length)];
  const cleanVillainLabel = villain.label.replace(/^the\s+the\s+/i, "The ");

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
      percentage: clamp(scores.chaos || 84),
      subStat1: "Accidentally destroyed: Classified",
      subStat2: "Regrets acknowledged: 0",
    },
    {
      label: "Luck & Survival",
      percentage: 100,
      subStat1: "Survival rate despite terrible plans: 100%",
      subStat2: "Villains who missed by 2 inches: 47",
    },
  ];

  const lifeMechanics: LifeMechanic = {
    status: answers.situation.toUpperCase().replace("_", " "),
    difficulty: "☠️☠️☠️☠️☠️",
    mission: `Somehow survive "${answers.situation.replace("_", " ")}" without alerting the kingdom`,
    progressPercent: Math.floor(25 + Math.random() * 25),
    boss: `THE DEADLINE & ${answers.weakness.toUpperCase().replace("_", " ")}`,
    specialAbility: '"I\'ll start tomorrow."',
    abilityEffectiveness: "2%",
  };

  const inventory: InventoryItem[] = [
    { name: answers.weapon.replace("_", " "), power: 88, emoji: "⚔️" },
    { name: companion.label, power: 94, emoji: companion.emoji || "🐉" },
    { name: "Almost-Dead Phone (3%)", power: 4, emoji: "📱" },
    { name: "Emergency Coffee", power: 99, emoji: "☕" },
    { name: "Common Sense", power: 17, emoji: "🧠" },
    { name: "Wallet Balance", power: 6, emoji: "💰" },
    { name: "Blind Confidence", power: 100, emoji: "🧿" },
  ];

  const secretItem = {
    name: "The Chair of Destiny",
    description: "Makes villains sit down. Attack power: 88. Weakness: Cannot climb stairs.",
    emoji: "🪑",
  };

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
      id: "walking_disaster",
      icon: "🧨",
      title: "Walking Disaster",
      description: `Logged ${badDecisionsCount} catastrophic choices in under three minutes.`,
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
  ];

  const randomEvents = [
    "🧙 A wizard appears and hands you a glowing ancient scroll. You unroll it. It is a takeout menu.",
    `🐉 ${companion.label} has started a YouTube gaming channel. It already has more followers than the kingdom's military.`,
    `👑 You have accidentally been crowned ruler of ${kingdomName} because you signed a receipt without reading.`,
    "💰 Someone who wronged you three years ago unexpectedly owes you ₹500.",
    `⚔️ Your weapon made a weird noise and now only speaks fluent French.`,
    "🍕 A pizza arrives at your fortress. Nobody ordered it. The villain paid for extra garlic sauce.",
    "👻 A ghost appears to haunt you, but sees your schedule and decides you have enough going on.",
    "📱 You accidentally butt-dialed the Dark Lord's castle. They listened to your playlist for 40 minutes.",
  ];

  const boxOffice: BoxOfficeData = {
    audienceRating: "⭐⭐⭐⭐⭐ (4.9/5)",
    chaosRating: "🔥🔥🔥🔥🔥 (11/10)",
    survivalProbability: `${roastReceipt.survival}%`,
    criticalReview: '"Nobody knows what actually happened, but somehow it was the most entertaining spectacle of the decade."',
    openingWeekend: "₹847 Crore",
    productionBudget: "₹12",
    profit: "Absolutely Ridiculous",
  };

  const awards = [
    { icon: "🥇", title: "Best Accidental Hero", subtitle: "Defeated destiny on pure improvisation" },
    { icon: "🏆", title: "Most Unnecessary Plot Twist", subtitle: "Even the narrator was visibly surprised" },
    { icon: "🏆", title: "Best Use of a Questionable Weapon", subtitle: "Executed with 100% confidence" },
    { icon: "🏆", title: "Most Likely to Survive by Accident", subtitle: "100% survival rate despite all odds" },
    { icon: "🏆", title: "Worst Decision Made with Supreme Confidence", subtitle: "Executed with 100% charisma" },
  ];

  const narratorInterruption = `We're going to stop right here. ${answers.name}, why would you choose "${worst.label}" in that situation? Seriously. Why? ...Anyway, let's keep watching.`;

  const audienceReactions: AudienceReaction[] = [
    { user: "Audience Member #1", quote: "Why did they do that? Is there an adult in the kingdom?" },
    { user: "Audience Member #2", quote: "I have no idea what's happening, but the dragon is cool." },
    { user: "Audience Member #3", quote: "This plan is catastrophic. Somehow, it is working." },
  ];

  const productionReport: ProductionReport = {
    budget: "₹12.00",
    spent: "₹11.73",
    remaining: "₹0.27",
    specialEffects: "Someone drew a dragon on MS Paint",
    actorSalary: "One samosa & tap water",
    dragonCgi: "We asked the dragon to act for free",
    openingWeekend: "₹847 Crore (Nobody understands how)",
  };

  const criticsReviews: CriticReview[] = [
    {
      publication: "The Kingdom Times",
      stars: "⭐⭐⭐⭐⭐",
      review: "“We don't understand what happened, but we couldn't look away.”",
    },
    {
      publication: "The Daily Dragon",
      stars: "⭐⭐⭐⭐⭐",
      review: "“The Chair of Destiny deserves an Oscar for Best Supporting Actor.”",
    },
    {
      publication: "Professor Whiskers",
      stars: "⭐⭐",
      review: "“I was literally in the scene and I still cannot explain the plot.”",
    },
    {
      publication: "Your Mother",
      stars: "⭐⭐⭐",
      review: "“Why are you wasting your time making a movie instead of cleaning your room?”",
    },
  ];

  const survivalBoard: SurvivalEntity[] = [
    { entity: `${answers.name} (Hero)`, rate: `${roastReceipt.survival}%`, note: "Plot armor detected", color: "text-yellow-400" },
    { entity: `${companion.label}`, rate: "92%", note: "Smarter than everyone", color: "text-green-400" },
    { entity: `${cleanVillainLabel}`, rate: "4%", note: "Tragic monologuing hazard", color: "text-red-400" },
    { entity: "Random Guard #7", rate: "1%", note: "Said 'what was that noise?'", color: "text-gray-400" },
    { entity: "Person who said 'I'll be right back'", rate: "0.3%", note: "Classic mistake", color: "text-red-500" },
    { entity: "The Chair of Destiny", rate: "100%", note: "Indestructible relic", color: "text-purple-400" },
  ];

  const aiJudgement: AIJudgement = {
    answerQuality: `${Math.max(40, 95 - (badDecisionsCount * 10))}%`,
    commonSense: `${roastReceipt.commonSense}%`,
    confidence: `${roastReceipt.confidence}%`,
    planning: badDecisionsCount >= 3 ? "Not detected" : "Questionable",
    riskOfMakingWorse: `${clamp(50 + (badDecisionsCount * 8))}%`,
    recommendation: "“Good luck. You are going to need it.”",
  };

  const fakeNews: FakeNewsItem = {
    headline: `LOCAL PERSON SOMEHOW SURVIVES ANOTHER MONDAY`,
    dateline: `${kingdomName} — 11:42 PM`,
    body: `Authorities in ${kingdomName} are completely confused after ${answers.name} successfully solved a crisis using "${answers.emergency_strategy.replace("_", " ")}". Witnesses reported seeing ${answers.name} holding coffee and making decisions with 'concerningly supreme confidence'.`,
  };

  const kingdomAlert: KingdomAlertItem = {
    title: `🚨 KINGDOM-WIDE ALERT`,
    alertMessage: `${answers.name} has made another executive decision regarding ${answers.situation.replace("_", " ")}.`,
    advisory: `Experts strongly advise staying indoors. ${companion.label} has officially refused to comment.`,
  };

  const fakeAd: FakeAdItem = {
    sponsor: "PROCRASTINATOR™",
    tagline: "Why solve today's problems today? Tomorrow is available.",
    disclaimer: "Procrastinator™ does not guarantee that tomorrow will be any better.",
  };

  const merchandise: MerchandiseItem[] = [
    {
      name: "Chair of Destiny™",
      price: "₹99,999",
      description: "Does absolutely nothing. Looks majestic.",
      emoji: "🪑",
      inStock: true,
    },
    {
      name: "Emergency Coffee™",
      price: "₹4,999",
      description: "Still doesn't fix your life, but tastes great.",
      emoji: "☕",
      inStock: true,
    },
    {
      name: "Common Sense™",
      price: "₹999",
      description: "Sold separately. Rarely used.",
      emoji: "🧠",
      inStock: true,
    },
    {
      name: "Infinite Luck™",
      price: "₹1,000,000",
      description: "Out of stock. Obviously.",
      emoji: "🧿",
      inStock: false,
    },
  ];

  const comedyScore: ComedyScoreData = {
    comedy: 97,
    chaos: scores.chaos,
    commonSense: roastReceipt.commonSense,
    plotArmor: 100,
    decisionQuality: Math.max(10, 100 - (badDecisionsCount * 15)),
    survival: roastReceipt.survival,
    mainCharacterEnergy: 94,
    sequelChance: 99,
    verdict: "“Absolutely unnecessary. Would watch again.”",
  };

  return {
    name: answers.name,
    universe: answers.universe,
    kingdomName,
    preferredRole: answers.role,
    actualArchetype: archetype.id,
    archetypeLabel: archetype.label,
    archetypeDescription: archetype.description,
    situation: answers.situation.replace("_", " "),
    severity: answers.severity.replace("_", " "),
    quest: `Conquer ${answers.situation.replace("_", " ")}`,
    strength: answers.weapon.replace("_", " "),
    weakness: answers.weakness.replace("_", " "),
    problemSolvingStyle: answers.problem_solving.replace("_", " "),
    emergencyStrategy: answers.emergency_strategy.replace("_", " "),
    weapon: answers.weapon.replace("_", " "),
    companion: answers.companion,
    companionLabel: companion.label,
    power: "Infinite Plot Armor",
    fear: "Monday Morning & Adulting",
    trust: "Their Questionable Intuition",
    sacrifice: answers.sacrifice.replace("_", " "),
    endingPreference: answers.ending.replace("_", " "),
    villain: villain.id,
    villainLabel: cleanVillainLabel,
    plotTwist: plotTwist.label,
    scores,
    unreliableStats,
    lifeMechanics,
    inventory,
    secretItem,
    scientificFuture,
    achievements,
    randomEvents,
    boxOffice,
    awards,
    narratorInterruption,
    audienceReactions,
    productionReport,
    criticsReviews,
    survivalBoard,
    aiJudgement,
    fakeNews,
    kingdomAlert,
    fakeAd,
    merchandise,
    comedyScore,
    roastReceipt,
    worstDecision,
    mostQuestionableClick,
    thingsYouAdmitted,
    roastPersonality,
    roastLevels,
    roastEvidenceList,
    roast,
    harderRoast,
    ...tone,
  };
}

import { ARCHETYPES, COMPANIONS, PLOT_TWISTS, VILLAINS } from "@/data/characters";
import { getUniverse } from "@/data/universes";
import { QUESTIONS } from "@/data/questions";
import type { QuizAnswers } from "@/lib/validation";
import { cleanLabel } from "@/lib/utils/sanitize";

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
  procrastination: number;
  planning: number;
  commonSense: number;
  normality: number;
}

export type ChoiceClassification =
  | "GOOD DECISION"
  | "QUESTIONABLE"
  | "BAD DECISION"
  | "RED FLAG"
  | "ABSOLUTELY UNNECESSARY"
  | "GENIUS"
  | "CRIMINALLY CHAOTIC";

export interface ChoiceRoastItem {
  questionNumber: number;
  questionTitle: string;
  choiceLabel: string;
  choiceEmoji: string;
  evidence: string;
  directorReview: string;
  classification: ChoiceClassification;
  badgeBg: string;
  badgeText: string;
}

export interface RoastDamageFactor {
  label: string;
  points: number;
  emoji: string;
}

export interface AlternateTimeline {
  id: string;
  title: string;
  emoji: string;
  synopsis: string;
  ending: string;
  survival: string;
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
  damageFactors: RoastDamageFactor[];
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
  // Basics
  name: string;
  universe: string;
  kingdomName: string;
  preferredRole: string;

  // Movie Premiere Specs
  movieTitleText: string;
  genreText: string;
  imdbRating: string;
  fictionalBudget: string;
  survivalPercent: number;

  // Derived role
  actualArchetype: string;
  archetypeLabel: string;
  archetypeDescription: string;

  // Balanced Dossier Specs
  biggestStrength: string;
  biggestProblem: string;
  fatalWeakness: string;
  biggestRedFlag: string;
  romanticSubplot: string;

  // Story elements (Sanitized)
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

  // Scores
  scores: AttributeScores;
  normalityScore: number;
  commonSenseScore: number;

  // Interactive breakdowns & alternate realities
  roastMyChoices: ChoiceRoastItem[];
  alternateTimelines: AlternateTimeline[];

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

  // Comedy Narrator Features
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
  "confidence", "procrastination", "planning", "commonSense", "normality",
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
  return ARCHETYPES[2];
}

function selectVillain(universeId: string, scores: AttributeScores) {
  const universeVillains = VILLAINS.filter(
    (v) => v.universes.includes(universeId) || v.universes.includes("all")
  );

  if (scores.humor > 65) {
    const funny = universeVillains.filter((v) => (v as Record<string, unknown>).funny);
    if (funny.length > 0) return funny[Math.floor(Math.random() * funny.length)];
  }

  const filtered = universeVillains.filter((v) => !(v as Record<string, unknown>).funny);
  return filtered[Math.floor(Math.random() * filtered.length)] ?? VILLAINS[0];
}

function selectBehavioralPlotTwist(scores: AttributeScores, answers: QuizAnswers): string {
  if (answers.weakness === "procrastination" || answers.alarm === "snooze_17") {
    return "The villain wasn't trying to destroy the kingdom. He was trying to get you to meet your deadline before midnight.";
  }
  if (scores.chaos > 75) {
    return "Every single catastrophe in the movie was accidentally caused by your very first decision in Scene 1.";
  }
  if (answers.crush_text === "airplane_mode" || answers.crush_text === "send_memes") {
    return "The Dark Lord wasn't seeking ancient treasure — he was just trying to get a direct answer to his text message.";
  }
  if (scores.confidence > 75) {
    return "The ancient prophecy was actually about your companion. You were only cast to carry the snacks.";
  }
  return "You were the real villain all along, but you were having too much fun to notice.";
}

function selectCompanion(answeredCompanion: string) {
  const first = answeredCompanion ? answeredCompanion.split(",")[0].trim() : "";
  return COMPANIONS.find((c) => c.id === first || c.id === answeredCompanion) ?? COMPANIONS[0];
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

  return { comedyLevel, dramaLevel, darkLevel, storyTone };
}

export function buildMovieProfile(answers: QuizAnswers): MovieProfile {
  const rawScores: Record<string, number> = Object.fromEntries(
    SCORE_KEYS.map((k) => [k, 0])
  );

  const roastEvidenceList: string[] = [];
  const thingsYouAdmitted: string[] = [];
  const roastMyChoices: ChoiceRoastItem[] = [];

  let badDecisionsCount = 0;
  let questionableDecisionsCount = 0;
  let redFlagsCount = 0;
  let goodDecisionsCount = 0;

  interface ChosenOptionMeta {
    questionStep: number;
    questionTitle: string;
    label: string;
    emoji: string;
    evidence: string;
    severity: number;
    directorReaction?: string;
    isBad?: boolean;
    isRed?: boolean;
  }

  const chosenOptionsList: ChosenOptionMeta[] = [];

  // Evaluate all 12 questions
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

        // Determine Rich Classification
        let classification: ChoiceClassification = "QUESTIONABLE";
        let badgeBg = "bg-amber-500/20 border-amber-500/30";
        let badgeText = "text-amber-400";

        const isGood = !option.isBadDecision && !option.isRedFlag && (option.severity ?? 5) <= 3;
        const isChaotic = (option.severity ?? 5) >= 10;
        const isUnnecessary = option.id === "chair" || option.id === "buy_weird" || option.id === "send_memes";
        const isGenius = option.id === "call_friend" || option.id === "common_sense";

        if (isGood) {
          classification = "GOOD DECISION";
          badgeBg = "bg-emerald-500/20 border-emerald-500/30";
          badgeText = "text-emerald-400";
          goodDecisionsCount++;
        } else if (isChaotic) {
          classification = "CRIMINALLY CHAOTIC";
          badgeBg = "bg-orange-500/20 border-orange-500/30";
          badgeText = "text-orange-400";
          badDecisionsCount++;
          questionableDecisionsCount++;
        } else if (option.isRedFlag) {
          classification = "RED FLAG";
          badgeBg = "bg-rose-500/20 border-rose-500/30";
          badgeText = "text-rose-400";
          redFlagsCount++;
          questionableDecisionsCount++;
        } else if (isUnnecessary) {
          classification = "ABSOLUTELY UNNECESSARY";
          badgeBg = "bg-purple-500/20 border-purple-500/30";
          badgeText = "text-purple-300";
          badDecisionsCount++;
          questionableDecisionsCount++;
        } else if (isGenius) {
          classification = "GENIUS";
          badgeBg = "bg-cyan-500/20 border-cyan-500/30";
          badgeText = "text-cyan-400";
          goodDecisionsCount++;
        } else if (option.isBadDecision) {
          classification = "BAD DECISION";
          badgeBg = "bg-red-500/20 border-red-500/30";
          badgeText = "text-red-400";
          badDecisionsCount++;
          questionableDecisionsCount++;
        } else {
          questionableDecisionsCount++;
        }

        thingsYouAdmitted.push(`Admitted they would choose "${option.label}"`);

        chosenOptionsList.push({
          questionStep: question.step,
          questionTitle: question.title,
          label: option.label,
          emoji: option.emoji,
          evidence: option.evidence || option.label,
          severity: option.severity || 5,
          directorReaction: option.directorReaction,
          isBad: option.isBadDecision,
          isRed: option.isRedFlag,
        });

        // 3-Piece Itemized Choice Breakdown
        const directorReview = option.directorReaction
          ? option.directorReaction
          : isGood
          ? "The director is surprised by this display of competence."
          : "The director has filed this under Critical Plot Hazards.";

        roastMyChoices.push({
          questionNumber: question.step,
          questionTitle: question.title,
          choiceLabel: option.label,
          choiceEmoji: option.emoji,
          evidence: option.evidence || "Tactical maneuver noted in official dossier.",
          directorReview,
          classification,
          badgeBg,
          badgeText,
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

  rawScores.humor = (rawScores.humor ?? 0) + 25;
  rawScores.chaos = (rawScores.chaos ?? 0) + (badDecisionsCount * 10) + 20;
  rawScores.confidence = (rawScores.confidence ?? 0) + 45;

  const scores = normalize(rawScores);
  const archetype = selectArchetype(scores);
  const villain = selectVillain(answers.universe, scores);
  const companion = selectCompanion(answers.companion);
  const plotTwistText = selectBehavioralPlotTwist(scores, answers);
  const tone = determineTone(scores);

  // Identify Worst Decision
  const sortedBySeverity = [...chosenOptionsList].sort((a, b) => b.severity - a.severity);
  const worst = sortedBySeverity[0] || {
    questionStep: 7,
    questionTitle: "You have 1 hour to solve your biggest problem.",
    label: "Make the situation significantly worse",
    emoji: "🤡",
    evidence: "Turns minor inconveniences into apocalyptic wars.",
    severity: 10,
    directorReaction: "He did, in fact, make it significantly worse.",
  };

  const worstDecision: WorstDecisionInfo = {
    questionNumber: worst.questionStep,
    questionTitle: worst.questionTitle,
    answerChosen: worst.label,
    directorReview: worst.directorReaction || "The director paused production to question your judgment.",
    evidence: worst.evidence,
  };

  // Identify Most Questionable Click
  const mostQuestionable = sortedBySeverity[1] || worst;
  const mostQuestionableClick: QuestionableClickInfo = {
    questionNumber: mostQuestionable.questionStep,
    questionTitle: mostQuestionable.questionTitle,
    answerChosen: mostQuestionable.label,
    explanation: `Why? Because apparently "${mostQuestionable.label}" is your entire tactical doctrine.`,
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
  } else if (answers.weakness === "procrastination" || answers.problem_solving === "ignore" || answers.alarm === "snooze_17") {
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
  } else if (answers.footsteps === "walk_faster" || answers.crush_text === "airplane_mode") {
    roastPersonality = {
      title: "THE MASTER OF EXCUSES",
      emoji: "🎭",
      tagline: "If excuses were currency, you'd own several sovereign nations.",
      description: "You have mastered the ancient martial art of looking innocent while the entire kingdom burns behind you.",
    };
  } else if (answers.weakness === "overthinking" || answers.crush_text === "overthink") {
    roastPersonality = {
      title: "THE OVERTHINKING MACHINE",
      emoji: "🧠",
      tagline: "Can turn 'What should I eat?' into a six-part existential documentary.",
      description: "You spent 58 minutes designing color-coded risk matrices while the Dark Lord was actively kicking down the front door.",
    };
  } else {
    roastPersonality = {
      title: "THE ACCIDENTAL SURVIVOR",
      emoji: "💀",
      tagline: "You shouldn't have survived Act 1. Yet somehow, here you are.",
      description: "Your survival rate is 100%, entirely because the villains keep getting distracted by how confusing your decisions are.",
    };
  }

  // Normality & Common sense calculations
  const normalityScore = clamp(Math.max(4, 100 - (badDecisionsCount * 16) - (redFlagsCount * 9)));
  const commonSenseScore = clamp(Math.max(7, 100 - (badDecisionsCount * 14)));
  const survivalPercent = clamp(Math.max(14, 100 - (badDecisionsCount * 13)));

  // Explainable Roast Damage Score
  const damageFactors: RoastDamageFactor[] = [
    { label: "Extreme Chaos Quotient", points: 24, emoji: "🧨" },
    { label: "Questionable Choices Logged", points: badDecisionsCount * 5 + 10, emoji: "⚠️" },
    { label: "Red Flags Ignored", points: redFlagsCount * 6 + 8, emoji: "🚩" },
    { label: "Unearned Supreme Confidence", points: 15, emoji: "🗿" },
    { label: "Severe Procrastination Tactics", points: 12, emoji: "😴" },
    { label: "Delusional Optimism", points: 10, emoji: "🙏" },
  ];

  const totalDamage = clamp(
    damageFactors.reduce((acc, f) => acc + f.points, 0)
  );

  const roastReceipt: RoastReceipt = {
    questionsAnswered: 12,
    goodDecisions: Math.max(1, goodDecisionsCount),
    badDecisions: Math.max(2, badDecisionsCount),
    questionableDecisions: Math.max(3, questionableDecisionsCount),
    redFlags: Math.max(2, redFlagsCount),
    commonSense: commonSenseScore,
    confidence: clamp(scores.confidence || 94),
    chaos: clamp(scores.chaos || 91),
    luck: clamp(100 - totalDamage + 25),
    survival: survivalPercent,
    totalDamage,
    damageFactors,
    finalVerdict: "“Congratulations. You have been thoroughly investigated.”",
  };

  // Roast Level Variants
  const roastLevels: RoastLevelVariants = {
    friendly: `You are a lovable protagonist with great intentions, though your decision-making occasionally leaves the kingdom's advisors gently weeping in the hallway.`,
    savage: `You have the confidence of a billionaire and the tactical planning skills of a baked potato. You don't make bad decisions; you give them full-time executive careers.`,
    nuclear: `You possessed 12 opportunities to make a rational choice, and you treated common sense like an optional terms-of-service agreement. If this movie had a budget of ₹47, you would invest ₹46 in the villain's pyramid scheme.`,
    unnecessary: `You are a walking OSHA violation. When destiny arrived, you put it on hold to snooze 17 times, adopt a 40-ton gold-eating dragon, and bring a living-room chair to an apocalyptic duel. Absolutely unnecessary. Would watch again.`,
  };

  const roast = roastLevels.savage;
  const harderRoast = roastLevels.nuclear;

  const KINGDOMS_BY_UNIVERSE: Record<string, string[]> = {
    fantasy: ["The Sovereign Realm of Aethelgard", "Valenreach", "The Gilded Duchy of Oakhaven"],
    scifi: ["Neo-Veridia Prime", "Sector 42-B Orbital", "The Chronos Colony"],
    magical_academy: ["The Arcane Spires of Ravenhurst", "Oakhaven College of Sorcery"],
    pirate: ["The Crimson Tides", "Port Blackwater", "Isle of Whispering Skulls"],
    superhero: ["Apex Metropolis", "Iron City Prime", "Neo-Centropolis"],
    horror_comedy: ["Spooksville Hollow", "Gloomhaven Woods", "Castle Macabre"],
    zombie_apocalypse: ["Sector 7 Safe Zone", "New Dawn Sanctuary", "Deadwood Outpost"],
    corporate_office: ["Global Synergy Tower", "Floor 42 Open Plan", "The Breakroom Dimension"],
    bollywood_drama: ["The Grand Raichand Palace", "Marine Drive Mansions", "Band Baaja Estate"],
  };

  const kingdomPool = KINGDOMS_BY_UNIVERSE[answers.universe] ?? KINGDOMS_BY_UNIVERSE.fantasy;
  const kingdomName = kingdomPool[Math.floor(Math.random() * kingdomPool.length)];
  const cleanVillainLabel = villain.label.replace(/^the\s+the\s+/i, "The ");

  // 🔀 Personalized Alternate Timelines citing actual user answers
  const userAlarmClean = cleanLabel(answers.alarm);
  const userWeaponClean = cleanLabel(answers.weapon);
  const userWeaknessClean = cleanLabel(answers.weakness);

  const alternateTimelines: AlternateTimeline[] = [
    {
      id: "villain_arc",
      title: "THE VILLAIN ERA",
      emoji: "😈",
      synopsis: `Because you chose ${userAlarmClean.toLowerCase()} and armed yourself with ${userWeaponClean.toLowerCase()}, Timeline B turned you into the supreme dark ruler of ${kingdomName}. You have permanently banned all Monday morning alarms.`,
      ending: "You rule supreme with your companion as head of defense.",
      survival: "99%",
    },
    {
      id: "billionaire",
      title: "THE FINANCIAL MENACE",
      emoji: "💰",
      synopsis: `Because you handled your windfall with total chaos, Timeline C turned your reckless spending into the realm's only gold monopoly. You are now the wealthiest, most confused billionaire in history.`,
      ending: "The IRS arrived. You bribed them with dragons.",
      survival: "84%",
    },
    {
      id: "act1_casualty",
      title: "THE ACT 1 CASUALTY",
      emoji: "💀",
      synopsis: `Because you gave a sentimental speech in Scene 1 about overcoming ${userWeaknessClean.toLowerCase()}, the screenwriters eliminated your character before the first commercial break.`,
      ending: "A golden statue was built in your honor. It looks nothing like you.",
      survival: "0.2%",
    },
    {
      id: "secret_boss",
      title: "THE SECRET FINAL BOSS",
      emoji: "👑",
      synopsis: `Timeline E reveals that your apparent incompetence was actually a 400-IQ master conspiracy. You orchestrated the entire crisis just to avoid responding to a text message.`,
      ending: "The audience stood up and applauded for 12 straight minutes.",
      survival: "100%",
    },
  ];

  // Sanitized Strings for Narrative UI
  const sanitizedWeapon = cleanLabel(answers.weapon);
  const sanitizedWeakness = cleanLabel(answers.weakness);
  const sanitizedProblemSolving = cleanLabel(answers.problem_solving);
  const sanitizedEmergency = cleanLabel(answers.footsteps);

  const unreliableStats: UnreliableStat[] = [
    {
      label: "Bravery",
      percentage: clamp(scores.bravery || 18),
      subStat1: `Will fight a dragon: ${clamp(scores.bravery || 18)}%`,
      subStat2: `Will answer an unknown phone call: 2%`,
    },
    {
      label: "Intelligence",
      percentage: clamp(scores.intelligence || 24),
      subStat1: `Big brain moments: ${Math.max(1, Math.floor((scores.intelligence / 100) * 8))}`,
      subStat2: `Questionable decisions: ${Math.floor(700 + Math.random() * 250)}`,
    },
    {
      label: "Chaos",
      percentage: clamp(scores.chaos || 91),
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
    status: cleanLabel(answers.alarm).toUpperCase(),
    difficulty: "☠️☠️☠️☠️☠️",
    mission: `Survive in ${kingdomName} without alarming local authorities`,
    progressPercent: Math.floor(25 + Math.random() * 25),
    boss: `THE DEADLINE & ${sanitizedWeakness.toUpperCase()}`,
    specialAbility: '"I\'ll start tomorrow."',
    abilityEffectiveness: "2%",
  };

  const inventory: InventoryItem[] = [
    { name: sanitizedWeapon, power: 88, emoji: "⚔️" },
    { name: companion.label, power: 94, emoji: companion.emoji || "🐉" },
    { name: "An Almost-Dead Phone (3%)", power: 4, emoji: "📱" },
    { name: "Emergency Coffee", power: 99, emoji: "☕" },
    { name: "Common Sense", power: commonSenseScore, emoji: "🧠" },
    { name: "Blind Confidence", power: 100, emoji: "🧿" },
  ];

  const secretItem = {
    name: "The Chair of Destiny",
    description: "Makes villains sit down and reflect on their choices. Power: 88. Weakness: Stairs.",
    emoji: "🪑",
  };

  const scientificFuture: FutureEvent[] = [
    {
      timeframe: "Tomorrow",
      prediction: "You will make one brilliant decision, immediately followed by three catastrophically confusing ones.",
    },
    {
      timeframe: "In 7 Days",
      prediction: `Your companion (${companion.label}) will become noticeably smarter than you and take over tactical leadership.`,
    },
    {
      timeframe: "In 3 Months",
      prediction: `You will accidentally become ruler of ${kingdomName}. You will still not read the emails.`,
    },
    {
      timeframe: "In 2 Years",
      prediction: `You will have the exact same unfinished quest open in your mind at 2:00 AM.`,
    },
  ];

  const achievements: AchievementItem[] = [
    {
      id: "procrastinator",
      icon: "🛋️",
      title: "Professional Procrastinator",
      description: "Repeatedly scheduled victory for a mythical date known as 'Tomorrow'.",
    },
    {
      id: "walking_disaster",
      icon: "🧨",
      title: "Walking Disaster",
      description: `Logged ${badDecisionsCount} catastrophic choices in under three minutes.`,
    },
    {
      id: "confidence_no_evidence",
      icon: "🗿",
      title: "Confidence Without Evidence",
      description: "Operated with 100% swagger and 0% advance preparation.",
    },
    {
      id: "financial_menace",
      icon: "💸",
      title: "Financial Menace",
      description: "Treated a life-changing windfall like arcade tokens in under 72 hours.",
    },
    {
      id: "plot_armor",
      icon: "🍀",
      title: "Infinite Plot Armor",
      description: "Surviving purely because the writers haven't figured out how to replace you.",
    },
  ];

  const randomEvents = [
    "🧙 A wizard appears and hands you a glowing ancient scroll. You unroll it. It is a takeout menu.",
    `🐉 ${companion.label} has started a gaming channel. It already has more followers than the kingdom's military.`,
    `👑 You have accidentally been crowned ruler of ${kingdomName} because you signed a receipt without reading.`,
    "🍕 A pizza arrives at your fortress. Nobody ordered it. The villain paid for extra garlic sauce.",
    "👻 A ghost appears to haunt you, but sees your calendar and decides you have enough going on.",
  ];

  const boxOffice: BoxOfficeData = {
    audienceRating: "⭐⭐⭐⭐⭐ (4.9/5)",
    chaosRating: "🔥🔥🔥🔥🔥 (11/10)",
    survivalProbability: `${survivalPercent}%`,
    criticalReview: '"Nobody knows what actually happened, but somehow it was the most entertaining spectacle of the decade."',
    openingWeekend: "₹847 Crore",
    productionBudget: "₹47",
    profit: "Absolutely Ridiculous",
  };

  const awards = [
    { icon: "🥇", title: "Best Accidental Hero", subtitle: "Defeated destiny on pure improvisation" },
    { icon: "🏆", title: "Most Unnecessary Plot Twist", subtitle: "Even the narrator was visibly surprised" },
    { icon: "🏆", title: "Best Use of a Questionable Weapon", subtitle: "Executed with 100% confidence" },
    { icon: "🏆", title: "Worst Decision Made with Supreme Confidence", subtitle: "Executed with 100% charisma" },
  ];

  // Sharper, more cinematic director interruption
  const narratorInterruption = `🛑 DIRECTOR INTERRUPTION: You chose "${worst.label}". We paused production to question your judgment. Production has resumed.`;

  const audienceReactions: AudienceReaction[] = [
    { user: "Audience Member #1", quote: "Why did they do that? Is there an adult in the kingdom?" },
    { user: "Audience Member #2", quote: "I have no idea what's happening, but the dragon is cool." },
    { user: "Audience Member #3", quote: "This plan is catastrophic. Somehow, it is working." },
  ];

  const productionReport: ProductionReport = {
    budget: "₹47.00",
    spent: "₹46.73",
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
    { entity: `${answers.name} (Hero)`, rate: `${survivalPercent}%`, note: "Plot armor detected", color: "text-yellow-400" },
    { entity: `${companion.label}`, rate: "92%", note: "Smarter than everyone", color: "text-green-400" },
    { entity: `${cleanVillainLabel}`, rate: "4%", note: "Tragic monologuing hazard", color: "text-red-400" },
    { entity: "Random Guard #7", rate: "1%", note: "Said 'what was that noise?'", color: "text-gray-400" },
    { entity: "The Chair of Destiny", rate: "100%", note: "Indestructible relic", color: "text-purple-400" },
  ];

  const aiJudgement: AIJudgement = {
    answerQuality: `${Math.max(40, 95 - (badDecisionsCount * 10))}%`,
    commonSense: `${commonSenseScore}%`,
    confidence: `${roastReceipt.confidence}%`,
    planning: badDecisionsCount >= 3 ? "Not detected" : "Questionable",
    riskOfMakingWorse: `${clamp(50 + (badDecisionsCount * 8))}%`,
    recommendation: "“Good luck. You are going to need it.”",
  };

  const fakeNews: FakeNewsItem = {
    headline: `LOCAL PERSON SOMEHOW SURVIVES ANOTHER MONDAY`,
    dateline: `${kingdomName} — 11:42 PM`,
    body: `Authorities in ${kingdomName} are completely confused after ${answers.name} successfully resolved a crisis using "${sanitizedWeapon}". Witnesses reported seeing ${answers.name} holding coffee and making decisions with 'concerningly supreme confidence'.`,
  };

  const kingdomAlert: KingdomAlertItem = {
    title: `🚨 KINGDOM-WIDE ALERT`,
    alertMessage: `${answers.name} has made another executive decision regarding the realm.`,
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
    commonSense: commonSenseScore,
    plotArmor: 100,
    decisionQuality: Math.max(10, 100 - (badDecisionsCount * 15)),
    survival: survivalPercent,
    mainCharacterEnergy: 94,
    sequelChance: 99,
    verdict: "“Absolutely unnecessary. Would watch again.”",
  };

  return {
    name: answers.name,
    universe: answers.universe,
    kingdomName,
    preferredRole: answers.role,
    movieTitleText: `${answers.name.toUpperCase()}: THE DISASTER SAGA`,
    genreText: "Disaster Comedy / Cinematic Chaos",
    imdbRating: "9.2/10",
    fictionalBudget: "₹47",
    survivalPercent,
    actualArchetype: archetype.id,
    archetypeLabel: archetype.label,
    archetypeDescription: archetype.description,
    biggestStrength: "Somehow survives everything on pure accidental plot armor",
    biggestProblem: "You are the reason everything needs surviving in the first place",
    situation: cleanLabel(answers.alarm),
    severity: "Extreme",
    quest: `Somehow survive ${kingdomName}`,
    strength: sanitizedWeapon,
    weakness: sanitizedWeakness,
    fatalWeakness: answers.weakness === "procrastination" ? "“I'll do it tomorrow.”" : sanitizedWeakness,
    biggestRedFlag: worst.evidence,
    romanticSubplot: answers.crush_text === "send_memes" ? "Deflecting all emotional intimacy with 47 shitposts" : "Complicated & Unresolved",
    problemSolvingStyle: sanitizedProblemSolving,
    emergencyStrategy: sanitizedEmergency,
    weapon: sanitizedWeapon,
    companion: answers.companion,
    companionLabel: companion.label,
    power: "Infinite Plot Armor",
    fear: "Monday Morning Alarms",
    trust: "Their Questionable Intuition",
    sacrifice: "Daily Screen Time",
    endingPreference: cleanLabel(answers.ending),
    villain: villain.id,
    villainLabel: cleanVillainLabel,
    plotTwist: plotTwistText,
    scores,
    normalityScore,
    commonSenseScore,
    roastMyChoices,
    alternateTimelines,
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

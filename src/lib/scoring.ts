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
  roast: string;
  harderRoast: string;
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
        (o: { id: string; scoringEffects?: Record<string, number> }) => o.id === trimmedId
      );
      if (option?.scoringEffects) {
        addEffects(rawScores, option.scoringEffects);
      }
    }
  }

  // Base role bonus
  const universe = getUniverse(answers.universe);
  const role = universe?.roles.find((r) => r.id === answers.role);
  if (role?.scoringBoosts) {
    addEffects(rawScores, role.scoringBoosts);
  }

  // Add default boosts for comedy
  rawScores.humor = (rawScores.humor ?? 0) + 15;
  rawScores.chaos = (rawScores.chaos ?? 0) + 20;

  const scores = normalize(rawScores);
  const archetype = selectArchetype(scores);
  const villain = selectVillain(answers.universe, scores);
  const plotTwist = selectPlotTwist(scores);
  const companion = selectCompanion(answers.companion);
  const tone = determineTone(scores);

  const LABELS: Record<string, Record<string, string>> = {
    situation: {
      under_control: "Everything Is Under Control (Suspicious)",
      everything_at_once: "Everything Is Happening At Once",
      surviving: "Just Barely Surviving",
      getting_rich: "Trying To Become Rich",
      relationship: "Relationship Complications",
      no_idea: "Honestly No Idea",
    },
    severity: {
      mild: "Mild (“I'll probably be fine”)",
      concerning: "Concerning (“We should probably talk”)",
      very_concerning: "Very Concerning (“Call the wizard”)",
      ridiculous: "Absolutely Ridiculous (“Cancel the movie”)",
      no_saving: "There Is No Saving Me (“Great for the box office”)",
    },
    problem_solving: {
      plan: "Making a 47-Step Plan",
      ignore: "Ignoring It Completely",
      coffee: "Drinking Excessive Coffee",
      ask_friend: "Calling a Friend in Panic",
      hope: "Hoping the Universe Fixes It",
      make_worse: "Making the Situation Significantly Worse",
    },
    weakness: {
      procrastination: "Legendary Procrastination",
      overthinking: "Chronic Overthinking",
      too_trusting: "Trusting the Wrong Person",
      spending: "Spending Money Recklessly",
      ego: "Unearned Confidence",
      phone: "Phone at 3% Battery",
      say_yes: "“I'll do it tomorrow”",
      i_am_the_problem: "Honestly, I Am The Problem",
    },
    emergency_strategy: {
      fight: "Fighting Immediately",
      strategy: "Making an Overly Elaborate Plan",
      run: "Tactical Retreat (Running Away)",
      call: "Calling a Friend in Tears",
      coffee_emergency: "Making Coffee First",
      nap: "Taking a Quick Nap",
      pretend: "Pretending Not to See Anything",
    },
    weapon: {
      sword: "Legendary Sword",
      staff: "Magic Staff",
      chair: "The Chair of Destiny",
      spoon: "Magical Spoon",
      phone_relic: "Almost-Dead Phone (3% Battery)",
      coffee_relic: "Emergency Coffee (PWR 99)",
      forbidden_book: "Book of Forbidden Knowledge",
      common_sense: "Common Sense (Fragile)",
    },
    companion: {
      dragon: "Ember the Dragon",
      talking_cat: "Professor Whiskers",
      wolf: "Shadow the Wolf",
      robot: "ARLO-7",
      goblin: "Tiny Angry Goblin",
      best_friend: "Loyal Best Friend",
    },
    sacrifice: {
      power: "their magical powers",
      wealth: "their accumulated wealth",
      reputation: "their reputation",
      freedom: "their freedom",
      screen_time: "their daily screen time",
      nothing: "absolutely nothing (found a chaotic loophole)",
    },
    ending: {
      heroic: "Heroic Victory (Confused, but Victorious)",
      happy: "Happy Ending (With Sequel Hints)",
      tragic: "Tragic & Dramatic (Excessive Rain)",
      become_villain: "Become the Villain (Better Outfits)",
      rule: "Rule the Kingdom (Still Not Reading Emails)",
      sequel: "Leave It Open for Part 2",
    },
  };

  const get = (field: string, id: string) => {
    if (!id) return id;
    const ids = id.split(",").map((s) => s.trim()).filter(Boolean);
    const labels = ids.map((item) => LABELS[field]?.[item] ?? item);
    return labels.join(", ");
  };

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
    status: get("situation", answers.situation).toUpperCase(),
    difficulty: "☠️☠️☠️☠️☠️",
    mission: `Somehow conquer "${get("situation", answers.situation)}" without losing sanity`,
    progressPercent: Math.floor(25 + Math.random() * 25),
    boss: `THE DEADLINE & ${get("weakness", answers.weakness).toUpperCase()}`,
    specialAbility: '"I\'ll start tomorrow."',
    abilityEffectiveness: "2%",
  };

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

  const roast = `You have ${get("emergency_strategy", answers.emergency_strategy)} and ${get("weapon", answers.weapon)}, but also ${get("weakness", answers.weakness)}. So basically, you're the kind of hero who survives not because of your master plan, but because the villain keeps missing. Your greatest superpower isn't your weapon — it's other people's poor decision-making.`;
  const harderRoast = `You possess the legendary ability to give someone their 19th second chance while the entire kingdom is screaming 'STOP TRUSTING THIS PERSON'. If this movie had a sequel budget of ₹12, you would accidentally invest it in the villain's crypto scheme.`;

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

  const boxOffice: BoxOfficeData = {
    audienceRating: "⭐⭐⭐⭐⭐ (4.9/5)",
    chaosRating: "🔥🔥🔥🔥🔥 (11/10)",
    survivalProbability: "☠️ 31%",
    criticalReview: '"Nobody knows what actually happened, but somehow it was the most entertaining spectacle of the decade."',
    openingWeekend: "₹847 Crore",
    productionBudget: "₹12",
    profit: "Absolutely Ridiculous",
  };

  const awards = [
    { icon: "🥇", title: "Best Accidental Hero", subtitle: "Defeated destiny on pure improvisation" },
    { icon: "🏆", title: "Most Unnecessary Plot Twist", subtitle: "Even the narrator was visibly surprised" },
    { icon: "🏆", title: "Best Use of a Questionable Weapon", subtitle: `Mastered the ${get("weapon", answers.weapon)}` },
    { icon: "🏆", title: "Most Likely to Survive by Accident", subtitle: "100% survival rate despite all odds" },
    { icon: "🏆", title: "Worst Decision Made with Supreme Confidence", subtitle: "Executed with 100% charisma" },
  ];

  // Brand New Comedy Feature Data:
  const narratorInterruption = `We're going to stop right here. ${answers.name}, why would you choose "${get("problem_solving", answers.problem_solving)}" in that situation? Seriously. Why? ...Anyway, let's keep watching.`;

  const audienceReactions: AudienceReaction[] = [
    { user: "Audience Member #1", quote: "Why did they do that? Is there a doctor in the kingdom?" },
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
    { entity: `${answers.name} (Hero)`, rate: "87%", note: "Plot armor detected", color: "text-yellow-400" },
    { entity: `${companion.label}`, rate: "92%", note: "Smarter than everyone", color: "text-green-400" },
    { entity: `${cleanVillainLabel}`, rate: "4%", note: "Tragic monologuing hazard", color: "text-red-400" },
    { entity: "Random Guard #7", rate: "1%", note: "Said 'what was that noise?'", color: "text-gray-400" },
    { entity: "Person who said 'I'll be right back'", rate: "0.3%", note: "Classic mistake", color: "text-red-500" },
    { entity: "The Chair of Destiny", rate: "100%", note: "Indestructible relic", color: "text-purple-400" },
  ];

  const aiJudgement: AIJudgement = {
    answerQuality: "72%",
    commonSense: "14%",
    confidence: "96%",
    planning: "Not detected",
    riskOfMakingWorse: "89%",
    recommendation: "“Good luck. You are going to need it.”",
  };

  const fakeNews: FakeNewsItem = {
    headline: `LOCAL PERSON SOMEHOW SURVIVES ANOTHER MONDAY`,
    dateline: `${kingdomName} — 11:42 PM`,
    body: `Authorities in ${kingdomName} are completely confused after ${answers.name} successfully solved a crisis using "${get("emergency_strategy", answers.emergency_strategy)}". Witnesses reported seeing ${answers.name} holding coffee and making decisions with 'concerningly supreme confidence'.`,
  };

  const kingdomAlert: KingdomAlertItem = {
    title: `🚨 KINGDOM-WIDE ALERT`,
    alertMessage: `${answers.name} has made another executive decision regarding ${get("situation", answers.situation)}.`,
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
    chaos: 84,
    commonSense: 6,
    plotArmor: 100,
    decisionQuality: 13,
    survival: 85,
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
    situation: get("situation", answers.situation),
    severity: get("severity", answers.severity),
    quest: `Conquer ${get("situation", answers.situation)}`,
    strength: get("weapon", answers.weapon),
    weakness: get("weakness", answers.weakness),
    problemSolvingStyle: get("problem_solving", answers.problem_solving),
    emergencyStrategy: get("emergency_strategy", answers.emergency_strategy),
    weapon: get("weapon", answers.weapon),
    companion: answers.companion,
    companionLabel: companion.label,
    power: "Infinite Plot Armor",
    fear: "Monday Morning & Adulting",
    trust: "Their Questionable Intuition",
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
    ...tone,
  };
}

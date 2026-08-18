import { cleanLabel } from "@/lib/utils/sanitize";

// Fallback story templates — used when AI is unavailable
// These are funny, personalized, and always work

export interface StoryTemplate {
  id: string;
  universeId: string;
  template: (vars: TemplateVars) => StoryResult;
}

export interface TemplateVars {
  name: string;
  role: string;
  archetype: string;
  universe: string;
  kingdomName?: string;
  quest: string;
  strength: string;
  weakness: string;
  companion: string;
  power: string;
  weapon: string;
  villain: string;
  fear: string;
  sacrifice: string;
  ending: string;
  plotTwist: string;
  situation: string;
}

export interface StoryResult {
  movieTitle: string;
  tagline: string;
  genre: string;
  characterIntroduction: string;
  currentChapter: string;
  quest: string;
  villain: string;
  companion: string;
  plotTwist: string;
  finalBattle: string;
  ending: string;
  postCreditScene: string;
}

const CINEMATIC_TITLES = [
  "The Chronicles of Questionable Timing",
  "A 47-Step Guide to Total Disaster",
  "The Last Stand of Pure Luck",
  "Prophecies, Dragons & Zero Common Sense",
  "Sword of Destiny & Bad Decisions",
  "The Reluctant Legend",
  "500 Ways to Ruin a Dark Lord's Afternoon",
  "The Chaos Protocol",
  "Legends of the Improvised Victory",
  "The Accidental Conqueror",
];

function generateTitle(_vars: TemplateVars): string {
  return CINEMATIC_TITLES[Math.floor(Math.random() * CINEMATIC_TITLES.length)];
}

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: "fantasy_default",
    universeId: "fantasy",
    template: (rawVars) => {
      const vars = {
        ...rawVars,
        weapon: cleanLabel(rawVars.weapon),
        weakness: cleanLabel(rawVars.weakness),
        situation: cleanLabel(rawVars.situation),
        sacrifice: cleanLabel(rawVars.sacrifice),
      };
      const realm = vars.kingdomName || "The Sovereign Realm of Aethelgard";
      return {
        movieTitle: generateTitle(vars),
        tagline: `One ${vars.role}. One ${vars.companion}. Zero backup plans.`,
        genre: "Epic Action Comedy",
        characterIntroduction: `🎬 SCENE 1 — THE PROBLEM: 11:47 PM. In ${realm}, prophecies were being handed out like parking tickets. The Dark Lord had mobilized three armies. The kingdom was screaming. Meanwhile, ${vars.name} was eating noodles and wondering if destiny could wait until Thursday. Equipped with ${vars.strength} and the ${vars.weapon}, ${vars.name} was technically the chosen one. Unfortunately, they also suffered from ${vars.weakness}. The prophecy had conveniently neglected to mention that.`,
        currentChapter: `🎬 SCENE 2 — THE AWKWARD CALL: Destiny knocked on the door with the subtlety of a catapult. ${vars.name} was in the middle of ${vars.situation}. The ${vars.companion} stared at ${vars.name} with deep concern: "I have seen legendary heroes. You are... noticeably not one of them yet. But we have five minutes."`,
        quest: `The mission was simple: ${vars.quest}. The problem was that ${vars.name}'s plan was 90% improvisation and 10% blind confidence.`,
        villain: `Enter ${vars.villain} — a tyrant of immense dark magic, dramatic cape physics, and a personal grudge against everyone with better hair. Their greatest weakness? The exact same thing ${vars.name} feared: ${vars.fear}.`,
        companion: `The ${vars.companion} evaluated the situation and offered critical strategic input: "If we run, we might survive. If we fight, we will definitely make history. Mostly as a cautionary tale." ${vars.name} chose to fight.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: Just when victory seemed mathematically impossible: ${vars.plotTwist}. The entire battlefield paused for three awkward seconds. Even the villain took a moment to process the absurdity.`,
        finalBattle: `🎬 SCENE 4 — THE FINAL CLIMAX: Clutching the ${vars.weapon} and activating ${vars.power} at the worst possible angle, ${vars.name} made the ultimate sacrifice of ${vars.sacrifice}. Through a sequence of events that violated at least four laws of physics, the attack landed. The ${vars.villain} fell. The kingdom was saved.`,
        ending: `And so, peace returned to ${realm}. ${vars.name} stood atop the palace steps as cheering erupted. "Did I plan that?" ${vars.name} whispered to the ${vars.companion}. "Not even a little bit," replied the ${vars.companion}. Nobody argued.`,
        postCreditScene: `Three months later. ${vars.name} was finally relaxing. The ${vars.companion} walked in holding another glowing parchment. "There is another prophecy." ${vars.name} sighed: "I knew there would be a sequel."`,
      };
    },
  },
  {
    id: "superhero_default",
    universeId: "superhero",
    template: (vars) => {
      const city = vars.kingdomName || "Apex Metropolis";
      return {
        movieTitle: generateTitle(vars),
        tagline: `The city needed a savior. It got ${vars.name}. Close enough.`,
        genre: "Superhero Action Comedy",
        characterIntroduction: `🎬 SCENE 1 — THE ORIGIN: ${city} had seen hundreds of vigilantes. None quite like ${vars.name}. Wielding ${vars.power} and an unyielding sense of ${vars.strength}, ${vars.name} possessed every qualification for superhero work, except for one glaring handicap: ${vars.weakness}.`,
        currentChapter: `🎬 SCENE 2 — THE INCIDENT: The siren blared across downtown. ${vars.name} was ${vars.situation}. The ${vars.companion} arrived with an emergency latte and a questionable strategy: "Suit up. We're improvising."`,
        quest: `The objective: ${vars.quest}. But ${vars.villain} had already hacked the city's central grid and was actively playing elevator music through every public loudspeaker.`,
        villain: `${vars.villain} landed on the rooftop with maximum theatrical lighting. "We meet at last!" "We met at Starbucks yesterday," ${vars.name} reminded them. "That was off the clock!" the villain hissed.`,
        companion: `The ${vars.companion} provided real-time tactical support by shouting encouragement and throwing loose office supplies at enemy henchmen. It was surprisingly effective.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: In the climax of Act Two: ${vars.plotTwist}. The media helicopters were so stunned they hovered in silence for two whole minutes.`,
        finalBattle: `🎬 SCENE 4 — THE FINAL SHOWDOWN: Unleashing ${vars.power} in a way that voided the warranty on all surrounding buildings, ${vars.name} sacrificed ${vars.sacrifice} and neutralized ${vars.villain}'s master weapon.`,
        ending: `The sun rose over ${city}. ${vars.name} and the ${vars.companion} ate celebratory street food on a skyscraper ledge. The city was safe once more.`,
        postCreditScene: `In a dark penthouse, a shadowy figure watches news footage of the battle. "Recruit them immediately." "Sir, they have ${vars.weakness}." "Good. That makes them unpredictable."`,
      };
    },
  },
  {
    id: "scifi_default",
    universeId: "scifi",
    template: (vars) => {
      const sector = vars.kingdomName || "Neo-Veridia Prime";
      return {
        movieTitle: generateTitle(vars),
        tagline: `In deep space, nobody can hear you procrastinate.`,
        genre: "Sci-Fi Space Chaos",
        characterIntroduction: `🎬 SCENE 1 — DEEP SPACE: The year was 3042 in ${sector}. ${vars.name}, a captain with unparalleled ${vars.strength} and a certified security hazard known as ${vars.weakness}, was navigating the galaxy's most volatile sector.`,
        currentChapter: `🎬 SCENE 2 — THE DISTRESS SIGNAL: The alarm blared at 3:00 AM standard galactic time. ${vars.name} was ${vars.situation}. The ${vars.companion} calculated survival odds at 0.04%. ${vars.name} rounded up to 50%.`,
        quest: `Mission profile: ${vars.quest}. Obstacle: ${vars.villain} had deployed an armada with significantly better budget and matching uniforms.`,
        villain: `${vars.villain} hailed the bridge on high-definition holocomm. "Surrender your vessel!" ${vars.name} replied by putting the villain on hold for six minutes.`,
        companion: `The ${vars.companion} processed 14 million combat simulations and concluded that ${vars.name}'s terrible idea was statistically the only one the enemy wouldn't anticipate.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: Hyperdrive malfunctioned, revealing: ${vars.plotTwist}. Both ship crews stared at their sensor monitors in complete disbelief.`,
        finalBattle: `🎬 SCENE 4 — STAR CLASH: Deploying ${vars.power} while swinging the ${vars.weapon} inside the zero-G engine core, ${vars.name} triggered a warp overload that saved the entire star system.`,
        ending: `The fleet was saved. ${vars.name} received a galactic medal of honor and a very large invoice for spaceship repairs.`,
        postCreditScene: `Deep space listening post. A strange alien frequency transmits a single message: "${vars.name}... we have been trying to reach you about your ship's extended warranty."`,
      };
    },
  },
  {
    id: "pirate_default",
    universeId: "pirate",
    template: (vars) => {
      const sea = vars.kingdomName || "The Crimson Tides";
      return {
        movieTitle: generateTitle(vars),
        tagline: `The sea doesn't care about your plans. Neither does your companion.`,
        genre: "Swashbuckling Comedy",
        characterIntroduction: `🎬 SCENE 1 — THE HIGH SEAS: Across ${sea}, legends were told of ${vars.name}. A captain armed with ${vars.strength}, a terrifying ${vars.weapon}, and a legendary curse: ${vars.weakness}.`,
        currentChapter: `🎬 SCENE 2 — THE MAP: ${vars.name} was ${vars.situation} when the ancient treasure map washed ashore. The ${vars.companion} took one bite of the parchment and nodded in approval.`,
        quest: `The objective: ${vars.quest}. Standing between them and glory was ${vars.villain}, who possessed a faster ship and an army of salty buccaneers.`,
        villain: `"${vars.name}!" roared ${vars.villain} across the churning waves. "We settle this now!" "Can we settle this after lunch?" ${vars.name} shouted back through a megaphone.`,
        companion: `The ${vars.companion} steered the helm with uncanny agility, dodging cannonballs and stealing the captain's snacks simultaneously.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: As the treasure chest opened: ${vars.plotTwist}. The entire crew stopped looting to argue about what it meant.`,
        finalBattle: `🎬 SCENE 4 — CANNONFIRE: Wielding ${vars.power} and swinging across the mainmast with the ${vars.weapon}, ${vars.name} sacrificed ${vars.sacrifice} and sent the villain's flagship spinning into the whirlpool.`,
        ending: `The ocean grew calm. ${vars.name} sailed toward the sunset with a full hold and a very smug ${vars.companion}.`,
        postCreditScene: `On a deserted island, ${vars.villain} coughs up seawater and digs up a wooden crate. Inside: a letter from ${vars.name} that simply reads: "Better luck next voyage."`,
      };
    },
  },
  {
    id: "horror_comedy_default",
    universeId: "horror_comedy",
    template: (vars) => {
      const town = vars.kingdomName || "Spooksville Hollow";
      return {
        movieTitle: generateTitle(vars),
        tagline: `Everyone said don't investigate the basement. They went anyway.`,
        genre: "Horror Comedy",
        characterIntroduction: `🎬 SCENE 1 — THE HAUNTED NIGHT: In ${town}, the lights always flickered at midnight. ${vars.name}, equipped with ${vars.strength} and ${vars.weapon}, was the only person foolish enough to stay outside. Naturally, ${vars.weakness} made everything ten times worse.`,
        currentChapter: `🎬 SCENE 2 — THE NOISE: ${vars.name} was ${vars.situation} when the floorboards began to rattle. The ${vars.companion} whispered: "Rule #1: We do not split up." ${vars.name} agreed immediately.`,
        quest: `Mission: ${vars.quest}. Obstacle: ${vars.villain} had been waiting centuries for an opponent to haunt.`,
        villain: `${vars.villain} materialized in a cloud of green mist. "Tremble before me!" ${vars.name} took a photo with flash and temporarily blinded the entity.`,
        companion: `The ${vars.companion} armed itself with a kitchen broom and tactical positioning behind ${vars.name}.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: In the secret attic chamber: ${vars.plotTwist}. The ghosts themselves looked visibly embarrassed.`,
        finalBattle: `🎬 SCENE 4 — THE EXORCISM: Activating ${vars.power} and swinging the ${vars.weapon} with wild abandon, ${vars.name} banished ${vars.villain} back into the spirit realm.`,
        ending: `Morning broke over ${town}. ${vars.name} walked out into the sunlight. "Never again," they vowed. The ${vars.companion} smirked.`,
        postCreditScene: `Six months later. An estate agent shows a spooky castle to ${vars.name}. "It has great natural lighting and zero ancient curses." A chandelier falls. ${vars.name} smiles: "I'll take it."`,
      };
    },
  },
  {
    id: "magical_academy_default",
    universeId: "magical_academy",
    template: (vars) => {
      const academy = vars.kingdomName || "The Arcane Spires of Ravenhurst";
      return {
        movieTitle: generateTitle(vars),
        tagline: `They said don't read the forbidden book. They read the entire chapter.`,
        genre: "Magical Mystery Comedy",
        characterIntroduction: `🎬 SCENE 1 — THE ACADEMY: At ${academy}, young sorcerers studied ancient arts. ${vars.name}, possessing legendary ${vars.strength} and a chaotic habit of ${vars.weakness}, had already set off three magical alarms before breakfast.`,
        currentChapter: `🎬 SCENE 2 — FORBIDDEN SPELLS: ${vars.name} was ${vars.situation} when the ancient library vault unlocked itself. The ${vars.companion} sighed: "Whatever you're thinking, please don't."`,
        quest: `The challenge: ${vars.quest}. But ${vars.villain} was already brewing an apocalyptic concoction in the basement cauldron.`,
        villain: `${vars.villain} stood before the Grand Mirror. "The academy shall fall!" ${vars.name} countered with an improvised rebuttal and a very loud spell.`,
        companion: `The ${vars.companion} cast a defensive counter-charm that turned all of the villain's projectiles into harmless bouncy balls.`,
        plotTwist: `🎬 SCENE 3 — THE PLOT TWIST: The ancient tome revealed: ${vars.plotTwist}. The Headmaster dropped their glasses in shock.`,
        finalBattle: `🎬 SCENE 4 — ARCANE DUEL: Combining ${vars.power} with the ${vars.weapon}, ${vars.name} sacrificed ${vars.sacrifice} and shattered the villain's dark spell for all eternity.`,
        ending: `The Great Hall erupted in cheers. ${vars.name} was awarded 500 house points and detention for property damage.`,
        postCreditScene: `In the forbidden wing, a secret door clicks open. A glowing book floats toward ${vars.name}. "Oh no," whispers ${vars.name}. "Here we go again."`,
      };
    },
  },
];

export function getFallbackTemplate(universeId: string): StoryTemplate {
  const template = STORY_TEMPLATES.find((t) => t.universeId === universeId);
  return template ?? STORY_TEMPLATES[0];
}

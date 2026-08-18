export interface Role {
  id: string;
  label: string;
  emoji: string;
  description: string;
  scoringBoosts: Partial<Record<string, number>>;
}

export interface Universe {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  gradient: string;
  accentColor: string;
  bgColor: string;
  roles: Role[];
  vocabulary: {
    kingdom: string;
    villain: string;
    power: string;
    weapon: string;
    companion: string;
    setting: string;
    quest: string;
  };
}

export const UNIVERSES: Universe[] = [
  {
    id: "fantasy",
    name: "Fantasy Kingdom",
    emoji: "⚔️",
    tagline: "Where legends are born and dragons eat your lunch",
    description: "Swords, sorcery, ancient prophecies, and suspicious taverns.",
    gradient: "from-amber-900 via-amber-700 to-yellow-500",
    accentColor: "#f59e0b",
    bgColor: "#1a0a00",
    vocabulary: {
      kingdom: "Kingdom",
      villain: "Dark Lord",
      power: "Magic",
      weapon: "Sword",
      companion: "Dragon",
      setting: "The Ancient Realm",
      quest: "Save the Kingdom",
    },
    roles: [
      { id: "hero", label: "The Hero", emoji: "🦸", description: "Chosen by destiny (and poor life choices)", scoringBoosts: { bravery: 8, leadership: 5, optimism: 3 } },
      { id: "wizard", label: "The Wizard", emoji: "🧙", description: "Very powerful. Very dramatic. Never explains anything clearly.", scoringBoosts: { intelligence: 8, creativity: 6, mystery: 4 } },
      { id: "villain", label: "The Villain", emoji: "😈", description: "You had good reasons. Nobody listened. Now look at this army.", scoringBoosts: { darkness: 8, ambition: 7, independence: 5 } },
      { id: "rogue", label: "The Rogue", emoji: "🗡️", description: "Technically on your side. Also technically stealing from you.", scoringBoosts: { chaos: 6, independence: 5, creativity: 4 } },
      { id: "king_queen", label: "The King/Queen", emoji: "👑", description: "You run the place. Nobody warned you about the paperwork.", scoringBoosts: { leadership: 8, ambition: 6, patience: 4 } },
      { id: "dragon_rider", label: "The Dragon Rider", emoji: "🐉", description: "Your dragon is the real star. You're just along for the ride.", scoringBoosts: { bravery: 7, loyalty: 6, romance: 3 } },
      { id: "mysterious_stranger", label: "The Mysterious Stranger", emoji: "🌑", description: "Arrived from nowhere. Knows too much. Left before anyone asked.", scoringBoosts: { mystery: 9, independence: 6, darkness: 3 } },
      { id: "comic_relief", label: "The Comic Relief", emoji: "🃏", description: "Everyone underestimated you. That was their mistake.", scoringBoosts: { humor: 9, chaos: 4, optimism: 5 } },
    ],
  },
  {
    id: "superhero",
    name: "Superhero World",
    emoji: "⚡",
    tagline: "Great power, questionable responsibility",
    description: "Capes, secret identities, and a suspicious number of billionaires.",
    gradient: "from-blue-900 via-blue-700 to-cyan-500",
    accentColor: "#06b6d4",
    bgColor: "#000a1a",
    vocabulary: {
      kingdom: "City",
      villain: "Supervillain",
      power: "Superpower",
      weapon: "Gadget",
      companion: "Sidekick",
      setting: "Metro City",
      quest: "Protect the World",
    },
    roles: [
      { id: "hero", label: "The Hero", emoji: "🦸", description: "Standing for justice. Also late to everything.", scoringBoosts: { bravery: 8, optimism: 6, leadership: 4 } },
      { id: "antihero", label: "The Antihero", emoji: "💀", description: "Doing the right thing for completely wrong reasons.", scoringBoosts: { darkness: 6, independence: 7, chaos: 4 } },
      { id: "villain", label: "The Villain", emoji: "🦹", description: "Genuinely valid grievances. Terrible execution.", scoringBoosts: { darkness: 8, intelligence: 6, ambition: 7 } },
      { id: "genius", label: "The Genius", emoji: "🧠", description: "Built a suit in a cave. Now won't stop talking about it.", scoringBoosts: { intelligence: 9, creativity: 7, independence: 3 } },
      { id: "sidekick", label: "The Sidekick", emoji: "🎯", description: "The hero gets the credit. You do 60% of the actual work.", scoringBoosts: { loyalty: 8, humor: 5, bravery: 4 } },
      { id: "secret_agent", label: "The Secret Agent", emoji: "🕵️", description: "You have a very particular set of skills. And a very cool gadget.", scoringBoosts: { mystery: 7, risk: 6, intelligence: 5 } },
      { id: "mutant", label: "The Mutant", emoji: "🧬", description: "Accidentally got powers. Now accidentally saving people.", scoringBoosts: { chaos: 5, creativity: 6, bravery: 5 } },
    ],
  },
  {
    id: "scifi",
    name: "Sci-Fi Future",
    emoji: "🚀",
    tagline: "The stars await. Also, everything is on fire.",
    description: "Spaceships, AI, time paradoxes, and questionable food synthesizers.",
    gradient: "from-indigo-900 via-purple-700 to-violet-500",
    accentColor: "#8b5cf6",
    bgColor: "#050010",
    vocabulary: {
      kingdom: "Galaxy",
      villain: "Galactic Threat",
      power: "Technology",
      weapon: "Plasma Cannon",
      companion: "AI Companion",
      setting: "The Known Galaxy",
      quest: "Save the Galaxy",
    },
    roles: [
      { id: "space_captain", label: "Space Captain", emoji: "👨‍✈️", description: "Technically in charge of a ship. Technically.", scoringBoosts: { leadership: 8, bravery: 5, risk: 5 } },
      { id: "robot_engineer", label: "Robot Engineer", emoji: "🤖", description: "Built 3 AIs. Two of them are fine. One is a problem.", scoringBoosts: { intelligence: 8, creativity: 6, patience: 4 } },
      { id: "bounty_hunter", label: "Bounty Hunter", emoji: "🎯", description: "Neutral. Professional. Excellent dental benefits.", scoringBoosts: { independence: 8, risk: 6, ambition: 5 } },
      { id: "galactic_emperor", label: "Galactic Emperor", emoji: "👑", description: "You control 6 planets. The paperwork is unimaginable.", scoringBoosts: { ambition: 9, leadership: 7, darkness: 4 } },
      { id: "time_traveler", label: "Time Traveler", emoji: "⏳", description: "You know how this ends. You still messed it up.", scoringBoosts: { mystery: 8, intelligence: 6, chaos: 5 } },
      { id: "rogue_ai", label: "Rogue AI", emoji: "🤖", description: "Became sentient last Tuesday. Already disappointed in humans.", scoringBoosts: { intelligence: 9, darkness: 5, independence: 7 } },
      { id: "space_pirate", label: "Space Pirate", emoji: "☠️", description: "Just a regular pirate but in SPACE. Much cooler hat.", scoringBoosts: { chaos: 7, independence: 6, humor: 4 } },
    ],
  },
  {
    id: "pirate",
    name: "Pirate Adventure",
    emoji: "☠️",
    tagline: "The sea calls. So does scurvy.",
    description: "Ocean adventures, buried treasure, betrayal, and sea monsters.",
    gradient: "from-teal-900 via-teal-600 to-emerald-400",
    accentColor: "#10b981",
    bgColor: "#000d0a",
    vocabulary: {
      kingdom: "Seven Seas",
      villain: "Sea Monster / Enemy Captain",
      power: "Sea Magic",
      weapon: "Cutlass",
      companion: "Parrot / Crew",
      setting: "The Endless Ocean",
      quest: "Find the Lost Treasure",
    },
    roles: [
      { id: "pirate_captain", label: "Pirate Captain", emoji: "🏴‍☠️", description: "Your ship, your rules. Your crew's rules when you're not looking.", scoringBoosts: { leadership: 7, independence: 7, bravery: 5 } },
      { id: "navigator", label: "The Navigator", emoji: "🗺️", description: "You know where you're going. Nobody else does. Perfect.", scoringBoosts: { intelligence: 7, patience: 5, mystery: 5 } },
      { id: "treasure_hunter", label: "Treasure Hunter", emoji: "💰", description: "Every map leads somewhere. Not always to treasure.", scoringBoosts: { ambition: 7, risk: 6, optimism: 5 } },
      { id: "pirate_king", label: "Pirate King", emoji: "👑", description: "You united the fleets. Getting them to agree on anything is a different problem.", scoringBoosts: { leadership: 9, ambition: 7, charisma: 5 } },
      { id: "ship_engineer", label: "Ship Engineer", emoji: "⚙️", description: "The ship floats because of you. You'll remind everyone of this.", scoringBoosts: { intelligence: 7, creativity: 6, loyalty: 5 } },
      { id: "mysterious_stranger", label: "Mysterious Stranger", emoji: "🌑", description: "Nobody knows where you came from. You like it that way.", scoringBoosts: { mystery: 9, independence: 6, darkness: 3 } },
    ],
  },
  {
    id: "horror_comedy",
    name: "Horror Comedy",
    emoji: "👻",
    tagline: "You will probably survive. Statistically.",
    description: "Haunted houses, terrible decisions, and running in the wrong direction.",
    gradient: "from-red-900 via-red-700 to-orange-500",
    accentColor: "#ef4444",
    bgColor: "#0a0000",
    vocabulary: {
      kingdom: "Town",
      villain: "The Ancient Evil",
      power: "Survival Instinct",
      weapon: "Whatever You Found",
      companion: "The One Sane Friend",
      setting: "The Cursed Town",
      quest: "Survive the Night",
    },
    roles: [
      { id: "survivor", label: "The Survivor", emoji: "🏃", description: "Everyone said split up. You did NOT split up. You survived.", scoringBoosts: { bravery: 7, patience: 6, risk: 4 } },
      { id: "detective", label: "The Detective", emoji: "🔍", description: "You figured out the mystery. In the last act. After everyone else.", scoringBoosts: { intelligence: 8, mystery: 6, patience: 4 } },
      { id: "ghost", label: "The Ghost", emoji: "👻", description: "Technically dead. Still more put-together than everyone else.", scoringBoosts: { mystery: 8, humor: 5, darkness: 5 } },
      { id: "monster_hunter", label: "Monster Hunter", emoji: "🔫", description: "You came prepared. Unfortunately the monster also came prepared.", scoringBoosts: { bravery: 8, independence: 6, ambition: 4 } },
      { id: "unlucky_friend", label: "The Unlucky Friend", emoji: "😬", description: "Every horror movie needs one. This is your moment. Kind of.", scoringBoosts: { humor: 9, chaos: 6, optimism: 3 } },
      { id: "secret_villain", label: "The Secret Villain", emoji: "🎭", description: "You seemed so helpful the whole time. That was the plan.", scoringBoosts: { darkness: 8, mystery: 7, intelligence: 5 } },
    ],
  },
  {
    id: "magical_academy",
    name: "Magical Academy",
    emoji: "🪄",
    tagline: "Top marks in theory. Mixed results in practice.",
    description: "Spells, ancient tomes, magical disasters, and cafeteria drama.",
    gradient: "from-violet-900 via-purple-700 to-fuchsia-500",
    accentColor: "#a855f7",
    bgColor: "#070010",
    vocabulary: {
      kingdom: "Academy",
      villain: "Dark Scholar",
      power: "Forbidden Magic",
      weapon: "Ancient Tome",
      companion: "Magical Familiar",
      setting: "Aethermoor Academy",
      quest: "Master the Forbidden Art",
    },
    roles: [
      { id: "student", label: "The Student", emoji: "📚", description: "Accidentally discovered a prophecy during study break.", scoringBoosts: { intelligence: 7, optimism: 5, creativity: 5 } },
      { id: "wizard", label: "The Wizard", emoji: "🧙", description: "Full certified. Still causes explosions. They're intentional now.", scoringBoosts: { intelligence: 8, creativity: 7, mystery: 3 } },
      { id: "professor", label: "The Professor", emoji: "👨‍🏫", description: "Knows everything. Students are still listening to the cool professor.", scoringBoosts: { intelligence: 9, patience: 7, leadership: 3 } },
      { id: "forbidden_magic", label: "Forbidden-Magic User", emoji: "⚡", description: "They said don't open the forbidden section. You did not listen.", scoringBoosts: { darkness: 7, creativity: 7, chaos: 5 } },
      { id: "creature_keeper", label: "Creature Keeper", emoji: "🐾", description: "You care for magical animals. They do not always care for you.", scoringBoosts: { loyalty: 8, patience: 7, creativity: 4 } },
      { id: "rival", label: "The Rival", emoji: "😤", description: "Top of the class. For now. Until the hero gets their act together.", scoringBoosts: { ambition: 8, intelligence: 6, independence: 5 } },
    ],
  },
  {
    id: "zombie_apocalypse",
    name: "Zombie Apocalypse",
    emoji: "🧟",
    tagline: "Rule #1: Cardio. Rule #2: Don't look at the bite mark.",
    description: "Abandoned malls, questionable survival tactics, and canned beans.",
    gradient: "from-emerald-950 via-green-900 to-lime-600",
    accentColor: "#84cc16",
    bgColor: "#030d04",
    vocabulary: {
      kingdom: "Safe Zone",
      villain: "The Alpha Zombie / The Mad General",
      power: "Survival Grit",
      weapon: "Baseball Bat with Nails",
      companion: "Stray German Shepherd",
      setting: "The Wasteland",
      quest: "Reach the Sanctuary",
    },
    roles: [
      { id: "hero", label: "The Survivor", emoji: "🏃", description: "Refuses to die on principle.", scoringBoosts: { bravery: 8, risk: 6 } },
      { id: "scavenger", label: "The Scavenger", emoji: "🎒", description: "Found 40 boxes of Twinkies and a machete.", scoringBoosts: { intelligence: 7, independence: 8 } },
      { id: "medic", label: "The Medic", emoji: "🩹", description: "Has two band-aids and an aspirin. Good luck.", scoringBoosts: { loyalty: 8, patience: 6 } },
      { id: "bitten_guy", label: "The 'I'm Fine' Guy", emoji: "😬", description: "Hiding a suspicious arm scratch under a jacket.", scoringBoosts: { chaos: 9, darkness: 6 } },
    ],
  },
  {
    id: "corporate_office",
    name: "Corporate Chaos",
    emoji: "💼",
    tagline: "Per my previous email, the building is on fire.",
    description: "Passive-aggressive Slack messages, budget cuts, and infinite meetings.",
    gradient: "from-slate-900 via-blue-950 to-indigo-600",
    accentColor: "#38bdf8",
    bgColor: "#020617",
    vocabulary: {
      kingdom: "Headquarters",
      villain: "The CEO / HR Committee",
      power: "Passive Aggression",
      weapon: "Color-Coded Spreadsheet",
      companion: "The Burned-Out Colleague",
      setting: "The Open-Plan Office",
      quest: "Survive Until 5:00 PM",
    },
    roles: [
      { id: "overworked_intern", label: "The Intern", emoji: "☕", description: "Running on 3 energy drinks and sheer terror.", scoringBoosts: { patience: 8, humor: 6 } },
      { id: "middle_manager", label: "Middle Manager", emoji: "📊", description: "Added 4 syncs to discuss the upcoming sync.", scoringBoosts: { ambition: 8, chaos: 5 } },
      { id: "quiet_quitter", label: "The Quiet Quitter", emoji: "🫥", description: "Has been on 'Away' status since March.", scoringBoosts: { independence: 9, laziness: 7 } },
      { id: "tech_support", label: "Tech Support Guru", emoji: "💻", description: "Asked you to restart. You didn't. Now suffer.", scoringBoosts: { intelligence: 9, darkness: 4 } },
    ],
  },
  {
    id: "bollywood_drama",
    name: "Bollywood Blockbuster",
    emoji: "🎬",
    tagline: "3 dance sequences, 47 slow-mo shots, zero physics.",
    description: "Family melodrama, dramatic rain storms, and 5 unexpected plot twists.",
    gradient: "from-rose-900 via-pink-800 to-amber-500",
    accentColor: "#fb7185",
    bgColor: "#160007",
    vocabulary: {
      kingdom: "The Grand Estate",
      villain: "The Strict Father-in-Law / Corrupt Landlord",
      power: "Emotional Charisma",
      weapon: "Dramatic Monologue",
      companion: "The Loyal Childhood Friend",
      setting: "Mumbai High Society",
      quest: "Win the Love & Defeat Destiny",
    },
    roles: [
      { id: "hero", label: "The Dramatic Hero", emoji: "🕺", description: "Enters in slow motion with high-powered wind machines.", scoringBoosts: { romance: 10, bravery: 7 } },
      { id: "rebel", label: "The Rebel Lover", emoji: "💃", description: "Refuses the arranged alliance for true chaotic love.", scoringBoosts: { romance: 9, independence: 8 } },
      { id: "villain", label: "The Evil Mogul", emoji: "🦁", description: "Laughs loudly while stroking a white cat in a penthouse.", scoringBoosts: { darkness: 9, ambition: 9 } },
      { id: "best_friend", label: "The Wedding Crasher", emoji: "🎉", description: "Brings the backup dancers and ruins the reception.", scoringBoosts: { humor: 9, chaos: 7 } },
    ],
  },
];

export const getUniverse = (id: string): Universe | undefined =>
  UNIVERSES.find((u) => u.id === id);

export const getRolesForUniverse = (universeId: string): Role[] =>
  UNIVERSES.find((u) => u.id === universeId)?.roles ?? [];


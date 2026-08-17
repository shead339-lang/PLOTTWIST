export interface Archetype {
  id: string;
  label: string;
  description: string;
  minBravery?: number;
  minIntelligence?: number;
  minChaos?: number;
  minDarkness?: number;
  minHumor?: number;
  minAmbition?: number;
  minMystery?: number;
  minLoyalty?: number;
  minLeadership?: number;
  minCreativity?: number;
  minIndependence?: number;
  minOptimism?: number;
}

export const ARCHETYPES: Archetype[] = [
  { id: "chosen_hero", label: "The Chosen Hero", description: "Destined for greatness. Still figuring out the details.", minBravery: 60, minOptimism: 50 },
  { id: "reluctant_hero", label: "The Reluctant Hero", description: "Didn't ask for any of this. Saved everyone anyway.", minBravery: 40, minHumor: 40 },
  { id: "unqualified_hero", label: "The Unqualified Hero", description: "Absolutely no business being here. Still the main character.", minBravery: 30, minChaos: 50, minHumor: 50 },
  { id: "dark_knight", label: "The Dark Knight", description: "Technically a hero. Very bad at feelings.", minBravery: 60, minDarkness: 50 },
  { id: "wise_wizard", label: "The Wise Wizard", description: "Ancient, powerful, and deliberately vague.", minIntelligence: 65, minMystery: 50 },
  { id: "chaos_wizard", label: "The Chaos Wizard", description: "The spells work. Usually. Mostly. We're working on it.", minIntelligence: 50, minChaos: 60 },
  { id: "noble_villain", label: "The Noble Villain", description: "Had a point initially. Lost the plot somewhere around army #3.", minDarkness: 60, minAmbition: 55 },
  { id: "tragic_villain", label: "The Tragic Villain", description: "Could have been the hero. Chose explosions.", minDarkness: 65, minMystery: 45 },
  { id: "comedic_legend", label: "The Comedic Legend", description: "Made everyone laugh. Somehow also saved the world.", minHumor: 65 },
  { id: "mysterious_wanderer", label: "The Mysterious Wanderer", description: "Knows everything. Explains nothing. Leaves before dessert.", minMystery: 65, minIndependence: 55 },
  { id: "reluctant_king", label: "The Reluctant King", description: "Didn't want the throne. Cannot believe what's in the inbox.", minLeadership: 55, minHumor: 40 },
  { id: "loyal_guardian", label: "The Loyal Guardian", description: "Would die for their people. Is very tired.", minLoyalty: 65, minBravery: 45 },
  { id: "creative_trickster", label: "The Creative Trickster", description: "Won every battle without following a single rule.", minCreativity: 60, minChaos: 50 },
  { id: "shadow_master", label: "The Shadow Master", description: "Operates in the dark. Literally and metaphorically.", minMystery: 60, minDarkness: 55 },
  { id: "rising_legend", label: "The Rising Legend", description: "The story is just beginning. And it's already chaotic.", minAmbition: 55, minBravery: 45 },
];

export const VILLAINS = [
  { id: "dark_lord", label: "The Dark Lord", description: "Classic. Dramatic. Has a very unfortunate castle aesthetic.", universes: ["fantasy", "magical_academy"] },
  { id: "shadow_council", label: "The Shadow Council", description: "Seven people who should not be in a group chat together.", universes: ["fantasy", "scifi"] },
  { id: "corrupted_mentor", label: "The Corrupted Mentor", description: "Was supposed to guide you. Chose betrayal. Typical Tuesday.", universes: ["fantasy", "magical_academy", "superhero"] },
  { id: "inner_self", label: "Your Inner Doubts", description: "The most terrifying villain of all. Cannot be punched.", universes: ["all"] },
  { id: "alarm_clock", label: "The Alarm Clock of Doom", description: "Appears every morning. Cannot be reasoned with.", universes: ["all"], funny: true },
  { id: "corporate_overlord", label: "The Corporate Overlord", description: "Controls everything from a very nice office.", universes: ["superhero", "scifi"] },
  { id: "galactic_empire", label: "The Galactic Empire", description: "Owns several star systems. Very aggressive about it.", universes: ["scifi"] },
  { id: "sea_monster", label: "The Kraken", description: "Very large. Very wet. Not interested in diplomacy.", universes: ["pirate"] },
  { id: "rival_captain", label: "The Rival Captain", description: "Faster ship, worse personality.", universes: ["pirate"] },
  { id: "ancient_evil", label: "The Ancient Evil", description: "Has been waiting 10,000 years to ruin your week.", universes: ["horror_comedy", "fantasy"] },
  { id: "future_self", label: "Your Future Self", description: "Came back to stop you. You're still confused about which one of you is right.", universes: ["scifi"] },
  { id: "dark_scholar", label: "The Dark Scholar", description: "Read the forbidden books. Now has opinions about everything.", universes: ["magical_academy"] },
  { id: "committee", label: "The Approval Committee", description: "Seven people who need to sign off on your heroism.", universes: ["all"], funny: true },
];

export const COMPANIONS = [
  { id: "dragon", label: "Ember the Dragon", description: "Fire-breathing. Eats gold. Surprisingly opinionated about treasure distribution.", emoji: "🐉" },
  { id: "phoenix", label: "Blaze the Phoenix", description: "Dies occasionally. Always comes back. Very optimistic.", emoji: "🔥" },
  { id: "wolf", label: "Shadow the Wolf", description: "Fiercely loyal. Does not like your new friends.", emoji: "🐺" },
  { id: "griffin", label: "Storm the Griffin", description: "Half eagle, half lion, 100% judging you.", emoji: "🦅" },
  { id: "robot", label: "ARLO-7", description: "Highly advanced AI. Quietly concerned about your decisions.", emoji: "🤖" },
  { id: "talking_cat", label: "Professor Whiskers", description: "Knows more than you. Reveals information on its own schedule.", emoji: "🐱" },
  { id: "goblin", label: "Grix the Tiny Angry Goblin", description: "Three feet of fury. Surprisingly effective in battle.", emoji: "👹" },
  { id: "best_friend", label: "Your Legendary Best Friend", description: "Has been dealing with your chaos for years. Still here.", emoji: "🤝" },
  { id: "mysterious_stranger", label: "The Stranger", description: "Name unknown. Origin unknown. Helpful at the exact right moment.", emoji: "🌑" },
];

export const PLOT_TWISTS = [
  { id: "friend_chosen", label: "The best friend is secretly the chosen one.", dramatic: true },
  { id: "future_villain", label: "The villain is a future version of the hero.", dramatic: true },
  { id: "companion_protected", label: "The companion has been protecting the hero all along.", dramatic: true },
  { id: "power_weakness", label: "The hero's power is actually the villain's only weakness.", dramatic: true },
  { id: "prophecy_wrong", label: "The prophecy was completely misunderstood.", dramatic: true },
  { id: "not_chosen", label: "The hero is NOT the chosen one. Never was.", dramatic: true },
  { id: "simulation", label: "The kingdom was inside a simulation. The hero just broke the rules.", dramatic: true },
  { id: "old_friend", label: "The villain is the hero's childhood best friend.", dramatic: true },
  { id: "useless_weapon", label: "The legendary weapon is totally useless but emotionally important.", funny: true },
  { id: "accidentally_villain", label: "The hero accidentally becomes the villain halfway through.", funny: true },
  { id: "dragon_conspiracy", label: "The dragon has been running a separate conspiracy the whole time.", funny: true },
  { id: "everyone_knew", label: "Everyone already knew the secret. The hero was the last to find out.", funny: true },
];

export const STORY_TONES = [
  { id: "epic_comedy", label: "Epic Comedy", comedyLevel: 0.7, dramaLevel: 0.5 },
  { id: "dark_comedy", label: "Dark Comedy", comedyLevel: 0.5, dramaLevel: 0.7 },
  { id: "cinematic_drama", label: "Cinematic Drama", comedyLevel: 0.2, dramaLevel: 0.9 },
  { id: "chaotic_adventure", label: "Chaotic Adventure", comedyLevel: 0.6, dramaLevel: 0.6 },
  { id: "mysterious_thriller", label: "Mysterious Thriller", comedyLevel: 0.2, dramaLevel: 0.8 },
  { id: "heartfelt_comedy", label: "Heartfelt Comedy", comedyLevel: 0.7, dramaLevel: 0.4 },
];

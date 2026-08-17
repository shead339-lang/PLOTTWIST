export type QuestionType =
  | "name"
  | "universe"
  | "role"
  | "single_choice"
  | "multi_choice"
  | "text_input";

export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  scoringEffects: Partial<Record<string, number>>;
}

export interface Question {
  id: string;
  step: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  placeholder?: string;
  maxLength?: number;
}

export const QUESTIONS: Question[] = [
  {
    id: "name",
    step: 1,
    type: "name",
    title: "What should we call the main character?",
    subtitle: "This is you. The legend. The protagonist. The one.",
    placeholder: "Enter your name...",
    maxLength: 30,
  },
  {
    id: "universe",
    step: 2,
    type: "universe",
    title: "Choose your universe.",
    subtitle: "Every great movie starts with a world.",
  },
  {
    id: "role",
    step: 3,
    type: "role",
    title: "If your life became a movie, who would you want to be?",
    subtitle: "Your story, your call.",
  },
  {
    id: "situation",
    step: 4,
    type: "single_choice",
    title: "Where are you in your story right now?",
    subtitle: "Chapter 1, 4, or somewhere in the chaos?",
    options: [
      { id: "just_starting", label: "Just Starting", emoji: "🌱", scoringEffects: { optimism: 5, bravery: 3 } },
      { id: "lost", label: "Lost", emoji: "🌀", scoringEffects: { mystery: 5, chaos: 3, darkness: 2 } },
      { id: "fighting", label: "Fighting Through It", emoji: "⚔️", scoringEffects: { bravery: 7, risk: 3 } },
      { id: "rebuilding", label: "Rebuilding", emoji: "🏗️", scoringEffects: { patience: 5, optimism: 3, creativity: 3 } },
      { id: "leveling_up", label: "Leveling Up", emoji: "⬆️", scoringEffects: { ambition: 6, optimism: 4 } },
      { id: "on_top", label: "On Top", emoji: "🏔️", scoringEffects: { leadership: 5, ambition: 5, bravery: 2 } },
      { id: "everything_at_once", label: "Everything At Once", emoji: "🌪️", scoringEffects: { chaos: 7, humor: 3 } },
      { id: "stuck", label: "Stuck", emoji: "🪨", scoringEffects: { darkness: 4, patience: 3, mystery: 3 } },
      { id: "secret_mission", label: "Secret Mission", emoji: "🕵️", scoringEffects: { mystery: 7, independence: 4 } },
      { id: "pretending_fine", label: "Pretending I'm Fine", emoji: "😅", scoringEffects: { humor: 6, darkness: 3, chaos: 2 } },
    ],
  },
  {
    id: "quest",
    step: 5,
    type: "single_choice",
    title: "Every hero needs a quest. What's yours?",
    subtitle: "Choose wisely. The prophecy has already been written.",
    options: [
      { id: "wealth", label: "Build Wealth", emoji: "💰", scoringEffects: { ambition: 7, risk: 3 } },
      { id: "love", label: "Find Love", emoji: "❤️", scoringEffects: { romance: 8, optimism: 3 } },
      { id: "career", label: "Build My Career", emoji: "🚀", scoringEffects: { ambition: 6, leadership: 3 } },
      { id: "improve", label: "Improve Myself", emoji: "✨", scoringEffects: { patience: 5, optimism: 4, creativity: 3 } },
      { id: "prove", label: "Prove Myself", emoji: "🔥", scoringEffects: { ambition: 7, bravery: 4, darkness: 2 } },
      { id: "explore", label: "Explore the World", emoji: "🌍", scoringEffects: { risk: 7, independence: 5 } },
      { id: "better_life", label: "Build a Better Life", emoji: "🏡", scoringEffects: { optimism: 6, loyalty: 4 } },
      { id: "create", label: "Create Something", emoji: "🎨", scoringEffects: { creativity: 8, mystery: 3 } },
      { id: "peace", label: "Find Peace", emoji: "☮️", scoringEffects: { patience: 7, optimism: 4, darkness: -2 } },
      { id: "no_idea", label: "Honestly, No Idea", emoji: "🤷", scoringEffects: { chaos: 5, humor: 5, mystery: 3 } },
    ],
  },
  {
    id: "strength",
    step: 6,
    type: "single_choice",
    title: "What is your strongest weapon in real life?",
    subtitle: "Choose your greatest power. No pressure.",
    options: [
      { id: "intelligence", label: "Intelligence", emoji: "🧠", scoringEffects: { intelligence: 9, creativity: 3 } },
      { id: "courage", label: "Courage", emoji: "🦁", scoringEffects: { bravery: 9, risk: 4 } },
      { id: "creativity", label: "Creativity", emoji: "🎨", scoringEffects: { creativity: 9, mystery: 3 } },
      { id: "humor", label: "Humor", emoji: "😂", scoringEffects: { humor: 9, chaos: 3 } },
      { id: "patience", label: "Patience", emoji: "⏳", scoringEffects: { patience: 9, loyalty: 3 } },
      { id: "determination", label: "Determination", emoji: "💪", scoringEffects: { bravery: 6, ambition: 6 } },
      { id: "loyalty", label: "Loyalty", emoji: "🤝", scoringEffects: { loyalty: 9, romance: 3 } },
      { id: "confidence", label: "Confidence", emoji: "😎", scoringEffects: { leadership: 7, bravery: 4 } },
      { id: "adaptability", label: "Adaptability", emoji: "🌊", scoringEffects: { creativity: 6, chaos: 4, risk: 3 } },
      { id: "luck", label: "Luck", emoji: "🍀", scoringEffects: { chaos: 5, optimism: 5, humor: 3 } },
    ],
  },
  {
    id: "weakness",
    step: 7,
    type: "single_choice",
    title: "Every hero has a weakness. What's yours?",
    subtitle: "This will become a humorous curse. You've been warned.",
    options: [
      { id: "procrastination", label: "Procrastination", emoji: "😴", scoringEffects: { chaos: 4, humor: 3, patience: -3 } },
      { id: "overthinking", label: "Overthinking", emoji: "🌀", scoringEffects: { intelligence: 3, darkness: 3, chaos: 3 } },
      { id: "laziness", label: "Laziness", emoji: "🛋️", scoringEffects: { humor: 4, chaos: 4, ambition: -3 } },
      { id: "too_trusting", label: "Trusting People Too Much", emoji: "🥺", scoringEffects: { loyalty: 5, romance: 3, darkness: 3 } },
      { id: "impatience", label: "Impatience", emoji: "⚡", scoringEffects: { chaos: 5, risk: 4, patience: -4 } },
      { id: "too_emotional", label: "Being Too Emotional", emoji: "😭", scoringEffects: { romance: 5, darkness: 3, loyalty: 3 } },
      { id: "ego", label: "Ego", emoji: "🪞", scoringEffects: { ambition: 4, leadership: 3, darkness: 4 } },
      { id: "distraction", label: "Distraction", emoji: "📱", scoringEffects: { chaos: 6, humor: 3 } },
      { id: "fear_failure", label: "Fear of Failure", emoji: "😰", scoringEffects: { darkness: 5, patience: 3 } },
      { id: "say_yes", label: "Saying Yes to Everything", emoji: "🙋", scoringEffects: { loyalty: 4, chaos: 4, humor: 3 } },
    ],
  },
  {
    id: "problem_solving",
    step: 8,
    type: "single_choice",
    title: "The villain has arrived. What do you do?",
    subtitle: "Choose your battle strategy. No judgment. Okay, a little.",
    options: [
      { id: "fight", label: "Fight Immediately", emoji: "⚔️", scoringEffects: { bravery: 8, risk: 5, chaos: 3 } },
      { id: "plan", label: "Make a Plan", emoji: "📋", scoringEffects: { intelligence: 7, patience: 5 } },
      { id: "run", label: "Run Away", emoji: "🏃", scoringEffects: { humor: 5, chaos: 4, risk: -2 } },
      { id: "talk", label: "Talk My Way Out", emoji: "🗣️", scoringEffects: { intelligence: 5, leadership: 5, creativity: 3 } },
      { id: "ask_friend", label: "Ask a Friend", emoji: "📞", scoringEffects: { loyalty: 7, independence: -3 } },
      { id: "pretend", label: "Pretend Nothing Happened", emoji: "😶", scoringEffects: { humor: 7, chaos: 5, darkness: 2 } },
      { id: "chaos", label: "Create Chaos", emoji: "🌪️", scoringEffects: { chaos: 8, creativity: 4, risk: 4 } },
      { id: "wait", label: "Wait for the Right Moment", emoji: "⏱️", scoringEffects: { patience: 8, mystery: 4, intelligence: 3 } },
    ],
  },
  {
    id: "weapon",
    step: 9,
    type: "single_choice",
    title: "Choose your legendary weapon.",
    subtitle: "Choose wisely. Or hilariously. Both work.",
    options: [
      { id: "sword", label: "Legendary Sword", emoji: "⚔️", scoringEffects: { bravery: 5, leadership: 3 } },
      { id: "staff", label: "Magic Staff", emoji: "🪄", scoringEffects: { intelligence: 5, mystery: 4 } },
      { id: "bow", label: "Enchanted Bow", emoji: "🏹", scoringEffects: { patience: 5, independence: 4 } },
      { id: "hammer", label: "Giant Hammer", emoji: "🔨", scoringEffects: { bravery: 7, chaos: 3 } },
      { id: "invisible_sword", label: "Invisible Sword", emoji: "👻", scoringEffects: { mystery: 6, creativity: 4 } },
      { id: "spoon", label: "Magical Spoon", emoji: "🥄", scoringEffects: { humor: 9, chaos: 5 } },
      { id: "forbidden_book", label: "Book of Forbidden Knowledge", emoji: "📕", scoringEffects: { intelligence: 7, darkness: 5 } },
      { id: "whatever_nearby", label: "Whatever Is Nearby", emoji: "🪑", scoringEffects: { chaos: 7, humor: 6, creativity: 3 } },
    ],
  },
  {
    id: "companion",
    step: 10,
    type: "single_choice",
    title: "Choose your companion.",
    subtitle: "They'll be there when it gets weird. It will get weird.",
    options: [
      { id: "dragon", label: "Dragon", emoji: "🐉", scoringEffects: { bravery: 6, romance: 3, risk: 4 } },
      { id: "phoenix", label: "Phoenix", emoji: "🔥", scoringEffects: { optimism: 7, creativity: 4 } },
      { id: "wolf", label: "Wolf", emoji: "🐺", scoringEffects: { loyalty: 7, independence: 4 } },
      { id: "griffin", label: "Griffin", emoji: "🦅", scoringEffects: { leadership: 5, bravery: 5 } },
      { id: "robot", label: "Robot", emoji: "🤖", scoringEffects: { intelligence: 6, creativity: 5 } },
      { id: "talking_cat", label: "Talking Cat", emoji: "🐱", scoringEffects: { humor: 7, mystery: 4 } },
      { id: "goblin", label: "Tiny Angry Goblin", emoji: "👹", scoringEffects: { chaos: 7, humor: 6 } },
      { id: "best_friend", label: "Loyal Best Friend", emoji: "🤝", scoringEffects: { loyalty: 9, romance: 3 } },
      { id: "mysterious_stranger", label: "Mysterious Stranger", emoji: "🌑", scoringEffects: { mystery: 7, darkness: 3 } },
    ],
  },
  {
    id: "power",
    step: 11,
    type: "single_choice",
    title: "If you could have one completely unfair power, what would it be?",
    subtitle: "No limits. No consequences. (The story will add consequences.)",
    options: [
      { id: "time", label: "Time Manipulation", emoji: "⏳", scoringEffects: { intelligence: 5, mystery: 5, patience: 4 } },
      { id: "teleport", label: "Teleportation", emoji: "⚡", scoringEffects: { independence: 6, risk: 5 } },
      { id: "mind_read", label: "Mind Reading", emoji: "🧠", scoringEffects: { intelligence: 7, mystery: 5, darkness: 2 } },
      { id: "invisibility", label: "Invisibility", emoji: "👻", scoringEffects: { mystery: 8, independence: 4 } },
      { id: "fire", label: "Fire", emoji: "🔥", scoringEffects: { bravery: 6, chaos: 6 } },
      { id: "ice", label: "Ice", emoji: "❄️", scoringEffects: { patience: 6, intelligence: 5 } },
      { id: "shadow", label: "Shadow Control", emoji: "🌑", scoringEffects: { darkness: 7, mystery: 6 } },
      { id: "reality", label: "Reality Editing", emoji: "✨", scoringEffects: { creativity: 9, chaos: 5 } },
      { id: "luck", label: "Infinite Luck", emoji: "🍀", scoringEffects: { optimism: 7, chaos: 5, humor: 3 } },
      { id: "pause", label: "Pause Time", emoji: "⏸️", scoringEffects: { patience: 7, mystery: 4, intelligence: 3 } },
    ],
  },
  {
    id: "fear",
    step: 12,
    type: "single_choice",
    title: "What scares your character the most?",
    subtitle: "This becomes your main obstacle. Sorry in advance.",
    options: [
      { id: "failure", label: "Failure", emoji: "📉", scoringEffects: { ambition: 4, darkness: 5 } },
      { id: "losing_someone", label: "Losing Someone", emoji: "💔", scoringEffects: { loyalty: 5, darkness: 4, romance: 3 } },
      { id: "forgotten", label: "Being Forgotten", emoji: "👁️", scoringEffects: { ambition: 5, darkness: 4 } },
      { id: "alone", label: "Being Alone", emoji: "🌚", scoringEffects: { romance: 5, loyalty: 4, darkness: 3 } },
      { id: "no_control", label: "Losing Control", emoji: "🌪️", scoringEffects: { darkness: 5, chaos: -3, intelligence: 3 } },
      { id: "embarrassment", label: "Public Embarrassment", emoji: "😳", scoringEffects: { humor: 4, darkness: 3, chaos: 3 } },
      { id: "unknown", label: "The Unknown", emoji: "❓", scoringEffects: { mystery: 5, darkness: 4 } },
      { id: "become_villain", label: "Becoming the Villain", emoji: "😈", scoringEffects: { darkness: 7, mystery: 4, loyalty: 3 } },
      { id: "money", label: "Running Out of Money", emoji: "💸", scoringEffects: { ambition: 4, humor: 3, chaos: 3 } },
      { id: "monday", label: "Monday Morning", emoji: "😱", scoringEffects: { humor: 8, chaos: 3 } },
    ],
  },
  {
    id: "trust",
    step: 13,
    type: "single_choice",
    title: "Who would you trust when everything goes wrong?",
    subtitle: "Choose carefully. The betrayal comes in Chapter 4.",
    options: [
      { id: "best_friend", label: "Best Friend", emoji: "🤝", scoringEffects: { loyalty: 8, romance: 3 } },
      { id: "family", label: "Family", emoji: "👨‍👩‍👧", scoringEffects: { loyalty: 7, optimism: 4 } },
      { id: "team", label: "My Team", emoji: "👥", scoringEffects: { leadership: 6, loyalty: 5 } },
      { id: "nobody", label: "Nobody", emoji: "🌑", scoringEffects: { independence: 9, darkness: 4 } },
      { id: "companion", label: "My Companion", emoji: "🐉", scoringEffects: { loyalty: 7, mystery: 3 } },
      { id: "myself", label: "Myself", emoji: "💪", scoringEffects: { independence: 8, ambition: 3 } },
      { id: "mysterious_stranger", label: "The Mysterious Stranger", emoji: "🌑", scoringEffects: { mystery: 8, risk: 4 } },
    ],
  },
  {
    id: "sacrifice",
    step: 14,
    type: "single_choice",
    title: "To save the kingdom, what would you sacrifice?",
    subtitle: "This becomes the climax of your movie. No pressure.",
    options: [
      { id: "power", label: "My Power", emoji: "⚡", scoringEffects: { loyalty: 6, optimism: 4, darkness: -2 } },
      { id: "wealth", label: "My Wealth", emoji: "💰", scoringEffects: { loyalty: 5, optimism: 5 } },
      { id: "reputation", label: "My Reputation", emoji: "🏆", scoringEffects: { bravery: 6, loyalty: 4 } },
      { id: "freedom", label: "My Freedom", emoji: "🔒", scoringEffects: { loyalty: 8, darkness: 3 } },
      { id: "dream", label: "My Dream", emoji: "💭", scoringEffects: { loyalty: 7, darkness: 4 } },
      { id: "relationship", label: "My Relationship", emoji: "💔", scoringEffects: { independence: 6, darkness: 5 } },
      { id: "nothing", label: "Nothing — I'll Find Another Way", emoji: "😤", scoringEffects: { creativity: 6, chaos: 5, humor: 4 } },
    ],
  },
  {
    id: "ending",
    step: 15,
    type: "single_choice",
    title: "How should your movie end?",
    subtitle: "The final act. Roll credits.",
    options: [
      { id: "heroic", label: "Heroic Victory", emoji: "🏆", scoringEffects: { bravery: 6, optimism: 5 } },
      { id: "happy", label: "Happy Ending", emoji: "🌅", scoringEffects: { optimism: 7, romance: 4 } },
      { id: "bittersweet", label: "Bittersweet", emoji: "😌", scoringEffects: { darkness: 4, optimism: 3, mystery: 3 } },
      { id: "tragic", label: "Tragic", emoji: "💀", scoringEffects: { darkness: 8, mystery: 4 } },
      { id: "become_villain", label: "Become the Villain", emoji: "😈", scoringEffects: { darkness: 9, ambition: 5 } },
      { id: "rule", label: "Rule the Kingdom", emoji: "👑", scoringEffects: { ambition: 8, leadership: 5 } },
      { id: "disappear", label: "Disappear Mysteriously", emoji: "💨", scoringEffects: { mystery: 9, independence: 5 } },
      { id: "secret_ending", label: "Secret Ending", emoji: "🔮", scoringEffects: { mystery: 7, chaos: 4 } },
      { id: "sequel", label: "Leave It Open for Part 2", emoji: "🎬", scoringEffects: { optimism: 5, ambition: 4, humor: 3 } },
    ],
  },
];

export const INTERACTIVE_CHOICES = [
  {
    id: "fight",
    label: "Fight the Dark Lord",
    emoji: "⚔️",
    description: "Charge into battle. Consequences TBD.",
  },
  {
    id: "accept",
    label: "Accept the Power",
    emoji: "⚡",
    description: "Take what's offered. Worry about it later.",
  },
  {
    id: "save_friend",
    label: "Save Your Friend",
    emoji: "🤝",
    description: "Risk everything for the person who matters.",
  },
  {
    id: "trick",
    label: "Trick the Dark Lord",
    emoji: "😏",
    description: "Too clever for a straightforward battle. Probably.",
  },
];

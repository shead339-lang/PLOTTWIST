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
  subtitle?: string;
  scoringEffects?: Partial<Record<string, number>>;
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
    subtitle: "Enter your name... or an alias if the authorities are looking for you.",
    placeholder: "Enter your name...",
    maxLength: 30,
  },
  {
    id: "universe",
    step: 2,
    type: "universe",
    title: "Choose your universe / cinematic setting.",
    subtitle: "Every disaster deserves an aesthetically pleasing backdrop.",
  },
  {
    id: "role",
    step: 3,
    type: "role",
    title: "If your life became a movie, who would you want to be?",
    subtitle: "Choose who you think you are. The algorithm will disagree later.",
  },
  {
    id: "situation",
    step: 4,
    type: "single_choice",
    title: "What is currently happening in your life?",
    subtitle: "Be honest. The writers are taking notes.",
    options: [
      { id: "under_control", label: "Everything is under control", emoji: "🧘", subtitle: "Suspicious. Very suspicious." },
      { id: "everything_at_once", label: "Everything is happening at once", emoji: "🔥", subtitle: "The classic." },
      { id: "surviving", label: "I'm just surviving", emoji: "🫠", subtitle: "Respect." },
      { id: "getting_rich", label: "Trying to become rich", emoji: "💰", subtitle: "The website takes 0% responsibility." },
      { id: "relationship", label: "Relationship complications", emoji: "❤️", subtitle: "The writers have ordered popcorn." },
      { id: "no_idea", label: "Honestly, I have no idea", emoji: "🤷", subtitle: "Probably the best answer." },
    ],
  },
  {
    id: "severity",
    step: 5,
    type: "single_choice",
    title: "How serious is your current situation?",
    subtitle: "Rate the danger level of your existence.",
    options: [
      { id: "mild", label: "Mild", emoji: "1️⃣", subtitle: "“I'll probably be fine.”" },
      { id: "concerning", label: "Concerning", emoji: "2️⃣", subtitle: "“We should probably talk.”" },
      { id: "very_concerning", label: "Very concerning", emoji: "3️⃣", subtitle: "“Call the wizard.”" },
      { id: "ridiculous", label: "Absolutely ridiculous", emoji: "4️⃣", subtitle: "“Cancel the movie.”" },
      { id: "no_saving", label: "There is no saving me", emoji: "5️⃣", subtitle: "“Excellent. Great for the story.”" },
    ],
  },
  {
    id: "problem_solving",
    step: 6,
    type: "single_choice",
    title: "You have 1 hour to solve your biggest problem. What do you do?",
    subtitle: "Choose your terrible decision.",
    options: [
      { id: "plan", label: "Make a 47-step plan", emoji: "🧠" },
      { id: "ignore", label: "Ignore it completely", emoji: "🏃" },
      { id: "coffee", label: "Drink excessive coffee", emoji: "☕" },
      { id: "ask_friend", label: "Ask someone else in panic", emoji: "📱" },
      { id: "hope", label: "Hope the universe fixes it", emoji: "🙏" },
      { id: "make_worse", label: "Make the situation significantly worse", emoji: "🤡" },
    ],
  },
  {
    id: "weakness",
    step: 7,
    type: "single_choice",
    title: "What is most likely to destroy your entire plan?",
    subtitle: "Your greatest weakness and recurring curse.",
    options: [
      { id: "procrastination", label: "Procrastination", emoji: "😴" },
      { id: "overthinking", label: "Overthinking", emoji: "🌀" },
      { id: "too_trusting", label: "Trusting the wrong person", emoji: "🥺" },
      { id: "spending", label: "Spending money recklessly", emoji: "💸" },
      { id: "ego", label: "My own unearned confidence", emoji: "😎" },
      { id: "phone", label: "My phone (3% battery)", emoji: "📱" },
      { id: "say_yes", label: "“I'll do it tomorrow”", emoji: "⚡" },
      { id: "i_am_the_problem", label: "Honestly, I am the problem", emoji: "🪞" },
    ],
  },
  {
    id: "emergency_strategy",
    step: 8,
    type: "single_choice",
    title: "The kingdom is under attack. What is your emergency strategy?",
    subtitle: "When everyone looks at you for heroic leadership.",
    options: [
      { id: "fight", label: "Fight immediately", emoji: "🗡️" },
      { id: "strategy", label: "Make an overly elaborate strategy", emoji: "🧠" },
      { id: "run", label: "Tactically run away", emoji: "🏃" },
      { id: "call", label: "Call a friend in tears", emoji: "📞" },
      { id: "coffee_emergency", label: "Make coffee first", emoji: "☕" },
      { id: "nap", label: "Take a quick nap", emoji: "😴" },
      { id: "pretend", label: "Pretend I didn't see anything", emoji: "🤷" },
    ],
  },
  {
    id: "weapon",
    step: 9,
    type: "single_choice",
    title: "Choose your legendary weapon / random object.",
    subtitle: "Every hero needs an item they do not understand.",
    options: [
      { id: "sword", label: "Legendary Sword", emoji: "⚔️" },
      { id: "staff", label: "Magic Staff", emoji: "🪄" },
      { id: "chair", label: "The Chair of Destiny", emoji: "🪑" },
      { id: "spoon", label: "Magical Spoon (Don't ask)", emoji: "🥄" },
      { id: "phone_relic", label: "Almost-Dead Phone (3% Battery)", emoji: "📱" },
      { id: "coffee_relic", label: "Emergency Coffee (PWR 99)", emoji: "☕" },
      { id: "forbidden_book", label: "Book of Forbidden Knowledge", emoji: "📕" },
      { id: "common_sense", label: "Common Sense (Fragile)", emoji: "🧠" },
    ],
  },
  {
    id: "companion",
    step: 10,
    type: "single_choice",
    title: "Choose your companion in chaos.",
    subtitle: "They will be there when it gets weird.",
    options: [
      { id: "dragon", label: "Ember the Dragon (Eats gold, complains constantly)", emoji: "🐉" },
      { id: "talking_cat", label: "Professor Whiskers (The talking cat who judges you)", emoji: "🐱" },
      { id: "wolf", label: "Shadow the Wolf (Fiercely loyal, hates your friends)", emoji: "🐺" },
      { id: "robot", label: "ARLO-7 (AI bot quietly questioning your life)", emoji: "🤖" },
      { id: "goblin", label: "Tiny Angry Goblin (3 feet of pure fury)", emoji: "👹" },
      { id: "best_friend", label: "Loyal Best Friend (Enthusiastic accomplice)", emoji: "🤝" },
    ],
  },
  {
    id: "sacrifice",
    step: 11,
    type: "single_choice",
    title: "To save the kingdom, what would you sacrifice?",
    subtitle: "The dramatic climax approaches.",
    options: [
      { id: "power", label: "My magical powers", emoji: "⚡" },
      { id: "wealth", label: "My accumulated wealth", emoji: "💰" },
      { id: "reputation", label: "My reputation", emoji: "🏆" },
      { id: "freedom", label: "My freedom", emoji: "🔒" },
      { id: "screen_time", label: "My daily screen time", emoji: "📱" },
      { id: "nothing", label: "Nothing — I'll find a chaotic loophole", emoji: "😤" },
    ],
  },
  {
    id: "ending",
    step: 12,
    type: "single_choice",
    title: "How should this disaster conclude?",
    subtitle: "The final credits roll.",
    options: [
      { id: "heroic", label: "Heroic Victory (Confused, but victorious)", emoji: "🏆" },
      { id: "happy", label: "Happy Ending (With suspicious sequel hints)", emoji: "🌅" },
      { id: "tragic", label: "Tragic & Dramatic (With excessive rain)", emoji: "💀" },
      { id: "become_villain", label: "Become the Villain (Better outfits)", emoji: "😈" },
      { id: "rule", label: "Rule the Kingdom (Still not reading emails)", emoji: "👑" },
      { id: "sequel", label: "Leave it open for Part 2", emoji: "🎬" },
    ],
  },
];

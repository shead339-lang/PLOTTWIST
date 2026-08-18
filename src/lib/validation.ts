import { z } from "zod";

const defaultAnswer = (defaultValue: string) =>
  z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => {
      if (!v) return defaultValue;
      if (Array.isArray(v)) return v.length > 0 ? v.join(",") : defaultValue;
      return v.trim() || defaultValue;
    });

export const QuizAnswersSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((v) => (v && v.trim().length > 0 ? v.trim().slice(0, 30) : "The Protagonist")),
  universe: z.string().optional().transform((v) => (v && v.trim() ? v : "fantasy")),
  role: z.string().optional().transform((v) => (v && v.trim() ? v : "reluctant_hero")),
  situation: defaultAnswer("everything_at_once"),
  severity: defaultAnswer("ridiculous"),
  problem_solving: defaultAnswer("make_worse"),
  weakness: defaultAnswer("procrastination"),
  emergency_strategy: defaultAnswer("nap"),
  weapon: defaultAnswer("chair"),
  companion: defaultAnswer("talking_cat"),
  sacrifice: defaultAnswer("screen_time"),
  ending: defaultAnswer("sequel"),
  // Fallbacks for any legacy/derived references
  quest: defaultAnswer("survive"),
  strength: defaultAnswer("luck"),
  power: defaultAnswer("time"),
  fear: defaultAnswer("monday"),
  trust: defaultAnswer("nobody"),
});

export type QuizAnswers = z.infer<typeof QuizAnswersSchema>;

export const StoryResultSchema = z.object({
  movieTitle: z.string(),
  tagline: z.string(),
  genre: z.string(),
  characterIntroduction: z.string(),
  currentChapter: z.string(),
  quest: z.string(),
  villain: z.string(),
  companion: z.string(),
  plotTwist: z.string(),
  finalBattle: z.string(),
  ending: z.string(),
  postCreditScene: z.string(),
});

export type StoryResult = z.infer<typeof StoryResultSchema>;

export const InteractiveChoiceSchema = z.object({
  movieId: z.string(),
  choice: z.enum(["fight", "accept", "save_friend", "trick"]),
  profile: z.record(z.string(), z.unknown()),
});

export const ShareCodeSchema = z.string().regex(/^[A-Z0-9]{6,10}$/, { message: "Invalid share code" });

export const FriendMovieSchema = z.object({
  universe: z.string(),
  names: z.array(z.string().min(1).max(30).trim()).min(2).max(6),
});

export function sanitizeName(name: string): string {
  return name.replace(/[<>'"&]/g, "").trim().slice(0, 30);
}

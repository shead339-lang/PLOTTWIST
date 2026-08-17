import { z } from "zod";

export const QuizAnswersSchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name must be 30 characters or less").trim(),
  universe: z.string().min(1, "Universe is required"),
  role: z.string().min(1, "Role is required"),
  situation: z.string().min(1, "Situation is required"),
  quest: z.string().min(1, "Quest is required"),
  strength: z.string().min(1, "Strength is required"),
  weakness: z.string().min(1, "Weakness is required"),
  problem_solving: z.string().min(1, "Problem solving style is required"),
  weapon: z.string().min(1, "Weapon is required"),
  companion: z.string().min(1, "Companion is required"),
  power: z.string().min(1, "Power is required"),
  fear: z.string().min(1, "Fear is required"),
  trust: z.string().min(1, "Trust is required"),
  sacrifice: z.string().min(1, "Sacrifice is required"),
  ending: z.string().min(1, "Ending is required"),
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

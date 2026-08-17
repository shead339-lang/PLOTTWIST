import { z } from "zod";

const answerField = (errMsg: string) =>
  z
    .union([z.string().min(1, errMsg), z.array(z.string().min(1)).min(1, errMsg)])
    .transform((v) => (Array.isArray(v) ? v.join(",") : v));

export const QuizAnswersSchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name must be 30 characters or less").trim(),
  universe: z.string().min(1, "Universe is required"),
  role: z.string().min(1, "Role is required"),
  situation: answerField("Situation is required"),
  quest: answerField("Quest is required"),
  strength: answerField("Strength is required"),
  weakness: answerField("Weakness is required"),
  problem_solving: answerField("Problem solving style is required"),
  weapon: answerField("Weapon is required"),
  companion: answerField("Companion is required"),
  power: answerField("Power is required"),
  fear: answerField("Fear is required"),
  trust: answerField("Trust is required"),
  sacrifice: answerField("Sacrifice is required"),
  ending: answerField("Ending is required"),
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

import { NextRequest, NextResponse } from "next/server";
import { QuizAnswersSchema } from "@/lib/validation";
import { buildMovieProfile } from "@/lib/scoring";
import { getAIProvider } from "@/lib/ai/provider";
import { saveMovie } from "@/lib/database";

// Rate limiting (simple in-memory, upgrade to Redis for production)
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function getRateLimitKey(req: NextRequest): string {
  return req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getRateLimitKey(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before generating another movie." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = QuizAnswersSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid quiz answers", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const profile = buildMovieProfile(parsed.data);
    const aiProvider = await getAIProvider();

    let story;
    try {
      story = await aiProvider.generateStory(profile);
    } catch (aiError) {
      console.error("AI generation failed, using fallback:", aiError);
      const { FallbackProvider } = await import("@/lib/ai/fallback");
      const fallback = new FallbackProvider();
      story = await fallback.generateStory(profile);
    }

    // Save to database and get share code
    const shareCode = await saveMovie(profile, story);

    return NextResponse.json({
      success: true,
      shareCode,
      profile,
      story,
    });
  } catch (error) {
    console.error("Generate story error:", error);
    return NextResponse.json(
      { error: "Failed to generate your movie. Please try again." },
      { status: 500 }
    );
  }
}

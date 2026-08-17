import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/provider";
import { getMovie } from "@/lib/database";

export async function POST(req: NextRequest) {
  try {
    const { shareCode, choice } = await req.json();

    if (!shareCode || !choice) {
      return NextResponse.json({ error: "Missing shareCode or choice" }, { status: 400 });
    }

    const movie = await getMovie(shareCode);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const aiProvider = await getAIProvider();
    let continuation;
    try {
      continuation = await aiProvider.continueStory(
        movie.profile,
        choice,
        movie.story as unknown as Record<string, string>
      );
    } catch {
      const { FallbackProvider } = await import("@/lib/ai/fallback");
      const fallback = new FallbackProvider();
      continuation = await fallback.continueStory(
        movie.profile,
        choice,
        movie.story as unknown as Record<string, string>
      );
    }

    return NextResponse.json({ success: true, continuation });
  } catch (error) {
    console.error("Continue story error:", error);
    return NextResponse.json({ error: "Failed to continue story" }, { status: 500 });
  }
}

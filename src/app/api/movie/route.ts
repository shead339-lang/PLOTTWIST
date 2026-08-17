import { NextRequest, NextResponse } from "next/server";
import { getMovie } from "@/lib/database";
import { getAIProvider } from "@/lib/ai/provider";

export async function GET(req: NextRequest) {
  const shareCode = req.nextUrl.searchParams.get("code");
  if (!shareCode) {
    return NextResponse.json({ error: "Share code required" }, { status: 400 });
  }

  const movie = await getMovie(shareCode);
  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, movie });
}

export async function POST(req: NextRequest) {
  try {
    const { shareCode, endingType } = await req.json();

    const movie = await getMovie(shareCode);
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const aiProvider = await getAIProvider();
    let alternateEnding;
    try {
      alternateEnding = await aiProvider.generateAlternateEnding(
        movie.profile,
        endingType as "hero" | "dark" | "funny"
      );
    } catch {
      const { FallbackProvider } = await import("@/lib/ai/fallback");
      const fallback = new FallbackProvider();
      alternateEnding = await fallback.generateAlternateEnding(
        movie.profile,
        endingType as "hero" | "dark" | "funny"
      );
    }

    return NextResponse.json({ success: true, alternateEnding });
  } catch (error) {
    console.error("Movie API error:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}

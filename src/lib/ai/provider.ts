import type { MovieProfile } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";

// Abstract interface for all AI providers
export interface AIProvider {
  generateStory(profile: MovieProfile): Promise<StoryResult>;
  continueStory(
    profile: MovieProfile,
    choice: string,
    originalStory: Record<string, string>
  ): Promise<{ continuationTitle: string; continuation: string; cliffhanger: string }>;
  generateAlternateEnding(
    profile: MovieProfile,
    endingType: "hero" | "dark" | "funny"
  ): Promise<{ endingTitle: string; ending: string; finalLine: string }>;
}

export type ProviderType = "openrouter" | "fallback";

export async function getAIProvider(): Promise<AIProvider> {
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;

  if (hasOpenRouter) {
    const { OpenRouterProvider } = await import("./openrouter");
    return new OpenRouterProvider();
  }

  const { FallbackProvider } = await import("./fallback");
  return new FallbackProvider();
}

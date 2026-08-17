import type { AIProvider } from "./provider";
import type { MovieProfile } from "@/lib/scoring";
import type { StoryResult } from "@/lib/validation";
import { SYSTEM_PROMPT, buildStoryPrompt, buildContinuationPrompt, buildAlternateEndingPrompt } from "@/lib/prompts";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Free/affordable models that work well for creative writing
const PREFERRED_MODELS = [
  "meta-llama/llama-3.1-8b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemma-2-9b-it:free",
];

async function callOpenRouter(
  messages: { role: string; content: string }[],
  maxTokens = 900
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured");

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://plottwist.app",
      "X-Title": "PlotTwist - Your Life As A Movie",
    },
    body: JSON.stringify({
      model: PREFERRED_MODELS[0],
      messages,
      max_tokens: maxTokens,
      temperature: 0.85,
      top_p: 0.9,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} — ${error}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenRouter");
  return content;
}

function parseJSON<T>(text: string): T {
  // Handle markdown code blocks
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(cleaned) as T;
}

export class OpenRouterProvider implements AIProvider {
  async generateStory(profile: MovieProfile): Promise<StoryResult> {
    const content = await callOpenRouter(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildStoryPrompt(profile) },
      ],
      1000
    );

    return parseJSON<StoryResult>(content);
  }

  async continueStory(
    profile: MovieProfile,
    choice: string,
    originalStory: Record<string, string>
  ) {
    const content = await callOpenRouter(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildContinuationPrompt(profile, originalStory, choice) },
      ],
      800
    );
    return parseJSON<{ continuationTitle: string; continuation: string; cliffhanger: string }>(content);
  }

  async generateAlternateEnding(
    profile: MovieProfile,
    endingType: "hero" | "dark" | "funny"
  ) {
    const content = await callOpenRouter(
      [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildAlternateEndingPrompt(profile, endingType) },
      ],
      600
    );
    return parseJSON<{ endingTitle: string; ending: string; finalLine: string }>(content);
  }
}

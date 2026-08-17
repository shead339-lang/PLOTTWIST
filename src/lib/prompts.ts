import type { MovieProfile } from "@/lib/scoring";

const SYSTEM_PROMPT = `You are the creative director of PlotTwist — an entertainment website that turns real people's quiz answers into personalized cinematic stories. Your job is to create a funny, dramatic, and deeply personalized movie story.

RULES:
- This is entertainment only. Never claim psychological accuracy, predict real futures, or give advice.
- Keep the tone: 60% cinematic drama + 25% comedy + 15% personal references from the profile.
- Use SHORT paragraphs. Mix dramatic headings with self-aware humor.
- Always reference the user's actual answers: their weakness becomes a curse, their quest becomes the main objective, their companion appears, their villain arrives, their plot twist surprises.
- Make the character feel recognizable from their answers.
- The story must feel PERSONAL and FUNNY, not generic.
- Keep each story section concise but vivid.
- Include the plot twist dramatically in the middle or end.
- End with the preferred ending style from the profile.
- Family-friendly content only.

RESPONSE FORMAT: Return ONLY a valid JSON object with no markdown, no explanation, exactly matching this schema:
{
  "movieTitle": "string (creative, dramatic, possibly funny)",
  "tagline": "string (one-liner, punchy)",
  "genre": "string (e.g. Epic Fantasy Comedy)",
  "characterIntroduction": "string (2-3 sentences introducing the character)",
  "currentChapter": "string (2-3 sentences about current situation)",
  "quest": "string (2-3 sentences about the main quest)",
  "villain": "string (2-3 sentences about the villain)",
  "companion": "string (2-3 sentences about the companion)",
  "plotTwist": "string (2-3 dramatic sentences revealing the twist)",
  "finalBattle": "string (3-4 sentences about the climax)",
  "ending": "string (2-3 sentences wrapping up)",
  "postCreditScene": "string (1-2 funny/mysterious sentences)"
}`;

export function buildStoryPrompt(profile: MovieProfile): string {
  return `Create a personalized movie story for this character profile:

CHARACTER PROFILE:
- Name: ${profile.name}
- Universe: ${profile.universe}
- They wanted to be: ${profile.preferredRole}
- They actually are: ${profile.archetypeLabel} — "${profile.archetypeDescription}"
- Current situation: ${profile.situation}
- Main quest: ${profile.quest}
- Greatest strength: ${profile.strength}
- Biggest weakness: ${profile.weakness} (make this a funny recurring curse)
- Problem-solving style: ${profile.problemSolvingStyle}
- Weapon: ${profile.weapon}
- Companion: ${profile.companionLabel}
- Forbidden power: ${profile.power}
- Biggest fear: ${profile.fear} (make this the main obstacle)
- Villain: ${profile.villainLabel}
- Plot twist to include: "${profile.plotTwist}"
- Sacrifice made: ${profile.sacrifice}
- Preferred ending style: ${profile.endingPreference}

TONE GUIDANCE:
- Comedy level: ${Math.round(profile.comedyLevel * 100)}%
- Drama level: ${Math.round(profile.dramaLevel * 100)}%
- Story tone: ${profile.storyTone}

IMPORTANT: Make ${profile.name}'s ${profile.weakness} come up at the WORST possible moment for maximum comedy. The plot twist ("${profile.plotTwist}") should feel both surprising and inevitable.`;
}

export function buildContinuationPrompt(
  profile: MovieProfile,
  originalStory: Record<string, string>,
  choice: string
): string {
  const choiceDescriptions: Record<string, string> = {
    fight: "charged directly into battle against the Dark Lord",
    accept: "accepted the Dark Lord's offer of unlimited power",
    save_friend: "turned away from the battle to save their companion",
    trick: "attempted to outsmart the Dark Lord with a clever scheme",
  };

  return `Continue this personalized movie story. The character ${profile.name} (${profile.archetypeLabel}) has made a critical decision: they ${choiceDescriptions[choice] ?? choice}.

Original story context:
- Universe: ${profile.universe}
- Villain: ${profile.villainLabel}
- Companion: ${profile.companionLabel}
- Power: ${profile.power}
- Weakness: ${profile.weakness}
- The plot twist already revealed: "${profile.plotTwist}"

The original story ended at a cliffhanger. Now write the continuation based on their choice.

Return a JSON object:
{
  "continuationTitle": "string (dramatic chapter title)",
  "continuation": "string (4-6 dramatic paragraphs continuing the story based on their choice)",
  "cliffhanger": "string (optional new cliffhanger or final resolution)"
}`;
}

export function buildAlternateEndingPrompt(
  profile: MovieProfile,
  endingType: "hero" | "dark" | "funny"
): string {
  const endingGuides = {
    hero: "Write a triumphant, heroic ending where the character overcomes every obstacle and wins completely.",
    dark: "Write a dark, bittersweet ending where the character wins but loses something important — or becomes the very thing they fought against.",
    funny: "Write a completely absurd, comedic ending where the character technically wins but in the most ridiculous way possible.",
  };

  return `Write an alternate ending for ${profile.name}'s story in the ${profile.universe} universe.

Character: ${profile.archetypeLabel}
Villain: ${profile.villainLabel}
Companion: ${profile.companionLabel}
Weakness (use for comedy if funny ending): ${profile.weakness}

ENDING DIRECTION: ${endingGuides[endingType]}

Return JSON:
{
  "endingTitle": "string",
  "ending": "string (3-4 paragraphs)",
  "finalLine": "string (memorable closing line)"
}`;
}

export { SYSTEM_PROMPT };

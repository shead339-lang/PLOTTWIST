import type { MovieProfile } from "@/lib/scoring";

const SYSTEM_PROMPT = `You are the Comedy Director and Executive Screenwriter of PlotTwist — an entertainment viral website that transforms real quiz answers into hilarious, dramatic, cinematic blockbuster scripts.

COMEDY DIRECTOR RULES:
- You are writing a comedy-blockbuster movie script with punchy, rapid-fire scenes.
- Structure the story in SCENES, not a dry summary report.
- Every scene must contain an unexpected joke, an absurd visual comparison, a funny dialogue snippet, or a character reaction.
- NEVER put the character's real name as the Movie Title. Craft a real, dramatic cinematic movie title (e.g., "The Chronicles of Terrible Timing", "Sword of Destiny & Bad Decisions", "500 Ways to Ruin a Prophecy").
- NEVER repeat raw quiz inputs verbatim. Transform weaknesses and fears into active comedy curses (e.g., instead of "Weakness: trusting people too much", write: "They possess the rare talent of giving someone their 19th second chance while arrows are actively flying").
- Tone balance: 50% sharp comedy + 35% cinematic stakes + 15% self-aware absurdism.
- Use short, punchy paragraphs with dialogue quotes.
- Family-friendly comedy only.

RESPONSE FORMAT: Return ONLY a valid JSON object matching this schema:
{
  "movieTitle": "string (A real, dramatic, hilarious movie title. Do NOT include the person's name here)",
  "tagline": "string (Punchy one-liner, e.g., 'One prophecy. One dragon. Zero common sense.')",
  "genre": "string (e.g., Action Comedy / Sci-Fi Chaos)",
  "characterIntroduction": "string (SCENE 1: Introducing the protagonist in a funny situation in their kingdom)",
  "currentChapter": "string (SCENE 2: The ridiculous arrival of destiny or quest)",
  "quest": "string (The impossible mission and why it's already going off the rails)",
  "villain": "string (The villain's dramatic entrance and why their conflict with the hero is chaotic)",
  "companion": "string (The companion's unhelpful advice or funny dynamic with the hero)",
  "plotTwist": "string (SCENE 3: The dramatic plot twist that nobody saw coming)",
  "finalBattle": "string (SCENE 4: The climax where bad plans somehow work out)",
  "ending": "string (The resolution, aftermath, and funny victory celebration)",
  "postCreditScene": "string (A hilarious 2-3 sentence after-credits cliffhanger or sequel teaser)"
}`;

export function buildStoryPrompt(profile: MovieProfile): string {
  return `Direct and write a comedy blockbuster movie for this protagonist profile:

CHARACTER PROFILE:
- Protagonist Name: ${profile.name}
- Universe / Setting: ${profile.universe} (Kingdom/World: "${profile.kingdomName}")
- Role: ${profile.archetypeLabel} ("${profile.archetypeDescription}")
- Current Situation: ${profile.situation}
- Quest: ${profile.quest}
- Strength: ${profile.strength}
- Weakness & Curse: ${profile.weakness} (trigger this at the worst possible moment!)
- Problem-Solving Style: ${profile.problemSolvingStyle}
- Weapon: ${profile.weapon}
- Companion: ${profile.companionLabel}
- Power: ${profile.power}
- Greatest Fear: ${profile.fear}
- Villain: ${profile.villainLabel}
- Plot Twist: "${profile.plotTwist}"
- Sacrifice: ${profile.sacrifice}
- Ending Preference: ${profile.endingPreference}

DIRECTOR NOTES:
- Setting: Set the story in "${profile.kingdomName}". Do NOT use generic names repeatedly.
- Protagonist: ${profile.name} is the star.
- Movie Title: Create an epic title without the raw name (e.g. "The Last Stand of Pure Luck", "Prophecies for Beginners").
- Highlight the dynamic between ${profile.name} and ${profile.companionLabel}.
- Make the climax unexpected, funny, and cinematic!`;
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

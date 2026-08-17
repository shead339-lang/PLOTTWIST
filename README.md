# PlotTwist 🎬 — Your Life As A Movie

> Answer 15 ridiculous questions and let AI turn your life into an epic, funny, cinematic adventure.

## Quick Start

```bash
cd plottwist
cp .env.local.example .env.local
# (optional) Add OPENROUTER_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features (V1)

- 🎭 **Cinematic landing page** with animated film effects and star field
- ❓ **15-question animated quiz** — one question per screen with smooth transitions
- 🌍 **6 movie universes** — Fantasy Kingdom, Superhero World, Sci-Fi Future, Pirate Adventure, Horror Comedy, Magical Academy
- ⚙️ **Deterministic scoring engine** — 15 attributes scored, normalized, archetype selected
- 🤖 **AI story generation** via OpenRouter (falls back to template engine without API key)
- 🎬 **Cinematic generation screen** with 9 sequential status messages
- 🎞️ **Full result page** — movie poster card, character stats, full story, plot twist reveal
- ⚡ **Interactive story decision** — 4 choices that continue the story
- 🔀 **3 alternate endings** — Hero, Dark, Funny
- 🔗 **Shareable URLs** — each movie gets a unique share code
- 👥 **Friend Movie mode** — add friends, auto-assign roles, generate group story
- 📱 **Share buttons** — WhatsApp, X, copy link, native Web Share API

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```env
OPENROUTER_API_KEY=    # Optional - get free at openrouter.ai
SUPABASE_URL=          # Optional - get free at supabase.com
SUPABASE_SERVICE_KEY=  # Optional
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

The site works **without any API keys** using built-in fallback templates.

## Deploy to Vercel

```bash
npx vercel --prod
```

Add environment variables in Vercel Dashboard.

## Architecture

```
src/data/         # Universes, questions, characters, templates
src/lib/          # Scoring engine, AI providers, database, prompts
src/app/          # Pages: landing, quiz, generate, movie, friends
src/app/api/      # API routes: generate-story, continue-story, movie
supabase/         # Database schema
```

## Legal

Entertainment only. No psychological assessments or real predictions. All results are fictional.

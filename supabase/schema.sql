-- PlotTwist — Supabase Schema
-- Run this in your Supabase SQL editor after creating a project

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  share_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  universe TEXT NOT NULL,
  role TEXT NOT NULL,
  profile_json JSONB NOT NULL,
  story_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '90 days')
);

-- Index for fast share code lookups
CREATE INDEX IF NOT EXISTS idx_movies_share_code ON movies(share_code);

-- Optional: Auto-delete expired movies
CREATE OR REPLACE FUNCTION delete_expired_movies()
RETURNS void AS $$
  DELETE FROM movies WHERE expires_at < now();
$$ LANGUAGE SQL;

-- Enable Row Level Security (public read for shared movies)
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read movies by share code"
  ON movies FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert movies"
  ON movies FOR INSERT
  WITH CHECK (true);

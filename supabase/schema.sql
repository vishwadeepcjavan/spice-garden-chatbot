-- Spice Garden Chat Messages Schema
-- Run this in your Supabase SQL Editor to set up the chat_messages table.

CREATE TABLE IF NOT EXISTS chat_messages (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  uuid        NOT NULL,
  role        text        NOT NULL CHECK (role IN ('user', 'assistant')),
  content     text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for efficient lookups by session and time (used for rate limiting)
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
  ON chat_messages (session_id, created_at);

-- Enable Row Level Security (no public policies — server uses service role key)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

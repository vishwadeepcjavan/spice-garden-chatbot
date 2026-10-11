# Spice Garden 🌿

A production-quality full-stack website and AI chatbot for **Spice Garden**, a fictional authentic Indian restaurant based in Pune, India.

---

## 🌟 Features

- **Responsive Single-Page Website**:
  - Sticky frosted navigation bar with mobile hamburger drawer.
  - Rich hero section with custom gradients, micro-animations, and direct "Chat with us" triggers.
  - Curated menu showcase featuring 6 popular signature dishes with pricing in INR (₹).
  - Operating hours and address details (Pune, India).
  - Accessible contact form with instant validation and submission feedback.
  - Restaurant footer with brand links and copyright.
- **Smart AI Chatbot Widget**:
  - Floating round widget button with notification glow and unread indicator.
  - Responsive conversation window (full screen on mobile, 380px floating card on desktop).
  - Instant quick-reply suggestions for common queries (*"What's on the menu?"*, *"Are you open on Sunday?"*, *"Do you deliver?"*).
  - Auto-scrolling transcript, realistic 3-dot typing indicator, 500-character counter, Enter-to-send shortcut.
  - Friendly error handling with inline one-click retry.
  - Client session isolation using cryptographic `crypto.randomUUID()` stored safely in `sessionStorage`.
- **Hardened API Route (`/api/chat`)**:
  - Server-side only handling with zero exposure of API keys to the browser.
  - Strict input validation (UUID verification, array check, 10-message sliding window, 500 characters max per message).
  - Multi-turn conversation handling using the official `@google/genai` SDK with Google Gemini (`gemini-2.5-flash`).
  - Strict system instructions guaranteeing accurate Pune restaurant policies, menu prices, and language mirroring (English, Hindi, Hinglish).
  - Database-backed sliding-window rate limiting (10 requests/minute per session).
  - Fire-and-forget conversation storage to Supabase with Row Level Security (RLS) enforcement.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI Engine**: [Google Gen AI SDK (`@google/genai`)](https://github.com/google-gemini/generative-ai-js)
- **Database**: [Supabase (`@supabase/supabase-js`)](https://supabase.com/)
- **Typography**: Google Fonts via `next/font` (`Playfair Display`, `Plus Jakarta Sans`)

---

## 🚀 Local Setup & Installation

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd chatbot
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key
```

> **Note**: The app gracefully degrades in local development if Supabase keys are omitted (it logs a warning while continuing to process chat via Gemini without database persistence).

---

## 🔑 Getting Your API Keys

### 1. Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **Get API key** and create a key in your project.
4. Copy the API key and paste it as `GEMINI_API_KEY` in `.env.local`.

### 2. Supabase Setup & SQL Schema
1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Navigate to **Project Settings** > **API**:
   - Copy **Project URL** into `SUPABASE_URL`.
   - Copy **service_role (secret)** into `SUPABASE_SERVICE_ROLE_KEY` (⚠️ never use the public `anon` key on the server route!).
4. Go to the **SQL Editor** in your Supabase dashboard and run the contents of [`supabase/schema.sql`](./supabase/schema.sql):

```sql
CREATE TABLE IF NOT EXISTS chat_messages (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  uuid        NOT NULL,
  role        text        NOT NULL CHECK (role IN ('user', 'assistant')),
  content     text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
  ON chat_messages (session_id, created_at);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
```

---

## 🏃‍♂️ Development & Production Build

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### Test Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. In **Settings > Environment Variables**, add the following 4 variables:
   - `GEMINI_API_KEY`: Your Google AI Studio API key.
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `SUPABASE_URL`: Your Supabase Project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key.
4. Click **Deploy**. Vercel will build and serve the application globally with edge caching and zero cold start delay.

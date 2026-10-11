import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // Allow build to succeed without env vars, but log a warning
  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn(
      '[Supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Chat history will not be persisted.'
    );
  }
}

export const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      })
    : null;

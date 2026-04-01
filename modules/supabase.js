const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_KEY = "SUA_ANON_KEY";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
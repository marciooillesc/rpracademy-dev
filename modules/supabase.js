
const SUPABASE_URL = "https://gdjpwwmdfssvokuuibwz.supabase.co";
const SUPABASE_KEY = "sb_publishable_pq2tmDPfr63IG-ymmpANRA_CRJRnrOU";

export const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

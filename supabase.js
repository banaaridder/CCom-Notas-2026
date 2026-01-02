const SUPABASE_URL = "https://rqsokwtewfmvdnsyddrn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TlJfKaHL_skoJbrD6kfBzQ_gIcnGTx_";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log("Supabase OK:", window.supabaseClient);


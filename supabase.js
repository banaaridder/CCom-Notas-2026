// supabase.js
const SUPABASE_URL = "https://rqsokwtewfmvdnsyddrn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TlJfKaHL_skoJbrD6kfBzQ_gIcnGTx_";

// Mantenha apenas ESTA inicialização
window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Crie um atalho para evitar erro de 'undefined' no papiro.js
window.supabase = window.supabaseClient;
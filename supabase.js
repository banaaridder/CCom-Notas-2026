// supabase.js
const SUPABASE_URL = "https://rqsokwtewfmvdnsyddrn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_TlJfKaHL_skoJbrD6kfBzQ_gIcnGTx_";

// A variável precisa se chamar apenas 'supabase' para bater com o campo.js
// Usamos window.supabase.createClient pois a biblioteca do CDN coloca o comando dentro do objeto window
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Log para confirmar no console se carregou
console.log("Supabase inicializado com sucesso!");
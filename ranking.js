import { supabase } from './supabase.js';

const tbody = document.getElementById("ranking-body");

const { data } = await supabase
  .from('notas')
  .select(`
    media_geral,
    usuarios ( nome )
  `)
  .order('media_geral', { ascending: false });

data.forEach((aluno, index) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${aluno.usuarios.nome}</td>
    <td>${Number(aluno.media_geral).toFixed(3)}</td>
  `;
  tbody.appendChild(tr);
});

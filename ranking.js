document.addEventListener("DOMContentLoaded", carregarRanking);

async function carregarRanking() {
  const tbody = document.getElementById("ranking-body");
  tbody.innerHTML = "";

  const { data, error } = await window.supabaseClient
    .from("notas")
    .select(`
      media_geral,
      usuarios:usuario_id ( nome )
    `)
    .order("media_geral", { ascending: false });

  if (error) {
    console.error(error);
    alert("Erro ao carregar ranking");
    return;
  }

  data.forEach((aluno, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${aluno.usuarios?.nome ?? "—"}</td>
      <td>${Number(aluno.media_geral).toFixed(3)}</td>
    `;

    tbody.appendChild(tr);
  });
}

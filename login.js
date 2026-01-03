document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btnLogin")
    .addEventListener("click", login);
});

async function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;

  const { data, error } = await window.supabaseClient
    .from("usuarios")
    .select("*")
    .eq("nome", usuario)
    .single();

  if (error || !data || data.senha !== senha) {
    alert("Usuário ou senha inválidos");
    return;
  }

  localStorage.setItem("usuarioLogado", data.id);
  localStorage.setItem("nomeUsuario", data.nome);

  window.location.href = "index.html";
}

document.getElementById("btnLogin").addEventListener("click", async () => {
    const btn = document.getElementById("btnLogin");

    btn.className = "btn-feedback salvando";

    try {
        await login(); // sua função existente

        btn.className = "btn-feedback salvo";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 700);

    } catch (err) {
        console.error(err);
        btn.className = "btn-feedback erro";
    }
});

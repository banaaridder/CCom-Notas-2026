document.getElementById("btnLogin").addEventListener("click", login);

async function login() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;

  const { data, error } = await window.supabase
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

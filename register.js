document.getElementById("btn").addEventListener("click", registrar);

async function registrar() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  if (!usuario || !senha || !confirmarSenha) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem");
    return;
  }

  const { error } = await window.supabase
    .from("usuarios")
    .insert({
      nome: usuario,
      senha: senha
    });

  if (error) {
    if (error.code === "23505") {
      alert("Usuário já existe");
    } else {
      console.error(error);
      alert("Erro ao criar conta");
    }
    return;
  }

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}

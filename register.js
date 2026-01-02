document.getElementById("btn").addEventListener("click", registrar);

function registrar() {
  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  // Verifica campos vazios
  if (!usuario || !senha || !confirmarSenha) {
    alert("Preencha todos os campos");
    return;
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

  // Verifica se usuário já existe
  if (usuarios[usuario]) {
    alert("Usuário já existe");
    return;
  }

  // Salva o usuário
  usuarios[usuario] = {
    senha: senha,
    notas: {}
  };

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}

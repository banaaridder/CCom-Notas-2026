document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnLogin");
    btn.addEventListener("click", async () => {
        await loginComFeedback(btn);
    });
});

async function loginComFeedback(btn) {
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");
    const mensagemErro = document.getElementById("mensagem-erro");

    // Reset visual
    mensagemErro.textContent = "";
    usuarioInput.classList.remove("input-erro");
    senhaInput.classList.remove("input-erro");
    btn.className = "btn-feedback salvando";

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;

    // Validação campos vazios
    let erro = false;
    if (!usuario) { usuarioInput.classList.add("input-erro"); erro = true; }
    if (!senha) { senhaInput.classList.add("input-erro"); erro = true; }
    if (erro) {
        mensagemErro.textContent = "Preencha todos os campos";
        btn.className = "btn-feedback erro";
        resetErro(btn, [usuarioInput, senhaInput], mensagemErro);
        return;
    }

    // Verificar usuário no Supabase
    const { data, error } = await window.supabaseClient
        .from("usuarios")
        .select("*")
        .eq("nome", usuario)
        .single();

    if (error || !data) {
        mensagemErro.textContent = "Usuário não encontrado";
        btn.className = "btn-feedback erro";
        resetErro(btn, [usuarioInput, senhaInput], mensagemErro);
        return;
    }

    if (data.senha !== senha) {
        mensagemErro.textContent = "Senha incorreta";
        btn.className = "btn-feedback erro";
        resetErro(btn, [senhaInput], mensagemErro);
        return;
    }

    // Login bem-sucedido
    btn.className = "btn-feedback salvo";
    localStorage.setItem("usuarioLogado", data.id);
    localStorage.setItem("nomeUsuario", data.nome);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
}

// Função para resetar botão e inputs após erro
function resetErro(btn, inputs = [], mensagem, tempo = 2000) {
    setTimeout(() => {
        btn.className = "btn-feedback";
        inputs.forEach(input => input.classList.remove("input-erro"));
        mensagem.textContent = "";
    }, tempo);
}

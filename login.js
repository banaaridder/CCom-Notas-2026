document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnLogin");
    const senhaInput = document.getElementById("senha");
    btn.addEventListener("click", async () => {
        await loginComFeedback(btn);
    });

    senhaInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            // Evita comportamentos padrão e clica no botão
            e.preventDefault();
            btn.click();
        }
    });

});

// login.js - Altere a parte final da função loginComFeedback
async function loginComFeedback(btn) {
    // ... (suas validações de campo permanecem iguais)

    // EM VEZ DE CONSULTAR A TABELA "usuarios", USE O AUTH DO SUPABASE:
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
        email: usuario.includes('@') ? usuario : `${usuario}@seudominio.com`, // Supabase exige formato de e-mail
        password: senha,
    });

    if (error) {
        mensagemErro.textContent = "Usuário ou senha inválidos";
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [usuarioInput, senhaInput], mensagemErro, 1000);
        return;
    }

    // Login REAL bem-sucedido
    btn.className = "btn-feedback salvo";
    
    // Opcional: manter seus itens de localStorage para compatibilidade com outras telas
    localStorage.setItem("usuarioLogado", data.user.id);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 700);
}


// Função para resetar botão e inputs com fade
function resetErroFade(btn, inputs = [], mensagem, tempo = 1000) {
    setTimeout(() => {
        mensagem.style.transition = "opacity 0.5s";
        mensagem.style.opacity = 0;
        btn.className = "btn-feedback";

        inputs.forEach(input => input.classList.remove("input-erro"));

        // Limpa mensagem após animação
        setTimeout(() => {
            mensagem.textContent = "";
            mensagem.style.opacity = 1;
        }, 500);
    }, tempo);
}

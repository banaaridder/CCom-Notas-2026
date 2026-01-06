document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", async () => {
        await registrarComFeedback(btn);
    });
});

async function registrarComFeedback(btn) {
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");
    const confirmarInput = document.getElementById("confirmar-senha");
    const mensagemErro = document.getElementById("mensagem-erro");

    const usuario = usuarioInput.value.trim().toUpperCase(); // Normaliza para maiúsculo
    const alunosOficiais = [
        "ROGER", "D SILVA", "GABRIEL PIMENTEL", "REBELO", "DAVI COSTA", "GOES", 
        "FRANCO", "CONTILE", "LOBO", "GUILHERME SOUZA", "ALMEIDA", "DOS REIS", 
        "MATEUS RIBEIRO", "SAMUEL VICTOR", "YURY LINS", "J VICTOR", "LUCAS RYAN", 
        "ROSANOVA", "CORDEIRO SILVA", "TEODORO", "DAVI CARLOS", "L MARTINS", 
        "CAIO NASCIMENTO", "MATHEUS SILVA", "CESAR", "CESTARO", "PERROTTE", 
        "WAGNER PEREIRA", "CLEMENTE", "WALLACE OLIVEIRA", "ESTEVAO", "PEDRO CARVALHO", 
        "R SILVA", "GUILHERME FERREIRA", "QUEIROZ", "LEMOS", "LIESSI", "REIS SOUSA", 
        "SOUZA MOTA", "ALCANTARA", "ADRIEL VALENÇA", "THALES", "VICTOR PEREIRA", 
        "VALE", "LUIZ SANTOS", "BERTUCE", "KAUA SOUZA", "CLAUDIO", "DE ALBUQUERQUE", 
        "GABRIEL SILVA", "MENDONCA", "AMORIM", "P MOURA", "EDUARDO", "TAUAN", 
        "V MAGALHAES", "CONCEICAO", "CYRILLO", "LUCAS ABREU", "BARCELLOS", "MAURO", 
        "LISBOA", "GUEDES", "PRADO", "THIAGO WESLLEY", "STELLE", "MEIRELES", 
        "MONTANHA", "VITOR", "MATHEUS BARBOSA", "ANTONIO SILVA", "ASSUNCAO", 
        "GABRIEL AMORA", "VERRI", "DE ANGELO", "JOAO CESARIO", "LUCAS ALVES", 
        "L SILVEIRA", "FAGUNDES", "COSTA", "AURINO", "R MOURA", "JULIACI", 
        "LUAN SILVA", "JOAO SANTOS", "ARTHUR", "ISIDORO", "ENZO FERRARI", 
        "CARLOS EDUARDO", "FEITOSA", "CAPUTO", "DE CASTRO", "LUCAS CRUZ", 
        "DIOGO VINICIUS", "VICTOR SANTOS", "E FAGNER", "SILVA GOMES", "PIRES SOUZA", 
        "C ALCANTARA", "JULIAO", "CAMPOS", "MAURILIO", "JOAO RODRIGUES", "LATTO", 
        "BASTOS", "TEOFILO", "MARCENES", "FRANK", "FARIAS", "JEZIEL", "J RIBEIRO", 
        "EDUARDO NASCIMENTO", "F DANTAS", "NASCIMENTO ANTUNES", "SIMOES", "TRANCOZO", 
        "RITZMANN", "CASTRO ALVES", "CHRISTIAN", "S GABRIEL", "DEIVISSON", "THOMAS", 
        "CAMILO", "TAVARES NETO", "SERPA", "GIMENEZ", "ZAKUR", "CARVALHO SOUZA", 
        "DE ARAUJO", "DOMINGUES", "ADMIN"
    ];

    if (!alunosOficiais.includes(usuario)) {
        mensagemErro.textContent = "Nome não identificado na lista oficial de alunos.";
        usuarioInput.classList.add("input-erro");
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [usuarioInput], mensagemErro, 1500);
        return;
    }

    // Reset visual
    mensagemErro.textContent = "";
    mensagemErro.style.opacity = 1;
    usuarioInput.classList.remove("input-erro");
    senhaInput.classList.remove("input-erro");
    confirmarInput.classList.remove("input-erro");
    btn.className = "btn-feedback salvando";

    const senha = senhaInput.value;
    const confirmarSenha = confirmarInput.value;

    // Validação campos vazios
    let erro = false;
    if (!usuario) { usuarioInput.classList.add("input-erro"); erro = true; }
    if (!senha) { senhaInput.classList.add("input-erro"); erro = true; }
    if (!confirmarSenha) { confirmarInput.classList.add("input-erro"); erro = true; }
    if (erro) {
        mensagemErro.textContent = "Preencha todos os campos";
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [usuarioInput, senhaInput, confirmarInput], mensagemErro, 1000);
        return;
    }

    // Verificar se senhas coincidem
    if (senha !== confirmarSenha) {
        mensagemErro.textContent = "As senhas não coincidem";
        senhaInput.classList.add("input-erro");
        confirmarInput.classList.add("input-erro");
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [senhaInput, confirmarInput], mensagemErro, 1000);
        return;
    }

    // Verificar se usuário já existe
    const { data } = await window.supabaseClient
        .from("usuarios")
        .select("*")
        .eq("nome", usuario)
        .single();

    if (data) {
        mensagemErro.textContent = "Nome de usuário já existe";
        usuarioInput.classList.add("input-erro");
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [usuarioInput], mensagemErro, 1000);
        return;
    }

    // Criar usuário
    const { error } = await window.supabaseClient
        .from("usuarios")
        .insert({ nome: usuario, senha });

    if (error) {
        mensagemErro.textContent = "Erro ao criar conta";
        btn.className = "btn-feedback erro";
        resetErroFade(btn, [usuarioInput, senhaInput, confirmarInput], mensagemErro, 1000);
        return;
    }

    // Conta criada com sucesso
    btn.className = "btn-feedback salvo";
    setTimeout(() => {
        window.location.href = "login.html";
    }, 900);
}

// Função de reset com fade
function resetErroFade(btn, inputs = [], mensagem, tempo = 1000) {
    setTimeout(() => {
        mensagem.style.transition = "opacity 0.5s";
        mensagem.style.opacity = 0;
        btn.className = "btn-feedback";

        inputs.forEach(input => input.classList.remove("input-erro"));

        setTimeout(() => {
            mensagem.textContent = "";
            mensagem.style.opacity = 1;
        }, 500);
    }, tempo);
}

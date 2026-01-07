document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");
    const senhaInput = document.getElementById("senha");
    
    btn.addEventListener("click", async () => {
        await registrarComFeedback(btn);
    });

    // Atalho com a tecla Enter
    [document.getElementById("usuario"), senhaInput, document.getElementById("confirmar-senha")].forEach(el => {
        el.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                btn.click();
            }
        });
    });
});

async function registrarComFeedback(btn) {
    const usuarioInput = document.getElementById("usuario");
    const senhaInput = document.getElementById("senha");
    const confirmarInput = document.getElementById("confirmar-senha");
    const mensagemErro = document.getElementById("mensagem-erro");

    // 1. PADRONIZAÇÃO TOTAL (Maiúsculo e sem espaços)
    const usuarioRaw = usuarioInput.value.trim().toUpperCase();
    const senha = senhaInput.value;
    const confirmar = confirmarInput.value;

    // Reset Visual
    mensagemErro.textContent = "";
    mensagemErro.style.opacity = 1;
    btn.className = "btn-feedback salvando";

    // 2. VALIDAÇÕES BÁSICAS
    if (!usuarioRaw || !senha || !confirmar) {
        exibirErro("Preencha todos os campos!", [usuarioInput, senhaInput, confirmarInput]);
        return;
    }

    if (senha !== confirmar) {
        exibirErro("As senhas não conferem!", [confirmarInput]);
        return;
    }

    // 3. LISTA DE ALUNOS AUTORIZADOS
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
        "LISBOA", "GUEDES", "FARIAS", "JEZIEL", "J RIBEIRO", "EDUARDO NASCIMENTO", 
        "F DANTAS", "NASCIMENTO ANTUNES", "SIMOES", "TRANCOZO", "RITZMANN", 
        "CASTRO ALVES", "CHRISTIAN", "S GABRIEL", "DEIVISSON", "THOMAS", "CAMILO", 
        "TAVARES NETO", "SERPA", "GIMENEZ", "ZAKUR", "CARVALHO SOUZA", "DE ARAUJO", 
        "DOMINGUES", "GONÇALVES", "D LIMA", "ADMIN"
    ];

    if (!alunosOficiais.includes(usuarioRaw)) {
        exibirErro("Nome de guerra não autorizado.", [usuarioInput]);
        return;
    }

    try {
        // 4. VERIFICAÇÃO REAL NO BANCO
        // Usamos .maybeSingle() para não disparar erro caso não encontre
        const { data: usuarioExistente, error: erroBusca } = await window.supabaseClient
            .from("usuarios")
            .select("nome")
            .eq("nome", usuarioRaw)
            .maybeSingle();

        if (erroBusca) throw erroBusca;

        if (usuarioExistente) {
            exibirErro("Este aluno já possui conta!", [usuarioInput]);
            return;
        }

        // 5. INSERÇÃO (CRIAR CONTA)
        const { error: erroInsert } = await window.supabaseClient
            .from("usuarios")
            .insert([{ nome: usuarioRaw, senha: senha }]);

        if (erroInsert) throw erroInsert;

        // SUCESSO
        btn.className = "btn-feedback salvo";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

    } catch (error) {
        console.error("Erro no Supabase:", error);
        exibirErro("Erro na rede. Tente novamente.", []);
    }

    // Função interna para facilitar a exibição de erros
    function exibirErro(msg, inputs) {
        mensagemErro.textContent = msg;
        btn.className = "btn-feedback erro";
        inputs.forEach(i => i.classList.add("input-erro"));
        
        setTimeout(() => {
            mensagemErro.style.opacity = 0;
            btn.className = "btn-feedback";
            inputs.forEach(i => i.classList.remove("input-erro"));
        }, 2500);
    }
}
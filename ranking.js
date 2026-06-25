// Variável global para armazenar os IDs dos 01 de cada categoria
let donosBadges = {
    elite: null,   // 01 Geral
    cacador: null, // 01 Tiro
    guerreiro: null, // 01 TFM
    mestre: null   // 01 Papiro (Matérias Teóricas)
};

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o ranking no modo Geral
    if (typeof window.supabaseClient === "undefined") {
        console.error("Erro: Supabase não foi inicializado. Verifique se auth.js está carregado.");
        return; // Para a execução se o cliente não existir
    }
    
    carregarRanking("media_geral");

    // Configuração dos botões de filtro (centralizados no CSS)
    const buttons = document.querySelectorAll(".opt-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const materia = btn.getAttribute("data-materia");
            carregarRanking(materia);
        });
    });

});

async function carregarRanking(materiaFiltro = "media_geral") {
    const tbody = document.getElementById("ranking-body");
    const labelMedia = document.getElementById("label-media");
    
    const nomesMaterias = {
        "media_geral": "Média Geral",
        "tfm": "Média TFM",
        "tiro": "Média Tiro",
        "papiro": "Média Papiro"
    };
    if (labelMedia) labelMedia.innerText = nomesMaterias[materiaFiltro];
    
    tbody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Sincronizando...</td></tr>";

    const { data, error } = await window.supabaseClient
        .from("notas")
        .select(`usuario_id, media_geral, dados, usuarios:usuario_id ( nome )`);

    if (error) {
        console.error(error);
        tbody.innerHTML = "<tr><td colspan='3'>Erro ao conectar.</td></tr>";
        return;
    }

    // Filtra quem está apto para o ranking
    const dataFiltrada = data.filter(item => item.dados && item.dados.apto_ranking === true);

    // Inicializa badges
    let donosBadges = { elite: [], cacador: [], guerreiro: [], mestre: [] };

    // Função auxiliar para calcular Papiro
    const calcularPapiro = (item) => {
        const mats = ["tec", "fund", "ciber", "empre", "pt", "racio"];
        let soma = 0, qtd = 0;
        mats.forEach(m => {
            let n = parseFloat(item.dados?.[`media-${m}`]);
            if(!isNaN(n) && n > 0){ soma += n; qtd++; }
        });
        return qtd > 0 ? soma / qtd : 0;
    };

    // --- IDENTIFICAÇÃO DOS LÍDERES (Lógica única) ---
    
    // 01 Geral
    const sortGeral = [...dataFiltrada].sort((a,b) => (b.media_geral || 0) - (a.media_geral || 0));
    if(sortGeral.length > 0) {
        const max = sortGeral[0].media_geral;
        donosBadges.elite = sortGeral.filter(i => i.media_geral === max).map(i => i.usuario_id);
    }

    // 01 Tiro
    const sortTiro = [...dataFiltrada].sort((a,b) => (parseFloat(b.dados?.['media-tiro']) || 0) - (parseFloat(a.dados?.['media-tiro']) || 0));
    if(sortTiro.length > 0) {
        const max = parseFloat(sortTiro[0].dados['media-tiro']);
        donosBadges.cacador = sortTiro.filter(i => parseFloat(i.dados['media-tiro']) === max).map(i => i.usuario_id);
    }

    // 01 TFM
    const sortTfm = [...dataFiltrada].sort((a,b) => (parseFloat(b.dados?.['media-tfm']) || 0) - (parseFloat(a.dados?.['media-tfm']) || 0));
    if(sortTfm.length > 0) {
        const max = parseFloat(sortTfm[0].dados['media-tfm']);
        donosBadges.guerreiro = sortTfm.filter(i => parseFloat(i.dados['media-tfm']) === max).map(i => i.usuario_id);
    }

    // 01 Papiro
    const sortPapiro = dataFiltrada.map(i => ({ uid: i.usuario_id, nota: calcularPapiro(i) })).sort((a,b) => b.nota - a.nota);
    if(sortPapiro.length > 0) {
        const max = sortPapiro[0].nota;
        donosBadges.mestre = sortPapiro.filter(i => i.nota === max).map(i => i.uid);
    }

    // --- MONTAGEM DA TABELA DE EXIBIÇÃO ---
    let listaExibicao = dataFiltrada.map(item => {
        let notaFinal = 0;
        if (materiaFiltro === "media_geral") notaFinal = item.media_geral || 0;
        else if (materiaFiltro === "papiro") notaFinal = calcularPapiro(item);
        else notaFinal = parseFloat(item.dados?.[`media-${materiaFiltro}`]) || 0;

        return {
            uid: item.usuario_id,
            nome: item.usuarios?.nome ?? "Usuário",
            nota: notaFinal
        };
    }).filter(i => i.nota > 0).sort((a, b) => b.nota - a.nota);

    tbody.innerHTML = "";
    if (listaExibicao.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Nenhum registro encontrado.</td></tr>";
        return;
    }

    listaExibicao.forEach((aluno, index) => {
        let badgesHtml = "";
        if (donosBadges.elite.includes(aluno.uid)) badgesHtml += ' <span class="badge-pill elite"><i class="fa-solid fa-trophy"></i></span>';
        if (donosBadges.cacador.includes(aluno.uid)) badgesHtml += ' <span class="badge-pill cacador"><i class="fa-solid fa-crosshairs"></i></span>';
        if (donosBadges.guerreiro.includes(aluno.uid)) badgesHtml += ' <span class="badge-pill guerreiro"><i class="fa-solid fa-person-running"></i></span>';
        if (donosBadges.mestre.includes(aluno.uid)) badgesHtml += ' <span class="badge-pill mestre"><i class="fa-solid fa-book-open"></i></span>';

        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${index + 1}º</td><td>${aluno.nome}${badgesHtml}</td><td><strong>${aluno.nota.toFixed(3)}</strong></td>`;
        tbody.appendChild(tr);
    });
}



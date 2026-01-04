/* =========================
   DETECÇÃO DE iOS
========================= */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);


/* =========================
   CONTROLE DE ESTADO
========================= */
let carregamentoConcluido = false;
let autoSaveTimer = null;
let ultimoSnapshot = "";
const AUTO_SAVE_DELAY = 1500;


/* =========================
   SNAPSHOT
========================= */
function criarSnapshot() {
    const dados = {};
    document.querySelectorAll("input, select, textarea").forEach(el => {
        if (!el.id) return;
        dados[el.id] = el.type === "checkbox" ? el.checked : el.value;
    });
    return JSON.stringify(dados);
}


/* =========================
   AUTO SAVE
========================= */
function agendarAutoSave() {
    if (!carregamentoConcluido) return;

    const snapshotAtual = criarSnapshot();
    if (snapshotAtual === ultimoSnapshot) return;

    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        salvarNotas(snapshotAtual);
    }, AUTO_SAVE_DELAY);
}


/* =========================
   EVENTOS
========================= */
document.addEventListener("DOMContentLoaded", async () => {

    const btnSalvar = document.getElementById("btnSalvar");

    if (btnSalvar) {
        btnSalvar.addEventListener("pointerdown", e => {
            e.preventDefault();
            salvarNotas(criarSnapshot(), true);
        });
    }

    await carregarNotasDoUsuario();
    calcularTudo();

    ["input", "change", "blur"].forEach(evt => {
        document.addEventListener(evt, () => {
            if (!carregamentoConcluido) return;
            calcularTudo();
            agendarAutoSave();
        }, true);
    });
});


/* =========================
   SALVAR / CARREGAR
========================= */
async function salvarNotas(snapshotAtual, forcar = false) {
    if (!snapshotAtual) return;
    if (!carregamentoConcluido && !forcar) return;

    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    let dados;
    try {
        dados = JSON.parse(snapshotAtual);
    } catch {
        return;
    }

    calcularTudo();

    const { error } = await window.supabaseClient
        .from("notas")
        .upsert({
            usuario_id: usuarioId,
            dados,
            media_geral: window.mediaGeralAtual ?? null
        }, { onConflict: "usuario_id" });

    if (error) {
        console.error("Erro ao salvar:", error);
        return;
    }

    ultimoSnapshot = snapshotAtual;

    await salvarNoRanking(usuarioId, window.mediaGeralAtual);
}


async function carregarNotasDoUsuario() {
    carregamentoConcluido = false;

    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    const { data } = await window.supabaseClient
        .from("notas")
        .select("dados")
        .eq("usuario_id", usuarioId)
        .single();

    if (data?.dados) {
        Object.entries(data.dados).forEach(([id, valor]) => {
            const input = document.getElementById(id);
            if (input) input.value = valor;
        });
    }

    calcularTudo();

    ultimoSnapshot = criarSnapshot();
    carregamentoConcluido = true;
}


/* =========================
   RANKING (iOS SAFE)
========================= */
async function salvarNoRanking(usuarioLogado, mediaGeral) {
    if (isIOS) return Promise.resolve();
    if (!usuarioLogado || mediaGeral == null) return Promise.resolve();

    let ranking = (await localforage.getItem("ranking")) || [];
    ranking = ranking.filter(u => u.usuario !== usuarioLogado);

    ranking.push({
        usuario: usuarioLogado,
        media: Number(mediaGeral.toFixed(3))
    });

    ranking.sort((a, b) => b.media - a.media);
    await localforage.setItem("ranking", ranking);
}

/* =========================
   MATÉRIAS TEÓRICAS
========================= */
function calcularMateria(prefixo) {
    let provas;

    // matérias que só têm AA e AC
    const materiasSimples = ["fund", "empre", "pt", "racio", "didat"];

    if (materiasSimples.includes(prefixo)) {
        provas = [
            { id: "aa", peso: 1 },
            { id: "ac", peso: 2 }
        ];
    } else {
        // matérias com AA1, AA2 e AC
        provas = [
            { id: "aa1", peso: 1 },
            { id: "aa2", peso: 1 },
            { id: "ac", peso: 2 }
        ];
    }

    let soma = 0;
    let pesoTotal = 0;

    provas.forEach(p => {
        const acertos = Number(
            document.getElementById(`acertos-${prefixo}-${p.id}`)?.value
        );
        const total = Number(
            document.getElementById(`total-${prefixo}-${p.id}`)?.value
        );

        if (!isNaN(acertos) && !isNaN(total) && total > 0) {
            const nota = (acertos / total) * 10;
            soma += nota * p.peso;
            pesoTotal += p.peso;
        }
    });

    return pesoTotal > 0 ? soma / pesoTotal : null;
}


/* =========================
   UTILIDADES
========================= */
function tempoParaSegundos(tempo) {
    if (!tempo || !tempo.includes(":")) return null;
    const [m, s] = tempo.split(":").map(Number);
    return isNaN(m) || isNaN(s) ? null : m * 60 + s;
}

function mediaAAAC(notaAA, notaAC) {
    if (notaAA == null && notaAC == null) return null;
    return ((notaAA ?? 0) + (notaAC ?? 0) * 2) / 3;
}

function notaPorTempo(segundos, tabela, tipo) {
    if (segundos == null) return null;
    for (const item of tabela) {
        if (segundos <= item[tipo]) return item.nota;
    }
    return 0;
}

function notaPorQuantidade(valor, tabela, tipo) {
    if (valor == null || valor === "") return null;
    for (const item of tabela) {
        if (valor >= item[tipo]) return item.nota;
    }
    return 0;
}


/* =========================
   TFM
========================= */
function calcularTFM() {
    let somaGeral = 0;
    let pesoGeral = 0;

    const provas = [
        { nome: "corrida", aa: "corrida-aa", ac: "corrida-ac", tabela: corrida, tipo: "tempo" },
        { nome: "flexao", aa: "flexao-aa", ac: "flexao-ac", tabela: flexao, tipo: "quantidade" },
        { nome: "barra", aa: "barra-aa", ac: "barra-ac", tabela: barra, tipo: "quantidade" },
        { nome: "natacao", aa: "natacao-aa", ac: "natacao-ac", tabela: natacao, tipo: "tempo" },
        { nome: "corda", aa: "corda-aa", ac: "corda-ac", tabela: corda, tipo: "quantidade" },
        { nome: "ppm", aa: "ppm-aa", ac: "ppm-ac", tabela: ppm, tipo: "tempo" }
    ];

    provas.forEach(p => {
        let soma = 0;
        let pesos = 0;

        const aaValor = document.getElementById(p.aa)?.value;
        if (aaValor) {
            const v = p.tipo === "tempo" ? tempoParaSegundos(aaValor) : Number(aaValor);
            if (v != null) {
                soma += (p.tipo === "tempo" ? notaPorTempo(v, p.tabela, "aa") : notaPorQuantidade(v, p.tabela, "aa"));
                pesos += 1;
            }
        }

        const acValor = document.getElementById(p.ac)?.value;
        if (acValor) {
            const v = p.tipo === "tempo" ? tempoParaSegundos(acValor) : Number(acValor);
            if (v != null) {
                soma += (p.tipo === "tempo" ? notaPorTempo(v, p.tabela, "ac") : notaPorQuantidade(v, p.tabela, "ac")) * 2;
                pesos += 2;
            }
        }

        const span = document.getElementById(`nota-${p.nome}`);
        if (pesos > 0) {
            const media = soma / pesos;
            span.textContent = media.toFixed(3);
            somaGeral += media;
            pesoGeral++;
        } else {
            span.textContent = "--";
        }
    });

    if (pesoGeral === 0) {
        document.getElementById("media-tfm").textContent = "--";
        return null;
    }

    const mediaTFM = somaGeral / pesoGeral;
    document.getElementById("media-tfm").textContent = mediaTFM.toFixed(3);
    return mediaTFM;
}


/* =========================
   GERAL
========================= */
function calcularTudo() {
    let soma = 0;
    let count = 0;

    const materias = ["tec", "fund", "ciber", "empre", "pt", "racio", "didat"];

    materias.forEach(m => {
        const media = calcularMateria(m);
        const span = document.getElementById(`media-${m}`);
        if (media != null) {
            span.textContent = media.toFixed(3);
            soma += media;
            count++;
        } else span.textContent = "--";
    });

    document.querySelectorAll('[data-tipo="simples"]').forEach(m => {
        const nota = parseFloat(m.querySelector("input").value);
        const span = m.querySelector(".media-materia");
        if (!isNaN(nota)) {
            span.textContent = nota.toFixed(2);
            soma += nota;
            count++;
        } else span.textContent = "--";
    });

    const mediaTFM = calcularTFM();
    if (mediaTFM != null) {
        soma += mediaTFM;
        count++;
    }

    const mediaFinal = count > 0 ? soma / count : null;
    document.getElementById("media-geral").textContent =
        mediaFinal != null ? mediaFinal.toFixed(3) : "--";

    window.mediaGeralAtual = mediaFinal;
}


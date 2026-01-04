/* =========================
   DETECÇÃO DE iOS
========================= */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);


/* =========================
   TABELAS TFM
========================= */
const corrida = [
    { aa: 660, ac: 645, nota: 10 },
    { aa: 672, ac: 656, nota: 9.5 },
    { aa: 684, ac: 668, nota: 9 },
    { aa: 697, ac: 680, nota: 8.5 },
    { aa: 709, ac: 692, nota: 8 },
    { aa: 721, ac: 704, nota: 7.5 },
    { aa: 733, ac: 716, nota: 7 },
    { aa: 745, ac: 728, nota: 6.5 },
    { aa: 757, ac: 740, nota: 6 },
    { aa: 783, ac: 752, nota: 5 },
    { aa: 795, ac: 765, nota: 4.5 },
    { aa: 808, ac: 778, nota: 4 },
    { aa: 820, ac: 791, nota: 3.5 },
    { aa: 832, ac: 827, nota: 3 },
    { aa: 845, ac: 785, nota: 2.5 },
    { aa: 857, ac: 857, nota: 2 },
    { aa: 869, ac: 839, nota: 1.5 },
    { aa: 881, ac: 851, nota: 1 },
    { aa: 894, ac: 863, nota: 0.5 }
];

const natacao = [
    { aa: 17, ac: 15, nota: 10 },
    { aa: 18, ac: 16, nota: 9.5 },
    { aa: 20, ac: 18, nota: 9 },
    { aa: 21, ac: 19, nota: 8.5 },
    { aa: 24, ac: 22, nota: 8 },
    { aa: 25, ac: 23, nota: 7.5 },
    { aa: 26, ac: 24, nota: 7 },
    { aa: 28, ac: 26, nota: 6.5 },
    { aa: 32, ac: 30, nota: 6 },
    { aa: 37, ac: 35, nota: 5.5 },
    { aa: 42, ac: 40, nota: 5 },
    { aa: 47, ac: 45, nota: 4.5 },
    { aa: 52, ac: 50, nota: 4 },
    { aa: 54, ac: 52, nota: 3.5 },
    { aa: 56, ac: 54, nota: 3 },
    { aa: 58, ac: 56, nota: 2.5 },
    { aa: 60, ac: 58, nota: 2 },
    { aa: 62, ac: 60, nota: 1.5 },
    { aa: 64, ac: 62, nota: 1 }
];

const flexao = [
    { aa: 42, ac: 43, nota: 10 },
    { aa: 40, ac: 41, nota: 9 },
    { aa: 38, ac: 39, nota: 8 },
    { aa: 35, ac: 36, nota: 7 },
    { aa: 32, ac: 32, nota: 6 },
    { aa: 30, ac: 31, nota: 5 },
    { aa: 28, ac: 30, nota: 4 },
    { aa: 26, ac: 29, nota: 3 },
    { aa: 25, ac: 28, nota: 2 },
    { aa: 24, ac: 27, nota: 1 }
];

const barra = [
    { aa: 12, ac: 13, nota: 10 },
    { aa: 11, ac: 12, nota: 9 },
    { aa: 10, ac: 11, nota: 8 },
    { aa: 9, ac: 10, nota: 7 },
    { aa: 8, ac: 9, nota: 6 },
    { aa: 7, ac: 8, nota: 5 },
    { aa: 6, ac: 7, nota: 4 },
    { aa: 5, ac: 6, nota: 3 },
    { aa: 4, ac: 5, nota: 2 },
    { aa: 3, ac: 4, nota: 1 }
];

const corda = [
    { aa: 4.8, ac: 5.0, nota: 10 },
    { aa: 4.6, ac: 4.8, nota: 9 },
    { aa: 4.4, ac: 4.6, nota: 8 },
    { aa: 4.2, ac: 4.4, nota: 7 },
    { aa: 4.0, ac: 4.2, nota: 6 },
    { aa: 3.8, ac: 4.0, nota: 5 },
    { aa: 3.6, ac: 3.8, nota: 4 },
    { aa: 3.4, ac: 3.6, nota: 3 },
    { aa: 3.2, ac: 3.4, nota: 2 },
    { aa: 3.0, ac: 3.2, nota: 1 }
];

const ppm = [
    { aa: 270, ac: 260, nota: 10 },
    { aa: 272, ac: 262, nota: 9.5 },
    { aa: 274, ac: 264, nota: 9 },
    { aa: 279, ac: 269, nota: 8.5 },
    { aa: 284, ac: 274, nota: 8 },
    { aa: 289, ac: 279, nota: 7.5 },
    { aa: 294, ac: 284, nota: 7 },
    { aa: 304, ac: 294, nota: 6.5 },
    { aa: 315, ac: 305, nota: 6 },
    { aa: 331, ac: 321, nota: 5.5 },
    { aa: 341, ac: 331, nota: 5 },
    { aa: 360, ac: 343, nota: 4.5 },
    { aa: 375, ac: 358, nota: 4 },
    { aa: 390, ac: 373, nota: 3.5 },
    { aa: 405, ac: 388, nota: 3 },
    { aa: 420, ac: 403, nota: 2.5 },
    { aa: 435, ac: 418, nota: 2 },
    { aa: 450, ac: 433, nota: 1.5 },
    { aa: 465, ac: 448, nota: 1 },
    { aa: 473, ac: 463, nota: 0 }
];


/* =========================
   ESTADO / AUTOSAVE
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
   AUTOSAVE
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
   MATÉRIAS TEÓRICAS
========================= */
function calcularMateria(prefixo) {
    const materiasSimples = ["fund", "empre", "pt", "racio", "didat"];
    const provas = materiasSimples.includes(prefixo)
        ? [{ id: "aa", peso: 1 }, { id: "ac", peso: 2 }]
        : [{ id: "aa1", peso: 1 }, { id: "aa2", peso: 1 }, { id: "ac", peso: 2 }];

    let soma = 0, pesoTotal = 0;

    provas.forEach(p => {
        const acertos = Number(document.getElementById(`acertos-${prefixo}-${p.id}`)?.value);
        const total = Number(document.getElementById(`total-${prefixo}-${p.id}`)?.value);

        if (!isNaN(acertos) && !isNaN(total) && total > 0) {
            const nota = (acertos / total) * 10;
            soma += nota * p.peso;
            pesoTotal += p.peso;
        }
    });

    return pesoTotal > 0 ? soma / pesoTotal : null;
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
        let soma = 0, pesos = 0;

        const aaV = document.getElementById(p.aa)?.value;
        if (aaV) {
            const v = p.tipo === "tempo" ? tempoParaSegundos(aaV) : Number(aaV);
            if (v != null) {
                soma += p.tipo === "tempo"
                    ? notaPorTempo(v, p.tabela, "aa")
                    : notaPorQuantidade(v, p.tabela, "aa");
                pesos += 1;
            }
        }

        const acV = document.getElementById(p.ac)?.value;
        if (acV) {
            const v = p.tipo === "tempo" ? tempoParaSegundos(acV) : Number(acV);
            if (v != null) {
                soma += (p.tipo === "tempo"
                    ? notaPorTempo(v, p.tabela, "ac")
                    : notaPorQuantidade(v, p.tabela, "ac")) * 2;
                pesos += 2;
            }
        }

        const span = document.getElementById(`nota-${p.nome}`);
        if (pesos > 0) {
            const media = soma / pesos;
            span.textContent = media.toFixed(3);
            somaGeral += media;
            pesoGeral++;
        } else span.textContent = "--";
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
    let soma = 0, count = 0;

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

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

/* =========================================
   AUTO SAVE
========================================= */

let autoSaveTimer = null;
let ultimoSnapshot = "";
const AUTO_SAVE_DELAY = 1500;

/* =========================
   SNAPSHOT
========================= */
function criarSnapshot() {
    const dados = {};
    document.querySelectorAll("input").forEach(input => {
        if (input.id) dados[input.id] = input.value;
    });
    return JSON.stringify(dados);
}

/* =========================
   AUTO SAVE
========================= */
function agendarAutoSave() {
    const snapshot = criarSnapshot();
    if (snapshot === ultimoSnapshot) return;

    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        salvarNotasAuto(snapshot);
    }, AUTO_SAVE_DELAY);
}

async function salvarNotasAuto(snapshot) {
    calcularTudo();

    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    await window.supabaseClient
  .from("notas")
  .upsert(
    {
      usuario_id: usuarioId,
      dados: JSON.parse(snapshot),
      media_geral: window.mediaGeralAtual
    },
    { onConflict: "usuario_id" }
  );


    ultimoSnapshot = snapshot;
}

/* =========================
   CARREGAR NOTAS
========================= */
async function carregarNotasDoUsuario() {
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
}

/* =========================
   UTILIDADES
========================= */
function tempoParaSegundos(t) {
    if (!t || !t.includes(":")) return null;
    const [m, s] = t.split(":").map(Number);
    return m * 60 + s;
}

function mediaAAAC(a, c) {
    if (a == null && c == null) return null;
    return ((a ?? 0) + (c ?? 0) * 2) / 3;
}

function notaPorTempo(seg, tabela, tipo) {
    if (seg == null) return null;
    for (const i of tabela) {
        if (seg <= i[tipo]) return i.nota;
    }
    return 0;
}

function notaPorQuantidade(v, tabela, tipo) {
    if (v == null) return null;
    for (const i of tabela) {
        if (v >= i[tipo]) return i.nota;
    }
    return 0;
}

/* =========================
   CÁLCULOS
========================= */

function calcularTFM() {
    let soma = 0;
    let count = 0;

    [
        ["corrida", corrida, "tempo"],
        ["flexao", flexao, "quantidade"],
        ["barra", barra, "quantidade"],
        ["natacao", natacao, "tempo"],
        ["corda", corda, "quantidade"],
        ["ppm", ppm, "tempo"]
    ].forEach(([nome, tabela, tipo]) => {
        const aa = document.getElementById(`${nome}-aa`)?.value;
        const ac = document.getElementById(`${nome}-ac`)?.value;

        const nAA = aa ? (tipo === "tempo" ? notaPorTempo(tempoParaSegundos(aa), tabela, "aa") : notaPorQuantidade(+aa, tabela, "aa")) : null;
        const nAC = ac ? (tipo === "tempo" ? notaPorTempo(tempoParaSegundos(ac), tabela, "ac") : notaPorQuantidade(+ac, tabela, "ac")) : null;

        const media = mediaAAAC(nAA, nAC);
        document.getElementById(`nota-${nome}`).textContent = media?.toFixed(3) ?? "--";

        if (media != null) {
            soma += media;
            count++;
        }
    });

    const final = count > 0 ? soma / count : null;
    document.getElementById("media-tfm").textContent = final?.toFixed(3) ?? "--";
    return final;
}

function calcularTiro() {
    const a = +document.getElementById("tiro-aa")?.value;
    const b = +document.getElementById("tiro-ac1")?.value;
    const c = +document.getElementById("tiro-ac2")?.value;

    let soma = 0, peso = 0;
    if (!isNaN(a)) { soma += a; peso++; }
    if (!isNaN(b)) { soma += b * 2; peso += 2; }
    if (!isNaN(c)) { soma += c * 2; peso += 2; }

    if (!peso) return null;
    const m = soma / peso;
    document.getElementById("media-tiro").textContent = m.toFixed(3);
    return m;
}

function calcularTudo() {
    let soma = 0;
    let count = 0;

    const tfm = calcularTFM();
    if (tfm != null) { soma += tfm; count++; }

    const tiro = calcularTiro();
    if (tiro != null) { soma += tiro; count++; }

    const media = count > 0 ? soma / count : 0;
    document.getElementById("media-geral").textContent = media.toFixed(3);
    window.mediaGeralAtual = media;
}

/* =========================
   EVENTOS
========================= */

document.addEventListener("DOMContentLoaded", async () => {
    await carregarNotasDoUsuario();

    document.addEventListener("input", () => {
        calcularTudo();
        agendarAutoSave();
    });

    const btn = document.getElementById("btnSalvar");
    if (btn) {
        btn.addEventListener("click", () => {
            salvarNotasAuto(criarSnapshot());
        });
    }
});


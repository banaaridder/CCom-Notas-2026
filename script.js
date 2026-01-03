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
   AUTO SAVE
========================= */

let autoSaveTimer = null;
let ultimoSnapshot = "";
const AUTO_SAVE_DELAY = 1500;

/* =========================
   SNAPSHOT
========================= */

function criarSnapshot() {
    const dados = {};
    document.querySelectorAll("input").forEach(i => {
        if (i.id) dados[i.id] = i.value;
    });
    return JSON.stringify(dados);
}

function agendarAutoSave() {
    const snap = criarSnapshot();
    if (snap === ultimoSnapshot) return;

    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => salvarNotas(snap), AUTO_SAVE_DELAY);
}

async function salvarNotas(snapshot) {
    calcularTudo();

    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    await window.supabaseClient
        .from("notas")
        .upsert({
            usuario_id: usuarioId,
            dados: JSON.parse(snapshot),
            media_geral: window.mediaGeralAtual
        }, { onConflict: "usuario_id" });

    ultimoSnapshot = snapshot;
}

/* =========================
   CARREGAR
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
        Object.entries(data.dados).forEach(([id, v]) => {
            const el = document.getElementById(id);
            if (el) el.value = v;
        });
    }

    calcularTudo();
    ultimoSnapshot = criarSnapshot();
}

/* =========================
   UTILIDADES
========================= */

const tempoParaSegundos = t => {
    if (!t || !t.includes(":")) return null;
    const [m, s] = t.split(":").map(Number);
    return m * 60 + s;
};

const mediaAAAC = (a, c) =>
    a == null && c == null ? null : ((a ?? 0) + (c ?? 0) * 2) / 3;

const notaPorTempo = (seg, tab, tipo) => {
    if (seg == null) return null;
    for (const i of tab) if (seg <= i[tipo]) return i.nota;
    return 0;
};

const notaPorQuantidade = (v, tab, tipo) => {
    if (v == null) return null;
    for (const i of tab) if (v >= i[tipo]) return i.nota;
    return 0;
};

/* =========================
   MATÉRIAS SIMPLES
========================= */

function calcularMateriaSimples(container) {
    const acertos = +container.querySelector('[data-acertos]')?.value;
    const total = +container.querySelector('[data-total]')?.value;
    const span = container.querySelector(".media-materia");

    if (!acertos || !total) {
        if (span) span.textContent = "--";
        return null;
    }

    const media = (acertos / total) * 10;
    if (span) span.textContent = media.toFixed(3);
    return media;
}

/* =========================
   CÁLCULOS PRINCIPAIS
========================= */

function calcularTFM() {
    let soma = 0, c = 0;

    [
        ["corrida", corrida, "tempo"],
        ["flexao", flexao, "quantidade"],
        ["barra", barra, "quantidade"],
        ["natacao", natacao, "tempo"],
        ["corda", corda, "quantidade"],
        ["ppm", ppm, "tempo"]
    ].forEach(([n, t, tipo]) => {
        const aa = document.getElementById(`${n}-aa`)?.value;
        const ac = document.getElementById(`${n}-ac`)?.value;

        const nAA = aa ? (tipo === "tempo" ? notaPorTempo(tempoParaSegundos(aa), t, "aa") : notaPorQuantidade(+aa, t, "aa")) : null;
        const nAC = ac ? (tipo === "tempo" ? notaPorTempo(tempoParaSegundos(ac), t, "ac") : notaPorQuantidade(+ac, t, "ac")) : null;

        const m = mediaAAAC(nAA, nAC);
        document.getElementById(`nota-${n}`).textContent = m?.toFixed(3) ?? "--";

        if (m != null) { soma += m; c++; }
    });

    return c ? soma / c : null;
}

function calcularTiro() {
    const a = +document.getElementById("tiro-aa")?.value;
    const b = +document.getElementById("tiro-ac1")?.value;
    const c = +document.getElementById("tiro-ac2")?.value;

    let s = 0, p = 0;
    if (!isNaN(a)) { s += a; p++; }
    if (!isNaN(b)) { s += b * 2; p += 2; }
    if (!isNaN(c)) { s += c * 2; p += 2; }

    if (!p) return null;
    const m = s / p;
    document.getElementById("media-tiro").textContent = m.toFixed(3);
    return m;
}

function calcularMateria(prefixo) {
    const simples = ["fund", "empre", "pt", "racio", "didat"];
    const provas = simples.includes(prefixo)
        ? [{ id: "aa", peso: 1 }, { id: "ac", peso: 2 }]
        : [{ id: "aa1", peso: 1 }, { id: "aa2", peso: 1 }, { id: "ac", peso: 2 }];

    let soma = 0;
    let peso = 0;
    let camposPreenchidos = true;

    provas.forEach(p => {
        const acertos = document.getElementById(`acertos-${prefixo}-${p.id}`)?.value;
        const total = document.getElementById(`total-${prefixo}-${p.id}`)?.value;

        if (!acertos || !total || Number(total) <= 0) {
            camposPreenchidos = false;
            return;
        }

        const nota = (Number(acertos) / Number(total)) * 10;
        soma += nota * p.peso;
        peso += p.peso;
    });

    if (!camposPreenchidos || peso === 0) return null;
    return soma / peso;
}

function calcularTudo() {
    let soma = 0, count = 0;

["fund","empre","pt","racio","didat","tec","ciber"].forEach(m => {
    const media = calcularMateria(m);
    const span = document.getElementById(`media-${m}`);

    if (media != null) {
        span.textContent = media.toFixed(3);
        soma += media;
        count++;
    } else span.textContent = "--";
});


    document.querySelectorAll('[data-tipo="simples"]').forEach(c => {
        const m = calcularMateriaSimples(c);
        if (m != null) { soma += m; count++; }
    });

    const tiro = calcularTiro();
    if (tiro != null) { soma += tiro; count++; }

    const tfm = calcularTFM();
    if (tfm != null) { soma += tfm; count++; }

    const final = count ? soma / count : null;
    document.getElementById("media-geral").textContent = final ? final.toFixed(3) : "--";
    window.mediaGeralAtual = count > 0 ? soma / count : null;
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

    document.getElementById("btnSalvar")?.addEventListener("click", () =>
        salvarNotas(criarSnapshot())
    );
});


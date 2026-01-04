/* =========================
   DETECÇÃO iOS (CRÍTICO)
========================= */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* =========================
   STORAGE BLINDADO
========================= */
function setUsuarioLogado(valor) {
    try {
        localStorage.setItem("usuarioLogado", valor);
    } catch {
        window._usuarioLogadoIOS = valor;
    }
}

function getUsuarioLogado() {
    try {
        return localStorage.getItem("usuarioLogado");
    } catch {
        return window._usuarioLogadoIOS || null;
    }
}

/* =========================
   TABELAS TFM
========================= */

const corrida = [
    { aa: 660, ac: 645, nota: 10 }, { aa: 672, ac: 656, nota: 9.5 },
    { aa: 684, ac: 668, nota: 9 }, { aa: 697, ac: 680, nota: 8.5 },
    { aa: 709, ac: 692, nota: 8 }, { aa: 721, ac: 704, nota: 7.5 },
    { aa: 733, ac: 716, nota: 7 }, { aa: 745, ac: 728, nota: 6.5 },
    { aa: 757, ac: 740, nota: 6 }, { aa: 783, ac: 752, nota: 5 },
    { aa: 795, ac: 765, nota: 4.5 }, { aa: 808, ac: 778, nota: 4 },
    { aa: 820, ac: 791, nota: 3.5 }, { aa: 832, ac: 827, nota: 3 },
    { aa: 845, ac: 785, nota: 2.5 }, { aa: 857, ac: 857, nota: 2 },
    { aa: 869, ac: 839, nota: 1.5 }, { aa: 881, ac: 851, nota: 1 },
    { aa: 894, ac: 863, nota: 0.5 }
];

const natacao = [
    { aa: 17, ac: 15, nota: 10 }, { aa: 18, ac: 16, nota: 9.5 },
    { aa: 20, ac: 18, nota: 9 }, { aa: 21, ac: 19, nota: 8.5 },
    { aa: 24, ac: 22, nota: 8 }, { aa: 25, ac: 23, nota: 7.5 },
    { aa: 26, ac: 24, nota: 7 }, { aa: 28, ac: 26, nota: 6.5 },
    { aa: 32, ac: 30, nota: 6 }, { aa: 37, ac: 35, nota: 5.5 },
    { aa: 42, ac: 40, nota: 5 }, { aa: 47, ac: 45, nota: 4.5 },
    { aa: 52, ac: 50, nota: 4 }, { aa: 54, ac: 52, nota: 3.5 },
    { aa: 56, ac: 54, nota: 3 }, { aa: 58, ac: 56, nota: 2.5 },
    { aa: 60, ac: 58, nota: 2 }, { aa: 62, ac: 60, nota: 1.5 },
    { aa: 64, ac: 62, nota: 1 }
];

const flexao = [
    { aa: 42, ac: 43, nota: 10 }, { aa: 40, ac: 41, nota: 9 },
    { aa: 38, ac: 39, nota: 8 }, { aa: 35, ac: 36, nota: 7 },
    { aa: 32, ac: 32, nota: 6 }, { aa: 30, ac: 31, nota: 5 },
    { aa: 28, ac: 30, nota: 4 }, { aa: 26, ac: 29, nota: 3 },
    { aa: 25, ac: 28, nota: 2 }, { aa: 24, ac: 27, nota: 1 }
];

const barra = [
    { aa: 12, ac: 13, nota: 10 }, { aa: 11, ac: 12, nota: 9 },
    { aa: 10, ac: 11, nota: 8 }, { aa: 9, ac: 10, nota: 7 },
    { aa: 8, ac: 9, nota: 6 }, { aa: 7, ac: 8, nota: 5 },
    { aa: 6, ac: 7, nota: 4 }, { aa: 5, ac: 6, nota: 3 },
    { aa: 4, ac: 5, nota: 2 }, { aa: 3, ac: 4, nota: 1 }
];

const corda = [
    { aa: 4.8, ac: 5.0, nota: 10 }, { aa: 4.6, ac: 4.8, nota: 9 },
    { aa: 4.4, ac: 4.6, nota: 8 }, { aa: 4.2, ac: 4.4, nota: 7 },
    { aa: 4.0, ac: 4.2, nota: 6 }, { aa: 3.8, ac: 4.0, nota: 5 },
    { aa: 3.6, ac: 3.8, nota: 4 }, { aa: 3.4, ac: 3.6, nota: 3 },
    { aa: 3.2, ac: 3.4, nota: 2 }, { aa: 3.0, ac: 3.2, nota: 1 }
];

const ppm = [
    { aa: 270, ac: 260, nota: 10 }, { aa: 272, ac: 262, nota: 9.5 },
    { aa: 274, ac: 264, nota: 9 }, { aa: 279, ac: 269, nota: 8.5 },
    { aa: 284, ac: 274, nota: 8 }, { aa: 289, ac: 279, nota: 7.5 },
    { aa: 294, ac: 284, nota: 7 }, { aa: 304, ac: 294, nota: 6.5 },
    { aa: 315, ac: 305, nota: 6 }, { aa: 331, ac: 321, nota: 5.5 },
    { aa: 341, ac: 331, nota: 5 }, { aa: 360, ac: 343, nota: 4.5 },
    { aa: 375, ac: 358, nota: 4 }, { aa: 390, ac: 373, nota: 3.5 },
    { aa: 405, ac: 388, nota: 3 }, { aa: 420, ac: 403, nota: 2.5 },
    { aa: 435, ac: 418, nota: 2 }, { aa: 450, ac: 433, nota: 1.5 },
    { aa: 465, ac: 448, nota: 1 }, { aa: 473, ac: 463, nota: 0 }
];

let carregamentoConcluido = false;

function () {
    if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) return;

    const box = document.createElement("div");
    box.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 40%;
        overflow: auto;
        background: black;
        color: lime;
        font-size: 11px;
        z-index: 99999;
        padding: 6px;
        font-family: monospace;
    `;
    document.body.appendChild(box);

    const log = msg => {
        box.innerHTML += `<div>${msg}</div>`;
        box.scrollTop = box.scrollHeight;
    };

    console.log = (...a) => log(a.join(" "));
    console.error = (...a) => log("❌ " + a.join(" "));
})();


/* =========================
   AUTO-SAVE
========================= */
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
   AGENDAR AUTO-SAVE
========================= */
function agendarAutoSave() {
    const btn = document.getElementById("btnSalvar");
    const status = document.getElementById("status-save");
    if (!btn || !status) return;

    const snap = criarSnapshot();
    if (snap === ultimoSnapshot) return;

    btn.className = "btn-salvar pendente";
    status.style.display = "block";
    status.textContent = "Alterações pendentes…";
    status.style.color = "#00afef";

    clearTimeout(autoSaveTimer);

    autoSaveTimer = setTimeout(() => {
        if (!isIOS) salvarNotas(snap);
    }, AUTO_SAVE_DELAY);
}

/* =========================
   EVENTOS
========================= */
document.addEventListener("DOMContentLoaded", async () => {

    const btnSalvar = document.getElementById("btnSalvar");

    btnSalvar.addEventListener("pointerup", async e => {
        e.preventDefault();
        await salvarNotas(criarSnapshot(), true);
    });

    await carregarNotasDoUsuario();
    calcularTudo();

    document.addEventListener("input", () => {
        if (!carregamentoConcluido) return;
        calcularTudo();
        agendarAutoSave();
    });
});

/* =========================
   SALVAR NOTAS (iOS SAFE)
========================= */
async function salvarNotas(snapshotAtual) {

    if (!snapshotAtual || !carregamentoConcluido) return;

    const btn = document.getElementById("btnSalvar");
    const status = document.getElementById("status-save");

    btn.className = "btn-salvar salvando";
    status.style.display = "block";
    status.textContent = "Salvando…";
    status.style.color = "#4fc3f7";

    calcularTudo();

    const usuarioId = getUsuarioLogado();
    if (!usuarioId) {
        btn.className = "btn-salvar erro";
        status.textContent = "Usuário não identificado";
        status.style.color = "#e74c3c";
        return;
    }

    try {
        const { error } = await window.supabaseClient
            .from("notas")
            .upsert(
                {
                    usuario_id: usuarioId,
                    dados: JSON.parse(snapshotAtual),
                    media_geral: window.mediaGeralAtual ?? null
                },
                { onConflict: "usuario_id" }
            );

        if (error) throw error;

        ultimoSnapshot = snapshotAtual;

        btn.className = "btn-salvar salvo";
        status.textContent = "Salvo!";
        status.style.color = "#2ecc71";

        setTimeout(() => {
            btn.className = "btn-salvar";
        }, 2000);

    } catch (err) {
        console.error(err);
        btn.className = "btn-salvar erro";
        status.textContent = "Erro ao salvar";
        status.style.color = "#e74c3c";
    }
}

/* =========================
   CARREGAR NOTAS
========================= */
async function carregarNotasDoUsuario() {

    carregamentoConcluido = false;

    const usuarioId = getUsuarioLogado();
    if (!usuarioId) return;

    const { data } = await window.supabaseClient
        .from("notas")
        .select("dados")
        .eq("usuario_id", usuarioId)
        .single();

    if (data?.dados) {
        Object.entries(data.dados).forEach(([id, valor]) => {
            const el = document.getElementById(id);
            if (el) el.value = valor;
        });
    }

    calcularTudo();
    ultimoSnapshot = criarSnapshot();
    carregamentoConcluido = true;
}

/* =========================
   UTILIDADES / CÁLCULOS
========================= */

function tempoParaSegundos(t) {
    if (!t || !t.includes(":")) return null;
    const [m, s] = t.split(":").map(Number);
    return isNaN(m) || isNaN(s) ? null : m * 60 + s;
}

function mediaAAAC(aa, ac) {
    if (aa == null && ac == null) return null;
    return ((aa ?? 0) + (ac ?? 0) * 2) / 3;
}

function notaPorTempo(seg, tab, tipo) {
    if (seg == null) return null;
    for (const i of tab) if (seg <= i[tipo]) return i.nota;
    return 0;
}

function notaPorQuantidade(v, tab, tipo) {
    if (v == null || v === "") return null;
    for (const i of tab) if (v >= i[tipo]) return i.nota;
    return 0;
}

/* =========================
   MATÉRIAS
========================= */

function calcularMateria(prefixo) {
    const simples = ["fund", "empre", "pt", "racio", "didat"];
    const provas = simples.includes(prefixo)
        ? [{ id: "aa", p: 1 }, { id: "ac", p: 2 }]
        : [{ id: "aa1", p: 1 }, { id: "aa2", p: 1 }, { id: "ac", p: 2 }];

    let soma = 0, peso = 0;

    provas.forEach(pr => {
        const a = Number(document.getElementById(`acertos-${prefixo}-${pr.id}`)?.value);
        const t = Number(document.getElementById(`total-${prefixo}-${pr.id}`)?.value);
        if (!isNaN(a) && !isNaN(t) && t > 0) {
            soma += (a / t * 10) * pr.p;
            peso += pr.p;
        }
    });

    return peso ? soma / peso : null;
}

/* =========================
   TFM / GERAL
========================= */

function calcularTFM() {
    let soma = 0, qtd = 0;

    [
        { n: "corrida", aa: "corrida-aa", ac: "corrida-ac", t: corrida, tp: "tempo" },
        { n: "flexao", aa: "flexao-aa", ac: "flexao-ac", t: flexao, tp: "quantidade" },
        { n: "barra", aa: "barra-aa", ac: "barra-ac", t: barra, tp: "quantidade" },
        { n: "natacao", aa: "natacao-aa", ac: "natacao-ac", t: natacao, tp: "tempo" },
        { n: "corda", aa: "corda-aa", ac: "corda-ac", t: corda, tp: "quantidade" },
        { n: "ppm", aa: "ppm-aa", ac: "ppm-ac", t: ppm, tp: "tempo" }
    ].forEach(p => {
        let s = 0, w = 0;

        ["aa", "ac"].forEach(tipo => {
            const id = tipo === "aa" ? p.aa : p.ac;
            const v = document.getElementById(id)?.value;
            if (!v) return;

            const val = p.tp === "tempo" ? tempoParaSegundos(v) : parseFloat(v);
            if (val == null) return;

            const nota = p.tp === "tempo"
                ? notaPorTempo(val, p.t, tipo)
                : notaPorQuantidade(val, p.t, tipo);

            s += nota * (tipo === "aa" ? 1 : 2);
            w += tipo === "aa" ? 1 : 2;
        });

        const span = document.getElementById(`nota-${p.n}`);
        if (w) {
            const m = s / w;
            span.textContent = m.toFixed(3);
            soma += m;
            qtd++;
        } else span.textContent = "--";
    });

    const media = qtd ? soma / qtd : null;
    document.getElementById("media-tfm").textContent = media?.toFixed(3) ?? "--";
    return media;
}

function calcularTiro() {
    const aa = parseFloat(document.getElementById("tiro-aa")?.value);
    const ac1 = parseFloat(document.getElementById("tiro-ac1")?.value);
    const ac2 = parseFloat(document.getElementById("tiro-ac2")?.value);

    let s = 0, w = 0;
    if (!isNaN(aa)) { s += aa; w += 1; }
    if (!isNaN(ac1)) { s += ac1 * 2; w += 2; }
    if (!isNaN(ac2)) { s += ac2 * 2; w += 2; }

    const m = w ? s / w : null;
    document.getElementById("media-tiro").textContent = m?.toFixed(3) ?? "--";
    return m;
}

function calcularTudo() {
    let soma = 0, qtd = 0;

    ["tec", "fund", "ciber", "empre", "pt", "racio", "didat"].forEach(m => {
        const v = calcularMateria(m);
        const s = document.getElementById(`media-${m}`);
        if (v != null) {
            s.textContent = v.toFixed(3);
            soma += v;
            qtd++;
        } else s.textContent = "--";
    });

    const tiro = calcularTiro();
    if (tiro != null) { soma += tiro; qtd++; }

    const tfm = calcularTFM();
    if (tfm != null) { soma += tfm; qtd++; }

    const mediaFinal = qtd ? soma / qtd : null;
    document.getElementById("media-geral").textContent =
        mediaFinal?.toFixed(3) ?? "--";

    window.mediaGeralAtual = mediaFinal;
}



/* =========================
   BOOTSTRAP
========================= */

document.addEventListener("DOMContentLoaded", async () => {

    // recalcular ao digitar (debounce p/ mobile)
    let debounce;
    document.addEventListener("input", () => {
        clearTimeout(debounce);
        debounce = setTimeout(calcularTudo, 80);
    });

    const btnSalvar = document.getElementById("btnSalvar");
    if (btnSalvar) {
        btnSalvar.addEventListener("click", async e => {
            e.preventDefault(); // iOS
            btnSalvar.disabled = true;
            btnSalvar.textContent = "Salvando...";
            await salvarNotas();
            btnSalvar.disabled = false;
            btnSalvar.textContent = "Salvar Notas";
        });
    }

    await carregarNotasDoUsuario();
    calcularTudo();
});

/* =========================
   SUPABASE — CARREGAR / SALVAR
========================= */

async function carregarNotasDoUsuario() {
    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    const { data, error } = await window.supabaseClient
        .from("notas")
        .select("dados")
        .eq("usuario_id", usuarioId)
        .single();

    if (error && error.code !== "PGRST116") {
        console.error(error);
        return;
    }

    if (!data) return;

    Object.entries(data.dados).forEach(([id, valor]) => {
        const input = document.getElementById(id);
        if (input) input.value = valor;
    });
}

async function salvarNotas() {
    calcularTudo();

    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) {
        alert("Usuário não logado");
        return;
    }

    const dados = {};
    document.querySelectorAll("input").forEach(i => {
        if (i.id) dados[i.id] = i.value;
    });

    const payload = {
        usuario_id: usuarioId,
        dados,
        media_geral: window.mediaGeralAtual
    };

    const { data, error } = await window.supabaseClient
        .from("notas")
        .upsert(payload, { onConflict: "usuario_id" });

    if (error) {
        console.error(error);
        alert("Erro ao salvar notas");
        return;
    }

    alert("Notas salvas com sucesso!");
}

/* =========================
   UTILIDADES
========================= */

function tempoParaSegundos(tempo) {
    if (!tempo || !tempo.includes(":")) return null;
    const [m, s] = tempo.split(":").map(Number);
    return isNaN(m) || isNaN(s) ? null : m * 60 + s;
}

function mediaAAAC(aa, ac) {
    if (aa == null && ac == null) return null;
    return ((aa ?? 0) * 1 + (ac ?? 0) * 2) / 3;
}

function notaPorTempo(seg, tabela, tipo) {
    if (seg == null) return null;
    for (const t of tabela) {
        if (seg <= t[tipo]) return t.nota;
    }
    return 0;
}

function notaPorQuantidade(v, tabela, tipo) {
    if (v == null || v === "") return null;
    for (const t of tabela) {
        if (v >= t[tipo]) return t.nota;
    }
    return 0;
}

/* =========================
   MATÉRIAS TEÓRICAS
========================= */

function calcularMateria(prefixo) {
    const simples = ["fund", "empre", "pt", "racio", "didat"];
    const provas = simples.includes(prefixo)
        ? [{ id: "aa", peso: 1 }, { id: "ac", peso: 2 }]
        : [{ id: "aa1", peso: 1 }, { id: "aa2", peso: 1 }, { id: "ac", peso: 2 }];

    let soma = 0;
    let peso = 0;

    provas.forEach(p => {
        const a = Number(document.getElementById(`acertos-${prefixo}-${p.id}`)?.value);
        const t = Number(document.getElementById(`total-${prefixo}-${p.id}`)?.value);
        if (!isNaN(a) && !isNaN(t) && t > 0) {
            const nota = (a / t) * 10;
            soma += nota * p.peso;
            peso += p.peso;
        }
    });

    return peso > 0 ? soma / peso : null;
}

function calcularMateriaSimples(container) {
    const input = container.querySelector("input");
    const span = container.querySelector(".media-materia");
    const nota = parseFloat(input.value);
    span.textContent = !isNaN(nota) ? nota.toFixed(2) : "--";
    return !isNaN(nota) ? nota : null;
}

/* =========================
   TIRO
========================= */

function calcularTiro() {
    const aa = parseFloat(document.getElementById("tiro-aa")?.value);
    const ac1 = parseFloat(document.getElementById("tiro-ac1")?.value);
    const ac2 = parseFloat(document.getElementById("tiro-ac2")?.value);

    let soma = 0, peso = 0;
    if (!isNaN(aa)) { soma += aa; peso++; }
    if (!isNaN(ac1)) { soma += ac1 * 2; peso += 2; }
    if (!isNaN(ac2)) { soma += ac2 * 2; peso += 2; }

    const media = peso > 0 ? soma / peso : null;
    document.getElementById("media-tiro").textContent = media ? media.toFixed(3) : "--";
    return media;
}

/* =========================
   TFM
========================= */
/* (Tabelas corrida, natacao, flexao, etc permanecem como você já organizou no topo) */

function calcularTFM() {
    let soma = 0, qtd = 0;

    const provas = [
        ["corrida", "corrida-aa", "corrida-ac", corrida, "tempo"],
        ["flexao", "flexao-aa", "flexao-ac", flexao, "quantidade"],
        ["barra", "barra-aa", "barra-ac", barra, "quantidade"],
        ["natacao", "natacao-aa", "natacao-ac", natacao, "tempo"],
        ["corda", "corda-aa", "corda-ac", corda, "quantidade"],
        ["ppm", "ppm-aa", "ppm-ac", ppm, "tempo"]
    ];

    provas.forEach(([nome, aaId, acId, tabela, tipo]) => {
        const aa = tipo === "tempo"
            ? tempoParaSegundos(document.getElementById(aaId)?.value)
            : Number(document.getElementById(aaId)?.value);

        const ac = tipo === "tempo"
            ? tempoParaSegundos(document.getElementById(acId)?.value)
            : Number(document.getElementById(acId)?.value);

        const notaAA = tipo === "tempo"
            ? notaPorTempo(aa, tabela, "aa")
            : notaPorQuantidade(aa, tabela, "aa");

        const notaAC = tipo === "tempo"
            ? notaPorTempo(ac, tabela, "ac")
            : notaPorQuantidade(ac, tabela, "ac");

        const media = mediaAAAC(notaAA, notaAC);
        document.getElementById(`nota-${nome}`).textContent = media ? media.toFixed(3) : "--";

        if (media != null) {
            soma += media;
            qtd++;
        }
    });

    const mediaTFM = qtd > 0 ? soma / qtd : null;
    document.getElementById("media-tfm").textContent = mediaTFM ? mediaTFM.toFixed(3) : "--";
    return mediaTFM;
}

/* =========================
   MÉDIA GERAL (FONTE = SPANS)
========================= */

function calcularTudo() {
    let soma = 0, count = 0;

    ["tec","fund","ciber","empre","pt","racio","didat"].forEach(m => {
        const media = calcularMateria(m);
        const span = document.getElementById(`media-${m}`);
        span.textContent = media ? media.toFixed(3) : "--";
    });

    document.querySelectorAll('[data-tipo="simples"]').forEach(calcularMateriaSimples);
    calcularTiro();
    calcularTFM();

    document.querySelectorAll("span").forEach(span => {
        const v = parseFloat(span.textContent.replace(",", "."));
        if (!isNaN(v)) {
            soma += v;
            count++;
        }
    });

    const mediaFinal = count > 0 ? soma / count : null;
    document.getElementById("media-geral").textContent =
        mediaFinal ? mediaFinal.toFixed(3) : "--";

    window.mediaGeralAtual = mediaFinal;
}

/* =========================
   MÁSCARA
========================= */

function mascaraTempo(input) {
    let v = input.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + ":" + v.slice(2);
    input.value = v;
}

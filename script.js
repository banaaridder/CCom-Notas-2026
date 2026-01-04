/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", async () => {
  await carregarNotasDoUsuario();
  calcularTudo();
});

/* =========================
   BOTÃO SALVAR (DESKTOP + iOS)
========================= */

const btnSalvar = document.getElementById("btnSalvar");

if (btnSalvar) {
  btnSalvar.addEventListener("click", e => {
    e.preventDefault();
    salvarNotas();
  });

  btnSalvar.addEventListener("touchend", e => {
    e.preventDefault();
    salvarNotas();
  });
}

/* =========================
   AUTO SAVE (DEBOUNCE)
========================= */

let salvarTimeout;

document.addEventListener("input", () => {
  calcularTudo();

  clearTimeout(salvarTimeout);
  salvarTimeout = setTimeout(() => {
    salvarNotas();
  }, 1500);
});

/* =========================
   CARREGAR NOTAS
========================= */

async function carregarNotasDoUsuario() {
  const usuarioId = localStorage.getItem("usuarioLogado");
  if (!usuarioId) return;

  const { data, error } = await window.supabaseClient
    .from("notas")
    .select("dados")
    .eq("usuario_id", usuarioId)
    .single();

  if (error || !data) return;

  Object.entries(data.dados).forEach(([id, valor]) => {
    const input = document.getElementById(id);
    if (input) input.value = valor;
  });
}

/* =========================
   SALVAR NOTAS (UPSERT)
========================= */

async function salvarNotas() {
  calcularTudo();

  const usuarioId = localStorage.getItem("usuarioLogado");
  if (!usuarioId) return;

  const notas = {};
  document.querySelectorAll("input").forEach(input => {
    if (input.id) notas[input.id] = input.value;
  });

  const { error } = await window.supabaseClient
    .from("notas")
    .upsert(
      {
        usuario_id: usuarioId,
        dados: notas,
        media_geral: window.mediaGeralAtual
      },
      { onConflict: "usuario_id" }
    );

  if (error) {
    console.error(error);
    alert("Erro ao salvar notas");
  }
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

function notaPorTempo(valor, tabela, tipo) {
  if (valor == null) return null;
  for (const item of tabela) {
    if (valor <= item[tipo]) return item.nota;
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
      soma += (a / t) * 10 * p.peso;
      peso += p.peso;
    }
  });

  return peso ? soma / peso : null;
}

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

/* flexao, barra, corda, ppm → MANTER IGUAL AO SEU */

/* =========================
   TFM
========================= */

function calcularTFM() {
  const provas = [
    { nome: "corrida", aa: "corrida-aa", ac: "corrida-ac", tabela: corrida, tipo: "tempo" },
    { nome: "natacao", aa: "natacao-aa", ac: "natacao-ac", tabela: natacao, tipo: "tempo" }
  ];

  let soma = 0;
  let count = 0;

  provas.forEach(p => {
    const aa = p.tipo === "tempo"
      ? tempoParaSegundos(document.getElementById(p.aa)?.value)
      : parseFloat(document.getElementById(p.aa)?.value);

    const ac = p.tipo === "tempo"
      ? tempoParaSegundos(document.getElementById(p.ac)?.value)
      : parseFloat(document.getElementById(p.ac)?.value);

    const media = mediaAAAC(
      p.tipo === "tempo" ? notaPorTempo(aa, p.tabela, "aa") : notaPorQuantidade(aa, p.tabela, "aa"),
      p.tipo === "tempo" ? notaPorTempo(ac, p.tabela, "ac") : notaPorQuantidade(ac, p.tabela, "ac")
    );

    document.getElementById(`nota-${p.nome}`).textContent = media ? media.toFixed(3) : "--";

    if (media !== null) {
      soma += media;
      count++;
    }
  });

  document.getElementById("media-tfm").textContent = count ? (soma / count).toFixed(3) : "--";
  return count ? soma / count : null;
}

/* =========================
   MÉDIA GERAL
========================= */

function calcularTudo() {
  let soma = 0;
  let count = 0;

  ["tec", "fund", "ciber", "empre", "pt", "racio", "didat"].forEach(m => {
    const media = calcularMateria(m);
    if (media !== null) {
      soma += media;
      count++;
      document.getElementById(`media-${m}`).textContent = media.toFixed(3);
    }
  });

  document.querySelectorAll('[data-tipo="simples"]').forEach(el => {
    const v = parseFloat(el.querySelector("input").value);
    if (!isNaN(v)) {
      soma += v;
      count++;
      el.querySelector(".media-materia").textContent = v.toFixed(2);
    }
  });

  const tfm = calcularTFM();
  if (tfm !== null) {
    soma += tfm;
    count++;
  }

  const mediaFinal = count ? soma / count : null;
  document.getElementById("media-geral").textContent = mediaFinal ? mediaFinal.toFixed(3) : "--";
  window.mediaGeralAtual = mediaFinal;
}

/* =========================
   MÁSCARA TEMPO
========================= */

function mascaraTempo(input) {
  let v = input.value.replace(/\D/g, "").slice(0, 4);
  if (v.length >= 3) v = v.slice(0, 2) + ":" + v.slice(2);
  input.value = v;
}

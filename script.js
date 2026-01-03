function calcularTudo() {
    let soma = 0;
    let count = 0;

    const materias = ["tec", "fund", "ciber", "empre", "pt", "racio", "didat"];

    /* =========================
       MATÉRIAS TEÓRICAS
    ========================= */

    materias.forEach(m => {
        const media = calcularMateria(m);
        const span = document.getElementById(`media-${m}`);

        if (media !== null && !isNaN(media)) {
            span.textContent = media.toFixed(3);
            soma += media;
            count++;
        } else {
            span.textContent = "--";
        }
    });

    /* =========================
       MATÉRIAS SIMPLES
    ========================= */

    document.querySelectorAll('[data-tipo="simples"]').forEach(materia => {
        const media = calcularMateriaSimples(materia);
        if (media !== null && !isNaN(media)) {
            soma += media;
            count++;
        }
    });

    /* =========================
       TIRO
    ========================= */

    const mediaTiro = calcularTiro();
    if (mediaTiro !== null && !isNaN(mediaTiro)) {
        soma += mediaTiro;
        count++;
    }

    /* =========================
       TFM
    ========================= */

    const mediaTFM = calcularTFM();
    if (mediaTFM !== null && !isNaN(mediaTFM)) {
        soma += mediaTFM;
        count++;
    }

    /* =========================
       MÉDIA GERAL
    ========================= */

    let mediaFinal = null;

    // 🔹 cálculo normal
    if (count > 0) {
        mediaFinal = soma / count;
    } 
    // 🔥 fallback para carregamento inicial
    else {
        let somaSpan = 0;
        let countSpan = 0;

        document.querySelectorAll("span").forEach(span => {
            const valor = parseFloat(span.textContent.replace(",", "."));
            if (!isNaN(valor)) {
                somaSpan += valor;
                countSpan++;
            }
        });

        if (countSpan > 0) {
            mediaFinal = somaSpan / countSpan;
        }
    }

    document.getElementById("media-geral").textContent =
        mediaFinal !== null ? mediaFinal.toFixed(3) : "--";

    window.mediaGeralAtual = mediaFinal;
}

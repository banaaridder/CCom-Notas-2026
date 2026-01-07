document.addEventListener("DOMContentLoaded", () => {
    carregarRanking("media_geral");

    // Gerenciar cliques nos botões de opção
    const buttons = document.querySelectorAll(".opt-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove classe active de todos e adiciona no clicado
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const materia = btn.getAttribute("data-materia");
            carregarRanking(materia);
        });
    });
});

async function carregarRanking(materiaFiltro) {
    const tbody = document.getElementById("ranking-body");
    const labelMedia = document.getElementById("label-media");
    
    // Atualiza o texto do cabeçalho da tabela
    const nomesMaterias = {
        "media_geral": "Média Geral",
        "tfm": "TFM",
        "tiro": "Tiro",
        "tec": "Tec Mil Com",
        "fund": "Fund. de Com",
        "ciber": "Cibernética",
        "empre": "Emprego das Com",
        "pt": "Português",
        "racio": "Raciocínio",
        "didat": "Didática"
    };
    labelMedia.innerText = nomesMaterias[materiaFiltro];
    
    tbody.innerHTML = "<tr><td colspan='3'>Carregando...</td></tr>";

    const { data, error } = await window.supabaseClient
        .from("notas")
        .select(`media_geral, dados, usuarios:usuario_id ( nome )`);

    if (error) {
        console.error(error);
        return;
    }

    let listaRanking = data.map(item => {
        let valorNota = 0;
        if (materiaFiltro === "media_geral") {
            valorNota = item.media_geral || 0;
        } else {
            // Busca o ID da média salvo no JSON de dados (ex: media-tfm, media-tec)
            valorNota = parseFloat(item.dados[`media-${materiaFiltro}`]) || 0;
        }

        return {
            nome: item.usuarios?.nome ?? "—",
            nota: valorNota
        };
    });

    // Ordenar do maior para o menor
    listaRanking.sort((a, b) => b.nota - a.nota);

    tbody.innerHTML = "";
    listaRanking.forEach((aluno, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.nota.toFixed(3)}</td>
        `;
        tbody.appendChild(tr);
    });
}

/* =========================================
   CONTROLE DE SCROLL LATERAL (MOUSE)
========================================= */
const slider = document.querySelector('.ranking-options-container');
let isDown = false;
let startX;
let scrollLeft;

// 1. Scroll com a Roda do Mouse
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY; // Transforma o scroll vertical em horizontal
});

// 2. Scroll ao Clicar e Arrastar
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active-dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active-dragging');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active-dragging');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Ajuste a velocidade do arrasto aqui
    slider.scrollLeft = scrollLeft - walk;
});
const supabase = window.supabaseClient;

const alunosOficiais = [
    "ROGER", "D SILVA", "GABRIEL PIMENTEL", "REBELO", "DAVI COSTA", "GOES", 
    "FRANCO", "CONTILE", "LOBO", "GUILHERME SOUZA", "ALMEIDA", "DOS REIS", 
    "MATEUS RIBEIRO", "SAMUEL VICTOR", "YURY LINS", "J VICTOR", "LUCAS RYAN", 
    "ROSANOVA", "CORDEIRO SILVA", "TEODORO", "DAVI CARLOS", "L MARTINS", 
    "CAIO NASCIMENTO", "MATHEUS SILVA", "CESAR", "CESTARO", "PERROTTE", 
    "WAGNER PEREIRA", "CLEMENTE", "WALLACE OLIVEIRA", "ESTEVAO", "PEDRO CARVALHO", 
    "R SILVA", "GUILHERME FERREIRA", "QUEIROZ", "LEMOS", "LIESSI", "REIS SOUSA", 
    "SOUZA MOTA", "ALCANTARA", "ADRIEL VALENÇA", "THALES", "VICTOR PEREIRA", 
    "VALE", "LUIZ SANTOS", "BERTUCE", "KAUA SOUZA", "CLAUDIO", "DE ALBUQUERQUE", 
    "GABRIEL SILVA", "MENDONCA", "AMORIM", "P MOURA", "EDUARDO", "TAUAN", 
    "V MAGALHAES", "CONCEICAO", "CYRILLO", "LUCAS ABREU", "BARCELLOS", "MAURO", 
    "LISBOA", "GUEDES", "PRADO", "THIAGO WESLLEY", "STELLE", "MEIRELES", 
    "MONTANHA", "VITOR", "MATHEUS BARBOSA", "ANTONIO SILVA", "ASSUNCAO", 
    "GABRIEL AMORA", "VERRI", "DE ANGELO", "JOAO CESARIO", "LUCAS ALVES", 
    "L SILVEIRA", "FAGUNDES", "COSTA", "AURINO", "R MOURA", "JULIACI", 
    "LUAN SILVA", "JOAO SANTOS", "ARTHUR", "ISIDORO", "ENZO FERRARI", 
    "CARLOS EDUARDO", "FEITOSA", "CAPUTO", "DE CASTRO", "LUCAS CRUZ", 
    "DIOGO VINICIUS", "VICTOR SANTOS", "E FAGNER", "SILVA GOMES", "PIRES SOUZA", 
    "C ALCANTARA", "JULIAO", "CAMPOS", "MAURILIO", "JOAO RODRIGUES", "LATTO", 
    "BASTOS", "TEOFILO", "MARCENES", "FRANK", "FARIAS", "JEZIEL", "J RIBEIRO", 
    "EDUARDO NASCIMENTO", "F DANTAS", "NASCIMENTO ANTUNES", "SIMOES", "TRANCOZO", 
    "RITZMANN", "CASTRO ALVES", "CHRISTIAN", "S GABRIEL", "DEIVISSON", "THOMAS", 
    "CAMILO", "TAVARES NETO", "SERPA", "GIMENEZ", "ZAKUR", "CARVALHO SOUZA", 
    "DE ARAUJO", "DOMINGUES"
];

async function carregarDados() {
    const grid = document.getElementById("grid-alunos");
    
    // Busca todas as notas (certifica-te que a tabela se chama 'notas')
    const { data: todasNotas, error } = await supabase
        .from("notas")
        .select("*");

    if (error) {
        grid.innerHTML = `<p class='erro'>Erro ao carregar dados: ${error.message}</p>`;
        return;
    }

    document.getElementById("total-alunos").textContent = alunosOficiais.length;
    document.getElementById("total-notas").textContent = todasNotas.length;

    gerarCards(todasNotas);

    // Filtro de pesquisa em tempo real
    document.getElementById("filtroAluno").addEventListener("input", (e) => {
        const termo = e.target.value.toUpperCase();
        const cards = document.querySelectorAll(".card-aluno");
        cards.forEach(card => {
            const nome = card.dataset.nome;
            card.style.display = nome.includes(termo) ? "block" : "none";
        });
    });
}

function gerarCards(notas) {
    const grid = document.getElementById("grid-alunos");
    grid.innerHTML = "";

    alunosOficiais.forEach(aluno => {
        const notasDoAluno = notas.filter(n => n.usuario_nome === aluno);
        
        const card = document.createElement("div");
        card.className = "card-aluno";
        card.dataset.nome = aluno;

        let listaHtml = notasDoAluno.map(n => `
            <div class="nota-row">
                <span class="materia">${n.materia}</span>
                <span class="valor">${n.nota}</span>
            </div>
        `).join("");

        card.innerHTML = `
            <div class="card-header">
                <h3>${aluno}</h3>
                <span class="badge">${notasDoAluno.length}</span>
            </div>
            <div class="card-body">
                ${listaHtml || '<p class="vazio">Nenhuma nota lançada</p>'}
            </div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", carregarDados);
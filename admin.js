// Usamos window.supabaseClient para evitar o erro de "already declared"
const supabaseAdmin = window.supabaseClient; 

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

let dadosParaExportar = [];

// 1. Função que gera os cards visualmente
function gerarCards(notas) {
    const grid = document.getElementById("grid-alunos");
    if (!grid) return;
    
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

// 2. Função principal de carga
async function carregarDados() {
    const grid = document.getElementById("grid-alunos");
    
    const { data: todasNotas, error } = await supabaseAdmin
        .from("notas")
        .select("*");

    if (error) {
        if(grid) grid.innerHTML = `<p class='erro'>Erro: ${error.message}</p>`;
        return;
    }

    dadosParaExportar = todasNotas;
    
    const totalAlunosElem = document.getElementById("total-alunos");
    const totalNotasElem = document.getElementById("total-notas");
    
    if (totalAlunosElem) totalAlunosElem.textContent = alunosOficiais.length;
    if (totalNotasElem) totalNotasElem.textContent = todasNotas.length;

    gerarCards(todasNotas);
}

// 3. Função de Exportação
window.exportarParaExcel = function() {
    if (dadosParaExportar.length === 0) return alert("Não há dados para exportar");

    // Cabeçalho com BOM para o Excel entender acentos (UTF-8)
    let csvContent = "\uFEFF"; 
    csvContent += "Aluno,Materia,Nota,Data\n";

    dadosParaExportar.forEach(n => {
        const dataFormatada = new Date(n.created_at).toLocaleDateString('pt-BR');
        csvContent += `${n.usuario_nome},${n.materia},${n.nota},${dataFormatada}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "notas_ccom.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// 4. Inicialização e Filtro
document.addEventListener("DOMContentLoaded", () => {
    carregarDados();

    const filtro = document.getElementById("filtroAluno");
    if (filtro) {
        filtro.addEventListener("input", (e) => {
            const termo = e.target.value.toUpperCase();
            const cards = document.querySelectorAll(".card-aluno");
            cards.forEach(card => {
                const nome = card.dataset.nome;
                card.style.display = nome.includes(termo) ? "block" : "none";
            });
        });
    }
});
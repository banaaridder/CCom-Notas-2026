// Configuração do Supabase (use as mesmas variáveis do seu login.js)
const supabase = window.supabaseClient;

const listaAlunosOficiais = [
    "ROGER", "D SILVA", "GABRIEL PIMENTEL", "REBELO", "DAVI COSTA", "GOES", 
    "FRANCO", "CONTILE", "LOBO", "GUILHERME SOUZA" // ... adicione todos aqui
];

async function carregarDados() {
    const grid = document.getElementById("grid-alunos");
    
    // Busca todas as notas cadastradas
    const { data: notas, error } = await supabase
        .from("notas") // Nome da sua tabela no Supabase
        .select("*");

    if (error) {
        console.error("Erro:", error);
        return;
    }

    grid.innerHTML = "";

    listaAlunosOficiais.forEach(aluno => {
        const notasDoAluno = notas.filter(n => n.usuario_nome === aluno);
        
        const card = document.createElement("div");
        card.className = "card-aluno";
        
        let htmlNotas = notasDoAluno.map(n => `
            <div class="linha-nota">
                <span>${n.materia}</span>
                <span class="valor-nota">${n.nota}</span>
            </div>
        `).join("");

        card.innerHTML = `
            <h3>${aluno}</h3>
            <div class="lista-notas">
                ${htmlNotas || '<p class="vazio">Sem notas lançadas</p>'}
            </div>
            <div class="footer-card">
                Lançamentos: ${notasDoAluno.length}
            </div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", carregarDados);
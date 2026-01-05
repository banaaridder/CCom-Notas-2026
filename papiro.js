const dadosMaterias = {
    'tecmil': {
        titulo: 'Técnicas Militares de Com.',
        icon: 'fas fa-walkie-talkie',   
        resumo: 'Estudo de normas de exploração, indicativos, autenticação e montagem de antenas de campanha.',
        pdf: 'link_do_manual_tmc.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'fund': {
        titulo: 'Fundamentos das Comunicações',
        icon: 'fas fa-podcast',
        resumo: 'Base teórica sobre ondas eletromagnéticas, espectro de frequência, tipos de modulação (AM, FM, Digital) e fenômenos de propagação. Essencial para entender como o sinal viaja e os fatores que causam interferência.',
        pdf: 'manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'ciber': {
        titulo: 'Cibernética',
        icon: 'fas fa-microchip',
        resumo: 'Estudo da Segurança da Informação (Criptografia, Integridade e Disponibilidade). Aborda a proteção de redes militares contra ataques externos e os protocolos de defesa cibernética do Exército Brasileiro.',
        pdf: 'manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'empre': {
        titulo: 'Emprego das Comunicações',
        icon: 'fas fa-map-location-dot',
        resumo: 'A aplicação tática das comunicações no apoio ao Comando. Planejamento de Postos de Comando (PC), instalação de centros de mensagens e a integração dos sistemas de comunicações em operações ofensivas e defensivas.',
        pdf: 'manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'pt': {
        titulo: 'Português Instrumental',
        icon: 'fas fa-pen-nib',
        resumo: 'Padronização da redação oficial militar. Foco em clareza, concisão e objetividade na elaboração de documentos técnicos, mensagens rádio escritas e relatórios de missão (RelM).',
        pdf: 'manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'racio': {
        titulo: 'Raciocínio Lógico',
        icon: 'fas fa-brain',
        resumo: 'Desenvolvimento do pensamento analítico para resolução de problemas complexos. Envolve lógica proposicional, estruturas lógicas e diagramas, competências fundamentais para a tomada de decisão rápida sob pressão.',
        pdf: 'manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    }
};



function abrirMateria(id) {
    const materia = dadosMaterias[id];
    if(!materia) return;

    document.getElementById('modalTitle').innerText = materia.titulo;
    document.getElementById('modalDescription').innerText = materia.resumo;
    document.getElementById('modalIcon').className = `fas ${materia.icon}`;
    document.getElementById('linkManual').href = materia.pdf;
    document.getElementById('linkEbaula').href = materia.ebaula;

    document.getElementById('materiaModal').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('materiaModal').style.display = 'none';
}

// Fechar se clicar fora do card
window.onclick = function(event) {
    const modal = document.getElementById('materiaModal');
    if (event.target == modal) fecharModal();
}


function calcularAntena() {
    const freq = document.getElementById('freqAntena').value;
    const resultadoContainer = document.getElementById('resultado-container');
    
    if (freq && freq > 0) {
        // Fórmula: 142.5 / Frequência = Comprimento Total (metros)
        const total = 142.5 / freq;
        const perna = total / 2;

        document.getElementById('total-antena').innerText = total.toFixed(2) + " m";
        document.getElementById('perna-antena').innerText = perna.toFixed(2) + " m";
        
        resultadoContainer.style.display = 'block';
    } else {
        alert("Por favor, insira uma frequência válida.");
    }
}

// Tabela de Autenticação fictícia (Sistema de Substituição)
const tabelaAutenticacao = {
    'A': 'X', 'B': 'M', 'C': 'P', 'D': 'R', 'E': 'L',
    'F': 'A', 'G': 'K', 'H': 'S', 'I': 'T', 'J': 'O'
};

function gerarDesafio() {
    const letrasValidas = Object.keys(tabelaAutenticacao);
    const desafio = letrasValidas[Math.floor(Math.random() * letrasValidas.length)];
    
    desafioCorreto = tabelaAutenticacao[desafio];
    
    const display = document.getElementById('display-autenticacao');
    display.style.color = "#00ff00";
    display.innerText = `[REDE LIMA] ESCUTA DESAFIO: "${desafio}". CAMBIO.`;
    
    document.getElementById('area-resposta').style.display = 'block';
    document.getElementById('input-senha').value = ""; // Limpa campo
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Esconde todas as divs de conteúdo das abas
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove a classe "active" de todos os botões
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostra a aba atual e adiciona a classe "active" ao botão que foi clicado
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
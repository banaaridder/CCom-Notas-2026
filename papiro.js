// ==========================================
// 1. CONFIGURAÇÃO E DADOS DAS MATÉRIAS
// ==========================================
const dadosMaterias = {
    'tecmil': {
        titulo: 'Técnicas Militares de Com.',
        icon: 'fas fa-walkie-talkie',   
        resumo: 'Estudo de normas de exploração, indicativos, autenticação e montagem de antenas de campanha.',
        pdf: 'assets/manual_tecmil.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'fund': {
        titulo: 'Fundamentos das Comunicações',
        icon: 'fas fa-podcast',
        resumo: 'Base teórica sobre ondas eletromagnéticas, espectro de frequência, tipos de modulação (AM, FM, Digital) e fenômenos de propagação.',
        pdf: 'assets/manual_fundamentos.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'ciber': {
        titulo: 'Cibernética',
        icon: 'fas fa-microchip',
        resumo: 'Estudo da Segurança da Informação (Criptografia, Integridade e Disponibilidade) e protocolos de defesa do EB.',
        pdf: 'assets/manual_cibernetica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'empre': {
        titulo: 'Emprego das Comunicações',
        icon: 'fas fa-map-location-dot',
        resumo: 'A aplicação tática das comunicações no apoio ao Comando e planejamento de Postos de Comando (PC).',
        pdf: 'assets/manual_emprego.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'pt': {
        titulo: 'Português Instrumental',
        icon: 'fas fa-pen-nib',
        resumo: 'Padronização da redação oficial militar, clareza e concisão em relatórios e mensagens rádio.',
        pdf: 'assets/manual_portugues.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'racio': {
        titulo: 'Raciocínio Lógico',
        icon: 'fas fa-brain',
        resumo: 'Lógica proposicional e diagramas para tomada de decisão rápida sob pressão.',
        pdf: 'assets/manual_logica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'didat': {
        titulo: 'Didática de Instrução',
        icon: 'fas fa-graduation-cap',
        resumo: 'Processos de ensino-aprendizagem, técnicas de instrução militar e elaboração de planos de sessão.',
        pdf: 'assets/manual_didatica.pdf',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    }
};

// ==========================================
// 2. LÓGICA DE SINCRONIZAÇÃO E UI
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    
    // Usa o cliente Supabase disponível (ajustado para seu supabase.js)
    const client = window.supabase || window.supabaseClient;

    if (!client) {
        console.error("Erro: Objeto Supabase não encontrado. Verifique a ordem dos scripts.");
        return;
    }

    // Pega o ID que o seu login.js salvou no navegador
    const usuarioId = localStorage.getItem("usuarioLogado");

    if (!usuarioId) {
        console.warn("Usuário não identificado. Redirecionando para login.");
        window.location.href = "login.html";
        return;
    }

    console.log("Usuário logado:", usuarioId);
    const cards = document.querySelectorAll('.card-papiro-missao');

    // --- FUNÇÕES DE INTERFACE ---

    function atualizarVisualCard(card) {
        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        const marcados = Array.from(checkboxes).filter(cb => cb.checked).length;
        const total = checkboxes.length;
        const porcentagem = total > 0 ? Math.round((marcados / total) * 100) : 0;

        const fill = card.querySelector('.fill');
        const tag = card.querySelector('.percent-tag');

        if (fill) {
            fill.style.width = porcentagem + '%';
            fill.style.backgroundColor = (porcentagem === 100) ? "#2ecc71" : "#f1c40f";
        }
        
        if (tag) tag.innerText = porcentagem + '%';

        if (porcentagem === 100) {
            card.classList.add('concluido');
            card.style.border = "2px solid #2ecc71";
            card.style.boxShadow = "0 0 15px rgba(46, 204, 113, 0.3)";
        } else {
            card.classList.remove('concluido');
            card.style.border = "none";
            card.style.boxShadow = "none";
        }
    }

    // --- FUNÇÕES DE BANCO DE DADOS ---

    async function salvarEstadoNoBanco(materia, prova, checked) {
        try {
            const { error } = await client
                .from('estados_papiro')
                .upsert({
                    user_id: usuarioId, // Usa o ID do localStorage
                    materia: materia,
                    prova: prova,
                    is_checked: checked,
                    updated_at: new Date()
                }, { onConflict: 'user_id, materia, prova' });
            
            if (error) throw error;
        } catch (err) {
            console.error("Erro ao salvar no banco:", err.message);
        }
    }

    async function carregarDadosIniciais() {
        try {
            const { data, error } = await client
                .from('estados_papiro')
                .select('materia, prova, is_checked')
                .eq('user_id', usuarioId);

            if (error) throw error;

            if (data) {
                data.forEach(item => {
                    const card = document.querySelector(`.card-papiro-missao[data-materia="${item.materia}"]`);
                    if (card) {
                        const cb = card.querySelector(`input[data-prova="${item.prova}"]`);
                        if (cb) cb.checked = item.is_checked;
                    }
                });
            }

            // Atualiza o visual de todos os cards após carregar
            cards.forEach(card => atualizarVisualCard(card));

        } catch (err) {
            console.error("Erro ao carregar dados:", err.message);
        }
    }

    // --- CONFIGURAÇÃO DE EVENTOS ---

    cards.forEach(card => {
        const materia = card.dataset.materia;
        const checks = card.querySelectorAll('input[type="checkbox"]');

        checks.forEach(cb => {
            cb.addEventListener('change', async () => {
                const prova = cb.dataset.prova;
                atualizarVisualCard(card);
                await salvarEstadoNoBanco(materia, prova, cb.checked);
            });
        });
    });

    // Inicia o carregamento
    await carregarDadosIniciais();
});

// ==========================================
// 3. FERRAMENTAS GLOBAIS (MODAL, ANTENA, TABS)
// ==========================================

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

window.addEventListener('click', (event) => {
    const modal = document.getElementById('materiaModal');
    if (event.target == modal) fecharModal();
});

function calcularAntena() {
    const freq = document.getElementById('freqAntena').value;
    const resultadoContainer = document.getElementById('resultado-container');
    
    if (freq && freq > 0) {
        const total = 142.5 / freq;
        const perna = total / 2;
        document.getElementById('total-antena').innerText = total.toFixed(2) + " m";
        document.getElementById('perna-antena').innerText = perna.toFixed(2) + " m";
        resultadoContainer.style.display = 'block';
    } else {
        alert("Por favor, insira uma frequência válida.");
    }
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
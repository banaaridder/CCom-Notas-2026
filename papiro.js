// ==========================================
// 1. CONFIGURAÇÃO E DADOS DAS MATÉRIAS
// ==========================================
const dadosMaterias = {
    'tecmil': {
        titulo: 'Técnicas Militares de Com.',
        icon: 'fas fa-walkie-talkie',   
        resumo: 'Estudo de normas de exploração, indicativos, autenticação e montagem de antenas de campanha.',
        pdf: 'https://drive.google.com/drive/folders/1a1LL8-4fXVaxvY1kp1qcmN9X3LIgxEnW?usp=drive_link   ',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'fund': {
        titulo: 'Fundamentos das Comunicações',
        icon: 'fas fa-podcast',
        resumo: 'Base teórica sobre ondas eletromagnéticas, espectro de frequência, tipos de modulação (AM, FM, Digital) e fenômenos de propagação.',
        pdf: 'https://drive.google.com/drive/folders/1zOdZKqcFaNLiw-CDuIcGG-OzIW1U2Q9_?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'ciber': {
        titulo: 'Cibernética',
        icon: 'fas fa-microchip',
        resumo: 'Estudo da Segurança da Informação (Criptografia, Integridade e Disponibilidade) e protocolos de defesa do EB.',
        pdf: 'https://drive.google.com/drive/folders/1-sVouBKR9jRU3ce6VBQ6wcDrp5D0K1AK?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'empre': {
        titulo: 'Emprego das Comunicações',
        icon: 'fas fa-map-location-dot',
        resumo: 'A aplicação tática das comunicações no apoio ao Comando e planejamento de Postos de Comando (PC).',
        pdf: 'https://drive.google.com/drive/folders/1iQbRp7vsg36CtgXxLIEFYRNxCs--ueGy?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'pt': {
        titulo: 'Português Instrumental',
        icon: 'fas fa-pen-nib',
        resumo: 'Padronização da redação oficial militar, clareza e concisão em relatórios e mensagens rádio.',
        pdf: 'https://drive.google.com/drive/folders/1zo2K1Nk1fjK7WtLRffpJIg6vdtCAe-Yb?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'ing': {
        titulo: 'Inglês',
        icon: 'fas fa-pen-nib',
        resumo: 'Bizus, audios, simulados para você conseguir sua habilitação no idioma que mais oferece oportunidades aos militares',
        pdf: 'https://drive.google.com/drive/folders/1t4AXPdJkVkk3sHQRhafM4HH8Tc24BD2w?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'racio': {
        titulo: 'Raciocínio Lógico',
        icon: 'fas fa-brain',
        resumo: 'Lógica proposicional e diagramas para tomada de decisão rápida sob pressão.',
        pdf: 'https://drive.google.com/drive/folders/1y6GU06n6H3D9kLER4i8MpWph9_c9OcSh?usp=drive_link',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    },
    'didat': {
        titulo: 'Didática de Instrução',
        icon: 'fas fa-graduation-cap',
        resumo: 'Processos de ensino-aprendizagem, técnicas de instrução militar e elaboração de planos de sessão.',
        pdf: 'https://drive.google.com/',
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

    // Preenche os dados
    document.getElementById('modalTitle').innerText = materia.titulo;
    document.getElementById('modalDescription').innerText = materia.resumo;
    document.getElementById('modalIcon').className = `fas ${materia.icon}`;
    document.getElementById('linkManual').href = materia.pdf;
    document.getElementById('linkEbaula').href = materia.ebaula;

    // Exibe o modal
    const modal = document.getElementById('materiaModal');
    modal.style.display = 'flex';

    // Esconde o Header e Menu (Igual ao TFM)
    const header = document.querySelector('.header');
    const menuBtn = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (header) header.classList.add('header-sumir');
    if (menuBtn) menuBtn.classList.add('header-sumir');
    if (mobileMenu) mobileMenu.classList.add('header-sumir');

    // Bloqueia scroll
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.getElementById('materiaModal');
    modal.style.display = 'none';

    // Volta o Header e Menu
    const header = document.querySelector('.header');
    const menuBtn = document.getElementById('menuToggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (header) header.classList.remove('header-sumir');
    if (menuBtn) menuBtn.classList.remove('header-sumir');
    if (mobileMenu) mobileMenu.classList.remove('header-sumir');

    // Libera scroll
    document.body.style.overflow = 'auto';
}

// Fechar com clique fora do modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('materiaModal');
    if (event.target == modal) {
        fecharModal();
    }
});

// Fechar com a tecla ESC
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        fecharModal();
    }
});

// --- OUTRAS FUNÇÕES ---

function calcularAntena() {
    const freq = document.getElementById('freqAntena').value;
    const resultadoContainer = document.getElementById('resultado-container');
    
    if (freq && freq > 0) {
        // 
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
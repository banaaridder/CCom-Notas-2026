// ==========================================
// 1. CONFIGURAÇÃO E DADOS DAS MATÉRIAS
// ==========================================
const dadosMaterias = {
    'tecmil': {
        titulo: 'Técnicas Militares de Com.',
        icon: 'fas fa-walkie-talkie',   
        resumo: 'Estudo de normas de exploração, indicativos, autenticação e montagem de antenas de campanha.',
        pdf: 'https://drive.google.com/drive/folders/1a1LL8-4fXVaxvY1kp1qcmN9X3LIgxEnW?usp=drive_link',
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
        resumo: 'Bizus, audios, simulados para você conseguir sua habilitação no idioma...',
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
        resumo: 'Processos de ensino-aprendizagem, técnicas de instrução militar...',
        pdf: 'https://drive.google.com/',
        ebaula: 'https://secretariaebaula.eb.mil.br'
    }
};

// ==========================================
// 2. LÓGICA DE SINCRONIZAÇÃO E UI
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    const client = window.supabase || window.supabaseClient;
    const usuarioId = localStorage.getItem("usuarioLogado");

    if (!client || !usuarioId) {
        console.warn("Usuário ou Supabase não identificados.");
        return;
    }

    // Injeta as tags de porcentagem
    document.querySelectorAll('.ud-group').forEach(ud => {
        const summary = ud.querySelector('.ud-title');
        if (summary && !summary.querySelector('.percent-badge')) {
            summary.innerHTML += ' <span class="percent-badge ud-badge">0%</span>';
        }
    });

    document.querySelectorAll('.materia-wrapper').forEach(mat => {
        const stats = mat.querySelector('.materia-stats');
        if (stats && !stats.querySelector('.percent-badge')) {
            stats.innerHTML = '<span class="percent-badge mat-badge">0%</span> ' + stats.innerHTML;
        }
    });

    // --- FUNÇÕES ---

    function atualizarProgressoVisual() {
        document.querySelectorAll('.materia-wrapper').forEach(materia => {
            const uds = materia.querySelectorAll('.ud-group');
            let materiaTotal = 0, materiaMarcados = 0;

            uds.forEach(ud => {
                const checkboxes = ud.querySelectorAll('input[type="checkbox"]');
                const totalUD = checkboxes.length;
                const marcadosUD = Array.from(checkboxes).filter(cb => cb.checked).length;
                
                materiaTotal += totalUD;
                materiaMarcados += marcadosUD;

                const porcentagemUD = totalUD > 0 ? Math.round((marcadosUD / totalUD) * 100) : 0;
                const badgeUD = ud.querySelector('.ud-badge');
                if(badgeUD) badgeUD.innerText = `${porcentagemUD}%`;

                checkboxes.forEach(cb => {
                    const li = cb.closest('.assunto-item');
                    if (li) cb.checked ? li.classList.add('concluido') : li.classList.remove('concluido');
                });

                porcentagemUD === 100 ? ud.classList.add('concluido') : ud.classList.remove('concluido');
            });

            const porcentagemMat = materiaTotal > 0 ? Math.round((materiaMarcados / materiaTotal) * 100) : 0;
            const badgeMat = materia.querySelector('.mat-badge');
            if(badgeMat) badgeMat.innerText = `${porcentagemMat}%`;
            porcentagemMat === 100 ? materia.classList.add('concluido') : materia.classList.remove('concluido');
        });
    }

    async function salvarProgressoNoBanco() {
        const checkboxes = document.querySelectorAll('.assunto-item input[type="checkbox"]');
        const estados = Array.from(checkboxes).map(cb => cb.checked);

        const { error } = await client
            .from('estados_papiro')
            .upsert({
                user_id: usuarioId,
                checklist_data: { checks: estados },
                updated_at: new Date()
            }, { onConflict: 'user_id' });

        if (error) console.error("Erro ao salvar:", error.message);
    }

    async function carregarDadosIniciais() {
        const { data, error } = await client
            .from('estados_papiro')
            .select('checklist_data')
            .eq('user_id', usuarioId)
            .maybeSingle();

        if (error) {
            console.error("Erro ao carregar:", error.message);
            return;
        }

        if (data && data.checklist_data && data.checklist_data.checks) {
            const listaChecks = data.checklist_data.checks;
            const checkboxes = document.querySelectorAll('.assunto-item input[type="checkbox"]');
            
            checkboxes.forEach((cb, index) => {
                if (listaChecks[index] !== undefined) {
                    cb.checked = listaChecks[index];
                }
            });
        }
        atualizarProgressoVisual();
    }

    // --- EVENTOS ---

    document.querySelectorAll('.assunto-item input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', async () => {
            atualizarProgressoVisual();
            await salvarProgressoNoBanco();
        });
    });

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
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    document.getElementById('materiaModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

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
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}
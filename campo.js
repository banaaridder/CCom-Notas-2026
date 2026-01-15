document.addEventListener('DOMContentLoaded', async () => {
    const usuarioId = localStorage.getItem("usuarioLogado");

const headers = document.querySelectorAll('.card-header');
headers.forEach(header => {
    header.onclick = function(e) {
        // Impede fechar ao clicar nos checks
        if (e.target.closest('.checkbox-container') || e.target.type === 'checkbox') return;

        const card = this.closest('.card-campo, .card-aprestamento');
        
        // Alterna a classe active
        if (card.classList.contains('active')) {
            card.classList.remove('active');
        } else {
            // Opcional: fecha outros cards antes de abrir o atual
            // document.querySelectorAll('.card-campo.active').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        }
    };
});
    // 2. ESCUTAR MUDANÇAS (SALVAMENTO AUTOMÁTICO)
    document.addEventListener('change', async (e) => {
        if (e.target.type === 'checkbox') {
            const cb = e.target;

            // Se for o check principal do card (o de borda azul)
            if (cb.classList.contains('check-campo')) {
                const card = cb.closest('.card-campo');
                if (card) {
                    cb.checked ? card.classList.add('concluido') : card.classList.remove('concluido');
                }
            }

            // Se for um item dentro de um kit
            if (cb.closest('.kit-items')) {
                atualizarVisualKit(cb);
            }

            // Salva no Supabase
            await salvarProgressoSupabase();
        }
    });

    // 3. INICIALIZAÇÃO COM PEQUENO ATRASO
    // O timeout garante que o 'supabaseClient' definido no outro arquivo já esteja disponível
    atualizarContadores();
    
    if (usuarioId) {
        setTimeout(async () => {
            await carregarProgressoSupabase(usuarioId);
        }, 200);
    }
});

// FUNÇÃO PARA SALVAR
async function salvarProgressoSupabase() {
    const usuarioId = localStorage.getItem("usuarioLogado");
    
    // Verifica se o cliente do Supabase existe
    if (!usuarioId || typeof supabaseClient === 'undefined') {
        console.warn("Tentativa de salvar sem supabaseClient pronto ou sem usuário.");
        return;
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const estado = Array.from(checkboxes).map(cb => cb.checked);

    const { error } = await supabaseClient
        .from('estados_campo')
        .upsert({ 
            user_id: usuarioId, 
            checklist_data: { checks: estado },
            updated_at: new Date() 
        });

    if (error) console.error("Erro ao salvar no Supabase:", error);
}

// FUNÇÃO PARA CARREGAR
async function carregarProgressoSupabase(id) {
    if (typeof supabaseClient === 'undefined') {
        console.error("Erro: supabaseClient não encontrado no carregamento.");
        return;
    }

    const { data, error } = await supabaseClient
        .from('estados_campo')
        .select('checklist_data')
        .eq('user_id', id)
        .maybeSingle(); // maybeSingle evita erro caso o usuário seja novo

    if (error || !data || !data.checklist_data) return;

    const listaChecks = data.checklist_data.checks;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((cb, index) => {
        if (listaChecks[index] !== undefined) {
            cb.checked = listaChecks[index];
            
            // Aplica visual de concluído se for o check principal
            if (cb.classList.contains('check-campo') && cb.checked) {
                const card = cb.closest('.card-campo');
                if (card) card.classList.add('concluido');
            }
            
            // Atualiza visual se for parte de um kit
            if (cb.closest('.kit-items')) {
                atualizarVisualKit(cb);
            }
        }
    });
}

// Lógica Visual dos Kits (Garante que o pai marque se os filhos estiverem marcados)
function atualizarVisualKit(checkbox) {
    const kitContainer = checkbox.closest('.kit-container');
    if (!kitContainer) return;

    const itemsContainer = kitContainer.querySelector('.kit-items');
    const masterCheck = kitContainer.querySelector('.kit-master-check');
    
    if (itemsContainer && masterCheck) {
        const todosDoKit = itemsContainer.querySelectorAll('input[type="checkbox"]');
        const todosMarcados = Array.from(todosDoKit).every(cb => cb.checked);
        
        masterCheck.checked = todosMarcados;
        todosMarcados ? kitContainer.classList.add('completed') : kitContainer.classList.remove('completed');
    }
}

// Contadores de dias para a missão
function atualizarContadores() {
    const agora = new Date().getTime();
    document.querySelectorAll('.card-campo').forEach(card => {
        const dataStr = card.getAttribute('data-data');
        const contadorTxt = card.querySelector('.countdown');
        if (!dataStr || !contadorTxt) return;

        const dataMissao = new Date(dataStr).getTime();
        const diff = dataMissao - agora;

        if (diff > 0) {
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            contadorTxt.textContent = dias > 0 ? `${dias} DIAS FORA!` : `É AMANHÃ!`;
        } else {
            contadorTxt.textContent = "MISSÃO INICIADA";
        }
    });
}

// Função para abrir/fechar kits internos
function toggleKit(element) {
    if (element && element.parentElement) {
        element.parentElement.classList.toggle('open');
    }
}
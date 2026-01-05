document.addEventListener('DOMContentLoaded', async () => {
    const usuarioId = localStorage.getItem("usuarioLogado");

    // 1. EXPANSÃO DOS CARDS
    const headers = document.querySelectorAll('.card-header');
    headers.forEach(header => {
        header.addEventListener('click', function(e) {
            if (e.target.closest('.checkbox-container') || e.target.closest('.kit-master-check')) return;
            const card = this.closest('.card-campo, .card-aprestamento');
            if (card) card.classList.toggle('active');
        });
    });

    // 2. ESCUTAR MUDANÇAS (SALVAMENTO AUTOMÁTICO)
    document.addEventListener('change', async (e) => {
        if (e.target.type === 'checkbox') {
            const cb = e.target;

            // Se for o check principal do card (o de borda azul)
            if (cb.classList.contains('check-campo')) {
                const card = cb.closest('.card-campo');
                cb.checked ? card.classList.add('concluido') : card.classList.remove('concluido');
            }

            // Se for um item dentro de um kit
            if (cb.closest('.kit-items')) {
                atualizarVisualKit(cb);
            }

            // Salva no Supabase
            await salvarProgressoSupabase();
        }
    });

    // 3. INICIALIZAÇÃO
    atualizarContadores();
    if (usuarioId) {
        await carregarProgressoSupabase(usuarioId);
    }
});

// FUNÇÃO PARA SALVAR
async function salvarProgressoSupabase() {
    const usuarioId = localStorage.getItem("usuarioLogado");
    if (!usuarioId) return;

    // Captura o estado de TODOS os checkboxes da página em ordem
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const estado = Array.from(checkboxes).map(cb => cb.checked);

    const { error } = await supabase
        .from('estados_campo')
        .upsert({ 
            user_id: usuarioId, 
            checklist_data: { checks: estado },
            updated_at: new Date() 
        });

    if (error) console.error("Erro ao salvar:", error);
}

// FUNÇÃO PARA CARREGAR
async function carregarProgressoSupabase(id) {
    const { data, error } = await supabase
        .from('estados_campo')
        .select('checklist_data')
        .eq('user_id', id)
        .single();

    if (error || !data) return;

    const listaChecks = data.checklist_data.checks;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((cb, index) => {
        if (listaChecks[index] !== undefined) {
            cb.checked = listaChecks[index];
            
            // Aplica visuais de conclusão
            if (cb.classList.contains('check-campo') && cb.checked) {
                cb.closest('.card-campo').classList.add('concluido');
            }
            
            // Atualiza os Kits (Mochila, Higiene, etc)
            if (cb.closest('.kit-items')) {
                atualizarVisualKit(cb);
            }
        }
    });
}

// Lógica Visual dos Kits
function atualizarVisualKit(checkbox) {
    const kitContainer = checkbox.closest('.kit-container');
    const itemsContainer = kitContainer.querySelector('.kit-items');
    const masterCheck = kitContainer.querySelector('.kit-master-check');
    
    const todosDoKit = itemsContainer.querySelectorAll('input[type="checkbox"]');
    const todosMarcados = Array.from(todosDoKit).every(cb => cb.checked);
    
    masterCheck.checked = todosMarcados;
    todosMarcados ? kitContainer.classList.add('completed') : kitContainer.classList.remove('completed');
}

// Contadores de dias
function atualizarContadores() {
    const agora = new Date().getTime();
    document.querySelectorAll('.card-campo').forEach(card => {
        const dataStr = card.getAttribute('data-data');
        const contadorTxt = card.querySelector('.countdown');
        if (!dataStr || !contadorTxt) return;

        const diff = new Date(dataStr).getTime() - agora;
        if (diff > 0) {
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            contadorTxt.textContent = dias > 0 ? `${dias} DIAS FORA!` : `É AMANHÃ!`;
        } else {
            contadorTxt.textContent = "MISSÃO INICIADA";
        }
    });
}

// Função global para o HTML não dar erro ao clicar no header do kit
function toggleKit(element) {
    element.parentElement.classList.toggle('open');
}
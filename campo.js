document.addEventListener('DOMContentLoaded', () => {
    // 1. SELEÇÃO DE ELEMENTOS
    // Selecionamos todos os headers dentro de cards de campo OU de aprestamento
    const headers = document.querySelectorAll('.card-campo .card-header, .card-aprestamento .card-header');

    // 2. LÓGICA DE EXPANSÃO (ABRIR/FECHAR)
    headers.forEach(header => {
        header.addEventListener('click', function() {
            // Encontra o card pai (independente de qual classe seja)
            const card = this.closest('.card-campo, .card-aprestamento');
            
            // Alterna a classe 'active'
            if (card) {
                card.classList.toggle('active');
            }
        });
    });

    const checkCampos = document.querySelectorAll('.check-campo');
    
    checkCampos.forEach(check => {
        check.addEventListener('change', function() {
            const card = this.closest('.card-campo');
            if (this.checked) {
                card.classList.add('concluido');
            } else {
                card.classList.remove('concluido');
            }
        });
    });

    // 3. LÓGICA DOS CONTADORES (Apenas para os cards de campo)
    atualizarContadores();
    setInterval(atualizarContadores, 60000); // Atualiza a cada minuto
});

function atualizarContadores() {
    const agora = new Date().getTime();
    const cardsDeCampo = document.querySelectorAll('.card-campo');

    cardsDeCampo.forEach(card => {
        const dataStr = card.getAttribute('data-data');
        const contadorTxt = card.querySelector('.countdown');
        
        if (!dataStr || !contadorTxt) return;

        const dataAlvo = new Date(dataStr).getTime();
        const diff = dataAlvo - agora;

        if (diff > 0) {
            const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
            if (dias > 0) {
                contadorTxt.textContent = `${dias} DIAS FORA!`;
            } else {
                contadorTxt.textContent = `É AMANHÃ!`;
            }
        } else {
            contadorTxt.textContent = "MISSÃO INICIADA";
        }
    });
}

// Abre ou fecha o kit clicado
function toggleKit(element) {
    const container = element.parentElement;
    container.classList.toggle('open');
}

// Verifica se todos os itens de um kit estão marcados
function checkKit(checkbox) {
    const itemsContainer = checkbox.closest('.kit-items');
    const kitContainer = checkbox.closest('.kit-container');
    const masterCheck = kitContainer.querySelector('.kit-master-check');
    
    // Procura por todos os checkboxes dentro deste kit
    const allCheckboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
    
    // Atualiza o master check e a classe visual
    masterCheck.checked = allChecked;
    
    if (allChecked) {
        kitContainer.classList.add('completed');
    } else {
        kitContainer.classList.remove('completed');
    }
}

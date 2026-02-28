const eventos = [
    // --- CAMPOS E MANOBRAS ---
    { data: "2026-03-09", fim: "2026-03-13", titulo: "ECD Pedra Galena", tipo: "campo" },
    { data: "2026-05-11", fim: "2026-05-15", titulo: "1 ELD FITCOM", tipo: "campo" },
    { data: "2026-05-25", fim: "2026-05-29", titulo: "1° SIESP", tipo: "campo" },
    { data: "2026-06-29", fim: "2026-07-03", titulo: "2° ELD Op. Gavião", tipo: "campo" },
    { data: "2026-08-10", fim: "2026-08-14", titulo: "3° ELD Pedra Galena 2", tipo: "campo" },
    { data: "2026-09-21", fim: "2026-09-25", titulo: "2° SIESP", tipo: "campo" },

    // --- FERIADOS (SEM EXPEDIENTE) --
    { data: "2026-02-14", fim: "2026-02-18", titulo: "Carnaval / Cinzas", tipo: "feriado" },
    { data: "2026-04-03", fim: "2026-04-03", titulo: "Sexta-feira Santa", tipo: "feriado" },
    { data: "2026-04-05", fim: "2026-04-05", titulo: "Páscoa", tipo: "feriado" },
    { data: "2026-04-19", fim: "2026-04-19", titulo: "Dia do Exército Brasileiro", tipo: "feriado" },
    { data: "2026-04-20", fim: "2026-04-20", titulo: "Recesso", tipo: "feriado" },
    { data: "2026-04-21", fim: "2026-04-21", titulo: "Tiradentes", tipo: "feriado" },
    { data: "2026-05-01", fim: "2026-05-01", titulo: "Dia do Trabalho", tipo: "feriado" },
    { data: "2026-06-04", fim: "2026-06-04", titulo: "Corpus Christi", tipo: "feriado" },
    { data: "2026-06-05", fim: "2026-06-05", titulo: "Corpus Christi", tipo: "feriado" },

    { data: "2026-08-09", fim: "2026-08-09", titulo: "Dia dos Pais", tipo: "feriado" },
    { data: "2026-08-25", fim: "2026-08-25", titulo: "Dia do Soldado", tipo: "feriado" },
    { data: "2026-09-07", fim: "2026-09-07", titulo: "Independência do Brasil", tipo: "feriado" },
    { data: "2026-09-23", fim: "2026-09-23", titulo: "Aniversário de Três Corações", tipo: "feriado" },
    { data: "2026-10-12", fim: "2026-10-12", titulo: "Nossa Sra. Aparecida", tipo: "feriado" },
    { data: "2026-11-02", fim: "2026-11-02", titulo: "Finados", tipo: "feriado" },
    { data: "2026-11-15", fim: "2026-11-15", titulo: "Proclamação da República", tipo: "feriado" },
    { data: "2026-11-19", fim: "2026-11-19", titulo: "Dia da Bandeira Nacional", tipo: "feriado" },
    { data: "2026-11-20", fim: "2026-11-20", titulo: "Dia da Consciência Negra", tipo: "feriado" },
    { data: "2026-12-25", fim: "2026-12-25", titulo: "Natal", tipo: "feriado" },

    // --- DATAS ESA / FESTAS ---
    { data: "2026-01-22", fim: "2026-01-22", titulo: "Apresentação", tipo: "festa" },
    { data: "2026-01-28", fim: "2026-01-28", titulo: "Aula Inaugural", tipo: "festa" },
    { data: "2026-02-09", fim: "2026-02-13", titulo: "Omlipíadas", tipo: "festa" },
    { data: "2026-09-14", fim: "2026-09-18", titulo: "MarExAer", tipo: "festa" },
    { data: "2026-09-11", fim: "2026-09-11", titulo: "MarExAer", tipo: "festa" },
    { data: "2026-10-12", fim: "2026-10-16", titulo: "EPCT", tipo: "festa" },
    { data: "2026-10-26", fim: "2026-10-30", titulo: "Manobra Escolar", tipo: "festa" },
    { data: "2026-11-03", fim: "2026-11-06", titulo: "Manobra Escolar", tipo: "festa" },

    { data: "2026-03-07", fim: "2026-03-07", titulo: "Entrega do Sabre", tipo: "festa" },
    { data: "2026-05-28", fim: "2026-05-28", titulo: "Aniversário da ESA", tipo: "festa" },
    { data: "2026-08-25", fim: "2026-08-25", titulo: "Dia do Soldado", tipo: "festa" },
    { data: "2026-11-19", fim: "2026-11-19", titulo: "Término CFGS", tipo: "festa" },
    { data: "2026-11-21", fim: "2026-11-21", titulo: "Formatura de Encerramento", tipo: "festa" },

        // --- PROVAS ---
    { data: "2026-03-31", fim: "2026-03-31", titulo: "AA FUND COM", tipo: "prova" },
    { data: "2026-04-09", fim: "2026-04-09", titulo: "AA1 TEC MIL COM", tipo: "prova" },
    { data: "2026-05-04", fim: "2026-05-04", titulo: "AA2 TEC MIL COM", tipo: "prova" },
    { data: "2026-06-11", fim: "2026-06-11", titulo: "AC TEC MIL COM", tipo: "prova" },
    { data: "2026-06-23", fim: "2026-06-23", titulo: "AC FUND COM", tipo: "prova" },
    { data: "2026-06-11", fim: "2026-06-11", titulo: "AA EMPREGO DAS COM", tipo: "prova" },

    { data: "2026-06-07", fim: "2026-06-07", titulo: "AC EMPREGO DAS COM", tipo: "prova" },
    { data: "2026-05-21", fim: "2026-05-21", titulo: "AA1 CIBER", tipo: "prova" },
    { data: "2026-06-25", fim: "2026-06-25", titulo: "AA2 CIBER", tipo: "prova" },
    { data: "2026-07-31", fim: "2026-07-31", titulo: "AC CIBER", tipo: "prova" },


    { data: "2026-03-07", fim: "2026-03-07", titulo: "Entrega do Sabre", tipo: "festa" },
    { data: "2026-05-28", fim: "2026-05-28", titulo: "Aniversário da ESA", tipo: "festa" },
    { data: "2026-08-25", fim: "2026-08-25", titulo: "Dia do Soldado", tipo: "festa" },
    { data: "2026-11-19", fim: "2026-11-19", titulo: "Término CFGS", tipo: "festa" },
    { data: "2026-11-21", fim: "2026-11-21", titulo: "Formatura de Encerramento", tipo: "festa" },

    // --- OUTROS ---
    { data: "2026-05-05", fim: "2026-05-05", titulo: "Dia das Comunicações", tipo: "arma" },
    { data: "2026-04-10", fim: "2026-04-10", titulo: "Dia da Engenharia", tipo: "arma" },
    { data: "2026-05-10", fim: "2026-05-10", titulo: "Dia da Cavalaria", tipo: "arma" },
    { data: "2026-05-24", fim: "2026-05-24", titulo: "Dia da Infantaria", tipo: "arma" },
    { data: "2026-06-10", fim: "2026-06-10", titulo: "Dia da Artilharia", tipo: "arma" },
 //   { data: "2026-04-06", fim: "2026-04-10", titulo: "AC1 Armt Mun Tir II", tipo: "prova" },
    { data: "2026-07-13", fim: "2026-07-26", titulo: "Recesso Escolar", tipo: "recesso" },

        { data: "2026-07-17", fim: "2026-07-21", titulo: "PCI", tipo: "pci" },
        { data: "2026-07-28", fim: "2026-07-02", titulo: "PCI", tipo: "pci" }

];

let currentMonth = 0; 
let activeFilter = 'todos';

function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    const monthDisplay = document.getElementById('monthDisplay');
    container.innerHTML = '';

    let mesesParaExibir = [];
    const width = window.innerWidth;
    // Define a quantidade de meses com base na largura (mesma lógica do seu CSS)
    let qtd = width > 1100 ? 3 : (width > 750 ? 2 : 1);

    if (activeFilter !== 'todos') {
        // Modo Filtro: Mostra todos os meses do curso que possuem o evento
        for (let m = 0; m <= 10; m++) mesesParaExibir.push(m);
        monthDisplay.innerText = `FILTRANDO: ${activeFilter.toUpperCase()}`;
    } else {
        // Modo Normal: Paginação (1 a 3 meses)
        for (let i = 0; i < qtd; i++) {
            let mIndex = currentMonth + i;
            if (mIndex <= 10) mesesParaExibir.push(mIndex);
        }

        // --- LÓGICA DO TÍTULO DINÂMICO ---
        const nomesMeses = mesesParaExibir.map(m => {
            let nome = new Date(2026, m).toLocaleDateString('pt-BR', { month: 'short' });
            return nome.replace('.', '').toUpperCase(); // Transforma "jan." em "JAN"
        });

        if (nomesMeses.length > 1) {
            // Se tiver mais de um mês, junta com espaço (ex: JAN FEV MAR)
            monthDisplay.innerText = `${nomesMeses.join(' ')} 2026`;
        } else {
            // Se for mobile (1 mês), mostra o nome completo
            let nomeCompleto = new Date(2026, currentMonth).toLocaleDateString('pt-BR', { month: 'long' });
            monthDisplay.innerText = `${nomeCompleto.toUpperCase()} 2026`;
        }
    }

    mesesParaExibir.forEach(m => {
        const monthEl = createMonthElement(2026, m);
        if (monthEl) container.appendChild(monthEl);
    });
    
    // Visibilidade das setas
    document.getElementById('prevMonth').style.visibility = (currentMonth === 0 || activeFilter !== 'todos') ? "hidden" : "visible";
    document.getElementById('nextMonth').style.visibility = (currentMonth + qtd > 10 || activeFilter !== 'todos') ? "hidden" : "visible";
}

function createMonthElement(year, month) {
    const div = document.createElement('div');
    div.className = 'month-container';

    const diasNoMes = new Date(year, month + 1, 0).getDate();
    const primeiroDiaSemana = new Date(year, month, 1).getDay();

    let html = `<h3>${new Date(year, month).toLocaleDateString('pt-BR', { month: 'long' }).toUpperCase()}</h3>`;
    html += `<div class="calendar-grid">`;
    
    const labels = ['S','T','Q','Q','S','S','D'];
    labels.forEach((l, idx) => html += `<div class="day-name ${idx >= 5 ? 'fds-label' : ''}">${l}</div>`);

    let offset = primeiroDiaSemana === 0 ? 6 : primeiroDiaSemana - 1;
    if (activeFilter === 'todos') {
        for (let x = 0; x < offset; x++) html += `<div class="empty-day"></div>`;
    }

    const inicioCurso = new Date(2026, 0, 22);
    const fimCurso = new Date(2026, 10, 21);

    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dObj = new Date(year, month, dia);
        const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        
        if (dObj < inicioCurso || dObj > fimCurso) {
            if (activeFilter === 'todos') html += `<div class="empty-day"></div>`;
            continue;
        }

        const dSemana = dObj.getDay(); 
        const isSabDom = (dSemana === 0 || dSemana === 6);
        const ev = eventos.find(e => iso >= e.data && iso <= e.fim);
        const tipoDia = ev ? ev.tipo : (isSabDom ? "feriado" : "expediente");

        let ocultar = false;
        if (activeFilter !== 'todos') {
            if (activeFilter === 'feriado') ocultar = !(isSabDom || tipoDia === 'feriado');
            else ocultar = (activeFilter !== tipoDia);
        }

        if (!ocultar) {
            let classes = `calendar-day`;
            let desc = ev ? ev.titulo : (isSabDom ? 'Fim de Semana' : 'Expediente');

            if (isSabDom) classes += ` fds`; // Adiciona classe FDS
            if (ev) {
                classes += ` ${ev.tipo}`; // Adiciona tipo (campo, festa, etc)
                if (iso === ev.data) classes += ` event-start`;
                if (iso === ev.fim) classes += ` event-end`;
            } else if (isSabDom) {
                classes += ` feriado`; // FDS comum sem evento ganha cor de feriado
            }
            
            const hoje = new Date();
            if (hoje.getDate() === dia && hoje.getMonth() === month && hoje.getFullYear() === year) classes += ` hoje`;

            html += `<div class="${classes}" data-description="${desc}">${dia}</div>`;
        }
    }
    html += `</div>`;
    div.innerHTML = html;
    return div;
}

// Eventos de clique permanecem iguais...
document.getElementById('prevMonth').onclick = () => { if (currentMonth > 0) { currentMonth--; renderCalendar(); } };
document.getElementById('nextMonth').onclick = () => { if (currentMonth < 10) { currentMonth++; renderCalendar(); } };
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = function() {
        activeFilter = this.dataset.type;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderCalendar();
    };
});
window.addEventListener('resize', renderCalendar);
renderCalendar();
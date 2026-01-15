const indicesTFM = {
    'corrida': {
        titulo: 'Corrida de 3KM',
        isTempo: false,
        dados: [
            { nota: 10.0, aa: "11:00", ac: "10:45" }, { nota: 9.5, aa: "11:12", ac: "10:56" },
            { nota: 9.0, aa: "11:24", ac: "11:08" }, { nota: 8.5, aa: "11:37", ac: "11:20" },
            { nota: 8.0, aa: "11:49", ac: "11:32" }, { nota: 7.5, aa: "12:01", ac: "11:44" },
            { nota: 7.0, aa: "12:13", ac: "11:56" }, { nota: 6.5, aa: "12:25", ac: "12:08" },
            { nota: 6.0, aa: "12:37", ac: "12:20" }, { nota: 5.0, aa: "13:03", ac: "12:32" },
            { nota: 4.5, aa: "13:15", ac: "12:45" }, { nota: 4.0, aa: "13:28", ac: "12:58" },
            { nota: 3.5, aa: "13:40", ac: "13:11" }, { nota: 3.0, aa: "13:52", ac: "13:47" },
            { nota: 2.5, aa: "14:05", ac: "13:05" }, { nota: 2.0, aa: "14:17", ac: "14:17" },
            { nota: 1.5, aa: "14:29", ac: "13:59" }, { nota: 1.0, aa: "14:41", ac: "14:11" },
            { nota: 0.5, aa: "14:54", ac: "14:23" }, { nota: 0, aa: "14:55", ac: "14:36" }
        ]
    },
    'flexao': {
        titulo: 'Flexão de Braços',
        isTempo: false,
        dados: [
            { nota: 10.0, aa: 42, ac: 43 }, { nota: 9.0, aa: 40, ac: 41 },
            { nota: 8.0, aa: 38, ac: 39 }, { nota: 7.0, aa: 35, ac: 36 },
            { nota: 6.0, aa: 26, ac: 22 }, { nota: 5.0, aa: 22, ac: 20 },
            { nota: 4.0, aa: 32, ac: 32 }, { nota: 3.0, aa: 26, ac: 29 },
            { nota: 2.0, aa: 25, ac: 28 }, { nota: 1.0, aa: 24, ac: 27 },
            { nota: 0.0, aa: 23, ac: 26 }
        ]
    },
        'abdominal': {
        titulo: 'Abdominal Supra',
        isSuficiencia: true, // Nova flag para mudar o layout
        dados: [
            { repeticoes: "< 62", mencao: "Não Suficiente", status: "falhou" },
            { repeticoes: "≥ 62", mencao: "Suficiente", status: "passou" }
        ]

    },
    'barra': {
        titulo: 'Barra Fixa',
        isTempo: false,
        dados: [
            { nota: 10.0, aa: 12, ac: 13 }, { nota: 9.0, aa: 11, ac: 12 },
            { nota: 8.0, aa: 10, ac: 11 }, { nota: 7.0, aa: 9, ac: 10 },
            { nota: 6.0, aa: 8, ac: 9 }, { nota: 5.0, aa: 7, ac: 8 },
            { nota: 4.0, aa: 6, ac: 7 }, { nota: 3.0, aa: 5, ac: 6 },
            { nota: 2.0, aa: 4, ac: 5 }, { nota: 1.0, aa: 3, ac: 4 },
            { nota: 0.0, aa: 2, ac: 3 }
        ]
    },
    'natacao': {
        titulo: 'Natação 50m',
        isTempo: true, // Aqui o sistema formata como tempo
        dados: [
            { nota: 10.0, aa: 17, ac: 15 }, { nota: 9.5, aa: 18, ac: 16 },
            { nota: 9.0, aa: 20, ac: 18 }, { nota: 8.5, aa: 21, ac: 19 },
            { nota: 8.0, aa: 24, ac: 22 }, { nota: 7.5, aa: 25, ac: 23 },
            { nota: 7.0, aa: 26, ac: 24 }, { nota: 6.5, aa: 28, ac: 26 },
            { nota: 6.0, aa: 32, ac: 30 }, { nota: 5.5, aa: 37, ac: 35 },
            { nota: 5.0, aa: 42, ac: 40 }, { nota: 4.5, aa: 47, ac: 45 },
             { nota: 4.0, aa: 52, ac: 50 }, { nota: 3.5, aa: 54, ac: 52 },
            { nota: 3.0, aa: 56, ac: 54 }, { nota: 2.5, aa: 58, ac: 56 },
            { nota: 2.0, aa: 60, ac: 58 }, { nota: 1.5, aa: 62, ac: 60 },
            { nota: 1.0, aa: 64, ac: 62 }, { nota: 0, aa: 65, ac: 68 }
        ]
    },

     'ppm': {
        titulo: 'PPM',
        isTempo: false,
        dados: [
            { nota: 10.0, aa: "04:30", ac: "04:20" }, { nota: 9.5, aa: "04:32", ac: "04:22" },
            { nota: 9.0, aa: "04:34", ac: "04:24" }, { nota: 8.5, aa: "04:39", ac: "04:29" },
            { nota: 8.0, aa: "04:44", ac: "04:34" }, { nota: 7.5, aa: "04:39", ac: "04:39" },
            { nota: 7.0, aa: "04:54", ac: "04:44" }, { nota: 6.5, aa: "05:04", ac: "04:54" },
            { nota: 6.0, aa: "05:15", ac: "05:05" }, { nota: 5.5, aa: "05:31", ac: "05:21" },
            { nota: 5.0, aa: "05:41", ac: "05:31" }, { nota: 4.5, aa: "06:00", ac: "05:43" },
            { nota: 4.0, aa: "06:15", ac: "05:58" }, { nota: 3.5, aa: "06:30", ac: "06:13" },
            { nota: 3.0, aa: "06:45", ac: "06:28" }, { nota: 2.5, aa: "07:00", ac: "06:43" },
            { nota: 2.0, aa: "07:15", ac: "06:58" }, { nota: 1.5, aa: "07:30", ac: "07:13" },
            { nota: 1.0, aa: "07:45", ac: "14:23" }, { nota: 0.0, aa: "07:53", ac: "07:43" }
        ]
    }

};

function abrirModalTFM(chave) {
    const modalidade = indicesTFM[chave];
    if (!modalidade) return;

    const tabelaHead = document.querySelector('.tabela-indices thead');
    const corpo = document.getElementById('corpoTabelaIndices');

    // 1. Ajusta o Cabeçalho da Tabela baseado no tipo de dado
    if (modalidade.isSuficiencia) {
        tabelaHead.innerHTML = `
            <tr>
                <th>REPETIÇÕES</th>
                <th colspan="2">MENÇÃO AA / AC</th>
            </tr>
        `;
        
        corpo.innerHTML = modalidade.dados.map(item => `
            <tr class="${item.status}">
                <td class="nota-destaque">${item.repeticoes}</td>
                <td colspan="2" style="text-align: center;">${item.mencao}</td>
            </tr>
        `).join('');
    } else {
        // Layout Padrão para as outras modalidades
        tabelaHead.innerHTML = `
            <tr>
                <th>NOTA</th>
                <th>AA</th>
                <th>AC</th>
            </tr>
        `;

        corpo.innerHTML = modalidade.dados.map(item => {
            const notaExibida = typeof item.nota === 'number' ? item.nota.toFixed(1) : item.nota;
            return `
                <tr class="${item.nota >= 5 ? 'passou' : 'falhou'}">
                    <td class="nota-destaque">${notaExibida}</td>
                    <td>${formatarValor(item.aa, modalidade.isTempo)}</td>
                    <td>${formatarValor(item.ac, modalidade.isTempo)}</td>
                </tr>
            `;
        }).join('');
    }

    // 2. Configurações Visuais do Modal
    document.getElementById('tfmTitle').innerText = modalidade.titulo;
    document.getElementById('tfmIcon').className = modalidade.icon;
    document.getElementById('modalTFM').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function formatarValor(valor, ehTempo) {
    if (!ehTempo) return valor; // Se for flexão/abdominal, retorna o número puro

    // Garante que o valor seja um número
    const segundosTotais = parseInt(valor);
    
    const minutos = Math.floor(segundosTotais / 60);
    const segundos = segundosTotais % 60;

    // padStart(2, '0') garante que 5 segundos virem "05"
    return `${minutos}:${segundos.toString().padStart(2, '0')}"`;
}

function fecharModalTFM() {
    document.getElementById('modalTFM').style.display = 'none';
}

// Fecha modal ao clicar fora ou ESC
window.onclick = (e) => { if (e.target.id === 'modalTFM') fecharModalTFM(); };
document.addEventListener('keydown', (e) => { if (e.key === "Escape") fecharModalTFM(); });

// --- FUNÇÕES PARA VISUALIZAR MEMENTOS (IMAGEM) ---

function abrirImagem(caminho) {
    console.log("Tentando abrir imagem:", caminho); // Para teste no console

    const modal = document.getElementById('modalImagem');
    const img = document.getElementById('imgPreview');
    
    if (modal && img) {
        img.src = caminho;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Trava scroll da página
    } else {
        console.error("Erro: Modal ou Imagem não encontrados no HTML");
    }
}

function fecharImagem() {
    const modal = document.getElementById('modalImagem');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Libera scroll
    }
}

// Fechar com ESC também
document.addEventListener('keydown', (e) => { 
    if (e.key === "Escape") fecharImagem(); 
});

// --- CALCULADORA DE PACE ---



// Máscara automática para MM:SS
function formatarTempo(input) {
    let value = input.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length >= 3) {
        input.value = value.slice(0, value.length - 2) + ':' + value.slice(value.length - 2);
    } else {
        input.value = value;
    }
}

function calcularPaceAuto() {
    const distInput = document.getElementById('pacerDistancia');
    const tempoInput = document.getElementById('pacerTempo');
    const display = document.getElementById('pacerDisplay');
    const valorPace = document.getElementById('valorPace');

    const distancia = parseFloat(distInput.value);
    const tempoStr = tempoInput.value;

    // Só calcula se tiver distância e o tempo estiver completo (ex: 12:00)
    if (distancia > 0 && tempoStr.includes(':') && tempoStr.length >= 4) {
        const partes = tempoStr.split(':');
        const min = parseInt(partes[0]) || 0;
        const seg = parseInt(partes[1]) || 0;

        const tempoTotalMinutos = min + (seg / 60);
        const distanciaKm = distancia / 1000;
        const paceDecimal = tempoTotalMinutos / distanciaKm;

        const pMin = Math.floor(paceDecimal);
        const pSeg = Math.round((paceDecimal - pMin) * 60);

        // Ajuste se arredondar para 60 segundos
        let finalMin = pMin;
        let finalSeg = pSeg;
        if(finalSeg === 60) { finalMin++; finalSeg = 0; }

        valorPace.innerText = `${finalMin}:${finalSeg.toString().padStart(2, '0')}`;
        display.classList.add('ativo');
    } else {
        valorPace.innerText = "--:--";
        display.classList.remove('ativo');
    }
}


const cancoesTFM = [

    {
        titulo: "Sou comunicante",
        categoria: "COM",
        letra: [
            "Sou comunicante sou muito operacional",
            "não tente me imitar se naum vc vai se dar mau",
            "na infantaria vc vai me ver",
            "eu opero radio ainda comando um GC",
            "na cavalaria vc vai me adimirar",
            "la faço de tudo faço até urutu falar",
            "Na Artilharia você vibra o ano inteiro",
            "Opero rádio e fio e ainda dou tiro de obuseiro",
            "na engenharia se a ponte ruir",
            "mesmo puxando fio eu ajudo a construir",
            "na intendência se a comida faltar",
            "mesmo mascando fio o sistema vai falar"
        ]
    },

    {
        titulo: "Arma invisível que ataca pelo ar",
        categoria: "COM",
        letra: [
            "Arma invisível que ataca pelo ar",
            "os fogos do inimigo nao conseguem nos pegar",
            "por mais que vc tente vc nunca vai nos ver",
            "mas sem a nossa ajuda vc nunca vai vencer",
            "no rádio, transmito, com muita vibração",
            "missóes diversas das armas e canhões",
            "sigamos, com raça, as trilhas de Rondon",
            "no céu, ecoam as comunicações",
            "CO-MU-NI-CA-ÇÕES"
        ]
    },

        {
        titulo: "Nobre Arma Comunicações",
        categoria: "COM",
        letra: [
            "Sempre pronta para o combate",
            "arma que não se pode ver",
            "Comunicações a arma do comando",
            "Instalar, explorar e manter",
            "Com seus fios lança informações",
            "Unindo os diversos escalões",
            "Quatro setas quatro direções",
            "A nobre arma comunicações"
        ]
    },


        {
        titulo: "4 Setas 4 Direções",
        categoria: "COM",
        letra: [
            "4 Setas 4 Direções",
            "Arma do Comando, COMUNICAÇÕES",
            "Eu comando porradaria ",
            "E o CCom invade a infantaria",
            "Eu Controlo a esquadra sem pressa",
            "E em menos de uma hora dominamos a ESA",
        ]
    },


    {
        titulo: "Prestem todos atenção",
        categoria: "COM",
        letra: [
            "Prestem todos atenção:",
            "Na alegria e na vibração,",
            "Aqui na terra ou no ar,",
            "O nosso lema é comunicar!",
            "Garra, força e união,",
            "É a elite do batalhão,",
            "Nos altos ares ou no chão,",
            "Sempre alerta e sem cansar,",
            "Unindo o norte ao sul,",
            "Unindo a terra ao ar!"
        ]
    },


        {
        titulo: "Chegou a PE",
        categoria: "PE",
        letra: [
            "Mãos na cabeça a Polícia chegou",
            "Tapa na cara a PE é o terror",
            "Levanta camisa",
            "Tira o boné",
            "É tapa na cara",
            "Chegou a PE!",
            "Cachorro Latindo",
            "Criança chorando",
            "É tapa na cara",
            "PE ta passando",
            "Cachorro latindo",
            "Criança chorando",
            "É tapa na cara",
            "PE ta invadindo",
            "É a PE, é a PE",
            "Bate com a mão, bate com o pé",
            "Com a PE não ter perdão",
            "Bate com o pé, bate com a mão",
            "Com a PE é sempre assim",
            "tenta a sorte pode vim"
        ]
    },

    {
        titulo: "Listra Vermelha",
        categoria: "GERAL",
        letra: [
            "Listra vermelha costurada no calçao","Pré-requisito pra cumprir qualquer missão",
            "Estrela vazada costurada na gandola", "Não é pra qualquer um, é pros Alunos da Escola",
            "Se é pra correr", "Se é pra ralar",
            "Chama o Aluno que ele vai desembocar"
        ]
    },

    {
        titulo: "O Grito da Montanha",
        categoria: "MONTANHA",
        letra: [
            "Se a guerra escolher como palco", "As montanhas do nosso Brasil",
            "Levarei minha fé minha força", "Junto a mim estará meu fuzil",
            "A altitude o ar rarefeito", "Adaptado tornei-me assim",
            "Hoje sinto que sou parte delas", "E elas são parte de mim",
            "O meu grito de guerra é MONTANHA!", "Montanha responde o rochedo",
            "Vencerei o inimigo com garra", "Sou guerreiro que luta sem medo",
            "MONTANHA!", "BRASIL!"
        ]
    },
    {
        titulo: "Polícia do Exército (PE)",
        categoria: "PE",
        letra: [
            "Coturno negro te causa arrepio", "Sente o peso do meu braçal",
            "O curso não prepara", "O estágio não prepara",
            "Não prepara homens", "Só prepara animais!",
            "GLO foi acionado", "A PE está na pista",
            "Meu Parafal tá querendo terrorista",
            "Corre, se esconde, foge do pé preto",
            "POLICIAIS DO EXÉRCITO!"
        ]
    },
    {
        titulo: "Os Malditos",
        categoria: "GERAL",
        letra: [
            "Alerta! (2X)", "Deixem passar!",
            "Os malditos!", "Os destemidos!",
            "Os sanguinários!", "Os porra louca!",
            "Os aloprados!", "Cambada de aloprado!",
            "Ninguém gosta da gente",
            "CCom arranca olho e quebra dente!",
            "Sai, sai, sai da frente que tô passando",
            "CCom é futebol americano!"
        ]
    },

    {
        titulo: "Arma Vibrante (Comunicações)",
        categoria: "COM",
        letra: [
            "Não preciso do infante", "Longe de mim o engenheiro",
            "Sou comunicante", "Sou da arma mais vibrante!",
            "Não quero cavalaria", "Longe de mim o artilheiro",
            "Sou de Rondon", "Mais que um batalhão inteiro!"
        ]
    },
    {
        titulo: "O Brevê de Montanha",
        categoria: "MONTANHA",
        letra: [
            "Se lá do alto o medo me acompanha", "Para dispersá-lo eu brado MONTANHA!",
            "Montanha!", "Ralada!",
            "Se Deus quiser terei uma em minha farda",
            "Montanha!", "Sofrida!",
            "Com muito orgulho terei uma em minha vida!"
        ]
    },
    {
        titulo: "Som de Trovão",
        categoria: "COM",
        letra: [
            "Firma a cadência!",
            "Que som é esse que parece de um trovão?! (2x)",
            "Comunicações, treme terra e racha o chão!",
            "Comunicações melhor arma da nação!"
        ]
    },
    {
        titulo: "Noite Escura (Emboscada)",
        categoria: "GERAL",
        letra: [
            "Noite, noite escura", "Silhueta baixa",
            "É quase alvorada", "E o instrutor me aguarda para uma emboscada",
            "No meio da escuridão", "Eu já consigo ouvir",
            "Caveiras camufladas que começavam a rir",
            "Canções de comandos eram entoadas",
            "Tapa na cara, voadora e joelhada!"
        ]
    },
    {
        titulo: "Eu não sou da FAB",
        categoria: "COM",
        letra: [
            "Eu não sou da FAB, muito menos sou naval",
            "Sou de comunicações", "Eu tenho muita moral!",
            "Já passei por muita selva,", "Muito charque e lamaçal,",
            "Mas a arma do comando,", "É tropa operacional!"
        ]
    },
    {
        titulo: "PE Paraquedista",
        categoria: "PE",
        letra: [
            "PE! PE!", "PE paraquedista!",
            "Só para pra PE, se for PE paraquedista",
            "Eu tenho ferro,", "Eu tenho escudo,",
            "Eu atravanco,", "Qualquer tumulto,",
            "Eu quero é mais,", "Eu quero é gás!",
            "Gás lacrimogêneo", "No vagabundo eu vou jogar",
            "E vai faltar oxigênio", "Para o maldito respirar!"
        ]
    },
    {
        titulo: "Preparem a pista",
        categoria: "PQD",
        letra: [
            "Preparem a pista", "Balizem a ZL",
            "Que está chegando o gigante Hércules",
            "Não tenham medo", "A rampa é o terror",
            "C-115 o famoso Búfalo",
            "A porta é estreita", "O salto é gigante",
            "C-95 o pequeno Bandeirante",
            "Venha ver", "Venha viver",
            "A emoção de saltar no KC!"
        ]
    },
    {
        titulo: "Alfabeto Pantaneiro",
        categoria: "PANTANAL",
        letra: [
            "Todo pantaneiro tem no gorro um jacaré",
            "Lá em Corumbá eu vou dizer como é que é:",
            "A de Acuri / B de Bocaiuva",
            "C de Corumbá é pra lá que eu vou voltar",
            "D dia D / E embarcações",
            "F de Fronteira, eu vou levar meu pelotão",
            "G de Guerra / H Hora acontece",
            "I de Infantaria que merece a nossa prece",
            "J Jangal / L Lamaçal",
            "M de Maluco, olha minha cara de mau",
            "N Navio / O Operações",
            "P de Pantaneiro o melhor das regiões!"
        ]
    },

    {
        titulo: "A noite ta escura",
        categoria: "MONTANHA",
        letra: [
            "A noite ta escura", "E a pedra tá gelada,",
            "É chegada a hora começou a escala",
            "Mochila parafal,", "Cordada e mosquetão",
            "Infiltra reconhece e mobilia o paredão"
        ]
    },
    {
        titulo: "São João del Rey",
        categoria: "MONTANHA",
        letra: [
            "Ai São João del Rey", "Aiaiai São João del Rey",
            "Lá no 11 tem um curso", "Que ensina a escalar",
            "Esse curso, esse curso", "É o guia de cordada!"
        ]
    },
    {
        titulo: "História de um Montanhista",
        categoria: "MONTANHA",
        letra: [
            "A história de um montanhista todos devem conhecer",
            "Na cabeça um gorro cinza no seu peito um brevê",
            "Sua fama era temida e sua cara era de mal",
            "Conheceu a escalada livre e a artificial",
            "Sabe montar rapel e comando crawl",
            "A falsa baiana é sensacional",
            "Sabe se orientar em qualquer terreno",
            "O guia de cordada é puro talento!"
        ]
    },
    {
        titulo: "Guerreiro da Caatinga",
        categoria: "CAATINGA",
        letra: [
            "A história de um guerreiro todos devem conhecer",
            "Na cabeça um beija-santo e no ombro um brevê",
            "Conhece a cascavel e muitos outros animais",
            "O mandacaru e outros vegetais",
            "Tem mandacaru xique-xique tem", "Coroa de frade caroá também",
            "Tapiri de malva pra gente torá", "E uma solaca que é de matar!"
        ]
    },
    {
        titulo: "Menino do Computador",
        categoria: "COM",
        letra: [
            "Coitado desse menino nunca conheceu a dor,",
            "Bola de gude no tapete, pipa no ventilador,",
            "Mas se quiser pode vir, se quiser pode chegar,",
            "Se vir para as COM se prepare pra ralar,",
            "Porque aqui é um inferno!",
            "E até o capeta vai falar"
        ]
    },
    {
        titulo: "Lá Em Casa é Diferente",
        categoria: "GERAL",
        letra: [
            "Lá em casa é diferente e pra vocês eu vou contar",
            "O meu pai dorme em sentido, minha mãe em descansar",
            "O quintal da minha casa não se varre com vassoura",
            "Varre com ponta de sabre e tiro de metralhadora",
            "A comida lá em casa não tem tempero nem sal",
            "A comida lá de casa é ração operacional",
            "A alvorada lá de casa não precisa corneteiro!"
        ]
    },

    {
        titulo: "Aonde Quer Que Vamos",
        categoria: "GERAL",
        letra: [
            "Por onde quer que vamos","Todos querem saber",
            "Quem somos nós", "De onde viemos",
            "A eles diremos", "Nós somos do CCom",
            "E lá é um cursão", "De muita vibração",
            "Ouviu meu irmão?", "Não bota a cara não",
            "Se não tiver me ouvindo", "Eu canto bem mais alto",
            "Mais alto", "Muito mais alto!"
        ]
    },
    {
        titulo: "Quando Eu Morrer",
        categoria: "GERAL",
        letra: [
            "Quando eu morrer quero ir de FAL e de Beretta,",
            "Chegar no inferno e dar um tiro no capeta,",
            "E o capeta vai gritar desesperado,",
            "Meu Deus do céu tire daqui esse aluno,",
            "Quando eu morrer quero meu último desejo,",
            "Ser enterrado numa pista de rastejo,",
            "E o coveiro têm que ser um bom guerreiro,",
            "Abrir minha cova com granadas e morteiros,",
            "E a menina que por mim não ,",
            "Assobiava a canção da infantaria!"
        ]
    },
    {
        titulo: "Fui Chamado Para Guerrear",
        categoria: "GERAL",
        letra: [
            "Fui chamado para guerrear",
            "Mas na hora 'H', quem diria",
            "O meu fuzil resolveu falhar",
            "Com a faca entre os dentes a ordem era matar",
            "E a pele do inimigo eu pus no mastro da bandeira",
            "Por isso sou chamado de faca na caveira!"
        ]
    },
    {
        titulo: "Demônios Camuflados",
        categoria: "GERAL",
        letra: [
            "Demônios camuflados surgem da escuridão",
            "Corpos ensanguentados espalhados pelo chão",
            "Quer saber da onde eu venho",
            "Ou qual é minha missão",
            "Trago a morte e o desespero",
            "A total destruição",
            "No cordel uma granada",
            "Acionadores de tração",
            "Quem vier atrás de mim",
            "Só vai ouvir a explosão!",
            "Pá Pum e o raio caiu",

        ]
    },
    {
        titulo: "Piscina de Sangue",
        categoria: "GERAL",
        letra: [
            "Quero banhar-me", "Numa piscina",
            "Cheia de sangue", "É sangue do inimigo",
            "Esse sangue é muito bom", "já provei, Não há perigo",
            "É melhor do que café", "É o sangue do inimigo",
            "Só com o sangue do inimigo", "Eu não vou me contentar",
            "Quero a cabeça dele", "No meu prato de jantar!"
        ]
    },
    {
        titulo: "Vou Invadir Sua Mente",
        categoria: "GERAL",
        letra: [
            "Vou invadir sua mente", "Não vou deixar tu dormir",
            "Vou possuir seu corpo", "Eu vou te destruir",
            "E nas infiltrações tu vai lembrar de mim",
            "O aluno maldito", "Que já matou muita gente",
            "Vou deixar no seu corpo", "A marca dos meus dentes!"
        ]
    },
    {
        titulo: "Cães de Guerra Preparar",
        categoria: "GERAL",
        letra: [
            "Cães de guerra preparar", "Preparar para saltar",
            "Salto livre a comandar", "E na favela se infiltrar",
            "Você pode até tentar", "Tentar me capturar",
            "Mas no caminho eu vou deixar", "Brinquedinhos pra você",
            "Estacas Panji vão rolar", "E o seu corpo penetrar",
            "E gargalhadas eu vou dá: IAHAHAE!"
        ]
    },
    {
        titulo: "O Braço Tá Cansado",
        categoria: "GERAL",
        letra: [
            "O braço tá cansado de tanta flexão",
            "E se não parar vai morrer do coração",
            "IAHAHA eu não tô nem aí",
            "Se você não aguenta, porra pode pra sair",
            "Mas que guerreiro és tu que não aguenta ralação",
            "Pega sua gravata, porra volta pra sessão!"
        ]
    },
    {
        titulo: "Faço Parte de Uma Tropa",
        categoria: "GERAL",
        letra: [
            "Faço parte de uma tropa,", "Que tem fibra e moral,",
            "Disciplina elevada,", "É tropa operacional,",
            "Não tem medo do inimigo,", "Nem do fogo da metralha,",
            "Quando entra em combate,", "O inimigo estraçalha!"
        ]
    },
    {
        titulo: "Homens da Mochila",
        categoria: "GERAL",
        letra: [
            "Somos homens da mochila,", "Capacete e cantil,",
            "A nossa força combativa,", "Está na ponta do fuzil,",
            "Somos fogo em movimento,", "E no combate aproximado,",
            "Nós faremos inimigo,", "Pedir perdão por seus pecados!"
        ]
    },
    {
        titulo: "O Avião Já Está na Pista",
        categoria: "PQD",
        letra: [
            "O avião já está na pista", "Logo mais vai decolar",
            "O MS está a bordo", "Pronto para dá o JÁ",
            "Venha ver como é bonito", "Venha ver o que é bom",
            "Ver o Rio de Janeiro", "Na porta do avião!"
        ]
    },
    {
        titulo: "Onça Pintada",
        categoria: "SELVA",
        letra: [
            "Olha a onça dele no chapéu", "Olha que essa onça é o seu troféu",
            "Olha que essa onça não é fácil de se ter",
            "Tem que ralar", "Tem que sofrer",
            "Onça pintada quem foi que te pintou?",
            "Foi um guerreiro louco, louco como eu sou!"
        ]
    },
    {
        titulo: "Canção do Montanhista",
        categoria: "MONTANHA",
        letra: [
            "Cabo solteiro, mosquetão e retinida,",
            "Assim o montanhista vai levando a sua vida,",
            "A cada descalada uma nova emoção,",
            "No alto da montanha dá pra ouvir seu coração,",
            "Se lá do alto o medo me acompanha,",
            "Para dispersá-lo eu brado: MONTANHA!"
        ]
    },
    {
        titulo: "Levante o seu olhar",
        categoria: "PQD",
        letra: [
            "Levante o seu olhar", "O céu está tomado por velame",
            "Você sonhou em lá chegar", "E se tornar um audaz paraquedista",
            "Para manter acesa a mística",
            "Da formação aero terrestre do Brasil",
            "Boina grená só se conquista", "Na formação básica paraquedista!"
        ]
    },
    {
        titulo: "Sede na Caatinga",
        categoria: "GERAL",
        letra: [
            "Sede na caatinga", "O frio na montanha",
            "No calor da selva", "Patrulha no Mendanha",
            "Olha que essa Cia", "Só tem guerreiro alado",
            "Audaz cães de guerra", "Do tipo invocado!"
        ]
    },
    {
        titulo: "Alarme Tocou",
        categoria: "GERAL",
        letra: [
            "O alarme tocou",
            "A guarda foi acionada",
            "Estão tentando invadir",
            "A nossa esmeralda",
            "São apenas mil",
            "Contra um guerreiro de selva do Brasil!"
        ]
    },
    {
        titulo: "Somente os Bons",
        categoria: "GERAL",
        letra: [
            "Somente os bons", "Irão resistir",
            "E o cheiro das nuvens poderão sentir",
            "Vem conhecer a vibração",
            "Armado e equipado saltar do avião!"
        ]
    },
    
    {
        titulo: "O Senhor do Boné",
        categoria: "GERAL",
        letra: [
            "O senhor do boné subiu na chaminé,",
            "Parecia querer escalar,",
            "Instrutor experiente, capaz como é,",
            "Pagou o bizu pro senhor do boné:",
            "Troca pé, troca mão, troca mão, troca pé,",
            "É assim que se faz, seu mané!"
        ]
    }
];

function renderizarCancioneiro() {
    const grid = document.getElementById('gridCancioneiro');
    if (!grid) return;

    grid.innerHTML = cancoesTFM.map((cancao, index) => `
        <div class="card-cancao" id="cancao-${index}">
            <div class="cancao-header" onclick="toggleCancao(${index})">
                <h3>${cancao.titulo}</h3>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="cancao-corpo">
                ${cancao.letra.map(linha => `<span class="letra-linha">${linha}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function toggleCancao(index) {
    const card = document.getElementById(`cancao-${index}`);
    card.classList.toggle('active');
}

// Chame a função ao carregar a página
window.addEventListener('DOMContentLoaded', renderizarCancioneiro);

function filtrarCancoes() {
    const termoBusca = document.getElementById('inputBuscaCancao').value.toLowerCase();
    const cards = document.querySelectorAll('.card-cancao');

    cancoesTFM.forEach((cancao, index) => {
        const card = document.getElementById(`cancao-${index}`);
        
        // Junta o título e todas as linhas da letra em uma string só para pesquisar
        const conteudoCompleto = (cancao.titulo + " " + cancao.letra.join(" ")).toLowerCase();

        if (conteudoCompleto.includes(termoBusca)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

let categoriaAtual = 'TODAS';

function filtrarPorCategoria(categoria, botao) {
    // 1. Gerenciar visual dos botões
    document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('active'));
    botao.classList.add('active');
    
    // 2. Atualizar estado global e disparar busca
    categoriaAtual = categoria;
    filtrarCancoes(); // Chama a função de busca para aplicar os dois filtros juntos
}

function filtrarCancoes() {
    const termoBusca = document.getElementById('inputBuscaCancao').value.toLowerCase();
    
    cancoesTFM.forEach((cancao, index) => {
        const card = document.getElementById(`cancao-${index}`);
        const textoCompleto = (cancao.titulo + " " + cancao.letra.join(" ")).toLowerCase();
        
        // Verifica se a canção pertence à categoria selecionada
        const pertenceCategoria = (categoriaAtual === 'TODAS' || cancao.categoria === categoriaAtual);
        
        // Verifica se o termo de busca existe no título ou na letra
        const bateComBusca = textoCompleto.includes(termoBusca);

        // Só exibe se passar nos dois critérios
        if (pertenceCategoria && bateComBusca) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
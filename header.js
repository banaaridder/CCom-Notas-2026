document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const spanUsername = document.getElementById("username");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinksDesktop = document.querySelector(".nav-links");
    const spanUsernameMobile = document.getElementById("username-mobile");

// 2. Exibe o nome do usuário em ambos, se eles existirem na página
if (nomeUsuario) {
    if (spanUsername) {
        spanUsername.textContent = nomeUsuario;
    }
    if (spanUsernameMobile) {
        spanUsernameMobile.textContent = nomeUsuario;
    }
}

    // 2. Lógica de Restrição e Injeção para o ADMIN
    if (nomeUsuario === "ADMIN") {
        
        // --- REMOVER LINKS INDESEJADOS ---
        // Lista de páginas que o instrutor NÃO deve ver no menu
        const paginasParaRemover = ["Notas", "Campo"];

        const removerLinks = (container) => {
            if (!container) return;
            const links = container.querySelectorAll("a");
            links.forEach(link => {
                // Se o texto do link estiver na nossa "lista negra", removemos o elemento
                if (paginasParaRemover.includes(link.textContent.trim())) {
                    link.remove();
                }
            });
        };

        removerLinks(navLinksDesktop);
        removerLinks(mobileMenu);

        // --- INJETAR PAINEL ADMIN ---
        
        // Injetar no Desktop (Lado Direito, ao lado do Ranking)
        if (navLinksDesktop && !navLinksDesktop.querySelector('a[href="admin.html"]')) {
            const linkAdminDesk = document.createElement("a");
            linkAdminDesk.href = "admin.html";
            linkAdminDesk.className = "link-admin-destaque";
            linkAdminDesk.innerHTML = '<i class="fa-solid fa-user-shield"></i> Painel';
            navLinksDesktop.append(linkAdminDesk);
        }

        // Injetar no Mobile (Topo da lista)
        if (mobileMenu && !mobileMenu.querySelector('a[href="admin.html"]')) {
            const linkAdminMob = document.createElement("a");
            linkAdminMob.href = "admin.html";
            linkAdminMob.className = "link-admin-destaque";
            linkAdminMob.innerHTML = '<i class="fa-solid fa-user-shield"></i> Painel Admin';
            mobileMenu.prepend(linkAdminMob);
        }
    }
});


/* MENU MOBILE */
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});

menuToggle.addEventListener('click', () => {
    // Alterna a classe 'active' no botão para disparar o CSS do X
    menuToggle.classList.toggle('active');
    
    // Aqui você também pode abrir/fechar seu menu lateral
    // const meuMenu = document.getElementById('navMenu');
    // meuMenu.classList.toggle('open');
});

async function carregarDistintivosHeader() {
    const meuId = localStorage.getItem("usuarioLogado");
    
    // Identifica os dois containers (Desktop e Mobile)
    const containerDesktop = document.getElementById("user-badges-header");
    const containerMobile = document.getElementById("user-badges-mobile");
    const containers = [containerDesktop, containerMobile];

    if (!meuId) return;

    // Busca dados no Supabase
    const { data, error } = await window.supabaseClient
        .from("notas")
        .select("usuario_id, media_geral, dados");

    if (error || !data || data.length === 0) return;

    // Limpa os containers antes de preencher
    containers.forEach(c => { if(c) c.innerHTML = ""; });

    // --- FUNÇÃO AUXILIAR PARA O PAPIRO ---
    const calcularPapiro = (item) => {
        const mats = ["tec", "fund", "ciber", "empre", "pt", "racio"];
        let soma = 0, qtd = 0;
        mats.forEach(m => {
            let n = parseFloat(item.dados?.[`media-${m}`]);
            if(!isNaN(n) && n > 0){ soma += n; qtd++; }
        });
        return qtd > 0 ? soma / qtd : 0;
    };

    // --- LÓGICA DE IDENTIFICAÇÃO (CONSIDERANDO EMPATES E NOTA > 0) ---

    // 1. 01 CCom (Geral)
    const listaGeral = data.filter(i => (i.media_geral || 0) > 0).sort((a,b) => b.media_geral - a.media_geral);
    const maxGeral = listaGeral.length > 0 ? listaGeral[0].media_geral : -1;
    const sou01Geral = listaGeral.some(i => i.usuario_id === meuId && i.media_geral === maxGeral);

    // 2. Caçador (Tiro)
    const listaTiro = data.filter(i => (parseFloat(i.dados?.['media-tiro']) || 0) > 0)
                          .sort((a,b) => parseFloat(b.dados['media-tiro']) - parseFloat(a.dados['media-tiro']));
    const maxTiro = listaTiro.length > 0 ? parseFloat(listaTiro[0].dados['media-tiro']) : -1;
    const souCacador = listaTiro.some(i => i.usuario_id === meuId && parseFloat(i.dados['media-tiro']) === maxTiro);

    // 3. Calção Preto (TFM)
    const listaTfm = data.filter(i => (parseFloat(i.dados?.['media-tfm']) || 0) > 0)
                         .sort((a,b) => parseFloat(b.dados['media-tfm']) - parseFloat(a.dados['media-tfm']));
    const maxTfm = listaTfm.length > 0 ? parseFloat(listaTfm[0].dados['media-tfm']) : -1;
    const souCalcaoPreto = listaTfm.some(i => i.usuario_id === meuId && parseFloat(i.dados['media-tfm']) === maxTfm);

    // 4. Papirão (Papiro)
    const listaPapiro = data.map(i => ({ uid: i.usuario_id, nota: calcularPapiro(i) }))
                            .filter(i => i.nota > 0)
                            .sort((a,b) => b.nota - a.nota);
    const maxPapiro = listaPapiro.length > 0 ? listaPapiro[0].nota : -1;
    const souPapirao = listaPapiro.some(i => i.uid === meuId && i.nota === maxPapiro);

    // --- INJEÇÃO DO HTML NOS CONTAINERS ---

    const renderizarNoHeader = (html) => {
        containers.forEach(c => { if(c) c.innerHTML += html; });
    };

    if (sou01Geral) {
        renderizarNoHeader('<span class="badge-pill elite"><i class="fa-solid fa-trophy"></i>01 CCom</span>');
    }
    if (souCacador) {
        renderizarNoHeader('<span class="badge-pill cacador"><i class="fa-solid fa-crosshairs"></i>Caçador</span>');
    }
    if (souCalcaoPreto) {
        renderizarNoHeader('<span class="badge-pill guerreiro"><i class="fa-solid fa-person-running"></i>Calção Preto</span>');
    }
    if (souPapirao) {
        renderizarNoHeader('<span class="badge-pill mestre"><i class="fa-solid fa-book-open"></i>Papirão</span>');
    }
}

// Chame a função dentro do seu DOMContentLoaded existente
document.addEventListener("DOMContentLoaded", () => {
    // ... suas outras funções (configurarMediaMobile, carregarNotasDoUsuario, etc)
    carregarDistintivosHeader(); 
}); 
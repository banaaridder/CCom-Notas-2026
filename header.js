document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const spanUsername = document.getElementById("username");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinksDesktop = document.querySelector(".nav-links");

    // 1. Exibe o nome do usuário
    if (nomeUsuario && spanUsername) {
        spanUsername.textContent = nomeUsuario;
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
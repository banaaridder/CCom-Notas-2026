document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    const spanUsername = document.getElementById("username");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinksDesktop = document.querySelector(".nav-links");

    // 1. Exibe o nome do usuário no Desktop
    if (nomeUsuario && spanUsername) {
        spanUsername.textContent = nomeUsuario;
    }

    // 2. Lógica para Injetar o Painel se for ADMIN
    if (nomeUsuario === "ADMIN") {
        
        // Injetar no Desktop
        if (navLinksDesktop && !navLinksDesktop.querySelector('a[href="admin.html"]')) {
            const linkAdminDesk = document.createElement("a");
            linkAdminDesk.href = "admin.html";
            linkAdminDesk.className = "link-admin-destaque"; // Aplicando a classe
            linkAdminDesk.innerHTML = '<i class="fa-solid fa-user-shield"></i> Painel';
            navLinksDesktop.prepend(linkAdminDesk);
        }

        // Injetar no Mobile
        if (mobileMenu && !mobileMenu.querySelector('a[href="admin.html"]')) {
            const linkAdminMob = document.createElement("a");
            linkAdminMob.href = "admin.html";
            linkAdminMob.className = "link-admin-destaque"; // Aplicando a classe
            linkAdminMob.innerHTML = '<i class="fa-solid fa-user-shield"></i> Painel Admin';
            mobileMenu.prepend(linkAdminMob);
        }
    }
});

document.getElementById("username").addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
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
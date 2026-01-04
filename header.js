document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    if (!nomeUsuario) return;

    const username = document.getElementById("username");
    const usernameMobile = document.getElementById("username-mobile");

    if (username) {
        username.textContent = nomeUsuario;
    }

    if (usernameMobile) {
        usernameMobile.textContent = nomeUsuario;
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
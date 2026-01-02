document.addEventListener("DOMContentLoaded", () => {
    const nomeUsuario = localStorage.getItem("nomeUsuario");


    if (!usuarioLogado) return;

    const username = document.getElementById("username");
    const usernameMobile = document.getElementById("username-mobile");

    if (username) {
        username.textContent = usuarioLogado;
    }

    if (usernameMobile) {
        usernameMobile.textContent = usuarioLogado;
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


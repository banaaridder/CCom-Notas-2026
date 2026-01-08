// auth.js corrigido
document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    const nome = (localStorage.getItem("nomeUsuario") || "").toUpperCase().trim();

    // Se não tiver ID, manda para o login
    if (!usuarioLogado) {
        window.location.href = "login.html";
        return;
    }

    // Se o cara for ADMIN ou DAVI COSTA e estiver na index.html, 
    // talvez você queira que ele seja redirecionado para o painel de controle?
    // Se sim, descomente as linhas abaixo:
    /*
    const admins = ["ADMIN", "DAVI COSTA"];
    if (admins.includes(nome) && window.location.pathname.includes("index.html")) {
        window.location.href = "admin.html";
    }
    */
});
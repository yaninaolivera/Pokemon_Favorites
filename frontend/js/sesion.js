function cerrar_sesion() {
    if (window.confirm("¿Estás seguro de cerrar sesión?")) {
        let localStorage = window.localStorage;
        localStorage.removeItem('id_user');
        window.location.href = "login.html"
    }
}
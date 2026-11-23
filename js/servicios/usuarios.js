// Servicio para gestionar usuarios
// Obtener usuarios guardados
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}
// Guardar usuarios
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
// Crear usuario administrador inicial
function crearAdministrador() {
    let usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        let administrador = {
            identificacion: "1001",
            nombre: "Administrador",
            correo: "admin@acmeschool.com",
            telefono: "3000000000",
            rol: "Administrativo",
            contrasena: "Admin123"
        };
        usuarios.push(administrador);
        guardarUsuarios(usuarios);
    }
}
// Guardar sesión del usuario
function iniciarSesion(usuario) {
    localStorage.setItem("sesion", JSON.stringify({
        identificacion: usuario.identificacion,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
    }));
}
// Obtener sesión activa
function obtenerSesion() {
    return JSON.parse(localStorage.getItem("sesion"));
}
// Cerrar sesión del usuario
function cerrarSesion() {
    localStorage.removeItem("sesion");
}
// Exportar funciones
export {
    obtenerUsuarios,
    guardarUsuarios,
    crearAdministrador,
    iniciarSesion,
    obtenerSesion,
    cerrarSesion
};
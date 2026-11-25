// Componente de inicio de sesión
import {
    obtenerUsuarios,
    iniciarSesion,
    obtenerSesion
} from "../servicios/usuarios.js";
class InicioSesion extends HTMLElement {
    connectedCallback() {
        this.actualizarVista();
        window.addEventListener("sesion-actualizada", () => {
            this.actualizarVista();
        });
    }
    // Mostrar formulario únicamente si no existe una sesión
    actualizarVista() {
        const sesion = obtenerSesion();
        if (sesion) {
            this.innerHTML = "";
            return;
        }
        this.innerHTML = `
            <section class="contenedor-sesion">
                <div class="tarjeta-sesion">
                    <h2>Iniciar sesión</h2>
                    <p>Ingresa tus datos para acceder a la plataforma.</p>
                    <form id="formulario-sesion">
                        <label for="correo">Correo electrónico</label>
                        <input
                            type="email"
                            id="correo"
                            placeholder="Ingresa tu correo"
                            autocomplete="username"
                            required
                        >
                        <label for="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            placeholder="Ingresa tu contraseña"
                            autocomplete="current-password"
                            required
                        >
                        <button type="submit">Ingresar</button>
                    </form>
                    <p id="mensaje-sesion"></p>
                </div>
            </section>
        `;
        this.configurarFormulario();
    }
    // Validar los datos del usuario
    configurarFormulario() {
        const formulario = this.querySelector("#formulario-sesion");
        const mensaje = this.querySelector("#mensaje-sesion");
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const correo = this.querySelector("#correo").value.trim();
            const contrasena = this.querySelector("#contrasena").value;
            const usuarios = obtenerUsuarios();
            const usuarioEncontrado = usuarios.find((usuario) => {
                return usuario.correo === correo &&
                    usuario.contrasena === contrasena;
            });
            if (usuarioEncontrado) {
                iniciarSesion(usuarioEncontrado);
                // Actualizar los componentes de la aplicación
                window.dispatchEvent(new Event("sesion-actualizada"));
            } else {
                mensaje.textContent = "Correo o contraseña incorrectos.";
                mensaje.style.color = "red";
            }
        });
    }
}
// Registrar componente
customElements.define("inicio-sesion", InicioSesion);

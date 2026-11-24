// Componente de inicio de sesión
import {
    obtenerUsuarios,
    iniciarSesion
} from "../servicios/usuarios.js";
class InicioSesion extends HTMLElement {
    connectedCallback() {
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
                            required
                        >
                        <label for="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            placeholder="Ingresa tu contraseña"
                            required
                        >
                        <button type="submit">Ingresar</button>
                    </form>
                    <p id="mensaje-sesion"></p>
                    <button type="button" id="boton-cerrar-sesion">
                        Cerrar sesión
                    </button>
                </div>
            </section>
        `;
        this.configurarFormulario();
    }
    configurarFormulario() {
        const formulario = this.querySelector("#formulario-sesion");
        const mensaje = this.querySelector("#mensaje-sesion");
        const botonCerrar = this.querySelector("#boton-cerrar-sesion");
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const correo = this.querySelector("#correo").value;
            const contrasena = this.querySelector("#contrasena").value;
            const usuarios = obtenerUsuarios();
            const usuarioEncontrado = usuarios.find((usuario) => {
                return usuario.correo === correo &&
                    usuario.contrasena === contrasena;
            });
            if (usuarioEncontrado) {
                iniciarSesion(usuarioEncontrado);
                window.dispatchEvent(new Event("sesion-actualizada"));
                mensaje.textContent = "¡Bienvenido a Acme School!";
                mensaje.style.color = "green";
                formulario.style.display = "none";
                botonCerrar.style.display = "block";
            } else {
                mensaje.textContent = "Correo o contraseña incorrectos.";
                mensaje.style.color = "red";
            }
        });
        // Evento para cerrar sesión
        botonCerrar.addEventListener("click", () => {
            localStorage.removeItem("sesion");
            // Limpiar los campos del formulario
            formulario.reset();
            // Mostrar nuevamente el formulario
            formulario.style.display = "flex";
            // Ocultar el botón de cerrar sesión
            botonCerrar.style.display = "none";
            // Actualizar la navegación
            window.dispatchEvent(new Event("sesion-actualizada"));
            mensaje.textContent = "Sesión cerrada correctamente.";
            mensaje.style.color = "green";
        });
    }
}
// Registrar componente
customElements.define("inicio-sesion", InicioSesion);

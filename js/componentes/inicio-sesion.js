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
                </div>
            </section>
        `;
        this.configurarFormulario();
    }
    configurarFormulario() {
        const formulario = this.querySelector("#formulario-sesion");
        const mensaje = this.querySelector("#mensaje-sesion");
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
                mensaje.textContent = "¡Bienvenido a Acme School!";
                mensaje.style.color = "green";
                console.log("Usuario autenticado:", usuarioEncontrado);
            } else {
                mensaje.textContent = "Correo o contraseña incorrectos.";
                mensaje.style.color = "red";
            }
        });
    }
}
// Registrar componente
customElements.define("inicio-sesion", InicioSesion);
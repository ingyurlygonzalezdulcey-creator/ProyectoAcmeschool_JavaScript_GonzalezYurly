// Componente de inicio de sesión
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
                        <button type="submit">
                            Ingresar
                        </button>
                    </form>
                    <p id="mensaje-sesion"></p>
                </div>
            </section>
        `;
    }
}
customElements.define("inicio-sesion", InicioSesion);
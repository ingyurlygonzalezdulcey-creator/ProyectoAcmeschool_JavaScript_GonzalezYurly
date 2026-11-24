// Componente para gestionar usuarios
import {
    obtenerSesion,
    obtenerUsuarios,
    guardarUsuarios
} from "../servicios/usuarios.js";
class GestionUsuarios extends HTMLElement {
    connectedCallback() {
        this.actualizarVista();
        window.addEventListener("sesion-actualizada", () => {
            this.actualizarVista();
        });
    }
    actualizarVista() {
        const sesion = obtenerSesion();
        if (!sesion) {
            this.innerHTML = "";
            return;
        }
        this.innerHTML = `
            <section class="gestion-usuarios">
                <div class="contenido-usuarios">
                    <h2>Gestión de usuarios</h2>
                    <p>
                        Registra, consulta y administra los usuarios
                        de la plataforma Acme School.
                    </p>
                    <div class="tarjeta-usuarios">
                        <h3>Registrar usuario</h3>
                        <form id="formulario-usuarios">
                            <label for="identificacion">Identificación</label>
                            <input type="text" id="identificacion" required>
                            <label for="nombre">Nombre completo</label>
                            <input type="text" id="nombre" required>
                            <label for="correo-usuario">Correo electrónico</label>
                            <input type="email" id="correo-usuario" required>
                            <label for="telefono">Teléfono</label>
                            <input type="tel" id="telefono" required>
                            <label for="rol">Rol</label>
                            <select id="rol" required>
                                <option value="">Selecciona un rol</option>
                                <option value="Administrativo">Administrativo</option>
                                <option value="Docente">Docente</option>
                            </select>
                            <label for="contrasena-usuario">Contraseña</label>
                            <input type="password" id="contrasena-usuario" required>
                            <button type="submit">Guardar usuario</button>
                        </form>
                    </div>
                    <div class="tabla-usuarios">
                        <h3>Usuarios registrados</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Identificación</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Teléfono</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="lista-usuarios"></tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
        const formulario = this.querySelector("#formulario-usuarios");
        formulario.addEventListener("submit", (evento) => {
            this.registrarUsuario(evento);
        });
        this.mostrarUsuarios();
    }
    // Función para registrar usuarios
    registrarUsuario(evento) {
        evento.preventDefault();
        const identificacion = this.querySelector("#identificacion").value;
        const nombre = this.querySelector("#nombre").value;
        const correo = this.querySelector("#correo-usuario").value;
        const telefono = this.querySelector("#telefono").value;
        const rol = this.querySelector("#rol").value;
        const contrasena = this.querySelector("#contrasena-usuario").value;
        let usuarios = obtenerUsuarios();
        const usuarioExiste = usuarios.find((usuario) => {
            return usuario.identificacion === identificacion ||
                usuario.correo === correo;
        });
        if (usuarioExiste) {
            alert("Ya existe un usuario con esa identificación o correo.");
        } else {
            const nuevoUsuario = {
                identificacion: identificacion,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                rol: rol,
                contrasena: contrasena
            };
            usuarios.push(nuevoUsuario);
            guardarUsuarios(usuarios);
            this.mostrarUsuarios();
            alert("Usuario registrado correctamente.");
            this.querySelector("#formulario-usuarios").reset();
        }
    }
    // Función para mostrar los usuarios registrados
    mostrarUsuarios() {
        const usuarios = obtenerUsuarios();
        const lista = this.querySelector("#lista-usuarios");
        lista.innerHTML = "";
        usuarios.forEach((usuario) => {
            lista.innerHTML += `
                <tr>
                    <td>${usuario.identificacion}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.rol}</td>
                    <td>Registrado</td>
                </tr>
            `;
        });
    }
}
// Registrar componente
customElements.define("gestion-usuarios", GestionUsuarios);
// Componente de navegación de Acme School
import {
    obtenerSesion,
    cerrarSesion
} from "../servicios/usuarios.js";
class NavegacionAplicacion extends HTMLElement {
    connectedCallback() {
        this.actualizarNavegacion();
        window.addEventListener("sesion-actualizada", () => {
            this.actualizarNavegacion();
            this.mostrarVista("inicio");
        });
        this.mostrarVista("inicio");
    }
    // Actualizar menú según la sesión
    actualizarNavegacion() {
        const sesion = obtenerSesion();
        this.innerHTML = `
            <nav class="navegacion">
                <ul class="lista-navegacion">
                    <li>
                        <a href="#" data-vista="inicio">Inicio</a>
                    </li>
                    ${sesion ? `
                        <li>
                            <a href="#" data-vista="usuarios">Usuarios</a>
                        </li>
                        <li>
                            <a href="#" data-vista="examenes">Exámenes</a>
                        </li>
                        <li>
                            <a href="#" data-vista="resultados">Resultados</a>
                        </li>
                    ` : ""}
                    <li>
                        <a href="#" data-vista="resolver">Resolver examen</a>
                    </li>
                    ${sesion ? `
                        <li>
                            <a href="#" id="cerrar-sesion">Cerrar sesión</a>
                        </li>
                    ` : `
                        <li>
                            <a href="#" data-vista="sesion">Iniciar sesión</a>
                        </li>
                    `}
                </ul>
            </nav>
        `;
        // Activar enlaces del menú
        const enlaces = this.querySelectorAll("[data-vista]");
        enlaces.forEach((enlace) => {
            enlace.addEventListener("click", (evento) => {
                evento.preventDefault();
                this.mostrarVista(enlace.dataset.vista);
            });
        });
        // Activar opción para cerrar sesión
        const botonCerrar = this.querySelector("#cerrar-sesion");
        if (botonCerrar) {
            botonCerrar.addEventListener("click", (evento) => {
                evento.preventDefault();
                cerrarSesion();
                window.dispatchEvent(
                    new Event("sesion-actualizada")
                );
            });
        }
    }
    // Mostrar únicamente el módulo seleccionado
    mostrarVista(vista) {
        // Evitar cambiar de vista durante un examen
        const resolver = document.querySelector("resolver-examen");
        if (resolver && resolver.querySelector("#formulario-respuestas")
            && !resolver.examenFinalizado) {
            if (vista !== "resolver") {
                alert("Debes terminar el examen antes de cambiar de módulo.");
            }
            return;
        }
        const sesion = obtenerSesion();
        const vistas = {
            inicio: "inicio-aplicacion",
            sesion: "inicio-sesion",
            usuarios: "gestion-usuarios",
            examenes: "gestion-examenes",
            resultados: "gestion-resultados",
            resolver: "resolver-examen"
        };
        // Proteger los módulos privados
        if (!sesion && ["usuarios", "examenes", "resultados"].includes(vista)) {
            vista = "inicio";
        }
        // Evitar mostrar el formulario si existe una sesión
        if (sesion && vista === "sesion") {
            vista = "inicio";
        }
        // Ocultar todos los módulos
        Object.values(vistas).forEach((selector) => {
            const componente = document.querySelector(selector);
            if (componente) {
                componente.style.display = "none";
            }
        });
        // Mostrar el módulo seleccionado
        const componente = document.querySelector(vistas[vista]);
        if (componente) {
            componente.style.display = "block";
            // Actualizar los exámenes disponibles
            if (vista === "resolver") {
                componente.mostrarExamenes();
            }
        }
        // Marcar el enlace seleccionado
        const enlaces = this.querySelectorAll("[data-vista]");
        enlaces.forEach((enlace) => {
            enlace.classList.toggle(
                "activo",
                enlace.dataset.vista === vista
            );
        });
    }
}
// Registrar componente
customElements.define("navegacion-aplicacion", NavegacionAplicacion);
// Componente de navegación de Acme School
import { obtenerSesion } from "../servicios/usuarios.js";
class NavegacionAplicacion extends HTMLElement {
    connectedCallback() {
        this.actualizarNavegacion();
        window.addEventListener("sesion-actualizada", () => {
            this.actualizarNavegacion();
        });
    }
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
                    ` : ""}
                    <li>
                        <a href="#" data-vista="resolver">Resolver examen</a>
                    </li>
                </ul>
            </nav>
        `;
    }
}
customElements.define("navegacion-aplicacion", NavegacionAplicacion);

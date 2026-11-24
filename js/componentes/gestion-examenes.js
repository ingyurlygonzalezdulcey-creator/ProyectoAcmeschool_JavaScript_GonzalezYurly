// Componente para gestionar exámenes
import {
    obtenerSesion
} from "../servicios/usuarios.js";
import {
    obtenerExamenes,
    guardarExamenes
} from "../servicios/examenes.js";
class GestionExamenes extends HTMLElement {
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
            <section class="gestion-examenes">
                <div class="contenido-examenes">
                    <h2>Gestión de exámenes</h2>
                    <p>
                        Registra, consulta y administra los exámenes
                        de la plataforma Acme School.
                    </p>
                    <div class="tarjeta-examenes">
                        <h3>Registrar examen</h3>
                        <form id="formulario-examenes">
                            <label for="codigo-examen">Código del examen</label>
                            <input type="text" id="codigo-examen" required>
                            <label for="titulo-examen">Título del examen</label>
                            <input type="text" id="titulo-examen" required>
                            <label for="duracion-examen">Duración en minutos</label>
                            <input type="number" id="duracion-examen" min="1" required>
                            <label for="porcentaje-examen">Porcentaje mínimo para aprobar</label>
                            <input type="number" id="porcentaje-examen" min="1" max="100" required>
                            <label for="descripcion-examen">Descripción</label>
                            <textarea id="descripcion-examen" required></textarea>
                            <button type="submit" id="boton-guardar-examen">
                                Guardar examen
                            </button>
                        </form>
                    </div>
                    <div class="tabla-examenes">
                        <h3>Exámenes registrados</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Título</th>
                                    <th>Duración</th>
                                    <th>Porcentaje</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="lista-examenes"></tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
        // Activar el formulario de exámenes
        const formulario = this.querySelector("#formulario-examenes");
        formulario.addEventListener("submit", (evento) => {
            this.registrarExamen(evento);
        });
        // Mostrar los exámenes registrados
        this.mostrarExamenes();
    }
}
// Registrar componente
customElements.define("gestion-examenes", GestionExamenes);
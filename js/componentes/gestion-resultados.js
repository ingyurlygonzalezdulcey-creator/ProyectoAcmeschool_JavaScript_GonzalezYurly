// Componente para gestionar los resultados de los exámenes
import { obtenerSesion } from "../servicios/usuarios.js";
import {
    obtenerResultados,
    guardarResultados
} from "../servicios/resultados.js";
class GestionResultados extends HTMLElement {
    connectedCallback() {
        this.actualizarVista();
        window.addEventListener("sesion-actualizada", () => {
            this.actualizarVista();
        });
    }
    // Mostrar módulo únicamente si existe una sesión
    actualizarVista() {
        const sesion = obtenerSesion();
        if (!sesion) {
            this.innerHTML = "";
            return;
        }
        this.innerHTML = `
            <section class="gestion-resultados">
                <div class="contenido-resultados">
                    <h2>Gestión de resultados</h2>
                    <p>
                        Consulta y administra los resultados de los estudiantes
                        que han presentado exámenes.
                    </p>
                    <div class="tarjeta-resultados">
                        <h3>Historial de resultados</h3>
                        <button type="button" id="actualizar-resultados">
                            Actualizar resultados
                        </button>
                        <div class="tabla-contenedor">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Identificación</th>
                                        <th>Estudiante</th>
                                        <th>Código</th>
                                        <th>Examen</th>
                                        <th>Fecha</th>
                                        <th>Respuestas correctas</th>
                                        <th>Porcentaje</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="lista-resultados">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.mostrarResultados();
        const botonActualizar = this.querySelector("#actualizar-resultados");
        botonActualizar.addEventListener("click", () => {
            this.mostrarResultados();
        });
    }
    // Mostrar resultados almacenados
    mostrarResultados() {
        const resultados = obtenerResultados();
        const lista = this.querySelector("#lista-resultados");
        lista.innerHTML = "";
        if (resultados.length === 0) {
            lista.innerHTML = `
                <tr>
                    <td colspan="9">
                        No hay resultados registrados.
                    </td>
                </tr>
            `;
            return;
        }
        resultados.forEach((resultado, indice) => {
            const fila = document.createElement("tr");
            const datos = [
                resultado.identificacion,
                resultado.nombre,
                resultado.codigoExamen,
                resultado.tituloExamen,
                resultado.fecha,
                resultado.respuestasCorrectas + " de " + resultado.totalPreguntas,
                resultado.porcentaje + "%",
                resultado.estado
            ];
            datos.forEach((dato) => {
                const celda = document.createElement("td");
                celda.textContent = dato;
                fila.appendChild(celda);
            });
            // Crear celda de acciones
            const celdaAcciones = document.createElement("td");
            // Crear botón para eliminar resultado
            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("boton-eliminar-resultado");
            botonEliminar.addEventListener("click", () => {
                this.eliminarResultado(indice);
            });
            celdaAcciones.appendChild(botonEliminar);
            fila.appendChild(celdaAcciones);
            lista.appendChild(fila);
        });
    }
    // Eliminar un resultado almacenado
    eliminarResultado(indice) {
        if (!obtenerSesion()) {
            return;
        }
        const confirmar = confirm(
            "¿Estás seguro de eliminar este resultado?"
        );
        if (!confirmar) {
            return;
        }
        const resultados = obtenerResultados();
        // Eliminar únicamente el resultado seleccionado
        resultados.splice(indice, 1);
        // Actualizar LocalStorage
        guardarResultados(resultados);
        // Actualizar tabla de resultados
        this.mostrarResultados();
    }
}
// Registrar componente
customElements.define("gestion-resultados", GestionResultados);
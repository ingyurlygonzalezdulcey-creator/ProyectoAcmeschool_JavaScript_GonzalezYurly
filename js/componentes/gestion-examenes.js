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
                        <form id="formulario-examenes" autocomplete="off">
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
                            <button type="button" id="boton-cancelar-examen" style="display: none;">
                                Cancelar edición
                            </button>
                        </form>
                    </div>
                    <div class="tarjeta-preguntas">
                        <h3>Preguntas del examen</h3>
                        <label for="examen-seleccionado">Seleccionar examen</label>
                        <select id="examen-seleccionado" required>
                            <option value="">Selecciona un examen</option>
                        </select>
                        <label for="pregunta-examen">Enunciado de la pregunta</label>
                        <textarea id="pregunta-examen"></textarea>
                        <label for="respuesta-1">Respuesta 1</label>
                        <input type="text" id="respuesta-1">
                        <label for="respuesta-2">Respuesta 2</label>
                        <input type="text" id="respuesta-2">
                        <label for="respuesta-3">Respuesta 3</label>
                        <input type="text" id="respuesta-3">
                        <label for="respuesta-4">Respuesta 4</label>
                        <input type="text" id="respuesta-4">
                        <label for="respuesta-correcta">Respuesta correcta</label>
                        <select id="respuesta-correcta">
                            <option value="">Selecciona la correcta</option>
                            <option value="0">Respuesta 1</option>
                            <option value="1">Respuesta 2</option>
                            <option value="2">Respuesta 3</option>
                            <option value="3">Respuesta 4</option>
                        </select>
                        <label for="descripcion-respuesta">Explicación de la respuesta</label>
                        <textarea id="descripcion-respuesta"></textarea>
                        <button type="button" id="boton-agregar-pregunta">
                            Agregar pregunta
                        </button>
                    </div>
                    <div class="lista-preguntas">
                        <h3>Preguntas registradas</h3>
                        <div id="preguntas-registradas">
                            Selecciona un examen para ver sus preguntas.
                        </div>
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
        // Activar formulario para registrar exámenes
        const formulario = this.querySelector("#formulario-examenes");
        formulario.addEventListener("submit", (evento) => {
            this.registrarExamen(evento);
        });
        // Activar botón para cancelar edición
        const botonCancelar = this.querySelector("#boton-cancelar-examen");
        botonCancelar.addEventListener("click", () => {
            formulario.reset();
            this.querySelector("#codigo-examen").disabled = false;
            this.querySelector("#boton-guardar-examen").textContent = "Guardar examen";
            botonCancelar.style.display = "none";
        });
        // Mostrar exámenes registrados
        this.mostrarExamenes();
        // Cargar exámenes en el selector
        this.cargarExamenesEnSelector();
        // Mostrar preguntas cuando se seleccione un examen
        const selector = this.querySelector("#examen-seleccionado");
        selector.addEventListener("change", () => {
            this.mostrarPreguntas();
        });
        // Activar botón para agregar preguntas
        const botonAgregarPregunta = this.querySelector("#boton-agregar-pregunta");
        botonAgregarPregunta.addEventListener("click", () => {
            this.agregarPregunta();
        });
    }
    // Cargar los exámenes en el selector
    cargarExamenesEnSelector() {
        const examenes = obtenerExamenes();
        const selector = this.querySelector("#examen-seleccionado");
        selector.innerHTML = `
            <option value="">Selecciona un examen</option>
        `;
        examenes.forEach((examen) => {
            selector.innerHTML += `
                <option value="${examen.codigo}">
                    ${examen.codigo} - ${examen.titulo}
                </option>
            `;
        });
    }
    // Agregar preguntas a un examen
    agregarPregunta() {
        const codigo = this.querySelector("#examen-seleccionado").value;
        const pregunta = this.querySelector("#pregunta-examen").value.trim();
        const respuesta1 = this.querySelector("#respuesta-1").value.trim();
        const respuesta2 = this.querySelector("#respuesta-2").value.trim();
        const respuesta3 = this.querySelector("#respuesta-3").value.trim();
        const respuesta4 = this.querySelector("#respuesta-4").value.trim();
        const respuestaCorrecta = this.querySelector("#respuesta-correcta").value;
        const descripcion = this.querySelector("#descripcion-respuesta").value.trim();
        if (!codigo || !pregunta || !respuesta1 || !respuesta2 ||
            !respuesta3 || !respuesta4 || respuestaCorrecta === "" || !descripcion) {
            alert("Completa todos los campos de la pregunta.");
            return;
        }
        let examenes = obtenerExamenes();
        const examenEncontrado = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (!examenEncontrado) {
            alert("Selecciona un examen válido.");
            return;
        }
        const nuevaPregunta = {
            enunciado: pregunta,
            respuestas: [
                respuesta1,
                respuesta2,
                respuesta3,
                respuesta4
            ],
            respuestaCorrecta: Number(respuestaCorrecta),
            descripcion: descripcion
        };
        examenEncontrado.preguntas.push(nuevaPregunta);
        guardarExamenes(examenes);
        // Limpiar los campos de la pregunta
        this.querySelector("#pregunta-examen").value = "";
        this.querySelector("#respuesta-1").value = "";
        this.querySelector("#respuesta-2").value = "";
        this.querySelector("#respuesta-3").value = "";
        this.querySelector("#respuesta-4").value = "";
        this.querySelector("#respuesta-correcta").value = "";
        this.querySelector("#descripcion-respuesta").value = "";
        // Actualizar la lista de preguntas
        this.mostrarPreguntas();
        alert("Pregunta agregada correctamente.");
    }
    // Mostrar las preguntas del examen seleccionado
    mostrarPreguntas() {
        const codigo = this.querySelector("#examen-seleccionado").value;
        const contenedor = this.querySelector("#preguntas-registradas");
        const examenes = obtenerExamenes();
        const examenEncontrado = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (!examenEncontrado) {
            contenedor.innerHTML = "Selecciona un examen para ver sus preguntas.";
            return;
        }
        if (examenEncontrado.preguntas.length === 0) {
            contenedor.innerHTML = "Este examen todavía no tiene preguntas.";
            return;
        }
        contenedor.innerHTML = "";
        examenEncontrado.preguntas.forEach((pregunta, indice) => {
            contenedor.innerHTML += `
                <div class="pregunta-registrada">
                    <h4>Pregunta ${indice + 1}</h4>
                    <p>${pregunta.enunciado}</p>
                    <ul>
                        ${pregunta.respuestas.map((respuesta, posicion) => `
                            <li>
                                ${respuesta}
                                ${posicion === pregunta.respuestaCorrecta ? "(Correcta)" : ""}
                            </li>
                        `).join("")}
                    </ul>
                    <p>
                        <strong>Explicación:</strong>
                        ${pregunta.descripcion}
                    </p>
                    <button
                        type="button"
                        class="boton-eliminar-pregunta"
                        data-indice="${indice}">
                        Eliminar pregunta
                    </button>
                </div>
            `;
        });
        // Activar botones para eliminar preguntas
        const botonesEliminar = contenedor.querySelectorAll(".boton-eliminar-pregunta");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const indice = Number(boton.getAttribute("data-indice"));
                this.eliminarPregunta(codigo, indice);
            });
        });
    }
    // Eliminar una pregunta
    eliminarPregunta(codigo, indice) {
        let examenes = obtenerExamenes();
        const examenEncontrado = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (examenEncontrado) {
            const confirmar = confirm("¿Deseas eliminar esta pregunta?");
            if (confirmar) {
                examenEncontrado.preguntas.splice(indice, 1);
                guardarExamenes(examenes);
                this.mostrarPreguntas();
                alert("Pregunta eliminada correctamente.");
            }
        }
    }
    // Registrar o actualizar exámenes
    registrarExamen(evento) {
        evento.preventDefault();
        const codigo = this.querySelector("#codigo-examen").value.trim();
        // Comprobar si se está editando un examen
        if (this.querySelector("#codigo-examen").disabled) {
            this.actualizarExamen(codigo);
            return;
        }
        const titulo = this.querySelector("#titulo-examen").value.trim();
        const duracion = Number(this.querySelector("#duracion-examen").value);
        const porcentaje = Number(this.querySelector("#porcentaje-examen").value);
        const descripcion = this.querySelector("#descripcion-examen").value.trim();
        let examenes = obtenerExamenes();
        const examenExiste = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (examenExiste) {
            alert("Ya existe un examen con ese código.");
        } else {
            const nuevoExamen = {
                codigo: codigo,
                titulo: titulo,
                duracion: duracion,
                porcentaje: porcentaje,
                descripcion: descripcion,
                preguntas: []
            };
            examenes.push(nuevoExamen);
            guardarExamenes(examenes);
            this.mostrarExamenes();
            this.cargarExamenesEnSelector();
            this.querySelector("#formulario-examenes").reset();
            alert("Examen registrado correctamente.");
        }
    }
    // Mostrar exámenes registrados
    mostrarExamenes() {
        const examenes = obtenerExamenes();
        const lista = this.querySelector("#lista-examenes");
        lista.innerHTML = "";
        examenes.forEach((examen) => {
            lista.innerHTML += `
                <tr>
                    <td>${examen.codigo}</td>
                    <td>${examen.titulo}</td>
                    <td>${examen.duracion} minutos</td>
                    <td>${examen.porcentaje}%</td>
                    <td>
                        <button
                            type="button"
                            class="boton-editar-examen"
                            data-codigo="${examen.codigo}">
                            Editar
                        </button>
                        <button
                            type="button"
                            class="boton-eliminar-examen"
                            data-codigo="${examen.codigo}">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
        // Activar botones de edición
        const botonesEditar = this.querySelectorAll(".boton-editar-examen");
        botonesEditar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const codigo = boton.getAttribute("data-codigo");
                this.editarExamen(codigo);
            });
        });
        // Activar botones de eliminación
        const botonesEliminar = this.querySelectorAll(".boton-eliminar-examen");
        botonesEliminar.forEach((boton) => {
            boton.addEventListener("click", () => {
                const codigo = boton.getAttribute("data-codigo");
                this.eliminarExamen(codigo);
            });
        });
    }
    // Cargar datos del examen para editar
    editarExamen(codigo) {
        const examenes = obtenerExamenes();
        const examenEncontrado = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (examenEncontrado) {
            this.querySelector("#codigo-examen").value = examenEncontrado.codigo;
            this.querySelector("#titulo-examen").value = examenEncontrado.titulo;
            this.querySelector("#duracion-examen").value = examenEncontrado.duracion;
            this.querySelector("#porcentaje-examen").value = examenEncontrado.porcentaje;
            this.querySelector("#descripcion-examen").value = examenEncontrado.descripcion;
            this.querySelector("#codigo-examen").disabled = true;
            this.querySelector("#boton-guardar-examen").textContent = "Actualizar examen";
            this.querySelector("#boton-cancelar-examen").style.display = "block";
        }
    }
    // Actualizar examen
    actualizarExamen(codigo) {
        let examenes = obtenerExamenes();
        const titulo = this.querySelector("#titulo-examen").value.trim();
        const duracion = Number(this.querySelector("#duracion-examen").value);
        const porcentaje = Number(this.querySelector("#porcentaje-examen").value);
        const descripcion = this.querySelector("#descripcion-examen").value.trim();
        examenes = examenes.map((examen) => {
            if (examen.codigo === codigo) {
                return {
                    ...examen,
                    titulo: titulo,
                    duracion: duracion,
                    porcentaje: porcentaje,
                    descripcion: descripcion
                };
            }
            return examen;
        });
        guardarExamenes(examenes);
        alert("Examen actualizado correctamente.");
        this.querySelector("#formulario-examenes").reset();
        this.querySelector("#codigo-examen").disabled = false;
        this.querySelector("#boton-guardar-examen").textContent = "Guardar examen";
        this.querySelector("#boton-cancelar-examen").style.display = "none";
        this.mostrarExamenes();
        this.cargarExamenesEnSelector();
    }
    // Eliminar examen
    eliminarExamen(codigo) {
        let examenes = obtenerExamenes();
        const confirmar = confirm("¿Deseas eliminar este examen?");
        if (confirmar) {
            examenes = examenes.filter((examen) => {
                return examen.codigo !== codigo;
            });
            guardarExamenes(examenes);
            this.mostrarExamenes();
            this.cargarExamenesEnSelector();
            this.mostrarPreguntas();
            alert("Examen eliminado correctamente.");
        }
    }
}
// Registrar componente
customElements.define("gestion-examenes", GestionExamenes);

// Componente para resolver exámenes
import { obtenerExamenes } from "../servicios/examenes.js";
import { registrarResultado } from "../servicios/resultados.js";
class ResolverExamen extends HTMLElement {
    connectedCallback() {
        this.temporizador = null;
        this.tiempoRestante = 0;
        this.examenActual = null;
        this.estudiante = null;
        this.mostrarExamenes();
    }
    disconnectedCallback() {
        clearInterval(this.temporizador);
    }
    // Mostrar los exámenes disponibles
    mostrarExamenes() {
        const examenes = obtenerExamenes();
        this.innerHTML = `
            <section class="resolver-examen">
                <div class="contenido-resolver">
                    <h2>Presentar examen</h2>
                    <p>
                        Selecciona un examen para comenzar a responder.
                    </p>
                    <form id="formulario-estudiante">
                        <label for="identificacion-estudiante">
                            Número de identificación
                        </label>
                        <input
                            type="text"
                            id="identificacion-estudiante"
                            required
                        >
                        <label for="nombre-estudiante">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="nombre-estudiante"
                            required
                        >
                        <label for="examen-disponible">
                            Seleccionar examen
                        </label>
                        <select id="examen-disponible" required>
                            <option value="">
                                Selecciona un examen
                            </option>
                            ${examenes.map((examen) => `
                                <option value="${examen.codigo}">
                                    ${examen.titulo}
                                </option>
                            `).join("")}
                        </select>
                        <button type="submit">
                            Comenzar examen
                        </button>
                    </form>
                    <div id="informacion-examen"></div>
                </div>
            </section>
        `;
        // Activar formulario del estudiante
        const formulario = this.querySelector("#formulario-estudiante");
        formulario.addEventListener("submit", (evento) => {
            this.iniciarExamen(evento);
        });
    }
    // Iniciar el examen seleccionado
    iniciarExamen(evento) {
        evento.preventDefault();
        const identificacion = this.querySelector("#identificacion-estudiante").value.trim();
        const nombre = this.querySelector("#nombre-estudiante").value.trim();
        const codigo = this.querySelector("#examen-disponible").value;
        if (!identificacion || !nombre || !codigo) {
            alert("Completa todos los campos para comenzar.");
            return;
        }
        const examenes = obtenerExamenes();
        this.examenActual = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (!this.examenActual) {
            alert("No se encontró el examen seleccionado.");
            return;
        }
        if (!this.examenActual.preguntas || this.examenActual.preguntas.length === 0) {
            alert("Este examen todavía no tiene preguntas.");
            return;
        }
        this.estudiante = {
            identificacion: identificacion,
            nombre: nombre
        };
        this.tiempoRestante = this.examenActual.duracion * 60;
        this.mostrarPreguntas();
        this.iniciarTemporizador();
    }
    // Mostrar las preguntas del examen
    mostrarPreguntas() {
        const examen = this.examenActual;
        this.innerHTML = `
            <section class="resolver-examen">
                <div class="contenido-resolver">
                    <h2>${examen.titulo}</h2>
                    <p>${examen.descripcion}</p>
                    <p>
                        Estudiante: ${this.estudiante.nombre}
                    </p>
                    <p>
                        Identificación: ${this.estudiante.identificacion}
                    </p>
                    <p>
                        Número de preguntas: ${examen.preguntas.length}
                    </p>
                    <p>
                        Porcentaje mínimo para aprobar: ${examen.porcentaje}%
                    </p>
                    <h3 id="tiempo-examen">
                        Tiempo restante: ${this.formatearTiempo()}
                    </h3>
                    <form id="formulario-respuestas">
                        ${examen.preguntas.map((pregunta, indice) => `
                            <div class="pregunta-estudiante">
                                <h3>
                                    Pregunta ${indice + 1}
                                </h3>
                                <p>
                                    ${pregunta.enunciado}
                                </p>
                                ${pregunta.respuestas.map((respuesta, posicion) => `
                                    <label>
                                        <input
                                            type="radio"
                                            name="pregunta-${indice}"
                                            value="${posicion}"
                                        >
                                        ${respuesta}
                                    </label>
                                `).join("")}
                            </div>
                        `).join("")}
                        <button type="submit">
                            Finalizar examen
                        </button>
                    </form>
                </div>
            </section>
        `;
        // Activar botón para finalizar el examen
        const formulario = this.querySelector("#formulario-respuestas");
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.finalizarExamen();
        });
    }
    // Iniciar el temporizador
    iniciarTemporizador() {
        clearInterval(this.temporizador);
        this.temporizador = setInterval(() => {
            this.tiempoRestante--;
            const elementoTiempo = this.querySelector("#tiempo-examen");
            if (elementoTiempo) {
                elementoTiempo.textContent = "Tiempo restante: " + this.formatearTiempo();
            }
            if (this.tiempoRestante <= 0) {
                this.finalizarExamen();
            }
        }, 1000);
    }
    // Mostrar el tiempo en minutos y segundos
    formatearTiempo() {
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        return `${minutos}:${String(segundos).padStart(2, "0")}`;
    }
    // Finalizar examen y guardar resultado
    finalizarExamen() {
        clearInterval(this.temporizador);
        const preguntas = this.examenActual.preguntas;
        let respuestasCorrectas = 0;
        preguntas.forEach((pregunta, indice) => {
            const respuestaSeleccionada = this.querySelector(
                `input[name="pregunta-${indice}"]:checked`
            );
            if (
                respuestaSeleccionada &&
                Number(respuestaSeleccionada.value) === pregunta.respuestaCorrecta
            ) {
                respuestasCorrectas++;
            }
        });
        const totalPreguntas = preguntas.length;
        const porcentaje = Math.round(
            (respuestasCorrectas / totalPreguntas) * 100
        );
        const aprobado = porcentaje >= this.examenActual.porcentaje;
        // Crear objeto con los datos del resultado
        const resultado = {
            identificacion: this.estudiante.identificacion,
            nombre: this.estudiante.nombre,
            codigoExamen: this.examenActual.codigo,
            tituloExamen: this.examenActual.titulo,
            fecha: new Date().toLocaleString("es-CO"),
            respuestasCorrectas: respuestasCorrectas,
            totalPreguntas: totalPreguntas,
            porcentaje: porcentaje,
            estado: aprobado ? "Aprobado" : "Reprobado"
        };
        // Guardar resultado en localStorage
        registrarResultado(resultado);
        // Mostrar resultado al estudiante
        this.mostrarResultado(
            respuestasCorrectas,
            totalPreguntas,
            porcentaje,
            aprobado
        );
    }
    // Mostrar el resultado del examen
    mostrarResultado(
        respuestasCorrectas,
        totalPreguntas,
        porcentaje,
        aprobado
    ) {
        this.innerHTML = `
            <section class="resultado-examen">
                <div class="contenido-resolver">
                    <h2>Resultado del examen</h2>
                    <p>
                        Estudiante: ${this.estudiante.nombre}
                    </p>
                    <p>
                        Identificación: ${this.estudiante.identificacion}
                    </p>
                    <p>
                        Examen: ${this.examenActual.titulo}
                    </p>
                    <p>
                        Respuestas correctas:
                        ${respuestasCorrectas} de ${totalPreguntas}
                    </p>
                    <h3>
                        Porcentaje obtenido: ${porcentaje}%
                    </h3>
                    <h2>
                        ${aprobado ? "¡Examen aprobado!" : "Examen reprobado"}
                    </h2>
                    <button type="button" id="boton-volver-examenes">
                        Volver a los exámenes
                    </button>
                </div>
            </section>
        `;
        // Activar botón para volver a los exámenes
        const botonVolver = this.querySelector("#boton-volver-examenes");
        botonVolver.addEventListener("click", () => {
            this.mostrarExamenes();
        });
    }
}
// Registrar componente
customElements.define("resolver-examen", ResolverExamen);

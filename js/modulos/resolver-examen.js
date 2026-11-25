// Componente para resolver exámenes
import { obtenerExamenes } from "../servicios/examenes.js";
import { registrarResultado } from "../servicios/resultados.js";
class ResolverExamen extends HTMLElement {
    connectedCallback() {
        this.temporizador = null;
        this.tiempoRestante = 0;
        this.examenActual = null;
        this.estudiante = null;
        this.examenFinalizado = false;
        this.mostrarExamenes();
    }
    disconnectedCallback() {
        clearInterval(this.temporizador);
    }
    // Mostrar los exámenes disponibles
    mostrarExamenes() {
        const examenes = obtenerExamenes();
        const disponibles = examenes.filter((examen) => {
            return examen.preguntas && examen.preguntas.length > 0;
        });
        this.innerHTML = `
            <section class="resolver-examen">
                <div class="contenido-resolver">
                    <h2>Exámenes disponibles</h2>
                    <p>
                        Selecciona el examen que deseas presentar.
                    </p>
                    <div class="lista-examenes-disponibles">
                        ${disponibles.length === 0 ? `
                            <p>No hay exámenes disponibles.</p>
                        ` : disponibles.map((examen) => `
                            <div class="tarjeta-examen-disponible">
                                <h3>${examen.titulo}</h3>
                                <p>${examen.descripcion}</p>
                                <p>
                                    <strong>Duración:</strong>
                                    ${examen.duracion} minutos
                                </p>
                                <p>
                                    <strong>Porcentaje de aprobación:</strong>
                                    ${examen.porcentaje}%
                                </p>
                                <p>
                                    <strong>Número de preguntas:</strong>
                                    ${examen.preguntas.length}
                                </p>
                                <button
                                    type="button"
                                    class="boton-seleccionar-examen"
                                    data-codigo="${examen.codigo}">
                                    Seleccionar examen
                                </button>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>
        `;
        // Activar botones para seleccionar exámenes
        const botones = this.querySelectorAll(
            ".boton-seleccionar-examen"
        );
        botones.forEach((boton) => {
            boton.addEventListener("click", () => {
                this.seleccionarExamen(boton.dataset.codigo);
            });
        });
    }
    // Seleccionar un examen
    seleccionarExamen(codigo) {
        const examenes = obtenerExamenes();
        this.examenActual = examenes.find((examen) => {
            return examen.codigo === codigo;
        });
        if (!this.examenActual) {
            alert("No se encontró el examen seleccionado.");
            this.mostrarExamenes();
            return;
        }
        if (!this.examenActual.preguntas ||
            this.examenActual.preguntas.length === 0) {
            alert("Este examen todavía no tiene preguntas.");
            this.mostrarExamenes();
            return;
        }
        this.mostrarFormularioEstudiante();
    }
    // Solicitar los datos del estudiante
    mostrarFormularioEstudiante() {
        this.innerHTML = `
            <section class="resolver-examen">
                <div class="contenido-resolver">
                    <h2>${this.examenActual.titulo}</h2>
                    <p>
                        Ingresa tus datos para comenzar el examen.
                    </p>
                    <form id="formulario-estudiante">
                        <label for="identificacion-estudiante">
                            Número de identificación
                        </label>
                        <input
                            type="text"
                            id="identificacion-estudiante"
                            placeholder="Ingresa tu identificación"
                            required
                        >
                        <label for="nombre-estudiante">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            id="nombre-estudiante"
                            placeholder="Ingresa tu nombre completo"
                            autocomplete="name"
                            required
                        >
                        <button type="submit">
                            Comenzar examen
                        </button>
                        <button
                            type="button"
                            id="boton-volver-lista">
                            Volver a los exámenes
                        </button>
                    </form>
                </div>
            </section>
        `;
        const formulario = this.querySelector(
            "#formulario-estudiante"
        );
        formulario.addEventListener("submit", (evento) => {
            this.iniciarExamen(evento);
        });
        const botonVolver = this.querySelector(
            "#boton-volver-lista"
        );
        botonVolver.addEventListener("click", () => {
            this.mostrarExamenes();
        });
    }
    // Iniciar el examen seleccionado
    iniciarExamen(evento) {
        evento.preventDefault();
        const identificacion = this.querySelector(
            "#identificacion-estudiante"
        ).value.trim();
        const nombre = this.querySelector(
            "#nombre-estudiante"
        ).value.trim();
        if (!identificacion || !nombre) {
            alert("Completa todos los campos.");
            return;
        }
        this.estudiante = {
            identificacion: identificacion,
            nombre: nombre
        };
        this.examenFinalizado = false;
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
                        Identificación:
                        ${this.estudiante.identificacion}
                    </p>
                    <p>
                        Número de preguntas:
                        ${examen.preguntas.length}
                    </p>
                    <p>
                        Porcentaje mínimo para aprobar:
                        ${examen.porcentaje}%
                    </p>
                    <h3 id="tiempo-examen">
                        Tiempo restante: ${this.formatearTiempo()}
                    </h3>
                    <form id="formulario-respuestas">
                        ${examen.preguntas.map((pregunta, indice) => `
                            <div class="pregunta-estudiante">
                                <h3>Pregunta ${indice + 1}</h3>
                                <p>${pregunta.enunciado}</p>
                                ${pregunta.respuestas.map(
                                    (respuesta, posicion) => `
                                        <label>
                                            <input
                                                type="radio"
                                                name="pregunta-${indice}"
                                                value="${posicion}"
                                            >
                                            ${respuesta}
                                        </label>
                                    `
                                ).join("")}
                            </div>
                        `).join("")}
                        <button type="submit">
                            Terminar examen
                        </button>
                    </form>
                </div>
            </section>
        `;
        const formulario = this.querySelector(
            "#formulario-respuestas"
        );
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.finalizarExamen();
        });
    }
    // Iniciar el temporizador
    iniciarTemporizador() {
        clearInterval(this.temporizador);
        const tiempoFinal = Date.now() +
            this.tiempoRestante * 1000;
        this.temporizador = setInterval(() => {
            this.tiempoRestante = Math.max(
                0,
                Math.ceil((tiempoFinal - Date.now()) / 1000)
            );
            const elementoTiempo = this.querySelector(
                "#tiempo-examen"
            );
            if (elementoTiempo) {
                elementoTiempo.textContent =
                    "Tiempo restante: " + this.formatearTiempo();
            }
            if (this.tiempoRestante <= 0) {
                this.finalizarExamen();
            }
        }, 250);
    }
    // Mostrar el tiempo en minutos y segundos
    formatearTiempo() {
        const minutos = Math.floor(this.tiempoRestante / 60);
        const segundos = this.tiempoRestante % 60;
        return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }
    // Finalizar examen y guardar resultado
    finalizarExamen() {
        // Evitar guardar dos veces el mismo intento
        if (this.examenFinalizado) {
            return;
        }
        this.examenFinalizado = true;
        clearInterval(this.temporizador);
        const preguntas = this.examenActual.preguntas;
        let respuestasCorrectas = 0;
        const respuestasEstudiante = [];
        preguntas.forEach((pregunta, indice) => {
            const respuestaSeleccionada = this.querySelector(
                `input[name="pregunta-${indice}"]:checked`
            );
            const posicionSeleccionada = respuestaSeleccionada
                ? Number(respuestaSeleccionada.value)
                : null;
            const correcta =
                posicionSeleccionada === pregunta.respuestaCorrecta;
            if (correcta) {
                respuestasCorrectas++;
            }
            // Guardar cada respuesta del estudiante
            respuestasEstudiante.push({
                numeroPregunta: indice + 1,
                pregunta: pregunta.enunciado,
                respuestaSeleccionada: posicionSeleccionada !== null
                    ? pregunta.respuestas[posicionSeleccionada]
                    : "Sin responder",
                respuestaCorrecta:
                    pregunta.respuestas[pregunta.respuestaCorrecta],
                correcta: correcta
            });
        });
        const totalPreguntas = preguntas.length;
        const porcentaje = Math.round(
            (respuestasCorrectas / totalPreguntas) * 100
        );
        const aprobado =
            (respuestasCorrectas / totalPreguntas) * 100
            >= this.examenActual.porcentaje;
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
            estado: aprobado ? "Aprobado" : "Reprobado",
            respuestas: respuestasEstudiante
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
                        Identificación:
                        ${this.estudiante.identificacion}
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
                    <h2 class="${aprobado ? "estado-aprobado" : "estado-reprobado"}">
                        ${aprobado
                            ? "¡Examen aprobado!"
                            : "Examen reprobado"}
                    </h2>
                    <button
                        type="button"
                        id="boton-volver-examenes">
                        Volver a los exámenes
                    </button>
                </div>
            </section>
        `;
        const botonVolver = this.querySelector(
            "#boton-volver-examenes"
        );
        botonVolver.addEventListener("click", () => {
            this.mostrarExamenes();
        });
    }
}
// Registrar componente
customElements.define("resolver-examen", ResolverExamen);
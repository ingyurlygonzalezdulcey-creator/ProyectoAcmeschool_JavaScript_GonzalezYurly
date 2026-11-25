// Componente de inicio de Acme School
class InicioAplicacion extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="inicio">
                <div class="inicio-contenido">
                    <h2>Bienvenido a Acme School</h2>
                    <p>
                        Plataforma para gestionar usuarios,
                        administrar exámenes y evaluar conocimientos.
                    </p>
                    <div class="inicio-opciones">
                        <article class="tarjeta-inicio">
                            <h3>Gestión de usuarios</h3>
                            <p>Administra la información de los usuarios.</p>
                            <button type="button" data-modulo="usuarios">
                                Acceder
                            </button>
                        </article>
                        <article class="tarjeta-inicio">
                            <h3>Gestión de exámenes</h3>
                            <p>Crea exámenes, preguntas y respuestas.</p>
                            <button type="button" data-modulo="examenes">
                                Acceder
                            </button>
                        </article>
                        <article class="tarjeta-inicio">
                            <h3>Resolver exámenes</h3>
                            <p>Consulta y presenta los exámenes disponibles.</p>
                            <button type="button" data-modulo="resolver">
                                Acceder
                            </button>
                        </article>
                    </div>
                </div>
            </section>
        `;
        // Activar los botones de las tarjetas
        const botones = this.querySelectorAll("[data-modulo]");
        botones.forEach((boton) => {
            boton.addEventListener("click", () => {
                const navegacion = document.querySelector(
                    "navegacion-aplicacion"
                );
                navegacion.mostrarVista(boton.dataset.modulo);
            });
        });
    }
}
// Registrar el componente
customElements.define("inicio-aplicacion", InicioAplicacion);
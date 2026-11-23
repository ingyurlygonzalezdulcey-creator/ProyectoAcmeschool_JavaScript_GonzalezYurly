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
                        </article>
                        <article class="tarjeta-inicio">
                            <h3>Gestión de exámenes</h3>
                            <p>Crea exámenes, preguntas y respuestas.</p>
                        </article>
                        <article class="tarjeta-inicio">
                            <h3>Resolver exámenes</h3>
                            <p>Consulta y presenta los exámenes disponibles.</p>
                        </article>
                    </div>
                </div>
            </section>
        `;
    }
}
// Registrar el componente
customElements.define("inicio-aplicacion", InicioAplicacion);
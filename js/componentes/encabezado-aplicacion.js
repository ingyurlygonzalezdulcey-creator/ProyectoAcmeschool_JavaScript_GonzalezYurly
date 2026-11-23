// Componente del encabezado de Acme School
class EncabezadoAplicacion extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="encabezado">
                <div class="encabezado-contenido">
                    <div class="marca">
                        <h1>Acme School</h1>
                        <p>Plataforma de Exámenes</p>
                    </div>
                </div>
            </header>
        `;
    }
}
// Registrar el componente
customElements.define("encabezado-aplicacion", EncabezadoAplicacion);

// Componente de navegación de Acme School
class NavegacionAplicacion extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navegacion">
                <ul class="lista-navegacion">
                    <li>
                        <a href="#" data-vista="inicio">Inicio</a>
                    </li>
                    <li>
                        <a href="#" data-vista="usuarios">Usuarios</a>
                    </li>
                    <li>
                        <a href="#" data-vista="examenes">Exámenes</a>
                    </li>
                    <li>
                        <a href="#" data-vista="resolver">Resolver examen</a>
                    </li>
                </ul>
            </nav>
        `;
    }
}
// Registrar componente
customElements.define("navegacion-aplicacion", NavegacionAplicacion);

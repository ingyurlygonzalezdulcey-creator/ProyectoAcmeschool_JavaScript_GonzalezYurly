// Importar componentes
import "./componentes/encabezado-aplicacion.js";
import "./componentes/navegacion-aplicacion.js";
import "./componentes/inicio-aplicacion.js";
import "./componentes/inicio-sesion.js";
import { crearAdministrador } from "./servicios/usuarios.js";

// Crear administrador inicial
crearAdministrador();

console.log("Bienvenido a Acme School");
console.log("La plataforma de exámenes está iniciando...");


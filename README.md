# Acme School - Plataforma de Exámenes

## Descripción del proyecto

Acme School es una aplicación web que permite gestionar usuarios, crear exámenes y facilitar su presentación por parte de los estudiantes.

La plataforma cuenta con módulos privados para usuarios autenticados y un módulo público para la resolución de exámenes, sin necesidad de iniciar sesión.

## Objetivo

Desarrollar una plataforma funcional, intuitiva, responsive y accesible, aplicando los conocimientos adquiridos durante el skill de JavaScript.

## Funcionalidades

### Inicio de sesión

- Autenticación mediante correo electrónico y contraseña.
- Persistencia de la sesión.
- Protección de módulos privados.
- Cierre de sesión.

### Gestión de usuarios

- Registro de usuarios.
- Consulta de usuarios registrados.
- Actualización de información.
- Eliminación de usuarios.
- Validación de datos.
- Cargos administrativos y docentes.

### Gestión de exámenes

- Creación, consulta, actualización y eliminación de exámenes.
- Configuración del tiempo de duración.
- Configuración del porcentaje mínimo de aprobación.
- Registro y eliminación de preguntas.
- Cuatro opciones de respuesta por pregunta.
- Selección de una única respuesta correcta.

### Resolución de exámenes

- Acceso público sin autenticación.
- Consulta de exámenes disponibles.
- Registro de identificación y nombre del estudiante.
- Selección de respuestas.
- Temporizador en tiempo real.
- Finalización manual o automática del examen.
- Calificación automática.
- Visualización del porcentaje obtenido y estado de aprobación.

### Gestión de resultados

- Consulta de resultados obtenidos por los estudiantes.
- Registro de calificaciones.
- Almacenamiento de las respuestas seleccionadas.
- Visualización del estado de aprobación o reprobación.
- Eliminación de resultados registrados.

## Tecnologías utilizadas

- **HTML5:** estructura semántica de la aplicación.
- **CSS3:** diseño, estilos, transiciones y adaptación responsive.
- **JavaScript:** lógica, validaciones e interacción.
- **Web Components:** creación de componentes personalizados.
- **JSON:** estructura y representación de datos.
- **LocalStorage:** almacenamiento persistente de información.
- **Git y GitHub:** control de versiones.

## Estructura del proyecto

```text
ProyectoAcmeschool_JavaScript_GonzalezYurly/
├── js/
│   ├── componentes/
│   │   ├── encabezado-aplicacion.js
│   │   ├── navegacion-aplicacion.js
│   │   ├── inicio-aplicacion.js
│   │   ├── inicio-sesion.js
│   │   ├── gestion-usuarios.js
│   │   ├── gestion-examenes.js
│   │   └── gestion-resultados.js
│   ├── modulos/
│   │   └── resolver-examen.js
│   ├── servicios/
│   │   ├── usuarios.js
│   │   ├── examenes.js
│   │   └── resultados.js
│   └── principal.js
├── styles/
│   ├── principal.css
│   ├── componentes.css
│   ├── modulos.css
│   └── responsive.css
├── index.html
└── README.md
```

## Diseño y experiencia de usuario

La aplicación utiliza una identidad visual basada en tonalidades azules, fondos claros y componentes organizados para facilitar la navegación.

Se implementaron:

- Diseño adaptable a computadores, tabletas y celulares.
- Formularios con etiquetas y validaciones.
- Transiciones visuales.
- Indicadores de navegación activa.
- Navegación mediante teclado.
- Indicadores visuales de enfoque.
- Adaptación a las preferencias de movimiento reducido.

## Persistencia de datos

La información se almacena mediante LocalStorage utilizando estructuras JSON.

Las claves utilizadas son:

| Clave | Información almacenada |
|---|---|
| usuarios | Usuarios registrados |
| sesion | Sesión del usuario autenticado |
| examenes | Exámenes, preguntas y respuestas |
| resultados | Resultados de los estudiantes |

Los datos permanecen almacenados en el navegador después de recargar la página.

La aplicación tiene un propósito académico. La autenticación y el almacenamiento local no sustituyen los mecanismos de seguridad de una aplicación en producción.

## Instalación y ejecución

1. Clonar el repositorio.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Ejecutar el archivo `index.html` mediante Live Server.
4. Acceder a la plataforma desde el navegador.

## Credenciales de prueba

| Campo | Valor |
|---|---|
| Correo | admin@acmeschool.com |
| Contraseña | Admin123 |

Estas credenciales corresponden al administrador inicial de la aplicación académica.

## Repositorio

[Proyecto Acme School - GitHub](https://github.com/ingyurlygonzalezdulcey-creator/ProyectoAcmeschool_JavaScript_GonzalezYurly)

## Aplicación publicada

El proyecto se encuentra disponible mediante GitHub Pages:

[Acceder a Acme School](https://ingyurlygonzalezdulcey-creator.github.io/ProyectoAcmeschool_JavaScript_GonzalezYurly/)

## Autora

**Yurly González Dulcey**

Campuslands — Skill JavaScript

2026

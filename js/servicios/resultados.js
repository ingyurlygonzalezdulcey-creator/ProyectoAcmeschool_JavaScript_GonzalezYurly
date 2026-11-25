// Servicio para gestionar los resultados de los exámenes
// Obtener los resultados guardados
function obtenerResultados() {
    return JSON.parse(localStorage.getItem("resultados")) || [];
}
// Guardar todos los resultados
function guardarResultados(resultados) {
    localStorage.setItem("resultados", JSON.stringify(resultados));
}
// Registrar un nuevo resultado
function registrarResultado(resultado) {
    const resultados = obtenerResultados();
    resultados.push(resultado);
    guardarResultados(resultados);
}
// Exportar funciones
export {
    obtenerResultados,
    guardarResultados,
    registrarResultado
};
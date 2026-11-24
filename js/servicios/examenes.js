// Servicio para gestionar exámenes
// Obtener exámenes guardados
function obtenerExamenes() {
    return JSON.parse(localStorage.getItem("examenes")) || [];
}
// Guardar exámenes
function guardarExamenes(examenes) {
    localStorage.setItem("examenes", JSON.stringify(examenes));
}
// Buscar un examen por su código
function buscarExamen(codigo) {
    const examenes = obtenerExamenes();
    return examenes.find((examen) => {
        return examen.codigo === codigo;
    });
}
// Exportar funciones
export {
    obtenerExamenes,
    guardarExamenes,
    buscarExamen
};
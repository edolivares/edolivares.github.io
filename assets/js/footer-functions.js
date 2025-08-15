/**
 * Footer Functions - Funciones específicas del footer
 * Incluye la actualización automática del año del copyright
 */

// Función para actualizar el año del copyright
function updateCopyrightYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
        currentYearElement.setAttribute('datetime', currentYear);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    updateCopyrightYear();
});

// Exportar la función para uso en otros módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCopyrightYear
    };
}
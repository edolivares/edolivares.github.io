/**
 * Main JavaScript - Archivo principal de JavaScript
 * Importa todos los archivos JavaScript organizados por funcionalidad
 * 
 * ORDEN DE IMPORTACIÓN:
 * 1. vanilla-functions.js - Funciones JavaScript nativas (reemplaza jQuery)
 * 2. footer-functions.js - Funciones del footer
 * 3. header-behavior.js - Comportamiento del header y navegación
 */

// ===== INICIALIZACIÓN =====

// Función de inicialización principal
function initializeApp() {
    console.log('Main JavaScript initialized - All scripts loaded via index.html');

    // Aquí puedes agregar cualquier lógica de inicialización adicional
    // que necesite ejecutarse después de que todos los componentes estén listos
}

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
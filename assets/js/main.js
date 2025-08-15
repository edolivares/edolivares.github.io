/**
 * Main JavaScript - Archivo principal de JavaScript
 * Importa todos los archivos JavaScript organizados por funcionalidad
 * 
 * ORDEN DE IMPORTACIÓN:
 * 1. vanilla-functions.js - Funciones JavaScript nativas (reemplaza jQuery)
 * 2. footer-functions.js - Funciones del footer
 * 3. header-behavior.js - Comportamiento del header y navegación
 */

// ===== IMPORTS EN ORDEN DE PRIORIDAD =====

// 1. Funciones JavaScript nativas (reemplaza jQuery)
import('./vanilla-functions.js')
    .then(() => {
        console.log('Vanilla functions loaded successfully');
    })
    .catch(error => {
        console.error('Error loading vanilla functions:', error);
    });

// 2. Funciones del footer (incluye actualización del año)
import('./footer-functions.js')
    .then(() => {
        console.log('Footer functions loaded successfully');
    })
    .catch(error => {
        console.error('Error loading footer functions:', error);
    });

// 3. Comportamiento del header y navegación
import('./header-behavior.js')
    .then(() => {
        console.log('Header behavior loaded successfully');
    })
    .catch(error => {
        console.error('Error loading header behavior:', error);
    });

// Función de inicialización principal
function initializeApp() {
    console.log('Main JavaScript initialized');

    // Aquí puedes agregar cualquier lógica de inicialización adicional
    // que necesite ejecutarse después de que todos los módulos estén cargados
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Pequeño delay para asegurar que todos los imports estén cargados
    setTimeout(initializeApp, 100);
});
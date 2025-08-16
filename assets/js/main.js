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

// Función para cargar módulos secuencialmente
async function loadModules() {
    try {
        // 1. Configuración de EmailJS (DEBE cargarse primero)
        await import('./emailjs-config.js');
        console.log('EmailJS configuration loaded successfully');

        // 2. Funciones JavaScript nativas (reemplaza jQuery)
        await import('./vanilla-functions.js');
        console.log('Vanilla functions loaded successfully');

        // 3. Funciones del footer (incluye actualización del año)
        await import('./footer-functions.js');
        console.log('Footer functions loaded successfully');

        // 4. Comportamiento del header y navegación
        await import('./header-behavior.js');
        console.log('Header behavior loaded successfully');

        console.log('Todos los módulos cargados correctamente');
    } catch (error) {
        console.error('Error loading modules:', error);
    }
}

// Función de inicialización principal
function initializeApp() {
    console.log('Main JavaScript initialized');

    // Aquí puedes agregar cualquier lógica de inicialización adicional
    // que necesite ejecutarse después de que todos los módulos estén cargados
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Cargar todos los módulos secuencialmente
    loadModules().then(() => {
        // Inicializar la aplicación después de que todos los módulos estén cargados
        initializeApp();
    });
});
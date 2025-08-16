// Configuración de EmailJS
// Reemplaza estas credenciales con las tuyas reales de EmailJS

const EMAILJS_CONFIG = {
    // Tu clave pública de EmailJS
    PUBLIC_KEY: "LjlcASGPwe_kU_hAJ",

    // ID del servicio de email (Gmail, Outlook, etc.)
    SERVICE_ID: "service_bavqy7r",

    // ID del template de email
    TEMPLATE_ID: "template_4wmv00q"
};

// Inicializar EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS inicializado correctamente');
} else {
    console.error('EmailJS no está disponible');
}

// Función para obtener la configuración
function getEmailJSConfig() {
    return EMAILJS_CONFIG;
}

// Exportar la función para que esté disponible globalmente
window.getEmailJSConfig = getEmailJSConfig;

// Log para verificar que se cargó correctamente
console.log('EmailJS config loaded, getEmailJSConfig function available:', typeof window.getEmailJSConfig);
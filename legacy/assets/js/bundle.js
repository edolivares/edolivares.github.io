/* === emailjs-config.js === */
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

/* === vanilla-functions.js === */
/**
 * Vanilla Functions - Funciones JavaScript nativas que reemplazan jQuery
 * Incluye: scroll suave, scrollspy, navegación responsive, formulario de contacto
 */

// ===== FUNCIONES DE SCROLL SUAVE =====
function initSmoothScrolling() {
    const pageScrollLinks = document.querySelectorAll('a.page-scroll');

    pageScrollLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 50;

                // Scroll suave nativo (con polyfill para navegadores antiguos)
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Polyfill para navegadores que no soportan scrollBehavior
                    smoothScrollPolyfill(targetPosition);
                }
            }
        });
    });
}

// Polyfill para scroll suave en navegadores antiguos
function smoothScrollPolyfill(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1250;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutExpo(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutExpo(t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    requestAnimationFrame(animation);
}

// ===== SCROLLSPY PARA NAVEGACIÓN =====
function initScrollspy() {
    // Incluir el header como primera sección para el navbar-brand
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav.navbar-nav a[href^="#"]');

    console.log('Scrollspy: Inicializando...');
    console.log('Scrollspy: Header encontrado:', header ? 'Sí' : 'No');
    console.log('Scrollspy: Secciones encontradas:', sections.length);
    console.log('Scrollspy: Enlaces de navegación encontrados:', navLinks.length);

    // Crear array con todas las secciones incluyendo el header
    const allSections = [];
    if (header) {
        allSections.push({
            element: header,
            id: 'page-top',
            top: 0,
            height: header.offsetHeight
        });
    }

    sections.forEach(section => {
        allSections.push({
            element: section,
            id: section.getAttribute('id'),
            top: section.offsetTop,
            height: section.offsetHeight
        });
    });

    console.log('Scrollspy: Total de secciones procesadas:', allSections.length);
    allSections.forEach(section => {
        console.log(`Scrollspy: Sección ${section.id} - Top: ${section.top}, Height: ${section.height}`);
    });

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150; // Offset ajustado para el navbar fijo

        let currentSection = null;

        // Encontrar la sección actual basada en la posición del scroll
        for (let i = allSections.length - 1; i >= 0; i--) {
            const section = allSections[i];
            if (scrollPosition >= section.top) {
                currentSection = section;
                break;
            }
        }

        if (currentSection) {
            // Remover clase activa de todos los elementos li
            const allNavItems = document.querySelectorAll('.nav.navbar-nav > li');
            allNavItems.forEach(item => {
                item.classList.remove('active');
            });

            // Agregar clase activa al li padre del enlace correspondiente
            const activeLink = document.querySelector(`.nav.navbar-nav a[href="#${currentSection.id}"]`);
            if (activeLink) {
                const parentLi = activeLink.closest('li');
                if (parentLi) {
                    parentLi.classList.add('active');
                    console.log(`Scrollspy: Enlace activo para sección ${currentSection.id}`);
                }
            }
        }
    }

    // Usar throttle para mejorar el rendimiento
    let ticking = false;

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNavLink);
            ticking = true;
        }
    }

    function onScroll() {
        ticking = false;
        requestTick();
    }

    window.addEventListener('scroll', onScroll, {
        passive: true
    });

    // Ejecutar una vez al cargar
    setTimeout(updateActiveNavLink, 100);
}

// ===== NAVEGACIÓN RESPONSIVE =====
function initResponsiveNavigation() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggle = document.querySelector('.navbar-toggle');

    if (navbarCollapse && navbarToggle) {
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navbarCollapse.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (navbarToggle.classList.contains('collapsed') === false) {
                    navbarToggle.click();
                }
            });
        });
    }
}

// ===== NAVEGACIÓN AFFIX (STICKY) =====
function initAffixNavigation() {
    const mainNav = document.getElementById('mainNav');

    if (mainNav) {
        function handleAffix() {
            if (window.scrollY > 100) {
                mainNav.classList.add('affix');
            } else {
                mainNav.classList.remove('affix');
            }
        }

        window.addEventListener('scroll', handleAffix);
        handleAffix(); // Ejecutar una vez al cargar
    }
}

// ===== VALIDACIÓN DE FORMULARIO =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const successDiv = document.getElementById('success');

    if (contactForm && successDiv) {
        // Validación básica de campos requeridos
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            // Validar al perder el foco
            field.addEventListener('blur', function () {
                validateField(this);
            });

            // Validar mientras se escribe (con debounce)
            let timeoutId;
            field.addEventListener('input', function () {
                clearTimeout(timeoutId);
                clearFieldError(this);

                // Validar después de 500ms de inactividad
                timeoutId = setTimeout(() => {
                    if (this.value.trim() !== '') {
                        validateField(this);
                    }
                }, 500);
            });

            // Validar al presionar Enter
            field.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    validateField(this);
                }
            });
        });

        // Envío del formulario
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (validateForm()) {
                submitForm();
            }
        });

        // Limpiar mensajes de éxito/error al enfocar campos
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function () {
                clearSuccessMessage();
            });
        });

        // Agregar validación en tiempo real para el campo de teléfono (opcional)
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            let phoneTimeoutId;
            phoneField.addEventListener('input', function () {
                clearTimeout(phoneTimeoutId);
                clearFieldError(this);

                // Validar después de 500ms de inactividad
                phoneTimeoutId = setTimeout(() => {
                    if (this.value.trim() !== '') {
                        validateField(this);
                    }
                }, 500);
            });

            phoneField.addEventListener('blur', function () {
                if (this.value.trim() !== '') {
                    validateField(this);
                }
            });
        }

        // Agregar contador de caracteres para el campo de mensaje
        const messageField = document.getElementById('message');
        if (messageField) {
            // Limpiar contadores duplicados existentes
            const existingCounters = messageField.parentNode.querySelectorAll('.char-counter');
            if (existingCounters.length > 1) {
                existingCounters.forEach((counter, index) => {
                    if (index > 0) counter.remove(); // Mantener solo el primero
                });
            }

            // Verificar si ya existe un contador para evitar duplicados
            let charCounter = messageField.parentNode.querySelector('.char-counter');
            if (!charCounter) {
                // Crear contador de caracteres solo si no existe
                charCounter = document.createElement('div');
                charCounter.className = 'char-counter small mt-1';
                charCounter.style.fontSize = '12px';
                charCounter.style.color = '#6c757d'; // Color gris visible
                messageField.parentNode.appendChild(charCounter);
            }

            // Actualizar contador en tiempo real
            messageField.addEventListener('input', function () {
                const currentLength = this.value.length;
                const maxLength = 1000;
                const remaining = maxLength - currentLength;

                if (remaining < 0) {
                    charCounter.textContent = `Excediste el límite por ${Math.abs(remaining)} caracteres`;
                    charCounter.className = 'char-counter small mt-1';
                    charCounter.style.color = '#dc3545'; // Rojo para error
                } else if (remaining <= 100) {
                    charCounter.textContent = `${currentLength}/${maxLength} caracteres (${remaining} restantes)`;
                    charCounter.className = 'char-counter small mt-1';
                    charCounter.style.color = '#ffc107'; // Amarillo para advertencia
                } else {
                    charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
                    charCounter.className = 'char-counter small mt-1';
                    charCounter.style.color = '#d9d9d9'; // Gris para normal
                }
            });

            // Validar longitud del mensaje
            messageField.addEventListener('blur', function () {
                if (this.value.length > 1000) {
                    showFieldError(this, 'El mensaje no puede exceder 1000 caracteres.');
                }
            });
        }
    }
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas por campo y tipo
    switch (fieldName) {
        case 'name':
            // Validación del nombre: solo letras, espacios y algunos caracteres especiales
            const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,50}$/;
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres.';
            } else if (value.length > 50) {
                isValid = false;
                errorMessage = 'El nombre no puede exceder 50 caracteres.';
            } else if (!nameRegex.test(value)) {
                isValid = false;
                errorMessage = 'El nombre solo puede contener letras, espacios y guiones.';
            }
            break;

        case 'email':
            // Validación del email: formato estándar de email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingrese un email válido (ejemplo: usuario@dominio.com).';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'El email no puede exceder 100 caracteres.';
            }
            break;

        case 'phone':
            // Validación del teléfono: números, espacios, guiones, paréntesis y +
            if (value !== '') { // El teléfono es opcional
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'El teléfono debe contener solo números, espacios, guiones y paréntesis.';
                } else if (value.length < 7) {
                    isValid = false;
                    errorMessage = 'El teléfono debe tener al menos 7 dígitos.';
                } else if (value.length > 20) {
                    isValid = false;
                    errorMessage = 'El teléfono no puede exceder 20 caracteres.';
                }
            }
            break;

        case 'message':
            // Validación del mensaje: texto con longitud mínima y máxima
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'El mensaje debe tener al menos 10 caracteres.';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'El mensaje no puede exceder 1000 caracteres.';
            } else if (value.trim().split(' ').length < 3) {
                isValid = false;
                errorMessage = 'El mensaje debe contener al menos 3 palabras.';
            }
            break;

        default:
            // Validación genérica para otros campos
            if (field.hasAttribute('required') && value === '') {
                isValid = false;
                errorMessage = 'Este campo es requerido.';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Este campo debe tener al menos 2 caracteres.';
            }
            break;
    }

    // Validación de campo requerido
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'Este campo es requerido.';
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

// Validar formulario completo
function validateForm() {
    const requiredFields = document.querySelectorAll('#contactForm [required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Mostrar error de campo
function showFieldError(field, message) {
    clearFieldError(field);

    const errorDiv = field.parentNode.querySelector('.help-block');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('text-danger');
    }

    field.classList.add('is-invalid');
}

// Limpiar error de campo
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.help-block');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.classList.remove('text-danger');
    }

    field.classList.remove('is-invalid');
}

// Limpiar mensaje de éxito
function clearSuccessMessage() {
    const successDiv = document.getElementById('success');
    if (successDiv) {
        successDiv.innerHTML = '';
    }
}

// Enviar formulario con EmailJS y reCAPTCHA v2
function submitForm() {
    // Prevenir envíos múltiples
    if (window.formSubmitting) {
        return;
    }
    window.formSubmitting = true;

    // Verificar que todos los elementos existan
    const contactForm = document.getElementById('contactForm');
    const successDiv = document.getElementById('success');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const messageField = document.getElementById('message');
    const submitButton = document.getElementById('sendMessageButton');

    // Validar que todos los elementos estén presentes
    if (!contactForm || !successDiv || !nameField || !emailField || !phoneField || !messageField || !submitButton) {
        console.error('Error: Elementos del formulario no encontrados');
        console.log('contactForm:', contactForm);
        console.log('successDiv:', successDiv);
        console.log('nameField:', nameField);
        console.log('emailField:', emailField);
        console.log('phoneField:', phoneField);
        console.log('messageField:', messageField);
        console.log('submitButton:', submitButton);
        window.formSubmitting = false;
        return;
    }

    const formData = new FormData(contactForm);
    const name = nameField.value;
    const email = emailField.value;
    const phone = phoneField.value;
    const message = messageField.value;

    // Mostrar mensaje de carga
    if (successDiv) {
        successDiv.innerHTML = '<div class="alert alert-info">Verificando seguridad...</div>';
    }

    // Verificar que reCAPTCHA esté disponible
    if (typeof grecaptcha === 'undefined') {
        successDiv.innerHTML = '<div class="alert alert-danger">Error: reCAPTCHA no está disponible. Por favor, recarga la página.</div>';
        return;
    }

    // Verificar que reCAPTCHA v2 esté completado
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        if (successDiv) {
            successDiv.innerHTML = '<div class="alert alert-danger">Por favor, completa la verificación reCAPTCHA antes de enviar el mensaje.</div>';
        }
        window.formSubmitting = false;
        return;
    }

    // Mostrar mensaje de envío
    if (successDiv) {
        successDiv.innerHTML = '<div class="alert alert-info">Enviando mensaje...</div>';
    }

    // Bloquear el botón de envío
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Obtener configuración de EmailJS
    const config = getEmailJSConfig();

    // Verificar que EmailJS esté disponible
    if (typeof emailjs === 'undefined') {
        showErrorMessage();
        return;
    }

    // Obtener fecha y hora actual
    const now = new Date();
    const date = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const time = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Parámetros del template
    const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        message: message,
        to_name: "Eduardo Olivares",
        date: date,
        time: time,
        'g-recaptcha-response': recaptchaResponse
    };

    // Enviar email usando EmailJS
    emailjs.send(
            config.SERVICE_ID,
            config.TEMPLATE_ID,
            templateParams
        )
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
            document.getElementById('contactForm').reset();
            // Resetear reCAPTCHA después del envío exitoso
            grecaptcha.reset();
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            // Resetear bandera de envío
            window.formSubmitting = false;
        }, function (error) {
            console.log('FAILED...', error);
            showErrorMessage();
            document.getElementById('contactForm').reset();
            // Resetear reCAPTCHA después del error
            grecaptcha.reset();
            // Restaurar el botón
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            // Resetear bandera de envío
            window.formSubmitting = false;
        });
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const successDiv = document.getElementById('success');
    successDiv.innerHTML = `
        <div class="alert alert-success">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-hidden="true"></button>
            <strong>Tu mensaje ha sido enviado.</strong>
        </div>
    `;
}

// Mostrar mensaje de error
function showErrorMessage() {
    const successDiv = document.getElementById('success');
    const name = document.getElementById('name').value;
    const firstName = name.split(' ')[0] || 'usuario';

    successDiv.innerHTML = `
        <div class="alert alert-danger">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-hidden="true"></button>
            <strong>Lo siento ${firstName}, al parecer el servidor de correos no está funcionando. Por favor vuelve a intentarlo luego!</strong>
        </div>
    `;
}

// ===== INICIALIZACIÓN =====
function initVanillaFunctions() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
}

function initAll() {
    console.log('Inicializando funciones vanilla...');

    // Inicializar todas las funciones
    initSmoothScrolling();
    initScrollspy();
    initResponsiveNavigation();
    initAffixNavigation();
    initFormValidation();

    console.log('Funciones vanilla inicializadas correctamente');
}

// Inicializar automáticamente
initVanillaFunctions();

/* === header-behavior.js === */
/**
 * Header Behavior JavaScript
 * Maneja el comportamiento del navbar y la funcionalidad page-scroll
 */

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('mainNav');
    const navbarBrand = document.querySelector('.navbar-brand');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // ===== FUNCIONALIDAD PAGE-SCROLL (SCROLL SUAVE) =====
    const pageScrollLinks = document.querySelectorAll('.page-scroll');

    pageScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== MANEJO DEL SCROLL DEL NAVBAR =====
    function handleScroll() {
        if (window.scrollY > 50) {
            // Cambiar a estado scrolled (sólido)
            navbar.classList.remove('affix-top');
            navbar.classList.add('affix');
        } else {
            // Cambiar a estado inicial (transparente)
            navbar.classList.remove('affix');
            navbar.classList.add('affix-top');
        }
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', handleScroll);

    // Ejecutar una vez al cargar para establecer el estado inicial
    handleScroll();

    // ===== CERRAR MENÚ MÓVIL AL HACER CLICK EN UN ENLACE =====
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const navbarToggle = document.querySelector('.navbar-toggle');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cerrar si el menú está abierto (en móviles)
            if (window.innerWidth < 768 && navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
        });
    });

    // ===== NAVEGACIÓN ACTIVA POR SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav a');

    function updateActiveNavItem() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        // Remover clase active de todos los enlaces primero
        navItems.forEach(item => {
            item.classList.remove('active');
            // También remover la clase active del li padre
            const parentLi = item.closest('li');
            if (parentLi) {
                parentLi.classList.remove('active');
            }
        });

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Agregar clase active al enlace correspondiente
                const correspondingNavItem = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                    // También agregar la clase active al li padre
                    const parentLi = correspondingNavItem.closest('li');
                    if (parentLi) {
                        parentLi.classList.add('active');
                    }
                }
            }
        });
    }

    // Escuchar el evento scroll para actualizar navegación activa
    window.addEventListener('scroll', updateActiveNavItem);

    // Ejecutar una vez al cargar para establecer el estado inicial
    updateActiveNavItem();
});

/* === footer-functions.js === */
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

/* === main.js === */
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


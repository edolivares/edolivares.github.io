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
            field.addEventListener('blur', function () {
                validateField(this);
            });

            field.addEventListener('input', function () {
                clearFieldError(this);
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
    }
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    // Validaciones específicas por tipo de campo
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingrese un email válido.';
            }
            break;

        case 'text':
        case 'textarea':
            if (value.length < 2) {
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

// Enviar formulario
function submitForm() {
    const formData = new FormData(document.getElementById('contactForm'));
    const successDiv = document.getElementById('success');

    // Mostrar mensaje de carga
    successDiv.innerHTML = '<div class="alert alert-info">Enviando mensaje...</div>';

    // Simular envío (reemplazar con tu lógica real de envío)
    setTimeout(() => {
        // Simular éxito (reemplazar con tu lógica real)
        const isSuccess = Math.random() > 0.3; // 70% de éxito para demo

        if (isSuccess) {
            showSuccessMessage();
            document.getElementById('contactForm').reset();
        } else {
            showErrorMessage();
            document.getElementById('contactForm').reset();
        }
    }, 1500);
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
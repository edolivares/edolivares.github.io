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
            // Crear contador de caracteres
            const charCounter = document.createElement('div');
            charCounter.className = 'char-counter text-muted small mt-1';
            charCounter.style.fontSize = '12px';
            messageField.parentNode.appendChild(charCounter);

            // Actualizar contador en tiempo real
            messageField.addEventListener('input', function () {
                const currentLength = this.value.length;
                const maxLength = 1000;
                const remaining = maxLength - currentLength;

                if (remaining < 0) {
                    charCounter.textContent = `Excediste el límite por ${Math.abs(remaining)} caracteres`;
                    charCounter.className = 'char-counter text-danger small mt-1';
                } else if (remaining <= 100) {
                    charCounter.textContent = `${currentLength}/${maxLength} caracteres (${remaining} restantes)`;
                    charCounter.className = 'char-counter text-warning small mt-1';
                } else {
                    charCounter.textContent = `${currentLength}/${maxLength} caracteres`;
                    charCounter.className = 'char-counter text-muted small mt-1';
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

// Enviar formulario con EmailJS
function submitForm() {
    const formData = new FormData(document.getElementById('contactForm'));
    const successDiv = document.getElementById('success');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Verificar reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        successDiv.innerHTML = '<div class="alert alert-warning">Por favor, completa el reCAPTCHA antes de enviar el mensaje.</div>';
        return;
    }

    // Mostrar mensaje de carga
    successDiv.innerHTML = '<div class="alert alert-info">Enviando mensaje...</div>';

    // Obtener configuración de EmailJS
    const config = getEmailJSConfig();

    // Verificar que EmailJS esté disponible
    if (typeof emailjs === 'undefined') {
        showErrorMessage();
        return;
    }

    // Parámetros del template
    const templateParams = {
        from_name: name,
        from_email: email,
        from_phone: phone,
        message: message,
        to_name: "Eduardo Olivares",
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
            // Resetear reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        }, function (error) {
            console.log('FAILED...', error);
            showErrorMessage();
            document.getElementById('contactForm').reset();
            // Resetear reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
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
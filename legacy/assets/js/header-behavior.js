/**
 * Header Behavior JavaScript
 * Maneja el comportamiento del navbar y la funcionalidad page-scroll
 */

function initHeaderBehavior() {
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
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.navbar-nav a');

    function updateActiveNavItem() {
        // Reducimos el offset para que el cambio sea más preciso
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase active de todos primero (solo cuando detectamos la sección actual)
                navItems.forEach(item => {
                    item.classList.remove('active');
                    const parentLi = item.closest('li');
                    if (parentLi) {
                        parentLi.classList.remove('active');
                    }
                });

                // Agregar clase active al enlace correspondiente
                const correspondingNavItem = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
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
}

// Inicializar basándose en el estado del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderBehavior);
} else {
    initHeaderBehavior();
}
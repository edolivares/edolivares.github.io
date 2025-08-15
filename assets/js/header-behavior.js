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
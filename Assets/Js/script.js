document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. INTERACTIVIDAD BÁSICA (Menú, CTA y WhatsApp)
    // ==========================================================================
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
        });
    }

    const ctaOrder = document.getElementById("cta-order");
    if (ctaOrder) {
        ctaOrder.addEventListener("click", () => {
            console.log("Iniciando flujo de reserva...");
            alert("¡Excelente! Te estamos redirigiendo a nuestro calendario de fechas disponibles.");
        });
    }

    const wspContainer = document.getElementById('wsp-container');
    const wspTrigger = document.getElementById('wsp-trigger');

    if (wspTrigger && wspContainer) {
        wspTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            wspContainer.classList.toggle('open');
        });

        document.addEventListener('click', () => {
            wspContainer.classList.remove('open');
        });
    }

    // ==========================================================================
    // 2. OBSERVADOR DE APARICIÓN OPTIMIZADO (Solución al TBT)
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px', // Activa un instante antes de asomar para mitigar impacto
        threshold: 0.05 // Calculo ultraligero al 5% de visibilidad
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 💡 Alivia el hilo de renderizado procesando el cambio de CSS cuando el navegador está libre
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Retraso controlado no perceptivo para liberar el First Contentful Paint inicial
    setTimeout(() => {
        // Unificamos todos tus elementos en una única consulta al DOM para ahorrar recursos masivos
        const animatableElements = document.querySelectorAll(
            '.content-card, .space-block, .service-item, .review-card, .contact-form'
        );
        
        animatableElements.forEach(element => appearanceObserver.observe(element));
    }, 100);
});
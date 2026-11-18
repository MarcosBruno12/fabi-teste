/* ==========================================================================
   LANDING PAGE LARISSA AGUIAR - PSICÓLOGA INFANTIL
   Lógica JavaScript & Interatividade Refinada
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ---- Correção do Scroll Suave e Fechamento do Menu Mobile ----
    const navLinks = document.querySelectorAll('.nav-link-custom, .navbar-brand, a[href^="#"]');
    const navbarCollapse = document.getElementById('menuNavegacao');
    const headerElement = document.querySelector('.site-header');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Fecha o menu hambúrguer no mobile se estiver aberto
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Calcula offset exato considerando o cabeçalho fixo
                    const headerHeight = headerElement ? headerElement.offsetHeight : 80;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. ---- Botão Voltar ao Topo ----
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. ---- Animação sutil de entrada para os cards ----
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.benefit-card, .overlapping-service-card, .insta-post-card, .credential-bar').forEach(el => {
            el.style.opacity = '1'; // seguro para browsers sem fade
            observer.observe(el);
        });
    }
});

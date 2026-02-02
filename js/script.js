document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = 'none';
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Form Submittion (Prevent Default)
    const form = document.getElementById('inquiryForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Thank you for your inquiry! We will contact you shortly.');
                form.reset();
                btn.innerText = 'Sent!';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.opacity = '1';
                }, 2000);
            }, 1000);
        });
    }

    // Simple Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    // Add animation classes to elements
    document.querySelectorAll('.comparison-card, .feature-img, .amenity-item, .gallery-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(el);
    });

    // Custom "visible" class handling since we added inline styles above
    // A clearer way would be to just add class "fade-up" in HTML and define in CSS
    // But let's inject a style rule for .visible here or handle it manually
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

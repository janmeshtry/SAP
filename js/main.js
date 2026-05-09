document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => scrollObserver.observe(el));

    // 2. Staggered Animation for Product Cards
    const staggerElements = document.querySelectorAll('.stagger-in');
    
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerElements.forEach(el => staggerObserver.observe(el));

    // 3. Dynamic Navbar blur on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.92)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        }
    });

    // 4. Product Card Flip Logic
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent the card from flipping back over if the user clicks a button
            if (e.target.closest('.no-flip')) {
                return;
            }
            // Toggle the flip animation
            this.classList.toggle('flipped');
        });
    });
});

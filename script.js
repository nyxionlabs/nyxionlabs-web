document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Hamburger Menu Toggle Logic ---
    const navToggle = document.getElementById('navToggle');
    const siteHeader = document.getElementById('site-header');

    if (navToggle && siteHeader) {
        navToggle.addEventListener('click', function() {
            // Toggles the 'active' class on the button for the hamburger animation
            navToggle.classList.toggle('active'); 
            // Toggles the 'menu-open' class on the header to reveal the menu dropdown
            siteHeader.classList.toggle('menu-open'); 

            // Accessibility: Update aria-expanded state
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- 2. Hero Video Deferral for Performance ---
    const heroVideo = document.getElementById('hero-video'); 
    
    if (heroVideo) {
        const source = heroVideo.querySelector('source');
        
        // Checks for the custom 'data-src' attribute from index.html
        if (source && source.dataset.src) {
            
            // Set the actual source path from the data attribute
            source.src = source.dataset.src; 
            
            // Force the browser to load and play the video
            heroVideo.load();
            heroVideo.play().catch(error => {
                // This catches the common "browser blocked autoplay" error
                console.warn('Video autoplay blocked by browser policy or error:', error);
            });
        } else {
             console.error('Video source setup error: Missing data-src attribute or <source> element.');
        }
    }
    
    // --- 3. Simple Visibility Observer (for Fade-Up/Animation classes) ---
    // This is a minimal observer to handle the 'fade-up' and 'reveal-words' animations 
    // that are currently in your HTML/CSS structure.
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stop observing once it's animated to save resources
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Element is considered visible when 10% is in view
        rootMargin: '0px 0px -50px 0px' // Start checking slightly early
    });

    // Target all animation elements
    document.querySelectorAll('.fade-up, .reveal-words, .banner, .process-card, .case-card').forEach(el => {
        observer.observe(el);
    });
});
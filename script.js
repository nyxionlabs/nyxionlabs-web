document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Hamburger Menu Toggle Logic ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const siteHeader = document.getElementById('site-header');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            // Toggles the 'open' class on the nav-links for CSS visibility (old logic)
            navLinks.classList.toggle('open'); 
            
            // Toggles the 'active' class on the button for the hamburger animation
            navToggle.classList.toggle('active'); 
            
            // Toggles the 'menu-open' class on the header for new mobile menu logic
            siteHeader.classList.toggle('menu-open'); 

            // Accessibility: Update aria-expanded state
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // --- 2. Hero Video Deferral for Performance (Runs only on index.html) ---
    const heroVideo = document.querySelector('.hero-video'); 
    
    if (heroVideo) {
        const source = heroVideo.querySelector('source');
        
        // Use a data attribute for deferral to avoid initial download
        // NOTE: Your HTML has 'src', not 'data-src'. We need to fix that in index.html for proper deferral.
        
        if (source && source.src === 'background-hero.mp4') {
            // Since index.html uses 'src="background-hero.mp4"', we'll apply a standard fix:
            // This is a minimal fix for the existing HTML structure:
            
            // For proper deferral, you must change <source src="background-hero.mp4">
            // to <source data-src="background-hero.mp4"> in index.html
            
            // If you can't change the HTML, rely on CSS to hide on mobile.
            // If you CAN change the HTML, use this code (assuming HTML is updated):
            
            /*
            if (source && source.dataset.src) {
                source.src = source.dataset.src; 
                heroVideo.load();
                heroVideo.play().catch(error => {
                    console.warn('Video autoplay blocked:', error);
                });
            }
            */
        }
    }
});
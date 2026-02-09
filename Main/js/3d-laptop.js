// ===== 3D Laptop Animation with GSAP ScrollTrigger =====

// Lazy load GSAP only when the 3D section is in viewport
const laptop3DSection = document.querySelector('.laptop-showcase');

if (laptop3DSection) {
    // Intersection Observer to detect when section is visible
    const laptopObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, load GSAP
                loadGSAP();
                // Unobserve after loading (only load once)
                laptopObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px' // Start loading slightly before visible
    });

    // Start observing the laptop section
    laptopObserver.observe(laptop3DSection);
}

// Load GSAP and ScrollTrigger dynamically
function loadGSAP() {
    // Check if GSAP is already loaded
    if (window.gsap) {
        initLaptop3D();
        return;
    }

    // Create script element for GSAP
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    gsapScript.onload = () => {
        // Once GSAP is loaded, load ScrollTrigger
        const stScript = document.createElement('script');
        stScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        stScript.onload = initLaptop3D;
        document.body.appendChild(stScript);
    };
    gsapScript.onerror = () => {
        console.error('Failed to load GSAP. 3D animation will not work.');
    };

    document.body.appendChild(gsapScript);
}

// Initialize 3D laptop animation
function initLaptop3D() {
    // Verify GSAP is loaded
    if (!window.gsap || !window.ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const laptop3D = document.querySelector('.laptop-3d');
    if (!laptop3D) return;

    // Animate laptop rotation on scroll
    gsap.to('.laptop-3d', {
        rotateY: 360,
        rotateX: 15,
        scrollTrigger: {
            trigger: '.laptop-showcase',
            start: 'top center', // Animation starts when top of section hits center of viewport
            end: 'bottom center', // Animation ends when bottom of section hits center
            scrub: 1, // Smooth scroll sync (1 second delay)
            // markers: true, // Uncomment for debugging
        }
    });

    // Animate code lines with stagger effect
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        gsap.from(codeLines, {
            opacity: 0,
            x: -20,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.laptop-showcase',
                start: 'top center',
                toggleActions: 'play none none none'
            }
        });
    }

    // Animate showcase text
    const showcaseText = document.querySelector('.showcase-text');
    if (showcaseText) {
        gsap.from(showcaseText, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.showcase-text',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }

    console.log('✅ 3D Laptop animation initialized with GSAP');
}

// Fallback: Simple CSS animation if GSAP fails to load
window.addEventListener('load', () => {
    setTimeout(() => {
        // Check if GSAP was loaded
        if (!window.gsap && laptop3DSection) {
            console.warn('GSAP not loaded, using CSS fallback animation');

            // Add simple CSS animation class
            const laptop3D = document.querySelector('.laptop-3d');
            if (laptop3D) {
                laptop3D.style.animation = 'simpleLaptopRotate 10s ease-in-out infinite alternate';
            }

            // Define fallback CSS animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes simpleLaptopRotate {
                    0% {
                        transform: rotateY(-10deg) rotateX(5deg);
                    }
                    100% {
                        transform: rotateY(10deg) rotateX(-5deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }, 3000); // Wait 3 seconds for GSAP to load
});

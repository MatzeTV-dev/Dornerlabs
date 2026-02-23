// ===================================
// DORNERLABS MAIN - INTERACTIONS
// ===================================

// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = (selector, delay = 0) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * delay}s`;
        observer.observe(element);
    });
};

// Apply animations
animateOnScroll('.service-card', 0.1);
animateOnScroll('.pricing-card', 0.1);
animateOnScroll('.portfolio-card', 0.1);

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--electric);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Formspree handle the submission
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;

        button.innerHTML = '<span>WIRD GESENDET...</span>';
        button.disabled = true;

        // Reset after 3 seconds (Formspree will redirect)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    });
}

// ===== REVEAL ON SCROLL =====
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(section);
});

// ===== DYNAMIC TEXT EFFECT =====
const heroAccent = document.querySelector('.hero__title-line--accent');
if (heroAccent) {
    const text = heroAccent.textContent;
    heroAccent.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroAccent.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 DORNERLABS', 'font-size: 24px; font-weight: bold; color: #d0ff00; background: #0a0a0a; padding: 10px 20px;');
console.log('%cWeb Development & Consulting', 'font-size: 14px; color: #888;');
console.log('%c💼 Interessiert an einer Zusammenarbeit? Kontaktieren Sie uns!', 'font-size: 12px; color: #d0ff00;');

// ===== PERFORMANCE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✅ Website loaded successfully!', 'font-size: 12px; color: #d0ff00; font-weight: bold;');
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to top
    if (e.key === 'h' || e.key === 'H') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        const contact = document.getElementById('contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ===== EASTER EGG =====
let clickCount = 0;
const logo = document.querySelector('.nav__logo');

if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        clickCount++;

        if (clickCount === 5) {
            document.body.style.animation = 'hueRotate 3s linear';
            setTimeout(() => {
                document.body.style.animation = '';
                clickCount = 0;
            }, 3000);

            console.log('%c🎨 Easter Egg Activated!', 'font-size: 16px; color: #d0ff00; font-weight: bold;');
        }
    });
}

// Add hue rotate animation
const style = document.createElement('style');
style.textContent = `
    @keyframes hueRotate {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

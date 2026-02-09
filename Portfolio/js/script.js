// ===== Mobile Navigation =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

function toggleMenu() {
    navMenu.classList.toggle('active');
    body.classList.toggle('menu-open');

    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    const isActive = navMenu.classList.contains('active');
    spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = isActive ? '0' : '1';
    spans[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
}

function closeMenu() {
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Intersection Observer for Scroll Animations =====
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

// Fallback: Make all elements visible after 2 seconds if they're still hidden
// This ensures content is visible even if IntersectionObserver doesn't work properly (e.g., with file:// protocol)
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.tech-card, .project-card, .showcase-card, .timeline-item');
    hiddenElements.forEach(element => {
        if (parseFloat(getComputedStyle(element).opacity) < 0.5) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}, 2000);

// Observe all tech cards
document.querySelectorAll('.tech-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe all project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe all showcase cards
document.querySelectorAll('.showcase-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(item);
});

// ===== Particle Background Effect =====
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return; // Guard clause - exit if hero section doesn't exist

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Call particle creation
createParticles();

// ===== Terminal Typing Effect Enhancement =====
function typeWriter(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }

    type();
}

// Enhance terminal animations on page load
window.addEventListener('load', () => {
    const terminalOutputs = document.querySelectorAll('.terminal-output');

    setTimeout(() => {
        terminalOutputs.forEach((output, index) => {
            const text = output.textContent;
            output.textContent = '';
            setTimeout(() => {
                typeWriter(output, text);
            }, index * 2000);
        });
    }, 1000);
});

// ===== Mouse Trail Effect =====
// Use matchMedia instead of window.innerWidth to avoid forced reflow
const isDesktop = window.matchMedia('(min-width: 769px)');
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (isDesktop.matches) {
    circles.forEach((circle) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';

            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    // Uncomment to enable mouse trail
    // animateCircles();
}

// ===== Scroll Progress Indicator =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// ===== Dynamic Year in Footer =====
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Matthias Dorner. All rights reserved.`;
}

// ===== Tech Stack Progress Animation =====
const techProgressBars = document.querySelectorAll('.tech-progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use data attribute to store target width and avoid reading style.width (forced reflow)
            const targetWidth = entry.target.getAttribute('data-width') || entry.target.style.width;
            if (!entry.target.hasAttribute('data-width')) {
                entry.target.setAttribute('data-width', targetWidth);
            }

            // Batch DOM writes to avoid layout thrashing
            requestAnimationFrame(() => {
                entry.target.style.width = '0';
                requestAnimationFrame(() => {
                    entry.target.style.width = targetWidth;
                });
            });

            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

techProgressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ===== Add Cursor Glow Effect =====
function createCursorGlow() {
    // Use matchMedia to avoid forced reflow
    const isDesktopGlow = window.matchMedia('(min-width: 769px)');
    if (!isDesktopGlow.matches) return;

    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;

        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

createCursorGlow();

// ===== Code Block Syntax Highlighting Enhancement =====
const codeBlock = document.querySelector('.code-block code');
if (codeBlock) {
    codeBlock.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    codeBlock.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);

        // Show easter egg message
        const message = document.createElement('div');
        message.textContent = '🎮 Developer Mode Activated! 🎮';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary-color);
            color: var(--bg-dark);
            padding: 2rem 3rem;
            border-radius: 10px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInUp 0.5s ease-out;
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== Console Message =====
console.log('%c🚀 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #00ff88;');
console.log('%cDeveloped by Matthias Dorner', 'font-size: 14px; color: #0099ff;');
console.log('%c💻 Looking for talented developers!', 'font-size: 12px; color: #8892b0;');

// ===== Performance Optimization =====
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('%c✅ Portfolio loaded successfully!', 'font-size: 12px; color: #00ff88; font-weight: bold;');

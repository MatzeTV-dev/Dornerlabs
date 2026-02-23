// ===================================
// MODERN PORTFOLIO - INTERACTIONS
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
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
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
animateOnScroll('.skill-card', 0.1);
animateOnScroll('.timeline-item', 0.15);
animateOnScroll('.tech-item', 0.05);
animateOnScroll('.project-card', 0.1);

// ===== TECH BAR ANIMATION =====
const techItems = document.querySelectorAll('.tech-item');

// Initialize all bars at 0%
techItems.forEach(item => {
    const bar = item.querySelector('.tech-item__bar');
    bar.style.setProperty('--level', '0%');
});

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.tech-item__bar');
            const level = bar.getAttribute('data-level');
            // Small delay for smooth animation
            setTimeout(() => {
                bar.style.setProperty('--level', `${level}%`);
            }, 100);
            techObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

techItems.forEach(item => {
    techObserver.observe(item);
});

// ===== PARALLAX EFFECT =====
const parallaxElements = document.querySelectorAll('.hero__image, .contact__accent');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===== DYNAMIC TEXT EFFECT =====
const heroTitle = document.querySelector('.hero__title-line--accent');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);
}

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

// ===== STATS COUNTER =====
const stats = document.querySelectorAll('.stat__number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetValue = target.textContent.replace(/\D/g, '');
            let currentValue = 0;
            const increment = targetValue / 50;
            const suffix = target.textContent.replace(/[0-9]/g, '');

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    target.textContent = targetValue + suffix;
                    clearInterval(counter);
                } else {
                    target.textContent = Math.floor(currentValue) + suffix;
                }
            }, 30);

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== IMAGE TILT EFFECT =====
const heroImage = document.querySelector('.hero__image-frame');
if (heroImage && window.innerWidth > 768) {
    heroImage.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        heroImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
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

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 DORNERLABS', 'font-size: 24px; font-weight: bold; color: #d0ff00; background: #0a0a0a; padding: 10px 20px;');
console.log('%cModern Portfolio - Designed & Developed by Matthias Dorner', 'font-size: 14px; color: #888;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'font-size: 12px; color: #d0ff00;');

// ===== PERFORMANCE =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('%c✅ Portfolio loaded successfully!', 'font-size: 12px; color: #d0ff00; font-weight: bold;');
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

// ===== THEME SWITCHER (Easter Egg) =====
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

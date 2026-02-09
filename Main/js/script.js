// ===== Core JavaScript for Dornerlabs Main Site =====

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

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

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

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
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

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .portfolio-card');
animatedElements.forEach((el, index) => {
    // Initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;

    // Observe
    animateOnScroll.observe(el);
});

// Fallback: Make all elements visible after 2 seconds if observer doesn't work
setTimeout(() => {
    animatedElements.forEach(el => {
        if (el.style.opacity === '0') {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}, 2000);

// ===== Contact Form Validation & Security =====

// Rate limiting storage
const formSubmissions = {};

// Spam pattern detection
function hasSpamPatterns(text) {
    // Check for excessive URLs
    const urlCount = (text.match(/https?:\/\//g) || []).length;
    if (urlCount > 2) return true;

    // Check for spam keywords
    const spamWords = ['cialis', 'viagra', 'casino', 'lottery', 'crypto', 'bitcoin', 'prize', 'winner'];
    return spamWords.some(word => text.toLowerCase().includes(word));
}

// Rate limiting check
function checkRateLimit(email) {
    const now = Date.now();
    const lastTime = formSubmissions[email] || 0;

    // 30 seconds minimum between submissions
    if (now - lastTime < 30000) {
        return false;
    }

    formSubmissions[email] = now;
    return true;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const service = document.getElementById('service').value;

        let errors = [];

        // Validate name
        if (name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        // Validate email
        if (!validateEmail(email)) {
            errors.push('Please enter a valid email address');
        }

        // Check rate limit
        if (!checkRateLimit(email)) {
            errors.push('Please wait 30 seconds before submitting another message');
        }

        // Check spam patterns
        if (hasSpamPatterns(message)) {
            errors.push('Your message contains suspicious content');
        }

        // Validate message length
        if (message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (message.trim().length > 5000) {
            errors.push('Message must not exceed 5000 characters');
        }

        // If there are errors, show them and don't submit
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }

        // If validation passes, submit the form
        this.submit();

        // Show success message (optional)
        console.log('Form submitted successfully!');
    });

    // Real-time validation feedback
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    emailInput.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        if (length < 10 || length > 5000) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });
}

// ===== Language Preference Storage (Optional) =====
const currentLang = document.documentElement.lang;
if (currentLang) {
    localStorage.setItem('preferredLanguage', currentLang);
}

// ===== Console Easter Egg (Optional) =====
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #6b7280;');
console.log('%c🌐 dornerlabs.com', 'font-size: 14px; color: #0066ff; font-weight: bold;');

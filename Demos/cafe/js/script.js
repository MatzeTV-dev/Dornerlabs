// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-advance slider every 5 seconds
if (slides.length > 0) {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Menu Tab Switching
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');

        // Remove active class from all tabs and categories
        menuTabs.forEach(t => t.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        // Add active class to clicked tab and corresponding category
        tab.classList.add('active');
        document.getElementById(category).classList.add('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Check if privacy checkbox is checked
        if (!data.privacy) {
            alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
            return;
        }

        // Here you would normally send the data to a server
        console.log('Form data:', data);

        // Show success message
        alert('Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.');

        // Reset form
        contactForm.reset();
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

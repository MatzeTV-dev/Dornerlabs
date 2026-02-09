// Mobile Navigation
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = mobileToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) {
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Menu Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Remove active from all buttons and categories
        tabBtns.forEach(b => b.classList.remove('active'));
        menuCategories.forEach(c => c.classList.remove('active'));

        // Add active to clicked button and corresponding category
        btn.classList.add('active');
        const targetCategory = document.getElementById(tab);
        if (targetCategory) {
            targetCategory.classList.add('active');
        }
    });
});

// Reservation Form
document.getElementById('reservationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Vielen Dank für Ihre Reservierungsanfrage! Wir melden uns schnellstmöglich bei Ihnen.');
    this.reset();
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// DOM Elements
const backToTopBtn = document.getElementById('back-to-top');
const app = document.getElementById('app');

// Show/Hide Back to Top button
function handleScroll() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize price ticker
function initPriceTicker() {
    const prices = document.querySelectorAll('.price');
    
    // Simulate live price updates
    setInterval(() => {
        prices.forEach(price => {
            const currentPrice = parseFloat(price.textContent.replace('$', ''));
            const change = (Math.random() - 0.5) * 0.1;
            const newPrice = (currentPrice + change).toFixed(2);
            price.textContent = `$${newPrice}`;
            
            // Add color animation
            price.style.color = change >= 0 ? '#22c55e' : '#ef4444';
            setTimeout(() => {
                price.style.color = '#22c55e';
            }, 500);
        });
    }, 3000);
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
backToTopBtn.addEventListener('click', scrollToTop);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPriceTicker();
});

// Handle navigation
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

// Handle quick action items
const quickActionItems = document.querySelectorAll('.quick-action-item');
quickActionItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        item.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add touch support for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

app.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

app.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const difference = touchStartY - touchEndY;
    if (Math.abs(difference) > 100) {
        if (difference > 0) {
            // Swipe up - show back to top button
            backToTopBtn.classList.add('visible');
        } else {
            // Swipe down - hide back to top button
            backToTopBtn.classList.remove('visible');
        }
    }
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'images/placeholder.png';
    });
});

// Add responsive font sizing
function adjustFontSize() {
    const width = window.innerWidth;
    const baseFontSize = width < 380 ? 14 : 16;
    document.documentElement.style.fontSize = `${baseFontSize}px`;
}

window.addEventListener('resize', adjustFontSize);
adjustFontSize();

// Add dark mode support
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
function handleDarkMode(e) {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

prefersDark.addListener(handleDarkMode);
handleDarkMode(prefersDark);

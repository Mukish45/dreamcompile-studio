// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initScrollEffects();
    initSmoothScrolling();
    initMobileMenu();
    
    // Initialize animations after a short delay
    setTimeout(initAnimations, 100);
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                ? 'rgba(15, 23, 42, 0.9)' 
                : 'rgba(255, 255, 255, 0.9)';
        }
    });
    
    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme, icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Progress indicator
    createProgressIndicator();
}

// Create scroll progress indicator
function createProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
            pointer-events: none;
        }
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-500), var(--accent-pink));
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBarFill.style.width = scrollPercent + '%';
    });
}

// Initialize animations
function initAnimations() {
    // Add initial animation classes
    const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    elements.forEach((el, index) => {
        // Add staggered delay
        el.style.transitionDelay = `${index * 0.1}s`;
        
        // Trigger animation if element is in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100);
        }
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add scroll performance optimization
window.addEventListener('scroll', throttle(() => {
    // Handle scroll-dependent animations here
}, 16)); // ~60fps

// Add resize handler
window.addEventListener('resize', debounce(() => {
    // Handle responsive updates
    const nav = document.querySelector('.nav');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        document.getElementById('nav-toggle').querySelector('i').className = 'fas fa-bars';
    }
}, 250));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.getElementById('nav-toggle').querySelector('i').className = 'fas fa-bars';
        }
    }
});

// Add loading state management
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.remove();
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could add user-friendly error notifications here
});

// Add performance monitoring
function logPerformance() {
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
    }
}

// Log performance after page load
window.addEventListener('load', () => {
    setTimeout(logPerformance, 1000);
});

// Add touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const navMenu = document.getElementById('nav-menu');
        
        if (diff > 0 && navMenu.classList.contains('active')) {
            // Swipe left - close menu
            navMenu.classList.remove('active');
            document.getElementById('nav-toggle').querySelector('i').className = 'fas fa-bars';
        }
    }
}

// Add focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trap for mobile menu
const navMenu = document.getElementById('nav-menu');
if (navMenu) {
    trapFocus(navMenu);
} 
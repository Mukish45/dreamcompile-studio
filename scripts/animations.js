// Animations JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initParticleEffects();
    initHoverEffects();
    initCounterAnimations();
    initScrollAnimations();
});

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.getAttribute('data-text');
        if (text) {
            const words = text.split(',');
            startTypewriter(element, words);
        }
    });
}

function startTypewriter(element, words) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = '';
    
    function type() {
        const fullWord = words[wordIndex];
        
        if (isDeleting) {
            currentWord = fullWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentWord = fullWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        element.textContent = currentWord;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Particle Effects
function initParticleEffects() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createParticleSystem(heroSection);
    }
}

function createParticleSystem(container) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    container.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 400);
    }
}

// Hover Effects
function initHoverEffects() {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.btn, .project-card, .blog-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.1;
            const rotateX = (y / rect.height) * 10;
            const rotateY = -(x / rect.width) * 10;
            
            element.style.transform = `
                translate3d(${x * strength}px, ${y * strength}px, 0)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
        });
    });
    
    // Ripple effect for buttons
    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(button => {
        button.classList.add('btn-ripple');
        
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 10px;
                height: 10px;
                margin-left: -5px;
                margin-top: -5px;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Advanced Scroll Animations
function initScrollAnimations() {
    // Parallax scrolling for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    
    // Reveal animations with different directions
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => revealObserver.observe(element));
    
    // Staggered animation for groups
    const staggerGroups = document.querySelectorAll('.stagger-group');
    
    staggerGroups.forEach(group => {
        const children = group.children;
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                    staggerObserver.unobserve(group);
                }
            });
        });
        
        staggerObserver.observe(group);
    });
}

// Text animations
function initTextAnimations() {
    // Split text for character-by-character animation
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.6s ease forwards;
                animation-delay: ${index * 0.05}s;
            `;
            element.appendChild(span);
        });
    });
    
    // Add fade in up animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const duration = 3 + Math.random() * 2; // 3-5 seconds
        const delay = index * 0.5; // Stagger the animations
        
        element.style.cssText += `
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
    });
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        // Remove old trail elements
        document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                width: ${10 - index}px;
                height: ${10 - index}px;
                background: var(--primary-500);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${(index + 1) / trailLength};
                left: ${point.x}px;
                top: ${point.y}px;
                transform: translate(-50%, -50%);
                transition: opacity 0.1s ease;
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                trailElement.remove();
            }, 100);
        });
    }
}

// Matrix rain effect (optional, can be enabled)
function initMatrixRain() {
    const matrix = document.createElement('div');
    matrix.className = 'matrix-rain';
    document.body.appendChild(matrix);
    
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    function createMatrixChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        matrix.appendChild(char);
        
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }
    
    setInterval(createMatrixChar, 200);
}

// Morphing shapes animation
function initMorphingShapes() {
    const shapes = document.querySelectorAll('.morphing-shape');
    
    shapes.forEach(shape => {
        let currentMorph = 0;
        const morphs = [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '58% 42% 75% 25% / 76% 46% 54% 24%',
            '50% 50% 33% 67% / 55% 27% 73% 45%',
            '33% 67% 58% 42% / 63% 68% 32% 37%'
        ];
        
        setInterval(() => {
            currentMorph = (currentMorph + 1) % morphs.length;
            shape.style.borderRadius = morphs[currentMorph];
        }, 2000);
    });
}

// Initialize all text animations
document.addEventListener('DOMContentLoaded', () => {
    initTextAnimations();
    initFloatingElements();
    
    // Initialize mouse trail (optional - can be resource intensive)
    // initMouseTrail();
    
    // Initialize matrix rain (optional - for extra Gen-Z effect)
    // initMatrixRain();
    
    initMorphingShapes();
});

// Performance optimization - pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const animatedElements = document.querySelectorAll('*');
    
    if (document.hidden) {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Reduce animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
} 
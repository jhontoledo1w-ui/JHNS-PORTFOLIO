// ===== TYPING EFFECT =====
const textElement = document.getElementById('type-name');
const myName = "Jhon Albert Toledo";
let i = 0;

function typeWriter() {
    if (i < myName.length) {
        textElement.innerHTML += myName.charAt(i);
        i++;
        setTimeout(typeWriter, 120);
    }
}

// ===== THEME TOGGLE - NO PHOTO EFFECTS =====
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');

// Check stored theme
if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Theme toggle - smooth lang walang photo effects
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    
    // Toggle theme immediately with smooth transition
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    
    // Update navbar
    updateNavbarBackground();
    
    // Apply dark mode entrance effects sa sections lang
    if (!isDark) {
        applyDarkModeEntranceEffects();
    }
    
    // Pulse effect sa theme icon lang
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// ===== PHOTO CLICK - WALANG THEME TOGGLE =====
const photoContainer = document.getElementById('photoContainer');

// Removed: Hindi na nagt-toggle ng dark mode yung photo
// Static na lang yung photo, walang effect

// ===== NAVBAR BACKGROUND =====
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (window.scrollY > 50) {
        navbar.style.background = isDark 
            ? 'rgba(0, 18, 32, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = isDark
            ? '0 5px 20px rgba(0,0,0,0.3)'
            : '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = isDark
            ? 'rgba(0, 18, 32, 0.5)'
            : 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = 'none';
    }
}

// ===== SMOOTH SCROLL & ACTIVE NAV =====
const navLinks = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    updateNavbarBackground();
});

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, tooltipId) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showTooltip(tooltipId);
        }).catch(() => {
            fallbackCopy(text, tooltipId);
        });
    } else {
        fallbackCopy(text, tooltipId);
    }
}

function fallbackCopy(text, tooltipId) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showTooltip(tooltipId);
    } catch (err) {
        console.error('Copy failed:', err);
    }
    
    document.body.removeChild(textArea);
}

function showTooltip(tooltipId) {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }
}

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, { threshold: 0.5, rootMargin: '0px' });

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillObserver.observe(grid);
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.skill-card, .project-card, .contact-card, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===== DARK MODE ENTRANCE EFFECTS (SECTIONS ONLY) =====
function applyDarkModeEntranceEffects() {
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach((section) => {
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        section.style.boxShadow = 'inset 0 0 100px rgba(0, 123, 255, 0.05)';
        
        setTimeout(() => {
            section.style.boxShadow = 'none';
        }, 800);
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
        }, index * 50);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    updateNavbarBackground();
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
});

// Add keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
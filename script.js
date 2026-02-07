// Luxury Edition - Premium Interactions (v2)

// ===== MAGNETIC BUTTONS =====
class MagneticButton {
  constructor() {
    this.buttons = document.querySelectorAll('.button, .nav-link-hover');
    this.init();
  }
  
  init() {
    // Только для десктопов
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    this.buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => this.handleMove(e, btn));
      btn.addEventListener('mouseleave', (e) => this.handleLeave(e, btn));
    });
  }
  
  handleMove(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }
  
  handleLeave(e, btn) {
    btn.style.transform = '';
  }
}

// ===== PARALLAX EFFECT =====
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.founder-card, .format__block, .gallery__large');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    this.elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const speed = 0.05 + (index * 0.02);
      const offset = (scrollY - rect.top) * speed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  }
}

// ===== REVEAL ON SCROLL =====
class RevealOnScroll {
  constructor() {
    this.items = document.querySelectorAll(
      'section, .level, .event-row, .speaker, .frame, .gallery__large, .founder-card, .quote'
    );
    
    this.init();
  }
  
  init() {
    this.items.forEach((el) => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // Add stagger delay for child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('is-visible');
              }, i * 100);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    
    this.items.forEach((el) => observer.observe(el));
  }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ===== LINE DRAW ANIMATION =====
class LineDrawAnimation {
  constructor() {
    this.init();
  }
  
  init() {
    setTimeout(() => {
      const bridge = document.querySelector('.hero__bridge');
      if (bridge) bridge.classList.add('animate');
    }, 500);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  new MagneticButton();
  new ParallaxEffect();
  new RevealOnScroll();
  new SmoothScroll();
  new LineDrawAnimation();
  
  // Add floating class to founder card
  const founderCard = document.querySelector('.founder-card');
  if (founderCard) {
    founderCard.classList.add('floating');
  }
  
  // Add stagger-item class to level elements
  const levels = document.querySelectorAll('.level');
  levels.forEach(level => level.classList.add('stagger-item'));
  
  // Add stagger-item to event rows
  const eventRows = document.querySelectorAll('.event-row');
  eventRows.forEach(row => row.classList.add('stagger-item'));
});

// ===== PERFORMANCE OPTIMIZATION =====
// Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}

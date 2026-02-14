class VelocityAnimations {
  constructor() {
    if (window.AnimationConfig && window.AnimationConfig.enabled) {
      this.init();
    }
  }

  init() {
    this.setupMarketSelector();
    this.setupMagneticButtons();
    this.setupPriceCalculator();
    this.setupCounterAnimations();
    this.setupScrollAnimations();
  }

  setupMarketSelector() {
    const modal = document.getElementById('marketSelectorModal');
    const preferredMarket = localStorage.getItem('preferredMarket');

    if (preferredMarket) {
      this.loadMarketContent(preferredMarket);
      return;
    }

    setTimeout(() => {
      modal.classList.add('active');
    }, 500);

    const marketCards = document.querySelectorAll('.market-card');
    marketCards.forEach(card => {
      card.addEventListener('click', () => {
        const market = card.dataset.market;
        localStorage.setItem('preferredMarket', market);
        modal.classList.remove('active');
        this.loadMarketContent(market);
      });
    });
  }

  loadMarketContent(market) {
    if (market === 'india') {
      document.querySelectorAll('.uae-only').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('.india-only').forEach(el => {
        el.style.display = '';
      });
    } else {
      document.querySelectorAll('.india-only').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('.uae-only').forEach(el => {
        el.style.display = '';
      });
    }
  }

  setupMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');

    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });

      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  setupPriceCalculator() {
    // calculateSavings is global function
  }

  animateCounter(element) {
    const targetText = element.dataset.count || element.textContent.replace(/\D/g, '');
    const target = parseInt(targetText);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        const suffix = element.dataset.suffix || '';
        element.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  setupCounterAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const counterElements = document.querySelectorAll('.trust-number');
    counterElements.forEach(element => {
      observer.observe(element);
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in', 'visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Global function for price calculator
window.calculateSavings = function() {
  const calcResults = document.getElementById('calcResults');
  calcResults.style.display = 'block';
  calcResults.classList.add('show');

  setTimeout(() => {
    const dealerBar = document.querySelector('.price-bar.dealer .price-bar-visual');
    if (dealerBar) {
      dealerBar.style.width = '100%';
    }
  }, 300);

  setTimeout(() => {
    const velocityBar = document.querySelector('.price-bar.velocity .price-bar-visual');
    if (velocityBar) {
      velocityBar.style.width = '63%';
    }
  }, 600);

  setTimeout(() => {
    const savingsHighlight = document.querySelector('.savings-highlight');
    if (savingsHighlight) {
      savingsHighlight.style.opacity = '1';
      savingsHighlight.style.transform = 'scale(1)';
    }
  }, 1200);
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new VelocityAnimations();
});

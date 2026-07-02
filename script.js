// Fades elements in when they enter the viewport,
// and fades them back out when they leave it,
// so the effect happens both scrolling down and scrolling back up.

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Animated fluid gradient background (Granim.js) ----------
  var granimInstance = new Granim({
    element: '#gradient-canvas',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          ['#eef3e9', '#b8f0d9'],
          ['#b7b5dd', '#dbf0f6'],
          ['#e9efe1', '#b7d8e4']
        ],
        transitionSpeed: 5000
      }
    }
  });

  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.15,      // element needs to be ~15% visible to trigger
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach((el) => observer.observe(el));

  // ---------- Dropdown menu (tap support for touch devices) ----------
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  }

  // ---------- Scroll hint fade out on scroll ----------
  const scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      const opacity = Math.max(0, 1 - window.scrollY / 80);
      scrollHint.style.animation = 'none';
      scrollHint.style.opacity = opacity;
      scrollHint.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
    }, { passive: true });
  }

});
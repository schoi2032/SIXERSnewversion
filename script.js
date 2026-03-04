document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = [
    'header h1',
    '.subtitle',
    'nav li',
    '.section',
    '.section-title',
    '.section-subtitle',
    '.news-card',
    '.event-card',
    '.interview-card',
    '.spotlight-profile',
    '.bulletin-item',
    '.comedy-container',
    '.article-card',
    '.simulation-card',
    '.gallery-item',
    '.video-item',
    '.home-video-wrap',
    'footer p'
  ];

  const revealElements = Array.from(document.querySelectorAll(revealSelectors.join(',')));

  if (!revealElements.length) {
    return;
  }

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(index % 10) * 70}ms`);

    // Alternate direction so cards slide in from left and right while scrolling.
    if (index % 2 === 1) {
      el.classList.add('from-right');
    }

    if (index % 5 === 0) {
      el.classList.add('from-up');
    }
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px 80px' });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

window.addEventListener('load', () => {
  window.setTimeout(() => revealElements.forEach(element => element.classList.add('visible')), 1200);
});

const shootingStarLayer = document.querySelector('.shooting-stars');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (shootingStarLayer && !reducedMotion.matches) {
  const createShootingStar = () => {
    if (document.hidden) {
      scheduleShootingStar();
      return;
    }

    const star = document.createElement('span');
    const duration = 1200 + Math.random() * 550;
    star.className = 'shooting-star';
    star.style.setProperty('--star-x', `${72 + Math.random() * 28}%`);
    star.style.setProperty('--star-y', `${5 + Math.random() * 34}%`);
    star.style.setProperty('--star-duration', `${duration}ms`);
    shootingStarLayer.appendChild(star);

    window.setTimeout(() => star.remove(), duration + 150);
    scheduleShootingStar();
  };

  const scheduleShootingStar = () => {
    const delay = 4500 + Math.random() * 5000;
    window.setTimeout(createShootingStar, delay);
  };

  window.setTimeout(createShootingStar, 1800);
}

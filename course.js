/* THE REEL RECIPE — course.js */

const navbar     = document.getElementById('navbar');
const menuBtn    = document.getElementById('menuBtn');
const iconMenu   = document.getElementById('iconMenu');
const iconX      = document.getElementById('iconX');
const mobileMenu = document.getElementById('mobileMenu');

/* Navbar scroll effect */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

/* Mobile menu */
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    iconMenu.style.display = open ? 'none'  : 'block';
    iconX.style.display    = open ? 'block' : 'none';
    navbar.classList.toggle('menu-open', open);
  });
}

function closeMobile() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (iconMenu) iconMenu.style.display = 'block';
  if (iconX)    iconX.style.display    = 'none';
  navbar.classList.remove('menu-open');
}

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '-30px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* Footer year */
const footerCopy = document.getElementById('footerCopy');
if (footerCopy) {
  footerCopy.textContent = `© ${new Date().getFullYear()} The Reel Recipe. All rights reserved.`;
}

/* =========================================================
   THE REEL RECIPE — Static JS
   ========================================================= */

/* ── Year ── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Navbar scroll effect ── */
const navbar    = document.getElementById('navbar');
const menuBtn   = document.getElementById('menuBtn');
const iconMenu  = document.getElementById('iconMenu');
const iconX     = document.getElementById('iconX');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}, { passive: true });

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  iconMenu.style.display = open ? 'none'  : 'block';
  iconX.style.display    = open ? 'block' : 'none';
  navbar.classList.toggle('menu-open', open);
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  iconMenu.style.display = 'block';
  iconX.style.display    = 'none';
  navbar.classList.remove('menu-open');
}

/* ── Particles ── */
(function spawnParticles() {
  const container = document.getElementById('particles');
  const colors = ['#3DE2AA', '#7640E0', '#F472B6'];
  const sizes  = [5, 3, 2];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const idx = i % 3;
    const s   = sizes[idx];
    Object.assign(el.style, {
      width:  s + 'px',
      height: s + 'px',
      top:    (10 + (i * 7) % 80) + '%',
      left:   (5  + (i * 11) % 90) + '%',
      background: colors[idx],
      '--dur':   (3 + i * 0.5) + 's',
      '--delay': (i * 0.3) + 's',
    });
    container.appendChild(el);
  }
})();

/* ── Scroll reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '-50px' });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

/* ── Animated stat numbers ── */
function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(target * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      animateNumber(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));

/* ── Follower count animation ── */
function formatFollowers(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function animateFollower(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 3500;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatFollowers(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('[data-count]').forEach(animateFollower);
  }, 1600);
});

/* ── Service modal data ── */
const services = {
  content: {
    cat: 'Content',
    title: 'Content Creation',
    desc: 'Our content creation stands out by creating a deep emotional connection with audiences, driving higher engagement and reach. We focus on authentic storytelling and understanding social media trends, resulting in content that resonates and is widely shared.',
    includes: [
      'Content strategy & planning',
      'Trend-driven reels & TikToks',
      'Community-building posts',
      'Platform-optimized formats',
      'Monthly content calendars',
    ],
    accentBg:  'rgba(103,193,159,0.1)',
    accentClr: '#67c19f',
    gradient:  'linear-gradient(90deg, rgba(103,193,159,0.4), transparent)',
    iconSvg: `<svg width="26" height="26" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="22" height="16" rx="3.5" fill="currentColor" fill-opacity="0.3"/>
      <rect x="2" y="8" width="22" height="16" rx="3.5" stroke="currentColor" stroke-width="1.8"/>
      <path d="M24 12.5L31 8.5v15l-7-4v-7z" fill="currentColor"/>
      <circle cx="7" cy="13" r="1.1" fill="currentColor"/>
    </svg>`,
    video: 'https://www.instagram.com/thereelrecipe',
    videoLabel: 'Watch Example',
    videoSub: 'View on Instagram',
  },
  ugc: {
    cat: 'Content',
    title: 'UGC',
    desc: 'User-generated content at its most authentic. We partner with real creators and everyday users to produce raw, relatable content that builds trust and drives conversions — the kind of content that stops the scroll because it doesn\'t look like an ad.',
    includes: [
      'Creator network & matching',
      'Content brief development',
      'Raw, authentic production',
      'Multi-platform optimization',
      'Performance tracking',
    ],
    accentBg:  'rgba(34,211,238,0.1)',
    accentClr: '#22d3ee',
    gradient:  'linear-gradient(90deg, rgba(34,211,238,0.4), transparent)',
    iconSvg: `<svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.5 5.3c-3.1.2-4.5 2.6-4.1 5.1.4 2.4 1.9 3.6 4.4 3.6 2.4 0 4.3-1.1 4.3-3.7 0-2.8-1.6-5.2-4.6-5z"/>
      <path d="M3.2 25.5c.3-4.6 3.2-8 9-8.2 5.7-.2 8.6 3 9.1 8"/>
      <path d="M22.8 8.5c-2 .3-2.8 1.9-2.5 3.4.3 1.5 1.4 2.3 2.9 2.3 1.5 0 2.8-.8 2.7-2.5-.1-1.9-1-3.4-3.1-3.2z"/>
      <path d="M20 22.3c.4-3.2 1.9-5.5 4.6-5.6 2.7-.1 4.2 1.9 4.6 5.3"/>
    </svg>`,
  },
  media: {
    cat: 'Marketing',
    title: 'Media Buying',
    desc: 'We handle end-to-end media buying across Meta, TikTok, Google, and more. Our team optimizes ad spend to maximize reach and conversions, using real-time data to adjust campaigns for the best possible ROAS.',
    includes: [
      'Multi-platform ad management',
      'Audience targeting & segmentation',
      'Budget optimization',
      'Real-time performance tracking',
      'Weekly reporting',
    ],
    accentBg:  'rgba(251,113,133,0.1)',
    accentClr: '#fb7185',
    gradient:  'linear-gradient(90deg, rgba(251,113,133,0.4), transparent)',
    iconSvg: `<svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor">
      <circle cx="16" cy="16" r="13.5" opacity="0.22"/>
      <circle cx="16" cy="16" r="9" opacity="0.45"/>
      <circle cx="16" cy="16" r="4.5"/>
      <path d="M27 5l-3.2 3.2-1.5-1.5L27 5z"/>
      <path d="M16 16l8.2-8.2" stroke="currentColor" stroke-width="1.8"/>
    </svg>`,
  },
};

function openModal(key) {
  const s = services[key];
  if (!s) return;

  const checkIcon = `<svg class="modal-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${s.accentClr}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

  const videoSection = s.video ? `
    <div style="margin-bottom:1.5rem">
      <h4 class="modal-includes-title">See It In Action</h4>
      <a href="${s.video}" target="_blank" rel="noopener noreferrer"
         style="display:flex;align-items:center;gap:.75rem;background:rgba(255,255,255,0.04);backdrop-filter:blur(40px);border:0.5px solid rgba(255,255,255,0.08);border-radius:.75rem;padding:1rem;text-decoration:none;transition:border-color .3s"
         onmouseover="this.style.borderColor='rgba(255,255,255,0.15)'"
         onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
        <div style="display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:.75rem;background:${s.accentBg};color:${s.accentClr};flex-shrink:0">
          ${s.iconSvg}
        </div>
        <div style="flex:1">
          <span style="display:block;font-size:.875rem;color:#fff;font-weight:500">${s.videoLabel}</span>
          <span style="display:block;font-size:.75rem;color:#86868b">${s.videoSub}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  ` : '';

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-header">
      <div class="modal-icon" style="background:${s.accentBg};color:${s.accentClr}">${s.iconSvg}</div>
      <div>
        <span class="modal-cat">${s.cat}</span>
        <h3 class="modal-title">${s.title}</h3>
      </div>
    </div>
    <div class="modal-divider" style="background:${s.gradient}"></div>
    <p class="modal-desc">${s.desc}</p>
    <div style="margin-bottom:2rem">
      <h4 class="modal-includes-title">What's Included</h4>
      <div class="modal-includes">
        ${s.includes.map(item => `
          <div class="modal-include-item">
            ${checkIcon}
            <span class="modal-include-text">${item}</span>
          </div>
        `).join('')}
      </div>
    </div>
    ${videoSection}
    <a href="#contact-form"
       onclick="closeModal()"
       style="display:flex;align-items:center;justify-content:center;gap:.5rem;width:100%;border-radius:9999px;padding:.875rem;font-size:.875rem;font-weight:500;color:#fff;background:linear-gradient(135deg,rgba(108,86,164,0.85),rgba(133,112,184,0.85));border:0.5px solid rgba(255,255,255,0.2);box-shadow:inset 0 0.5px 0 rgba(255,255,255,0.25),0 4px 16px rgba(108,86,164,0.35);text-decoration:none;transition:transform .2s"
       onmouseover="this.style.transform='scale(1.03)'"
       onmouseout="this.style.transform='scale(1)'">
      Get a Free Quote
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </a>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* -------- LOADER -------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 700);
});

/* -------- PROGRESS BAR -------- */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

/* -------- NAVBAR SCROLL -------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* -------- BACK TO TOP -------- */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* -------- HAMBURGER -------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  hamburger.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
});
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

/* -------- THEME TOGGLE -------- */
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;
themeBtn.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

/* -------- TYPING EFFECT -------- */
const phrases = [
  'MBA Healthcare Management',
  'Hospital Administration Professional',
  'Pharmaceutical Management Specialist',
  'Healthcare Operations Enthusiast'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function type() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typingEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();

/* -------- INTERSECTION OBSERVER (Reveal) -------- */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObs.observe(el));

/* -------- SKILL BARS -------- */
const skillBars = document.querySelectorAll('.skill-bar');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = e.target.dataset.pct;
      e.target.style.width = pct + '%';
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObs.observe(bar));

/* -------- COUNTER ANIMATION -------- */
const counters = document.querySelectorAll('.ach-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.count;
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        e.target.textContent = cur + '+';
        if (cur >= target) clearInterval(timer);
      }, 40);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObs.observe(c));

/* -------- ACTIVE NAV LINK -------- */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

/* -------- MODAL -------- */
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

/* -------- FORM -------- */
function handleFormSubmit() {
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg = document.getElementById('cf-message').value.trim();
  if (!name || !email || !msg) { alert('Please fill in your name, email, and message.'); return; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) { alert('Please enter a valid email address.'); return; }
  const success = document.getElementById('form-success');
  success.style.display = 'block';
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-email').value = '';
  document.getElementById('cf-phone').value = '';
  document.getElementById('cf-message').value = '';
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}
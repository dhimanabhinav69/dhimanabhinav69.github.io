const cursor = document.querySelector('.cursor');
const progress = document.getElementById('progress');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section')];

window.addEventListener('mousemove', e => {
  if (!cursor) return;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .history-item, .education-grid article, .beyond-grid article').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function updateScrollState(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100))) : 0;
  if (progress) progress.textContent = pct + '%';
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 190) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', updateScrollState, { passive:true });
updateScrollState();


const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    setTimeout(() => contactForm.reset(), 800);
  });
}


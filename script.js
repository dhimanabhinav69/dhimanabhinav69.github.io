const cursor = document.querySelector('.cursor');
const progress = document.getElementById('progress');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section')];

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function updateScrollState(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100)));
  progress.textContent = pct + '%';
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', updateScrollState, { passive:true });
updateScrollState();

// subtle floating data blocks similar to reference
const backgrounds = document.querySelectorAll('.matrix-bg');
backgrounds.forEach(bg => {
  for(let i=0;i<34;i++){
    const block = document.createElement('span');
    block.style.cssText = `position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${24+Math.random()*40}px;height:${24+Math.random()*40}px;border:1px solid rgba(255,89,56,.18);background:rgba(0,0,0,.025);color:rgba(0,0,0,.08);font:12px var(--mono);display:grid;place-items:center;transform:translateY(${Math.random()*80}px);`;
    block.textContent = Math.random() > .6 ? '*' : Math.floor(Math.random()*5);
    bg.appendChild(block);
  }
});

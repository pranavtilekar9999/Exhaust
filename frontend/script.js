const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => {
  hdr.classList.toggle('scrolled', window.scrollY > 10);
});

const burger = document.getElementById('burger');
const mmenu = document.getElementById('mmenu');
burger.addEventListener('click', () => mmenu.classList.toggle('open'));
mmenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mmenu.classList.remove('open')));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const cv = document.getElementById('lines');
  const ctx = cv.getContext('2d');
  let w, h;
  const particles = [];
  function size() { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; }
  window.addEventListener('resize', size);
  size();
  for (let i = 0; i < 40; i++) {
    particles.push({ x: Math.random() * w, y: Math.random() * h, vx: 0.15 + Math.random() * 0.3, r: Math.random() * 1.2 + 0.3 });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,.15)';
    particles.forEach(p => {
      p.x += p.vx;
      if (p.x > w) p.x = -10;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 24, p.y);
      ctx.lineWidth = p.r;
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  draw();
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}

// Contact form -> backend API
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Request failed');
    status.textContent = 'Message sent. We will get back to you soon.';
    form.reset();
  } catch (err) {
    status.textContent = 'Something went wrong. Please email us directly.';
  }
});

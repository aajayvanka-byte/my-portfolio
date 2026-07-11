// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// NAV — scrolled state + mobile toggle
// ============================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  io.observe(el);
});

// ============================================================
// HERO — ambient neural network canvas
// ============================================================
const canvas = document.getElementById('netCanvas');
const ctx = canvas.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let width, height, nodes;
const NODE_COUNT_DIVISOR = 14000; // lower = more nodes
const LINK_DIST = 150;

function resize() {
  width = canvas.width = canvas.offsetWidth * devicePixelRatio;
  height = canvas.height = canvas.offsetHeight * devicePixelRatio;
}

function initNodes() {
  const count = Math.min(70, Math.floor((width * height) / (NODE_COUNT_DIVISOR * devicePixelRatio * devicePixelRatio)));
  nodes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  // links
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = LINK_DIST * devicePixelRatio;
      if (dist < maxDist) {
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.14 * (1 - dist / maxDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // nodes
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 180, 84, 0.55)';
    ctx.fill();
  }
}

function step() {
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  }
  draw();
  if (!reduceMotion) requestAnimationFrame(step);
}

if (canvas) {
  resize();
  initNodes();
  draw();
  if (!reduceMotion) requestAnimationFrame(step);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      initNodes();
      draw();
    }, 200);
  });
}

// ============================================================
// SMOOTH ANCHOR SCROLL OFFSET (accounts for fixed nav)
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
  });
});

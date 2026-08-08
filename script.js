document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollProgress();
  initTypingEffect();
  initHeroParticles();
  initTiltCards();
  initScrollObserver();
  initStatCounters();
  initMobileNav();
  initBackToTop();
  initContactForm();
});

function initCustomCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot = document.getElementById('cursor-dot');

  if (!glow || !dot) return;

  if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
    glow.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  });
}

function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

function initTypingEffect() {
  const roles = [
    'Full Stack Developer',
    'Java Developer',
    'Frontend Developer',
    'IT Engineering Student'
  ];

  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  const numParticles = 40;
  const particles = [];

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numParticles; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 107, 0, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(255, 107, 0, 0.8)';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

function initScrollObserver() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => navObserver.observe(sec));

  // Reveal animations on scroll
  const targets = document.querySelectorAll(
    '.section-header, .glass-card, .skill-group-card, .project-card, .timeline-card, .contact-info-card, .contact-form, .info-card, .focus-card'
  );

  targets.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(t => revealObserver.observe(t));
}

function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'));
          let count = 0;
          const step = Math.max(1, Math.ceil(target / 30));

          const interval = setInterval(() => {
            count += step;
            if (count >= target) {
              num.textContent = target;
              clearInterval(interval);
            } else {
              num.textContent = count;
            }
          }, 50);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSec = document.querySelector('.stats-section');
  if (statsSec) observer.observe(statsSec);
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  const icon = toggle.querySelector('i');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('active');
    const isActive = menu.classList.contains('active');
    
    if (icon) {
      if (isActive) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
    
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      if (icon) icon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('active');
      if (icon) icon.className = 'fa-solid fa-bars';
      document.body.style.overflow = '';
    }
  });
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';
      status.className = 'form-status success';
      status.textContent = 'Thank you! Your message has been sent to Ankit Rao successfully.';
      form.reset();

      setTimeout(() => { status.textContent = ''; }, 5000);
    }, 1200);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initCustomCursor();
  initScrollProgress();
  initTypingEffect();
  initTiltCards();
  initScrollObserver();
  initStatCounters();
  initMobileNav();
  initBackToTop();
  initContactForm();
  initTechStack3DBall();
  initTechViewTabs();
  initGlobal3DParticles();
});

function initPageLoader() {
  const loader = document.getElementById('page-loader');
  const bar = document.getElementById('loader-bar');
  const heroSection = document.getElementById('hero');

  if (!loader) return;

  if (bar) {
    setTimeout(() => {
      bar.style.width = '100%';
    }, 50);
  }

  setTimeout(() => {
    loader.classList.add('loaded');
    if (heroSection) {
      heroSection.classList.add('hero-entrance');
    }
  }, 750);
}

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

/* ==========================================================================
   3D TECH STACK INTERACTIVE BALL ENGINE & 3D BACKGROUND
   ========================================================================== */
function initTechStack3DBall() {
  const canvas = document.getElementById('tech-ball-canvas');
  const container = document.getElementById('tech-ball-container') || canvas?.parentElement;
  const hoverInfoName = document.getElementById('hover-skill-name');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width, height, radius;

  function resize() {
    width = canvas.width = container.clientWidth || 800;
    height = canvas.height = container.clientHeight || 500;
    radius = Math.min(width, height) * 0.36;
  }

  resize();
  window.addEventListener('resize', resize);

  const skills = [
    { name: 'Java', icon: 'fa-brands fa-java', color: '#f89820', level: '90%' },
    { name: 'C++', text: 'C++', color: '#00599c', level: '80%' },
    { name: 'C', text: 'C', color: '#a8b9cc', level: '85%' },
    { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab', level: '75%' },
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#e34f26', level: '95%' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572b6', level: '90%' },
    { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e', level: '88%' },
    { name: 'React', icon: 'fa-brands fa-react', color: '#61dafb', level: '88%' },
    { name: 'Next.js', text: 'N', color: '#ffffff', level: '85%' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933', level: '82%' },
    { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#f05032', level: '90%' },
    { name: 'GitHub', icon: 'fa-brands fa-github', color: '#ffffff', level: '92%' },
    { name: 'VS Code', icon: 'fa-solid fa-code', color: '#007acc', level: '95%' },
    { name: 'MySQL', icon: 'fa-solid fa-database', color: '#4479a1', level: '85%' },
    { name: 'PostgreSQL', icon: 'fa-solid fa-server', color: '#336791', level: '80%' },
    { name: 'MongoDB', icon: 'fa-solid fa-leaf', color: '#47a248', level: '80%' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ed', level: '78%' },
    { name: 'Tailwind', icon: 'fa-solid fa-wind', color: '#38bdf8', level: '85%' },
    { name: 'Linux', icon: 'fa-brands fa-linux', color: '#fcc624', level: '80%' },
    { name: 'Figma', icon: 'fa-brands fa-figma', color: '#f24e1e', level: '75%' },
    { name: 'DSA', icon: 'fa-solid fa-diagram-project', color: '#ff6b00', level: '82%' },
    { name: 'OOP', icon: 'fa-solid fa-cubes', color: '#ffa800', level: '88%' },
    { name: 'Antigravity AI', icon: 'fa-solid fa-wand-magic-sparkles', color: '#9d4edf', level: '90%' }
  ];

  // Distribute items uniformly on a 3D sphere using Fibonacci algorithm
  // Distribute items uniformly on a 3D sphere using Fibonacci algorithm
  const total = skills.length;
  const nodes = skills.map((skill, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    return {
      ...skill,
      ox: Math.sin(phi) * Math.cos(theta),
      oy: Math.sin(phi) * Math.sin(theta),
      oz: Math.cos(phi),
      x: 0,
      y: 0,
      z: 0,
      projX: 0,
      projY: 0,
      scale: 1,
      alpha: 1,
      localAngle: Math.random() * Math.PI * 2,
      spinVel: 0
    };
  });

  let rotX = 0.2;
  let rotY = 0.2;
  let velX = 0;
  let velY = 0.003;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let hoveredNode = null;

  // Pointer Down
  function onPointerDown(e) {
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastPointerX = clientX;
    lastPointerY = clientY;
  }

  // Pointer Move (Rotates 3D Ball ONLY when pointer is ON the 3D ball)
  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;

    const centerX = width / 2;
    const centerY = height / 2;
    const distFromSphereCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
    const isPointerOnBall = distFromSphereCenter <= (radius + 55) || isDragging;

    // Rotate 3D sphere ONLY when pointer is ON the 3D ball area!
    if (isPointerOnBall && lastPointerX !== 0 && lastPointerY !== 0) {
      const deltaX = clientX - lastPointerX;
      const deltaY = clientY - lastPointerY;

      velY = deltaX * 0.005;
      velX = -deltaY * 0.005;

      rotY += velY;
      rotX += velX;
    }

    lastPointerX = clientX;
    lastPointerY = clientY;

    // Raycast check for hover node
    let closestNode = null;
    let maxZ = -Infinity;

    nodes.forEach((node) => {
      const dist = Math.hypot(node.projX - mouseX, node.projY - mouseY);
      const hitRadius = 32 * node.scale;
      if (dist < hitRadius && node.z > maxZ) {
        maxZ = node.z;
        closestNode = node;
      }
    });

    hoveredNode = closestNode;
    if (hoveredNode) {
      if (hoverInfoName) {
        hoverInfoName.innerHTML = `<strong style="color: ${hoveredNode.color}">${hoveredNode.name}</strong> • Level: ${hoveredNode.level}`;
      }
    } else if (hoverInfoName && !isDragging) {
      hoverInfoName.textContent = 'Hover over any 3D skill ball';
    }
  }

  // Pointer Up
  function onPointerUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  // Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    if (!isDragging) {
      rotY += velY;
      rotX += velX;
      velY *= 0.95;
      velX *= 0.95;

      if (Math.abs(velY) < 0.001) velY = 0.002;
    }

    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    const fov = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    nodes.forEach((node) => {
      // 3D rotation math around Y then X
      let x1 = node.ox * cosY + node.oz * sinY;
      let z1 = -node.ox * sinY + node.oz * cosY;

      let y2 = node.oy * cosX - z1 * sinX;
      let z2 = node.oy * sinX + z1 * cosX;

      node.x = x1 * radius;
      node.y = y2 * radius;
      node.z = z2 * radius;

      // Perspective Projection
      const scale = fov / (fov - node.z);
      node.scale = scale;
      node.projX = centerX + node.x * scale;
      node.projY = centerY + node.y * scale;
      node.alpha = Math.max(0.25, (node.z + radius) / (2 * radius));
    });

    // Sort by Z for proper 3D rendering (back to front)
    nodes.sort((a, b) => a.z - b.z);

    nodes.forEach((node) => {
      const isHovered = hoveredNode === node;
      const ballRadius = (isHovered ? 34 : 26) * node.scale;

      ctx.save();
      // 100% Opaque - No transparency!
      ctx.globalAlpha = 1.0;

      // 1. Heavy Solid Opaque Drop Shadow
      ctx.beginPath();
      ctx.arc(node.projX + 5 * node.scale, node.projY + 7 * node.scale, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fill();

      // 2. Outer Neon Glow Rim (Only on Hover)
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, ballRadius + 6, 0, Math.PI * 2);
        ctx.fillStyle = node.color + '66';
        ctx.fill();
      }

      // 3. Base Solid Fill (Guarantees 0% Transparency)
      ctx.beginPath();
      ctx.arc(node.projX, node.projY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#161424';
      ctx.fill();

      // 4. Solid 3D Rough Metallic Spherical Gradient Shading
      ctx.beginPath();
      ctx.arc(node.projX, node.projY, ballRadius, 0, Math.PI * 2);

      const sphereGrad = ctx.createRadialGradient(
        node.projX - ballRadius * 0.32,
        node.projY - ballRadius * 0.32,
        ballRadius * 0.05,
        node.projX,
        node.projY,
        ballRadius
      );

      const baseColor = node.color;
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.2, baseColor);
      sphereGrad.addColorStop(0.65, adjustColor(baseColor, -90));
      sphereGrad.addColorStop(1, '#050409');

      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // 5. Solid Hard Bevel Rim Stroke
      ctx.lineWidth = isHovered ? 3.2 : 2.0;
      ctx.strokeStyle = isHovered ? '#ffffff' : baseColor;
      ctx.stroke();

      // 6. Hard Specular Light Reflection Arc
      ctx.beginPath();
      ctx.arc(node.projX - ballRadius * 0.28, node.projY - ballRadius * 0.28, ballRadius * 0.42, Math.PI * 1.1, Math.PI * 1.75);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = Math.max(1.2, 2 * node.scale);
      ctx.stroke();

      // 7. Opaque Icon & Text inside ball
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (node.text) {
        ctx.font = `800 ${14 * node.scale}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.text, node.projX, node.projY - 2);
      } else {
        ctx.font = `${16 * node.scale}px "Font Awesome 6 Brands", "Font Awesome 6 Free"`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(getFaUnicode(node.icon), node.projX, node.projY - 2);
      }

      // 8. Opaque Title Label beneath ball
      ctx.font = `700 ${10.5 * node.scale}px "Sora", sans-serif`;
      ctx.fillStyle = isHovered ? '#ffffff' : '#e2dbf8';
      ctx.fillText(node.name, node.projX, node.projY + ballRadius + 13);

      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

// Color adjusting helper for 3D hard-ball shading
function adjustColor(hex, amt) {
  let col = (hex || '#888888').replace('#', '');
  if (col.length === 3) col = col.split('').map(c => c + c).join('');
  let num = parseInt(col, 16);
  if (isNaN(num)) return '#111111';
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00FF) + amt;
  let b = (num & 0x0000FF) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Helper to resolve FontAwesome icon unicode for canvas text
function getFaUnicode(faClass) {
  const map = {
    'fa-brands fa-python': '\uf3e2',
    'fa-brands fa-js': '\uf3b8',
    'fa-brands fa-java': '\uf4e4',
    'fa-brands fa-html5': '\uf13b',
    'fa-brands fa-css3-alt': '\uf16b',
    'fa-brands fa-react': '\uf41b',
    'fa-brands fa-node-js': '\uf3d8',
    'fa-brands fa-git-alt': '\uf841',
    'fa-brands fa-github': '\uf09b',
    'fa-brands fa-docker': '\uf395',
    'fa-brands fa-linux': '\uf17c',
    'fa-brands fa-figma': '\uf8e8',
    'fa-brands fa-aws': '\uf37d',
    'fa-solid fa-code': '\uf121',
    'fa-solid fa-database': '\uf1c0',
    'fa-solid fa-server': '\uf233',
    'fa-solid fa-leaf': '\uf06c',
    'fa-solid fa-wind': '\uf72e',
    'fa-solid fa-diagram-project': '\uf542',
    'fa-solid fa-cubes': '\uf1b3',
    'fa-solid fa-wand-magic-sparkles': '\ue2ca'
  };
  return map[faClass] || '\uf109';
}

/* ==========================================================================
   3D MOVING BACKGROUND VIDEO / CYBER GRID CANVAS
   ========================================================================== */
function initTechStack3DBackground() {
  const canvas = document.getElementById('tech-stack-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.clientHeight || 700;
    centerX = width / 2;
    centerY = height / 2;
  }

  resize();
  window.addEventListener('resize', resize);

  const numParticles = 180;
  const colors = [
    'rgba(255, 107, 0, ',   // Orange
    'rgba(255, 159, 28, ',  // Amber
    'rgba(157, 78, 223, ',  // Purple
    'rgba(97, 218, 251, ',  // Cyan
    'rgba(255, 255, 255, '   // Bright white star
  ];

  function resetParticle(p) {
    p.x = (Math.random() - 0.5) * width * 1.8;
    p.y = (Math.random() - 0.5) * height * 1.8;
    p.z = Math.random() * 1000 + 100;
    p.prevZ = p.z;
    p.size = Math.random() * 2 + 1;
    p.speed = Math.random() * 4.5 + 2;
    p.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
    return p;
  }

  const particles = Array.from({ length: numParticles }, () => resetParticle({}));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Pure black background matching rest of portfolio
    ctx.fillStyle = '#0b0b0b';
    ctx.fillRect(0, 0, width, height);

    const fov = 350;

    particles.forEach((p) => {
      p.prevZ = p.z;
      p.z -= p.speed;

      // Reset particle when it moves past screen
      if (p.z <= 10) {
        resetParticle(p);
        p.z = 1000;
        p.prevZ = 1000;
      }

      // Current 3D projection
      const scale = fov / p.z;
      const px = centerX + p.x * scale;
      const py = centerY + p.y * scale;

      // Previous 3D projection for motion streak
      const prevScale = fov / p.prevZ;
      const prevPx = centerX + p.x * prevScale;
      const prevPy = centerY + p.y * prevScale;

      const alpha = Math.min(1, Math.max(0.15, (1000 - p.z) / 700));

      if (px >= -60 && px <= width + 60 && py >= -60 && py <= height + 60) {
        // Motion trail pointing toward screen
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `${p.colorPrefix}${alpha * 0.65})`;
        ctx.lineWidth = Math.max(0.8, p.size * scale * 0.7);
        ctx.stroke();

        // Particle glowing head
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${alpha})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* Tab View Switcher Handler */
function initTechViewTabs() {
  const tabs = document.querySelectorAll('.tech-tab-btn');
  const ballView = document.getElementById('tech-ball-view');
  const gridView = document.getElementById('tech-grid-view');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.getAttribute('data-view');
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (view === 'ball') {
        ballView?.classList.add('active');
        gridView?.classList.remove('active');
      } else {
        gridView?.classList.add('active');
        ballView?.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   GLOBAL 3D PARTICLE STARFIELD STREAM (ALL SECTIONS)
   ========================================================================== */
function initGlobal3DParticles() {
  const canvas = document.getElementById('global-3d-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
  }

  resize();
  window.addEventListener('resize', resize);

  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - centerX) * 0.04;
    mouseY = (e.clientY - centerY) * 0.04;
  });

  const numParticles = 220;
  const colors = [
    'rgba(255, 107, 0, ',   // Orange
    'rgba(255, 159, 28, ',  // Amber
    'rgba(157, 78, 223, ',  // Purple
    'rgba(97, 218, 251, ',  // Cyan
    'rgba(255, 255, 255, '   // White
  ];

  function resetParticle(p) {
    p.x = (Math.random() - 0.5) * width * 2;
    p.y = (Math.random() - 0.5) * height * 2;
    p.z = Math.random() * 1000 + 100;
    p.prevZ = p.z;
    p.size = Math.random() * 2.2 + 1;
    p.speed = Math.random() * 1.5 + 0.6;
    p.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
    return p;
  }

  const particles = Array.from({ length: numParticles }, () => resetParticle({}));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const fov = 320;

    particles.forEach((p) => {
      p.prevZ = p.z;
      p.z -= p.speed;

      if (p.z <= 10) {
        resetParticle(p);
        p.z = 1000;
        p.prevZ = 1000;
      }

      const targetX = p.x + mouseX;
      const targetY = p.y + mouseY;

      const scale = fov / p.z;
      const px = centerX + targetX * scale;
      const py = centerY + targetY * scale;

      const prevScale = fov / p.prevZ;
      const prevPx = centerX + targetX * prevScale;
      const prevPy = centerY + targetY * prevScale;

      const alpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 600));

      if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = `${p.colorPrefix}${alpha * 0.55})`;
        ctx.lineWidth = Math.max(0.6, p.size * scale * 0.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, p.size * scale * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${alpha})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

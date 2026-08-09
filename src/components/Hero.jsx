import React, { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  
  const roles = [
    'Full Stack Developer',
    'Java Developer',
    'Frontend Developer',
    'IT Engineering Student'
  ];

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        speed = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      timer = setTimeout(type, speed);
    }

    type();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

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

    const render = () => {
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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleDownloadResume = () => {
    alert("Downloading Ankit Rao's Resume...");
  };

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        <div className="hero-profile-area">
          <div className="profile-ring-container">
            <div className="glowing-ring"></div>
            <div className="glowing-ring ring-2"></div>
            <div className="glowing-ring ring-3"></div>

            {/* 3D Floating Tech Language Badges */}
            <div className="floating-badge badge-cpp" title="C++">
              <span className="cpp-text">C++</span>
            </div>
            <div className="floating-badge badge-java" title="Java">
              <i className="fa-brands fa-java"></i>
            </div>
            <div className="floating-badge badge-react" title="React">
              <i className="fa-brands fa-react"></i>
            </div>
            <div className="floating-badge badge-js" title="JavaScript">
              <i className="fa-brands fa-js"></i>
            </div>
            <div className="floating-badge badge-python" title="Python">
              <i className="fa-brands fa-python"></i>
            </div>
            <div className="floating-badge badge-node" title="Node.js">
              <i className="fa-brands fa-node-js"></i>
            </div>
            <div className="floating-badge badge-html" title="HTML5 & CSS3">
              <i className="fa-brands fa-html5"></i>
            </div>

            <div className="profile-image-wrap">
              <img
                src="assets/hero-red-portrait.jpg"
                alt="Ankit Rao - Full Stack Developer Portrait"
                className="profile-img"
              />
              <div className="profile-scanner-overlay"></div>
              <div className="profile-shimmer-overlay"></div>
            </div>
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>Available for Opportunities</span>
            </div>
          </div>
        </div>

        <div className="hero-text-area">
          <div className="hero-greeting">
            <span className="greeting-badge">
              <i className="fa-solid fa-code"></i> Hello World, I am
            </span>
          </div>

          <h1 className="hero-name">Ankit Rao</h1>

          <h2 className="hero-title">
            Passionate <span className="typing-text">{typedText}</span>
            <span className="cursor-blink">|</span>
          </h2>

          <p className="hero-intro">
            "I am an engineering student who is always curious about learning new technologies and I aspire to become a
            successful developer by continuously improving my skills and building impactful software solutions."
          </p>

          <div className="hero-cta-buttons">
            <button className="btn btn-gradient" onClick={handleDownloadResume}>
              <i className="fa-solid fa-download"></i>
              <span>Download Resume</span>
            </button>
            <a href="#portfolio" className="btn btn-outline">
              <i className="fa-solid fa-layer-group"></i>
              <span>View Projects</span>
            </a>
          </div>

          <div className="hero-social-links">
            <a
              href="https://github.com/ankitrao8"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/ankit-rao-1265b6385"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="mailto:arao49748@gmail.com" className="social-icon" aria-label="Email">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

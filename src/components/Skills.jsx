import React, { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [activeView, setActiveView] = useState('ball');
  const [hoverText, setHoverText] = useState('Hover over any 3D skill ball');
  const ballCanvasRef = useRef(null);

  // 3D Ball Sphere Canvas
  useEffect(() => {
    if (activeView !== 'ball') return;
    const canvas = ballCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, radius, animationFrameId;

    const resize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent?.clientWidth || 800;
      height = canvas.height = parent?.clientHeight || 500;
      radius = Math.min(width, height) * 0.36;
    };
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

    const total = skills.length;
    const nodes = skills.map((s, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        ...s,
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.sin(phi) * Math.sin(theta),
        oz: Math.cos(phi),
        x: 0, y: 0, z: 0, projX: 0, projY: 0, scale: 1, alpha: 1,
        localAngle: Math.random() * Math.PI * 2,
        spinVel: 0
      };
    });

    let rotX = 0.2, rotY = 0.2, velX = 0, velY = 0.003;
    let isDragging = false, lastX = 0, lastY = 0;
    let hoveredNode = null;

    const onPointerDown = (e) => {
      isDragging = true;
      lastX = e.touches ? e.touches[0].clientX : e.clientX;
      lastY = e.touches ? e.touches[0].clientY : e.clientY;
    };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      const centerX = width / 2;
      const centerY = height / 2;
      const distFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
      const isPointerOnBall = distFromCenter <= (radius + 55) || isDragging;

      if (isPointerOnBall && lastX !== 0 && lastY !== 0) {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        velY = dx * 0.005;
        velX = -dy * 0.005;
        rotY += velY;
        rotX += velX;
      }
      lastX = clientX;
      lastY = clientY;

      let closest = null, maxZ = -Infinity;
      nodes.forEach((n) => {
        const dist = Math.hypot(n.projX - mouseX, n.projY - mouseY);
        if (dist < 32 * n.scale && n.z > maxZ) {
          maxZ = n.z;
          closest = n;
        }
      });
      hoveredNode = closest;
      if (hoveredNode) {
        setHoverText(`${hoveredNode.name} • Mastery Level: ${hoveredNode.level}`);
      } else if (!isDragging) {
        setHoverText('Hover over any 3D skill ball');
      }
    };

    const onPointerUp = () => { isDragging = false; };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const render = () => {
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
      const fov = 400, centerX = width / 2, centerY = height / 2;

      nodes.forEach((n) => {
        let x1 = n.ox * cosY + n.oz * sinY;
        let z1 = -n.ox * sinY + n.oz * cosY;
        let y2 = n.oy * cosX - z1 * sinX;
        let z2 = n.oy * sinX + z1 * cosX;

        n.x = x1 * radius;
        n.y = y2 * radius;
        n.z = z2 * radius;

        const scale = fov / (fov - n.z);
        n.scale = scale;
        n.projX = centerX + n.x * scale;
        n.projY = centerY + n.y * scale;
        n.alpha = Math.max(0.25, (n.z + radius) / (2 * radius));
      });

      nodes.sort((a, b) => a.z - b.z);

      nodes.forEach((n) => {
        const isH = hoveredNode === n;
        const r = (isH ? 34 : 26) * n.scale;

        ctx.save();
        // 100% Opaque - No transparency!
        ctx.globalAlpha = 1.0;

        // 1. Heavy Solid Opaque Shadow
        ctx.beginPath();
        ctx.arc(n.projX + 5 * n.scale, n.projY + 7 * n.scale, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fill();

        // 2. Outer Glow Ring (Only on Hover)
        if (isH) {
          ctx.beginPath();
          ctx.arc(n.projX, n.projY, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = n.color + '66';
          ctx.fill();
        }

        // 3. Base Solid Fill (Guarantees 0% Transparency)
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, r, 0, Math.PI * 2);
        ctx.fillStyle = '#161424';
        ctx.fill();

        // 4. Solid 3D Rough Metallic Spherical Gradient Shading
        ctx.beginPath();
        ctx.arc(n.projX, n.projY, r, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(n.projX - r * 0.32, n.projY - r * 0.32, r * 0.05, n.projX, n.projY, r);
        const baseColor = n.color;
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.2, baseColor);
        grad.addColorStop(0.65, adjustColorReact(baseColor, -90));
        grad.addColorStop(1, '#050409');

        ctx.fillStyle = grad;
        ctx.fill();

        // 5. Solid Hard Bevel Rim Stroke
        ctx.lineWidth = isH ? 3.2 : 2.0;
        ctx.strokeStyle = isH ? '#ffffff' : baseColor;
        ctx.stroke();

        // 6. Hard Specular Light Reflection Arc
        ctx.beginPath();
        ctx.arc(n.projX - r * 0.28, n.projY - r * 0.28, r * 0.42, Math.PI * 1.1, Math.PI * 1.75);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = Math.max(1.2, 2 * n.scale);
        ctx.stroke();

        // 7. Icon inside node
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (n.text) {
          ctx.font = `800 ${14 * n.scale}px "Space Grotesk", sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(n.text, n.projX, n.projY - 2);
        } else {
          ctx.font = `${16 * n.scale}px "Font Awesome 6 Brands", "Font Awesome 6 Free"`;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(getFaUnicodeReact(n.icon), n.projX, n.projY - 2);
        }

        // 8. Title Label
        ctx.font = `700 ${10.5 * n.scale}px "Sora", sans-serif`;
        ctx.fillStyle = isH ? '#ffffff' : '#e2dbf8';
        ctx.fillText(n.name, n.projX, n.projY + r + 13);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeView]);

  return (
    <section className="tech-stack-section" id="tech-stack">
      <div id="skills" style={{ position: 'absolute', top: '-100px' }}></div>

      <div className="section-container relative-z">
        <div className="section-header center">
          <span className="section-tag">
            <i className="fa-solid fa-layer-group"></i> TECH STACK
          </span>
          <h2 className="section-title">
            TECH <span className="text-orange">STACK</span>
          </h2>
          <div className="title-bar center"></div>
          <p className="section-subtitle">
            Interactive 3D Technology Sphere & Modern Stack Matrix. Hold pointer and drag to rotate in 3D!
          </p>
        </div>

        <div className="tech-view-tabs">
          <button
            className={`tech-tab-btn ${activeView === 'ball' ? 'active' : ''}`}
            onClick={() => setActiveView('ball')}
          >
            <i className="fa-solid fa-globe"></i> 3D Ball Sphere
          </button>
          <button
            className={`tech-tab-btn ${activeView === 'grid' ? 'active' : ''}`}
            onClick={() => setActiveView('grid')}
          >
            <i className="fa-solid fa-border-all"></i> Tech Stack Grid
          </button>
        </div>

        {activeView === 'ball' && (
          <div className="tech-ball-wrapper active">
            <div className="tech-ball-canvas-container">
              <canvas ref={ballCanvasRef} id="tech-ball-canvas"></canvas>
              <div className="ball-hover-info">
                <i className="fa-solid fa-info-circle"></i> <span>{hoverText}</span>
              </div>
            </div>
          </div>
        )}

        {activeView === 'grid' && (
          <div className="tech-grid-view active">
            <div className="tech-matrix-grid">
              {techBadges.map((badge, idx) => (
                <div key={idx} className="tech-badge-card tilt-card">
                  <div className="tech-badge-icon">
                    {badge.text ? (
                      <span className="badge-text-icon">{badge.text}</span>
                    ) : (
                      <i className={badge.icon}></i>
                    )}
                  </div>
                  <span className="tech-badge-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function getFaUnicodeReact(faClass) {
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

function adjustColorReact(hex, amt) {
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


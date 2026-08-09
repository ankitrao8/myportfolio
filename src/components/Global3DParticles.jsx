import React, { useEffect, useRef } from 'react';

export default function Global3DParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, centerX, centerY, animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - centerX) * 0.04;
      mouseY = (e.clientY - centerY) * 0.04;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const numParticles = 220;
    const colors = [
      'rgba(255, 107, 0, ',
      'rgba(255, 159, 28, ',
      'rgba(157, 78, 223, ',
      'rgba(97, 218, 251, ',
      'rgba(255, 255, 255, '
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

    const animate = () => {
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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-3d-particles" />;
}

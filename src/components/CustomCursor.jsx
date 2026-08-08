import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        id="cursor-glow"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
      <div
        id="cursor-dot"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </>
  );
}

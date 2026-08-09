import React, { useEffect } from 'react';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Global3DParticles from './components/Global3DParticles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Focus from './components/Focus';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = e.target.closest('.tilt-card');
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    };

    const handleMouseLeave = (e) => {
      const card = e.target.closest('.tilt-card');
      if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Scroll reveal observer
    const targets = document.querySelectorAll(
      '.section-header, .glass-card, .skill-group-card, .project-card, .timeline-card, .contact-info-card, .contact-form, .info-card, .focus-card'
    );

    targets.forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((t) => observer.observe(t));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Global3DParticles />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Focus />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeNav, setActiveNav] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'focus', label: 'Focus' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    setActiveNav(id);
    setMobileOpen(false);
  };

  return (
    <header className="navbar" id="navbar">
      <div className="nav-container">
        <a href="#hero" className="brand-logo" onClick={() => handleNavClick('hero')}>
          <img src="assets/ar-logo-theme.png" alt="AR Logo" className="brand-ar-logo" />
          <span className="logo-text">
            <span className="logo-name">ANKIT</span>
            <span className="logo-accent">.RAO</span>
          </span>
        </a>

        <nav className={`nav-menu ${mobileOpen ? 'active' : ''}`} id="nav-menu">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${activeNav === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-sm btn-gradient mobile-menu-cta"
            onClick={() => handleNavClick('contact')}
          >
            Get In Touch
          </a>
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-sm btn-gradient nav-cta" onClick={() => handleNavClick('contact')}>
            Get In Touch
          </a>
          <button
            className="mobile-toggle"
            id="mobile-toggle"
            aria-label="Toggle Navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}

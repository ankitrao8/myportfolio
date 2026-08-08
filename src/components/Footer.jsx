import React, { useEffect, useState } from 'react';

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <a href="#hero" className="brand-logo">
              <img src="assets/ar-logo-theme.png" alt="AR Logo" className="brand-ar-logo" />
              <span className="logo-text">
                <span className="logo-name">ANKIT</span>
                <span className="logo-accent">.RAO</span>
              </span>
            </a>
            <p>B.Tech IT Student & Full Stack Developer</p>
          </div>

          <div className="footer-copy">
            <p>&copy; {new Date().getFullYear()} Ankit Rao. Built with ❤️ using React.</p>
          </div>
        </div>
      </footer>

      <button
        id="back-to-top"
        className={showTopBtn ? 'active' : ''}
        aria-label="Back to Top"
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}

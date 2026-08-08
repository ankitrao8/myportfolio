import React, { useEffect, useState, useRef } from 'react';

export default function Focus() {
  const [stats, setStats] = useState({ intern: 0, skills: 0, projects: 0, github: 0 });
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const focusCards = [
    {
      icon: 'fa-solid fa-layer-group',
      title: 'Full Stack Development Learning',
      desc: 'Mastering end-to-end web architecture, connecting dynamic frontend user interfaces with robust backend business logic.',
    },
    {
      icon: 'fa-brands fa-java',
      title: 'Java Programming',
      desc: 'Deepening knowledge of Java OOPs concepts, multi-threading, collection frameworks, and scalable software design patterns.',
    },
    {
      icon: 'fa-brands fa-react',
      title: 'React & Frontend Architecture',
      desc: 'Crafting responsive, glassmorphic, and accessible React UI components with modern JSX, hooks, and CSS standards.',
    },
    {
      icon: 'fa-solid fa-brain',
      title: 'Continuous Learning & Problem Solving',
      desc: 'Solving complex algorithms on Data Structures (DSA) while constantly exploring emerging AI technologies and developer tools.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const animateVal = (target, key) => {
            let count = 0;
            const step = Math.max(1, Math.ceil(target / 30));
            const timer = setInterval(() => {
              count += step;
              if (count >= target) {
                setStats((prev) => ({ ...prev, [key]: target }));
                clearInterval(timer);
              } else {
                setStats((prev) => ({ ...prev, [key]: count }));
              }
            }, 50);
          };

          animateVal(2, 'intern');
          animateVal(8, 'skills');
          animateVal(1, 'projects');
          animateVal(50, 'github');
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <>
      <section className="focus-section" id="focus">
        <div className="section-container">
          <div className="section-header center">
            <span className="section-tag">
              <i className="fa-solid fa-compass"></i> DOMAIN EXCELLENCE
            </span>
            <h2 className="section-title">
              What I <span className="text-orange">Focus On</span>
            </h2>
            <div className="title-bar center"></div>
          </div>

          <div className="focus-cards-grid">
            {focusCards.map((card, idx) => (
              <div key={idx} className="glass-card focus-card tilt-card">
                <div className="focus-icon-wrap">
                  <i className={card.icon}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section" ref={statsRef}>
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-box glass-card">
              <div className="stat-number">{stats.intern}</div>
              <span className="stat-label">Internship Experiences</span>
            </div>
            <div className="stat-box glass-card">
              <div className="stat-number">{stats.skills}</div>
              <span className="stat-plus">+</span>
              <span className="stat-label">Technical Skills</span>
            </div>
            <div className="stat-box glass-card">
              <div className="stat-number">{stats.projects}</div>
              <span className="stat-label">Major AI Project Completed</span>
            </div>
            <div className="stat-box glass-card">
              <div className="stat-number">{stats.github}</div>
              <span className="stat-plus">+</span>
              <span className="stat-label">GitHub Contributions</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

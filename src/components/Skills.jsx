import React from 'react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: 'fa-solid fa-terminal',
      skills: [
        { name: 'Java (OOP Focus)', pct: '90%' },
        { name: 'C++', pct: '80%' },
        { name: 'C Language', pct: '85%' },
        { name: 'Python (Basic)', pct: '75%' },
      ],
    },
    {
      title: 'Web Technologies',
      icon: 'fa-solid fa-globe',
      skills: [
        { name: 'HTML5 (Semantic)', pct: '95%' },
        { name: 'CSS3 (Modern Responsive)', pct: '90%' },
        { name: 'JavaScript (ES6+ / React)', pct: '88%' },
      ],
    },
    {
      title: 'Tools & IDEs',
      icon: 'fa-solid fa-wrench',
      skills: [
        { name: 'Git & GitHub', pct: '90%' },
        { name: 'Visual Studio Code', pct: '95%' },
        { name: 'Antigravity & AI Tools', pct: '90%' },
      ],
    },
    {
      title: 'Core Concepts',
      icon: 'fa-solid fa-cubes',
      skills: [
        { name: 'Data Structures & Algorithms (DSA)', pct: '82%' },
        { name: 'Object-Oriented Programming (OOP)', pct: '88%' },
        { name: 'Problem Solving', pct: '85%' },
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-tag">
            <i className="fa-solid fa-laptop-code"></i> TECHNICAL MASTERY
          </span>
          <h2 className="section-title">
            My <span className="text-orange">Skillset</span>
          </h2>
          <div className="title-bar center"></div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="glass-card skill-group-card tilt-card">
              <div className="skill-group-header">
                <div className="group-icon">
                  <i className={cat.icon}></i>
                </div>
                <h3>{cat.title}</h3>
              </div>
              <div className="skills-list">
                {cat.skills.map((s, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-meta">
                      <span>{s.name}</span>
                      <span className="skill-pct">{s.pct}</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: s.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

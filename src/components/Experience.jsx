import React from 'react';

export default function Experience() {
  const experiences = [
    {
      date: 'April 2026',
      company: 'Eduskills',
      role: 'Java Full Stack Developer Intern',
      desc: 'Worked on Java Full Stack fundamentals while gaining practical development experience with core Java, object-oriented design principles, and full-stack web integration.',
      tags: ['Java', 'OOP', 'Web Basics', 'Eduskills'],
      align: 'timeline-left',
    },
    {
      date: 'July 2026',
      company: 'CodeAlpha',
      role: 'Frontend Developer Intern',
      desc: 'Built responsive frontend interfaces using HTML and CSS while improving UI implementation skills, semantic structure, and mobile-first design principles.',
      tags: ['HTML5', 'CSS3', 'Responsive UI', 'CodeAlpha'],
      align: 'timeline-right',
    },
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-tag">
            <i className="fa-solid fa-briefcase"></i> PRACTICAL EXPERIENCE
          </span>
          <h2 className="section-title">
            Internship <span className="text-orange">Timeline</span>
          </h2>
          <div className="title-bar center"></div>
        </div>

        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`timeline-card-wrap ${exp.align}`}>
              <div className="timeline-node"></div>
              <div className="glass-card timeline-card tilt-card">
                <div className="timeline-header">
                  <span className="timeline-badge">
                    <i className="fa-regular fa-calendar"></i> {exp.date}
                  </span>
                  <span className="company-tag">{exp.company}</span>
                </div>
                <h3 className="role-title">{exp.role}</h3>
                <p className="role-desc">{exp.desc}</p>
                <div className="tech-tags">
                  {exp.tags.map((tag, tIdx) => (
                    <span key={tIdx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

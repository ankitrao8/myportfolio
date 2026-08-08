import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: 'Visage ID',
      subname: 'Attendance System via Face Recognition',
      badge: 'AI & Computer Vision',
      icon: 'fa-solid fa-face-smile',
      desc: 'An AI-powered attendance system that automatically recognizes faces and records attendance in real time, reducing manual effort, preventing proxy logging, and improving administrative accuracy.',
      tech: [
        { icon: 'fa-brands fa-python', label: 'Python' },
        { icon: 'fa-solid fa-eye', label: 'OpenCV' },
        { icon: 'fa-brands fa-react', label: 'React' },
        { icon: 'fa-brands fa-html5', label: 'HTML5' },
        { icon: 'fa-brands fa-css3-alt', label: 'CSS3' },
      ],
      github: 'https://github.com/ankitrao8',
    },
  ];

  const handleLiveDemo = (title) => {
    alert(`Opening ${title} Live Demonstration Modal...`);
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-tag">
            <i className="fa-solid fa-folder-open"></i> FEATURED WORK
          </span>
          <h2 className="section-title">
            Projects & <span className="text-orange">Innovations</span>
          </h2>
          <div className="title-bar center"></div>
        </div>

        <div className="projects-wrapper">
          {projects.map((proj, idx) => (
            <div key={idx} className="glass-card project-card tilt-card">
              <div className="project-banner">
                <div className="project-icon-overlay">
                  <i className={proj.icon}></i>
                </div>
                <span className="project-tag-badge">{proj.badge}</span>
              </div>

              <div className="project-body">
                <h3 className="project-name">{proj.title}</h3>
                <h4 className="project-subname">{proj.subname}</h4>

                <p className="project-description">{proj.desc}</p>

                <div className="project-tech-stack">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx}>
                      <i className={t.icon}></i> {t.label}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                  >
                    <i className="fa-brands fa-github"></i>
                    <span>GitHub Repository</span>
                  </a>
                  <button
                    className="btn btn-sm btn-gradient"
                    onClick={() => handleLiveDemo(proj.title)}
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

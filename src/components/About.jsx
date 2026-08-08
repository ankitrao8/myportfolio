import React from 'react';

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">
            <i className="fa-solid fa-user-astronaut"></i> BIOGRAPHY & GOALS
          </span>
          <h2 className="section-title">
            About <span className="text-orange">Me</span>
          </h2>
          <div className="title-bar"></div>
        </div>

        <div className="about-grid">
          <div className="about-card-left tilt-card">
            <div className="about-image-frame">
              <img
                src="assets/about-portrait.jpg"
                alt="Ankit Rao Portrait"
                className="about-img"
              />
              <div className="image-gradient-overlay"></div>
              <div className="experience-badge">
                <span className="badge-num">3rd</span>
                <span className="badge-text">Year IT Student</span>
              </div>
            </div>
          </div>

          <div className="about-content-right">
            <h3 className="about-subheading">
              Building Software Solutions With Curiosity & Passion
            </h3>

            <p className="about-paragraph">
              I am currently pursuing my <strong>B.Tech in Information Technology</strong> at{' '}
              <strong>Buddha Institute of Technology</strong>. My journey in tech is driven by an ongoing passion for problem-solving, clean code architecture, and creating user-centered software applications.
            </p>

            <div className="info-cards-grid">
              <div className="glass-card info-card">
                <div className="card-icon-wrap">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="card-info">
                  <h4>Education</h4>
                  <p className="card-primary-text">B.Tech in Information Technology</p>
                  <p className="card-secondary-text">Buddha Institute of Technology</p>
                  <div className="card-pill-row">
                    <span className="mini-pill">3rd Year</span>
                    <span className="mini-pill">Graduation: 2028</span>
                  </div>
                </div>
              </div>

              <div className="glass-card info-card">
                <div className="card-icon-wrap">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="card-info">
                  <h4>Career Goal</h4>
                  <p className="card-primary-text">Full Stack Software Developer</p>
                  <p className="card-secondary-text">
                    Continuously learning modern frameworks, cloud architectures, and AI integration.
                  </p>
                </div>
              </div>
            </div>

            <div className="quick-facts">
              <div className="fact-item">
                <i className="fa-solid fa-location-dot"></i> Gorakhpur, UP, India
              </div>
              <div className="fact-item">
                <i className="fa-solid fa-code-branch"></i> Java & Web Development
              </div>
              <div className="fact-item">
                <i className="fa-solid fa-brain"></i> Open Source Enthusiast
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

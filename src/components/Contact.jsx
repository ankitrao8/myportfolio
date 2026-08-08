import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg('');

    setTimeout(() => {
      setSubmitting(false);
      setStatusMsg('Thank you! Your message has been sent to Ankit Rao successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatusMsg('');
      }, 5000);
    }, 1200);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        <div className="section-header center">
          <span className="section-tag">
            <i className="fa-solid fa-paper-plane"></i> LET'S CONNECT
          </span>
          <h2 className="section-title">
            Get In <span className="text-orange">Touch</span>
          </h2>
          <div className="title-bar center"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info-col">
            <h3>Contact Details</h3>
            <p className="contact-lead-text">
              Feel free to reach out for internship opportunities, technical collaborations, or general inquiries.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-card glass-card">
                <div className="detail-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <span>Email</span>
                  <a href="mailto:arao49748@gmail.com">arao49748@gmail.com</a>
                </div>
              </div>

              <div className="contact-detail-card glass-card">
                <div className="detail-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <span>Phone</span>
                  <a href="tel:8299130772">+91 8299130772</a>
                </div>
              </div>

              <div className="contact-detail-card glass-card">
                <div className="detail-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <span>Location</span>
                  <strong>Gorakhpur, Uttar Pradesh, India</strong>
                </div>
              </div>
            </div>

            <div className="contact-social-bar">
              <span>Follow Me:</span>
              <a
                href="https://github.com/ankitrao8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-rao-1265b6385"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="mailto:arao49748@gmail.com" aria-label="Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <form className="glass-card contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry / Job Opportunity"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Ankit, I would like to connect with you regarding..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-gradient btn-block" disabled={submitting}>
              {submitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Sending Message...
                </>
              ) : (
                <>
                  <i className="fa-regular fa-paper-plane"></i> <span>Send Message</span>
                </>
              )}
            </button>

            {statusMsg && <div className="form-status success">{statusMsg}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

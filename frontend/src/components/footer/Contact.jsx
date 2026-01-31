import React from "react";
import "../../styles/Footer.css";

export default function Contact() {
  return (
    <div className="contact-wrapper">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-text">
          <h1>A Table for Your Thoughts</h1>
          <p>
            Questions, feedback, or ideas?
            We’d love to hear from you.
          </p>
        </div>
        <img src="/contact-hero.png" alt="Contact FlavorFiesta" className="contact-image"/>
      </section>

      {/* CONTACT INFO */}
      <section className="contact-info">
        <div className="contact-card">
          <h3>Email</h3>
          <p>support@flavorfiesta.com</p>
        </div>

        <div className="contact-card">
          <h3>Project Type</h3>
          <p>React-based Web Application</p>
        </div>

        <div className="contact-card">
          <h3>Purpose</h3>
          <p>Learning • Creativity • Food Discovery</p>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="contact-footer">
        <p>Built with care using modern web technologies.</p>
        <span>Cook what makes you smile.</span>
      </section>
    </div>
  );
}

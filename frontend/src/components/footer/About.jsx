import React from "react";
import "../../styles/Footer.css";

export default function About() {
  return (
    <div className="about-wrapper">
      {/* ---- HERO ----*/}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>
            Cook with <span>passion</span><br />
            Serve with <span>love</span>
          </h1>
          <p>
            FlavorFiesta is your modern kitchen companion — helping you
            discover, save, and enjoy recipes with simplicity and elegance.
          </p>
        </div>

        <div className="about-hero-image">
          <img src="/about-hero.png" alt="Cooking Illustration" />
        </div>
      </section>

      {/* ---- Our Story ----*/}
      <section className="about-section light">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            FlavorFiesta was built with a simple idea — cooking should feel
            joyful, not overwhelming. With thousands of recipes available
            online, finding the right one can be difficult.
          </p>
          <p>
            This platform brings everything together in a clean, intuitive,
            and visually pleasing experience powered by modern web
            technologies.
          </p>
        </div>

        <img src="/about-cooking.png" alt="Cooking Experience" className="about-image"/>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="about-section">
        <h2 className="center">What Makes FlavorFiesta Special</h2>
        <div className="about-cards">
          <div className="about-card">
            <img src="/about-api.png" alt="API" />
            <h3>Live Recipe Data</h3>
            <p>
              Recipes are fetched in real-time using a public food API,
              ensuring fresh and diverse meal ideas every day.
            </p>
          </div>

          <div className="about-card">
            <img src="/about-react.png" alt="React" />
            <h3>Built with React</h3>
            <p>
              Developed using React components, hooks, and smooth routing
              for a fast, single-page experience.
            </p>
          </div>

          <div className="about-card">
            <img src="/about-hero.png" alt="Favorites" />
            <h3>Save What You Love</h3>
            <p>
              Easily save favorite recipes and come back to them whenever
              inspiration strikes.
            </p>
          </div>
        </div>
      </section>

      {/* ---- PURPOSE ----*/}
      <section className="about-section light center">
        <h2>Why FlavorFiesta?</h2>
        <p className="wide">
          This project demonstrates modern frontend development practices —
          API integration, responsive design, and user-focused interfaces —
          all wrapped in a warm, food-inspired aesthetic.
        </p>
      </section>
    </div> 
  );
}

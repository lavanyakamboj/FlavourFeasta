import React from "react";
import "../../styles/Footer.css";

export default function Overview() {
  return (
    <div className="overview-page">
      {/* HERO SECTION */}
      <section className="overview-hero">
        <h1>Discover, Cook & Celebrate Flavors</h1>
        <p>
          FlavorFiesta helps you explore delicious recipes from around the world
          with ease and elegance.
        </p>
      </section>

      <section className="overview-section">
        <h2>Platform Overview</h2>
        <div className="overview-cards">
          <div className="overview-card">
            <h3>🍳 Smart Recipe Search</h3>
            <p> Instantly find recipes using ingredients, dish names, or categories.</p>
          </div>

          <div className="overview-card">
            <h3>📚 Detailed Instructions</h3>
            <p> Step-by-step cooking instructions with ingredients and visuals. </p>
          </div>

          <div className="overview-card">
            <h3>❤️ Save Favorites</h3>
            <p> Bookmark your favorite recipes and access them anytime.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="overview-section light">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Search for recipes using keywords or ingredients</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Select a recipe and view complete cooking details</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Cook, enjoy, and save your favorites</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="overview-section">
        <h2>Why Choose FlavorFiesta?</h2>
        <ul className="features-list">
          <li>✔ Fast & responsive user interface</li>
          <li>✔ Powered by reliable recipe APIs</li>
          <li>✔ Clean, modern & food-inspired design</li>
          <li>✔ Perfect for beginners & food lovers</li>
        </ul>
      </section>
    </div>
  );
}

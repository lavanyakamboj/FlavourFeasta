import React from "react";
import "../../styles/Footer.css";

export default function Policy() {
  return (
    <div className="policy-container">
      <h1 className="policy-title">Website Policy</h1>

      <section className="policy-section">
        <h2>Privacy Policy</h2>
        <p>
          This website does not collect, store, or process any personal user data.
          All content is accessed anonymously.
        </p>
      </section>

      <section className="policy-section">
        <h2>Recipe Content</h2>
        <p>
          Recipes and related information displayed on this website are fetched
          from a third-party public Recipe API. We do not own or claim rights to
          the recipe content.
        </p>
      </section>

      <section className="policy-section">
        <h2>Accuracy of Information</h2>
        <p>
          Recipe details such as ingredients, steps, and images are provided by
          external sources. We cannot guarantee accuracy or completeness.
        </p>
      </section>

      <section className="policy-section">
        <h2>Usage Disclaimer</h2>
        <p>
          This project is created for educational and demonstration purposes
          only. Users should verify ingredients and cooking methods before use.
        </p>
      </section>

      <section className="policy-section">
        <h2>Third-Party Services</h2>
        <p>
          This website relies on external APIs to function. We are not responsible
          for the availability or reliability of these services.
        </p>
      </section>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_KEY_ID } from "./api";
import Loader from "./Loader";
import "../styles/prep.css";

export default function Prep() {
  const location = useLocation();
  const mealId = location.state?.mealId;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (!mealId) {
      setLoading(false);
      return;
    }

    fetch(`${API_KEY_ID}${mealId}`)
      .then(res => res.json())
      .then(data => {
        const fetchedMeal = data.meals ? data.meals[0] : null;
        setMeal(fetchedMeal);
        setLoading(false);

        if (fetchedMeal) {
          const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
          setIsSaved(saved.some(r => r.recipeId === fetchedMeal.idMeal));
        }
      })
      .catch(() => setLoading(false));
  }, [mealId]);

  const toggleFavourite = async () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    if (!meal) return;
    const BASE_URL = "https://flavourfeasta.onrender.com";
    if (isSaved) {
      const res = await fetch(`${BASE_URL}/ff-user/remove-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          recipeId: meal.idMeal
        })
      });

      const data = await res.json();
      localStorage.setItem("savedRecipes", JSON.stringify(data.savedRecipes));
      setIsSaved(false);
    } else {
      const recipe = {
        recipeId: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory
      };

      const res = await fetch(`${BASE_URL}/ff-user/save-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userId,
          recipe
        })
      });

      const data = await res.json();
      localStorage.setItem("savedRecipes", JSON.stringify(data.savedRecipes));
      setIsSaved(true);
    }
  };

  if (loading) return <Loader />;
  if (!meal) return <h2 className="center-text">Recipe not found</h2>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const steps = meal.strInstructions.split(".").filter(s => s.trim());

  const videoId = meal.strYoutube
    ? meal.strYoutube.split("v=")[1]
    : null;

  return (
    <div className="perp-page">
      {showLoginPopup && (
        <div
          className="login-popup-overlay"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="login-popup"
            onClick={e => e.stopPropagation()}
          >
            <h3>Login Required</h3>
            <p>Please login to add this recipe.</p>
          </div>
        </div>
      )}

      <div className="perp-hero">
        <div className="perp-hero-text">
          <h1>{meal.strMeal}</h1>
          <p className="hero-meta">
            {meal.strCategory} • {meal.strArea}
          </p>

          <button
            className={`saved ${isSaved ? "active" : ""}`}
            onClick={toggleFavourite}
          >
            {isSaved ? "Remove from Saved ❌" : "Add to Favorites ❤️"}
          </button>
        </div>

        <div className="perp-hero-image">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
      </div>

      <div className="perp-details">
        <div className="ingredients">
          <h2>Ingredients</h2>
          {ingredients.map((item, i) => (
            <div className="ingredient-row" key={i}>
              <span>{item.ingredient}</span>
              <span>{item.measure}</span>
            </div>
          ))}
        </div>

        <div className="preparation">
          <h2>Preparation</h2>
          <ol>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {videoId && (
        <div className="perp-video">
          <h2>Cooking Video</h2>
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Recipe Video"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Recipes.css";

export default function Favourite() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

  const isLoggedIn = !!user;

  /* ================= LOAD FAVOURITES ================= */
  useEffect(() => {
    if (!isLoggedIn) return;

    const stored =
      JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setRecipes(stored);
  }, [isLoggedIn]);

  /* ================= REMOVE (BACKEND + LOCAL) ================= */
  const removeFromFavourites = async (recipeId) => {
  const BASE_URL = "https://flavourfeasta.onrender.com";
    try {
      const res = await fetch(
        `${BASE_URL}/ff-user/remove-recipe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.userId,
            recipeId
          })
        }
      );

      const data = await res.json();

      // ✅ Sync everywhere
      setRecipes(data.savedRecipes);
      localStorage.setItem(
        "savedRecipes",
        JSON.stringify(data.savedRecipes)
      );
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  /* ================= NOT LOGGED IN ================= */
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="error-wrapper">
          <h2>🔒 Please Login First</h2>
          <p>
            You need to be logged in to view and manage
            your favourite recipes.
          </p>

          <button
            className="read-more-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  /* ================= LOGGED IN ================= */
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        ❤️ My Favourite Recipes
      </h2>

      {recipes.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No favourite recipes yet.
        </p>
      )}

      <div className="recipes-cards-wrapper">
        {recipes.map((recipe) => (
          <div className="recipes-card" key={recipe.recipeId}>
            <div className="recipes-card-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div className="recipes-card-content">
              <h2 className="recipes-card-title">
                {recipe.title}
              </h2>

              <p className="recipes-card-text">
                {recipe.category}
              </p>

              <div className="recipes-card-actions">
                <Link
                  to="/prep"
                  state={{ mealId: recipe.recipeId }}
                  className="recipes-card-link"
                >
                  Prep
                </Link>

                <button
                  className="recipes-card-link remove-btn"
                  onClick={() =>
                    removeFromFavourites(recipe.recipeId)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

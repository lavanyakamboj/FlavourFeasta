import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { API_KEY, API_KEY_IMGERDIENTS } from "./api";
import "../styles/Recipes.css";

export default function SearchResults() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const query = state?.query;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const fetchMeals = async () => {
      setLoading(true);
      setMeals([]);

      try {
        const resName = await fetch(API_KEY + query, {
          signal: controller.signal,
        });
        const dataName = await resName.json();

        if (dataName.meals) {
          setMeals(dataName.meals);
          return;
        }

        const resIng = await fetch(API_KEY_IMGERDIENTS + query, {
          signal: controller.signal,
        });
        const dataIng = await resIng.json();

        setMeals(dataIng.meals || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
          setMeals([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();

    return () => controller.abort();
  }, [query]);

  if (loading) return <Loader />;

  if (!meals.length) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
        No recipes found for "{query}" 😔
      </h2>
    );
  }

  return (
    <div className="container">
      <div className="recipes-cards-wrapper">
        {meals.map((meal) => (
          <div className="recipes-card" key={meal.idMeal}>
            <div className="recipes-card-image">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </div>
            <div className="recipes-card-content">
              <h2 className="recipes-card-title">{meal.strMeal}</h2>
              <div className="recipe-button">
                <button
                  className="start-button"
                  onClick={() =>
                    navigate("/prep", {
                      state: { mealId: meal.idMeal },
                    })
                  }
                >
                  START COOKING
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

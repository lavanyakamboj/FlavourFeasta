import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_KEY_CAT } from "./api";
import Loader from "./Loader";
import "../styles/Recipes.css";

// All NON-VEG categories supported by TheMealDB
const NON_VEG_CATEGORIES = ["Beef", "Chicken", "Lamb", "Pork", "Seafood", "Goat",];

export default function VegNonVegRecipes() {
    const location = useLocation();
    const category = location.state?.category;
    const [meals, setMeals] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;
        setLoading(true);
        if (category.toLowerCase().includes("non")) {
            Promise.all(
                NON_VEG_CATEGORIES.map((cat) =>fetch(`${API_KEY_CAT}${cat}`).then((res) => res.json()))
            )
                .then((results) => {
                    const allMeals = results.flatMap((data) => data.meals || []);
                    setMeals(allMeals);
                    setLoading(false);
                }).catch(() => setLoading(false));
        }

        else {
            fetch(`${API_KEY_CAT}${category}`)
                .then((res) => res.json())
                .then((data) => {
                    setMeals(data.meals || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [category]);

    if (!category) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}> Category not found</h2>
        );
    }

    if (loading) { return <Loader />; }

    return (
        <div className="container">
            <div className="recipes-cards-wrapper">
                {meals.slice(0, visibleCount).map((meal) => (
                    <div className="recipes-card" key={meal.idMeal}>
                        <div className="recipes-card-image">
                            <img src={meal.strMealThumb} alt={meal.strMeal} />
                        </div>

                        <div className="recipes-card-content">
                            <h2 className="recipes-card-title"> {meal.strMeal} </h2>
                            <Link to="/prep" state={{ mealId: meal.idMeal }} className="recipes-card-link">
                                Prep
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < meals.length && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <button className="read-more-btn" onClick={() => setVisibleCount((v) => v + 9)}>
                        Read More
                    </button>
                </div>
            )}
        </div>
    );
}

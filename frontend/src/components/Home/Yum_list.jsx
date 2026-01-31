// ----  list to the recepies that animates from left to right ----
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY_RANDOM } from "../api";
import "../../styles/yum_list.css";

export default function Yum_list() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cachedMeals = sessionStorage.getItem("yumList");

    if (cachedMeals) {
      setCards(JSON.parse(cachedMeals));
      setLoading(false);
      return;
    }

    const fetchRandomMeals = async () => {
      try {
        const requests = Array.from({ length: 7 }, () =>
          fetch(API_KEY_RANDOM).then(res => res.json())
        );

        const results = await Promise.all(requests);
        const meals = results.map(r => r.meals[0]);

        setCards(meals);
        sessionStorage.setItem("yumList", JSON.stringify(meals));
      } catch (error) {
        console.error("Error fetching meals", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeals();
  }, []);


  const handleClick = (mealId) => {
    navigate("/prep", { state: { mealId } });
  };

  return (
    <div className="meals_top">
      <p className="top_header">Yum List</p>

      <div className="carousel">
        <div className="track">

          {/* ----LOADING STATE (loaded first time) ----*/}
          {loading && (
            <div className="group">
              {Array.from({ length: 7 }).map((_, i) => (
                <div className="card skeleton" key={i}>
                  <div className="skeleton-img"></div>
                </div>
              ))}
            </div>
          )}

          {/* ---- DATA LOADED (prevents from download whenever we load the website the list loads only once) ---- */}
          {!loading && (
            <>
              <div className="group">
                {cards.map(meal => (
                  <div className="card" key={meal.idMeal} onClick={() => handleClick(meal.idMeal)} >
                    <img src={meal.strMealThumb} className="card_img" alt={meal.strMeal} loading="lazy"/>
                    <div className="btn">Prep</div>
                  </div>
                ))}
              </div>

              <div className="group-dup" aria-hidden="true">
                {cards.map(meal => (
                  <div className="card" key={`dup-${meal.idMeal}`} onClick={() => handleClick(meal.idMeal)}>
                    <img src={meal.strMealThumb} className="card_img" alt={meal.strMeal} loading="lazy"/>
                    <div className="btn">Prep</div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

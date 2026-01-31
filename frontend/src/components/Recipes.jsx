import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_KEY_CATEGORIES } from "./api";
import Loader from "./Loader";
import "../styles/Recipes.css";

export default function AllRecipes() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_KEY_CATEGORIES)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }


  return (
    <div className="container">
      <div className="recipes-cards-wrapper">
        {categories.map((category) => (
          <div className="recipes-card" key={category.idCategory}>
            <div className="recipes-card-image">
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
              />
            </div>

            <div className="recipes-card-content">
              <h2 className="recipes-card-title">
                {category.strCategory}
              </h2>

              <p className="recipes-card-text">
                {category.strCategoryDescription?.slice(0, 150)}...
              </p>

              <div className="recipe-button">
                <button type="button" className="link-opacity-25-hover continue-button" data-bs-toggle="modal"
                  data-bs-target="#continueModal" onClick={() => setSelectedCategory(category)}>
                  Continue Reading
                </button>

                <Link to="/categories" state={{category: category.strCategory}} className="start-button">
                  start
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL -- bootstrap*/}
      <div className="modal fade" id="continueModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen-xxl-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold">
                {selectedCategory?.strCategory}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body justified">
              <ol>
                {selectedCategory?.strCategoryDescription
                  ?.replace(/\[\d+\]/g, "")
                  .split(".")
                  .filter(text => text.trim() !== "")
                  .map((point, index) => (
                    <li key={index} className="mb-2">
                      {point.trim()}.
                    </li>
                  ))}
              </ol>

              <div className="start-button">
                <button
                  className="start-button"
                  onClick={() => {
                    const modal =
                      document.getElementById("continueModal");
                    const bsModal =
                      window.bootstrap.Modal.getInstance(modal);
                    bsModal.hide();

                    navigate("/categories", {
                      state: {
                        category: selectedCategory?.strCategory
                      }
                    });
                  }}
                >
                  START COOKING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

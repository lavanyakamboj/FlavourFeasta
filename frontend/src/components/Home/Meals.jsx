import React from "react";
import { Link } from "react-router-dom";
import "../../styles/meals.css";
import Yum_list from "./Yum_list";
import Tagline from "./Tagline";

const categories = [
  { name: "BREAKFAST", img: "/breakfast.png" },
  { name: "SEAFOOD", img: "/seafood.png" },
  { name: "VEGETARIAN", img: "/vegetarian.png" },
  { name: "STARTER", img: "/starter.png" },
  { name: "VEGAN", img: "/vegan.png" },
  { name: "PASTA", img: "/pasta.png" },
  { name: "DESSERT", img: "/dessert.png" },
  { name: "CHICKEN", img: "/chichen.png" },
  { name: "SIDE", img: "/side_food.png" },
];

export default function Meals() {
  return (
    <>
      <Tagline />
      <div className="cook">Cook What Makes You Smile</div>
      
      {/* ---- categories in circle ---- */}
      <div className="category-caroual">
        <div className="categories-container">
          {categories.map((cat, index) => (
            <div key={index} className="category">
              <Link to="/categories" state={{ category: cat.name }}>
                <img src={cat.img} alt={cat.name} className="category-img"/>
                <p className="category-name">{cat.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Yum_list />
    </>
  );
}

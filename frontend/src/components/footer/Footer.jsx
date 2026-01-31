import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Footer.css";

export default function Footer() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchText.trim();
    if (!query) return;

    navigate("/search", { state: { query } });
    setSearchText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-box">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass search-icon" onClick={handleSearch}/>

          <input type="text" placeholder="Search by food or ingredient..." value={searchText}
            onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      <div className="footer">
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/policy">Policy</Link></li>
          <li><Link to="/overview">Overview</Link></li>
        </ul>
      </div>
    </>
  );
}

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Home/Header";
import Footer from "./components/footer/Footer";
import Meals from "./components/Home/Meals";
import Recipes from "./components/Recipes";
import Favourite from "./components/Favourite";
import Categories from "./components/Categories";
import Prep from "./components/Prep";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import About from "./components/footer/About";
import Contact from "./components/footer/Contact";
import Policy from "./components/footer/Policy";
import Overview from "./components/footer/Overview";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/prep" element={<Prep />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

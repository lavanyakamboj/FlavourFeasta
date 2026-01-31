const express = require("express");
const router = express.Router();

const {
  saveInfo,
  loginUser,
  saveRecipe,
  removeRecipe
} = require("./api/postApi");

// SIGNUP
router.post("/signup", saveInfo);

// LOGIN
router.post("/login", loginUser);

// SAVE RECIPE
router.post("/save-recipe", saveRecipe);

// REMOVE RECIPE
router.post("/remove-recipe", removeRecipe);

module.exports = router;

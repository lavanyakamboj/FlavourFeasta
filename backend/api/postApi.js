const FFUser = require("./ffUserSchema");

/* ========== SIGNUP ========== */
const saveInfo = async (req, res) => {
  const { username, email, password, contact } = req.body;

  try {
    const newUser = new FFUser({
      username,
      email,
      password,
      contact,
      savedRecipes: [] // ✅ EMPTY on signup
    });

    await newUser.save();
    res.status(200).json({ result: "User registered successfully" });
  } catch (error) {
    res.status(409).json({ result: error.message });
  }
};

/* ========== LOGIN ========== */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await FFUser.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ result: "Invalid email or password" });
    }

    res.status(200).json({
      result: "Login successful",
      userId: user._id,
      username: user.username,
      savedRecipes: user.savedRecipes
    });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

/* ========== SAVE RECIPE ========== */
const saveRecipe = async (req, res) => {
  const { userId, recipe } = req.body;

  try {
    const user = await FFUser.findById(userId);
    if (!user) return res.status(404).json({ result: "User not found" });

    const exists = user.savedRecipes.some(
      (r) => r.recipeId === recipe.recipeId
    );

    if (exists) {
      return res.status(200).json({
        result: "Already saved",
        savedRecipes: user.savedRecipes
      });
    }

    user.savedRecipes.push(recipe);
    await user.save();

    res.status(200).json({
      result: "Recipe saved",
      savedRecipes: user.savedRecipes
    });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

/* ========== REMOVE RECIPE ========== */
const removeRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    const user = await FFUser.findById(userId);
    if (!user) return res.status(404).json({ result: "User not found" });

    user.savedRecipes = user.savedRecipes.filter(
      (r) => r.recipeId !== recipeId
    );

    await user.save();

    res.status(200).json({
      result: "Recipe removed",
      savedRecipes: user.savedRecipes
    });
  } catch (error) {
    res.status(500).json({ result: error.message });
  }
};

module.exports = {
  saveInfo,
  loginUser,
  saveRecipe,
  removeRecipe
};

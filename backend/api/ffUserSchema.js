const mongoose = require("mongoose");

const ffUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact:  { type: Number, required: true, unique: true },

    savedRecipes: [
      {
        recipeId: String,
        title: String,
        image: String,
        category: String,
        savedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("FFUser", ffUserSchema, "ff_users");

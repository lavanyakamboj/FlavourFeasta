const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("✅ Connected to Flavour Fiesta DB");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

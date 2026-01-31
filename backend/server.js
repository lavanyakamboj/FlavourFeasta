const express = require("express");
const cors = require("cors");
const ffAuthRoutes = require("./auth");
require("dotenv").config();

const app = express();
const connectDB = require("./api/config");

const port = process.env.PORT || 4545;
const host = process.env.HOST || "localhost";


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Use user routes
app.use("/ff-user", ffAuthRoutes);

app.get("/", (req, res) => {
	res.json({ result: "🍽️ Flavour Fiesta Backend Running" });
});

app.listen(port, host, () => {
  console.log(`User server running at http://${host}:${port}`);
});

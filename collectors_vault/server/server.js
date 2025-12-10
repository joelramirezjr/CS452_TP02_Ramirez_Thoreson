const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const gamesRouter = require("./routes/games");

const app = express();
const PORT = 5000;

// Allow larger JSON payloads (supports Base64 images up to ~10MB)
app.use(cors());
app.use(express.json({ limit: "15mb" }));

// Routes
app.use("/api/games", gamesRouter);

// MongoDB
mongoose
  .connect("mongodb+srv://joeyramirez575_db_user:Bailey1212@cluster0.dvor4bv.mongodb.net/")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


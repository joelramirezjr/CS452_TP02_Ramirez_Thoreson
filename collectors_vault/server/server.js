const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const gamesRouter = require("./routes/games");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

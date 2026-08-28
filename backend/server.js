const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const gamesRouter = require("./routes/games");
const usersRouter = require("./routes/users");
const libraryRouter = require("./routes/library");
const adminRouter = require("./routes/admin");
const reviewsRoutes = require("./routes/reviews");

app.use("/games", gamesRouter);
app.use("/users", usersRouter);
app.use("/library", libraryRouter);
app.use("/admin", adminRouter);
app.use("/reviews", reviewsRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Game Library API is running!"
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
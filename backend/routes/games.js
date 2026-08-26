const express = require("express");
const router = express.Router();

const db = require("../db");

// Get all games
router.get("/", (req, res) => {

    const sql = "SELECT * FROM games";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Error fetching games"
            });
        }

        res.json(result);
    });
});


// Get one game by ID
router.get("/:id", (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM games WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Error fetching game"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Game not found"
            });
        }

        res.json(result[0]);
    });
});


module.exports = router;
const express = require("express");

const router = express.Router();

const db = require("../db");

const authenticateToken = require("../middleware/auth");
const requireAdmin = require("../middleware/admin");


// ADD GAME
router.post("/games", authenticateToken, requireAdmin, (req, res) => {

    const {
        title,
        description,
        genre,
        platform,
        developer,
        publisher,
        release_date,
        rating,
        cover_image
    } = req.body;

    if (!title || !genre || !platform) {
        return res.status(400).json({
            message: "Title, genre and platform are required"
        });
    }

    const sql = `
        INSERT INTO games
        (
            title,
            description,
            genre,
            platform,
            developer,
            publisher,
            release_date,
            rating,
            cover_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            description,
            genre,
            platform,
            developer,
            publisher,
            release_date,
            rating,
            cover_image
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Error adding game"
                });
            }

            res.status(201).json({
                message: "Game added successfully",
                game_id: result.insertId
            });
        }
    );
});


// UPDATE GAME
router.put("/games/:id", authenticateToken, requireAdmin, (req, res) => {

    const game_id = req.params.id;

    const {
        title,
        description,
        genre,
        platform,
        developer,
        publisher,
        release_date,
        rating,
        cover_image
    } = req.body;

    const sql = `
        UPDATE games
        SET
            title = ?,
            description = ?,
            genre = ?,
            platform = ?,
            developer = ?,
            publisher = ?,
            release_date = ?,
            rating = ?,
            cover_image = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            title,
            description,
            genre,
            platform,
            developer,
            publisher,
            release_date,
            rating,
            cover_image,
            game_id
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Error updating game"
                });
            }

            res.json({
                message: "Game updated successfully"
            });
        }
    );
});


// DELETE GAME
router.delete("/games/:id", authenticateToken, requireAdmin, (req, res) => {

    const game_id = req.params.id;

    const sql = "DELETE FROM games WHERE id = ?";

    db.query(sql, [game_id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Error deleting game"
            });
        }

        res.json({
            message: "Game deleted successfully"
        });
    });
});


module.exports = router;
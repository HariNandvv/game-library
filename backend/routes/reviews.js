const express = require("express");
const router = express.Router();

const db = require("../db");
const authenticateToken = require("../middleware/auth");


// ===============================
// ADD REVIEW
// ===============================

router.post("/", authenticateToken, (req, res) => {

    const user_id = req.user.id;
    const { game_id, rating, review } = req.body;

    if (!game_id || !rating || !review) {
        return res.status(400).json({
            message: "Game, rating and review are required"
        });
    }

    // Check if user already reviewed this game
    const checkSql = `
        SELECT id
        FROM reviews
        WHERE user_id = ? AND game_id = ?
    `;

    db.query(
        checkSql,
        [user_id, game_id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "You have already reviewed this game"
                });
            }

            const sql = `
                INSERT INTO reviews
                (user_id, game_id, rating, review, date_created)
                VALUES (?, ?, ?, ?, CURDATE())
            `;

            db.query(
                sql,
                [user_id, game_id, rating, review],
                (err, result) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            message: "Error adding review"
                        });
                    }

                    res.status(201).json({
                        message: "Review added successfully"
                    });

                }
            );

        }
    );

});


// ===============================
// GET REVIEWS FOR A GAME
// ===============================

router.get("/:game_id", (req, res) => {

    const game_id = req.params.game_id;

    const sql = `
        SELECT
            reviews.id,
            reviews.user_id,
            reviews.game_id,
            reviews.rating,
            reviews.review,
            reviews.date_created,
            users.email

        FROM reviews

        JOIN users
        ON reviews.user_id = users.id

        WHERE reviews.game_id = ?

        ORDER BY reviews.id DESC
    `;

    db.query(
        sql,
        [game_id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Error fetching reviews"
                });
            }

            res.json(result);

        }
    );

});


// ===============================
// UPDATE REVIEW
// ===============================

router.put("/:id", authenticateToken, (req, res) => {

    const review_id = req.params.id;
    const user_id = req.user.id;

    const { rating, review } = req.body;

    if (!rating || !review) {
        return res.status(400).json({
            message: "Rating and review are required"
        });
    }

    const sql = `
        UPDATE reviews
        SET rating = ?, review = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [rating, review, review_id, user_id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Error updating review"
                });
            }

            if (result.affectedRows === 0) {

                return res.status(403).json({
                    message: "You can only edit your own review"
                });

            }

            res.json({
                message: "Review updated successfully"
            });

        }
    );

});


// ===============================
// DELETE REVIEW
// ===============================

router.delete("/:id", authenticateToken, (req, res) => {

    const review_id = req.params.id;
    const user_id = req.user.id;

    const sql = `
        DELETE FROM reviews
        WHERE id = ? AND user_id = ?
    `;

    db.query(
        sql,
        [review_id, user_id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Error deleting review"
                });
            }

            if (result.affectedRows === 0) {

                return res.status(403).json({
                    message: "You can only delete your own review"
                });

            }

            res.json({
                message: "Review deleted successfully"
            });

        }
    );

});


module.exports = router;
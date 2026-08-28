const express = require("express");

const router = express.Router();

const db = require("../db");

const authenticateToken = require("../middleware/auth");


// ADD GAME / CHANGE STATUS

router.post("/add", authenticateToken, (req, res) => {

    const { game_id, status } = req.body;

    const user_id = req.user.id;


    if (!user_id || !game_id || !status) {

        return res.status(400).json({
            message: "Missing required fields"
        });

    }


    // Check if game is already in library

    const checkSql = `
        SELECT id
        FROM user_lib
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


            // GAME ALREADY EXISTS
            if (result.length > 0) {

                const library_id = result[0].id;


                const updateSql = `
                    UPDATE user_lib
                    SET status = ?
                    WHERE id = ?
                `;


                db.query(
                    updateSql,
                    [status, library_id],
                    (err) => {

                        if (err) {

                            console.log(err);

                            return res.status(500).json({
                                message: "Error updating library status"
                            });

                        }


                        return res.json({
                            message: "Library status updated"
                        });

                    }
                );


                return;
            }


            // GAME DOES NOT EXIST
            const sql = `
                INSERT INTO user_lib
                (user_id, game_id, status, date_added)
                VALUES (?, ?, ?, CURDATE())
            `;


            db.query(
                sql,
                [user_id, game_id, status],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Error adding game"
                        });

                    }


                    res.status(201).json({
                        message: "Game added to library"
                    });

                }
            );

        }
    );

});

// GET USER LIBRARY

router.get("/", authenticateToken, (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            user_lib.id,
            user_lib.status,
            user_lib.date_added,

            games.id AS game_id,
            games.title,
            games.description,
            games.genre,
            games.platform,
            games.developer,
            games.publisher,
            games.release_date,
            games.rating,
            games.cover_image

        FROM user_lib

        JOIN games
        ON user_lib.game_id = games.id

        WHERE user_lib.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Error fetching library"
            });

        }

        res.json(result);

    });

});


// UPDATE GAME STATUS

router.put("/status/:id", authenticateToken, (req, res) => {

    const library_id = req.params.id;

    const user_id = req.user.id;

    const { status } = req.body;


    if (!status) {

        return res.status(400).json({
            message: "Status is required"
        });

    }


    const sql = `
        UPDATE user_lib
        SET status = ?
        WHERE id = ? AND user_id = ?
    `;


    db.query(
        sql,
        [status, library_id, user_id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Error updating status"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Library game not found"
                });

            }


            res.json({
                message: "Status updated"
            });

        }
    );

});


// REMOVE GAME FROM LIBRARY

router.delete("/:id", authenticateToken, (req, res) => {

    const library_id = req.params.id;

    const user_id = req.user.id;


    const sql = `
        DELETE FROM user_lib
        WHERE id = ? AND user_id = ?
    `;


    db.query(
        sql,
        [library_id, user_id],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Error removing game"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Library game not found"
                });

            }


            res.json({
                message: "Game removed from library"
            });

        }
    );

});


module.exports = router;
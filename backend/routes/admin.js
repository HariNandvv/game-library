const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const db = require("../db");

const authenticateToken = require("../middleware/auth");
const requireAdmin = require("../middleware/admin");


// ============================
// IMAGE UPLOAD CONFIGURATION
// ============================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            path.join(__dirname, "../uploads")
        );

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "-");

        cb(null, uniqueName);

    }

});


const upload = multer({
    storage: storage
});


// ============================
// ADD GAME
// ============================

router.post(
    "/games",
    authenticateToken,
    requireAdmin,
    upload.single("cover_image"),
    (req, res) => {

        const {
            title,
            description,
            genre,
            platform,
            developer,
            publisher,
            release_date,
            rating
        } = req.body;


        const cover_image =
            req.file
                ? req.file.filename
                : null;


        if (!title || !genre || !platform) {

            return res.status(400).json({
                message:
                    "Title, genre and platform are required"
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
                release_date || null,
                rating || null,
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

                    message:
                        "Game added successfully",

                    game_id:
                        result.insertId,

                    cover_image:
                        cover_image

                });

            }
        );

    }
);


// ============================
// UPDATE GAME
// ============================

router.put(
    "/games/:id",
    authenticateToken,
    requireAdmin,
    upload.single("cover_image"),
    (req, res) => {

        const game_id = req.params.id;

        const {
            title,
            description,
            genre,
            platform,
            developer,
            publisher,
            release_date,
            rating
        } = req.body;


        // If a new image was selected,
        // use the new image.
        // Otherwise keep the old image.

        if (req.file) {

            const cover_image =
                req.file.filename;


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
                    release_date || null,
                    rating || null,
                    cover_image,
                    game_id
                ],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message:
                                "Error updating game"
                        });

                    }


                    res.json({
                        message:
                            "Game updated successfully"
                    });

                }
            );


        } else {

            // NO NEW IMAGE

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
                    rating = ?
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
                    release_date || null,
                    rating || null,
                    game_id
                ],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message:
                                "Error updating game"
                        });

                    }


                    res.json({
                        message:
                            "Game updated successfully"
                    });

                }
            );

        }

    }
);


// ============================
// DELETE GAME
// ============================

router.delete(
    "/games/:id",
    authenticateToken,
    requireAdmin,
    (req, res) => {

        const game_id = req.params.id;


        const sql =
            "DELETE FROM games WHERE id = ?";


        db.query(
            sql,
            [game_id],
            (err, result) => {

                if (err) {

                    console.log(err);

                    return res.status(500).json({
                        message:
                            "Error deleting game"
                    });

                }


                res.json({
                    message:
                        "Game deleted successfully"
                });

            }
        );

    }
);


module.exports = router;
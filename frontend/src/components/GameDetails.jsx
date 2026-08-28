import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function GameDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [game, setGame] = useState(null);

    const [libraryStatus, setLibraryStatus] = useState(null);
    const [libraryMessage, setLibraryMessage] = useState("");

    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(10);
    const [reviewText, setReviewText] = useState("");

    const [reviewMessage, setReviewMessage] = useState("");
    const [editingReview, setEditingReview] = useState(null);
    const [editRating, setEditRating] = useState(10);
    const [editReviewText, setEditReviewText] = useState("");


    // GET GAME DETAILS

    useEffect(() => {

        fetch(`http://localhost:5000/games/${id}`)

            .then((response) => response.json())

            .then((data) => {
                setGame(data);
            })

            .catch((error) => {
                console.log(
                    "Error fetching game:",
                    error
                );
            });

    }, [id]);


    // GET USER LIBRARY

    useEffect(() => {

        if (!user) {
            return;
        }

        fetch("http://localhost:5000/library", {

            headers: {
                "Authorization":
                    `Bearer ${localStorage.getItem("token")}`
            }

        })

            .then((response) => response.json())

            .then((data) => {

                const libraryGame = data.find(
                    (item) =>
                        item.game_id === Number(id)
                );

                if (libraryGame) {

                    setLibraryStatus(
                        libraryGame.status
                    );

                }

            })

            .catch((error) => {

                console.log(
                    "Error fetching library:",
                    error
                );

            });

    }, [id]);


    // GET REVIEWS

    const fetchReviews = () => {

        fetch(`http://localhost:5000/reviews/${id}`)

            .then((response) => response.json())

            .then((data) => {

                setReviews(data);

            })

            .catch((error) => {

                console.log(
                    "Error fetching reviews:",
                    error
                );

            });

    };


    useEffect(() => {

        fetchReviews();

    }, [id]);


    // ADD / UPDATE LIBRARY STATUS

    const addToLibrary = async (status) => {

        if (!user) {

            navigate("/login");

            return;

        }

        try {

            const response = await fetch(
                "http://localhost:5000/library/add",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`

                    },

                    body: JSON.stringify({

                        game_id: game.id,

                        status: status

                    })

                }
            );


            const data = await response.json();


            if (response.ok) {

                setLibraryStatus(status);

                setLibraryMessage(
                    data.message
                );

            } else {

                setLibraryMessage(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            setLibraryMessage(
                "Server error"
            );

        }

    };


    // ADD REVIEW

    const addReview = async () => {

        if (!user) {

            navigate("/login");

            return;

        }


        if (!reviewText.trim()) {

            setReviewMessage(
                "Please write a review."
            );

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/reviews",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`

                    },

                    body: JSON.stringify({

                        game_id: game.id,

                        rating: Number(rating),

                        review: reviewText

                    })

                }
            );


            const data = await response.json();


            if (response.ok) {

                setReviewMessage(
                    data.message
                );

                setReviewText("");

                setRating(10);

                fetchReviews();

            } else {

                setReviewMessage(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            setReviewMessage(
                "Server error"
            );

        }

    };
    // UPDATE REVIEW

    const updateReview = async (reviewId) => {

        try {

            const response = await fetch(
                `http://localhost:5000/reviews/${reviewId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify({
                        rating: Number(editRating),
                        review: editReviewText
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setReviewMessage(
                    data.message
                );

                setEditingReview(null);

                setEditReviewText("");

                fetchReviews();

            } else {

                setReviewMessage(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            setReviewMessage(
                "Server error"
            );

        }
    };
    // DELETE REVIEW

    const deleteReview = async (reviewId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/reviews/${reviewId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {

                setReviewMessage(
                    data.message
                );

                fetchReviews();

            } else {

                setReviewMessage(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            setReviewMessage(
                "Server error"
            );

        }
    };


    if (!game) {

        return <h2>Loading...</h2>;

    }


    return (

        <div>

            <Navbar />


            <div className="details-page">


                {/* BACK BUTTON */}

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Games
                </button>


                <div className="details-container">


                    {/* GAME IMAGE */}

                    <img
                        src={`/images/${game.cover_image}`}
                        alt={game.title}
                        className="details-image"
                    />


                    {/* GAME INFORMATION */}

                    <div className="details-info">

                        <h1>
                            {game.title}
                        </h1>


                        <p className="details-description">
                            {game.description}
                        </p>


                        <p>
                            <strong>
                                Genre:
                            </strong>{" "}
                            {game.genre}
                        </p>


                        <p>
                            <strong>
                                Platform:
                            </strong>{" "}
                            {game.platform}
                        </p>


                        <p>
                            <strong>
                                Developer:
                            </strong>{" "}
                            {game.developer}
                        </p>


                        <p>
                            <strong>
                                Publisher:
                            </strong>{" "}
                            {game.publisher}
                        </p>


                        <p>
                            <strong>
                                Release Date:
                            </strong>{" "}
                            {game.release_date}
                        </p>


                        <p className="details-rating">
                            ⭐ {game.rating}/10
                        </p>


                        {/* LIBRARY */}

                        <div className="library-section">

                            <h3>
                                My Library
                            </h3>


                            {libraryStatus && (

                                <p>
                                    Current status:{" "}

                                    <strong>
                                        {libraryStatus}
                                    </strong>
                                </p>

                            )}


                            <div className="library-buttons">

                                <button
                                    className={
                                        libraryStatus === "Wishlist"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        addToLibrary(
                                            "Wishlist"
                                        )
                                    }
                                >
                                    ❤️ Wishlist
                                </button>


                                <button
                                    className={
                                        libraryStatus === "Playing"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        addToLibrary(
                                            "Playing"
                                        )
                                    }
                                >
                                    🎮 Playing
                                </button>


                                <button
                                    className={
                                        libraryStatus === "Completed"
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        addToLibrary(
                                            "Completed"
                                        )
                                    }
                                >
                                    ✅ Completed
                                </button>

                            </div>


                            {libraryMessage && (

                                <p>
                                    {libraryMessage}
                                </p>

                            )}

                        </div>

                    </div>

                </div>


                {/* REVIEWS */}

                <div className="reviews-section">

                    <h2>
                        ⭐ Reviews
                    </h2>


                    {/* ADD REVIEW */}

                    <div className="review-form">

                        <h3>
                            Write a Review
                        </h3>


                        <label>
                            Rating
                        </label>


                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                        >

                            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
                                .map((number) => (

                                    <option
                                        key={number}
                                        value={number}
                                    >
                                        ⭐ {number}/10
                                    </option>

                                ))}

                        </select>


                        <textarea
                            placeholder="Write your review..."
                            value={reviewText}
                            onChange={(e) =>
                                setReviewText(
                                    e.target.value
                                )
                            }
                        />


                        <button
                            onClick={addReview}
                        >
                            Submit Review
                        </button>


                        {reviewMessage && (

                            <p>
                                {reviewMessage}
                            </p>

                        )}

                    </div>


                    {/* REVIEW LIST */}

                    <div className="review-list">

                        {reviews.length === 0 ? (

                            <p>
                                No reviews yet.
                            </p>

                        ) : (

                            reviews.map((item) => (

                                <div
                                    className="review-card"
                                    key={item.id}
                                >

                                    <h3>
                                        ⭐ {item.rating}/10
                                    </h3>

                                    <p>
                                        {item.review}
                                    </p>

                                    <small>
                                        — {item.email}
                                    </small>

                                    <br />

                                    <small>
                                        {item.date_created}
                                    </small>


                                    {/* EDIT / DELETE BUTTONS */}

                                    {user && user.id === item.user_id && (

                                        <div className="review-actions">

                                            <button
                                                onClick={() => {

                                                    setEditingReview(item.id);

                                                    setEditRating(item.rating);

                                                    setEditReviewText(item.review);

                                                }}
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    deleteReview(item.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    )}


                                    {/* EDIT FORM */}

                                    {editingReview === item.id && (

                                        <div className="edit-review">

                                            <h4>
                                                Edit Review
                                            </h4>


                                            <select
                                                value={editRating}
                                                onChange={(e) =>
                                                    setEditRating(e.target.value)
                                                }
                                            >

                                                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
                                                    .map((number) => (

                                                        <option
                                                            key={number}
                                                            value={number}
                                                        >
                                                            ⭐ {number}/10
                                                        </option>

                                                    ))}

                                            </select>


                                            <textarea
                                                value={editReviewText}
                                                onChange={(e) =>
                                                    setEditReviewText(
                                                        e.target.value
                                                    )
                                                }
                                            />


                                            <button
                                                onClick={() =>
                                                    updateReview(item.id)
                                                }
                                            >
                                                Save Changes
                                            </button>


                                            <button
                                                onClick={() =>
                                                    setEditingReview(null)
                                                }
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    )}

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default GameDetails;
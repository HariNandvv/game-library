import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Library() {

    const [library, setLibrary] = useState([]);
    const [filter, setFilter] = useState("All");

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/library", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setLibrary(data);
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }, []);

    // CHANGE STATUS
    const updateStatus = async (libraryId, newStatus) => {

        try {

            const response = await fetch(
                `http://localhost:5000/library/status/${libraryId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            // Update the page without refreshing
            setLibrary((oldLibrary) =>
                oldLibrary.map((game) =>
                    game.id === libraryId
                        ? { ...game, status: newStatus }
                        : game
                )
            );

        } catch (error) {

            console.log("Error updating status:", error);

        }
    };


    // REMOVE GAME
    const removeGame = async (libraryId) => {

        try {

            const response = await fetch(
                `http://localhost:5000/library/${libraryId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            console.log(data);

            // Remove game from the page
            setLibrary((oldLibrary) =>
                oldLibrary.filter(
                    (game) => game.id !== libraryId
                )
            );

        } catch (error) {

            console.log("Error removing game:", error);

        }
    };


    const filteredGames =
        filter === "All"
            ? library
            : library.filter(
                (game) => game.status === filter
            );


    if (!user) {
        return null;
    }


    return (
        <div>

            <Navbar />

            <div className="library-page">

                <h1>My Library</h1>

                {/* FILTER BUTTONS */}

                <div className="library-filters">

                    <button
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("Wishlist")}
                    >
                        ❤️ Wishlist
                    </button>

                    <button
                        onClick={() => setFilter("Playing")}
                    >
                        🎮 Playing
                    </button>

                    <button
                        onClick={() => setFilter("Completed")}
                    >
                        ✅ Completed
                    </button>

                </div>

                {/* GAMES */}

                {filteredGames.length === 0 ? (

                    <p>No games found.</p>

                ) : (

                    <div className="game-grid">

                        {filteredGames.map((game) => (

                            <div
                                className="game-card"
                                key={game.id}
                            >

                                <div className="game-image">

                                    <img
                                        src={`/images/${game.cover_image}`}
                                        alt={game.title}
                                    />

                                </div>

                                <div className="game-info">

                                    <h2>
                                        {game.title}
                                    </h2>

                                    <p>
                                        {game.genre}
                                    </p>

                                    <p>
                                        ⭐ {game.rating}
                                    </p>

                                    <p>
                                        Status:
                                        <strong>
                                            {" "}{game.status}
                                        </strong>
                                    </p>

                                    {/* STATUS BUTTONS */}

                                    <div className="status-buttons">

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    game.id,
                                                    "Wishlist"
                                                )
                                            }
                                        >
                                            ❤️
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    game.id,
                                                    "Playing"
                                                )
                                            }
                                        >
                                            🎮
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    game.id,
                                                    "Completed"
                                                )
                                            }
                                        >
                                            ✅
                                        </button>

                                    </div>

                                    {/* VIEW DETAILS */}

                                    <Link
                                        to={`/game/${game.game_id}`}
                                    >
                                        View Details
                                    </Link>

                                    {/* REMOVE */}

                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            removeGame(game.id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Library;
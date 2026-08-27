import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function GameDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [libraryMessage, setLibraryMessage] = useState("");
    const [game, setGame] = useState(null);

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
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify({
                        game_id: game.id,
                        status: status
                    })
                }
            );

            const data = await response.json();

            setLibraryMessage(data.message);

        } catch (error) {

            console.log(error);
            setLibraryMessage("Server error");
        }
    };

    useEffect(() => {

        fetch(`http://localhost:5000/games/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setGame(data);
            })
            .catch((error) => {
                console.log("Error fetching game:", error);
            });

    }, [id]);

    if (!game) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <Navbar />
            
            <div className="details-page">

                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Back to Library
                </button>

                <div className="details-container">

                    <img
                        src={`/images/${game.cover_image}`}
                        alt={game.title}
                        className="details-image"
                    />

                    <div className="details-info">

                        <h1>{game.title}</h1>

                        <p className="details-description">
                            {game.description}
                        </p>

                        <p>
                            <strong>Genre:</strong> {game.genre}
                        </p>

                        <p>
                            <strong>Platform:</strong> {game.platform}
                        </p>

                        <p>
                            <strong>Developer:</strong> {game.developer}
                        </p>

                        <p>
                            <strong>Publisher:</strong> {game.publisher}
                        </p>

                        <p>
                            <strong>Release Date:</strong> {game.release_date}
                        </p>

                        <p className="details-rating">
                            ⭐ {game.rating}/10
                        </p>
                        <div className="library-buttons">

                            <button
                                onClick={() => addToLibrary("Wishlist")}
                            >
                                ❤️ Wishlist
                            </button>

                            <button
                                onClick={() => addToLibrary("Playing")}
                            >
                                🎮 Playing
                            </button>

                            <button
                                onClick={() => addToLibrary("Completed")}
                            >
                                ✅ Completed
                            </button>

                        </div>

                        {libraryMessage && (
                            <p>{libraryMessage}</p>
                        )}

                    </div>

                </div>
            </div>

        </div>
    );
}

export default GameDetails;
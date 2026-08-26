import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function GameDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);

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

                </div>

            </div>

        </div>
    );
}

export default GameDetails;
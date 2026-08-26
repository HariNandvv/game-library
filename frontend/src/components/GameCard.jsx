import { useNavigate } from "react-router-dom";

function GameCard({ game }) {

    const navigate = useNavigate();

    return (
        <div className="game-card">

            <div className="game-image">

                <img
                    src={
                        game.cover_image
                            ? `/images/${game.cover_image}`
                            : "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={game.title}
                />

            </div>


            <div className="game-info">

                <h2>{game.title}</h2>

                <p className="genre">
                    {game.genre}
                </p>

                <p>
                    Platform: {game.platform}
                </p>

                <p className="rating">
                    ⭐ {game.rating}
                </p>

                <button
                    onClick={() => navigate(`/game/${game.id}`)}
                >
                    View Details
                </button>

            </div>

        </div>
    );
}

export default GameCard;
import { useNavigate } from "react-router-dom";

function GameCard({ game }) {

    const navigate = useNavigate();

    return (

        <div className="game-card">

            {/* GAME COVER */}

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


            {/* GAME INFORMATION */}

            <div className="game-info">

                <h2>
                    {game.title}
                </h2>


                <span className="genre">
                    {game.genre}
                </span>


                <p className="platform">
                    🎮 {game.platform}
                </p>


                <p className="rating">
                    ⭐ {game.rating}/10
                </p>


                <button
                    onClick={() =>
                        navigate(`/game/${game.id}`)
                    }
                >
                    View Details
                </button>

            </div>

        </div>

    );
}

export default GameCard;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameCard from "./GameCard";

function Home() {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    useEffect(() => {

        fetch("http://localhost:5000/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            })
            .catch((error) => {
                console.log("Error fetching games:", error);
            });

    }, []);

    return (
        <div className="app">

            <header className="navbar">

                <h1>🎮 Game Library</h1>

                <nav>

                    <Link to="/">Home</Link>

                    {user ? (
                        <>
                            <Link to="/library">My Library</Link>

                            <span>
                                Welcome, {user.username}
                            </span>

                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}

                </nav>

            </header>


            <main>

                <section className="hero">

                    <h1>Discover Your Next Game</h1>

                    <p>
                        Explore games, build your collection,
                        and track your gaming journey.
                    </p>

                </section>


                <section className="games-section">

                    <h2>Game Library</h2>

                    <div className="game-grid">

                        {games.map((game) => (

                            <GameCard
                                key={game.id}
                                game={game}
                            />

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Home;
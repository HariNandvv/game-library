import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import Navbar from "./Navbar";

function Home() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [genre, setGenre] = useState("All");
    const [platform, setPlatform] = useState("All");


    // GET ALL GAMES

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


    // GET UNIQUE GENRES
    const genres = [
        "All",
        ...new Set(
            games
                .flatMap((game) =>
                    game.genre
                        ? game.genre.split(",").map((item) => item.trim())
                        : []
                )
                .filter(Boolean)
        )
    ];


    // GET UNIQUE PLATFORMS

    const platforms = [
        "All",
        ...new Set(
            games
                .flatMap((game) =>
                    game.platform
                        ? game.platform.split(",").map((platform) => platform.trim())
                        : []
                )
        )
    ];


    // FILTER GAMES
    const filteredGames = games.filter((game) => {

        const gameGenres = game.genre
            ? game.genre.split(",").map((item) => item.trim())
            : [];

        const gamePlatforms = game.platform
            ? game.platform.split(",").map((item) => item.trim())
            : [];


        const matchesSearch =
            game.title
                .toLowerCase()
                .includes(search.toLowerCase());


        const matchesGenre =
            genre === "All" ||
            gameGenres.includes(genre);


        const matchesPlatform =
            platform === "All" ||
            gamePlatforms.includes(platform);


        return (
            matchesSearch &&
            matchesGenre &&
            matchesPlatform
        );
    });


    return (

        <div>

            <Navbar />


            {/* MAIN CONTENT */}

            <main className="home-page">

                <h1>
                    Browse Games
                </h1>


                {/* SEARCH */}

                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search games..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* FILTERS */}

                <div className="filters">

                    {/* GENRE FILTER */}

                    <select
                        value={genre}
                        onChange={(e) =>
                            setGenre(e.target.value)
                        }
                    >

                        {genres.map((item) => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item === "All"
                                    ? "All Genres"
                                    : item}

                            </option>

                        ))}

                    </select>


                    {/* PLATFORM FILTER */}

                    <select
                        value={platform}
                        onChange={(e) =>
                            setPlatform(e.target.value)
                        }
                    >

                        {platforms.map((item) => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item === "All"
                                    ? "All Platforms"
                                    : item}

                            </option>

                        ))}

                    </select>

                </div>


                {/* GAME COUNT */}

                <p>
                    Showing {filteredGames.length} of {games.length} games
                </p>


                {/* GAME GRID */}

                {filteredGames.length === 0 ? (

                    <p>
                        No games found.
                    </p>

                ) : (

                    <div className="game-grid">

                        {filteredGames.map((game) => (

                            <GameCard
                                key={game.id}
                                game={game}
                            />

                        ))}

                    </div>

                )}

            </main>

        </div>

    );

}

export default Home;
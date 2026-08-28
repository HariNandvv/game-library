import { useEffect, useState } from "react";

function Admin() {

    const [games, setGames] = useState([]);
    const [editingGame, setEditingGame] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        genre: "",
        platform: "",
        developer: "",
        publisher: "",
        release_date: "",
        rating: "",
        cover_image: ""
    });

    const [message, setMessage] = useState("");


    // GET ALL GAMES

    const fetchGames = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/games"
            );

            const data = await response.json();

            setGames(data);

        } catch (error) {

            console.log("Error:", error);

        }

    };


    useEffect(() => {

        fetchGames();

    }, []);


    // HANDLE FORM

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // ADD GAME

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const url = editingGame
                ? `http://localhost:5000/admin/games/${editingGame.id}`
                : "http://localhost:5000/admin/games";

            const method = editingGame
                ? "PUT"
                : "POST";

            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },

                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage(
                    editingGame
                        ? "Game updated successfully!"
                        : "Game added successfully!"
                );

                setForm({
                    title: "",
                    description: "",
                    genre: "",
                    platform: "",
                    developer: "",
                    publisher: "",
                    release_date: "",
                    rating: "",
                    cover_image: ""
                });

                setEditingGame(null);

                fetchGames();

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            console.log(error);

            setMessage("Something went wrong.");

        }

    };
    const editGame = (game) => {

        setEditingGame(game);

        setForm({
            title: game.title || "",
            description: game.description || "",
            genre: game.genre || "",
            platform: game.platform || "",
            developer: game.developer || "",
            publisher: game.publisher || "",
            release_date: game.release_date
                ? game.release_date.substring(0, 10)
                : "",
            rating: game.rating || "",
            cover_image: game.cover_image || ""
        });

    };


    // DELETE GAME

    const deleteGame = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this game?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:5000/admin/games/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage("Game deleted successfully!");

                setGames(
                    games.filter((game) => game.id !== id)
                );

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            console.log(error);

            setMessage("Something went wrong.");

        }

    };


    return (

        <div className="admin-page">

            <h1>Admin Dashboard</h1>


            {/* ADD GAME */}

            <h2> {editingGame ? "Edit Game" : "Add New Game"} </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Game Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={form.genre}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="platform"
                    placeholder="Platform"
                    value={form.platform}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="developer"
                    placeholder="Developer"
                    value={form.developer}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher"
                    value={form.publisher}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="release_date"
                    value={form.release_date}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    min="0"
                    max="10"
                    step="0.1"
                    value={form.rating}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="cover_image"
                    placeholder="Cover image filename"
                    value={form.cover_image}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editingGame ? "Update Game" : "Add Game"}
                </button>

                {editingGame && (
                    <button
                        type="button"
                        onClick={() => {

                            setEditingGame(null);

                            setForm({
                                title: "",
                                description: "",
                                genre: "",
                                platform: "",
                                developer: "",
                                publisher: "",
                                release_date: "",
                                rating: "",
                                cover_image: ""
                            });

                        }}
                    >
                        Cancel
                    </button>
                )}

            </form>


            {message && (
                <p>{message}</p>
            )}


            {/* ALL GAMES */}

            <h2>All Games</h2>

            <div className="admin-games">

                {games.map((game) => (

                    <div
                        className="admin-game"
                        key={game.id}
                    >

                        <h3>
                            {game.title}
                        </h3>

                        <p>
                            Genre: {game.genre}
                        </p>

                        <p>
                            Platform: {game.platform}
                        </p>

                        <p>
                            ⭐ {game.rating}
                        </p>

                        <button
                            onClick={() => editGame(game)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteGame(game.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Admin;
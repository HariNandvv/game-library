import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Admin() {

    const [games, setGames] = useState([]);

    const [editingGame, setEditingGame] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);

    const [form, setForm] = useState({

        title: "",
        description: "",
        genre: "",
        platform: "",
        developer: "",
        publisher: "",
        release_date: "",
        rating: ""

    });

    const [message, setMessage] = useState("");


    // ============================
    // RESET FORM
    // ============================

    const resetForm = () => {

        setForm({

            title: "",
            description: "",
            genre: "",
            platform: "",
            developer: "",
            publisher: "",
            release_date: "",
            rating: ""

        });

        setSelectedImage(null);

        setPreviewImage(null);

        setEditingGame(null);

    };


    // ============================
    // GET ALL GAMES
    // ============================

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


    // ============================
    // HANDLE INPUT
    // ============================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    // ============================
    // HANDLE IMAGE
    // ============================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }


        setSelectedImage(file);


        const imageURL =
            URL.createObjectURL(file);

        setPreviewImage(imageURL);

    };


    // ============================
    // SUBMIT
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const url = editingGame

                ? `http://localhost:5000/admin/games/${editingGame.id}`

                : "http://localhost:5000/admin/games";


            const method =
                editingGame ? "PUT" : "POST";


            const formData = new FormData();


            formData.append(
                "title",
                form.title
            );

            formData.append(
                "description",
                form.description
            );

            formData.append(
                "genre",
                form.genre
            );

            formData.append(
                "platform",
                form.platform
            );

            formData.append(
                "developer",
                form.developer
            );

            formData.append(
                "publisher",
                form.publisher
            );

            formData.append(
                "release_date",
                form.release_date
            );

            formData.append(
                "rating",
                form.rating
            );


            if (selectedImage) {

                formData.append(
                    "cover_image",
                    selectedImage
                );

            }


            const response = await fetch(
                url,
                {
                    method: method,

                    headers: {
                        "Authorization":
                            `Bearer ${localStorage.getItem("token")}`
                    },

                    body: formData

                }
            );


            const data =
                await response.json();


            if (response.ok) {

                setMessage(

                    editingGame

                        ? "Game updated successfully!"

                        : "Game added successfully!"

                );


                resetForm();

                fetchGames();


            } else {

                setMessage(
                    data.message
                );

            }


        } catch (error) {

            console.log(error);

            setMessage(
                "Something went wrong."
            );

        }

    };


    // ============================
    // EDIT GAME
    // ============================

    const editGame = (game) => {

        setEditingGame(game);


        setForm({

            title: game.title || "",

            description:
                game.description || "",

            genre:
                game.genre || "",

            platform:
                game.platform || "",

            developer:
                game.developer || "",

            publisher:
                game.publisher || "",

            release_date:
                game.release_date
                    ? game.release_date.substring(0, 10)
                    : "",

            rating:
                game.rating || ""

        });


        setSelectedImage(null);


        if (game.cover_image) {

            setPreviewImage(
                `http://localhost:5000/uploads/${game.cover_image}`
            );

        } else {

            setPreviewImage(null);

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ============================
    // DELETE GAME
    // ============================

    const deleteGame = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this game?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/admin/games/${id}`,
                    {
                        method: "DELETE",

                        headers: {
                            "Authorization":
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );


            const data =
                await response.json();


            if (response.ok) {

                setMessage(
                    "Game deleted successfully!"
                );


                setGames(
                    games.filter(
                        (game) =>
                            game.id !== id
                    )
                );

            } else {

                setMessage(
                    data.message
                );

            }


        } catch (error) {

            console.log(error);

            setMessage(
                "Something went wrong."
            );

        }

    };


    return (

        <div>
            <Navbar/>

            <div className="admin-page">

                


                {/* ============================
                    PAGE HEADER
                ============================ */}

                <div className="admin-header">

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage your game library
                    </p>

                </div>


                {/* ============================
                    FORM
                ============================ */}

                <section className="admin-form-card">

                    <h2>
                        {editingGame
                            ? "Edit Game"
                            : "Add New Game"}
                    </h2>


                    <form
                        onSubmit={handleSubmit}
                        className="admin-form"
                    >


                        {/* TITLE */}

                        <div className="form-group">

                            <label>
                                Game Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                placeholder="Enter game title"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group description-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Enter game description"
                                value={form.description}
                                onChange={handleChange}
                            />

                        </div>


                        {/* GENRE */}

                        <div className="form-group">

                            <label>
                                Genre
                            </label>

                            <input
                                type="text"
                                name="genre"
                                placeholder="e.g. Action, RPG"
                                value={form.genre}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* PLATFORM */}

                        <div className="form-group">

                            <label>
                                Platform
                            </label>

                            <input
                                type="text"
                                name="platform"
                                placeholder="e.g. PC, PS5, Xbox"
                                value={form.platform}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* DEVELOPER */}

                        <div className="form-group">

                            <label>
                                Developer
                            </label>

                            <input
                                type="text"
                                name="developer"
                                placeholder="Enter developer"
                                value={form.developer}
                                onChange={handleChange}
                            />

                        </div>


                        {/* PUBLISHER */}

                        <div className="form-group">

                            <label>
                                Publisher
                            </label>

                            <input
                                type="text"
                                name="publisher"
                                placeholder="Enter publisher"
                                value={form.publisher}
                                onChange={handleChange}
                            />

                        </div>


                        {/* RELEASE DATE */}

                        <div className="form-group">

                            <label>
                                Release Date
                            </label>

                            <input
                                type="date"
                                name="release_date"
                                value={form.release_date}
                                onChange={handleChange}
                            />

                        </div>


                        {/* RATING */}

                        <div className="form-group">

                            <label>
                                Rating
                            </label>

                            <input
                                type="number"
                                name="rating"
                                placeholder="e.g. 9.5"
                                min="0"
                                max="10"
                                step="0.1"
                                value={form.rating}
                                onChange={handleChange}
                            />

                        </div>


                        {/* ============================
                            IMAGE UPLOAD
                        ============================ */}

                        <div className="image-upload-section">

                            <label>
                                Cover Image
                            </label>


                            <div className="image-upload-container">


                                <label
                                    className="upload-box"
                                    htmlFor="cover-image"
                                >

                                    {previewImage ? (

                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="upload-preview"
                                        />

                                    ) : (

                                        <div className="upload-content">

                                            <span className="upload-icon">
                                                ↑
                                            </span>

                                            <strong>
                                                Click to upload
                                            </strong>

                                            <span>
                                                PNG, JPG or JPEG
                                            </span>

                                        </div>

                                    )}

                                </label>


                                <input
                                    id="cover-image"
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={handleImageChange}
                                />


                                {selectedImage && (

                                    <p className="selected-file">

                                        {selectedImage.name}

                                    </p>

                                )}

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="admin-form-buttons">

                            <button
                                type="submit"
                                className="primary-button"
                            >

                                {editingGame
                                    ? "Update Game"
                                    : "Add Game"}

                            </button>


                            {editingGame && (

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>


                    </form>


                    {message && (

                        <p className="admin-message">
                            {message}
                        </p>

                    )}

                </section>


                {/* ============================
                    ALL GAMES
                ============================ */}

                <section className="all-games-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                All Games
                            </h2>

                            <p>
                                {games.length} games in library
                            </p>

                        </div>

                    </div>


                    <div className="admin-games">

                        {games.map((game) => (

                            <div
                                className="admin-game"
                                key={game.id}
                            >


                                {/* IMAGE */}

                                <div className="admin-game-image">

                                    {game.cover_image ? (

                                        <img
                                            src={`http://localhost:5000/uploads/${game.cover_image}`}
                                            alt={game.title}
                                        />

                                    ) : (

                                        <div className="no-image">
                                            No Image
                                        </div>

                                    )}

                                </div>


                                {/* INFO */}

                                <div className="admin-game-info">

                                    <h3>
                                        {game.title}
                                    </h3>


                                    <span className="genre-tag">
                                        {game.genre}
                                    </span>


                                    <p>
                                        🎮 {game.platform}
                                    </p>


                                    <p className="admin-rating">
                                        ⭐ {game.rating}/10
                                    </p>


                                    <div className="game-actions">

                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                editGame(game)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                deleteGame(game.id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </div>
        </div>
    );

}

export default Admin;
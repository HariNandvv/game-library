import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <header className="navbar">

            <h1>
                🎮 Game Library
            </h1>

            <nav>

                <Link to="/">
                    Home
                </Link>

                {user ? (
                    <>
                        <Link to="/library">
                            My Library
                        </Link>

                        <span>
                            Welcome, {user.username}
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </nav>

        </header>
    );
}

export default Navbar;
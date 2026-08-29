import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:5000/users/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage(
                    "Registration successful!"
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1000);

            } else {

                setMessage(data.message);

            }

        } catch (error) {

            console.log(error);

            setMessage("Server error");

        }
    };


    return (

        <div className="auth-page">

            <div className="auth-box">

                {/* LOGO */}

                <div className="auth-logo">
                    🎮
                </div>


                <h1>
                    Game Library
                </h1>

                <p className="auth-subtitle">
                    Create your account
                </p>


                {/* REGISTER FORM */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* USERNAME */}

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        required
                    />


                    {/* EMAIL */}

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>

                    <div className="password-container">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >
                            {showPassword
                                ? "🙈"
                                : "👁️"}
                        </button>

                    </div>


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Create Account
                    </button>

                </form>


                {/* MESSAGE */}

                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}


                {/* LOGIN LINK */}

                <p className="auth-switch">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;
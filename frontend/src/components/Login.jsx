import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

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
                "http://localhost:5000/users/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                navigate("/");

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
                    Welcome back!
                </p>


                {/* LOGIN FORM */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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
                            placeholder="Enter your password"
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


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Login
                    </button>

                </form>


                {/* MESSAGE */}

                {message && (
                    <p className="auth-message">
                        {message}
                    </p>
                )}


                {/* REGISTER LINK */}

                <p className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
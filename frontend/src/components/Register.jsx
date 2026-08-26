import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

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

                setMessage("Registration successful!");

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
        <div className="login-page">

            <div className="login-box">

                <h1>🎮 Game Library</h1>

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                {message && (
                    <p>{message}</p>
                )}

                <p>
                    Already have an account?
                </p>

                <button
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

            </div>

        </div>
    );
}

export default Register;
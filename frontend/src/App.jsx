import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import GameDetails from "./components/GameDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Library from "./components/Library";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/game/:id"
                    element={<GameDetails />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/library"
                    element={
                        <ProtectedRoute>
                            <Library />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
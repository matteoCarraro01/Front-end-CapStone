import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:4001/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                login(data.user);

                navigate("/");
            } else {

                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-container">

            <motion.form
                onSubmit={handleRegister}
                className="auth-box"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >

                <h2 className="auth-title">Crea un account </h2>
                <p className="auth-subtitle">Unisciti a GameStore</p>

                <input
                required
                    type="text"
                    placeholder="Username"
                    className="auth-input"
                    onChange={(e) => setUsername(e.target.value)}
                />



                <input
                required
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                required
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="auth-button">
                    Registrati
                </button>

                <p className="auth-footer">
                    Hai già un account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Accedi
                    </span>
                </p>

            </motion.form>

        </div>
    );
}
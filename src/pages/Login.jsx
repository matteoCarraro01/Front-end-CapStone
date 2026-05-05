import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/auth.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const fakeUser = { email };

        login(fakeUser);
        navigate("/");
    };

    return (
        <div className="auth-container">
            <motion.form
                onSubmit={handleLogin}
                className="auth-box"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="auth-title">Bentornato!</h2>
                <p className="auth-subtitle">Accedi al tuo account GameStore</p>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                />


                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
                <button type="submit" className="auth-button">Accedi</button>

                <p className="auth-footer">
                    Non hai un account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                    >
                        Registrati
                    </span>
                </p>
            </motion.form>

        </div>

    );


}
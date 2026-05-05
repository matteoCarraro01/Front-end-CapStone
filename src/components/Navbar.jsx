import { Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";




export default function MyNavbar({ query, setQuery, onSearch }) {
    const navigate = useNavigate();
    const { cart, justAdded } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    return (
        <div className="ig-navbar">
            <Container className="ig-navbar-inner">


                <div className="ig-left">
                    <span className="ig-logo">GameStore</span>
                    <div className="ig-menu">
                        <span>PC</span>
                        <span>PlayStation</span>
                        <span>Xbox</span>
                        <span>Nintendo Switch</span>
                    </div>
                </div>


                <div className="ig-right">
                    <input
                        type="text"
                        placeholder="Cerca giochi..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="ig-search"
                    />

                    <button className="ig-search-btn" onClick={onSearch}>
                        Cerca
                    </button>

                    <div className="nav-icons">
                        <div className={`cart-icon ${justAdded ? "cart-bounce" : ""}`}
                            onClick={() => navigate("/cart")}>
                            <FaShoppingCart className="icon" />

                            {cart.length > 0 && (
                                <span className="cart-badge">{cart.length}</span>
                            )}

                        </div>
                        {user ? (
                            <span onClick={logout} className="icon">
                                Logout
                            </span>
                        ) : (
                            <FaUser onClick={() => navigate("/login")} className="icon" />

                        )
                        }

                    </div>
                </div>

            </Container>
        </div>
    );
}
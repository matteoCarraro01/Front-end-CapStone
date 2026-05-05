import { Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";



export default function MyNavbar({ query, setQuery, onSearch }) {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
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
                        <FaShoppingCart onClick={() => navigate("/cart")} className="icon" />
                        <FaUser className="icon" />
                    </div>
                </div>

            </Container>
        </div>
    );
}
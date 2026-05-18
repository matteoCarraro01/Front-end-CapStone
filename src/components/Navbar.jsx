import { Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/LogoMatty.png";



export default function MyNavbar({ query, setQuery, onSearch }) {
    const navigate = useNavigate();
    const { cart, justAdded } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    return (
  
  <div className="ig-navbar">
    <Container fluid className="ig-navbar-inner">

      
      <div className="ig-left">

        <div className="ig-logo-container">
          <img
            src={logo}
            alt="Logo Matty's Gaming"
            className="ig-logo-img"
          />
        </div>

        <div className="ig-menu">
          <span>PC</span>
          <span>PlayStation</span>
          <span>Xbox</span>
          <span>Nintendo Switch</span>
          {user?.role === "admin" && (
          <button className="manage-btn"
          onClick={() => navigate("/manage-games")}
          >
            Gestisci
          </button>
          )}
        </div>

      </div>

      
      <div className="ig-right">

        <div className="ig-search-container">

          <input
            type="text"
            placeholder="Cerca giochi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ig-search"
          />

          <button
            className="ig-search-btn"
            onClick={onSearch}
          >
            Cerca
          </button>

        </div>

        <div className="nav-icons">

          <div
            className={`cart-icon ${justAdded ? "cart-bounce" : ""}`}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart className="icon" />

            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.length}
              </span>
            )}
          </div>

          {user ? (
            <div className="user-profile">

        <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase()}
        </div>

        <span className="username-text">
            {user.username}
        </span>

        <span
            onClick={logout}
            className="logout-text"
        >
            Logout
        </span>

    </div>
          ) : (
            <FaUser
              onClick={() => navigate("/login")}
              className="icon"
            />
          )}

        </div>
      </div>

    </Container>
  </div>
);
}
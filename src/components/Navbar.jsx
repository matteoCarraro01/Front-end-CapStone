import { Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "../styles/navbar.css";



export default function MyNavbar({ query, setQuery, onSearch }) {
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
                        <FaShoppingCart className="icon" />
                        <FaUser className="icon" />
                    </div>
                </div>

            </Container>
        </div>
    );
}
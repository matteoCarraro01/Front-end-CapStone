import { useState, useEffect } from "react";
import { getGameDetails, getGames } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MyNavbar from "../components/Navbar";
import "../styles/cards.css";




export default function Home() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const data = await getGames();
            setGames(data);
        };

        fetchGames();
    }, []);




    const handleSearch = async () => {
        const data = await getGames();
        setGames(data);
    };

    return (
        <>
            <MyNavbar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
            />

            <Container fluid className="bg-dark text-white min-vh-100 p-4">
                <Row>
                    {games.map((game) => (
                        <Col key={game._id} xs={6} md={4} lg={3} xl={2} className="mb-4">
                            <div className="ig-card"
                                onClick={() => navigate(`/game/${game._id}`)}
                            >


                                <img
                                    src={game.image}
                                    alt={game.title}
                                    className="ig-card-img"
                                />


                                <div className="ig-card-info">
                                    <p className="ig-title">{game.title}</p>

                                    <div className="ig-bottom">
                                        <span className="ig-price">{game.price}€
                                        </span>
                                        <span className="ig-discount">-20%</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
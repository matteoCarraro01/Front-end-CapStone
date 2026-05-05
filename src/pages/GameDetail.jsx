import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameDetails } from "../services/api";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Stars from "../components/Stars";
import MyNavbar from "../components/Navbar";
import "../styles/detail.css";

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const { addToCart } = useContext(CartContext);
    const flyToCart = (e) => {
        const img = document.querySelector(".game-img");

        const clone = img.cloneNode(true);
        clone.style.position = "fixed";
        clone.style.top = img.getBoundingClientRect().top + "px";
        clone.style.left = img.getBoundingClientRect().left + "px";
        clone.style.width = "200px";
        clone.style.zIndex = "9999";
        clone.style.transition = "all 0.7s ease";

        document.body.appendChild(clone);

        setTimeout(() => {
            clone.style.top = "20px";
            clone.style.left = "90%";
            clone.style.width = "40px";
            clone.style.opacity = "0";
        }, 50);

        setTimeout(() => {
            clone.remove();
        }, 700);
    };

    useEffect(() => {
        const fetchGame = async () => {
            const data = await getGameDetails(id);
            setGame(data);
        };
        fetchGame();
    }, [id]);

    if (!game) return <p className="text-white">Loading...</p>;

    return (
        <>
            <MyNavbar />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >




                <Container className="detail-page">


                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Indietro
                    </button>

                    <Row className="mt-4 align-items-center">


                        <Col md={6}>
                            <motion.img
                                src={game.image}
                                alt={game.title}
                                className="game-img"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        </Col>


                        <Col md={6} className="detail-info">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1>{game.title}</h1>


                                <Stars rating={4} />

                                <div className="price-box">
                                    <span className="discount">-20%</span>
                                    <span className="price">{game.price}€</span>
                                </div>

                                <p className="meta">{game.genre}</p>

                                <button onClick={(e) => {
                                    flyToCart(e);
                                    addToCart(game);
                                }} className="buy-btn">
                                    <FaShoppingCart /> Aggiungi al carrello
                                </button>
                            </motion.div>
                        </Col>


                    </Row>


                    <div className="detail-body">
                        <h3>Descrizione</h3>
                        <p>{game.description}</p>
                    </div>

                </Container>
            </motion.div>
        </>
    );
}
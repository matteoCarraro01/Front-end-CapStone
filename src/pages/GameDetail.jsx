import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameDetails } from "../services/api";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShoppingCart, FaArrowLeft, FaStar, FaTrash, FaThumbsUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Stars from "../components/Stars";
import MyNavbar from "../components/Navbar";
import "../styles/detail.css";
import { AuthContext } from "../context/AuthContext";

export default function GameDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
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

    const handleReview = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Devi essere loggato per recensire");
            return;
        }
        const newReview = {
            text,
            username: user?.username || "Utente",
            rating,
        };
        try {
            const response = await fetch(
                `http://localhost:4001/games/${id}/reviews`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(newReview),

                }
            );

            const updatedGame = await response.json();


            setReviews(updatedGame.comments || []);

            setText("");
            setRating(5);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteReview = async (reviewId) => {

        try {
            const response = await fetch(
                `http://localhost:4001/games/${id}/reviews/${reviewId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                setReviews((prevReviews) =>
                    prevReviews.filter(
                        review => review._id !== reviewId
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const fetchGame = async () => {
            const data = await getGameDetails(id);


            setGame(data);
            setReviews(data.comments || []);
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


                        <Col xs={12} md={6}>
                            <motion.img
                                src={game.image}
                                alt={game.title}
                                className="game-img"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        </Col>


                        <Col xs={12} md={6} className="detail-info mt-4 mt-md-0">
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
                    <div className="reviews-section">

                        <h2>Recensioni</h2>

                        <form onSubmit={handleReview} className="review-form">

                            <textarea
                                placeholder="Scrivi una recensione..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <div className="rating-stars">

                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`star ${star <= rating ? "active" : ""}`}
                                        onClick={() => setRating(star)}
                                    />
                                ))}

                            </div>

                            <button type="submit">
                                Pubblica recensione
                            </button>

                        </form>

                        <div className="reviews-list">

                            {reviews.length === 0 ? (

                                <p className="text-white">
                                    Nessuna recensione ancora
                                </p>

                            ) : (

                                <AnimatePresence>

                                    {reviews.map((review) => (

                                        <motion.div
                                            key={review._id}
                                            className="review-card"

                                            initial={{
                                                opacity: 0,
                                                y: 20
                                            }}

                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}

                                            exit={{
                                                opacity: 0,
                                                x: 250,
                                                rotate: 15,
                                                scale: 0.5,
                                                filter:"blur(6px)"
                                            }}

                                            transition={{
                                                duration: 0.7,
                                                ease:"easeInOut"
                                            }}
                                        >

                                            <div className="review-top">

                                                <div className="review-header">

                                                    <div className="review-avatar">
                                                        {review.username.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div className="review-user-info">

                                                        <h4>{review.username}</h4>

                                                        <div className="review-stars">

                                                            {[...Array(Number(review.rating))].map((_, i) => (
                                                                <FaStar key={i} />
                                                            ))}

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="review-actions">

                                                    {user?.username === review.username && (

                                                        <button
                                                            className="delete-review-btn"
                                                            onClick={() =>
                                                                handleDeleteReview(review._id)
                                                            }
                                                        >
                                                            <FaTrash />
                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                            <p className="review-text">
                                                {review.text}
                                            </p>

                                            <div className="review-footer">

                                                <button className="like-btn">

                                                    <FaThumbsUp />

                                                    <span>
                                                        {review.likes || 0}
                                                    </span>

                                                </button>

                                            </div>

                                        </motion.div>

                                    ))}

                                </AnimatePresence>

                            )}

                        </div>



                    </div>

                </Container>
            </motion.div>
        </>
    );
}

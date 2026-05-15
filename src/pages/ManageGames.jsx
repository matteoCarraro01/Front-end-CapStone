import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGames, createGame, updateGame, deleteGame } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaGamepad, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import "../styles/manageGames.css"


export default function ManageGames() {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        image: "",
        description: "",
        genre: ""

    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadGames();
    }, []);

    const loadGames = async () => {

        const data = await getGames();

        setGames(data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingId) {
            await updateGame(
                editingId,
                formData
            );


        } else {
            await createGame(formData);

        }
        loadGames();

        setEditingId(null);

        setFormData({

            title: "",
            price: "",
            image: "",
            description: "",
            genre: ""


        });


    };


    return (

        <div className="manage-page">


            <button className="back-btn" onClick={() => navigate(-1)}>
                <FaArrowLeft /> Indietro
            </button>

            <h1 className="manage-title">
                <FaGamepad /> Gestione giochi
            </h1>

            <p className="manage-subtitle">
                Aggiungi o modifica il catalogo
            </p>


            <div className="manage-form-container">

                <button
                    type="button"
                    className="toggle-form-btn"
                    onClick={() => setShowForm(!showForm)}
                >{showForm ? "Chiudi editor" : "+ Nuovo gioco"}
                </button>
                <AnimatePresence mode="wait">

                    {showForm && (

                        <motion.div

                            initial={{
                                opacity: 0,
                                height: 0
                            }}

                            animate={{
                                opacity: 1,
                                height: "auto"
                            }}

                            exit={{
                                opacity: 0,
                                height: 0
                            }}

                            transition={{
                                duration: .4
                            }}

                            style={{
                                overflow: "hidden"
                            }}
                        >

                            <form
                                onSubmit={handleSubmit}
                                className="manage-form"
                            >

                                <input
                                    placeholder="Titolo"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value
                                        })
                                    }
                                />

                                <input
                                    placeholder="Prezzo"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            price: e.target.value
                                        })
                                    }
                                />

                                <input
                                    placeholder="URL Immagine"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            image: e.target.value
                                        })
                                    }
                                />

                                <input
                                    placeholder="Genere"
                                    value={formData.genre}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            genre: e.target.value
                                        })
                                    }
                                />

                                <textarea
                                    placeholder="Descrizione"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value
                                        })
                                    }
                                />

                                <button
                                    className="manage-submit"
                                    type="submit"
                                >
                                    {editingId
                                        ? "Salva modifiche"
                                        : "Aggiungi gioco"}
                                </button>

                            </form>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

            <div className="manage-grid">

                <AnimatePresence>

                    {games.map((game) => (

                        <motion.div
                            key={game._id}
                            className="manage-card"

                            initial={{
                                opacity: 0,
                                y: 40,
                                scale: 0.8
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}

                            exit={{
                                opacity: 0,
                                x: 250,
                                rotate: 10,
                                scale: 0.5
                            }}

                            transition={{
                                duration: 0.5
                            }}
                        >

                            <img
                                src={game.image}
                                alt={game.title}
                                className="manage-img"
                            />

                            <div className="manage-info">

                                <h3>
                                    {game.title}
                                </h3>

                                <p>
                                    {game.price}€
                                </p>

                                <div className="manage-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() => {

                                            setEditingId(game._id);
                                            setFormData(game);
                                            setShowForm(true);

                                            window.scrollTo({
                                                top: 0,
                                                behavior:"smooth"

                                            });

                                        }}
                                    >

                                        ✏️

                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={async () => {

                                            await deleteGame(game._id);

                                            setGames(prev =>
                                                prev.filter(
                                                    g => g._id !== game._id
                                                )
                                            );

                                        }}
                                    >

                                        🗑

                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </AnimatePresence>

            </div>


        </div>

    )


}
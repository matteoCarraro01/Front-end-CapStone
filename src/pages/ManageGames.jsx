import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGames, createGame, updateGame, deleteGame } from "../services/api";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import "../styles/manageGames.css"
import { FaPencil } from "react-icons/fa6";

export default function ManageGames() {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();

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
                🎮 Gestione giochi
            </h1>

            <p className="manage-subtitle">
                Aggiungi o modifica il catalogo
            </p>


            <div className="manage-form-container">

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

            </div>


            <div className="manage-grid">

                {games.map((game) => (

                    <div
                        key={game._id}
                        className="manage-card"
                    >

                        <img
                            src={game.image ||
                                "https://via.placeholder.com/300x400?text=No+Image"
                            }
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

                                    }}
                                >

                                    <FaPencil/>

                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={async () => {

                                        await deleteGame(game._id);

                                        loadGames();

                                    }}
                                >

                                    <FaTrash/>

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )


}
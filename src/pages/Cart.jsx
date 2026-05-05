import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

export default function Cart() {
    const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
    const navigate = useNavigate();

    return (

        <div className="cart-container">

            <button className="back-home" onClick={() => navigate("/")}>
                Torna allo store
            </button>

            <h2 className="cart-title"> Il tuo carrello</h2>

            {cart.length === 0 ? (
                <p className="empty">Il carrello è vuoto</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div className="cart-item" key={item._id}>

                            <img src={item.image} className="cart-img" />

                            <div className="cart-info">
                                <h4>{item.title}</h4>
                                <p className="price">{item.price}€</p>
                            </div>

                            <div className="qty">
                                <button onClick={() => decreaseQty(item._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQty(item._id)}>+</button>
                            </div>

                            <button
                                className="remove-btn"
                                onClick={() => removeFromCart(item._id)}
                            >
                                ✕
                            </button>

                        </div>
                    ))}

                    <div className="cart-summary">
                        <h3>Totale</h3>
                        <span>{total.toFixed(2)}€</span>
                    </div>

                    <button className="checkout-btn">
                        Procedi al pagamento
                    </button>
                </>
            )}
        </div>

    );
}
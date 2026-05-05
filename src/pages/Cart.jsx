import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h2>Carrello</h2>

            {cart.length === 0 ? (
                <p>Il carrello è vuoto</p>
            ) : (
                cart.map((item) => (
                    <div key={item._id} style={{ marginBottom: "10px" }}>
                        <span>{item.title} - {item.price}€</span>
                        <button onClick={() => removeFromCart(item._id)}>
                            Fa
                        </button>
                    </div>
                ))
            )}
        </div>
    )

}
import { createContext, useState, useEffect } from "react";



export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
        useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
        }, [cart]);
    });
    const [justAdded, setJustAdded] = useState(false);

    const addToCart = (game) => {
        setCart((prev) => {
            const exists = prev.find((item) => item._id === game._id);

            if (exists) {
                return prev.map((item) =>
                    item._id === game._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...game, quantity: 1 }];
        });

        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 400);
    };

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
                .filter((item) => item.quantity > 0)
        );
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, justAdded, increaseQty, decreaseQty }}>
            {children}
        </CartContext.Provider>
    );
}
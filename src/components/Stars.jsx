import { FaStar } from "react-icons/fa";


export default function Stars({ rating }) {
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                    key={n}
                    className={n <= rating ? "star active" : "star"}
                />
            ))}

        </div>
    );
}
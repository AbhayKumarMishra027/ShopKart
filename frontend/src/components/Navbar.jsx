import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await api.post("/customers/logout", {}, {
            withCredentials: true
        });

        navigate("/login");
    };
    return (
        <nav className="navbar">
            <h2 className="navbar-logo">ShopKart</h2>

            <div className="navbar-actions">
                <button onClick={() => navigate("/products")}>
                    Products
                </button>

                <button onClick={() => navigate("/wishlist")}>
                    ❤️ Wishlist
                </button>

                <button onClick={() => navigate("/cart")}>
                    🛒 Cart
                </button>

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
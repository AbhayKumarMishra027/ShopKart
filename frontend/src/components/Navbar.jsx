import api from "../services/api";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await api.post("/customers/logout", {}, {
            withCredentials: true
        });

        navigate("/login");
    };
    return (
        <nav>
            <h2>ShopKart</h2>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
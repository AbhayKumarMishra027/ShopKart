import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import './Home.css'

function Home() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/customers/me", { withCredentials: true })
                setUser(response.data.customer)
                setLoading(false)
            } catch (err) {
                navigate("/login")
            }

        }
        fetchUser();
    }, [navigate])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="home-page">
            <Navbar />
            <div className="home-content">
                <h1>Welcome, {user.fullName}</h1>

                <p>
                    Welcome to ShopKart. Discover products, explore categories,
                    and find what you're looking for.
                </p>

                <button onClick={() => navigate("/products")}>
                    Explore Products
                </button>
            </div>
        </div>
    )
}
export default Home;
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate();
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

    if(loading){
        return <p>Loading...</p>
    }

    return (
        <div>
            <Navbar />
            <h1>Home</h1>
            {user && (
                <div>
                    <h2>Welcome, {user.fullName}</h2>
                    <p>Email:{user.email}</p>
                    <p>Phone:{user.phone}</p>
                </div>
            )}
        </div>
    )
}
export default Home;
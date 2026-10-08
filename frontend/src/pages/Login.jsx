import { useState } from "react";
import api from "../services/api";
import "./Login.css"
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Email and Password are required")
            return;
        } try {
            const response = await api.post("/customers/login", { email, password }, { withCredentials: true })
            navigate("/home")
        } catch (err) {
            if (err.response) {
                setError("Invalid Credentials")
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <div className="login-container">

            <svg className="shopkart-watermark" viewBox="0 0 900 300">
                <defs>
                    <path
                        id="shopkart-arc"
                        d="M 100 220 Q 450 20 800 220"
                    />
                </defs>

                <text>
                    <textPath href="#shopkart-arc" startOffset="50%">
                        ShopKart
                    </textPath>
                </text>
            </svg>


            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error-message">{error}</p>}

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    )
}
export default Login;
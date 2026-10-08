import { useState } from 'react';
import "./Register.css"
import api from "../services/api.js"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!fullName || !email || !password || !phone) {
            setError("All fields are required")
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        try {
            await api.post("/customers/register", {
                fullName,
                email,
                password,
                phone
            })
            setSuccess("User registered successfully. Go to login page.")

            setFullName("");
            setEmail("");
            setPassword("");
            setPhone("");

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message)
            } else {
                setError("Something went wrong. Please try again")
            }
        }
    }

    return (
        <div className='register-container'>

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


            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>{success}</p>}

                <label>Full Name</label>
                <input type="text"
                    placeholder="Enter Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <label>Email</label>
                <input type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Phone</label>
                <input type="tel"
                    placeholder="Enter your Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type='submit'>Register</button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                {/* <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>Login</span>
                </p> */}

            </form>

        </div>
    )
}
export default Register
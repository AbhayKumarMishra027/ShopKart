import {useState} from "react";
import api from "../services/api";
import "./Login.css"
import { useNavigate } from "react-router-dom";

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        if(!email || !password){
            setError("Email and Password are required")
            return;
        } try{
            const response=await api.post("/customers/login",{email,password},{withCredentials:true})
            navigate("/home")
        }catch(err){
            if(err.response){
                setError("Invalid Credentials")
            }else{
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return(
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <label>Email</label>
                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;
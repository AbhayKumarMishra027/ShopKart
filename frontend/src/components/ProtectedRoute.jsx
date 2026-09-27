import { Navigate, useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import api from "../services/api.js";

function ProtectedRoute({children}){
    const [loading,setLoading]=useState(true)
    const [authenticated,setAuthenticated]=useState(false)

    const navigate=useNavigate();

    useEffect(()=>{
        const checkAuth=async()=>{
            try{
                const response=await api.get("/customers/me",{withCredentials:true})
                setAuthenticated(true)
            }catch(err){
                navigate("/login")
            }finally{
                setLoading(false)
            }
        }

        checkAuth();
    },[])

    if(loading){
        return <p>Checking authentication...</p>
    }

    if(!authenticated){
        return <Navigate to="/login" replace />
    }
    return children;
}
export default ProtectedRoute
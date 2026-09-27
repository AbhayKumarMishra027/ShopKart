import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

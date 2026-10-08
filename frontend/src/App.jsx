import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Wishlist from './pages/Wishlist';
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
        <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
       <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

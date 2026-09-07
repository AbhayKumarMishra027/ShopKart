import{BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
  
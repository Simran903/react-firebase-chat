import Login from "./components/login/Login"
import Register from "./components/login/Register"
import Header from "./components/navbar/Navbar"
import ChatApp from "./pages/ChatApp"
import Home from "./pages/home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatApp" element={<ChatApp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
import { useEffect } from "react"
import Login from "./components/login/Login"
import Register from "./components/login/Register"
import Header from "./components/navbar/Navbar"
import Notification from "./components/notification/Notification"
import ChatApp from "./pages/ChatApp"
import Home from "./pages/home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebase"
import useUserStore from "./lib/userStore"

const App = () => {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore()

  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    })

    return () => {
      onSub()
    }
  
  }, [fetchUserInfo])

  if (isLoading) return <div className="loading">Loading...</div>
  
  console.log(currentUser)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/chatApp"
          element={<ChatApp />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
      <Notification />
    </BrowserRouter>
  )
}

export default App

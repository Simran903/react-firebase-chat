import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { motion } from "framer-motion";

const Header = () => {
    const [show, setShow] = useState("top") // for scrolling effect
    const [lastScrollY, setLastScrollY] = useState(0) // for scrolling effect
    const navigate = useNavigate() // for navigation
    const location = useLocation() // for location

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar)
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
                setShow("hide")
            } else {
                setShow("top")
            }
            setLastScrollY(window.scrollY)
        }
    }

    const navigationHandler = (type) => {
        if (type === "login") {
          navigate("login")
        }
        else {
          navigate("register")
        }
      }

    return (
        <header className={`header ${show}`}>
            <div className="logo" onClick={() => navigate("/")}>
                <h2>ChatApp</h2>
            </div>
            <ul className="menuItems">
                <li className="menuItem" onClick={() => navigationHandler("login")}>Log in</li>
                <li className="menuItem" onClick={() => navigationHandler("register")}>Sign up</li>

                <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                </motion.div>
            </ul>
        </header>
    )
}

export default Header

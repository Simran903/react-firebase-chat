import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import hero from "./../../../public/hero.png"
import './login.css'

const Login = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/register");
    }

    return (
        <div class="loginContainer">
            <div className="">
                <img src={hero} alt="" width='695px' height='695px' />
            </div>
            <div className="inner-container" >
                <motion.div
                    className="box"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001
                        }
                    }} >
                    <div className="login-box">
                        <span className='title'>ChitChat</span>
                        <br />
                        <span className='subTitle'>Login</span>
                        <form className='loginForm'>
                            <input type="text" placeholder='Username' />
                            <input type="password" placeholder='Password' />

                            <motion.div
                                className="box"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="buttonContainer">
                                    <button>Login in</button>
                                </div>
                            </motion.div>

                        </form>
                        <p className='mt-6 text-sm bg-gradient-to-r from-fuchsia-600 to-pink-600 text-transparent inline-block bg-clip-text'>Don't have an account? <a onClick={handleSignUpClick}>Sign up</a></p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login

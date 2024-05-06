import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const Login = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignUpClick = () => {
        navigate("/register");
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
            navigate("/chatapp");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="loginContainer">
            <div className="">
                <img src="./hero.png" alt="" width='695px' height='695px' />
            </div>
            <div className="inner-container login" >
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
                        <form className='loginForm' onSubmit={handleLogin}>
                            <input type="email" placeholder='Email' name='email' />
                            <input type="password" placeholder='Password' name='password' />

                            <motion.div
                                className="box"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <div className="buttonContainer">
                                    <button>Login</button>
                                </div>
                            </motion.div>

                        </form>
                        <p className='mt-6 text-sm bg-gradient-to-r from-fuchsia-600 to-pink-600 text-transparent inline-block bg-clip-text'>Don't have an account? <a onClick={handleSignUpClick}>Sign up</a></p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";


const Login = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignUpClick = () => {
        navigate("/register");
    };

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
    };

    return (
        <div className="flex items-center justify-center h-screen font-mono">
            <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 bg-surface-a20/20 bg-opacity-90 rounded-lg shadow-xl flex flex-col items-center">
                <span className="text-4xl font-extrabold bg-gradient-to-b from-primary-a20 to-primary-a80 bg-clip-text text-transparent mt-5">
                    Sign in
                </span>
                {/* Image Section */}
                <div className="w-full flex justify-center">
                    <img
                        src="./hero.png"
                        alt="Hero Image"
                        className="w-96 h-96 object-cover rounded-lg"
                    />
                </div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                        scale: {
                            type: "spring",
                            damping: 5,
                            stiffness: 100,
                            restDelta: 0.001,
                        },
                    }}
                >

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 text-sm rounded-lg bg-transparent text-white placeholder-white border border-primary-a20 focus:outline-none"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 text-sm rounded-lg bg-transparent text-white placeholder-white border border-primary-a20 focus:outline-none"
                        />
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <div className="flex justify-center">
                                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6  text-white inline-block">
                                    <span className="absolute inset-0 overflow-hidden rounded-full">
                                        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    </span>
                                    <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 px-8 ring-1 ring-white/10 ">
                                        <span>Sign in</span>
                                        <svg
                                            fill="none"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.75 8.75L14.25 12L10.75 15.25"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    </div>
                                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-primary-a0 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
                                </button>
                            </div>
                        </motion.div>
                    </form>
                    <p className="text-center text-sm text-mixed-a60 mt-6">
                        Don’t have an account?{" "}
                        <a
                            onClick={handleSignUpClick}
                            className="cursor-pointer text-primary-a40 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

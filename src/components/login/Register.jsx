import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";


const Register = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: []
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created successfully");
      navigate('/login');

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen font-mono">
      <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 bg-surface-a20/20 bg-opacity-90 rounded-lg shadow-xl flex flex-col items-center">
      <span className="text-4xl font-extrabold bg-gradient-to-b from-primary-a20 to-primary-a80 bg-clip-text text-transparent mt-5">
                    Sign up
                </span>

        {/* Image Section */}
        <div className="w-full flex justify-center mt-6">
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
          <form className="space-y-4 px-10" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full p-3 text-sm rounded-lg bg-transparent text-white placeholder-white border border-primary-a20 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full p-3 text-sm rounded-lg bg-transparent text-white placeholder-white border border-primary-a20 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full p-3 text-sm rounded-lg bg-transparent text-white placeholder-white border border-primary-a20 focus:outline-none"
            />
            <div className="flex flex-col justify-center items-center mt-6 space-y-3">
              <input
                className="hidden"
                type="file"
                id="avatar"
                onChange={handleAvatar}
              />
              <label htmlFor="avatar" className="flex space-x-4 cursor-pointer text-center group relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex flex-col justify-center items-center overflow-hidden border-2 border-primary-a40 group-hover:border-primary-a80 transition-all">
                  <img
                    src={avatar.url || "./avatar.png"}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white mt-2 group-hover:text-primary-a40 text-sm">
                  Upload your photo
                </p>
              </label>
            </div>


            <motion.div
              className="box"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="buttonContainer flex justify-center">
                <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-sm font-semibold leading-6  text-white inline-block">
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1.5 px-8 ring-1 ring-white/10 ">
                    <span>Sign up</span>
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
            Already have an account?{" "}
            <a
              onClick={handleLoginClick}
              className="cursor-pointer text-primary-a40 hover:underline"
            >
              Log in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
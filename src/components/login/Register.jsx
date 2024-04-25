import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import hero from "./../../../public/hero.png";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";


const Register = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const {username, email, password} = Object.fromEntries(formData)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const imgUrl = await upload(avatar.file)

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: []
      })
  
      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
  
      })
  
      toast.success("Accound created successfully")
      navigate('/login')

      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }

  }

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLoginClick = () => {
    navigate("/login");
  }

  return (
    <div className="loginContainer">
      <div className="">
        <img src={hero} alt="" width="695px" height="695px" />
      </div>
      <div className="inner-container">
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
              restDelta: 0.001,
            },
          }}
        >
          <div className="login-box">
            <span className="title">ChitChat</span>
            <br />
            <span className="subTitle">Register</span>
            <form className="loginForm" onSubmit={handleRegister}>
              <input type="text" placeholder="Username" name="username" />
              <input type="email" placeholder='Email' name="email" />
              <input type="password" placeholder="Password" name="password" />
              <div className="avatarContainer">
                <input className="avatar" type="file" id="avatar" onChange={handleAvatar} />
                <label htmlFor="avatar">
                  <img src={avatar.url || "./avatar.png"} alt="" />Upload your photo</label>
              </div>

              <motion.div
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="buttonContainer">
                  <button>SignUp</button>
                </div>
              </motion.div>
            </form>
            <p className="mt-6 text-sm bg-gradient-to-r from-fuchsia-600 to-pink-600 text-transparent inline-block bg-clip-text">
              Already have an account? <a onClick={handleLoginClick}>Log in</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

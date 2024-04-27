import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { AiOutlineBgColors } from 'react-icons/ai';
import useUserStore from '../../lib/userStore'; // Import the useUserStore

const Chat = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const { color, setColor } = useUserStore(); // Destructure only color and setColor from useUserStore

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [])

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span style={{ color: color }}>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
      <div className="message">
          <div className="text">
            <p style={{ backgroundColor: color }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, minima.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p style={{ backgroundColor: color }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, minima.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="text">
            <p style={{ backgroundColor: color }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, minima.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p style={{ backgroundColor: color }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, minima.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="text">
            <p style={{ backgroundColor: color }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, minima.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message...' value={text} onChange={(e) => setText(e.target.value)} />
        <input type="color" value={color} onChange={handleColorChange} name='color' id='color' className='colorPicker' />
        <label htmlFor="color"><AiOutlineBgColors className='colorIcon' /></label>
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton'>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat;

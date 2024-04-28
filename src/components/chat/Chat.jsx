import React, { useEffect, useRef, useState } from 'react'
import './chat.css'
import EmojiPicker from 'emoji-picker-react'
import { AiOutlineBgColors } from 'react-icons/ai';
import useUserStore from '../../lib/userStore';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useChatStore from '../../lib/chatStore';


const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const { color, setColor } = useUserStore();
  const { chatId, user } = useChatStore()
  const { currentUser } = useUserStore()

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    } )
  
    return () => {
      unSub()
    }
  }, [chatId])

  console.log(chat)
  

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }

  const handleSend = async () => {
    if (text === "") return;

    try {

      await updateDoc(doc(db, "chats", chatId), {
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date()
        })
      })
      const userIDs = [currentUser.id, user.id]

      userIDs.forEach(async (id) => {

        const userChatsRef = doc(db, "userChats", id)
        const userChatsSnapshot = await getDoc(userChatsRef)
      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data()
        
        const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId)
        
        userChatsData.chats[chatIndex].lastMessage = text
        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
        userChatsData.chats[chatIndex].updatedAt = Date.now()
        
        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        })
      }
    })
      
    } catch (error) {
      console.log(error)
    }

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
        { chat?.messages?.map((message) => (
        <div className="message own" key={message?.createdAt}>
          <div className="text">
            {message?.img && <img src={message?.img} alt="" />}
            <p style={{ backgroundColor: color }}>{message.text}</p>
            {/* <span>{message.createdAt}</span> */}
          </div>
        </div>
        ))
        }
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
        <button className='sendButton' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat;

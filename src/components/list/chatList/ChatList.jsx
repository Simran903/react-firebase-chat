import React, { useEffect, useState } from 'react'
import './chatList.css'
import AddUser from './adduser/AddUser'
import useUserStore from '../../../lib/userStore'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import useChatStore from '../../../lib/chatStore'

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      const data = res.data();
      if (data && Array.isArray(data.chats)) {
        const items = data.chats.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId)
          const userDocSnap = await getDoc(userDocRef)
          const user = userDocSnap.data()
          return { ...item, user }
        })
  
        const chatData = await Promise.all(items);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      } else {
        setChats([]);
      }
    });
  
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user)
  }

  const filteredChats = chats.filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()))

  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search...' onChange={(e) => setInput(e.target.value)} />
        </div>
        <img onClick={() => setAddMode((prev) => !prev)} src={addMode ? "./minus.png" : "./plus.png"} alt="" className='add' />
      </div>
      {filteredChats.map((chat) => (
        <div key={chat.chatId} className="item" onClick={() => handleSelect(chat)}>
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  )
}

export default ChatList
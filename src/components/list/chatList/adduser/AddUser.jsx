import React, { useState } from 'react';
import './addUser.css';
import { db } from '../../../../lib/firebase';
import { collection, doc, getDocs, setDoc, query, where, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore';
import useUserStore from '../../../../lib/userStore';

const AddUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUserStore();

  const handleAdd = async () => {
    if (!user) return;

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });
      
      // Update user's chat list
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastmessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      });

      console.log(newChatRef.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      setLoading(true);
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser({ id: doc.id, ...doc.data() }); // Store user id along with data
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder='Username...' />
        <button disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={() => handleAdd()} disabled={loading}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;

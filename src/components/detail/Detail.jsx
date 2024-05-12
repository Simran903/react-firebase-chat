import React, { useState } from 'react';
import './detail.css';
import { auth, db } from '../../lib/firebase';
import useUserStore from '../../lib/userStore';
import useChatStore from '../../lib/chatStore';
import { toast } from 'react-toastify';
import { VscArrowCircleLeft } from "react-icons/vsc";
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Chat from '../chat/Chat';

const Detail = () => {
  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const [showChat, setShowChat] = useState(false);

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigate('/'))
      .catch(error => console.error('Error logging out:', error));
  };

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
      toast.success(isReceiverBlocked ? "User unblocked successfully" : "User blocked successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update block status");
    }
  };

  const handleBack = () => {
    setShowChat(true);
  };

  if (showChat) {
    return <Chat />;
  }

  return (
    <div className='detail'>
      <div className="user">
        <VscArrowCircleLeft className='backArrow' onClick={handleBack} />
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.unsplash.com/photo-1713526721814-412688ede906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <span>photo_2024.png</span>
              </div>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.unsplash.com/photo-1713526721814-412688ede906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <span>photo_2024.png</span>
              </div>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked"
            : isReceiverBlocked
              ? "User Blocked"
              : "Block User"}
        </button>
        <button className='logOut' onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
};

export default Detail;

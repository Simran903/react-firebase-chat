import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { AiOutlineBgColors } from "react-icons/ai";
import { VscArrowCircleLeft } from "react-icons/vsc";
import useUserStore from "../../lib/userStore";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import useChatStore from "../../lib/chatStore";
import upload from "../../lib/upload";
import Detail from "../detail/Detail";
// import List from "../list/List";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  const [showChatList, setShowChatList] = useState(false); // State to control showing List component
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });

    const savedColor = localStorage.getItem("chatColor");
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const { color, setColor } = useUserStore();

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    localStorage.setItem("chatColor", e.target.value); // Saving color to local storage
  };

  const handleSend = async () => {
    if (text === "") return;
    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });
      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    setImg({
      file: null,
      url: "",
    });

    setText("");
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
  
    // Converting Firestore timestamp to JavaScript Date object
    const date = timestamp.toDate();
    const now = new Date();
  
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  
    if (diffDays > 0) {
      return `${diffDays} days ago`;
    } else if (diffHours > 1) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffMins} mins ago`;
    }
  };

  return (
    <>
      {showDetails ? (
        <Detail />
      ) : (
        <div className="chat">
          <div className="top">
            <div className="user">
              <VscArrowCircleLeft className="backArrow" />
              <img src={user?.avatar || "./avatar.png"} alt="" />
              <div className="texts">
                <span style={{ color: color }}>{user?.username}</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div className="icons">
              <img src="./phone.png" alt="" />
              <img src="./video.png" alt="" />
              <img src="./info.png" alt="" onClick={() => setShowDetails(true)} />
            </div>
          </div>

          <div className="center">
            {chat?.messages?.map((message) => (
              ((!isCurrentUserBlocked && !isReceiverBlocked) || message.senderId === currentUser.id) && (
                <div
                  className={
                    message.senderId === currentUser?.id ? "message own" : "message"
                  }
                  key={message?.createdAt}
                >
                  <div className="text">
                    {message?.img && <img src={message?.img} alt="" />}
                    <p style={{ backgroundColor: color }}>{message.text}</p>
                    <span>{formatTime(message?.createdAt)}</span>
                  </div>
                </div>
              )
            ))}
            {img.url && (
              <div className="message own">
                <div className="text">
                  <img src={img.url} alt="" />
                </div>
              </div>
            )}

            <div ref={endRef}></div>
          </div>

          <div className="bottom">
            <div className="icons">
              <label htmlFor="file">
                <img src="./img.png" alt="" />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImage}
              />
              <img src="./camera.png" alt="" />
              <img src="./mic.png" alt="" />
            </div>
            <input
              type="text"
              placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You cannot send a message" : "Type a message..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              name="color"
              id="color"
              className="colorPicker"
            />
            <label htmlFor="color">
              <AiOutlineBgColors className="colorIcon" />
            </label>
            <div className="emoji">
              <img
                src="./emoji.png"
                alt=""
                onClick={() => setOpen((prev) => !prev)}
              />
              <div className="picker">
                <EmojiPicker open={open} onEmojiClick={handleEmoji} />
              </div>
            </div>
            <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

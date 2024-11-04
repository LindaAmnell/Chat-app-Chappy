import "../css/roomDm.css";
import "../css/dm.css";
import { useNavigate, useParams } from "react-router-dom";
import { MessageRoom } from "../models/MessageRom";
import { useEffect, useRef, useState } from "react";
import { getMessageRooms } from "../data/APIFunctions/getRoomMessage.ts";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useStore } from "../data/storeHooks.ts";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { Header } from "./Header.tsx";

const ChatRooms = () => {
  const navigate = useNavigate();
  const [sortedMessages, setSortedMessages] = useState<MessageRoom[] | null>(
    null
  );
  const { username, setUsername } = useStore();
  const { room } = useParams<{ room: string }>();
  const [messageRoom, setMessageRoom] = useState("");
  const messageDivRef = useRef<HTMLDivElement>(null);

  const handleGetMessageRoom = async () => {
    if (username !== "Guest") {
      const activeUserName = await getActiveUser();
      if (activeUserName) {
        setUsername(activeUserName);
      }
    } else {
      setUsername("Guest");
    }
    const messageRooms = await getMessageRooms();
    if (messageRooms) {
      const matchRoomMessage = messageRooms
        .filter((roomDm) => roomDm.roomName === room)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      setSortedMessages(matchRoomMessage);
    }
  };
  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    handleGetMessageRoom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const postRoomDm = async () => {
    const message = {
      senderName: username,
      textMessage: messageRoom,
      roomName: room,
      date: new Date(),
    };
    const data = message;
    const response: Response = await fetch("/api/room-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 201) {
      console.log("try again 3");
      return;
    }
    setMessageRoom("");
  };
  const handlePostRoom = async () => {
    await postRoomDm();
    await handleGetMessageRoom();
  };
  const handleBack = () => {
    if (username! === "Guest") {
      navigate("/guestchatPage");
    } else {
      navigate("/chatPage");
    }
  };

  return (
    <section className="room-dm">
      <Header />
      <FiArrowLeftCircle onClick={handleBack} className="get-back-arow" />
      <h2 className="chat-room-name">{room}</h2>
      <div className="room-message" ref={messageDivRef}>
        {sortedMessages && sortedMessages.length > 0 ? (
          sortedMessages.map((roomDm) => (
            <div
              className={`room-div-dm ${
                roomDm.senderName === username ? "active-user" : "other-user"
              }`}
              key={roomDm._id}>
              <p className="sender-name">{roomDm.senderName}</p>
              <p
                className={`text-message ${
                  roomDm.senderName === username ? "active-user-message" : ""
                }`}>
                {roomDm.textMessage}
              </p>
              <p className="date">{new Date(roomDm.date).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>Inga meddelanden</p>
        )}
      </div>
      <div className="message-input">
        <textarea
          value={messageRoom}
          onChange={(e) => setMessageRoom(e.target.value)}
          className="input-dm"
          placeholder="Skriv ett meddelande..."
        />
        <button className="send-btn" onClick={handlePostRoom}>
          Send
        </button>
      </div>
    </section>
  );
};

export { ChatRooms };

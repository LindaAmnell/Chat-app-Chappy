import "../css/roomDm.css";
import "../css/dm.css";
import { NavLink, useParams } from "react-router-dom";
import { MessageRoom } from "../models/MessageRom";
import { useEffect, useRef, useState } from "react";
import { getMessageRooms } from "../data/functions/getRoomMessage";
import backArrow from "../images/back.png";
import { useStore } from "../data/storeHooks.ts";
import { useFetchDms } from "../data/functions/dataFetching.ts";
const ChatRooms = () => {
  const [sortedMessages, setSortedMessages] = useState<MessageRoom[] | null>(
    null
  );
  const { username } = useStore();
  const fetchDms = useFetchDms();
  const { room } = useParams<{ room: string }>();
  const [messageRoom, setMessageRoom] = useState("");
  const messageDivRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  const handleGetMessageRoom = async () => {
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
  useEffect(() => {
    handleGetMessageRoom();
    fetchDms();
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

  return (
    <section className="room-dm">
      <NavLink to="/chatPage">
        <img className="back-arrow--roomdm" src={backArrow} alt="Back" />
      </NavLink>
      {username && <p className="signd-in-user">{username}</p>}
      <h2 className="chat-room-name">{room}</h2>

      <div className="room-message" ref={messageDivRef}>
        {sortedMessages && sortedMessages.length > 0 ? (
          sortedMessages.map((roomDm) => (
            <div className="room-div-dm" key={roomDm._id}>
              <p className="sender-name">{roomDm.senderName}</p>
              <p className="text-message">{roomDm.textMessage}</p>
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

import "../css/roomDm.css";
import { NavLink, useParams } from "react-router-dom";
import { MessageRoom } from "../models/MessageRom";
import { useEffect, useState } from "react";
import { getMessageRooms } from "../data/functions/getRoomMessage";
import backArrow from "../images/back.png";
import { useStore } from "../data/storeHooks.ts";

const ChatRooms = () => {
  const [sortedMessages, setSortedMessages] = useState<MessageRoom[] | null>(
    null
  );
  const { username, roomImage } = useStore();
  const { room } = useParams<{ room: string }>();

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
  }, [handleGetMessageRoom]);
  return (
    <section className="room-dm">
      <p>{username}</p>
      <div>
        <img className="room-image-dm" src={roomImage} alt="" />
        <h2 className="chat-room-name">{room}</h2>
        <NavLink to="/chatPage">
          <img className="back-arrow-dm" src={backArrow} alt="Back" />
        </NavLink>
      </div>
      <div>
        <div className="room-message">
          {sortedMessages?.map((roomDm) => (
            <div className="room-div-dm" key={roomDm._id}>
              <p className="sender-name">{roomDm.senderName}</p>
              <p className="text-message">{roomDm.textMessage}</p>
              <p className="date">{new Date(roomDm.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ChatRooms };

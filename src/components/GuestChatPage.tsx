import "../css/chatApp.css";
import { useEffect, useCallback } from "react";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { useNavigate } from "react-router-dom";
import { useStore } from "../data/storeHooks.ts";
import { getRooms } from "../data/functions/getRooms.ts";

const GuestChatPage = () => {
  const { setRoomList, roomList, setRoomImage, setUsername, username } =
    useStore();
  const navigate = useNavigate();

  const handelGet = useCallback(async () => {
    setUsername("Guest");
    const result = await getRooms();
    if (result && result.length > 0) {
      setRoomList(result);
    }
  }, []);
  useEffect(() => {
    handelGet();
  }, []);

  const handleClickRoom = (room: { name: string; image: string }) => {
    setRoomImage(room.image);
    navigate(`/chat-room/${room.name}`, {});
  };

  return (
    <section className="chat-page">
      <div className="profile">
        <p className="sign-in-name">{username}</p>
        <p className="icon">⚙️</p>
      </div>
      <div>
        <img className="chappy-chat-page" src={chappyDragon} alt="" />
      </div>
      <div className="side-bar">
        <div className="div-room">
          <h2 className="chat-page-h2">Rooms:</h2>
          {roomList.map((room) => (
            <div className="rooms" key={room._id}>
              {" "}
              <img className="room-image" src={room.image} alt="" />
              <p onClick={() => handleClickRoom(room)} className="room-name">
                {room.name}
              </p>
            </div>
          ))}
        </div>
        <div className="div-dm">
          <div className="sign-user-div">
            <button className="sign-out-btn">Sign Out</button>
          </div>
        </div>
      </div>
    </section>
  );
};
export { GuestChatPage };

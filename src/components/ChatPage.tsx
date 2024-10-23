import { useEffect, useCallback } from "react";
import "../css/chatApp.css";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { getRooms } from "../data/functions/getRooms.ts";
import { useChappystore } from "../data/store.ts";
import { useNavigate } from "react-router-dom";
import { Dms } from "./Dms.tsx";
const LS_KEY = "JWT-DEMO--TOKEN";

const ChatPage = () => {
  const roomList = useChappystore((state) => state.roomList);
  const setRoomList = useChappystore((state) => state.setRoomList);
  const username = useChappystore((state) => state.username);
  const setUsername = useChappystore((state) => state.setUsername);

  const navigate = useNavigate();

  const handelGet = useCallback(async () => {
    const result = await getRooms();
    if (result && result.length > 0) {
      setRoomList(result);
      setUsername(username);
    }
  }, [setRoomList]);
  useEffect(() => {
    handelGet();
  }, [handelGet]);

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    navigate("/");
  };

  return (
    <section className="chat-page">
      <div>
        <img className="chappy-chat-page" src={chappyDragon} alt="" />
      </div>
      <div className="side-bar">
        <div className="div-room">
          <h2>Rooms:</h2>
          {roomList.map((room) => (
            <div className="rooms" key={room._id}>
              {" "}
              <img className="room-image" src={room.image} alt="" />
              <p className="room-name">{room.name}</p>
            </div>
          ))}
        </div>
        <div className="div-dm">
          <Dms />
          <div className="sign-user-div">
            <button onClick={handleLogout} className="sign-out-btn">
              Sign Out
            </button>
            {/* <img className="sign-in-pic" src={userImage} alt="" /> */}
            <p className="sign-in-name"> {username}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ChatPage };

import { useEffect, useCallback } from "react";
import "../css/chatApp.css";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { getRooms } from "../data/getRooms.ts";
import { useChappystore } from "../data/store.ts";
import { useNavigate } from "react-router-dom";
const LS_KEY = "JWT-DEMO--TOKEN";

const ChatPage = () => {
  const roomList = useChappystore((state) => state.roomList);
  const setRoomList = useChappystore((state) => state.setRoomList);
  const navigate = useNavigate();

  const handelGet = useCallback(async () => {
    const result = await getRooms();
    if (result && result.length > 0) {
      setRoomList(result);
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
          <button onClick={handleLogout} className="sign-out-btn">
            Sign Out
          </button>
        </div>
        {/* <div>
          <img className="sign-in-pic" src="" alt="" />
          <p className="sign-in-name"></p>
        </div> */}
      </div>
    </section>
  );
};

export { ChatPage };

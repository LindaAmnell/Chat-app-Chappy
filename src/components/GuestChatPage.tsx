import "../css/chatApp.css";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../data/storeHooks.ts";
import { getRooms } from "../data/APIFunctions/getRooms.ts";
import { Header } from "./Header.tsx";
import { FaLock } from "react-icons/fa";

const GuestChatPage = () => {
  const { setRoomList, roomList, setRoomImage, setUsername } = useStore();
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

  const handleClickRoom = (room: {
    name: string;
    image: string;
    status: boolean;
  }) => {
    if (room.status) {
      return;
    }
    setRoomImage(room.image);
    navigate(`/chat-room/${room.name}`, {});
  };
  const handleLogutGuest = () => {
    setUsername("");
    navigate("/");
    localStorage.removeItem("username");
  };

  return (
    <>
      <Header />
      <section className="chat-page">
        <div className="side-bar">
          <div className="div-room-guest">
            <h2 className="chat-page-h2">Rooms:</h2>
            {roomList &&
              roomList.map((room) => (
                <div className="rooms" key={room._id}>
                  <img className="room-image" src={room.image} alt="" />
                  <p
                    onClick={() => handleClickRoom(room)}
                    className={`room-name ${room.status ? "locked-room" : ""}`}>
                    {room.name}
                  </p>
                  {room.status === true && (
                    <p className="locked">
                      <FaLock />
                    </p>
                  )}
                </div>
              ))}
            <div className="sign-guest-div">
              <button className="sign-in-btn-guest">Sign in</button>
              <button className="leav-guest" onClick={handleLogutGuest}>
                Leave
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export { GuestChatPage };

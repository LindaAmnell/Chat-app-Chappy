import "../css/chatApp.css";
import "../css/addroom.css";
import { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RenderRooms } from "./RenderRooms.tsx";
import { useStore } from "../data/storeHooks.ts";
import { DmNames } from "./DmNames.tsx";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { Header } from "./Header.tsx";
import { addRoom } from "../data/APIFunctions/addRoom.ts";
import { getRooms } from "../data/APIFunctions/getRooms.ts";
const LS_KEY = "JWT-DEMO--TOKEN";
const ChatPage = () => {
  const navigate = useNavigate();
  const { setUsername, setUserImage, setRoomList, roomList } = useStore();
  const [roomNameValue, setRoomNameValue] = useState("");
  const [roomImageValue, setRoomImageValue] = useState("");
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetActiveUser = async () => {
      const activeUser = await getActiveUser();

      if (activeUser) {
        setUsername(activeUser);
      }
    };
    fetchAndSetActiveUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    setUserImage("");
    setUsername("");
    navigate("/");
  };
  const handleAddRoom = async () => {
    const newRoom = {
      name: roomNameValue,
      status: isLocked,
      image: roomImageValue,
    };
    const roomData = await addRoom(newRoom);
    if (roomData) {
      await fetchUpdatedRooms();
    }
    setRoomNameValue("");
    setRoomImageValue("");
    setIsLocked(false);
    setIsVisible(false);
  };
  const fetchUpdatedRooms = async () => {
    const updatedRooms = await getRooms();
    if (updatedRooms && updatedRooms.length > 0) {
      setRoomList(updatedRooms);
    }
  };

  return (
    <section className="chat-page">
      <Header />
      <div></div>
      <div className="side-bar">
        <div className="room-div">
          <h2 className="chat-page-h2">Rooms:</h2>
          <div className="add-button-container">
            <FaPlus
              onClick={() => setIsVisible(!isVisible)}
              className="add-button"
            />
          </div>
        </div>
        {isVisible && (
          <div className="add-room-div">
            <FiArrowLeftCircle
              onClick={() => setIsVisible(false)}
              className="get-back"
            />
            <p>Add new room</p>
            <div className="add-input-div">
              <label>Name</label>
              <input
                value={roomNameValue}
                type="text"
                onChange={(e) => setRoomNameValue(e.target.value)}
              />
              <label>Image</label>
              <input
                value={roomImageValue}
                type="text"
                onChange={(e) => setRoomImageValue(e.target.value)}
              />
              <div>
                <label>Locked Room</label>

                <input
                  checked={isLocked}
                  onChange={() => setIsLocked(!isLocked)}
                  className="checkbox"
                  type="checkbox"
                />
              </div>
              <button onClick={handleAddRoom}>Add Room</button>
            </div>
          </div>
        )}
        <div></div>
        <RenderRooms />
        <DmNames />
        <div className="sign-user-div">
          <button onClick={handleLogout} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
};

export { ChatPage };

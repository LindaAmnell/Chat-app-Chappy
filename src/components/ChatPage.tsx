import "../css/chatApp.css";
import "../css/addroom.css";
import { useEffect, useState } from "react";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RenderRooms } from "./RenderRooms.tsx";
import { useStore } from "../data/storeHooks.ts";
import { DmNames } from "./DmNames.tsx";
import { getActiveUser } from "../data/functions/getActiveUser.ts";
import { Header } from "./Header.tsx";
const LS_KEY = "JWT-DEMO--TOKEN";
const ChatPage = () => {
  const navigate = useNavigate();
  const { setUsername, setUserImage } = useStore();
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
  const handleAddRoom = () => {};

  return (
    <section className="chat-page">
      <Header />
      <div>
        <img className="chappy-chat-page" src={chappyDragon} alt="" />
      </div>
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
              <input type="text" />
              <label>Image</label>
              <input type="text" />
              <div>
                <label>Locked Room</label>
                <input className="checkbox" type="checkbox" />
              </div>
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

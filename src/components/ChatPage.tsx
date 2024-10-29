import "../css/chatApp.css";
import { useEffect } from "react";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { useNavigate } from "react-router-dom";
import { RenderRooms } from "./RenderRooms.tsx";
import { useStore } from "../data/storeHooks.ts";
import { DmNames } from "./DmNames.tsx";
import { useFetchDms } from "../data/functions/dataFetching.ts";
import { getActiveUser } from "../data/functions/getActiveUser.ts";
const LS_KEY = "JWT-DEMO--TOKEN";
const ChatPage = () => {
  const navigate = useNavigate();
  const fetchDms = useFetchDms();
  const { username, setUsername } = useStore();

  useEffect(() => {
    const fetchAndSetActiveUser = async () => {
      const activeUser = await getActiveUser();

      if (activeUser) {
        setUsername(activeUser);
      }
    };
    fetchAndSetActiveUser();
  }, []);

  useEffect(() => {
    fetchDms();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    navigate("/");
  };

  return (
    <section className="chat-page">
      <div className="profile">
        {username && <p className="sign-in-name">{username}</p>}
        <p className="icon">⚙️</p>
      </div>
      <div>
        <img className="chappy-chat-page" src={chappyDragon} alt="" />
      </div>
      <div className="side-bar">
        <div className="div-room">
          <h2 className="chat-page-h2">Rooms:</h2>
          <RenderRooms />
        </div>
        <div className="div-dm">
          <DmNames />
          <div className="sign-user-div">
            <button onClick={handleLogout} className="sign-out-btn">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ChatPage };

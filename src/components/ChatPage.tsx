import "../css/chatApp.css";
import { useEffect } from "react";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { useNavigate } from "react-router-dom";
import { RenderRooms } from "./RenderRooms.tsx";
import { getProtected } from "../data/functions/getDm.ts";
import { useChappystore } from "../data/store.ts";
import { DmNames } from "./DmNames.tsx";
const LS_KEY = "JWT-DEMO--TOKEN";
const ChatPage = () => {
  const navigate = useNavigate();

  const setUsername = useChappystore((state) => state.setUsername);
  const setDmList = useChappystore((state) => state.setDmList);
  const username = useChappystore((state) => state.username);

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    navigate("/");
  };

  useEffect(() => {
    async function fetchDms() {
      const token = localStorage.getItem(LS_KEY);

      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      try {
        const { userDms, user } = await getProtected();
        setUsername(user.name);
        setDmList(userDms);
      } catch (error) {
        console.error("Error fetching DMs:", error);
      }
    }

    fetchDms();
  }, [setUsername, setDmList]);

  return (
    <section className="chat-page">
      <div>
        <img className="chappy-chat-page" src={chappyDragon} alt="" />
      </div>
      <div className="side-bar">
        <div className="div-room">
          <h2>Rooms:</h2>
          <RenderRooms />
        </div>
        <div className="div-dm">
          <DmNames />
          <div className="sign-user-div">
            <button onClick={handleLogout} className="sign-out-btn">
              Sign Out
            </button>

            {username && <p className="sign-in-name">{username}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export { ChatPage };

import "../css/header.css";
import { useStore } from "../data/storeHooks.ts";
import { getActiveUser } from "../data/functions/getActiveUser";
import { useEffect } from "react";

const Header = () => {
  const { username, setUsername } = useStore();

  const clearGuestData = () => {
    localStorage.removeItem("username");
  };

  const handelUser = async () => {
    if (username !== "Guest") {
      const activeUserName = await getActiveUser();
      if (activeUserName) {
        setUsername(activeUserName);
        localStorage.setItem("username", activeUserName);
      }
    } else {
      console.log("Guest");
      setUsername("Guest");
      clearGuestData();
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      handelUser();
    }
  }, []);

  return (
    <header>
      <div className="profile">
        {username && <p className="sign-in-name">{username}</p>}
        <p className="icon">⚙️</p>
      </div>
    </header>
  );
};

export { Header };

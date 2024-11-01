import "../css/header.css";
import { useStore } from "../data/storeHooks.ts";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { useEffect } from "react";
import { searchUser } from "../data/APIFunctions/searchUser.ts";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { username, setUsername, setUserImage, userImage } = useStore();

  const handelUser = async () => {
    if (username !== "Guest") {
      const activeUserName = await getActiveUser();
      if (activeUserName) {
        const searchUserinfo = await searchUser(activeUserName);
        const matchedUser = searchUserinfo?.find(
          (user) => user.name === activeUserName
        );
        if (matchedUser) {
          setUsername(matchedUser.name);
          setUserImage(matchedUser.image);
        } else {
          console.log("No matched user found.");
        }
      }
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      if (storedUsername === "Guest") {
        return;
      }
    }
    handelUser();
  }, []);

  return (
    <header>
      <img className="chappy-chat-page" src={chappyDragon} alt="" />
      <div className="profile">
        {userImage ? (
          <img src={userImage} alt="Profile" className="profile-image" />
        ) : (
          <CgProfile className="profile-image-icon" />
        )}

        {username && <p className="sign-in-name">{username}</p>}
        <p className="icon">⚙️</p>
      </div>
    </header>
  );
};

export { Header };

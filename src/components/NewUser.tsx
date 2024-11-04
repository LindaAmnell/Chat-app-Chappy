import "../css/newUser.css";
import { NavLink, useNavigate } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { FiArrowLeftCircle } from "react-icons/fi";
import { createUser } from "../data/APIFunctions/createUser";
import { useState } from "react";
import { User } from "../models/User";
import { useStore } from "../data/storeHooks.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

const NewUser = () => {
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    image: "",
  });
  const [isUserCreated, setIsUserCreated] = useState(false);
  const { setUsername } = useStore();
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const newUser = { ...user };
      await createUser(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }

    setIsUserCreated(true);

    try {
      const username = user.name;
      const password = user.password;
      const data = { username, password };
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        return;
      }

      const token = await response.json();
      localStorage.setItem(LS_KEY, token.jwt);
      setUsername(data.username);
    } catch (error) {
      console.log("Try again later", error);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: e.target.value });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, image: e.target.value });
  };
  const handleLogInNewUser = async () => {
    navigate("/chatPage");
  };

  return (
    <section className="new-user-section">
      <header className="login-header">Chappy</header>
      <NavLink to="/">
        <FiArrowLeftCircle className="back-arrow-new-user" />
      </NavLink>
      {isUserCreated ? (
        <div className="confirmation-message">
          <p>New account created</p>
          <p>Thank you for joining us!</p>
          <button onClick={handleLogInNewUser} className="new-user-login-btn">
            Go to chatpage
          </button>
        </div>
      ) : (
        <div className="new-user-div">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleName}
          />
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handlePassword}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={user.image}
            onChange={handleImage}
          />
          <button className="create-btn" onClick={handleCreateUser}>
            Create new user
          </button>
        </div>
      )}
      <div className="dragon-div">
        <img
          className="chappy-login-page"
          src={chappyDragon}
          alt="Cute dragon"
        />
      </div>
    </section>
  );
};

export { NewUser };

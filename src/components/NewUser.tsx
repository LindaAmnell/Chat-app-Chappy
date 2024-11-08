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
  const [passwordError, setPasswordError] = useState("");
  const [userError, setUserError] = useState("");
  const [imageError, setImageError] = useState("");
  const [usernameNotavailableError, setUsernameNotavailableError] =
    useState("");
  const { setUsername } = useStore();
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    if (user.name.length > 14) {
      setUserError("Username to long");
    }
    if (user.name.length < 4) {
      setUserError("Username to short");
    }
    if (user.password.length < 8) {
      setPasswordError("Password to short");
    }
    if (user.image === "") {
      setImageError("Pleas insert Url");
    }

    try {
      const newUser = { ...user };
      const response = await createUser(newUser);
      if (response?.status === 409) {
        setUsernameNotavailableError("Username unavailable");
      } else {
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
          if (response.ok) {
            setIsUserCreated(true);
          }

          const token = await response.json();
          localStorage.setItem(LS_KEY, token.jwt);
          setUsername(data.username);
        } catch (error) {
          console.log("Try again later", error);
        }
      }
    } catch (error) {
      console.error("Error creating user:", error);
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
            placeholder="Name"
            value={user.name}
            onChange={handleName}
          />
          {usernameNotavailableError && (
            <span className="error-msg">{usernameNotavailableError} </span>
          )}
          {userError && <span className="error-msg">{userError} </span>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handlePassword}
          />
          {passwordError && <span className="error-msg">{passwordError} </span>}
          <label>Image</label>
          <input
            type="text"
            name="image"
            placeholder="Image"
            value={user.image}
            onChange={handleImage}
          />
          {imageError && <span className="error-msg">{imageError} </span>}
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

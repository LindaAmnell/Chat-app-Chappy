import "../css/login.css";

import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import { useStore } from "../data/storeHooks.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

const LoginPage = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [error, setError] = useState("");
  const { setUsername, username } = useStore();
  const navigate = useNavigate();
  async function handleLogin() {
    const data = { username, password };
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.log("Wrong name or password");
      setError("Wrong name or password");
      return;
    }

    const token = await response.json();
    localStorage.setItem(LS_KEY, token.jwt);
    setIsLoggedIn(true);
    setUsername(data.username);
  }

  if (isLoggedIn) {
    return <Navigate to="/chatPage" replace />;
  }
  const handleGuesLogin = () => {
    setUsername("Guest");
    localStorage.setItem("username", "Guest");
    navigate("/guestchatPage");
  };

  return (
    <section className="login-section">
      <header className="login-header">Chappy</header>
      <div className="login-div">
        <label>Name</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        {error && <span className="error-msg">{error} </span>}
        <button className="login-btn" onClick={handleLogin}>
          Sign in
        </button>{" "}
        <button onClick={handleGuesLogin} className="sign-guset-btn">
          Sign in as guest
        </button>{" "}
        <button className="new-user-btn">
          <NavLink to="/newUser" className="nav-link">
            New user{" "}
          </NavLink>{" "}
        </button>
      </div>
      <div className="dragon-div">
        <img className="chappy-login-page" src={chappyDragon} alt="" />
      </div>
    </section>
  );
};

export { LoginPage };

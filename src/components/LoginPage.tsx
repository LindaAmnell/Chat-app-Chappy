import "../css/login.css";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import backArrow from "../images/back.png";
import { useStore } from "../data/storeHooks.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

const LoginPage = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setUsername, username } = useStore();

  async function handleLogin() {
    const data = { username, password };
    console.log("Skickar inloggningsuppgifter till servern: ", data);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      console.log("Please login again");
      return;
    }

    const token = await response.json();
    localStorage.setItem(LS_KEY, token.jwt);
    setIsLoggedIn(true);
    setUsername(username);
  }
  if (isLoggedIn) {
    return <Navigate to="/chatPage" replace />;
  }

  return (
    <section className="login-section">
      <NavLink to="/">
        <img className="back-arrow" src={backArrow} alt="" />
      </NavLink>

      <div className="login-div">
        <label>Name</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="text" />
        <button className="login-btn" onClick={handleLogin}>
          Sign in
        </button>
      </div>
      <div className="dragon-div">
        <img className="chappy-login-page" src={chappyDragon} alt="" />
      </div>
    </section>
  );
};

export { LoginPage };

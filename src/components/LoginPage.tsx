import "../css/login.css";
import "../css/startPage.css";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";

import { useStore } from "../data/storeHooks.ts";
// import { getActiveUser } from "../data/functions/getActiveUser.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

const LoginPage = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { setUsername, username } = useStore();

  //   const handleActiveUser = async () => {
  //     const loggedIn = await getActiveUser();
  //     if (loggedIn) {
  //       setIsLoggedIn(true);
  //       console.log("hej");
  //     }
  //   };

  async function handleLogin() {
    const data = { username, password };
    console.log("Skickar inloggningsuppgifter till servern: ", data);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status !== 200) {
      console.log("Please login again");
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

  return (
    <section className="login-section">
      <header>Chappy</header>
      <div className="login-div">
        <label>Name</label>
        <input onChange={(e) => setUsername(e.target.value)} type="text" />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="text" />
        <button className="login-btn" onClick={handleLogin}>
          Sign in
        </button>{" "}
        <NavLink to="/guestchatPage">Sign in as guest</NavLink>{" "}
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

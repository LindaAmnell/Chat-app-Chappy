import "../css/login.css";
import { NavLink } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import backArrow from "../images/back.png";
const LoginPage = () => {
  return (
    <section className="login-section">
      <NavLink to="/">
        <img className="back-arrow" src={backArrow} alt="" />
      </NavLink>

      <div className="login-div">
        <label>Name</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button>Sign in</button>
      </div>
      <div className="dragon-div">
        <img className="chappy-login-page" src={chappyDragon} alt="" />
      </div>
    </section>
  );
};

export { LoginPage };

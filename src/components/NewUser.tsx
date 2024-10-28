import "../css/newUser.css";
import { NavLink } from "react-router-dom";
import chappyDragon from "../images/little-cute-cartoon-dragon-chappy.png";
import backArrow from "../images/back.png";
const NewUser = () => {
  return (
    <section className="new-user-section">
      <NavLink to="/">
        <img className="back-arrow-new-user" src={backArrow} alt="" />
      </NavLink>

      <div className="new-user-div">
        <label>Name</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <label>Image</label>
        <input type="text" />
        <button className="creat-btn">Creat new user</button>
      </div>
      <div className="dragon-div">
        <img className="chappy-login-page" src={chappyDragon} alt="" />
      </div>
    </section>
  );
};

export { NewUser };

import { NavLink } from "react-router-dom";

import "../css/startPage.css";
const StartPage = () => {
  return (
    <div className="start-page-section">
      <button className="sign-btn">
        {" "}
        <NavLink to="/login" className="nav-link">
          Sign in{" "}
        </NavLink>{" "}
      </button>
      <button className="new-user-btn">
        <NavLink to="/newUser" className="nav-link">
          New user{" "}
        </NavLink>{" "}
      </button>
      <button className="sign-guset-btn">Sign in as guest</button>
    </div>
  );
};

export { StartPage };

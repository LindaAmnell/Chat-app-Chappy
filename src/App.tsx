import { LoginPage } from "./components/LoginPage.js";
import "./css/App.css";
import chappyDragon from "./images/little-cute-cartoon-dragon-chappy.png";

function App() {
  return (
    <>
      <LoginPage />
      <div className="dragon-div">
        <img className="dragon-start-page" src={chappyDragon} />
      </div>
    </>
  );
}

export default App;

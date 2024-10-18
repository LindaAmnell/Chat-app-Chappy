import { StartPage } from "./components/StartPage.js";
import "./css/App.css";
import chappyDragon from "./images/little-cute-cartoon-dragon-chappy.png";

function App() {
  return (
    <>
      <StartPage />
      <div className="dragon-div">
        <img className="dragon-start-page" src={chappyDragon} />
      </div>
    </>
  );
}

export default App;

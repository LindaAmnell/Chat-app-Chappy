import { createHashRouter } from "react-router-dom";
import Root from "./Root.jsx";
import App from "../App.js";
import { LoginPage } from "../components/LoginPage.js";
import { NewUser } from "../components/NewUser.js";
import { ChatPage } from "../components/ChatPage.js";
import { Dms } from "../components/Dms.js";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/newUser",
        element: <NewUser />,
      },
      {
        path: "/chatPage",
        element: <ChatPage />,
      },
      {
        path: "/dms/:name",
        element: <Dms />,
      },
    ],
  },
]);

export { router };

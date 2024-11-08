import "../css/dm.css";
import { useParams, NavLink } from "react-router-dom";
import { Dm } from "../models/Dm";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { useStore } from "../data/storeHooks.ts";
import { getProtectedMatchingDms } from "../data/APIFunctions/getProtectedMatchingDms.ts";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { Header } from "./Header.tsx";

const Dms = () => {
  const { name } = useParams<{ name: string }>();
  const [messageDm, setMessageDm] = useState("");
  const [sortedDms, setSortedDms] = useState<Dm[] | null>(null);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const { username, setUsername } = useStore();

  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  const handleGet = async () => {
    const activeusername = await getActiveUser();
    if (activeusername) {
      setUsername(activeusername);
    }

    const matchingDms = await getProtectedMatchingDms();
    if (username && matchingDms) {
      const filteredDms = matchingDms.filter(
        (dm) =>
          (dm.senderName === username && dm.receiverName === name) ||
          (dm.senderName === name && dm.receiverName === username)
      );
      const sortedDms = filteredDms.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setSortedDms(sortedDms);
      scrollToBottom();
    }
  };
  useEffect(() => {
    handleGet();
  }, [username, name]);

  useEffect(() => {
    scrollToBottom();
  }, [sortedDms]);

  const postDm = async () => {
    const message = {
      textMessage: messageDm,
      receiverName: name,
      senderName: username,
      date: new Date(),
    };
    const data = message;
    const response: Response = await fetch("/api/dm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      return;
    }
    setMessageDm("");
  };

  const handlePostDm = async () => {
    await postDm();
    await handleGet();
  };

  return (
    <>
      <Header />
      <section className="dm-section">
        <NavLink to="/chatPage">
          <FiArrowLeftCircle className="back-arrow-dm" />
        </NavLink>
        <h2 className="name-dm">{name}</h2>
        <div className="messages-container" ref={messageDivRef}>
          {sortedDms && sortedDms.length > 0 ? (
            sortedDms.map((dm) => (
              <div
                className={`div-dms ${
                  dm.senderName === username ? "active-user" : "other-user"
                }`}
                key={dm._id}>
                <p className="sender-name">{dm.senderName}</p>
                <p
                  className={`text-message ${
                    dm.senderName === username ? "active-user-message" : ""
                  }`}>
                  {dm.textMessage}
                </p>
                <p className="date">{new Date(dm.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Inga meddelanden</p>
          )}
        </div>
        <div className="message-input">
          <textarea
            value={messageDm}
            onChange={(e) => setMessageDm(e.target.value)}
            className="input-dm"
            placeholder="Skriv ett meddelande..."
          />
          <button className="send-btn" onClick={handlePostDm}>
            Send
          </button>
        </div>
      </section>
    </>
  );
};
export { Dms };

import "../css/dm.css";
import { useParams, NavLink } from "react-router-dom";
import { Dm } from "../models/Dm";
import backArrow from "../images/back.png";
import { useEffect, useState, useRef } from "react";

import { useFetchDms } from "../data/functions/dataFetching.ts";
import { useStore } from "../data/storeHooks.ts";

const Dms = () => {
  const { name } = useParams<{ name: string }>();
  const fetchDms = useFetchDms();
  const [messageDm, setMessageDm] = useState("");
  const [sortedDms, setSortedDms] = useState<Dm[] | null>(null);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const { dmList, username } = useStore();

  const scrollToBottom = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight;
    }
  };

  const handleGet = async () => {
    await fetchDms();
  };
  useEffect(() => {
    handleGet();
  }, []);

  useEffect(() => {
    const filteredDms = dmList.filter(
      (dm) =>
        (dm.senderName === username && dm.receiverName === name) ||
        (dm.senderName === name && dm.receiverName === username)
    );
    const sortedDms = filteredDms.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setSortedDms(sortedDms);
  }, [dmList, username, name]);
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
      console.log("try again 3");
      return;
    }
    setMessageDm("");
  };

  const handlePostDm = async () => {
    await postDm();
    await handleGet();
  };

  return (
    <section className="dm-section">
      <NavLink to="/chatPage">
        <img className="back-arrow-dm" src={backArrow} alt="Back" />
      </NavLink>
      <h2 className="name-dm">{name}</h2>
      <div className="messages-container" ref={messageDivRef}>
        {sortedDms && sortedDms.length > 0 ? (
          sortedDms.map((dm) => (
            <div className="div-dms" key={dm._id}>
              <p className="sender-name">{dm.senderName}</p>
              <p className="text-message">{dm.textMessage}</p>
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
  );
};
export { Dms };

import "../css/dm.css";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { Dm } from "../models/Dm";
import backArrow from "../images/back.png";
import { useState, useEffect } from "react";
const Dms = () => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const dmList: Dm[] = location.state?.dms || [];
  const userName = location.state?.userName;
  const [sortedDms, setSortedDms] = useState<Dm[]>([]);
  const [messageDm, setMessageDm] = useState<string>("");

  useEffect(() => {
    const sortMessages = (messages: Dm[]) => {
      return messages.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    };
    const sorted = sortMessages(dmList);
    setSortedDms(sorted);
  }, [dmList]);

  const postDm = async () => {
    const message = {
      textMessage: messageDm,
      receiverName: name,
      senderName: userName,
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

    console.log(data);

    if (response.status !== 201) {
      console.log("try again 3");
      return;
    }
  };

  const handlePostDm = async () => {
    if (messageDm.trim()) {
      await postDm();
    }
  };

  return (
    <section className="dm-section">
      <NavLink to="/chatPage">
        <img className="back-arrow-dm" src={backArrow} alt="Back" />
      </NavLink>
      <h2>{name}</h2>
      <div>
        {sortedDms.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          sortedDms.map((dm) => (
            <div className="div-dms" key={dm._id}>
              <p className="sender-name">{dm.senderName}</p>
              <p className="text-message">{dm.textMessage}</p>
              <p className="date">{new Date(dm.date).toLocaleString()}</p>
            </div>
          ))
        )}
        <div className="message-input">
          <textarea
            value={messageDm}
            onChange={(e) => setMessageDm(e.target.value)}
            className="input-dm"
          />
          <button className="send-btn" onClick={handlePostDm}>
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export { Dms };

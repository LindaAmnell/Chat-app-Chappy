import { useChappystore } from "../data/store.ts";
import { useNavigate } from "react-router-dom";

const DmNames = () => {
  const dmList = useChappystore((state) => state.dmList);
  const username = useChappystore((state) => state.username);
  const navigate = useNavigate();

  const uniqueUsers = Array.from(
    new Set(
      dmList.flatMap((dm) => {
        return dm.senderName === username
          ? [dm.receiverName]
          : dm.receiverName === username
          ? [dm.senderName]
          : [];
      })
    )
  );

  const handleDm = (name: string) => {
    const filteredDms = dmList.filter(
      (dm) =>
        (dm.senderName === username && dm.receiverName === name) ||
        (dm.senderName === name && dm.receiverName === username)
    );
    navigate(`/dms/${name}`, {
      state: { dms: filteredDms, userName: username },
    });
  };

  return (
    <section>
      <h2>DM:</h2>
      {uniqueUsers.map((userName) => (
        <div key={userName}>
          <p onClick={() => handleDm(userName)} className="user-name">
            {userName}
          </p>
        </div>
      ))}
    </section>
  );
};

export { DmNames };

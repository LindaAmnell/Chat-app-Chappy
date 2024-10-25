import { useStore } from "../data/storeHooks.ts";
import { useNavigate } from "react-router-dom";

const DmNames = () => {
  const { dmList, username } = useStore();
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
    navigate(`/dms/${name}`, {});
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

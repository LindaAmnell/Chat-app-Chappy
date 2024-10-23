import { useEffect } from "react";
import { useChappystore } from "../data/store.ts";
import { getProtected } from "../data/functions/getDm.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

const Dms = () => {
  const dmList = useChappystore((state) => state.dmList);
  const useLoadDms = () => {
    useEffect(() => {
      async function fetchDms() {
        const token = localStorage.getItem(LS_KEY);

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        try {
          const dms = await getProtected();
          useChappystore.setState({ dmList: dms });
        } catch (error) {
          console.error("Error fetching DMs:", error);
        }
      }

      fetchDms();
    }, []);
  };

  useLoadDms();
  const uniqueSenders = dmList.filter(
    (dm, index, self) =>
      index === self.findIndex((t) => t.receiverName === dm.receiverName)
  );

  return (
    <section>
      <h2>DM:</h2>
      {uniqueSenders.map((dm) => (
        <div key={dm._id}>
          <p className="user-name">{dm.receiverName}</p>
        </div>
      ))}
    </section>
  );
};

export { Dms };

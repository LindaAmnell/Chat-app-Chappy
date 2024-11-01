import { useStore } from "../data/storeHooks.ts";
import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import { BsEnvelopePlus } from "react-icons/bs";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { getAllUser } from "../data/APIFunctions/getAllUsers.ts";
import { useEffect, useState } from "react";
import { User } from "../models/User.ts";
import { getProtectedMatchingDms } from "../data/APIFunctions/getProtectedMatchingDms.ts";
import { searchUser } from "../data/APIFunctions/searchUser.ts";

const DmNames = () => {
  const { username, setUsername } = useStore();
  const [matchingUsers, setMatchingUsers] = useState<User[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleGet = async () => {
    const activeUser = await getActiveUser();
    const getUser = await getAllUser();
    const matchingDms = await getProtectedMatchingDms();

    if (activeUser) {
      setUsername(activeUser);
    }
    if (getUser) {
      setAllUsers(getUser);
      setMatchingUsers(
        getUser.filter(
          (user) => user.name.toLowerCase() !== username.toLowerCase()
        )
      );
    }
    if (matchingDms) {
      const names = [
        ...new Set([
          ...matchingDms
            .filter((username) => username.senderName !== activeUser)
            .map((username) => username.senderName),
          ...matchingDms
            .filter((dm) => dm.receiverName && dm.receiverName !== activeUser)
            .map((dm) => dm.receiverName),
        ]),
      ];
      setUniqueNames(names);
    }
  };
  const handleUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
      setMatchingUsers(allUsers);
      handleGet();
      return;
    } else {
      const response = await searchUser(value);
      if (response) {
        const filteredResponse = response.filter(
          (user) => user.name.toLowerCase() !== username.toLowerCase()
        );
        setMatchingUsers(filteredResponse);
      } else {
        setMatchingUsers([]);
      }
    }
  };

  const handleDm = (name: string) => {
    navigate(`/dms/${name}`, {});
  };
  useEffect(() => {
    handleGet();
  }, []);

  return (
    <section>
      <div className="send-dm-div">
        <h2 className="chat-page-h2">DM:</h2>
        <BsEnvelopePlus
          onClick={() => setSearching(!searching)}
          className="send-dm"
        />
      </div>
      <div className="div-dm">
        {searching && (
          <div className="user-search">
            <FiArrowLeftCircle
              onClick={() => setSearching(false)}
              className="back-arrow-search-user"
            />

            <input
              className="search-input"
              type="text"
              placeholder="search user"
              onChange={(e) => handleUsers(e)}
            />
            {matchingUsers.map((user) => (
              <div key={user._id} className="user-div">
                <img className="profile-image" src={user.image} />

                <p className="name-users" onClick={() => handleDm(user.name)}>
                  {user.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {uniqueNames.map((name) => (
          <div className="dm-name" key={name}>
            <p onClick={() => handleDm(name)} className="user-name">
              {name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { DmNames };

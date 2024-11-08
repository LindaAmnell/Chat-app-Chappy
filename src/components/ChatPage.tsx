import "../css/chatApp.css";
import "../css/addroom.css";
import { useEffect, useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { listOfPicturesRoom } from "../assets/picToRooms.ts";

import { FaPlus } from "react-icons/fa6";
import { RenderRooms } from "./RenderRooms.tsx";
import { useStore } from "../data/storeHooks.ts";
import { DmNames } from "./DmNames.tsx";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { Header } from "./Header.tsx";
import { addRoom } from "../data/APIFunctions/addRoom.ts";
import { getRooms } from "../data/APIFunctions/getRooms.ts";
const ChatPage = () => {
  const { setUsername, setRoomList, username } = useStore();
  const [roomNameValue, setRoomNameValue] = useState("");
  const [roomImageValue, setRoomImageValue] = useState("");
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndSetActiveUser = async () => {
      const activeUser = await getActiveUser();

      if (activeUser) {
        setUsername(activeUser);
      }
    };
    fetchAndSetActiveUser();
  }, []);

  const handleAddRoom = async () => {
    const newRoom = {
      name: roomNameValue,
      status: isLocked,
      image: roomImageValue,
      creator: username,
    };
    const roomData = await addRoom(newRoom);
    if (roomData) {
      await fetchUpdatedRooms();
    }
    setRoomNameValue("");
    setRoomImageValue("");
    setIsLocked(false);
    setIsVisible(false);
  };
  const fetchUpdatedRooms = async () => {
    const updatedRooms = await getRooms();
    if (updatedRooms && updatedRooms.length > 0) {
      setRoomList(updatedRooms);
    }
  };
  const handlePictures = (picture: string) => {
    setRoomImageValue(picture);
  };

  return (
    <main>
      <Header />
      <section className="chat-page">
        <div className="side-bar">
          <div className="room">
            <div className="room-div">
              <h2 className="chat-page-h2">Rooms:</h2>
              <div className="add-button-container">
                <FaPlus
                  onClick={() => setIsVisible(!isVisible)}
                  className="add-button"
                />
              </div>
            </div>
            {isVisible && (
              <div className="add-room-div">
                <FiArrowLeftCircle
                  onClick={() => setIsVisible(false)}
                  className="get-back"
                />
                <p>Add new room</p>
                <div className="add-input-div">
                  <label>Name</label>
                  <input
                    value={roomNameValue}
                    type="text"
                    onChange={(e) => setRoomNameValue(e.target.value)}
                  />
                  <label>Image</label>
                  <input
                    value={roomImageValue}
                    type="text"
                    onChange={(e) => setRoomImageValue(e.target.value)}
                  />
                  <div className="chose-pic">
                    {listOfPicturesRoom.map((picture) => (
                      <img
                        key={picture}
                        src={picture}
                        className="profile-image"
                        onClick={() => handlePictures(picture)}
                      />
                    ))}
                  </div>

                  <div>
                    <label>Locked Room</label>

                    <input
                      checked={isLocked}
                      onChange={() => setIsLocked(!isLocked)}
                      className="checkbox"
                      type="checkbox"
                    />
                  </div>
                  <button onClick={handleAddRoom}>Add Room</button>
                </div>
              </div>
            )}
            <RenderRooms />
          </div>
          <div>
            <DmNames />
          </div>
        </div>
      </section>
    </main>
  );
};

export { ChatPage };

import { getRooms } from "../data/APIFunctions/getRooms.ts";
import { FaUnlock } from "react-icons/fa";
import { useEffect, useCallback } from "react";
import { useStore } from "../data/storeHooks.ts";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { deleteRoom } from "../data/APIFunctions/deleteRoom.ts";

const RenderRooms = () => {
  const { setRoomList, roomList, setRoomImage, username } = useStore();
  const navigate = useNavigate();
  const handelGet = useCallback(async () => {
    const result = await getRooms();
    if (result && result.length > 0) {
      setRoomList(result);
    }
  }, []);
  useEffect(() => {
    handelGet();
  }, []);

  const handleClickRoom = (room: { name: string; image: string }) => {
    setRoomImage(room.image);
    navigate(`/chat-room/${room.name}`, {});
  };
  const handleDelet = async (room: { name: string }) => {
    if (!room.name) {
      console.log("Room name is missing!");
      return;
    }
    await deleteRoom(room.name);
    handelGet();
  };

  return (
    <div className="div-room">
      {roomList.map((room) => (
        <div className="rooms" key={room._id}>
          {" "}
          <img className="room-image" src={room.image} alt="" />
          <p onClick={() => handleClickRoom(room)} className="room-name">
            {room.name}
          </p>
          {room.status === true && (
            <p className="locked">
              <FaUnlock />
            </p>
          )}
          {room.creator === username && (
            <p>
              {" "}
              <BsTrash3Fill onClick={() => handleDelet(room)} />
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export { RenderRooms };

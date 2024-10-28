import { getRooms } from "../data/functions/getRooms.ts";
import { useEffect, useCallback } from "react";
import { useStore } from "../data/storeHooks.ts";
import { useNavigate } from "react-router-dom";

const RenderRooms = () => {
  const { setRoomList, roomList, setRoomImage } = useStore();
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

  return (
    <div>
      {roomList.map((room) => (
        <div className="rooms" key={room._id}>
          {" "}
          <img className="room-image" src={room.image} alt="" />
          <p onClick={() => handleClickRoom(room)} className="room-name">
            {room.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export { RenderRooms };

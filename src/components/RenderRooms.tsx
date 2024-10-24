import { getRooms } from "../data/functions/getRooms.ts";
import { useEffect, useCallback } from "react";
import { useChappystore } from "../data/store.ts";

const RenderRooms = () => {
  const roomList = useChappystore((state) => state.roomList);
  const setRoomList = useChappystore((state) => state.setRoomList);

  const handelGet = useCallback(async () => {
    const result = await getRooms();
    if (result && result.length > 0) {
      setRoomList(result);
    }
  }, [setRoomList]);
  useEffect(() => {
    handelGet();
  }, [handelGet]);

  return (
    <div>
      {roomList.map((room) => (
        <div className="rooms" key={room._id}>
          {" "}
          <img className="room-image" src={room.image} alt="" />
          <p className="room-name">{room.name}</p>
        </div>
      ))}
    </div>
  );
};

export { RenderRooms };

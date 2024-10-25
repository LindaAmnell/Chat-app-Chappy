import { useChappystore } from "./store.ts";

export const useStore = () => {
  const setUsername = useChappystore((state) => state.setUsername);
  const setDmList = useChappystore((state) => state.setDmList);
  const username = useChappystore((state) => state.username);
  const dmList = useChappystore((state) => state.dmList);
  const roomList = useChappystore((state) => state.roomList);
  const setRoomList = useChappystore((state) => state.setRoomList);

  return {
    setUsername,
    setDmList,
    username,
    dmList,
    roomList,
    setRoomList,
  };
};

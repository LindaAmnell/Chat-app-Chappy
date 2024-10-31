import { useChappystore } from "./store.ts";

export const useStore = () => {
  const setUsername = useChappystore((state) => state.setUsername);
  const username = useChappystore((state) => state.username);
  const setDmList = useChappystore((state) => state.setDmList);
  const dmList = useChappystore((state) => state.dmList);
  const roomList = useChappystore((state) => state.roomList);
  const setRoomList = useChappystore((state) => state.setRoomList);
  const setRoomImage = useChappystore((state) => state.setRoomImage);
  const roomImage = useChappystore((state) => state.roomImage);
  const setUserImage = useChappystore((state) => state.setUserImage);
  const userImage = useChappystore((state) => state.userImage);

  return {
    setUsername,
    setDmList,
    username,
    dmList,
    roomList,
    setRoomList,
    setRoomImage,
    roomImage,
    userImage,
    setUserImage,
  };
};

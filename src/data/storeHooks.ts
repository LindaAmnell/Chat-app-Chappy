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
  const setUser = useChappystore((state) => state.setUser); // Lägg till setUser
  const user = useChappystore((state) => state.user); // Lägg till user

  const isProfileSettingsVisible = useChappystore(
    (state) => state.isProfileSettingsVisible
  );
  const toggleProfileSettings = useChappystore(
    (state) => state.toggleProfileSettings
  );

  return {
    setUsername,
    setDmList,
    setUser,
    username,
    user,
    dmList,
    roomList,
    setRoomList,
    setRoomImage,
    roomImage,
    userImage,
    setUserImage,
    isProfileSettingsVisible,
    toggleProfileSettings,
  };
};

import { create } from "zustand";
import { Room } from "../models/Room";
import { Dm } from "../models/Dm";
import { User } from "../models/User";

interface ChappyStore {
  isLoggedIn: boolean;
  roomList: Room[];
  dmList: Dm[];
  userList: User[];
  roomImage: string;
  username: string;
  userImage: string;
  isProfileSettingsVisible: boolean;
  user: User | null;
  toggleProfileSettings: (isVisible: boolean) => void;
  setIsLoggedIn: (value: boolean) => void;
  setUsername: (username: string) => void;
  setRoomList: (roomList: Room[]) => void;
  setDmList: (dmListList: Dm[]) => void;
  setUserList: (userList: User[]) => void;
  setRoomImage: (roomImage: string) => void;
  setUserImage: (UserImage: string) => void;
  setUser: (user: User | null) => void;
}

const useChappystore = create<ChappyStore>((set) => ({
  isLoggedIn: false,
  roomList: [],
  username: "",
  dmList: [],
  userList: [],
  roomImage: "",
  userImage: "",
  user: null,
  isProfileSettingsVisible: false,
  toggleProfileSettings: (isVisible: boolean) =>
    set({ isProfileSettingsVisible: isVisible }),

  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }),
  setRoomList: (roomList: Room[]) => set({ roomList }),
  setUsername: (username: string) => set({ username }),
  setDmList: (dmList: Dm[]) => set({ dmList }),
  setUserList: (userList: User[]) => set({ userList }),
  setRoomImage: (roomImage: string) => set({ roomImage }),
  setUserImage: (userImage: string) => set({ userImage }),
  setUser: (user: User | null) => set({ user }),
}));

export { useChappystore };

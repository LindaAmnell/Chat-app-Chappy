import { create } from "zustand";
import { Room } from "../models/Room";
import { Dm } from "../models/Dm";
import { User } from "../models/User";

interface ChappyStore {
  roomList: Room[];
  username: string;
  dmList: Dm[];
  userList: User[];
  roomImage: string;
  setRoomList: (roomList: Room[]) => void;
  setUsername: (username: string) => void;
  setDmList: (dmListList: Dm[]) => void;
  setUserList: (userList: User[]) => void;
  setRoomImage: (roomImage: string) => void;
}

const useChappystore = create<ChappyStore>((set) => ({
  roomList: [],
  username: "",
  dmList: [],
  userList: [],
  roomImage: "",

  setRoomList: (roomList: Room[]) => set({ roomList }),
  setUsername: (username: string) => set({ username }),
  setDmList: (dmList: Dm[]) => set({ dmList }),
  setUserList: (userList: User[]) => set({ userList }),
  setRoomImage: (roomImage: string) => set({ roomImage }),
}));

export { useChappystore };

import { create } from "zustand";
import { Room } from "../models/Room";

interface ChappyStore {
  roomList: Room[];
  setRoomList: (roomList: Room[]) => void;
}

const useChappystore = create<ChappyStore>((set) => ({
  roomList: [],
  setRoomList: (roomList: Room[]) => set({ roomList }),
}));

export { useChappystore };

import { Room } from "../models/Room";

async function getRooms(): Promise<Room[]> {
  const response: Response = await fetch("/api/room", { method: "GET" });
  const data: Room[] = await response.json();
  return data;
}

export { getRooms };

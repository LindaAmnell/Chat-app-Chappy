import { MessageRoom } from "../../models/MessageRom";

async function getMessageRooms(): Promise<MessageRoom[]> {
  const response: Response = await fetch("/api/room-message", {
    method: "GET",
  });
  const data: MessageRoom[] = await response.json();
  return data;
}

export { getMessageRooms };

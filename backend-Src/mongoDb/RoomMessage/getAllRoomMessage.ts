import { roomMessageConnect } from "../Connection/RoomMessageConnection.js";
import { MessageRoom } from "../../interfaces/MessageRoom.js";
import { MongoClient, Collection, WithId } from "mongodb";

async function getAllRoomMessage(): Promise<WithId<MessageRoom>[]> {
  const [col, client]: [Collection<MessageRoom>, MongoClient] =
    await roomMessageConnect();
  const result: WithId<MessageRoom>[] = await col.find({}).toArray();
  await client.close();
  return result;
}
export { getAllRoomMessage };

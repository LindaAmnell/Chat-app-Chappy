import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { MessageRoom } from "../../interfaces/MessageRoom.js";
import { roomMessageConnect } from "../Connection/RoomMessageConnection.js";

async function creatRoomMessage(
  RoomMessage: MessageRoom
): Promise<ObjectId | null> {
  const [col, client]: [Collection<MessageRoom>, MongoClient] =
    await roomMessageConnect();
  try {
    const result: InsertOneResult<MessageRoom> = await col.insertOne(
      RoomMessage
    );
    return result.insertedId;
  } catch (error) {
    console.error("Error, insert Dm", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { creatRoomMessage };

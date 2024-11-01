import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { Room } from "../../interfaces/Room.js";

import { roomConnect } from "../Connection/roomConnection.js";

async function creatRoom(room: Room): Promise<ObjectId | null> {
  const [col, client]: [Collection<Room>, MongoClient] = await roomConnect();
  try {
    const result: InsertOneResult<Room> = await col.insertOne(room);
    return result.insertedId;
  } catch (error) {
    console.error("Error, insert Room", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { creatRoom };

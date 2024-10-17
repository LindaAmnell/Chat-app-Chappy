import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { DmMessage } from "../../interfaces/DmMessage.js";

import { dmConnect } from "../Connection/DmMessageConnection.js";

async function creatDm(DM: DmMessage): Promise<ObjectId | null> {
  const [col, client]: [Collection<DmMessage>, MongoClient] = await dmConnect();
  try {
    const result: InsertOneResult<DmMessage> = await col.insertOne(DM);
    return result.insertedId;
  } catch (error) {
    console.error("Error, insert Dm", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { creatDm };

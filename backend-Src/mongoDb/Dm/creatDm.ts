import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";

import { dmConnect } from "../Connection/DmConnection.js";

async function creatDm(DM: Dm): Promise<ObjectId | null> {
  const [col, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  try {
    const result: InsertOneResult<Dm> = await col.insertOne(DM);
    return result.insertedId;
  } catch (error) {
    console.error("Error, insert Dm", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { creatDm };

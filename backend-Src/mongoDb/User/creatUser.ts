import { MongoClient, Collection, ObjectId, InsertOneResult } from "mongodb";
import { User } from "../../interfaces/User.js";
import { userConnect } from "../Connection/userConnection.js";

async function creatUser(user: User): Promise<ObjectId | null> {
  const [col, client]: [Collection<User>, MongoClient] = await userConnect();

  try {
    const result: InsertOneResult<User> = await col.insertOne(user);
    return result.insertedId;
  } catch (error) {
    console.error("Error, insert Dm", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { creatUser };

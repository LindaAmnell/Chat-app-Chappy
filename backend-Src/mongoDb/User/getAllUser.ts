import { MongoClient, Collection, WithId } from "mongodb";
import { User } from "../../interfaces/User.js";
import { userConnect } from "../Connection/userConnection.js";

async function getAllUser(): Promise<WithId<User>[]> {
  const [col, client]: [Collection<User>, MongoClient] = await userConnect();

  const result: WithId<User>[] = await col.find({}).toArray();
  await client.close();
  return result;
}

export { getAllUser };

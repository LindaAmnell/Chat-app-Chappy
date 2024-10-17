import { MongoClient, Collection, WithId } from "mongodb";
import { User } from "../../interfaces/User.js";
import { connect } from "../userConnection.js";

async function getAllUser(): Promise<WithId<User>[]> {
  const [col, client]: [Collection<User>, MongoClient] = await connect();

  const result: WithId<User>[] = await col.find({}).toArray();
  await client.close();
  return result;
}

export { getAllUser };

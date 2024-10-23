import { MongoClient, Collection, WithId } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";

import { dmConnect } from "../Connection/DmConnection.js";

async function getAllDms(): Promise<WithId<Dm>[]> {
  const [col, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  const result: WithId<Dm>[] = await col.find({}).toArray();
  await client.close();
  return result;
}
export { getAllDms };

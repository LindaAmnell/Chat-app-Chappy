import { MongoClient, Collection, WithId } from "mongodb";
import { connect } from "../roomConnection.js";
import { Room } from "../../interfaces/Room.js";

async function getAllRooms(): Promise<WithId<Room>[]> {
  const [col, client]: [Collection<Room>, MongoClient] = await connect();

  const result: WithId<Room>[] = await col.find({}).toArray();
  await client.close();
  return result;
}

export { getAllRooms };

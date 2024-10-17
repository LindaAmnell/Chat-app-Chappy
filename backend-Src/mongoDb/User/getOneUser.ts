import { MongoClient, Collection, WithId, ObjectId, FindCursor } from "mongodb";
import { User } from "../../interfaces/User.js";
import { userConnect } from "../Connection/userConnection.js";

async function getOneUser(id: ObjectId): Promise<WithId<User>[]> {
  try {
    const [col, client]: [Collection<User>, MongoClient] = await userConnect();
    const filter = { _id: id };
    const crusor: FindCursor<WithId<User>> = col.find(filter);
    const found: WithId<User>[] = await crusor.toArray();
    if (found.length < 1) {
      console.log("No user awailable today :/");
    }
    await client.close();
    return found;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

export { getOneUser };

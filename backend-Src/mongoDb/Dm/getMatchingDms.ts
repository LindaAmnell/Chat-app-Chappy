import { Collection, FindCursor, MongoClient, WithId } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";
import { dmConnect } from "../Connection/DmConnection.js";

async function getMatchingDms(username: string): Promise<WithId<Dm>[]> {
  try {
    const [col, client]: [Collection<Dm>, MongoClient] = await dmConnect();
    const cursor: FindCursor<WithId<Dm>> = col.find({
      $or: [{ receiverName: username }, { senderName: username }],
    });

    const found: WithId<Dm>[] = await cursor.toArray();

    if (found.length < 1) {
      console.log("No dms awailable today :/");
    }
    await client.close();
    return found;
  } catch (error) {
    console.error("Error fetching matching DM", error);
    throw error;
  }
}

export { getMatchingDms };

import { MongoClient, Collection, ObjectId, DeleteResult } from "mongodb";
import { Room } from "../../interfaces/Room.js";

import { roomConnect } from "../Connection/roomConnection.js";

async function deleteRoom(id: ObjectId) {
  const [col, client]: [Collection<Room>, MongoClient] = await roomConnect();

  try {
    const filter = { _id: id };
    const result: DeleteResult = await col.deleteOne(filter);
    if (!result.acknowledged) {
      console.log("Could not delete any user");
      return;
    }
    console.log(`Deleted ${result.deletedCount} user(s).`);
    return result;
  } catch (error) {
    console.error("Error fetching Users", error);
    throw error;
  } finally {
    await client.close();
  }
}
export { deleteRoom };

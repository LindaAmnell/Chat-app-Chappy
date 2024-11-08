import { MongoClient, Collection, DeleteResult } from "mongodb";
import { Room } from "../../interfaces/Room.js";
import { roomConnect } from "../Connection/roomConnection.js";
async function deleteRoom(name: string): Promise<DeleteResult> {
  const [col, client]: [Collection<Room>, MongoClient] = await roomConnect();

  try {
    const filter = { name: name };
    const result: DeleteResult = await col.deleteOne(filter);

    if (result.acknowledged) {
      console.log(`Deleted ${result.deletedCount} room(s).`);
      return result;
    } else {
      console.log("Could not delete any room");
      return result;
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { deleteRoom };

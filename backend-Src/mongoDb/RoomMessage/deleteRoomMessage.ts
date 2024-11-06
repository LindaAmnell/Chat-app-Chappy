import { Collection, DeleteResult, MongoClient } from "mongodb";
import { MessageRoom } from "../../interfaces/MessageRoom.js";
import { roomMessageConnect } from "../Connection/RoomMessageConnection.js";

async function deleteRoomMessage(name: string) {
  const [col, client]: [Collection<MessageRoom>, MongoClient] =
    await roomMessageConnect();

  try {
    const filter = {
      $or: [{ receiverName: name }, { senderName: name }],
    };
    console.log("filet är", filter);
    const result: DeleteResult = await col.deleteMany(filter);
    if (!result.acknowledged) {
      console.log("Could not delete any message");
      return;
    }
    console.log(`Deleted ${result.deletedCount} message(s).`);
    return result;
  } catch (error) {
    console.error("Error delete message", error);
    throw error;
  } finally {
    await client.close();
  }
}
export { deleteRoomMessage };

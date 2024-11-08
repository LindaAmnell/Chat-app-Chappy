import { MongoClient, Collection, UpdateResult } from "mongodb";
import { MessageRoom } from "../../interfaces/MessageRoom.js";
import { roomMessageConnect } from "../Connection/RoomMessageConnection.js";

async function updatedRoomMessages(
  oldName: string,
  newName: string
): Promise<UpdateResult<MessageRoom>> {
  const [col, client]: [Collection<MessageRoom>, MongoClient] =
    await roomMessageConnect();
  try {
    const filter = {
      $or: [{ senderName: oldName }],
    };
    const update = {
      $set: {
        senderName: newName,
      },
    };
    const result: UpdateResult<MessageRoom> = await col.updateMany(
      filter,
      update
    );

    if (!result.acknowledged) {
      console.log("Could not update the messages.");
      return result;
    }

    console.log(`Updated ${result.matchedCount} room message(s).`);
    return result;
  } catch (error) {
    console.error("Error updating messages:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { updatedRoomMessages };

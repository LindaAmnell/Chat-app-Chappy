import { MongoClient, Collection, UpdateResult } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";
import { dmConnect } from "../Connection/DmConnection.js";

async function updatedDm(
  oldName: string,
  newName: string
): Promise<UpdateResult<Dm> | undefined> {
  const [col, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  try {
    const resultSender: UpdateResult<Dm> = await col.updateMany(
      { senderName: oldName },
      { $set: { senderName: newName } }
    );
    const resultReciver: UpdateResult<Dm> = await col.updateMany(
      { receiverName: oldName },
      { $set: { receiverName: newName } }
    );

    if (!resultSender.acknowledged && !resultReciver.acknowledged) {
      return;
    }
    return resultSender;
  } catch (error) {
    console.error("Error updating Dms:", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { updatedDm };

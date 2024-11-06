import { MongoClient, Collection, DeleteResult } from "mongodb";
import { Dm } from "../../interfaces/Dm.js";

import { dmConnect } from "../Connection/DmConnection.js";

async function deleteDm(name: string) {
  const [col, client]: [Collection<Dm>, MongoClient] = await dmConnect();
  try {
    const filter = {
      $or: [{ receiverName: name }, { senderName: name }],
    };
    console.log("filet är", filter);
    const result: DeleteResult = await col.deleteMany(filter);
    if (!result.acknowledged) {
      console.log("Could not delete any Dm");
      return;
    }
    console.log(`Deleted ${result.deletedCount} Dm(s).`);
    return result;
  } catch (error) {
    console.error("Error delete Dm", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { deleteDm };

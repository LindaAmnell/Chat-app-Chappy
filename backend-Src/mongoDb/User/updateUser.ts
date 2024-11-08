import { MongoClient, Collection, ObjectId, UpdateResult } from "mongodb";
import { User } from "../../interfaces/User.js";
import { userConnect } from "../Connection/userConnection.js";

async function updateUser(index: ObjectId, body: object) {
  const [col, client]: [Collection<User>, MongoClient] = await userConnect();

  try {
    const filter = { _id: index };
    const result: UpdateResult<User> = await col.updateOne(filter, {
      $set: body,
    });

    if (!result.acknowledged) {
      console.log("Could not update the user.");
      return;
    }

    console.log(`Updated ${result.matchedCount} user(s).`);
    return result;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  } finally {
    await client.close();
  }
}

export { updateUser };

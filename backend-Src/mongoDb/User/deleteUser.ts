import { Collection, DeleteResult, MongoClient, ObjectId } from "mongodb";
import { User } from "../../interfaces/User.js";
import { userConnect } from "../Connection/userConnection.js";

async function deleteUser(id: ObjectId) {
  const [col, client]: [Collection<User>, MongoClient] = await userConnect();

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
export { deleteUser };

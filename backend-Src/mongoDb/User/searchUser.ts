import { Collection, MongoClient, WithId } from "mongodb";
import { User } from "../../interfaces/User.js";
import { connect } from "../userConnection.js";

async function searchUser(search: string): Promise<WithId<User>[]> {
  const [col, client]: [Collection<User>, MongoClient] = await connect();
  const searchterm = search
    .split(" ")
    .map((term) => term.trim())
    .filter((term) => term.length > 0);

  const userSearch = searchterm.map((term) => ({
    name: { $regex: new RegExp(term, "i") },
  }));
  const user = await col.find({ $or: userSearch }).toArray();
  if (user.length > 0) {
    console.log("Found user: ", user);
    await client.close();
    return user;
  } else {
    console.log("No users found...");
    return [];
  }
}

export { searchUser };

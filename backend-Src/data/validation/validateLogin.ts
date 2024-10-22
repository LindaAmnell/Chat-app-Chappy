import { ObjectId, WithId } from "mongodb";
import { User } from "../../interfaces/User.js";
import { getAllUser } from "../../mongoDb/User/getAllUser.js";

async function validateLogin(
  username: string,
  password: string
): Promise<ObjectId | null> {
  const user: WithId<User>[] = await getAllUser();
  const matchingUser: WithId<User> | undefined = user.find(
    (user) => user.name === username && user.password === password
  );
  if (matchingUser) {
    return matchingUser._id;
  }
  return null;
}

export { validateLogin };

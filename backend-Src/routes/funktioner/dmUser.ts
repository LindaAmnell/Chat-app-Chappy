import { Dm } from "../../interfaces/Dm.js";
import { User } from "../../interfaces/User.js";
import { getAllDms } from "../../mongoDb/Dm/getAllDms.js";
import { getAllUser } from "../../mongoDb/User/getAllUser.js";
import { ObjectId } from "mongodb";
type UserId = string;

async function getDmsForUser(username: string): Promise<Dm[]> {
  const dmList = await getAllDms();
  return dmList.filter(
    (dm) => dm.senderName === username || dm.receiverName === username
  );
}

async function getUserData(userId: UserId): Promise<User | null> {
  const userList = await getAllUser();
  const objectId = new ObjectId(userId);
  const match = userList.find((u) => u._id.equals(objectId));
  return match || null;
}

export { getDmsForUser, getUserData };

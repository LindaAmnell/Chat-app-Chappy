import { Dm } from "../../interfaces/Dm.js";
import { User } from "../../interfaces/User.js";
import { getAllDms } from "../../mongoDb/Dm/getAllDms.js";
import { getAllUser } from "../../mongoDb/User/getAllUser.js";

async function getDmsForUser(username: string): Promise<Dm[]> {
  const dmList = await getAllDms();
  return dmList.filter(
    (dm) => dm.senderName === username || dm.receiverName === username
  );
}

async function getUserData(userId: string): Promise<User | null> {
  const userList = await getAllUser();
  const match = userList.find((u) => u.name === userId);
  console.log(match);
  return match || null;
}

export { getDmsForUser, getUserData };

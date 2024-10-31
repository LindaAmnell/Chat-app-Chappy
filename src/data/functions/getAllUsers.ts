import { User } from "../../models/User";

async function getAllUser(): Promise<User[]> {
  const response: Response = await fetch("/api/user", { method: "GET" });
  const data: User[] = await response.json();
  return data;
}

export { getAllUser };

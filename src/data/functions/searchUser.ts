import { User } from "../../models/User";

interface ErrorMessage {
  message: string;
}

async function searchUser(query: string): Promise<User[] | undefined> {
  try {
    const response = await fetch(`/api/user/search?q=${query}`, {
      method: "GET",
    });
    if (!response.ok) {
      console.log("Found no user!");
    }
    const users: User[] | ErrorMessage = await response.json();

    if ("message" in users) {
      console.log("Error: ", users.message);
      return undefined;
    }

    return users;
  } catch (error) {
    console.error("Nätverksfel: ", error);
  }
}

export { searchUser };

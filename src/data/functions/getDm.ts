import { Dm } from "../../models/Dm";
import { User } from "../../models/User";

const LS_KEY = "JWT-DEMO--TOKEN";

async function getProtected() {
  const token: string = localStorage.getItem(LS_KEY) || "";
  if (!token) {
    throw new Error("No token found");
  }

  const response: Response = await fetch("/api/dm/protected", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch DMs");
  }

  const data = (await response.json()) as { userDms: Dm[]; user: User };
  console.log(data.userDms);
  console.log(data.user);
  return data;
}

export { getProtected };

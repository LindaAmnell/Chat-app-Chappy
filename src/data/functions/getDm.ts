import { Dm } from "../../models/Dm";

const LS_KEY = "JWT-DEMO--TOKEN";

// async function getDms(): Promise<Dm[]> {
//   const response: Response = await fetch("/api/dm", { method: "GET" });
//   const data = (await response.json()) as Dm[];
//   return data;
// }
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

  const data = (await response.json()) as Dm[];
  return data;
}
export { getProtected };

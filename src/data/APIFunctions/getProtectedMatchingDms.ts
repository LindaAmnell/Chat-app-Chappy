import { Dm } from "../../models/Dm";

const LS_KEY = "JWT-DEMO--TOKEN";

export async function getProtectedMatchingDms(): Promise<Dm[] | undefined> {
  const token: string = localStorage.getItem(LS_KEY) || "";
  if (!token) {
    throw new Error("No token found");
  }

  const response: Response = await fetch("/api/dm/protected", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch DMs");
  }

  const dms: Dm[] = await response.json();
  return dms;
}

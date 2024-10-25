import { useCallback } from "react";
import { getProtected } from "./apiGet.ts";
import { useStore } from "../storeHooks.ts";

const LS_KEY = "JWT-DEMO--TOKEN";

export const useFetchDms = () => {
  const { setUsername, setDmList } = useStore();

  const fetchDms = useCallback(async () => {
    console.log("fetchDms called");
    const token = localStorage.getItem(LS_KEY);
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const { userDms, user } = await getProtected();
      setUsername(user.name);
      setDmList(userDms);
    } catch (error) {
      console.error("Error fetching DMs:", error);
    }
  }, [setUsername, setDmList]);

  return fetchDms;
};

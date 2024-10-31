// import { Room } from "../../models/Room";

async function addRoom() {
  const addRoom = {
    // name: messageDm,
    // status: name,
    // image: username,
  };
  const data = addRoom;
  const response: Response = await fetch("/api/dm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status !== 201) {
    console.log("try again 3");
    return;
  }
}
export { addRoom };

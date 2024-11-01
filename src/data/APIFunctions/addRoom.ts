export type NewRoom = {
  name: string;
  image: string;
  status: boolean;
};

export const addRoom = async (newRoom: NewRoom) => {
  try {
    const response: Response = await fetch("/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRoom),
    });

    if (!response.ok) {
      throw new Error("Failed to add new room");
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error adding room:", error);
    return null;
  }
};

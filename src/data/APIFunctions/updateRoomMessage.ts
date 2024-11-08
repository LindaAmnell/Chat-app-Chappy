export const updateRoomMessages = async (
  oldName: string,
  newName: string
): Promise<void> => {
  try {
    const response = await fetch("/api/room-message/update-user-messages", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldName,
        newName,
      }),
    });
    if (response.status === 404) {
      console.log("No messages found to update.");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to update room messages");
    }
  } catch (error) {
    console.error("Error updating room messages:", error);
    throw error;
  }
};

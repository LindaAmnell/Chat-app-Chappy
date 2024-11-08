export const updateDm = async (
  oldName: string,
  newName: string
  // updateType: "sender" | "receiver"
): Promise<void> => {
  try {
    const response = await fetch("/api/dm/update-user-messages", {
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
      console.warn("No messages found to update.");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to update dm");
    }

    console.log("dm updated successfully");
  } catch (error) {
    console.error("Error updating dm:", error);
    throw error;
  }
};

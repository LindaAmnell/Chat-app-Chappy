export const deleteRoom = async (name: string) => {
  try {
    const response = await fetch(`/api/room/delete/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 204) {
    } else {
      console.error("Failed to delete room. Status code:", response.status);
    }
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

export const updateUser = async (
  data: { name?: string; image?: string },
  userId: string
) => {
  const response = await fetch(`/api/user/change-user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.error("Error updating user");
    throw new Error("Failed to update user");
  }
  if (response.status === 204) {
    return {};
  }
  try {
    return await response.json();
  } catch (err) {
    console.error("Error parsing JSON response:", err);
    return {};
  }
};

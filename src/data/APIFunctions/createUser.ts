export type NewUser = {
  name: string;
  password: string;
  image: string;
};

export const createUser = async (newUser: NewUser) => {
  try {
    const response: Response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to creat new user");
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export type NewUser = {
  name: string;
  password: string;
  image: string;
};

export const createUser = async (newUser: NewUser) => {
  const response: Response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (response.status !== 201) {
    return response;
  }
  return response;
};

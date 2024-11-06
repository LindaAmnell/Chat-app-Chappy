export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 201) {
      return response;
    }
  } catch (error) {
    console.log("try again later", error);
  }
};

export const deleteRoomMassage = async (name: string) => {
  try {
    const data = { name };
    const deleteResponse = await fetch(`/api/room-message/delete-message`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (deleteResponse.status !== 204) {
      return deleteResponse;
    }
  } catch (error) {
    console.log("try again later", error);
  }
};

export const deleteDmMassage = async (name: string) => {
  try {
    const data = { name };
    const deleteResponse = await fetch(`/api/dm/delete-dm`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (deleteResponse.status !== 204) {
      return deleteResponse;
    }
  } catch (error) {
    console.log("try again later", error);
  }
};

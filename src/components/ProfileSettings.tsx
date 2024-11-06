import { useEffect, useState } from "react";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { searchUser } from "../data/APIFunctions/searchUser.ts";
import { useStore } from "../data/storeHooks.ts";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  deleteDmMassage,
  deleteRoomMassage,
  deleteUser,
} from "../data/APIFunctions/deleteUser.ts";
import { useNavigate } from "react-router-dom";
const LS_KEY = "JWT-DEMO--TOKEN";

const ProfileSettings = () => {
  const { user, setUser, toggleProfileSettings, setUsername, setUserImage } =
    useStore();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handelUser = async () => {
    const activeUserName = await getActiveUser();
    if (activeUserName) {
      const searchUserinfo = await searchUser(activeUserName);
      const matchedUser = searchUserinfo?.find(
        (user) => user.name === activeUserName
      );
      if (matchedUser) {
        setUser(matchedUser);
      } else {
        console.log("No matched user found.");
      }
    }
  };
  const handleClose = () => {
    toggleProfileSettings(false);
  };
  function handleLogout() {
    localStorage.removeItem(LS_KEY);
    setUserImage("");
    setUsername("");
    navigate("/");
    toggleProfileSettings(false);
  }
  const handleDelete = async () => {
    if (user && user._id) {
      await deleteRoomMassage(user.name);
      await deleteDmMassage(user.name);
      handleLogout();
      const deleteResponse = await deleteUser(user._id);
      if (deleteResponse?.status === 204) {
        console.log("User and associated messages deleted successfully.");
        setUser(null);
      } else {
        console.log("Failed to delete user or messages.");
      }
    } else {
      console.log("No user ID found for deletion.");
    }
  };

  useEffect(() => {
    handelUser();
  }, []);

  return (
    <section className="profile-section">
      <IoMdCloseCircleOutline onClick={handleClose} className="close" />
      <h3>Settings</h3>
      <div>
        <div className="profile-info">
          <p>{user?.name}</p>
          <img className="profile-image" src={user?.image} alt="" />
        </div>
        <label>Name</label>
        <input type="text" placeholder={user?.name} />

        <label>Image</label>
        <input placeholder={user?.image} type="text" />
      </div>
      <button>Save Changes</button>
      <button onClick={() => setIsDeleting(true)}>Delete</button>
      {isDeleting && (
        <div className="delet-section">
          <h3>Warning</h3>
          <p>Are you sure you want to delete your account?</p>
          <p>Deleting your account cannot be undone!</p>
          <div className="delete-btns">
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </section>
  );
};

export { ProfileSettings };

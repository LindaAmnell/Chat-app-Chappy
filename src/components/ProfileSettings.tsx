import "../css/header.css";
import { useEffect, useState } from "react";
import { getActiveUser } from "../data/APIFunctions/getActiveUser.ts";
import { searchUser } from "../data/APIFunctions/searchUser.ts";
import { useStore } from "../data/storeHooks.ts";
import { updateUser } from "../data/APIFunctions/updateUser.ts";
import { updateRoomMessages } from "../data/APIFunctions/updateRoomMessage.ts";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  deleteDmMassage,
  deleteRoomMassage,
  deleteUser,
} from "../data/APIFunctions/deleteUser.ts";
import { useNavigate } from "react-router-dom";
import { updateDm } from "../data/APIFunctions/updatedDm.ts";
const LS_KEY = "JWT-DEMO--TOKEN";

interface Prop {
  handleUsers: () => void;
}

const ProfileSettings = ({ handleUsers }: Prop) => {
  const { user, setUser, toggleProfileSettings, setUsername, setUserImage } =
    useStore();

  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [userError, setUserError] = useState("");
  const [usernameNotavailableError, setUsernameNotavailableError] =
    useState("");

  const handelUser = async () => {
    const activeUserName = await getActiveUser();
    if (activeUserName) {
      const users = await searchUser(activeUserName);
      if (users && users.length > 0) {
        setUser(users[0]);
      }
    }
  };
  interface UpdatedUserData {
    name?: string;
    image?: string;
  }
  const saveChange = async () => {
    const updatedUserData: UpdatedUserData = {};
    if (updatedName) updatedUserData.name = updatedName;
    if (updatedImage) updatedUserData.image = updatedImage;
    setUserError("");
    setUsernameNotavailableError("");

    if (updatedName && user?._id) {
      const id = user._id;
      if (updatedName.length > 14) {
        setUserError("Username must be 14 characters or less.");
        return;
      }
      if (updatedName.length < 4) {
        setUserError("Username must be at least 4 characters.");
        return;
      }
      try {
        const response = await updateUser(updatedUserData, id);

        if (response?.status === 409) {
          console.log("fel");
          const errorData = await response.json();
          setUsernameNotavailableError(
            errorData.message || "Username unavailable"
          );
          return;
        }
        if (response?.token) {
          localStorage.setItem(LS_KEY, response.token);
        }
        if (updatedName !== user.name) {
          await updateDm(user.name, updatedName);
          await updateRoomMessages(user.name, updatedName);
        }
        if (updatedImage === "") {
          setUser({ ...user, name: updatedName });
        } else {
          setUser({ ...user, image: updatedImage, name: updatedName });
          setUpdatedName("");
        }
        handleUsers();
      } catch (error) {
        console.error("Failed to save changes:", error);
        setUsernameNotavailableError("Username unavailable");
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
        setUser(null);
      } else {
      }
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setUpdatedName(newName);
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
          <img className="profile-image" src={user?.image} alt="Profile" />
        </div>
        <form className="input-div">
          {usernameNotavailableError && (
            <span className="error-msg">{usernameNotavailableError} </span>
          )}
          {userError && <span className="error-msg">{userError} </span>}
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            value={updatedName}
            onChange={(e) => handleNameChange(e)}
            autoComplete="name"
            placeholder={user?.name}
          />
          <label htmlFor="Image">Image</label>
          <input
            id="Image"
            type="text"
            value={updatedImage}
            onChange={(e) => setUpdatedImage(e.target.value)}
            autoComplete="url"
            placeholder={user?.image}
          />
        </form>
      </div>
      <div className="btn-div">
        <button onClick={saveChange}>Save Changes</button>
        <button onClick={() => setIsDeleting(true)}>Delete</button>
        <button onClick={handleLogout} className="sign-out-btn">
          Sign Out
        </button>
      </div>
      {isDeleting && (
        <div className="delete-section">
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

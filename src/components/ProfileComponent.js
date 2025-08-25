import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ChangePasswordComponent from "./ChangePassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingView from "../services/loaderView";
import mainUrl from "../utils/mainUrl";

const ProfileComponent = ({ user }) => {
  const [profileData, setProfileData] = useState({});
  const [editing, setEditing] = useState(false);
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const url = `${mainUrl}/profile/${user}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response.ok) {
          const { profile } = await response.json();
          setProfileData(profile);
        } else {
          const { message } = await response.json();
          toast.error(message);
        }
      } catch (error) {
        toast.error("Failed to fetch profile data");
      }
    };

    getProfileData();
  }, [user, jwtToken]);

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = `${mainUrl}/profile/${user}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        setEditing(false);
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (!profileData) {
    return <LoadingView />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer />
      <form className="bg-white rounded-lg shadow-lg p-7 mb-4 w-[390px] max-w-[400px]">
        <h1 className="text-2xl font-semibold mb-4 text-blue-600">Profile</h1>

        <div className="mb-3">
          <p>
            <span className="font-bold">UserID:</span> {profileData.userId}
          </p>
        </div>

        <div className="mb-3">
          <p>
            <span className="font-bold">Name:</span>{" "}
            {editing ? (
              <input
                type="text"
                className="border-2 p-2"
                value={profileData.username}
                onChange={(e) =>
                  handleProfileChange("username", e.target.value)
                }
              />
            ) : (
              profileData.username
            )}
          </p>
        </div>

        <div className="mb-3">
          <p>
            <span className="font-bold">Email:</span>{" "}
            {editing ? (
              <input
                type="text"
                className="border-2 p-2"
                value={profileData.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
              />
            ) : (
              profileData.email
            )}
          </p>
        </div>

        <div className="mb-3">
          <p>
            <span className="font-bold">Phone No:</span>{" "}
            {editing ? (
              <input
                type="text"
                className="border-2 p-2"
                value={profileData.contactNumber}
                onChange={(e) =>
                  handleProfileChange("contactNumber", e.target.value)
                }
              />
            ) : (
              profileData.contactNumber
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={editing ? handleSubmit : () => setEditing(true)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {editing ? "Save" : "Edit"}
        </button>
      </form>

      <ChangePasswordComponent user={user} />
    </main>
  );
};

export default ProfileComponent;

{
  /* <div className="grid gap-10 md:grid-cols-2">
  <div className="flex flex-col m-4">
    <h2 className="text-lg font-medium mb-5">
      <span className="font-bold">User ID :</span> {profileData.userId}
    </h2>
    <h2 className="text-lg font-medium flex mb-5">
      <span className="font-bold">Name : </span>
      {editing ? (
        <input
          type="text"
          value={profileData.username || ""}
          onChange={(e) => handleProfileChange("username", e.target.value)}
          className="border border-gray-300 p-2 rounded w-full ml-4"
        />
      ) : (
        <p className="ml-3">{profileData.username}</p>
      )}
    </h2>
    <h2 className="text-lg font-medium flex mb-5">
      <span className="font-bold">Email:</span>
      {editing ? (
        <input
          type="email"
          value={profileData.email || ""}
          onChange={(e) => handleProfileChange("email", e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ) : (
        <p>{profileData.email}</p>
      )}
    </h2>
    <h2 className="text-lg font-medium flex mb-5">
      <span className="font-bold">Mobile:</span>
      {editing ? (
        <input
          type="text"
          value={profileData.contactNumber || ""}
          onChange={(e) => handleProfileChange("contactNumber", e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      ) : (
        <p>{profileData.contactNumber}</p>
      )}
    </h2>
  </div>
</div>; */
}

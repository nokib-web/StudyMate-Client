import React, { useEffect, useState } from "react";
import { FaEnvelope, FaUserEdit } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [profile, setProfile] = useState({});
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile from MongoDB
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setUpdatedProfile(res.data);
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [user, axiosInstance]);

  // Update Firebase & MongoDB
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Update Firebase (for Auth user)
      await updateProfile(auth.currentUser, {
        displayName: updatedProfile.name,
        photoURL: updatedProfile.image,
      });

      //  Update MongoDB record
      const res = await axiosInstance.put(`/users/${user.email}`, updatedProfile);

      if (res.status === 200) {
        setProfile(updatedProfile);
        setEditing(false);
        setMessage("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center px-4 py-10">
      <div className="card  backdrop-blur-md shadow-2xl r w-full max-w-md rounded-3xl">
        <div className="card-body items-center text-center">
          {/* Profile Image */}
          <img
            src={
              profile.image ||
              user?.photoURL ||
              "https://i.ibb.co/2n9fFxx/default-avatar.png"
            }
            alt="Profile"
            className="w-28 h-28 border-primary border-my-text-primary rounded-full border-2 shadow-md object-cover"
          />

          {!editing ? (
            <>
              <h2 className="text-2xl font-semibold mt-4 my-text-primary">
                {profile.name || user?.displayName || "Unnamed User"}
              </h2>
              <p className="text-gray-600 mt-1 flex items-center justify-center gap-2">
                <FaEnvelope className="my-text-secondary" />{" "}
                {profile.email || user?.email}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="btn my-btn-primary mt-6 flex items-center gap-2 shadow-md hover:shadow-lg transition duration-200"
              >
                <FaUserEdit /> Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="w-full mt-4 space-y-4 text-left">
              <div>
                <label className="label font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updatedProfile.name || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="label font-medium text-gray-700">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={updatedProfile.image || ""}
                  onChange={(e) =>
                    setUpdatedProfile({
                      ...updatedProfile,
                      image: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn my-btn-primary flex-1">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn my-btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {message && (
            <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
 // your Firebase auth context
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const MyConnections = () => {
  const axiosSecure = useAxiosSecure(); // includes Firebase token in headers
  const { user, loading: userLoading } = useAuth(); // get current Firebase user
  const [connections, setConnections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch user’s sent partner requests
  useEffect(() => {
    if (!userLoading && user?.email) {
      axiosSecure
        .get(`/connections/${user.email}`)
        .then((res) => setConnections(res.data))
        .catch((err) => console.error("Fetch connections error:", err));
    }
  }, [user, userLoading, axiosSecure]);

  // ✅ Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This connection will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/connections/${id}`)
          .then(() => {
            setConnections((prev) => prev.filter((conn) => conn._id !== id));
            Swal.fire("Deleted!", "Connection removed successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete connection.", "error");
          });
      }
    });
  };

  // ✅ Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const updatedData = {
      subject: form.subject.value,
      studyMode: form.studyMode.value,
    };

    axiosSecure
      .put(`/connections/${selected._id}`, updatedData)
      .then(() => {
        setConnections((prev) =>
          prev.map((conn) =>
            conn._id === selected._id ? { ...conn, ...updatedData } : conn
          )
        );
        Swal.fire("Updated!", "Connection updated successfully.", "success");
        setSelected(null);
      })
      .catch(() => Swal.fire("Error!", "Failed to update connection.", "error"))
      .finally(() => setLoading(false));
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">My Connections</h2>

      {/* Connections Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Profile</th>
              <th>Subject</th>
              <th>Study Mode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn) => (
              <tr key={conn._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={conn.profileImage}
                    alt={conn.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>{conn.name}</span>
                </td>
                <td>{conn.subject}</td>
                <td>{conn.studyMode}</td>
                <td>
                  <button
                    onClick={() => setSelected(conn)}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(conn._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Update Modal */}
      {selected && (
        <dialog id="updateModal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Connection</h3>
            <form onSubmit={handleUpdate}>
              <label className="block mb-3">
                Subject:
                <input
                  name="subject"
                  defaultValue={selected.subject}
                  className="input input-bordered w-full mt-1"
                />
              </label>

              <label className="block mb-3">
                Study Mode:
                <select
                  name="studyMode"
                  defaultValue={selected.studyMode}
                  className="select select-bordered w-full"
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </label>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyConnections;

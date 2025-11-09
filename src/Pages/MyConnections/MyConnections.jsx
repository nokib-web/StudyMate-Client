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
                .get(`/connections?email=${user.email}`)
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
                        setConnections((prev) => prev.filter((connection) => connection._id !== id));
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
                    prev.map((connection) =>
                        connection._id === selected._id ? { ...connection, ...updatedData } : connection
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

    console.log(connections);

   return (
  <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-base-100">
    <h2 className="text-3xl font-extrabold mb-8 text-center text-primary">
      My Connections
    </h2>

    {/* ✅ Desktop / Laptop Table View */}
    <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md">
      <table className="table w-full text-sm lg:text-base">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th className="py-3">Profile</th>
            <th className="py-3">Subject</th>
            <th className="py-3">Study Mode</th>
            <th className="py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr
              key={connection._id}
              className="hover:bg-base-300 transition-colors duration-200"
            >
              <td className="flex items-center gap-4 py-3">
                <img
                  src={connection?.profileimage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt={connection.name}
                  className="w-12 h-12 rounded-full object-cover border border-base-300"
                />
                <span className="font-semibold">{connection.partnerName}</span>
              </td>
              <td className="font-medium">{connection.subject}</td>
              <td>{connection.studyMode}</td>
              <td className="text-center space-x-2">
                <button
                  onClick={() => setSelected(connection)}
                  className="btn btn-sm btn-outline btn-primary hover:scale-105 transition-transform"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(connection._id)}
                  className="btn btn-sm btn-error text-white hover:scale-105 transition-transform"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ✅ Mobile & Tablet Card View */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:hidden mt-4">
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl"
        >
          <div className="card-body">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={connection?.profileimage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt={connection.name}
                className="w-14 h-14 rounded-full border border-base-300 object-cover"
              />
              <div>
                <h3 className="font-bold text-lg text-base-content">
                  {connection.partnerName}
                </h3>
                
              </div>
            </div>

            <div className=" text-sm text-base-content/80 mb-4">
                <p className="text-sm text-base-content/70"><span className="font-semibold"> Subject: </span>{connection.subject}</p>
              <span className="font-semibold">Study Mode:</span>
              <span>{connection.studyMode}</span>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(connection)}
                className="btn btn-xs btn-outline btn-primary"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(connection._id)}
                className="btn btn-xs btn-error text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ✅ Update Modal */}
    {selected && (
      <dialog id="updateModal" open className="modal">
        <div className="modal-box rounded-2xl">
          <h3 className="font-bold text-xl mb-4 text-center text-primary">
            Update Connection
          </h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Subject:</span>
              <input
                name="subject"
                defaultValue={selected.subject}
                className="input input-bordered w-full mt-1"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Study Mode:</span>
              <select
                name="studyMode"
                defaultValue={selected.studyMode}
                className="select select-bordered w-full mt-1"
              >
                <option>Online</option>
                <option>Offline</option>
              </select>
            </label>

            <div className="modal-action justify-center">
              <button
                type="submit"
                className="btn btn-primary min-w-24"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="btn btn-outline"
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

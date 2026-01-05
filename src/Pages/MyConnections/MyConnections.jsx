import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaUserEdit, FaTrash, FaDesktop, FaUsers, FaBookReader } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyConnections = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: userLoading } = useAuth();
  const [connections, setConnections] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    if (!userLoading && user?.email) {
      setFetchingData(true);
      axiosSecure
        .get(`/connections?email=${user.email}`)
        .then((res) => {
          setConnections(res.data);
          setFetchingData(false);
        })
        .catch((err) => {
          console.error("Fetch connections error:", err);
          setFetchingData(false);
        });
    }
  }, [user, userLoading, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Break Connection?",
      text: "This will remove your link with this study partner.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, break link",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/connections/${id}`)
          .then(() => {
            setConnections((prev) => prev.filter((connection) => connection._id !== id));
            Swal.fire("Success", "Connection removed.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to remove connection.", "error");
          });
      }
    });
  };

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
        Swal.fire("Updated", "Your preferences have been saved.", "success");
        setSelected(null);
      })
      .catch(() => Swal.fire("Error", "Update failed.", "error"))
      .finally(() => setLoading(false));
  };

  if (userLoading || fetchingData) return <LoadingSpinner message="Curating your network..." />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">My Connections</h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Manage your active learning networks and study modes.</p>
        </div>
        <div className="px-5 py-2.5 bg-primary/10 text-primary rounded-2xl flex items-center gap-2">
          <FaUsers />
          <span className="text-sm font-black uppercase tracking-widest">{connections.length} Active Links</span>
        </div>
      </div>

      {connections.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200">
            <FaUsers size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No connections yet</h3>
          <p className="text-gray-500 mt-2">Start exploring partners to build your study network.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Study Partner</th>
                    <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Focus Area</th>
                    <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none text-center">Modality</th>
                    <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {connections.map((connection) => (
                    <tr key={connection._id} className="group hover:bg-gray-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-2xl ring-1 ring-gray-100 group-hover:ring-primary/20 transition-all overflow-hidden shadow-sm">
                              <img
                                src={connection?.profileImage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                                alt={connection.partnerName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{connection.partnerName}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-tighter rounded-xl flex items-center gap-2 w-fit">
                          <FaBookReader size={10} /> {connection.subject}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center px-8">
                        <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-tighter rounded-xl ring-1 flex items-center gap-2 mx-auto w-fit ${connection.studyMode === 'Online' ? 'bg-blue-50 text-blue-600 ring-blue-100' : 'bg-orange-50 text-orange-600 ring-orange-100'}`}>
                          <FaDesktop size={10} /> {connection.studyMode}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setSelected(connection)}
                            className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
                          >
                            <FaUserEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(connection._id)}
                            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.map((connection) => (
              <div key={connection._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-14 h-14 rounded-2xl shadow-sm overflow-hidden border border-gray-50">
                        <img
                          src={connection?.profileImage || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                          alt={connection.partnerName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 leading-tight">{connection.partnerName}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{connection.studyMode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSelected(connection)} className="p-2 text-primary">
                      <FaUserEdit size={14} />
                    </button>
                    <button onClick={() => handleDelete(connection._id)} className="p-2 text-red-400">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Subject</span>
                  <span className="text-xs font-bold text-gray-700">{connection.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/*  Update Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Update Connection</h3>
              <p className="text-sm text-gray-500 font-medium">Refine your study preferences</p>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Study Subject</label>
                <input
                  name="subject"
                  defaultValue={selected.subject}
                  className="input input-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-200"
                  placeholder="Enter subject..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Meeting Modality</label>
                <select
                  name="studyMode"
                  defaultValue={selected.studyMode}
                  className="select select-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-200"
                >
                  <option value="Online">Online Sessions</option>
                  <option value="Offline">In-Person Meetings</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex-1 btn btn-ghost rounded-2xl font-bold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn btn-primary rounded-2xl font-bold shadow-lg shadow-primary/20"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConnections;

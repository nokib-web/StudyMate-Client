import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield, FaUserGraduate } from "react-icons/fa";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all');
            return res.data;
        }
    });

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to delete ${user.name}. This cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Assuming delete endpoint exists or will be added
                    // For now, let's assume it's /users/:id
                    // await axiosSecure.delete(`/users/${user._id}`);
                    Swal.fire("Note", "Delete functionality is being prepared.", "info");
                } catch (err) {
                    Swal.fire("Error", "Failed to delete user", "error");
                }
            }
        });
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'admin' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Role Updated",
                        text: `${user.name} is now an Admin!`,
                        timer: 1500
                    });
                }
            })
    }

    const handleMakeTutor = (user) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'tutor' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Role Updated",
                        text: `${user.name} is now a Tutor!`,
                        timer: 1500
                    });
                }
            })
    }

    if (isLoading) return <LoadingSpinner message="Loading user directory..." />;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">User Directory</h2>
                    <p className="text-gray-500 text-sm font-medium">Manage and review all registered students and admins.</p>
                </div>
                <div className="px-5 py-2.5 bg-primary/10 text-primary rounded-2xl flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm font-black uppercase tracking-widest">{users.length} Users Found</span>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">User Info</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Email Address</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Access Level</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none text-center">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar placeholder">
                                                <div className="bg-gray-100 text-gray-400 rounded-2xl w-12 h-12 ring-1 ring-gray-100 group-hover:ring-primary/20 transition-all">
                                                    <span className="text-lg font-bold">{user.name[0]}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">{user.name}</span>
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="text-sm text-gray-600 font-medium">{user.email}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-wrap gap-2">
                                            {user.role === 'admin' ? (
                                                <span className="px-4 py-1.5 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-tighter rounded-xl ring-1 ring-orange-200 flex items-center gap-2">
                                                    <FaUserShield /> Admin
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-ghost btn-xs bg-orange-50/30 text-orange-600 hover:bg-orange-100 border-none rounded-xl px-4 capitalize font-bold text-[10px]">
                                                    Make Admin
                                                </button>
                                            )}
                                            {user.role === 'tutor' ? (
                                                <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-tighter rounded-xl ring-1 ring-green-200 flex items-center gap-2">
                                                    <FaUserGraduate /> Tutor
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeTutor(user)}
                                                    className="btn btn-ghost btn-xs bg-green-50/30 text-green-600 hover:bg-green-100 border-none rounded-xl px-4 capitalize font-bold text-[10px]">
                                                    Make Tutor
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                    <div key={user._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="avatar placeholder">
                                    <div className="bg-gray-100 text-gray-400 rounded-xl w-10 h-10">
                                        <span className="text-sm font-bold">{user.name[0]}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-gray-900 leading-tight">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-2 text-gray-300 hover:text-red-500"
                            >
                                <FaTrashAlt size={14} />
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                            {user.role === 'admin' ? (
                                <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-tighter rounded-lg ring-1 ring-orange-200">Admin</span>
                            ) : (
                                <button onClick={() => handleMakeAdmin(user)} className="text-[10px] font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">Make Admin</button>
                            )}
                            {user.role === 'tutor' ? (
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-tighter rounded-lg ring-1 ring-green-200">Tutor</span>
                            ) : (
                                <button onClick={() => handleMakeTutor(user)} className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Make Tutor</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;

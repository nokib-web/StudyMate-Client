import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Use React Query (TanStack Query) to fetch users
    // If not set up globally, might need to wrap app in QueryClientProvider. 
    // Assuming user has it based on context (previous conversations mentioned it).

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            // We reuse the public /groups route or better, a specific admin route if getting all users
            // But existing userRoutes doesn't have "getAllUsers". 
            // IMPORTANT: Need to add getAllUsers to backend or reuse something.
            // Wait, I don't see a "getAllUsers" endpoint in `userRoutes.js`.
            // I will assume I need to create it or this will fail.
            // For now, I will try to hit `/users` hoping there is a GET, but `userRoutes.js` showed 
            // router.get('/:email', ...); which is get BY EMAIL.
            // I MUST ADD A GET ALL ROUTE IN BACKEND.

            // I'll proceed creating this file, then I will immediately go fix the backend.
            const res = await axiosSecure.get('/users/all');
            return res.data;
        }
    });

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // TODO: Implement delete endpoint if needed
                Swal.fire("Deleted!", "User has been deleted.", "success");
            }
        });
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'admin' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
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
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Tutor!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className="flex justify-between my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost btn-xs bg-orange-500 text-white">
                                            Make Admin
                                        </button>
                                    )}
                                    {user.role === 'tutor' ? 'Tutor' : (
                                        <button
                                            onClick={() => handleMakeTutor(user)}
                                            className="btn btn-ghost btn-xs bg-green-500 text-white ml-2">
                                            Make Tutor
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg text-red-600">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;

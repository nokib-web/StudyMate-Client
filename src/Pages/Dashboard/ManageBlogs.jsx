import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axiosInstance.get('/blogs');
            setBlogs(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setLoading(false);
            Swal.fire('Error', 'Failed to load blogs', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/blogs/${id}`);
                    setBlogs(blogs.filter(blog => blog._id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete blog.', 'error');
                }
            }
        });
    };

    if (loading) return <LoadingSpinner message="Loading Blogs..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-heading font-bold">Manage Blogs</h2>
                <Link to="/dashboard/add-blog" className="btn btn-primary btn-sm gap-2">
                    <FaPlus /> Add New Blog
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No blogs found.</td>
                            </tr>
                        ) : (
                            blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={blog.image} alt={blog.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-bold">{blog.title}</td>
                                    <td><span className="badge badge-ghost badge-sm">{blog.category}</span></td>
                                    <td>{blog.author}</td>
                                    <td className="flex gap-2">
                                        <Link to={`/dashboard/edit-blog/${blog._id}`} className="btn btn-ghost btn-xs text-info">
                                            <FaEdit size={16} />
                                        </Link>
                                        <button onClick={() => handleDelete(blog._id)} className="btn btn-ghost btn-xs text-error">
                                            <FaTrash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;

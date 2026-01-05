import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaTag, FaUserEdit } from 'react-icons/fa';
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
            title: 'Delete Publication?',
            text: "This action cannot be undone and will remove the content permanently.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Yes, delete it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosInstance.delete(`/blogs/${id}`);
                    setBlogs(blogs.filter(blog => blog._id !== id));
                    Swal.fire('Removed', 'The article has been successfully deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete blog.', 'error');
                }
            }
        });
    };

    if (loading) return <LoadingSpinner message="Loading Editorial Hub..." />;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Editorial Hub</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">Manage and curate your educational publications.</p>
                </div>
                <Link to="/dashboard/add-blog" className="btn btn-primary rounded-2xl px-8 gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto">
                    <FaPlus />
                    <span className="font-bold">New Publication</span>
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Article Details</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Taxonomy</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none">Author</th>
                                <th className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-8 py-5 border-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-24">
                                        <div className="flex flex-col items-center gap-4 opacity-10">
                                            <FaPlus size={60} />
                                            <p className="font-black uppercase tracking-widest text-sm">No Publications Yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="group hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-100 group-hover:ring-primary/20 transition-all shrink-0">
                                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{blog.title}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                                                        <FaCalendarAlt size={10} /> {new Date(blog.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-4 py-1.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-tighter rounded-xl ring-1 ring-primary/10 flex items-center gap-2 w-fit">
                                                <FaTag size={10} /> {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                    {blog.author[0]}
                                                </div>
                                                <span className="font-bold text-gray-600 text-sm">{blog.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/dashboard/edit-blog/${blog._id}`} className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all">
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(blog._id)} className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Tablet Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4 group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase text-primary tracking-widest shadow-sm">
                                {blog.category}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-black text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-1">{blog.title}</h3>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{blog.author}</span>
                                <div className="flex items-center gap-2">
                                    <Link to={`/dashboard/edit-blog/${blog._id}`} className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-all">
                                        <FaEdit size={14} />
                                    </Link>
                                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBlogs;

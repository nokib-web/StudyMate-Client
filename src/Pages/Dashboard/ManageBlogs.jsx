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
            const data = res.data.blogs || res.data;
            setBlogs(Array.isArray(data) ? data : []);
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-base-100 p-6 md:p-8 rounded-3xl border border-base-300 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">Editorial Hub</h2>
                    <p className="opacity-60 text-sm font-medium mt-1 text-base-content">Manage and curate your educational publications.</p>
                </div>
                <Link to="/dashboard/add-blog" className="btn btn-primary rounded-2xl px-8 gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto">
                    <FaPlus />
                    <span className="font-bold">New Publication</span>
                </Link>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="text-[11px] font-bold opacity-40 uppercase tracking-widest px-8 py-5 border-none text-base-content">Article Details</th>
                                <th className="text-[11px] font-bold opacity-40 uppercase tracking-widest px-8 py-5 border-none text-base-content">Taxonomy</th>
                                <th className="text-[11px] font-bold opacity-40 uppercase tracking-widest px-8 py-5 border-none text-base-content">Author</th>
                                <th className="text-[11px] font-bold opacity-40 uppercase tracking-widest px-8 py-5 border-none text-right text-base-content">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-24">
                                        <div className="flex flex-col items-center gap-4 opacity-10 text-base-content">
                                            <FaPlus size={60} />
                                            <p className="font-black uppercase tracking-widest text-sm">No Publications Yet</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="group hover:bg-base-200 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-base-200 group-hover:ring-primary/20 transition-all shrink-0">
                                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-base-content group-hover:text-primary transition-colors line-clamp-1">{blog.title}</span>
                                                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest flex items-center gap-1 mt-1 text-base-content">
                                                        <FaCalendarAlt size={10} /> {new Date(blog.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-tighter rounded-xl border border-primary/20 flex items-center gap-2 w-fit">
                                                <FaTag size={10} /> {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-base-200 flex items-center justify-center text-[10px] font-bold text-base-content opacity-50">
                                                    {blog.author[0]}
                                                </div>
                                                <span className="font-bold opacity-70 text-sm text-base-content">{blog.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/dashboard/edit-blog/${blog._id}`} className="p-2.5 opacity-30 hover:opacity-100 hover:text-primary hover:bg-primary/10 rounded-2xl transition-all text-base-content">
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(blog._id)} className="p-2.5 opacity-30 hover:opacity-100 hover:text-error hover:bg-error/10 rounded-2xl transition-all text-base-content">
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
                    <div key={blog._id} className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-4 group">
                        <div className="aspect-video rounded-2xl overflow-hidden relative">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-base-100/90 backdrop-blur-md rounded-lg text-[9px] font-black uppercase text-primary tracking-widest shadow-sm border border-base-300/50">
                                {blog.category}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-black text-base-content leading-tight group-hover:text-primary transition-colors line-clamp-1">{blog.title}</h3>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest text-base-content">{blog.author}</span>
                                <div className="flex items-center gap-2">
                                    <Link to={`/dashboard/edit-blog/${blog._id}`} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all">
                                        <FaEdit size={14} />
                                    </Link>
                                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-error opacity-50 hover:opacity-100 hover:bg-error/10 rounded-lg transition-all">
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

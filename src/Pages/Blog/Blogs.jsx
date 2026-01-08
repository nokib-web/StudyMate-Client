import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/blogs')
            .then(res => {
                const data = res.data.blogs || res.data;
                setBlogs(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blogs", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-50 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-heading font-bold text-gray-800 mb-4">StudyMate Blog</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover tips, strategies, and insights to enhance your learning journey and make the most out of your study sessions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.length > 0 ? blogs.map(blog => (
                        <div key={blog._id} className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate(`/blogs/${blog._id}`)}>
                            <figure className="relative h-56 overflow-hidden">
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 badge badge-primary p-3 rounded-md text-white font-semibold shadow-sm">
                                    {blog.category || "Education"}
                                </div>
                            </figure>
                            <div className="card-body p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    {blog.author && <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>}
                                </div>
                                <h3 className="card-title text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-3 text-sm mt-2">{blog.excerpt || blog.content?.substring(0, 100) + "..."}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="text-primary font-bold hover:underline flex items-center gap-1 text-sm">
                                        Read Full Article <FaArrowRight className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-20">
                            <h3 className="text-xl font-bold text-gray-600">No articles found.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;

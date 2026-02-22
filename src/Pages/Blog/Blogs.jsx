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
        <div className="min-h-screen bg-base-200 py-16">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Knowledge Base</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">StudyMate Blog</h1>
                    <p className="text-lg opacity-70 font-medium leading-relaxed">
                        Discover tips, strategies, and insights to enhance your learning journey and make the most out of your study sessions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.length > 0 ? blogs.map(blog => (
                        <div key={blog._id} className="group bg-base-100 border border-base-300 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 cursor-pointer p-3 flex flex-col" onClick={() => navigate(`/blogs/${blog._id}`)}>
                            <figure className="relative h-64 overflow-hidden rounded-[2.5rem]">
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 badge bg-white/90 backdrop-blur-md border-none text-gray-900 text-[10px] font-black uppercase tracking-widest px-4 py-3 h-auto">
                                    {blog.category || "Education"}
                                </div>
                            </figure>
                            <div className="p-8 pb-10 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-[10px] font-black opacity-50 uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1.5"><FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    {blog.author && <span className="flex items-center gap-1.5"><FaUser /> {blog.author}</span>}
                                </div>
                                <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4">
                                    {blog.title}
                                </h3>
                                <p className="opacity-70 line-clamp-3 font-medium text-sm leading-relaxed mb-8 flex-1">
                                    {blog.excerpt || blog.content?.substring(0, 150) + "..."}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    Read Article <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-32 bg-base-100 rounded-[3rem] border border-dashed border-base-300">
                            <h3 className="text-2xl font-black text-base-content opacity-30 uppercase tracking-widest">No articles found.</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blogs;

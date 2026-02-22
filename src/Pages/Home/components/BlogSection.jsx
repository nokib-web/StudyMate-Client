import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { useNavigate } from 'react-router';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.get('/blogs')
            .then(res => {
                const data = res.data.blogs || res.data;
                setBlogs(Array.isArray(data) ? data.slice(0, 3) : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blogs for home section", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="py-24 bg-base-100 flex justify-center">
                <span className="loading loading-spinner loading-lg text-primary/40"></span>
            </div>
        );
    }

    if (blogs.length === 0) return null;

    return (
        <div className="py-24 bg-base-100 border-y border-base-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl space-y-3">
                        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Industry Insights</div>
                        <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Latest from our Blog</h2>
                        <p className="text-lg opacity-70 font-medium">Insights, advice, and stories to help you learn better together.</p>
                    </div>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="btn btn-primary btn-outline rounded-xl px-8 hover:scale-105 transition-all group"
                    >
                        View All Articles
                        <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="group bg-base-100 border border-base-300 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 cursor-pointer p-3"
                            onClick={() => navigate(`/blogs/${blog._id}`)}
                        >
                            <div className="relative h-64 overflow-hidden rounded-[2.5rem]">
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 badge bg-base-100/90 backdrop-blur-md border-none text-base-content text-[10px] font-black uppercase tracking-widest px-4 py-3 h-auto shadow-sm">
                                    {blog.category || "Education"}
                                </div>
                            </div>
                            <div className="p-8 pb-10">
                                <span className="text-[10px] font-black opacity-50 uppercase tracking-widest mb-4 block">
                                    {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                                <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-4">
                                    {blog.title}
                                </h3>
                                <p className="opacity-70 line-clamp-2 font-medium text-sm leading-relaxed mb-8">
                                    {blog.excerpt || blog.content?.substring(0, 100) + "..."}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                                    Read Article <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default BlogSection;

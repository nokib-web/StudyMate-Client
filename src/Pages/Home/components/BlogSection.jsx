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
                setBlogs(res.data.slice(0, 3)); // Only show top 3
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blogs for home section", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return <div className="py-24 bg-base-100 flex justify-center"><span className="loading loading-spinner text-primary"></span></div>;
    }

    if (blogs.length === 0) return null; // Don't show section if no blogs

    return (
        <div className="py-24 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-heading font-bold mb-4">Latest from Our Blog</h2>
                        <p className="text-lg text-gray-600">Insights and advice to help you learn better</p>
                    </div>
                    <button onClick={() => navigate('/blogs')} className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white mt-4 md:mt-0 transition-colors">
                        View All Articles <FaArrowRight className="ml-2" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate(`/blogs/${blog._id}`)}>
                            <figure className="relative h-64 overflow-hidden">
                                <img
                                    src={blog.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 badge badge-primary p-3 rounded-md text-white font-semibold">
                                    {blog.category || "Education"}
                                </div>
                            </figure>
                            <div className="card-body">
                                <span className="text-sm text-gray-500 font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                <h3 className="card-title text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-2">{blog.excerpt || blog.content?.substring(0, 100) + "..."}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="text-primary font-bold hover:underline flex items-center gap-1">
                                        Read More <FaArrowRight className="text-xs" />
                                    </button>
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

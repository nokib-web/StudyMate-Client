import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();

    useEffect(() => {
        axiosPublic.get(`/blogs/${id}`)
            .then(res => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch blog details", err);
                setLoading(false);
            });
    }, [id, axiosPublic]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Article not found</h2>
                <Link to="/blogs" className="btn btn-primary">Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-50 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link to="/blogs" className="btn btn-ghost btn-sm mb-6 pl-0 hover:bg-transparent hover:text-primary transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Articles
                </Link>

                <article className="bg-base-100 rounded-3xl shadow-sm overflow-hidden">
                    <figure className="relative h-96 w-full">
                        <img
                            src={blog.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200"}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <div className="p-8 text-white w-full">
                                <div className="flex items-center gap-4 text-sm font-medium opacity-90 mb-3">
                                    <span className="bg-primary px-3 py-1 rounded-full text-xs">{blog.category || "Education"}</span>
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                    {blog.author && <span className="flex items-center gap-1"><FaUser /> {blog.author}</span>}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight">{blog.title}</h1>
                            </div>
                        </div>
                    </figure>

                    <div className="p-8 md:p-12">
                        <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed">
                            {/* Assuming content is plain text or simple markdown for this demo. 
                                In a real app, use a markdown renderer or HTML parser if stored as rich text.
                            */}
                            {blog.content ? blog.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            )) : (
                                <p>{blog.excerpt}</p>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-base-200">
                            <div className="flex items-center gap-2">
                                <FaTag className="text-primary" />
                                <span className="font-bold text-base-content">Tags:</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge badge-ghost">Education</span>
                                    <span className="badge badge-ghost">Study Tips</span>
                                    <span className="badge badge-ghost">Community</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogDetails;

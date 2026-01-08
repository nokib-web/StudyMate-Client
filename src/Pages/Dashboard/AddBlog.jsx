import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';

const AddBlog = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const { id } = useParams(); // For Edit Mode
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const fetchBlog = async () => {
                try {
                    const res = await axiosInstance.get(`/blogs/${id}`);
                    const data = res.data;
                    setValue('title', data.title);
                    setValue('category', data.category);
                    setValue('excerpt', data.excerpt);
                    setValue('author', data.author);
                    setValue('image', data.image);
                    setValue('content', data.content);
                } catch (error) {
                    console.error("Failed to fetch blog for edit", error);
                    Swal.fire("Error", "Could not load blog details", "error");
                }
            };
            fetchBlog();
        }
    }, [id, axiosInstance, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEditMode) {
                await axiosInstance.put(`/blogs/${id}`, data);
                Swal.fire('Success', 'Blog updated successfully!', 'success');
            } else {
                await axiosInstance.post('/blogs', { ...data, createdAt: new Date() });
                Swal.fire('Success', 'Blog published successfully!', 'success');
            }
            navigate('/dashboard/manage-blogs');
        } catch (error) {
            console.error("Error saving blog:", error);
            Swal.fire('Error', 'Failed to save blog.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tight">
                    {isEditMode ? "Refine Publication" : "New Publication"}
                </h2>
                <p className="opacity-60 font-medium text-base-content">
                    {isEditMode ? "Update your existing article details" : "Share your knowledge with the StudyMate community"}
                </p>
            </div>

            <div className="bg-base-100 p-6 md:p-10 rounded-[2.5rem] border border-base-300 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Blog Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter a compelling title"
                            className={`input input-bordered w-full rounded-2xl bg-base-200 border-base-300 text-base-content focus:ring-2 focus:ring-primary/20 transition-all ${errors.title ? 'input-error' : ''}`}
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.title.message}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="form-control">
                            <label className="label">
                                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Category</span>
                            </label>
                            <select
                                className="select select-bordered w-full rounded-2xl bg-base-200 border-base-300 text-base-content font-bold focus:ring-2 focus:ring-primary/20 transition-all"
                                {...register("category", { required: "Category is required" })}
                            >
                                <option value="">Select Category</option>
                                <option value="Tips">Study Tips</option>
                                <option value="Wellness">Wellness</option>
                                <option value="Tech">Tech & Tools</option>
                                <option value="Career">Career</option>
                                <option value="News">News</option>
                            </select>
                            {errors.category && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.category.message}</span>}
                        </div>

                        {/* Author */}
                        <div className="form-control">
                            <label className="label">
                                <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Author Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Display name"
                                className="input input-bordered w-full rounded-2xl bg-base-200 border-base-300 text-base-content focus:ring-2 focus:ring-primary/20 transition-all"
                                {...register("author", { required: "Author is required" })}
                            />
                            {errors.author && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.author.message}</span>}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label">
                            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Cover Image URL</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            className="input input-bordered w-full rounded-2xl bg-base-200 border-base-300 text-base-content focus:ring-2 focus:ring-primary/20 transition-all"
                            {...register("image", { required: "Image URL is required" })}
                        />
                        {errors.image && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.image.message}</span>}
                    </div>

                    {/* Excerpt */}
                    <div className="form-control">
                        <label className="label">
                            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Short Excerpt (Summary)</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-24 rounded-2xl bg-base-200 border-base-300 text-base-content focus:ring-2 focus:ring-primary/20 transition-all text-sm leading-relaxed"
                            placeholder="Brief summary to entice readers..."
                            {...register("excerpt", { required: "Excerpt is required" })}
                        ></textarea>
                        {errors.excerpt && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.excerpt.message}</span>}
                    </div>

                    {/* Content */}
                    <div className="form-control">
                        <label className="label">
                            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest px-1 text-base-content">Full Article Content</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full h-72 rounded-2xl bg-base-200 border-base-300 text-base-content focus:ring-2 focus:ring-primary/20 transition-all text-base leading-relaxed"
                            placeholder="Write your insightful content here..."
                            {...register("content", { required: "Content is required" })}
                        ></textarea>
                        {errors.content && <span className="text-error text-[10px] font-bold uppercase mt-1 px-1">{errors.content.message}</span>}
                    </div>

                    <div className="form-control mt-8">
                        <button
                            type="submit"
                            className={`btn btn-primary btn-lg rounded-2xl w-full font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner loading-sm"></span> Publishing...
                                </span>
                            ) : (
                                isEditMode ? "Update Publication" : "Publish Article"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;

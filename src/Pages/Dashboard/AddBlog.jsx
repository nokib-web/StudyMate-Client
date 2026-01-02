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
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 text-center">
                {isEditMode ? "Edit Blog" : "Add New Blog"}
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Blog Title</span></label>
                        <input
                            type="text"
                            placeholder="Enter blog title"
                            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Category</span></label>
                            <select
                                className="select select-bordered w-full"
                                {...register("category", { required: "Category is required" })}
                            >
                                <option value="">Select Category</option>
                                <option value="Tips">Study Tips</option>
                                <option value="Wellness">Wellness</option>
                                <option value="Tech">Tech & Tools</option>
                                <option value="Career">Career</option>
                                <option value="News">News</option>
                            </select>
                            {errors.category && <span className="text-error text-sm mt-1">{errors.category.message}</span>}
                        </div>

                        {/* Author */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-bold">Author Name</span></label>
                            <input
                                type="text"
                                placeholder="Author name"
                                className="input input-bordered w-full"
                                {...register("author", { required: "Author is required" })}
                            />
                            {errors.author && <span className="text-error text-sm mt-1">{errors.author.message}</span>}
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Image URL</span></label>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full"
                            {...register("image", { required: "Image URL is required" })}
                        />
                        {errors.image && <span className="text-error text-sm mt-1">{errors.image.message}</span>}
                    </div>

                    {/* Excerpt */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Short Excerpt</span></label> <br />
                        <textarea
                            className="textarea w-full textarea-bordered h-20"
                            placeholder="Brief summary of the blog..."
                            {...register("excerpt", { required: "Excerpt is required" })}
                        ></textarea>
                        {errors.excerpt && <span className="text-error text-sm mt-1">{errors.excerpt.message}</span>}
                    </div>

                    {/* Content */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Full Content</span></label> <br />
                        <textarea
                            className="textarea textarea-bordered w-full h-60 text-base"
                            placeholder="Write your blog content here..."
                            {...register("content", { required: "Content is required" })}
                        ></textarea>
                        {errors.content && <span className="text-error text-sm mt-1">{errors.content.message}</span>}
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} disabled={loading}>
                            {isEditMode ? "Update Blog" : "Publish Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;

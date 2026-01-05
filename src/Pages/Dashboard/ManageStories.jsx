import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrash, FaPlus, FaQuoteRight, FaStar, FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageStories = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: stories = [], refetch, isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stories');
            return res.data;
        }
    });

    const handleAddStory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const storyData = {
            name: form.name.value,
            role: form.role.value,
            image: form.image.value,
            content: form.content.value,
            rating: parseInt(form.rating.value)
        };

        try {
            await axiosSecure.post('/stories', storyData);
            Swal.fire('Success', 'Story published successfully', 'success');
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to publish story', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Remove Story?',
            text: "This story will be removed from the homepage.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            confirmButtonText: 'Yes, remove'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/stories/${id}`);
                    Swal.fire('Removed', 'The story has been deleted.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete story', 'error');
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner message="Accessing success stories..." />;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Impact Management</h2>
                    <p className="text-gray-500 text-sm font-medium mt-1">Curate and showcase the best of StudyMate's community impact.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary rounded-2xl px-8 gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
                >
                    <FaPlus />
                    <span className="font-bold">New Story</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4 group relative hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-gray-50">
                                    <img src={story.image} alt={story.name} className="object-cover" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black text-gray-900 leading-tight">{story.name}</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{story.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium italic line-clamp-3">"{story.content}"</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex text-yellow-500 gap-1 text-xs">
                                {[...Array(story.rating || 5)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <button
                                onClick={() => handleDelete(story._id)}
                                className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-8 space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="text-center relative">
                            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
                                <FaQuoteRight size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Draft Success Story</h3>
                            <p className="text-sm text-gray-500 font-medium">Highlight a community milestone</p>
                        </div>
                        <form onSubmit={handleAddStory} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Author Name</label>
                                    <input name="name" className="input input-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-100" placeholder="e.g. John Doe" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Professional Role</label>
                                    <input name="role" className="input input-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-100" placeholder="e.g. CS Student" required />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Avatar Image URL</label>
                                <input name="image" className="input input-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-100" placeholder="https://..." required />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Testimonial Content</label>
                                <textarea name="content" className="textarea textarea-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-100 min-h-[100px]" placeholder="What did they achieve?" required></textarea>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Impact Rating</label>
                                <select name="rating" className="select select-bordered w-full rounded-2xl focus:ring-2 focus:ring-primary/20 border-gray-100 font-bold text-gray-700">
                                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 btn btn-ghost rounded-2xl font-bold text-gray-500">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 btn btn-primary rounded-2xl font-bold shadow-lg shadow-primary/20">
                                    {loading ? "Publishing..." : "Publish Story"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStories;

import React, { useEffect, useState } from 'react';
import { FaQuoteLeft, FaStar, FaTimes, FaArrowRight } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';

const TestimonialsSection = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxios();

    useEffect(() => {
        axiosPublic.get('/stories')
            .then(res => {
                const data = res.data.stories || res.data;
                setStories(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch stories:", err);
                setLoading(false);
            });
    }, [axiosPublic]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isModalOpen]);

    const openModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedStory(null), 300);
    };

    if (loading) return null;
    if (stories.length === 0) return null;

    // Card component to avoid duplication
    const StoryCard = ({ testimonial, index }) => (
        <div
            onClick={() => openModal(testimonial)}
            className="group bg-base-100 p-6 md:p-8 rounded-[2rem] border border-base-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 relative cursor-pointer hover:-translate-y-1 flex-shrink-0 w-[340px] md:w-[400px]"
        >
            {/* Quote Icon Accent */}
            <div className="absolute top-6 right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <FaQuoteLeft size={36} />
            </div>

            <div className="relative z-10">
                {/* Truncated Content - max 3 lines */}
                <p className="opacity-80 mb-5 font-medium italic leading-[1.8] text-base text-base-content" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    "{testimonial.content}"
                </p>

                {/* Read Story Prompt */}
                <div className="flex items-center gap-1.5 text-primary text-sm font-bold mb-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span>Read Story</span>
                    <FaArrowRight size={10} />
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-5 border-t border-base-200">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-base-300 group-hover:ring-primary/20 transition-all">
                            <img src={testimonial.image} alt={testimonial.name} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-black text-base-content text-base leading-tight group-hover:text-primary transition-colors truncate">{testimonial.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                            <p className="text-[10px] font-black opacity-50 uppercase tracking-widest truncate">{testimonial.role}</p>
                            <div className="flex text-yellow-500 gap-0.5 text-xs flex-shrink-0">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-base-200 overflow-hidden relative border-y border-base-300">
            {/* Marquee keyframes */}
            <style>{`
                @keyframes marquee-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    display: flex;
                    gap: 2rem;
                    animation: marquee-scroll 30s linear infinite;
                    width: max-content;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Background Decorative Accents */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -ml-64 -mt-64"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -mr-40 -mb-40"></div>

            {/* Header */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Impact</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Success Stories</h2>
                    <p className="text-lg opacity-70 max-w-2xl mx-auto font-medium leading-relaxed">Real impact, real progress. See how our community is transforming their learning journey together.</p>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative z-10">
                {/* Left & Right gradient fades */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-base-200 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-base-200 to-transparent z-20 pointer-events-none"></div>

                {/* Scrolling Track — cards duplicated for seamless loop */}
                <div className="marquee-track py-4">
                    {stories.map((testimonial, i) => (
                        <StoryCard key={`original-${testimonial._id}`} testimonial={testimonial} index={i} />
                    ))}
                    {stories.map((testimonial, i) => (
                        <StoryCard key={`duplicate-${testimonial._id}`} testimonial={testimonial} index={i} />
                    ))}
                </div>
            </div>

            {/* ===== MODAL ===== */}
            {selectedStory && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={closeModal}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

                    {/* Modal Content */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`relative bg-base-100 rounded-[2rem] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl border border-base-300 transition-all duration-300 ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-base-100/95 backdrop-blur-md z-10 px-8 py-6 border-b border-base-200 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="avatar">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm ring-2 ring-primary/20">
                                        <img src={selectedStory.image} alt={selectedStory.name} className="object-cover w-full h-full" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-base-content text-xl leading-tight">{selectedStory.name}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">{selectedStory.role}</p>
                                        <div className="flex text-yellow-500 gap-0.5 text-xs">
                                            {[...Array(selectedStory.rating || 5)].map((_, i) => (
                                                <FaStar key={i} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="btn btn-ghost btn-sm btn-circle hover:bg-base-200 transition-colors"
                                aria-label="Close modal"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="px-8 py-8 overflow-y-auto max-h-[calc(85vh-100px)]">
                            <div className="relative">
                                <FaQuoteLeft size={32} className="text-primary/10 mb-4" />
                                <p className="text-base-content text-lg leading-[2] font-medium whitespace-pre-line">
                                    {selectedStory.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TestimonialsSection;



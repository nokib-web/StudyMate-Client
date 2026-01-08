import React, { useEffect, useState } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';

const TestimonialsSection = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
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

    if (loading) return null;
    if (stories.length === 0) return null;

    return (
        <section className="py-24 bg-base-200 overflow-hidden relative border-y border-base-300">
            {/* Background Decorative Accents */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -ml-64 -mt-64"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -mr-40 -mb-40"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Impact</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Success Stories</h2>
                    <p className="text-lg opacity-70 max-w-2xl mx-auto font-medium leading-relaxed">Real impact, real progress. See how our community is transforming their learning journey together.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((testimonial) => (
                        <div key={testimonial._id} className="group bg-base-100 p-8 md:p-10 rounded-[2.5rem] border border-base-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 relative">
                            {/* Quote Icon Accent */}
                            <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <FaQuoteLeft size={48} />
                            </div>

                            <div className="relative z-10">
                                <p className="opacity-80 mb-8 font-medium italic leading-[1.8] text-lg text-base-content">"{testimonial.content}"</p>

                                <div className="flex items-center gap-4 pt-8 border-t border-base-200">
                                    <div className="avatar">
                                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm ring-1 ring-base-300 group-hover:ring-primary/20 transition-all">
                                            <img src={testimonial.image} alt={testimonial.name} className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-base-content text-lg leading-tight group-hover:text-primary transition-colors">{testimonial.name}</h4>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-[10px] font-black opacity-50 uppercase tracking-widest">{testimonial.role}</p>
                                            <div className="flex text-yellow-500 gap-0.5 text-xs">
                                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                    <FaStar key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;

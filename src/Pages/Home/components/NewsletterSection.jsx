import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const NewsletterSection = () => {
    return (
        <section className="py-24 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="bg-base-200 border border-base-300 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative subtle gradients */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center lg:text-left space-y-4">
                            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Weekly Digest</div>
                            <h2 className="text-3xl md:text-5xl font-black text-base-content tracking-tight leading-tight">Expert study tips in your inbox.</h2>
                            <p className="opacity-70 text-lg font-medium leading-relaxed">
                                Join our community of 50,000+ learners. Get curated resources, study guides, and platform updates delivered weekly.
                            </p>
                        </div>

                        <div className="w-full max-w-lg bg-base-100 p-2 rounded-3xl shadow-xl border border-base-300/50">
                            <form className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-ghost flex-1 focus:bg-transparent px-6 text-base-content focus:outline-none placeholder:opacity-30 font-medium h-14"
                                />
                                <button className="btn btn-primary h-14 rounded-2xl px-8 text-white border-none shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-bold">
                                    Join Now <FaPaperPlane className="ml-2 text-xs opacity-70" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <p className="opacity-30 text-[11px] font-bold text-center mt-8 uppercase tracking-[0.2em] text-base-content">
                    No spam • Unsubscribe at any time • Privacy focused
                </p>
            </div>
        </section>
    );
};

export default NewsletterSection;

import React from 'react';
import { Link } from 'react-router';
import { FaUserPlus, FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
    return (
        <section className="py-24 bg-base-100 relative">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 md:p-20 relative overflow-hidden text-center shadow-2xl">
                    {/* Abstract high-end background pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px] opacity-20"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 text-blue-100 rounded-full backdrop-blur-sm">
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] px-1">Unlock Your Potential</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                            Ready to Transform Your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Academic Journey?</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join thousands of students who are acing their exams and learning new skills with our collaborative study ecosystem.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                            <Link to="/register" className="btn btn-primary h-auto py-4 rounded-2xl px-12 text-white border-none shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg font-bold group">
                                Get Started for Free
                                <FaUserPlus className="ml-2" />
                            </Link>
                            <Link to="/find-partners" className="btn bg-white/5 hover:bg-white/10 text-white h-auto py-4 rounded-2xl px-12 border-white/10 backdrop-blur-sm transition-all text-lg font-bold">
                                Browse Partners
                                <FaArrowRight className="ml-2 text-sm opacity-50" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;

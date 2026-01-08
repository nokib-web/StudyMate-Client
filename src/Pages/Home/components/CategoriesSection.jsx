import React, { useEffect, useState } from 'react';
import { FaCode, FaLanguage, FaCalculator, FaFlask, FaPalette, FaMusic, FaHistory, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router';

const categoryMetadata = {
    'Programming': { icon: FaCode, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
    'Cse': { icon: FaCode, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    'Information Technology': { icon: FaCode, color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/20' },
    'Languages': { icon: FaLanguage, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    'English': { icon: FaLanguage, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    'Mathematics': { icon: FaCalculator, color: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
    'Statistics': { icon: FaCalculator, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'Science': { icon: FaFlask, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    'Biology': { icon: FaFlask, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    'Design': { icon: FaPalette, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
    'Music': { icon: FaMusic, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    'History': { icon: FaHistory, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    'Business': { icon: FaBriefcase, color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
    'Economics': { icon: FaBriefcase, color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    'Architecture': { icon: FaGraduationCap, color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20' },
    'Default': { icon: FaGraduationCap, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' }
};

const CategoriesSection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosPublic.get('/partners/categories');
                // Sort by count descending
                const sorted = (res.data || []).sort((a, b) => b.count - a.count);
                setCategories(sorted);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [axiosPublic]);

    if (loading) return (
        <div className="py-32 flex justify-center bg-base-100">
            <span className="loading loading-spinner loading-lg text-primary/40"></span>
        </div>
    );

    return (
        <section className="py-24 bg-base-200 relative overflow-hidden">
            {/* Soft decorative background shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-2">
                    <div className="space-y-3 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Learning Hub</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Explore Subjects</h2>
                        <p className="opacity-70 max-w-lg font-medium">Find expert partners and passionate learners across specialized academic fields.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {categories.length > 0 ? categories.map((category, index) => {
                        const matchKey = Object.keys(categoryMetadata).find(k => k.toLowerCase() === category.subject.toLowerCase()) || 'Default';
                        const meta = categoryMetadata[matchKey];
                        const Icon = meta.icon;

                        return (
                            <Link
                                to={`/find-partners?subject=${category.subject}`}
                                key={index}
                                className={`group flex items-center p-5 bg-base-100 border border-base-300 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-300 relative overflow-hidden`}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${meta.bg}`}></div>

                                <div className="relative z-10 flex items-center gap-4 w-full text-left">
                                    <div className={`w-14 h-14 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className={`w-7 h-7 ${meta.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-bold text-base-content truncate mb-0.5 group-hover:text-primary transition-colors">{category.subject}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-black opacity-50 uppercase tracking-widest">{category.count} {category.count === 1 ? 'Learner' : 'Learners'}</span>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-base-300 flex items-center justify-center opacity-30 group-hover:bg-primary group-hover:text-white group-hover:border-transparent group-hover:opacity-100 transition-all duration-300 -mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    }) : (
                        <div className="col-span-full py-20 text-center bg-base-100 rounded-[3rem] border border-dashed border-base-300">
                            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaGraduationCap className="opacity-30 text-2xl" />
                            </div>
                            <h3 className="text-base-content font-bold">No active subjects yet</h3>
                            <p className="opacity-50 text-sm mt-1">Be the first to create a profile and lead a new category!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;

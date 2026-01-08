import React from 'react';
import { FaGraduationCap, FaUsers, FaLightbulb, FaRocket, FaHandshake, FaGlobe } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-base-100 min-h-screen overflow-hidden text-base-content">
            {/* Hero Section - Redesigned for Premium Look */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Abstract high-end background accents */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -ml-40"></div>

                <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our DNA</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-base-content tracking-tight leading-[1.1]">
                        Empowering Students <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Worldwide.</span>
                    </h1>
                    <p className="text-xl opacity-70 max-w-3xl mx-auto font-medium leading-relaxed">
                        StudyMate is on a mission to connect learners, foster collaboration, and make education accessible and engaging for everyone through the power of collective intelligence.
                    </p>
                </div>
            </section>

            {/* Core Pillars - Redesigned Cards */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-base-100 p-10 rounded-[2.5rem] border border-base-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-primary"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    <FaGraduationCap size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-base-content tracking-tight">Our Mission</h3>
                                <p className="opacity-70 font-medium leading-relaxed">To create the world's most vibrant and supportive community for students to find study partners and achieve academic excellence.</p>
                            </div>
                        </div>

                        <div className="group bg-base-100 p-10 rounded-[2.5rem] border border-base-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-emerald-500/10"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    <FaUsers size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-base-content tracking-tight">Our Community</h3>
                                <p className="opacity-70 font-medium leading-relaxed">We believe in the power of peer-to-peer learning. Our platform bridges the gap between solitary study and collaborative success.</p>
                            </div>
                        </div>

                        <div className="group bg-base-100 p-10 rounded-[2.5rem] border border-base-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-amber-500/10"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                    <FaLightbulb size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-base-content tracking-tight">Our Vision</h3>
                                <p className="opacity-70 font-medium leading-relaxed">A future where every student has a study buddy, regardless of their location, subject, or preferred learning style.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section - Modernized Layout */}
            <section className="py-24 bg-base-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl -z-10 transform -rotate-6 scale-90"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                alt="Students studying together"
                                className="rounded-[3rem] shadow-2xl relative z-10 hover:rotate-1 hover:scale-[1.02] transition-all duration-700 h-[500px] w-full object-cover border border-base-300"
                            />
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">The Story Behind <br /><span className="text-primary italic">StudyMate</span></h2>
                                <p className="text-lg opacity-80 font-medium leading-relaxed">
                                    It all started with a simple observation: <span className="text-base-content font-bold italic">studying is better together.</span> As students ourselves, we struggled to find reliable partners for our complex projects. We realized that thousands of others were fighting that same solitary battle.
                                </p>
                                <p className="text-lg opacity-80 font-medium leading-relaxed">
                                    In 2024, we launched as a dedicated ecosystem for collaboration. What began as a local experimental project has now evolved into a global bridge connecting minds across continents.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center"><FaRocket /></div>
                                    <span className="text-sm font-black text-base-content uppercase tracking-widest">Rapid Growth</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><FaHandshake /></div>
                                    <span className="text-sm font-black text-base-content uppercase tracking-widest">Safe Community</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><FaGlobe /></div>
                                    <span className="text-sm font-black text-base-content uppercase tracking-widest">Global Reach</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section - Refined Profile Cards */}
            <section className="py-24 bg-base-200">
                <div className="container mx-auto px-6 text-center">
                    <div className="space-y-4 mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">Meet The Architects</h2>
                        <p className="opacity-70 font-medium max-w-xl mx-auto text-lg">The passionate minds dedicated to reshaping the landscape of collaborative learning.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                        <div className="group relative flex flex-col items-center">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                <div className="w-48 h-56 rounded-[3rem] bg-base-300 overflow-hidden ring-1 ring-base-300 group-hover:ring-primary/50 transition-all duration-500 group-hover:-translate-y-2 relative">
                                    <img
                                        src="https://lh3.googleusercontent.com/a/ACg8ocLPd98Wg2iDeKXDye8QT1v59Y6s5rIXWp-KZMNXsnOCZ9RW3RyaMA=s96-c"
                                        alt="Nazmul Hasan Nokib"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-base-content">Nazmul Hasan Nokib</h4>
                            <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mt-1">Lead Developer & Architect</p>
                        </div>

                        <div className="group relative flex flex-col items-center">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-secondary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                                <div className="w-48 h-56 rounded-[3rem] bg-base-300 overflow-hidden ring-1 ring-base-300 group-hover:ring-secondary/50 transition-all duration-500 group-hover:-translate-y-2 relative">
                                    <img
                                        src="https://ui-avatars.com/api/?name=Sharmin+Akter&background=random&color=fff"
                                        alt="Sharmin Akter"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-base-content">Sharmin Akter</h4>
                            <p className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] mt-1">Project Inspiration</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

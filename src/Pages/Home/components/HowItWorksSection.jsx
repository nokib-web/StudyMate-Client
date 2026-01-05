import React from 'react';
import { FaUserCircle, FaSearch, FaComments, FaTrophy } from 'react-icons/fa';

const steps = [
    {
        id: '01',
        title: 'Join the Hub',
        description: 'Complete your profile with your academic interests and goals.',
        icon: FaUserCircle,
        color: 'text-blue-500',
        bg: 'bg-blue-50'
    },
    {
        id: '02',
        title: 'Find Your Match',
        description: 'Our smart filters help find partners with matching schedules.',
        icon: FaSearch,
        color: 'text-indigo-500',
        bg: 'bg-indigo-50'
    },
    {
        id: '03',
        title: 'Sync & Study',
        description: 'Collaborate in real-time using our dedicated workspace.',
        icon: FaComments,
        color: 'text-emerald-500',
        bg: 'bg-emerald-50'
    },
    {
        id: '04',
        title: 'Master Together',
        description: 'Share insights, track progress and crush your exams.',
        icon: FaTrophy,
        color: 'text-amber-500',
        bg: 'bg-amber-50'
    },
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Efficiency Redefined</div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The Modern Way to Study</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">Four precision-engineered steps to elevate your academic performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/4 left-0 w-full h-px bg-gray-100 -z-10"></div>

                    {steps.map((step) => (
                        <div key={step.id} className="group relative flex flex-col items-center text-center space-y-6">
                            <div className="relative">
                                <div className={`w-20 h-20 rounded-[2rem] ${step.bg} ${step.color} flex items-center justify-center shadow-lg shadow-black/5 group-hover:rotate-12 transition-all duration-500 relative z-10 bg-white`}>
                                    <step.icon size={32} />
                                </div>
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-[10px] font-black z-20 border-4 border-white">
                                    {step.id}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">{step.title}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed px-4">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;

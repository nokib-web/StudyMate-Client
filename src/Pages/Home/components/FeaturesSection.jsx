import React from 'react';
import { FaLaptopCode, FaClock, FaShieldAlt, FaRocket, FaHandshake, FaBrain } from 'react-icons/fa';

const features = [
    {
        name: 'Smart Matching',
        description: 'Our AI-driven algorithm pairs you with the perfect study buddy based on your goals and schedule.',
        icon: FaBrain,
    },
    {
        name: 'Real-time Collaboration',
        description: 'Use our built-in whiteboard and code editor to solve problems together in real-time.',
        icon: FaLaptopCode,
    },
    {
        name: '24/7 Availability',
        description: 'Find partners across different time zones to study whenever you feel productive.',
        icon: FaClock,
    },
    {
        name: 'Verified Profiles',
        description: 'Safety first. All profiles are verified to ensure a secure and focused learning environment.',
        icon: FaShieldAlt,
    },
    {
        name: 'Gamified Learning',
        description: 'Earn badges and streaks as you complete study sessions and achieve your milestones.',
        icon: FaRocket,
    },
    {
        name: 'Community Support',
        description: 'Join subject-specific groups and forums to get help from the broader community.',
        icon: FaHandshake,
    },
];

const FeaturesSection = () => {
    return (
        <div className="py-24 bg-base-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-heading font-bold mb-4">Why Choose StudyMate?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                    Everything you need to boost your productivity and make learning a shared journey.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 border border-base-200 rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;

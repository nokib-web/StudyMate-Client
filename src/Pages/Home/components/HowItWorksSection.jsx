import React from 'react';

const steps = [
    {
        id: '01',
        title: 'Create Your Profile',
        description: 'Sign up and set your study goals, subjects, and availability.',
    },
    {
        id: '02',
        title: 'Find a Partner',
        description: 'Browse profiles or use our smart match to find your ideal buddy.',
    },
    {
        id: '03',
        title: 'Start Studying',
        description: 'Connect via chat or video and start learning together instantly.',
    },
    {
        id: '04',
        title: 'Achieve Goals',
        description: 'Track your progress and ace your exams with mutual support.',
    },
];

const HowItWorksSection = () => {
    return (
        <div className="py-24 bg-base-200">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600">Get started in 4 simple steps</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="relative p-6 pt-12 bg-base-100 rounded-2xl shadow-sm hover:-translate-y-2 transition-transform">
                            <div className="absolute -top-6 left-6 w-12 h-12 bg-secondary text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                                {step.id}
                            </div>
                            <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;

import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'College Student',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: "StudyMate helped me find a study buddy for my calculus exam. We practiced together every day and I ended up getting an A! Highly recommended.",
        rating: 5,
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Language Learner',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: "I was struggling to practice Spanish conversation until I found a partner here. Now we speak twice a week and my fluency has improved drastically.",
        rating: 5,
    },
    {
        id: 3,
        name: 'Jessica Davis',
        role: 'Certification Aspirant',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: "The best platform to find serious study partners. I found someone preparing for the same AWS certification, and we both passed last month!",
        rating: 4,
    },
];

const TestimonialsSection = () => {
    return (
        <div className="py-24 bg-primary text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">Success Stories</h2>
                    <p className="text-lg text-blue-100">See what our community has achieved</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl relative mt-4">
                            <FaQuoteLeft className="absolute -top-4 left-8 text-secondary text-4xl" />
                            <div className="flex items-center gap-4 mb-6 mt-2">
                                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                            <div className="flex text-yellow-500 gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;

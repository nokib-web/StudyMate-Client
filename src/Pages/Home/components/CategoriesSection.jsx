import React from 'react';
import { FaCode, FaLanguage, FaCalculator, FaFlask, FaPalette, FaMusic, FaHistory, FaBriefcase } from 'react-icons/fa';

const categories = [
    { name: 'Programming', count: '1,200+ Learners', icon: FaCode, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Languages', count: '800+ Learners', icon: FaLanguage, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Mathematics', count: '600+ Learners', icon: FaCalculator, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Science', count: '450+ Learners', icon: FaFlask, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Design', count: '300+ Learners', icon: FaPalette, color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Music', count: '200+ Learners', icon: FaMusic, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'History', count: '150+ Learners', icon: FaHistory, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Business', count: '500+ Learners', icon: FaBriefcase, color: 'text-teal-500', bg: 'bg-teal-50' },
];

const CategoriesSection = () => {
    return (
        <div className="py-24 bg-base-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-heading font-bold mb-4">Explore Categories</h2>
                    <p className="text-lg text-gray-600">Find partners in your favorite subjects</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <div key={index} className="flex flex-col items-center p-8 bg-white border border-base-200 rounded-2xl hover:shadow-lg hover:border-transparent transition-all cursor-pointer group">
                            <div className={`w-16 h-16 rounded-full ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <category.icon className={`w-8 h-8 ${category.color}`} />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesSection;

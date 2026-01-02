import React from 'react';
import { Link } from 'react-router';
import { FaUserPlus } from 'react-icons/fa';

const CTASection = () => {
    return (
        <div className="py-24 bg-gradient-to-br from-primary to-blue-800 text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Ready to Transform Your Study Life?</h2>
                <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
                    Join thousands of students who are acing their exams and learning new skills with StudyMate.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="btn btn-secondary btn-xl rounded-full px-10 text-white border-none shadow-xl hover:scale-105 transition-transform text-lg">
                        Get Started for Free <FaUserPlus className="ml-2" />
                    </Link>
                    <Link to="/find-partners" className="btn btn-outline btn-xl rounded-full px-10 text-white border-2 hover:bg-white hover:text-primary transition-colors text-lg">
                        Browse Partners
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CTASection;

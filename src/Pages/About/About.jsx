import React from 'react';
import { FaGraduationCap, FaUsers, FaLightbulb } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-base-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative py-24 bg-primary text-primary-content overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl font-heading font-bold mb-6">Empowering Students Worldwide</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        StudyMate is on a mission to connect learners, foster collaboration, and make education accessible and engaging for everyone.
                    </p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="card bg-base-100 shadow-lg border border-base-200 hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-primary mb-4">
                                <FaGraduationCap size={32} />
                            </div>
                            <h3 className="card-title text-2xl mb-2">Our Mission</h3>
                            <p className="text-gray-600">To create the world's most vibrant and supportive community for students to find study partners and achieve academic excellence.</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-lg border border-base-200 hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-secondary mb-4">
                                <FaUsers size={32} />
                            </div>
                            <h3 className="card-title text-2xl mb-2">Our Community</h3>
                            <p className="text-gray-600">We believe in the power of peer-to-peer learning. Our platform bridges the gap between solitary study and collaborative success.</p>
                        </div>
                    </div>
                    <div className="card bg-white shadow-lg border border-base-200 hover:-translate-y-2 transition-transform duration-300">
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-accent mb-4">
                                <FaLightbulb size={32} />
                            </div>
                            <h3 className="card-title text-2xl mb-2">Our Vision</h3>
                            <p className="text-gray-600">A future where every student has a study buddy, regardless of their location, subject, or learning style.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-base-100 py-16">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                alt="Students studying together"
                                className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                            />
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-heading font-bold mb-6 text-gray-800">Our Story</h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                It all started with a simple idea: studying is better together. As students ourselves, we struggled to find reliable partners for our projects and exam preparations. We realized that many others faced the same challenge.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                In 2024, we launched StudyMate to solve this problem. What began as a small project has now grown into a global platform helping thousands of students connect, learn, and grow.
                            </p>
                            <button className="btn btn-primary rounded-full px-8 text-lg">Join Our Journey</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl font-heading font-bold mb-12">Meet The Team</h2>
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="flex flex-col items-center">
                        <div className="avatar mb-4">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://lh3.googleusercontent.com/a/ACg8ocLPd98Wg2iDeKXDye8QT1v59Y6s5rIXWp-KZMNXsnOCZ9RW3RyaMA=s96-c" alt="Nazmul Hasan Nokib" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold">Nazmul Hasan Nokib</h4>
                        <p className="text-gray-500">Team Lead & Developer</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="avatar mb-4">
                            <div className="w-32 h-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src="https://ui-avatars.com/api/?name=Sharmin+Akter&background=random&color=fff" alt="Sharmin Akter" />
                            </div>
                        </div>
                        <h4 className="text-xl font-bold">Sharmin Akter</h4>
                        <p className="text-gray-500">Inspiration</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
